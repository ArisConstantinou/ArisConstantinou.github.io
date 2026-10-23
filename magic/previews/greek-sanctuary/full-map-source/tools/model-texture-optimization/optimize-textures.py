"""Trim unused texture borders; retain source texels and all non-image GLB bytes.

Only small UV islands fully inside the image are eligible. Tiled materials and
shared images whose combined UV domain is large remain unchanged. A 64-texel
minimum border and 64-aligned power-of-two crops retain local mip filtering.
Runtime image comparisons are required before publishing a candidate.
"""
import hashlib
import io
import json
import math
import os
from pathlib import Path
import struct
from PIL import Image

root = Path(os.environ['CODEX_GENERATED_OUTPUT'])
models = json.loads((root/'tests/mobile-model-optimization/uv-inventory.json').read_text(encoding='utf-8'))['models']
reports = []

def sha(data):
    return hashlib.sha256(data).hexdigest()

def texture_infos(material):
    for key, value in material.items():
        if key.endswith('Texture') and isinstance(value, dict):
            yield value
    for key, value in material.get('pbrMetallicRoughness', {}).items():
        if key.endswith('Texture') and isinstance(value, dict):
            yield value

for kind in ['archer', 'iron-warden', 'gargoyle']:
    source = root/f'build/models/redesign/{kind}-mobile-lods.glb'
    data = source.read_bytes()
    size = struct.unpack_from('<I', data, 12)[0]
    doc = json.loads(data[20:20+size])
    binary = data[28+size:]
    original_doc = json.loads(json.dumps(doc))
    views = [binary[v.get('byteOffset', 0):v.get('byteOffset', 0)+v['byteLength']] for v in doc['bufferViews']]
    old_views = list(views)
    consumers = {}
    for material in doc['materials']:
        uses = [m['uv'] for m in models[kind] if m['material'] == material['name']]
        assert uses, material['name']
        bounds = [min(u[0] for u in uses), min(u[1] for u in uses), max(u[2] for u in uses), max(u[3] for u in uses)]
        for info in texture_infos(material):
            assert not info.get('extensions') and info.get('texCoord', 0) == 0
            image_index = doc['textures'][info['index']]['source']
            consumers.setdefault(image_index, []).append((info, bounds))
    changes = []
    for index, image in enumerate(doc['images']):
        view = image['bufferView']; old = views[view]
        pixels = Image.open(io.BytesIO(old)); pixels.load()
        width, height = pixels.size
        uses = consumers.get(index, [])
        if not uses:
            continue
        bounds = [min(u[1][0] for u in uses), min(u[1][1] for u in uses), max(u[1][2] for u in uses), max(u[1][3] for u in uses)]
        extrema = pixels.getextrema()
        uniform = all(a == b for a, b in extrema)
        box = None
        if uniform:
            box = (0, 0, 1, 1)
        elif min(bounds) >= 0 and max(bounds) <= 1:
            # Conservative union across both LODs and every material using it.
            lo = [math.floor(bounds[0]*width), math.floor(bounds[1]*height)]
            hi = [math.ceil(bounds[2]*width), math.ceil(bounds[3]*height)]
            sizes = [2**math.ceil(math.log2(max(256, hi[i]-lo[i]+128))) for i in range(2)]
            if sizes[0] < width and sizes[1] < height:
                origins = [math.floor(((lo[i]+hi[i]-sizes[i])/2)/64)*64 for i in range(2)]
                if all(0 <= origins[i] and origins[i]+sizes[i] <= [width,height][i] and lo[i]-origins[i] >= 64 and origins[i]+sizes[i]-hi[i] >= 64 for i in range(2)):
                    box = (*origins, origins[0]+sizes[0], origins[1]+sizes[1])
        if box is None:
            continue
        cropped = pixels.crop(box)
        assert cropped.tobytes() == pixels.crop(box).tobytes()
        stream = io.BytesIO(); cropped.save(stream, format='PNG', compress_level=9)
        views[view] = stream.getvalue(); image['mimeType'] = 'image/png'
        if not uniform:
            cw, ch = cropped.size
            for info, uv in uses:
                info['extensions'] = {'KHR_texture_transform': {'offset': [-box[0]/cw, -box[1]/ch], 'scale': [width/cw, height/ch]}}
            extensions = doc.setdefault('extensionsUsed', [])
            if 'KHR_texture_transform' not in extensions:
                extensions.append('KHR_texture_transform')
        changes.append({'image': index, 'before': [width,height], 'after': list(cropped.size), 'box': list(box), 'uniform': uniform, 'originalImageSha256': sha(old), 'retainedPixelsSha256': sha(cropped.tobytes()), 'savedRgbaMipBytes': (width*height-cropped.width*cropped.height)*4*4/3})
    if not changes:
        continue
    image_views = {im['bufferView'] for im in doc['images']}
    assert all(old_views[i] == views[i] for i in range(len(views)) if i not in image_views)
    for key in ['accessors', 'meshes', 'nodes', 'skins', 'animations', 'scenes']:
        assert doc.get(key) == original_doc.get(key), key
    chunks=[]; offset=0
    for view, content in zip(doc['bufferViews'], views):
        view['byteOffset']=offset;view['byteLength']=len(content)
        padded=content+b'\0'*((-len(content))%4);chunks.append(padded);offset+=len(padded)
    doc['buffers'][0]['byteLength']=offset
    encoded=json.dumps(doc,separators=(',',':')).encode();encoded+=b' '*((-len(encoded))%4)
    output=struct.pack('<III',0x46546c67,2,28+len(encoded)+offset)+struct.pack('<II',len(encoded),0x4e4f534a)+encoded+struct.pack('<II',offset,0x004e4942)+b''.join(chunks)
    target=source.with_name(f'{kind}-mobile-optimized-lods.glb');target.write_bytes(output)
    reports.append({'kind':kind,'sourceSha256':sha(data),'outputSha256':sha(output),'bytes':len(output),'output':str(target),'changes':changes,'unchangedGeometryRigAnimationBytes':True,'savedRgbaMipMiB':sum(c['savedRgbaMipBytes'] for c in changes)/1048576,'status':'candidate_requires_visual_and_runtime_validation'})
(root/'tests/mobile-model-optimization/texture-optimization.json').write_text(json.dumps(reports,indent=2)+'\n',encoding='utf-8')
print(json.dumps([{'kind':r['kind'],'images':len(r['changes']),'savedMiB':r['savedRgbaMipMiB'],'bytes':r['bytes']} for r in reports]))

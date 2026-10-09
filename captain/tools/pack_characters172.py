"""Pack licensed character data only; never execute scripts from the asset mirror."""
import copy,io,json,struct,pathlib,hashlib,sys
from PIL import Image
SOURCE=pathlib.Path(sys.argv[1]);OUT=pathlib.Path(sys.argv[2]);OUT.mkdir(parents=True,exist_ok=True)
KEEP={'A_TPose','Idle_Loop','Walk_Loop','Jog_Fwd_Loop','Punch_Cross','Punch_Jab','Hit_Head','Hit_Chest','Consume','Sitting_Idle_Loop'}
def write_glb(doc,data,destination):
    data+=b'\0'*((-len(data))%4);doc['buffers']=[{'byteLength':len(data)}]
    js=json.dumps(doc,separators=(',',':')).encode();js+=b' '*((-len(js))%4)
    destination.write_bytes(struct.pack('<III',0x46546c67,2,12+8+len(js)+8+len(data))+struct.pack('<II',len(js),0x4e4f534a)+js+struct.pack('<II',len(data),0x004e4942)+data)
def compact(source,destination):
    raw=source.read_bytes();assert raw[:4]==b'glTF'
    jlen=struct.unpack_from('<I',raw,12)[0];doc=json.loads(raw[20:20+jlen]);binary=raw[28+jlen:];d=copy.deepcopy(doc)
    seen=set();d['animations']=[a for a in d['animations'] if a['name'] in KEEP and not(a['name'] in seen or seen.add(a['name']))]
    for mesh in d['meshes']:
        for p in mesh['primitives']:p['attributes']={k:v for k,v in p['attributes'].items() if k in ['POSITION','NORMAL','TEXCOORD_0','JOINTS_0','WEIGHTS_0']}
    used=set()
    for mesh in d['meshes']:
        for p in mesh['primitives']:used.update(p['attributes'].values());used.add(p['indices'])
    for skin in d['skins']:used.add(skin['inverseBindMatrices'])
    for a in d['animations']:
        for sampler in a['samplers']:used.add(sampler['input']);used.add(sampler['output'])
    amap={old:i for i,old in enumerate(sorted(used))};d['accessors']=[doc['accessors'][i].copy() for i in sorted(used)]
    for mesh in d['meshes']:
        for p in mesh['primitives']:p['attributes']={k:amap[v] for k,v in p['attributes'].items()};p['indices']=amap[p['indices']]
    for skin in d['skins']:skin['inverseBindMatrices']=amap[skin['inverseBindMatrices']]
    for a in d['animations']:
        for sampler in a['samplers']:sampler['input']=amap[sampler['input']];sampler['output']=amap[sampler['output']]
    imagebytes={}
    for im in d['images']:
        view=doc['bufferViews'][im['bufferView']];b=binary[view.get('byteOffset',0):view.get('byteOffset',0)+view['byteLength']]
        picture=Image.open(io.BytesIO(b));name=im.get('name','');limit=1024 if 'Superhero' in name and ('Dark'in name or 'Normal'in name) else 256
        picture.thumbnail((limit,limit),Image.Resampling.LANCZOS);mem=io.BytesIO()
        if 'BaseColor'in name and 'Hair'in name:picture.save(mem,format='PNG',optimize=True);im['mimeType']='image/png'
        else:picture.convert('RGB').save(mem,format='JPEG',quality=90);im['mimeType']='image/jpeg'
        imagebytes[im['bufferView']]=mem.getvalue()
    views=[];out=bytearray()
    def append_view(data):
        out.extend(b'\0'*((-len(out))%4));view={'buffer':0,'byteOffset':len(out),'byteLength':len(data)};out.extend(data);views.append(view);return len(views)-1
    sizes={5120:1,5121:1,5122:2,5123:2,5125:4,5126:4};counts={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4,'MAT4':16}
    for a in d['accessors']:
        view=doc['bufferViews'][a['bufferView']];start=view.get('byteOffset',0)+a.get('byteOffset',0);width=sizes[a['componentType']]*counts[a['type']];stride=view.get('byteStride',width)
        data=b''.join(binary[start+i*stride:start+i*stride+width] for i in range(a['count'])) if stride!=width else binary[start:start+width*a['count']]
        a['bufferView']=append_view(data);a['byteOffset']=0
    for im in d['images']:im['bufferView']=append_view(imagebytes[im['bufferView']])
    d['bufferViews']=views;d['asset']['generator']='LAST CALL 1.7.2 packer / Quaternius CC0 / selected clips and resized textures';d['asset']['copyright']='Quaternius, CC0 1.0. Adapted for LAST CALL.'
    write_glb(d,out,destination)
    return {'file':destination.name,'bytes':destination.stat().st_size,'sha256':hashlib.sha256(destination.read_bytes()).hexdigest(),'sourceSha256':hashlib.sha256(raw).hexdigest(),'clips':[a['name'] for a in d['animations']]}
manifest=[compact(SOURCE/('human_'+gender+'.glb'),OUT/(gender+'.glb')) for gender in ['male','female']]
(OUT/'LICENSE.txt').write_text((SOURCE/'License_Standard.txt').read_text())
for source in (SOURCE/'hair').glob('*.gltf'):
    d=json.loads(source.read_text());out=bytearray((source.parent/d['buffers'][0]['uri']).read_bytes());views=d['bufferViews']
    for im in d['images']:
        picture=Image.open(source.parent/im.pop('uri'));picture.thumbnail((512,512),Image.Resampling.LANCZOS);mem=io.BytesIO();picture.save(mem,format='PNG',optimize=True);data=mem.getvalue()
        out+=b'\0'*((-len(out))%4);im['bufferView']=len(views);im['mimeType']='image/png';views.append({'buffer':0,'byteOffset':len(out),'byteLength':len(data)});out+=data
    write_glb(d,out,OUT/(source.stem+'.glb'))
(OUT/'PROVENANCE.json').write_text(json.dumps({'author':'Quaternius','license':'CC0 1.0','authorPage':'https://quaternius.com/packs/universalbasecharacters.html','animationAuthorPage':'https://quaternius.com/packs/universalanimationlibrary.html','sourceMirror':'https://github.com/NafisRayan/Animate-Rigged-Humanoid-No-Blender/tree/main/test','modifications':'Only required animations retained; texture sizes reduced; geometry, weights and bind pose preserved. Clothing and role identities are added in characters172.js.','assets':manifest},indent=2))
print(json.dumps(manifest,indent=2))

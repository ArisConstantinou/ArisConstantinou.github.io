"""Reproducible Chronicle 0.4 packaging. Writes only Village/chronicle.
Input archives are the recorded successful asset builds, not new generated geometry.
"""
from pathlib import Path
import base64, hashlib, io, json, lzma, re, shutil, struct
from PIL import Image

ROOT=Path(__file__).resolve().parent.parent
SOURCE=Path('/tmp/chronicle-source-assets')
SURFACES=Path('/tmp/chronicle-surface-assets')
ASSETS=ROOT/'assets'; ASSETS.mkdir(exist_ok=True)
VENDOR=ROOT/'vendor'; VENDOR.mkdir(exist_ok=True)
EXPECTED='86b9c1053dab796ef83c056865632ac00dd02d1d8f1cb9a5d04cefc2af9387c2'
parts=[''.join((ROOT/'tools'/f'release04.part{i}').read_text().split()) for i in range(3)]
for i,p in enumerate(parts): print('PART',i,len(p),hashlib.sha256(p.encode()).hexdigest(),flush=True)
raw=lzma.decompress(base64.b64decode(''.join(parts),validate=True))
assert hashlib.sha256(raw).hexdigest()==EXPECTED,'Source payload checksum mismatch'
files=json.loads(raw)
assert set(files)=={'index.html','style.css','game.bundle.js'}
for name,content in files.items():
    assert isinstance(content,str)
    (ROOT/name).write_text(content,encoding='utf-8')
print('SOURCE PAYLOAD VERIFIED',flush=True)

def optimize_glb(source,destination):
    data=source.read_bytes()
    magic,version,total=struct.unpack_from('<4sII',data,0)
    assert magic==b'glTF' and version==2 and total==len(data)
    jlen,jtype=struct.unpack_from('<II',data,12)
    assert jtype==0x4E4F534A
    doc=json.loads(data[20:20+jlen])
    blen,btype=struct.unpack_from('<II',data,20+jlen)
    assert btype==0x004E4942
    binary=data[28+jlen:28+jlen+blen]
    image_views={im['bufferView']:im for im in doc.get('images',[]) if 'bufferView' in im}
    output=bytearray()
    for index,view in enumerate(doc['bufferViews']):
        offset=view.get('byteOffset',0); chunk=binary[offset:offset+view['byteLength']]
        if index in image_views:
            info=image_views[index]
            im=Image.open(io.BytesIO(chunk)); im.load()
            limit=1024 if 'normal' in info.get('name','').lower() else 1536
            im.thumbnail((limit,limit),Image.Resampling.LANCZOS)
            alpha='A' in im.getbands() and im.getchannel('A').getextrema()[0]<255
            encoded=io.BytesIO()
            if alpha:
                im.convert('RGBA').save(encoded,format='PNG',optimize=True)
                info['mimeType']='image/png'
            else:
                im.convert('RGB').save(encoded,format='JPEG',quality=88,optimize=True)
                info['mimeType']='image/jpeg'
            chunk=encoded.getvalue()
        output.extend(b'\x00'*((-len(output))%4))
        view['byteOffset']=len(output); view['byteLength']=len(chunk)
        output.extend(chunk)
    output.extend(b'\x00'*((-len(output))%4))
    doc['buffers'][0]['byteLength']=len(output)
    meta=json.dumps(doc,separators=(',',':'),ensure_ascii=False).encode('utf-8')
    meta+=b' '*((-len(meta))%4)
    final=struct.pack('<4sII',b'glTF',2,28+len(meta)+len(output))+struct.pack('<II',len(meta),0x4E4F534A)+meta+struct.pack('<II',len(output),0x004E4942)+output
    destination.write_bytes(final)
    print('GLB',destination.name,len(data),'->',len(final),flush=True)
    assert len(final)>1000000
    return len(final),hashlib.sha256(final).hexdigest()

manifest=json.loads((SOURCE/'human-assets-manifest.json').read_text())
for item in manifest['characters']:
    name=item['id']+'.glb'
    size,digest=optimize_glb(SOURCE/name,ASSETS/name)
    item['source_bytes']=item.get('bytes');item['bytes']=size;item['sha256']=digest
    item['assets']=[p.split('/system/')[-1] for p in item.get('assets',[])]
    shutil.copy2(SOURCE/(item['id']+'_skeleton.json'),ASSETS/(item['id']+'_skeleton.json'))
manifest['imageOptimization']='Embedded images resized only; vertex topology, fingers, faces and skin weights preserved.'
(ASSETS/'human-assets-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
shutil.copy2(SOURCE/'HUMAN-ASSET-LICENSE.txt',ASSETS/'HUMAN-ASSET-LICENSE.txt')
for p in (SOURCE/'vendor').iterdir():
    if p.is_file(): shutil.copy2(p,VENDOR/p.name)

# Bundle pinned upstream ES modules into isolated classic-script namespaces.
def replace_import(m):
    names=re.sub(r'(\w+)\s+as\s+(\w+)',r'\1: \2',m.group(1))
    namespace='THREE' if m.group(2)=='three' else 'BufferGeometryUtils'
    return 'const {'+names+'} = window.'+namespace+';'
def bundle(filename,namespace):
    text=(VENDOR/filename).read_text()
    text=re.sub(r'import\s*\{(.*?)\}\s*from\s*[\'\"]([^\'\"]+)[\'\"];',replace_import,text,flags=re.S)
    text=re.sub(r'export\s*\{(.*?)\}\s*;',lambda m:'window.'+namespace+' = {'+re.sub(r'(\w+)\s+as\s+(\w+)',r'\2: \1',m.group(1))+'};',text,flags=re.S)
    text=re.sub(r'export (function|class|const) ',r'\1 ',text)
    return '(function(){\n'+text+'\n})();\n'
(VENDOR/'runtime.js').write_text('\n'.join(bundle(f,n) for f,n in [('three.module.js','THREE'),('BufferGeometryUtils.js','BufferGeometryUtils'),('GLTFLoader.js','GLTF'),('SkeletonUtils.js','SkeletonUtils')]),encoding='utf-8')

surfaces=json.loads((SURFACES/'SURFACE-SOURCES.json').read_text())
count=0
for item in surfaces:
    for entry in item['files'].values():
        name=entry['name'];assert Path(name).name==name
        src=SURFACES/name
        im=Image.open(src);im.thumbnail((1024,1024),Image.Resampling.LANCZOS)
        im.convert('RGB').save(ASSETS/name,'JPEG',quality=87,optimize=True)
        entry['source_bytes']=entry['bytes'];entry['bytes']=(ASSETS/name).stat().st_size
        count+=1
assert count==12
(ASSETS/'SURFACE-SOURCES.json').write_text(json.dumps(surfaces,indent=2))
shutil.copy2(SURFACES/'SURFACE-LICENSE.txt',ASSETS/'SURFACE-LICENSE.txt')
(ROOT/'README.md').write_text('''# Μουτουλλάς — Χρονικό ενός τόπου · 0.4.0

Παίξιμη έκδοση browser: https://arisconstantinou.github.io/Village/chronicle/

Ανθρώπινοι χαρακτήρες με πρόσωπα, δάχτυλα, μαλλιά, ρούχα και σκελετό 53 οστών. Δύο βασικά μοντέλα, με παραλλαγές υλικών. Σπίτια με ανοίγματα, ξύλινα παντζούρια, εξώστες, καμπύλα κεραμίδια και διαμορφωμένα οικόπεδα στην πλαγιά. Φωτογραφικά υλικά πέτρας, σοβά, ξύλου και εδάφους.

Χειρισμός: WASD / βέλη, Shift, E για ενέργεια. 1/2/3 κάμερες, P κοντινή όψη χαρακτήρα, B ασπρόμαυρο. Η χρονολογία μένει σταθερή μέχρι να επιλεγεί άλλη. Αριστερό joystick σε οθόνη αφής. Στην κοντινή όψη υπάρχει αλλαγή ανδρικού/γυναικείου μοντέλου.

Οι χρονολογίες, πληθυσμοί, κτίρια, χάρτης και ενδυμασίες είναι ενδεικτικά, όχι τεκμηριωμένη αναπαράσταση του πραγματικού Μουτουλλά. Δεν πρόκειται για έργο Unreal ή φωτογραμμετρία. Δεν περιλαμβάνει τεχνητά ονόματα ως ιστορικά πρόσωπα.

Η Three.js περιλαμβάνεται τοπικά με άδεια MIT. Ανθρώπινα assets MakeHuman και υφές Poly Haven: CC0. Ακριβείς πηγές και άδειες στον φάκελο assets. Δεν περιλαμβάνονται αρχεία γραμματοσειρών. Προαιρετικές γραμματοσειρές Google φορτώνονται online με τοπικό fallback.

Πριν από τη δημοσίευση έγινε πραγματικός έλεγχος Chromium/WebGL και πραγματικές λήψεις του σκηνικού. Ελέγχθηκαν οι διαδρομές, η αποστολή σκάφης, η αποθήκευση, οι κάμερες και η διάταξη αφής. Η εξομοίωση οθόνης κινητού δεν αποτελεί δοκιμή σε φυσικό iPhone ούτε εγγύηση συγκεκριμένου FPS.

Το παιχνίδι χρησιμοποιεί ξεχωριστή τοπική αποθήκευση. Δεν αντικαθιστά τον Μουχτάρη ή άλλο project του repository.
''',encoding='utf-8')
(ROOT/'build-info.json').write_text(json.dumps({'version':'0.4.0','sourcePayloadSha256':EXPECTED,'humanSourceRun':37659873092,'surfaceSourceRun':37661223403,'historicalDataVerified':False,'textures':12,'humanBaseModels':2},indent=2))
print('CHRONICLE 0.4 PACKAGE COMPLETE',flush=True)

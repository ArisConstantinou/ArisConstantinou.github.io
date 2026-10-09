"""Offline rendering: production logic unchanged, only module/asset URLs rebased."""
from pathlib import Path
import re, base64, mimetypes, os
ROOT=Path(os.environ.get('SUMMIT_ROOT',str(Path(__file__).resolve().parents[2])))
def load(page):
 html=(ROOT/'index.html').read_text()
 html=re.sub(r'<script.*?</script>','',html,flags=re.S)
 html=re.sub(r'<link rel="stylesheet" href="([^"]+)"[^>]*>',lambda m:'<style>'+(ROOT/m[1].split('?')[0]).read_text()+'</style>',html)
 page.set_content(html,wait_until='domcontentloaded')
 page.evaluate('window.__SUMMIT_TEST=true;window.__assets={};window.__mods={};')
 for f in (ROOT/'summit/assets').iterdir():
  if f.suffix not in ['.jpg','.glb']:continue
  page.evaluate('''({name,data,type})=>{const str=atob(data),bytes=new Uint8Array(str.length);for(let i=0;i<str.length;i++)bytes[i]=str.charCodeAt(i);__assets[name]=URL.createObjectURL(new Blob([bytes],{type}));}''',dict(name=f.name,data=base64.b64encode(f.read_bytes()).decode(),type=mimetypes.guess_type(f)[0] or 'model/gltf-binary'))
 for f in ['vendor/three.module.js','vendor/utils/BufferGeometryUtils.js','vendor/utils/SkeletonUtils.js','vendor/loaders/GLTFLoader.js','physics.js','world.js','actors.js','input.js','combat052.js','feedback052.js','gum053.js','combat060.js','expedition060.js','save070.js','scenery070.js','ridge070.js','game.js']:
  s=(ROOT/'summit'/f).read_text().replace("new URL('./assets/',import.meta.url)","new URL('https://assets.local/')")
  page.evaluate(r'''({name,code})=>{code=code.replace(/from (['"])([^'"]+)\1/g,(m,q,path)=>{if(path==='three')return `from '${__mods["vendor/three.module.js"]}'`;if(!path.startsWith('.'))return m;const base=name.split('/').slice(0,-1);for(const part of path.split('?')[0].split('/')){if(part==='..')base.pop();else if(part!=='.')base.push(part);}const key=base.join('/');if(!__mods[key])throw Error('Missing module '+key);return `from '${__mods[key]}'`;});__mods[name]=URL.createObjectURL(new Blob([code],{type:'text/javascript'}));}''',dict(name=f,code=s))
 page.evaluate('''async()=>{const T=await import(__mods['vendor/three.module.js']);T.DefaultLoadingManager.setURLModifier(url=>url.startsWith('https://assets.local/')?__assets[url.split('/').pop()]:url);await import(__mods['game.js']);}''')
 page.wait_for_function('!!window.__summit',timeout=60000)

from pathlib import Path
import re,base64,json,mimetypes,os
ROOT=Path(os.environ.get('SUMMIT_ROOT',str(Path(__file__).resolve().parents[2])))
def load(page):
 html=(ROOT/'index.html').read_text()
 html=re.sub(r'<script.*?</script>','',html,flags=re.S)
 html=re.sub(r'<link rel="stylesheet"[^>]*>',lambda m:'<style>'+(ROOT/'summit/style.css').read_text()+'</style>',html)
 page.set_content(html,wait_until='domcontentloaded')
 page.evaluate('window.__SUMMIT_TEST=true;window.__assets={};window.__mods={};')
 print('assets...',flush=True)
 for f in (ROOT/'summit/assets').iterdir():
  if f.suffix not in ['.jpg','.glb']:continue
  page.evaluate('''({name,data,type})=>{const str=atob(data),bytes=new Uint8Array(str.length);for(let i=0;i<str.length;i++)bytes[i]=str.charCodeAt(i);window.__assets[name]=URL.createObjectURL(new Blob([bytes],{type}));}''',{'name':f.name,'data':base64.b64encode(f.read_bytes()).decode(),'type':mimetypes.guess_type(f)[0] or 'model/gltf-binary'})
 print('modules...',flush=True)
 files=['vendor/three.module.js','vendor/utils/BufferGeometryUtils.js','vendor/utils/SkeletonUtils.js','vendor/loaders/GLTFLoader.js','physics.js','world.js','actors.js','input.js','game.js']
 for f in files:
  s=(ROOT/'summit'/f).read_text()
  # Only resource locations change: import specifiers and import.meta asset base.
  s=s.replace("new URL('./assets/',import.meta.url)","new URL('https://assets.local/')")
  page.evaluate(r'''({name,code})=>{code=code.replace(/from (['"])([^'"]+)\1/g,(m,q,path)=>{if(path==='three')return `from '${window.__mods["vendor/three.module.js"]}'`;if(!path.startsWith('.'))return m;const base=name.split('/').slice(0,-1);for(const part of path.split('/')){if(part==='..')base.pop();else if(part!=='.')base.push(part);}const key=base.join('/');if(!window.__mods[key])throw Error('Missing module '+key);return `from '${window.__mods[key]}'`;});window.__mods[name]=URL.createObjectURL(new Blob([code],{type:'text/javascript'}));}''',dict(name=f,code=s))
 page.evaluate('''async()=>{const T=await import(__mods['vendor/three.module.js']);T.DefaultLoadingManager.setURLModifier(url=>url.startsWith('https://assets.local/')?__assets[url.split('/').pop()]:url);await import(__mods['game.js']);}''')
 print('waiting game',flush=True)
 page.wait_for_function('!!window.__summit',timeout=60000)

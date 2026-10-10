from pathlib import Path
import json,re
C=Path(__file__).resolve().parents[1]
M=C.parent/'captain-mayhem'
def rep(s,a,b,count=1):
 if s.count(a)!=count:raise RuntimeError(f'Expected {count} matches: {a[:90]!r}; found {s.count(a)}')
 return s.replace(a,b)
def patch_game(src,dst,prefix):
 s=src.read_text()
 s=f"import {{installMoveStick}} from '{prefix}move-stick185.js?v=185';\n"+s
 s=rep(s,'let touchControl=null,drinkProp=null','let touchControl=null,moveStick=null,drinkProp=null')
 a=s.index(" const pad=$('chaosMove');function padMove(e)")
 b=s.index(' function down(e){',a)
 s=s[:a]+" const pad=$('chaosMove');\n moveStick=installMoveStick({element:pad,enabled:()=>available()&&s.foot&&movementHints.scheme==='touch',onChange:(x,y)=>{stick={x,y:-y};}});\n"+s[b:]
 s=rep(s,'function resetInput(){touchControl?.reset();','function resetInput(){moveStick?.reset();touchControl?.reset();')
 s=rep(s,'function update(dt){touchControl?.sync();','function update(dt){moveStick?.sync();touchControl?.sync();')
 s=rep(s,'*(Math.abs(x)+Math.abs(z)>.1?1:.25)','*Math.min(1,Math.hypot(x,z))')
 s=rep(s,'stick:{...stick},sips:', 'stick:{...stick},movement:moveStick?.inspect(),sips:')
 s=s.replace("escape183.js?v=183","escape185.js?v=185")
 dst.write_text(s)
patch_game(C/'chaos184.js',C/'chaos185.js','./')
patch_game(M/'game.js',M/'game101.js','../captain/')
s=(C/'escape183.js').read_text()
s="import {installMoveStick} from './move-stick185.js?v=185';\n"+s
s=rep(s,'let bottleProp=null,drinkTime=0;','let bottleProp=null,drinkTime=0,moveStick=null;')
s=rep(s,'function resetInput(){keys.clear();','function resetInput(){moveStick?.reset();keys.clear();')
a=s.index(" const pad=$('escapePad');function padMove(e)")
b=s.index("$('escapeUse').onclick=interact;",a)
s=s[:a]+" const pad=$('escapePad');\n moveStick=installMoveStick({element:pad,enabled:()=>allowed()&&touch(),radius:34,travel:30,onChange:(x,z)=>{stick={x,z};}});\n "+s[b:]
s=rep(s,'function update(dt){if(!active)return;','function update(dt){moveStick?.sync();if(!active)return;')
s=rep(s,'inspect:()=>active?{...snapshot(s),','inspect:()=>active?{...snapshot(s),stick:{...stick},movement:moveStick?.inspect(),')
(C/'escape185.js').write_text(s)
s=(C/'main184.js').read_text().replace('./chaos184.js?v=184','./chaos185.js?v=185').replace("version:'1.8.4'","version:'1.8.5'").replace('v1.8.4 · SHIP FIX','v1.8.5 · JOYSTICK FIX')
(C/'main185.js').write_text(s)
s=(M/'main.js').read_text().replace("from './game.js'","from './game101.js?v=185'").replace('MAYHEM 1.0.0','MAYHEM 1.0.1')
s=re.sub(r"\$\('releaseBadge'\)\.textContent='[^']+';","$('releaseBadge').textContent='MAYHEM 1.0.1 · JOYSTICK FIX';",s)
(M/'main101.js').write_text(s)
for folder,old,new,ver in [(C,'./main184.js?v=184','./main185.js?v=185','1.8.5'),(M,'./main.js?v=100','./main101.js?v=185','MAYHEM 1.0.1')]:
 s=(folder/'index.html').read_text();s=rep(s,old,new)
 s=re.sub(r'(<meta name="captain-build" content=")[^"]+',lambda m:m[1]+ver,s)
 if folder==C:s=s.replace('../captain-mayhem/?v=100','../captain-mayhem/?v=185')
 (folder/'index.html').write_text(s)
s=(C/'sw.js').read_text();s=rep(s,"last-call-1.8.4","last-call-1.8.5")
s=rep(s,'const CORE=[','const CORE=["main185.js","chaos185.js","escape185.js","move-stick185.js",')
(C/'sw.js').write_text(s)
for folder,ver in [(C,'1.8.5'),(M,'1.0.1')]:
 meta=json.loads((folder/'release.json').read_text());meta['version']=ver
 meta['inputFix']=['Owned left-stick gesture; neutral on release, cancellation, lost capture, pause and rotation','Native touch identifier fallback independent of other fingers','Radial dead zone; no world translation from idle drunken sway','Existing layout, right camera, actions, save namespaces and story retained']
 (folder/'release.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
print('Generated Story 1.8.5 and Mayhem 1.0.1 movement-release fix; existing game files retained.')

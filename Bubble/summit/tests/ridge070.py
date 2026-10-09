from pathlib import Path
from playwright.sync_api import sync_playwright
from harness070 import load
import os,json,traceback
OUT=Path(os.environ.get('SUMMIT_REPORTS',str(Path(__file__).parent/'reports070')));OUT.mkdir(parents=True,exist_ok=True)
results=[]
def check(name,ok,data=None):
 results.append({'name':name,'pass':bool(ok),'data':data});print(('PASS ' if ok else 'FAIL ')+name+(' '+str(data) if not ok else ''),flush=True)
try:
 with sync_playwright() as pw:
  b=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=False,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-webgl','--ignore-gpu-blocklist'])
  ctx=b.new_context(viewport={'width':1440,'height':900},device_scale_factor=1);page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)));page.on('console',lambda e:errors.append(e.text) if e.type=='error' else None);load(page)
  page.evaluate("async()=>{window.g=__summit.game;window.P=await import(__mods['physics.js']);window.S=await import(__mods['save070.js']);window.T=await import(__mods['vendor/three.module.js']);window.E=await import(__mods['expedition060.js']);g.reset(true);g.renderer.shadowMap.enabled=false;}")
  def run(s):return page.evaluate('()=>{'+s+'}')
  check('Version 0.7.0 boots with both new mechanics and scenery',run('return __summit.version==="0.7.0"&&!!g.journey&&g.journey.scenery.flags.length===5;'))
  check('Two spatial routes each contain three gates, not menu-only choices',run('return g.journey.paths.length===2&&g.journey.paths.every(p=>p.points.length===3&&p.points.every(v=>v.mesh.parent===g.scene));'))
  check('Ridge is narrower and higher than the valley at each stage',run('return g.journey.paths[1].points.every((p,i)=>p.radius<g.journey.paths[0].points[i].radius&&p.y>g.journey.paths[0].points[i].y+30);'))
  check('New canopy posts, roofs and log cover have world collision bounds',run("return ['camp-post','canvas-roof','log-cover'].every(t=>g.world.boxes.some(b=>b.type===t));"))
  check('Neither optional fort storage nor canopy blocks the essential supply exit',run('return g.world.chests.filter(c=>c.main).every(c=>!g.world.blocked(c.x+2.1,c.y,c.z,.42,1.78));'))
  run('g.renderer.shadowMap.enabled=true;g.render(.016)');page.screenshot(path=str(OUT/'camp070.png'));run('g.renderer.shadowMap.enabled=false;')
  # Move continuously through each branch using the actual terrain, envelope and controller.
  for name in ['valley','ridge']:
   data=run("""g.reset(true);const a=g.player,path=g.journey.paths.find(p=>p.name==='"""+name+"""');P.inflate(a);a.vy=0;let time=0;
    for(;time<102&&a.balloon&&!g.journey.routeDone;time+=1/60){const gate=path.points[g.journey.gateIndex],dx=gate.x+gate.normal.x*11-a.x,dz=gate.z+gate.normal.z*11-a.z,d=Math.hypot(dx,dz),yaw=Math.atan2(dx,dz),alt=gate.y-4.45;
     let forward=Math.min(1,d/42);if(Math.abs(alt-a.y)>12&&d<85)forward*=.16;a.yaw=yaw;const control={forward,yaw,up:P.clamp((alt-a.y)*.35-a.vy*.16,-1,1)};
     P.advanceBody(a,control,g.world,1/60,g.time);g.time+=1/60;g.journey.tick(1/60);
    }g.cameraReady=false;g.render(.016);return {time,route:g.journey.selected,done:g.journey.routeDone,index:g.journey.gateIndex,life:a.balloon?.life,max:a.balloon?.maxLife,bonus:g.journey.reinforcement,alive:a.alive,position:[a.x,a.y,a.z]};""")
   check(name+' branch can be flown end-to-end with real terrain collisions',data['done'] and data['route']==name and data['alive'],data)
   check(name+' branch grants the promised bounded reward',data['max']==120 if name=='valley' else data['bonus']==40,data)
   if name=='ridge':page.screenshot(path=str(OUT/'ridge-flight070.png'))
  data=run("const r=g.journey.paths[0].points[0];return E.crossesRing({x:r.x-r.normal.x*40,y:r.y,z:r.z-r.normal.z*40},{x:r.x+r.normal.x*40,y:r.y,z:r.z+r.normal.z*40},r);")
  check('Teleporting across a gate does not satisfy the crossing test',not data)
  data=run("g.reset(true);const a=g.player;P.inflate(a);const before=a.balloon.maxIntegrity;g.journey.reinforcement=40;g.journey.launch();g.journey.launch();return {before,after:a.balloon.maxIntegrity,reserve:g.journey.reinforcement};")
  check('One saved reinforcement applies once to the next balloon',data['after']==data['before']+40 and data['reserve']==0,data)
  data=run("g.reset(true);g.raceStarted=true;g.elapsed=20;const a=g.bodies.find(a=>a.kind==='guard'),p=g.player;p.x=a.x;p.z=a.z+15;p.y=a.y;a.hp=30;a.yaw=0;const d=g.journey.npc(a,.1);return {state:a.tactic,move:d};")
  check('Wounded guards choose physical cover',data['state']=='ΚΑΛΥΨΗ',data)
  data=run("const a=g.bodies[1];a.x=-200;a.z=850;a.y=360;P.inflate(a);a.gum=25;const d=g.journey.npc(a,.1);return {state:a.tactic,destination:a.emergency,command:d};")
  check('Overloaded rival chooses a landing site instead of blindly racing',data['state']=='ΑΝΑΓΚΑΣΤΙΚΗ ΠΡΟΣΓΕΙΩΣΗ' and data['destination'] is not None,data)
  data=run("const a=g.bodies[1];a.balloon=null;a.grounded=true;const before=a.gum;g.journey.npc(a,.5);return {before,after:a.gum,state:a.tactic};")
  check('Grounded emergency rival actually removes gum before relaunch',data['after']<data['before'] and data['state']=='ΚΑΘΑΡΙΖΕΙ ΤΣΙΧΛΑ',data)
  data=run("g.reset(true);const c=g.journey.caches[0],a=g.player;a.x=c.x;a.y=c.y;a.z=c.z+2;a.checkpoint=1;a.target=2;const before=a.bag.slice();g.collect(a);return {before,after:a.bag,claimed:c.claimed};")
  check('Optional storage cannot be collected while its guards remain alive',not data['claimed'] and data['before']==data['after'],data)
  run("for(const a of g.bodies.filter(a=>a.kind==='guard'&&a.site===1))a.alive=false;")
  page.keyboard.press('f');data=run('return {claimed:g.journey.caches[0].claimed,bonus:g.journey.reinforcement,bag:g.player.bag};')
  check('Native F unlocks cleared storage and awards kit plus reinforcement',data['claimed'] and data['bonus']==40 and data['bag']==[6,4,2],data)
  page.keyboard.press('f');check('Repeated collect cannot duplicate fort reward',run('return g.player.bag[0]===6&&g.journey.claimed.size===1;'))
  # Explicit storage adapter: opaque-origin offline harness does not have localStorage.
  run("window.memory=new Map;g.journey.storage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)};g.journey.save();")
  data=run('return S.readSave(g.journey.storage);');check('Valid camp data round-trips through the actual serializer',data['checkpoint']==1 and data['bonus']==40 and data['bag']==[6,4,2],data)
  run('g.player.bag=[0,0,0];g.player.checkpoint=0;g.player.target=1;g.player.y=700;g.player.grounded=false;')
  page.click('#resumeCamp',force=True) if page.locator('#resumeCamp').is_visible() else run('g.journey.resume();')
  data=run('return {checkpoint:g.player.checkpoint,bag:g.player.bag,grounded:g.player.grounded,bonus:g.journey.reinforcement,claimed:g.journey.caches[0].claimed,playing:g.playing()};')
  check('Continue restores last camp and unconsumed reinforcement, not airborne state',data['checkpoint']==1 and data['grounded'] and data['bag']==[6,4,2] and data['bonus']==40 and data['claimed'] and data['playing'],data)
  run('g.collect(g.player);');check('Claimed fort remains claimed after resume',run('return g.journey.caches[0].claimed;'))
  check('Malformed or impossible storage is rejected',run("return [null,{}, {schema:1,checkpoint:99,bag:[3,2,1]}, {...S.readSave(g.journey.storage),bag:[-3,2,1]}].every(s=>S.validateSave(s)===null);"))
  run("g.journey.newRun();");check('New run clears only this game’s camp key',run('return S.readSave(g.journey.storage)===null;'))
  run('g.reset(true);g.player.y=430;P.inflate(g.player);g.player.vy=0;')
  for keys,duration in [(['w'],.8),(['Space'],.8),([],2.5),(['x'],.8)]:
   for key in keys:page.keyboard.down(key)
   run(f'__summit.step({duration});')
   for key in keys:page.keyboard.up(key)
  check('Learning checklist advances through real move/ascent/brake/descent input',run('return g.journey.learned.every(Boolean);'),run('return g.journey.learned;'))
  run("g.action('map');");check('Route map shows both routes without blocking its close control',page.locator('#mapScreen').is_visible());run("g.action('map');")
  run('g.render(.016)');check('No desktop JS or shader errors',not errors,errors)
  ctx.close()
  ctx=b.new_context(viewport={'width':430,'height':932},device_scale_factor=1,has_touch=True,is_mobile=True);page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)));page.on('console',lambda e:errors.append(e.text) if e.type=='error' else None);load(page)
  page.evaluate("async()=>{window.g=__summit.game;window.P=await import(__mods['physics.js']);g.reset(true);g.player.y=430;P.inflate(g.player);g.player.vy=0;g.cameraReady=false;g.render(.016);}")
  for w,h in [(430,932),(430,744),(932,430),(375,667)]:
   page.set_viewport_size({'width':w,'height':h});run('g.render(.016)')
   boxes=[page.locator('#'+id).bounding_box() for id in ['objectiveCard','flightHUD','moveStick','aimStick','upBtn','downBtn']]
   check(f'{w}x{h} core guidance and controls remain inside the screen',all(q and q['x']>=0 and q['y']>=0 and q['x']+q['width']<=w+1 and q['y']+q['height']<=h+1 for q in boxes),boxes)
   check(f'{w}x{h} optional teaching panels do not obscure phone playfield',not page.locator('#pilotLesson').is_visible() and not page.locator('#routeChoice').is_visible())
  page.set_viewport_size({'width':430,'height':932});run('g.render(.016)');page.screenshot(path=str(OUT/'mobile070.png'))
  # A few ordinary animation frames rather than only synthetic step snapshots.
  for i in range(30):run('g.tick(1/60);g.render(1/60);')
  check('Continuous mobile frames retain their WebGL context',run('return !g.renderer.getContext().isContextLost();'))
  check('No mobile JS or shader errors',not errors,errors);b.close()
except Exception as e:
 print(traceback.format_exc(),flush=True);check('Test runner completed',False,str(e))
finally:
 report={'version':'0.7.0','environment':'Real production modules and WebGL renderer; resource/import locations rebased to offline blobs. Chromium/SwiftShader/Xvfb, synthetic touch. Camp save serializer tested with explicit memory storage adapter because offline opaque origin has no localStorage. Not physical iPhone/Safari. Route flight steering is scripted through normal terrain/physics.','passed':sum(r['pass'] for r in results),'total':len(results),'results':results}
 (OUT/'ridge070.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(report['passed'],'/',report['total'],flush=True)

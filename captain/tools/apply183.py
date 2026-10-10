from pathlib import Path
import json
r=Path('captain')
def change(s,a,b):
 if a not in s:raise RuntimeError('Missing integration anchor: '+a[:100])
 return s.replace(a,b)
def load(n):return (r/n).read_text()
def save(n,s):(r/n).write_text(s)
s=load('chaos181.js')
# Remove only the superseded v182 camera-parent bottle and rate-based touch widget.
s=change(s,'<div id="mobileCombatWheel"><div id="combatOuterRing"></div><div id="combatRightStick" role="slider" aria-label="Κάμερα"><i></i><small>ΚΑΜΕΡΑ</small></div><div id="ringFeedback"></div></div>','')
a=s.index(" const wheel=$('mobileCombatWheel')");b=s.index(' const mouse=createDeckMouse(',a);s=s[:a]+s[b:]
a=s.index('function update(dt){');b=s.index('mouse.sync();',a);s=s[:a]+'function update(dt){'+s[b:]
s=s.replace('function reset(){bottleView.visible=false;mouse.release();','function reset(){mouse.release();')
s=s.replace("'./escape181.js?v=181'","'./escape183.js?v=183'").replace("'./ui181.js?v=181'","'./ui183.js?v=183'").replace("'./actors181.js?v=181'","'./actors183.js?v=183'")
s="import {installTouchControls} from './touch183.js?v=183';\nimport {createWhiskyProp} from './whisky183.js?v=183';\n"+s
s=change(s,' const mouse=createDeckMouse(', ' let touchControl=null,drinkProp=null;\n const mouse=createDeckMouse(')
anchor=" bindings();root.addEventListener('schemechange',bindings);"
s=change(s,anchor,anchor+'''
 touchControl=installTouchControls({root,canvas,enabled:()=>available()&&s.foot,onLook:(dx,dy)=>{yaw-=dx;pitch=clamp(pitch+dy,-1.05,1.0);},onAction:name=>{if(name==='grab')grab();else if(name==='throw')throwObject();else if(name==='drink')requestDrink();else doAttack(name);},onBlock:value=>{s.block=value;},status:()=>({canAttack:s.visited&&s.foot,drinking:drinkTime>0,attacking:!!s.attack,attack:s.attack?.kind,held:!!held,drinkReady:getState().drinkCooldown<=0})});
 const helmStatus=document.createElement('div');helmStatus.id='helmStatus183';root.append(helmStatus);
''')
s=change(s,'avatar=createActor(crew,ship.group,{fps:true});avatar.group.visible=false;','avatar=createActor(crew,ship.group,{fps:true});drinkProp=createWhiskyProp(avatar);avatar.group.visible=false;')
s=change(s,'function requestDrink(){if(retaken)return false;if(!available())return true;',"function requestDrink(){if(retaken)return false;if(!available())return true;if(held){onToast('Άφησε πρώτα το αντικείμενο που κρατάς.');return true;}")
s=change(s,'function doAttack(kind){if(!available())return;', 'function doAttack(kind){if(!available()||drinkTime>0)return;')
s=change(s,'function resetInput(){escape?.resetInput();','function resetInput(){touchControl?.reset();escape?.resetInput();')
s=change(s,'function pointerDown(e){if(mouse.down(e))return true;if(escape.active)return escape.pointerDown(e);','function pointerDown(e){if(mouse.down(e))return true;if(escape.active)return escape.pointerDown(e);if(touchControl?.down(e))return true;')
s=change(s,'function pointerMove(e){if(mouse.move(e))return true;','function pointerMove(e){if(mouse.move(e))return true;if(touchControl?.move(e))return true;')
s=change(s,'function pointerUp(e){','function pointerUp(e){touchControl?.end(e);')
s=change(s,'function update(dt){mouse.sync();',"function update(dt){touchControl?.sync();root.dataset.drinking=String(drinkTime>0);if(!s.foot||escape.active||!enabled||retaken)drinkProp?.hide();mouse.sync();")
s=change(s,'avatar.tick(dt,{speed:lastMove,attack:s.attack,block:s.block,drunk,time:s.time,held:!!held,drinking:drinkTime});','avatar.tick(dt,{speed:lastMove,attack:s.attack,block:s.block,drunk,time:s.time,held:!!held,drinking:drinkTime});drinkProp?.update(drinkTime);')
s=change(s,'function reset(){mouse.release();','function reset(){touchControl?.reset();drinkProp?.hide();drinkTime=0;mouse.release();')
s=change(s,'mild=mildMotion()? .18:1',"mild=movementHints.scheme==='touch'?.18:mildMotion()?.18:1")
s=change(s,'chapterHUD.update(s,getState(),target,held,p,nearGuards);',"chapterHUD.update(s,getState(),target,held,p,nearGuards);helmStatus.textContent='🥃 '+Math.round(getState().intox)+'% · ΚΥΤΟΣ '+Math.round(getState().hull)+'%';")
s=change(s,'inspect:()=>({mouse:','inspect:()=>({touch:touchControl?.inspect(),whisky:drinkProp?.inspect(),mouse:')
save('chaos183.js',s)
s=load('actors181.js')
s=change(s,"if(drinking>0){const k=Math.sin(Math.PI*clamp(drinking,0,1));rh=[-.17,1.34+k*.23,.40-k*.20];fist=.65;}","if(drinking>0){const k=Math.sin(Math.PI*clamp(drinking,0,1));lh=[.27,.96,.05];le=[.34,1.15,-.02];rh=[-.23,1.30+k*.22,.38-k*.07];re=[-.40,1.18,.02];fist=.82;}")
save('actors183.js',s)
s=load('escape181.js');s="import {createWhiskyProp} from './whisky183.js?v=183';\n"+s
s=s.replace("'./escape-world181.js?v=181'","'./escape-world183.js?v=183'")
s=s.replace('let grace=4,','let bottleProp=null,drinkTime=0;\n let grace=4,')
s=change(s,'world=createEscapeWorld(ship,getPeople());hipY','world=createEscapeWorld(ship,getPeople());bottleProp=createWhiskyProp(world.player);hipY')
s=s.replace('function start(data){setup();','function start(data){setup();drinkTime=0;').replace('function stop(){active=false;','function stop(){bottleProp?.hide();drinkTime=0;active=false;')
s=s.replace('function retry(){s.caught++;','function retry(){bottleProp?.hide();drinkTime=0;s.caught++;')
s=change(s,'pendingDrink=0;s.intox=Math.max(70,s.intox);','pendingDrink=0;drinkTime=1;grace=Math.max(grace,2);s.intox=Math.max(70,s.intox);')
s=change(s,'if(!allowed()||!s.bottle||pendingDrink>0)return','if(!allowed()||!s.bottle||pendingDrink>0||drinkTime>0)return')
s=s.replace("$('escapeDrink').disabled=pendingDrink>0;","$('escapeDrink').disabled=drinkTime>0;")
s=change(s,'drinking:pendingDrink>0?.5:0,crouch:s.crouch});','drinking:drinkTime,crouch:s.crouch&&drinkTime<=0});bottleProp?.update(drinkTime);')
s=change(s,'s.time+=dt;stageTimer+=dt;','s.time+=dt;stageTimer+=dt;drinkTime=Math.max(0,drinkTime-dt*.75);')
s=change(s,'grace,assisted:true,','grace,whisky:bottleProp?.inspect(),assisted:true,')
save('escape183.js',s)
s=load('escape-world181.js').replace("'./actors181.js?v=181'","'./actors183.js?v=183'");save('escape-world183.js',s)
s=load('ui181.js');s=change(s,"const touch=movement.scheme==='touch';","const touch=movement.scheme==='touch';leave.querySelector('strong').textContent=touch?'ΕΞΟΔΟΣ':'ΒΓΕΣ ΑΠΟ ΤΗ ΓΕΦΥΡΑ';")
s=s.replace('Τα τέσσερα μεγάλα κουμπιά δεξιά είναι τα χτυπήματα.','Σύρε στο κέντρο του κύκλου για ματιά. Σταμάτα το δάχτυλο για να σταματήσει η κάμερα. Άγγιξε τον εξωτερικό δακτύλιο για χτύπημα· σύρε πάνω του για επιλογή και άφησε.');save('ui183.js',s)
s=load('main181.js').replace("'./chaos181.js?v=181'","'./chaos183.js?v=183'").replace("version:'1.8.2'","version:'1.8.3'").replace('v1.8.2 · TOUCH RING','v1.8.3 · TOUCH FIX')
s=change(s,'fx.material.uniforms.uIntox.value=(state.intox/100)*(mildMotion?.22:1);','fx.material.uniforms.uIntox.value=(state.intox/100)*(mobile&&chapter?.foot?.20:mildMotion?.22:1);')
s=s.replace('audio:()=>audio, say:', 'project:xyz=>new THREE.Vector3(...xyz).project(camera).toArray(),audio:()=>audio, say:');save('main183.js',s)
s=load('index.html').replace('content="1.8.2"','content="1.8.3"').replace('src="./main181.js?v=182"','src="./main183.js?v=183"').replace('<link rel="stylesheet" href="./ring182.css?v=182">','<link rel="stylesheet" href="./touch183.css?v=183">');save('index.html',s)
s=load('sw.js').replace('last-call-1.8.2','last-call-1.8.3');s=s.replace('const CORE=[','const CORE=["main183.js","chaos183.js","actors183.js","escape183.js","escape-world183.js","touch183.js","touch183.css","whisky183.js","ui183.js",');save('sw.js',s)
s=load('touch183.js');s=s.replace('if(pause)pause.append(settings);',"if(pause){pause.append(settings);const profile=document.createElement('button');profile.className='setting-button';profile.textContent='Ο καπετάνιος · προβολή χαρακτήρα';profile.onclick=()=>document.getElementById('captainIdentityButton')?.click();pause.append(profile);}")
save('touch183.js',s)
save('release.json',json.dumps({'version':'1.8.3','changes':['Compact mobile bridge HUD; no combat panels at helm','Fixed ring with relative drag camera: stationary finger stops view, no input mixing','World-rendered whisky attached to animated palm, on deck and in escape','One-sip 70% escape retained'],'preserved':['Portrait','Mouse and WASD on desktop','Jail progression and checkpoints']},indent=2)+'\n')
print('Prepared Captain 1.8.3 from the existing 1.8.2 source')

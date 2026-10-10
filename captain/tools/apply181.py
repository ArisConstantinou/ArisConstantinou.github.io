from pathlib import Path
import re,json
r=Path('captain')
def change(s,a,b):
 if a not in s:raise RuntimeError('Missing anchor: '+a[:100])
 return s.replace(a,b)
def load(name):return (r/name).read_text()
def save(name,s): (r/name).write_text(s)
s=load('actors172.js');s="import {installCrouchPose} from './pose181.js?v=181';\n"+s
s=change(s,"const bases=new Map();const snapshot=()=>{for(const [n,b]of bones)bases.set(n,b.quaternion.clone());};snapshot();", "const bases=new Map(),positions=new Map();const snapshot=()=>{for(const [n,b]of bones){bases.set(n,b.quaternion.clone());positions.set(n,b.position.clone());}};snapshot();const crouchPose=installCrouchPose(group,bones);")
s=change(s,'drinking=0,sitting=false','drinking=0,sitting=false,crouch=false')
s=change(s,'for(const [n,bq]of bases)bones.get(n).quaternion.copy(bq);','for(const [n,bq]of bases){bones.get(n).quaternion.copy(bq);bones.get(n).position.copy(positions.get(n));}')
s=change(s,"const wanted=sitting&&actions.sit?'sit':speed>.15?'walk':'idle';","const wanted=crouch?'idle':sitting&&actions.sit?'sit':speed>.15?'walk':'idle';")
s=change(s,'setFingers(fist);group.updateWorldMatrix(true,true);','setFingers(fist);group.updateWorldMatrix(true,true);crouchPose(dt,crouch,speed);')
s=change(s,'return {group,model,bones,mixer',"return {poseInfo:()=>Object.fromEntries(['hips','head','lefthand','righthand','leftfoot','rightfoot'].map(n=>[n,group.worldToLocal(bones.get(n).getWorldPosition(new T.Vector3())).toArray()])),group,model,bones,mixer")
save('actors181.js',s)
s=load('escape-model180.js')
s=change(s,'r=.27','r=.34')
s=change(s,'(crouch?4.6:6.5)','(crouch?3.3:4.6)')
s=change(s,'speed:1.12','speed:.86').replace('speed:1.18','speed:.90').replace('speed:.98','speed:.78')
s=change(s,"s.checkpoint=s.card?'card':'cell';", "s.checkpoint=s.bottle?'store':s.card?'card':data.checkpoint==='laundry'?'laundry':'cell';")
save('escape-model181.js',s)
s=load('escape-world180.js').replace("'./actors172.js'","'./actors181.js?v=181'").replace("'./escape-model180.js'","'./escape-model181.js?v=181'")
s=change(s,'box(2,.08,.8,M.metal,0,.89,0,g);box(.07,.9,.65,M.gold,-.94,.45,0,g);box(.07,.9,.65,M.gold,.94,.45,0,g);','box(2,.08,.8,M.metal,0,1.36,0,g);box(.07,1.36,.65,M.gold,-.94,.68,0,g);box(.07,1.36,.65,M.gold,.94,.68,0,g);')
s=change(s,'box(.028,.84,.09,M.metal,x,.44,0,g)','box(.028,1.3,.09,M.metal,x,.65,0,g)')
save('escape-world181.js',s)
s=load('escape180.js').replace("'./escape-world180.js'","'./escape-world181.js?v=181'").replace("'./escape-model180.js'","'./escape-model181.js?v=181'")
s=change(s,'const touch=()=>',"let grace=4,autoCrouch=false,trail=null,trailAt=-10;\n const touch=()=>")
s=change(s,'stageTimer=0;pendingDrink=0;lastUI=-10;', 'stageTimer=0;grace=4;autoCrouch=false;trailAt=-10;pendingDrink=0;lastUI=-10;')
s=change(s,"s.position=s.card?{x:3.4,z:11.5}:{...START};", "s.position=s.bottle?{x:-4.5,z:12}:s.card?{x:6.0,z:7.2}:s.checkpoint==='laundry'?{x:-4.0,z:15.1}:{...START};grace=5;autoCrouch=false;")
s=change(s,"s.bottle=true;world.whisky", "s.bottle=true;s.checkpoint='store';world.whisky")
a=s.index(' function animateCaptain(');b=s.index(' function tickGuard(',a)
s=s[:a]+''' function animateCaptain(dt,speed){
  const actor=world.player;actor.group.position.set(s.position.x,0,s.position.z);actor.group.rotation.set(0,s.yaw,0);
  actor.tick(dt,{speed,drunk:s.intox/100,time:s.time,held:!!s.held,drinking:pendingDrink>0?.5:0,crouch:s.crouch});
 }
'''+s[b:]
s=change(s,"s.stage==='escape'&&canSee", "s.stage==='escape'&&grace<=0&&canSee")
s=change(s,'(s.crouch?31:45):-26', '(s.crouch?12:20):-30')
s=change(s,"if(sees){g.mode='search';", "if(sees&&g.suspect>=55){g.mode='search';")
s=change(s,'g.wait=.6;', 'g.wait=2.0;')
s=change(s,'r=6.5,count=22', 'r=4.6,count=22')
s=change(s,'s.time+=dt;stageTimer+=dt;', 's.time+=dt;stageTimer+=dt;grace=Math.max(0,grace-dt);')
s=change(s,"speed=s.crouch?1.22:2.2;const before", "speed=s.crouch?1.40:2.50;\n  const next={x:s.position.x+dx/len*.25,z:s.position.z+dz/len*.25};if(s.hatch&&!s.crouch&&inside(next,LOW,.38)){s.crouch=true;autoCrouch=true;msg('Σκύβεις αυτόματα για τη χαμηλή θυρίδα.',2.2);}if(autoCrouch&&!inside(s.position,LOW,.55)){s.crouch=false;autoCrouch=false;}\n  const before")
s=change(s,"nearest=nearestAction();if(s.time>msgUntil)","if(s.checkpoint==='cell'&&s.position.z<19&&s.position.z>14&&s.position.x<-2.4){s.checkpoint='laundry';msg('ΣΗΜΕΙΟ ΕΛΕΓΧΟΥ · Βγήκες από το κελί. Ακολούθησε τα φωτεινά σημάδια.',5);save();}nearest=nearestAction();if(s.time>msgUntil)")
s=change(s,'s.crouch=!s.crouch;updateUI();', 's.crouch=!s.crouch;autoCrouch=false;updateUI();')
s=change(s,"['Digit8','Numpad8']", "['KeyR','Digit8','Numpad8']").replace("['Digit9','Numpad9']", "['KeyZ','Digit9','Numpad9']")
s=s.replace('<kbd>8</kbd>','<kbd>R</kbd>').replace('<kbd>9</kbd>','<kbd>Z</kbd>').replace('8 ρίψη','R ρίψη').replace('πάτησε 8','πάτησε R')
s=change(s,"if(s.position.z>19.5&&s.position.x<-2)return ['ΠΕΡΑΣΕ ΣΚΥΦΤΟΣ.','Πάτησε ΣΚΥΨΕ και προχώρα κάτω από το πλαίσιο.','hatch'];", "if(s.position.z>19.1&&s.position.x<-2)return ['ΠΕΡΑΣΕ ΑΠΟ ΤΗ ΘΥΡΙΔΑ.','Προχώρα στο άνοιγμα — σκύβεις αυτόματα.','laundry'];if(!s.card&&s.position.x<-2.3&&s.position.z>14)return ['ΒΓΕΣ ΣΤΟΝ ΔΙΑΔΡΟΜΟ.','Ακολούθησε τα φωτεινά σημάδια. Το πλήρωμα αργεί να σε αναγνωρίσει.','hall'];")
s=change(s,"$('escapeDetail').textContent=detail;", "$('escapeDetail').textContent=detail;ui.dataset.assisted='true';")
s=change(s,'goal=HOTSPOTS.find(h=>h.id===id),mark=', 'goal=guideGoal(id),mark=')
s=change(s,'cameraReady=true;const id=', 'cameraReady=true;updateTrail();const id=')
a=s.index(' function pointAt(')
s=s[:a]+''' function guideGoal(id){return id==='laundry'?{x:-4.5,z:18.9}:id==='hall'?{x:-1.1,z:17.0}:HOTSPOTS.find(h=>h.id===id);}
 function updateTrail(){
  if(!world||s.stage!=='escape')return;if(!trail){trail=new T.InstancedMesh(new T.CircleGeometry(.09,10),new T.MeshBasicMaterial({color:0x83dbcf,transparent:true,opacity:.75,depthWrite:false}),36);trail.frustumCulled=false;world.root.add(trail);}
  if(s.time-trailAt<.55)return;trailAt=s.time;const goal=guideGoal(objective()[2]);let dest={x:goal.x,z:goal.z};
  if(goal.id==='card')dest={x:5,z:10};if(goal.id==='whisky')dest={x:-4.7,z:8.1};
  const route=path(s.position,dest,solids,true),dummy=new T.Object3D();let count=0;
  for(const node of route){if(count>=36)break;dummy.position.set(node.x,.033,node.z);dummy.rotation.x=-Math.PI/2;dummy.updateMatrix();trail.setMatrixAt(count++,dummy.matrix);}trail.count=count;trail.instanceMatrix.needsUpdate=true;
 }
'''+s[a:]
s=change(s,'nearest:nearest?.id||null,guards:', 'nearest:nearest?.id||null,grace,assisted:true,pose:world.player.poseInfo(),guide:guideGoal(objective()[2]),guards:')
save('escape181.js',s)
s=load('chaos180.js').replace("'./escape180.js?v=180'","'./escape181.js?v=181'").replace("'./ui180.js?v=180'","'./ui181.js?v=181'").replace("'./actors172.js'","'./actors181.js?v=181'")
s="import {createDeckMouse} from './mouse181.js?v=181';\n"+s
extra=''' const mouse=createDeckMouse({canvas,root,enabled:()=>available()&&s.foot,onLook:(dx,dy)=>{yaw-=Math.max(-350,Math.min(350,dx))*.003;pitch=clamp(pitch+Math.max(-350,Math.min(350,dy))*.0025,-1.05,1.0);},onAttack:doAttack,onReset:resetInput,onMessage:onToast});
 function bindings(){
  const map={'[data-attack=slap]':'M1','[data-attack=heavy]':'Q','[data-attack=punch]':'M2','[data-attack=kick]':'E','[data-attack=spit]':'G','#chaosBlock':'C','#chaosGrab':'X','#chaosThrow':'R','#chaosDrink':'Z'};
  for(const [sel,key] of Object.entries(map)){const el=root.querySelector(sel),badge=el?.querySelector('kbd');if(badge)badge.textContent=key;}
  if(movementHints.scheme!=='touch')$('chaosTutorial').textContent='WASD · Ποντίκι: ματιά · M1 χαστούκι / M2 γροθιά · TAB δείκτης';
 }
 bindings();root.addEventListener('schemechange',bindings);
'''
s=change(s,' function available(){',extra+' function available(){')
s=change(s,'function down(e){if(escape.active)','function down(e){if(mouse.key(e))return true;if(escape.active)')
s=change(s,'keys.add(e.code);const num=', "keys.add(e.code);if(e.code==='KeyZ'&&!e.repeat){requestDrink();return true;}if(s.foot){const attacks={KeyQ:'heavy',KeyE:'kick',KeyG:'spit'};if(attacks[e.code]){if(!e.repeat)doAttack(attacks[e.code]);return true;}if(e.code==='KeyC'){s.block=true;return true;}if(e.code==='KeyX'){if(!e.repeat)grab();return true;}if(e.code==='KeyR'){if(!e.repeat)throwObject();return true;}}const num=")
s=change(s,"['Digit6','Numpad6'].includes(e.code)","['KeyC','Digit6','Numpad6'].includes(e.code)")
s=change(s,'function pointerDown(e){if(escape.active)', 'function pointerDown(e){if(mouse.down(e))return true;if(escape.active)')
s=change(s,'function pointerMove(e){if(escape.active)', 'function pointerMove(e){if(mouse.move(e))return true;if(escape.active)')
s=change(s,'function update(dt){if(!enabled||retaken)return;', 'function update(dt){mouse.sync();if(!enabled||retaken)return;')
s=change(s,'function setPhase(phase){s.phase=phase;', "function setPhase(phase){s.phase=phase;if(!s.foot||['cell','escape','arrested'].includes(phase))mouse?.release();")
s=change(s,'function reset(){', 'function reset(){mouse.release();')
s=change(s,'return {update,cameraUpdate,', 'return {releaseMouse:()=>mouse.release(),update,cameraUpdate,')
s=change(s,'inspect:()=>({', 'inspect:()=>({mouse:mouse.inspect(),look:{yaw,pitch},')
s=s.replace('Πέτα ή άφησε το αντικείμενο (8 / 7).','Πέτα ή άφησε το αντικείμενο (R / X).').replace(' · 8 για ρίψη',' · R για ρίψη')
save('chaos181.js',s)
s=load('ui180.js')
s=s.replace('σύρε το ποντίκι για ματιά','ποντίκι για ματιά · TAB δείκτης').replace('1–4 χτυπήματα · 9 ποτό · 7/8 αντικείμενα','M1 / M2 χτυπήματα · Q / E βαρύ χτύπημα / κλωτσιά').replace('κράτα 6 για μπλοκ','κράτα C για μπλοκ').replace('9 για μία γουλιά','Z για μία γουλιά')
s=s.replace('/^(Key[WASDFEV]|Digit', '/^(Key[WASDFEVQRCXZG]|Digit')
save('ui181.js',s)
s=load('main180.js').replace("'./chaos180.js?v=180'","'./chaos181.js?v=181'")
s=s.replace("version:'1.8.0'", "version:'1.8.1'").replace('v1.8.0 · ESCAPE','v1.8.1 · CONTROL')
s=change(s,'paused=value;chapter?.resetInput();', 'paused=value;chapter?.releaseMouse();chapter?.resetInput();')
save('main181.js',s)
s=load('index.html').replace('content="1.8.0"','content="1.8.1"').replace('main180.js?v=180','main181.js?v=181');s=s.replace('</head>','<link rel="stylesheet" href="./controls181.css?v=181">\n</head>');save('index.html',s)
s=load('sw.js').replace('last-call-1.8.0','last-call-1.8.1');s=s.replace('const CORE=[','const CORE=["main181.js","chaos181.js","actors181.js","pose181.js","mouse181.js","ui181.js","escape181.js","escape-world181.js","escape-model181.js","controls181.css",');save('sw.js',s)
save('release.json',json.dumps({'version':'1.8.1','changes':['Character-space crouch IK; bounded body with no sideways pelvis displacement','Desktop mouse look, M1 slap/M2 punch, Q E F R C X Z G nearby bindings','Gentler guard recognition, automatic low-passage crouch, navigation dots and more checkpoints'],'preserved':['Mobile touch-only controls','Existing chapter one, jail continuation, saves and helm']},indent=2)+'\n')
print('Applied Captain 1.8.1')

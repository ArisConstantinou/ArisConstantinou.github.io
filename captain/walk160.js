import * as THREE from 'three';
import {clone as cloneSkeleton} from 'three/addons/utils/SkeletonUtils.js';
export function createWalkMode({ship,camera,hud,getPeople,getState,onMessage,onDialogue}){
 const zone=ship.deckZones.find(z=>z.name==='port-promenade');
 const root=document.createElement('div');root.id='walkMode';root.innerHTML='<div class="walk-top"><button id="walkToggle">🚶 ΒΓΕΣ ΣΤΟ ΚΑΤΑΣΤΡΩΜΑ</button><span id="walkStatus"></span></div><div id="walkPad"><div id="walkStick"></div></div><button id="walkInteract">ΜΙΛΑ</button><div id="walkHint"></div>';
 hud.append(root);
 const toggle=root.querySelector('#walkToggle'),pad=root.querySelector('#walkPad'),stick=root.querySelector('#walkStick'),interact=root.querySelector('#walkInteract'),hint=root.querySelector('#walkHint'),status=root.querySelector('#walkStatus');
 let active=false,avatar=null,joystick={x:0,y:0},pointer=null,near=null,cooldown=0,steps=0;
 const p=new THREE.Vector3(-10.45,zone.y,-27),v=new THREE.Vector3(),cameraPos=new THREE.Vector3(),target=new THREE.Vector3();
 const phrases=['Καπετάνιε, όλα καλά στη γέφυρα;','Είναι ασφαλές να ταξιδεύουμε έτσι;','Πού είναι το εστιατόριο;','Τι όμορφη θέα!','Καπετάνιε, προσέχετε τα κύματα!','Νομίζω ότι το πλοίο γέρνει!'];
 function makeAvatar(){
  const speaker=getPeople()?.getSpeakers().find(s=>s.status==='onboard');
  if(!speaker)return;
  avatar=cloneSkeleton(speaker.group);avatar.name='Playable captain';
  avatar.traverse(o=>{if(o.isMesh){o.castShadow=true;o.frustumCulled=false;}});
  avatar.position.copy(p);avatar.rotation.y=0;ship.group.add(avatar);
 }
 function enter(){
  if(!avatar)makeAvatar();
  if(!avatar){onMessage('Οι επιβάτες φορτώνουν ακόμη.');return;}
  active=true;p.set(-10.45,zone.y,-27);avatar.position.copy(p);avatar.visible=true;
  root.classList.add('walking');toggle.textContent='⚓ ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΓΕΦΥΡΑ';onMessage('Περπάτα με το joystick και πλησίασε επιβάτες. Το πλοίο συνεχίζει να ταξιδεύει!');
 }
 function exit(){active=false;if(avatar)avatar.visible=false;root.classList.remove('walking');toggle.textContent='🚶 ΒΓΕΣ ΣΤΟ ΚΑΤΑΣΤΡΩΜΑ';joystick.x=joystick.y=0;stick.style.transform='translate(0,0)';}
 toggle.addEventListener('click',()=>active?exit():enter());
 function movePad(e){const b=pad.getBoundingClientRect(),cx=b.left+b.width/2,cy=b.top+b.height/2;joystick.x=THREE.MathUtils.clamp((e.clientX-cx)/(b.width*.34),-1,1);joystick.y=THREE.MathUtils.clamp((e.clientY-cy)/(b.height*.34),-1,1);stick.style.transform='translate('+joystick.x*34+'px,'+joystick.y*34+'px)';}
 pad.addEventListener('pointerdown',e=>{if(!active)return;e.preventDefault();pointer=e.pointerId;pad.setPointerCapture(pointer);movePad(e);});
 pad.addEventListener('pointermove',e=>{if(e.pointerId===pointer)movePad(e);});
 for(const name of ['pointerup','pointercancel','lostpointercapture'])pad.addEventListener(name,e=>{if(e.pointerId!==pointer)return;pointer=null;joystick.x=joystick.y=0;stick.style.transform='translate(0,0)';});
 function nearest(){let best=null,dist=3.3;for(const s of getPeople()?.getSpeakers()||[]){if(s.status!=='onboard'&&s.status!=='rescued')continue;const q=s.group.position,d=Math.hypot(q.x-p.x,q.z-p.z);if(d<dist){best=s;dist=d;}}return best;}
 function talk(){if(!active||!near||cooldown>0)return;cooldown=3;const line=phrases[(near.id+Math.floor(steps/8))%phrases.length];onMessage('Επιβάτης: '+line);onDialogue(near.id,line);getPeople()?.react(near.id,'warning',2);}
 interact.addEventListener('click',talk);
 window.addEventListener('keydown',e=>{if(e.code==='KeyF'&&active){e.preventDefault();talk();}if(e.code==='KeyG'){e.preventDefault();active?exit():enter();}});
 function update(dt,time,intox,keys){
  if(!active)return;
  cooldown=Math.max(0,cooldown-dt);
  const mx=joystick.x+(keys.has('KeyD')?1:0)-(keys.has('KeyA')?1:0),mz=-joystick.y+(keys.has('KeyW')?1:0)-(keys.has('KeyS')?1:0);
  v.set(mx,0,mz);if(v.lengthSq()>1)v.normalize();
  const wobble=(intox/100)*Math.sin(time*3.2)*.43;
  const speed=(intox>65?1.45:2.5)*dt;
  const nx=THREE.MathUtils.clamp(p.x+(v.x+wobble)*speed,zone.minX+.26,zone.maxX-.26);
  const nz=THREE.MathUtils.clamp(p.z+v.z*speed,zone.minZ+.6,zone.maxZ-.6);
  let blocked=false;
  for(const s of getPeople()?.getSpeakers()||[]){if(s.status!=='onboard')continue;const q=s.group.position;if(Math.hypot(nx-q.x,nz-q.z)<.7){blocked=true;break;}}
  if(!blocked){p.x=nx;p.z=nz;}steps+=v.length()*speed;
  avatar.position.copy(p);
  if(v.lengthSq()>.02){const targetYaw=Math.atan2(v.x,v.z);avatar.rotation.y+=Math.atan2(Math.sin(targetYaw-avatar.rotation.y),Math.cos(targetYaw-avatar.rotation.y))*Math.min(1,dt*8);}
  avatar.rotation.z=Math.sin(time*2.5)*(intox/100)*.16;avatar.position.y=zone.y+(v.length()>.05?Math.sin(time*10)*.035:0);
  near=nearest();interact.disabled=!near;interact.textContent=near?'💬 ΜΙΛΑ':'ΠΛΗΣΙΑΣΕ ΕΠΙΒΑΤΗ';status.textContent=intox>65?'ΖΑΛΙΣΜΕΝΟΣ ΚΑΠΕΤΑΝΙΟΣ':'ΚΑΤΑΣΤΡΩΜΑ';hint.textContent=near?'Επιβάτης κοντά σου · πάτησε ΜΙΛΑ':'Περπάτα στο αριστερό κατάστρωμα';
 }
 function updateCamera(dt){
  if(!active)return false;
  const a=new THREE.Vector3(p.x-4.5,p.y+3.7,p.z-6.2),b=new THREE.Vector3(p.x,p.y+1.5,p.z+2.8);
  ship.group.localToWorld(a);ship.group.localToWorld(b);camera.position.lerp(a,1-Math.exp(-dt*8));camera.up.set(0,1,0);camera.lookAt(b);camera.fov=innerHeight>innerWidth?66:58;camera.updateProjectionMatrix();camera.updateMatrixWorld();return true;
 }
 function reset(){exit();p.set(-10.45,zone.y,-27);}
 return {get active(){return active;},update,updateCamera,reset,enter,exit,inspect:()=>({active,position:{x:p.x,y:p.y,z:p.z},near:near?.id??null})};
}

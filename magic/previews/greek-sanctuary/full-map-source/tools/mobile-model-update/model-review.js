import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {loadCharacters,createCharacter} from '../../game/src/characters.js';
import {loadBossCharacters,createBossCharacter} from '../../game/src/boss-characters.js';
import {configureRigSurfacePreparation,prepareRigSurface} from '../../game/src/rig-surface-preparation.js';
const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
const viewHeight=()=>Math.max(240,innerHeight-(innerWidth<600?230:160));
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(innerWidth,viewHeight());renderer.setClearColor(0x282e36);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;document.body.prepend(renderer.domElement);
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(36,innerWidth/viewHeight(),.05,100);camera.position.set(2,1.6,5.7);
configureRigSurfacePreparation({renderer,scene,camera});
const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,1.05,0);controls.enableDamping=true;
scene.add(new THREE.HemisphereLight(0xddeaff,0x86745b,2));for(const [p,power]of [[[2,4,5],3],[[-3,2,-3],2]]){const light=new THREE.DirectionalLight(0xffffff,power);light.position.set(...p);scene.add(light);}
const floor=new THREE.Mesh(new THREE.PlaneGeometry(30,30),new THREE.MeshStandardMaterial({color:0x353d47,roughness:1}));floor.rotation.x=-Math.PI/2;floor.position.y=-.015;scene.add(floor);
const grid=new THREE.GridHelper(12,24,0x5d6d80,0x444f5d);grid.position.y=-.01;scene.add(grid);
const unit=document.querySelector('#unit'),clip=document.querySelector('#clip'),status=document.querySelector('#status'),pause=document.querySelector('#pause');
let actor,kind,time=0,playing=true,last=performance.now(),selected='Idle',loading=false;const errors=[],frameTimes=[];
window.addEventListener('error',e=>errors.push(e.message));window.addEventListener('unhandledrejection',e=>errors.push(String(e.reason)));
const modes={archer:['Idle','Walking_A','Running_A','2H_Ranged_Aiming','2H_Ranged_Shoot','Reload','Hit_A','Death_B'],warden:['Idle','Walking_A','Running_A','2H_Melee_Attack_Chop','PoleaxeSweep','Hit_A','Death_B'],gargoyle:['Idle','Walk','Hover','Dive','Claw','Stagger','Death']};
let directAction;
async function select(next){
 if(loading)return;loading=true;status.textContent='Φόρτωση μοντέλου…';
 try{if(next==='gargoyle')await loadBossCharacters(['gargoyle']);else await loadCharacters(()=>{},[next]);
 actor?.dispose();kind=next;actor=kind==='gargoyle'?createBossCharacter(kind):createCharacter(kind);scene.add(actor.group);
 const h=kind==='gargoyle'?3.2:1.85;controls.target.set(0,h*.52,0);camera.position.set(h*.65,h*.75,h*(kind==='gargoyle'?3.6:2.9));controls.update();
 await prepareRigSurface(actor.model);unit.value=kind;clip.innerHTML=modes[kind].map(n=>`<option>${n}</option>`).join('');selected=clip.value;time=0;directAction=null;status.textContent='Σύρε για περιστροφή · τσίμπημα για zoom';
 }finally{loading=false;}
}
function pose(dt){
 if(!actor)return;
 if(kind==='gargoyle'){const duration=actor.clips.get(selected).duration,t=selected==='Death'?Math.min(time,duration):time%duration;actor.update(dt,{clip:selected,time:t,dead:selected==='Death',stunned:selected==='Stagger',flying:selected==='Hover'||selected==='Dive'&&t>.4&&t<1.8,grounded:false,camera});return;}
 // Review original exported clips at exact time without gait/IK concealing defects.
 const mixer=actor.__reviewMixer??=new THREE.AnimationMixer(actor.model),clips=actor.__reviewClips;
 if(clips){if(directAction?.getClip().name!==selected){mixer.stopAllAction();directAction=mixer.clipAction(clips.find(c=>c.name===selected));directAction.setLoop(selected==='Death_B'?THREE.LoopOnce:THREE.LoopRepeat);directAction.clampWhenFinished=true;directAction.play();}directAction.time=selected==='Death_B'?Math.min(time,directAction.getClip().duration):time%directAction.getClip().duration;mixer.update(0);}
 else actor.update(dt,{moving:/Walk|Run/.test(selected),speed:selected==='Running_A'?3.3:1.6,attack:/Shoot|Chop/.test(selected),dead:selected==='Death_B',stunned:selected==='Hit_A',grounded:false,camera});
 actor.model.updateMatrixWorld(true);actor.rigLod?.update(camera);
}
// Original clips are loaded through the same decoder as gameplay; exposed by
// the actor solely for deterministic pose review and regression capture.
unit.onchange=()=>select(unit.value).catch(e=>{status.textContent=e.message;errors.push(e.message);});clip.onchange=()=>{selected=clip.value;time=0;directAction=null;};pause.onclick=()=>{playing=!playing;pause.textContent=playing?'Παύση':'Κίνηση';};
addEventListener('resize',()=>{camera.aspect=innerWidth/viewHeight();camera.updateProjectionMatrix();renderer.setSize(innerWidth,viewHeight());});
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(playing)time+=dt;controls.update();pose(dt);renderer.render(scene,camera);if(frameTimes.length<600)frameTimes.push(dt*1000);requestAnimationFrame(frame);}requestAnimationFrame(frame);
window.__MODEL_REVIEW__={select,pose:(name,t)=>{selected=name;clip.value=name;time=t;playing=false;pose(0);renderer.render(scene,camera);},get actor(){return actor;},camera,renderer,scene,controls,snapshot:()=>({kind,selected,time,loading,errors,draw:renderer.info.render,memory:renderer.info.memory,frameTimes,animation:actor?.group.userData.animationState})};
select(new URL(location.href).searchParams.get('unit')||'archer').catch(e=>{status.textContent=e.message;errors.push(e.message);});

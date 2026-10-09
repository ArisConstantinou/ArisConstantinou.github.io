/** Inspect the same fully rigged captain used for the FPS limbs, without changing gameplay. */
import * as T from 'three';
import {createActor} from './actors172.js';
export function installIdentityPanel({template,pauseGame}){
 const host=document.createElement('section');host.id='captainProfile';host.hidden=true;host.setAttribute('role','dialog');host.setAttribute('aria-modal','true');host.setAttribute('aria-labelledby','captainProfileTitle');
 host.innerHTML=`<div class="captain-profile-card"><button id="closeCaptainProfile" aria-label="Επιστροφή στο παιχνίδι">✕</button><div class="profile-scene"><canvas id="captainPortrait" aria-label="Πλήρες τρισδιάστατο μοντέλο καπετάνιου"></canvas><small>ΣΥΡΕ ΓΙΑ ΠΕΡΙΣΤΡΟΦΗ</small></div><div class="profile-copy"><span>MS AURORA / ΠΛΟΙΑΡΧΟΣ</span><h2 id="captainProfileTitle">Ο ΚΑΠΕΤΑΝΙΟΣ.</h2><p>Λευκή στολή, τέσσερις χρυσές ρίγες, καπέλο πλοιάρχου και ανθρώπινα χέρια. Αυτός είναι ο χαρακτήρας που ελέγχεις.</p><p class="profile-note">Τα ίδια χέρια, μανίκια και κόκαλα κινούνται και στην κάμερα πρώτου προσώπου.</p><div class="profile-demo"><button data-pose="idle">ΗΡΕΜΙΑ</button><button data-pose="slap">ΧΑΣΤΟΥΚΙ</button><button data-pose="punch">ΓΡΟΘΙΑ</button></div><button id="returnFromProfile">ΕΠΙΣΤΡΟΦΗ ΣΤΟ ΠΑΙΧΝΙΔΙ</button></div></div>`;
 document.body.append(host);
 const button=document.createElement('button');button.id='captainIdentityButton';button.textContent='V · ΚΑΠΕΤΑΝΙΟΣ';button.title='Δες τον πλήρη 3D καπετάνιο (V)';document.querySelector('.game-brand').append(button);
 const intro=document.createElement('button');intro.id='introCaptainIdentity';intro.className='tiny-button';intro.textContent='ΓΝΩΡΙΣΕ ΤΟΝ ΚΑΠΕΤΑΝΙΟ';document.querySelector('.intro-copy').append(intro);
 let previewFrames=0;let renderer,scene,camera,actor,restore=null,open=false,lastTime=0,time=0,angle=.12,drag=null,attack=null,raf=null,previousFocus=null;
 const canvas=host.querySelector('canvas');
 function build(){
  renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'low-power'});renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  scene=new T.Scene();camera=new T.PerspectiveCamera(34,1,.05,20);camera.position.set(0,1.24,3.8);camera.lookAt(0,.99,0);
  scene.add(new T.HemisphereLight(0xdceafa,0x726b5b,2.7));const key=new T.DirectionalLight(0xffe6cb,2.2);key.position.set(-3,4,4);scene.add(key);const fill=new T.DirectionalLight(0x94bdde,1);fill.position.set(3,2,-2);scene.add(fill);
  actor=createActor(template(),scene,{id:0});actor.group.rotation.y=angle;actor.tick(0,{time:0});
  const platform=new T.Mesh(new T.CylinderGeometry(.44,.47,.025,48),new T.MeshStandardMaterial({color:0x213543,roughness:.85}));platform.position.y=-.016;scene.add(platform);
 }
 function resize(){if(!renderer||!open)return;const r=canvas.parentElement.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();}
 function frame(now){if(!open)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min((now-lastTime)/1000,.04));lastTime=now;time+=dt;if(attack){attack.t+=dt;if(attack.t>(attack.kind==='slap'?.43:.64))attack=null;}actor.group.rotation.y=angle;actor.tick(dt,{time,attack});renderer.render(scene,camera);previewFrames++;}
 function show(){if(open)return;previousFocus=document.activeElement;restore=pauseGame();open=true;host.hidden=false;if(!renderer)build();resize();lastTime=performance.now();raf=requestAnimationFrame(frame);host.querySelector('#closeCaptainProfile').focus();}
 function close(){if(!open)return;open=false;host.hidden=true;if(raf)cancelAnimationFrame(raf);drag=null;attack=null;restore?.();restore=null;previousFocus?.focus?.();}
 button.onclick=intro.onclick=show;host.querySelector('#closeCaptainProfile').onclick=host.querySelector('#returnFromProfile').onclick=close;
 host.querySelectorAll('[data-pose]').forEach(b=>b.onclick=()=>{attack=b.dataset.pose==='idle'?null:{kind:b.dataset.pose,t:0};});
 canvas.addEventListener('pointerdown',e=>{e.preventDefault();drag={id:e.pointerId,x:e.clientX};canvas.setPointerCapture(e.pointerId);});canvas.addEventListener('pointermove',e=>{if(drag?.id===e.pointerId){angle+=(e.clientX-drag.x)*.012;drag.x=e.clientX;}});for(const name of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(name,()=>drag=null);
 window.addEventListener('resize',resize);
 return {show,close,get open(){return open;},handleKey(e){if(open){if(['Escape','KeyV'].includes(e.code))close();return true;}if(e.code==='KeyV'&&!e.repeat&&!e.target?.closest?.('input,textarea,select')){show();return true;}return false;},inspect:()=>({open,role:actor?.profile.role,fullBody:!!actor&&!actor.inspect().fps,source:'civilian172',frames:previewFrames,hands:actor?Object.fromEntries(['lefthand','righthand','leftarm','rightarm'].map(n=>[n,actor.bones.get(n).getWorldPosition(new T.Vector3()).toArray()])):null})};
}

import * as THREE from 'three';
import { ArcadeGame } from './arcade.js';
import { RULES, OBSTACLES, SETTINGS_KEY, step, hasSight } from './arcade-model.js';
import './arcade-readability.css';

const V = THREE.Vector3;
const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
const COLORS = ['#8fffce','#ff8858','#cb91ff'];
const NAMES = ['ΕΣΥ','1 · ΣΒΟΥΡΑΣ','2 · ΦΟΥΣΚΑΣ'];
const saveSettings = g => { try { localStorage.setItem(SETTINGS_KEY,JSON.stringify(g.settings)); } catch {} };

// Presentation changes stay separate from the original arcade combat and save code.
export class ReadableArcadeGame extends ArcadeGame {
 constructor() {
  super();
  this.topCamera=this.camera;
  this.thirdCamera=new THREE.PerspectiveCamera(63,innerWidth/innerHeight,.1,250);
  this.viewMode=this.settings.cameraMode==='topdown'?'topdown':'third';
  this.cameraYaw=Math.PI; this.cameraPitch=.48; this.cameraDistance=9.5;
  this.cameraFocus=new V(); this.cameraReady=false; this.lastMapTime=-1;
  this.camera=this.viewMode==='third'?this.thirdCamera:this.topCamera;
  this.materials.insect.color.set('#ffc536');
  this.materials.insect.emissive.set('#d99216');this.materials.insect.emissiveIntensity=.45;
  this.materials.wing.opacity=.95;
  this.resize();this.bindCamera();this.updateCamera(0,true);this.updateHUD();
 }
 createUI() {
  super.createUI();
  this.ui.insertAdjacentHTML('beforeend',`<aside id="arcade-radar" aria-label="Χάρτης αρένας"><div class="radar-title">ΟΛΟΙ ΕΝΑΝΤΙΟΝ ΟΛΩΝ</div><canvas id="radar-map" width="320" height="320" aria-label="Πράσινο: εσύ. 1 και 2: αντίπαλοι. Κίτρινο: μύγες."></canvas><div class="radar-key"><span>● ΕΣΥ</span><span>● ΜΥΓΕΣ</span><span>1 · 2 ΑΝΤΙΠΑΛΟΙ</span></div><button id="camera-toggle" aria-label="Αλλαγή κάμερας">ΚΑΜΕΡΑ: 3D · C</button></aside><div id="arcade-tip" role="status"></div>`);
  this.mapCtx=this.$('radar-map').getContext('2d');
  this.$('camera-toggle').onclick=()=>this.toggleCamera();
  this.$('settings-panel').insertAdjacentHTML('afterbegin','<button id="fresh-round" class="plain-button">Νέος αγώνας από την αρχή</button>');
  this.$('fresh-round').onclick=()=>this.startNew();
 }
 buildActors() {
  super.buildActors();
  // Low-detail mode used to disable the outline. Independent ground markers
  // remain visible at every quality; skin colours also differ, not just names.
  this.models.forEach((m,i)=>{
   const body=m.group.getObjectByName('frog-weighted-surface');
   if(body?.material?.color)body.material.color.set(i===0?'#74b644':i===1?'#e57942':'#9b75ce');
   m.setOutline(COLORS[i],true);
  });
  if(!this.actorRings){
   this.actorRings=COLORS.map(color=>{
    const m=new THREE.Mesh(new THREE.RingGeometry(1.05,1.23,32),new THREE.MeshBasicMaterial({color,side:THREE.DoubleSide,transparent:true,opacity:.9,depthWrite:false}));
    m.rotation.x=-Math.PI/2;this.scene.add(m);return m;
   });
  }
  this.playerRing.visible=false;
  this.cameraReady=false;
 }
 createFlies() {
  super.createFlies();
  this.flyHeads=new THREE.InstancedMesh(this.shared.sphere,new THREE.MeshBasicMaterial({color:'#302227'}),72);
  this.flyHeads.instanceMatrix.setUsage(THREE.DynamicDrawUsage);this.flyHeads.frustumCulled=false;this.scene.add(this.flyHeads);
 }
 bindCamera() {
  addEventListener('keydown',e=>{if(e.code==='KeyC'&&!e.repeat&&!e.target.matches('input,select')&&this.running){e.preventDefault();this.toggleCamera();}});
  const canvas=this.renderer.domElement;let drag=null;
  canvas.addEventListener('pointerdown',e=>{
   if(!this.running||this.viewMode!=='third'||!(e.pointerType==='touch'||e.button===1))return;
   drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);e.preventDefault();
  });
  canvas.addEventListener('pointermove',e=>{
   if(!drag||drag.id!==e.pointerId||!this.running)return;
   this.cameraYaw-=(e.clientX-drag.x)*.006;this.cameraPitch=clamp(this.cameraPitch+(e.clientY-drag.y)*.004,.22,.95);
   drag.x=e.clientX;drag.y=e.clientY;this.mouse.valid=false;this.updateCamera(0,true);
  });
  for(const type of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(type,e=>{if(drag?.id===e.pointerId)drag=null;});
  canvas.addEventListener('wheel',e=>{if(this.running&&this.viewMode==='third'){e.preventDefault();this.cameraDistance=clamp(this.cameraDistance+e.deltaY*.009,6,14);}},{passive:false});
 }
 toggleCamera() {
  this.clearInputs();this.mouse.valid=false;
  this.viewMode=this.viewMode==='third'?'topdown':'third';
  this.settings.cameraMode=this.viewMode;saveSettings(this);
  this.camera=this.viewMode==='third'?this.thirdCamera:this.topCamera;
  this.cameraReady=false;this.resize();this.updateCamera(0,true);this.updateHUD();
 }
 resize() {
  if(!this.thirdCamera){super.resize();return;}
  const w=innerWidth,h=innerHeight;this.renderer.setSize(w,h);this.w=w;this.h=h;
  this.thirdCamera.aspect=w/h;this.thirdCamera.fov=w<h?72:63;this.thirdCamera.updateProjectionMatrix();
  const half=w<h?12.5:12;
  Object.assign(this.topCamera,{left:-half*w/h,right:half*w/h,top:half,bottom:-half});this.topCamera.updateProjectionMatrix();
  this.labels.width=w;this.labels.height=h;this.cameraReady=false;
 }
 updateCamera(dt,snap=false) {
  if(!this.thirdCamera)return;
  const p=this.state.actors[0],target=new V(p.x,this.ground(p.x,p.z)+.85,p.z);
  if(snap||!this.cameraReady){this.cameraFocus.copy(target);this.cameraReady=true;}else this.cameraFocus.lerp(target,1-Math.exp(-dt*12));
  const focus=this.cameraFocus;this.shake*=Math.exp(-dt*15);
  if(this.viewMode==='topdown'){
   this.camera.position.set(focus.x,focus.y+30,focus.z+16);
   this.camera.lookAt(focus.x,focus.y-.6,focus.z-1.5);
  }else{
   const forward=new V(Math.sin(this.cameraYaw),0,Math.cos(this.cameraYaw)),right=new V(-Math.cos(this.cameraYaw),0,Math.sin(this.cameraYaw));
   const wanted=focus.clone().addScaledVector(forward,-Math.cos(this.cameraPitch)*this.cameraDistance).addScaledVector(right,.6);
   wanted.y+=Math.sin(this.cameraPitch)*this.cameraDistance+.35;
   // Avoid terrain and the arcade's physical rocks without changing collision.
   const direction=wanted.clone().sub(focus),length=direction.length();direction.normalize();
   for(const rock of this.obstacleMeshes)rock.updateMatrixWorld();
   const obstruction=new THREE.Raycaster(focus,direction,0,length).intersectObjects(this.obstacleMeshes,false)[0];
   if(obstruction)wanted.copy(focus).addScaledVector(direction,Math.max(1,obstruction.distance-.3));
   for(let i=3;i<=16;i++){const q=focus.clone().lerp(wanted,i/16);if(q.y<this.ground(q.x,q.z)+.3){wanted.lerpVectors(focus,wanted,Math.max(.2,(i-1)/16));break;}}
   wanted.y=Math.max(wanted.y,this.ground(wanted.x,wanted.z)+.4);
   this.camera.position.copy(wanted);
   const look=focus.clone().addScaledVector(forward,1.65);this.camera.lookAt(look);
  }
  if(this.running){this.camera.position.x+=(Math.random()-.5)*this.shake*.12;this.camera.position.y+=(Math.random()-.5)*this.shake*.08;}
  this.camera.updateMatrixWorld(true);
 }
 currentInput() {
  const c=super.currentInput();if(!this.thirdCamera||this.viewMode!=='third')return c;
  const yaw=this.cameraYaw,rx=-Math.cos(yaw),rz=Math.sin(yaw),fx=Math.sin(yaw),fz=Math.cos(yaw);
  const mx=c.mx,mz=c.mz;c.mx=rx*mx-fx*mz;c.mz=rz*mx-fz*mz;
  // The touch aim vector is screen-relative; mouse ray aiming is already world-space.
  if(!this.mouse.valid){const x=this.aim.x,z=this.aim.z;c.ax=rx*x-fx*z;c.az=rz*x-fz*z;}
  return c;
 }
 startNew() {super.startNew();this.$('callout').textContent='';this.cameraReady=false;}
 go() {super.go();this.mouse.valid=false;this.cameraReady=false;}
 renderActors(dt) {
  super.renderActors(dt);this.playerRing.visible=false;
  this.state.actors.forEach((a,i)=>{const ring=this.actorRings[i];ring.position.set(a.x,this.ground(a.x,a.z)+.09,a.z);ring.scale.setScalar(1+a.load*.25);ring.visible=!a.ko;});
  // Keep the aim guide aligned to transformed mobile aiming too.
  const p=this.state.actors[0],a=this.aimGuide.geometry.attributes.position;
  a.setXYZ(0,p.x+p.aimX*1.5,this.ground(p.x,p.z)+.2,p.z+p.aimZ*1.5);
  a.setXYZ(1,p.x+p.aimX*5,this.ground(p.x+p.aimX*5,p.z+p.aimZ*5)+.2,p.z+p.aimZ*5);a.needsUpdate=true;this.aimGuide.computeLineDistances();
 }
 flyPosition(f) {return new V(f.x+Math.sin(this.elapsed*3+f.phase)*.2,this.ground(f.x,f.z)+1+Math.sin(this.elapsed*5+f.phase)*.2,f.z);}
 renderFlies() {
  super.renderFlies();
  const d=this.dummy;
  for(let i=0;i<this.state.flies.length;i++){
   const f=this.state.flies[i],p=this.flyPosition(f),live=f.wait<=0;
   d.position.copy(p);d.rotation.set(0,f.phase,0);d.scale.set(live?.27:0,live?.21:0,live?.38:0);d.updateMatrix();this.flyBodies.setMatrixAt(i,d.matrix);
   for(let side=0;side<2;side++){
    const sign=side?1:-1;d.position.copy(p);d.position.x+=Math.cos(f.phase)*sign*.31;d.position.z-=Math.sin(f.phase)*sign*.31;d.position.y+=.13;
    d.rotation.set(0,f.phase,Math.sin(this.elapsed*55+f.phase)*sign*.5);d.scale.set(live?.42:0,live?.035:0,live?.23:0);d.updateMatrix();this.flyWings.setMatrixAt(i*2+side,d.matrix);
   }
   d.position.copy(p);d.position.x+=Math.sin(f.phase)*.27;d.position.z+=Math.cos(f.phase)*.27;d.rotation.set(0,f.phase,0);d.scale.setScalar(live?.19:0);d.updateMatrix();this.flyHeads.setMatrixAt(i,d.matrix);
  }
  this.flyBodies.instanceMatrix.needsUpdate=true;this.flyWings.instanceMatrix.needsUpdate=true;this.flyHeads.instanceMatrix.needsUpdate=true;
 }
 drawLabels() {
  const c=this.labelCtx;c.clearRect(0,0,this.w,this.h);if(this.mode==='title')return;
  const player=this.state.actors[0];c.textAlign='center';c.lineJoin='round';this.visibleFlies=0;
  const nearby=this.state.flies.filter(f=>f.wait<=0&&Math.hypot(f.x-player.x,f.z-player.z)<RULES.tongueRange&&hasSight(player,f));
  const nearest=nearby.sort((a,b)=>Math.hypot(a.x-player.x,a.z-player.z)-Math.hypot(b.x-player.x,b.z-player.z))[0];
  for(const f of this.state.flies){
   if(f.wait>0)continue;const v=this.flyPosition(f),p=this.project(v.x,v.y,v.z);
   if(!p.visible||p.x<10||p.x>this.w-10||p.y<90||p.y>this.h-20)continue;
   const dist=Math.hypot(f.x-player.x,f.z-player.z);if(dist>24||!hasSight(player,f))continue;
   this.visibleFlies++;const r=this.touch?6:5;
   // Minimum screen-space insect silhouette, not a one-pixel dot. These markers
   // only represent real live flies; they disappear immediately on collection.
   c.save();c.translate(p.x,p.y);c.shadowColor='#ffda62';c.shadowBlur=f===nearest?12:3;
   c.fillStyle='#efffff';c.strokeStyle='#193139';c.lineWidth=1.4;
   for(const sign of [-1,1]){c.beginPath();c.ellipse(sign*r*.75,-r*.5,r*.9,r*.45,sign*.5,0,Math.PI*2);c.fill();c.stroke();}
   c.beginPath();c.ellipse(0,0,r*.5,r*.9,0,0,Math.PI*2);c.fillStyle='#ffcb47';c.fill();c.stroke();
   c.beginPath();c.moveTo(-r*.45,0);c.lineTo(r*.45,0);c.stroke();c.shadowBlur=0;
   if(f===nearest&&player.ammo<RULES.capacity){c.beginPath();c.arc(0,0,14,0,Math.PI*2);c.strokeStyle='#ffec82';c.lineWidth=2;c.stroke();if(this.state.stats.caught<3){c.font='bold 13px Arial';c.strokeStyle='#17312a';c.lineWidth=4;const text=this.touch?'ΓΛΩΣΣΑ':'E · ΠΙΑΣΕ';c.strokeText(text,0,-21);c.fillStyle='#fff3ac';c.fillText(text,0,-21);}}
   c.restore();
  }
  this.state.actors.forEach((a,i)=>{
   const p=this.project(a.x,this.ground(a.x,a.z)+a.height+1.9,a.z);
   const minY=this.touch?220:100,maxY=this.h-(this.touch?245:75);
   const on=p.visible&&p.x>50&&p.x<this.w-50&&p.y>90&&p.y<this.h-80;
   if(!on&&i>0&&!a.ko&&this.running){
    // Camera-local direction also works when the rival is behind the camera.
    const local=new V(a.x,this.ground(a.x,a.z)+1,a.z).applyMatrix4(this.camera.matrixWorldInverse);
    let dx=local.x,dy=local.z;if(Math.abs(dx)+Math.abs(dy)<.01)dy=-1;
    const length=Math.hypot(dx,dy);dx/=length;dy/=length;
    const cx=this.w/2,cy=(minY+maxY)/2,t=Math.min((this.w/2-32)/Math.max(.001,Math.abs(dx)),Math.max(30,(maxY-minY)/2)/Math.max(.001,Math.abs(dy)));
    const x=cx+dx*t,y=cy+dy*t;c.save();c.translate(x,y);c.rotate(Math.atan2(dy,dx));c.beginPath();c.moveTo(13,0);c.lineTo(-6,-8);c.lineTo(-6,8);c.closePath();c.fillStyle=COLORS[i];c.strokeStyle='#162c29';c.lineWidth=3;c.fill();c.stroke();c.restore();c.font='bold 13px Arial';c.fillStyle=COLORS[i];c.fillText(String(i),x,y+23);return;
   }
   if(!p.visible)return;
   const text=a.ko?'KO':NAMES[i],width=a.ko?48:i===0?44:112;
   c.fillStyle='#102923e8';c.beginPath();c.roundRect(p.x-width/2,p.y-23,width,26,9);c.fill();c.strokeStyle=COLORS[i];c.lineWidth=1.5;c.stroke();c.font='bold 13px Arial';c.fillStyle=COLORS[i];c.fillText(text,p.x,p.y-5);
   if(a.ko)return;
   if(a.dizzyTime>0){for(let j=0;j<3;j++){const r=this.elapsed*4+j*2.094;c.font='bold 23px Arial';c.fillStyle='#ffe363';c.strokeStyle='#4f4022';c.lineWidth=3;const x=p.x+Math.cos(r)*29,y=p.y-38+Math.sin(r)*7;c.strokeText('★',x,y);c.fillText('★',x,y);}}
   else if(i>0){for(let j=0;j<6;j++){c.beginPath();c.arc(p.x+(j-2.5)*9,p.y+12,3.5,0,Math.PI*2);c.fillStyle=j<a.dizzy?'#ffe16a':'#173b30dd';c.fill();c.strokeStyle=COLORS[i];c.lineWidth=1;c.stroke();}}
   if(i>0&&a.targetId==='player'&&a.alert>0){c.font='bold 14px Arial';c.fillStyle='#ffdc8e';c.strokeStyle='#18332c';c.lineWidth=4;c.strokeText('ΣΕ ΕΙΔΕ!',p.x,p.y-37);c.fillText('ΣΕ ΕΙΔΕ!',p.x,p.y-37);}
  });
  this.fx=this.fx.filter(f=>this.elapsed-f.start<f.life);
  for(const f of this.fx){const t=(this.elapsed-f.start)/f.life,p=this.project(f.x,this.ground(f.x,f.z)+2+t*2,f.z);if(!p.visible)continue;c.globalAlpha=1-t;c.font=`900 ${f.text==='ΝΟΚ ΑΟΥΤ!'?30:22}px Arial`;c.strokeStyle='#244136';c.lineWidth=6;c.strokeText(f.text,p.x,p.y);c.fillStyle=f.color;c.fillText(f.text,p.x,p.y);}c.globalAlpha=1;
 }
 drawMap() {
  const c=this.mapCtx;if(!c)return;const n=320,center=160,scale=5.75;
  c.clearRect(0,0,n,n);c.save();c.beginPath();c.arc(center,center,148,0,Math.PI*2);c.clip();
  c.fillStyle='#13372f';c.fillRect(0,0,n,n);
  // The diagram is north-up and shares the same world coordinates as combat.
  c.strokeStyle='#4b776355';c.lineWidth=1;for(let q=-20;q<=20;q+=10){c.beginPath();c.moveTo(center+q*scale,10);c.lineTo(center+q*scale,310);c.moveTo(10,center+q*scale);c.lineTo(310,center+q*scale);c.stroke();}
  for(const o of OBSTACLES){c.beginPath();c.arc(center+o.x*scale,center+o.z*scale,o.r*scale,0,Math.PI*2);c.fillStyle='#82958a';c.fill();}
  for(const f of this.state.flies)if(f.wait<=0){c.beginPath();c.arc(center+f.x*scale,center+f.z*scale,2.8,0,Math.PI*2);c.fillStyle='#ffcf55';c.fill();}
  const player=this.state.actors[0],yaw=this.viewMode==='third'?this.cameraYaw:Math.PI;
  c.beginPath();c.moveTo(center+player.x*scale,center+player.z*scale);for(let k=-1;k<=1;k+=2)c.lineTo(center+(player.x+Math.sin(yaw+k*.55)*9)*scale,center+(player.z+Math.cos(yaw+k*.55)*9)*scale);c.closePath();c.fillStyle='#a1ffd91f';c.fill();
  this.state.actors.forEach((a,i)=>{
   const x=center+a.x*scale,y=center+a.z*scale;c.beginPath();c.arc(x,y,i===0?10:12,0,Math.PI*2);c.fillStyle=a.ko?'#5f6b64':COLORS[i];c.fill();c.strokeStyle='#091b18';c.lineWidth=3;c.stroke();
   c.font='bold 16px Arial';c.textAlign='center';c.fillStyle='#10241f';c.fillText(a.ko?'×':i===0?'▲':String(i),x,y+5);
   if(a.targetId&&!a.ko){const b=this.state.actors.find(b=>b.id===a.targetId);if(b){c.setLineDash([5,5]);c.strokeStyle=COLORS[i]+'88';c.lineWidth=2;c.beginPath();c.moveTo(x,y);c.lineTo(center+b.x*scale,center+b.z*scale);c.stroke();c.setLineDash([]);}}
  });
  c.restore();c.beginPath();c.arc(center,center,148,0,Math.PI*2);c.strokeStyle='#b6e6c5';c.lineWidth=3;c.stroke();
 }
 updateHUD() {
  super.updateHUD();if(!this.$('arcade-radar'))return;
  this.$('arcade-radar').hidden=this.mode!=='play';this.$('arcade-tip').hidden=this.mode!=='play';
  this.$('camera-toggle').textContent=`ΚΑΜΕΡΑ: ${this.viewMode==='topdown'?'ΚΑΤΟΨΗ':'3D'}${this.touch?'':' · C'}`;
  const s=this.state,p=s.actors[0],tip=this.$('arcade-tip');
  if(s.grace>0){tip.textContent=`ΑΣΦΑΛΗΣ ΕΚΚΙΝΗΣΗ · ${Math.ceil(s.grace)}″\n${this.touch?'ΓΛΩΣΣΑ':'Κράτα E'}: πιάσε τις κίτρινες μύγες μπροστά σου. Η πρώτη βολή τελειώνει την προστασία.`;}
  else if(s.stats.caught===0)tip.textContent=this.touch?'Πιάσε μύγες με το κουμπί ΓΛΩΣΣΑ. Οι κίτρινες κουκκίδες στον χάρτη δείχνουν πού είναι.':'Κράτα E για μύγες. Ποντίκι: στόχευση και βολές. C: εναλλαγή κάμερας.';
  else if(s.time<23)tip.textContent='Πορτοκαλί 1 και μοβ 2: αντίπαλοι, όχι ομάδα. Ζάλισέ τους και πλησίασε για κλωτσιά!';
  else tip.hidden=true;
  if(this.lastMapTime===undefined||Math.abs(s.time-this.lastMapTime)>.09||!this.running){this.drawMap();this.lastMapTime=s.time;}
 }
 frame(now) {
  const dt=Math.min(.05,Math.max(0,(now-this.last)/1000));this.last=now;
  if(this.running){this.elapsed+=dt;this.accumulator+=dt;while(this.accumulator>=1/60){step(this.state,this.currentInput(),1/60);this.consumeEvents();this.accumulator-=1/60;if(this.state.status!=='playing'){this.finish();break;}}this.saveClock+=dt;if(this.saveClock>3){this.saveClock=0;this.persist();}}
  else if(this.mode==='result'||this.mode==='finishing')this.elapsed+=dt;
  if(this.mode==='finishing'&&this.elapsed>=this.resultAt)this.showResult();
  this.updateCamera(dt);
  const p=this.state.actors[0];
  if(this.running||['title','result','finishing'].includes(this.mode)){this.renderActors(this.mode==='title'?0:dt);this.renderFlies();this.world.update(this.running?dt:0,this.elapsed,1,new V(p.x,this.ground(p.x,p.z),p.z));}
  if(this.running||['finishing','result'].includes(this.mode))this.particles=this.particles.filter(p=>{if(this.elapsed-p.start>.55){p.mesh.removeFromParent();return false;}p.v.y-=dt*16;p.mesh.position.addScaledVector(p.v,dt);return true;});
  this.renderer.render(this.scene,this.camera);this.drawLabels();this.updateHUD();
 }
 inspect() {return {...super.inspect(),cameraMode:this.viewMode,cameraType:this.camera.type,grace:this.state.grace,visibleFlies:this.visibleFlies||0,minimapVisible:!this.$('arcade-radar')?.hidden,targets:this.state.actors.map(a=>({id:a.id,target:a.targetId})),flyBodyScale:.27};}
}

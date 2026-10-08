/* Physical preparation, not a recipe-button wizard. All gesture events are local
 * to this view. The normal flight/input/combat modules keep their 0.5.2 rules. */
import * as T from 'three';
import {clamp,inflate} from './physics.js?v=0.5.2';
export const FLAVOURS=Object.freeze([
 {id:'berry',name:'ΜΟΥΡΟ',color:0x9564eb,recipe:'strong',note:'Αντοχή · 95 s'},
 {id:'mint',name:'ΜΕΝΤΑ',color:0x5bd6a1,recipe:'light',note:'Εμβέλεια · 120 s'},
 {id:'strawberry',name:'ΦΡΑΟΥΛΑ',color:0xf28bb8,recipe:'balanced',note:'Ισορροπία · 105 s'},
 {id:'orange',name:'ΠΟΡΤΟΚΑΛΙ',color:0xffad50,recipe:'strong',note:'Αντοχή · 95 s'},
 {id:'ice',name:'ΠΑΓΟΜΕΝΗ ΜΕΝΤΑ',color:0x55c8ed,recipe:'balanced',note:'Ισορροπία · 105 s'},
 {id:'lemon',name:'ΛΕΜΟΝΙ',color:0xeee36a,recipe:'light',note:'Εμβέλεια · 120 s'}
]);
const $=id=>document.getElementById(id),v=(x=0,y=0,z=0)=>new T.Vector3(x,y,z),Y=v(0,1,0);
const PROFILES={balanced:{lift:102,life:105,integrity:160},light:{lift:99,life:120,integrity:135},strong:{lift:118,life:95,integrity:210}};
export function mixGum(parts){
 const list=parts.map(id=>FLAVOURS.find(f=>f.id===id)).filter(Boolean).slice(0,3);
 if(!list.length)throw new Error('Choose a gum first');
 const col=new T.Color(0);const stats={lift:0,life:0,integrity:0};
 for(const f of list){col.add(new T.Color(f.color).multiplyScalar(1/list.length));for(const k of Object.keys(stats))stats[k]+=PROFILES[f.recipe][k]/list.length;}
 return {ids:list.map(f=>f.id),name:list.map(f=>f.name).join(' + '),color:col.getHex(),recipe:list[0].recipe,...stats};
}
export function launchGum(body,mix){
 inflate(body,mix.recipe);Object.assign(body.balloon,{lift:mix.lift,life:mix.life,maxLife:mix.life,integrity:mix.integrity,maxIntegrity:mix.integrity,color:mix.color});
 body.gumMix={...mix,ids:mix.ids.slice()};
}
function gumShape(){
 const g=new T.SphereGeometry(1,32,20),p=g.attributes.position;
 const signed=(x,e)=>Math.sign(x)*Math.pow(Math.abs(x),e);
 for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i);p.setXYZ(i,signed(x,.45)*.034,signed(y,.55)*.012*(1+.08*Math.sin(x*8)),signed(z,.48)*.026);}
 p.needsUpdate=true;g.computeVertexNormals();return g;
}
function labelTexture(f){
 const c=document.createElement('canvas');c.width=512;c.height=256;const q=c.getContext('2d');
 q.fillStyle='#162731';q.fillRect(0,0,512,256);q.fillStyle='#'+f.color.toString(16).padStart(6,'0');q.fillRect(0,0,512,13);
 q.textAlign='center';q.fillStyle='#f4f6ef';q.font='700 36px system-ui';q.fillText(f.name,256,170);q.font='27px system-ui';q.fillStyle='#bdcec9';q.fillText(f.note,256,213);
 q.fillStyle='#'+f.color.toString(16).padStart(6,'0');q.font='900 38px system-ui';q.fillText('BUBBLE',256,65);q.font='19px system-ui';q.fillStyle='#bac7cb';q.fillText('GUM / SKYWARD',256,105);
 const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=4;return tex;
}
function setDirection(bone,dir){
 bone.updateWorldMatrix(true,false);const q=bone.getWorldQuaternion(new T.Quaternion()),axis=Y.clone().applyQuaternion(q);
 const turn=new T.Quaternion().setFromUnitVectors(axis,dir.clone().normalize());
 bone.quaternion.copy(bone.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(turn).multiply(q));bone.updateWorldMatrix(false,true);
}
// Two-bone IK with an outward elbow pole. Wrist and candy remain connected.
function reach(p,side,target){
 const upper=p.bones['upperarm_'+side],lower=p.bones['lowerarm_'+side],hand=p.bones['hand_'+side];if(!upper||!lower||!hand)return null;
 const s=side==='r'?-1:1,rootQ=p.root.getWorldQuaternion(new T.Quaternion());
 const fy=v(-s*.96,.20,-.12).normalize().applyQuaternion(rootQ),fz=v(0,0,1).applyQuaternion(rootQ);
 const fx=new T.Vector3().crossVectors(fy,fz).normalize();fz.crossVectors(fx,fy).normalize();
 const gripQ=new T.Quaternion().setFromRotationMatrix(new T.Matrix4().makeBasis(fx,fy,fz));
 const offset=v(0,.132,.012).applyQuaternion(gripQ),dest=target.clone().sub(offset);
 const S=upper.getWorldPosition(v()),E=lower.getWorldPosition(v()),W=hand.getWorldPosition(v()),a=S.distanceTo(E),b=E.distanceTo(W);
 const d=dest.clone().sub(S),n=d.clone().normalize(),r=clamp(d.length(),Math.abs(a-b)+.015,a+b-.006);
 const pole=v(s*.30,-1,.35).applyQuaternion(rootQ);pole.addScaledVector(n,-pole.dot(n)).normalize();
 const along=(a*a-b*b+r*r)/(2*r),height=Math.sqrt(Math.max(0,a*a-along*along));
 const elbow=S.clone().addScaledVector(n,along).addScaledVector(pole,height),wrist=S.clone().addScaledVector(n,r);
 setDirection(upper,elbow.clone().sub(S));setDirection(lower,wrist.clone().sub(elbow));
 hand.quaternion.copy(hand.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(gripQ));
 for(const finger of['middle','ring','pinky'])for(let i=1;i<=3;i++){const bone=p.bones[finger+'_0'+i+'_'+side];if(bone)bone.rotation.x+=i===1?.65:.75;}
 for(let i=1;i<=3;i++){const bone=p.bones['index_0'+i+'_'+side];if(bone)bone.rotation.x+=i===1?.20:.42;}
 const thumb=p.bones['thumb_01_'+side];if(thumb){thumb.rotation.z+=s*.52;thumb.rotation.x+=.36;}
 p.model.updateMatrixWorld(true);
 const candy=hand.localToWorld(v(0,.132,.012));
 for(const [finger,dy]of [['index',.012],['thumb',-.014]]){
  const last=p.bones[finger+'_03_'+side];if(!last)continue;
  const target=candy.clone().add(v(0,dy,.005).applyQuaternion(rootQ));
  for(let iter=0;iter<6;iter++)for(let j=3;j>=1;j--){const joint=p.bones[finger+'_0'+j+'_'+side];if(!joint)continue;const origin=joint.getWorldPosition(v()),tip=last.localToWorld(v(0,.019,0)),u=tip.sub(origin).normalize(),w=target.clone().sub(origin).normalize();const q=joint.getWorldQuaternion(new T.Quaternion()),turn=new T.Quaternion().setFromUnitVectors(u,w);joint.quaternion.copy(joint.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(turn).multiply(q));joint.updateWorldMatrix(false,true);}
 }
 return candy;
}
function makeChewMorph(p){
 if(p.chewMeshes)return;p.chewMeshes=[];p.root.updateMatrixWorld(true);
 const rootInverse=p.root.matrixWorld.clone().invert();
 p.model.traverse(m=>{if(!m.isSkinnedMesh||m.name!=='villager_man_skin'&&m.name!=='villager_woman_skin')return;
  m.geometry=m.geometry.clone();const pos=m.geometry.attributes.position,out=new Float32Array(pos.count*3),toLocal=rootInverse.clone().multiply(m.matrixWorld);
  const back=new T.Matrix3().setFromMatrix4(m.matrixWorld).invert(),dv=v(0,-.012,0).applyMatrix3(back);
  for(let i=0;i<pos.count;i++){const a=v().fromBufferAttribute(pos,i).applyMatrix4(toLocal);const weight=clamp((1.582-a.y)/.02,0,1)*clamp((a.y-1.520)/.018,0,1)*clamp((a.z-.045)/.045,0,1)*clamp((.080-Math.abs(a.x))/.024,0,1);out[i*3]=dv.x*weight;out[i*3+1]=dv.y*weight;out[i*3+2]=dv.z*weight;}
  m.geometry.morphAttributes.position=[new T.Float32BufferAttribute(out,3)];m.geometry.morphTargetsRelative=true;m.updateMorphTargets();p.chewMeshes.push(m);
 });
}
export class GumHands{
 constructor(game){
  this.g=game;this.active=false;this.pointer=null;this.canvas=game.canvas;this.time=0;this.reserved=false;
  this.group=new T.Group;this.group.visible=false;game.scene.add(this.group);this.camera=new T.PerspectiveCamera(38,innerWidth/innerHeight,.02,9000);
  const boardMat=game.world.woodMaterial.clone();boardMat.color.setHex(0x947858);const board=new T.Mesh(new T.BoxGeometry(.94,.045,.63),boardMat);board.position.set(0,1.015,.46);board.receiveShadow=true;this.group.add(board);
  const edge=new T.Mesh(new T.BoxGeometry(.98,.06,.67),new T.MeshStandardMaterial({color:0x203642,metalness:.6,roughness:.4}));edge.position.set(0,.984,.46);this.group.add(edge);
  const legmat=new T.MeshStandardMaterial({color:0x354951,metalness:.7,roughness:.35});for(const x of[-.39,.39])for(const z of[.25,.7]){const leg=new T.Mesh(new T.CylinderGeometry(.018,.018,.97,12),legmat);leg.position.set(x,.495,z);this.group.add(leg);}
  const geometry=gumShape();this.pieces=[];
  for(const [i,f]of FLAVOURS.entries()){
   const x=(i%3-1)*.285,z=.315+Math.floor(i/3)*.285,home=v(x,1.064,z);
   const wrapper=new T.Mesh(new T.PlaneGeometry(.237,.246),new T.MeshStandardMaterial({map:labelTexture(f),roughness:.40,metalness:.18,side:T.DoubleSide}));wrapper.rotation.x=-Math.PI/2;wrapper.position.set(x,1.041,z+.014);wrapper.receiveShadow=true;this.group.add(wrapper);
   const silver=new T.Mesh(new T.PlaneGeometry(.12,.1,1,1),new T.MeshStandardMaterial({color:0xe0d9d1,metalness:.7,roughness:.3,side:T.DoubleSide}));silver.rotation.x=-1.25;silver.position.set(x,1.06,z-.083);this.group.add(silver);
   const mesh=new T.Mesh(geometry,new T.MeshPhysicalMaterial({color:f.color,roughness:.32,clearcoat:.7,clearcoatRoughness:.28}));mesh.position.copy(home);mesh.castShadow=true;this.group.add(mesh);
   this.pieces.push({id:i,ids:[f.id],mesh,home,wrapper,silver,mixed:false});
  }
  this.envelope=new T.Mesh(new T.SphereGeometry(1,40,28),new T.MeshPhysicalMaterial({color:FLAVOURS[0].color,roughness:.18,metalness:.06,clearcoat:1,transparent:true,opacity:.8,depthWrite:false}));this.envelope.visible=false;this.group.add(this.envelope);
  this.neck=new T.Mesh(new T.CylinderGeometry(.009,.015,1,16),this.envelope.material);this.neck.visible=false;this.group.add(this.neck);
  this.light=new T.PointLight(0xffeddf,2,6,1);this.light.position.set(-.75,2.3,1.5);this.group.add(this.light);
  const on=(type,fn)=>this.canvas.addEventListener(type,e=>{if(!this.active)return;e.preventDefault();e.stopImmediatePropagation();fn.call(this,e);},{capture:true,passive:false});
  on('pointerdown',this.down);on('pointermove',this.move);on('pointerup',this.up);on('pointercancel',this.cancel);on('lostpointercapture',e=>{if(e.pointerId===this.pointer)this.cancel(e);});
  // Native touch belongs to this view, not the flight joystick router.
  for(const type of['touchstart','touchmove','touchend','touchcancel'])this.canvas.addEventListener(type,e=>{if(this.active){if(e.cancelable)e.preventDefault();e.stopImmediatePropagation();}},{passive:false});
  window.addEventListener('blur',()=>{if(this.active)this.cancel();});document.addEventListener('visibilitychange',()=>{if(document.hidden&&this.active)this.cancel();});
  window.addEventListener('resize',()=>{if(this.active){this.cancel();this.setCamera();}});
 }
 toWorld(local){return this.group.localToWorld(local.clone());}
 project(local){const q=this.toWorld(local).project(this.camera);return{x:(q.x+1)*innerWidth/2,y:(1-q.y)*innerHeight/2};}
 open(){
  this.active=true;this.reserved=false;this.pointer=null;this.state='choose';this.held=null;this.selection=null;this.chewing=0;this.radius=.055;this.time=0;this.blowReady=false;this.userTravel=0;
  const a=this.g.player;this.group.position.set(a.x,a.y,a.z);this.group.rotation.y=a.yaw;this.group.visible=true;this.person=this.g.visuals.get(a.id);this.person.root.rotation.set(0,a.yaw,0);this.person.root.updateMatrixWorld(true);makeChewMorph(this.person);
  for(const p of this.pieces){p.ids=[FLAVOURS[p.id].id];p.mesh.visible=true;p.mesh.position.copy(p.home);p.mesh.scale.setScalar(1);p.mesh.material.color.setHex(FLAVOURS[p.id].color);p.silver.rotation.x=-1.25;}
  this.envelope.visible=this.neck.visible=false;this.g.gun.visible=false;document.body.classList.add('hands-open');$('gumName').textContent='Η δική σου τσίχλα';$('gumDescription').textContent='6 γεύσεις · 6 χρώματα · μπορείς να ενώσεις έως 3';$('gumHint').textContent='Πιάσε μία τσίχλα και σύρε τη μέχρι τα χείλη του χαρακτήρα.';
  $('gumSecondary').textContent='Ακούμπησε δύο κομμάτια μαζί πάνω στον δίσκο για ανάμειξη.';this.setCamera();
 }
 close(refund=true){
  this.cancel();if(refund&&this.reserved){this.g.player.bag[0]+=3;this.g.player.bag[1]+=2;this.g.player.bag[2]++;}this.reserved=false;this.active=false;this.group.visible=false;
  if(this.person){for(const m of this.person.chewMeshes||[])m.morphTargetInfluences[0]=0;this.person.model.visible=true;this.person.gun.visible=true;}
  document.body.classList.remove('hands-open');this.canvas.style.cursor='';this.g.cameraReady=false;
 }
 reserve(){const p=this.g.player;if(this.reserved)return true;if(p.bag[0]<3||p.bag[1]<2||p.bag[2]<1)return false;p.bag[0]-=3;p.bag[1]-=2;p.bag[2]--;this.reserved=true;return true;}
 hitPiece(x,y){let winner=null,best=Infinity;for(const p of this.pieces){if(!p.mesh.visible||p===this.held)continue;const q=this.project(p.mesh.position),r=Math.hypot(q.x-x,q.y-y);if(r<Math.max(24,Math.min(innerWidth,innerHeight)*.035)&&r<best){best=r;winner=p;}}return winner;}
 mouth(){return v(0,1.58,.119);}
 mouthDistance(x,y){const p=this.project(this.mouth());return Math.hypot(x-p.x,y-p.y);}
 down(e){
  if(e.button!==0||this.pointer!==null)return;this.pointer=e.pointerId;this.start={x:e.clientX,y:e.clientY};this.last={...this.start};this.canvas.setPointerCapture?.(e.pointerId);
  if(this.state==='choose'){
   const piece=this.hitPiece(e.clientX,e.clientY);if(piece){if(this.held&&this.held!==piece)this.returnHeld();this.held=piece;this.side=piece.home.x>0?'l':'r';this.handPos=piece.mesh.position.clone();this.goal=this.handPos.clone();piece.silver.rotation.x=-.75;this.selection=mixGum(piece.ids);this.describe();}
   else if(this.held){const q=this.project(this.held.mesh.position);if(Math.hypot(e.clientX-q.x,e.clientY-q.y)>75){this.pointer=null;return;}}
   else{this.pointer=null;return;}
   this.dragging=true;this.move(e);
  }else if(this.state==='blow'){
   const q=this.project(this.envelope.position),mr=this.project(this.envelope.position.clone().add(v(this.radius,0,0))),bound=Math.max(45,Math.abs(mr.x-q.x)+22);
   if(this.mouthDistance(e.clientX,e.clientY)<55||Math.hypot(q.x-e.clientX,q.y-e.clientY)<bound){this.blowStart=this.radius;this.blowing=true;this.userTravel=0;}else this.pointer=null;
  }else this.pointer=null;
 }
 move(e){
  if(this.state==='choose'&&!this.held){const p=this.hitPiece(e.clientX,e.clientY);if(p)this.describe(mixGum(p.ids));this.canvas.style.cursor=p?'grab':'default';}
  if(e.pointerId!==this.pointer)return;
  this.last={x:e.clientX,y:e.clientY};
  if(this.dragging&&this.held){
   const start=this.project(this.held.home),mouth=this.project(this.mouth()),t=clamp((start.y-e.clientY)/Math.max(1,start.y-mouth.y),0,1),z=this.held.home.z*(1-t)+this.mouth().z*t;
   const ray=new T.Raycaster;ray.setFromCamera(new T.Vector2(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2),this.camera);
   const normal=v(0,0,1).applyQuaternion(this.group.getWorldQuaternion(new T.Quaternion())),plane=new T.Plane().setFromNormalAndCoplanarPoint(normal,this.toWorld(v(0,0,z))),point=ray.ray.intersectPlane(plane,v());
   if(point){this.group.worldToLocal(point);this.goal.set(clamp(point.x,-.43,.43),clamp(point.y,1.068,1.72),z);}
   this.nearMouth=this.mouthDistance(e.clientX,e.clientY)<Math.max(29,Math.min(innerWidth,innerHeight)*.049);
   if(this.nearMouth){this.goal.copy(this.mouth()).add(v(this.side==='r'?-.006:.006,-.012,.008));$('gumHint').textContent='Άφησέ την εδώ, ανάμεσα στα χείλη.';}
   else $('gumHint').textContent='Την κρατάς στο χέρι. Σύρε την στα χείλη ή πίσω στον δίσκο.';
  }else if(this.blowing){
   const travel=Math.hypot(e.clientX-this.start.x,e.clientY-this.start.y);this.userTravel=Math.max(this.userTravel,travel);
   this.radius=clamp(this.blowStart+this.userTravel/(Math.min(innerWidth,innerHeight)*.52)*2.40,.055,2.45);this.blowReady=this.radius>=2.40;
   $('gumHint').textContent=this.blowReady?'Έφτιαξες τη φουσκάλα. Άφησε για να απογειωθείς.':'Τράβηξε προς τα έξω: εσύ μεγαλώνεις τη φουσκάλα.';
  }
 }
 up(e){
  if(e.pointerId!==this.pointer)return;this.move(e);this.pointer=null;this.canvas.style.cursor='grab';
  if(this.dragging&&this.held){this.dragging=false;
   if(this.nearMouth&&this.reserve()){
    this.selection=mixGum(this.held.ids);this.goal.copy(this.mouth()).add(v(0,0,.025));this.state='placing';this.placement=0;this.chewing=0;this.envelope.material.color.setHex(this.selection.color);this.describe();$('gumHint').textContent='Φέρνεις την τσίχλα στα χείλη…';$('gumSecondary').textContent='Μετά πιάσε τη μικρή φουσκάλα στα χείλη και τράβηξε προς τα έξω.';
   }else{
    const other=this.hitPiece(e.clientX,e.clientY);if(other&&other!==this.held&&other.ids.length+this.held.ids.length<=3){other.ids.push(...this.held.ids);this.held.mesh.visible=false;this.held=null;const m=mixGum(other.ids);other.mesh.material.color.setHex(m.color);other.mesh.scale.setScalar(Math.pow(other.ids.length,1/3));this.selection=m;this.describe();$('gumHint').textContent='Οι τσίχλες ενώθηκαν. Πιάσε το μείγμα και φέρε το στα χείλη.';}
    else if(Math.hypot(e.clientX-this.start.x,e.clientY-this.start.y)<8){this.goal.set(this.side==='r'?-.16:.16,1.31,.28);$('gumHint').textContent='Την κρατάς στο χέρι. Πιάσε την ξανά και φέρε την στα χείλη.';}else if(this.goal.y<1.18)this.returnHeld();
   }
  }
  if(this.blowing){this.blowing=false;if(this.blowReady){const chosen=this.selection;this.reserved=false;this.close(false);this.g.finishCraft(chosen);}}
 }
 returnHeld(){if(!this.held)return;this.held.mesh.position.copy(this.held.home);this.held=null;this.handPos=this.goal=null;this.dragging=false;this.nearMouth=false;}
 cancel(){this.pointer=null;this.dragging=false;this.blowing=false;this.nearMouth=false;if(this.state==='choose')this.returnHeld();}
 describe(mix=this.selection){if(!mix)return;$('gumName').textContent=mix.name;$('gumName').style.color='#'+mix.color.toString(16).padStart(6,'0');$('gumDescription').textContent=`${Math.round(mix.life)} s πτήσης · ${Math.round(mix.integrity)} αντοχή · ίδιο χρώμα σε τσίχλα και φουσκάλα`;}
 setCamera(){
  const r=this.state==='blow'?this.radius:0,portrait=innerWidth<innerHeight;this.camera.aspect=innerWidth/innerHeight;
  const dist=portrait?Math.max(2.35,1.14/(2*Math.tan(22*Math.PI/180)*this.camera.aspect)):2.1;this.camera.fov=portrait?44:33;
  const fit=Math.max(dist+r*3.05,(2*r+.45)/(2*Math.tan(this.camera.fov*Math.PI/360)*this.camera.aspect)+.45);
  this.camera.position.copy(this.toWorld(v(.08,1.89+r,fit)));this.camera.lookAt(this.toWorld(v(0,1.30+r,.24)));this.camera.updateProjectionMatrix();this.camera.updateMatrixWorld(true);
 }
 pose(dt){
  const p=this.person;if(!p)return;const a=this.g.player;p.root.position.set(a.x,a.y,a.z);p.root.rotation.set(0,a.yaw,0);p.root.visible=true;p.model.visible=true;p.gun.visible=false;p.balloon.visible=p.tail.visible=p.patches.visible=false;
  for(const [name,b]of Object.entries(p.bones)){b.quaternion.copy(p.rest[name].q);b.position.copy(p.rest[name].p);}p.model.updateMatrixWorld(true);
  for(const side of['l','r']){
   if(!(side===this.side&&this.held)){
    const rq=p.root.getWorldQuaternion(new T.Quaternion()),sign=side==='r'?-1:1;
    for(const [bone,dir]of [['upperarm_',v(sign*.1,-1,.08)],['lowerarm_',v(0,-1,.15)],['hand_',v(0,-1,.12)]])setDirection(p.bones[bone+side],dir.applyQuaternion(rq));
    for(const f of ['index','middle','ring','pinky'])for(let j=1;j<=3;j++){const b=p.bones[f+'_0'+j+'_'+side];if(b)b.rotation.x+=.16;}
    continue;
   }
   const target=this.goal;
   let desired=target;if(side===this.side&&this.held){this.handPos.lerp(target,Math.min(1,dt*22));desired=this.handPos;}
   const at=reach(p,side,this.toWorld(desired));if(this.held&&side===this.side&&at)this.held.mesh.position.copy(this.group.worldToLocal(at));
  }
  const chew=this.state==='chew'?Math.max(0,Math.sin(this.chewing*15))*.85:0;
  for(const m of p.chewMeshes||[])m.morphTargetInfluences[0]=chew;
  if(p.bones.head&&this.state==='chew')p.bones.head.rotation.x+=Math.sin(this.chewing*15)*.012;
 }
 step(dt){
  if(!this.active)return;dt=clamp(dt||1/60,0,.05);this.time+=dt;
  if(this.state==='placing'){this.placement+=dt;if(this.placement>.4){this.held.mesh.visible=false;this.held=null;this.state='chew';this.envelope.visible=true;$('gumHint').textContent='Η τσίχλα μπήκε στο στόμα. Μαλακώνει καθώς τη μασάς…';this.g.sound('reward');}}
  if(this.state==='chew'){this.chewing+=dt;if(this.chewing>=1.65){this.state='blow';this.radius=.055;$('gumHint').textContent='Πιάσε τη μικρή φουσκάλα στα χείλη. Τράβηξε προς τα έξω για να τη φουσκώσεις.';}}
  this.pose(dt);
  if(this.state==='chew'||this.state==='blow'){
   const r=this.state==='chew'?.018:this.radius,t=clamp((r-.13)/.6,0,1),rise=t*t*(3-2*t),mouth=this.mouth();this.envelope.visible=true;this.neck.visible=this.state==='blow';this.envelope.scale.set(r,r*(1+.015*Math.sin(this.time*3)),r);
   this.envelope.position.set(0,mouth.y+rise*(r+.26),mouth.z+(r+.018)*(1-rise)+.32*rise);
   const end=this.envelope.position.clone().add(v(0,-r*.93*rise,-r*.85*(1-rise))),mid=mouth.clone().add(end).multiplyScalar(.5),delta=end.clone().sub(mouth);
   this.neck.position.copy(mid);this.neck.scale.set(1,Math.max(.015,delta.length()),1);this.neck.quaternion.setFromUnitVectors(Y,delta.normalize());
  }
  this.setCamera();
  const q=this.project(this.mouth());$('gumMouthHint').style.left=q.x+'px';$('gumMouthHint').style.top=q.y+'px';$('gumMouthHint').classList.toggle('near',!!this.nearMouth);$('gumMouthHint').classList.toggle('hidden',this.state!=='choose'||!this.held);
 }
 render(dt){this.pose(dt||1/60);this.setCamera();this.g.renderer.render(this.g.scene,this.camera);}
 snapshot(){return{state:this.state,held:this.held?.id??null,mix:this.selection,paid:this.reserved,radius:this.radius,active:this.active,slots:this.pieces.filter(p=>p.mesh.visible).map(p=>({id:p.id,ids:p.ids,screen:this.project(p.mesh.position)})),mouth:this.project(this.mouth())};}
}

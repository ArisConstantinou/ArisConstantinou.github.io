import * as THREE from 'three';
import {moveCircle,clamp} from './chaos-rules180.js?v=180';
const V=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
export function buildChaosWorld(ship){
 const group=new THREE.Group();group.name='LAST CALL story spaces';ship.group.add(group);
 const areas={},props=[],particles=[];let serial=0;
 const mat=(color,roughness=.65,extra={})=>new THREE.MeshStandardMaterial({color,roughness,...extra});
 const M={white:mat(0xd9ddd7),navy:mat(0x14343d),metal:mat(0x7d9096,.26,{metalness:.72}),wood:mat(0x916341),gold:mat(0xc29559,.32,{metalness:.42}),red:mat(0xb3422c),glass:mat(0xa9d4d8,.12,{transparent:true,opacity:.24,side:THREE.DoubleSide}),amber:mat(0xa95b19,.15,{transparent:true,opacity:.88}),black:mat(0x131d20),fabric:mat(0x416b67),glow:mat(0xfce3b1,.4,{emissive:0xf3b875,emissiveIntensity:.6})};
 const floorCanvas=document.createElement('canvas');floorCanvas.width=512;floorCanvas.height=512;const fc=floorCanvas.getContext('2d');fc.fillStyle='#9a714a';fc.fillRect(0,0,512,512);for(let i=0;i<16;i++){fc.fillStyle=i%2?'#8e6745':'#a97d52';fc.fillRect(i*32+1,0,30,512);fc.strokeStyle='#63482f';fc.beginPath();fc.moveTo(i*32,0);fc.lineTo(i*32,512);fc.stroke();for(let j=0;j<10;j++){fc.strokeStyle='rgba(53,29,14,.1)';fc.beginPath();fc.moveTo(i*32+3+j*2,0);fc.lineTo(i*32+5+j*2,512);fc.stroke();}fc.fillStyle='#4d4237';fc.fillRect(i*32,i%2?220:390,32,2);}
 const tex=new THREE.CanvasTexture(floorCanvas);tex.colorSpace=THREE.SRGBColorSpace;tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(4,5);M.deck=mat(0xffffff,.78,{map:tex});
 function mesh(g,m,parent,x=0,y=0,z=0){const a=new THREE.Mesh(g,m);a.position.set(x,y,z);a.castShadow=a.receiveShadow=true;parent.add(a);return a;}
 function box(parent,w,h,d,m,x=0,y=0,z=0){return mesh(new THREE.BoxGeometry(w,h,d),m,parent,x,y,z);}
 function cylinder(parent,r,h,m,x=0,y=0,z=0){return mesh(new THREE.CylinderGeometry(r,r,h,16),m,parent,x,y,z);}
 function label(parent,text,x,y,z,width=3,color='#f6ddaa'){
  const c=document.createElement('canvas');c.width=768;c.height=192;const q=c.getContext('2d');q.fillStyle='#102c35';q.fillRect(0,0,768,192);q.strokeStyle='#bda574';q.lineWidth=3;q.strokeRect(9,9,750,174);q.fillStyle=color;q.textAlign='center';q.textBaseline='middle';q.font='bold 43px sans-serif';q.fillText(text,384,99,735);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;
  const a=mesh(new THREE.PlaneGeometry(width,width/4),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}),parent,x,y,z);a.rotation.y=Math.PI;return a;
 }
 function area(id,y,z,bounds){const root=new THREE.Group();root.position.set(0,y,z);group.add(root);root.visible=false;areas[id]={id,root,bounds,walls:[],props:[]};return areas[id];}
 function solid(a,x,z,w,d,h=2.7,m=M.white,y=h/2){box(a.root,w,h,d,m,x,y,z);const c={x,z,w,d};a.walls.push(c);return c;}
 function prop(a,kind,name,x,z,y=0){const root=new THREE.Group();root.position.set(x,y,z);a.root.add(root);const p={id:serial++,area:a.id,kind,name,root,home:V(x,y,z),hp:kind==='glass'?18:kind==='bottle'?8:kind==='table'?45:25,initialHP:0,radius:kind==='table'?.65:kind==='chair'?.4:.14,held:false,broken:false,velocity:V(),flying:false,hitActor:false};p.initialHP=p.hp;root.userData.chaosProp=p;
  if(kind==='table'){cylinder(root,.68,.09,M.wood,0,.82);cylinder(root,.07,.70,M.metal,0,.43);cylinder(root,.38,.055,M.metal,0,.055);}
  if(kind==='chair'){box(root,.51,.11,.52,M.fabric,0,.48,0);box(root,.52,.60,.085,M.fabric,0,.80,.22);for(const sx of [-.21,.21])for(const sz of [-.2,.2])cylinder(root,.026,.46,M.metal,sx,.23,sz);}
  if(kind==='bottle'){const points=[[0,0],[.10,0],[.11,.03],[.105,.27],[.045,.34],[.035,.52],[0,.52]].map(([u,v])=>new THREE.Vector2(u,v));mesh(new THREE.LatheGeometry(points,18),M.amber,root);cylinder(root,.037,.055,M.gold,0,.53);const l=label(root,'AURORA',0,.20,-.108,.18);l.scale.y=2;}
  if(kind==='glass'){box(root,.065,1.8,3.6,M.glass,0,1.6,0);for(const end of [-1.85,1.85])box(root,.10,2.8,.075,M.metal,0,1.4,end);box(root,.11,.07,3.8,M.gold,0,2.58);}
  if(kind==='vase'){mesh(new THREE.LatheGeometry([[0,0],[.14,0],[.18,.15],[.12,.28],[.07,.35],[.1,.39]].map(p=>new THREE.Vector2(...p)),20),M.white,root);}
  if(kind==='screen'){box(root,1.1,.75,.10,M.black,0,1.6,0);label(root,'AURORA LIVE',0,1.61,-.056,1);}
  props.push(p);a.props.push(p);return p;
 }
 const lounge=area('lounge',9.94,-55,{x0:-7.65,x1:7.65,z0:-8.4,z1:8.4});
 box(lounge.root,15.4,.05,16.8,M.deck,0,-.02,0);
 solid(lounge,0,8.3,15.3,.22,2.8,M.navy);label(lounge.root,'AURORA  /  AFTER HOURS',1,2.18,8.15,5.6);
 solid(lounge,3.3,6.3,5.8,1.2,1.03,M.navy);box(lounge.root,6.1,.1,1.35,M.wood,3.3,1.09,6.3);box(lounge.root,5.8,.035,.06,M.glow,3.3,.90,5.68);
 for(let x=1;x<=5.4;x+=1.1){prop(lounge,'bottle','Μπουκάλι ουίσκι',x,6.25,1.16);const stool=new THREE.Group();stool.position.set(x,0,4.85);lounge.root.add(stool);cylinder(stool,.26,.12,M.fabric,0,.69);cylinder(stool,.045,.6,M.metal,0,.36);cylinder(stool,.20,.045,M.metal,0,.04);}
 for(const [x,z]of [[-3,-3],[3,-3],[2,1.3]]){prop(lounge,'table','Τραπέζι',x,z);prop(lounge,'chair','Καρέκλα',x-.9,z+.3);prop(lounge,'chair','Καρέκλα',x+.8,z-.4);prop(lounge,'bottle','Μπουκάλι',x,z,.88);prop(lounge,'vase','Βάζο',x+.3,z+.2,.88);}
 for(const side of [-1,1])for(const z of [-5.5,-1.6,2.3])prop(lounge,'glass','Τζάμι παραθύρου',side*7.4,z);
 prop(lounge,'screen','Οθόνη σαλονιού',-2,8.1);
 label(lounge.root,'ΑΣΦΑΛΕΙΑ  /  SECURITY',-5.3,2.2,8.14,3);
 for(let i=0;i<3;i++)box(lounge.root,1.7,.12,.36,M.wood,-5.7,.3-i*.1,6.9-i*.36);
 for(const x of [-5,0,5]){const lamp=new THREE.PointLight(0xffdfb4,9,10,2);lamp.position.set(x,2.55,-1);lounge.root.add(lamp);mesh(new THREE.SphereGeometry(.1,12,8),M.glow,lounge.root,x,2.55,-1);}
 const boat=new THREE.Group();boat.position.set(-9.1,-1.3,-3);lounge.root.add(boat);const shape=new THREE.Shape();shape.moveTo(0,-2.5);shape.bezierCurveTo(1.1,-1.8,1.1,1.8,0,2.5);shape.bezierCurveTo(-1.1,1.8,-1.1,-1.8,0,-2.5);const hull=new THREE.ExtrudeGeometry(shape,{depth:.58,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.18,bevelThickness:.15});hull.rotateX(-Math.PI/2);mesh(hull,mat(0xe77622),boat);box(boat,1.3,.5,3.2,M.white,0,.65);box(boat,1.34,.3,1.9,M.navy,0,.78);let boatReleased=0;
 const boatPanel=box(lounge.root,.35,.55,.16,M.red,-7,1.25,-5.5);label(lounge.root,'ΛΕΜΒΟΣ',-6.96,1.72,-5.53,.85);
 const cell=area('cell',6.1,-55,{x0:-6,x1:6,z0:-7,z1:7});box(cell.root,12,.16,14,M.navy,0,-.12);for(const [x,z,w,d]of [[-6,0,.2,14],[6,0,.2,14],[0,-7,12,.2],[0,7,12,.2]])solid(cell,x,z,w,d,2.6);
 solid(cell,-1.7,-6.4,.22,1.2);solid(cell,-1.7,-3.3,.22,2.2);const vent={x:-1.7,z:-5.3,w:.28,d:1.15,vent:true};cell.walls.push(vent);box(cell.root,.25,.6,1.15,M.navy,-1.7,1.10,-5.3);
 for(let x=-5.8;x<-1.5;x+=.32)cylinder(cell.root,.033,2.5,M.metal,x,1.25,-2.15);
 cell.walls.push({x:-3.8,z:-2.15,w:4.4,d:.12});solid(cell,1,0,.25,7);solid(cell,3.5,3.4,5,.22);solid(cell,-3,2.4,3,.25);box(cell.root,1.6,.32,2.1,M.metal,-4.8,.23,-5.4);box(cell.root,1.5,.12,2,M.fabric,-4.8,.46,-5.4);cell.walls.push({x:-4.8,z:-5.4,w:1.6,d:2.1});prop(cell,'vase','Μεταλλικό κύπελλο',-3.1,-4.5,.1);prop(cell,'bottle','Άδειο μπουκάλι',0,-3.3,.1);prop(cell,'vase','Κύπελλο',3,-1.6,.1);
 const stash=prop(cell,'bottle','Γεμάτο ουίσκι',4.4,5.4,.6);box(cell.root,1.8,.58,.7,M.wood,4.4,.29,5.4);cell.walls.push({x:4.4,z:5.4,w:1.8,d:.7});label(cell.root,'SERVICE  →',-2,1.6,6.85,3);
 const bridge=area('bridge',18.45,38,{x0:-6.5,x1:6.5,z0:-3.8,z1:7.8});bridge.walls.push({x:0,z:9,w:5.2,d:1.8});label(bridge.root,'ΓΕΦΥΡΑ  /  ΜΟΝΟ ΠΛΗΡΩΜΑ',0,2.4,-3.8,4);
 function reset(){for(const a of Object.values(areas))a.root.visible=false;for(const p of props){p.root.removeFromParent();areas[p.area].root.add(p.root);p.root.position.copy(p.home);p.root.rotation.set(0,0,0);p.root.visible=true;p.hp=p.initialHP;p.broken=p.held=p.flying=false;p.velocity.set(0,0,0);p.hitActor=false;}for(const p of particles)p.mesh.removeFromParent();particles.length=0;boatReleased=0;boat.position.set(-9.1,-1.3,-3);}
 function burst(p){for(let i=0;i<(p.kind==='glass'?18:8);i++){if(particles.length>=100){particles.shift().mesh.removeFromParent();}const piece=mesh(new THREE.TetrahedronGeometry(p.kind==='glass'?.14:.1),p.kind==='glass'?M.glass:M.wood,areas[p.area].root,p.root.position.x,p.root.position.y+(p.kind==='glass'?1.5:.3),p.root.position.z);particles.push({mesh:piece,v:V((Math.random()-.5)*3,Math.random()*2+.5,(Math.random()-.5)*3),life:3});}}
 function damage(p,amount){if(p.broken)return false;p.hp-=amount;if(p.hp<=0){p.broken=true;p.flying=false;p.root.visible=false;burst(p);return true;}return false;}
 function update(dt,onNoise,onThrown){
  if(boatReleased){boatReleased+=dt;boat.position.y=Math.max(-9.4,-1.3-boatReleased*.9);boat.position.z=-3-boatReleased*.35;}
  for(const p of props){if(!p.flying||p.held||p.broken)continue;const a=areas[p.area];const n=Math.max(1,Math.ceil(dt/.016));for(let j=0;j<n;j++){const d=dt/n;p.velocity.y-=9.8*d;p.root.position.y+=p.velocity.y*d;const hits=moveCircle(p.root.position,p.velocity.x*d,p.velocity.z*d,a.walls,a.bounds,.13);if(hits){p.velocity.x*=-.35;p.velocity.z*=-.35;onNoise(p.root.position,p.area);}p.root.rotation.x+=d*3;p.root.rotation.z+=d*2;if(!p.hitActor&&onThrown(p)){p.hitActor=true;p.velocity.multiplyScalar(-.22);}if(p.root.position.y<=.05){p.root.position.y=.05;onNoise(p.root.position,p.area);if(p.kind==='bottle'||p.kind==='vase'){damage(p,99);break;}p.velocity.multiplyScalar(.2);p.root.rotation.x=Math.PI*.48;p.flying=false;}}}
  for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.life-=dt;p.v.y-=dt*7;p.mesh.position.addScaledVector(p.v,dt);if(p.mesh.position.y<.02){p.mesh.position.y=.02;p.v.multiplyScalar(.6);}if(p.life<0){p.mesh.removeFromParent();particles.splice(i,1);}}
 }
 function releaseBoat(){if(boatReleased)return false;boatReleased=.001;return true;}
 reset();return {group,areas,props,stash,boatPanel,reset,damage,update,releaseBoat,get boatReleased(){return !!boatReleased;}};
}

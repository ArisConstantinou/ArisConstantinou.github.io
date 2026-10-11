import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {shipSign} from '../captain/signs190.js';
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
const SEA_SAVE='last-call-mayhem-sea-v1';
/** Fictional arcade harbor. Authorities escort first; only an actual attack starts pursuit. */
export function createMarineMayhem({scene,ship,world,hud,getState,getChapter,canPlay,onMessage,onDock=()=>{},onScore=()=>{}}){
 const root=new T.Group();root.name='Town, harbor patrol and rescue';scene.add(root);
 const boats=[],shots=[],swimmers=[],splashes=[];let lastCamera=null;let elapsed=0,nextWave=0,wave=0,hostile=false,locked=false,evacuation=false,sunk=0,rescued=0,lastHUD=-1,lastSave=0,started=false,docked=false,totalBoats=0;
 const mat=c=>new T.MeshStandardMaterial({color:c,roughness:.65});const white=mat(0xebe9dc),navy=mat(0x173b50),wood=mat(0x936949),roofMat=mat(0xb86845),glass=new T.MeshStandardMaterial({color:0x1b586c,roughness:.18,metalness:.35}),yellow=mat(0xe3b94b),red=mat(0xd95541);
 const boatGeoms=new Set(),town=new T.Group();town.name='Port town / Agios Fanos';root.add(town);
 function mesh(parent,g,m,x=0,y=0,z=0){const o=new T.Mesh(g,m);o.position.set(x,y,z);parent.add(o);return o;}
 const box=(p,w,h,d,m,x,y,z)=>mesh(p,new T.BoxGeometry(w,h,d),m,x,y,z);
 function rod(p,a,b,r=.06,m=navy){const av=new T.Vector3(...a),bv=new T.Vector3(...b);const o=mesh(p,new T.CylinderGeometry(r,r,av.distanceTo(bv),8),m);o.position.copy(av).lerp(bv,.5);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),bv.sub(av).normalize());return o;}
 // A coherent harbor neighborhood with roofs, window grids, arcades and promenade.
 const palettes=[mat(0xe2c69f),mat(0xeee5ce),mat(0xc6d7cd),mat(0xead4bc)];
 box(town,1000,12,480,mat(0x849476),0,0,1970);
 for(let row=0;row<3;row++)for(let col=0;col<12;col++){
  const x=-420+col*72+(row%2)*18,z=1795+row*91,w=38+(col%3)*6,d=42+(col%2)*8,h=18+(row+col)%4*8;
  box(town,w,h,d,palettes[(col+row)%4],x,8+h/2,z);
  const g=new T.ConeGeometry(1,1,4);g.rotateY(Math.PI/4);const r=mesh(town,g,roofMat,x,8+h+4,z);r.scale.set(w*.75,8,d*.75);
  for(let k=0;k<Math.floor(h/7);k++)for(let a=0;a<4;a++){box(town,4,4,.28,glass,x-w*.36+a*w*.24,13+k*7,z-d/2-.2);if(k>0){box(town,6,.65,2.6,white,x-w*.36+a*w*.24,10.5+k*7,z-d/2-.9);}}
  if(row===0)for(let i=0;i<3;i++){box(town,7,6,.3,glass,x-11+i*11,11,z-d/2-.3);box(town,8,.5,3.5,i%2?red:navy,x-11+i*11,15,z-d/2-2);}
 }
 for(let i=0;i<25;i++){const x=-455+i*38;rod(town,[x,8,1755],[x,23,1755],.22);mesh(town,new T.SphereGeometry(1.5,8,6),new T.MeshBasicMaterial({color:0xffe3a8}),x,23.7,1755);}
 const portName=shipSign('ΑΓΙΟΣ ΦΑΝΟΣ  /  PORT',{width:45,height:6});portName.position.set(0,34,1740);portName.rotation.y=Math.PI;town.add(portName);
 // Berth edge is next to the hull, not an invisible completion circle offshore.
 box(town,26,7,240,white,32,3,1545);box(town,26.5,.35,240.5,wood,32,6.68,1545);
 for(const z of [1445,1480,1515,1550,1585,1620]){box(town,.6,1.2,.6,navy,20,7.4,z);box(town,.6,1.2,.6,navy,44,7.4,z);}
 for(const z of [1450,1500,1550,1600])world.obstacles.push({id:'finger-berth-'+z,type:'land',x:32,z,radius:15,height:7});
 // Merge town solids by material; windows are geometry, not a far-away flat illustration.
 const batches=new Map();for(const o of [...town.children])if(o.isMesh){if(!batches.has(o.material))batches.set(o.material,[]);batches.get(o.material).push(o);}for(const [m,items]of batches){if(items.length<2)continue;const parts=items.map(o=>{o.updateMatrix();return (o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone()).applyMatrix4(o.matrix);}),g=mergeGeometries(parts,false);if(g){town.add(new T.Mesh(g,m));for(const o of items){town.remove(o);o.geometry.dispose();}}parts.forEach(g=>g.dispose());}
 // Ship running lights: port/starboard/stern/mast. Visible in daylight, brighter by contrast.
 // Angles follow USCG Rule 21: sidelights 112.5 degrees; white mast 225; stern 135.
 // Game axes: bow +Z, port +X. These are game visuals, not a navigation simulator.
 const navLights=[];
 function navLamp(parent,x,y,z,color,sector){const lamp=mesh(parent,new T.SphereGeometry(.16,8,6),new T.MeshBasicMaterial({color,toneMapped:false}),x,y,z);navLights.push({parent,lamp,sector});return lamp;}
 navLamp(ship.group,10.5,20.4,42,0xff4e3b,'port');navLamp(ship.group,-10.5,20.4,42,0x4dff94,'starboard');navLamp(ship.group,0,12,-65,0xffffff,'stern');navLamp(ship.group,0,29,-2,0xffffff,'mast');
 function updateNavigationLights(camera){const eye=camera.getWorldPosition(new T.Vector3());for(const n of navLights){const local=n.parent.worldToLocal(eye.clone()),a=Math.atan2(local.x,local.z),limit=Math.PI*.625;n.lamp.visible=n.sector==='port'?a>=0&&a<=limit:n.sector==='starboard'?a<=0&&a>=-limit:n.sector==='stern'?Math.abs(a)>=limit:Math.abs(a)<=limit;}}

 const panel=document.createElement('section');panel.id='marine190';panel.innerHTML='<div id="seaBrief"><b>ΑΝΟΙΧΤΗ ΘΑΛΑΣΣΑ</b><span></span></div><canvas id="seaRadar" width="220" height="220" aria-label="Λιμάνι, βράχια και σκάφη"></canvas><div id="seaNav"><strong></strong><small></small></div><div id="seaActions"><button id="bridgeLock"><span>🔒</span><b>ΚΛΕΙΔΩΣΕ ΓΕΦΥΡΑ</b></button><button id="seaDock"><span>⚓</span><b>ΔΕΣΕ</b></button></div><div id="boatLabels"></div>';
 hud.append(panel);const $=id=>panel.querySelector('#'+id);const radar=$('seaRadar').getContext('2d');
 $('bridgeLock').onclick=()=>getChapter()?.lockBridge?.();$('seaDock').onclick=()=>{if(canDock()){docked=true;onDock();onMessage('Έδεσες στο λιμάνι. Το παιχνίδι συνεχίζεται — πρόσω για αναχώρηση.');}};
 function canDock(){const s=getState();return Math.abs(s.x)<5&&s.z>1490&&s.z<1550&&Math.abs(s.speed)<1.5&&Math.abs(wrap(s.heading))<.35;}
 function boatModel(kind){const g=new T.Group();const hull=new T.Shape();hull.moveTo(-2.7,-6.5);hull.lineTo(-2.6,3.5);hull.quadraticCurveTo(-2.0,6.8,0,9);hull.quadraticCurveTo(2,6.8,2.6,3.5);hull.lineTo(2.7,-6.5);hull.closePath();const geo=new T.ExtrudeGeometry(hull,{depth:1.3,bevelEnabled:true,bevelThickness:.25,bevelSize:.22,bevelSegments:1,steps:1});geo.rotateX(Math.PI/2);const h=mesh(g,geo,kind==='rescue'?yellow:navy,0,1.15,0); // shape y becomes z after rotation
  box(g,4.9,.25,11.8,white,0,1.45,-.5);box(g,3.5,2.2,4.8,white,0,2.65,-.7);box(g,3.58,.95,4.9,glass,0,3.03,-.7);box(g,3.9,.2,5.1,white,0,3.84,-.7);
  for(const x of [-2.4,2.4]){rod(g,[x,1.55,-5.8],[x,2.45,-5.8]);rod(g,[x,2.45,-5.8],[x,2.45,4.0]);for(const z of [-3,0,3])rod(g,[x,1.5,z],[x,2.45,z],.045);}
  rod(g,[0,3.9,-1],[0,6.2,-1]);box(g,2.8,.18,.32,navy,0,5.75,-1);const beacon=mesh(g,new T.SphereGeometry(.25,10,6),new T.MeshBasicMaterial({color:kind==='rescue'?0xffcc56:0x5cbaff,toneMapped:false}),0,4.13,0);g.userData.beacon=beacon;
  navLamp(g,2.05,2.5,1,0xff4433,'port');navLamp(g,-2.05,2.5,1,0x44ff88,'starboard');navLamp(g,0,5.95,-1,0xffffff,'mast');navLamp(g,0,2,-6.4,0xffffff,'stern');
  const s=shipSign(kind==='police'?'POLICE':kind==='rescue'?'RESCUE':'COAST GUARD',{width:2.6,height:.4});s.position.set(0,2.20,-3.21);s.rotation.y=Math.PI;g.add(s);
  const label=document.createElement('div');label.className='boat-label';$('boatLabels').append(label);g.userData.label=label;g.userData.kind=kind;
  const batches=new Map();for(const o of [...g.children])if(o.isMesh&&o.material.isMeshStandardMaterial){if(!batches.has(o.material))batches.set(o.material,[]);batches.get(o.material).push(o);}for(const [m,a]of batches){if(a.length<2)continue;const parts=a.map(o=>{o.updateMatrix();return (o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone()).applyMatrix4(o.matrix);}),geo=mergeGeometries(parts,false);if(geo){g.add(new T.Mesh(geo,m));a.forEach(o=>{g.remove(o);o.geometry.dispose();});}parts.forEach(q=>q.dispose());}
  return g;
 }
 function removeBoat(b){for(let i=navLights.length-1;i>=0;i--)if(navLights[i].parent===b.g)navLights.splice(i,1);root.remove(b.g);b.g.userData.label.remove();b.g.traverse(o=>{if(o.geometry)o.geometry.dispose();});}
 function clearWater(x,z,r=9){return !world.obstacles.some(o=>Math.hypot(o.x-x,o.z-z)<o.radius+r);}
 function spawn(kind='coast',near=false){if(boats.filter(b=>b.kind!=='rescue'&&!b.sinking).length>=6&&kind!=='rescue')return null;const s=getState(),id=totalBoats++;let x,z;
  for(let i=0;i<20;i++){const a=s.heading+((id%2?1:-1)*Math.PI/2)+(i*.19),r=near?36:150+i*10;x=s.x+Math.sin(a)*r;z=s.z+Math.cos(a)*r;if(clearWater(x,z))break;}
  const g=boatModel(kind);root.add(g);const b={id,kind,g,x,z,heading:s.heading,speed:0,hp:100,sinking:0,cooldown:0,age:0};boats.push(b);return b;
 }
 function reset(resume=true){for(const b of boats)removeBoat(b);boats.length=0;for(const q of shots)restoreProp(q);shots.length=0;for(const q of swimmers){q.actor.group.visible=false;root.remove(q.actor.group);}swimmers.length=0;elapsed=0;nextWave=20;wave=sunk=rescued=totalBoats=0;hostile=locked=evacuation=started=docked=false;
  if(resume){try{const d=JSON.parse(localStorage.getItem(SEA_SAVE));if(d?.version===1){const s=getState();for(const k of ['x','z','heading'])if(Number.isFinite(d[k]))s[k]=d[k];hostile=!!d.hostile;wave=d.wave||0;sunk=d.sunk||0;}}catch{}}
  spawn('coast',true);spawn('coast',true);started=true;onMessage('ΑΚΤΟΦΥΛΑΚΗ: Aurora, σας συνοδεύουμε στον Άγιο Φανό. Ακολουθήστε τον σημασμένο δίαυλο.');
 }
 function attack(b,damage=30,by='throw'){if(!b||b.sinking||b.kind==='rescue')return false;b.hp-=damage;b.cooldown=1.8;if(!hostile){hostile=true;nextWave=elapsed+9;wave=1;onMessage('ΑΚΤΟΦΥΛΑΚΗ: Δεχόμαστε επίθεση! Ζητούμε αστυνομική ενίσχυση.');}
  onScore(by==='ram'?40:30,'boat-'+by);splash(b.x,b.z);
  if(b.hp<=0){b.sinking=.001;sunk++;onScore(90,'boat-disabled');onMessage('Σκάφος εκτός μάχης — το πλήρωμά του περιμένει περισυλλογή.');}
  return true;
 }
 function lock(value){locked=!!value;if(locked){evacuation=true;onMessage('Η γέφυρα κλείδωσε. Το πλήρωμα αρχίζει εκκένωση και περισυλλογή.');if(!boats.some(b=>b.kind==='rescue'))spawn('rescue',false);}}
 function splash(x,z){const g=new T.Mesh(new T.RingGeometry(1,1.3,24),new T.MeshBasicMaterial({color:0xebfcff,transparent:true,opacity:.7,depthWrite:false,side:T.DoubleSide}));g.rotation.x=-Math.PI/2;g.position.set(x,.3,z);root.add(g);splashes.push({g,t:0});}
 function launch(prop,dir,pitch){if(shots.length>=18)return false;const g=prop.group;ship.group.updateWorldMatrix(true,true);root.attach(g);const v=new T.Vector3(dir.x,Math.max(-.6,-pitch)+.28,dir.z).normalize().applyQuaternion(ship.group.quaternion).multiplyScalar(24);const s=getState();v.x+=Math.sin(s.heading)*s.speed;v.z+=Math.cos(s.heading)*s.speed;prop.moving=false;prop.active=false;prop.overboard=true;shots.push({prop,g,v,age:0,last:g.position.clone()});return true;}
 function restoreProp(q){const p=q.prop;world.root?.attach?.(q.g); // world may be ocean; stored parent is used below
  if(p.originalParent)p.originalParent.add(q.g);q.g.position.set(p.home.x,p.home.y,p.home.z);q.g.rotation.set(0,0,0);p.overboard=false;p.active=!p.broken;p.moving=false;q.g.visible=!p.broken;
 }
 function boardEvac(n){if(n.atSea||swimmers.length>=30)return;n.atSea=true;n.evacuating=false;n.actor.group.visible=true;root.attach(n.actor.group);const q=n.actor.group.position;const local=ship.group.worldToLocal(q.clone()),side=local.x<0?-1:1,heading=getState().heading;swimmers.push({actor:n.actor,n,x:q.x,z:q.z,y:q.y,t:0,vx:Math.cos(heading)*side*2.8,vz:-Math.sin(heading)*side*2.8});splash(q.x,q.z);}
 function update(dt,camera){if(!started)return;lastCamera=camera;elapsed+=dt;const s=getState();const cp=getChapter()?.seaView;const interior=!!(cp?.foot&&Math.abs(cp.position.x)<8.5&&cp.position.z>-43&&cp.position.z<31&&cp.position.y<20);
  if(docked){s.speed*=Math.exp(-dt*8);if(s.throttle>.05||s.throttle<-.05)docked=false;}
  if(hostile&&elapsed>=nextWave){wave++;nextWave=elapsed+20;spawn('police');if(wave%3===0)spawn('police');onMessage('ΕΝΙΣΧΥΣΕΙΣ '+wave+' · ο καπετάνιος βλέπει κι άλλους «πειρατές».');}
  for(let i=boats.length-1;i>=0;i--){const b=boats[i];b.age+=dt;if(b.kind!=='rescue'&&Math.hypot(b.x-s.x,b.z-s.z)>1100){removeBoat(b);boats.splice(i,1);continue;}b.cooldown=Math.max(0,b.cooldown-dt);
   if(b.sinking){b.sinking+=dt;b.g.position.y=-b.sinking*.55;b.g.rotation.z=Math.min(.8,b.sinking*.12);b.g.userData.label.textContent='ΠΛΗΡΩΜΑ ΣΕ ΣΩΣΙΒΙΑ';if(b.sinking>7){removeBoat(b);boats.splice(i,1);if(!boats.some(q=>q.kind==='rescue'))spawn('rescue');}continue;}
   let target;
   if(b.kind==='rescue'){const q=swimmers[0];target=q?{x:q.x,z:q.z}:{x:s.x+85,z:s.z-65};}
   else if(hostile){const a=s.heading+(b.id%2?1:-1)*1.25;target={x:s.x+Math.sin(a)*(29+(b.id%3)*8),z:s.z+Math.cos(a)*30-25};}
   else {const fx=Math.sin(s.heading),fz=Math.cos(s.heading),side=b.id%2?1:-1;target={x:s.x+fx*80+fz*side*39,z:s.z+fz*80-fx*side*39};}
   let dx=target.x-b.x,dz=target.z-b.z,d=Math.hypot(dx,dz);let ax=0,az=0;
   for(const o of world.obstacles){const ox=b.x-o.x,oz=b.z-o.z,len=Math.hypot(ox,oz),safe=o.radius+32;if(len<safe){const k=(safe-len)/safe*4;ax+=ox/Math.max(1,len)*k;az+=oz/Math.max(1,len)*k;}}
   for(const q of boats)if(q!==b){const x=b.x-q.x,z=b.z-q.z,l=Math.hypot(x,z);if(l<19){ax+=x/Math.max(l,1)*2;az+=z/Math.max(l,1)*2;}}
   const desired=Math.atan2(dx/Math.max(1,d)+ax,dz/Math.max(1,d)+az);b.heading+=clamp(wrap(desired-b.heading),-dt*.8,dt*.8);const limit=b.kind==='rescue'?10:hostile?20:Math.max(3.5,Math.min(18,s.speed+2.5)),wanted=Math.min(limit,d*.45);b.speed+=(wanted-b.speed)*Math.min(1,dt*1.3);b.x+=Math.sin(b.heading)*b.speed*dt;b.z+=Math.cos(b.heading)*b.speed*dt;
   // Conservative hull contact: no passing through the cruiser or rocky scenery.
   const fx=Math.sin(s.heading),fz=Math.cos(s.heading),rx=b.x-s.x,rz=b.z-s.z,t=clamp(rx*fx+rz*fz,-59,67),nx=rx-fx*t,nz=rz-fz*t,len=Math.hypot(nx,nz);
   if(len<17){b.x+=nx/Math.max(1,len)*(17-len);b.z+=nz/Math.max(1,len)*(17-len);if(b.kind!=='rescue'&&Math.abs(s.speed)>2.5&&b.cooldown<=0&&fx*nx+fz*nz<3){attack(b,Math.min(85,25+Math.abs(s.speed)*5),'ram');s.hull=Math.max(20,s.hull-1);s.speed*=.98;}}
   for(const o of world.obstacles){const x=b.x-o.x,z=b.z-o.z,l=Math.hypot(x,z),r=o.radius+7;if(l<r){b.x+=x/Math.max(1,l)*(r-l);b.z+=z/Math.max(1,l)*(r-l);b.speed*=.8;}}
   b.g.position.set(b.x,world.sampleHeight(b.x,b.z,s.time),b.z);b.g.rotation.set(Math.sin(elapsed*2+b.id)*.015,b.heading,Math.sin(elapsed*1.8+b.id)*.025);b.g.userData.beacon.visible=b.kind==='rescue'||Math.sin(elapsed*9)>0;
   const p=new T.Vector3(b.x,b.g.position.y+7,b.z).project(camera),label=b.g.userData.label,dist=Math.hypot(b.x-s.x,b.z-s.z);label.style.display=!interior&&p.z>0&&p.z<1&&Math.abs(p.x)<1&&Math.abs(p.y)<1&&dist<300?'block':'none';label.style.left=(p.x*.5+.5)*innerWidth+'px';label.style.top=(-p.y*.5+.5)*innerHeight+'px';label.textContent=(b.kind==='rescue'?'ΠΕΡΙΣΥΛΛΟΓΗ':s.intox>=30?'☠ «ΠΕΙΡΑΤΕΣ»':b.kind==='police'?'ΑΣΤΥΝΟΜΙΑ':'ΑΚΤΟΦΥΛΑΚΗ')+' · '+Math.round(dist)+' m'+(hostile&&b.kind!=='rescue'?' · '+Math.max(0,Math.round(b.hp))+'%':'');label.dataset.hostile=String(hostile&&b.kind!=='rescue');
  }
  for(let i=shots.length-1;i>=0;i--){const q=shots[i];q.age+=dt;q.last.copy(q.g.position);q.v.y-=9.8*dt;q.g.position.addScaledVector(q.v,dt);q.g.rotation.x+=dt*2;let hit=null;
   for(const b of boats){if(b.sinking||b.kind==='rescue')continue;const a=q.last,d=q.g.position.clone().sub(a),c=new T.Vector3(b.x,3,b.z),t=clamp(c.clone().sub(a).dot(d)/Math.max(.001,d.lengthSq()),0,1);if(a.clone().addScaledVector(d,t).distanceTo(c)<5.5){hit=b;break;}}
   if(hit)attack(hit,['cart','chair','speaker','luggage'].includes(q.prop.type)?48:27,'throw');
   if(hit||q.age>7||q.g.position.y<world.sampleHeight(q.g.position.x,q.g.position.z,s.time)){splash(q.g.position.x,q.g.position.z);q.g.visible=false;if(q.prop.resupply){restoreProp(q);}else{q.prop.broken=true;q.prop.active=false;root.remove(q.g);if(q.prop.originalParent)q.prop.originalParent.add(q.g);q.g.position.set(q.prop.home.x,q.prop.home.y,q.prop.home.z);q.g.visible=false;}shots.splice(i,1);}
  }
  for(let i=swimmers.length-1;i>=0;i--){const q=swimmers[i];q.t+=dt;if(q.y>1){q.x+=q.vx*dt;q.z+=q.vz*dt;}q.y=Math.max(.32,q.y-dt*(2+q.t*3));q.actor.group.position.set(q.x,q.y+world.sampleHeight(q.x,q.z,s.time),q.z);q.actor.group.visible=true;q.actor.tick(dt,{time:elapsed,block:true});
   if(q.y<1&&!q.ring){q.ring=mesh(q.actor.group,new T.TorusGeometry(.48,.11,7,16),yellow,0,.7,0);q.ring.rotation.x=Math.PI/2;}
   if(q.y<1&&boats.some(b=>b.kind==='rescue'&&Math.hypot(b.x-q.x,b.z-q.z)<15)){root.remove(q.actor.group);q.actor.group.visible=false;q.n.rescued=true;rescued++;swimmers.splice(i,1);}
  }
  for(let i=splashes.length-1;i>=0;i--){const q=splashes[i];q.t+=dt;q.g.scale.setScalar(1+q.t*4);q.g.material.opacity=Math.max(0,.7-q.t*.3);if(q.t>2.4){root.remove(q.g);q.g.geometry.dispose();q.g.material.dispose();splashes.splice(i,1);}}
  updateNavigationLights(camera);
  if(elapsed-lastHUD>.15){lastHUD=elapsed;updateHUD();}
  if(elapsed-lastSave>3){lastSave=elapsed;try{localStorage.setItem(SEA_SAVE,JSON.stringify({version:1,x:s.x,z:s.z,heading:s.heading,hostile,wave,sunk}));}catch{}}
 }
 function updateHUD(){const s=getState(),ch=getChapter()?.seaView,distance=Math.hypot(s.x,s.z-1530);$('seaBrief').querySelector('b').textContent=hostile?'ΚΑΤΑΔΙΩΞΗ · ΚΥΜΑ '+wave:'ΣΥΝΟΔΕΙΑ ΠΡΟΣ ΛΙΜΑΝΙ';$('seaBrief').querySelector('span').textContent=hostile?'Ενισχύσεις σε '+Math.max(0,Math.ceil(nextWave-elapsed))+'″ · '+sunk+' σκάφη εκτός μάχης':'Η ακτοφυλακή προσφέρει βοήθεια. Η επίθεση καλεί αστυνομία.';
  $('seaNav').querySelector('strong').textContent=(distance/1000).toFixed(2)+' km · ΑΓΙΟΣ ΦΑΝΟΣ';$('seaNav').querySelector('small').textContent=evacuation?'Διάσωση '+rescued+' · στο νερό '+swimmers.length:docked?'ΔΕΜΕΝΟ · πρόσω για αναχώρηση':distance<220?'Προσέγγιση αργά και παράλληλα στην προβλήτα':'Καθαρός καιρός · ακολούθησε τους φωτεινούς σημαντήρες';
  const near=ch&&!ch.downed&&(!ch.foot||ch.position.y>17.8&&ch.position.z>31);$('bridgeLock').hidden=!near;$('bridgeLock').querySelector('b').textContent=locked?'ΞΕΚΛΕΙΔΩΣΕ':'ΚΛΕΙΔΩΣΕ ΓΕΦΥΡΑ';$('seaDock').hidden=distance>240;$('seaDock').disabled=!canDock();
  const c=radar,w=220;c.clearRect(0,0,w,w);c.fillStyle='#0b2e40bb';c.beginPath();c.arc(110,110,104,0,Math.PI*2);c.fill();c.strokeStyle='#a6d0cb55';for(const r of [35,70,104]){c.beginPath();c.arc(110,110,r,0,7);c.stroke();}
  function point(x,z,color,size){const dx=x-s.x,dz=z-s.z,rx=dx*Math.cos(s.heading)-dz*Math.sin(s.heading),rz=dx*Math.sin(s.heading)+dz*Math.cos(s.heading);const px=110-rx*.19,py=110-rz*.19;if(Math.hypot(px-110,py-110)>98)return;c.fillStyle=color;c.beginPath();c.arc(px,py,size,0,7);c.fill();}
  for(const o of world.obstacles)point(o.x,o.z,'#bc9f70',Math.min(12,o.radius*.09));for(const b of boats)point(b.x,b.z,b.kind==='rescue'?'#f4d06b':hostile?'#ef7554':'#83ddbb',4);point(0,1530,'#ffffff',7);c.fillStyle='#ffffff';c.beginPath();c.moveTo(110,100);c.lineTo(105,118);c.lineTo(115,118);c.closePath();c.fill();
 }
 return {reset,update,attack,lock,launch,boardEvac,canDock,get hostile(){return hostile;},get locked(){return locked;},get evacuation(){return evacuation;},get docked(){return docked;},inspect:()=>({hostile,locked,evacuation,docked,wave,nextWave:Math.max(0,nextWave-elapsed),sunk,rescued,swimmers:swimmers.length,projectiles:shots.length,flight:shots.map(q=>({age:q.age,position:q.g.position.toArray(),velocity:q.v.toArray()})),totalSpawned:totalBoats,boats:boats.map(b=>({id:b.id,kind:b.kind,x:b.x,z:b.z,hp:b.hp,heading:b.heading,speed:b.speed,sinking:b.sinking})),navigationLights:navLights.length,buoys:8,rockyObstacles:world.obstacles.filter(o=>o.type==='rock').length,townBuildings:36,port:{x:0,z:1530}}),test:{boats,attack,spawn,canDock,advance:seconds=>{if(lastCamera)for(let i=0;i<Math.ceil(seconds*60);i++)update(1/60,lastCamera);}}};
}

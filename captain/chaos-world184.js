import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
export function createChaosDeck(ship){
 const root=new T.Group();root.name='Chapter 01 — foredeck lounge';ship.group.add(root);
 const solids=[],props=[],fragments=[],decor=[];
 const mat=(c,r=.65,m=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m});
 const M={wood:mat(0x976742),dark:mat(0x182c38),steel:mat(0xaabac0,.3,.75),ivory:mat(0xe4dfcd),gold:mat(0xc79040,.32,.5),cloth:mat(0x377674),orange:mat(0xe88238),black:mat(0x111e27),glass:new T.MeshPhysicalMaterial({color:0x9edbe0,roughness:.13,transparent:true,opacity:.3,side:T.DoubleSide,depthWrite:false})};
 function mesh(g,m,p,x=0,y=0,z=0){const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;p.add(o);return o;}
 function box(p,w,h,d,m,x,y,z){return mesh(new T.BoxGeometry(w,h,d),m,p,x,y,z);}
 function rod(p,a,b,r=.032,m=M.steel){a=new T.Vector3(...a);b=new T.Vector3(...b);const o=mesh(new T.CylinderGeometry(r,r,a.distanceTo(b),8),m,p);o.position.copy(a).lerp(b,.5);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),b.sub(a).normalize());return o;}
 function sign(text,x,y,z,w=2,ry=0){const c=document.createElement('canvas');c.width=768;c.height=192;const ctx=c.getContext('2d');ctx.fillStyle='#102a35';ctx.fillRect(0,0,768,192);ctx.strokeStyle='#cfa65a';ctx.lineWidth=7;ctx.strokeRect(9,9,750,174);ctx.fillStyle='#f5e7cb';ctx.textAlign='center';ctx.font='bold 49px sans-serif';ctx.fillText(text,384,116);const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;const o=mesh(new T.PlaneGeometry(w,w/4),new T.MeshBasicMaterial({map:tx,side:T.DoubleSide}),root,x,y,z);o.rotation.y=ry;return o;}
 // Genuine continuous exterior stairs. Treads, stringers and rails match the navigation slope.
 box(root,4.1,.15,2.2,M.wood,11.4,18.33,32.95);
 for(let i=0;i<42;i++){const z=33.85+(i+.5)*15.25/42,y=18.43-(i+.5)*8.33/42;box(root,1.65,.16,15.25/42+.03,M.wood,12.60,y-.12,z);}
 for(const x of [11.76,13.44]){rod(root,[x,18.2,33.85],[x,9.9,49.1],.085);rod(root,[x,19.47,33.85],[x,11.14,49.1],.045);for(let i=0;i<=14;i++){const z=33.85+i*15.25/14,y=18.43-i*8.33/14;rod(root,[x,y,z],[x,y+1.05,z],.032);}}
 box(root,5.6,.19,2.45,M.wood,10.65,10.0,50.35);
 rod(root,[13.44,11.14,49.1],[13.44,11.14,51.55]);rod(root,[13.44,11.14,51.55],[8.2,11.14,51.55]);
 for(let x=8.3;x<=13.5;x+=1.1)rod(root,[x,10.1,51.55],[x,11.14,51.55]);
 // Visible supports underneath the added starboard access way.
 for(const z of [36,41,46])rod(root,[11.95,8.5,z],[12.6,18.43-(z-33.85)/15.25*8.33-.25,z],.11,M.ivory);
 sign('ΚΑΤΑΣΤΡΩΜΑ  ↓',9.5,20,32.9,1.8,-Math.PI/2);sign('AURORA · SKY BAR',0,13.05,51.1,5.3,0);
 sign('ΓΕΦΥΡΑ  ↑',11.5,12.05,50.65,1.5,Math.PI/2);
 // Starboard access marking strips.
 for(let z=34.4;z<49;z+=2){const y=18.43-(z-33.85)/15.25*8.33;box(root,.7,.01,.035,M.gold,12.6,y+.006,z);}
 function prop(type,x,z,{w=.65,d=.65,h=.8,hp=30,grab=false,label=type,y=10.12}={}){const g=new T.Group();g.position.set(x,y,z);root.add(g);const p={id:'prop-'+props.length,type,label,group:g,home:{x,y,z},x,y,z,w,d,h,hp,maxHP:hp,grab,broken:false,active:true,velocity:new T.Vector3(),moving:false,hitIds:new Set()};props.push(p);if(!grab)solids.push(p);return p;}
 for(const x of [-3.05,3.05])rod(root,[x,10.12,51.16],[x,13.35,51.16],.045);box(root,6.25,.12,1.2,M.ivory,0,13.35,51.7);
 const counter=prop('bar',0,51.9,{w:5.8,d:1.05,h:1.07,hp:999,label:'ΜΠΑΡ · 9 ΓΙΑ ΟΥΙΣΚΙ'});
 box(counter.group,5.8,1.0,1.02,M.dark,0,.51,0);box(counter.group,6,.13,1.2,M.wood,0,1.07,0);box(counter.group,5.4,.45,.045,M.gold,0,.59,.54);for(let x=-2.4;x<=2.4;x+=.4)box(counter.group,.035,.94,.04,M.wood,x,.52,.55);
 // Tables are framed and have cylindrical legs; the visual and collision size agree.
 for(const [x,z] of [[-3.1,55.4],[3,58.0],[-2.4,60.5]]){
  const t=prop('table',x,z,{w:1.3,d:.9,h:.8,hp:45,label:'ΤΡΑΠΕΖΙ'});box(t.group,1.3,.075,.9,M.wood,0,.81,0);for(const xx of [-.5,.5])for(const zz of [-.3,.3])rod(t.group,[xx,.04,zz],[xx,.79,zz],.032);box(t.group,.8,.035,.5,M.ivory,0,.854,0);
 }
 for(const [x,z] of [[-4.2,55.4],[4.1,58],[2,58],[-3.5,60.5]]){
  const c=prop('chair',x,z,{w:.55,d:.62,h:.9,hp:23,grab:true,label:'ΚΑΡΕΚΛΑ'});box(c.group,.55,.1,.52,M.cloth,0,.45,0);box(c.group,.55,.47,.095,M.cloth,0,.72,-.22);for(const xx of [-.23,.23])for(const zz of [-.21,.21])rod(c.group,[xx,.02,zz],[xx,.48,zz]);solids.push(c);
 }
 for(const [x,z,ry] of [[-6.8,55.3,Math.PI/2],[-6.4,58.8,Math.PI/2],[6.7,55.3,Math.PI/2]]){
  const p=prop('window',x,z,{w:.10,d:2.1,h:2.1,hp:22,label:'ΓΥΑΛΙΝΟ ΑΝΕΜΟΦΡΑΓΜΑ'});p.ry=ry;
  const pane=mesh(new T.PlaneGeometry(2.1,1.8),M.glass,p.group,0,1.11,0);pane.rotation.y=ry;p.breakMesh=pane;
  for(const dz of [-1.07,1.07])rod(p.group,[0,.04,dz],[0,2.16,dz],.04);rod(p.group,[0,2.16,-1.1],[0,2.16,1.1]);
 }
 const cart=prop('cart',4.8,53.45,{w:.85,d:.55,h:.95,hp:40,grab:true,label:'ΚΑΡΟΤΣΙ ΜΠΑΡ'});for(const y of [.20,.79])box(cart.group,.88,.05,.55,M.wood,0,y,0);for(const x of [-.36,.36])for(const z of [-.2,.2]){rod(cart.group,[x,.12,z],[x,.98,z]);const wheel=mesh(new T.TorusGeometry(.075,.025,6,12),M.black,cart.group,x,.095,z);wheel.rotation.y=Math.PI/2;}
 function bottle(p,x,z){mesh(new T.CylinderGeometry(.082,.079,.33,12),M.orange,p,x,.2,z);mesh(new T.CylinderGeometry(.034,.062,.18,10),M.orange,p,x,.445,z);mesh(new T.CylinderGeometry(.037,.037,.05,10),M.gold,p,x,.56,z);box(p,.13,.14,.003,M.ivory,x,.24,z+.081);}
 for(let i=0;i<6;i++){const p=prop('bottle',-2+i*.77,51.9,{w:.18,d:.18,h:.59,hp:6,grab:true,label:'ΜΠΟΥΚΑΛΙ',y:11.25});bottle(p.group,0,0);}
 for(const [x,z] of [[1.8,61.1],[-4.7,53.0]]){const p=prop('vase',x,z,{w:.42,d:.42,h:.72,hp:15,grab:true,label:'ΔΙΑΚΟΣΜΗΤΙΚΟ'});mesh(new T.LatheGeometry([[.02,0],[.2,.03],[.25,.3],[.15,.53],[.14,.65]].map(a=>new T.Vector2(...a)),16),M.ivory,p.group);}
 const release=prop('release',-7.55,53.4,{w:.40,d:.50,h:1.0,hp:999,label:'ΔΕΣΤΡΑ · F ΑΠΟΔΕΣΜΕΥΣΗ'});box(release.group,.4,.9,.4,M.orange,0,.45,0);mesh(new T.TorusGeometry(.12,.025,8,16),M.steel,release.group,0,.69,.22);release.active=true;
 const boat=new T.Group();boat.position.set(-9.0,8.45,53.7);root.add(boat);const hull=mesh(new T.SphereGeometry(1,24,12),M.orange,boat,0,0,0);hull.scale.set(1.03,.6,3.15);const cabin=mesh(new T.SphereGeometry(1,20,10),M.ivory,boat,0,.42,0);cabin.scale.set(.86,.59,2.5);for(let z=-1.7;z<2;z+=.65)box(boat,.02,.32,.49,M.dark,-.85,.57,z);
 let boatReleased=false,boatT=0;
 const drinkBottle=new T.Group();bottle(drinkBottle,0,0);root.add(drinkBottle);drinkBottle.visible=false;
 const cell=new T.Group();cell.position.set(0,4.5,45);ship.group.add(cell);cell.visible=false;
 box(cell,5,.15,5,M.dark,0,-.08,0);box(cell,.16,2.8,5,M.ivory,-2.5,1.4,0);box(cell,.16,2.8,5,M.ivory,2.5,1.4,0);box(cell,5,2.8,.15,M.ivory,0,1.4,-2.5);for(let x=-2.45;x<2.5;x+=.27)rod(cell,[x,0,2.45],[x,2.8,2.45],.025);box(cell,1,.20,2.1,M.cloth,-1.6,.53,-.4);for(const x of [-2,-1.2])for(const z of [-1.3,.5])rod(cell,[x,.03,z],[x,.51,z],.03);
 // A lit corridor outside the bars makes the physical cell visible.
 box(cell,5,.15,2.8,M.dark,0,-.08,3.8);box(cell,.16,2.8,3,M.ivory,-2.5,1.4,3.8);box(cell,.16,2.8,3,M.ivory,2.5,1.4,3.8);box(cell,5,.12,8,M.ivory,0,2.86,1.4);
 const light=new T.PointLight(0xffdfac,14,9);light.position.set(0,2.6,0);cell.add(light);
 function fracture(p){if(p.broken||p.type==='bar'||p.type==='release')return false;p.broken=true;p.active=false;p.moving=false;p.group.visible=false;
  for(let i=0;i<Math.min(p.type==='window'?14:8,16);i++){const g=p.type==='window'?new T.TetrahedronGeometry(.09+i%3*.04):new T.BoxGeometry(.1,.08,.21);const f=mesh(g,p.type==='window'?M.glass:M.wood,root,p.group.position.x+(Math.random()-.5)*.6,p.group.position.y+.55+Math.random()*.6,p.group.position.z+(Math.random()-.5)*.6);fragments.push({o:f,v:new T.Vector3((Math.random()-.5)*4,1+Math.random()*3,(Math.random()-.5)*4),t:4});}return true;}
 function spit(p,dir){for(let i=0;i<4;i++){const o=mesh(new T.SphereGeometry(.017,6,4),new T.MeshBasicMaterial({color:0xbce5e7,transparent:true,opacity:.8}),root,p.x+dir.x*.35,p.y+1.58,p.z+dir.z*.35);fragments.push({o,v:dir.clone().multiplyScalar(8).add(new T.Vector3((Math.random()-.5)*.4,.4,(Math.random()-.5)*.4)),t:.28});}}
 function update(dt){for(let i=fragments.length-1;i>=0;i--){const f=fragments[i];f.t-=dt;f.v.y-=9.8*dt;f.o.position.addScaledVector(f.v,dt);f.o.rotation.x+=dt*3;f.o.rotation.z+=dt*5;if(f.o.position.y<10.15){f.o.position.y=10.15;f.v.multiplyScalar(.45);f.v.y=Math.abs(f.v.y)*.3;}if(f.t<0){root.remove(f.o);f.o.geometry.dispose();fragments.splice(i,1);}}
  if(boatReleased){boatT+=dt;boat.position.y=8.45-Math.min(boatT,4)*1.9;boat.position.x=-9-Math.min(boatT,6)*.45;boat.rotation.z=Math.sin(boatT*2)*.1;}
 }
 function reset(){for(const p of props){p.broken=false;p.active=true;p.hp=p.maxHP;p.group.visible=true;Object.assign(p,p.home);p.group.position.set(p.x,p.y,p.z);p.group.rotation.set(0,0,0);p.velocity.set(0,0,0);p.moving=false;p.hitIds.clear();}for(const f of fragments){root.remove(f.o);f.o.geometry.dispose();}fragments.length=0;boatReleased=false;boatT=0;boat.position.set(-9,8.45,53.7);boat.rotation.set(0,0,0);root.visible=true;cell.visible=false;}
 const batches=new Map();for(const o of [...root.children])if(o.isMesh&&o.material.isMeshStandardMaterial){if(!batches.has(o.material))batches.set(o.material,[]);batches.get(o.material).push(o);}for(const [m,items] of batches){if(items.length<2)continue;const parts=items.map(o=>{o.updateMatrix();return o.geometry.clone().applyMatrix4(o.matrix);});const g=mergeGeometries(parts,false);if(g){const o=mesh(g,m,root);for(const old of items){root.remove(old);old.geometry.dispose();}}parts.forEach(g=>g.dispose());}
 return {root,solids,props,M,addProp:prop,spit,drinkBottle,cell,update,reset,fracture,releaseBoat:()=>{if(boatReleased)return false;boatReleased=true;return true;},get released(){return boatReleased;}};
}

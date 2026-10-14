import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';

// A game adaptation of researched Greek building types, not a surveyed replica.
// Distances are metres; every declared destination has a HEARTH route.
export function buildSanctuary(){
 const root=new THREE.Group(),architecture=new THREE.Group(),roofs=new THREE.Group(),upper=new THREE.Group();root.add(architecture,upper,roofs);
 const stone=new THREE.MeshStandardMaterial({color:0xcfc1a6,roughness:.87}),edge=new THREE.MeshStandardMaterial({color:0xe6d8bb,roughness:.76}),blue=new THREE.MeshStandardMaterial({color:0x315c78,roughness:.8}),red=new THREE.MeshStandardMaterial({color:0x984c36,roughness:.82}),bronze=new THREE.MeshStandardMaterial({color:0x8e713d,metalness:.6,roughness:.5}),tile=new THREE.MeshStandardMaterial({color:0xa97050,roughness:.88});
 const geo=new RoundedBoxGeometry(1,1,1,1,.018),cyl=new THREE.CylinderGeometry(1,1,1,32),colliders=[],floors=[],stairs=[],destinations=[],columns=[],parts=[];
 function block(group,x,y,z,w,h,d,mat=stone,solid=false,angle=0){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.scale.set(w,h,d);m.rotation.y=angle;group.add(m);if(solid)colliders.push({x,y,z,w,h,d,angle,tag:'wall'});return m;}
 function floor(x,z,w,d,y=0,group=architecture){block(group,x,y-.2,z,w,.4,d,stone,true);floors.push({x,z,w,d,y});for(const side of [-1,1]){block(group,x+side*(w/2-.25),y+.012,z,.09,.014,d-.3,blue);block(group,x,y+.012,z+side*(d/2-.25),w-.3,.014,.09,blue);}return {x,z,w,d,y};}
 function rail(a,b,group=architecture){const v=new THREE.Vector3(...b).sub(new THREE.Vector3(...a)),len=v.length(),n=Math.ceil(len/.75);for(let i=0;i<=n;i++){const p=new THREE.Vector3(...a).addScaledVector(v,i/n);block(group,p.x,p.y+.8,p.z,.07,1.6,.07,bronze);}const m=block(group,0,0,0,.12,len,.12,bronze);m.position.set(...a).addScaledVector(v,.5).y+=1.6;m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.clone().normalize());
  const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1,0,0),v.clone().normalize());colliders.push({x:(a[0]+b[0])/2,y:(a[1]+b[1])/2+.8,z:(a[2]+b[2])/2,w:len,h:1.6,d:.14,quaternion:q.toArray(),tag:'rail'});
 }
 function wall(x,z,w,h,angle=0,y=0,group=architecture){block(group,x,y+h/2,z,w,h,.5,stone,true,angle);for(const [yy,hh,dd,m]of [[.1,.18,.7,edge],[h-.26,.26,.62,blue],[h,.18,.78,edge]])block(group,x,y+yy,z,w+.08,hh,dd,m,false,angle);
  for(let i=0;i<w-.1;i+=1.1){const t=-w/2+.3+i;for(const dx of [-.07,0,.07])block(group,x+Math.cos(angle)*(t+dx)+Math.sin(angle)*.34,y+h-.25,z-Math.sin(angle)*(t+dx)+Math.cos(angle)*.34,.03,.23,.05,edge,false,angle);}
 }
 function opening(x,z,total,h,width=4.6,angle=0,y=0,group=architecture){const side=(total-width)/2;for(const sign of [-1,1]){const q=sign*(width/2+side/2);wall(x+Math.cos(angle)*q,z-Math.sin(angle)*q,side,h,angle,y,group);}const clear=4.9;block(group,x,y+(h+clear)/2,z,width,h-clear,.54,stone,true,angle);block(group,x,y+clear,z,width+.45,.20,.75,edge,false,angle);}
 const fluted=(()=>{const segments=160,rows=16,positions=[],normals=[],uv=[],indices=[];for(let j=0;j<=rows;j++){const t=j/rows,r=(1-.22*t)+.035*Math.sin(Math.PI*t);for(let i=0;i<=segments;i++){const a=i/segments*Math.PI*2,f=1-.032*(1+Math.cos(a*20)),rr=r*f;positions.push(Math.sin(a)*rr,t,Math.cos(a)*rr);uv.push(i/segments,t);}}for(let j=0;j<rows;j++)for(let i=0;i<segments;i++){const a=j*(segments+1)+i,b=a+segments+1;indices.push(a,a+1,b,b,a+1,b+1);}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();return g;})();
 const echinus=new THREE.LatheGeometry([[.76,0],[.80,.10],[.89,.20],[1.10,.30],[1.16,.38]].map(p=>new THREE.Vector2(...p)),32);
 function column(x,y,z,height=5,r=.45,group=architecture,ionic=false){const shaft=new THREE.Mesh(fluted,stone);shaft.position.set(x,y,z);shaft.scale.set(r,height-.6,r);group.add(shaft);const capital=new THREE.Mesh(echinus,edge);capital.position.set(x,y+height-.60,z);capital.scale.set(r,1,r);group.add(capital);block(group,x,y+height-.13,z,r*2.42,.26,r*2.42,edge);colliders.push({x,y:y+height/2,z,w:r*2,h:height,d:r*2,tag:'column'});columns.push({x,y,z,height,r,ionic});
  if(ionic){for(const yy of [.08,.23]){const base=new THREE.Mesh(cyl,edge);base.position.set(x,y+yy,z);base.scale.set(r*1.2,.13,r*1.2);group.add(base);}for(const side of [-1,1]){const points=[];for(let i=0;i<40;i++){const a=i/39*Math.PI*3.5,rr=r*.34*(1-i/45);points.push(new THREE.Vector3(side*(r*.88+Math.cos(a)*rr),height-.35+Math.sin(a)*rr,r*.78));}const scroll=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),40,r*.07,6,false),edge);scroll.position.set(x,y,z);group.add(scroll);}}
 }
 function stair(id,start,end,width){const rise=end[1]-start[1],run=Math.hypot(end[0]-start[0],end[2]-start[2]),count=Math.round(rise/.2),r=rise/count,tread=run/count,dx=(end[0]-start[0])/run,dz=(end[2]-start[2])/run,angle=Math.atan2(dx,dz);for(let i=0;i<count;i++){const distance=(i+.5)*tread,x=start[0]+dx*distance,z=start[2]+dz*distance,y=start[1]+(i+1)*r;block(architecture,x,y-r/2,z,width,r,tread+.01,edge,true,angle);block(architecture,x-dx*(tread/2-.025),y-.015,z-dz*(tread/2-.025),width,.025,.05,blue,false,angle);}
  for(const side of [-1,1])rail([start[0]+dz*side*(width/2+.09),start[1],start[2]-dx*side*(width/2+.09)],[end[0]+dz*side*(width/2+.09),end[1],end[2]-dx*side*(width/2+.09)]);
  stairs.push({id,start,end,width,count,rise:r,tread});
 }
 function roof(x,z,w,d,y,rise,mat=edge){const angle=Math.atan2(rise,w/2),slope=Math.hypot(w/2,rise);for(const sign of [-1,1]){const m=block(roofs,x+sign*w/4,y+rise/2,z,slope,.18,d,mat);m.rotation.z=-sign*angle;for(let zz=z-d/2;zz<z+d/2;zz+=.6){const ridge=block(roofs,x+sign*w/4,y+rise/2+.11,zz,slope,.045,.06,mat);ridge.rotation.z=-sign*angle;}}
  const shape=new THREE.Shape();shape.moveTo(-w/2,0);shape.lineTo(w/2,0);shape.lineTo(0,rise);shape.closePath();const ped=new THREE.ExtrudeGeometry(shape,{depth:.25,bevelEnabled:false});for(const sign of [-1,1]){const m=new THREE.Mesh(ped,stone);m.position.set(x,y,z+sign*d/2);roofs.add(m);block(roofs,x,y,z+sign*d/2,w+.2,.24,.40,edge);for(const side of [-1,1]){const rim=block(roofs,x+side*w/4,y+rise/2,z+sign*d/2,slope,.18,.4,edge);rim.rotation.z=-side*angle;}}
 }
 // Broad courts and terraces tie together the different building types.
 floor(0,0,145,150,-.02);block(architecture,0,-1.2,0,146,2,151,stone);
 block(architecture,16,2.2,-22,43,4.4,84,stone,true);floor(16,-22,43,84,4.8);stair('sacred-terrace',[16,0,31.04],[16,4.8,20],6.4);floor(16,18,7,4,4.8);
 // Parthenon-inspired 8 x 17 outer colonnade; central bay is widened for HEARTH.
 for(let i=0;i<3;i++)floor(16,-21.5,34.8-i*.8,75.8-i*.8,5.2+i*.4);
 stair('temple-crepis',[16,4.8,18.12],[16,6,15.6],5.4);
 const xColumns=[-14.7,-10.8667,-7.0333,-3.2,3.2,7.0333,10.8667,14.7];for(const z of [14,-57])for(const x of xColumns)column(16+x,6,z,10.4,1);
 for(let i=1;i<16;i++)for(const side of [-1,1])column(16+side*14.7,6,14-i*71/16,10.4,1);
 for(const side of [-1,1]){wall(16+side*8.5,-21,54,8.8,Math.PI/2,6);block(architecture,16+side*14.7,17.04,-21.5,2.3,1.3,73,edge);block(architecture,16+side*14.7,17.52,-21.5,2.4,.42,73,blue);}
 opening(16,6,17.5,8.8,4.8,0,6);opening(16,-48,17.5,8.8,4.8,0,6);wall(16,-34.5,17.5,8.8,0,6);
 for(const z of [14,-57]){block(architecture,16,17.04,z,32,1.3,2.3,edge);block(architecture,16,17.52,z,32,.42,2.4,blue);for(let x=-14.7;x<=14.8;x+=1.92){block(architecture,16+x,17.53,z+1.22,.65,.7,.055,red);for(const d of [-.18,0,.18])block(architecture,16+x+d,17.53,z+1.27,.055,.65,.06,edge);}}
 for(const x of [10.5,21.5])for(const z of [1,-5,-11,-17,-23,-29]){column(x,6,z,4.35,.38);column(x,10.6,z,4.15,.29);block(architecture,x,10.45,z,.95,.3,6,edge);}for(const x of [12,20])for(const z of [-39,-44])column(x,6,z,8.5,.52,architecture,true);
 roof(16,-21.5,33,74,18,3.5);
 // The stoa provides real occupiable upper rooms, separate from the temple.
 for(const level of [0,5.4]){const group=level?upper:architecture;floor(-45,-21,24,78,level,group);wall(-57,-21,78,5.08,Math.PI/2,level,group);for(let z=-60;z<=18;z+=13){wall(-52.5,z,9,5.08,0,level,group);}for(let i=0;i<6;i++){const z=-53.5+i*13;opening(-48,z,13,5.08,4.8,Math.PI/2,level,group);destinations.push({id:`stoa-${level?'upper':'lower'}-${i}`,point:[-52.5,level,z]});}
  for(let z=-60;z<=18;z+=6.5){column(-34.3,level,z,5.08,.46,group,!!level);column(-42.3,level,z,5.08,.40,group,true);}for(const x of [-34.3,-42.3])block(group,x,level+5.16,-21,.95,.28,78,edge);
 }
 for(const z of [-64,22]){floor(-45,z,7,8,5.4,upper);stair('stoa-'+z,[-27.58,0,z],[-40,5.4,z],5.6);floor(-40.7,z,3.8,6,5.4,upper);
  const outer=z<0?-1:1;
  rail([-48.5,5.4,z-4],[-48.5,5.4,z+4],upper);
  rail([-48.5,5.4,z+outer*4],[-41.5,5.4,z+outer*4],upper);
  rail([-41.5,5.4,z+outer*4],[-41.5,5.4,z+outer*3],upper);
  for(const side of [-1,1])rail([-41.5,5.4,z+side*3],[-40,5.4,z+side*2.89],upper);
 }
 rail([-33,5.4,-60],[-33,5.4,18],upper);roof(-45,-21,25,79,10.72,2.2,tile);
 // Propylon: six-column front, broad central passage and lateral halls.
 floor(-4,42,35,14);for(const z of [37,47])for(const x of [-20,-14,-8,0,6,12])column(x,0,z,6.8,.65);opening(-4,42,34,6.6,6.4,0,0);roof(-4,42,35,13,7.25,2.8,tile);
 // A circular sanctuary supplies a different plan and skyline.
 const tx=54,tz=19,radius=11.5;for(let i=0;i<3;i++){const m=new THREE.Mesh(cyl,stone);m.position.set(tx,.2+i*.4,tz);m.scale.set(radius-i*.4,.4,radius-i*.4);architecture.add(m);floors.push({x:tx,z:tz,radius:radius-i*.4,y:.4+i*.4});colliders.push({x:tx,y:.2+i*.4,z:tz,radius:radius-i*.4,h:.4,tag:'round-floor'});}
 // Entrance gaps are deliberately wider than a literal ancient peristyle.
 for(let i=0;i<14;i++){const a=i===0?.30:i===13?Math.PI*2-.30:(i+.5)/14*Math.PI*2;column(tx+Math.sin(a)*9.8,1.2,tz+Math.cos(a)*9.8,6.6,.48);}stair('tholos',[tx,0,32.22],[tx,1.2,29.7],5.2);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(9.8,.46,8,112),edge);ring.rotation.x=Math.PI/2;ring.position.set(tx,8,tz);architecture.add(ring);const coneroof=new THREE.Mesh(new THREE.ConeGeometry(11,3.2,112),tile);coneroof.position.set(tx,9.9,tz);roofs.add(coneroof);
 const circle=new THREE.Mesh(new THREE.RingGeometry(4.7,4.85,96),blue);circle.rotation.x=-Math.PI/2;circle.position.set(tx,1.21,tz);architecture.add(circle);
 const routes=[
  {id:'propylon-to-terrace',points:[[-4,0,53],[-4,0,33],[16,0,33],[16,0,31.04],[16,4.8,20],[16,4.8,18.12],[16,6,15.6],[16,6,9],[16,6,-15]]},
  {id:'temple-treasury',points:[[16,6,9],[27.5,6,9],[27.5,6,-52],[16,6,-52],[16,6,-41]]},
  {id:'stoa-south-stair',points:[[-25,0,28],[-27.58,0,22],[-40,5.4,22],[-45,5.4,22],[-45,5.4,11.5],[-52.5,5.4,11.5]]},
  {id:'stoa-north-stair',points:[[-25,0,-68],[-27.58,0,-64],[-40,5.4,-64],[-45,5.4,-64],[-45,5.4,-53.5],[-52.5,5.4,-53.5]]},
  {id:'tholos',points:[[54,0,38],[54,0,32.22],[54,1.2,29.7],[54,1.2,19]]},
  ...destinations.map(d=>({id:d.id,points:[[-45,d.point[1],d.point[2]],d.point]}))
 ];
 function instance(group){group.updateMatrixWorld(true);const bins=new Map(),original=[];group.traverse(o=>{if(!o.isMesh)return;original.push(o);const key=o.geometry.uuid+o.material.uuid;if(!bins.has(key))bins.set(key,{geometry:o.geometry,material:o.material,matrices:[]});bins.get(key).matrices.push(o.matrixWorld.clone());});original.forEach(o=>o.removeFromParent());for(const b of bins.values()){const m=new THREE.InstancedMesh(b.geometry,b.material,b.matrices.length);b.matrices.forEach((v,i)=>m.setMatrixAt(i,v));m.computeBoundingSphere();m.castShadow=m.receiveShadow=true;group.add(m);}}
 for(const g of [architecture,upper,roofs])instance(g);
 return {root,architecture,upper,roofs,colliders,floors,stairs,routes,columns,destinations,materials:{stone,edge,pigment:blue},metrics:{outerTempleColumns:46,templeColumnsAcross:8,templeColumnsAlong:17,templeFloor:6,terrace:4.8,stoaUpper:5.4,minimumRoomDoor:4.8,minimumRoomHeadroom:4.9}};
}

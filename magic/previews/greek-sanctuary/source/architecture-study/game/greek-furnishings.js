import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {GREEK_GATES,pressureTray} from './greek-puzzle-rules.js';

// Metres, Y up, local +Z faces into the room. The complete editable source
// shares geometry and materials; furniture never masquerades as loose puzzle weights.
const geometries=new Map(),materials=new Map();
const geometry=(key,make)=>{if(!geometries.has(key))geometries.set(key,make());return geometries.get(key);};
const material=(key,color,metalness=0)=>{if(!materials.has(key))materials.set(key,new THREE.MeshStandardMaterial({color,roughness:metalness?.53:.84,metalness}));return materials.get(key);};
const wood=material('cypress',0x65452d),bronze=material('aged-bronze',0x927046,.65),iron=material('iron',0x414b4a,.7),linen=material('linen',0xb8ad8d),ink=material('ink',0x285a5a),red=material('red',0x853f35),clay=material('clay',0xa86d43);
const rounded=geometry('rounded',()=>new RoundedBoxGeometry(1,1,1,2,.035));
function mesh(g,geo,mat,x,y,z,sx=1,sy=1,sz=1){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.scale.set(sx,sy,sz);g.add(m);return m;}
const box=(g,x,y,z,w,h,d,m)=>mesh(g,rounded,m,x,y,z,w,h,d);
function cylinder(g,x,y,z,r,h,m,rTop=r){const geo=geometry(`cylinder-${rTop/r}`,()=>new THREE.CylinderGeometry(rTop/r,1,1,16));return mesh(g,geo,m,x,y,z,r,h,r);}
function ring(g,x,y,z,r,t,m,rx=0,rz=0){const geo=geometry(`ring-${r}-${t}`,()=>new THREE.TorusGeometry(r,t,6,32)),a=mesh(g,geo,m,x,y,z);a.rotation.set(rx,0,rz);return a;}
function beam(g,a,b,r,m){const d=new THREE.Vector3(...b).sub(new THREE.Vector3(...a)),o=cylinder(g,...new THREE.Vector3(...a).addScaledVector(d,.5).toArray(),r,d.length(),m);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return o;}
function turnedLeg(g,x,z,h,m=wood){for(const [y,r,hh,rt] of [[h*.12,.105,h*.24,.075],[h*.55,.075,h*.64,.115],[h*.91,.14,h*.10,.14]])cylinder(g,x,y,z,r,hh,m,rt);}
function table(g,p,w=2.4,d=1.15,h=1.04){box(g,0,h,0,w,.16,d,wood);for(const x of [-w*.4,w*.4])for(const z of [-d*.35,d*.35])turnedLeg(g,x,z,h-.08);box(g,0,h-.22,0,w*.88,.16,d*.72,wood);for(const s of [-1,1])box(g,0,h+.085,s*d*.43,w*.94,.014,.035,bronze);}
function scroll(g,x,y,z,a=0){const roll=new THREE.Group();for(const side of [-1,1]){const c=cylinder(roll,side*.27,0,0,.075,.52,linen);c.rotation.x=Math.PI/2;const end=cylinder(roll,side*.27,0,.28,.035,.05,bronze);end.rotation.x=Math.PI/2;}box(roll,0,-.01,0,.52,.015,.48,linen);for(let i=0;i<5;i++)box(roll,0,.005,-.14+i*.065,.25-(i%2)*.06,.009,.012,ink);roll.position.set(x,y,z);roll.rotation.y=a;g.add(roll);}
function bowl(g,x,y,z,r,p){const points=[[.07,0],[.13,.03],[.25,.16],[.29,.25],[.27,.25],[.23,.16],[.11,.05]].map(([x,y])=>new THREE.Vector2(x,y));const geo=geometry('bowl',()=>new THREE.LatheGeometry(points,24));return mesh(g,geo,p,x,y,z,r/.29,r/.29,r/.29);}
function leafBranch(g,x,y,z,angle,p){const branch=new THREE.Group();beam(branch,[0,0,0],[.25,.7,0],.018,wood);const leafGeo=geometry('leaf',()=>new THREE.SphereGeometry(1,8,5));for(let i=0;i<6;i++){const s=i%2?1:-1,l=mesh(branch,leafGeo,p,.04+i*.036+s*.10,.12+i*.09,0,.14,.035,.055);l.rotation.z=s*.5;}branch.rotation.y=angle;branch.position.set(x,y,z);g.add(branch);}
function vase(g,x,y,z,size,kit){const v=kit.urn();v.scale.multiplyScalar(size);v.position.set(x,y,z);g.add(v);return v;}
function shield(g,x,y,z,kit){const s=kit.shield();s.position.set(x,y,z);s.rotation.y=Math.PI;g.add(s);}
function meander(g,y,z,w,p){for(let x=-w/2+.12;x<w/2-.12;x+=.26){box(g,x,y,z,.19,.035,.02,p);box(g,x+.08,y-.065,z,.035,.13,.02,p);box(g,x+.015,y-.12,z,.13,.03,.02,p);}}
function plinth(g,p,w=2.4,d=1.1,h=.9){box(g,0,.09,0,w,.18,d,p.edge);box(g,0,h*.52,0,w-.16,h-.22,d-.14,p.stone);box(g,0,h,0,w+.06,.12,d+.04,p.edge);meander(g,h-.23,d/2-.06,w-.25,p.pigment);}

export function makeGreekFurniture(kind,p,kit){
 const g=new THREE.Group();g.name='Greek furniture · '+kind;
 if(['kline','pallet'].includes(kind)){
  const stone=kind==='pallet';if(stone)plinth(g,p,1.48,2.35,.34);else{for(const x of [-.62,.62])for(const z of [-1,1])turnedLeg(g,x,z,.56);box(g,0,.49,0,1.5,.17,2.35,wood);for(const s of [-1,1]){box(g,0,.71,s*1.15,1.52,.43,.11,wood);for(const x of [-.69,.69]){cylinder(g,x,.85,s*1.15,.085,.75,wood);cylinder(g,x,1.24,s*1.15,.105,.08,bronze);}}}
  box(g,0,stone?.48:.66,0,1.36,.22,2.12,linen);box(g,0,stone?.59:.77,-.74,1.12,.20,.52,linen);
  // Woven cover drapes over the mattress with continuous soft folds.
  const cloth=geometry('draped-cover',()=>{const geo=new THREE.PlaneGeometry(1.55,1.24,20,16),a=geo.attributes.position;for(let i=0;i<a.count;i++){const x=a.getX(i),z=a.getY(i),drop=Math.max(0,Math.abs(x)-.57)*1.5;a.setXYZ(i,x,.80-drop+Math.sin(x*26+z*7)*.018,z+.36);}geo.computeVertexNormals();return geo;});const c=mesh(g,cloth,stone?p.pigment:ink,0,stone?-.18:0,0);c.material.side=THREE.DoubleSide;
 }else if(kind==='scroll-cabinet'){
  for(const side of [-1,1])box(g,side*.53,1,0,.14,2,2.12,wood);for(const y of [.13,.69,1.25,1.88])box(g,0,y,0,1.2,.09,2.2,wood);box(g,.51,1,0,.10,1.8,1.96,wood);
  for(let row=0;row<3;row++)for(let i=0;i<7;i++){const zz=-.86+i*.28;const c=cylinder(g,-.13,.29+row*.56,zz,.105,.76,linen);c.rotation.z=Math.PI/2;cylinder(g,-.52,.29+row*.56,zz,.039,.02,bronze).rotation.z=Math.PI/2;}
  for(const z of [-.9,.9])box(g,-.61,1,z,.025,1.74,.035,bronze);vase(g,0,1.94,0,.33,kit);
 }else if(kind==='weapon-rack'){
  for(const z of [-.93,.93]){box(g,0,1,z,.18,2,.18,wood);box(g,0,.12,z,1.12,.22,.4,wood);}for(const y of [.45,1.65])box(g,0,y,0,.18,.13,2.1,wood);
  for(let i=0;i<5;i++){const z=-.8+i*.4;beam(g,[-.24,.12,z],[-.24,1.95,z],.027,wood);const point=geometry('spear',()=>new THREE.ConeGeometry(.085,.34,4));mesh(g,point,iron,-.24,2.08,z);}
  for(const z of [-.55,.55]){const s=kit.shield();s.position.set(.12,.86,z);s.rotation.y=-Math.PI/2;s.scale.setScalar(.73);g.add(s);}
 }else if(kind==='furnace'){
  plinth(g,p,1.18,2.16,.27);for(const z of [-.86,.86])box(g,0,1.03,z,1.15,1.6,.32,p.stone);box(g,-.45,1.03,0,.25,1.6,1.6,p.stone);box(g,0,1.91,0,1.2,.24,2.17,p.edge);
  const coal=material('coal',0x382923);for(let i=0;i<12;i++)mesh(g,geometry('coal-lump',()=>new THREE.IcosahedronGeometry(.13,0)),coal,((i*3)%5)*.13-.3,.47,(i%4)*.29-.44);
  for(let i=0;i<5;i++)box(g,.52,.73,-.65+i*.32,.04,.8,.045,iron);box(g,.52,1.1,0,.07,.055,1.45,bronze);
 }else if(kind==='anvil'){
  cylinder(g,0,.38,0,.48,.76,wood);for(const y of [.17,.58])ring(g,0,y,0,.48,.025,iron,Math.PI/2);
  box(g,0,.85,0,.7,.22,1.1,iron);box(g,0,1.08,0,.36,.34,.8,iron);box(g,0,1.32,0,.78,.19,1.35,iron);
  const horn=mesh(g,geometry('horn',()=>new THREE.ConeGeometry(.28,.65,16)),iron,0,1.3,.94);horn.rotation.x=Math.PI/2;
  beam(g,[-.34,1.44,-.4],[.3,1.44,.23],.04,wood);box(g,-.3,1.47,-.36,.35,.16,.25,iron);for(let i=0;i<3;i++)box(g,.28,.06,-.7+i*.18,.45,.11,.12,bronze);
 }else if(['reading-table','map-table','observatory'].includes(kind)){
  table(g,p);if(kind==='observatory'){
   cylinder(g,0,1.23,0,.22,.28,bronze);const globe=mesh(g,geometry('globe',()=>new THREE.SphereGeometry(.22,20,12)),p.pigment,0,1.76,0);
   ring(g,0,1.76,0,.55,.026,bronze,0,.35);ring(g,0,1.76,0,.57,.026,bronze,Math.PI/2,.15);ring(g,0,1.76,0,.59,.02,bronze,.7,.65);beam(g,[0,1.16,0],[0,2.38,0],.025,bronze);scroll(g,-.77,1.16,.1,.16);
  }else{scroll(g,-.52,1.16,.05,.18);scroll(g,.48,1.16,-.12,-.21);bowl(g,.88,1.14,.31,.11,bronze);for(let i=0;i<3;i++){const c=cylinder(g,-.83,1.16+i*.07,-.3,.055,.48,linen);c.rotation.z=Math.PI/2;}if(kind==='map-table'){box(g,0,1.16,0,.85,.012,.6,p.pigment);for(let i=0;i<6;i++)cylinder(g,-.28+(i%3)*.28,1.23,-.15+Math.floor(i/3)*.3,.04,.14,bronze);}}
 }else if(kind==='sarcophagus'){
  plinth(g,p,2.45,1.15,.84);box(g,0,.97,0,2.4,.21,1.1,p.edge);for(const x of [-.88,.88]){cylinder(g,x,1.11,0,.22,.08,p.pigment);ring(g,x,1.17,0,.15,.02,bronze,Math.PI/2);}for(const x of [-1.05,1.05])for(const z of [-.38,.38])cylinder(g,x,.54,z,.07,.65,p.edge);
 }else if(kind==='ossuary'){
  plinth(g,p,2.4,1.1,.5);box(g,0,1.14,-.35,2.3,1.4,.25,p.stone);for(const x of [-.75,0,.75]){box(g,x,1.15,-.2,.58,.95,.04,p.pigment);vase(g,x,.58,-.04,.44,kit);box(g,x,1.69,-.23,.72,.12,.44,p.edge);}
 }else if(['offering','altar','vase-display','olive-urn'].includes(kind)){
  plinth(g,p,kind==='altar'?2.7:2.35,1.15,kind==='altar'?1.08:.76);
  const y=kind==='altar'?1.15:.83;
  if(kind==='vase-display'){vase(g,-.64,y,0,.72,kit);vase(g,.66,y,0,.50,kit);}
  else if(kind==='olive-urn'){vase(g,0,y,0,.85,kit);for(let i=0;i<5;i++)leafBranch(g,0,y+.7,0,i*Math.PI*.4,p.pigment);}
  else{bowl(g,0,y,0,.4,bronze);for(const x of [-.88,.88]){vase(g,x,y,0,.32,kit);ring(g,x,y+.38,0,.15,.022,bronze,Math.PI/2);}if(kind==='altar')for(const x of [-.58,.58])leafBranch(g,x,y,0,x*2,p.pigment);}
 }else if(kind==='bench'){
  box(g,0,.56,0,2.4,.18,.8,p.edge);for(const x of [-.88,.88]){box(g,x,.27,0,.27,.54,.72,p.stone);box(g,x,.87,-.34,.18,.65,.16,p.stone);}box(g,0,1.04,-.36,2.4,.32,.12,p.edge);meander(g,1.13,-.28,2.2,p.pigment);
 }else if(kind==='supply-rack'){
  table(g,p,2.4,1.15,.78);for(const x of [-.78,0,.78]){const c=cylinder(g,x,.95,0,.15,.76,linen);c.rotation.x=Math.PI/2;for(const z of [-.2,.2])ring(g,x,.95,z,.153,.017,wood);}shield(g,0,.37,.54,kit);
 }
 return g;
}

const roomKinds={courtyard:['olive-urn','bench'],hall:['bench','offering'],crypt:['sarcophagus','offering'],armoury:['weapon-rack','supply-rack'],barracks:['supply-rack','bench'],prison:['bench','offering'],ritual:['offering','altar'],library:['reading-table','scroll-cabinet'],forge:['supply-rack','offering'],catacombs:['ossuary','sarcophagus'],sanctum:['altar','offering'],gallery:['vase-display','bench'],watchtower:['observatory','map-table'],gatehouse:['map-table','supply-rack']};
const overlap=(a,b,gap=0)=>Math.abs(a.x-b.x)<(a.w+b.w)/2+gap&&Math.abs(a.z-b.z)<(a.d+b.d)/2+gap;
function batch(root,groups){
 const batches=new Map();for(const g of groups){g.updateMatrixWorld(true);g.traverse(o=>{if(!o.isMesh)return;const tile=Math.floor(g.position.x/18)+','+Math.floor(g.position.z/18),key=tile+o.geometry.uuid+o.material.uuid;if(!batches.has(key))batches.set(key,{geometry:o.geometry,material:o.material,matrices:[]});batches.get(key).matrices.push(o.matrixWorld.clone());});}
 const out=new THREE.Group();out.name='Greek room furnishings · shared geometry';for(const b of batches.values()){const m=new THREE.InstancedMesh(b.geometry,b.material,b.matrices.length);b.matrices.forEach((v,i)=>m.setMatrixAt(i,v));m.computeBoundingSphere();m.castShadow=m.receiveShadow=true;out.add(m);}root.add(out);return out.children.length;
}
export function dressGreekFurnishings({root,rooms,boundary,colliders,props,kit}){
 const groups=[],placed=[],reserved=GREEK_GATES.flatMap(g=>[...(pressureTray(g.plates)?[pressureTray(g.plates)]:[]),...g.homes.map(p=>({...p,w:1.5,d:1.5}))]);
 function place(room,kind,x,z,rotation,w,d,h){const g=makeGreekFurniture(kind,kit.palette(room),kit);g.position.set(x,0,z);g.rotation.y=rotation;groups.push(g);const turned=Math.abs(Math.sin(rotation))>.7,b={x,z,y:h/2,w:turned?d:w,h,d:turned?w:d,tag:'greek-furniture',room,kind};colliders.push(b);placed.push(b);return b;}
 // Replace dated furniture in exactly its existing bay, not by filling routes.
 for(const r of rooms){const cx=r.x+r.w/2,cz=r.z+r.d/2;
  if(['library','armoury','forge'].includes(r.id))for(const s of [-1,1]){const z=cz-(r.id==='forge'||r.id==='library'&&s<0?2:3.5);place(r.id,r.id==='library'?'scroll-cabinet':r.id==='armoury'?'weapon-rack':s<0?'furnace':'anvil',cx+s*(r.w/2-2.1),z,s<0?Math.PI:0,1.2,2.2,2.3);}
  if(['barracks','prison','gatehouse'].includes(r.id))for(const s of [-1,1])place(r.id,r.id==='prison'?'pallet':'kline',cx+s*(r.w/2-3),cz+(r.id==='gatehouse'?3.5:5),0,1.6,2.5,1.3);
  if(!roomKinds[r.id])continue;
  let count=0;const edges=boundary.filter(e=>e.room===r.id&&e.hi-e.lo>5.8).sort((a,b)=>(b.hi-b.lo)-(a.hi-a.lo));
  for(const e of edges){
   if(count>=4)break;const along=e.axis==='x',rot=along?(e.normal<0?0:Math.PI):e.normal<0?Math.PI/2:-Math.PI/2;
   for(const fraction of [.25,.75,.5]){
    if(count>=4)break;const t=e.lo+2+(e.hi-e.lo-4)*fraction,x=along?t:e.at-e.normal*1.45,z=along?e.at-e.normal*1.45:t;
    const kind=roomKinds[r.id][count%2],w=kind==='weapon-rack'||kind==='scroll-cabinet'?1.2:2.7,d=kind==='weapon-rack'||kind==='scroll-cabinet'?2.2:1.2,foot={x,z,w:along?w:d,d:along?d:w};
    // All physical furniture participates in the existing pressure-supply planner.
    if(colliders.some(b=>b.y-b.h/2<2.5&&overlap(foot,b,.35))||props.some(b=>overlap(foot,{...b,w:1.4,d:1.4},.4))||reserved.some(b=>overlap(foot,b,.9)))continue;
    place(r.id,kind,x,z,rot,w,d,kind==='observatory'?2.5:kind==='scroll-cabinet'||kind==='weapon-rack'?2.3:kind==='olive-urn'?2.4:1.7);count++;
   }
  }
 }
 const batches=batch(root,groups);root.userData.greekFurnishings={placements:placed,batches};return root.userData.greekFurnishings;
}

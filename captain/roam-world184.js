import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {DECKS,STAIRS,CORES,DESTINATIONS,zoneAt} from './shipwalk184.js';
/** Open rooms and stair geometry. All blocking furniture is also registered in solids. */
export function createRoamWorld(ship,world){
 const root=new T.Group();root.name='Walkable ship interiors and stair cores';world.root.add(root);const solids=[],props=[];
 const M=world.M,wallMat=new T.MeshStandardMaterial({color:0xd9ded7,roughness:.82}),carpet=new T.MeshStandardMaterial({color:0x235464,roughness:.98}),light=new T.MeshStandardMaterial({color:0xffd6a0,emissive:0xffc271,emissiveIntensity:.7,roughness:.7});
 const box=(w,h,d,m,x,y,z)=>{const o=new T.Mesh(new T.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.receiveShadow=true;root.add(o);return o;};
 const solid=(x,y,z,w,d,h=2.3,m=wallMat)=>{box(w,h,d,m,x,y+h/2,z);const s={x,y,z,w,d,h,active:true};solids.push(s);return s;};
 function rod(a,b,r=.038,m=M.steel){const av=new T.Vector3(...a),bv=new T.Vector3(...b),o=new T.Mesh(new T.CylinderGeometry(r,r,av.distanceTo(bv),8),m);o.position.copy(av).lerp(bv,.5);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),bv.sub(av).normalize());root.add(o);}
 function sign(text,x,y,z,angle=0,w=2.3){const c=document.createElement('canvas');c.width=512;c.height=128;const g=c.getContext('2d');g.fillStyle='#102f3d';g.fillRect(0,0,512,128);g.strokeStyle='#dfbd80';g.lineWidth=5;g.strokeRect(4,4,504,120);g.fillStyle='#fff1d2';g.font='bold 32px sans-serif';g.textAlign='center';g.fillText(text,256,79,485);const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;const o=new T.Mesh(new T.PlaneGeometry(w,w/4),new T.MeshBasicMaterial({map:tx,side:T.DoubleSide}));o.position.set(x,y,z);o.rotation.y=angle;root.add(o);return o;}
 function wallWithDoor(x,y,z0,z1,doorZ,width=1.8){const end=doorZ-width/2,start=doorZ+width/2;if(end>z0)solid(x,y,(z0+end)/2,.15,end-z0);if(start<z1)solid(x,y,(start+z1)/2,.15,z1-start);box(.19,.18,width,M.wood,x,y+2.25,doorZ);}
 // Service deck is inside the existing hull; no detached room or teleport.
 box(17,.14,83,carpet,0,6.56,-1.5);
 for(const side of [-1,1])solid(side*8.46,6.65,-1.5,.15,83,2.9);
 solid(0,6.65,-43,17,.15,2.9);solid(0,6.65,40,17,.15,2.9);
 for(const y of [10.1,13.12,15.83,18.57,21.35]){
  const max=y===21.35?6.35:y===18.57?7.75:y===15.83?8.48:y===13.12?8.91:9.20;
  const z0=y===21.35?-18:y===18.57?-27:y===15.83?-36:y===13.12?-43:-44;
  const z1=y===21.35?16.5:y===18.57?27:y===15.83?34:y===13.12?41:46;
  for(const side of [-1,1]){
   // A rail/glazed wall collider matches the actual cruise liner ribbon.
   // Sky fore stair is outside its glazed salon, with an open access end.
   solid(side*max,y,(z0+z1-(y===10.1?5.5:1))/2,.10,z1-z0-(y===10.1?5.5:1),2.35,y===21.35?M.glass:wallMat);
  }
  // Central aisle remains free on every accommodation deck.
  box(3.1,.022,z1-z0-1,carpet,0,y+.02,(z0+z1)/2);
  for(let z=z0+4;z<z1-1;z+=8){box(1.2,.045,.10,light,0,y+2.34,z);for(const side of [-1,1])box(.12,.09,.45,M.gold,side*1.66,y+.07,z);}
 }
 // Repeated stair flights share exact definitions with the collision solver.
 for(const st of STAIRS){const n=Math.ceil((st.high-st.low)/.16),dz=(st.z1-st.z0)/n;
  for(let i=0;i<n;i++){const z=st.z0+(i+.5)*dz,y=st.low+(i+.5)/n*(st.high-st.low);box(st.w,.13,dz+.025,M.wood,st.x,y-.09,z);box(st.w-.16,.018,.035,M.gold,st.x,y-.018,z+dz*.43);}
  for(const side of [-1,1]){const x=st.x+side*(st.w/2+.01);rod([x,st.low+1.02,st.z0],[x,st.high+1.02,st.z1]);for(let i=0;i<=8;i++){const z=st.z0+i/8*(st.z1-st.z0),y=st.low+i/8*(st.high-st.low);rod([x,y,z],[x,y+1.02,z]);if(i<8)solids.push({x,y:y-.03,z:z+(st.z1-st.z0)/16,w:.09,d:(st.z1-st.z0)/8,h:1.06,active:true});}}
  // Neither landing is fenced off.
 }
 for(const d of DECKS){for(const c of CORES){sign('ΣΚΑΛΑ  ↑  /  ↓',c.x,d.y+1.75,c.z0-.7,Math.PI,1.6);sign(d.name,c.x,d.y+1.72,c.z1+.7,0,2.4);}}
 // Aft stair set giving direct access to the pool terrace.
 sign('ΠΙΣΙΝΑ ↑',-6.4,12.2,-60,Math.PI,1.8);sign('ΠΙΣΙΝΑ ↑',6.4,12.2,-60,Math.PI,1.8);
 // Pool basin and existing deck fittings are real obstacles, not walk-through visuals.
 solids.push({x:0,y:13.12,z:-49.5,w:8.45,d:14.8,h:.53,active:true});
 solids.push({x:0,y:10.1,z:66,w:.58,d:.58,h:4.7,active:true});
 for(const x of [-2.25,2.25])solids.push({x,y:10.1,z:63.6,w:.9,d:.9,h:.5,active:true});
 // Main public rooms. Wide openings, continuous central aisle and two access cores.
 for(const side of [-1,1])for(const [a,b,c] of [[-42,-29,-34],[-13,16,6],[29,44,35]])wallWithDoor(side*2.45,10.1,a,b,c,2.4);
 const addProp=(type,x,y,z,opts={})=>{const p=world.addProp(type,x,z,{y,...opts});props.push(p);return p;};
 function table(x,y,z){const p=addProp('table',x,y,z,{w:1.25,d:.85,h:.81,hp:40,label:'ΤΡΑΠΕΖΙ'});const slab=new T.Mesh(new T.BoxGeometry(1.25,.08,.85),M.wood);slab.position.y=.78;p.group.add(slab);for(const dx of [-.5,.5])for(const dz of [-.3,.3]){const o=new T.Mesh(new T.CylinderGeometry(.027,.04,.75,7),M.steel);o.position.set(dx,.375,dz);p.group.add(o);}return p;}
 function sofa(x,y,z,w=2.2){solid(x,y,z,w,.85,.58,M.cloth);box(w,.65,.2,M.cloth,x,y+.73,z-.38);for(const side of [-1,1])box(.15,.4,.85,M.wood,x+side*(w/2-.075),y+.6,z);}
 for(const side of [-1,1]){sofa(side*5.5,10.1,12);sofa(side*5.5,10.1,-4);table(side*5.5,10.1,9.8);table(side*5.5,10.1,-1.8);}
 sign('ΣΑΛΟΝΙ ΕΠΙΒΑΤΩΝ',0,12.05,42,Math.PI,3.5);
 sign('ΠΕΡΙΠΑΤΟΣ / ΠΡΥΜΝΗ',0,12.05,-44,0,3.5);
 // Eight furnished, open-door cabins on deck 06. Doors are real openings.
 for(const side of [-1,1])for(let i=0;i<4;i++){
  const z0=-13+i*7,z1=z0+7,cz=(z0+z1)/2,xwall=side*2.3;
  wallWithDoor(xwall,13.12,z0,z1,cz,1.8);
  solid(side*5.55,13.12,z0,6.4,.12,2.30);if(i===3)solid(side*5.55,13.12,z1,6.4,.12,2.3);
  const bx=side*6.5;solid(bx,13.12,cz,1.5,2.15,.50,M.wood);box(1.44,.18,2.1,M.ivory,bx,13.72,cz);box(1.42,.04,1.32,carpet,bx,13.82,cz+.32);box(1.1,.12,.5,wallMat,bx,13.83,cz-.74);
  solid(side*3.45,13.12,z0+.85,.85,.85,1.7,M.wood);sign('ΚΑΜΠΙΝΑ '+(201+i+(side>0?4:0)),xwall-side*.11,15.37,cz,side>0?-Math.PI/2:Math.PI/2,1.25);
 }
 // Restaurant and theatre use distinct furniture, with central escape aisles.
 for(const side of [-1,1])for(const z of [3,9,15])table(side*5.2,15.83,z);
 sign('ΕΣΤΙΑΤΟΡΙΟ',0,17.93,18,Math.PI,3);sign('ΘΕΑΤΡΟ',0,17.93,-3,0,2.5);
 box(10,.18,2.3,M.wood,0,15.84,-14);box(10,2.1,.2,carpet,0,16.98,-15.3);
 for(const side of [-1,1])for(const z of [-5,-8,-11])sofa(side*4.2,15.83,z,2.7);
 // Observation lounges and upper terraces.
 for(const y of [18.57,21.35])for(const side of [-1,1]){sofa(side*3.9,y,5);sofa(side*3.9,y,12);table(side*3.9,y,8.5);}
 sign('ΠΑΝΟΡΑΜΙΚΟ ΣΑΛΟΝΙ',0,23.3,20,Math.PI,3.3);
 // Engine room: rounded engine casings, pipes and a clear centre gangway.
 const engineMat=new T.MeshStandardMaterial({color:0x3c7676,roughness:.43,metalness:.5});
 for(const side of [-1,1])for(const z of [-12,-6]){
  solid(side*4.7,6.65,z,2.5,4.3,.45,M.dark);
  const eng=new T.Mesh(new T.CylinderGeometry(.9,.9,3.8,20),engineMat);eng.rotation.x=Math.PI/2;eng.position.set(side*4.7,7.9,z);root.add(eng);solids.push({x:side*4.7,y:6.65,z,w:2.2,d:4.3,h:2.2,active:true});
  for(const dz of [-1.4,-.6,.2,1])box(1.75,.2,.16,M.steel,side*4.7,8.8,z+dz);
  rod([side*4.7,8.8,z],[side*4.7,9.1,z+2.3],.12,engineMat);
 }
 sign('ΜΗΧΑΝΟΣΤΑΣΙΟ',0,8.76,-1,Math.PI,3);sign('ΧΩΡΟΣ ΠΛΗΡΩΜΑΤΟΣ',0,8.76,16,Math.PI,3.4);
 for(const side of [-1,1])table(side*4.5,6.65,9);
 // Small bottles remain pickup-able in distant rooms, not only at the first bar.
 for(const [x,y,z]of [[5.5,10.93,9.8],[-5.5,10.93,-1.8],[5.2,16.66,9],[-3.9,22.18,8.5],[4.5,7.48,9]]){
  const p=addProp('bottle',x,y,z,{w:.18,d:.18,h:.45,hp:8,grab:true,label:'ΜΠΟΥΚΑΛΙ'});const b=new T.Mesh(new T.CylinderGeometry(.065,.075,.27,12),M.orange);b.position.y=.16;p.group.add(b);const neck=new T.Mesh(new T.CylinderGeometry(.025,.033,.13,10),M.gold);neck.position.y=.355;p.group.add(neck);
 }
 // Merge static architecture by material to keep mobile draw calls bounded.
 const batches=new Map();for(const o of [...root.children])if(o.isMesh&&o.material.isMeshStandardMaterial&&!o.material.transparent){if(!batches.has(o.material))batches.set(o.material,[]);batches.get(o.material).push(o);}
 for(const [m,items] of batches){if(items.length<2)continue;const parts=items.map(o=>{o.updateMatrix();return o.geometry.clone().applyMatrix4(o.matrix);}),g=mergeGeometries(parts,false);if(g){const merged=new T.Mesh(g,m);merged.receiveShadow=true;merged.name='Roam architecture';root.add(merged);for(const o of items){root.remove(o);o.geometry.dispose();}}parts.forEach(g=>g.dispose());}
 const roomFill=new T.PointLight(0xffe6c8,7,18,1);roomFill.visible=false;root.add(roomFill);
 function update(p){const inside=p.y<8||(Math.abs(p.x)<(p.y>20?6.2:8.6)&&p.z<(p.y>20?18:39)&&p.z>(p.y>20?-18:-42));roomFill.visible=inside;if(inside)roomFill.position.set(p.x,p.y+2.12,p.z+.25);}
 return {root,solids,props,update,inspect:()=>({decks:DECKS.length,stairs:STAIRS.length,cabins:8,areas:DESTINATIONS.length})};
}

import * as THREE from './vendor/three.module.js';

const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,value));
const mix=(a,b,t)=>a+(b-a)*t;
const seedFor=value=>{let seed=2166136261;for(const c of String(value))seed=Math.imul(seed^c.charCodeAt(0),16777619);return seed>>>0;};
const random=seed=>()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};

// These thresholds describe the existing collision contract. Damage can remove
// parapets before a breach, but cannot make a whole-height opening sooner.
export const FORT_WALL_OPEN_RATIOS=Object.freeze([0,.17,.035,0]);
export const FORT_GATE_OPEN_RATIO=.16;
export const MAX_IMPACT_BURSTS=20;
export const IMPACT_FRAGMENT_LIMIT=10;
export const IMPACT_DUST_LIMIT=5;

function clip(polygon,axis,limit,above){
 const out=[];
 for(let i=0;i<polygon.length;i++){
  const a=polygon[i],b=polygon[(i+1)%polygon.length],insideA=above?a.p[axis]>=limit:a.p[axis]<=limit,insideB=above?b.p[axis]>=limit:b.p[axis]<=limit;
  if(insideA)out.push(a);
  if(insideA!==insideB){const t=(limit-a.p[axis])/(b.p[axis]-a.p[axis]),v={};for(const key of['p','n','uv','uv1','color'])v[key]=a[key].map((value,j)=>mix(value,b[key][j],t));out.push(v);}
 }
 return out;
}
function append(batch,material,polygon,attributes={}){
 if(polygon.length<3)return;let data=batch.get(material);
 if(!data){data={p:[],n:[],uv:[],uv1:[],color:[],hasUV1:false,hasColor:false};batch.set(material,data);}
 data.hasUV1||=!!attributes.uv1;data.hasColor||=!!attributes.color;
 for(let i=1;i<polygon.length-1;i++)for(const vertex of[polygon[0],polygon[i],polygon[i+1]])for(const key of['p','n','uv','uv1','color'])data[key].push(...vertex[key]);
}
function meshBatch(batch,name){
 const group=new THREE.Group();group.name=name;
 for(const[material,data]of batch){
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(data.p,3));geometry.setAttribute('normal',new THREE.Float32BufferAttribute(data.n,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(data.uv,2));
  if(data.hasUV1)geometry.setAttribute('uv1',new THREE.Float32BufferAttribute(data.uv1,2));if(data.hasColor)geometry.setAttribute('color',new THREE.Float32BufferAttribute(data.color,3));geometry.computeBoundingSphere();
  const mesh=new THREE.Mesh(geometry,material);mesh.castShadow=mesh.receiveShadow=true;mesh.userData.damageSlice=true;group.add(mesh);
 }
 return group;
}
function appendFace(batch,material,points,normal=[0,1,0]){
 append(batch,material,points.map(p=>({p,n:normal,uv:[p[0]*.48,p[2]*.48],uv1:[0,0],color:[1,1,1]})));
}
function scarGeometry(length,height,gate,seed){
 const rand=random(seed),levels=[new Map(),new Map(),new Map()];
 for(let n=0;n<7;n++){
  let x=(rand()-.5)*(length-3);if(gate&&Math.abs(x)<2.9)x=Math.sign(x||1)*3.4;
  const y=height*(.24+rand()*.5),face=n%2?1:-1,z=face*1.115,points=[[x,y+.85,z],[x+.14,y+.42,z],[x-.12,y+.12,z],[x+.17,y-.25,z],[x+.04,y-.66,z]];
  for(let level=0;level<3;level++){
   if(n>2+level*2)continue;const width=.016+level*.015;
   for(let j=1;j<points.length;j++){
    const a=points[j-1],b=points[j],dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy),ox=dy/d*width,oy=-dx/d*width;
    const data=levels[level].get('positions')||[];data.push(a[0]-ox,a[1]-oy,z,a[0]+ox,a[1]+oy,z,b[0]+ox,b[1]+oy,z,a[0]-ox,a[1]-oy,z,b[0]+ox,b[1]+oy,z,b[0]-ox,b[1]-oy,z);levels[level].set('positions',data);
   }
  }
 }
 return levels.map(level=>{const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(level.get('positions')||[],3));geometry.computeVertexNormals();return geometry;});
}

/** Precompute a small set of real, textured masonry states once per wall. */
export function createFortWallDamage(wall,materials,{height,length,index,seed=0,gate=false}={}){
 const original=new THREE.Group();original.name='Original curtain wall';
 for(const child of [...wall.children])if(!child.userData.gate&&!child.userData.gateRubble)original.add(child);
 wall.add(original);wall.updateWorldMatrix(true,true);
 const toLocal=new THREE.Matrix4().copy(wall.matrixWorld).invert(),batches=[new Map(),new Map(),new Map()],columnCount=9,columnWidth=length/columnCount;
 const cutHeights=batches.map((_,stage)=>Array.from({length:columnCount},(_,column)=>{
  // Keep the lintel above the gate while its flanks are solid. The wooden gate
  // has its own exact collision threshold; chipped parapets are not doorways.
  const x=(column+.5)*columnWidth-length/2;if(gate&&Math.abs(x)<3.4)return height+1.5;
  const irregular=.18+((seed+column*19)%7)*.065;
  return Math.max(2.75,height*([.99,.85,.67][stage])+irregular);
 }));
 const vector=new THREE.Vector3(),normal=new THREE.Vector3();
 original.traverseVisible(mesh=>{
  if(!mesh.isMesh||mesh.isInstancedMesh)return;const geometry=mesh.geometry,attributes=geometry.attributes,p=attributes.position;if(!p)return;
  const transform=new THREE.Matrix4().multiplyMatrices(toLocal,mesh.matrixWorld),normalMatrix=new THREE.Matrix3().getNormalMatrix(transform),n=attributes.normal,uv=attributes.uv,uv1=attributes.uv1,col=attributes.color,indices=geometry.index,count=indices?.count||p.count;
  const read=i=>{mesh.getVertexPosition(i,vector).applyMatrix4(transform);if(n)normal.fromBufferAttribute(n,i).applyMatrix3(normalMatrix).normalize();else normal.set(0,1,0);return{p:vector.toArray(),n:normal.toArray(),uv:uv?[uv.getX(i),uv.getY(i)]:[0,0],uv1:uv1?[uv1.getX(i),uv1.getY(i)]:[0,0],color:col?[col.getX(i),col.getY(i),col.getZ(i)]:[1,1,1]};};
  for(let at=0;at+2<count;at+=3){
   const triangle=[read(indices?indices.getX(at):at),read(indices?indices.getX(at+1):at+1),read(indices?indices.getX(at+2):at+2)],material=Array.isArray(mesh.material)?mesh.material[(geometry.groups.find(group=>at>=group.start&&at<group.start+group.count)||{}).materialIndex||0]:mesh.material;
   const minX=Math.min(...triangle.map(v=>v.p[0])),maxX=Math.max(...triangle.map(v=>v.p[0])),first=clamp(Math.floor((minX+length/2)/columnWidth),0,columnCount-1),last=clamp(Math.floor((maxX+length/2)/columnWidth),0,columnCount-1);
   for(let column=first;column<=last;column++){
    // Extreme pieces such as the projecting walkway retain their full span.
    let part=triangle;if(column>0)part=clip(part,0,-length/2+column*columnWidth,true);if(column<columnCount-1)part=clip(part,0,-length/2+(column+1)*columnWidth,false);
    for(let stage=0;stage<3;stage++)append(batches[stage],material,clip(part,1,cutHeights[stage][column],false),attributes);
   }
  }
 });
 // Fresh broken tops close the clipped architecture. They never cover the
 // gate passage and never create a new solid obstacle outside the old wall.
 for(let stage=0;stage<3;stage++)for(let column=0;column<columnCount;column++){
  const x0=-length/2+column*columnWidth,x1=x0+columnWidth,y=cutHeights[stage][column];if(y>height+1.05)continue;
  appendFace(batches[stage],materials.stone,[[x0,y,-1.08],[x0,y,1.08],[x1,y,1.08],[x1,y,-1.08]]);
  if(column<columnCount-1){const next=cutHeights[stage][column+1];if(next<=height+1.05)appendFace(batches[stage],materials.darkStone,[[x1,y,-1.08],[x1,next,-1.08],[x1,next,1.08],[x1,y,1.08]],[1,0,0]);}
 }
 const stages=batches.map((batch,i)=>meshBatch(batch,`Curtain wall damage ${i+1}`)),scarMaterial=new THREE.MeshBasicMaterial({color:'#494338',side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
 const scars=scarGeometry(length,height,gate,seed).map((geometry,i)=>{const mesh=new THREE.Mesh(geometry,scarMaterial);mesh.name=`Masonry cracks ${i+1}`;mesh.userData.ownedMaterial=true;return mesh;});
 wall.add(...stages,...scars);const data={original,stages,scars,index,gate,length,cutHeights,openRatio:FORT_WALL_OPEN_RATIOS[index],stage:0,solid:true};wall.userData.fortDamage=data;
 let disposed=false;wall.userData.disposePresentation=()=>{if(!disposed){scarMaterial.dispose();disposed=true;}};
 setFortWallDamage(wall,1);return wall;
}

export function setFortWallDamage(wall,ratio){
 const d=wall.userData.fortDamage;if(!d)return;const hp=clamp(Number.isFinite(ratio)?ratio:1),stage=hp>.80?0:hp>.55?1:hp>.30?2:3,solid=hp>d.openRatio;
 d.stage=stage;d.solid=solid;d.ratio=hp;d.original.visible=solid&&stage===0;
 for(let i=0;i<d.stages.length;i++){d.stages[i].visible=solid&&stage===i+1;d.scars[i].visible=solid&&stage===i+1;}
 for(const child of wall.children){if(child.userData.gate){child.visible=hp>FORT_GATE_OPEN_RATIO;for(let i=0;i<(child.userData.damageStages?.length||0);i++)child.userData.damageStages[i].visible=i===stage;}if(child.userData.gateRubble)child.visible=hp<=FORT_GATE_OPEN_RATIO;}
}

/** Rubble is a reversible visual state, not an accumulating particle history. */
export function createFortRubble(walls,materials,seed=0){
 const root=new THREE.Group(),geometry=new THREE.DodecahedronGeometry(1,0),pieces=[],rand=random(seed),batch=new THREE.InstancedMesh(geometry,materials.stone,walls.length*15),transform=new THREE.Object3D();root.name='Recoverable masonry rubble';root.userData.dynamic=true;geometry.userData.sharedPrimitive=true;
 // Order instances by damage threshold: increasing the count reveals debris
 // at every wall in one draw call, instead of adding dozens of loose meshes.
 for(let i=0;i<15;i++)for(let index=0;index<walls.length;index++){
  const wall=walls[index],length=wall.userData.fortDamage.length||12,along=(rand()-.5)*(length-2),outside=-1.35-rand()*1.3;
  transform.position.set(along,.05,outside).applyMatrix4(wall.matrix);transform.scale.set(.22+rand()*.39,.04+rand()*.045,.20+rand()*.27);transform.rotation.y=rand()*Math.PI;transform.updateMatrix();
  const at=pieces.length;batch.setMatrixAt(at,transform.matrix);batch.setColorAt(at,new THREE.Color().setScalar(i%3?.94:.72));pieces.push({matrix:transform.matrix.clone(),rubbleAt:.80-i*.039,wall:index,visible:false});
 }
 batch.receiveShadow=true;batch.instanceMatrix.needsUpdate=true;batch.computeBoundingSphere();root.add(batch);root.userData.pieces=pieces;root.userData.batch=batch;let disposed=false;root.userData.disposePresentation=()=>{if(!disposed){geometry.dispose();disposed=true;}};return root;
}
export function setFortRubble(root,ratio){const hp=clamp(Number.isFinite(ratio)?ratio:1);root.visible=hp<=.8;let count=0;for(const piece of root.userData.pieces||[]){piece.visible=hp<=piece.rubbleAt;if(piece.visible)count++;}root.userData.batch.count=count;}

// The ram's authored weapon translation reaches contact at frame 14 of the
// 30-frame / 1.25-second clip, rather than the generic 32% release fallback.
export function getSiegePresentationPose(type,cycle,info={},moving=false){
 const duration=Math.max(.01,info.attackDuration||1),contact=type==='ram'?duration*7/15:clamp(info.releaseAt||duration*.32,0,duration),releaseEnd=type==='ram'?duration*.70:contact+(duration-contact)*.21;
 if(moving||!cycle||!['windup','release','recovery'].includes(cycle.phase))return{clip:'idle',time:0,loop:false,loaded:true,phase:'idle',phaseProgress:0,contact};
 const p=clamp(cycle.phaseProgress||0),time=cycle.phase==='windup'?contact*p:cycle.phase==='release'?mix(contact,releaseEnd,p):mix(releaseEnd,duration,p);
 return{clip:'attack',time,loop:false,loaded:cycle.phase==='windup'||cycle.phase==='recovery'&&time>=(info.reloadAt??duration*.90),phase:cycle.phase,phaseProgress:p,contact,id:cycle.id||cycle.attackId||null};
}

function dustGeometry(){
 const positions=[],uv=[],points=14;
 for(let i=0;i<points;i++){const a=i/points*Math.PI*2,b=(i+1)/points*Math.PI*2,r1=.82+Math.sin(i*2.7)*.10,r2=.82+Math.sin((i+1)*2.7)*.10;positions.push(0,0,0,Math.cos(a)*r1,Math.sin(a)*r1,0,Math.cos(b)*r2,Math.sin(b)*r2,0);uv.push(.5,.5,.5+Math.cos(a)*r1*.5,.5+Math.sin(a)*r1*.5,.5+Math.cos(b)*r2*.5,.5+Math.sin(b)*r2*.5);}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geometry.computeVertexNormals();return geometry;
}
function dustTexture(){
 const size=32,bytes=new Uint8Array(size*size*4);for(let y=0;y<size;y++)for(let x=0;x<size;x++){const radius=Math.hypot((x+.5-size/2)/(size/2),(y+.5-size/2)/(size/2)),falloff=Math.max(0,1-radius)**1.7,noise=.84+Math.sin(x*7.3+y*3.1)*.10,at=(y*size+x)*4;bytes[at]=bytes[at+1]=bytes[at+2]=255;bytes[at+3]=Math.round(falloff*noise*255);}
 const texture=new THREE.DataTexture(bytes,size,size);texture.needsUpdate=true;return texture;
}

/** One bounded burst, sampled from authoritative effect age. No physics timer. */
export function createImpactBurst(effect,materials){
 const root=new THREE.Group(),masonry=effect.targetKind==='region',rand=random(seedFor(effect.id)),intensity=clamp((effect.intensity||0)/(masonry?100:55),.35,1),count=masonry?IMPACT_FRAGMENT_LIMIT:3;
 const geometry=new THREE.DodecahedronGeometry(1,0),fragments=[],dust=[],dustGeo=dustGeometry(),texture=dustTexture(),dustMaterial=new THREE.MeshBasicMaterial({color:masonry?'#bcad92':'#968869',map:texture,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide});
 root.name=masonry?'Masonry impact':'Ground contact';root.userData.softwareDynamic=true;
 for(let i=0;i<count;i++){
  const mesh=new THREE.Mesh(geometry,masonry?(i%3?materials.stone:materials.darkStone):materials.dirt),angle=rand()*Math.PI*2,speed=(.8+rand()*2.8)*intensity,size=masonry?.085+rand()*.18:.04+rand()*.065;
  mesh.castShadow=masonry;root.add(mesh);fragments.push({mesh,vx:Math.cos(angle)*speed,vz:Math.sin(angle)*speed,vy:1.1+rand()*2.9,size,spin:[(rand()-.5)*8,(rand()-.5)*8,(rand()-.5)*8],floor:0});
 }
 for(let i=0;i<(masonry?IMPACT_DUST_LIMIT:3);i++){
  const mesh=new THREE.Mesh(dustGeo,dustMaterial),angle=rand()*Math.PI*2;root.add(mesh);dust.push({mesh,x:Math.cos(angle)*(.15+rand()*.4),z:Math.sin(angle)*(.15+rand()*.4),rise:.24+rand()*.58,spread:.38+rand()*.58,size:.35+rand()*.4});
 }
 root.userData.impactBurst={masonry,intensity,fragments,dust,dustMaterial,ownedGeometry:[geometry,dustGeo],ownedTexture:[texture],age:0,groundY:0};return root;
}
export function setImpactBurst(root,effect,{x,y,z,groundY=0,cameraQuaternion}={}){
 const d=root.userData.impactBurst;if(!d)return root;const age=clamp(effect.age||0,0,Math.max(.01,effect.life||1)),life=Math.max(.01,effect.life||1),progress=clamp(age/life),fade=clamp((1-progress)*2.2);
 root.position.set(x??effect.x,y??groundY+.15,z??effect.z);d.age=age;d.groundY=groundY;root.visible=progress<1;
 for(const f of d.fragments){const py=Math.max(groundY-root.position.y+f.size*.25,f.vy*age-4.9*age*age);f.mesh.position.set(f.vx*age,py,f.vz*age);f.mesh.rotation.set(...f.spin.map(value=>value*age));f.mesh.scale.set(f.size*fade,f.size*.65*fade,f.size*.85*fade);}
 const opening=Math.min(1,age/.09),spread=Math.sqrt(age);d.dustMaterial.opacity=opening*(1-progress)**1.55*(d.masonry?.20:.14);
 for(const puff of d.dust){puff.mesh.position.set(puff.x*(1+spread*puff.spread),puff.rise*age,puff.z*(1+spread*puff.spread));puff.mesh.scale.setScalar(puff.size+spread*(d.masonry?1.25:.62));if(cameraQuaternion)puff.mesh.quaternion.copy(cameraQuaternion);}
 return root;
}
export function disposeImpactBurst(root){
 const d=root?.userData.impactBurst;if(!d||d.disposed)return;root.removeFromParent();for(const geometry of d.ownedGeometry)geometry.dispose();for(const texture of d.ownedTexture)texture.dispose();d.dustMaterial.dispose();d.disposed=true;
}

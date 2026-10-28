import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {leafGeometry} from './world.js';
import {ENCLOSURES,ARENA_ROCKS} from './arcade-bases.js';
import {ARENA_RADIUS,BATTLEGROUND_AREAS,BATTLEGROUND_ROUTES,routeSample} from './arcade-battleground.js';

const TAU=Math.PI*2;
const randomFor=seed=>()=>{let t=seed+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};
const sampleRoute=(route,spacing=.42)=>{
 const points=[];
 for(let i=1;i<route.points.length;i++){
  const a=route.points[i-1],b=route.points[i],length=Math.hypot(b[0]-a[0],b[1]-a[1]),steps=Math.max(1,Math.ceil(length/spacing));
  for(let j=0;j<steps;j++){const t=j/steps;points.push({x:a[0]+(b[0]-a[0])*t,z:a[1]+(b[1]-a[1])*t});}
 }
 const last=route.points.at(-1);points.push({x:last[0],z:last[1]});
 return points.map((point,i)=>{
  const previous=points[Math.max(0,i-1)],next=points[Math.min(points.length-1,i+1)],dx=next.x-previous.x,dz=next.z-previous.z,length=Math.hypot(dx,dz)||1;
  return {...point,nx:-dz/length,nz:dx/length};
 });
};

// Vertex-only draping misses terrain creases between the road's triangles.
// Shared corner lifts keep the entire checked interior above the same physical
// surface, without opening seams or raising a whole road by a large offset.
const ROAD_CLEARANCE=.028;
const roadChecks=[];
for(let u=0;u<=4;u++)for(let v=0;v<=4-u;v++)if(u!==4&&v!==4&&u+v!==0)roadChecks.push([u/4,v/4,1-(u+v)/4]);
roadChecks.push([1/3,1/3,1/3]);
const creaseChecks=[];
for(let u=0;u<=8;u++)for(let v=0;v<=8-u;v++)if(u!==8&&v!==8&&u+v!==0)creaseChecks.push([u/8,v/8,1-(u+v)/8]);
function drapeRoad(positions,indices,ground){
 const lifts=new Float64Array(positions.length/3);let maxLift=0;
 for(let at=0;at<indices.length;at+=3){
  const ids=indices.slice(at,at+3),a=ids[0]*3,b=ids[1]*3,c=ids[2]*3;let lift=0;
  for(const [u,v,w] of roadChecks){
   const x=positions[a]*u+positions[b]*v+positions[c]*w,z=positions[a+2]*u+positions[b+2]*v+positions[c+2]*w,y=positions[a+1]*u+positions[b+1]*v+positions[c+1]*w;
   lift=Math.max(lift,ground(x,z)+ROAD_CLEARANCE-y);
  }
  if(lift>1e-5)for(const [u,v,w] of creaseChecks){
   const x=positions[a]*u+positions[b]*v+positions[c]*w,z=positions[a+2]*u+positions[b+2]*v+positions[c+2]*w,y=positions[a+1]*u+positions[b+1]*v+positions[c+1]*w;
   lift=Math.max(lift,ground(x,z)+ROAD_CLEARANCE-y);
  }
  // A tiny allowance protects unsampled portions of the same short crease.
  if(lift>1e-5)lift+=.003;
  maxLift=Math.max(maxLift,lift);for(const id of ids)lifts[id]=Math.max(lifts[id],lift);
 }
 for(let i=0;i<lifts.length;i++)positions[i*3+1]+=lifts[i];
 return maxLift;
}

// A polyline turn can sweep a wide outer edge even when its center samples are
// close together. Split only those long edges, sharing each midpoint with both
// adjacent triangles so sharp ground creases cannot require a floating patch.
function refineRoadCorners(positions,colors,uv,indices,ground,maxLength){
 const key=(a,b)=>a<b?`${a}:${b}`:`${b}:${a}`;
 const insert=ids=>{
  const index=positions.length/3,x=ids.reduce((sum,i)=>sum+positions[i*3],0)/ids.length,z=ids.reduce((sum,i)=>sum+positions[i*3+2],0)/ids.length;
  positions.push(x,ground(x,z)+ROAD_CLEARANCE,z);for(let channel=0;channel<3;channel++)colors.push(ids.reduce((sum,i)=>sum+colors[i*3+channel],0)/ids.length);uv.push(x*.8,z*.8);return index;
 };
 for(let pass=0;pass<8;pass++){
  const midpoints=new Map();
  for(let at=0;at<indices.length;at+=3)for(const [a,b] of [[indices[at],indices[at+1]],[indices[at+1],indices[at+2]],[indices[at+2],indices[at]]]){
   const edge=key(a,b);if(!midpoints.has(edge)&&Math.hypot(positions[a*3]-positions[b*3],positions[a*3+2]-positions[b*3+2])>maxLength)midpoints.set(edge,insert([a,b]));
  }
  if(!midpoints.size)break;
  const next=[];
  for(let at=0;at<indices.length;at+=3){
   const a=indices[at],b=indices[at+1],c=indices[at+2],ab=midpoints.get(key(a,b)),bc=midpoints.get(key(b,c)),ca=midpoints.get(key(c,a));
   if(ab===undefined&&bc===undefined&&ca===undefined){next.push(a,b,c);continue;}
   if(ab!==undefined&&bc!==undefined&&ca!==undefined){next.push(a,ab,ca,ab,b,bc,ca,bc,c,ab,bc,ca);continue;}
   const polygon=[a,...(ab===undefined?[]:[ab]),b,...(bc===undefined?[]:[bc]),c,...(ca===undefined?[]:[ca])],center=insert([a,b,c]);
   for(let i=0;i<polygon.length;i++)next.push(center,polygon[i],polygon[(i+1)%polygon.length]);
  }
  indices=next;
 }
 return indices;
}

function floorRectangles(floors){
 const rectangles=[];
 for(const floor of floors||[]){
  rectangles.push({minX:floor.x-floor.halfWidth,maxX:floor.x+floor.halfWidth,minZ:floor.z-floor.halfDepth,maxZ:floor.z+floor.halfDepth});
  const r=floor.ramp;if(!r)continue;
  const x=r.x+r.dx*r.length/2,z=r.z+r.dz*r.length/2,hw=Math.abs(r.dx)*r.length/2+Math.abs(r.rightX)*r.halfWidth,hd=Math.abs(r.dz)*r.length/2+Math.abs(r.rightZ)*r.halfWidth;
  rectangles.push({minX:x-hw,maxX:x+hw,minZ:z-hd,maxZ:z+hd});
 }
 return rectangles;
}

// Subtract the real deck/ramp rectangles from each ribbon triangle. Generated
// edge vertices are shared, so the terrain drape stays watertight at the cut.
function clipRoadFloors(positions,colors,uv,indices,ground,floors){
 const rectangles=floorRectangles(floors);if(!rectangles.length)return indices;
 const vertices=new Map();for(let i=0;i<positions.length;i+=3)vertices.set(`${positions[i].toFixed(7)}:${positions[i+2].toFixed(7)}`,i/3);
 const coordinate=(index,axis)=>positions[index*3+axis];
 function intersection(a,b,axis,bound){
  const t=(bound-coordinate(a,axis))/(coordinate(b,axis)-coordinate(a,axis)),x=axis===0?bound:coordinate(a,0)+(coordinate(b,0)-coordinate(a,0))*t,z=axis===2?bound:coordinate(a,2)+(coordinate(b,2)-coordinate(a,2))*t,key=`${x.toFixed(7)}:${z.toFixed(7)}`;
  if(vertices.has(key))return vertices.get(key);
  const index=positions.length/3;positions.push(x,ground(x,z)+ROAD_CLEARANCE,z);for(let channel=0;channel<3;channel++)colors.push(colors[a*3+channel]+(colors[b*3+channel]-colors[a*3+channel])*t);uv.push(x*.8,z*.8);vertices.set(key,index);return index;
 }
 function clip(polygon,axis,bound,sign){
  const result=[];let previous=polygon.at(-1),before=(coordinate(previous,axis)-bound)*sign>=-1e-9;
  for(const current of polygon){const inside=(coordinate(current,axis)-bound)*sign>=-1e-9;if(inside!==before)result.push(intersection(previous,current,axis,bound));if(inside)result.push(current);previous=current;before=inside;}
  return result.filter((index,i)=>index!==result[(i+result.length-1)%result.length]);
 }
 const result=[];
 for(let at=0;at<indices.length;at+=3){
  let polygons=[indices.slice(at,at+3)];
  for(const rectangle of rectangles){
   const next=[];
   for(const polygon of polygons){
    const xs=polygon.map(index=>coordinate(index,0)),zs=polygon.map(index=>coordinate(index,2));
    if(Math.max(...xs)<=rectangle.minX||Math.min(...xs)>=rectangle.maxX||Math.max(...zs)<=rectangle.minZ||Math.min(...zs)>=rectangle.maxZ){next.push(polygon);continue;}
    let inside=polygon;
    for(const [axis,bound,sign] of [[0,rectangle.minX,1],[0,rectangle.maxX,-1],[2,rectangle.minZ,1],[2,rectangle.maxZ,-1]]){
     if(inside.length<3)break;const outside=clip(inside,axis,bound,-sign);if(outside.length>=3)next.push(outside);inside=clip(inside,axis,bound,sign);
    }
   }
   polygons=next;if(!polygons.length)break;
  }
  for(const polygon of polygons)for(let i=1;i<polygon.length-1;i++){
   const a=polygon[0],b=polygon[i],c=polygon[i+1],area=(coordinate(b,0)-coordinate(a,0))*(coordinate(c,2)-coordinate(a,2))-(coordinate(b,2)-coordinate(a,2))*(coordinate(c,0)-coordinate(a,0));
   if(Math.abs(area)>1e-10)result.push(a,b,c);
  }
 }
 return result;
}

export function battlegroundRoadGeometry(route,ground,options={},refinement=0){
 const spacing=.2/2**refinement,acrossSpacing=.18/2**refinement,samples=sampleRoute(route,spacing),positions=[],colors=[],uv=[],indices=[];
 let segments=Math.ceil(route.width*1.06/acrossSpacing);if(segments%2)segments++;
 const across=Array.from({length:segments+1},(_,i)=>i/segments*2-1),sand=new THREE.Color('#b39c6d'),edge=new THREE.Color('#65764d');
 for(const [row,point] of samples.entries())for(const side of across){
  const wear=1+.035*Math.sin(point.x*3.2+point.z*1.8),offset=side*route.width*.51*wear,x=point.x+point.nx*offset,z=point.z+point.nz*offset;
  positions.push(x,ground(x,z)+ROAD_CLEARANCE,z);uv.push(x*.8,z*.8);
  const blend=Math.max(0,(Math.abs(side)-.48)/.52),grain=.95+.045*Math.sin(x*4.1-z*5.3),color=sand.clone().lerp(edge,blend*blend*(3-2*blend)).multiplyScalar(grain);colors.push(color.r,color.g,color.b);
  if(row<samples.length-1&&side!==across.at(-1)){
   const column=across.indexOf(side),a=row*across.length+column,b=a+1,c=a+across.length,d=c+1;indices.push(a,b,c,b,d,c);
  }
 }
 const refinedIndices=refineRoadCorners(positions,colors,uv,indices,ground,.28/2**refinement),visibleIndices=clipRoadFloors(positions,colors,uv,refinedIndices,ground,options.floors),maxLift=drapeRoad(positions,visibleIndices,ground);
 // Unusually sharp local folds need smaller triangles rather than a floating
 // ribbon. Ordinary paths keep their inexpensive first-resolution geometry.
 if(maxLift>.082&&refinement<2)return battlegroundRoadGeometry(route,ground,options,refinement+1);
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geometry.setIndex(visibleIndices);geometry.computeVertexNormals();geometry.computeBoundingSphere();geometry.userData={columns:across.length,rows:samples.length,maxLift,spacing};
 return geometry;
}

function petalGeometry(){
 const positions=[0,.055,.36,0,0,0,.16,.02,.1,.29,.06,.36,.22,.09,.64,0,.1,.8,-.22,.09,.64,-.29,.06,.36,-.16,.02,.1],indices=[];
 for(let i=1;i<=8;i++)indices.push(0,i===8?1:i+1,i);
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}
function bladeGeometry(){
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute([-.045,0,0,.045,0,0,-.03,.48,.04,.03,.48,.04,0,1,.18],3));geometry.setIndex([0,1,2,1,3,2,2,3,4]);geometry.computeVertexNormals();return geometry;
}
function sandTexture(){
 const side=64,data=new Uint8Array(side*side*4),random=randomFor(9301);
 for(let y=0;y<side;y++)for(let x=0;x<side;x++){const at=(y*side+x)*4,value=Math.min(255,Math.round(223+random()*30-7*Math.sin(x*.4+y*.8)));data[at]=data[at+1]=data[at+2]=value;data[at+3]=255;}
 const texture=new THREE.DataTexture(data,side,side,THREE.RGBAFormat);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.magFilter=THREE.LinearFilter;texture.minFilter=THREE.LinearMipmapLinearFilter;texture.generateMipmaps=true;texture.colorSpace=THREE.SRGBColorSpace;texture.needsUpdate=true;return texture;
}

// Frog-scale landscape details remain passable: shallow paving, leaf litter,
// flowers and reeds. Every large rock still comes from the shared solid model.
export class BattlegroundView{
 constructor(game){
  this.game=game;this.group=new THREE.Group();this.group.name='Οι έξι γειτονιές του βάλτου';game.scene.add(this.group);
  this.routes=new Map();this.areas=new Map();this.geometries=new Set();this.materials=new Set();this.textures=new Set();this.dummy=new THREE.Object3D();this.color=new THREE.Color();this.wind={value:0};
  this.metrics={routes:BATTLEGROUND_ROUTES.length,areas:BATTLEGROUND_AREAS.length,instances:0,drawCalls:0};this.density=1;
  const owned=geometry=>{this.geometries.add(geometry);return geometry;},material=options=>{const value=new THREE.MeshStandardMaterial({roughness:.9,...options});this.materials.add(value);return value;};
  this.geometry={pebble:owned(new THREE.DodecahedronGeometry(1,0)),slate:owned(new THREE.CylinderGeometry(1,1,1,6)),leaf:owned(leafGeometry(1,.87,.028)),petal:owned(petalGeometry()),blade:owned(bladeGeometry()),stem:owned(new THREE.CylinderGeometry(.5,.5,1,5)),center:owned(new THREE.SphereGeometry(1,7,4)),ripple:owned(new THREE.RingGeometry(.94,1,32))};
  const grain=sandTexture();this.textures.add(grain);
  this.material={road:material({color:'#c5c0ac',vertexColors:true,map:grain,roughness:1,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1,side:THREE.DoubleSide}),stone:material({color:'#ffffff',roughness:1}),leaf:material({color:'#ffffff',roughness:.82,side:THREE.DoubleSide}),petal:material({color:'#ffffff',roughness:.67,side:THREE.DoubleSide}),plant:material({color:'#ffffff',roughness:.91,side:THREE.DoubleSide}),bark:material({color:'#776346',roughness:1}),ripple:material({color:'#d5eee2',transparent:true,opacity:.28,depthWrite:false,side:THREE.DoubleSide})};
  this.material.plant.onBeforeCompile=shader=>{shader.uniforms.uDistrictWind=this.wind;shader.vertexShader='uniform float uDistrictWind;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n#ifdef USE_INSTANCING\ntransformed.x += sin(uDistrictWind * 1.3 + instanceMatrix[3].x * .8 + instanceMatrix[3].z * .6) * position.y * position.y * .035;\n#endif');};
  this.material.plant.customProgramCacheKey=()=> 'frog-district-reed-wind';
  this.buildRoutes();for(const [index,area] of BATTLEGROUND_AREAS.entries())this.buildArea(area,index);this.setQuality(game.settings?.quality==='low');
 }
 ground(x,z){return this.game.ground(x,z);}
 safeDecor(x,z,radius=.15){
  if(Math.hypot(x,z)+radius>ARENA_RADIUS-.8)return false;
  if(ENCLOSURES.some(base=>Math.abs(x-base.x)<base.halfWidth+radius+.7&&Math.abs(z-base.z)<base.halfDepth+radius+.7))return false;
  if(ARENA_ROCKS.some(rock=>Math.hypot(x-rock.x,z-rock.z)<rock.r+radius+.18))return false;
  const route=routeSample(x,z);return route.distance>route.width/2+radius+.28;
 }
 instances(parent,name,geometry,material,records){
  if(!records.length)return null;
  const mesh=new THREE.InstancedMesh(geometry,material,records.length);mesh.name=name;mesh.receiveShadow=true;mesh.userData.decorativeOnly=true;mesh.userData.fullCount=records.length;mesh.userData.groupSize=geometry===this.geometry.petal?7:1;
  for(const [i,record] of records.entries()){
   this.dummy.position.set(record.x,record.y,record.z);this.dummy.rotation.set(record.rx||0,record.yaw||0,record.rz||0);this.dummy.scale.fromArray(record.scale||[1,1,1]);this.dummy.updateMatrix();mesh.setMatrixAt(i,this.dummy.matrix);
   if(record.color)mesh.setColorAt(i,this.color.set(record.color));
  }
  mesh.instanceMatrix.needsUpdate=true;if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;mesh.computeBoundingSphere();parent.add(mesh);this.metrics.instances+=records.length;this.metrics.drawCalls++;return mesh;
 }
 buildRoutes(){
  const random=randomFor(1412),stones=[],seen=new Set();
  for(const [routeIndex,route] of BATTLEGROUND_ROUTES.entries()){
   const terrain=(x,z)=>this.game.world?.getTerrainHeight?.(x,z)??this.ground(x,z),geometry=battlegroundRoadGeometry(route,terrain,{floors:this.game.houseFloors});this.geometries.add(geometry);
   const mesh=new THREE.Mesh(geometry,this.material.road);mesh.name=`Μονοπάτι · ${route.id}`;mesh.receiveShadow=true;mesh.userData.routeId=route.id;mesh.userData.decorativeOnly=true;
   // A sub-centimetre decal offset orders overlapping junctions without flicker.
   mesh.position.y=routeIndex*.0005;this.group.add(mesh);this.routes.set(route.id,mesh);this.metrics.drawCalls++;
   const samples=sampleRoute(route);
   for(let i=2;i<samples.length-2;i+=6)for(const side of [-1,1]){
    if(random()>.78*this.density)continue;const point=samples[i],offset=side*(route.width/2+.56+random()*.22),x=point.x+point.nx*offset,z=point.z+point.nz*offset,key=`${Math.round(x*2)}:${Math.round(z*2)}`;
    if(seen.has(key)||!this.safeDecor(x,z,.15))continue;seen.add(key);
    const radius=.09+random()*.11;stones.push({x,y:this.ground(x,z)+.035,z,yaw:random()*TAU,scale:[radius,.035+random()*.025,radius*.72],color:['#ada886','#c6bea1','#8d9b78'][Math.floor(random()*3)]});
   }
  }
  this.instances(this.group,'Χαμηλά βότσαλα δίπλα στα μονοπάτια',this.geometry.pebble,this.material.stone,stones);
 }
 points(area,count,random,radius=.18){
  const points=[];
  for(let i=0;i<count*9&&points.length<count;i++){
   const angle=random()*TAU,r=Math.sqrt(random())*.94,x=area.x+Math.cos(angle)*r*area.rx,z=area.z+Math.sin(angle)*r*area.rz;
   if(this.safeDecor(x,z,radius))points.push({x,z,y:this.ground(x,z),yaw:random()*TAU});
  }
  return points;
 }
 flower(records,point,random,{color='#fff3cc',size=.28,stem=.2}={}){
  const floor=point.y,y=floor+stem,petals=7;
  if(stem>.04)records.stems.push({x:point.x,y:floor+stem/2,z:point.z,scale:[.035,stem,.035],color:'#587943'});
  for(let i=0;i<petals;i++)records.petals.push({x:point.x,y,z:point.z,yaw:i/petals*TAU+(point.yaw||0),scale:[size,size,size],color});
  records.centers.push({x:point.x,y:y+.045,z:point.z,scale:[size*.24,.047,size*.24],color:random()>.3?'#edc76c':'#e4ad67'});
 }
 buildArea(area,index){
  const group=new THREE.Group();group.name=area.name;group.userData.areaId=area.id;group.userData.kind=area.kind;this.group.add(group);this.areas.set(area.id,group);
  const random=randomFor(9100+index*731),records={stones:[],leaves:[],blades:[],stems:[],petals:[],centers:[],heads:[],ripples:[]},count=n=>Math.max(1,Math.round(n*this.density));
  if(area.kind==='pond'){
   const water=this.game.world?.waterLevel??-.035;
   for(const [i,point] of this.points(area,count(26),random,.72).entries()){
    const radius=.42+random()*.38,y=Math.max(point.y+.035,water+.035);records.leaves.push({...point,y,scale:[radius,1,radius*.94],color:['#5f956e','#8bb56e','#74a17b'][i%3]});
    if(i%3===0){this.flower(records,{...point,y:y+.055},random,{color:i%2?'#f9d2da':'#fff3d5',size:.42,stem:.045});records.ripples.push({...point,y:y-.014,rx:-Math.PI/2,scale:[radius*1.16,radius*1.16,1]});}
   }
  }else if(area.kind==='reeds'){
   for(const point of this.points(area,count(14),random,.6))for(let i=0;i<15;i++){
    const angle=random()*TAU,r=random()*.5,x=point.x+Math.cos(angle)*r,z=point.z+Math.sin(angle)*r;if(!this.safeDecor(x,z,.09))continue;
    const height=.45+random()*.47,floor=this.ground(x,z);records.blades.push({x,y:floor+.01,z,yaw:angle,scale:[.8,height,.8],color:['#7e9a50','#b0a35c','#799866'][i%3]});
    if(i%5===0){records.stems.push({x,y:floor+height*.48,z,scale:[.028,height*.96,.028],color:'#8b9561'});records.heads.push({x,y:floor+height,z,scale:[.075,.2,.075],color:'#846346'});}
   }
  }else if(area.kind==='roots'){
   const roots=[];
   for(const point of this.points(area,count(14),random,1.05)){
    const angle=point.yaw,length=1.1+random()*.75,points=[];
    for(let i=0;i<=8;i++){const t=i/8-.5,x=point.x+Math.cos(angle)*t*length-Math.sin(angle)*Math.sin(t*4)*.18,z=point.z+Math.sin(angle)*t*length+Math.cos(angle)*Math.sin(t*4)*.18;points.push(new THREE.Vector3(x,this.ground(x,z)+.055,z));}
    if(points.some(point=>!this.safeDecor(point.x,point.z,.12)))continue;
    roots.push(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),12,.075,5,false));
   }
   if(roots.length){const geometry=mergeGeometries(roots);for(const part of roots)part.dispose();this.geometries.add(geometry);const mesh=new THREE.Mesh(geometry,this.material.bark);mesh.name='Χαμηλές ρίζες μέσα στα βρύα';mesh.receiveShadow=true;mesh.userData.decorativeOnly=true;group.add(mesh);this.metrics.drawCalls++;}
   for(const [i,point] of this.points(area,count(70),random,.32).entries()){const radius=.16+random()*.2;records.leaves.push({...point,y:point.y+.025,scale:[radius,.5,radius*.75],color:['#687d46','#968456','#739158','#ac9561'][i%4]});}
  }else if(area.kind==='terraces'){
   for(let row=0;row<4;row++)for(let i=0;i<32;i++){
    if(this.density<1&&i%2)continue;const angle=i/32*TAU,r=.43+row*.13,x=area.x+Math.cos(angle)*area.rx*r,z=area.z+Math.sin(angle)*area.rz*r;
    if(!this.safeDecor(x,z,.42))continue;
    records.stones.push({x,y:this.ground(x,z)+.034,z,yaw:angle+.2,scale:[.26+random()*.12,.06,.39+random()*.14],color:['#a8ad9c','#c0c3ae','#8e9e94','#c8c5ad'][i%4]});
   }
   for(const point of this.points(area,count(20),random,.25))this.flower(records,point,random,{color:'#d9c8e6',size:.25,stem:.18});
  }else{
   const flowery=area.kind==='flowers',palette=flowery?['#f4c2bc','#f8df91','#f6ebd0','#e9b9d7']:['#f7edd1','#e5d39c'];
   for(const [i,point] of this.points(area,count(flowery?112:28),random,.28).entries())this.flower(records,point,random,{color:palette[i%palette.length],size:flowery?.3+random()*.12:.23,stem:flowery?.14+random()*.19:.14});
   for(const [i,point] of this.points(area,count(flowery?94:35),random,.22).entries()){
    const scale=.2+random()*.24;records.blades.push({...point,y:point.y+.012,scale:[.7,scale,.7],color:['#759b55','#8ba85f','#5b8b5e'][i%3]});
    if(i%3===0)records.leaves.push({...point,y:point.y+.018,scale:[.2,.5,.16],color:'#729453'});
   }
   if(!flowery)for(const point of this.points(area,count(30),random,.2))records.stones.push({...point,y:point.y+.027,scale:[.2,.04,.14],color:'#bac1a1'});
  }
  this.instances(group,'Φύλλα στο νερό και στην όχθη',this.geometry.leaf,this.material.leaf,records.leaves);
  this.instances(group,'Χαμηλή βλάστηση',this.geometry.blade,this.material.plant,records.blades);
  this.instances(group,'Λεπτά στελέχη',this.geometry.stem,this.material.plant,records.stems);
  this.instances(group,'Ανθισμένα πέταλα',this.geometry.petal,this.material.petal,records.petals);
  this.instances(group,'Χρυσαφένιες καρδιές λουλουδιών',this.geometry.center,this.material.petal,records.centers);
  this.instances(group,'Κεφάλια καλαμιών',this.geometry.center,this.material.bark,records.heads);
  this.instances(group,'Επίπεδα βότσαλα και πλάκες',area.kind==='terraces'?this.geometry.slate:this.geometry.pebble,this.material.stone,records.stones);
  this.instances(group,'Κύκλοι γύρω από τα νούφαρα',this.geometry.ripple,this.material.ripple,records.ripples);
 }
 update(dt=0){this.wind.value+=Math.max(0,Math.min(.1,Number.isFinite(dt)?dt:0));}
 setQuality(low){
  const density=(low===true||low==='low')?.58:1;this.quality=density<1?'low':'high';let visible=0;
  this.group.traverse(object=>{if(!object.isInstancedMesh)return;const group=object.userData.groupSize||1;object.count=Math.floor(object.userData.fullCount*density/group)*group;visible+=object.count;});
  this.metrics.visibleInstances=visible;
 }
 dispose(){
  this.group.removeFromParent();this.group.traverse(object=>{if(object.isInstancedMesh)object.dispose();});for(const geometry of this.geometries)geometry.dispose();for(const material of this.materials)material.dispose();for(const texture of this.textures)texture.dispose();this.routes.clear();this.areas.clear();
 }
}

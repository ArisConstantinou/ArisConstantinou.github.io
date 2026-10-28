import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {BattlegroundView,battlegroundRoadGeometry,battlegroundRoadNetworkGeometry} from '../src/arcade-battleground-view.js';
import {BATTLEGROUND_AREAS,BATTLEGROUND_ROUTES,battlegroundHeight,routeSample} from '../src/arcade-battleground.js';
import {ENCLOSURES,ARENA_ROCKS,createHouseFloors,createCatapultFloors} from '../src/arcade-bases.js';
import {createWorld} from '../src/world.js';

function fixture(quality='high'){
 const terrain=(x,z)=>.12*Math.sin(x*.18)*Math.cos(z*.16),game={scene:new THREE.Scene(),ground:(x,z)=>battlegroundHeight(x,z,terrain(x,z)),settings:{quality},world:{waterLevel:-.035,getTerrainHeight:terrain}};
 return {game,view:new BattlegroundView(game)};
}

test('road ribbons follow the supplied actual ground across their width and reach every route endpoint',()=>{
 const ground=(x,z)=>Math.sin(x*.18)*.7+Math.cos(z*.23)*.4+x*.02;
 for(const route of BATTLEGROUND_ROUTES){
  const geometry=battlegroundRoadGeometry(route,ground),position=geometry.getAttribute('position'),normal=geometry.getAttribute('normal'),uv=geometry.getAttribute('uv');
  assert.ok(geometry.index.count>0);assert.equal(uv.count,position.count);
  for(let i=0;i<position.count;i++){
   const x=position.getX(i),y=position.getY(i),z=position.getZ(i);
   assert.ok(y-ground(x,z)>=.02799&&y-ground(x,z)<.12,`${route.id}: ribbon must stay close above the actual local height`);
   assert.ok(Number.isFinite(normal.getX(i))&&Number.isFinite(normal.getY(i))&&Number.isFinite(normal.getZ(i)));
  }
  const {columns,rows}=geometry.userData,center=(columns-1)/2,first=route.points[0],last=route.points.at(-1),lastCenter=(rows-1)*columns+center;
  assert.ok(Math.hypot(position.getX(center)-first[0],position.getZ(center)-first[1])<1e-5);
  assert.ok(Math.hypot(position.getX(lastCenter)-last[0],position.getZ(lastCenter)-last[1])<1e-5);
  for(let i=center;i<(rows-1)*columns;i+=columns)assert.ok(Math.hypot(position.getX(i+columns)-position.getX(i),position.getZ(i+columns)-position.getZ(i))<=.201,'a long route cannot contain an unsampled gap');
  geometry.dispose();
 }
});

test('road triangle interiors clear diagonal terrain ridges that vertex-only draping cuts through',()=>{
 const ground=(x,z)=>.8-Math.abs(x+.37*z-.037)*.72+z*.03,route={width:3,points:[[0,-2,0],[0,2,0],[2,3,0]]};
 const geometry=battlegroundRoadGeometry(route,ground),position=geometry.getAttribute('position'),indices=geometry.index;let minimum=Infinity,maximum=0;
 for(let at=0;at<indices.count;at+=3){
  const a=indices.getX(at),b=indices.getX(at+1),c=indices.getX(at+2);
  for(let u=0;u<=9;u++)for(let v=0;v<=9-u;v++){
   const first=u/9,second=v/9,third=1-first-second,x=position.getX(a)*first+position.getX(b)*second+position.getX(c)*third,z=position.getZ(a)*first+position.getZ(b)*second+position.getZ(c)*third,y=position.getY(a)*first+position.getY(b)*second+position.getY(c)*third;
   const clearance=y-ground(x,z);minimum=Math.min(minimum,clearance);maximum=Math.max(maximum,clearance);
  }
 }
 assert.ok(geometry.userData.maxLift>.01,'the fixture must require real crease correction');
 assert.ok(minimum>.01,`the ridge must not cut a dark hole through the road: clearance ${minimum}`);
 assert.ok(maximum<.12,`the correction must remain close to the terrain: clearance ${maximum}`);
 geometry.dispose();
});

test('flat ground retains the small original decal offset rather than a global floating correction',()=>{
 const ground=(x,z)=>.2+x*.03+z*.09,geometry=battlegroundRoadGeometry({width:3,points:[[-2,-2,0],[3,4,0]]},ground),position=geometry.getAttribute('position');
 for(let i=0;i<position.count;i++)assert.ok(Math.abs(position.getY(i)-ground(position.getX(i),position.getZ(i))-.028)<1e-6);
 assert.ok(geometry.userData.maxLift<1e-10);geometry.dispose();
});

test('road faces are cut exactly out of wooden floors and ramps, instead of painting over their abrupt side steps',()=>{
 const floor={x:0,z:0,halfWidth:1,halfDepth:1,height:2,ramp:{x:0,z:-1,dx:0,dz:-1,rightX:1,rightZ:0,halfWidth:.7,length:2}},route={width:2.8,points:[[0,-4,0],[0,3,0]]},ground=()=>0;
 const geometry=battlegroundRoadGeometry(route,ground,{floors:[floor]}),position=geometry.getAttribute('position'),indices=geometry.index;
 const covered=(x,z)=>(Math.abs(x)<1-1e-6&&Math.abs(z)<1-1e-6)||(Math.abs(x)<.7-1e-6&&z> -3+1e-6&&z< -1-1e-6);
 let atBoundary=false;
 for(let at=0;at<indices.count;at+=3){
  const a=indices.getX(at),b=indices.getX(at+1),c=indices.getX(at+2);
  for(const [u,v,w] of [[1/3,1/3,1/3],[.1,.45,.45],[.45,.1,.45],[.45,.45,.1]])assert.equal(covered(position.getX(a)*u+position.getX(b)*v+position.getX(c)*w,position.getZ(a)*u+position.getZ(b)*v+position.getZ(c)*w),false,'no visible road triangle may cross a wooden footprint');
  for(const index of [a,b,c])if(Math.abs(Math.abs(position.getX(index))-.7)<1e-6&&position.getZ(index)>-3&&position.getZ(index)<-1)atBoundary=true;
 }
 assert.ok(atBoundary,'the cut follows the real ramp boundary, not a coarse missing-triangle gap');geometry.dispose();
});

const paintContext={fillRect(){},beginPath(){},moveTo(){},quadraticCurveTo(){},bezierCurveTo(){},closePath(){},save(){},restore(){},translate(){},scale(){},lineTo(){},stroke(){},ellipse(){},fill(){},putImageData(){},createRadialGradient(){return {addColorStop(){}}},createImageData(w,h){return {data:new Uint8ClampedArray(w*h*4)}}};
test('all road triangle interiors clear the real coarse terrain mesh with bounded local lifts',t=>{
 const previous=globalThis.document;globalThis.document={createElement(){return {width:0,height:0,getContext(){return paintContext}}}};let world;
 try{world=createWorld(new THREE.Scene(),{},{natural:true,seed:731,discoveryDecor:false,terrainProfile:battlegroundHeight});}finally{if(previous===undefined)delete globalThis.document;else globalThis.document=previous;}
 t.after(()=>world.dispose());const terrain=(x,z)=>world.getTerrainHeight(x,z),floors=[...createHouseFloors(terrain),...createCatapultFloors(terrain)];
 {
  const geometry=battlegroundRoadNetworkGeometry(BATTLEGROUND_ROUTES,terrain,{floors}),position=geometry.getAttribute('position'),indices=geometry.index;
  for(let at=0;at<indices.count;at+=3){
   const a=indices.getX(at),b=indices.getX(at+1),c=indices.getX(at+2);
   for(const [u,v,w] of [[1/3,1/3,1/3],[.5,.5,0],[.5,0,.5],[0,.5,.5],[.2,.3,.5],[.3,.5,.2],[.5,.2,.3]]){
    const x=position.getX(a)*u+position.getX(b)*v+position.getX(c)*w,z=position.getZ(a)*u+position.getZ(b)*v+position.getZ(c)*w,y=position.getY(a)*u+position.getY(b)*v+position.getY(c)*w;
    assert.ok(y-terrain(x,z)>.002,`real ground crosses the unified road surface near ${x},${z}`);
   }
  }
  assert.ok(geometry.userData.maxLift+.028<.12,'a large constant lift must not hide a topology error');
  geometry.dispose();
 }
});

test('every authored district has distinct native geometry while details stay pooled for mobile rendering',()=>{
 const {game,view}=fixture();
 assert.equal(game.scene.children.length,1);assert.equal(game.scene.children[0],view.group);
 assert.equal(view.routes.size,BATTLEGROUND_ROUTES.length);assert.equal(view.areas.size,BATTLEGROUND_AREAS.length);
 for(const area of BATTLEGROUND_AREAS){
  const group=view.areas.get(area.id);assert.equal(group.name,area.name);assert.equal(group.userData.kind,area.kind);assert.ok(group.children.length>=2,`${area.name} must have visible authored detail`);
 }
 assert.ok(view.areas.get('pond').children.some(mesh=>mesh.geometry===view.geometry.ripple));
 assert.ok(view.areas.get('reeds').children.some(mesh=>mesh.geometry===view.geometry.blade));
 assert.ok(view.areas.get('roots').children.some(mesh=>!mesh.isInstancedMesh&&mesh.material===view.material.bark));
 assert.ok(view.areas.get('terraces').children.some(mesh=>mesh.geometry===view.geometry.slate));
 assert.ok(view.metrics.instances>1500);assert.ok(view.metrics.drawCalls<=42,'flowers and rocks must not each add a separate draw call');
 view.dispose();
});

test('landscape detail centers leave shared roads, enclosure gates and real rock footprints clear',()=>{
 const {view}=fixture(),matrix=new THREE.Matrix4(),position=new THREE.Vector3();let checked=0;
 view.group.traverse(mesh=>{
  if(!mesh.isInstancedMesh)return;
  for(let i=0;i<mesh.count;i++){
   mesh.getMatrixAt(i,matrix);position.setFromMatrixPosition(matrix);const {x,z}=position,road=routeSample(x,z);
   assert.ok(road.distance>road.width/2+.27,'plant and pebble centers stay outside the clear travel ribbon');
   for(const base of ENCLOSURES)assert.ok(Math.abs(x-base.x)>=base.halfWidth+.69||Math.abs(z-base.z)>=base.halfDepth+.69,'no added prop appears in a house or catapult gate');
   for(const rock of ARENA_ROCKS)assert.ok(Math.hypot(x-rock.x,z-rock.z)>rock.r+.17,'decor cannot obscure a shared solid rock footprint');
   checked++;
  }
 });
 assert.equal(checked,view.metrics.instances);view.dispose();
});

test('quality changes reduce draw counts without reallocating geometry or breaking complete flowers',()=>{
 const {view}=fixture(),meshes=[];
 view.group.traverse(mesh=>{if(mesh.isInstancedMesh)meshes.push({mesh,geometry:mesh.geometry,material:mesh.material,count:mesh.count});});
 const fullCount=view.metrics.visibleInstances;view.setQuality(true);
 assert.equal(view.quality,'low');assert.ok(view.metrics.visibleInstances<fullCount*.65);
 for(const {mesh,geometry,material} of meshes){assert.equal(mesh.geometry,geometry);assert.equal(mesh.material,material);assert.ok(mesh.count>0);assert.equal(mesh.count%mesh.userData.groupSize,0);}
 for(const area of view.areas.values()){
  const petals=area.children.find(mesh=>mesh.geometry===view.geometry.petal),centers=area.children.find(mesh=>mesh.geometry===view.geometry.center&&mesh.material===view.material.petal);
  if(petals)assert.equal(petals.count/7,centers.count,'low detail must keep each flower center with its complete seven petals');
 }
 view.setQuality(false);assert.equal(view.metrics.visibleInstances,fullCount);
 for(const {mesh,count} of meshes)assert.equal(mesh.count,count);
 view.dispose();
});

test('wind pauses with zero elapsed time and disposal releases only the new district resources',()=>{
 const {game,view}=fixture(),unrelated=new THREE.Group();game.scene.add(unrelated);let geometryDisposals=0,materialDisposals=0,textureDisposals=0;
 for(const geometry of view.geometries)geometry.addEventListener('dispose',()=>geometryDisposals++);
 for(const material of view.materials)material.addEventListener('dispose',()=>materialDisposals++);
 for(const texture of view.textures)texture.addEventListener('dispose',()=>textureDisposals++);
 view.update(.016);const time=view.wind.value;view.update(0);view.update(NaN);assert.equal(view.wind.value,time);
 view.dispose();assert.deepEqual(game.scene.children,[unrelated]);assert.equal(view.routes.size,0);assert.equal(view.areas.size,0);
 assert.equal(geometryDisposals,view.geometries.size);assert.equal(materialDisposals,view.materials.size);assert.equal(textureDisposals,view.textures.size);
});

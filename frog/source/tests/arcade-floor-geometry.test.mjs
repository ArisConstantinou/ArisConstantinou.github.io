import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {BASES,createHouseFloors,createCatapultFloors,houseFloorAt} from '../src/arcade-bases.js';
import {createCatapults} from '../src/arcade-artillery.js';
import {ArcadeBasesView} from '../src/arcade-bases-view.js';
import {ArtilleryView} from '../src/arcade-artillery-view.js';
import {plankedFloorGeometry} from '../src/arcade-floor-geometry.js';

test('wooden floor top triangles cover each footprint once at the walking height',()=>{
 for(const [width,depth,thickness] of [[3.28,2.78,.18],[3.28,3.08,.18],[2.98,2.98,.2]]){
  const geometry=plankedFloorGeometry(width,depth,thickness),positions=geometry.attributes.position,index=geometry.index;
  const a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3(),normal=new THREE.Vector3();let topArea=0;
  for(let i=0;i<index.count;i+=3){
   a.fromBufferAttribute(positions,index.getX(i));b.fromBufferAttribute(positions,index.getX(i+1));c.fromBufferAttribute(positions,index.getX(i+2));
   new THREE.Triangle(a,b,c).getNormal(normal);if(normal.y<.99)continue;
   assert.equal(a.y,0);assert.equal(b.y,0);assert.equal(c.y,0);
   for(const point of [a,b,c])assert.ok(Math.abs(point.x)<=width+1e-6&&Math.abs(point.z)<=depth+1e-6);
   topArea+=new THREE.Triangle(a,b,c).getArea();
  }
  assert.ok(Math.abs(topArea-width*depth*4)<1e-5,'no duplicate slab or board tops add a second layer');
  assert.equal(geometry.groups.length,2,'board and seam colors share one floor mesh');
  geometry.dispose();
 }
});

test('all six assembled floors remain a single visible surface across board seams and moving views',()=>{
 const natural=(x,z)=>Math.sin(x*.35)*.7+Math.cos(z*.31)*.8;
 const houseFloors=[...createHouseFloors(natural),...createCatapultFloors(natural)];
 const game={scene:new THREE.Scene(),houseFloors,world:{getSurface:(x,z)=>({height:natural(x,z)})},ground:(x,z)=>houseFloorAt(x,z,houseFloors)??natural(x,z),running:true,camera:new THREE.PerspectiveCamera(),state:{actors:[{id:'player',...BASES[0].spawn}],bases:BASES.map(base=>({...base,destroyed:false,progress:0})),catapults:createCatapults(),shells:[]}};
 const homes=new ArcadeBasesView(game),artillery=new ArtilleryView(game);game.scene.updateMatrixWorld(true);
 const assemblies=[...homes.bases.values()].map(visual=>({group:visual.house,floor:houseFloors.find(f=>f.id===visual.definition.id)}));
 for(const platform of artillery.platforms.values())assemblies.push({group:platform.group,floor:platform.floor});
 const offsets=[new THREE.Vector3(0,4,0),new THREE.Vector3(5,2,7),new THREE.Vector3(-6,1.4,-4)];
 for(const {group,floor} of assemblies)for(let sample=0;sample<220;sample++){
  // Irrational spacings cross board interiors, seams, rim strips and corners.
  const u=sample===0?.001:(sample*.61803398875+.137)%1,v=sample===0?.001:(sample*.41421356237+.271)%1;
  const target=new THREE.Vector3(floor.x+(u*2-1)*(floor.halfWidth-.001),floor.height,floor.z+(v*2-1)*(floor.halfDepth-.001));
  for(const offset of offsets){
   const origin=target.clone().add(offset),direction=target.clone().sub(origin).normalize(),ray=new THREE.Raycaster(origin,direction,0,offset.length()+.03);
   const hits=ray.intersectObject(group,true).filter(hit=>hit.face.normal.y>.99&&Math.abs(hit.point.y-floor.height)<.01);
   const surfaces=new Set(hits.map(hit=>`${hit.object.uuid}:${Math.round(hit.point.y*1e6)}`));
   assert.equal(surfaces.size,1,`${floor.id} has a hole or competing near-coplanar floor faces at sample ${sample}`);
   assert.ok(hits.every(hit=>Math.abs(hit.point.y-floor.height)<1e-6),'visible wood stays at the actor surface');
  }
 }
 homes.dispose();artillery.dispose();assert.equal(game.scene.children.length,0);
});

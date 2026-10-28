import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {battlegroundRoadNetworkGeometry,BattlegroundView} from '../src/arcade-battleground-view.js';
import {BATTLEGROUND_ROUTES,battlegroundHeight} from '../src/arcade-battleground.js';

const crossing=[{width:2.8,points:[[-6,0],[6,0]]},{width:3,points:[[0,-6],[0,6]]},{width:2.8,points:[[-5,-5],[0,0],[5,5]]}];
function intersections(geometry,points){
 const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),mesh=new THREE.Mesh(geometry,material),ray=new THREE.Raycaster();
 mesh.updateMatrixWorld();
 const hits=points.map(([x,z])=>{ray.set(new THREE.Vector3(x,20,z),new THREE.Vector3(0,-1,0));return ray.intersectObject(mesh,false);});material.dispose();return hits;
}

test('crossing roads have exactly one surface under every junction sample',()=>{
 const geometry=battlegroundRoadNetworkGeometry(crossing,()=>0),points=[];
 for(let x=-1.1;x<1.15;x+=.193)for(let z=-1.09;z<1.15;z+=.211)points.push([x+.0017,z+.0023]);
 const hits=intersections(geometry,points);
 for(let i=0;i<hits.length;i++){
  assert.equal(hits[i].length,1,`junction ${points[i]} must not contain overlapping road triangles`);
  assert.ok(Math.abs(hits[i][0].point.y-.028)<1e-6,'all branches share one elevation');
 }
 assert.equal(geometry.userData.network,true);geometry.dispose();
});

test('duplicate and reversed routes do not add another layer or alter their union',()=>{
 const single=battlegroundRoadNetworkGeometry(crossing,()=>0),duplicated=battlegroundRoadNetworkGeometry([...crossing,...crossing],()=>0);
 assert.deepEqual(duplicated.getAttribute('position').array,single.getAttribute('position').array);
 assert.deepEqual(duplicated.index.array,single.index.array);
 assert.deepEqual(duplicated.getAttribute('color').array,single.getAttribute('color').array);
 const reversed=battlegroundRoadNetworkGeometry([...crossing].reverse(),()=>0),points=[[.173,.419],[-.217,-.337],[4.13,.021],[-.027,-4.73],[3.125,3.381]];
 const before=intersections(single,points),after=intersections(reversed,points);
 for(let i=0;i<points.length;i++){assert.equal(before[i].length,1);assert.equal(after[i].length,1);assert.ok(before[i][0].point.distanceTo(after[i][0].point)<1e-8);}
 for(const geometry of [single,duplicated,reversed])geometry.dispose();
});

test('unified roads leave the wooden platform and its ramp empty while keeping both branches joined',()=>{
 const floor={x:0,z:0,halfWidth:1,halfDepth:1,ramp:{x:0,z:-1,dx:0,dz:-1,rightX:1,rightZ:0,halfWidth:.7,length:2}},geometry=battlegroundRoadNetworkGeometry(crossing,()=>0,{floors:[floor]});
 const points=[[.113,.217],[-.419,-.311],[.217,-2.531],[1.217,.071],[.073,-3.173],[-.831,-2.131]],hits=intersections(geometry,points);
 assert.deepEqual(hits.map(row=>row.length),[0,0,0,1,1,1]);geometry.dispose();
});

test('the live battleground renders all thirteen routes with one shared mesh and no branch offsets',()=>{
 const game={scene:new THREE.Scene(),ground:(x,z)=>battlegroundHeight(x,z,0),world:{getTerrainHeight:(x,z)=>.1*Math.sin(x*.2)*Math.cos(z*.15)},settings:{quality:'low'}},view=new BattlegroundView(game);
 assert.equal(view.routes.size,BATTLEGROUND_ROUTES.length);
 assert.equal(new Set(view.routes.values()).size,1);
 assert.equal(view.roadMesh.position.y,0);
 assert.equal(view.roadMesh.geometry.userData.routeCount,BATTLEGROUND_ROUTES.length);
 assert.equal(view.group.children.filter(child=>child.material===view.material.road).length,1);
 view.dispose();
});

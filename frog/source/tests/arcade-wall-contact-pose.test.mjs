import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import * as THREE from 'three';
import {applyLeapPose} from '../src/arcade-leap-pose.js';import {plantWallFeet} from '../src/arcade-wall-contact-pose.js';
const rig=JSON.parse(fs.readFileSync(new URL('../public/art/meshy/frog-rig.json',import.meta.url),'utf8'));
function fixture(scale,radius,nx,nz){
 const group=new THREE.Group(),bones={},definitions=new Map(rig.bones.map(b=>[b.name,b]));for(const d of rig.bones){const b=new THREE.Bone();b.name=d.name;b.position.fromArray(d.position).multiplyScalar(scale);bones[d.name]=b;}
 for(const d of rig.bones)if(d.parent){bones[d.name].position.sub(new THREE.Vector3().fromArray(definitions.get(d.parent).position).multiplyScalar(scale));bones[d.parent].add(bones[d.name]);}
 const list=rig.bones.map(d=>bones[d.name]),positions=[],indices=[],weights=[];
 for(const side of [-1,1]){const name='foot'+side,d=definitions.get(name),id=list.indexOf(bones[name]);for(const [x,z]of [[-.03,0],[.03,0],[0,.12]]){positions.push((d.position[0]+x)*scale,d.position[1]*scale,(d.position[2]+z)*scale);indices.push(id,0,0,0);weights.push(1,0,0,0);}}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(indices,4));geometry.setAttribute('skinWeight',new THREE.Float32BufferAttribute(weights,4));const mesh=new THREE.SkinnedMesh(geometry,new THREE.MeshBasicMaterial());for(const d of rig.bones)if(!d.parent)mesh.add(bones[d.name]);group.add(mesh);group.updateMatrixWorld(true);mesh.bind(new THREE.Skeleton(list));group.position.set(nx*radius,1,nz*radius);group.rotation.y=Math.atan2(nx,nz);group.scale.set(1.1,.95,1.05);group.updateMatrixWorld(true);return {group,bones,mesh,stats:{imported:true}};
}
test('actual toe pads meet a world wall across body sizes, yaw directions and nonuniform scales',()=>{
 for(const [scale,radius]of [[.7,.55],[1,.64],[1.3,.85]])for(const [nx,nz]of [[1,0],[-1,0],[0,1],[0,-1]]){
  const m=fixture(scale,radius,nx,nz),f={kind:'wallHold',vy:0,launchVelocity:16,wall:{x:0,z:0,nx,nz}};applyLeapPose(m,f,1);const contacts=plantWallFeet(m,f);assert.equal(contacts.length,2);for(const c of contacts)assert.ok(Math.abs(c.gap-.008)<.035,JSON.stringify({scale,radius,nx,nz,c}));
 }
});
test('wall planting leaves normal airborne joint animation untouched',()=>{const m=fixture(1,.64,1,0),before=m.bones['hip1'].quaternion.toArray();assert.equal(plantWallFeet(m,{kind:'jump'}),null);assert.deepEqual(m.bones['hip1'].quaternion.toArray(),before);});

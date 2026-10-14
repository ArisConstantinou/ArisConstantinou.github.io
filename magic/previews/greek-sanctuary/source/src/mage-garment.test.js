import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';import {createMageGarment} from './mage-garment.js';

test('a shared belt pivot bends each panel outward and restores its authored pose',()=>{
  const group=new THREE.Group(),model=new THREE.Group(),bones={},list=[];group.add(model);
  function bone(name,parent,position){const b=new THREE.Bone();b.name=name;b.position.set(...position);parent.add(b);bones[name]=b;list.push(b);return b}
  const hips=bone('hips',model,[0,.985,0]);
  for(const [side,sign] of [['l',1],['r',-1]]){const upper=bone('upperleg'+side,hips,[sign*.125,-.105,0]);const lower=bone('lowerleg'+side,upper,[sign*.025,-.35,0]);bone('foot'+side,lower,[sign*.107,-.405,0])}
  const positions=[],indices=[],weights=[];
  for(let n=0;n<8;n++){const angle=n*Math.PI/4,root=bone('skirt_'+n,hips,[0,0,0]),index=list.indexOf(root);bone('skirt_tip_'+n,root,[Math.sin(angle)*.23,-.325,Math.cos(angle)*.18]);
    for(const y of [.3,.5,.7]){positions.push(Math.sin(angle)*.22,y,Math.cos(angle)*.22);indices.push(index,0,0,0);weights.push(1,0,0,0)}
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(indices,4));geometry.setAttribute('skinWeight',new THREE.Float32BufferAttribute(weights,4));
  const mesh=new THREE.SkinnedMesh(geometry,new THREE.MeshBasicMaterial());mesh.userData.redesignLod=1;model.add(mesh);group.updateMatrixWorld(true);mesh.bind(new THREE.Skeleton(list));
  const garment=createMageGarment(group,model,bones);bones.upperlegl.position.z+=.15;group.updateMatrixWorld(true);garment.update(1/60);
  const state=garment.snapshot();assert.ok(state.offsets.some(v=>v>.05),'the actual leg displacement must trigger a panel correction');assert.ok(state.maximum<=.0021,JSON.stringify(state));
  garment.beforeAnimation();for(let n=0;n<8;n++)assert.ok(bones['skirt_'+n].quaternion.angleTo(new THREE.Quaternion())<1e-7,'authored rotations must be restored');
  garment.update(1/60,{disabled:true});assert.ok(garment.snapshot().offsets.every(v=>v===0));garment.reset();assert.ok(list.every(b=>b.matrixWorld.elements.every(Number.isFinite)));geometry.dispose();mesh.material.dispose();mesh.skeleton.dispose();
});

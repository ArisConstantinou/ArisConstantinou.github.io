import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {WebGLAttributes} from 'three/src/renderers/webgl/WebGLAttributes.js';
const {createItemShadows}=await import(process.env.MAGIC_ITEM_SHADOW_SOURCE||'./item-shadows.js');

// Frozen pre-optimization implementation from public 1.6.22 (cbee51c).
// Keep this reference independent of the candidate source and upload helper.
const referenceSource="import * as THREE from 'three';\r\n\r\n// Airborne props use one vertical placement shadow. Their original directional\r\n// casters are restored as soon as the placement shadow stops being displayed.\r\n// Physics, aiming and plate activation are deliberately independent of this layer.\r\nexport function projectedHalfExtents(ext, q) {\r\n  const {x,y,z,w}=q,xx=x*x,yy=y*y,zz=z*z;\r\n  return {\r\n    x:Math.abs(1-2*(yy+zz))*ext.x+Math.abs(2*(x*y-z*w))*ext.y+Math.abs(2*(x*z+y*w))*ext.z,\r\n    y:Math.abs(2*(x*y+z*w))*ext.x+Math.abs(1-2*(xx+zz))*ext.y+Math.abs(2*(y*z-x*w))*ext.z,\r\n    z:Math.abs(2*(x*z-y*w))*ext.x+Math.abs(2*(y*z+x*w))*ext.y+Math.abs(1-2*(xx+yy))*ext.z,\r\n  };\r\n}\r\n\r\nexport function shadowSupport(position, bottom, surfaces) {\r\n  let support=null;\r\n  for(const s of surfaces){\r\n    const top=s.y+s.h/2;\r\n    if(top>bottom+.09||Math.abs(position.x-s.x)>s.w/2||Math.abs(position.z-s.z)>s.d/2)continue;\r\n    if(!support||top>support.y)support={x:s.x,z:s.z,y:top,w:s.w,d:s.d};\r\n  }\r\n  return support;\r\n}\r\n\r\nexport function createItemShadows(scene) {\r\n  const capacity=256,geometry=new THREE.PlaneGeometry(1,1).rotateX(-Math.PI/2);\r\n  const parameters=new THREE.InstancedBufferAttribute(new Float32Array(capacity*2),2);\r\n  const limits=new THREE.InstancedBufferAttribute(new Float32Array(capacity*4),4);\r\n  geometry.setAttribute('shadowParameters',parameters);geometry.setAttribute('surfaceLimits',limits);\r\n  const material=new THREE.ShaderMaterial({\r\n    transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,\r\n    vertexShader:`attribute vec2 shadowParameters;attribute vec4 surfaceLimits;\r\n      varying vec2 vUv;varying vec2 vWorld;varying vec2 vParameters;varying vec4 vLimits;\r\n      void main(){vUv=uv;vParameters=shadowParameters;vLimits=surfaceLimits;\r\n        vec4 p=modelMatrix*instanceMatrix*vec4(position,1.0);vWorld=p.xz;\r\n        gl_Position=projectionMatrix*viewMatrix*p;}`,\r\n    fragmentShader:`varying vec2 vUv;varying vec2 vWorld;varying vec2 vParameters;varying vec4 vLimits;\r\n      void main(){\r\n        if(vWorld.x<vLimits.x||vWorld.x>vLimits.y||vWorld.y<vLimits.z||vWorld.y>vLimits.w)discard;\r\n        vec2 p=abs(vUv*2.0-1.0);float shape=mix(max(p.x,p.y),length(p),vParameters.y);\r\n        float alpha=(1.0-smoothstep(.48,1.0,shape))*vParameters.x;\r\n        if(alpha<.003)discard;gl_FragColor=vec4(.025,.035,.04,alpha);\r\n        #include <tonemapping_fragment>\r\n        #include <colorspace_fragment>\r\n      }`,\r\n  });\r\n  const mesh=new THREE.InstancedMesh(geometry,material,capacity);\r\n  mesh.name='Item placement shadows';mesh.count=0;mesh.frustumCulled=false;\r\n  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.renderOrder=1;scene.add(mesh);\r\n  const transform=new THREE.Object3D(),plateBounds=new WeakMap(),suppressed=new Map();let records=[];\r\n  function restore(e){for(const caster of suppressed.get(e)||[])caster.castShadow=true;suppressed.delete(e);}\r\n  return {\r\n    update(entities,held,world,puzzles){\r\n      const surfaces=[...world.floors,...world.colliders];\r\n      // Tray decks are physical fixtures, while the brass plate face sits above them.\r\n      for(const gate of puzzles?.gates||[]){\r\n        surfaces.push(...gate.fixtures.filter(s=>s.floor));\r\n        for(let i=0;i<gate.plates.length;i++){\r\n          const p=gate.plates[i],face=gate.platesVisual[i];\r\n          if(!face)continue;\r\n          let bounds=plateBounds.get(face);\r\n          if(!bounds){const box=new THREE.Box3().setFromObject(face.g);bounds={offset:box.max.y-face.g.position.y,w:box.max.x-box.min.x,d:box.max.z-box.min.z};plateBounds.set(face,bounds);}\r\n          surfaces.push({x:p.x,z:p.z,y:face.g.position.y+bounds.offset,h:0,w:bounds.w,d:bounds.d});\r\n        }\r\n      }\r\n      records=[];let count=0;const active=new Set();\r\n      for(const e of entities){\r\n        if(e.category!=='prop'||e.removed||e.reserved||e.assemblyRestore||!e.ext||!e.mesh.visible||e!==held&&e.body.sleepState===2)continue;\r\n        const p=e.body.position,half=projectedHalfExtents(e.ext,e.body.quaternion),bottom=p.y-half.y;\r\n        const floor=shadowSupport(p,bottom,surfaces);if(!floor)continue;\r\n        const height=Math.max(0,bottom-floor.y);\r\n        if(e!==held&&height<.07)continue;\r\n        if(count===capacity)break;\r\n        active.add(e);\r\n        if(!suppressed.has(e)){\r\n          const casters=[];e.mesh.traverse(o=>{if(o.castShadow){casters.push(o);o.castShadow=false;}});\r\n          suppressed.set(e,casters);\r\n        }\r\n        const spread=.18+Math.min(height,6)*.035;\r\n        const opacity=Math.max(.52,.76-height*.035)*(e===held?1:Math.min(1,height/.25));\r\n        transform.position.set(p.x,floor.y+.025,p.z);\r\n        transform.scale.set((half.x+spread)*2,1,(half.z+spread)*2);transform.updateMatrix();\r\n        mesh.setMatrixAt(count,transform.matrix);\r\n        parameters.setXY(count,opacity,['stone','urn','barrel'].includes(e.kind)?1:0);\r\n        limits.setXYZW(count,floor.x-floor.w/2,floor.x+floor.w/2,floor.z-floor.d/2,floor.z+floor.d/2);\r\n        records.push({id:e.body.id,kind:e.kind,x:p.x,y:floor.y,z:p.z,height,width:transform.scale.x,depth:transform.scale.z});count++;\r\n      }\r\n      for(const e of suppressed.keys())if(!active.has(e))restore(e);\r\n      mesh.count=count;mesh.instanceMatrix.needsUpdate=true;parameters.needsUpdate=true;limits.needsUpdate=true;\r\n    },\r\n    snapshot:()=>({count:mesh.count,drawCalls:mesh.count?1:0,items:records}),\r\n    dispose(){for(const e of suppressed.keys())restore(e);mesh.removeFromParent();geometry.dispose();material.dispose();},\r\n  };\r\n}\r\n\r\n";
const reference=await import('data:text/javascript;base64,'+Buffer.from(referenceSource.replace("from 'three'","from "+JSON.stringify(import.meta.resolve('three')))).toString('base64'));

function fixture(create){
 const scene=new THREE.Scene(),system=create(scene),mesh=scene.children[0],props=[];
 const world={floors:[{x:0,y:-.25,z:0,w:20,h:.5,d:20}],colliders:[{x:3,y:.8,z:2,w:3,h:.4,d:3}]};
 const face=new THREE.Group();face.position.set(3,1.04,2);face.add(new THREE.Mesh(new THREE.BoxGeometry(.8,.05,.7)));
 const puzzles={gates:[{fixtures:[{x:3,y:1.01,z:2,w:1,h:.02,d:1,floor:true}],plates:[{x:3,z:2}],platesVisual:[{g:face}]}]};
 function prop(kind,x,y,z,options={}){
  const root=new THREE.Group(),caster=new THREE.Mesh(new THREE.BoxGeometry(1,.8,.6),new THREE.MeshBasicMaterial()),uncast=new THREE.Mesh(new THREE.BoxGeometry(.1,.1,.1),new THREE.MeshBasicMaterial());
  caster.castShadow=true;uncast.castShadow=false;root.add(caster,uncast);
  const entity={category:'prop',kind,mesh:root,ext:new THREE.Vector3(.5,.4,.3),body:{id:100+props.length,position:new THREE.Vector3(x,y,z),quaternion:new THREE.Quaternion(),sleepState:0},...options};props.push(entity);return entity;
 }
 const crate=prop('crate',0,.41,0),stone=prop('stone',1,1.8,0),barrel=prop('barrel',3,1.7,2),sleeping=prop('urn',-2,2,0);sleeping.body.sleepState=2;
 return{scene,system,mesh,props,crate,stone,barrel,sleeping,world,puzzles,prop};
}
const attributes=f=>[f.mesh.instanceMatrix,f.mesh.geometry.attributes.shadowParameters,f.mesh.geometry.attributes.surfaceLimits];
function exact(actual,expected){
 assert.deepEqual(actual.system.snapshot(),expected.system.snapshot());
 assert.equal(actual.mesh.count,expected.mesh.count);assert.equal(actual.mesh.visible,expected.mesh.visible);
 for(let i=0;i<3;i++){const length=actual.mesh.count*[16,2,4][i];assert.deepEqual(attributes(actual)[i].array.slice(0,length),attributes(expected)[i].array.slice(0,length));}
 assert.deepEqual(actual.props.map(e=>{const flags=[];e.mesh.traverse(o=>flags.push(o.castShadow));return flags;}),expected.props.map(e=>{const flags=[];e.mesh.traverse(o=>flags.push(o.castShadow));return flags;}));
}
function versions(f){return attributes(f).map(a=>a.version);}
function updatePair(actual,expected,entities,held=null){
 actual.system.update(entities(actual),held&&held(actual),actual.world,actual.puzzles);
 expected.system.update(entities(expected),held&&held(expected),expected.world,expected.puzzles);
 exact(actual,expected);
}
function gpuFixture(){
 const stores=new Map(),uploads=[];let bound;
 const gl={ARRAY_BUFFER:34962,FLOAT:5126,createBuffer:()=>({}),bindBuffer:(_target,buffer)=>{bound=buffer;},deleteBuffer:buffer=>stores.delete(buffer),
  bufferData:(_target,array)=>{stores.set(bound,array.slice());uploads.push({initial:true,components:array.length});},
  bufferSubData:(_target,byteOffset,array,offset=0,count=array.length-offset)=>{stores.get(bound).set(array.subarray(offset,offset+count),byteOffset/array.BYTES_PER_ELEMENT);uploads.push({initial:false,components:count,byteOffset});}};
 const manager=WebGLAttributes(gl);
 return{uploads,upload:f=>{if(f.mesh.visible)for(const a of attributes(f))manager.update(a,gl.ARRAY_BUFFER);},assertActive:f=>attributes(f).forEach((a,i)=>{const length=f.mesh.count*[16,2,4][i];assert.deepEqual(stores.get(manager.get(a).buffer).slice(0,length),a.array.slice(0,length));})};
}

test('empty and grounded frames preserve reference snapshots without dirtying attributes or changing visibility',()=>{
 const a=fixture(createItemShadows),b=fixture(reference.createItemShadows),initial=versions(a);
 exact(a,b);assert.deepEqual(initial,[0,0,0]);
 for(let i=0;i<30;i++){updatePair(a,b,()=>[]);updatePair(a,b,f=>[f.crate]);}
 assert.deepEqual(versions(a),initial);assert(attributes(a).every(attribute=>attribute.updateRanges.length===0));
 const gpu=gpuFixture();gpu.upload(a);assert.equal(gpu.uploads.length,3);assert(gpu.uploads.every(u=>u.initial));gpu.upload(a);assert.equal(gpu.uploads.length,3);a.system.dispose();b.system.dispose();
});

test('held, raised supports, rotated props, landing, sleep and clear exactly retain original shadow/caster behavior',()=>{
 const a=fixture(createItemShadows),b=fixture(reference.createItemShadows);
 updatePair(a,b,f=>[f.crate],f=>f.crate);assert.equal(a.mesh.count,1);assert.equal(a.crate.mesh.children[0].castShadow,false);
 updatePair(a,b,f=>[f.crate,f.stone,f.barrel],f=>f.crate);assert.equal(a.mesh.count,3);
 assert(attributes(a).every((attribute,i)=>attribute.usage===attributes(b)[i].usage&&attribute.updateRanges.length===1&&attribute.updateRanges[0].count===3*[16,2,4][i]));
 for(const f of [a,b]){f.stone.body.quaternion.setFromEuler(new THREE.Euler(.7,.4,.2));f.barrel.body.position.x=2.8;}
 updatePair(a,b,f=>[f.stone,f.barrel]);assert.equal(a.crate.mesh.children[0].castShadow,true);
 for(const f of [a,b]){f.stone.body.quaternion.identity();f.stone.body.position.y=.4;f.barrel.body.position.y=1.465;}
 const beforeLanding=versions(a);updatePair(a,b,f=>[f.stone,f.barrel]);assert.equal(a.mesh.count,0);assert.deepEqual(versions(a),beforeLanding);assert(a.props.every(e=>e.mesh.children[0].castShadow));
 updatePair(a,b,f=>[f.sleeping]);assert.equal(a.mesh.count,0);
 updatePair(a,b,f=>[f.sleeping],f=>f.sleeping);assert.equal(a.mesh.count,1);
 const beforeClear=versions(a),pending=attributes(a).map(attribute=>structuredClone(attribute.updateRanges));
 updatePair(a,b,()=>[]);assert.equal(a.mesh.count,0);assert.deepEqual(versions(a),beforeClear);assert.deepEqual(attributes(a).map(attribute=>attribute.updateRanges),pending);
 for(const f of [a,b]){f.crate.reserved=true;f.stone.removed=true;f.barrel.assemblyRestore={};f.sleeping.mesh.visible=false;}
 updatePair(a,b,f=>f.props);assert.equal(a.mesh.count,0);
 a.system.dispose();b.system.dispose();
});

test('pending growth/shrink/zero updates upload the union and never leave active GPU values stale',()=>{
 const a=fixture(createItemShadows),b=fixture(reference.createItemShadows),gpu=gpuFixture();
 updatePair(a,b,f=>[f.crate],f=>f.crate);gpu.upload(a);gpu.assertActive(a);
 // Three allocates full capacity on first use. Prefix savings apply to later updates.
 assert.deepEqual(gpu.uploads.map(u=>u.components),[256*16,256*2,256*4]);
 updatePair(a,b,f=>[f.crate,f.stone,f.barrel],f=>f.crate);
 updatePair(a,b,f=>[f.stone]);updatePair(a,b,()=>[]);
 assert.deepEqual(attributes(a).map(attribute=>attribute.updateRanges),[16,2,4].map(stride=>[{start:0,count:stride*3}]));
 const countBeforeEmpty=gpu.uploads.length;gpu.upload(a);assert.equal(gpu.uploads.length,countBeforeEmpty+3);assert.deepEqual(gpu.uploads.slice(-3).map(u=>u.components),[48,6,12]);
 updatePair(a,b,f=>[f.stone]);gpu.upload(a);gpu.assertActive(a);
 assert.deepEqual(gpu.uploads.slice(-3).map(u=>u.components),[16,2,4]);assert(attributes(a).every(attribute=>attribute.updateRanges.length===0));
 for(const f of [a,b])f.stone.body.position.set(1.5,2.6,-1);
 updatePair(a,b,f=>[f.stone]);gpu.upload(a);gpu.assertActive(a);
 assert.deepEqual(gpu.uploads.slice(-3).map(u=>u.components),[16,2,4]);
 updatePair(a,b,f=>[f.stone,f.barrel]);gpu.upload(a);gpu.assertActive(a);assert.deepEqual(gpu.uploads.slice(-3).map(u=>u.components),[32,4,8]);
 const last=versions(a),calls=gpu.uploads.length;updatePair(a,b,()=>[]);gpu.upload(a);assert.deepEqual(versions(a),last);assert.equal(gpu.uploads.length,calls);
 a.system.dispose();b.system.dispose();
});

test('capacity clipping and dispose retain original records, active attributes and original caster flags',()=>{
 const a=fixture(createItemShadows),b=fixture(reference.createItemShadows);
 for(const f of [a,b]){f.props.length=0;for(let i=0;i<270;i++)f.prop('stone',(i%10)*.2,2,Math.floor(i/10)*.2);}
 updatePair(a,b,f=>f.props);assert.equal(a.mesh.count,256);assert.equal(a.system.snapshot().items.length,256);
 assert.deepEqual(attributes(a).map(attribute=>attribute.updateRanges),[16,2,4].map(stride=>[{start:0,count:256*stride}]));
 assert(a.props.slice(0,256).every(e=>!e.mesh.children[0].castShadow));assert(a.props.slice(256).every(e=>e.mesh.children[0].castShadow));
 for(const f of [a,b]){let geometry=0,material=0;f.mesh.geometry.addEventListener('dispose',()=>geometry++);f.mesh.material.addEventListener('dispose',()=>material++);f.system.dispose();assert.equal(geometry,1);assert.equal(material,1);assert.equal(f.mesh.parent,null);assert(f.props.every(e=>e.mesh.children[0].castShadow));assert(f.props.every(e=>e.mesh.children[1].castShadow===false));}
});

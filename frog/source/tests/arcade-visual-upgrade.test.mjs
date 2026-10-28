import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {Water} from 'three/addons/objects/Water.js';
import {installArcadeVisualUpgrade} from '../src/arcade-visual-upgrade.js';

test('arcade art preserves real surfaces, foliage fading, shader hooks and the pinned water shader',()=>{
 const scene=new THREE.Scene();scene.background=new THREE.Color('#9fe4ff');scene.fog=new THREE.FogExp2('#baf0ea',.006);
 const sun=new THREE.DirectionalLight('#fff1bf',3.2),hemisphere=new THREE.HemisphereLight('#def8ff','#52733a',2.6);scene.add(sun,hemisphere);
 const group=new THREE.Group();scene.add(group);
 const terrain=new THREE.Mesh(new THREE.PlaneGeometry(12,12,4,4).rotateX(-Math.PI/2),new THREE.MeshStandardMaterial({vertexColors:true}));terrain.name='Creek bed and island banks';
 const originalColors=new THREE.Float32BufferAttribute(Array(terrain.geometry.getAttribute('position').count).fill([.3,.4,.2]).flat(),3);terrain.geometry.setAttribute('color',originalColors);group.add(terrain);
 const hook=()=>{},cache=()=> 'retained-world-hook';terrain.material.onBeforeCompile=hook;terrain.material.customProgramCacheKey=cache;
 const water=new Water(new THREE.PlaneGeometry(12,12),{textureWidth:8,textureHeight:8,waterNormals:new THREE.Texture(),fog:true});group.add(water);
 const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(1,1),new THREE.MeshStandardMaterial());rock.position.set(2,1,2);scene.add(rock);
 const groveGroup=new THREE.Group(),crown=new THREE.Mesh(new THREE.IcosahedronGeometry(1,1),new THREE.MeshToonMaterial({color:'#56874d',transparent:true,opacity:.94,depthWrite:true}));crown.name='grove-leaf-crown';groveGroup.add(crown);scene.add(groveGroup);
 const grove={definition:{x:-2,z:-2,radius:2},group:groveGroup,material:crown.material};
 const road=new THREE.Mesh(terrain.geometry.clone(),new THREE.MeshStandardMaterial({vertexColors:true}));scene.add(road);
 const game={scene,sun,renderer:{toneMappingExposure:1.3},world:{group,water},basesView:{groves:[grove]},obstacleMeshes:[rock],battlegroundView:{roadMesh:road}};
 const meshes=[terrain,road,rock,crown],positions=meshes.map(mesh=>mesh.geometry.getAttribute('position').array.slice()),originalMaterials=meshes.map(mesh=>mesh.material),fragment=water.material.fragmentShader;
 let originalDisposals=0;for(const mesh of meshes){mesh.geometry.addEventListener('dispose',()=>originalDisposals++);mesh.material.addEventListener('dispose',()=>originalDisposals++);}
 const art=installArcadeVisualUpgrade(game);
 for(const [i,mesh] of meshes.entries())assert.deepEqual(mesh.geometry.getAttribute('position').array,positions[i],'presentation must retain the collision-aligned surface');
 assert.equal(terrain.material.onBeforeCompile,hook);assert.equal(terrain.material.customProgramCacheKey,cache);
 assert.equal(grove.material,crown.material);grove.material.opacity=.23;grove.material.depthWrite=false;assert.equal(crown.material.opacity,.23,'existing proximity fade must still control the visible canopy');
 for(const code of ['vec3( 0.75, 1.0, 0.75 )','80.0, 0.55, 0.42','float rf0 = 0.14;','waterColor * 1.28'])assert.ok(water.material.fragmentShader.includes(code),'the pinned Water source must match every visual patch');
 assert.equal(water.material.depthWrite,true,'the installer must not alter shared depth behavior');
 water.material.uniforms.sunColor.value.set('#ffffff');art.update();assert.notEqual(water.material.uniforms.sunColor.value.getHexString(),'ffffff');
 art.dispose();art.dispose();
 assert.equal(originalDisposals,0,'only the added resources may be disposed');
 for(const [i,mesh] of meshes.entries())assert.equal(mesh.material,originalMaterials[i]);
 assert.equal(terrain.geometry.getAttribute('color'),originalColors);assert.equal(grove.material,crown.material);assert.equal(water.material.fragmentShader,fragment);assert.equal(scene.fog.density,.006);assert.equal(game.renderer.toneMappingExposure,1.3);
 for(const mesh of meshes){mesh.geometry.dispose();mesh.material.dispose();}water.geometry.dispose();water.material.dispose();
});

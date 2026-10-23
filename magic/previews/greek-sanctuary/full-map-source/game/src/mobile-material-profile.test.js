import test from 'node:test';
import assert from 'node:assert/strict';
import {Scene,Mesh,MeshStandardMaterial,Texture} from 'three';
import {installMobileMaterialProfile} from './mobile-material-profile.js';

test('mobile profile prepares PBR before compile and keeps late clones consistent',async()=>{
 const normal=new Texture(),colour=new Texture(),roughness=new Texture();
 const m=new MeshStandardMaterial({normalMap:normal,map:colour,roughnessMap:roughness});
 const scene=new Scene();scene.add(new Mesh(undefined,m));
 const complete=Promise.resolve('compiled');let draws=0;
 const renderer={compileAsync(root){assert.equal(this,renderer);assert.equal(root,scene);assert.equal(m.normalMap,null);return complete;},renderBufferDirect(camera,scene,geometry,material){assert.equal(material.normalMap,null);draws++;}};
 installMobileMaterialProfile(renderer,{normalMaps:false});
 assert.equal(renderer.compileAsync(scene),complete);await complete;
 assert.equal(m.map,colour);assert.equal(m.roughnessMap,roughness);
 const late=new MeshStandardMaterial({normalMap:normal,bumpMap:normal,map:colour});
 const before=late.version;renderer.renderBufferDirect(null,scene,null,late);
 assert.equal(late.bumpMap,null);assert.equal(late.map,colour);assert.ok(late.version>before);
 const ready=late.version;renderer.renderBufferDirect(null,scene,null,late);
 assert.equal(late.version,ready);assert.equal(draws,2);assert.equal(normal.isTexture,true);
 // Material.copy can reintroduce the same asset map on an already seen clone.
 late.normalMap=normal;renderer.renderBufferDirect(null,scene,null,late);
 assert.equal(late.normalMap,null);assert.ok(late.version>ready);
});

test('profile reaches visible source materials before interior clones copy them',()=>{
 const normal=new Texture(),source=new MeshStandardMaterial({normalMap:normal}),clone=source.clone();
 const scene=new Scene();scene.add(new Mesh(undefined,source));
 const renderer={render(root){assert.equal(root,scene);clone.copy(source);assert.equal(source.normalMap,null);this.renderBufferDirect(null,root,null,clone);},renderBufferDirect(camera,root,geometry,m){assert.equal(m.normalMap,null);}};
 installMobileMaterialProfile(renderer,{normalMaps:false});
 renderer.render(scene);source.normalMap=normal;renderer.render(scene);
});

test('full profile keeps original renderer and all maps untouched',()=>{
 const normal=new Texture(),m=new MeshStandardMaterial({normalMap:normal});
 const scene=new Scene();scene.add(new Mesh(undefined,m));
 const compile=()=>{},direct=()=>{};const renderer={compile,renderBufferDirect:direct};
 installMobileMaterialProfile(renderer);
 assert.equal(renderer.compile,compile);assert.equal(renderer.renderBufferDirect,direct);assert.equal(m.normalMap,normal);
});

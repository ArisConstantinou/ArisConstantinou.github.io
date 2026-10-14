import * as T from 'three';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
export async function exportArchitecture(world,writeChunk){
 const root=world.root.clone(true);root.traverse(o=>{o.visible=true;});const remove=[];root.traverse(o=>{if(o.isMesh&&o.material?.isShaderMaterial)remove.push(o);});remove.forEach(o=>o.removeFromParent());
 const boxes=list=>list.map(({x,y,z,w,h,d,tag})=>({x,y,z,w,h,d,tag}));root.userData={units:'metres',upAxis:'Y',scope:'Static architecture and gates. Wizard/HEARTH rigs remain their original separate editable assets. Procedural fire and gameplay are in the JavaScript source.',colliders:boxes(world.colliders),floors:boxes(world.floors),stairs:world.stairs};
 const buffer=await new GLTFExporter().parseAsync(root,{binary:true,onlyVisible:false,maxTextureSize:2048});const back=await new GLTFLoader().parseAsync(buffer,'');const bounds=new T.Box3().setFromObject(back.scene);let meshes=0,vertices=0,missingNormals=0;back.scene.traverse(o=>{if(o.isMesh){meshes++;vertices+=o.geometry.attributes.position.count;if(!o.geometry.attributes.normal)missingNormals++;}});const bytes=new Uint8Array(buffer);for(let offset=0;offset<bytes.length;offset+=49152){let text='';for(const b of bytes.subarray(offset,offset+49152))text+=String.fromCharCode(b);await writeChunk(btoa(text));}return{bytes:bytes.length,meshes,vertices,missingNormals,bounds:{min:bounds.min,max:bounds.max},reimported:true};
}

import test from 'node:test';import assert from 'node:assert/strict';import * as THREE from 'three';
import {createBatchedTextureUploader} from './batched-texture-upload.js';

function fixture(){
 const events=[],values=new Map(),props=new Map();
 const constants=['UNPACK_FLIP_Y_WEBGL','UNPACK_PREMULTIPLY_ALPHA_WEBGL','UNPACK_ALIGNMENT','UNPACK_COLORSPACE_CONVERSION_WEBGL','UNPACK_ROW_LENGTH','UNPACK_SKIP_PIXELS','UNPACK_SKIP_ROWS','ACTIVE_TEXTURE','TEXTURE_BINDING_2D','PIXEL_UNPACK_BUFFER_BINDING','TEXTURE0','TEXTURE_2D','PIXEL_UNPACK_BUFFER','RGBA','UNSIGNED_BYTE','NONE'];
 const gl=Object.fromEntries(constants.map((key,i)=>[key,i+1]));
 for(const key of constants)values.set(gl[key],100+gl[key]);
 const initial=new Map(values);gl.getParameter=key=>values.get(key);gl.activeTexture=v=>values.set(gl.ACTIVE_TEXTURE,v);gl.bindTexture=(_,v)=>values.set(gl.TEXTURE_BINDING_2D,v);gl.bindBuffer=(_,v)=>values.set(gl.PIXEL_UNPACK_BUFFER_BINDING,v);gl.pixelStorei=(k,v)=>values.set(k,v);gl.texStorage2D=()=>{};gl.isContextLost=()=>false;
 gl.texSubImage2D=(_,level,x,y,format,type,bitmap)=>events.push(['row',y,bitmap.height]);gl.generateMipmap=()=>events.push(['mips']);
 const texture=new THREE.Texture({width:2048,height:1024});texture.flipY=false;texture.needsUpdate=true;
 const renderer={getContext:()=>gl,capabilities:{maxTextureSize:16384},properties:{get:t=>{if(!props.has(t))props.set(t,{});return props.get(t)}},initTexture:t=>{events.push(['allocate',t.source.dataReady,t.generateMipmaps]);Object.assign(renderer.properties.get(t),{__webglTexture:{},__version:t.version})}};
 return{texture,renderer,events,values,initial};
}
test('bounded original rows retain mip allocation, source and GL state',async()=>{
 const f=fixture(),original=f.texture.image,source=f.texture.source,version=f.texture.version;
 const upload=createBatchedTextureUploader({renderer:f.renderer,nextFrame:async()=>f.events.push(['frame']),pixelsPerBatch:524288,createBitmap:async(image,x,y,w,h,options)=>{assert.equal(image,original);assert.deepEqual(options,{imageOrientation:'none',premultiplyAlpha:'none',colorSpaceConversion:'none'});return{height:h,close:()=>f.events.push(['close'])}}});
 const result=await upload(f.texture);assert.equal(result.batches,4);assert.deepEqual(f.events.filter(e=>e[0]==='row'),[['row',0,256],['row',256,256],['row',512,256],['row',768,256]]);
 assert.deepEqual(f.events.find(e=>e[0]==='allocate'),['allocate',false,true]);assert.equal(f.events.at(-1)[0],'mips');assert.equal(f.texture.image,original);assert.equal(f.texture.source,source);assert.equal(source.dataReady,true);assert.equal(f.texture.version,version);assert.deepEqual(f.values,f.initial);
});
test('bitmap failure restores source and requests a complete recovery upload',async()=>{
 const f=fixture(),original=f.texture.image,version=f.texture.version;let crops=0;
 const upload=createBatchedTextureUploader({renderer:f.renderer,nextFrame:async()=>{},createBitmap:async()=>{if(crops++)throw Error('crop failure');return{height:128,close:()=>{}}}});
 await assert.rejects(upload(f.texture),/crop failure/);assert.equal(f.texture.source.dataReady,true);assert.equal(f.texture.image,original);assert.equal(f.texture.version,version+1);assert.deepEqual(f.values,f.initial);
});
test('flip, premultiplied, data and small textures retain ordinary Three uploads',async()=>{
 for(const configure of [t=>t.flipY=true,t=>t.premultiplyAlpha=true,t=>t.isDataTexture=true,t=>t.image={width:512,height:512}]){
  const f=fixture();configure(f.texture);const upload=createBatchedTextureUploader({renderer:f.renderer,nextFrame:async()=>{},createBitmap:()=>{throw Error('Unexpected crop')}});assert.equal((await upload(f.texture)).batched,false);assert.deepEqual(f.events,[['allocate',true,true]]);
 }
});

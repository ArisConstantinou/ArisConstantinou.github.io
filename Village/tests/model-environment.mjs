// Local asset evaluation for geometry/AnimationMixer tests. This is not a
// browser or GPU emulator; it decodes the exact repository GLBs and textures.
import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {createCanvas,Image,ImageData} from '@napi-rs/canvas';

const nativeFetch=globalThis.fetch;
class LocalImage extends Image{
 constructor(){super();this.listeners={};this.onload=()=>{for(const f of this.listeners.load||[])f.call(this,{type:'load'});};this.onerror=error=>{for(const f of this.listeners.error||[])f.call(this,{type:'error',error});};}
 addEventListener(name,fn){(this.listeners[name]??=[]).push(fn);}
 removeEventListener(name,fn){this.listeners[name]=(this.listeners[name]||[]).filter(f=>f!==fn);}
 set src(value){this._src=value;if(typeof value==='string'&&value.startsWith('blob:'))nativeFetch(value).then(r=>r.arrayBuffer()).then(b=>{super.src=Buffer.from(b);});else if(typeof value==='string'&&value.startsWith('file:'))fs.readFile(fileURLToPath(value)).then(b=>{super.src=b;});else super.src=value;}
 get src(){return this._src;}
}
Object.assign(globalThis,{self:globalThis,ImageData,Image:LocalImage,HTMLImageElement:Image,HTMLCanvasElement:createCanvas(1,1).constructor,ProgressEvent:class{constructor(type,args){Object.assign(this,{type},args);}},document:{createElement:name=>name==='canvas'?createCanvas(10,10):{},createElementNS:(_,name)=>name==='img'?new LocalImage():createCanvas(10,10)}});
globalThis.fetch=async(input,options)=>{const url=typeof input==='string'?input:input.url||String(input);return url.startsWith('file:')?new Response(await fs.readFile(fileURLToPath(url))):nativeFetch(input,options);};

export {createCanvas,Image,ImageData};

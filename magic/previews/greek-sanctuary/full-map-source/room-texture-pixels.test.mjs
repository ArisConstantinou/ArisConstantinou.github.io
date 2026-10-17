import test from 'node:test';import assert from 'node:assert/strict';
import {downsampleNormalPixels} from './room-texture-pixels.js';
test('mobile normal mip preserves row orientation, flat normals, alpha, and original pixels',()=>{
 const flat=new Uint8Array(4*4*4);for(let i=0;i<flat.length;i+=4)flat.set([128,128,255,255],i);
 const before=flat.slice(),small=downsampleNormalPixels(flat,4,2);assert.equal(small.length,16);for(let i=0;i<small.length;i+=4)assert.deepEqual([...small.slice(i,i+4)],[128,128,255,255]);assert.deepEqual(flat,before);
 const rows=new Uint8Array(4*4*4);for(let y=0;y<4;y++)for(let x=0;x<4;x++)rows.set([y*40,x*40,255,255],(y*4+x)*4);
 assert.deepEqual([...downsampleNormalPixels(rows,4,2)],[20,20,255,255,20,100,255,255,100,20,255,255,100,100,255,255]);
 assert.equal(downsampleNormalPixels(rows,4,4),rows);assert.throws(()=>downsampleNormalPixels(rows,4,3));
});

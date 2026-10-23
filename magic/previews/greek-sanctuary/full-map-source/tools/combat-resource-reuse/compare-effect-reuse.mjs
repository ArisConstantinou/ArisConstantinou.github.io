import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
const source=path.resolve('.source/combat-fps-20261021/source/game'),pub=path.resolve('.source/no-buzz-20261021/push'),root=process.env.CODEX_GENERATED_OUTPUT;
const require=createRequire(source+'/package.json'),THREE=await import(pathToFileURL(require.resolve('three')).href);
let old=execFileSync('git',['show','bba6148dc549f36642c56f4ebb452de1fc3961aa:magic/previews/greek-sanctuary/full-map-source/game/src/effects.js'],{cwd:pub,encoding:'utf8'});
old=old.replace("from 'three'",`from '${pathToFileURL(require.resolve('three')).href}'`).replaceAll(/from '(\.\/[^']+)'/g,(_,rel)=>`from '${pathToFileURL(path.resolve(source,'src',rel)).href}'`);
const before=await import('data:text/javascript;base64,'+Buffer.from(old).toString('base64')),after=await import(pathToFileURL(source+'/src/effects.js').href);
globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>({strokeText(){},fillText(){}})})};
const hash=a=>createHash('sha256').update(Buffer.from(a.buffer,a.byteOffset,a.byteLength)).digest('hex');
function exercise(create){
 const scene=new THREE.Scene(),fx=create(scene),p=new THREE.Vector3(1,2,3),camera=new THREE.PerspectiveCamera(),key={},states=[];let disposals=0;
 const snapshot=()=>scene.children.filter(o=>o.isSprite||o.geometry?.type==='RingGeometry').map(o=>({type:o.type,position:o.position.toArray(),rotation:o.quaternion.toArray(),scale:o.scale.toArray(),geometry:Object.fromEntries(Object.entries(o.geometry.attributes).map(([k,v])=>[k,hash(v.array)])),index:o.geometry.index?hash(o.geometry.index.array):null,material:Object.fromEntries(['type','opacity','transparent','depthTest','depthWrite','blending','side'].map(k=>[k,o.material[k]])),color:o.material.color.getHex(),image:o.isSprite?[o.material.map.image.width,o.material.map.image.height]:null}));
 fx.number(p,4.4,'#e6fff4',key);fx.number(p,17);fx.ring(p,0xff9900,3,.45);states.push(snapshot());
 for(const o of scene.children.filter(o=>o.isSprite||o.geometry?.type==='RingGeometry'))o.material.addEventListener('dispose',()=>disposals++);
 fx.update(.2,camera);states.push(snapshot());fx.number(p,6,'#e6fff4',key);fx.update(.1,camera);states.push(snapshot());
 fx.update(1.1,camera);states.push(snapshot());fx.number(p,4.4,'#e6fff4',key);fx.ring(p,0x123456,4,.6);states.push(snapshot());
 const pool=fx.poolSnapshot?.();fx.clear();return {states,disposals,pool};
}
const a=exercise(before.createEffects),b=exercise(after.createEffects);assert.deepEqual(b.states,a.states);assert(a.disposals>=3);assert.equal(b.disposals,0);
const result={status:'passed',comparison:'same geometry, material render properties, canvas sizes and transforms at five effect states; not a pixel screenshot comparison',states:a.states.length,oldMaterialDisposals:a.disposals,newMaterialDisposals:b.disposals,pool:b.pool};
await fs.mkdir(root+'/tests/combat-resource-reuse',{recursive:true});await fs.writeFile(root+'/tests/combat-resource-reuse/effect-comparison.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));

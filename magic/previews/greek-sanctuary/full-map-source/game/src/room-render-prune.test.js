import test from 'node:test';import assert from 'node:assert/strict';
import {hiddenRoomBranches,renderWithoutBranches} from './room-render-prune.js';
const node=(type='Group',extra={})=>({type,children:[],visible:true,...extra});
const mesh=(hidden,extra={})=>node('Mesh',{isMesh:true,matrixAutoUpdate:false,matrixWorldAutoUpdate:false,hidden,...extra});
const boxFor=o=>o.unknown?null:{hidden:o.hidden},overlaps=b=>!b.hidden;
test('room pruning collapses only wholly hidden immutable branches',()=>{
 const root=node(),a=node(),b=node(),outside=mesh(true),inside=mesh(false),far=mesh(true);
 root.children=[a,b];a.children=[outside];b.children=[inside,far];
 assert.deepEqual(hiddenRoomBranches(root,boxFor,overlaps),[a,far]);
});
test('unknown, animated and deliberately unculled surfaces retain the render path',()=>{
 const root=node(),objects=[mesh(true,{unknown:true}),mesh(true,{matrixAutoUpdate:true}),mesh(true,{isSkinnedMesh:true}),mesh(true,{frustumCulled:false}),mesh(true,{isBatchedMesh:true}),node('PointLight')];root.children=objects;
 assert.deepEqual(hiddenRoomBranches(root,boxFor,overlaps),[]);
});
test('temporary masks preserve cutaways and restore visibility after rendering or exceptions',()=>{
 const a=mesh(true),b=mesh(true,{visible:false});
 assert.equal(renderWithoutBranches([a,b],()=>{assert.equal(a.visible,false);assert.equal(b.visible,false);return 42;}),42);
 assert.equal(a.visible,true);assert.equal(b.visible,false);
 assert.throws(()=>renderWithoutBranches([a,b],()=>{throw Error('render failed');}),/render failed/);
 assert.equal(a.visible,true);assert.equal(b.visible,false);
});

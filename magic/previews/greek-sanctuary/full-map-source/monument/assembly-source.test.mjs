import test from 'node:test';import assert from 'node:assert/strict';import {assemblyMesh} from './assembly-source.js';
test('native ritual accepts nested downloaded stone meshes and original direct meshes',()=>{const mesh={isMesh:true,geometry:{}},group={isMesh:false},root={traverse:f=>[root,group,mesh].forEach(f)};assert.equal(assemblyMesh(root),mesh);assert.equal(assemblyMesh({traverse:f=>f(mesh)}),mesh);});
test('invalid stone hierarchy reports a concrete error before geometry transfer',()=>{assert.throws(()=>assemblyMesh({traverse:f=>f({})}),/no drawable mesh/);});

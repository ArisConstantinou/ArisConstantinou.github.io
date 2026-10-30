import test from 'node:test';import assert from 'node:assert/strict';import {summarizeRenderBenchmark} from '../src/arcade-render-benchmark.js';
test('render work and screen cadence remain independent measurements',()=>{const r=summarizeRenderBenchmark([2,2,2,2],Array(4).fill(1000/60));assert.equal(r.workMeanMs,2);assert.ok(Math.abs(r.fps-60)<1e-10);assert.equal(r.workP95Ms,2);});
test('missing or invalid benchmark samples are unknown rather than fake zero cost',()=>{const r=summarizeRenderBenchmark([NaN,-1,0],[Infinity,0]);assert.equal(r.workMeanMs,null);assert.equal(r.fps,null);});

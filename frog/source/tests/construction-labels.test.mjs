import test from 'node:test';
import assert from 'node:assert/strict';
import { PerspectiveCamera } from 'three';
import { constructionLabelStatus, visibleConstructionLabels, drawConstructionLabels } from '../src/construction-labels.js';

const job = overrides => ({ id:'job', kind:'construction', type:'shelter', duration:40, progress:10, status:'working', workRate:1.5, workersPresent:3, workPoint:{x:0,z:0}, ...overrides });
function game(jobs=[job()]) {
  const camera = new PerspectiveCamera(60, 1.6, .1, 200);
  camera.position.set(0, 20, 35); camera.lookAt(0, 2, 0); camera.updateMatrixWorld();
  return { camera, player:{x:0,z:0}, world:{sampleHeight:()=>0}, economy:{jobs}, paused:false };
}

test('world labels calculate live ETA from real work rate and preserve four stage boundaries', () => {
  let result = constructionLabelStatus(job());
  assert.equal(result.eta, 20); assert.equal(result.percent, 25); assert.equal(result.stage, 1);
  assert.match(result.detail, /0:20/);
  result = constructionLabelStatus(job({workRate:1,progress:20}));
  assert.equal(result.eta, 20); assert.equal(result.stage, 2);
  assert.equal(constructionLabelStatus(job({progress:30})).stage, 3);
});

test('stalled, attacked, and explicitly paused construction never shows a running countdown', () => {
  for (const overrides of [{workRate:0}, {status:'paused',reason:'Η βάση δέχεται επίθεση.'}, {status:'queued',workRate:1.5}]) {
    const result = constructionLabelStatus(job(overrides));
    assert.equal(result.eta, null); assert.equal(result.running, false); assert.doesNotMatch(result.detail, /≈/);
  }
  const result = constructionLabelStatus(job(), true);
  assert.equal(result.eta, null); assert.equal(result.detail, 'Παύση παιχνιδιού');
});

test('nearby worksite labels follow the bench and cull completed, offscreen, distant, and overlapping sites', () => {
  const base=game();
  assert.equal(visibleConstructionLabels(base, 1280, 800).length, 1);
  base.economy.jobs=[job(),job({id:'overlap'}),job({id:'far',workPoint:{x:80,z:0}}),job({id:'behind',workPoint:{x:0,z:60}}),job({id:'done',progress:40})];
  const labels=visibleConstructionLabels(base,1280,800);
  assert.equal(labels.length,1); assert.equal(labels[0].job.id,'job');
  base.paused=true;assert.equal(visibleConstructionLabels(base,1280,800)[0].status.running,false);
});

test('drawing the live worksite label preserves the shared canvas state and draws percent plus ETA', () => {
  const texts=[],calls=[];
  const ctx={save:()=>calls.push('save'),restore:()=>calls.push('restore'),beginPath(){},rect(){},fill(){},stroke(){},fillRect(){},fillText:text=>texts.push(text),measureText:text=>({width:text.length*5})};
  drawConstructionLabels(game(),ctx,1280,800);
  assert.deepEqual(calls,['save','restore']);assert.ok(texts.includes('25%'));assert.ok(texts.some(text=>text.includes('0:20')));
});

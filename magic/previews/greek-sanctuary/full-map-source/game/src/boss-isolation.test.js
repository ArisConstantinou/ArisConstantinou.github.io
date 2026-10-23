import test from 'node:test';import assert from 'node:assert/strict';
import {isolationPreset,isolationEncounter,isolationConfig,holdIsolatedEnemy,applyBossRenderIsolation,isolationAssets} from './boss-isolation.js';
test('unknown or missing presets restore the historical six enemy composition',()=>{
 assert.equal(isolationPreset('bad').id,'baseline6');assert.equal(isolationConfig().bossCount,0);
 assert.deepEqual(isolationEncounter().map(e=>[e.x,e.z,e.kind]),[[-3,15,'guard'],[3,15,'guard'],[-5,10,'archer'],[5,10,'heavy'],[-8,14,'guard'],[8,14,'archer']]);
 assert(isolationEncounter().every(e=>e.legacyNavSpawn));
});
test('single boss comparisons retain the exact twelve regular spawns',()=>{
 const baseline=isolationEncounter('regular12');assert.equal(baseline.length,12);
 for(const id of ['warden','colossus','gargoyle','wraith']){const e=isolationEncounter(id);assert.equal(e.length,13);assert.deepEqual(e.filter(e=>e.kind!=='boss'),baseline);assert.deepEqual(isolationConfig(id).bossTypes,[id]);}
});
test('both disabled comparisons retain all sixteen actors, normal health and body identity',()=>{
 for(const id of ['render-off','ai-off'])assert.deepEqual(isolationEncounter(id),isolationEncounter('all'));
 const body={},mesh={visible:true},boss={kind:'boss',mesh,body,hp:330},regular={kind:'archer',mesh:{visible:true}};
 applyBossRenderIsolation([boss,regular],'render-off');assert.equal(mesh.visible,false);assert.equal(regular.mesh.visible,true);assert.equal(boss.body,body);assert.equal(boss.hp,330);assert.equal(holdIsolatedEnemy(boss,'render-off'),false);
 for(const bossType of [null,'gargoyle','colossus','wraith'])assert.equal(holdIsolatedEnemy({kind:'boss',bossType},'ai-off'),true);
 assert.equal(holdIsolatedEnemy(regular,'ai-off'),false);assert.equal(isolationConfig('ai-off').bossSummoning,false);assert.equal(isolationConfig('render-off').bossAI,true);
});

test('load only selected boss assets, including dependencies for summons',()=>{
 for(const id of ['baseline6','regular12'])assert.deepEqual(isolationAssets(id),{characters:['mage','guard','archer','heavy'],bosses:[],stoneMinion:false});
 assert.deepEqual(isolationAssets('gargoyle').bosses,['gargoyle']);assert.equal(isolationAssets('gargoyle').stoneMinion,true);
 assert.equal(isolationAssets('warden').characters.at(-1),'warden');assert.deepEqual(isolationAssets('warden').bosses,[]);
 assert.deepEqual(isolationAssets('all').bosses,['colossus','gargoyle','wraith']);assert.equal(isolationAssets('ai-off').stoneMinion,false);
});

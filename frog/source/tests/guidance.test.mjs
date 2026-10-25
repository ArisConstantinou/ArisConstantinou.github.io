import test from 'node:test';
import assert from 'node:assert/strict';
import {describeObjective} from '../src/guidance.js';
import {CAMPAIGN_PHASES,campaignObjectives} from '../src/campaign.js';

test('every real campaign objective has readable Greek guidance without internal type keys',()=>{
  const goals=new Map();
  for(const phase of CAMPAIGN_PHASES)for(const goal of campaignObjectives({phase},{}))goals.set(goal.id,goal);
  assert.equal(goals.size,18);
  for(const goal of goals.values()){
    const text=describeObjective(goal);
    assert.match(text.title,/[Α-Ωα-ωάέήίόύώ]/u,goal.id);
    assert.ok(text.hint.trim().length>20,goal.id+' needs an actual next step');
    assert.doesNotMatch(text.title+' '+text.hint,/\b(?:heron|snake|fish|store|nursery|training|reeds|territories)\b/u,goal.id);
  }
  assert.match(describeObjective({id:'hunt-heron'}).title,/ερωδιό/);
  assert.match(describeObjective({id:'hunt-snake'}).title,/νερόφιδο/);
  assert.match(describeObjective({id:'hunt-fish'}).title,/ψάρι/);
  assert.match(describeObjective({id:'boss-heron'}).title,/Σιδερόραμφο/);
  assert.match(describeObjective({id:'boss-snake'}).title,/Ρίζα του Βυθού/);
  assert.match(describeObjective({id:'boss-fish'}).title,/Λεβιάθαν/);
});

test('building a training ground is distinct from ordering frogs to train',()=>{
  const building=describeObjective({id:'build-training'}),frogs=describeObjective({id:'train-starters'});
  assert.match(building.title,/^Χτίσε χώρο εκπαίδευσης$/);
  assert.match(building.hint,/δικό σου οχυρό/);
  assert.match(building.hint,/V → Χώρος εκπαίδευσης/);
  assert.match(building.hint,/αυλή/);
  assert.match(frogs.title,/^Εκπαίδευσε/);
  assert.match(frogs.hint,/χώρο εκπαίδευσης/);
  assert.match(frogs.hint,/Tab → επίλεξε βατράχους → Εκπαίδευση/);
  assert.deepEqual(describeObjective({id:'training'}),building);
  assert.deepEqual(describeObjective({id:'trained'}),frogs);
});

test('resource hints distinguish shared stock collection from eating and name the shore action',()=>{
  const food=describeObjective({id:'gather-food'}),materials=describeObjective({id:'gather-reeds'});
  assert.match(food.hint,/E για αποθέματα τροφής/);
  assert.match(food.hint,/αριστερό κλικ \(LMB\) για να φας/);
  assert.match(materials.hint,/όχθη/);
  assert.match(materials.hint,/πάτησε E/);
  assert.match(materials.hint,/^Πλησίασε σμήνος/);
  assert.match(materials.hint,/υλικά και τροφή/);
  assert.match(materials.hint,/ακόμη και με συμμάχους δίπλα σου/);
  assert.match(materials.title,/υλικά κατασκευής/);
  assert.doesNotMatch(materials.hint,/LMB/);
  const recruit=describeObjective({id:'recruit-allies'});
  assert.match(recruit.hint,/ουδέτερο ή παραδομένο/);
  assert.match(recruit.hint,/πάτησε E/);
});

test('diagnostic aliases show actual actionable text instead of placeholder identifiers',()=>{
  for(const id of ['food','reeds','shelter','store','nursery','training','allies','trained']){
    const result=describeObjective({id,label:'Placeholder'});
    assert.notEqual(result.title,'Placeholder',id);
    assert.notEqual(result.title,id,id);
    assert.ok(result.hint.length>20,id);
  }
});

test('unknown objectives preserve their supplied label and descriptions do not mutate state',()=>{
  const goal=Object.freeze({id:'future-objective',label:'Εξερεύνησε το επόμενο τμήμα',current:0,target:1});
  assert.deepEqual(describeObjective(goal),{title:goal.label,hint:''});
  assert.deepEqual(describeObjective({...goal,hint:'Πλησίασε την έξοδο.'}),{title:goal.label,hint:'Πλησίασε την έξοδο.'});
  const first=describeObjective({id:'build-training'});first.title='Changed outside the helper';
  assert.equal(describeObjective({id:'build-training'}).title,'Χτίσε χώρο εκπαίδευσης');
  assert.deepEqual(describeObjective(null),{title:'Επόμενος στόχος',hint:''});
});


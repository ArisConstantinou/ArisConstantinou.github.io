import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
import {createCreature} from '../src/creatures.js';

const bundled=await build({entryPoints:[fileURLToPath(new URL('../src/game.js',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm',loader:{'.css':'empty'},logLevel:'silent'});
const {FrogGame}=await import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString('base64')}`);
const models=[];after(()=>models.forEach(m=>m.dispose()));
function actor(type='frog',data={}){
  const model=createCreature(type,{team:type==='frog'?'ally':'predator',seed:1});models.push(model);
  const f={id:`${type}-${models.length}`,type,team:type==='frog'?'ally':'predator',x:0,y:0,z:8,yaw:0,scale:1,model,...data};
  model.group.position.set(f.x,f.y,f.z);model.group.rotation.y=f.yaw;model.group.scale.setScalar(f.scale);model.update(.05,{time:1,speed:0,attack:data.attack});model.group.updateMatrixWorld(true);return f;
}
function fixture(actors,hotspots=[]){
  const game=Object.create(FrogGame.prototype),player={id:'player',x:0,y:0,z:0};
  Object.assign(game,{player,frogs:[player,...actors.filter(f=>f.type==='frog')],predators:actors.filter(f=>f.type!=='frog'),world:{hotspots},input:{ndc:{x:0,y:0}},viewMode:'first',camera:new THREE.PerspectiveCamera(65,1,.05,100)});return game;
}
function aimAt(game,target,origin){game.camera.position.copy(origin);game.camera.lookAt(target);game.camera.updateMatrixWorld(true);return game.findAim();}
function bonePoint(f,name){return new THREE.Vector3().setFromMatrixPosition(f.model.bones[name].matrixWorld);}

test('the actual normal and giant heron heads and bodies are targetable at their rendered height',()=>{
  for(const scale of [1.25,2.3125]){
    const heron=actor('heron',{scale,boss:scale>2}),game=fixture([heron]);
    for(const name of ['head','spine']){
      const point=bonePoint(heron,name),hit=aimAt(game,point,point.clone().add(new THREE.Vector3(7,0,-3)));
      assert.equal(hit?.entity,heron,`${scale}: ${name}`);assert.ok(hit.point.isVector3);
      if(name==='head')assert.ok(hit.point.y>4*scale-.6,'the hit belongs to the head, not a giant low body sphere');
    }
  }
});

test('rotated snake and fish bodies remain targetable near the head and along their length',()=>{
  for(const type of ['snake','fish'])for(const scale of [1,2]){
    const f=actor(type,{scale,yaw:1.1,boss:scale>1,attack:{type:'lunge',phase:.57}}),game=fixture([f]);
    for(const name of type==='snake'?['head','coil14']:['head','tail1']){
      const point=bonePoint(f,name),hit=aimAt(game,point,point.clone().add(new THREE.Vector3(0,7,0)));
      assert.equal(hit?.entity,f,`${type} ${scale}: ${name}`);
    }
  }
});

test('an actual foreground ally is selected before the body of a giant predator behind it',()=>{
  const ally=actor('frog',{z:3}),heron=actor('heron',{z:9,scale:2.3125,boss:true});
  const game=fixture([heron,ally]),point=bonePoint(ally,'spine');
  const hit=aimAt(game,point,new THREE.Vector3(point.x,point.y,-5));
  assert.equal(hit?.entity,ally);
});

test('a nearby ally outside the actual mouse ray cannot steal a fly swarm target',()=>{
  const ally=actor('frog',{x:1.25,z:3}),flies={id:'flies',x:0,y:0,z:7,flies:100};
  const game=fixture([ally],[flies]),hit=aimAt(game,new THREE.Vector3(0,1.2,7),new THREE.Vector3(0,1.2,-4));
  assert.equal(hit?.kind,'flies');assert.equal(hit.entity,flies);
});

test('a closer fly swarm wins over a farther actual predator hit',()=>{
  const snake=actor('snake',{x:0,y:.85,z:9}),flies={id:'flies',x:0,y:0,z:4,flies:100};
  const game=fixture([snake],[flies]),hit=aimAt(game,new THREE.Vector3(0,1.2,9),new THREE.Vector3(0,1.2,-4));
  assert.equal(hit?.kind,'flies');assert.equal(hit.entity,flies);
});

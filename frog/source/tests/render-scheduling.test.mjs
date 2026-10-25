import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {actor,fixture} from './game-fixture.mjs';

function modelSpy(){
  return {group:new THREE.Group(),stats:{length:3},lod:null,updates:[],setOutline(){},setTier(){},
    setRenderLOD(detail){this.lod=detail;},update(dt,state){this.updates.push({dt,state});}};
}
function renderingFixture(){
  const result=fixture(),{game,player}=result;
  player.model=modelSpy();game.settings={quality:'high'};game.shake=0;
  game.camera=new THREE.OrthographicCamera(-90,90,90,-90,.1,200);
  game.camera.position.set(0,90,0);game.camera.up.set(0,0,-1);game.camera.lookAt(0,0,0);game.camera.updateMatrixWorld(true);
  return result;
}
function alliedFrog(id,overrides={}){return actor({id,model:modelSpy(),...overrides});}
function tick(game,dt=1/120){game.elapsed+=dt;game.frameTime+=dt;game.updateModels(dt);}
function portraitSlot(game){game.frameTime+=.13;game.processPortraitQueue();}

// A detail budget may simplify visuals, but it must never become a population
// cap or hide the nearby fighters that the player is actually commanding.
test('all 120 nearby living frogs remain visible while high quality limits full detail to eight, even when all are selected',()=>{
  const {game,player}=renderingFixture();
  const allies=Array.from({length:119},(_,i)=>alliedFrog(`ally-${i}`,{x:(i%10-4.5)*1.2,z:(Math.floor(i/10)-5.5)*1.2}));
  game.frogs.push(...allies);
  const assertArmy=()=>{
    assert.equal(game.frogs.length,120);assert.equal(game.allies().length,119);
    assert.equal(game.frogs.filter(f=>f.model.group.visible).length,120);
    assert.equal(game.frogs.filter(f=>f.model.lod===0).length,8);
    assert.equal(player.model.lod,0);
    assert.ok(game.frogs.every(f=>!f.dead&&f.hp>0));
  };
  tick(game);assertArmy();
  const selected=allies.at(-1);game.selectedIds=new Set([selected.id]);
  tick(game);assertArmy();assert.equal(selected.model.lod,0,'a selected nearby frog receives detail priority');
  game.selectedIds=new Set(allies.map(f=>f.id));
  for(let i=0;i<5;i++){tick(game);assertArmy();}
});

test('medium and distant rigs pose less often while their world position and facing update every tick',()=>{
  const {game,player}=renderingFixture(),medium=alliedFrog('medium',{x:20,speed:1}),far=alliedFrog('far',{x:60,speed:1});
  game.frogs.push(medium,far);
  for(let i=0;i<120;i++){
    medium.x+=.002;medium.z+=.001;medium.yaw+=.01;
    far.x+=.001;far.z-=.002;far.yaw-=.01;
    tick(game);
    for(const frog of [medium,far]){
      assert.deepEqual(frog.model.group.position.toArray(),[frog.x,frog.y,frog.z]);
      assert.equal(frog.model.group.rotation.y,frog.yaw);
      assert.equal(frog.model.group.visible,true);
    }
  }
  assert.equal(player.model.updates.length,120,'the player retains per-frame posing');
  assert.equal(medium.model.lod,1);assert.equal(far.model.lod,2);
  assert.ok(medium.model.updates.length>=25&&medium.model.updates.length<=35,`medium rig poses ${medium.model.updates.length} times per second`);
  assert.ok(far.model.updates.length>=10&&far.model.updates.length<=15,`far rig poses ${far.model.updates.length} times per second`);
  assert.ok(medium.model.updates.some(update=>update.dt>1/120),'a deferred pose receives accumulated elapsed time');
  assert.ok(far.model.updates.some(update=>update.dt>1/30));
});

test('native predators outside the camera or distance range do not animate and resume immediately when visible',()=>{
  const {game}=renderingFixture();
  game.camera=new THREE.PerspectiveCamera(60,1,.1,200);
  game.camera.position.set(0,3,12);game.camera.lookAt(0,1,-10);game.camera.updateMatrixWorld(true);
  const predator=(id,overrides)=>actor({id,type:'heron',phase:'patrol',phaseTime:0,scale:1,model:modelSpy(),...overrides});
  const visible=predator('visible',{z:-15}),behind=predator('behind',{z:35}),far=predator('far',{z:-110}),dormant=predator('dormant',{z:-10,phase:'dormant'}),dead=predator('dead',{z:-10,dead:true,phaseTime:5});
  game.predators=[visible,behind,far,dormant,dead];
  for(let i=0;i<12;i++)tick(game);
  assert.equal(visible.model.updates.length,12);
  for(const hidden of [behind,far,dormant,dead])assert.equal(hidden.model.updates.length,0,`${hidden.id} must not pose while unseen`);
  for(const hidden of [far,dormant,dead])assert.equal(hidden.model.group.visible,false);
  behind.z=-20;tick(game);
  assert.equal(behind.model.updates.length,1,'entering the view resumes the native rig without a stale pose delay');
  assert.equal(behind.model.group.position.z,-20);
});

test('unread army portraits remain queued and the two selected HUD portraits follow army order, not selection insertion order',()=>{
  const {game,player}=fixture(),rendered=[];
  const allies=Array.from({length:6},(_,i)=>alliedFrog(`ally-${i}`)),dead=alliedFrog('dead',{dead:true});
  game.frogs.push(...allies);game.renderer={};game.portraitQueue=[dead,player,...allies];
  game.updateFrogPortrait=f=>rendered.push(f.id);game.ui.panel=null;
  for(let i=0;i<8;i++){portraitSlot(game);game.processPortraitQueue();}
  assert.deepEqual(rendered,[player.id,'ally-0','ally-1']);
  assert.deepEqual(game.portraitQueue.map(f=>f.id),['ally-2','ally-3','ally-4','ally-5']);
  game.selectedIds=new Set(['ally-5','ally-2','ally-4']);
  for(let i=0;i<5;i++)portraitSlot(game);
  assert.deepEqual(rendered.slice(3),['ally-2','ally-4'],'these are the first two selected frogs actually shown by the HUD');
  assert.deepEqual(game.portraitQueue.map(f=>f.id),['ally-3','ally-5']);
});

test('opening roster or build drains other portraits gradually after prioritizing the visible selection',()=>{
  for(const panel of ['roster','build']){
    const {game}=fixture(),rendered=[];
    const allies=Array.from({length:6},(_,i)=>alliedFrog(`ally-${i}`));
    game.frogs.push(...allies);game.renderer={};game.portraitQueue=[...allies];
    game.selectedIds=new Set(['ally-5','ally-4']);game.ui.panel=panel;
    game.updateFrogPortrait=f=>rendered.push(f.id);
    portraitSlot(game);game.processPortraitQueue();
    assert.deepEqual(rendered,['ally-4'],`${panel}: one visible portrait gets the first rendering slot`);
    portraitSlot(game);assert.deepEqual(rendered,['ally-4','ally-5']);
    portraitSlot(game);assert.deepEqual(rendered,['ally-4','ally-5','ally-0'],'the oldest remaining portrait follows');
    game.ui.panel=null;for(let i=0;i<3;i++)portraitSlot(game);
    assert.equal(rendered.length,3,'closing the panel stops work on unread army portraits');
    game.ui.panel=panel;for(let i=0;i<3;i++)portraitSlot(game);
    assert.deepEqual(rendered,['ally-4','ally-5','ally-0','ally-1','ally-2','ally-3']);
    assert.equal(game.portraitQueue.length,0);
  }
});


test('the FPS measurement reports slow frames instead of hiding them behind the physics step cap',()=>{
  const {game}=fixture(),noop=()=>{};
  Object.assign(game,{last:0,frameTime:0,fps:60,started:false,paused:true,frameProfile:null,timers:{ui:0,save:0},
    renderer:{render:noop},updateLighting:noop,updateCamera:noop,updateModels:noop,processPortraitQueue:noop,drawLabels:noop,updateUI:noop});
  game.world.update=noop;game.vfx.update=noop;game.ui.isBlocking=()=>false;game.input.endFrame=noop;
  for(let i=1;i<=120;i++)game.frame(i*250);
  assert.ok(game.fps>=3.9&&game.fps<4.1,`4 actual frames/sec must display 4, got ${game.fps}`);
});

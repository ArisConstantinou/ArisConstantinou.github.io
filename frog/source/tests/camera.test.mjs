import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {updateGameCamera,cycleGameView} from '../src/camera.js';

function makeGame(overrides={}){
  const calls={lock:0,unlock:0,modes:[],messages:[]};
  const input={dx:0,dy:0,zoomDelta:0,ndc:{x:0,y:0},
    lock(){calls.lock++;},unlock(){calls.unlock++;},
    setMode(mode){calls.modes.push(mode);},
    clearMouseMotion(){this.dx=0;this.dy=0;this.zoomDelta=0;}};
  const game={camera:new THREE.PerspectiveCamera(60,16/9,.1,400),
    cameraYaw:.62,cameraPitch:.38,cameraDistance:8.4,
    cameraFocus:new THREE.Vector3(),cameraWanted:new THREE.Vector3(),
    player:{x:0,y:0,z:0,yaw:0,model:{group:new THREE.Group()}},
    world:{sampleHeight(){return 0;}},input,
    settings:{sensitivity:1},started:true,paused:false,shake:0,
    ui:{isBlocking(){return false;},toast(message){calls.messages.push(message);}},
    ...overrides};
  return {game,calls};
}

test('C traverses all three views and only first person hides the player',()=>{
  const {game}=makeGame();
  updateGameCamera(game,0,true);
  assert.equal(game.viewMode,'third');
  assert.equal(game.player.model.group.visible,true);
  for(const expected of ['first','topdown','third','first']){
    assert.equal(cycleGameView(game),expected);
    assert.equal(game.viewMode,expected);
    assert.equal(game.hidePlayer,expected==='first');
    assert.equal(game.player.model.group.visible,expected!=='first');
  }
});

test('C requests pointer lock for perspective views and frees it in topdown',()=>{
  const {game,calls}=makeGame();
  updateGameCamera(game,0,true);
  cycleGameView(game); // first
  assert.equal(calls.lock,1);assert.equal(calls.unlock,0);
  const before=performance.now();
  cycleGameView(game); // topdown
  assert.equal(calls.lock,1);assert.equal(calls.unlock,1);
  assert.ok(game.ignoreUnlockUntil>before,'intentional unlock must suppress pause');
  cycleGameView(game); // third
  assert.equal(calls.lock,2);assert.equal(calls.unlock,1);
  game.paused=true;
  cycleGameView(game); // first while paused
  assert.equal(calls.lock,2,'changing view while paused must not capture the mouse');
});

for(const mode of ['third','first','topdown']){
  test(`${mode}: forward movement projects upward and right strafe projects right`,()=>{
    const {game}=makeGame({viewMode:mode});
    updateGameCamera(game,0,true);
    const yaw=game.movementYaw;
    // These vectors are the controller contract. Projection checks the visible
    // result instead of comparing camera positions with their construction.
    const forward=new THREE.Vector3(Math.sin(yaw),0,Math.cos(yaw));
    const right=new THREE.Vector3(-Math.cos(yaw),0,Math.sin(yaw));
    const groundPoint=new THREE.Vector3(game.player.x,.15,game.player.z).addScaledVector(forward,6);
    const initial=groundPoint.clone().project(game.camera);
    const afterW=groundPoint.clone().addScaledVector(forward,1.5).project(game.camera);
    const afterD=groundPoint.clone().addScaledVector(right,1.5).project(game.camera);
    assert.ok(afterW.y>initial.y,'W must move toward the top of the displayed world');
    assert.ok(afterD.x>initial.x,'D must move toward the right of the displayed world');
    assert.ok([initial,afterW,afterD].every(p=>[p.x,p.y,p.z].every(Number.isFinite)));
  });
}

test('topdown mouse rays recover the cursor position and aim at opposite sides',()=>{
  const {game}=makeGame({viewMode:'topdown'});
  const aims=[];
  for(const x of [-.65,.65]){
    game.input.ndc={x,y:.18};
    updateGameCamera(game,.016,true);
    const projected=game.aimPoint.clone().project(game.camera);
    assert.ok(Math.abs(projected.x-x)<1e-6,'world aim must project back to cursor X');
    assert.ok(Math.abs(projected.y-.18)<1e-6,'world aim must project back to cursor Y');
    const toTarget=new THREE.Vector3(game.aimPoint.x-game.player.x,0,game.aimPoint.z-game.player.z).normalize();
    const facing=new THREE.Vector3(Math.sin(game.aimYaw),0,Math.cos(game.aimYaw));
    assert.ok(facing.dot(toTarget)>.99999,'attack facing must point toward the cursor target');
    aims.push(game.aimPoint.clone());
  }
  assert.ok(aims[0].x*aims[1].x<0,'opposite cursor sides must produce opposite world targets');
});

test('a terrain obstruction shortens the boom and keeps transforms finite during motion',()=>{
  const {game}=makeGame({cameraYaw:0});
  updateGameCamera(game,0,true);
  const origin=new THREE.Vector3(0,.73,0);
  const unobstructedDistance=game.camera.position.distanceTo(origin);
  game.world.sampleHeight=(x,z)=>z<-2&&z>-7?5:0;
  updateGameCamera(game,0,true);
  assert.ok(game.camera.position.distanceTo(origin)<unobstructedDistance,'camera should pull forward in front of the rock bank');
  for(let frame=0;frame<90;frame++){
    game.player.x=Math.sin(frame*.12)*1.6;
    game.player.z=Math.cos(frame*.08)*.8;
    game.input.dx=Math.sin(frame*.13)*12;
    game.input.dy=Math.cos(frame*.1)*6;
    if(frame===30||frame===60)cycleGameView(game);
    updateGameCamera(game,1/60);
    const values=[...game.camera.position.toArray(),...game.camera.quaternion.toArray(),...game.camera.matrixWorld.elements,...game.aimPoint.toArray(),game.aimYaw];
    assert.ok(values.every(Number.isFinite),`camera and aim must remain finite at frame ${frame}`);
  }
});


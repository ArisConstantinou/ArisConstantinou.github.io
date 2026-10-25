import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {updateGameCamera,cycleGameView} from '../src/camera.js';
import {FORT_RADIUS,GATE_WIDTH,WALL_HEIGHT,WALL_THICKNESS} from '../src/fortification.js';

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

test('real castle wall geometry stops both the requested boom and the interpolated shoulder camera',()=>{
  const geometry=new THREE.BoxGeometry(1,1,1),material=new THREE.MeshBasicMaterial(),wall=new THREE.InstancedMesh(geometry,material,1),mesh=new THREE.Group(),transform=new THREE.Object3D();
  transform.position.set(FORT_RADIUS,.11+WALL_HEIGHT/2,0);transform.scale.set(WALL_THICKNESS,WALL_HEIGHT,8);transform.updateMatrix();wall.setMatrixAt(0,transform.matrix);mesh.add(wall);mesh.userData.fortWalls=wall;
  const {game}=makeGame({cameraYaw:-Math.PI/2,cameraDistance:12.2,camps:[{x:0,z:0,hp:350,mesh}]});
  game.player.x=FORT_RADIUS-1.5;game.player.y=.11;game.world.sampleHeight=()=>.11;
  updateGameCamera(game,0,true);
  const insideFace=FORT_RADIUS-WALL_THICKNESS/2;
  assert.ok(game.camera.position.x<insideFace-.15,'camera must stay on the player side of the stone wall');
  game.camera.position.set(FORT_RADIUS+8,2,0);
  updateGameCamera(game,.001,false);
  assert.ok(game.camera.position.x<insideFace-.15,'smoothing must not leave the camera outside a blocked wall');
  const ray=new THREE.Raycaster(game.cameraFocus.clone(),game.camera.position.clone().sub(game.cameraFocus).normalize(),0,game.camera.position.distanceTo(game.cameraFocus));
  assert.equal(ray.intersectObject(wall).length,0,'final view to the player must be unobstructed');
  geometry.dispose();material.dispose();wall.dispose();
});

test('the shoulder camera uses rendered gate leaves and passes through open, breached or hidden entrances',()=>{
  const mesh=new THREE.Group(),fort=new THREE.Group(),gate=new THREE.Group(),leaves=[],geometry=new THREE.BoxGeometry(GATE_WIDTH/2,WALL_HEIGHT,.36),material=new THREE.MeshBasicMaterial();
  mesh.add(fort);fort.add(gate);gate.position.set(0,.11,FORT_RADIUS);
  for(const side of [-1,1]){const hinge=new THREE.Group(),door=new THREE.Mesh(geometry,material);hinge.position.x=side*GATE_WIDTH/2;door.position.set(-side*GATE_WIDTH/4,WALL_HEIGHT/2,0);hinge.add(door);gate.add(hinge);leaves.push(hinge);}
  mesh.userData.gateLeaves=leaves;
  const {game}=makeGame({cameraYaw:Math.PI,cameraPitch:.15,camps:[{x:0,z:0,hp:350,team:'ally',mesh}]});
  game.player.z=FORT_RADIUS-2.4;game.player.y=.11;game.world.sampleHeight=()=>.11;
  updateGameCamera(game,0,true);const closed=game.camera.position.distanceTo(game.cameraFocus);
  assert.ok(game.camera.position.z<FORT_RADIUS-.2,'a visually closed allied gate still obstructs the camera');
  leaves[0].rotation.y=-Math.PI*.52;leaves[1].rotation.y=Math.PI*.52;
  updateGameCamera(game,0,true);const open=game.camera.position.distanceTo(game.cameraFocus);
  assert.ok(open>closed*2,'an open gate must not behave like an invisible wall');
  for(const leaf of leaves){leaf.rotation.y=0;leaf.visible=false;}
  updateGameCamera(game,0,true);assert.ok(Math.abs(game.camera.position.distanceTo(game.cameraFocus)-open)<1e-8,'breached gate leaves must not obstruct the view');
  for(const leaf of leaves)leaf.visible=true;fort.visible=false;
  updateGameCamera(game,0,true);assert.ok(Math.abs(game.camera.position.distanceTo(game.cameraFocus)-open)<1e-8,'an invisible ancestor must disable its gate geometry');
  geometry.dispose();material.dispose();
});


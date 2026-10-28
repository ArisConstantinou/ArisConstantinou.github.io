import test from 'node:test';
import assert from 'node:assert/strict';
import {PerspectiveCamera, Vector3} from 'three';
import {cameraPose, screenToWorld} from '../src/arcade-view-math.js';
import {newRound, SWARMS, RULES} from '../src/arcade-model.js';
import {drawRadar, drawFlyMarkers} from '../src/arcade-radar.js';

function projectPoint(pose, aspect, point){
 const camera=new PerspectiveCamera(52,aspect,.1,250);
 camera.position.fromArray(pose.position);camera.lookAt(new Vector3(...pose.look));camera.updateMatrixWorld();
 return new Vector3(...point).project(camera);
}

for(const [name,aspect] of [['portrait',390/844],['landscape',844/390],['desktop',1440/900]]){
 test(`tilted overview keeps the player centred in ${name}`,()=>{
  const p={x:6,z:-7,aimX:0,aimZ:-1},ground=2.4,pose=cameraPose(p,ground,aspect,'overview');
  const projected=projectPoint(pose,aspect,[p.x,ground+1.2,p.z]);
  assert.ok(Math.abs(projected.x)<1e-10);assert.ok(Math.abs(projected.y)<1e-10);
  const pitch=Math.atan2(pose.position[1]-pose.look[1],Math.hypot(pose.position[0]-pose.look[0],pose.position[2]-pose.look[2]))*180/Math.PI;
  assert.ok(pitch>45&&pitch<60,`pitch ${pitch} should show both body and surroundings`);
  assert.deepEqual(cameraPose({...p,aimX:1,aimZ:0},ground,aspect,'overview'),pose);
 });
 test(`rear camera keeps frog and outgoing shot region visible in ${name}`,()=>{
  const p={x:-3,z:9,face:Math.PI},ground=1,pose=cameraPose(p,ground,aspect,'chase3d');
  const body=projectPoint(pose,aspect,[p.x,ground+1.2,p.z]);
  assert.ok(body.x<-.08&&body.x>-.65&&body.y<-.08&&body.y>-.5,'the frog stays visible below and left of the centre crosshair');
  for(const offset of [[-1.1,0,0],[1.1,0,0],[0,1.3,0],[0,0,-1.5]]){
   const edge=projectPoint(pose,aspect,[p.x+offset[0],ground+1.2+offset[1],p.z+offset[2]]);
   assert.ok(Math.abs(edge.x)<.8&&Math.abs(edge.y)<.8,'body/mouth region should not clip');
  }
  assert.ok(pose.position[2]>p.z+8,'the default view stays behind the north-facing frog');
  assert.ok(Math.abs(pose.position[0]-p.x)<2.5,'the shoulder view remains predominantly behind the frog');
  const pitch=Math.atan2(pose.position[1]-pose.look[1],Math.hypot(pose.position[0]-pose.look[0],pose.position[2]-pose.look[2]))*180/Math.PI;
  assert.ok(pitch<30,'default remains a low third-person view');
 });
}

test('analogue movement magnitude and orthogonality survive either camera mode',()=>{
 for(const mode of ['overview','chase3d']){
  const pose=cameraPose({x:0,z:8},0,.46,mode),camera={x:pose.position[0],z:pose.position[2]},focus={x:pose.look[0],z:pose.look[2]};
  const right=screenToWorld(1,0,camera,focus),up=screenToWorld(0,-1,camera,focus),small=screenToWorld(.17,-.29,camera,focus);
  assert.ok(Math.abs(right.x*up.x+right.z*up.z)<1e-12);
  assert.ok(Math.abs(Math.hypot(small.x,small.z)-Math.hypot(.17,.29))<1e-12);
 }
 const vertical={x:2,z:4};
 assert.deepEqual(screenToWorld(.3,-.6,vertical,vertical),{x:.3,z:-.6});
});

function fakeContext(){
 const calls=[];
 return new Proxy({calls,measureText:text=>({width:text.length*6})},{get(target,key){if(key in target)return target[key];return (...args)=>calls.push([key,...args]);}});
}
function gameForMarkers(){
 const state=newRound(),swarm=SWARMS[0];
 Object.assign(state.actors[0],{x:swarm.x,z:swarm.z,ammo:0});
 return {state,w:390,h:844,touch:true,camera:{position:{x:0,z:10}},focus:{x:0,z:0},ground:()=>0,project:()=>({x:195,y:400,visible:true})};
}

test('map groups all flies into one icon per patch and keeps contestants visible',()=>{
 const game=gameForMarkers(),c=fakeContext();
 drawRadar(game,{width:320,getContext:()=>c});
 assert.equal(c.calls.filter(call=>call[0]==='ellipse').length,SWARMS.length*3);
 for(const actor of game.state.actors)assert.equal(actor.ko,false);
 assert.equal(c.calls.filter(call=>call[0]==='arc'&&(call[3]===8||call[3]===9)).length,SWARMS.length+3);
 assert.equal(c.calls.filter(call=>call[0]==='fillText').length,1);
});

test('world guidance is one patch label, reacts to depletion, and disappears with full ammo',()=>{
 const game=gameForMarkers(),c=fakeContext();
 drawFlyMarkers(game,c);
 const text=c.calls.filter(call=>call[0]==='fillText');
 assert.equal(text.length,1);assert.match(text[0][1],/Μύγες · 12/);
 for(const fly of game.state.flies)if(fly.swarmId===SWARMS[0].id)fly.wait=6.2;
 c.calls.length=0;drawFlyMarkers(game,c);
 assert.equal(c.calls.filter(call=>call[0]==='fillText').length,1);
 assert.match(c.calls.find(call=>call[0]==='fillText')[1],/Ξανά σε 7/);
 game.state.actors[0].ammo=RULES.capacity;c.calls.length=0;drawFlyMarkers(game,c);
 assert.equal(c.calls.length,0);
});

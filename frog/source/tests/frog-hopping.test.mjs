import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture,actor} from './game-fixture.mjs';
import {createCreature} from '../src/creatures.js';
import {frogHopPose} from '../src/frog-locomotion.js';

const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
function setup(keys=['KeyW']){
  const result=fixture(),{game,player}=result;
  const held=new Set(keys),pressed=new Set(),released=new Set();
  game.findAim=()=>null;
  Object.assign(game.input,{down:k=>held.has(k),hit:k=>pressed.has(k),up:k=>released.has(k),left:false,right:false});
  player.charge=-1;
  function tick(count=1){for(let i=0;i<count;i++){game.elapsed+=1/60;game.updatePlayer(1/60);pressed.clear();released.clear();}}
  return {...result,held,pressed,released,tick};
}

test('land travel repeatedly gathers, leaves the ground, moves forward and absorbs the landing',()=>{
  const {player,tick}=setup();
  let launches=0,previousGrounded=true,rising=false,falling=false,plantedFrames=0,peak=0;
  for(let frame=0;frame<150;frame++){
    const before={x:player.x,z:player.z,grounded:player.grounded,y:player.y};tick();
    if(previousGrounded&&!player.grounded)launches++;
    if(!player.grounded){rising ||= player.y>before.y;falling ||= player.y<before.y;assert.ok(player.z>before.z,'airborne hop translates forward');}
    if(before.grounded&&player.grounded){assert.equal(distance(player,before),0,'stance feet do not slide');plantedFrames++;}
    peak=Math.max(peak,player.y-.35);previousGrounded=player.grounded;
  }
  assert.ok(launches>=4);assert.ok(rising&&falling);assert.ok(peak>.4);assert.ok(plantedFrames>15);
  assert.ok(player.z>12);assert.ok(Math.abs(player.x)<1e-10);
});

test('releasing direction in the air finishes that hop and stays still after landing',()=>{
  const {player,tick,held}=setup();
  while(player.grounded)tick();tick(5);
  const takeoff={x:player.x,z:player.z,vx:player.vx,vz:player.vz};held.clear();
  while(!player.grounded){tick();if(!player.grounded){assert.equal(player.vx,takeoff.vx);assert.equal(player.vz,takeoff.vz);}}
  assert.ok(player.z>takeoff.z+.5,'release does not halt the frog in midair');
  const landed={x:player.x,z:player.z};tick(90);assert.equal(distance(player,landed),0);assert.equal(player.grounded,true);
});

test('a new direction and camera turn apply to the next take-off rather than bending the current hop',()=>{
  const {game,player,tick,held}=setup();while(player.grounded)tick();
  const vx=player.vx,vz=player.vz,yaw=player.yaw;
  held.clear();held.add('KeyW');game.cameraYaw=Math.PI/2;
  while(!player.grounded){tick();if(!player.grounded){assert.equal(player.vx,vx);assert.equal(player.vz,vz);assert.equal(player.yaw,yaw);}}
  while(player.grounded)tick();
  assert.ok(player.vx>7);assert.ok(Math.abs(player.vz)<1e-10);assert.ok(Math.abs(player.yaw-Math.PI/2)<1e-10);
});

test('directional and diagonal hops cover the same distance, including sideways and backwards',()=>{
  const movements=[['KeyW'],['KeyW','KeyD'],['KeyS'],['KeyA']].map(keys=>{
    const {player,tick}=setup(keys);tick(180);return {x:player.x,z:player.z,yaw:player.yaw};
  });
  for(const move of movements)assert.ok(Math.abs(Math.hypot(move.x,move.z)-Math.hypot(movements[0].x,movements[0].z))<1e-9);
  assert.ok(movements[1].x<0&&movements[1].z>0);assert.ok(movements[2].z<0);assert.ok(movements[3].x>0);
});

test('allied, rival and neutral frogs use the same airborne locomotion for their movement intent',()=>{
  for(const team of ['ally','enemy0','neutral']){
    const {game,player}=fixture();player.x=-80;
    const frog=actor({team,id:team,brain:999,intent:{kind:'move',target:{x:30,z:30}}});game.frogs.push(frog);
    let airborne=false,planted=false;
    for(let i=0;i<90;i++){
      const before={x:frog.x,z:frog.z,grounded:frog.grounded};game.elapsed+=1/60;game.updateFrogs(1/60);
      if(!frog.grounded){airborne=true;assert.ok(frog.x>=before.x&&frog.z>=before.z);}
      if(before.grounded&&frog.grounded){assert.equal(distance(frog,before),0);planted=true;}
    }
    assert.ok(airborne&&planted,team);assert.ok(distance(frog,{x:0,z:0})>5,team);
  }
});

test('swimming stays continuous and a charged jump still launches in the chosen direction',()=>{
  const water=setup();water.player.swimming=true;water.player.y=0;water.game.world.getSurface=()=>({height:0,type:'water'});
  water.tick(120);assert.equal(water.player.grounded,true);assert.equal(water.player.hop.phase,'swim');assert.ok(water.player.z>9);
  const {player,tick,held,pressed,released}=setup(['KeyD']);held.add('Space');pressed.add('Space');tick(20);
  assert.equal(player.grounded,true);assert.equal(player.x,0,'charged jump loads on planted feet');
  held.delete('Space');released.add('Space');tick();
  assert.equal(player.grounded,false);assert.ok(player.vy>8);assert.ok(player.vx<0);assert.ok(Math.abs(player.vz)<1e-9);
});

test('the real frog rig extends both hind legs together and poses from the actual hop phase',()=>{
  const model=createCreature('frog',{seed:4});
  try{
    const sample=(phase,progress,time=0)=>{model.update(1/60,{time,speed:8,hop:{phase,progress}});return ['hip','knee','ankle','shoulder','elbow'].map(name=>{
      assert.ok(Math.abs(model.bones[`${name}-1`].rotation.x-model.bones[`${name}1`].rotation.x)<1e-12,`${name} must move as a pair`);
      return model.bones[`${name}1`].rotation.x;
    });};
    const gathered=sample('gather',1),extension=sample('air',.16),tucked=sample('air',.7);
    assert.notDeepEqual(extension,gathered);assert.notDeepEqual(extension,tucked);
    assert.deepEqual(sample('air',0),gathered,'take-off starts from the gathered stance without a joint snap');
    assert.deepEqual(sample('air',1),sample('land',0),'descent reaches the landing stance before contact');
    assert.deepEqual(sample('air',.16,100),extension,'wall clock cannot produce a walking cycle during the hop');
    assert.deepEqual(sample('idle',0,20),sample('idle',0,21),'a planted frog has no alternating leg cycle');
  }finally{model.dispose();}
});

test('animation phase follows physics through ascent and descent instead of reversing at the apex',()=>{
  const {player,tick}=setup();while(player.grounded)tick();let previous=-1;
  while(!player.grounded){const pose=frogHopPose(player);assert.equal(pose.phase,'air');assert.ok(pose.progress>=previous);previous=pose.progress;tick();}
  assert.equal(frogHopPose(player).phase,'land');
});

test('a swimming frog propels itself onto an elevated bank instead of sticking at the water edge',()=>{
  for(const rise of [.2,.3,.7]){
    const {game,player,tick}=setup();player.y=0;player.swimming=true;
    game.world.getSurface=(_x,z)=>z<=.5?{height:0,type:'water'}:{height:rise,type:'land'};
    tick(180);assert.ok(player.z>12,`bank ${rise} is crossed by real travel`);assert.equal(player.swimming,false);assert.ok(player.y>=rise);
  }
});

test('Space pressed and released during a normal hop queues a charged jump at landing',()=>{
  const {player,tick,held,pressed,released}=setup();while(player.grounded)tick();
  held.add('Space');pressed.add('Space');tick(9);held.delete('Space');released.add('Space');tick();
  assert.equal(player.jumpReleaseQueued,true);const stamina=player.stamina;let launched=false;
  for(let i=0;i<50;i++){tick();if(player.vy>8){launched=true;break;}}
  assert.ok(launched,'buffered command survives the current flight');assert.equal(player.jumpReleaseQueued,false);assert.equal(player.charge,-1);assert.ok(player.stamina<stamina-10);
});

test('keyboard and HUD dodge share the same deliberate airborne direction, heading and cost',()=>{
  const keyboard=setup(),hud=setup();for(const run of [keyboard,hud]){while(run.player.grounded)run.tick();run.held.clear();run.held.add('KeyD');}
  keyboard.pressed.add('KeyZ');keyboard.tick();hud.game.onAction('dodge');hud.tick();
  for(const key of ['vx','vz','yaw','stamina','charge'])assert.equal(keyboard.player[key],hud.player[key],key);
  assert.equal(keyboard.player.hop.yaw,keyboard.player.yaw);assert.equal(keyboard.player.vx,-14.8);assert.equal(keyboard.player.vz,0);assert.equal(keyboard.player.stamina,78.25);
  for(const run of [keyboard,hud]){const before={vx:run.player.vx,vz:run.player.vz,stamina:run.player.stamina};assert.equal(run.game.dodge(),false);assert.deepEqual({vx:run.player.vx,vz:run.player.vz,stamina:run.player.stamina},before,'cooldown cannot spend again or redirect');}
  hud.player.dodgeCD=0;hud.player.stamina=21;const before=hud.player.vx;assert.equal(hud.game.dodge(),false);assert.equal(hud.player.stamina,21);assert.equal(hud.player.vx,before);
});

for(const airborne of [false,true])test(`a ${airborne?'queued airborne':'grounded'} charged jump consumes stamina exactly once`,()=>{
  const {game,player,tick,held,pressed,released}=setup();if(airborne)while(player.grounded)tick();
  player.stamina=70;let frames=0,jumps=0;const original=game.jump;
  game.jump=function(...args){jumps++;return original.apply(this,args);};
  const step=()=>{tick();frames++;};
  held.add('Space');pressed.add('Space');for(let i=0;i<9;i++)step();
  const expectedCost=12+player.charge*8;held.delete('Space');released.add('Space');
  for(let i=0;i<75;i++)step();
  assert.equal(jumps,1);assert.ok(Math.abs(player.stamina-(70+frames*.25-expectedCost))<1e-9);
  assert.equal(player.jumpReleaseQueued,false);assert.equal(player.charge,-1);
});

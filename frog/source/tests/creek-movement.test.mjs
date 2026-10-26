import test from 'node:test';
import assert from 'node:assert/strict';
import {creekMovementMethods} from '../src/creek-movement.js';

function fixture(){
  const held=new Set(),tongues=[];
  const player={id:'player',team:'player',x:0,z:0,y:-.25,hp:100,maxHp:100,grounded:true,swimming:true,stamina:100,attackCD:0,travelWish:{vx:2,vz:0},vx:0,vz:0,vy:0,yaw:0};
  const mods={dive:true,tongueRange:14};
  const game={...creekMovementMethods,player,creekMode:true,input:{down:key=>held.has(key)},world:{getSurface:()=>({type:'water',height:-.25}),sampleHeight:()=>-.25,getTerrainHeight:()=>-3,currentAt:()=>({x:0,z:0})},
    creekAbilityModifiers:()=>mods,vfx:{tongue:(...a)=>tongues.push(a)},audio:{play(){}}};
  return {game,player,held,mods,tongues};
}

test('earned dive reaches below the swimming surface using actual terrain depth',()=>{
  const {game,player,held}=fixture();held.add('ControlLeft');
  assert.equal(game.moveCreekDiver(player,.1),true);assert.ok(player.diveDepth>.16);assert.equal(player.diving,true);assert.ok(player.y<-.4);assert.ok(player.breath<100);
  assert.equal(player.hop.phase,'swim');assert.ok(player.x>0);
});

test('locked dive has no effect, shallow bottoms limit depth and releasing Ctrl resurfaces',()=>{
  const {game,player,held,mods}=fixture();held.add('ControlLeft');mods.dive=false;
  assert.equal(game.moveCreekDiver(player,.1),false);assert.equal(player.diveDepth,0);
  mods.dive=true;game.world.getTerrainHeight=()=>-.6;
  for(let i=0;i<20;i++)game.moveCreekDiver(player,.1);assert.ok(player.diveDepth<=.23);assert.ok(player.y>=-.48);
  held.clear();for(let i=0;i<20;i++)game.moveCreekDiver(player,.1);
  assert.equal(player.diving,false);assert.equal(player.diveDepth,0);assert.ok(player.breath>90);
});

test('exhaustion forces a surface interval and does not repeatedly submerge while Ctrl stays held',()=>{
  const {game,player,held}=fixture();held.add('ControlLeft');player.breath=.2;
  game.moveCreekDiver(player,.1);assert.equal(player.diveExhausted,true);
  for(let i=0;i<50;i++)game.moveCreekDiver(player,.1);
  assert.equal(player.diving,false);assert.equal(player.diveDepth,0);assert.equal(player.diveExhausted,true);
  held.clear();game.moveCreekDiver(player,.1);assert.equal(player.diveExhausted,false);
});

test('underwater movement follows currents but cannot drift onto dry land',()=>{
  const {game,player,held}=fixture();held.add('ControlLeft');player.travelWish={vx:0,vz:0};game.world.currentAt=()=>({x:2,z:0});
  game.moveCreekDiver(player,.1);assert.ok(player.x>0);
  game.world.getSurface=x=>({type:x>.15?'land':'water',height:x>.15?1:-.25});
  game.moveCreekDiver(player,.1);assert.ok(player.x<=.15);
});

test('tongue grip consumes stamina once and launches toward its actual reachable anchor',()=>{
  const {game,player,tongues}=fixture();game.world.getSurface=()=>({type:'rock',height:1});player.y=.2;player.swimming=false;
  const anchor={id:'perch',x:8,z:0,y:1.1};assert.equal(game.creekTongueGrip({kind:'creek-grip',entity:anchor}),true);
  assert.equal(player.stamina,86);assert.equal(player.grounded,false);assert.ok(player.vx>0);assert.equal(player.attackCD,1.2);assert.equal(tongues.length,1);
  assert.equal(game.creekTongueGrip({kind:'creek-grip',entity:anchor}),false);assert.equal(player.stamina,86);
});

test('the full fourteen-metre tongue range is supported by the ballistic trajectory',()=>{
  const {game,player}=fixture();player.y=0;player.swimming=false;game.world.getSurface=()=>({type:'rock',height:0});
  assert.equal(game.creekTongueGrip({kind:'creek-grip',entity:{x:14,z:0,y:0}}),true);
  const flight=2*player.vy/20,reach=Math.hypot(player.vx,player.vz)*flight;
  assert.ok(Math.abs(reach-14)<.15,`trajectory reaches ${reach}m for a 14m anchor`);assert.ok(Math.hypot(player.vx,player.vz)<=16.001);
});

test('tongue grip rejects locked ability, excessive height or range without spending stamina',()=>{
  const {game,player,mods}=fixture();mods.tongueRange=10;
  assert.equal(game.creekTongueGrip({kind:'creek-grip',entity:{x:8,z:0,y:0}}),false);mods.tongueRange=14;
  assert.equal(game.creekTongueGrip({kind:'creek-grip',entity:{x:15,z:0,y:0}}),false);game.world.getSurface=()=>({type:'rock',height:6});
  assert.equal(game.creekTongueGrip({kind:'creek-grip',entity:{x:8,z:0,y:6}}),false);assert.equal(player.stamina,100);
});

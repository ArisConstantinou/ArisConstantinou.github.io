import test from 'node:test';
import assert from 'node:assert/strict';
import {creekMethods} from '../src/creek-game.js';

function fixture(save=null){
  const messages=[],renders=[];
  const player={id:'player',team:'player',x:0,z:0,y:0,grounded:true,swimming:false,speed:0,hp:80,maxHp:120,stomach:70,dead:false,blocking:false};
  const game={...creekMethods,player,creekMode:true,started:true,paused:false,ended:false,elapsed:save?.elapsed||0,realms:{active:0},resources:{food:20},stats:{flies:0},frogs:[player],predators:[],
    world:{hotspots:[],creekNest:{id:'nest',x:17,z:16},setCreekState:s=>renders.push(s)},
    ui:{toast:m=>messages.push(m)},audio:{play(){}},save(){this.saveCount=(this.saveCount||0)+1;},gainXP(n){this.xp=(this.xp||0)+n;},
    allies(){return this.frogs.filter(f=>f.team==='ally'&&!f.dead);},openPanel(name){this.panel=name;}};
  game.initCreek(save);return {game,player,messages,renders};
}
function tick(game,seconds=1){for(let i=0;i<seconds*10;i++){game.elapsed+=.1;game.updateCreek(.1);}}

test('actual location reveals a landmark and collecting its visible find is a separate action',()=>{
  const {game,player}=fixture();tick(game);
  assert.deepEqual(game.creek.regions[0].discovered,['pond']);assert.equal(game.creekSnapshot().inventory.finds,0);
  const ctx=game.creekInteractionContext();assert.equal(ctx.type,'creek-find');assert.equal(game.creekInteract(ctx),true);
  assert.equal(game.creekSnapshot().inventory.finds,1);
  player.x=27;player.z=8;tick(game);assert.ok(game.creek.regions[0].discovered.includes('bank'));
  assert.equal(game.creekSnapshot().discoveries.find(l=>l.id==='roots').label,'Άγνωστο σημείο');
});

test('stale or distant interaction cannot collect a cache or a natural find',()=>{
  const {game,player}=fixture();tick(game);const stale=game.creekInteractionContext();
  player.x=70;player.z=70;game.creekInteract(stale);assert.equal(game.creek.inventory.finds.length,0);
  player.x=0;player.z=0;game.creekInteract(game.creekInteractionContext());
  assert.equal(game.creek.inventory.finds.length,1);game.creekInteract(stale);assert.equal(game.creek.inventory.finds.length,1);
});

test('charged leaps and real bank landings earn permanent abilities without construction',()=>{
  const {game,player}=fixture();tick(game);
  for(let i=0;i<3;i++)game.recordCreekAction('chargedLeap');assert.equal(game.creekAbilityModifiers().leapStrength,1.2);
  player.x=27;player.z=8;tick(game);
  for(let i=0;i<2;i++){player.grounded=false;tick(game,.1);player.grounded=true;tick(game,.1);}
  assert.equal(game.creekAbilityModifiers().grip,true);
  const restored=fixture({creek:game.creekSave(),elapsed:game.elapsed}).game;
  assert.equal(restored.creekAbilityModifiers().grip,true);assert.equal(restored.creekAbilityModifiers().leapStrength,1.2);
});

test('swimming, successful fly catches and still observation use gameplay events',()=>{
  const {game,player}=fixture();tick(game);game.stats.flies=6;tick(game);assert.equal(game.creekAbilityModifiers().tongueRange,14);
  player.x=8;player.z=-24;player.swimming=true;player.speed=2;tick(game,16);assert.equal(game.creekAbilityModifiers().dive,true);
  player.x=27;player.z=8;player.swimming=false;player.speed=0;player.blocking=true;
  game.predators.push({id:'bird',team:'predator',hp:200,x:43,z:8,phase:'patrol'});tick(game,9);
  assert.equal(game.creekAbilityModifiers().camouflage,true);assert.equal(player.creekConcealed,true);
  player.speed=3;tick(game,.1);assert.equal(player.creekConcealed,false);
});

test('paused time cannot change water, award skill progress or consume dropped food',()=>{
  const {game,player}=fixture();tick(game);const drop=game.onCreekPlayerDefeat(),clock=game.creek.clock;
  game.paused=true;player.swimming=true;player.speed=4;tick(game,200);
  assert.equal(game.creek.clock,clock);assert.equal(game.creek.metrics.swimSeconds,0);assert.equal(game.creekSnapshot().dropped[0].food,drop.food);
});

test('defeat drops once, later defeats keep earlier important caches, and recovery restores exact categories',()=>{
  const {game,player}=fixture();tick(game);game.creekInteract(game.creekInteractionContext());
  const first=game.onCreekPlayerDefeat();assert.equal(game.resources.food,0);assert.equal(game.onCreekPlayerDefeat(),null);
  game.onCreekRespawn();player.x=24;player.z=-16;tick(game);game.creekInteract(game.creekInteractionContext());
  game.resources.food=4;game.onCreekPlayerDefeat();assert.equal(game.creek.regions[0].drops.length,2);
  game.onCreekRespawn();game.creek.clock+=600;player.x=first.x;player.z=first.z;
  assert.equal(game.creekInteract(game.creekInteractionContext()),true);assert.equal(game.resources.food,0);assert.equal(game.creek.inventory.finds.length,1);
  assert.equal(game.creek.regions[0].drops.length,1);assert.equal(game.creek.regions[0].drops[0].keepsakes.length,1);
});

test('safe natural nest develops without resources and danger stops rest without erasing development',()=>{
  const {game,player}=fixture();player.x=17;player.z=16;const food=game.resources.food;tick(game,22);
  assert.equal(game.creekSnapshot().nest.level,1);assert.equal(game.resources.food,food);assert.ok(player.hp>80);
  game.predators.push({id:'snake',team:'predator',hp:120,x:18,z:16,phase:'stalk'});
  const hp=player.hp,safeSeconds=game.creek.regions[0].nest.safeSeconds;tick(game,5);
  assert.equal(game.creekSnapshot().nest.safe,false);assert.equal(player.hp,hp);assert.equal(game.creek.regions[0].nest.safeSeconds,safeSeconds);assert.equal(game.creekSnapshot().nest.level,1);
});

test('a visited safe nest develops during exploration without healing the player remotely',()=>{
  const {game,player}=fixture();tick(game,30);
  assert.equal(game.creek.regions[0].nest.visited,false);assert.equal(game.creek.regions[0].nest.safeSeconds,0);
  player.x=17;player.z=16;tick(game,.1);assert.equal(game.creek.regions[0].nest.visited,true);
  player.x=27;player.z=8;const hp=player.hp,food=game.resources.food;tick(game,91);
  assert.ok(game.creek.regions[0].discovered.includes('bank'));assert.equal(game.creekSnapshot().nest.level,2);
  assert.equal(player.hp,hp);assert.equal(game.resources.food,food);assert.equal(game.allies().length,0);
});

test('companions feed autonomously within following range while preserving explicit tactics',()=>{
  const {game}=fixture();const frog={id:'friend',team:'ally',role:'hunter',x:2,z:0,hp:80,maxHp:100,stomach:30,order:'follow'};
  game.frogs.push(frog);game.world.hotspots.push({id:'swarm',x:4,z:0,flies:5});
  assert.equal(game.creekCompanionIntent(frog).kind,'eat');frog.order='flank';assert.equal(game.creekCompanionIntent(frog),null);
  frog.order='follow';frog.x=25;assert.equal(game.creekCompanionIntent(frog),null);
});

test('coexisting groups do not block natural nest safety and explicit local tactics keep precedence',()=>{
  const {game,player}=fixture();player.x=17;player.z=16;
  game.frogs.push({id:'pacted',team:'enemy0',x:18,z:16,hp:100});game.hostile=()=>false;
  assert.equal(game.creekNestState().safe,true);game.hostile=()=>true;assert.equal(game.creekNestState().safe,false);
  const friend={id:'friend',team:'ally',role:'hunter',x:18,z:16,hp:100,maxHp:100,stomach:20};
  game.world.hotspots=[{id:'food',x:19,z:16,flies:10}];
  for(const order of ['scout','distract','protect','retreat']){friend.order=order;assert.equal(game.creekCompanionIntent(friend),null);}
});

test('distinct recruitment conditions depend on encounters and natural actions, never a castle',()=>{
  const {game}=fixture();tick(game);
  const first={id:'first',team:'neutral',role:'scout',firstRecruit:true,hp:80};assert.equal(game.creekRecruitmentOffer(first).ready,true);
  const hunter={id:'hunter',team:'neutral',role:'hunter',hp:80};assert.equal(game.creekRecruitmentOffer(hunter).ready,false);
  game.stats.flies=3;tick(game);assert.equal(game.creekRecruitmentOffer(hunter).ready,true);
  const caller={id:'caller',team:'neutral',role:'caller',hp:80};assert.equal(game.creekRecruitmentOffer(caller).requirements[1].id,'observe');
  assert.ok(game.creekRecruitmentOffer(caller).requirements.every(r=>!['base','renown','help'].includes(r.id)));
});

test('discovering everything leaves a living ecological objective and phase changes never spawn or reset enemies',()=>{
  const {game}=fixture();game.creek.regions[0].discovered=['pond','creek','bank','roots'];
  const predator={id:'defeated-unique',hp:0,dead:true,phase:'dead',x:25,z:0};game.predators=[predator];
  game.spawnPredator=()=>{throw new Error('exploration must not spawn replacements');};game.creek.clock=149;tick(game,3);
  assert.equal(game.creekSnapshot().phase.id,'low');assert.equal(predator.dead,true);assert.equal(predator.hp,0);
  assert.equal(game.creekObjectives().at(-1).done,false);assert.ok(game.creekObjective().includes('ρίζες'));
});

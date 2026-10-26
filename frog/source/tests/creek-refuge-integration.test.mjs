import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture,updateCombatFeedback} from './game-fixture.mjs';
import {damagePredator,applyPredatorCombatImpulse} from '../src/predators.js';
import {createRefugeDescriptor,refugeAt,refugeLocal,refugeWorld,refugeInteriorPoint,refugeEntrancePoint,refugeSurface,refugeLineClear,refugeOccupant,refugeCanEnter} from '../src/refuge.js';

function setup({id='living-creek-nest',water=false}={}){
  const {game:g}=fixture(),ground=water?-.45:0,home=createRefugeDescriptor({id,x:0,z:0,yaw:0,team:id==='living-creek-nest'?'ally':'neutral'},{terrainHeight:()=>ground});
  g.creekMode=true;g.elapsed=100;g.realms={active:0};g.camps=[];g.frogs=[g.player];g.predators=[];
  g.world.creekRefuges=[home];g.world.creekNest={id:'creek-nest',x:id==='living-creek-nest'?0:70,z:0};g.world.getTerrainHeight=()=>ground;
  g.world.getSurface=(x,z)=>refugeSurface(g.world.creekRefuges,x,z)||{type:water?'water':'land',height:ground,platform:null};
  g.world.sampleHeight=(x,z)=>g.world.getSurface(x,z).height;g.world.setCreekState=()=>{};
  g.input.up=()=>false;g.input.right=false;g.input.left=false;g.findAim=()=>null;
  g.initCreek();place(g,g.player,{x:12,z:12,y:ground});g.player.hp=90;g.player.maxHp=120;
  return {g,home,ground};
}
function place(g,actor,point){Object.assign(actor,point,{y:point.y??g.world.getSurface(point.x,point.z).height,grounded:true,vx:0,vz:0,vy:0,speed:0,charge:-1,hop:null,invulnerable:0});}
function hunter(g,type,point,extra={}){
  const p=g.spawnPredator({id:'refuge-'+type,type,...point,...extra});damagePredator(g,p,0);p.grace=0;p.anchor={x:point.x,z:point.z};return p;
}
function tick(g,seconds,each){
  for(let time=0;time<seconds-1e-8;time+=.05){
    g.elapsed+=.05;g.updatePlayer(.05);g.updateFrogs(.05);g.updatePredators(.05);updateCombatFeedback(g,.05);g.updateCreek(.05);each?.();
  }
}
const underFootprint=(r,p)=>{const q=refugeLocal(r,p);return q.x>r.floor.minX&&q.x<r.floor.maxX&&q.z>r.floor.minZ&&q.z<r.floor.maxZ;};

test('physical refuge blocks reciprocal attacks and permits rest while a heron remains dangerous outside',()=>{
  const {g,home}=setup(),p=g.player;place(g,p,refugeInteriorPoint(home));
  const bird=hunter(g,'heron',{x:-8,z:-1.2,y:0}),playerHp=p.hp,birdHp=bird.hp;
  assert.equal(refugeLineClear([home],bird,p),false);g.damage(p,30,bird);g.damage(bird,30,p);
  assert.equal(p.hp,playerHp);assert.equal(bird.hp,birdHp);
  tick(g,2);assert.equal(bird.target,null);assert.ok(p.hp>playerHp);assert.equal(g.creekNestState().safe,false);assert.equal(g.creekNestState().restSafe,true);
  place(g,p,{x:-5.5,z:-1.2,y:0});place(g,bird,{x:-8.5,z:-1.2,y:0});const exposed=p.hp;
  assert.equal(g.creekRefugeState().protected,false);g.damage(p,30,bird);assert.ok(p.hp<exposed,'nearby exterior has no protective radius');
});

for(const type of ['heron','fish'])test(`${type} committed lunge cannot enter or strike through a covered refuge`,()=>{
  const {g,home}=setup({water:type==='fish'}),p=g.player;place(g,p,refugeInteriorPoint(home));
  const beast=hunter(g,type,{x:1.55,z:7.5,y:type==='fish'?-1.5:0});
  beast.target=p;beast.targetId=p.id;beast.phase='windup';beast.phaseTime=beast.windup-.04;beast.strike={x:p.x,z:p.z};
  const hp=p.hp;
  tick(g,1.3,()=>assert.equal(underFootprint(home,beast),false,'large hunter stays outside the physical cavity'));
  assert.ok(p.hp>=hp);assert.equal(p.grabbedBy,undefined);assert.equal(beast.grabbed,null);
});

test('a heron searches the real opening then loses a hidden target without erasing the hunter',()=>{
  const {g,home}=setup(),p=g.player;place(g,p,{x:-6,z:0,y:0});const bird=hunter(g,'heron',{x:-9,z:0,y:0});
  g.damage(bird,1,p);const hp=bird.hp;place(g,p,refugeInteriorPoint(home));tick(g,.1);
  assert.equal(bird.refugeSearchId,home.id);const doorway=refugeEntrancePoint(home,3.2),before=Math.hypot(bird.x-doorway.x,bird.z-doorway.z);
  tick(g,5);assert.ok(Math.hypot(bird.x-doorway.x,bird.z-doorway.z)<before);assert.equal(underFootprint(home,bird),false);
  tick(g,4);assert.equal(bird.target,null);assert.equal(bird.phase,'patrol');assert.equal(bird.dead,false);assert.equal(bird.hp,hp);
});

test('oversized predator overlaps are repaired and recoil cannot push a heron through a refuge wall',()=>{
  const {g,home}=setup(),bird=hunter(g,'heron',refugeInteriorPoint(home));g.player.x=40;g.player.z=40;
  tick(g,.1);assert.equal(underFootprint(home,bird),false);
  place(g,bird,{x:-6.1,z:-1,y:0});bird.phase='recover';bird.combatImpulse={x:12,z:0,remaining:.5,drag:12};
  for(let i=0;i<25;i++)applyPredatorCombatImpulse(g,bird,.02);
  assert.ok(bird.x<-5.7);assert.equal(underFootprint(home,bird),false);
});

test('actual retreat movement enters through the passage and keeps a hungry companion inside during a heron hunt',()=>{
  const {g,home}=setup(),entry=refugeEntrancePoint(home,5);
  const ally=g.spawnFrog({id:'shelter-friend',team:'ally',role:'scout',...entry,order:'retreat',stomach:20});place(g,ally,entry);
  g.world.hotspots=[{id:'tempting-flies',x:entry.x+2,z:entry.z,flies:20,maxFlies:20}];
  tick(g,12);assert.equal(refugeAt([home],ally)?.id,home.id,'production hopping and navigation reach the rear chamber');
  assert.equal(ally.order,'retreat','reaching safety does not silently turn retreat into follow');
  const bird=hunter(g,'heron',refugeEntrancePoint(home,4));bird.target=ally;bird.targetId=ally.id;bird.phase='stalk';const hp=ally.hp,food=g.world.hotspots[0].flies;
  tick(g,3,()=>assert.equal(refugeAt([home],ally)?.id,home.id));
  assert.equal(ally.hp,hp);assert.equal(g.world.hotspots[0].flies,food);assert.equal(ally.intent.refuge,true);
});

for(const boss of [false,true])test(`${boss?'large':'normal'} snake searches through the real entrance and can attack a frog inside`,()=>{
  const {g,home}=setup(),p=g.player;place(g,p,refugeEntrancePoint(home,3));
  const snake=hunter(g,'snake',refugeEntrancePoint(home,6),{boss});assert.equal(refugeCanEnter(home,snake),true);
  g.damage(snake,1,p);place(g,p,refugeInteriorPoint(home,2));const hp=p.hp;
  let entrySeen=false,occludedIntruder=false,interiorSeen=false,previous=refugeLocal(home,snake);
  for(let i=0;i<400&&p.hp>=hp;i++){
    tick(g,.05);const local=refugeLocal(home,snake);
    if(previous.z>home.entrance.z&&local.z<=home.entrance.z){entrySeen=true;assert.ok(local.x>home.entrance.minX&&local.x<home.entrance.maxX,'entry crosses the visible opening');}
    const occupied=refugeOccupant([home],snake);
    if(occupied&&!refugeLineClear([home],snake,p)){occludedIntruder=true;assert.equal(g.creekNestState().restSafe,false);assert.equal(g.creekNestState().intruder.id,snake.id);}
    interiorSeen ||= !!refugeAt([home],snake)||!!snake.refugeSnakePose?.points.some(point=>point.s>0&&refugeAt([home],{...snake,x:point.x,y:point.y,z:point.z}));previous=local;
  }
  const state=JSON.stringify({entrySeen,occludedIntruder,interiorSeen,x:snake.x,y:snake.y,z:snake.z,phase:snake.phase,target:snake.targetId,search:snake.refugeSearchId,hp:p.hp,startHp:hp});
  assert.equal(entrySeen,true,state);assert.equal(occludedIntruder,true,state);assert.equal(interiorSeen,true,state);
  assert.ok(p.hp<hp,'fitting snake remains a real threat after entering');assert.equal(snake.dead,false);assert.ok(snake.refugeSnakePose);
});

test('an entered snake cannot strike through the internal baffle and a legal interior position is never evicted',()=>{
  const {g,home}=setup(),p=g.player;place(g,p,refugeInteriorPoint(home));
  const snake=hunter(g,'snake',refugeWorld(home,{x:1.55,z:2.2,y:home.floorY}));place(g,snake,refugeWorld(home,{x:1.55,z:2.2,y:home.floorY}));
  assert.equal(refugeOccupant([home],snake),home);assert.equal(refugeLineClear([home],snake,p),false);
  snake.target=p;snake.targetId=p.id;snake.phase='windup';snake.phaseTime=snake.windup-.04;snake.strike={x:p.x,z:p.z};const hp=p.hp;
  tick(g,.9);assert.equal(p.hp,hp);assert.equal(p.grabbedBy,undefined);assert.equal(refugeOccupant([home],snake),home);
  const rest=refugeInteriorPoint(home,1);place(g,snake,rest);snake.phase='recover';snake.phaseTime=0;snake.recover=10;place(g,p,{x:40,z:40,y:0});
  tick(g,.1);assert.ok(Math.hypot(snake.x-rest.x,snake.z-rest.z)<.01);assert.equal(refugeAt([home],snake),home);
});

test('a committed indoor lunge evaluates the current confined pose at the damage frame',()=>{
  const {g,home}=setup(),p=g.player;place(g,p,refugeInteriorPoint(home,2));
  const start=refugeWorld(home,{x:-2,z:-1.35,y:home.floorY}),snake=hunter(g,'snake',start);place(g,snake,start);
  snake.phase='recover';snake.phaseTime=0;snake.recover=10;tick(g,.05);assert.ok(snake.refugeSnakePose);
  let impact=null;const damage=g.damage.bind(g);
  g.damage=(target,amount,source,options)=>{
    if(source===snake)impact={body:{x:source.x,y:source.y,z:source.z},pose:{...source.refugeSnakePose.origin}};
    return damage(target,amount,source,options);
  };
  Object.assign(snake,{phase:'lunge',phaseTime:.2,lungeTime:.38,lungeStart:{x:start.x,z:start.z},lungeEnd:{x:-.5,z:-1.35},strike:{x:p.x,z:p.z},struck:false,target:p,grabCooldown:10});
  const hp=p.hp;tick(g,.05);
  assert.ok(impact);assert.ok(p.hp<hp);assert.ok(impact.body.x>start.x+.5,'the committed lunge moved before impact');
  assert.ok(Math.hypot(impact.body.x-impact.pose.x,impact.body.y-impact.pose.y,impact.body.z-impact.pose.z)<1e-6,'damage uses the current head pose instead of the previous frame');
});

test('companions reject a snake-occupied passage for retreat while preserving deliberate combat orders',()=>{
  const {g,home}=setup(),p=g.player;place(g,p,refugeInteriorPoint(home));
  const alternate=createRefugeDescriptor({id:'other-crevice',x:18,z:0,yaw:0,team:'neutral'});g.world.creekRefuges.push(alternate);
  const snake=hunter(g,'snake',refugeWorld(home,{x:1.55,z:2.2,y:home.floorY}));place(g,snake,refugeWorld(home,{x:1.55,z:2.2,y:home.floorY}));snake.phase='stalk';snake.target=p;
  const ally=g.spawnFrog({id:'aware-companion',team:'ally',role:'scout',...refugeInteriorPoint(home,1),order:'retreat'});place(g,ally,refugeInteriorPoint(home,1));
  assert.equal(g.creekRefugeState().restSafe,false);assert.match(g.creekNestState().hint,/μέσα στην κρυψώνα/);
  assert.equal(g.creekAllyIntent(ally).refugeId,alternate.id);assert.equal(ally.order,'retreat');
  ally.order='attack';assert.equal(g.creekAllyIntent(ally),null);ally.order='protect';assert.equal(g.creekAllyIntent(ally),null);
});

test('neutral habitat refuges are available automatically while healthy explicit combat orders are retained',()=>{
  const {g,home}=setup({id:'willow-crevice'}),entry=refugeEntrancePoint(home,4),ally=g.spawnFrog({id:'traveler',team:'ally',role:'hunter',...entry,order:'follow'});
  place(g,ally,entry);const snake=hunter(g,'snake',{x:entry.x+7,z:entry.z+1,y:0});snake.phase='stalk';snake.target=ally;
  assert.equal(g.thinkFrog(ally,g.allies()).refugeId,home.id);assert.equal(g.camps.length,0);
  ally.order='attack';assert.equal(g.creekAllyIntent(ally),null);ally.order='retreat';assert.equal(g.creekAllyIntent(ally).refugeId,home.id);
});

test('neutral and rival frogs hide from nearby hunters without treating player gang presence as a shelter command',()=>{
  const {g,home}=setup({id:'willow-crevice'}),entry=refugeEntrancePoint(home,4);
  const neutral=g.spawnFrog({id:'wild-frog',team:'neutral',role:'scout',...entry}),rival=g.spawnFrog({id:'rival-frog',team:'enemy0',role:'scout',x:entry.x+2,z:entry.z});
  place(g,neutral,entry);place(g,rival,{x:entry.x+2,z:entry.z,y:entry.y});place(g,g.player,{x:entry.x+2,z:entry.z+3,y:0});
  assert.equal(g.creekAllyIntent(neutral),null);assert.equal(g.creekRivalIntent(rival).refuge,undefined);
  const snake=hunter(g,'snake',{x:entry.x+9,z:entry.z+1,y:0});snake.phase='stalk';snake.target=neutral;
  assert.equal(g.creekAllyIntent(neutral).refugeId,home.id);assert.equal(g.creekRivalIntent(rival).refugeId,home.id);
});

test('cover has no outdoor healing aura and another frog can still fight inside the chamber',()=>{
  const {g,home}=setup(),p=g.player;place(g,p,refugeEntrancePoint(home,1));const hp=p.hp;tick(g,1);
  assert.equal(p.hp,hp);assert.equal(g.creekNestState().protected,false);
  place(g,p,refugeInteriorPoint(home));const intruder=g.spawnFrog({id:'intruder',team:'enemy0',role:'scout',...refugeInteriorPoint(home,1)});place(g,intruder,refugeInteriorPoint(home,1));
  assert.equal(g.creekNestState().restSafe,false);g.damage(p,10,intruder);assert.equal(p.hp,hp-10);
});

test('ordinary stillness in dense cover reduces detection before an ability unlock without preventing a real hit',()=>{
  const {g}=setup();g.world.creekRefuges=[];g.world.isCreekCover=()=>true;place(g,g.player,{x:0,z:0,y:0});
  const bird=hunter(g,'heron',{x:17,z:0,y:0});g.updateCreek(.1);assert.equal(g.creek.unlocked.includes('hide'),false);assert.equal(g.player.creekNaturalCover,true);
  g.updatePredators(.05);assert.equal(bird.target,null);
  place(g,bird,{x:5,z:0,y:0});bird.thinkTime=0;g.updatePredators(.05);assert.equal(bird.target,g.player);
  const hp=g.player.hp;g.damage(g.player,10,bird);assert.ok(g.player.hp<hp);
});

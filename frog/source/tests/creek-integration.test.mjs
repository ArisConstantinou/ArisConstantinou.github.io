import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {fixture,FrogGame,updateCombatFeedback,installStorage} from './game-fixture.mjs';
import {createWorld} from '../src/world.js';
import {dayState,validateSave,SAVE_KEY} from '../src/rules.js';
import {realmTravelOffer} from '../src/realms.js';
import {FORT_RADIUS} from '../src/fortification.js';
import {GameInput} from '../src/input.js';
import {refugeAt,refugeEntrancePoint,refugeInteriorPoint} from '../src/refuge.js';

function creekGame(t){
  const previous=globalThis.document;
  const canvasContext=new Proxy({createRadialGradient:()=>({addColorStop(){}}),createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)})},{get:(target,key)=>target[key]??(()=>{})});
  globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>canvasContext})};
  const result=fixture(),g=result.game,held=new Set(),pressed=new Set(),released=new Set();
  g.creekMode=true;g.renderer={};g.settings={volume:.55,quality:'high',sensitivity:1,uiScale:1};g.fps=60;
  g.world=createWorld(g.scene,g.renderer,{seed:731,natural:true});
  g.ui.showPanel=name=>{g.ui.panel=name;};g.ui.closePanels=()=>{g.ui.panel=null;};g.ui.hideMenus=()=>{g.ui.panel=null;};g.ui.isBlocking=()=>false;
  g.ui.update=state=>{g.lastUI=state;};g.ui.refs={hud:{hidden:false}};
  g.input.hit=key=>pressed.delete(key);g.input.down=key=>held.has(key);g.input.up=key=>released.delete(key);g.input.left=false;g.input.right=false;
  // Ray/camera input and the WebGL renderer are boundaries; all game, terrain,
  // actor, persistence, economy and travel methods below are production code.
  g.findAim=()=>g.aimTarget||null;g.updateUI=FrogGame.prototype.updateUI;
  g.save=()=>{g.saved=g.createSaveData();return true;};
  g.resetWorld();g.started=true;g.paused=false;
  t.after(()=>{g.world.dispose();if(previous===undefined)delete globalThis.document;else globalThis.document=previous;});
  return {...result,held,pressed,released,game:g};
}
function tick(g,seconds=.1){
  for(let time=0;time<seconds-1e-8;time+=.05){
    const dt=Math.min(.05,seconds-time);g.elapsed+=dt;
    g.updatePlayer(dt);g.updateFrogs(dt);g.updatePredators(dt);updateCombatFeedback(g,dt);
    g.updateCreek(dt);g.updateEconomy(dt);g.updateKingdom(dt);g.updateCampaign();g.checkVictory();
    g.world.update(dt,g.elapsed,dayState(g.elapsed).daylight,new THREE.Vector3(g.player.x,g.player.y,g.player.z));
    g.input.endFrame?.();
  }
}
function moveTo(g,point){Object.assign(g.player,{x:point.x,z:point.z,y:g.world.getSurface(point.x,point.z).height,vx:0,vz:0,vy:0,speed:0,grounded:true,charge:-1});g.aimTarget=null;g.closeRecruitment();}
function visit(g,id){const place=g.world.creekLandmarks.find(l=>l.id===id);moveTo(g,place);g.updateCreek(.05);return place;}
function collect(g,id){visit(g,id);const item=g.creekFinds().find(f=>f.landmark===id);moveTo(g,item);assert.equal(g.context().type,'creek-find');assert.equal(g.interact(),true);return item;}
const saved=g=>validateSave(JSON.parse(JSON.stringify(g.createSaveData())));

test('real natural world initializes solo with continuing wildlife and no construction or upkeep gates',t=>{
  const {game:g}=creekGame(t);
  assert.equal(g.world.natural,true);assert.equal(g.player.id,'player');assert.equal(g.allies().length,0);
  assert.equal(g.frogs.filter(f=>f.team==='neutral').length,4);assert.equal(g.camps.length,3);
  assert.deepEqual(g.resources,{food:12,reeds:0,pearls:0});assert.equal(g.predators.length,3);
  assert.ok(g.camps.every(c=>c.natural&&c.gateHp===0&&Object.keys(c.buildings).length===0&&c.mesh.userData.natural));
  assert.deepEqual(g.buildOptions(),[]);assert.equal(g.commitBuild('shelter',{x:20,z:20}),false);assert.equal(g.beginBuildingPlacement('shelter'),false);
  const food=g.resources.food;g.updateEconomy(60);g.updateKingdom(60);assert.equal(g.resources.food,food);assert.equal(g.economy.jobs.length,0);
  tick(g,.5);g.updateUI(dayState(g.elapsed));
  assert.equal(g.lastUI.creek.enabled,true);assert.equal(g.lastUI.objectiveVisual.type,'explore');assert.deepEqual(g.lastUI.guide.tutorial,[]);
  assert.ok(g.lastUI.campaign.objectives.every(o=>!o.id.startsWith('build-')));assert.equal(g.ended,false);
});

test('real E recruitment, gathering and exploration actions reach their handlers without a building panel',t=>{
  const {game:g}=creekGame(t);tick(g,.1);
  const neutral=g.frogs.find(f=>f.firstRecruit);moveTo(g,{x:neutral.x,z:neutral.z-2});g.aimTarget={kind:'actor',entity:neutral};
  assert.ok(g.recruitmentContext(neutral).offer.requirements.every(r=>!['base','help','renown'].includes(r.id)));
  assert.equal(g.interact(),true);assert.equal(neutral.team,'neutral');assert.equal(g.activeRecruitId,neutral.id);
  assert.equal(g.interact(),true);assert.equal(neutral.team,'ally');assert.equal(g.resources.food,8);assert.equal(g.allies().length,1);
  const swarm=g.world.hotspots[0];moveTo(g,swarm);g.aimTarget={kind:'flies',entity:swarm};
  const before=g.resources.food;assert.equal(g.context().type,'gather');assert.equal(g.interact(),true);
  assert.ok(g.resources.food>before);assert.equal(g.resources.reeds,0);
  g.onAction('open-exploration');assert.equal(g.ui.panel,'exploration');g.ui.closePanels();g.openPanel('build');assert.equal(g.ui.panel,'exploration');
  g.ui.closePanels();g.selectedIds=new Set([neutral.id]);g.onAction('selection-command',{command:'scout'});assert.equal(neutral.order,'scout');
  const order=g.thinkFrog(neutral,g.allies());assert.equal(order.kind,'move');assert.deepEqual(order.target,neutral.creekOrderPoint);
});

test('actual charged Space input earns leap progression and drives the production hopping solver',t=>{
  const {game:g,held,pressed,released}=creekGame(t);tick(g,.1);const p=g.player;
  for(let i=0;i<3;i++){
    pressed.add('Space');held.add('Space');tick(g,.2);held.delete('Space');released.add('Space');tick(g,.05);
    assert.equal(p.grounded,false);assert.ok(p.vy>0);tick(g,1.4);
  }
  assert.equal(g.creek.metrics.chargedLeaps,3);assert.equal(g.creekAbilityModifiers().leapStrength,1.2);
  assert.ok(saved(g).creek.unlocked.includes('leap'));
});

test('real right mouse input dives in water, release resurfaces, and land retains cover and blocking',t=>{
  const {game:g}=creekGame(t),p=g.player;
  const savedGlobals=Object.fromEntries(['addEventListener','HTMLElement','innerWidth','innerHeight'].map(key=>[key,globalThis[key]]));
  const handlers={},canvasHandlers={},doc=globalThis.document,previousListener=doc.addEventListener;
  globalThis.addEventListener=(type,fn)=>{handlers[type]=fn;};globalThis.HTMLElement=class {};globalThis.innerWidth=1440;globalThis.innerHeight=900;
  doc.addEventListener=()=>{};
  const input=new GameInput({addEventListener(type,fn){canvasHandlers[type]=fn;}},action=>g.handleInputAction(action));g.input=input;
  t.after(()=>{input.destroy();if(previousListener===undefined)delete doc.addEventListener;else doc.addEventListener=previousListener;for(const [key,value] of Object.entries(savedGlobals))if(value===undefined)delete globalThis[key];else globalThis[key]=value;});
  g.creek.unlocked.push('dive','hide');
  const points=[];for(let x=-8;x<=8;x+=2)for(let z=-8;z<=8;z+=2)points.push({x,z});
  const water=points.find(point=>g.world.getSurface(point.x,point.z).type==='water'&&g.world.getSurface(point.x,point.z).height-g.world.getTerrainHeight(point.x,point.z)>.7);
  assert.ok(water,'natural pond must have space below the swimming surface');moveTo(g,water);p.swimming=true;
  const event=code=>({code,target:null,repeat:false,preventDefault(){}});
  handlers.keydown(event('KeyW'));canvasHandlers.mousedown({button:2});p.stamina=60;
  tick(g,.2);assert.equal(p.diving,true);assert.ok(p.diveDepth>.16);assert.equal(p.blocking,false);assert.ok(p.stamina>=60);
  assert.equal(input.down('ControlLeft'),false);assert.equal(input.down('ControlRight'),false);
  assert.ok(Math.hypot(p.travelWish.vx,p.travelWish.vz)>3,'diving retains normal swimming speed without blocking slowdown');
  handlers.keyup(event('KeyW'));handlers.mouseup({button:2});tick(g,2);
  assert.equal(p.diving,false);assert.equal(p.diveDepth,0);assert.equal(p.blocking,false);
  const land=g.world.creekCover.find(point=>g.world.getSurface(point.x,point.z).type!=='water'&&g.world.isCreekCover(point.x,point.z));
  assert.ok(land,'natural region has a dry cover pocket');moveTo(g,land);p.swimming=false;canvasHandlers.mousedown({button:2});tick(g,.2);
  assert.equal(p.diving,false);assert.equal(p.blocking,true);assert.equal(p.creekConcealed,true);
  handlers.mouseup({button:2});tick(g,.1);assert.equal(p.blocking,false);assert.equal(p.creekConcealed,false);
});

test('production death, save validation, resume and E recovery preserve important finds and player identity',t=>{
  const {game:g,storage}=creekGame(t);installStorage(t,storage);collect(g,'pond');const before=g.resources.food,deathPoint={x:g.player.x,z:g.player.z};
  g.damage(g.player,10000,null,{bypass:true});assert.equal(g.player.dead,true);assert.equal(g.resources.food,0);assert.equal(g.creek.regions[0].drops.length,1);
  assert.equal(g.creek.regions[0].drops[0].finds.length,1);
  FrogGame.prototype.save.call(g);const data=validateSave(JSON.parse(storage.get(SAVE_KEY)));assert.equal(data.pendingRespawn,true);assert.equal(data.creek.regions[0].drops.length,1);
  g.resetWorld(data);g.updateKingdom(.05);assert.equal(g.player.dead,false);assert.equal(g.player.id,'player');assert.equal(g.creek.regions[0].drops.length,1);
  moveTo(g,deathPoint);assert.equal(g.context().type,'creek-recover');assert.equal(g.interact(),true);
  assert.equal(g.creek.inventory.finds.length,1);assert.equal(g.resources.food,before);assert.equal(g.creek.regions[0].drops.length,0);
  g.player.invulnerable=0;g.damage(g.player,10000,null,{bypass:true});assert.equal(g.creek.regions[0].drops.length,1,'a second life gets a distinct recoverable cache');
});

test('actual trip there and back retains companions, parked guards, local pacts, killed wildlife and global discoveries',t=>{
  const {game:g}=creekGame(t);collect(g,'pond');g.recordCreekAction('chargedLeap',3);
  const pact=g.camps[0],pactId=pact.id;assert.equal(g.resolveCreekTerritory(pact,'share'),true);
  const follower=g.spawnFrog({id:'travel-friend',team:'ally',x:0,z:3,role:'hunter'}),guard=g.spawnFrog({id:'stay-friend',team:'ally',x:0,z:4,role:'scout'});
  g.gangCommand('guard',[guard.id]);assert.equal(guard.guard,true);assert.equal(guard.home,null);
  const fallen=g.predators[0],fallenId=fallen.id;g.damage(fallen,100000,g.player,{bypass:true});assert.equal(fallen.dead,true);
  const migrationAt=g.creekSociety.nextMigrationAt;visit(g,'roots');const stock={...g.resources};
  assert.equal(realmTravelOffer(g,1).allowed,true);assert.deepEqual(realmTravelOffer(g,1).cost,{food:0,reeds:0});
  assert.equal(g.travelToRealm(1),true);assert.equal(g.realms.active,1);assert.equal(g.world.regionIndex,1);assert.equal(g.world.natural,true);
  assert.deepEqual(g.resources,stock);assert.ok(g.creek.unlocked.includes('leap'));assert.equal(g.creek.inventory.finds.length,1);
  assert.equal(g.allies().filter(f=>f.id===follower.id).length,1);assert.equal(g.allies().some(f=>f.id===guard.id),false);
  assert.equal('creek' in g.realms.regions[0].snapshot,false);assert.equal('realms' in g.realms.regions[0].snapshot,false);
  const guardArchive=g.realms.regions[0].snapshot.frogs.find(f=>f.id===guard.id);assert.equal(guardArchive.order,'guard');assert.ok(guardArchive.creekOrderPoint);
  const exit=visit(g,'roots'),pond=g.world.creekLandmarks.find(l=>l.id==='pond'),span=Math.hypot(pond.x-exit.x,pond.z-exit.z);
  // The exit borders a rival territory; approach from the pond after finding
  // it, staying within the route radius but outside the residents' proximity.
  moveTo(g,{x:exit.x+(pond.x-exit.x)/span*10,z:exit.z+(pond.z-exit.z)/span*10});
  const returnOffer=realmTravelOffer(g,0);
  assert.equal(returnOffer.allowed,true,returnOffer.reason);assert.equal(g.travelToRealm(0),true);
  assert.equal(g.world.regionIndex,0);assert.equal(g.allies().filter(f=>f.id===follower.id).length,1);
  assert.equal(g.allies().find(f=>f.id===guard.id).order,'guard');assert.equal(g.allies().find(f=>f.id===guard.id).guard,true);
  assert.equal(g.camps.find(c=>c.id===pactId).creekRelation,'coexist');assert.equal(g.predators.find(p=>p.id===fallenId).dead,true);
  assert.equal(g.creekSociety.nextMigrationAt,migrationAt);assert.ok(g.creek.regions[0].discovered.includes('pond'));assert.ok(g.creek.regions[1].discovered.includes('roots'));
  const data=saved(g);assert.equal(data.creek.inventory.finds.length,1);assert.equal('creek' in data.realms.regions[1].snapshot,false);
  assert.equal(new Set(g.frogs.map(f=>f.id)).size,g.frogs.length);
});

test('actual leader defeat changes the local relationship while preserving living residents and ongoing wildlife',t=>{
  const {game:g}=creekGame(t),territory=g.camps[0],residents=g.frogs.filter(f=>f.home===territory.id),leader=residents.find(f=>f.leader);
  const count=g.frogs.length,migrationAt=g.creekSociety.nextMigrationAt,wildlife=g.predators.map(p=>p.id);
  g.damage(leader,100000,g.player,{bypass:true});
  assert.equal(leader.dead,false);assert.ok(leader.hp>0);assert.equal(territory.creekRelation,'yielded');assert.equal(territory.destroyed,false);
  assert.equal(g.frogs.length,count);assert.equal(g.allies().length,0);assert.ok(residents.every(f=>f.team==='neutral'&&!f.dead));
  assert.ok(residents.every(f=>!g.hostile(g.player,f)));assert.deepEqual(g.predators.map(p=>p.id),wildlife);assert.equal(g.creekSociety.nextMigrationAt,migrationAt);
  tick(g,.1);assert.equal(g.ended,false);assert.equal(g.won,false);assert.equal(territory.creekRelation,'yielded');
});

test('new local tactical orders and natural positions survive production save validation and restore',t=>{
  const {game:g}=creekGame(t);const territory=g.camps[0];
  const friends=['scout','distract','protect','retreat','guard'].map((order,i)=>g.spawnFrog({id:'command-'+order,team:'ally',x:territory.x+FORT_RADIUS,z:territory.z+i*.05,role:'scout',order,
    guard:order==='guard',creekOrderPoint:{x:9+i,z:6},creekOrderUntil:g.elapsed+100,creekTargetId:'creek-target'}));
  const positions=new Map(friends.map(f=>[f.id,{x:f.x,z:f.z}]));const data=saved(g);
  for(const order of ['scout','distract','protect','retreat','guard'])assert.equal(data.frogs.find(f=>f.id==='command-'+order).order,order);
  g.resetWorld(data);
  for(const f of g.allies()){
    assert.equal(f.order,f.id.slice(8));assert.deepEqual({x:f.x,z:f.z},positions.get(f.id));assert.ok(f.creekOrderPoint);assert.equal(f.creekTargetId,'creek-target');
  }
  assert.equal(g.allies().find(f=>f.id==='command-guard').guard,true);
});

test('continuing an older save preserves earned companions and resources while removing mandatory construction state',t=>{
  const {game:g}=creekGame(t);g.spawnFrog({id:'old-companion',name:'Βρύο',team:'ally',x:3,z:1,hp:63,level:4});
  const legacy=saved(g);delete legacy.creek;delete legacy.creekSociety;delete legacy.creekMode;
  legacy.player.equipment={armor:'shell',weapon:'reed',crest:true};legacy.player.crowned=true;legacy.resources={food:70,reeds:90,pearls:3};
  legacy.camps[0].buildings={store:true,training:true,nursery:true};legacy.camps[0].underConstruction=true;
  g.resetWorld(legacy);
  assert.equal(g.allies().find(f=>f.id==='old-companion').hp,63);assert.deepEqual(g.resources,legacy.resources);
  assert.deepEqual(g.player.equipment,{armor:null,weapon:null,crest:false});assert.deepEqual(g.player.legacyEquipment,legacy.player.equipment);
  assert.equal(g.player.crowned,false);assert.equal(g.economy.jobs.length,0);assert.equal(g.camps[0].underConstruction,false);assert.deepEqual(g.camps[0].buildings,{});
  const newSave=saved(g);assert.ok(newSave.creek);assert.equal(newSave.creekSociety.initialized,true);
});

test('real terrain refuge admits a retreating companion and restores sheltered actors without duplicate collision geometry',t=>{
  const {game:g}=creekGame(t),home=g.world.creekRefuges.find(r=>r.id==='living-creek-nest');assert.ok(home);
  const door=refugeEntrancePoint(home,home.ramp.maxZ-home.entrance.z+.7),interior=refugeInteriorPoint(home);
  moveTo(g,interior);const ally=g.spawnFrog({id:'refuge-returner',team:'ally',role:'scout',x:door.x,z:door.z,order:'retreat'});
  ally.y=g.world.getSurface(ally.x,ally.z).height;g.graceUntil=g.elapsed+30;
  tick(g,15);assert.equal(refugeAt(g.world.creekRefuges,ally)?.id,home.id);assert.equal(refugeAt(g.world.creekRefuges,g.player)?.id,home.id);
  assert.equal(g.creekSnapshot().shelter.playerPosition,'inside');assert.doesNotThrow(()=>JSON.stringify(g.creekSnapshot()));
  const count=g.world.creekRefuges.length,data=saved(g);g.resetWorld(data);
  assert.equal(g.world.creekRefuges.length,count);assert.equal(new Set(g.world.creekRefuges.map(r=>r.id)).size,count);
  assert.equal(refugeAt(g.world.creekRefuges,g.player)?.id,home.id);assert.equal(refugeAt(g.world.creekRefuges,g.frogs.find(f=>f.id===ally.id))?.id,home.id);
  tick(g,.2);assert.equal(g.frogs.find(f=>f.id===ally.id).order,'retreat');
});

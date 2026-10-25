import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture} from './game-fixture.mjs';

test('opening and closing guide content keeps a live game running and restores the previous panel',()=>{
  const {game}=fixture();game.guide={seen:[],pending:[],hinted:[]};game.ui.panel='build';
  let hidden=0,locked=0,unlocked=0;
  game.ui.hideMenus=()=>hidden++;game.input.lock=()=>locked++;game.input.unlock=()=>unlocked++;
  game.handleKingdomAction('guide-open',{id:'build'});
  assert.equal(game.paused,false);assert.equal(unlocked,1);assert.deepEqual(game.guide.seen,['build']);
  game.handleKingdomAction('guide-close',{returnPanel:'build',returnMenu:null});
  assert.equal(game.paused,false);assert.equal(game.ui.panel,'build');assert.equal(hidden,0);assert.equal(locked,0);
});

test('reading help from explicit Pause never resumes simulation or audio on close',()=>{
  const {game}=fixture();game.paused=true;game.guide={seen:[],pending:[],hinted:[]};
  const audio=[];game.audio.setPaused=value=>audio.push(value);
  game.handleKingdomAction('guide-open',{id:'movement'});assert.equal(game.paused,true);
  game.handleKingdomAction('guide-close',{returnMenu:'pause'});
  assert.equal(game.paused,true);assert.deepEqual(audio,[true]);
});

test('closing a guide never restores a stale pause snapshot after an explicit Pause or Resume',()=>{
  for(const paused of [false,true]){
    const {game}=fixture();game.paused=paused;game._guidePause={paused:!paused};game.guide={seen:[]};
    game.handleKingdomAction('guide-close',{returnPanel:null,returnMenu:null});
    assert.equal(game.paused,paused);assert.equal(game._guidePause,null);
  }
});

test('Escape closes a paused inspection panel and returns to Pause without resuming the world',()=>{
  const {game}=fixture();game.paused=true;game.ui.panel='build';let shown=0;
  game.ui.closePanels=()=>{game.ui.panel=null;};game.ui.showPause=()=>shown++;
  game.escape();assert.equal(game.paused,true);assert.equal(game.ui.panel,null);assert.equal(shown,1);
});

test('new guide discoveries update the concept hint without scheduling an interrupting popup',()=>{
  const {game}=fixture();game.guide={seen:[],hinted:[],pending:[]};const hints=[];
  game.ui.showGuideHint=id=>hints.push(id);
  game.discoverGuide('build');game.discoverGuide('build');
  assert.deepEqual(hints,['build']);assert.deepEqual(game.guide.pending,[]);assert.equal(game.paused,false);
});

test('U concept toggle releases the cursor while preserving explicit Pause and active gameplay panels',()=>{
  for(const paused of [false,true]){
    const {game}=fixture();game.paused=paused;game.ui.panel='build';let toggled=0,unlocked=0;
    game.ui.toggleConceptPanels=()=>toggled++;game.input.unlock=()=>unlocked++;
    assert.equal(game.toggleConceptPanels(),true);assert.equal(toggled,1);assert.equal(unlocked,1);
    assert.equal(game.paused,paused);assert.equal(game.ui.panel,'build');
  }
});

test('live gameplay panels permit the simulation tick; explicit Pause freezes it',()=>{
  const {game}=fixture(),noop=()=>{};let simulationTicks=0;
  Object.assign(game,{last:0,frameTime:0,fps:60,frameProfile:null,timers:{ui:0,save:0},
    renderer:{render:noop},updateLighting:noop,updateCamera:noop,updateModels:noop,processPortraitQueue:noop,drawLabels:noop,
    updatePlayer:()=>simulationTicks++,updateFrogs:noop,updatePredators:noop,updateEconomy:noop,updateKingdom:noop,updateCampaign:noop,checkVictory:noop});
  game.world.update=noop;game.vfx.update=noop;game.ui.isBlocking=()=>Boolean(game.ui.menu);game.input.endFrame=noop;
  const before=game.elapsed;
  for(const panel of ['build','roster','map','help','guide','recruitment','realms']){game.ui.panel=panel;game.frame(game.last+50);}
  assert.equal(simulationTicks,7);assert.ok(game.elapsed>before+.34);
  game.pause();const pausedAt=game.elapsed;game.frame(game.last+50);
  assert.equal(game.elapsed,pausedAt);assert.equal(simulationTicks,7);
});

test('HUD controls cannot issue gameplay mutations behind a collapsed Pause panel',()=>{
  const {game}=fixture();game.paused=true;let attacks=0,builds=0,orders=0,saved=0;
  game.primaryAttack=()=>attacks++;game.build=()=>builds++;game.gangCommand=()=>orders++;game.save=()=>saved++;
  game.onAction('primary-attack');game.onAction('build',{type:'shelter'});game.onAction('gang-command',{command:'attack'});
  game.onAction('save');
  assert.equal(attacks,0);assert.equal(builds,0);assert.equal(orders,0);assert.equal(saved,1);
});

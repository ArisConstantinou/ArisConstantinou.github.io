import test from 'node:test';
import assert from 'node:assert/strict';
import {PerspectiveCamera} from 'three';
import {fixture,actor,camp} from './game-fixture.mjs';
import {createCampaign} from '../src/campaign.js';
import {createRealmState} from '../src/realms.js';
import {recruitmentBubbleAnchor,recruitmentBubbleTarget} from '../src/recruitment-bubble.js';
import {initializeFort,FORT_RADIUS} from '../src/fortification.js';

function setup(){
  const value=fixture(),g=value.game;
  g.campaign=createCampaign(null,{}, {endless:true});g.realms=createRealmState(null,{elapsed:g.elapsed});g.initKingdom(null);
  const frog=actor({id:'recruitable',team:'neutral',z:3,firstRecruit:true});g.frogs.push(frog);g.aimTarget={kind:'actor',entity:frog};
  g.camera=new PerspectiveCamera(59,1.6,.07,200);g.camera.position.set(0,7,12);g.camera.lookAt(0,1,1);g.camera.updateMatrixWorld(true);g.labels={width:1280,height:800};
  const shown=[],anchors=[],closed=[];
  g.ui.refs={recruitmentBubble:{hidden:true}};
  g.ui.showRecruitmentBubble=snapshot=>shown.push(snapshot);
  g.ui.closeRecruitmentBubble=()=>{closed.push(true);g.ui.refs.recruitmentBubble.hidden=true;};
  g.ui.updateRecruitmentAnchor=anchor=>{anchors.push(anchor);g.ui.refs.recruitmentBubble.hidden=!anchor.visible;return anchor.visible;};
  g.ui.isBlocking=()=>false;
  return {...value,frog,shown,anchors,closed};
}

test('first E only opens a neutral frog bubble and preserves other panels, resources, quests and live play',()=>{
  const {game:g,player,frog,shown,anchors}=setup();g.ui.panel='build';
  const bank={...g.resources},xp=player.xp;let panels=0;g.ui.showPanel=()=>panels++;
  assert.equal(g.interact(),true);assert.equal(g.activeRecruitId,frog.id);assert.equal(shown.at(-1).targetId,frog.id);
  assert.equal(panels,0);assert.equal(g.ui.panel,'build');assert.equal(g.paused,false);
  assert.deepEqual(g.resources,bank);assert.equal(player.xp,xp);assert.equal(frog.team,'neutral');assert.equal(frog.recruitment.quest.accepted,false);
  assert.equal(anchors.at(-1).visible,true);
});

test('second E accepts a required quest without payment, and later E enlists only when all terms are ready',()=>{
  const {game:g,frog,player}=setup();g.ui.panel='map';const bank=g.resources.food,xp=player.xp;
  g.interact();g.interact();assert.equal(frog.recruitment.quest.accepted,true);assert.equal(g.resources.food,bank);
  g.interact();assert.equal(frog.team,'neutral');assert.equal(g.resources.food,bank);
  g.creditGathering(6,0);g.interact();assert.equal(frog.team,'ally');assert.equal(g.resources.food,bank-8);assert.equal(player.xp,xp+20);
  assert.equal(g.activeRecruitId,null);assert.equal(g.ui.panel,'map');assert.equal(g.paused,false);
});

test('inline actions recheck current range and affordability, and reject stale target IDs',()=>{
  const {game:g,frog}=setup();g.player.level=12;g.interact();
  const other=actor({id:'other',team:'neutral',x:1,z:3});g.frogs.push(other);
  g.onAction('recruit-target',{id:other.id});assert.equal(other.team,'neutral');assert.equal(g.activeRecruitId,frog.id);
  frog.z=20;g.onAction('recruit-target',{id:frog.id});assert.equal(frog.team,'neutral');assert.equal(g.activeRecruitId,null);
  frog.z=3;g.player.level=1;g.interact();g.interact();g.creditGathering(6,0);g.resources.food=0;
  g.onAction('recruit-target',{id:frog.id});assert.equal(frog.team,'neutral');assert.equal(g.resources.food,0);
});

test('the visible conversation keeps E and its HUD context attached to the displayed frog when aim changes',()=>{
  const {game:g,frog}=setup();g.interact();const bank=g.resources.food;
  const swarm={x:0,z:2,flies:12},other=actor({id:'other',team:'neutral',x:1,z:3});
  g.world.hotspots.push(swarm);g.frogs.push(other);g.aimTarget={kind:'flies',entity:swarm};g.elapsed+=4;
  assert.equal(g.context().entity,frog,'the action bar describes the same E action as the visible bubble');
  g.interact();assert.equal(frog.recruitment.quest.accepted,true);assert.equal(g.resources.food,bank);assert.equal(swarm.flies,12);
  g.creditGathering(6,0);g.aimTarget={kind:'actor',entity:other};
  g.interact();assert.equal(frog.team,'ally');assert.equal(other.team,'neutral');assert.equal(g.resources.food,bank-8);
  assert.equal(g.activeRecruitId,null);assert.equal(g.ui.refs.recruitmentBubble.hidden,true);
  g.aimTarget={kind:'flies',entity:swarm};g.interact();assert.ok(g.resources.food>bank-8,'gathering resumes after the conversation closes');
});

test('hidden or invalid conversations never capture E and paused interaction cannot accept a quest',()=>{
  for(const invalidate of [(g,f)=>{g.ui.refs.recruitmentBubble.hidden=true;},(g,f)=>{f.z=30;},(g,f)=>{f.dead=true;}]){
    const {game:g,frog}=setup();g.interact();const swarm={x:0,z:2,flies:12},bank=g.resources.food;
    g.world.hotspots.push(swarm);g.aimTarget={kind:'flies',entity:swarm};invalidate(g,frog);
    assert.equal(g.context().type,'gather');g.interact();assert.ok(g.resources.food>bank);assert.equal(frog.recruitment.quest.accepted,false);
    assert.equal(frog.team,'neutral');
  }
  const {game:g,frog}=setup();g.interact();g.paused=true;
  assert.equal(g.interact(),false);assert.equal(frog.recruitment.quest.accepted,false);
});

test('the anchor follows the actual frog and closes when it leaves the camera view',()=>{
  const {game:g,frog,anchors}=setup();g.interact();const before=anchors.at(-1);
  frog.x=1;g.updateRecruitmentBubble();const after=anchors.at(-1);
  assert.notEqual(after.x,before.x);assert.equal(after.targetId,frog.id);
  g.camera.lookAt(0,7,30);g.camera.updateMatrixWorld(true);g.updateRecruitmentBubble();assert.equal(g.activeRecruitId,null);
});

test('death, recruitment, missing targets and distance close the bubble without changing simulation state',()=>{
  for(const mutate of [(g,f)=>{f.dead=true;},(g,f)=>{f.team='ally';},(g,f)=>{g.frogs=g.frogs.filter(a=>a!==f);},(g,f)=>{f.x=30;}]){
    const {game:g,frog,closed}=setup();g.interact();mutate(g,frog);g.updateRecruitmentBubble();
    assert.equal(g.activeRecruitId,null);assert.ok(closed.length);assert.equal(g.paused,false);
  }
});

test('explicit Pause hides but retains the bubble and blocks both help and enlist actions',()=>{
  const {game:g,frog,anchors}=setup();g.interact();g.paused=true;g.updateRecruitmentBubble();
  assert.equal(g.activeRecruitId,frog.id);assert.equal(anchors.at(-1).visible,false);
  g.onAction('recruit-help',{id:frog.id});g.handleKingdomAction('recruit-help',{id:frog.id});assert.equal(frog.recruitment.quest.accepted,false);
  g.onAction('recruit-target',{id:frog.id});assert.equal(frog.team,'neutral');assert.equal(g.paused,true);
  g.paused=false;g.updateRecruitmentBubble();assert.equal(anchors.at(-1).visible,true);
});

test('Escape closes a visible bubble before affecting other live gameplay panels',()=>{
  const {game:g}=setup();g.interact();g.ui.panel='build';g.escape();
  assert.equal(g.activeRecruitId,null);assert.equal(g.ui.panel,'build');assert.equal(g.paused,false);
});

test('Escape resumes explicit Pause without discarding its hidden conversation or capturing the cursor',()=>{
  const {game:g,frog,anchors}=setup();let locked=0;g.input.lock=()=>locked++;g.interact();
  g.paused=true;g.ui.menu='pause';g.ui.isBlocking=()=>Boolean(g.ui.menu);
  g.ui.hideMenus=()=>{g.ui.menu=null;g.ui.panel=null;};g.updateRecruitmentBubble();
  assert.equal(anchors.at(-1).visible,false);g.escape();
  assert.equal(g.paused,false);assert.equal(g.activeRecruitId,frog.id);assert.equal(locked,0);
  g.updateRecruitmentBubble();assert.equal(anchors.at(-1).visible,true);
});

test('Escape returns from guide content before closing a retained recruitment conversation',()=>{
  for(const paused of [false,true]){
    const {game:g,frog}=setup();g.interact();g.paused=paused;g.ui.panel='guide';g.ui.guideReturn={panel:null,menu:paused?'pause':null};
    let guideClosed=0;g.ui.closeGuideCard=()=>{guideClosed++;g.ui.panel=null;};g.escape();
    assert.equal(guideClosed,1);assert.equal(g.activeRecruitId,frog.id);assert.equal(g.paused,paused);
  }
});

test('legacy recruitment panel routes open the anchored conversation without opening a side panel',()=>{
  const {game:g,frog}=setup();let panels=0;g.ui.showPanel=()=>panels++;
  g.openPanel('recruitment');assert.equal(g.activeRecruitId,frog.id);assert.equal(panels,0);
  g.onAction('recruit-close');assert.equal(g.activeRecruitId,null);
  g.onAction('recruit-inspect');assert.equal(g.activeRecruitId,frog.id);assert.equal(panels,0);
});

test('a castle wall prevents opening or retaining a conversation through it',()=>{
  const {game:g,player,frog}=setup(),base=camp({id:'wall',x:0,z:0});initializeFort(base);g.camps.push(base);
  player.x=FORT_RADIUS+2;player.z=0;frog.x=FORT_RADIUS-2;frog.z=0;
  assert.equal(recruitmentBubbleTarget(g,frog.id),null);assert.equal(g.showRecruitment(frog),false);
});

test('projection returns an unpinned raw screen point and hides invalid or behind-camera targets',()=>{
  const {game:g,frog}=setup();const anchor=recruitmentBubbleAnchor(g,frog,1280,800);
  assert.equal(anchor.visible,true);assert.ok(anchor.x>0&&anchor.x<1280);assert.ok(anchor.y>0&&anchor.y<800);
  assert.equal(recruitmentBubbleAnchor(g,frog,0,800).visible,false);
  frog.z=30;assert.equal(recruitmentBubbleAnchor(g,frog,1280,800).visible,false);
});

test('Pause resume and guide close leave the cursor available for the retained conversation or concept drawer',()=>{
  for(const surface of ['bubble','concept']){
    const {game:g}=setup();let locked=0;g.input.lock=()=>locked++;
    if(surface==='bubble')g.interact();else g.ui.conceptPanelsOpen=true;
    g.ui.hideMenus=()=>{g.ui.panel=null;};
    g.paused=true;g.resume();assert.equal(g.paused,false);assert.equal(locked,0);
    g.handleKingdomAction('guide-close',{returnPanel:null,returnMenu:null});assert.equal(locked,0);
    g.ui.panel='build';g.ui.closePanels=()=>{g.ui.panel=null;};g.openPanel('build');assert.equal(locked,0);
    if(surface==='bubble')g.closeRecruitment();else g.ui.conceptPanelsOpen=false;
    g.resume();assert.equal(locked,1,'normal gameplay can capture the cursor after all interactive surfaces close');
  }
});

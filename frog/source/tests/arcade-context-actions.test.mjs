import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
import {newRound,RULES} from '../src/arcade-model.js';

const bundled=await build({entryPoints:[fileURLToPath(new URL('../src/arcade-context-actions.js',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm',loader:{'.css':'empty'},logLevel:'silent'});
const {installContextActions,placeContextAction,contextualKickState,projectedActorRect}=await import('data:text/javascript;base64,'+Buffer.from(bundled.outputFiles[0].text).toString('base64'));
const intersects=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;

function fixture({width=900,height=700,fixed=[]}={}){
 let doc;
 class Element{
  constructor(id='',width=68,height=82){
   this.id=id;this.width=width;this.height=height;this.children=[];this.parentElement=null;this.ownerDocument=doc;this.hidden=false;this.disabled=false;this.dataset={};this.attrs={};this.listeners=new Map();this.classes=new Set();this.textContent='';
   this.classList={toggle:(name,on)=>{if(on)this.classes.add(name);else this.classes.delete(name);},contains:name=>this.classes.has(name)};
   this.style={setProperty(name,value){this[name]=value;},removeProperty(name){delete this[name];}};
  }
  set className(value){this.classes=new Set(value.split(/\s+/));}
  set innerHTML(value){
   this.children=[];
   for(const name of ['frog-action-caption','frog-action-key',...Array(3).fill('finish-pip')]){const node=new Element();node.className=name;this.append(node);}
  }
  append(node){node.parentElement=this;this.children.push(node);}
  remove(){if(this.parentElement)this.parentElement.children=this.parentElement.children.filter(child=>child!==this);this.parentElement=null;}
  querySelectorAll(selector){const out=[];for(const child of this.children){if(selector.startsWith('.')&&child.classes.has(selector.slice(1)))out.push(child);out.push(...child.querySelectorAll(selector));}return out;}
  querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
  closest(){for(let node=this;node;node=node.parentElement)if(node.hidden)return node;return null;}
  setAttribute(name,value){this.attrs[name]=String(value);}
  addEventListener(type,handler){if(!this.listeners.has(type))this.listeners.set(type,new Set());this.listeners.get(type).add(handler);}
  removeEventListener(type,handler){this.listeners.get(type)?.delete(handler);}
  emit(type,details={}){const event={type,button:0,pointerType:'mouse',detail:0,defaultPrevented:false,stopped:false,preventDefault(){this.defaultPrevented=true;},stopPropagation(){this.stopped=true;},...details};for(const fn of this.listeners.get(type)||[])fn(event);return event;}
  getBoundingClientRect(){
   const hidden=!!this.closest('[hidden]'),width=hidden?0:this.width,height=hidden?0:this.height,left=parseFloat(this.style['--context-x']??this.style.left)||0,top=parseFloat(this.style['--context-y']??this.style.top)||0;
   return {left,top,width,height,right:left+width,bottom:top+height};
  }
 }
 const obstacles=[];doc={defaultView:{getComputedStyle:element=>({display:'block',visibility:element.style.visibility||'visible'})},createElement:()=>new Element(),querySelectorAll:()=>obstacles};
 const root=new Element('frog-actions',width,height),elements=new Map([[root.id,root]]);
 for(const id of ['catapult-button','catapult-status','sabotage-button','sabotage-status']){const element=new Element(id,id.endsWith('status')?170:74,id.endsWith('status')?38:78);element.hidden=true;elements.set(id,element);}
 for(const rect of fixed){const element=new Element(rect.id,rect.width,rect.height);element.style.left=`${rect.left}px`;element.style.top=`${rect.top}px`;obstacles.push(element);}
 const state=newRound();state.phase='battle';state.intro=0;const [player,nearer,target]=state.actors;
 Object.assign(player,{x:0,z:4});Object.assign(nearer,{x:-1.5,z:4,dizzy:RULES.dizzyHits,dizzyTime:4.5});Object.assign(target,{x:1.7,z:4,dizzy:RULES.dizzyHits,dizzyTime:4.5});
 const game={state,running:true,layoutEditing:false,touch:false,w:width,h:height,ground:()=>0,project:(x,y,z)=>({x:width/2+x*35,y:height/2+z*10-y*12,visible:true}),$:id=>elements.get(id)};
 const actions=installContextActions(game,{kickIcon:'<svg></svg>'});actions.update();
 const button=id=>root.children.find(node=>node.dataset.targetId===id);
 return {game,state,player,nearer,target,root,elements,obstacles,actions,button};
}

test('each dizzy rival gets three progress pips and the Q badge follows the actual generic target',()=>{
 const f=fixture(),near=f.button(f.nearer.id),far=f.button(f.target.id);
 assert.equal(near.hidden,false);assert.equal(far.hidden,false);assert.equal(far.dataset.remaining,'3');assert.equal(far.querySelectorAll('.finish-pip').length,3);
 assert.equal(near.querySelector('.frog-action-key').hidden,false);assert.equal(far.querySelector('.frog-action-key').hidden,true);
 f.nearer.dizzyTime=0;f.actions.update();assert.equal(near.hidden,true);assert.equal(far.querySelector('.frog-action-key').hidden,true,'Q would kick the nearer awake frog, so the farther dizzy frog cannot claim that shortcut');
 f.nearer.ko=true;f.actions.update();assert.equal(far.querySelector('.frog-action-key').hidden,false);
 f.game.touch=true;f.actions.update();assert.equal(far.querySelector('.frog-action-key').hidden,true);
});

test('context activation queues only the clicked ID once, including short taps and keyboard clicks',()=>{
 const f=fixture(),button=f.button(f.target.id),before=JSON.stringify(f.state);
 const down=button.emit('pointerdown');assert.equal(down.defaultPrevented,true);assert.equal(down.stopped,true);assert.equal(f.game.pendingKickTargetId,f.target.id);
 f.game.pendingKickTargetId=null;button.emit('click',{detail:1});assert.equal(f.game.pendingKickTargetId,null,'the matching native click cannot queue a second kick');
 button.emit('click',{detail:0});assert.equal(f.game.pendingKickTargetId,f.target.id);
 f.game.pendingKickTargetId=null;button.emit('pointerdown',{button:2});assert.equal(f.game.pendingKickTargetId,null);
 button.emit('pointerdown',{pointerType:'touch'});assert.equal(f.game.pendingKickTargetId,f.target.id);assert.equal(JSON.stringify(f.state),before,'the UI never applies damage or moves a body');
});

test('progress and non-color readiness feedback update from actual model state',()=>{
 const f=fixture(),button=f.button(f.target.id);
 f.target.finishHits=1;f.actions.update();assert.equal(button.dataset.remaining,'2');assert.equal(button.querySelectorAll('.finish-pip').filter(pip=>pip.classList.contains('is-filled')).length,1);
 f.target.finishHits=2;f.actions.update();assert.equal(button.dataset.remaining,'1');assert.equal(button.querySelector('.frog-action-caption').textContent,'KO');
 f.target.x=5;f.actions.update();assert.equal(button.dataset.state,'out-of-range');assert.equal(button.disabled,true);assert.match(button.attrs['aria-label'],/Πλησίασε/);assert.equal(button.querySelector('.frog-action-caption').textContent,'Πλησίασε');
 f.game.pendingKickTargetId=null;button.emit('click');assert.equal(f.game.pendingKickTargetId,null);
 f.target.x=1.7;f.target.height=1.2;f.actions.update();assert.equal(button.dataset.state,'blocked');assert.match(button.attrs['aria-label'],/ύψος/);
 f.target.height=0;f.player.kickCooldown=.4;f.actions.update();assert.equal(button.dataset.state,'cooldown');
 f.player.kickCooldown=0;f.target.spawnShield=1;f.actions.update();assert.equal(button.dataset.state,'unavailable');assert.match(button.attrs['aria-label'],/προστατεύεται/);
});

test('recovered, knocked-out, offscreen and editing contexts cannot leave actionable stale buttons',()=>{
 const f=fixture(),button=f.button(f.target.id);
 f.target.ko=true;f.actions.update();assert.equal(button.hidden,true);
 f.target.ko=false;f.target.dizzyTime=0;f.actions.update();assert.equal(button.hidden,true);
 f.target.dizzyTime=4;const project=f.game.project;f.game.project=(x,y,z)=>x>0?{x:f.game.w+1,y:200,visible:true}:project(x,y,z);f.actions.update();assert.equal(button.hidden,true);
 f.game.project=project;f.actions.update();assert.equal(button.hidden,false);
 f.game.pendingKickTargetId=f.target.id;f.game.layoutEditing=true;f.actions.update();assert.equal(f.root.hidden,true);assert.equal(button.hidden,true);assert.equal(f.game.pendingKickTargetId,null);
 button.emit('click');assert.equal(f.game.pendingKickTargetId,null);
});

test('world actions follow moving actors without moving saved stick or HUD rectangles',()=>{
 const f=fixture({width:390,height:844,fixed:[{id:'move-stick',left:18,top:650,width:140,height:140},{id:'aim-stick',left:232,top:650,width:140,height:140}]}),button=f.button(f.target.id);
 const previous=button.getBoundingClientRect(),saved=f.obstacles.map(el=>({...el.style}));
 f.target.x+=.4;f.target.z+=.3;f.actions.update();const next=button.getBoundingClientRect();assert.notDeepEqual([next.left,next.top],[previous.left,previous.top]);
 assert.ok(next.left>=0&&next.top>=0&&next.right<=390&&next.bottom<=844);
 for(const obstacle of f.obstacles)assert.equal(intersects(next,obstacle.getBoundingClientRect()),false);
 assert.deepEqual(f.obstacles.map(el=>({...el.style})),saved);
});

test('nearby action cards leave the player and both rival bodies visible',()=>{
 const f=fixture();
 for(const target of [f.nearer,f.target]){
  const rect=f.button(target.id).getBoundingClientRect();
  for(const actor of f.state.actors)assert.equal(intersects(rect,projectedActorRect(f.game,actor)),false,`${target.id} button must not cover ${actor.id}`);
 }
});

test('placement finds a nearby free side and avoids other actions even beside portrait sticks',()=>{
 const blocked=[{left:10,top:640,right:164,bottom:810},{left:226,top:640,right:380,bottom:810}],anchor={x:145,y:695};
 const first=placeContextAction({anchor,width:62,height:78,viewportWidth:390,viewportHeight:844,blocked});assert.ok(first);
 for(const obstacle of blocked)assert.equal(intersects(first,obstacle),false);
 assert.ok(Math.hypot(first.left+31-anchor.x,first.top+39-anchor.y)<135);
 const second=placeContextAction({anchor:{x:165,y:695},width:62,height:78,viewportWidth:390,viewportHeight:844,blocked:[...blocked,first]});assert.ok(second);assert.equal(intersects(first,second),false);
 for(const rect of [first,second])assert.ok(rect.left>=8&&rect.top>=8&&rect.right<=382&&rect.bottom<=836);
});

test('catapult and storage button/status pairs use supplied world anchors and preserve root-owned visibility',()=>{
 const f=fixture();f.nearer.dizzyTime=f.target.dizzyTime=0;
 const catapult=f.elements.get('catapult-button'),status=f.elements.get('catapult-status'),storage=f.elements.get('sabotage-button');catapult.hidden=false;status.hidden=false;storage.hidden=false;
 f.game.currentCatapultContext={x:-3,z:3};f.game.currentSabotageContext={x:3,z:3};f.actions.update();
 assert.equal(catapult.hidden,false);assert.equal(status.hidden,false);assert.equal(storage.hidden,false);assert.equal(catapult.style.visibility,'visible');
 const before=catapult.getBoundingClientRect();f.game.currentCatapultContext.x=-2;f.actions.update();assert.notEqual(catapult.getBoundingClientRect().left,before.left);
 assert.equal(intersects(catapult.getBoundingClientRect(),storage.getBoundingClientRect()),false);assert.equal(intersects(status.getBoundingClientRect(),storage.getBoundingClientRect()),false);
 f.game.currentCatapultContext=null;f.actions.update();assert.equal(catapult.hidden,false,'root owns whether interaction is offered');assert.equal(catapult.style.visibility,'hidden','a missing/offscreen anchor cannot float at an old world position');
});

test('destroy removes dynamic actions, their handlers and any queued contextual kick',()=>{
 const f=fixture(),button=f.button(f.target.id);button.emit('pointerdown');f.actions.destroy();f.actions.destroy();
 assert.equal(f.game.pendingKickTargetId,null);assert.equal(f.root.children.length,0);assert.equal(f.root.hidden,true);
 for(const handlers of button.listeners.values())assert.equal(handlers.size,0);
 button.emit('click');f.actions.update();assert.equal(f.game.pendingKickTargetId,null);assert.equal(f.root.children.length,0);
});


test('heavy contextual action describes belly slap while other classes retain kicks and KO',()=>{
 const f=fixture();for(const characterClass of ['heavy','skinny','medium',undefined]){f.player.characterClass=characterClass;f.player.kickCooldown=0;f.target.finishHits=0;f.target.x=1.7;f.actions.update();const button=f.button(f.target.id),heavy=characterClass==='heavy';assert.equal(button.querySelector('.frog-action-caption').textContent,heavy?'ΚΟΙΛΙΑ':'ΚΛΩΤΣΙΑ');assert.match(button.attrs['aria-label'],heavy?/Χτύπημα κοιλιάς/:/Κλωτσιά/);f.target.x=5;assert.match(contextualKickState(f.state,f.player,f.target).reason,heavy?/χτύπημα κοιλιάς/:/κλωτσιά/);f.target.x=1.7;f.player.kickCooldown=.4;assert.match(contextualKickState(f.state,f.player,f.target).reason,heavy?/χτύπημα κοιλιάς/:/κλωτσιά/);f.player.kickCooldown=0;f.target.finishHits=2;f.actions.update();assert.equal(button.querySelector('.frog-action-caption').textContent,'KO');}
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {catapultPointerPoint} from '../src/arcade-catapult-pointer.js';
import {installCatapultControls} from '../src/arcade-catapult-controls.js';

const viewport={width:1000,height:700};

test('an unlocked mounted mouse chooses its absolute cursor position',()=>{
 assert.deepEqual(catapultPointerPoint({x:500,y:350},{pointerType:'mouse',clientX:180,clientY:470},viewport),{x:180,y:470});
 assert.deepEqual(catapultPointerPoint({x:500,y:350},{pointerType:'mouse',clientX:820,clientY:140},viewport),{x:820,y:140});
});

test('relative movement keeps the landing cursor responsive until native unlock completes',()=>{
 let point={x:500,y:350};
 for(let i=0;i<4;i++)point=catapultPointerPoint(point,{pointerType:'mouse',clientX:500,clientY:350,movementX:25,movementY:-10},{...viewport,locked:true});
 assert.deepEqual(point,{x:600,y:310});
 assert.deepEqual(catapultPointerPoint(point,{pointerType:'mouse',clientX:500,clientY:350,movementX:0,movementY:0},{...viewport,locked:true}),point,'clicking while locked retains the selected point');
});

test('cursor coordinates stay within the viewport and malformed or non-mouse events are rejected',()=>{
 assert.deepEqual(catapultPointerPoint(null,{pointerType:'mouse',clientX:2000,clientY:-400},viewport),{x:1000,y:0});
 assert.deepEqual(catapultPointerPoint(null,{pointerType:'mouse',movementX:5,movementY:-5},{...viewport,locked:true}),{x:505,y:345});
 for(const pointerType of ['touch','pen',undefined])assert.equal(catapultPointerPoint(null,{pointerType,clientX:10,clientY:10},viewport),null);
 assert.equal(catapultPointerPoint(null,{pointerType:'mouse',clientX:NaN,clientY:0},viewport),null);
 assert.equal(catapultPointerPoint(null,{pointerType:'mouse',clientX:0,clientY:0},{width:0,height:700}),null);
});

function fixture({touch=false}={}){
 const controls={'catapult-button':{disabled:false},'aim-stick':{addEventListener(){}}};
 const player={id:'player',catapultId:null,x:0,z:0,aimX:0,aimZ:-1};
 const game={
  state:{actors:[player],phase:'battle'},running:true,layoutEditing:false,touch,mouseControl:!touch,w:1000,h:700,
  mouse:{x:400,y:300,valid:true,target:{x:0,z:-17}},aim:{x:0,z:-1,distance:17},aimStrength:0,pointers:new Map(),
  actions:{fire:false},locked:true,clearCount:0,releaseCount:0,lookStops:0,hudCount:0,inputReads:[],targetReads:0,
  $:id=>controls[id],pointerLocked(){return this.locked;},
  releaseMouseLook(){this.releaseCount++;this.locked=false;},
  stopCameraDrag(){this.lookStops++;},
  clearInputs(){this.clearCount++;this.actions.fire=false;this.mouse.valid=false;this.pointers.clear();},
  updateHUD(){this.hudCount++;},
  updateMouseTarget(){this.targetReads++;this.mouse.target={x:(this.mouse.x-500)/30,z:-(700-this.mouse.y)/30};},
  currentInput(){this.inputReads.push({valid:this.mouse.valid,x:this.mouse.x,y:this.mouse.y});if(this.mouse.valid)this.updateMouseTarget();return {fire:this.actions.fire,aiming:true,ax:this.aim.x,az:this.aim.z};},
 };
 const original=globalThis.addEventListener;globalThis.addEventListener=()=>{};
 try{installCatapultControls(game);}finally{if(original===undefined)delete globalThis.addEventListener;else globalThis.addEventListener=original;}
 return {game,player};
}

test('mounting intentionally unlocks once and clears old fire before choosing a landing target',()=>{
 const {game,player}=fixture();game.actions.fire=true;player.catapultId='catapult-player';
 game.updateHUD();
 assert.equal(game.releaseCount,1);assert.equal(game.clearCount,1);assert.equal(game.actions.fire,false);
 assert.equal(game.usesCatapultMouse(),true);assert.equal(game.running,true);
 assert.deepEqual({x:game.mouse.x,y:game.mouse.y},{x:400,y:300});
 const input=game.currentInput();assert.equal(input.fire,false);assert.equal(input.throwStone,undefined);
 for(let i=0;i<5;i++)game.updateHUD();assert.equal(game.releaseCount,1);assert.equal(game.clearCount,1);
});

test('mounted mouse movement changes direction and range without any camera-look call',()=>{
 const {game,player}=fixture();player.catapultId='catapult-player';game.updateHUD();
 assert.equal(game.captureCatapultMouse({pointerType:'mouse',clientX:250,clientY:420}),true);
 game.currentInput();const first={...game.catapultAim.target};
 assert.equal(game.captureCatapultMouse({pointerType:'mouse',clientX:760,clientY:150}),true);
 game.currentInput();const second={...game.catapultAim.target};
 assert.ok(first.x<0&&second.x>0);assert.ok(Math.abs(second.range-first.range)>1);
 assert.ok(game.targetReads>=4);assert.equal(game.actions.fire,false);
});

test('a fresh click launches at the selected target and held click does not repeat',()=>{
 const {game,player}=fixture();player.catapultId='catapult-player';game.updateHUD();
 game.captureCatapultMouse({pointerType:'mouse',clientX:760,clientY:150});
 game.currentInput();const target={...game.catapultAim.target};game.actions.fire=true;
 const click=game.currentInput();assert.deepEqual(click.throwStone,target);assert.equal(click.fire,false);
 for(let i=0;i<5;i++)assert.equal(game.currentInput().throwStone,undefined);
 game.actions.fire=false;game.currentInput();game.actions.fire=true;assert.deepEqual(game.currentInput().throwStone,target);
});

test('Pause and Resume retain the selected mouse position without restoring held fire',()=>{
 const {game,player}=fixture();player.catapultId='catapult-player';game.updateHUD();
 game.captureCatapultMouse({pointerType:'mouse',clientX:760,clientY:150});game.actions.fire=true;
 game.running=false;game.clearInputs();game.updateHUD();assert.equal(game.mouse.valid,false);
 game.running=true;game.updateHUD();
 assert.deepEqual({x:game.mouse.x,y:game.mouse.y},{x:760,y:150});assert.equal(game.mouse.valid,true);
 assert.equal(game.actions.fire,false);assert.equal(game.currentInput().throwStone,undefined);assert.equal(game.releaseCount,1);
});

test('unmounting clears cursor and held fire without requesting mouse capture',()=>{
 const {game,player}=fixture();player.catapultId='catapult-player';game.updateHUD();game.actions.fire=true;
 player.catapultId=null;game.updateHUD();assert.equal(game.usesCatapultMouse(),false);assert.equal(game.actions.fire,false);
 assert.equal(game.mouse.valid,false);assert.equal(game.releaseCount,1);assert.equal(game.clearCount,2);
 assert.equal(game.captureCatapultMouse({pointerType:'mouse',clientX:200,clientY:300}),false);
});

test('touch-stick aiming keeps mouse invalid until an actual mouse is used on a hybrid device',()=>{
 const {game,player}=fixture({touch:true});game.mouse.valid=false;player.catapultId='catapult-player';game.updateHUD();
 assert.equal(game.usesCatapultMouse(),false);assert.equal(game.mouse.valid,false);
 game.pointers.set('aim',7);game.aimStrength=.75;game.aim={x:1,z:0,distance:14};game.currentInput();
 const selected={...game.catapultAim.target};assert.ok(selected.x>0);
 game.pointers.clear();game.aimStrength=0;game.currentInput();assert.deepEqual(game.catapultAim.target,selected,'touch power survives release');
 assert.equal(game.captureCatapultMouse({pointerType:'mouse',clientX:200,clientY:300}),true);assert.equal(game.usesCatapultMouse(),true);
 game.mouseControl=false;game.mouse.valid=false;game.updateHUD();assert.equal(game.mouse.valid,false,'returning to touch does not restore stale mouse targeting');
});

test('paused, editing and non-mouse contacts cannot acquire catapult mouse input',()=>{
 const {game,player}=fixture();player.catapultId='catapult-player';game.updateHUD();
 for(const event of [{pointerType:'touch',clientX:200,clientY:300},{pointerType:'pen',clientX:200,clientY:300}])assert.equal(game.captureCatapultMouse(event),false);
 game.running=false;assert.equal(game.captureCatapultMouse({pointerType:'mouse',clientX:200,clientY:300}),false);
 game.running=true;game.layoutEditing=true;assert.equal(game.captureCatapultMouse({pointerType:'mouse',clientX:200,clientY:300}),false);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {PerspectiveCamera,Vector3,Box3} from 'three';
import {newRound,projectileOrigin,setProjectileWorld,traceShot} from '../src/arcade-model.js';
import {GUARD_BODY} from '../src/arcade-guards.js';
import {autoFireTargetVisible} from '../src/arcade-auto-fire-visibility.js';
import {createTargetLock,targetLockAim,TARGET_LOCK_RULES} from '../src/arcade-target-lock.js';

function fixture(){
 const state=newRound();state.phase='battle';state.intro=0;
 const [player,target,other]=state.actors;Object.assign(player,{x:0,z:8,height:0});Object.assign(target,{x:0,z:0,height:0});other.ko=true;
 for(const guard of state.guards)guard.mode='gone';
 setProjectileWorld(state,{ground:()=>0});
 const camera=new PerspectiveCamera(52,800/600,.1,250);camera.position.set(0,8,12);camera.lookAt(0,.45,0);camera.updateMatrixWorld(true);
 const game={state,camera,w:800,h:600,running:true,settings:{mouseTargetLock:true},basesView:{bases:new Map()},aim:{x:0,z:-1},mouse:{x:400,y:300}};
 game.project=(x,y,z)=>{const point=new Vector3(x,y,z),behind=point.clone().applyMatrix4(camera.matrixWorldInverse).z>=0;point.project(camera);return {x:(point.x+1)*game.w/2,y:(1-point.y)*game.h/2,visible:!behind&&point.z>-1&&point.z<1,behind};};
 return {game,player,target,other,lock:createTargetLock(game)};
}
const screenOf=(game,actor)=>{const point=projectileOrigin(game.state,actor);return game.project(point.x,point.y,point.z);};

test('mouse target lock is opt-in and never fires or changes stored aim by itself',()=>{
 const {game,player,target,lock}=fixture();game.settings={};
 const before=structuredClone(game.state),camera=game.camera.matrixWorld.toArray(),aim={...game.aim},mouse={...game.mouse};
 assert.equal(lock.start(),null);assert.equal(lock.targetId,null);
 game.settings.mouseTargetLock=true;assert.equal(lock.start(),null,'enabling during a hold is not a fresh press');
 lock.end();const result=lock.start();assert.equal(result.targetId,target.id);assert.equal(Object.hasOwn(result,'fire'),false);
 assert.deepEqual(game.state,before);assert.deepEqual(game.camera.matrixWorld.toArray(),camera);assert.deepEqual(game.aim,aim);assert.deepEqual(game.mouse,mouse);assert.equal(player.ammo,before.actors[0].ammo);
});

test('a press acquires the visible opponent nearest its screen anchor and holds that same opponent',()=>{
 const {game,target,other,lock}=fixture();target.x=-1.1;Object.assign(other,{ko:false,x:1.1,z:-1,height:0});
 const anchor=screenOf(game,target),result=lock.start(anchor);assert.equal(result.targetId,target.id);
 other.x=-1.05;other.z=-3;target.x=-1.5;
 assert.equal(lock.update().targetId,target.id,'a closer candidate cannot replace the held target');
 target.ko=true;assert.equal(lock.update(),null);assert.equal(lock.held,true);assert.equal(lock.targetId,null);
 assert.equal(lock.start(screenOf(game,other)),null,'holding or duplicate pointer events cannot reacquire after losing the target');
 lock.end();assert.equal(lock.held,false);assert.equal(lock.start(screenOf(game,other)).targetId,other.id);
});

test('empty presses do not acquire a target later and acquisition stays near the mouse',()=>{
 const {game,target,lock}=fixture();
 assert.equal(lock.start({x:20,y:20}),null);assert.equal(lock.update(),null);
 assert.equal(lock.start(screenOf(game,target)),null);
 lock.end();assert.equal(lock.start(screenOf(game,target)).targetId,target.id);
 lock.end();assert.equal(lock.start({x:-10,y:300}),null,'a cursor outside the viewport is not an acquisition anchor');
});

test('release, disabled assistance, pause, incapacity and round replacement end tracking',()=>{
 for(const alter of [f=>f.lock.end(),f=>f.game.settings.mouseTargetLock=false,f=>f.game.running=false,f=>f.player.ko=true,f=>f.player.dizzyTime=1,f=>f.player.knockUp=.4,f=>f.player.catapultId='machine',f=>f.game.state=structuredClone(f.game.state)]){
  const f=fixture();assert.ok(f.lock.start());alter(f);assert.equal(f.lock.update(),null);assert.equal(f.lock.targetId,null);
 }
});

test('tracking respects range, projection and target lifetime without automatic fallback',()=>{
 for(const alter of [f=>f.target.z=8-TARGET_LOCK_RULES.range-1,f=>f.target.x=40,f=>f.target.ko=true,f=>f.target.eliminated=true,f=>f.target.x=NaN,f=>f.game.project=()=>({x:400,y:300,behind:true,visible:false})]){
  const f=fixture();assert.ok(f.lock.start());alter(f);assert.equal(f.lock.update(),null);assert.equal(f.lock.targetId,null);
 }
});

test('actual airborne centers steer the shot while the camera target stays at standing height',()=>{
 const {game,player,target,lock}=fixture();const first=lock.start();assert.ok(first);
 target.height=.67;player.height=.3;const result=lock.update(),origin=projectileOrigin(game.state,player),point=projectileOrigin(game.state,target);
 assert.deepEqual(result.target,point);assert.deepEqual(result.cameraTarget,first.cameraTarget);assert.ok(result.direction.y>0);
 const expected=new Vector3(point.x-origin.x,point.y-origin.y,point.z-origin.z).normalize();
 assert.ok(Math.abs(result.direction.x-expected.x)<1e-10&&Math.abs(result.direction.y-expected.y)<1e-10&&Math.abs(result.direction.z-expected.z)<1e-10);
 const trace=traceShot(game.state,{...player,aimX:result.direction.x,aimY:result.direction.y,aimZ:result.direction.z,aim3D:true});assert.equal(trace.targetId,target.id);
 target.invuln=.1;assert.equal(lock.update().targetId,target.id,'normal short damage immunity must not break the hold after every hit');
});

test('an elevated camera seeing across a wall cannot lock a shot through that wall',()=>{
 const {game,player,target}=fixture();Object.assign(player,{x:2.2,z:15});Object.assign(target,{x:2.2,z:20.5});game.camera.position.set(2.2,9,14);game.camera.lookAt(2.2,.45,20.5);game.camera.updateMatrixWorld(true);
 assert.equal(autoFireTargetVisible(game,target.id,{directional:true}),true,'the camera really sees over this wall');
 assert.equal(targetLockAim(game,target.id),null,'the muzzle path still stops at the wall');
});

test('a closer live body blocks the actual muzzle ray even if the camera sees the locked target',()=>{
 const {game,target,other,lock}=fixture();assert.ok(lock.start());Object.assign(other,{ko:false,x:0,z:4,height:0});
 assert.equal(autoFireTargetVisible(game,target.id,{directional:true}),true);
 assert.equal(lock.update(),null,'a fly would hit the intervening frog');
 other.ko=true;assert.equal(lock.update(),null,'clearing the path does not silently resume a lost lock');
});

test('opaque decorative scenery blocks acquisition while its visible cutaway permits it',()=>{
 const {game,target}=fixture();const basket={roof:{visible:false},cabin:{visible:true},stockMaterials:[{opacity:1}],stockBounds:new Box3(new Vector3(-1,3,5),new Vector3(1,6,7))};
 game.basesView.bases.set('basket',basket);assert.equal(targetLockAim(game,target.id),null);
 basket.stockMaterials[0].opacity=.4;assert.equal(targetLockAim(game,target.id).targetId,target.id);
});

test('enemy guards use their own body height and friendly or disabled guards cannot be locked',()=>{
 const {game,target,lock}=fixture();target.ko=true;const guard=game.state.guards[1];Object.assign(guard,{x:0,z:0,mode:'patrol',health:4});
 const result=lock.start();assert.equal(result.targetId,guard.id);assert.equal(result.kind,'guard');assert.equal(result.target.y,GUARD_BODY.centerY);
 guard.mode='disabled';guard.health=0;assert.equal(lock.update(),null);
 lock.end();Object.assign(guard,{mode:'patrol',health:4,owner:'player'});assert.equal(lock.start(),null);
});

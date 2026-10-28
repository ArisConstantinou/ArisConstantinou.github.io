import test from 'node:test';
import assert from 'node:assert/strict';
import {Ray,Vector3,Box3} from 'three';
import {newRound,setProjectileWorld,projectileOrigin} from '../src/arcade-model.js';
import {GUARD_BODY} from '../src/arcade-guards.js';
import {resolveAutoFire} from '../src/arcade-auto-fire.js';
import {autoFireTargetVisible} from '../src/arcade-auto-fire-visibility.js';

function fixture(ground=()=>0){
 const state=newRound(),actor=state.actors[0],guard=state.guards[1];state.phase='battle';state.intro=0;
 Object.assign(actor,{x:0,z:6,height:0});state.actors.slice(1).forEach(a=>a.ko=true);
 for(const g of state.guards)g.mode='gone';Object.assign(guard,{x:0,z:0,mode:'patrol',health:4});setProjectileWorld(state,{ground});
 const target={x:guard.x,y:ground(guard.x,guard.z)+GUARD_BODY.centerY,z:guard.z},origin=projectileOrigin(state,actor),input={aiming:true,ax:0,ay:(target.y-origin.y)/6,az:-1};
 const camera={position:new Vector3(0,8,12)},ray=new Ray(camera.position.clone(),new Vector3(target.x,target.y,target.z).sub(camera.position).normalize());
 const game={state,camera,mouse:{valid:true,targetId:guard.id,target},mouseRay:{ray},basesView:{bases:new Map()}};
 return {state,actor,guard,input,game};
}
const fire=f=>resolveAutoFire({...f,active:true,aiming:true});

test('held touch aim can shoot the real short beetle body without redirecting input',()=>{
 const f=fixture(),before=structuredClone({state:f.state,input:f.input}),result=fire(f);
 assert.equal(result.fire,true);assert.equal(result.targetId,f.guard.id);assert.equal(result.trace.kind,'guard');
 assert.deepEqual({state:f.state,input:f.input},before);
 assert.equal(autoFireTargetVisible(f.game,f.guard.id),true);
 assert.equal(autoFireTargetVisible(f.game,f.guard.id,{directional:true}),true);
});

test('friendly, disabled and recovering-protected beetles cannot trigger automatic shots',()=>{
 const f=fixture();f.guard.owner=f.actor.id;assert.equal(fire(f).fire,false);assert.equal(autoFireTargetVisible(f.game,f.guard.id,{directional:true}),false);
 f.guard.owner='rival-1';f.guard.mode='disabled';f.guard.health=0;assert.equal(fire(f).fire,false);assert.equal(autoFireTargetVisible(f.game,f.guard.id),false);
 f.guard.mode='patrol';f.guard.health=4;f.guard.invuln=.08;assert.equal(fire(f).fire,false);
 f.guard.invuln=0;assert.equal(fire(f).fire,true);
});

test('beetle visibility uses its own height and still respects opaque storage scenery',()=>{
 const f=fixture((x,z)=>1.7*Math.max(0,Math.min(1,(6-z)/6)));
 assert.equal(fire(f).fire,true);assert.equal(autoFireTargetVisible(f.game,f.guard.id,{directional:true}),true);
 const stock={roof:{visible:false},cabin:{visible:true},stockMaterials:[{opacity:1}],stockBounds:new Box3(new Vector3(-1,3,5),new Vector3(1,6,7))};
 f.game.basesView.bases.set('opaque-stock',stock);
 assert.equal(autoFireTargetVisible(f.game,f.guard.id),false);
 assert.equal(autoFireTargetVisible(f.game,f.guard.id,{directional:true}),false);
 stock.stockMaterials[0].opacity=.4;
 assert.equal(autoFireTargetVisible(f.game,f.guard.id,{directional:true}),true);
});

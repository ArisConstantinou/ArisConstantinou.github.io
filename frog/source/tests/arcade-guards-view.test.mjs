import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {ArcadeGuardsView} from '../src/arcade-guards-view.js';
import {createGuards,GUARD_BODY,GUARD_RULES,guardChargeLane} from '../src/arcade-guards.js';
import {BASES} from '../src/arcade-bases.js';

function fixture(){
 const state={guards:createGuards(),bases:BASES.map(base=>({...base,destroyed:false})),actors:[]},game={scene:new THREE.Scene(),state,ground:(x,z)=>x*.01+z*.005,running:true,w:800,h:600};
 const view=new ArcadeGuardsView(game);return {game,state,view,guard:state.guards[0],visual:view.guards.get(state.guards[0].id)};
}
function warn(guard,dx=1,dz=0){Object.assign(guard,{mode:'windup',windup:GUARD_RULES.windupSeconds,chargeOriginX:guard.x,chargeOriginZ:guard.z,chargeX:dx,chargeZ:dz});}
function context(){return {texts:[],arcs:[],save(){},restore(){},beginPath(){},roundRect(){},rect(){},fill(){},stroke(){},fillText(text,x,y){this.texts.push({text,x,y});},arc(x,y,r){this.arcs.push({x,y,r});},measureText(text){return {width:text.length*5.6};}};}

test('each storage has a distinct six-legged beetle whose visible armored core fits its shared collider',()=>{
 const {game,state,view}=fixture(),before=JSON.stringify(state);
 assert.equal(view.guards.size,3);assert.equal(game.scene.children[0],view.group);
 const tints=[];
 for(const guard of state.guards){const visual=view.guards.get(guard.id);assert.equal(visual.group.userData.kind,'beetle');assert.equal(visual.group.userData.legCount,6);assert.equal(visual.legs.count,16);assert.equal(visual.feet.count,6);assert.equal(visual.joints.count,8);assert.equal(visual.lane.visible,false);tints.push(visual.shellMaterial.color.getHex());}
 assert.equal(new Set(tints).size,3,'emerald, copper and purple armor must remain distinguishable');
 for(const geometry of [view.geometry.armor,view.geometry.core]){const p=geometry.attributes.position;for(let i=0;i<p.count;i++){assert.ok(Math.hypot(p.getX(i),p.getZ(i))<=GUARD_BODY.radius+.002);assert.ok(p.getY(i)+GUARD_BODY.centerY>=0);assert.ok(p.getY(i)+GUARD_BODY.centerY<=GUARD_BODY.height+.001);}}
 view.update(.05);assert.equal(JSON.stringify(state),before,'rendering must not mutate deterministic guard state');view.dispose();
});

test('articulated legs move with physical travel and freeze when animation time is zero',()=>{
 const {view,guard,visual}=fixture(),initial=Array.from(visual.legs.instanceMatrix.array);guard.x+=.025;view.update(.05);
 assert.notDeepEqual(Array.from(visual.legs.instanceMatrix.array),initial);const moving=Array.from(visual.legs.instanceMatrix.array),clock=view.clock,gait=visual.gait;
 view.update(0);assert.equal(view.clock,clock);assert.equal(visual.gait,gait);assert.deepEqual(Array.from(visual.legs.instanceMatrix.array),moving);
 assert.ok(Math.abs(visual.group.position.y-view.ground(guard.x,guard.z))<1e-10);view.dispose();
});

test('windup shows the model’s fixed charge path and never tracks a target or the moving beetle',()=>{
 const {view,guard,visual}=fixture();warn(guard,0,-1);view.update(.016);const expected=guardChargeLane(guard),positions=Array.from(visual.lane.geometry.attributes.position.array);
 assert.equal(visual.lane.visible,true);assert.equal(visual.arrows.visible,true);assert.deepEqual(visual.lane.userData.start,expected.start);assert.deepEqual(visual.lane.userData.end,expected.end);assert.equal(visual.lane.userData.radius,GUARD_BODY.radius);
 guard.x+=.2;guard.z-=.1;guard.windup=.2;view.update(.05);assert.deepEqual(Array.from(visual.lane.geometry.attributes.position.array),positions,'the warning commits to its original bearing');
 guard.mode='charge';view.update(.016);assert.equal(visual.dust.count,9);assert.deepEqual(Array.from(visual.lane.geometry.attributes.position.array),positions);
 guard.mode='recover';view.update(.016);assert.equal(visual.lane.visible,false);assert.equal(visual.arrows.visible,false);view.dispose();
});

test('a solid wall shortens the drawn warning to the same stopping point as the actual charge',()=>{
 const {view,guard,visual}=fixture();warn(guard,1,0);view.update(.016);const path=guardChargeLane(guard);
 assert.ok(path.distance<GUARD_RULES.chargeSpeed*GUARD_RULES.chargeSeconds-1,'the fixture points at the home side wall');
 assert.ok(Math.abs(visual.lane.userData.distance-path.distance)<1e-10);assert.deepEqual(visual.lane.userData.end,path.end);assert.ok(visual.lane.geometry.drawRange.count>0);view.dispose();
});

test('hit flash, flipped disabled pose, wake and destroyed-base removal reflect the real state',()=>{
 const {state,view,guard,visual}=fixture(),normal=visual.shellMaterial.color.clone();guard.hit=GUARD_RULES.hitSeconds;guard.health=3;view.update(0);assert.ok(visual.shellMaterial.color.r>normal.r);
 guard.hit=0;guard.mode='disabled';guard.health=0;guard.respawnTime=20;for(let i=0;i<12;i++)view.update(.05);
 assert.ok(visual.body.rotation.z>3.1,'disabled beetle is visibly on its back');assert.equal(visual.lane.visible,false);
 Object.assign(guard,{mode:'patrol',health:4,respawnTime:0});for(let i=0;i<12;i++)view.update(.05);assert.ok(Math.abs(visual.body.rotation.z)<.01);
 state.bases[0].destroyed=true;view.update(.016);assert.equal(visual.group.visible,false);assert.equal(visual.lane.visible,false);assert.equal(visual.dust.visible,false);view.dispose();
});

test('nearby health labels show four pips and the actual disabled countdown while avoiding the crosshair',()=>{
 const {game,state,view,guard}=fixture(),origin={x:guard.x,z:guard.z};state.guards=state.guards.slice(0,1);state.actors=[{id:'player',x:guard.x+3,z:guard.z,height:0}];
 game.project=(x,y,z)=>({x:400+(x-origin.x)*32,y:300+(z-origin.z)*20-y*30,visible:true});game.currentAimScreen=game.project(guard.x,game.ground(guard.x,guard.z)+.82,guard.z);
 let c=context();view.drawLabels(c);const label=view.labels.get(guard.id);assert.ok(label);assert.equal(label.health,4);assert.equal(label.maxHealth,4);assert.equal(c.arcs.length,4);assert.ok(label.rect.bottom<game.currentAimScreen.y-22||label.rect.top>game.currentAimScreen.y+22||label.rect.right<game.currentAimScreen.x-22||label.rect.left>game.currentAimScreen.x+22);
 Object.assign(guard,{health:0,mode:'disabled',respawnTime:7.2});view.update(0);c=context();view.drawLabels(c);assert.equal(view.labels.get(guard.id).text,'ΞΥΠΝΑ ΣΕ 8″');assert.equal(view.labels.get(guard.id).remaining,8);assert.equal(view.labels.get(guard.id).health,0);
 game.running=false;view.drawLabels(context());assert.equal(view.labels.size,0);view.dispose();
});

test('guard meshes and materials are reused across frames and all owned resources dispose once',()=>{
 const {game,state,view}=fixture(),other=new THREE.Group();game.scene.add(other);const geometries=[...view.geometries],materials=[...view.materials];let geometryDisposals=0,materialDisposals=0;
 for(const geometry of geometries)geometry.addEventListener('dispose',()=>geometryDisposals++);for(const material of materials)material.addEventListener('dispose',()=>materialDisposals++);
 for(let i=0;i<8;i++)view.update(.016);assert.deepEqual([...view.geometries],geometries);assert.deepEqual([...view.materials],materials);
 state.guards.pop();view.update(.016);assert.equal(view.guards.size,2);view.dispose();assert.deepEqual(game.scene.children,[other]);assert.equal(geometryDisposals,geometries.length);assert.equal(materialDisposals,materials.length);
});

test('crowded close views retain warning and disabled countdown outside the player, crosshair and HUD',()=>{
 const {game,state,view,guard}=fixture();state.guards=state.guards.slice(0,1);game.project=()=>({x:400,y:300,visible:true});game.currentAimScreen={x:400,y:300};
 const blocked={left:250,right:550,top:230,bottom:360,width:300,height:130};game.ui={querySelectorAll:()=>[{getBoundingClientRect:()=>blocked,closest:()=>null}]};
 warn(guard);view.update(0);view.drawLabels(context());let label=view.labels.get(guard.id);assert.ok(label,'the warning must use a wider nearby slot instead of disappearing');assert.equal(label.text,'! ΕΦΟΔΟΣ');assert.ok(label.rect.bottom<blocked.top||label.rect.top>blocked.bottom||label.rect.right<blocked.left||label.rect.left>blocked.right);
 Object.assign(guard,{mode:'disabled',health:0,respawnTime:19.6});view.update(0);view.drawLabels(context());label=view.labels.get(guard.id);assert.ok(label);assert.equal(label.text,'ΞΥΠΝΑ ΣΕ 20″');assert.ok(Math.hypot((label.rect.left+label.rect.right)/2-400,(label.rect.top+label.rect.bottom)/2-300)<=104.01,'the label stays associated with its beetle');view.dispose();
});

test('guard health and warnings leave the existing projected storage caption readable',()=>{
 const {game,state,view,guard}=fixture(),base=BASES[0];state.guards=state.guards.slice(0,1);state.actors=[{id:'player',x:guard.x+3,z:guard.z,height:0}];
 game.project=(x,y,z)=>x===base.stock.x&&z===base.stock.z&&y>3?{x:400,y:274,visible:true}:x===guard.x&&z===guard.z?{x:400,y:300,visible:true}:{x:650,y:500,visible:true};
 warn(guard);view.update(0);view.drawLabels(context());const label=view.labels.get(guard.id);assert.ok(label);const storage={left:305,right:495,top:258,bottom:280};assert.ok(label.rect.bottom<storage.top||label.rect.top>storage.bottom||label.rect.right<storage.left||label.rect.left>storage.right,'the two canvas labels must not overprint each other');view.dispose();
});

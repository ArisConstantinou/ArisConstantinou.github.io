import test from 'node:test';
import assert from 'node:assert/strict';
import {PerspectiveCamera,Raycaster,Vector2,Vector3} from 'three';
import {computeReticle,drawReticle,RETICLE_COLORS,RETICLE_BEARING_DISTANCE} from '../src/arcade-reticle.js';
import {newRound,projectileOrigin,traceWorldRay,RULES} from '../src/arcade-model.js';
import {PROJECTILE} from '../src/arcade-projectiles.js';
import {traceAim} from '../src/arcade-aim.js';
import {resolveMouseAim} from '../src/arcade-mouse-aim.js';
import {cameraPose} from '../src/arcade-view-math.js';

const near=(actual,expected,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} should equal ${expected}`);
const preview=(extra={})=>({x:1,y:2,z:3,targetId:null,kind:null,blocked:false,...extra});
const at=(x,y,extra={})=>()=>({x,y,visible:true,...extra});
const bearingOptions={origin:{x:0,y:.45,z:0},bearing:{x:1,z:0}};

function canvasRecorder(){
 const context={strokeStyle:'old-stroke',fillStyle:'old-fill',lineWidth:7,globalAlpha:.3,lineCap:'butt',lineJoin:'miter',commands:[],strokes:[],fills:[],stack:[],path:[]};
 const properties=['strokeStyle','fillStyle','lineWidth','globalAlpha','lineCap','lineJoin'];
 context.save=()=>context.stack.push(Object.fromEntries(properties.map(key=>[key,context[key]])));
 context.restore=()=>Object.assign(context,context.stack.pop());
 context.beginPath=()=>{context.path=[];};
 for(const method of ['moveTo','lineTo','arc'])context[method]=(...args)=>{const command={method,args};context.commands.push(command);context.path.push(command);};
 context.stroke=()=>context.strokes.push({path:[...context.path],color:context.strokeStyle,width:context.lineWidth});
 context.fill=()=>context.fills.push({path:[...context.path],color:context.fillStyle});
 return context;
}

test('the mouse marker follows exact input pixels while preserving the independent physical endpoint',()=>{
 const input=preview({cursor:{x:120,y:100},direction:{x:0,y:0,z:-1}}),before=structuredClone(input),calls=[];
 const marker=computeReticle(input,(...point)=>{calls.push(point);return {x:620,y:340,visible:true};},1000,600,{pointer:input.cursor});
 assert.deepEqual(calls,[[1,2,3]]);assert.deepEqual(input,before);
 assert.deepEqual(marker.endpoint,{x:1,y:2,z:3});assert.deepEqual(marker.projection,{x:620,y:340});
 assert.equal(marker.x,120);assert.equal(marker.y,100);assert.equal(marker.anchor,'pointer');assert.equal(marker.offscreen,false);assert.equal(marker.edgeAngle,null);
});

test('a real rear-camera rock obstruction changes feedback without displacing the locked center crosshair',()=>{
 const state=newRound(),player=state.actors[0],width=1280,height=720;
 state.phase='battle';state.actors.slice(1).forEach(actor=>actor.ko=true);Object.assign(player,{x:-8,z:4.28});
 const pose=cameraPose(player,0,width/height,'chase3d',{yaw:Math.PI,pitch:-.15,zoom:1});
 const camera=new PerspectiveCamera(52,width/height,.1,250);camera.position.fromArray(pose.position);camera.lookAt(new Vector3(...pose.look));camera.updateMatrixWorld();
 const caster=new Raycaster();caster.setFromCamera(new Vector2(0,0),camera);
 const ray=caster.ray,muzzle=projectileOrigin(state,player),offset=new Vector3(muzzle.x,muzzle.y,muzzle.z).sub(ray.origin),range=RULES.projectileSpeed*RULES.projectileLifetime+PROJECTILE.muzzleOffset;
 const contact=traceWorldRay(state,ray.origin,ray.direction,offset.length()+range,{ignoreId:player.id,solidFrom:Math.max(0,offset.dot(ray.direction))});
 const aim=resolveMouseAim({rayOrigin:ray.origin,rayDirection:ray.direction,muzzle,range,hits:contact?[contact]:[]});
 Object.assign(player,{aimX:aim.direction.x,aimY:aim.direction.y,aimZ:aim.direction.z,aim3D:true});
 const result=traceAim(state,player),project=(x,y,z)=>{
  const point=new Vector3(x,y,z),behind=point.clone().applyMatrix4(camera.matrixWorldInverse).z>=0,p=point.project(camera);
  return {x:(p.x+1)*width/2,y:(1-p.y)*height/2,visible:p.z>-1&&p.z<1,behind};
 };
 const marker=computeReticle(result,project,width,height,{centered:true}),actual=project(result.x,result.y,result.z);
 assert.equal(result.kind,'rock');assert.equal(marker.kind,'blocked');assert.equal(marker.offscreen,false);
 near(marker.x,width/2);near(marker.y,height/2);near(marker.projection.x,actual.x);near(marker.projection.y,actual.y);
 assert.ok(actual.y-height/2>25,'muzzle parallax remains real, but cannot pull the input crosshair down');
});

test('both views can share the same clear, body-contact and solid-obstruction meanings',()=>{
 const cases=[
  {input:preview(),kind:'clear',color:RETICLE_COLORS.clear},
  {input:preview({kind:'actor',targetId:'rival-1'}),kind:'target',color:RETICLE_COLORS.target},
  {input:preview({kind:'guard',targetId:'guard-1'}),kind:'target',color:RETICLE_COLORS.target},
  ...['wall','rock','terrain','boundary'].map(kind=>({input:preview({kind,blocked:true}),kind:'blocked',color:RETICLE_COLORS.blocked})),
  {input:preview({blocked:true,targetId:'occluded-rival'}),kind:'blocked',color:RETICLE_COLORS.blocked},
 ];
 for(const {input,kind,color} of cases){
  const marker=computeReticle(input,at(200,150),400,300);
  assert.equal(marker.kind,kind);assert.equal(marker.color,color);assert.equal(marker.sourceKind,input.kind);
 }
 assert.equal(new Set(Object.values(RETICLE_COLORS)).size,3,'obstruction and actual body contact stay visually distinct');
});

test('offscreen directional-stick anchors use a viewport edge without changing the physical endpoint',()=>{
 for(const [x,y] of [[1500,300],[-500,300],[500,-600],[500,1000],[1500,900],[-500,-600]]){
  const marker=computeReticle(preview(),at(x,y),1000,600,{...bearingOptions,inset:22});
  assert.equal(marker.offscreen,true);assert.deepEqual(marker.projection,{x,y});
  assert.ok(marker.x>=22-1e-8&&marker.x<=978+1e-8&&marker.y>=22-1e-8&&marker.y<=578+1e-8);
  assert.ok(Math.min(Math.abs(marker.x-22),Math.abs(marker.x-978),Math.abs(marker.y-22),Math.abs(marker.y-578))<1e-8);
  near((marker.x-500)*(y-300)-(marker.y-300)*(x-500),0);
  near(marker.edgeAngle,Math.atan2(y-300,x-500));
  assert.notDeepEqual({x:marker.x,y:marker.y},marker.projection,'display clamping must not replace the actual endpoint projection');
 }
});

test('only a directional-stick anchor uses behind-camera edge correction',()=>{
 const right=computeReticle(preview(),at(300,300,{visible:false,behind:true}),1000,600,bearingOptions);
 assert.equal(right.offscreen,true);assert.equal(right.behind,true);near(right.x,978);near(right.y,300);near(right.edgeAngle,0);
 const behind=computeReticle(preview(),at(500,300,{visible:false,behind:true}),1000,600,bearingOptions);
 near(behind.x,500);near(behind.y,578);near(behind.edgeAngle,Math.PI/2);
 const clipped=computeReticle(preview(),at(500,300,{visible:false,behind:false}),1000,600,bearingOptions);
 assert.equal(clipped.offscreen,true);near(clipped.y,22);
});

test('invalid geometry cannot reposition a valid pointer and invalid display anchors produce no NaNs',()=>{
 const small=computeReticle(preview(),at(300,-50),40,30,{...bearingOptions,inset:22});
 assert.ok([small.x,small.y,small.edgeAngle].every(Number.isFinite));assert.equal(small.offscreen,true);
 for(const input of [null,preview({x:NaN}),preview({y:Infinity})])assert.equal(computeReticle(input,at(100,100),400,300),null);
 for(const dimensions of [[0,300],[400,0],[Infinity,300]])assert.equal(computeReticle(preview(),at(100,100),...dimensions),null);
 assert.equal(computeReticle(preview(),()=>({x:NaN,y:0,visible:false}),400,300,bearingOptions),null);
 const pointer=computeReticle(preview(),()=>({x:NaN,y:0,visible:false}),400,300,{pointer:{x:91,y:132}});
 assert.deepEqual({x:pointer.x,y:pointer.y},{x:91,y:132});assert.equal(pointer.projection,null);
});

test('drawing uses compact pixel-sized cross arms, a body dot or obstruction X, without a target ring',()=>{
 for(const kind of ['clear','target','blocked']){
  const context=canvasRecorder(),marker=computeReticle(preview({kind:kind==='target'?'actor':kind==='blocked'?'rock':null}),at(200,150),400,300);
  drawReticle(context,marker);
  const arcs=context.commands.filter(command=>command.method==='arc');
  assert.equal(arcs.length,kind==='target'?1:0);
  for(const arc of arcs)assert.ok(arc.args[2]<=2,'only the small body-contact dot can use a circle');
  for(const command of context.commands){
   assert.ok(command.args.every(Number.isFinite));
   assert.ok(Math.abs(command.args[0]-200)<=10&&Math.abs(command.args[1]-150)<=10,'no long aim line is drawn');
  }
  assert.ok(context.strokes.some(stroke=>stroke.color===marker.color&&stroke.width===2));
  assert.ok(context.strokes.some(stroke=>stroke.color==='#173c35'&&stroke.width===4));
  assert.equal(context.strokeStyle,'old-stroke');assert.equal(context.fillStyle,'old-fill');assert.equal(context.globalAlpha,.3);assert.equal(context.lineWidth,7);
  if(kind==='blocked')assert.ok(context.commands.some(command=>command.method==='moveTo'&&command.args[0]===197.5&&command.args[1]===147.5),'solid contact has a central X in addition to color');
 }
});

test('marker pixel dimensions stay constant across resolutions and edge chevrons remain within the viewport',()=>{
 const shapes=[];
 for(const [width,height] of [[400,300],[2000,1200]]){
  const marker=computeReticle(preview(),at(width/2,height/2),width,height),context=canvasRecorder();drawReticle(context,marker);
  shapes.push(context.commands.map(command=>({method:command.method,args:command.args.map((value,index)=>index===0?value-marker.x:index===1?value-marker.y:value)})));
 }
 assert.deepEqual(shapes[0],shapes[1]);
 for(const [x,y] of [[1500,300],[-500,300],[500,-600],[500,1000],[1500,900]]){
  const marker=computeReticle(preview({kind:'rock',blocked:true}),at(x,y),1000,600,bearingOptions),context=canvasRecorder();drawReticle(context,marker);
  for(const command of context.commands){assert.ok(command.args[0]>=4&&command.args[0]<=996);assert.ok(command.args[1]>=4&&command.args[1]<=596);}
  assert.ok(context.commands.some(command=>Math.hypot(command.args[0]-marker.x,command.args[1]-marker.y)>12),'the edge marker has a visible directional chevron');
 }
 const empty=canvasRecorder();drawReticle(empty,null);assert.deepEqual(empty.commands,[]);
});

test('stationary mouse pixels survive changing contact depth, hit kind, camera projection and screen edges',()=>{
 for(const pointer of [{x:1.25,y:2.75},{x:399.5,y:299.75},{x:163.4,y:211.6}])for(const kind of [null,'actor','guard','wall','rock','terrain','boundary'])for(const depth of [.2,8,80]){
  const input=preview({x:depth,y:depth*.3,z:-depth,kind,targetId:kind==='actor'||kind==='guard'?'target':null,blocked:['wall','rock','terrain','boundary'].includes(kind)});
  const marker=computeReticle(input,at(depth*30,-depth*12,{visible:depth<20,behind:depth>20}),400,300,{pointer});
  assert.deepEqual({x:marker.x,y:marker.y},pointer);assert.equal(marker.anchor,'pointer');assert.equal(marker.offscreen,false);assert.equal(marker.edgeAngle,null);
 }
});

test('touch overview uses a fixed standing-height bearing point regardless of first-hit distance or hop',()=>{
 const options={origin:{x:10,y:.45,z:-3},bearing:{x:3,z:4}},project=(x,y,z)=>({x:200+x*3,y:150+z*3-y*2,visible:true});let previous;
 for(const distance of [.3,2,9,21.6])for(const hop of [0,.4,1.2]){
  const marker=computeReticle(preview({x:10+distance*.6,y:.45+hop,z:-3+distance*.8,kind:distance<9?'wall':null,origin:{x:10,y:.45+hop,z:-3}}),project,800,600,options);
  assert.equal(marker.anchor,'bearing');near(Math.hypot(marker.anchorWorld.x-10,marker.anchorWorld.z+3),RETICLE_BEARING_DISTANCE);near(marker.anchorWorld.y,.45);
  const display={x:marker.x,y:marker.y};if(previous)assert.deepEqual(display,previous);previous=display;
 }
});

test('pointer lock explicitly selects the viewport center even if stale free-pointer pixels remain',()=>{
 const marker=computeReticle(preview({kind:'rock',blocked:true}),at(90,42),1280,800,{centered:true,pointer:{x:5,y:7},...bearingOptions});
 assert.deepEqual({x:marker.x,y:marker.y},{x:640,y:400});assert.equal(marker.anchor,'center');assert.equal(marker.offscreen,false);
});

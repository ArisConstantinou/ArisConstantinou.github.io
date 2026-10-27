import test from 'node:test';
import assert from 'node:assert/strict';
import {Raycaster,Vector3} from 'three';
import {createCreature} from '../src/creatures.js';
import {configureArcadeAppearance,applyArcadeAppearance} from '../src/arcade-appearance.js';
import {FROG_BODY,actorBodyBase,actorVerticalBounds,actorBodiesOverlapHeight} from '../src/arcade-actor-bounds.js';
import {PROJECTILE,setProjectileWorld,traceWorldSegment,worldRay,traceProjectile} from '../src/arcade-projectiles.js';

function arena(extra={}){
 const actor={id:'target',x:0,z:0,height:0,face:0,aimX:0,aimZ:1,load:0,...extra};
 return {state:{actors:[actor]},actor};
}
const frontRay=(state,x,y)=>worldRay(state,{x,y,z:3},{x:0,y:0,z:-1},6,{terrain:false});
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} should equal ${b}`);

test('torso, eye and low leg hits agree with actual posed arcade frog geometry',t=>{
 const model=configureArcadeAppearance(createCreature('frog',{seed:7,role:'hunter',tier:1,level:1}));t.after(()=>model.dispose());
 model.setEquipment({});model.update(1/60,{time:3,speed:0,hop:{phase:'idle',progress:0}});applyArcadeAppearance(model,{load:1});
 const {state,actor}=arena(),meshes=[model.mesh,model.group.getObjectByName('articulated-eyes')];
 // Each ray crosses a visible anatomical feature, not its bounding rectangle.
 for(const yaw of [0,Math.PI/2,-2.2]){
  actor.face=yaw;model.group.rotation.y=yaw;model.group.updateMatrixWorld(true);model.skeleton.update();
  for(const mesh of meshes)mesh.computeBoundingSphere();
  for(const [name,x,y] of [['torso',0,.43],['head',.34,.49],['eye',.28,.72],['hind leg',.62,.24],['forefoot',.46,.06]]){
   const c=Math.cos(yaw),s=Math.sin(yaw),origin={x:c*x+s*3,y,z:-s*x+c*3},direction={x:-s,y:0,z:-c};
   const visible=new Raycaster(new Vector3(origin.x,origin.y,origin.z),new Vector3(direction.x,0,direction.z),0,6).intersectObjects(meshes,false);
   assert.ok(visible.length>0,`${name} ray intersects visible mesh at yaw ${yaw}`);
   const hit=worldRay(state,origin,direction,6,{terrain:false});
   assert.equal(hit?.targetId,actor.id,`${name} ray also intersects its hurt volume at yaw ${yaw}`);
   assert.ok(hit.distance<=visible[0].distance+PROJECTILE.radius+.08,'a visible surface is not skipped behind the silhouette');
  }
 }
});

test('empty space beside a frog and above its low legs cannot be hit',()=>{
 const {state}=arena();
 for(const [x,y] of [[.98,.45],[1.1,.45],[.7,.7],[-.7,.7],[0,1.0]])assert.equal(frontRay(state,x,y),null,`clear air at (${x}, ${y}) stays clear`);
 assert.equal(frontRay(state,.62,.24)?.kind,'actor','the low wide hind leg itself remains hittable');
 assert.equal(frontRay(state,.28,.74)?.kind,'actor','the small higher eye remains hittable');
});

test('empty and full magazines have identical physical hit extents',()=>{
 const {state,actor}=arena();
 const rays=[[0,.45],[.35,.45],[.62,.24],[.98,.45],[.7,.7]];
 const empty=rays.map(([x,y])=>frontRay(state,x,y));
 for(const load of [.5,1,NaN,Infinity]){
  actor.load=load;
  assert.deepEqual(rays.map(([x,y])=>frontRay(state,x,y)),empty,'ammo cannot create a larger invisible target');
 }
});

test('the hurt volume turns with the actual displayed yaw when body interpolation differs from intent',()=>{
 const {state,actor}=arena({face:0});let renderedYaw=0;
 setProjectileWorld(state,{ground:()=>0,actorYaw:()=>renderedYaw});
 assert.equal(frontRay(state,.7,.55),null,'forward-facing high side is empty');
 renderedYaw=Math.PI/2;
 assert.equal(frontRay(state,.7,.55)?.targetId,actor.id,'turned head now occupies that space despite unchanged intent');
 renderedYaw=NaN;
 assert.equal(frontRay(state,.7,.55),null,'invalid provider uses finite logical facing');
});

test('ground height, a visible hop and mounting translate the complete hit volume in 3D',()=>{
 const {state,actor}=arena({height:.67});setProjectileWorld(state,{ground:()=>2});
 assert.equal(frontRay(state,0,.45),null);
 assert.equal(frontRay(state,0,2.45),null,'shots under an airborne body miss');
 assert.equal(frontRay(state,0,2.67+.45)?.targetId,actor.id);
 actor.catapultId='machine';
 assert.equal(frontRay(state,0,2.67+FROG_BODY.mountedOffset+.45)?.targetId,actor.id);
 assert.equal(frontRay(state,0,2.6),null,'mounting does not extend an invisible column down to the ground');
});

test('a fast complete segment and actual projectile agree on the nearest body contact and normal',()=>{
 const {state,actor}=arena();state.actors.push({...actor,id:'far',z:-2});
 const origin={x:.3,y:.45,z:4},end={x:.3,y:.45,z:-4};
 const swept=traceWorldSegment(state,origin,end,{terrain:false});
 const flight=traceProjectile(state,{...origin,dx:0,dy:0,dz:-1,followGround:false},8,{terrain:false});
 assert.equal(swept.targetId,'target');assert.equal(flight.targetId,'target');
 for(const axis of ['x','y','z'])near(swept[axis],flight[axis]);
 near(Math.hypot(swept.normal.x,swept.normal.y,swept.normal.z),1);assert.ok(swept.normal.z>0);
 actor.ko=true;assert.equal(traceWorldSegment(state,origin,end,{terrain:false}).targetId,'far');
 state.actors[1].eliminated=true;assert.equal(traceWorldSegment(state,origin,end,{terrain:false}),null);
});

test('melee height overlap shares terrain, hop and mount offsets and rejects a separated opponent',()=>{
 const a={height:0},b={height:0};
 near(actorBodyBase({height:.67,catapultId:'machine'},2),3.12);
 assert.deepEqual(actorVerticalBounds(a),{bottom:0,top:FROG_BODY.height});
 assert.equal(actorBodiesOverlapHeight(a,b),true);
 b.height=.67;assert.equal(actorBodiesOverlapHeight(a,b),true,'ordinary hop still overlaps the nearby body');
 b.height=1.1;assert.equal(actorBodiesOverlapHeight(a,b),false,'a high airborne opponent cannot be kicked through empty air');
 b.height=0;assert.equal(actorBodiesOverlapHeight(a,b,{groundB:1.2}),false);
 assert.equal(actorBodiesOverlapHeight(a,b,{groundA:1.2,groundB:1.2}),true);
});

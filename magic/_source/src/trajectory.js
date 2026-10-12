import * as CANNON from 'cannon-es';
import {fastCollisionTracking,CastleBroadphase} from './physics-config.js';
import {impactDamage,propSelfDamage,knockbackXZ} from './impact-rules.js';
import {igniteActor,consumeBurnDamage,consumeWoodDamage,spreadFire} from './fire.js';

export const TRAJECTORY_STEPS=180;
export const TRAJECTORY_DT=1/120;

function copyShape(shape){
  if(shape instanceof CANNON.Box)return new CANNON.Box(shape.halfExtents.clone());
  if(shape instanceof CANNON.Sphere)return new CANNON.Sphere(shape.radius);
  throw new Error(`Unsupported trajectory shape: ${shape.type}`);
}

// A separate physics world observes a shot without stepping or modifying the
// live world. Shapes must be copied: sharing them changes Shape.body ownership.
export class ThrowTrajectory {
  constructor(source){
    this.source=source;
    this.world=new CANNON.World({gravity:source.gravity.clone(),allowSleep:true});
    fastCollisionTracking(this.world);
    this.world.broadphase=new CastleBroadphase(this.world);
    this.world.solver.iterations=source.solver.iterations;
    Object.assign(this.world.defaultContactMaterial,{
      friction:source.defaultContactMaterial.friction,
      restitution:source.defaultContactMaterial.restitution,
    });
    for(const material of source.contactmaterials)this.world.addContactMaterial(material);
    this.bodies=new Map();this.projectile=null;this.impacts=[];
  }

  sync(){
    const live=new Set(this.source.bodies);
    for(const [source,body] of this.bodies)if(!live.has(source)){
      this.world.removeBody(body);this.bodies.delete(source);
    }
    for(const source of live){
      let body=this.bodies.get(source);
      if(!body){
        body=new CANNON.Body({mass:source.mass,material:source.material,type:source.type,
          fixedRotation:source.fixedRotation,allowSleep:source.allowSleep,
          linearDamping:source.linearDamping,angularDamping:source.angularDamping});
        source.shapes.forEach((shape,i)=>body.addShape(copyShape(shape),source.shapeOffsets[i].clone(),source.shapeOrientations[i].clone()));
        body.source=source;
        body.previewImpact=event=>{
          if(body!==this.projectile)return;
          const contact=event.contact,first=contact.bi===body;
          const offset=first?contact.ri:contact.rj;
          const normal=contact.ni.clone();if(first)normal.negate(normal);
          const other=event.body.source;
          const speed=Math.abs(contact.getImpactVelocityAlongNormal());
          const now=this.world.time,previous=body.previewContacts.get(event.body)??-10;
          if(speed>=4.2&&now-previous>=.45){
            body.previewContacts.set(event.body,now);
            const entity=body.source.entity,victim=event.body.source.entity;
            if(victim?.category==='actor'&&!victim.isPlayer&&!victim.ally&&!victim.dead){
              if(entity?.flammable&&body.previewFireState.burnUntil>now)igniteActor(event.body.previewFireState,now);
              event.body.previewHealth-=impactDamage(speed,body.mass,this.grip)*this.damageMultiplier;
              const push=knockbackXZ(event.body.position,body.position);
              event.body.velocity.x+=push.x;event.body.velocity.z+=push.z;
              if(event.body.previewHealth<=0)event.body.linearDamping=.7;
            }
            if(entity?.category==='actor'&&!entity.dead&&speed>6.5){body.previewHealth-=speed*3;if(body.previewHealth<=0)body.linearDamping=.7;}
            if(entity?.category==='prop'){
              body.previewHealth-=propSelfDamage(speed,entity.ephemeral);
              if(body.previewHealth<=0&&(entity.kind!=='stone'||entity.ephemeral))body.previewBreak=true;
            }
          }
          this.impacts.push({time:this.world.time,bodyId:other.previewId??other.id,kind:other.entity?.kind||'world',
            position:{x:body.position.x+offset.x,y:body.position.y+offset.y,z:body.position.z+offset.z},
            normal:{x:normal.x,y:normal.y,z:normal.z},ground:!!other.previewFloor&&normal.y>.55,breaksProjectile:body.previewBreak});
        };
        body.addEventListener('collide',body.previewImpact);
        this.bodies.set(source,body);this.world.addBody(body);
      }
      body.position.copy(source.position);body.previousPosition.copy(source.position);body.interpolatedPosition.copy(source.position);
      body.quaternion.copy(source.quaternion);body.previousQuaternion.copy(source.quaternion);body.interpolatedQuaternion.copy(source.quaternion);
      if(body.fixedRotation!==source.fixedRotation){body.fixedRotation=source.fixedRotation;body.updateMassProperties();}
      body.updateInertiaWorld(true);
      body.collisionFilterGroup=source.collisionFilterGroup;body.collisionFilterMask=source.collisionFilterMask;
      body.collisionResponse=source.collisionResponse;
      body.wakeUp();if(source.sleepState===CANNON.Body.SLEEPING)body.sleep();
      body.velocity.copy(source.velocity);body.angularVelocity.copy(source.angularVelocity);
      body.force.setZero();body.torque.setZero();body.aabbNeedsUpdate=true;
      body.linearDamping=source.linearDamping;body.previewHealth=source.entity?.hp??Infinity;body.previewBreak=false;body.previewContacts=new Map();
      const e=source.entity,t=this.source.previewTime||0;
      body.previewFireState={category:e?.category,isPlayer:e?.isPlayer,dead:e?.dead,flammable:e?.flammable,maxHp:e?.maxHp,woodFraction:e?.woodFraction,woodFuel:e?.woodFuel,woodExhausted:e?.woodExhausted,burnUntil:(e?.burnUntil||0)-t,nextBurnTick:e?.nextBurnTick===undefined?Infinity:e.nextBurnTick-t,burnLastTime:e?.burnUntil>t&&e.burnLastTime!==undefined?e.burnLastTime-t:undefined};
      if(body.world!==this.world)this.world.addBody(body);
    }
    this.world.time=0;this.world.stepnumber=0;this.world.accumulator=0;
    this.world.collisionMatrix.reset();this.world.collisionMatrixPrevious.reset();
    for(const keeper of [this.world.bodyOverlapKeeper,this.world.shapeOverlapKeeper]){
      keeper.current.length=0;keeper.previous.length=0;
    }
    this.world.broadphase.dirty=true;
  }

  predict(sourceBody,velocity,grip=0,damageMultiplier=1){
    const existing=this.source.previewHeldContacts??this.source.bodies.filter(b=>b!==sourceBody&&this.source.collisionMatrix.get(sourceBody,b)).map(b=>b.id);
    this.sync();this.impacts=[];
    this.grip=grip;
    this.damageMultiplier=damageMultiplier;
    const shot=this.bodies.get(sourceBody);this.projectile=shot;
    if(!shot)return {points:[],impacts:[],landing:null,computeMs:0};
    for(const body of this.bodies.values())if(existing.includes(body.source.previewId??body.source.id))this.world.collisionMatrix.set(shot,body,true);
    const started=performance.now(),speed=Math.hypot(velocity.x,velocity.z)||1;
    // releaseHeld restores player collisions before the actual shot.
    shot.collisionFilterMask=-1;
    if(sourceBody.entity?.category==='actor'){shot.fixedRotation=false;shot.updateMassProperties();shot.updateInertiaWorld(true);}
    shot.wakeUp();shot.velocity.set(velocity.x,velocity.y,velocity.z);
    shot.angularVelocity.set(-velocity.z/speed*4,2,velocity.x/speed*4);
    const points=[{x:shot.position.x,y:shot.position.y,z:shot.position.z}];
    let landing=null,groundAt=null,side=null,sideBody=null,sideAt=0,shotActive=true,broken=false;
    for(let i=0;i<TRAJECTORY_STEPS;i++){
      this.world.step(TRAJECTORY_DT);
      for(const contact of this.world.contacts){spreadFire(contact.bi.previewFireState,contact.bj.previewFireState,this.world.time);spreadFire(contact.bj.previewFireState,contact.bi.previewFireState,this.world.time);}
      for(const body of this.bodies.values())if(body.previewHealth>0){
        if(body.source.entity?.flammable){body.previewHealth-=consumeWoodDamage(body.previewFireState,this.world.time);if(body.previewHealth<=1e-6)body.previewBreak=true;}
        else if(body.source.entity?.category==='actor'&&!body.source.entity.dead){body.previewHealth-=consumeBurnDamage(body.previewFireState,this.world.time);if(body.previewHealth<=0)body.linearDamping=.7;}
      }
      // An existing held contact still transfers momentum on release, even
      // when Cannon correctly suppresses a new collide/damage event.
      for(const contact of this.world.contacts){
        const first=contact.bi===shot,other=first?contact.bj:contact.bj===shot?contact.bi:null;
        if(!other||this.impacts.some(hit=>hit.bodyId===(other.source.previewId??other.source.id)))continue;
        const offset=first?contact.ri:contact.rj,normal=contact.ni.clone();if(first)normal.negate(normal);
        this.impacts.push({time:this.world.time-TRAJECTORY_DT,bodyId:other.source.previewId??other.source.id,kind:other.source.entity?.kind||'world',
          position:{x:shot.position.x+offset.x,y:shot.position.y+offset.y,z:shot.position.z+offset.z},
          normal:{x:normal.x,y:normal.y,z:normal.z},ground:!!other.source.previewFloor&&normal.y>.55,breaksProjectile:false});
      }
      if(shotActive)points.push({x:shot.position.x,y:shot.position.y,z:shot.position.z});
      if(!sideBody){
        const hit=this.impacts.find(hit=>['guard','archer','heavy','boss'].includes(hit.kind));
        if(hit){
          sideBody=[...this.bodies.values()].find(b=>(b.source.previewId??b.source.id)===hit.bodyId);
          side={bodyId:hit.bodyId,points:[]};sideAt=this.world.time;
        }
      }
      if(sideBody)side.points.push({x:sideBody.position.x,y:sideBody.position.y,z:sideBody.position.z});
      const ground=this.impacts.find(hit=>hit.ground);
      if(ground&&!landing){landing=ground.position;groundAt=this.world.time;}
      if(shot.previewBreak&&!broken){broken=true;shotActive=false;landing=this.impacts.at(-1).position;this.world.removeBody(shot);}
      if(!shotActive&&!sideBody)break;
      if(!sideBody&&groundAt!==null&&this.world.time-groundAt>.15&&shot.velocity.length()<.75)break;
      if(sideBody&&this.world.time-sideAt>=.5)break;
      if(shot.position.y<-2)break;
    }
    this.projectile=null;
    return {points,impacts:this.impacts,landing,side,broken,computeMs:performance.now()-started};
  }
}

// The render thread sends immutable numbers, never live physics objects.
export function captureTrajectoryWorld(world,heldBody=null,time=0){
  const materials=new Map();
  for(const body of world.bodies)if(body.material)materials.set(body.material.id,body.material);
  const vector=v=>({x:v.x,y:v.y,z:v.z}),quaternion=q=>({...vector(q),w:q.w});
  return {time,gravity:vector(world.gravity),iterations:world.solver.iterations,
    heldContacts:heldBody?world.bodies.filter(b=>b!==heldBody&&world.collisionMatrix.get(heldBody,b)).map(b=>b.id):[],
    defaultContact:{friction:world.defaultContactMaterial.friction,restitution:world.defaultContactMaterial.restitution},
    materials:[...materials.values()].map(m=>({id:m.id,name:m.name,friction:m.friction,restitution:m.restitution})),
    contacts:world.contactmaterials.map(c=>({materials:c.materials.map(m=>m.id),friction:c.friction,restitution:c.restitution})),
    bodies:world.bodies.map(b=>({id:b.id,mass:b.mass,type:b.type,material:b.material?.id,fixedRotation:b.fixedRotation,
      allowSleep:b.allowSleep,sleepState:b.sleepState,linearDamping:b.linearDamping,angularDamping:b.angularDamping,
      group:b.collisionFilterGroup,mask:b.collisionFilterMask,response:b.collisionResponse,entity:b.entity?{kind:b.entity.kind,category:b.entity.category,isPlayer:b.entity.isPlayer,ally:b.entity.ally,dead:b.entity.dead,hp:b.entity.hp,maxHp:b.entity.maxHp,ephemeral:b.entity.ephemeral,flammable:b.entity.flammable,woodFraction:b.entity.woodFraction,woodFuel:b.entity.woodFuel,woodExhausted:b.entity.woodExhausted,burnLastTime:b.entity.burnLastTime,burnUntil:b.entity.burnUntil,nextBurnTick:b.entity.nextBurnTick}:null,floor:!!b.previewFloor,
      position:vector(b.position),velocity:vector(b.velocity),angularVelocity:vector(b.angularVelocity),quaternion:quaternion(b.quaternion),
      shapes:b.shapes.map((shape,i)=>({type:shape.type,radius:shape.radius,extents:shape.halfExtents?vector(shape.halfExtents):undefined,
        offset:vector(b.shapeOffsets[i]),orientation:quaternion(b.shapeOrientations[i])}))}))};
}

export class TrajectorySnapshotWorld{
  constructor(snapshot){
    this.world=new CANNON.World({gravity:new CANNON.Vec3(snapshot.gravity.x,snapshot.gravity.y,snapshot.gravity.z),allowSleep:true});
    fastCollisionTracking(this.world);
    this.world.broadphase=new CastleBroadphase(this.world);
    this.world.solver.iterations=snapshot.iterations;
    Object.assign(this.world.defaultContactMaterial,snapshot.defaultContact);
    this.materials=new Map(snapshot.materials.map(m=>[m.id,new CANNON.Material({name:m.name,friction:m.friction,restitution:m.restitution})]));
    for(const c of snapshot.contacts)this.world.addContactMaterial(new CANNON.ContactMaterial(this.materials.get(c.materials[0]),this.materials.get(c.materials[1]),{friction:c.friction,restitution:c.restitution}));
    this.bodies=new Map();
  }
  apply(snapshot){
    this.world.previewTime=snapshot.time||0;
    this.world.previewHeldContacts=snapshot.heldContacts;
    const live=new Set(snapshot.bodies.map(b=>b.id));
    for(const [id,b] of this.bodies)if(!live.has(id)){this.world.removeBody(b);this.bodies.delete(id);}
    for(const s of snapshot.bodies){
      let b=this.bodies.get(s.id);
      if(!b){
        b=new CANNON.Body({mass:s.mass,type:s.type,material:this.materials.get(s.material),fixedRotation:s.fixedRotation,
          allowSleep:s.allowSleep,linearDamping:s.linearDamping,angularDamping:s.angularDamping});
        for(const shape of s.shapes){
          const actual=shape.type===CANNON.Shape.types.BOX?new CANNON.Box(new CANNON.Vec3(shape.extents.x,shape.extents.y,shape.extents.z)):new CANNON.Sphere(shape.radius);
          b.addShape(actual,new CANNON.Vec3(shape.offset.x,shape.offset.y,shape.offset.z),new CANNON.Quaternion(shape.orientation.x,shape.orientation.y,shape.orientation.z,shape.orientation.w));
        }
        b.previewId=s.id;b.previewFloor=s.floor;
        this.bodies.set(s.id,b);this.world.addBody(b);
      }
      b.position.set(s.position.x,s.position.y,s.position.z);b.quaternion.set(s.quaternion.x,s.quaternion.y,s.quaternion.z,s.quaternion.w);
      b.entity=s.entity;
      b.velocity.set(s.velocity.x,s.velocity.y,s.velocity.z);b.angularVelocity.set(s.angularVelocity.x,s.angularVelocity.y,s.angularVelocity.z);
      b.linearDamping=s.linearDamping;b.angularDamping=s.angularDamping;
      if(b.fixedRotation!==s.fixedRotation){b.fixedRotation=s.fixedRotation;b.updateMassProperties();}
      b.updateInertiaWorld(true);
      b.collisionFilterGroup=s.group;b.collisionFilterMask=s.mask;b.collisionResponse=s.response;b.sleepState=s.sleepState;b.aabbNeedsUpdate=true;
    }
  }
}

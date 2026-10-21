import * as THREE from 'three';

const UP = new THREE.Vector3(0, 1, 0);
const clamp = THREE.MathUtils.clamp;
const smooth = t => t * t * (3 - 2 * t);
const angleDelta = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));

/** Distance-driven foot contacts. Only a swinging foot may change its anchor.
 * Positions are in world metres; headings are independent of travel direction.
 * The same contacts survive strafing, aim turns, casting and upper-body attacks.
 */
export class ContactGait {
  constructor(offsets, { mechanical = false, continuous = false, stride = .72, lift = .17, legLength = .8 } = {}) {
    this.offsets = offsets.map(v => v.clone());
    this.mechanical = mechanical; this.continuous=continuous;this.stride = stride; this.lift = lift; this.legLength = legLength; this.started = false;
    this.runningThreshold = Math.min(2.7, legLength*4.5);
    this.feet = offsets.map(() => ({ anchor: new THREE.Vector3(), target: new THREE.Vector3(), from: new THREE.Vector3(), endpoint: new THREE.Vector3(), previous: new THREE.Vector3(), yaw: 0, fromYaw: 0, stance: true, lift: 0, initialized: false, liftAt:0, swingStart:0, swingSpan:1, swingLift:0, swingStride:0, swingDuty:0 }));
    this.last = new THREE.Vector3(); this.direction = new THREE.Vector3(0, 0, 1);
    this.ideal = new THREE.Vector3(); this.end = new THREE.Vector3();
    this.phase = 0; this.speed = 0; this.travel = 0; this.initialized = false; this.lastYaw = 0; this.scale = 1; this.runBlend=0;
  }
  reset() { this.initialized = false; this.phase = 0; this.speed = 0; this.travel = 0; this.started = false; }
  idealFoot(i, position, yaw, out) {
    const o = this.offsets[i], s = this.scale, c = Math.cos(yaw), n = Math.sin(yaw);
    return out.set(position.x + (o.x * c + o.z * n) * s, position.y + o.y * s, position.z + (o.z * c - o.x * n) * s);
  }
  update(dt, position, yaw, { scale = 1, disabled = false } = {}) {
    if(!this.mechanical&&this.continuous)return this.updateHuman(dt,position,yaw,{scale,disabled});
    this.scale = scale;
    const dx = position.x - this.last.x, dz = position.z - this.last.z, distance = Math.hypot(dx, dz);
    if (!this.initialized || disabled || distance > 3 * scale) {
      for (let i = 0; i < 2; i++) {
        const f = this.feet[i]; this.idealFoot(i, position, yaw, f.anchor); f.target.copy(f.anchor); f.from.copy(f.anchor);
        f.yaw = f.fromYaw = yaw; f.stance = true; f.lift = 0; f.initialized = false;
      }
      this.last.copy(position); this.lastYaw = yaw; this.initialized = !disabled; this.speed = 0; this.phase = 0; this.started = false;
      return this;
    }
    if (dt <= 0) return this;
    this.speed = distance / dt; this.travel += distance;
    const turn = Math.abs(angleDelta(this.lastYaw, yaw));
    if (distance > .0001) this.direction.set(dx / distance, 0, dz / distance);
    const running = !this.mechanical && this.speed > this.runningThreshold*scale;
    const stepLength = (running ? Math.min(1.05,Math.max(this.legLength*.85,this.speed/scale*.22)) : this.stride) * scale;
    // Short stylized legs cannot support an adult-sized stride. At running
    // speeds use a brief planted push and a real flight interval, not skating.
    const duty = running ? Math.min(.39, this.legLength * .5 * scale / stepLength) : this.mechanical ? .52 : .57;
    let settle = false;
    for (let i = 0; i < 2; i++) {
      this.idealFoot(i, position, yaw, this.ideal);
      if (this.feet[i].target.distanceTo(this.ideal) > .07 * scale || Math.abs(angleDelta(this.feet[i].yaw, yaw)) > .15) settle = true;
    }
    const advancing = distance > .0001 || turn > .001 || settle || this.feet.some(f => !f.stance);
    // Begin a mechanical corrective step at lift-off, not halfway through
    // the right foot's swing (which would pop it up in a single frame).
    if(advancing&&!this.started){this.phase=this.mechanical?duty-.5:duty*.5;this.started=true;}
    if (advancing) this.phase += Math.max(distance / (2 * stepLength),turn/(2*.45),distance>.0001?0:dt * (this.mechanical ? 1.15 : 1.65));
    const cycleSeconds = 2 * stepLength / Math.max(this.speed, this.mechanical ? 1.5 : 1.8);
    for (let i = 0; i < 2; i++) {
      const f = this.feet[i], p = (this.phase + i * .5) % 1, stance = !advancing || p < duty;
      this.idealFoot(i, position, yaw, this.ideal);
      if (stance) {
        if (!f.stance) {
          f.anchor.copy(this.ideal).addScaledVector(this.direction, this.speed > .12 ? stepLength * duty : 0);
          f.yaw = yaw;
        }
        f.target.copy(f.anchor); f.lift = 0;
      } else {
        if (f.stance || !f.initialized) { f.from.copy(f.target); f.fromYaw = f.yaw; }
        const t = clamp((p - duty) / (1 - duty), 0, 1), easing = smooth(t);
        this.end.copy(this.ideal).addScaledVector(this.direction, this.speed > .12 ? this.speed * (1 - t) * cycleSeconds * (1 - duty) + stepLength * duty : 0);
        f.target.copy(f.from).lerp(this.end, easing);
        f.lift = Math.sin(Math.PI * t) * Math.min(this.lift + (running ? .06 : 0),this.legLength*.52) * scale;
        f.target.y += f.lift;
        f.yaw = f.fromYaw + angleDelta(f.fromYaw, yaw) * easing;
      }
      f.stance = stance; f.initialized = true;
    }
    this.last.copy(position); this.lastYaw = yaw;
    return this;
  }
  updateHuman(dt,position,yaw,{scale,disabled}){
    this.scale=scale;
    const dx=position.x-this.last.x,dz=position.z-this.last.z,distance=Math.hypot(dx,dz);
    if(!this.initialized||disabled||distance>3*scale){
      for(let i=0;i<2;i++){const f=this.feet[i];this.idealFoot(i,position,yaw,f.anchor);f.target.copy(f.anchor);f.from.copy(f.anchor);f.endpoint.copy(f.anchor);f.yaw=f.fromYaw=yaw;f.stance=true;f.lift=0;f.initialized=true;f.liftAt=.57-i*.5;}
      this.last.copy(position);this.lastYaw=yaw;this.initialized=!disabled;this.speed=0;this.phase=0;this.started=false;this.runBlend=0;return this;
    }
    if(dt<=0)return this;
    this.speed=distance/dt;this.travel+=distance;
    const turn=Math.abs(angleDelta(this.lastYaw,yaw));if(distance>.0001)this.direction.set(dx/distance,0,dz/distance);
    this.runBlend+=((this.speed>this.runningThreshold*scale?1:0)-this.runBlend)*(1-Math.exp(-dt*10));
    const runStride=Math.min(this.legLength*.9,Math.max(this.legLength*.65,this.speed/scale*.16));
    const stride=THREE.MathUtils.lerp(this.stride,runStride,this.runBlend)*scale;
    const runDuty=Math.min(.30,this.legLength*.4*scale/Math.max(.001,stride)),duty=THREE.MathUtils.lerp(.57,runDuty,this.runBlend);
    let settle=false;for(let i=0;i<2;i++){this.idealFoot(i,position,yaw,this.ideal);if(this.feet[i].target.distanceTo(this.ideal)>.07*scale||Math.abs(angleDelta(this.feet[i].yaw,yaw))>.15)settle=true;}
    const advancing=distance>.0001||turn>.001||settle||this.feet.some(f=>!f.stance);
    if(advancing&&!this.started){
      // The first moving frame must lift from the existing planted contact.
      // A random/global mid-swing phase cannot be used as its starting pose.
      this.phase=duty-.5;for(let i=0;i<2;i++)this.feet[i].liftAt=duty-i*.5;this.started=true;
    }
    if(advancing)this.phase+=Math.max(distance/(2*stride),turn/(2*.45),distance>.0001?0:dt*1.65);
    else this.started=false;
    for(let i=0;i<2;i++){
      const f=this.feet[i];this.idealFoot(i,position,yaw,this.ideal);
      let lifting=false;
      const needsStep=distance>.0001||turn>.001||f.anchor.distanceTo(this.ideal)>.07*scale||Math.abs(angleDelta(f.yaw,yaw))>.15;
      const supportReach=f.anchor.distanceTo(this.ideal)>this.legLength*.40*scale;
      if(f.stance&&advancing&&needsStep&&(this.phase>=f.liftAt||supportReach)){
        f.from.copy(f.target);f.fromYaw=f.yaw;f.swingStart=this.phase;f.swingSpan=1-duty;f.swingDuty=duty;f.swingStride=stride;f.swingLift=Math.min(this.lift+this.legLength*.055*this.runBlend,this.legLength*.17)*scale;f.stance=false;
        const seconds=2*stride/Math.max(this.speed,1.8);
        f.swingElapsed=0;f.swingSeconds=clamp(seconds*f.swingSpan,.06,.36);lifting=true;
        f.endpoint.copy(this.ideal).addScaledVector(this.direction,this.speed>.12?this.speed*f.swingSeconds+stride*duty:0);
      }
      if(f.stance){f.target.copy(f.anchor);f.lift=0;continue;}
      // Freeze an airborne foot's arc parameters at lift-off. Changing the
      // walk/run duty ratio mid-step otherwise restarts it above the floor.
      // Keep phase continuous on acceleration, but do not force a short leg
      // to remain airborne for an adult-sized minimum of 200 milliseconds.
      // Otherwise its body travels beyond both feet before either can land.
      const secondsLimit=Math.max(.06,this.legLength*scale*.85/Math.max(this.speed,.1));
      if(f.swingSeconds>secondsLimit){f.swingElapsed*=secondsLimit/f.swingSeconds;f.swingSeconds=secondsLimit;}
      if(!lifting)f.swingElapsed+=dt;
      const t=clamp(f.swingElapsed/f.swingSeconds,0,1),easing=smooth(t);
      this.end.copy(this.ideal).addScaledVector(this.direction,this.speed>.12?this.speed*(1-t)*f.swingSeconds+f.swingStride*f.swingDuty:0);
      f.endpoint.lerp(this.end,1-Math.exp(-dt*12));
      f.previous.copy(f.target);f.target.copy(f.from).lerp(f.endpoint,easing);f.lift=Math.sin(Math.PI*t)*f.swingLift;f.target.y+=f.lift;f.yaw=f.fromYaw+angleDelta(f.fromYaw,yaw)*easing;
      // Rapid input reversals may move the landing prediction by metres.
      // Retarget an airborne foot at a finite speed; never teleport it to a
      // new prediction, including the final landing frame.
      const travel=f.target.distanceTo(f.previous),maximum=11*scale*dt;
      if(travel>maximum)f.target.sub(f.previous).multiplyScalar(maximum/travel).add(f.previous);
      f.target.y=clamp(f.target.y,f.previous.y-2*scale*dt,f.previous.y+2*scale*dt);
      f.lift=Math.max(0,f.target.y-this.ideal.y);
      if(t>=1&&f.target.distanceTo(f.endpoint)<.00001){f.anchor.copy(f.target);f.lift=0;f.stance=true;f.yaw=yaw;f.liftAt=Math.floor(this.phase+i*.5)+duty-i*.5;if(f.liftAt<=this.phase+.00001)f.liftAt+=1;}
    }
    this.last.copy(position);this.lastYaw=yaw;return this;
  }
  snapshot() {
    return { speed: this.speed, travel: this.travel, phase: this.phase % 1, feet: this.feet.map(f => ({ stance: f.stance, lift: f.lift, yaw: f.yaw, anchor: f.anchor.toArray(), target: f.target.toArray() })) };
  }
}

/** Analytic two-bone IK, measured from the actual cloned rig rather than axes
 * or names assumed from an exporter. The knee pole is the actor's forward side.
 */
export function createLegSolver(upper, lower, foot) {
  if (!upper || !lower || !foot) throw new Error('Locomotion requires hip, knee and ankle bones.');
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), dir = new THREE.Vector3(), bend = new THREE.Vector3(), knee = new THREE.Vector3(), from = new THREE.Vector3(), to = new THREE.Vector3();
  const delta = new THREE.Quaternion(), world = new THREE.Quaternion(), parent = new THREE.Quaternion();
  const decompositionPosition = new THREE.Vector3(), decompositionScale = new THREE.Vector3();
  function orient(bone, current, desired, direct) {
    if (current.lengthSq() < 1e-10 || desired.lengthSq() < 1e-10) return;
    delta.setFromUnitVectors(current.normalize(), desired.normalize());
    if (direct) {
      bone.matrixWorld.decompose(decompositionPosition, world, decompositionScale);
    } else {
      bone.getWorldQuaternion(world);
    }
    world.premultiply(delta);
    if (direct) bone.parent.matrixWorld.decompose(decompositionPosition, parent, decompositionScale);
    else bone.parent.getWorldQuaternion(parent);
    parent.invert(); bone.quaternion.copy(parent.multiply(world)).normalize();
    bone.updateWorldMatrix(!direct,false);
  }
  return { upper, lower, foot, solve(target, pole, footRotation) {
    // The known three-joint chain has no intervening mutations: refresh its
    // ancestors once, then only the joints changed by this solve. Recheck the
    // hierarchy each call; other rigs retain the original ancestor-safe path.
    const direct = upper.parent !== null && lower.parent === upper && foot.parent === lower;
    if (direct) {
      upper.parent.updateWorldMatrix(true,false);
      upper.updateWorldMatrix(false,false); lower.updateWorldMatrix(false,false); foot.updateWorldMatrix(false,false);
      a.setFromMatrixPosition(upper.matrixWorld); b.setFromMatrixPosition(lower.matrixWorld); c.setFromMatrixPosition(foot.matrixWorld);
    } else {
      upper.getWorldPosition(a); lower.getWorldPosition(b); foot.getWorldPosition(c);
    }
    const l1 = a.distanceTo(b), l2 = b.distanceTo(c);
    dir.copy(target).sub(a); const wanted = dir.length(), d = clamp(wanted, Math.abs(l1 - l2) + .00001, l1 + l2 - .00001); dir.normalize();
    const along = (l1 * l1 - l2 * l2 + d * d) / (2 * d), height = Math.sqrt(Math.max(0, l1 * l1 - along * along));
    bend.copy(pole).addScaledVector(dir, -pole.dot(dir));
    if (bend.lengthSq() < .00001) bend.set(1, 0, 0).addScaledVector(dir, -dir.x);
    bend.normalize(); knee.copy(a).addScaledVector(dir, along).addScaledVector(bend, height);
    orient(upper, from.copy(b).sub(a), to.copy(knee).sub(a), direct);
    if (direct) {
      lower.updateWorldMatrix(false,false); foot.updateWorldMatrix(false,false);
      b.setFromMatrixPosition(lower.matrixWorld); c.setFromMatrixPosition(foot.matrixWorld);
    } else {
      lower.getWorldPosition(b); foot.getWorldPosition(c);
    }
    orient(lower, from.copy(c).sub(b), to.copy(target).sub(b), direct);
    if (footRotation) {
      if (direct) foot.parent.matrixWorld.decompose(decompositionPosition, parent, decompositionScale);
      else foot.parent.getWorldQuaternion(parent);
      parent.invert(); foot.quaternion.copy(parent.multiply(footRotation)).normalize();
      if (!direct) foot.updateWorldMatrix(true,false);
    }
    if (direct) { foot.updateWorldMatrix(false,false); c.setFromMatrixPosition(foot.matrixWorld); }
    else foot.getWorldPosition(c);
    return c.distanceTo(target);
  } };
}

/** Overlay planted legs on authored upper-body clips; keep immutable meshes,
 * skin weights and gameplay pivots. All objects are allocated once per actor.
 */
export function createRigLocomotion(group, model, legs, options = {}) {
  group.updateMatrixWorld(true);
  const rotation = new THREE.Quaternion(), inverse = group.getWorldQuaternion(new THREE.Quaternion()).invert();
  const offsets = legs.map(l => group.worldToLocal(l.foot.getWorldPosition(new THREE.Vector3())));
  const neutral = legs.map(l => l.foot.getWorldQuaternion(new THREE.Quaternion()).premultiply(inverse));
  const solvers = legs.map(l => createLegSolver(l.upper, l.lower, l.foot));
  // A human cannot rotate the pelvis instantly through planted, short legs.
  // Let the lower body step into the turn, retaining an anatomical waist twist.
  const hips=!options.mechanical&&legs[0].upper.parent===legs[1].upper.parent?legs[0].upper.parent:null;
  const spine=hips?.children.find(b=>/^(spine|chest|torso)/i.test(b.name));
  const hipsPose=new THREE.Quaternion(),spinePose=new THREE.Quaternion(),hipsWorld=new THREE.Quaternion(),spineWorld=new THREE.Quaternion(),parentWorld=new THREE.Quaternion(),turnQ=new THREE.Quaternion();
  let turnApplied=false,legYaw=null;
  const a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3();
  const initialScale=group.getWorldScale(new THREE.Vector3()).y;
  const lengths=legs.map(l=>{l.upper.getWorldPosition(a);l.lower.getWorldPosition(b);l.foot.getWorldPosition(c);return (a.distanceTo(b)+b.distanceTo(c))/initialScale;});
  const legLength=Math.min(...lengths);
  // A modelling/idle stance is not a walking lane. The original rigs put the
  // ankles about twice as far apart as the hip joints. Keep the boots just
  // outside their own hips, measured in actor space, without changing the rig.
  if(!options.mechanical){
    const hipOffsets=legs.map(l=>group.worldToLocal(l.upper.getWorldPosition(new THREE.Vector3())));
    const centre=(hipOffsets[0].x+hipOffsets[1].x)*.5;
    for(let i=0;i<2;i++)offsets[i].x=hipOffsets[i].x+Math.sign(hipOffsets[i].x-centre)*legLength*.035;
  }
  const continuous=!options.mechanical;
  const gait = new ContactGait(offsets, {...options,continuous,legLength,lift:options.mechanical?options.lift:Math.min(options.lift??.07,legLength*.085),stride:options.mechanical?options.stride:Math.min(options.stride||.72,legLength*.5)}), position = new THREE.Vector3(), scale = new THREE.Vector3(), pole = new THREE.Vector3(), footQ = new THREE.Quaternion();
  const errors = [0, 0]; let lastBodyOffset = 0,lastLateralOffset=0,supportBlend=0,bodyCompression=0;
  group.userData.locomotion = { get snapshot() { return { ...gait.snapshot(), yaw:legYaw, errors: [...errors] }; } };
  function reset() { beforeAnimation(); gait.reset();legYaw=null;supportBlend=0;bodyCompression=0; }
  function beforeAnimation() { model.position.y -= lastBodyOffset; model.position.x-=lastLateralOffset;lastBodyOffset = lastLateralOffset = 0;if(turnApplied){hips.quaternion.copy(hipsPose);spine.quaternion.copy(spinePose);turnApplied=false;} }
  function update(dt, { grounded = true, dead = false, airborne = false, footOverride = null, bodyOffset = 0, align = null, heading:requestedHeading = null } = {}) {
    // One ancestor refresh supplies the same position, scale and rotation.
    group.updateWorldMatrix(true,false); group.matrixWorld.decompose(position,rotation,scale);
    pole.set(0, 0, 1).applyQuaternion(rotation); pole.y = 0; pole.normalize();
    const aimYaw = Math.atan2(pole.x, pole.z), disabled = !grounded || airborne || dead;
    if(disabled)legYaw=null;
    if(hips&&spine&&!disabled){
      const dx=position.x-gait.last.x,dz=position.z-gait.last.z;
      const traveling=options.travelFacing&&gait.initialized&&dt>0&&Math.hypot(dx,dz)>dt*.12;
      const heading=options.travelFacing&&Number.isFinite(requestedHeading)?requestedHeading:traveling?Math.atan2(dx,dz):aimYaw;
      const turnRate=options.travelFacing?5.6:2.8;
      legYaw??=aimYaw;legYaw+=clamp(angleDelta(legYaw,heading),-dt*turnRate,dt*turnRate);
    }
    const yaw=legYaw??aimYaw;pole.set(Math.sin(yaw),0,Math.cos(yaw));
    gait.update(dt, position, yaw, { scale: scale.y, disabled });
    if (disabled) {supportBlend=0;bodyCompression=0;return;}
    if(align){align(gait);group.updateWorldMatrix(true,false);}
    if(hips&&spine&&Math.abs(angleDelta(aimYaw,yaw))>.0001){
      hipsPose.copy(hips.quaternion);spinePose.copy(spine.quaternion);spine.getWorldQuaternion(spineWorld);hips.getWorldQuaternion(hipsWorld);
      turnQ.setFromAxisAngle(UP,angleDelta(aimYaw,yaw));hipsWorld.premultiply(turnQ);hips.parent.getWorldQuaternion(parentWorld).invert();hips.quaternion.copy(parentWorld.multiply(hipsWorld));hips.updateWorldMatrix(true,false);
      const twist=angleDelta(yaw,aimYaw),excess=twist-clamp(twist,-Math.PI*5/12,Math.PI*5/12);
      turnQ.setFromAxisAngle(UP,-excess);spineWorld.premultiply(turnQ);spine.parent.getWorldQuaternion(parentWorld).invert();spine.quaternion.copy(parentWorld.multiply(spineWorld));spine.updateWorldMatrix(true,false);turnApplied=true;
    }
    const moving = gait.speed > .12 || gait.feet.some(f => !f.stance);
    // Make room for an actual bent knee and forward/rear support contact.
    // This offset is visual only: it never alters the physical body or height.
    supportBlend+=((moving?1:0)-supportBlend)*(1-Math.exp(-dt*10));
    const support=supportBlend;
    lastBodyOffset = bodyOffset - support*(options.mechanical?.055:legLength*.025);
    lastLateralOffset=support*(options.mechanical?.065:legLength*(options.sway??.018))*Math.cos(gait.phase*Math.PI*2);
    model.position.y += lastBodyOffset;model.position.x+=lastLateralOffset;group.updateWorldMatrix(true,false);
    // Preserve actual reachable contacts through authored hip bob/attack poses.
    // Solve the necessary body compression from measured limbs, not a guessed
    // universal pelvis height. Bone lengths and the physics capsule stay fixed.
    let compression=0;
    for(let i=0;i<2;i++)if(gait.feet[i].stance||footOverride||options.allFeetReach||continuous){
      legs[i].upper.getWorldPosition(a);const target=footOverride?.[i]||gait.feet[i].target;
      const reach=lengths[i]*scale.y-.00002,planar=Math.hypot(a.x-target.x,a.z-target.z);
      const maxHeight=Math.sqrt(Math.max(0,reach*reach-planar*planar));compression=Math.min(compression,target.y+maxHeight-a.y);
    }
    if(continuous)bodyCompression=Math.min(compression,bodyCompression*Math.exp(-dt*10));
    else bodyCompression=compression;
    if(bodyCompression<0){const offset=bodyCompression/scale.y;model.position.y+=offset;lastBodyOffset+=offset;group.updateWorldMatrix(true,false);}
    for (let i = 0; i < 2; i++) {
      const f = gait.feet[i]; footQ.setFromAxisAngle(UP, f.yaw).multiply(neutral[i]);
      errors[i] = solvers[i].solve(footOverride?.[i] || f.target, pole, footQ);
    }
  }
  return { gait, offsets, neutral, solvers, beforeAnimation, update, reset, snapshot: () => ({ ...gait.snapshot(), yaw:legYaw, errors: [...errors] }) };
}

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
  constructor(offsets, { mechanical = false, stride = .72, lift = .17, legLength = .8 } = {}) {
    this.offsets = offsets.map(v => v.clone());
    this.mechanical = mechanical; this.stride = stride; this.lift = lift; this.legLength = legLength; this.started = false;
    this.runningThreshold = Math.min(2.7, legLength*4.5);
    this.feet = offsets.map(() => ({ anchor: new THREE.Vector3(), target: new THREE.Vector3(), from: new THREE.Vector3(), yaw: 0, fromYaw: 0, stance: true, lift: 0, initialized: false }));
    this.last = new THREE.Vector3(); this.direction = new THREE.Vector3(0, 0, 1);
    this.ideal = new THREE.Vector3(); this.end = new THREE.Vector3();
    this.phase = 0; this.speed = 0; this.travel = 0; this.initialized = false; this.lastYaw = 0; this.scale = 1;
  }
  reset() { this.initialized = false; this.phase = 0; this.speed = 0; this.travel = 0; this.started = false; }
  idealFoot(i, position, yaw, out) {
    const o = this.offsets[i], s = this.scale, c = Math.cos(yaw), n = Math.sin(yaw);
    return out.set(position.x + (o.x * c + o.z * n) * s, position.y + o.y * s, position.z + (o.z * c - o.x * n) * s);
  }
  update(dt, position, yaw, { scale = 1, disabled = false } = {}) {
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
  function orient(bone, current, desired) {
    if (current.lengthSq() < 1e-10 || desired.lengthSq() < 1e-10) return;
    delta.setFromUnitVectors(current.normalize(), desired.normalize());
    bone.getWorldQuaternion(world).premultiply(delta);
    bone.parent.getWorldQuaternion(parent).invert(); bone.quaternion.copy(parent.multiply(world)).normalize();
    bone.updateMatrixWorld(true);
  }
  return { upper, lower, foot, solve(target, pole, footRotation) {
    upper.getWorldPosition(a); lower.getWorldPosition(b); foot.getWorldPosition(c);
    const l1 = a.distanceTo(b), l2 = b.distanceTo(c);
    dir.copy(target).sub(a); const wanted = dir.length(), d = clamp(wanted, Math.abs(l1 - l2) + .00001, l1 + l2 - .00001); dir.normalize();
    const along = (l1 * l1 - l2 * l2 + d * d) / (2 * d), height = Math.sqrt(Math.max(0, l1 * l1 - along * along));
    bend.copy(pole).addScaledVector(dir, -pole.dot(dir));
    if (bend.lengthSq() < .00001) bend.set(1, 0, 0).addScaledVector(dir, -dir.x);
    bend.normalize(); knee.copy(a).addScaledVector(dir, along).addScaledVector(bend, height);
    orient(upper, from.copy(b).sub(a), to.copy(knee).sub(a));
    lower.getWorldPosition(b); foot.getWorldPosition(c);
    orient(lower, from.copy(c).sub(b), to.copy(target).sub(b));
    if (footRotation) {
      foot.parent.getWorldQuaternion(parent).invert(); foot.quaternion.copy(parent.multiply(footRotation)).normalize(); foot.updateMatrixWorld(true);
    }
    foot.getWorldPosition(c);
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
  const lengths=legs.map(l=>{l.upper.getWorldPosition(a);l.lower.getWorldPosition(b);l.foot.getWorldPosition(c);return a.distanceTo(b)+b.distanceTo(c);});
  const legLength=Math.min(...lengths);
  const gait = new ContactGait(offsets, {...options,legLength,stride:options.mechanical?options.stride:Math.min(options.stride||.72,legLength*.72)}), position = new THREE.Vector3(), scale = new THREE.Vector3(), pole = new THREE.Vector3(), footQ = new THREE.Quaternion();
  const errors = [0, 0]; let lastBodyOffset = 0,lastLateralOffset=0,supportBlend=0;
  group.userData.locomotion = { get snapshot() { return { ...gait.snapshot(), yaw:legYaw, errors: [...errors] }; } };
  function reset() { beforeAnimation(); gait.reset();legYaw=null;supportBlend=0; }
  function beforeAnimation() { model.position.y -= lastBodyOffset; model.position.x-=lastLateralOffset;lastBodyOffset = lastLateralOffset = 0;if(turnApplied){hips.quaternion.copy(hipsPose);spine.quaternion.copy(spinePose);turnApplied=false;} }
  function update(dt, { grounded = true, dead = false, airborne = false, footOverride = null, bodyOffset = 0, align = null, heading:requestedHeading = null } = {}) {
    group.updateMatrixWorld(true); group.getWorldPosition(position); group.getWorldScale(scale); group.getWorldQuaternion(rotation);
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
    if (disabled) {supportBlend=0;return;}
    if(align){align(gait);group.updateMatrixWorld(true);}
    if(hips&&spine&&Math.abs(angleDelta(aimYaw,yaw))>.0001){
      hipsPose.copy(hips.quaternion);spinePose.copy(spine.quaternion);spine.getWorldQuaternion(spineWorld);hips.getWorldQuaternion(hipsWorld);
      turnQ.setFromAxisAngle(UP,angleDelta(aimYaw,yaw));hipsWorld.premultiply(turnQ);hips.parent.getWorldQuaternion(parentWorld).invert();hips.quaternion.copy(parentWorld.multiply(hipsWorld));hips.updateMatrixWorld(true);
      const twist=angleDelta(yaw,aimYaw),excess=twist-clamp(twist,-Math.PI*5/12,Math.PI*5/12);
      turnQ.setFromAxisAngle(UP,-excess);spineWorld.premultiply(turnQ);spine.parent.getWorldQuaternion(parentWorld).invert();spine.quaternion.copy(parentWorld.multiply(spineWorld));spine.updateMatrixWorld(true);turnApplied=true;
    }
    const moving = gait.speed > .12 || gait.feet.some(f => !f.stance);
    // Make room for an actual bent knee and forward/rear support contact.
    // This offset is visual only: it never alters the physical body or height.
    if(options.mechanical)supportBlend+=((moving?1:0)-supportBlend)*(1-Math.exp(-dt*10));
    const support=options.mechanical?supportBlend:moving?1:0;
    lastBodyOffset = bodyOffset - support*(options.mechanical?.055:legLength*.15);
    lastLateralOffset=support*(options.mechanical?.065:legLength*.055)*Math.cos(gait.phase*Math.PI*2);
    model.position.y += lastBodyOffset;model.position.x+=lastLateralOffset;group.updateMatrixWorld(true);
    // Preserve actual reachable contacts through authored hip bob/attack poses.
    // Solve the necessary body compression from measured limbs, not a guessed
    // universal pelvis height. Bone lengths and the physics capsule stay fixed.
    let compression=0;
    for(let i=0;i<2;i++)if(gait.feet[i].stance||footOverride||options.allFeetReach){
      legs[i].upper.getWorldPosition(a);const target=footOverride?.[i]||gait.feet[i].target;
      const reach=lengths[i]*scale.y-.00002,planar=Math.hypot(a.x-target.x,a.z-target.z);
      const maxHeight=Math.sqrt(Math.max(0,reach*reach-planar*planar));compression=Math.min(compression,target.y+maxHeight-a.y);
    }
    if(compression<0){const offset=compression/scale.y;model.position.y+=offset;lastBodyOffset+=offset;group.updateMatrixWorld(true);}
    for (let i = 0; i < 2; i++) {
      const f = gait.feet[i]; footQ.setFromAxisAngle(UP, f.yaw).multiply(neutral[i]);
      errors[i] = solvers[i].solve(footOverride?.[i] || f.target, pole, footQ);
    }
  }
  return { gait, offsets, neutral, solvers, beforeAnimation, update, reset, snapshot: () => ({ ...gait.snapshot(), yaw:legYaw, errors: [...errors] }) };
}

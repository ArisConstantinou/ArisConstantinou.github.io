"""Apply the reviewed 4.3.15 control changes to the pinned 4.3.14 source.
Each replacement must be unique. No change to saves, combat rules or geometry.
The release workflow commits the resulting source as well as its built output.
"""
from pathlib import Path
import json

root = Path(__file__).resolve().parents[1]
def patch(path, replacements):
    file = root / path
    text = file.read_text()
    for old, new in replacements:
        count = text.count(old)
        if count != 1:
            raise RuntimeError(f'{path}: expected one occurrence, found {count}: {old[:100]}')
        text = text.replace(old, new, 1)
    file.write_text(text)

# Keep the large renderer edits in one checked transaction.
patch('src/arcade.js', [
    ("import { installArcadeVisualUpgrade } from './arcade-visual-upgrade.js';", "import { installArcadeVisualUpgrade } from './arcade-visual-upgrade.js';\nimport { screenMovement, localHopDirection } from './arcade-control-frame.js';"),
    ("this.lastMovement=screenToWorld(", "this.lastMovement=screenMovement("),
    ("(this.keys.has('KeyW')||this.keys.has('ArrowUp')?1:0),this.camera.position,this.focus);", "(this.keys.has('KeyW')||this.keys.has('ArrowUp')?1:0),this.viewMode,this.cameraYaw);"),
    ("this.aim={...screenToWorld(this.stickAim.x,this.stickAim.z,this.camera.position,this.focus),distance:14}", "this.aim={...screenMovement(this.stickAim.x,this.stickAim.z,this.viewMode,this.cameraYaw),distance:14}"),
    ("const faceAim=!p.catapultId&&(!!this.currentTargetLock||this.viewMode==='overview'&&(this.mouse.valid||touchAim));", "const faceAim=!p.catapultId&&(this.viewMode==='chase3d'||!!this.currentTargetLock||this.viewMode==='overview'&&(this.mouse.valid||touchAim));"),
    ("   const pixels=!p.catapultId&&this.mouseControl&&!this.pointerLocked()?pointerPixels(this.freeMousePoint,this.renderer.domElement.getBoundingClientRect(),this.w,this.h):null;\n   if(pixels){this.mouse.x=pixels.x;this.mouse.y=pixels.y;this.mouse.valid=true;}else this.centerAim();", "   // One centre aim ray also when Pointer Lock is denied. Mouse displacement\n   // turns the view; cursor position must not create a second aiming frame.\n   this.centerAim();"),
    ("this.viewMode==='chase3d'&&this.pointerLocked()?{x:this.w/2,y:this.h/2}:pointerPixels", "this.viewMode==='chase3d'?{x:this.w/2,y:this.h/2}:pointerPixels"),
    ("this.viewMode==='chase3d'&&(this.pointerLocked()||!this.mouseControl)?{centered:true}", "this.viewMode==='chase3d'?{centered:true}"),
    ("   if(e.pointerType==='mouse'){\n    // A second mouse button", "   if(e.pointerType==='mouse'){\n    this.mouseControl=true;\n    // A second mouse button"),
    ("speed:Math.hypot(a.hopX,a.hopZ),building:", "speed:Math.hypot(a.hopX,a.hopZ),hopDirection:localHopDirection(a.hopX,a.hopZ,m.group.rotation.y),building:"),
    (";for(const side of [-1,1])m.bones[`hip${side}`].rotation.z-=Math.sin(direction)*strength*.14;", ";"),
])

# Add a lateral two-bone solve only when a directional hop actually needs it.
# Existing callers and the original forward/backward planar IK are unchanged.
patch('src/creatures.js', [
    ("function plantLimb(root, middle, end, firstRest, secondRest, dy, dz) {", """function plantLimb(root, middle, end, firstRest, secondRest, dy, dz, dx = 0) {
  if (Math.abs(dx) > 1e-7) {
    const first = firstRest.clone(), second = secondRest.clone();
    const l1 = first.length(), l2 = second.length();
    const target = first.clone().add(second).add(new THREE.Vector3(dx,dy,dz));
    const distance = clamp(target.length(), Math.abs(l1-l2)+1e-5, l1+l2-1e-5);
    const forward = target.clone().normalize(); target.copy(forward).multiplyScalar(distance);
    // Preserve the anatomical elbow/knee side instead of flipping the bend.
    const bend = first.clone().addScaledVector(forward,-first.dot(forward));
    if (bend.lengthSq() < 1e-10) bend.set(0,0,1).addScaledVector(forward,-forward.z);
    if (bend.lengthSq() < 1e-10) bend.set(1,0,0);
    bend.normalize();
    const along = (l1*l1+distance*distance-l2*l2)/(2*distance);
    const elbow = forward.clone().multiplyScalar(along).addScaledVector(bend,Math.sqrt(Math.max(0,l1*l1-along*along)));
    root.quaternion.setFromUnitVectors(first.normalize(),elbow.clone().normalize());
    const lower = target.sub(elbow).applyQuaternion(root.quaternion.clone().invert()).normalize();
    middle.quaternion.setFromUnitVectors(second.normalize(),lower);
    end.quaternion.copy(root.quaternion).multiply(middle.quaternion).invert();
    return;
  }"""),
    ("        const cycle=time*7.8,swimStroke=Math.sin(cycle)*lastMove;", """        const direction=state.hopDirection,travelLength=direction?Math.hypot(direction.x,direction.z):0;
        const hx=Number.isFinite(travelLength)&&travelLength>1e-6?direction.x/travelLength:0;
        const hz=Number.isFinite(travelLength)&&travelLength>1e-6?direction.z/travelLength:1;
        const cycle=time*7.8,swimStroke=Math.sin(cycle)*lastMove;"""),
    ("        bones.spine.rotation.x = Math.sin(time * 2.6) * .009;", "        if(!swim){pivot.rotation.x*=hz;pivot.rotation.z=-hx*(air?Math.sin(progress*Math.PI)*.12:0);}\n        bones.spine.rotation.x = Math.sin(time * 2.6) * .009;"),
    ("restPositions[ids[`ankle${side}`]],hindY,hindZ);", "restPositions[ids[`ankle${side}`]],hindY,hindZ*hz,hindZ*hx);"),
    ("restPositions[ids[`wrist${side}`]],foreY,foreZ);", "restPositions[ids[`wrist${side}`]],foreY,foreZ*hz,foreZ*hx);"),
    ("            bones[`foot${side}`].rotation.x=-thrust*.14;", "            bones[`foot${side}`].rotation.x=-thrust*.14*hz;\n            bones[`foot${side}`].rotation.z=thrust*.14*hx;"),
])
patch('src/arcade-model.js', [("ARCADE_VERSION = '4.3.14'", "ARCADE_VERSION = '4.3.15'")])
patch('index.html', [('content="4.3.14"','content="4.3.15"'), ('FROG · 4.3.14','FROG · 4.3.15')])
for name in ['package.json','package-lock.json']:
    file=root/name;data=json.loads(file.read_text());data['version']='4.3.15'
    if '' in data.get('packages',{}): data['packages']['']['version']='4.3.15'
    file.write_text(json.dumps(data,indent=2)+'\n')
print('Applied 4.3.15: fixed view axes, unified chase aim, directional hops.')

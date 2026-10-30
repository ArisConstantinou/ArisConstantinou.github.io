import {screenToWorld} from './arcade-view-math.js';
import * as THREE from 'three';
import {landingSurfaces} from './arcade-air-movement.js';
import {planWallJump,wallPoint,WALL_JUMP} from './arcade-wall-jump.js';
import {catapultPointerPoint} from './arcade-catapult-pointer.js';

export function installWallJumpControls(game,save){
 game.settings.wallJumpMode=game.settings.wallJumpMode==='auto'?'auto':'manual';
 const field=document.createElement('fieldset');field.className='wall-jump-settings';field.style.minWidth='0';field.innerHTML='<legend>Άλμα από τοίχο</legend><label for="wall-jump-mode">Εκτόξευση και προσγείωση<select id="wall-jump-mode"><option value="manual">Χειροκίνητο — επιλέγω προορισμό</option><option value="auto">Αυτόματο — κοντινότερη επιφάνεια</option></select></label>';const panel=game.$('settings-panel');panel.insertBefore(field,panel.querySelector('.compact'));const select=field.querySelector('select');select.style.cssText='width:100%;max-width:100%;box-sizing:border-box;font-size:16px';select.value=game.settings.wallJumpMode;select.onchange=()=>{game.settings.wallJumpMode=select.value==='auto'?'auto':'manual';save();};
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array(49*3),3));const line=new THREE.Line(geometry,new THREE.LineDashedMaterial({color:'#e6f29a',dashSize:.28,gapSize:.16,transparent:true,opacity:.85,depthWrite:false}));line.name='Wall jump trajectory';line.frustumCulled=false;game.scene.add(line);const ring=new THREE.Mesh(new THREE.RingGeometry(.58,.68,32),new THREE.MeshBasicMaterial({color:'#e6f29a',side:THREE.DoubleSide,transparent:true,opacity:.85,depthWrite:false}));ring.name='Wall jump landing';ring.rotation.x=-Math.PI/2;game.scene.add(ring);line.visible=ring.visible=false;
 const hint=document.createElement('div');hint.id='wall-jump-hint';hint.hidden=true;hint.style.cssText='position:absolute;left:50%;top:90px;transform:translateX(-50%);max-width:85vw;padding:8px 12px;border-radius:12px;background:#173b32eb;color:#f3ffcc;font:600 14px/1.4 system-ui;text-align:center;pointer-events:none';game.ui.append(hint);
 let padShown=false,savedDirection={x:0,z:1},heldId=null,mousePoint=null,savedPower=.5,fireHeld=false,suppressLaunchFire=false,signature='',plan=null,previousPlan=null;
 const held=()=>game.state.actors[0].flight?.kind==='wallHold';game.wallHeld=held;const aiming=()=>held()&&game.settings.wallJumpMode==='manual';game.wallAiming=aiming;
 function sync(){const id=held()?game.state.actors[0].flight.wall.id:null;if(id!==heldId){heldId=id;signature='';plan=null;savedPower=.5;fireHeld=!!game.actions.fire;if(id){game.cameraReady=false;const wall=game.state.actors[0].flight.wall;savedDirection={x:wall.nx,z:wall.nz};game.releaseMouseLook?.();game.actions.fire=false;game.stopCameraDrag?.();mousePoint={x:game.mouse.valid?game.mouse.x:game.w/2,y:game.mouse.valid?game.mouse.y:game.h/2};}}}
 const capture=game.captureCatapultMouse?.bind(game);game.captureCatapultMouse=e=>{if(!held())return capture?.(e);if(!game.running||game.layoutEditing||e.pointerType!=='mouse')return false;sync();const point=catapultPointerPoint(mousePoint,e,{width:game.w,height:game.h,locked:game.pointerLocked()});if(!point)return false;mousePoint=point;Object.assign(game.mouse,{...point,valid:true,inside:true});game.updateMouseTarget();return true;};
 const uses=game.usesCatapultMouse?.bind(game);game.usesCatapultMouse=()=>held()||uses?.();
 function aim(){sync();if(!aiming()){game.wallJumpAim={active:false,target:null,plan:null};return null;}const p=game.state.actors[0],wall=p.flight.wall,ground=(x,z)=>game.ground(x,z),surfaces=(x,z)=>landingSurfaces(game.state,x,z,ground,p);let target;
  if(game.mouseControl&&game.mouse.valid&&game.mouse.target)target={...game.mouse.target};
  else{if(game.pointers.has('aim')&&game.aimStrength>.08){savedPower=Math.max(0,Math.min(1,(game.aimStrength-.08)/.92));savedDirection=screenToWorld(game.stickAim.x,game.stickAim.z,game.camera.position,game.focus);}const range=5+savedPower*24,dir=savedDirection;target={x:p.x+dir.x*range,z:p.z+dir.z*range};}
  const key=[p.flight.wall.id,p.x,p.z,p.flight.y,target.x.toFixed(2),target.z.toFixed(2),Number.isFinite(target.y)?target.y.toFixed(2):'',game.state.bases.map(b=>b.destroyed?1:0).join('')].join(':');if(key!==signature){signature=key;plan=planWallJump(game.state,p,target,ground,surfaces);}game.wallJumpAim={active:true,target,plan};return plan;
 }
 const current=game.currentInput.bind(game);game.currentInput=()=>{sync();const c=current();c.wallMode=game.settings.wallJumpMode;if(held()){const p=aim(),fire=!!c.fire;c.wallTarget=game.wallJumpAim.target;c.wallLaunch=(c.jump||fire&&!fireHeld)&&!!p?.valid;fireHeld=fire;if(c.wallLaunch&&fire)suppressLaunchFire=true;c.jump=c.wallLaunch;c.fire=false;c.kick=false;c.sabotage=false;c.throwStone=false;c.airVolley=false;}else{if(suppressLaunchFire){if(!c.fire)suppressLaunchFire=false;c.fire=false;}fireHeld=!!c.fire;}return c;};
 const hud=game.updateHUD.bind(game);game.updateHUD=()=>{hud();sync();const active=aiming()&&game.running&&!game.layoutEditing;hint.hidden=!active;const jump=game.$('jump-button');jump.querySelector('span').textContent=aiming()?'ΕΚΤΟΞΕΥΣΗ':'ΑΛΜΑ ×2';jump.setAttribute('aria-label',aiming()?'Εκτόξευση προς το επιλεγμένο σημείο προσγείωσης':'Άλμα, δεύτερο πάτημα στον αέρα για διπλό άλμα');if(active){game.$('kick-button').hidden=true;game.$('touch-aim-hint').hidden=true;game.$('touch-aim-copy').textContent='ΠΡΟΟΡΙΣΜΟΣ / ΑΠΟΣΤΑΣΗ';game.$('touch-aim-copy').style.fontSize='12px';game.$('aim-stick').setAttribute('aria-label','Προορισμός και απόσταση άλματος από τον τοίχο');const p=aim();jump.disabled=!p?.valid;hint.textContent=p?.valid?(game.touch?'Στόχευσε με τον δεξιό μοχλό · ΕΚΤΟΞΕΥΣΗ ή ΠΥΡ':'Διάλεξε προσγείωση · Space ή κλικ για εκτόξευση'):'Διάλεξε προσβάσιμο σημείο μακριά από τον τοίχο';const clock=game.ui.querySelector('.match-clock')?.getBoundingClientRect(),view=game.$('view-button').getBoundingClientRect();hint.style.top=(Math.max(clock?.bottom||80,game.h>game.w?view.bottom:0)+10)+'px';const dock=game.$('objectives-toggle');if(dock&&!dock.hidden){const a=hint.getBoundingClientRect(),b=dock.getBoundingClientRect();if(a.left<b.right+8&&a.right>b.left-8&&a.top<b.bottom+8&&a.bottom>b.top-8)hint.style.top=(b.bottom+8)+'px';}}if(padShown!==active){padShown=active;game.touchLayout?.refresh();}};
 game.updateWallJumpAim=()=>{const p=aim(),active=aiming()&&game.running&&!game.layoutEditing;line.visible=!!(active&&p?.duration);ring.visible=!!(active&&p?.target);if(!active)return;const color=p?.valid?'#e6f29a':'#ee8876';line.material.color.set(color);ring.material.color.set(color);if(p&&p!==previousPlan){previousPlan=p;if(p.duration){for(let i=0;i<49;i++){const q=wallPoint(p,p.duration*i/48);geometry.attributes.position.setXYZ(i,q.x,q.y+.08,q.z);}geometry.attributes.position.needsUpdate=true;line.computeLineDistances();}ring.position.set(p.target.x,p.target.y+.055,p.target.z);}};
 return {inspect:()=>({mode:game.settings.wallJumpMode,holding:held(),target:game.wallJumpAim?.target,valid:game.wallJumpAim?.plan?.valid}),destroy(){line.removeFromParent();ring.removeFromParent();geometry.dispose();line.material.dispose();ring.geometry.dispose();ring.material.dispose();hint.remove();field.remove();}};
}

export function applyFlightAttitude(model,flight,dt){
 if(model.flightPivot)return applyCartoonFlightAttitude(model,flight,dt);
 const kind=flight?.kind,held=kind==='wallHold',flying=kind==='wallJump'||model.stats.imported&&['jump','double','surfaceHop'].includes(kind),speed=flight?Math.hypot(flight.vx||0,flight.vz||0):0;
 const target=held?-.2:flying&&speed>.2?Math.max(-.75,Math.min(.95,(model.stats.restAxisPitch??.17)-Math.atan2(flight.vy,speed))):0;
 model.flightPitch=(model.flightPitch||0)+(target-(model.flightPitch||0))*(1-Math.exp(-Math.max(0,dt)*18));if(held||flying||Math.abs(model.flightPitch)>.001)model.group.rotation.x+=model.flightPitch;
}

// For new rig instances: a dedicated local pitch pivot lives below the yaw group.
function applyCartoonFlightAttitude(model,flight,dt){
 if(!model.flightPivot)throw Error('New cartoon rig requires a flight pivot below its yaw group');
 const kind=flight?.kind,held=kind==='wallHold',flying=['wallJump','jump','double','surfaceHop'].includes(kind),speed=flight?Math.hypot(flight.vx||0,flight.vz||0):0;
 const target=held?-.2:flying&&speed>.2?Math.max(-.75,Math.min(.95,(model.stats?.restAxisPitch??model.leapPitch??0)-Math.atan2(flight.vy,speed))):(model.leapPitch||0);
 model.flightPitch=(model.flightPitch||0)+(target-(model.flightPitch||0))*(1-Math.exp(-Math.max(0,dt)*18));
 model.flightPivot.rotation.x=model.flightPitch;
}


// A stationary landing selector fits the reachable arc on screen. Its focus is
// fixed to the wall normal, never to the cursor, so selecting a target cannot
// move that target by moving the camera underneath the same screen coordinate.
export function wallAimPose(actor,ground,aspect=1.6){const w=actor.flight.wall,scale=Math.max(1,.95/Math.max(.3,aspect)),x=actor.x+w.nx*12,z=actor.z+w.nz*12;return {look:[x,ground+1.2,z],position:[x,ground+1.2+34*scale,z+24*scale]};}



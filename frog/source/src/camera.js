import * as THREE from 'three';

const internals=new WeakMap();
const clamp=THREE.MathUtils.clamp;
const labels={third:'Τρίτο πρόσωπο',first:'Πρώτο πρόσωπο',topdown:'Κάτοψη'};

function dataFor(game){
  let data=internals.get(game);
  if(!data){
    data={focus:new THREE.Vector3(),wanted:new THREE.Vector3(),target:new THREE.Vector3(),look:new THREE.Vector3(),forward:new THREE.Vector3(),right:new THREE.Vector3(),sample:new THREE.Vector3(),raycaster:new THREE.Raycaster(),ndc:new THREE.Vector2(),plane:new THREE.Plane(new THREE.Vector3(0,1,0),0),hit:new THREE.Vector3(),lastMode:null,time:0};
    internals.set(game,data);
  }
  return data;
}
function surfaceHeight(game,x,z){
  let h=0;
  if(game.world?.sampleHeight)h=game.world.sampleHeight(x,z);
  else if(game.world?.getSurface)h=game.world.getSurface(x,z)?.height;
  return Number.isFinite(h)?h:0;
}
function preventTerrainClipping(game,from,to,data){
  // Pull the shoulder camera forward when a bank or rock interrupts its boom.
  for(let i=3;i<=18;i++){
    const t=i/18;
    data.sample.lerpVectors(from,to,t);
    const ground=surfaceHeight(game,data.sample.x,data.sample.z);
    if(data.sample.y<ground+.28){
      to.lerpVectors(from,to,Math.max(.16,t-.085));
      break;
    }
  }
  to.y=Math.max(to.y,surfaceHeight(game,to.x,to.z)+.3);
}
function updateAim(game,data,mode){
  const input=game.input;
  if(mode==='topdown'){
    const source=input?.ndc||input?.mouseNDC;
    data.ndc.set(source?.x||0,source?.y||0);
  }else data.ndc.set(0,0);
  data.raycaster.setFromCamera(data.ndc,game.camera);
  const player=game.player;
  let h=mode==='first'?player.y+.45:Math.max(0,player.y+.08);
  let intersection=false;
  for(let i=0;i<3;i++){
    data.plane.constant=-h;
    const hit=data.raycaster.ray.intersectPlane(data.plane,data.hit);
    if(!hit)break;
    intersection=true;
    h=surfaceHeight(game,hit.x,hit.z)+.08;
  }
  const aim=game.aimPoint||(game.aimPoint=new THREE.Vector3());
  if(intersection&&data.hit.distanceTo(game.camera.position)<350){aim.copy(data.hit);}
  else data.raycaster.ray.at(mode==='topdown'?60:24,aim);
  if(mode==='topdown'){
    const x=aim.x-player.x,z=aim.z-player.z;
    if(x*x+z*z>.0225)game.aimYaw=Math.atan2(x,z);
  }else game.aimYaw=game.cameraYaw;
  game.aimPitch=mode==='topdown'?0:game.cameraPitch;
}

/**
 * Owns camera mouse deltas. Call once per rendered frame before input.endFrame().
 * Camera yaw faces (sin(yaw), 0, cos(yaw)); screen-right is (-cos(yaw),0,sin(yaw)).
 * In topdown, movement yaw is 0, while aimYaw follows the actual mouse world ray.
 */
export function updateGameCamera(game,dt,snap=false){
  if(!game.camera||!game.player)return;
  const data=dataFor(game),camera=game.camera,player=game.player,input=game.input;
  const mode=game.viewMode||(game.viewMode='third');
  if(data.lastMode!==mode){snap=true;data.lastMode=mode;input?.setMode?.(mode);}
  data.time+=Math.min(Math.max(dt,0),.1);
  game.cameraYaw=Number.isFinite(game.cameraYaw)?game.cameraYaw:.28;
  game.cameraPitch=Number.isFinite(game.cameraPitch)?game.cameraPitch:.38;
  game.cameraDistance=Number.isFinite(game.cameraDistance)?game.cameraDistance:8.4;
  const active=game.started!==false&&!game.paused&&!game.ui?.isBlocking?.();
  if(active&&mode!=='topdown'){
    const sensitivity=clamp(game.settings?.sensitivity??1,.15,3);
    game.cameraYaw-=(input?.dx||0)*.0025*sensitivity;
    game.cameraPitch+=(input?.dy||0)*.002*sensitivity;
    game.cameraPitch=clamp(game.cameraPitch,mode==='first'?-1.18:-.12,mode==='first'?1.25:1.18);
  }
  if(active&&input?.zoomDelta){
    if(mode==='topdown')game.topdownHeight=clamp((game.topdownHeight||26)+input.zoomDelta*.025,15,48);
    else if(mode==='third')game.cameraDistance=clamp(game.cameraDistance+input.zoomDelta*.009,3.8,16);
  }
  game.hidePlayer=mode==='first';
  if(player.model?.group)player.model.group.visible=!game.hidePlayer;
  const yaw=game.cameraYaw,pitch=game.cameraPitch;
  data.forward.set(Math.sin(yaw),0,Math.cos(yaw));
  data.right.set(-Math.cos(yaw),0,Math.sin(yaw));
  const focus=game.cameraFocus||data.focus,wanted=game.cameraWanted||data.wanted;
  const blend=1-Math.exp(-Math.max(0,dt)*12);
  data.target.set(player.x,player.y+.73,player.z);
  if(snap||mode==='first')focus.copy(data.target);else focus.lerp(data.target,blend);
  camera.up.set(0,1,0);
  let fov=63;
  if(mode==='first'){
    fov=76;
    wanted.set(player.x,player.y+.86,player.z).addScaledVector(data.forward,.38);
    // A small positive near plane keeps reeds and nearby predators visible.
    camera.near=.045;
    camera.position.copy(wanted);
    data.sample.set(Math.sin(yaw)*Math.cos(pitch),-Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch));
    data.look.copy(camera.position).add(data.sample);
  }else if(mode==='topdown'){
    fov=49;camera.near=.15;
    const height=game.topdownHeight||26;
    wanted.set(focus.x,focus.y+height,focus.z-height*.31);
    if(snap)camera.position.copy(wanted);else camera.position.lerp(wanted,1-Math.exp(-dt*9));
    data.look.set(focus.x,focus.y-.2,focus.z+1.2);
  }else{
    camera.near=.1;
    const distance=game.cameraDistance;
    wanted.copy(focus).addScaledVector(data.forward,-Math.cos(pitch)*distance).addScaledVector(data.right,.62);
    wanted.y+=Math.sin(pitch)*distance+.35;
    preventTerrainClipping(game,focus,wanted,data);
    if(snap)camera.position.copy(wanted);else camera.position.lerp(wanted,1-Math.exp(-dt*15));
    data.look.copy(focus).addScaledVector(data.forward,1.65).addScaledVector(data.right,.14);
  }
  const shake=typeof game.shake==='number'?game.shake:(game.shake?.amount||0);
  if(active&&shake>0){
    const amount=clamp(shake,0,2)*(mode==='first'?.035:.075);
    camera.position.x+=Math.sin(data.time*111.3)*amount;
    camera.position.y+=Math.sin(data.time*137.1+1)*amount*.7;
    camera.position.z+=Math.sin(data.time*91.8+2)*amount*.5;
  }
  camera.lookAt(data.look);
  if(Math.abs(camera.fov-fov)>.01){camera.fov=fov;camera.updateProjectionMatrix();}
  else if(snap)camera.updateProjectionMatrix();
  camera.updateMatrixWorld(true);
  updateAim(game,data,mode);
  game.movementYaw=mode==='topdown'?0:game.cameraYaw;
  return mode;
}

export function cycleGameView(game){
  const current=game.viewMode||'third';
  const next={third:'first',first:'topdown',topdown:'third'}[current]||'third';
  game.viewMode=next;
  game.hidePlayer=next==='first';
  game.ignoreUnlockUntil=performance.now()+500;
  game.input?.setMode?.(next);
  game.input?.clearMouseMotion?.();
  if(next==='topdown')game.input?.unlock?.();
  else if(game.started&&!game.paused&&!game.ui?.isBlocking?.())game.input?.lock?.();
  updateGameCamera(game,0,true);
  game.ui?.toast?.(`${labels[next]} · C για αλλαγή κάμερας`,'info');
  return next;
}


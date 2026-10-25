import * as THREE from 'three';
import {BUILDINGS,canAfford,buildingCost} from './rules.js';
import {WORLD_EXTENT} from './world-config.js';
import {defaultPlacement,validateBuildingPlacement} from './placement-rules.js';

export const PLACEABLE_BUILDINGS=new Set(['shelter','store','nursery','watchtower','training','palisade']);
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const normalize=yaw=>((yaw%(Math.PI*2))+Math.PI*2)%(Math.PI*2);
const campFor=(g,p)=>g.camps.find(c=>c.id===p.campId);
function localPoint(camp,point,yaw){
  const a=camp.yaw||0,dx=point.x-camp.x,dz=point.z-camp.z;
  return {x:Math.cos(a)*dx-Math.sin(a)*dz,z:Math.sin(a)*dx+Math.cos(a)*dz,yaw};
}
function worldPoint(camp,point){
  const a=camp.yaw||0;return {x:camp.x+Math.cos(a)*point.x+Math.sin(a)*point.z,z:camp.z-Math.sin(a)*point.x+Math.cos(a)*point.z};
}
function validateStage(game,p){
  if(game.player.dead)return {valid:false,reason:'unavailable'};
  const currentCamp=campFor(game,p),reason=game.buildBlockReason?.(p.type,currentCamp);if(reason)return {valid:false,reason};
  p.cost=game.buildCost?.(p.type,currentCamp)||buildingCost(p.type,game.camps,currentCamp);
  if(!canAfford(game.resources,p.cost))return {valid:false,reason:'resources'};
  if(!Number.isFinite(p.x)||!Number.isFinite(p.z)||!p.hasPoint)return {valid:false,reason:'invalid-position'};
  if(p.type==='shelter'){
    if(Math.abs(p.x)>WORLD_EXTENT-14||Math.abs(p.z)>WORLD_EXTENT-14)return {valid:false,reason:'outside-world'};
    const ruin=game.camps.find(c=>c.destroyed&&distance(c,p)<5);
    if(ruin){p.x=ruin.x;p.z=ruin.z;}
    if(game.camps.some(c=>!c.destroyed&&distance(c,p)<26))return {valid:false,reason:'overlap-building'};
    const surface=game.world.getSurface(p.x,p.z);
    if(!ruin&&surface.type!=='land'&&!(surface.type==='rock'&&surface.platform?.radius>6))return {valid:false,reason:'water'};
    if(distance(p,game.player)>36)return {valid:false,reason:'out-of-range'};
    p.ruin=ruin||null;p.local=null;return {valid:true,reason:null};
  }
  const camp=campFor(game,p);if(!camp)return {valid:false,reason:'inactive-camp'};
  p.local=localPoint(camp,p,p.yaw);
  return validateBuildingPlacement(camp,p.type,p.local);
}
function paint(game,p){
  const camp=campFor(game,p),result=validateStage(game,p);p.valid=result.valid;p.reason=result.reason;
  p.y=camp?.mesh?.position?.y??game.world.sampleHeight(p.x,p.z);
  if(p.ghost&&Number.isFinite(p.x)&&Number.isFinite(p.z))game.world.setBuildingPreview?.(p.ghost,{x:p.x,y:p.y,z:p.z,yaw:p.yaw+(camp?.yaw||0),valid:p.valid});
  return p;
}
/** Start a preview only. No resources or camp inventory are changed here. */
export function beginBuildingPlacement(game,type,{dragging=false}={}){
  if(!PLACEABLE_BUILDINGS.has(type)||!BUILDINGS[type])return false;
  const camp=type==='shelter'?null:game.nearestHome(18);
  if(type!=='shelter'&&(!camp||camp.destroyed||camp.team!=='ally')){game.ui.toast({icon:'camp',progress:0,tone:'warning'});return false;}
  if(camp?.buildings?.[type])return false;
  const reason=game.buildBlockReason?.(type,camp);if(reason){game.ui.toast(reason,'warning');return false;}
  cancelBuildingPlacement(game,{quiet:true});
  const local=type==='shelter'?{x:0,z:0,yaw:0}:type==='training'?{x:0,z:6,yaw:0}:type==='store'?{x:-6.5,z:6,yaw:0}:defaultPlacement(type),initial=camp?worldPoint(camp,local):{x:game.player.x,z:game.player.z};
  const p=game.buildPlacement={active:true,type,campId:camp?.id||null,x:initial.x,z:initial.z,yaw:local.yaw||0,hasPoint:true,cost:game.buildCost?.(type,camp)||buildingCost(type,game.camps,camp),dragging,ghost:game.world.createBuildingPreview?.(type)||null};
  game.ignoreUnlockUntil=performance.now()+700;if(game.input){game.input.buildingMode=true;game.input.clear?.();game.input.unlock?.();}
  game.paused=false;if(!dragging)game.ui.closePanels?.();
  game.world.showBuildArea?.(camp||null);paint(game,p);game.updateUI?.(game.buildDayState?.()||{timeLabel:'',day:1,night:false});return true;
}
export function updateBuildingPlacement(game,pointer=null){
  const p=game.buildPlacement;if(!p?.active)return null;
  if(pointer){p.pointer={x:pointer.clientX,y:pointer.clientY};if(game.input?.mouse){game.input.mouse.x=pointer.clientX;game.input.mouse.y=pointer.clientY;}if(pointer.dragging!==undefined)p.dragging=pointer.dragging;}
  const screen=p.dragging?p.pointer:game.input?.mouse||p.pointer;
  if(game.camera&&screen&&Number.isFinite(screen.x)&&Number.isFinite(screen.y)){
    let overUI=false;
    if(typeof document!=='undefined'&&!p.dragging){const target=document.elementFromPoint?.(screen.x,screen.y);overUI=!!target?.closest?.('button,.fg-panel,.fg-placement-tools');}
    if(!overUI){
      const rect=game.renderer?.domElement?.getBoundingClientRect?.()||{left:0,top:0,width:typeof innerWidth==='number'?innerWidth:1,height:typeof innerHeight==='number'?innerHeight:1};
      const ray=game.buildRay||(game.buildRay=new THREE.Raycaster()),ndc=new THREE.Vector2((screen.x-rect.left)/rect.width*2-1,1-(screen.y-rect.top)/rect.height*2);
      ray.setFromCamera(ndc,game.camera);const hit=new THREE.Vector3(),camp=campFor(game,p);let height=camp?.mesh?.position?.y??game.player.y??0,success=false;
      for(let i=0;i<(camp?1:3);i++){const plane=new THREE.Plane(new THREE.Vector3(0,1,0),-height);if(!ray.ray.intersectPlane(plane,hit)){success=false;break;}success=true;height=camp?.mesh?.position?.y??game.world.sampleHeight(hit.x,hit.z);}
      p.hasPoint=success&&hit.distanceTo(game.camera.position)<180;if(p.hasPoint){p.x=hit.x;p.z=hit.z;}
    }
  }
  return paint(game,p);
}
export function rotateBuildingPlacement(game,direction=1){
  const p=game.buildPlacement;if(!p?.active)return false;p.yaw=normalize(p.yaw+Math.sign(direction||1)*Math.PI/12);paint(game,p);return true;
}
/** Revalidate the exact preview and perform one atomic purchase on confirmation. */
export function confirmBuildingPlacement(game){
  const p=game.buildPlacement;if(!p?.active)return false;paint(game,p);
  if(!p.valid){game.ui.toast({icon:'warning',progress:0,tone:'warning',detail:p.reason});return false;}
  const record={x:p.x,z:p.z,yaw:p.yaw,local:p.local?{...p.local}:null,campId:p.campId,ruin:p.ruin};
  const type=p.type;game.commitBuild(type,record);
  // commitBuild returns true only after its final affordability/site check.
  if(!game.lastBuildCommitted)return false;
  cancelBuildingPlacement(game,{quiet:true});return true;
}
export function cancelBuildingPlacement(game,{quiet=false}={}){
  const p=game.buildPlacement;if(p?.ghost)game.world.removeBuildingPreview?.(p.ghost);game.world.hideBuildArea?.();game.buildPlacement=null;
  if(game.input){game.input.buildingMode=false;game.input.clearMouseMotion?.();game.input.left=false;game.input.right=false;}
  if(!quiet&&p){game.ui.closePanels?.();game.ui.toast({icon:'camp',progress:0,tone:'info'});}
  return !!p;
}


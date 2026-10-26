import {CAMERA_ZOOM,cameraPose} from './arcade-view-math.js';

export const CAMERA_SETTINGS_DEFAULTS=Object.freeze({cameraZoom:CAMERA_ZOOM.default,cameraFov:52,cameraSensitivity:1});
const numeric=(value,fallback)=>{
 const n=typeof value==='number'||(typeof value==='string'&&value.trim())?Number(value):NaN;
 return Number.isFinite(n)?n:fallback;
};
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));

/** Return the camera preferences only; callers can merge them into settings. */
export function normalizeCameraSettings(settings={}){
 const zoom=clamp(numeric(settings?.cameraZoom,CAMERA_SETTINGS_DEFAULTS.cameraZoom),CAMERA_ZOOM.min,CAMERA_ZOOM.max);
 const fov=clamp(numeric(settings?.cameraFov,CAMERA_SETTINGS_DEFAULTS.cameraFov),40,80);
 const sensitivity=clamp(numeric(settings?.cameraSensitivity,CAMERA_SETTINGS_DEFAULTS.cameraSensitivity),.25,2);
 return {cameraZoom:Math.round(zoom*20)/20,cameraFov:Math.round(fov),cameraSensitivity:Math.round(sensitivity*20)/20};
}

function preview(game){
 const camera=game.camera,player=game.state?.actors?.[0];
 camera.fov=game.settings.cameraFov;camera.updateProjectionMatrix();
 if(player){
  if(typeof game.updateCameraPose==='function'){
   // Use the same terrain-safe camera placement as live play, including when
   // a saved upward view and a changed zoom would otherwise enter the ground.
   game.cameraReady=false;game.updateCameraPose(0);
  }else{
   const pose=cameraPose(player,game.ground(player.x,player.z),camera.aspect,game.viewMode,{yaw:game.cameraYaw,pitch:game.cameraPitch,zoom:game.settings.cameraZoom});
   game.focus.fromArray(pose.look);game.cameraTarget.fromArray(pose.position);camera.position.copy(game.cameraTarget);
   camera.lookAt(game.focus);camera.updateMatrixWorld();game.cameraReady=true;
  }
  // Settings are also available while paused, when the normal world update is
  // stopped. A closer preview must still remove a roof crossing the new view.
  game.basesView?.update(0);
 }
 game.renderer.render(game.scene,camera);game.drawLabels?.();
}

/** Bind native sliders after the UI exists. No initial render or model step. */
export function installCameraSettings(game,{onChange=()=>{}}={}){
 const ids=['camera-zoom','camera-zoom-value','camera-fov','camera-fov-value','camera-reset','camera-sensitivity','camera-sensitivity-value'];
 const [zoom,zoomValue,fov,fovValue,reset,sensitivity,sensitivityValue]=ids.map(id=>{
  const element=game.$(id);if(!element)throw new Error(`Camera settings need #${id}`);return element;
 });
 zoom.min='70';zoom.max='150';zoom.step='5';fov.min='40';fov.max='80';fov.step='1';
 sensitivity.min='25';sensitivity.max='200';sensitivity.step='5';
 const sync=()=>{
  const normalized=normalizeCameraSettings(game.settings);Object.assign(game.settings,normalized);
  zoom.value=String(Math.round(normalized.cameraZoom*100));zoomValue.textContent=zoom.value+'%';
  fov.value=String(normalized.cameraFov);fovValue.textContent=fov.value+'°';
  sensitivity.value=String(Math.round(normalized.cameraSensitivity*100));sensitivityValue.textContent=sensitivity.value+'%';
  return normalized;
 };
 const apply=()=>{const normalized=sync();preview(game);onChange(normalized);};
 const changeZoom=()=>{game.settings.cameraZoom=Number(zoom.value)/100;apply();};
 const changeFov=()=>{game.settings.cameraFov=Number(fov.value);apply();};
 const changeSensitivity=()=>{game.settings.cameraSensitivity=Number(sensitivity.value)/100;apply();};
 const restore=()=>{Object.assign(game.settings,CAMERA_SETTINGS_DEFAULTS);apply();};
 zoom.addEventListener('input',changeZoom);fov.addEventListener('input',changeFov);reset.addEventListener('click',restore);sensitivity.addEventListener('input',changeSensitivity);
 sync();
 return ()=>{zoom.removeEventListener('input',changeZoom);fov.removeEventListener('input',changeFov);reset.removeEventListener('click',restore);sensitivity.removeEventListener('input',changeSensitivity);};
}

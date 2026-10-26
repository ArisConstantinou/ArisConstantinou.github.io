import {CAMERA_ZOOM,cameraPose} from './arcade-view-math.js';

export const CAMERA_SETTINGS_DEFAULTS=Object.freeze({cameraZoom:CAMERA_ZOOM.default,cameraFov:52,cameraAutoRotate:true});
const numeric=(value,fallback)=>{
 const n=typeof value==='number'||(typeof value==='string'&&value.trim())?Number(value):NaN;
 return Number.isFinite(n)?n:fallback;
};
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));

/** Return the camera preferences only; callers can merge them into settings. */
export function normalizeCameraSettings(settings={}){
 const zoom=clamp(numeric(settings?.cameraZoom,CAMERA_SETTINGS_DEFAULTS.cameraZoom),CAMERA_ZOOM.min,CAMERA_ZOOM.max);
 const fov=clamp(numeric(settings?.cameraFov,CAMERA_SETTINGS_DEFAULTS.cameraFov),40,80);
 return {cameraZoom:Math.round(zoom*20)/20,cameraFov:Math.round(fov),cameraAutoRotate:settings?.cameraAutoRotate!==false};
}

function preview(game){
 const camera=game.camera,player=game.state?.actors?.[0];
 camera.fov=game.settings.cameraFov;camera.updateProjectionMatrix();
 if(player){
  const pose=cameraPose(player,game.ground(player.x,player.z),camera.aspect,game.viewMode,{yaw:game.cameraYaw,pitch:game.cameraPitch,zoom:game.settings.cameraZoom});
  game.focus.fromArray(pose.look);game.cameraTarget.fromArray(pose.position);camera.position.copy(game.cameraTarget);
  camera.lookAt(game.focus);camera.updateMatrixWorld();game.cameraReady=true;
  // Settings are also available while paused, when the normal world update is
  // stopped. A closer preview must still remove a roof crossing the new view.
  game.basesView?.update(0);
 }
 game.renderer.render(game.scene,camera);game.drawLabels?.();
}

/** Bind native sliders after the UI exists. No initial render or model step. */
export function installCameraSettings(game,{onChange=()=>{}}={}){
 const ids=['camera-zoom','camera-zoom-value','camera-fov','camera-fov-value','camera-reset','camera-follow'];
 const [zoom,zoomValue,fov,fovValue,reset,follow]=ids.map(id=>{
  const element=game.$(id);if(!element)throw new Error(`Camera settings need #${id}`);return element;
 });
 zoom.min='70';zoom.max='150';zoom.step='5';fov.min='40';fov.max='80';fov.step='1';
 const sync=()=>{
  const normalized=normalizeCameraSettings(game.settings);Object.assign(game.settings,normalized);
  zoom.value=String(Math.round(normalized.cameraZoom*100));zoomValue.textContent=zoom.value+'%';
  fov.value=String(normalized.cameraFov);fovValue.textContent=fov.value+'°';
  follow.value=normalized.cameraAutoRotate?'auto':'manual';
  return normalized;
 };
 const apply=()=>{const normalized=sync();preview(game);onChange(normalized);};
 const changeZoom=()=>{game.settings.cameraZoom=Number(zoom.value)/100;apply();};
 const changeFov=()=>{game.settings.cameraFov=Number(fov.value);apply();};
 const changeFollow=()=>{game.settings.cameraAutoRotate=follow.value!=='manual';game.cameraFollow?.reset();apply();};
 const restore=()=>{Object.assign(game.settings,{cameraZoom:CAMERA_SETTINGS_DEFAULTS.cameraZoom,cameraFov:CAMERA_SETTINGS_DEFAULTS.cameraFov});apply();};
 zoom.addEventListener('input',changeZoom);fov.addEventListener('input',changeFov);reset.addEventListener('click',restore);follow.addEventListener('change',changeFollow);
 sync();
 return ()=>{zoom.removeEventListener('input',changeZoom);fov.removeEventListener('input',changeFov);reset.removeEventListener('click',restore);follow.removeEventListener('change',changeFollow);};
}

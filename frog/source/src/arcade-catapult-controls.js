import { ARTILLERY, stoneTarget } from './arcade-artillery.js';
import { sabotageTarget } from './arcade-model.js';
import { catapultPointerPoint } from './arcade-catapult-pointer.js';

// The catapult is a separate machine: mounting never replaces the frog's ammo.
export function installCatapultControls(game) {
  game.catapultAim = { active: false, target: null };
  let pendingInteract = false, fireWasHeld = false, savedPower = .5, aimedCatapult = null;
  const mounted = () => !!game.state.actors[0].catapultId;
  let pointerCatapult=null,mousePoint=null;
  game.usesCatapultMouse=()=>mounted()&&game.mouseControl;
  game.syncCatapultPointer=()=>{
    const id=game.state.actors[0].catapultId||null;
    if(id!==pointerCatapult){
      const previous=game.mouse.valid?{x:game.mouse.x,y:game.mouse.y}:null;
      pointerCatapult=id;
      // Entering or leaving the machine must not carry a held fly shot or
      // camera gesture into another control mode. No native capture is
      // requested here: it needs the next deliberate on-foot activation.
      game.clearInputs();
      if(id){
        game.releaseMouseLook?.();
        mousePoint={x:Number.isFinite(previous?.x)?previous.x:game.w/2,y:Number.isFinite(previous?.y)?previous.y:game.h/2};
      }else mousePoint=null;
    }
    // clearInputs also runs for Pause, Resume, and view changes. Retain the
    // chosen mouse position without restoring any held firing action.
    if(id&&game.running&&game.mouseControl&&mousePoint&&!game.mouse.valid){
      Object.assign(game.mouse,{x:Math.max(0,Math.min(game.w,mousePoint.x)),y:Math.max(0,Math.min(game.h,mousePoint.y)),valid:true,inside:true});
    }
  };
  game.captureCatapultMouse=event=>{
    if(!mounted()||!game.running||game.layoutEditing||event?.pointerType!=='mouse')return false;
    game.syncCatapultPointer();
    const point=catapultPointerPoint(mousePoint,event,{width:game.w,height:game.h,locked:game.pointerLocked()});
    if(!point)return false;
    mousePoint=point;game.mouseControl=true;game.stopCameraDrag?.();
    Object.assign(game.mouse,{...point,valid:true,inside:true});
    game.updateMouseTarget();return true;
  };
  const originalHUD=game.updateHUD.bind(game);
  game.updateHUD=()=>{game.syncCatapultPointer();originalHUD();};
  game.updateCatapultAim = () => {
    if (!mounted()) { game.catapultAim = { active: false, target: null }; aimedCatapult=null;return; }
    const p = game.state.actors[0],station=game.state.catapults?.find(c=>c.id===p.catapultId),origin=station||p;
    if(aimedCatapult!==p.catapultId){aimedCatapult=p.catapultId;savedPower=.5;}
    // Pointer aiming also works when a touch-capable laptop has a mouse.
    if (game.mouse.valid && game.mouse.target) {
      const dx=game.mouse.target.x-origin.x,dz=game.mouse.target.z-origin.z,distance=Math.hypot(dx,dz);
      if(distance>.01)game.aim={x:dx/distance,z:dz/distance,distance};
    }
    const direction = game.aim || { x: p.aimX, z: p.aimZ };
    // Keep the chosen power when the thumb returns to the center fire button.
    // Releasing the outer ring must not reset the next stone to minimum range.
    if(game.touch&&!game.mouse.valid){
      if(game.pointers.has('aim')&&game.aimStrength>.08)savedPower=Math.max(0,Math.min(1,(game.aimStrength-.08)/.92));
    }else savedPower=Math.max(0,Math.min(1,((direction.distance||17)-ARTILLERY.minRange)/(ARTILLERY.maxRange-ARTILLERY.minRange)));
    const power=savedPower;
    game.catapultAim = { active: true, target: stoneTarget(origin, direction.x, direction.z, power) };
  };
  const originalInput = game.currentInput.bind(game), originalClear = game.clearInputs.bind(game);
  game.currentInput = () => {
    game.syncCatapultPointer();
    const input = originalInput();
    if(game.layoutEditing){pendingInteract=false;fireWasHeld=false;return {};}
    const trigger=input.fire&&!fireWasHeld;fireWasHeld=!!input.fire;
    if (mounted()) {
      game.updateCatapultAim();
      input.fire = false;
      input.aiming = true;
      input.ax = game.aim.x; input.az = game.aim.z;
      input.ay = undefined;
      input.sabotage=false;
      if(trigger&&game.catapultAim.target?.valid!==false)input.throwStone={...game.catapultAim.target};
    }
    if (pendingInteract) { input.interactCatapult = true; pendingInteract = false; }
    return input;
  };
  game.clearInputs = () => {
    pendingInteract = false; fireWasHeld = false;
    game.catapultAim = { active: false, target: null };
    originalClear();
  };
  const button = game.$('catapult-button');
  button.onpointerdown = event => {
    if (!game.running || game.layoutEditing || button.disabled || event.pointerType === 'mouse' && event.button !== 0 || (!mounted() && game.state.phase !== 'battle')) return;
    event.preventDefault(); pendingInteract = true;
  };
  button.onclick = event => { if (event.detail === 0 && game.running && !game.layoutEditing && !button.disabled) pendingInteract = true; };
  addEventListener('keydown', event => {
    if (event.code !== 'KeyE' || event.repeat || event.target.matches('input,select') || !game.running || game.layoutEditing || (!mounted() && game.state.phase !== 'battle')) return;
    if(!mounted()&&sabotageTarget(game.state,game.state.actors[0]))return;
    event.preventDefault(); pendingInteract = true;
  });
  const stick = game.$('aim-stick');
  stick.addEventListener('pointerdown', () => { if (mounted()) game.updateCatapultAim(); });
  stick.addEventListener('pointermove', () => { if (mounted() && game.pointers.has('aim')) game.updateCatapultAim(); });
}

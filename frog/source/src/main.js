import './arcade-ui-layout.css';
import {installUILayout} from './arcade-ui-layout.js';
import './arcade-brand-placement.css';
import './arcade-asset-loading.css';
import { ArcadeGame } from './arcade.js';
import { installTapBuffer } from './arcade-tap-buffer.js';
import { installCameraButton } from './arcade-camera-button.js';
import { installCatapultControls } from './arcade-catapult-controls.js';
import { installArcadeGestureGuard } from './arcade-gesture-guard.js';
function report(error){
 console.error(error);
 let boot=document.getElementById('boot');
 if(!boot){boot=document.createElement('div');boot.id='boot';const message=document.createElement('div');message.id='boot-error';boot.append(message);document.body.append(boot);}
 boot.classList.add('has-error');
 const target=document.getElementById('boot-error');
 target.textContent='Δεν μπόρεσε να ξεκινήσει ο 3D κόσμος. Ενεργοποίησε την επιτάχυνση γραφικών στον browser και κάνε ανανέωση.\n'+(error?.message||String(error));
}
addEventListener('error',e=>report(e.error||e.message));
addEventListener('unhandledrejection',e=>report(e.reason));
requestAnimationFrame(()=>{try{const game=window.frogArcade=new ArcadeGame();installTapBuffer(game);installCameraButton(game);installCatapultControls(game);game.installAutoFire();installUILayout(game);installArcadeGestureGuard({surfaces:[game.renderer.domElement,game.labels,game.ui]});}catch(error){report(error);}});

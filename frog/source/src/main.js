import { ReadableArcadeGame } from './arcade-readability.js';
import { installTapBuffer } from './arcade-tap-buffer.js';
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
requestAnimationFrame(()=>{try{window.frogArcade=new ReadableArcadeGame();installTapBuffer(window.frogArcade);}catch(error){report(error);}});

import { FrogGame } from './game.js';
function report(error){console.error(error);const boot=document.getElementById('boot');if(boot){boot.classList.add('has-error');const target=document.getElementById('boot-error');target.textContent='Δεν μπόρεσε να ξεκινήσει ο 3D κόσμος. Ενεργοποίησε το hardware acceleration στον browser και κάνε ανανέωση.\n'+(error?.message||String(error));}}
addEventListener('error',e=>report(e.error||e.message));
addEventListener('unhandledrejection',e=>report(e.reason));
requestAnimationFrame(()=>{try{window.frogGame=new FrogGame();}catch(error){report(error);}});


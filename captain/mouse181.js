/** Desktop-only relative mouse look. The first click captures, never punches. */
export function createDeckMouse({canvas,root,enabled,onLook,onAttack,onReset,onMessage}){
 let fallback=false,pending=false,locked=false,lastHover=null,wasEnabled=false;
 const keyboard=()=>document.documentElement.dataset.inputScheme!=='touch';
 const button=document.createElement('button');button.id='deckMouse181';button.innerHTML='<span>◉</span><strong>ΚΛΙΚ ΓΙΑ ΚΑΜΕΡΑ</strong><small>Ποντίκι: ματιά · TAB: ελεύθερος δείκτης</small>';root.append(button);
 const usable=()=>enabled()&&keyboard();
 function release(){if(document.pointerLockElement===canvas)document.exitPointerLock();locked=false;pending=false;lastHover=null;render();}
 function capture(){if(!usable()||pending||locked)return;lastHover=null;pending=true;
  try{const result=canvas.requestPointerLock();if(result?.catch)result.catch(()=>{pending=false;fallback=true;onMessage('Η δέσμευση δείκτη δεν ενεργοποιήθηκε. Κινείς ακόμη την κάμερα πάνω στην εικόνα.');render();});}catch{pending=false;fallback=true;render();}}
 function render(){const active=usable();button.hidden=!active||locked;root.classList.toggle('mouse-locked181',locked);root.dataset.mouseLook=locked?'locked':active?'hover':'off';}
 button.onclick=capture;
 document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===canvas;pending=false;lastHover=null;if(!locked)onReset();render();});
 document.addEventListener('pointerlockerror',()=>{pending=false;fallback=true;render();});
 document.addEventListener('mousemove',e=>{if(usable()&&document.pointerLockElement===canvas)onLook(e.movementX,e.movementY);});
 function down(e){if(e.pointerType!=='mouse'||!usable())return false;e.preventDefault();if(!locked&&!fallback){capture();return true;}if(e.button===0)onAttack('slap');else if(e.button===2)onAttack('punch');return true;}
 function move(e){if(e.pointerType!=='mouse'||!usable())return false;if(!locked){if(lastHover)onLook(e.clientX-lastHover.x,e.clientY-lastHover.y);lastHover={x:e.clientX,y:e.clientY};}return true;}
 canvas.addEventListener('pointerleave',()=>lastHover=null);
 canvas.addEventListener('contextmenu',e=>{if(usable())e.preventDefault();});
 window.addEventListener('blur',release);document.addEventListener('visibilitychange',()=>{if(document.hidden)release();});
 function sync(){const active=usable();if(!active&&(locked||pending))release();if(active!==wasEnabled){lastHover=null;wasEnabled=active;}render();}
 return {down,move,release,capture,sync,key:e=>{if(e.code==='Tab'&&usable()){e.preventDefault();release();return true;}return false;},inspect:()=>({locked:document.pointerLockElement===canvas,mode:root.dataset.mouseLook})};
}

// Handle touch directly; do not depend on a delayed synthesized click after multitouch.
export function installCameraButton(game,now=()=>performance.now()){
 const button=game.$('view-button');let lastTouch=-Infinity;
 button.onpointerdown=e=>{
  if(e.pointerType!=='touch'||!game.running)return;
  e.preventDefault();lastTouch=now();game.toggleView();
 };
 button.onclick=e=>{
  if(!game.running)return;
  if(e.detail===0||now()-lastTouch>600)game.toggleView();
 };
}

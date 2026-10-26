// Preserve short taps between simulation frames, without making held inputs sticky.
export function installTapBuffer(game){
 const pending={fire:false,collect:false,kick:false};
 const mark=key=>{if(game.running)pending[key]=true;};
 const originalInput=game.currentInput.bind(game),originalClear=game.clearInputs.bind(game);
 game.currentInput=()=>{const input=originalInput();for(const key of Object.keys(pending)){input[key] ||= pending[key];pending[key]=false;}return input;};
 game.clearInputs=()=>{for(const key of Object.keys(pending))pending[key]=false;originalClear();};
 addEventListener('keydown',e=>{if(e.repeat||e.target.matches('input,select'))return;if(e.code==='KeyQ')mark('kick');if(e.code==='KeyE')mark('collect');},true);
 addEventListener('pointerdown',e=>{
  if(e.target.closest?.('#tongue-button'))mark('collect');
  else if(e.target.closest?.('#kick-button')&&!game.$('kick-button').disabled)mark('kick');
  else if(e.target===game.renderer.domElement&&e.pointerType!=='touch'&&(e.button===0||e.button===2))mark(e.button===2?'collect':'fire');
  else if(e.target.closest?.('#aim-stick')){const r=game.$('aim-stick').getBoundingClientRect();if(Math.hypot(e.clientX-r.x-r.width/2,e.clientY-r.y-r.height/2)>=r.width*.36)mark('fire');}
 },true);
 addEventListener('pointercancel',()=>{for(const key of Object.keys(pending))pending[key]=false;},true);
}

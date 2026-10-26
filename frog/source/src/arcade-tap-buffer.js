// Preserve short taps between simulation frames, without making held inputs sticky.
export function installTapBuffer(game){
 const pending={fire:false,kick:false};
 const mark=key=>{if(game.running&&!game.layoutEditing&&!game.cameraDrag)pending[key]=true;};
 const originalInput=game.currentInput.bind(game),originalClear=game.clearInputs.bind(game);
 game.currentInput=()=>{const input=originalInput();for(const key of Object.keys(pending)){if(!game.layoutEditing&&!game.cameraDrag)input[key] ||= pending[key];pending[key]=false;}if(!game.layoutEditing&&!game.cameraDrag)input.aiming ||= input.fire;return input;};
 game.clearInputs=()=>{for(const key of Object.keys(pending))pending[key]=false;originalClear();};
 addEventListener('keydown',e=>{if(e.repeat||e.target.matches('input,select'))return;if(e.code==='KeyQ')mark('kick');},true);
 addEventListener('pointerdown',e=>{
  if(e.target.closest?.('#kick-button')&&!game.$('kick-button').disabled)mark('kick');
  else if(e.target===game.renderer.domElement&&e.pointerType!=='touch'&&e.button===0)mark('fire');
  else if(e.target.closest?.('#fire-button')&&!game.$('fire-button').disabled)mark('fire');
 },true);
 addEventListener('pointercancel',()=>{for(const key of Object.keys(pending))pending[key]=false;},true);
}

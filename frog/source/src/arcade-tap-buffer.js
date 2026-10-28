// Preserve short taps between simulation frames, without making held inputs sticky.
export function installTapBuffer(game){
 const pending={fire:false,kick:false};
 const mark=key=>{if(game.running&&!game.layoutEditing)pending[key]=true;};
 const originalInput=game.currentInput.bind(game),originalClear=game.clearInputs.bind(game);
 game.currentInput=()=>{
  const input=originalInput();
  for(const key of Object.keys(pending)){if(!game.layoutEditing)input[key] ||= pending[key];pending[key]=false;}
  // A contextual kick owns this frame. Consume an earlier fly tap without
  // firing alongside the kick or deferring that shot to a later frame.
  if(input.kickTargetId)input.fire=false;
  if(!game.layoutEditing)input.aiming ||= input.fire;
  return input;
 };
 game.clearInputs=()=>{for(const key of Object.keys(pending))pending[key]=false;originalClear();};
 addEventListener('keydown',e=>{if(e.repeat||e.target.matches('input,select'))return;if(e.code==='KeyQ')mark('kick');},true);
 addEventListener('pointerdown',e=>{
  if(e.target.closest?.('#kick-button')&&!game.$('kick-button').disabled)mark('kick');
  else if(e.target===game.renderer.domElement&&e.pointerType==='mouse'&&e.button===0)mark('fire');
  else if(e.target.closest?.('#fire-button')&&!game.$('fire-button').disabled){
   // The center button shares the aim stick's pointer. An extra finger must
   // not queue a shot when the first finger already owns that stick.
   const integrated=game.$('fire-button').closest?.('#aim-stick');
   if((e.pointerType!=='mouse'||e.button===0)&&(!integrated||!game.pointers?.has('aim')))mark('fire');
  }
 },true);
 addEventListener('pointercancel',()=>{for(const key of Object.keys(pending))pending[key]=false;},true);
}

// An explicit reading pause uses the existing running gate: no second timer or simulation.
export function installObjectiveReader(game,panel){
 const doc=game.ui.ownerDocument,view=doc.defaultView;
 const make=(tag,css,text)=>{const e=doc.createElement(tag);e.className=css;if(text)e.textContent=text;return e;};
 const shade=make('div','objectives-shade');shade.hidden=true;shade.setAttribute('aria-hidden','true');
 const dock=make('button','objectives-dock');dock.id='objectives-toggle';dock.type='button';dock.hidden=true;dock.setAttribute('aria-controls',panel.id);dock.append(make('kbd','','U'),make('span','','ΣΤΟΧΟΙ'));
 const status=make('p','objectives-reading-status','ΠΑΥΣΗ · Διάβασε με την ησυχία σου');
 const minimize=make('button','objectives-minimize');minimize.id='objectives-minimize';minimize.type='button';minimize.append(make('span','minimize-symbol','▁'),make('kbd','','U'),make('span','','Ελαχιστοποίηση · Συνέχεια'));
 panel.classList.add('objective-reader');panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-labelledby','objectives-reader-heading');panel.querySelector('h2').id='objectives-reader-heading';panel.querySelector('h2').after(status);panel.append(minimize);game.ui.append(shade,dock);
 let round=game.state,shown=false,expanded=false,animation=null,revision=0,transition=null;
 const reduced=()=>view.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 function cancel(){revision++;animation?.cancel();animation=null;}
 function animate(opening,done){
  const current=animation?{transform:view.getComputedStyle(panel).transform,opacity:view.getComputedStyle(panel).opacity}:null;
  cancel();const ticket=revision,b=panel.getBoundingClientRect(),d=dock.getBoundingClientRect();
  const dx=d.x+d.width/2-(b.x+b.width/2),dy=d.y+d.height/2-(b.y+b.height/2);
  const full={transform:'translate(-50%, -50%) scale(1)',opacity:1,borderRadius:'24px'},small={transform:`translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${Math.min(.3,d.width/b.width)}, .12)`,opacity:0,borderRadius:'40px'};
  const keys=reduced()?[{opacity:opening?0:1},{opacity:opening?1:0}]:opening?[current||small,full]:[current||full,{...small,opacity:.25,offset:.8},small];
  animation=panel.animate(keys,{duration:reduced()?70:280,easing:opening?'cubic-bezier(.16,1,.3,1)':'cubic-bezier(.4,0,.6,1)',fill:'both'});
  animation.onfinish=()=>{if(ticket!==revision)return;animation.cancel();animation=null;transition=null;done?.();};
 }
 function open(){
  if(game.layoutEditing||(!game.running&&game.mode!=='objectives')||(expanded&&game.mode==='objectives'))return false;
  shown=true;expanded=true;transition='restoring';game.clearInputs();game.accumulator=0;game.running=false;game.mode='objectives';game.releaseMouseLook();game.sound.pause();game.persist();
  panel.hidden=false;shade.hidden=false;shade.classList.remove('is-closing');game.ui.classList.add('reading-objectives');dock.setAttribute('aria-expanded','true');
  animate(true);minimize.focus({preventScroll:true});return true;
 }
 function minimizeReader(event){
  if(game.mode!=='objectives'||!expanded)return false;
  expanded=false;transition='minimizing';dock.setAttribute('aria-expanded','false');shade.classList.add('is-closing');
  animate(false,()=>{panel.hidden=true;shade.hidden=true;game.ui.classList.remove('reading-objectives');game.clearInputs();
   if(doc.hidden){game.running=true;game.pause();}else{game.go(event);dock.focus({preventScroll:true});}
  });return true;
 }
 function toggle(event){return expanded?minimizeReader(event):open();}
 dock.onclick=toggle;minimize.onclick=minimizeReader;
 // Capture first so U/Escape never becomes a gameplay input or opens the pause menu.
 view.addEventListener('keydown',event=>{
  if(event.target?.closest?.('input,textarea,select,[contenteditable]:not([contenteditable="false"])')||event.isComposing||event.ctrlKey||event.metaKey||event.altKey)return;
  if(event.code==='KeyU'&&(game.running||game.mode==='objectives')&&!game.layoutEditing){event.preventDefault();event.stopImmediatePropagation();if(!event.repeat)toggle(event);return;}
  if(game.mode==='objectives'){
   if(event.code==='Escape'){event.preventDefault();event.stopImmediatePropagation();if(expanded)minimizeReader(event);}
   else if(event.code==='Tab'){event.preventDefault();(doc.activeElement===minimize?dock:minimize).focus({preventScroll:true});}
  }
 },true);
 return {open,minimize:minimizeReader,inspect:()=>({readerOpen:expanded,readerPaused:game.mode==='objectives',readerTransition:transition}),update(pose){
  if(round!==game.state){cancel();round=game.state;shown=false;expanded=false;transition=null;panel.hidden=true;shade.hidden=true;game.ui.classList.remove('reading-objectives');}
  const available=(game.running||game.mode==='objectives')&&!game.layoutEditing;dock.hidden=!available;
  // Instructions open only through U or the visible objectives button.
  const visible=game.mode==='objectives'&&!game.layoutEditing;panel.hidden=!visible;shade.hidden=!visible;game.ui.classList.toggle('reading-objectives',visible);dock.setAttribute('aria-expanded',String(expanded&&visible));
 }};
}

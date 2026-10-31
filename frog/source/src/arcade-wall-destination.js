
// Destination view is entered deliberately. It never changes the saved camera
// mode, yaw or pitch, and choosing a point never doubles as a shot or launch.
export function installWallDestination(game,pose){
 const ui=document.createElement('section');ui.id='wall-destination';ui.hidden=true;ui.setAttribute('aria-label','Προορισμός άλματος από τοίχο');
 ui.innerHTML='<p role="status"></p><div><button type="button" data-wall-pick>ΕΠΙΛΟΓΗ ΣΗΜΕΙΟΥ</button><button type="button" data-wall-launch disabled>ΕΚΤΟΞΕΥΣΗ</button><button type="button" data-wall-close hidden>ΠΙΣΩ</button></div>';
 game.ui.append(ui);const pick=ui.querySelector('[data-wall-pick]'),launch=ui.querySelector('[data-wall-launch]'),back=ui.querySelector('[data-wall-close]'),copy=ui.querySelector('p'),canvas=game.renderer.domElement;
 const state=game.wallDestination={active:false,selected:null};let token=null,drag=null;
 const active=()=>state.active&&game.wallHeld()&&game.running&&!game.layoutEditing;
 const camera=game.updateCameraPose.bind(game);
 function close(){state.active=false;drag=null;game.ui.classList.remove('wall-destination-picking');game.cameraReady=false;}
 function sync(){const f=game.state.actors[0].flight,next=f?.kind==='wallHold'?f:null;if(next!==token){close();token=next;state.selected=null;game.wallDestinationTarget=null;game.wallManualOverride=false;}}
 function refreshCamera(){const a=game.state.actors[0],p=pose(a,game.ground(a.x,a.z),game.w/game.h);game.focus.fromArray(p.look);game.camera.position.fromArray(p.position);game.camera.lookAt(game.focus);game.camera.updateMatrixWorld(true);}
 game.updateCameraPose=dt=>{sync();if(active())refreshCamera();else camera(dt);};
 function choose(event){
  const b=canvas.getBoundingClientRect();if(!b.width||!b.height)return;
  Object.assign(game.mouse,{x:(event.clientX-b.left)/b.width*game.w,y:(event.clientY-b.top)/b.height*game.h,valid:true,inside:true});game.mouseControl=true;refreshCamera();game.updateMouseTarget();
  if(game.mouse.target){state.selected={...game.mouse.target};game.wallDestinationTarget=state.selected;game.updateWallJumpAim();game.updateHUD();}
 }
 function open(){sync();if(!game.wallHeld()||!game.running||game.layoutEditing)return;game.clearInputs();game.actions.fire=false;game.releaseMouseLook?.();game.stopCameraDrag?.();game.wallManualOverride=true;state.active=true;game.ui.classList.add('wall-destination-picking');refreshCamera();game.updateWallJumpAim();game.updateHUD();}
 pick.addEventListener('click',open);back.addEventListener('click',()=>{close();game.updateHUD();});
 launch.addEventListener('click',()=>{if(game.wallJumpAim?.plan?.valid&&(!state.active||state.selected)){game.wallControls.queueLaunch();close();}});
 const onDown=e=>{if(!active()||e.target!==canvas||e.pointerType==='mouse'&&e.button!==0)return;e.preventDefault();e.stopImmediatePropagation();drag=e.pointerId;choose(e);};
 const onMove=e=>{if(!active()||e.target!==canvas||e.pointerType!=='mouse'&&e.pointerId!==drag)return;e.preventDefault();e.stopImmediatePropagation();choose(e);};
 const onUp=e=>{if(!active()||e.target!==canvas)return;e.preventDefault();e.stopImmediatePropagation();if(e.pointerId===drag)drag=null;};
 const onKey=e=>{if(active()&&e.code==='Escape'){e.preventDefault();e.stopImmediatePropagation();close();game.updateHUD();}};
 for(const[type,fn]of[['pointerdown',onDown],['pointermove',onMove],['pointerup',onUp],['pointercancel',onUp],['keydown',onKey]])addEventListener(type,fn,true);
 const hud=game.updateHUD.bind(game);game.updateHUD=()=>{
  hud();sync();const a=game.state.actors[0],show=game.wallHeld()&&game.running&&!game.layoutEditing&&(game.wallAiming()||a.flight.time>.45);ui.hidden=!show;
  if(!show){if(state.active)close();return;}
  const hint=game.$('wall-jump-hint');ui.style.top=hint.style.top||'90px';hint.hidden=true;
  const p=game.wallJumpAim?.plan,ready=!!p?.valid&&(!state.active||!!state.selected);launch.disabled=!ready;back.hidden=!state.active;pick.hidden=state.active;
  const reasons={range:'Διάλεξε σημείο πιο κοντά.',wall:'Διάλεξε σημείο μακριά από τον τοίχο.',height:'Το σημείο είναι πολύ ψηλά.',blocked:'Υπάρχει εμπόδιο στη διαδρομή.',speed:'Διάλεξε σημείο πιο κοντά.',roof:'Η στέγη εμποδίζει το άλμα.',terrain:'Το έδαφος εμποδίζει τη διαδρομή.'};
  const text=state.active?(state.selected?(ready?'Προορισμός έτοιμος · πάτησε ΕΚΤΟΞΕΥΣΗ':reasons[p?.reason]||'Διάλεξε άλλο σημείο.'):(game.touch?'Άγγιξε το σημείο όπου θέλεις να προσγειωθείς.':'Δείξε με το ποντίκι το σημείο προσγείωσης.')):(game.settings.wallJumpMode==='auto'&&!game.wallManualOverride?'Δεν βρέθηκε αυτόματος προορισμός.':'Κρατιέσαι στον τοίχο · διάλεξε προορισμό.');if(copy.textContent!==text)copy.textContent=text;
 };
 return{open,close,inspect:()=>({active:state.active,selected:state.selected,visible:!ui.hidden}),destroy(){close();ui.remove();for(const[type,fn]of[['pointerdown',onDown],['pointermove',onMove],['pointerup',onUp],['pointercancel',onUp],['keydown',onKey]])removeEventListener(type,fn,true);}};
}

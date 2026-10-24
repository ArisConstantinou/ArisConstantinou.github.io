export class GameInput {
  constructor(canvas,onAction){
    this.canvas=canvas;this.onAction=onAction;this.keys=new Set();this.pressed=new Set();this.released=new Set();
    this.dx=0;this.dy=0;this.left=false;this.right=false;this.pointerLocked=false;
    this.mode='third';this.zoomDelta=0;this.pointerInside=false;
    this.mouseX=innerWidth/2;this.mouseY=innerHeight/2;
    this.mouse={x:this.mouseX,y:this.mouseY,ndcX:0,ndcY:0};
    this.ndc={x:0,y:0};this.mouseNDC=this.ndc;
    this.abort=new AbortController();const signal=this.abort.signal;
    addEventListener('keydown',e=>{
      if(e.target instanceof HTMLElement&&e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
      if(['Space','Tab','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();
      if(!this.keys.has(e.code))this.pressed.add(e.code);this.keys.add(e.code);
      if(!e.repeat&&e.code==='Escape')this.onAction('escape');
    },{signal});
    addEventListener('keyup',e=>{this.keys.delete(e.code);this.released.add(e.code);},{signal});
    addEventListener('mousemove',e=>{
      const rect=this.canvas.getBoundingClientRect();
      this.mouseX=e.clientX;this.mouseY=e.clientY;
      this.mouse.x=e.clientX;this.mouse.y=e.clientY;
      this.ndc.x=((e.clientX-rect.left)/(rect.width||1))*2-1;
      this.ndc.y=1-((e.clientY-rect.top)/(rect.height||1))*2;
      this.mouse.ndcX=this.ndc.x;this.mouse.ndcY=this.ndc.y;
      if(this.mode!=='topdown'&&(this.pointerLocked||this.right)){this.dx+=e.movementX||0;this.dy+=e.movementY||0;}
    },{signal});
    canvas.addEventListener('mouseenter',()=>{this.pointerInside=true;},{signal});
    canvas.addEventListener('mouseleave',()=>{this.pointerInside=false;},{signal});
    canvas.addEventListener('mousedown',e=>{if(e.button===0){this.left=true;this.pressed.add('MouseLeft');}if(e.button===2){this.right=true;this.pressed.add('MouseRight');}},{signal});
    addEventListener('mouseup',e=>{if(e.button===0){this.left=false;this.released.add('MouseLeft');}if(e.button===2){this.right=false;this.released.add('MouseRight');}},{signal});
    canvas.addEventListener('wheel',e=>{e.preventDefault();const scale=e.deltaMode===1?16:e.deltaMode===2?innerHeight:1;this.zoomDelta+=Math.max(-180,Math.min(180,e.deltaY*scale));},{signal,passive:false});
    canvas.addEventListener('contextmenu',e=>e.preventDefault(),{signal});
    document.addEventListener('pointerlockchange',()=>{const old=this.pointerLocked;this.pointerLocked=document.pointerLockElement===canvas;if(old&&!this.pointerLocked)this.onAction('unlock');},{signal});
    addEventListener('blur',()=>{this.clear();this.onAction('blur');},{signal});
  }
  setMode(mode){this.mode=mode;this.canvas.style.cursor=mode==='topdown'?'crosshair':'default';if(mode==='topdown')this.clearMouseMotion();}
  clearMouseMotion(){this.dx=0;this.dy=0;this.zoomDelta=0;}
  lock(){if(this.mode==='topdown')return;try{const p=this.canvas.requestPointerLock();if(p?.catch)p.catch(()=>{});}catch{}}
  unlock(){if(document.pointerLockElement===this.canvas)document.exitPointerLock();}
  down(k){return this.keys.has(k);}
  hit(k){return this.pressed.has(k);}
  up(k){return this.released.has(k);}
  endFrame(){this.pressed.clear();this.released.clear();this.dx=0;this.dy=0;this.zoomDelta=0;}
  clear(){this.keys.clear();this.pressed.clear();this.released.clear();this.left=false;this.right=false;this.clearMouseMotion();}
  destroy(){this.abort.abort();}
}

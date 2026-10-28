// Headed Chromium receives real X11/XTest mouse motion. CDP absolute motion
// reports zero or window-warp deltas under pointer lock and cannot validate it.
import {execFileSync,spawn} from 'node:child_process';
const nativeMousePython="import ctypes as C,sys,time,os\nx=C.CDLL('libX11.so.6');t=C.CDLL('libXtst.so.6')\nx.XOpenDisplay.argtypes=[C.c_char_p];x.XOpenDisplay.restype=C.c_void_p\nx.XFlush.argtypes=[C.c_void_p];x.XSync.argtypes=[C.c_void_p,C.c_int];x.XCloseDisplay.argtypes=[C.c_void_p]\nt.XTestFakeRelativeMotionEvent.argtypes=[C.c_void_p,C.c_int,C.c_int,C.c_ulong]\nt.XTestFakeMotionEvent.argtypes=[C.c_void_p,C.c_int,C.c_int,C.c_int,C.c_ulong]\nt.XTestFakeButtonEvent.argtypes=[C.c_void_p,C.c_uint,C.c_int,C.c_ulong]\nd=x.XOpenDisplay(None)\nif not d:raise RuntimeError('No X11 display')\nmode=sys.argv[1]\nif mode=='move':t.XTestFakeMotionEvent(d,-1,round(float(sys.argv[2])),round(float(sys.argv[3])),0)\nelif mode=='relative':\n dx,dy=round(float(sys.argv[2])),round(float(sys.argv[3]));n=max(1,(max(abs(dx),abs(dy))+79)//80)\n for i in range(n):\n  t.XTestFakeRelativeMotionEvent(d,round(dx*(i+1)/n)-round(dx*i/n),round(dy*(i+1)/n)-round(dy*i/n),0);x.XFlush(d);time.sleep(.02)\nelif mode=='down':t.XTestFakeButtonEvent(d,int(sys.argv[2]),1,0)\nelif mode=='up':t.XTestFakeButtonEvent(d,int(sys.argv[2]),0,0)\nx.XSync(d,0);x.XCloseDisplay(d)\n";
let nativeDisplay=null;
if(!process.env.DISPLAY){
 nativeDisplay=spawn('Xvfb',['-displayfd','1','-screen','0','2000x1400x24','-nolisten','tcp'],{stdio:['ignore','pipe','inherit']});
 const display=await new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>reject(new Error('Xvfb did not start')),10000);let text='';
  nativeDisplay.once('error',reject);nativeDisplay.once('exit',code=>reject(new Error('Xvfb exited: '+code)));
  nativeDisplay.stdout.on('data',chunk=>{text+=chunk;if(text.includes('\n')){clearTimeout(timer);resolve(text.trim());}});
 });
 process.env.DISPLAY=':'+display;nativeDisplay.unref();nativeDisplay.stdout.unref();process.once('exit',()=>nativeDisplay.kill());
}

const installed=new WeakMap();
const physical=(...args)=>execFileSync('python3',['-c',nativeMousePython,...args.map(String)],{env:process.env,timeout:10000});
function listen(){
 if(window.__frogNativeMouse)return;
 window.__frogNativeMouse={sequence:0,x:0,y:0,dx:0,dy:0};
 addEventListener('pointermove',event=>{
  if(!event.isTrusted||event.pointerType!=='mouse')return;
  const state=window.__frogNativeMouse;state.sequence++;state.x=event.clientX;state.y=event.clientY;
  state.dx+=event.movementX;state.dy+=event.movementY;
 },true);
}
export function installNativeMouse(page){
 if(installed.has(page))return installed.get(page);
 page.addInitScript(listen);
 let offset=null,last={x:0,y:0};
 const state=()=>page.evaluate(()=>({locked:!!document.pointerLockElement,...window.__frogNativeMouse}));
 async function calibrate(){
  await page.bringToFront();await page.evaluate(listen);
  if(offset)return;
  if((await state()).locked)throw new Error('Calibrate native mouse before pointer capture');
  const view=await page.evaluate(()=>({x:screenX,y:screenY,width:innerWidth,height:innerHeight,outerHeight}));
  const sx=Math.round(view.x+view.width/2),sy=Math.round(view.y+view.outerHeight-view.height+view.height/2);
  physical('move',sx-17,sy-13);await page.waitForTimeout(40);
  const before=await state();physical('move',sx,sy);
  await page.waitForFunction(n=>window.__frogNativeMouse.sequence>n,before.sequence);
  const observed=await state();offset={x:sx-observed.x,y:sy-observed.y};last={x:observed.x,y:observed.y};
 }
 const mouse={
  async move(x,y){
   await calibrate();const before=await state();
   if(before.locked){
    const dx=Math.round(x-last.x),dy=Math.round(y-last.y);
    if(dx||dy){
     physical('relative',dx,dy);
     await page.waitForFunction(({dx,dy,x,y})=>Math.abs(window.__frogNativeMouse.dx-x-dx)<1.1&&Math.abs(window.__frogNativeMouse.dy-y-dy)<1.1,{dx,dy,x:before.dx,y:before.dy},{timeout:5000});
    }
   }else{
    physical('move',Math.round(offset.x+x),Math.round(offset.y+y));
    await page.waitForFunction(({x,y})=>Math.abs(window.__frogNativeMouse.x-x)<1.1&&Math.abs(window.__frogNativeMouse.y-y)<1.1,{x,y},{timeout:5000});
   }
   last={x,y};
  },
  async down({button='left'}={}){await calibrate();physical('down',{left:1,middle:2,right:3}[button]);await page.waitForTimeout(30);},
  async up({button='left'}={}){await calibrate();physical('up',{left:1,middle:2,right:3}[button]);await page.waitForTimeout(30);},
  async click(x,y,options={}){await mouse.move(x,y);await mouse.down(options);await mouse.up(options);},
 };
 const original=page.mouse;
 for(const name of ['move','down','up','click'])original[name]=mouse[name];
 installed.set(page,mouse);return mouse;
}
export async function clickNative(page,selector){
 installNativeMouse(page);
 const locator=page.locator(selector);await locator.waitFor({state:'visible'});
 const rect=await locator.boundingBox();if(!rect)throw new Error('No clickable bounds for '+selector);
 if(!await locator.isEnabled())throw new Error('Disabled native click target '+selector);
 await page.mouse.click(rect.x+rect.width/2,rect.y+rect.height/2);
}

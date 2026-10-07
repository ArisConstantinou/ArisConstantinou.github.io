import { LOCATIONS } from './locations.js';

// A hand-drawn, procedural interpretation of Moutoullas. Positions are deliberately
// a playable composition, never a claim to be cadastral or surveyed coordinates.
const U = 11.5, V = 5.65;
const TAU = Math.PI * 2;
const PALETTE = { ink:'#384338', ground:'#bcc49b', grass:'#b3bd90', path:'#d4c4a1', water:'#6caaa4', stone:'#b9b09a', roof:'#a96646' };
const clamp = (v,lo,hi) => Math.max(lo,Math.min(hi,v));
const lerp = (a,b,t) => a+(b-a)*t;
function rng(seed) { let s = seed >>> 0; return () => ((s = Math.imul(1664525,s)+1013904223 >>> 0) / 4294967296); }
function seedOf(s) { let h=2166136261; for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0; }
function elevation(x,z) {
  const hill = 3.9*Math.exp(-((x-78)**2+(z-77)**2)/380);
  return 1.3 + .027*(x-40) + .018*Math.max(0,z-40) + hill;
}
function project(x,z,h=0,base=null) { return {x:(x-z)*U,y:(x+z)*V-(h+(base??elevation(x,z)))*U}; }
function unproject(sx,sy) {
  let x=sx/(2*U)+sy/(2*V),z=sy/(2*V)-sx/(2*U);
  for(let i=0;i<5;i++){ const dy=sy+elevation(x,z)*U;x=sx/(2*U)+dy/(2*V);z=dy/(2*V)-sx/(2*U); }
  return {x,z};
}
function poly(c,pts,fill,stroke=null,width=1) {
  if(!pts.length)return;c.beginPath();c.moveTo(pts[0].x,pts[0].y);for(let i=1;i<pts.length;i++)c.lineTo(pts[i].x,pts[i].y);c.closePath();
  if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}
}
function line(c,pts,color,width=1) {if(pts.length<2)return;c.beginPath();c.moveTo(pts[0].x,pts[0].y);for(let i=1;i<pts.length;i++)c.lineTo(pts[i].x,pts[i].y);c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.lineJoin='round';c.stroke();}
function oval(c,x,y,rx,ry,fill) {c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fillStyle=fill;c.fill();}
function rounded(c,x,y,w,h,r=8) {c.beginPath();if(c.roundRect)c.roundRect(x,y,w,h,r);else{c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);}c.closePath();}
const ROAD_PATHS = [
  [[38,95],[39,83],[40,73],[44,64],[46,56],[48,50],[52,45],[53,37],[56,29],[58,14]],
  [[14,56],[27,55],[34,55],[38,57],[44,57],[49,60],[55,64],[62,68],[69,74],[76,77],[86,85]],
  [[46,50],[45,43],[48,38],[55,37],[60,38],[66,42],[71,45],[80,49],[91,52]],
  [[52,46],[58,53],[65,53],[69,57],[73,62],[80,65],[91,70]],
  [[34,55],[31,43],[27,34],[23,22],[17,13]],
  [[38,58],[29,59],[23,63],[22,73],[25,83]],
  [[53,37],[61,30],[68,29],[76,25],[88,20],[102,17]],
  [[39,82],[47,82],[56,82],[63,77]],
  [[45,43],[41,34],[40,29],[44,24],[49,23],[56,29]],
];
const RIVER = [[15,-8],[18,7],[22,21],[28,34],[32,42],[36,51],[37,58],[33,70],[34,86],[39,105],[45,120]];
function distanceToSegment(p,a,b) {const dx=b[0]-a[0],dz=b[1]-a[1],d=dx*dx+dz*dz;const t=d?clamp(((p.x-a[0])*dx+(p.z-a[1])*dz)/d,0,1):0;return Math.hypot(p.x-a[0]-t*dx,p.z-a[1]-t*dz);}
function nearRoad(x,z,d=2.4){return ROAD_PATHS.some(path=>path.some((a,i)=>i&&distanceToSegment({x,z},path[i-1],a)<d));}
function nearRiver(x,z,d=3){return RIVER.some((a,i)=>i&&distanceToSegment({x,z},RIVER[i-1],a)<d);}
function samplePath(path,step=1) { const out=[];for(let i=1;i<path.length;i++){let a=path[i-1],b=path[i],n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/step);for(let j=0;j<n;j++)out.push([lerp(a[0],b[0],j/n),lerp(a[1],b[1],j/n)]);}out.push(path[path.length-1]);return out; }
const ROAD_SAMPLES=ROAD_PATHS.map(p=>samplePath(p));
const RIVER_SAMPLES=samplePath(RIVER,.8);

function makeCanvas(w,h) {
  let c;if(typeof document!=='undefined'&&document.createElement)c=document.createElement('canvas');else if(typeof OffscreenCanvas!=='undefined')c=new OffscreenCanvas(w,h);else throw new Error('Canvas is unavailable');
  c.width=Math.ceil(w);c.height=Math.ceil(h);return c;
}
function footprint(loc){
  let w=3.3,d=3.9,h=4.4;
  if(loc.type==='office'){w=4.2;d=4.6;h=6.3;}
  if(loc.type==='church'){w=4.5;d=6.3;h=4.4;}
  // Panagia is the modest medieval timber-roofed chapel, quite distinct from the
  // larger parish church at the centre of the playable village.
  if(loc.id==='church'){w=4.9;d=3.25;h=1.75;}
  if(loc.type==='workshop'){w=4.5;d=4.1;h=3.9;}
  if(loc.type==='inn'){w=4.5;d=4.8;h=6.6;}
  if(loc.type==='school'){w=4.5;d=4.4;h=5.1;}
  if(loc.type==='cafe'){w=4.0;d=4.2;h=4.3;}
  if(loc.type==='coop'){w=4.1;d=4.5;h=4.5;}
  if(['square','orchard','forest','trail','market','bridge','quarry','fountain','wash'].includes(loc.type))h=0;
  return {w:w*(loc.size||1),d:d*(loc.size||1),h:h*(loc.size||1)};
}

function groundRect(c,x,z,w,d,color,stroke=null,base=null,h=0){poly(c,[project(x-w/2,z-d/2,h,base),project(x+w/2,z-d/2,h,base),project(x+w/2,z+d/2,h,base),project(x-w/2,z+d/2,h,base)],color,stroke);}
function block(c,x,z,w,d,h,colors=['#c9b99a','#8f8c79','#b1a68d'],base=null,y=0){
  const b=base??elevation(x,z),x0=x-w/2,x1=x+w/2,z0=z-d/2,z1=z+d/2;
  const A=project(x0,z0,y+h,b),B=project(x1,z0,y+h,b),C=project(x1,z1,y+h,b),D=project(x0,z1,y+h,b);
  poly(c,[B,C,project(x1,z1,y,b),project(x1,z0,y,b)],colors[1],'#655e482e',.6);
  poly(c,[D,C,project(x1,z1,y,b),project(x0,z1,y,b)],colors[2],'#655e482e',.6);
  poly(c,[A,B,C,D],colors[0]);return {A,B,C,D,b,x0,x1,z0,z1};
}
function wallStones(c,a,b,y0,h,side,base,seed,condition=50){
  const random=rng(seed);const n=Math.max(3,Math.floor(h/.44));const width=side==='x'?b.z-a.z:b.x-a.x;
  for(let row=0;row<n;row++){
    const y=y0+.2+row*h/n;
    const A=project(a.x,a.z,y,base),B=project(b.x,b.z,y,base);
    line(c,[A,B],row%3===0?'#4f4a382b':'#efe1c138',.65);
    for(let j=0;j<Math.ceil(width/.75);j++){
      const t=clamp((j+.2+random()*.45+(row%2)*.4)*.75/width,0,1);
      const X=lerp(a.x,b.x,t),Z=lerp(a.z,b.z,t);
      line(c,[project(X,Z,y,base),project(X,Z,y+h/n*.75,base)],'#65594435',.65);
      if(random()<.13) {const p=project(X,Z,y+.12,base);line(c,[p,{x:p.x+3+random()*4,y:p.y+(side==='x'?3:-3)}],condition<35?'#8b84712e':'#b8a88c55',2);}
    }
  }
}
function windowOn(c,loc,side,t,height,w=.9,h=1.4,shutters=true){
  const f=footprint(loc),base=elevation(loc.x,loc.z),start=side==='z'?loc.x-f.w/2:loc.z-f.d/2;
  const pos=start+(side==='z'?f.w:f.d)*t;
  const get=(u,v)=>side==='z'?project(pos+u,loc.z+f.d/2+.012,height+v,base):project(loc.x+f.w/2+.012,pos+u,height+v,base);
  const corners=[get(-w/2,0),get(w/2,0),get(w/2,h),get(-w/2,h)];
  poly(c,corners,'#4b594f','#8a7555',2.4);
  line(c,[get(-w/2,.08),get(w/2,.08)],'#d8c5a2',2.2);
  line(c,[get(0,.05),get(0,h-.02)],'#c4a77b',1);
  line(c,[get(-w/2,h*.51),get(w/2,h*.51)],'#c4a77b',.8);
  if(shutters){for(const s of [-1,1]){const a=s*w*.56,b=s*w*.98;poly(c,[get(a,0),get(b,.08),get(b,h+.04),get(a,h)],loc.type==='office'?'#5c756c':'#746e51','#514a383d',.6);for(let j=1;j<5;j++)line(c,[get(a,h*j/5),get(b,h*j/5)],'#d9caa02a',.5);}}
}
function doorOn(c,loc,side='z',t=.5){
  const f=footprint(loc),base=elevation(loc.x,loc.z),p=(side==='z'?loc.x-f.w/2:loc.z-f.d/2)+(side==='z'?f.w:f.d)*t;
  const get=(u,h)=>side==='z'?project(p+u,loc.z+f.d/2+.03,h,base):project(loc.x+f.w/2+.03,p+u,h,base);
  const doorHeight=loc.id==='church'?1.95:2.38;
  poly(c,[get(-.61,0),get(.61,0),get(.61,doorHeight),get(-.61,doorHeight)],'#554b37','#c3b293',3.5);
  for(let i=-.4;i<.6;i+=.25)line(c,[get(i,.12),get(i,doorHeight-.12)],'#9c7a4866',.6);
  const dot=get(.33,1.15);oval(c,dot.x,dot.y,1,1.3,'#d1af67');
  if(side==='z')block(c,p,loc.z+f.d/2+.46,1.7,.8,.22,['#b6ae97','#898873','#a39c86'],base);
}
function roof(c,loc,condition,rand){
  const f=footprint(loc),base=elevation(loc.x,loc.z),over=loc.id==='church'?1.0:.42;
  const x0=loc.x-f.w/2-over,x1=loc.x+f.w/2+over,z0=loc.z-f.d/2-over,z1=loc.z+f.d/2+over;
  const h=f.h+.06,rise=loc.id==='church'?3.15:loc.type==='church'?3.1:2.2;
  const P=(x,z,y)=>project(x,z,y,base);
  const A=P(x0,z0,h),B=P(x1,z0,h),C=P(x1,z1,h),D=P(x0,z1,h),R0=P(x0,loc.z,h+rise),R1=P(x1,loc.z,h+rise);
  poly(c,[P(loc.x+f.w/2,loc.z-f.d/2,f.h),P(loc.x+f.w/2,loc.z+f.d/2,f.h),P(loc.x+f.w/2,loc.z,f.h+rise-.15)],'#b6a889','#77685266',.7);
  poly(c,[A,B,R1,R0],loc.id==='church'?'#958067':condition>=65?'#bc7955':'#ad7452','#704c38',.8);
  poly(c,[R0,R1,C,D],loc.id==='church'?'#77664e':condition>=65?'#a96643':'#936345','#674731',.8);
  for(let k=0;k<2;k++){
    const zEnd=k?z0:z1;const rows=Math.ceil(Math.abs(zEnd-loc.z)*3.0);
    for(let row=1;row<=rows;row++){
      const t=row/rows,Z=lerp(loc.z,zEnd,t),H=lerp(h+rise,h,t);
      line(c,[P(x0,Z,H),P(x1,Z,H)],k?'#d898693a':'#e0aa7660',.75);
      const count=Math.ceil((x1-x0)*3.4);
      for(let col=0;col<count;col++){
        const X=lerp(x0,x1,clamp((col+(row%2)*.5)/count,0,1));
        const prev=(row-.86)/rows;
        line(c,[P(X,lerp(loc.z,zEnd,prev),lerp(h+rise,h,prev)),P(X,Z,H)],rand()>.35?'#5d442e45':'#edc28a50',.65);
      }
    }
  }
  line(c,[R0,R1],'#e0b17c',2.3);line(c,[D,C],'#614c35',2.2);line(c,[C,R1],'#805236',1.5);
  // Weathering is tied directly to the simulation's building condition.
  if(condition<55){
    const holes=condition<25?3:condition<40?2:1;
    for(let k=0;k<holes;k++){
      const tx=.2+rand()*.63,tz=.25+rand()*.54,X=lerp(x0,x1,tx),Z=lerp(loc.z,z1,tz),H=lerp(h+rise,h,tz)+.02;
      const q=.42+rand()*.32;
      poly(c,[P(X-q,Z,H+.3),P(X+.43,Z,H+.3),P(X+.55,Z+.54,H-.3),P(X-.24,Z+.7,H-.35),P(X-q-.2,Z+.28,H)],'#514d38','#805b3c',1);
      line(c,[P(X-q+.1,Z,H+.14),P(X+.38,Z+.55,H-.26)],'#c6a06b',1.5);
    }
  }
  if(!['church','workshop'].includes(loc.type)){
    block(c,loc.x-f.w*.22,loc.z-f.d*.2,.65,.65,1.5,['#b9ac90','#807c68','#a19a82'],base,f.h+1.15);
    block(c,loc.x-f.w*.22,loc.z-f.d*.2,.83,.79,.18,['#d0c5a8','#8a836e','#aba189'],base,f.h+2.6);
  }
  return {top:Math.min(R0.y,R1.y),rise};
}
function balcony(c,loc){
  const f=footprint(loc),b=elevation(loc.x,loc.z),z=loc.z+f.d/2+.9,x0=loc.x-f.w*.36,x1=loc.x+f.w*.35;
  groundRect(c,(x0+x1)/2,z-.32,x1-x0,1.2,'#80704b','#55462f',b,2.75);
  for(let x=x0;x<=x1;x+=.43)line(c,[project(x,z,2.75,b),project(x,z,3.83,b)],'#5e583f',1.4);
  line(c,[project(x0,z,3.83,b),project(x1,z,3.83,b)],'#b29b67',2);
  for(const x of [x0,x1])line(c,[project(x,z,0,b),project(x,z,4,b)],'#6e6549',2.5);
  line(c,[project(x0,z,2.7,b),project(x1,z,2.7,b)],'#453e2b',2.5);
}
function pot(c,x,z,base,flowers=false){
  const p=project(x,z,.06,base);poly(c,[{x:p.x-4,y:p.y-6},{x:p.x+4,y:p.y-6},{x:p.x+2.8,y:p.y+1},{x:p.x-2.8,y:p.y+1}],'#a46945');
  oval(c,p.x,p.y-6,4.2,1.7,'#bd8b5c');oval(c,p.x,p.y-9,4.4,3.5,'#688055');
  if(flowers){oval(c,p.x-2,p.y-11,1.8,1.8,'#d7936d');oval(c,p.x+2,p.y-9,1.8,1.8,'#f1cc8d');}
}
function rubble(c,loc,condition,rand){
  if(condition>58)return;
  const f=footprint(loc),base=elevation(loc.x,loc.z),n=condition<25?13:7;
  for(let i=0;i<n;i++){const x=loc.x-f.w*.5+rand()*(f.w+2),z=loc.z+f.d/2+.3+rand()*1.35;
    if(i%3===0){const p=project(x,z,.02,base);line(c,[{x:p.x-4,y:p.y-1},{x:p.x+5,y:p.y+3}],'#8e6d42',2);}
    else block(c,x,z,.17+rand()*.35,.2+rand()*.3,.15+rand()*.22,['#b5aa8a','#867f68','#9b947c'],base);
  }
}
function drawHouse(c,loc,condition,rand){
  const f=footprint(loc),b=elevation(loc.x,loc.z),P=(x,z,h=0)=>project(x,z,h,b);
  const shadow=[P(loc.x-f.w/2,loc.z-f.d/2),P(loc.x+f.w/2,loc.z-f.d/2),P(loc.x+f.w/2+2.3,loc.z+f.d/2+1.5),P(loc.x-f.w/2+1.5,loc.z+f.d/2+2.7)];
  poly(c,shadow,'#34463025');
  const shades=condition>=65?['#d6c8a7','#a79f86','#c9bb9a']:['#c4b89a','#9d9881','#b7aa8d'];
  block(c,loc.x,loc.z,f.w,f.d,f.h,shades,b);
  wallStones(c,{x:loc.x+f.w/2,z:loc.z-f.d/2},{x:loc.x+f.w/2,z:loc.z+f.d/2},0,f.h,'x',b,seedOf(loc.id),condition);
  wallStones(c,{x:loc.x-f.w/2,z:loc.z+f.d/2},{x:loc.x+f.w/2,z:loc.z+f.d/2},0,f.h,'z',b,seedOf(loc.id)+5,condition);
  // A pale lime-wash patch and exposed stone are typical of the old houses.
  if(loc.type!=='church'){
    poly(c,[P(loc.x-f.w*.46,loc.z+f.d/2+.02,1.5),P(loc.x+f.w*.42,loc.z+f.d/2+.02,1.3),P(loc.x+f.w*.45,loc.z+f.d/2+.02,f.h-.3),P(loc.x-f.w*.46,loc.z+f.d/2+.02,f.h-.3)],condition>=65?'#e0d4b9c9':'#d6c9a98a');
  }
  if(loc.type==='church'){
    doorOn(c,loc,'x',.5);
    windowOn(c,loc,'z',.35,loc.id==='church'?.95:1.85,.45,loc.id==='church'?.65:.9,false);windowOn(c,loc,'z',.7,loc.id==='church'?.95:1.85,.45,loc.id==='church'?.65:.9,false);
    const p=P(loc.x+f.w/2+.03,loc.z,loc.id==='church'?2.17:3.05);line(c,[{x:p.x-2.2,y:p.y},{x:p.x+2.2,y:p.y}],'#797258',1.3);line(c,[{x:p.x,y:p.y-4},{x:p.x,y:p.y+4}],'#797258',1.3);
    if(loc.id==='church'){
      const zz=loc.z+f.d/2+.8;
      for(let xx=loc.x-f.w/2-.6;xx<=loc.x+f.w/2+.65;xx+=(f.w+1.2)/4){line(c,[P(xx,zz,.02),P(xx,zz,f.h+.02)],'#766443',2.2);line(c,[P(xx,zz,f.h*.62),P(xx+.45,zz,f.h+.02)],'#95825c',1.3);}
      line(c,[P(loc.x-f.w/2-.8,zz,f.h),P(loc.x+f.w/2+.8,zz,f.h)],'#584f38',2.8);
    }
  }else{
    doorOn(c,loc,'z',f.w>4?.35:.49);
    windowOn(c,loc,'x',.35,1.7,.78,1.18);
    if(f.d>4.2)windowOn(c,loc,'x',.75,1.7,.7,1.15);
    if(f.h>5.5){windowOn(c,loc,'z',.3,3.75,.85,1.35);windowOn(c,loc,'z',.74,3.75,.85,1.35);windowOn(c,loc,'x',.5,3.7,.8,1.4);balcony(c,loc);}
    else if(f.w>3.6)windowOn(c,loc,'z',.77,1.55,.8,1.15);
  }
  if(condition<42){
    const x=loc.x+f.w*.12,z=loc.z+f.d/2+.04;
    line(c,[P(x-.22,z,f.h*.86),P(x,z,f.h*.64),P(x-.13,z,f.h*.5),P(x+.22,z,f.h*.27)],'#675f427e',.8);
    if(condition<26)poly(c,[P(loc.x-f.w/2+.12,z,.2),P(loc.x-f.w/2+.65,z,.2),P(loc.x-f.w/2+.57,z,1.02),P(loc.x-f.w/2+.22,z,1.32)],'#817c61');
  }
  roof(c,loc,condition,rand);
  if(loc.type==='church'){
    const p=P(loc.x+f.w*.46,loc.z,f.h+3.52);line(c,[{x:p.x,y:p.y-8},{x:p.x,y:p.y+3}],'#665c40',2);line(c,[{x:p.x-3.5,y:p.y-4},{x:p.x+3.5,y:p.y-4}],'#665c40',1.6);
    if(loc.id==='paraskevi'){
      const xx=loc.x-f.w*.7,zz=loc.z+f.d*.2;
      block(c,xx,zz,1.1,1.2,5.4,['#c7b897','#b0a48a','#c3b599'],b);
      const pp=P(xx,zz,5.9);poly(c,[{x:pp.x-10,y:pp.y+4},{x:pp.x,y:pp.y-10},{x:pp.x+10,y:pp.y+4}],'#ae744d','#76583b',.7);
      oval(c,pp.x,pp.y+10,3,5,'#615c44');line(c,[{x:pp.x,y:pp.y-10},{x:pp.x,y:pp.y-18}],'#6b6041',1.5);line(c,[{x:pp.x-3,y:pp.y-15},{x:pp.x+3,y:pp.y-15}],'#6b6041',1.4);
    }
  }
  if(loc.type==='office'){
    // A quiet community flag, not a modern city-hall facade.
    const p=P(loc.x+f.w*.45,loc.z+f.d/2+.13,4.1);line(c,[p,{x:p.x,y:p.y-25}],'#635d47',1.4);poly(c,[{x:p.x,y:p.y-25},{x:p.x+14,y:p.y-21},{x:p.x+14,y:p.y-12},{x:p.x,y:p.y-16}],'#e8e0c8');oval(c,p.x+6,p.y-19,2.5,1.4,'#bc9b57');
    const s=P(loc.x,loc.z+f.d/2+.1,2.65);c.save();c.translate(s.x,s.y);c.transform(1,.49,0,1,0,0);c.fillStyle='#496558';c.fillRect(-10,-5,20,7);c.fillStyle='#e6ddbd';c.font='4px Georgia';c.textAlign='center';c.fillText('ΚΟΙΝΟΤΗΤΑ',0,.1);c.restore();
  }
  if(loc.type==='cafe'){
    for(const [dx,dz]of [[-1.8,3.4],[.5,3.8],[2.3,3.4]])drawTable(c,loc.x+dx,loc.z+dz,b);
    const A=P(loc.x-f.w*.53,loc.z+f.d/2+.05,3.35),B=P(loc.x+f.w*.53,loc.z+f.d/2+.05,3.35),C=P(loc.x+f.w*.53,loc.z+f.d/2+1.5,2.85),D=P(loc.x-f.w*.53,loc.z+f.d/2+1.5,2.85);
    poly(c,[A,B,C,D],'#777f58','#5a6645',.8);line(c,[D,C],'#d4c49a',2.2);
  }
  if(loc.type==='bakery'){
    const p=P(loc.x+f.w/2+1,loc.z+.7,.5);oval(c,p.x,p.y-5,11,10,'#b59d74');oval(c,p.x+1,p.y-1,5,5,'#5e543c');oval(c,p.x+1,p.y,2.5,3,'#dca34e');
    for(let i=0;i<5;i++)block(c,loc.x+f.w/2+1.3+i*.16,loc.z+1.6,.15,1,.15,['#a18b5c','#665a3e','#827046'],b,i*.12);
  }
  if(loc.type==='workshop'){
    for(let i=0;i<4;i++)drawLog(c,loc.x-f.w/2-.7,loc.z-.7+i*.65,2.5,b);
    drawTrough(c,loc.x+1.5,loc.z+f.d/2+1.2,b);drawTrough(c,loc.x-1.1,loc.z+f.d/2+.9,b);
  }
  if(loc.type==='coop'||loc.type==='inn')for(let i=0;i<3;i++)block(c,loc.x+f.w/2+.6,loc.z+.3+i*.7,.6,.6,.6,['#b4a173','#7b7150','#96825a'],b);
  pot(c,loc.x-f.w/2-.2,loc.z+f.d/2+.2,b,condition>=60);if(condition>=65)pot(c,loc.x+f.w/2+.2,loc.z+f.d/2+.4,b,true);
  rubble(c,loc,condition,rand);
}
function drawTable(c,x,z,b=null){const base=b??elevation(x,z);const p=project(x,z,.95,base);const q=project(x,z,0,base);line(c,[p,q],'#716347',1.5);oval(c,p.x,p.y,8.5,4,'#ba9867');oval(c,p.x-2,p.y-1,1.8,1,'#eadbbc');for(const dx of [-.8,.8]){const s=project(x+dx,z,.5,base);oval(c,s.x,s.y,4.2,2.2,'#978258');line(c,[{x:s.x,y:s.y},{x:s.x,y:s.y+5}],'#706246',1);}}
function drawLog(c,x,z,len,b=null){const base=b??elevation(x,z);const a=project(x-len/2,z,.25,base),d=project(x+len/2,z,.25,base);line(c,[a,d],'#796746',5);line(c,[{x:a.x,y:a.y-1},{x:d.x,y:d.y-1}],'#aa9060',1.3);oval(c,d.x,d.y,2.8,3.5,'#c6ad78');oval(c,d.x,d.y,1.3,1.8,'#a98e60');}
function drawTrough(c,x,z,b=null){const base=b??elevation(x,z);block(c,x,z,1.45,.75,.42,['#c2a16b','#89734d','#a68b59'],base);groundRect(c,x,z,1.13,.48,'#7f734e',null,base,.43);line(c,[project(x-.5,z,.43,base),project(x+.5,z,.43,base)],'#b3a173',1);}

function drawStoneWall(c,points,height=.65){
  for(let i=1;i<points.length;i++){
    const a=points[i-1],b=points[i],n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/.75);
    for(let j=0;j<n;j++){const t=(j+.5)/n,x=lerp(a[0],b[0],t),z=lerp(a[1],b[1],t);block(c,x,z,.75,.52,height,['#c4bda2','#899079','#a1a58b']);}
  }
}
function drawSpecial(c,loc,condition,rand){
  const b=elevation(loc.x,loc.z),x=loc.x,z=loc.z,P=(a,d,h=0)=>project(a,d,h,b);
  if(loc.type==='square'){
    groundRect(c,x,z,8.8,8.8,'#bdbca2','#969b80');groundRect(c,x,z,7.8,7.8,'#d3c7ac','#aaa58c');
    for(let a=-3.5;a<4;a+=.7){line(c,[P(x+a,z-3.8,.01),P(x+a,z+3.8,.01)],'#b2ac9266',.6);line(c,[P(x-3.8,z+a,.01),P(x+3.8,z+a,.01)],'#b2ac9266',.6);}
    for(const [dx,dz]of [[-3.7,-2.8],[3.8,2.8]]){block(c,x+dx,z+dz,2,.5,.4,['#9f936e','#706a4b','#8b7b54'],b);}
    if(condition<55){for(let i=0;i<18;i++){const p=P(x-3.6+rand()*7.2,z-3.6+rand()*7.2,.03);line(c,[p,{x:p.x+2,y:p.y+1}],i%2?'#8a9167':'#9c8b65',1.4);}}
    if(condition>=55){for(let i=0;i<6;i++)pot(c,x-3.8+i*1.5,z+3.8,b,true);}
    return;
  }
  if(loc.type==='bridge'){
    const xx=x+.2,zz=z;
    groundRect(c,xx,zz,8,3.6,'#b8b295','#858d7d',b,.4);
    for(let i=-3.6;i<4;i+=.55)line(c,[P(xx+i,zz-1.65,.42),P(xx+i,zz+1.65,.42)],'#807e6955',.85);
    for(const side of [-1,1]){
      for(let i=-3.8;i<4;i+=.72)block(c,xx+i,zz+side*1.75,.68,.55,1.05,['#cec4a9','#8f9480','#b0ad91'],b,.4);
      line(c,[P(xx-4,zz+side*1.75,1.45),P(xx+4,zz+side*1.75,1.45)],'#d0c7ad',2);
    }
    // A shadow beneath the span makes the stone arch legible at this scale.
    const arch=P(xx,zz+1.77,.1);c.save();c.translate(arch.x,arch.y);c.transform(1,.49,0,1,0,0);c.beginPath();c.ellipse(0,3,17,11,0,Math.PI,TAU);c.lineTo(17,3);c.closePath();c.fillStyle='#426d63';c.fill();c.restore();
    if(condition<35){const pp=P(xx+2.3,zz+1.7,1.2);line(c,[{x:pp.x-8,y:pp.y-2},{x:pp.x+8,y:pp.y+6}],'#856d42',2.7);}
    return;
  }
  if(loc.type==='fountain'){
    groundRect(c,x,z,4.2,4.2,'#c9c4a8','#939b84',b);
    block(c,x,z-.8,2.6,.7,3.6,['#ccc3a5','#93987f','#b5b298'],b);
    const a=P(x,z-.42,2.3);oval(c,a.x,a.y,6.5,7.5,'#7f8c78');oval(c,a.x,a.y,3,4,'#435e52');
    block(c,x,z+.5,2.6,1.7,.58,['#b6b89b','#8f9a82','#acb092'],b);
    groundRect(c,x,z+.5,2.15,1.22,condition>=45?'#76a9a0':'#8b9b7e',null,b,.61);
    if(condition>=45)line(c,[{x:a.x,y:a.y+2},P(x,z+.3,.64)],'#d1e0c5',1.3);
    const cap=P(x,z-.8,4.1);poly(c,[{x:cap.x-18,y:cap.y+2},{x:cap.x,y:cap.y-11},{x:cap.x+19,y:cap.y+2},{x:cap.x,y:cap.y+10}],'#b7aa8a','#8e8a70',.7);
    pot(c,x+2,z+.8,b,condition>=55);return;
  }
  if(loc.type==='market'){
    groundRect(c,x,z,8.2,6.8,'#c8bfa1');
    for(const [idx,dx,dz]of [[0,-2.4,-.8],[1,1.8,.2],[2,-.2,2.5]]){
      const X=x+dx,Z=z+dz;block(c,X,Z,2.6,1.35,1.15,['#b69c6c','#826e47','#a68a5b'],b);
      for(const sx of [-1,1])for(const sz of [-1,1])line(c,[P(X+sx*1.4,Z+sz*.8,0),P(X+sx*1.4,Z+sz*.8,3)],'#83774f',1.4);
      for(let i=0;i<6;i++){const left=X-1.65+i*.55;poly(c,[P(left,Z-.96,3.12),P(left+.55,Z-.96,3.12),P(left+.55,Z+1.04,2.75),P(left,Z+1.04,2.75)],i%2?'#e5d4ad':idx===1?'#6b886d':'#ba7952');}
      for(let i=0;i<8;i++){const p=P(X-1+rand()*2,Z-.4+rand()*.8,1.35);oval(c,p.x,p.y,2.2,1.7,['#c89e4e','#b8754a','#798847'][idx]);}
    }
    return;
  }
  if(loc.type==='wash'){
    groundRect(c,x,z,5.4,5.6,'#aeb699','#8d9c85',b);
    for(let i=0;i<3;i++){block(c,x-1.6+i*1.5,z,.9,2.4,.6,['#babda3','#859781','#a2ad91'],b);groundRect(c,x-1.6+i*1.5,z,.65,1.9,'#75a69b',null,b,.63);}
    for(const dx of [-2.8,2.7])line(c,[P(x+dx,z-1.9),P(x+dx,z-1.9,3.1)],'#8e7d52',2);
    const a=P(x-2.8,z-1.9,2.9),end=P(x+2.7,z-1.9,2.9);line(c,[a,end],'#8c8b6e',.8);
    for(let i=0;i<4;i++){const t=.17+i*.2,p={x:lerp(a.x,end.x,t),y:lerp(a.y,end.y,t)};poly(c,[p,{x:p.x+8,y:p.y+4},{x:p.x+8,y:p.y+17},{x:p.x,y:p.y+13}],['#e5ddbd','#adbaa1','#d0b994','#e8ddbd'][i]);}
    return;
  }
  if(loc.type==='orchard'){
    for(let row=0;row<4;row++){
      groundRect(c,x,z-5.4+row*3.3,11.5,2.75,row%2?'#a9b085':'#b7b38b');
      drawStoneWall(c,[[x-6,z-4+row*3.3],[x+6,z-4+row*3.3]],.36);
      for(let col=0;col<4;col++)drawTree(c,x-4.2+col*2.9,z-5.6+row*3.3,'fruit',.57,rand(),false);
    }
    for(let i=0;i<3;i++)block(c,x+5.6,z+4+i*.75,.72,.7,.45,['#b8a16d','#85754e','#9a8558']);return;
  }
  if(loc.type==='forest'){
    groundRect(c,x,z,8,6,'#afa780');
    for(let i=0;i<6;i++)drawLog(c,x-1,z-1.2+i*.55,4.6,b);
    for(let i=0;i<3;i++)drawLog(c,x-1,z-.65+i*.6,4.6,b+.34);
    const a=P(x+2.4,z+1.7);line(c,[a,{x:a.x,y:a.y-26}],'#706344',2);c.fillStyle='#566d50';c.fillRect(a.x-10,a.y-23,20,11);line(c,[{x:a.x-6,y:a.y-19},{x:a.x+6,y:a.y-19}],'#cec89c',1);
    return;
  }
  if(loc.type==='quarry'){
    groundRect(c,x,z,8,6.5,'#b9b59c');
    for(let i=0;i<21;i++){const xx=x-3+rand()*5,zz=z-2+rand()*4;block(c,xx,zz,.55+rand()*.8,.55+rand()*.75,.3+rand()*.75,['#d1c9b0','#959c89','#b2b39e']);}
    block(c,x+2.2,z+2.2,2,.85,1.1,['#b29c71','#766d4d','#998255'],b);drawLog(c,x+3,z-1,3,b);return;
  }
  if(loc.type==='trail'){
    const a=P(x,z,0);line(c,[a,{x:a.x,y:a.y-39}],'#776b49',3);
    for(let i=0;i<2;i++)poly(c,[{x:a.x-14,y:a.y-36+i*10},{x:a.x+12,y:a.y-36+i*10},{x:a.x+18,y:a.y-31+i*10},{x:a.x+12,y:a.y-27+i*10},{x:a.x-14,y:a.y-27+i*10}],i?'#7e8760':'#a39262','#6c704e',.7);
    const p=P(x+1.6,z+1.1);oval(c,p.x,p.y,10,5,'#abb195');oval(c,p.x-2,p.y-2,8,5,'#c1c4a6');return;
  }
}

function drawTree(c,x,z,type='olive',scale=1,variation=.5,shadow=true){
  const p=project(x,z),s=scale;
  if(shadow)oval(c,p.x+8*s,p.y+4*s,16*s,7*s,'#42563a1f');
  line(c,[{x:p.x,y:p.y},{x:p.x,y:p.y-26*s}],'#6f7150',3*s);
  if(type==='cypress'){
    poly(c,[{x:p.x-4*s,y:p.y-11*s},{x:p.x-10*s,y:p.y-26*s},{x:p.x-7*s,y:p.y-47*s},{x:p.x,y:p.y-72*s},{x:p.x+6*s,y:p.y-50*s},{x:p.x+9*s,y:p.y-28*s},{x:p.x+4*s,y:p.y-10*s}],'#4d6c4c');
    poly(c,[{x:p.x-4*s,y:p.y-15*s},{x:p.x-8*s,y:p.y-29*s},{x:p.x-5*s,y:p.y-50*s},{x:p.x,y:p.y-70*s},{x:p.x+1*s,y:p.y-18*s}],'#6c8357');
    line(c,[{x:p.x,y:p.y-21*s},{x:p.x,y:p.y-61*s}],'#8b985e44',s);return;
  }
  if(type==='pine'){
    const colors=['#4e6b4d','#59774f','#718856'];
    for(let i=0;i<3;i++){
      const yy=p.y-(15+i*14)*s,w=(24-i*5)*s;
      poly(c,[{x:p.x-w,y:yy},{x:p.x-w*.67,y:yy-7*s},{x:p.x-4*s,y:yy-25*s},{x:p.x+1*s,y:yy-31*s},{x:p.x+w*.65,y:yy-9*s},{x:p.x+w,y:yy-1*s},{x:p.x+7*s,y:yy+4*s},{x:p.x-7*s,y:yy+3*s}],colors[i]);
      poly(c,[{x:p.x-w,y:yy},{x:p.x-4*s,y:yy-25*s},{x:p.x+1*s,y:yy-31*s},{x:p.x+2*s,y:yy+2*s}],['#628059','#76905f','#8b9b65'][i]);
    }return;
  }
  const fruit=type==='fruit',gold=type==='gold'||fruit;
  const shadowColor=gold?'#9c9853':'#687d51',mid=gold?'#b3a15b':'#899664',light=gold?'#ccb76d':'#a1ac74';
  const yy=p.y-31*s;
  line(c,[{x:p.x,y:p.y-12*s},{x:p.x-10*s,y:yy-2*s}],'#747349',1.6*s);
  line(c,[{x:p.x,y:p.y-14*s},{x:p.x+11*s,y:yy-2*s}],'#747349',1.6*s);
  oval(c,p.x+4*s,yy+4*s,19*s,15*s,shadowColor);
  oval(c,p.x-10*s,yy-2*s,15*s,14*s,mid);
  oval(c,p.x+6*s,yy-9*s,17*s,15*s,mid);
  oval(c,p.x-4*s,yy-12*s,15*s,12*s,light);
  oval(c,p.x-15*s,yy-7*s,7*s,7*s,light);
  const random=rng(Math.floor(variation*1e5));
  for(let i=0;i<12;i++){const dx=(random()-.5)*30*s,dy=(random()-.5)*21*s;oval(c,p.x+dx,yy-5*s+dy,1.1*s,1.6*s,i%2?'#e0cf8c38':'#435b3e23');}
  if(fruit)for(let i=0;i<8;i++){const dx=(random()-.5)*28*s,dy=(random()-.5)*21*s;oval(c,p.x+dx,yy-1*s+dy,1.8*s,1.9*s,i%2?'#d29a44':'#ba7f38');}
}

function terrainCanvas(){
  const c=makeCanvas(3300,2050),g=c.getContext('2d');g.translate(1650,240);
  const random=rng(1280);
  // Oversized ground continues beyond the camera; the village never sits on a board.
  const land=[[-60,-50],[160,-50],[166,155],[-50,158]].map(p=>project(...p));
  const gradient=g.createLinearGradient(-700,0,950,1200);gradient.addColorStop(0,'#c9cea7');gradient.addColorStop(.47,'#b6c099');gradient.addColorStop(1,'#a4b28b');poly(g,land,gradient);
  for(let i=0;i<58;i++){
    const x=-40+random()*185,z=-25+random()*180,rx=5+random()*13,rz=4+random()*16;
    const pts=[];for(let j=0;j<9;j++){const a=j/9*TAU;pts.push(project(x+Math.cos(a)*rx*(.8+random()*.3),z+Math.sin(a)*rz*(.8+random()*.3)));}
    poly(g,pts,['#a0b17b22','#d7d1a035','#82976a18','#b4b77c33'][i%4]);
  }
  // Contour bands and little retaining walls make the mountain slopes readable.
  for(const strip of [[64,84,97,86],[73,91,105,94],[72,71,98,77],[7,39,23,44],[4,67,18,72],[63,12,100,14],[67,7,97,9]]){
    const[x,z,x2,z2]=strip;poly(g,[project(x,z),project(x2,z2),project(x2,z2+1.1),project(x,z+1.1)],'#667f5436');
    line(g,[project(x,z),project(x2,z2)],'#d1caa17a',2.6);
  }
  const river=RIVER_SAMPLES.map(p=>project(...p));
  line(g,river,'#819980',70);line(g,river,'#c0c3a0',56);line(g,river,'#5c9892',42);line(g,river,'#78aaa0',29);line(g,river,'#9fbfaf7a',10);
  // Pebbles along the water, avoiding large, noisy texture fills.
  for(let i=0;i<RIVER_SAMPLES.length;i+=2){const p=RIVER_SAMPLES[i];for(const sign of [-1,1]){const q=project(p[0]+sign*(2.4+random()*.7),p[1]+random()-.5);oval(g,q.x,q.y,2.5+random()*3.5,1.6+random()*1.7,i%4?'#a8b397':'#c5c6aa');}}
  ROAD_SAMPLES.forEach((path,i)=>{
    const pts=path.map(p=>project(...p));line(g,pts,i<4?'#8e967447':'#95a2793a',i<4?32:23);line(g,pts,i<4?'#d2c4a3':'#c4be97',i<4?26:17);line(g,pts,'#ded1ae35',i<4?15:7);
    for(let j=0;j<path.length;j+=1){const p=path[j];const q=project(p[0]+(random()-.5)*1.1,p[1]+(random()-.5)*1.1);line(g,[q,{x:q.x+2+random()*3,y:q.y+1+random()}],j%3?'#aca78a42':'#ede0b63d',.8);}
  });
  // The bridge is the only paved crossing. Land is never painted over the stream.
  for(const loc of LOCATIONS){
    if(['orchard','bridge','square','forest','trail'].includes(loc.type))continue;
    const f=footprint(loc);groundRect(g,loc.x,loc.z,(f.h?f.w:3.5)+3.2,(f.h?f.d:3.5)+3.1,loc.id==='church'?'#c6bd9e':'#c4bfa075');
    if(f.h&&loc.type!=='church'){
      const x=loc.x-f.w/2-1.05,z=loc.z-f.d/2;
      drawStoneWall(g,[[x,z-1],[x,z+f.d*.7]],.36);
    }
  }
  // Dry-stone terraces around the medieval church and the lower gardens.
  drawStoneWall(g,[[69,82],[81,86],[86,82]],.85);drawStoneWall(g,[[70,85],[81,89],[87,86]],.5);
  drawStoneWall(g,[[16,70],[26,75]],.45);drawStoneWall(g,[[15,75],[24,80]],.48);
  for(let i=0;i<1200;i++){
    const x=-18+random()*140,z=-14+random()*140;
    if(nearRoad(x,z,2.5)||nearRiver(x,z,3.5)||LOCATIONS.some(b=>Math.hypot(b.x-x,b.z-z)<4.4))continue;
    const p=project(x,z);line(g,[{x:p.x-1.5,y:p.y},{x:p.x,y:p.y-2.2},{x:p.x+1,y:p.y}],i%3?'#7e92582e':'#e2d79c44',.8);
    if(i%7===0)oval(g,p.x+2,p.y+1,1.3,.8,'#d4b87488');
  }
  // Garden beds, vines, timber fences and irrigation channels are human scale.
  for(const garden of [[34,73],[48,76],[65,23],[77,58],[19,46],[36,29]]){
    const[x,z]=garden;groundRect(g,x,z,3.4,2.5,'#a3a47a');for(let j=0;j<4;j++)line(g,[project(x-1.4,z-.9+j*.55),project(x+1.4,z-.9+j*.55)],'#6e82513e',3);
    for(let j=0;j<4;j++){const a=project(x-1.6+j,z+1.5),b=project(x-1.6+j,z+1.5,1.1);line(g,[a,b],'#847b51',1.1);}line(g,[project(x-1.6,z+1.5,.72),project(x+1.4,z+1.5,.72)],'#a89561',1.3);
  }
  return {canvas:c,x:-1650,y:-240};
}

function createBuildingSprite(loc,condition){
  const sprite=makeCanvas(380,340),c=sprite.getContext('2d'),p=project(loc.x,loc.z);
  c.translate(190-p.x,255-p.y);c.lineJoin='round';c.lineCap='round';
  const random=rng(seedOf(loc.id));
  if(footprint(loc).h)drawHouse(c,loc,condition,random);else drawSpecial(c,loc,condition,random);
  return {canvas:sprite,ox:190,oy:255};
}
function createTreeSprite(type,scale,variation){const sprite=makeCanvas(135,150),c=sprite.getContext('2d');const p=project(0,0);c.translate(64-p.x,130-p.y);drawTree(c,0,0,type,scale,variation);return {canvas:sprite,ox:64,oy:130};}

function drawScaffold(c,loc,progress,now){
  const f=footprint(loc),b=elevation(loc.x,loc.z),z=loc.z+Math.max(f.d/2,2.1)+.7,h=Math.max(3.4,f.h+.5),w=Math.max(4,f.w+1.2);
  const P=(x,z,h=0)=>project(x,z,h,b),x0=loc.x-w/2,x1=loc.x+w/2;
  for(let x=x0;x<=x1+.1;x+=w/3){line(c,[P(x,z),P(x,z,h)],'#9a8054',2);line(c,[P(x+.08,z),P(x+.08,z,h)],'#d3b982',.65);}
  for(let y=1.2;y<h;y+=1.7){line(c,[P(x0,z,y),P(x1,z,y)],'#bc9d66',3.2);line(c,[P(x0,z,y+.6),P(x1,z,y+.6)],'#8e7c50',1.2);}
  line(c,[P(x0,z,.25),P(x1,z,Math.min(h,3.2))],'#82734d',1.2);line(c,[P(x1,z,.25),P(x0,z,Math.min(h,3.2))],'#82734d',1.2);
  const X=loc.x+w*.43,Z=z+.2;
  line(c,[P(X,Z),P(X-.6,Z,h)],'#a99465',1.8);line(c,[P(X+.6,Z),P(X,Z,h)],'#a99465',1.8);for(let j=.35;j<h;j+=.5)line(c,[P(X-j/h*.6,Z,j),P(X+.6-j/h*.6,Z,j)],'#c2ab78',1.1);
  drawPerson(c,loc.x-w*.15,z+.3,now,{shirt:'#a87a45',hat:'#d0b368',scale:.86,working:true},Math.sin(now*.003));
  const p=P(loc.x,z+.8,.1);rounded(c,p.x-26,p.y+8,52,5,2);c.fillStyle='#536d54';c.fill();rounded(c,p.x-26,p.y+8,52*clamp(progress,0,1),5,2);c.fillStyle='#ebbb64';c.fill();
}
function drawPerson(c,x,z,now,style={},phase=0){
  const p=project(x,z),s=style.scale||1,step=Math.sin(phase*TAU)*1.6*s,shirt=style.shirt||'#a47755';
  oval(c,p.x+1.5*s,p.y+1.2*s,5*s,2.3*s,'#38503a30');
  line(c,[{x:p.x-1.7*s,y:p.y-6*s},{x:p.x-2*s-step,y:p.y-.5*s}],'#46564b',2.2*s);
  line(c,[{x:p.x+1.6*s,y:p.y-6*s},{x:p.x+2*s+step,y:p.y-.5*s}],'#46564b',2.2*s);
  poly(c,[{x:p.x-3*s,y:p.y-14*s},{x:p.x+3*s,y:p.y-14*s},{x:p.x+3.5*s,y:p.y-6*s},{x:p.x-3.5*s,y:p.y-6*s}],shirt);
  if(style.player){poly(c,[{x:p.x-3*s,y:p.y-14*s},{x:p.x-.4*s,y:p.y-13*s},{x:p.x-.2*s,y:p.y-6*s},{x:p.x-3.3*s,y:p.y-6*s}],'#515941');poly(c,[{x:p.x+3*s,y:p.y-14*s},{x:p.x+.4*s,y:p.y-13*s},{x:p.x+.2*s,y:p.y-6*s},{x:p.x+3.3*s,y:p.y-6*s}],'#515941');}
  const arm=style.working?Math.sin(now*.015)*4*s:step;
  line(c,[{x:p.x-3*s,y:p.y-13*s},{x:p.x-5*s,y:p.y-7*s+arm}],shirt,2.2*s);
  line(c,[{x:p.x+3*s,y:p.y-13*s},{x:p.x+5*s,y:p.y-7*s-arm}],shirt,2.2*s);
  oval(c,p.x,p.y-17*s,3.3*s,3.8*s,'#cfa16e');
  oval(c,p.x,p.y-19.1*s,3.4*s,2.0*s,style.hat||'#65533a');
  if(style.hat||style.player){oval(c,p.x+.5*s,p.y-19*s,5.1*s,1.5*s,style.hat||'#9c8760');oval(c,p.x,p.y-21*s,3.4*s,2*s,style.hat||'#9c8760');}
  if(style.working){const h={x:p.x+5*s,y:p.y-8*s-arm};line(c,[h,{x:h.x+3*s,y:h.y-5*s}],'#7a6441',1.4*s);line(c,[{x:h.x,y:h.y-5*s},{x:h.x+5*s,y:h.y-7*s}],'#5a6454',2.5*s);}
  if(style.basket){const a={x:p.x-6*s,y:p.y-7*s+arm};oval(c,a.x,a.y+1,3.5*s,2.5*s,'#b79760');line(c,[{x:a.x-2*s,y:a.y},{x:a.x-1*s,y:a.y-4*s},{x:a.x+2*s,y:a.y-3*s}],'#8c774d',.8*s);}
}

export function createVillageRenderer(canvas,callbacks={}) {
  if(!canvas)throw new Error('A canvas element is required');
  const ctx=canvas.getContext('2d',{alpha:false});
  let width=canvas.clientWidth||canvas.width||1200,height=canvas.clientHeight||canvas.height||800,dpr=1;
  let state=null,selected=null,hovered=null,mode='office',layer='normal',destroyed=false,frameId=0,lastNow=0,dirty=true,inputEnabled=true;
  let drag=null,pinching=null,keyboard={x:0,y:0},movement={x:0,y:0},moveTarget=null,route=[],followPause=0,hoverPoint=null,pendingVisit=null;
  let savedOfficeCamera=null,hitboxes=[],labelHits=[],worldBounds={minX:-1200,minY:-200,maxX:1250,maxY:1430};
  const insets={left:0,right:0,top:0,bottom:0};let hasInsets=false;
  const cam={x:-5,y:500,scale:.9};
  const player={x:49.5,z:55,phase:0,moving:false};
  const pointerMap=new Map(),keySet=new Set(),listeners=[];
  const ground=terrainCanvas(),sprites=new Map(),scenery=[],trees=[];
  const random=rng(711280);
  const treeSprites=new Map();
  function addTree(x,z,type,scale=.8,variation=random()){
    const variant=Math.floor(variation*5),scaleKey=Math.round(scale*10)/10,key=`${type}:${scaleKey}:${variant}`;
    if(!treeSprites.has(key))treeSprites.set(key,createTreeSprite(type,scaleKey,variant*.173+.07));
    const p=project(x,z);trees.push({x,z,depth:x+z+.6,p,sprite:treeSprites.get(key),kind:'tree'});
  }
  // Keep vegetation out of people's houses and out of the roads.
  let attempts=0;
  while(trees.length<165&&attempts++<1800){
    const x=-8+random()*122,z=-6+random()*117;
    const center=Math.hypot((x-53)*.8,z-53);
    if(center<32&&random()>.22)continue;
    if(nearRoad(x,z,3.0)||nearRiver(x,z,3.5)||LOCATIONS.some(b=>Math.hypot(b.x-x,b.z-z)<(b.type==='orchard'?10:b.type==='forest'?4.5:5.5)))continue;
    const type=(x>65&&z<39)?(random()<.72?'pine':'cypress'):random()<.13?'cypress':random()<.45?'gold':'olive';
    addTree(x,z,type,.65+random()*.5);
  }
  // The square's plane tree, two church cypresses and riverbank trees are landmarks.
  addTree(57.6,42.1,'gold',1.24,.38);addTree(80.3,74,'cypress',1.24,.5);addTree(70.3,75.4,'cypress',1.1,.7);
  addTree(31.3,33.4,'gold',1,.4);addTree(36.9,74.2,'olive',.95,.6);addTree(18.9,56.4,'gold',1,.2);
  // Modest background cottages make the settlement read as a village, not a list of buildings.
  const ambient=[ [16,35],[13,45],[17,80],[34,86],[51,89],[66,88],[88,75],[94,65],[89,39],[75,14],[61,16],[35,17],[28,11],[49,12],[86,88] ];
  for(let i=0;i<ambient.length;i++){
    const[x,z]=ambient[i],loc={id:`ambient-${i}`,x,z,type:'house',size:.68+random()*.15};
    const p=project(x,z);scenery.push({x,z,depth:x+z,p,sprite:createBuildingSprite(loc,22+Math.floor(random()*35)),kind:'ambient'});
  }
  const npcs=Array.from({length:22},(_,i)=>({id:i,path:ROAD_SAMPLES[i%ROAD_SAMPLES.length],offset:random(),speed:.36+random()*.21,shirt:['#a97650','#788365','#b4a071','#71878a','#a9916f','#6c7a64','#b27f63'][i%7],hat:i%3===0?'#b9a274':null,basket:i%4===0,scale:i%9===0?.73:.9+random()*.14}));
  function conditionOf(loc){const val=state?.buildings?.[loc.id]?.condition;return Number.isFinite(val)?clamp(val,0,100):(loc.condition??30);}
  function jobOf(id){return (Array.isArray(state?.jobs)?state.jobs:[]).find(j=>(j.buildingId??j.locationId??j.targetId??j.target)===id&&!['complete','completed','cancelled'].includes(j.status));}
  function jobProgress(job){if(!job)return 0;if(Number.isFinite(job.progress))return job.progress>1?job.progress/100:job.progress;if(Number.isFinite(job.remaining)&&job.duration)return 1-job.remaining/job.duration;if(job.endAt&&job.startAt)return (Date.now()-job.startAt)/(job.endAt-job.startAt);return .12;}
  function spriteFor(loc){const cond=conditionOf(loc),level=state?.buildings?.[loc.id]?.level||0,key=`${Math.floor(cond)}:${level}`;let old=sprites.get(loc.id);if(!old||old.key!==key){old={key,sprite:createBuildingSprite(loc,cond)};sprites.set(loc.id,old);}return old.sprite;}
  function viewCenter(){return {x:(insets.left+width-insets.right)/2,y:insets.top+(height-insets.top-insets.bottom)*.54};}
  function screenPoint(p){const v=viewCenter();return {x:(p.x-cam.x)*cam.scale+v.x,y:(p.y-cam.y)*cam.scale+v.y};}
  function worldPoint(x,y){const v=viewCenter();return {x:(x-v.x)/cam.scale+cam.x,y:(y-v.y)/cam.scale+cam.y};}
  function screenToGround(x,y){const p=worldPoint(x,y);return unproject(p.x,p.y);}
  function clientPoint(event){const r=canvas.getBoundingClientRect?canvas.getBoundingClientRect():{left:0,top:0,width,height};return {x:(event.clientX-r.left)*(width/(r.width||width)),y:(event.clientY-r.top)*(height/(r.height||height))};}
  function setCameraDefault(){const availableWidth=width-insets.left-insets.right,availableHeight=height-insets.top-insets.bottom;cam.x=-8;cam.y=495;cam.scale=width<700?.72:clamp(Math.min(availableWidth/1460,availableHeight/1000)*1.18,.65,1.16);if(mode==='walk'){const p=project(player.x,player.z);cam.x=p.x;cam.y=p.y;cam.scale=Math.max(cam.scale,1.22);}}
  function resize(){
    const r=canvas.getBoundingClientRect?canvas.getBoundingClientRect():{};
    const w=Math.round(r.width||canvas.clientWidth||width||1200),h=Math.round(r.height||canvas.clientHeight||height||800);
    dpr=clamp(typeof devicePixelRatio==='number'?devicePixelRatio:1,1,2);
    const first=canvas.width===0||!canvas.dataset?.worldReady;
    width=Math.max(1,w);height=Math.max(1,h);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    if(first)setCameraDefault();if(canvas.dataset)canvas.dataset.worldReady='1';dirty=true;
  }
  function on(target,event,fn,options){if(target?.addEventListener){target.addEventListener(event,fn,options);listeners.push(()=>target.removeEventListener(event,fn,options));}}
  function buildingHit(x,y){
    for(let i=labelHits.length-1;i>=0;i--){const h=labelHits[i];if(x>=h.x&&x<=h.x+h.w&&y>=h.y&&y<=h.y+h.h)return h.id;}
    for(let i=hitboxes.length-1;i>=0;i--){const b=hitboxes[i];if(x>=b.x0&&x<=b.x1&&y>=b.y0&&y<=b.y1){const nx=(x-b.cx)/b.rx,ny=(y-b.cy)/b.ry;if(nx*nx+ny*ny<1.12)return b.id;}}
    return null;
  }
  function updateHover(id){if(hovered!==id){hovered=id;callbacks.onHover?.(id);dirty=true;}if(canvas.style)canvas.style.cursor=drag?.moved?'grabbing':id?'pointer':mode==='walk'?'crosshair':'grab';}
  function zoomAt(factor,p=viewCenter()){const before=worldPoint(p.x,p.y);cam.scale=clamp(cam.scale*factor,.36,2.15);const after=worldPoint(p.x,p.y);cam.x+=before.x-after.x;cam.y+=before.y-after.y;dirty=true;}
  function blocked(x,z){
    if(x<-5||x>107||z<-4||z>108)return true;
    if(nearRiver(x,z,1.75)&&Math.abs(z-57)>2.4)return true;
    return LOCATIONS.some(loc=>{
      const f=footprint(loc);if(!f.h&&loc.type!=='fountain')return false;
      const w=f.h?f.w/2+.35:1.3,d=f.h?f.d/2+.3:1.2;
      return Math.abs(x-loc.x)<w&&Math.abs(z-loc.z)<d;
    });
  }
  function setWalkTarget(target){
    pendingVisit=null;
    let tx=clamp(target.x,-3,105),tz=clamp(target.z,-2,106);
    // A small navigation grid routes a walking mayor around houses and via the bridge.
    const step=1.8,min=-4,dim=63;
    const toCell=(x,z)=>[clamp(Math.round((x-min)/step),0,dim-1),clamp(Math.round((z-min)/step),0,dim-1)];
    const toWorld=(a,b)=>({x:min+a*step,z:min+b*step});
    const isOpen=(a,b)=>{if(a<0||b<0||a>=dim||b>=dim)return false;const p=toWorld(a,b);return !blocked(p.x,p.z);};
    function freeCell(cell){if(isOpen(...cell))return cell;for(let r=1;r<8;r++)for(let a=-r;a<=r;a++)for(let b=-r;b<=r;b++){const v=[cell[0]+a,cell[1]+b];if((Math.abs(a)===r||Math.abs(b)===r)&&isOpen(...v))return v;}return cell;}
    const start=freeCell(toCell(player.x,player.z)),goal=freeCell(toCell(tx,tz)),key=(a,b)=>b*dim+a;
    const startKey=key(...start),goalKey=key(...goal),open=[{a:start[0],b:start[1],f:0}],cost=new Map([[startKey,0]]),parent=new Map(),closed=new Set();
    let found=false,count=0;
    while(open.length&&count++<4000){
      open.sort((a,b)=>b.f-a.f);const q=open.pop(),k=key(q.a,q.b);if(closed.has(k))continue;closed.add(k);if(k===goalKey){found=true;break;}
      for(const[da,db]of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){
        const a=q.a+da,b=q.b+db,n=key(a,b);if(!isOpen(a,b)||closed.has(n)||(da&&db&&(!isOpen(q.a+da,q.b)||!isOpen(q.a,q.b+db))))continue;
        const g=cost.get(k)+Math.hypot(da,db);if(g<(cost.get(n)??Infinity)){cost.set(n,g);parent.set(n,k);open.push({a,b,f:g+Math.hypot(a-goal[0],b-goal[1])});}
      }
    }
    route=[];
    if(found){let k=goalKey;while(k!==startKey&&parent.has(k)){route.push(toWorld(k%dim,Math.floor(k/dim)));k=parent.get(k);}route.reverse();}
    else if(!blocked(tx,tz))route=[{x:tx,z:tz}];
    if(route.length){moveTarget=route[route.length-1];callbacks.onPlayerMove?.({...player,target:moveTarget});}else moveTarget=null;
    dirty=true;
  }
  function selectAt(p){
    const id=buildingHit(p.x,p.y);
    if(id){selected=id;callbacks.onSelect?.(id);const loc=LOCATIONS.find(b=>b.id===id);
      if(mode==='walk'&&loc){const distance=Math.hypot(player.x-loc.x,player.z-loc.z);if(distance<8.5){route=[];moveTarget=null;callbacks.onVisit?.(id);}else {const f=footprint(loc);setWalkTarget({x:loc.x+f.w*.35,z:loc.z+f.d/2+1.8});}}
    }else if(mode==='walk')setWalkTarget(screenToGround(p.x,p.y));
    dirty=true;
  }
  function pointerDown(e){if(!inputEnabled||e.button!==undefined&&e.button!==0)return;const p=clientPoint(e);pointerMap.set(e.pointerId,p);canvas.setPointerCapture?.(e.pointerId);e.preventDefault?.();
    if(pointerMap.size===2){const a=[...pointerMap.values()];pinching={distance:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y),mid:{x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2}};drag=null;}
    else if(pointerMap.size===1)drag={id:e.pointerId,start:p,last:p,moved:false};
  }
  function pointerMove(e){const p=clientPoint(e);hoverPoint=p;if(pointerMap.has(e.pointerId))pointerMap.set(e.pointerId,p);
    if(pinching&&pointerMap.size>=2){const a=[...pointerMap.values()],distance=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y),mid={x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2};zoomAt(distance/Math.max(1,pinching.distance),mid);cam.x-=(mid.x-pinching.mid.x)/cam.scale;cam.y-=(mid.y-pinching.mid.y)/cam.scale;pinching={distance,mid};followPause=2;return;}
    if(drag&&drag.id===e.pointerId){if(Math.hypot(p.x-drag.start.x,p.y-drag.start.y)>6)drag.moved=true;if(drag.moved){cam.x-=(p.x-drag.last.x)/cam.scale;cam.y-=(p.y-drag.last.y)/cam.scale;followPause=2;dirty=true;}drag.last=p;updateHover(null);}
    else updateHover(buildingHit(p.x,p.y));
  }
  function pointerUp(e){const p=clientPoint(e),isClick=drag&&drag.id===e.pointerId&&!drag.moved&&!pinching;pointerMap.delete(e.pointerId);if(isClick)selectAt(p);drag=null;if(pointerMap.size<2)pinching=null;canvas.releasePointerCapture?.(e.pointerId);updateHover(buildingHit(p.x,p.y));}
  function keyChange(e,down){
    const k=e.key.toLowerCase();
    // Release is unconditional: opening a dialog while holding W must never latch W.
    if(!down)keySet.delete(k);
    if(!inputEnabled||typeof document!=='undefined'&&document.querySelector?.('dialog[open], [role="dialog"][aria-modal="true"]')){keySet.clear();keyboard={x:0,y:0};movement={x:0,y:0};return;}
    if(e.target&&/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)||e.target?.isContentEditable){if(!down)keyboard={x:0,y:0};return;}
    if(!['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright','e'].includes(k))return;if(mode!=='walk')return;e.preventDefault?.();if(down)keySet.add(k);else keySet.delete(k);keyboard.x=(keySet.has('d')||keySet.has('arrowright')?1:0)-(keySet.has('a')||keySet.has('arrowleft')?1:0);keyboard.y=(keySet.has('s')||keySet.has('arrowdown')?1:0)-(keySet.has('w')||keySet.has('arrowup')?1:0);
    if(k==='e'&&down&&!e.repeat){let nearest=null,dist=8.5;for(const l of LOCATIONS){const d=Math.hypot(l.x-player.x,l.z-player.z);if(d<dist){nearest=l;dist=d;}}if(nearest){selected=nearest.id;callbacks.onSelect?.(nearest.id);callbacks.onVisit?.(nearest.id);}}
  }
  function updatePlayer(dt,now){
    if(mode!=='walk'||!inputEnabled){player.moving=false;return;}
    followPause=Math.max(0,followPause-dt);let mx=movement.x+keyboard.x,my=movement.y+keyboard.y,dx=0,dz=0;
    if(Math.hypot(mx,my)>.08){route=[];moveTarget=null;pendingVisit=null;dx=mx+my*(U/V);dz=-mx+my*(U/V);}
    else if(route.length){const p=route[0],dist=Math.hypot(p.x-player.x,p.z-player.z);if(dist<.65){route.shift();if(!route.length)moveTarget=null;}else{dx=p.x-player.x;dz=p.z-player.z;}}
    const length=Math.hypot(dx,dz);player.moving=length>.01;
    if(player.moving){dx=dx/length*dt*5.8;dz=dz/length*dt*5.8;const nx=player.x+dx,nz=player.z+dz;if(!blocked(nx,nz)){player.x=nx;player.z=nz;}else if(!blocked(nx,player.z))player.x=nx;else if(!blocked(player.x,nz))player.z=nz;player.phase+=dt*2.5;dirty=true;}
    if(!drag&&!pinching&&followPause===0){const p=project(player.x,player.z);const smooth=1-Math.exp(-dt*4.5);cam.x=lerp(cam.x,p.x,smooth);cam.y=lerp(cam.y,p.y-18,smooth);}
    if(callbacks.onPlayerMove&&Math.floor(now/300)!==Math.floor((now-dt*1000)/300))callbacks.onPlayerMove?.({x:player.x,z:player.z,moving:player.moving});
    if(pendingVisit&&!route.length){const id=pendingVisit,loc=LOCATIONS.find(l=>l.id===id);pendingVisit=null;if(loc&&Math.hypot(loc.x-player.x,loc.z-player.z)<8.5)callbacks.onVisit?.(id);}
  }
  function drawBackdrop(now){
    const bg=ctx.createLinearGradient(0,0,width,height);bg.addColorStop(0,'#d3d7b6');bg.addColorStop(1,'#b1bd98');ctx.fillStyle=bg;ctx.fillRect(0,0,width,height);
  }
  function drawWorld(now){
    const center=viewCenter();ctx.save();ctx.translate(center.x,center.y);ctx.scale(cam.scale,cam.scale);ctx.translate(-cam.x,-cam.y);
    ctx.drawImage(ground.canvas,ground.x,ground.y);
    // Fine moving reflections keep the river alive without noisy particle effects.
    for(let i=6;i<RIVER_SAMPLES.length-5;i+=7){const q=RIVER_SAMPLES[i],p=project(q[0]+Math.sin(now*.00035+i)*.6,q[1]+Math.sin(now*.00015+i)*.5);const alpha=.16+.12*Math.sin(now*.001+i);line(ctx,[{x:p.x-4,y:p.y},{x:p.x+4,y:p.y+2}],`rgba(233,239,209,${alpha})`,1.2);}
    if(mode==='walk'&&route.length){
      ctx.save();ctx.setLineDash([3,8]);line(ctx,[project(player.x,player.z),...route.map(p=>project(p.x,p.z))],'#f2dfaaa0',2);ctx.restore();
      const p=project(moveTarget.x,moveTarget.z);ctx.beginPath();ctx.ellipse(p.x,p.y,9,4.5,0,0,TAU);ctx.strokeStyle='#ebce8a';ctx.lineWidth=2;ctx.stroke();
    }
    const items=[...trees,...scenery];
    for(const loc of LOCATIONS){const p=project(loc.x,loc.z);items.push({kind:'building',loc,p,x:loc.x,z:loc.z,depth:loc.x+loc.z+(loc.type==='orchard'?5:0)});}
    for(const n of npcs){
      const path=n.path,cycle=(n.offset+now*.00001*n.speed)%2,t=cycle<=1?cycle:2-cycle,at=t*(path.length-1),i=Math.floor(at),a=path[i],b=path[Math.min(path.length-1,i+1)],fraction=at-i;
      const x=lerp(a[0],b[0],fraction),z=lerp(a[1],b[1],fraction);items.push({kind:'npc',n,x,z,depth:x+z+.14});
    }
    if(mode==='walk')items.push({kind:'player',x:player.x,z:player.z,depth:player.x+player.z+.16});
    items.sort((a,b)=>a.depth-b.depth);
    hitboxes=[];
    for(const item of items){
      const p=item.p||project(item.x,item.z),screen=screenPoint(p);
      if(screen.x<-220*cam.scale||screen.x>width+220*cam.scale||screen.y<-90*cam.scale||screen.y>height+250*cam.scale)continue;
      if(item.kind==='tree'||item.kind==='ambient'){const s=item.sprite;ctx.drawImage(s.canvas,p.x-s.ox,p.y-s.oy);continue;}
      if(item.kind==='npc'){drawPerson(ctx,item.x,item.z,now,item.n,now*.0014+item.n.id);continue;}
      if(item.kind==='player'){
        ctx.beginPath();ctx.ellipse(p.x,p.y,9,4.4,0,0,TAU);ctx.strokeStyle='#f6d47d';ctx.lineWidth=2.2;ctx.stroke();drawPerson(ctx,player.x,player.z,now,{shirt:'#e2d0a4',hat:'#a78c55',player:true,scale:1.45},player.moving?player.phase:0);continue;
      }
      const loc=item.loc,f=footprint(loc),isSelected=selected===loc.id,isHovered=hovered===loc.id,condition=conditionOf(loc),job=jobOf(loc.id);
      if(isSelected||isHovered||layer!=='normal'){
        let color=isSelected?'#ebbd58':isHovered?'#e3d4a4':layer==='condition'?(condition<30?'#c47b5d':condition<65?'#d0aa5e':'#809666'):(job?'#d8b167':'#b5c2a1');
        const w=Math.max(f.w,3.5)+2.0,d=Math.max(f.d,3.5)+1.8;
        const corners=[project(loc.x-w/2,loc.z-d/2),project(loc.x+w/2,loc.z-d/2),project(loc.x+w/2,loc.z+d/2),project(loc.x-w/2,loc.z+d/2)];
        poly(ctx,corners,color+'2c',color,isSelected?2.4:1.5);
      }
      const s=spriteFor(loc);ctx.drawImage(s.canvas,p.x-s.ox,p.y-s.oy);
      if(job)drawScaffold(ctx,loc,jobProgress(job),now);
      if(layer==='condition'){
        const q=project(loc.x,loc.z+f.d/2+.75),bw=42;rounded(ctx,q.x-bw/2,q.y+6,bw,4,2);ctx.fillStyle='#4a5a4555';ctx.fill();rounded(ctx,q.x-bw/2,q.y+6,bw*condition/100,4,2);ctx.fillStyle=condition<30?'#b8674e':condition<65?'#c79943':'#688650';ctx.fill();
      }
      const rx=Math.max((f.w+f.d)*U/2,loc.type==='orchard'?108:loc.type==='square'?96:loc.type==='market'?88:34)*cam.scale;
      const top=(f.h>0?(f.h+2.4)*U+(f.w+f.d)*V/2:loc.type==='orchard'?92:loc.type==='market'?52:loc.type==='fountain'?58:loc.type==='forest'?35:32)*cam.scale;
      const bottom=Math.max((f.w+f.d)*V/2,loc.type==='orchard'?70:loc.type==='square'?50:25)*cam.scale;
      hitboxes.push({id:loc.id,x0:screen.x-rx,x1:screen.x+rx,y0:screen.y-top,y1:screen.y+bottom,cx:screen.x,cy:screen.y+(bottom-top)/2,rx,ry:(top+bottom)/2});
    }
    // Stove smoke is soft, subtle and rises from the actual bakery.
    for(const id of ['bakery','cafe']){const loc=LOCATIONS.find(l=>l.id===id),f=footprint(loc),p=project(loc.x-f.w*.22,loc.z-f.d*.2,f.h+2.8,elevation(loc.x,loc.z));for(let i=0;i<4;i++){const age=((now*.00022+i*.27)%1),x=p.x+Math.sin(age*4+i)*5+age*12,y=p.y-age*31;oval(ctx,x,y,3+age*5,2.5+age*4,`rgba(240,232,205,${(1-age)*.24})`);}}
    ctx.restore();
  }
  function drawLabels(now){
    labelHits=[];const labelLocations=['office','church','woodshop','market','bridge','orchard','forest','wash'];
    const picked=LOCATIONS.filter(l=>l.id===selected||l.id===hovered||jobOf(l.id)||labelLocations.includes(l.id));
    picked.sort((a,b)=>(a.id===selected?-10:a.id===hovered?-8:jobOf(a.id)?-5:labelLocations.indexOf(a.id))-(b.id===selected?-10:b.id===hovered?-8:jobOf(b.id)?-5:labelLocations.indexOf(b.id)));
    const occupied=[];
    for(const loc of picked){
      const chosen=loc.id===selected||loc.id===hovered,job=jobOf(loc.id),f=footprint(loc),p=project(loc.x,loc.z,0),screen=screenPoint(p);
      if(cam.scale<.55&&!chosen&&!job&&loc.id!=='office'&&loc.id!=='church')continue;
      if(width<600&&!chosen&&!job&&!['office','church','woodshop','market'].includes(loc.id))continue;
      let y=screen.y-(f.h>0?(f.h+2.55)*U+(f.w+f.d)*V*.35:loc.type==='orchard'?77:loc.type==='market'?50:loc.type==='fountain'?55:36)*cam.scale-27;
      let name=loc.name;
      if(loc.id==='woodshop')name='Οι σκαφάδες';if(loc.id==='bridge')name='Σέτραχος';if(loc.id==='orchard')name='Τα περιβόλια';if(loc.id==='forest')name='Δασικό συνεργείο';
      ctx.font=`${chosen?600:500} ${width<600?11:12}px "Manrope", "Arial", sans-serif`;
      const w=ctx.measureText(name).width+25+(job?12:0),h=chosen?27:24,x=screen.x-w/2;
      if(x<-w*.5||x>width-w*.5||y<5||y>height-30)continue;
      if(!chosen&&occupied.some(r=>x<r.x+r.w+9&&x+w>r.x-9&&y<r.y+r.h+8&&y+h>r.y-8))continue;
      occupied.push({x,y,w,h});
      ctx.save();ctx.shadowColor='#36402a14';ctx.shadowBlur=8;ctx.shadowOffsetY=2;rounded(ctx,x,y,w,h,6);ctx.fillStyle=chosen?'#4d654d':'#f6f0dfed';ctx.fill();ctx.shadowBlur=0;ctx.shadowOffsetY=0;ctx.strokeStyle=chosen?'#dbb76b':'#bcc4a25e';ctx.lineWidth=1;ctx.stroke();
      const dotX=x+10;oval(ctx,dotX,y+h/2,2.2,2.2,chosen?'#e2bd72':job?'#bd9151':'#83916b');ctx.fillStyle=chosen?'#fff3d4':'#4b5946';ctx.textBaseline='middle';ctx.textAlign='left';ctx.fillText(name,x+17,y+h/2+.2);
      if(job){const hx=x+w-9,hy=y+h/2;line(ctx,[{x:hx-2,y:hy+4},{x:hx+2,y:hy-3}],chosen?'#edd3a0':'#a48244',1.3);line(ctx,[{x:hx-1,y:hy-4},{x:hx+4,y:hy-2}],chosen?'#edd3a0':'#a48244',2.4);}
      ctx.restore();labelHits.push({id:loc.id,x,y,w,h});
    }
    if(mode==='walk'){
      const p=screenPoint(project(player.x,player.z));
      ctx.save();ctx.font='600 10px "Manrope", Arial, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';const label='ΜΟΥΧΤΑΡΗΣ',w=ctx.measureText(label).width+16;rounded(ctx,p.x-w/2,p.y-44*cam.scale-13,w,19,5);ctx.fillStyle='#e9d39cee';ctx.fill();ctx.fillStyle='#4a5540';ctx.fillText(label,p.x,p.y-44*cam.scale-3);ctx.restore();
    }
  }
  function renderFrame(now=0){
    if(destroyed)return;const dt=lastNow?Math.min(.06,Math.max(0,(now-lastNow)/1000)):0;lastNow=now;updatePlayer(dt,now);
    ctx.setTransform(dpr,0,0,dpr,0,0);drawBackdrop(now);drawWorld(now);drawLabels(now);dirty=false;
  }
  function animate(now){if(destroyed)return;const docHidden=typeof document!=='undefined'&&document.hidden;if(!docHidden){if(now-lastNow>=32||dirty)renderFrame(now);}if(typeof requestAnimationFrame==='function')frameId=requestAnimationFrame(animate);}
  function switchMode(next){
    if(!['office','walk'].includes(next)||mode===next)return;
    if(next==='walk'){savedOfficeCamera={...cam};const p=project(player.x,player.z);cam.x=p.x;cam.y=p.y-18;cam.scale=Math.max(cam.scale,1.22);}
    else if(savedOfficeCamera)Object.assign(cam,savedOfficeCamera);
    mode=next;movement={x:0,y:0};keyboard={x:0,y:0};keySet.clear();route=[];moveTarget=null;pendingVisit=null;followPause=0;dirty=true;
  }
  resize();
  if(canvas.style)canvas.style.touchAction='none';
  on(canvas,'pointerdown',pointerDown);on(canvas,'pointermove',pointerMove);on(canvas,'pointerup',pointerUp);on(canvas,'pointercancel',e=>{pointerMap.delete(e.pointerId);drag=null;pinching=null;});on(canvas,'pointerleave',()=>{if(!drag)updateHover(null);});
  on(canvas,'wheel',e=>{e.preventDefault?.();zoomAt(Math.exp(-e.deltaY*.0014),clientPoint(e));followPause=1.5;},{passive:false});
  if(typeof window!=='undefined'){on(window,'resize',resize);on(window,'keydown',e=>keyChange(e,true));on(window,'keyup',e=>keyChange(e,false));on(window,'blur',()=>{keySet.clear();keyboard={x:0,y:0};movement={x:0,y:0};});}
  let observer=null;if(typeof ResizeObserver!=='undefined'){observer=new ResizeObserver(()=>resize());observer.observe(canvas);}
  renderFrame(0);if(typeof requestAnimationFrame==='function')frameId=requestAnimationFrame(animate);
  return {
    setState(next){state=next;dirty=true;},
    setSelected(id){selected=id||null;dirty=true;},
    setMode:switchMode,
    focus(id){const loc=LOCATIONS.find(l=>l.id===id);if(!loc)return;selected=id;const p=project(loc.x,loc.z);cam.x=p.x;cam.y=p.y-40;cam.scale=Math.max(cam.scale,width<700?.95:.9);followPause=5;dirty=true;},
    zoom(delta){zoomAt(Math.exp(Math.abs(delta)>.7?delta*.2:delta));},
    resetCamera(){setCameraDefault();followPause=0;dirty=true;},
    setLayer(next){layer=['normal','condition','jobs'].includes(next)?next:'normal';dirty=true;},
    setMovement(next){movement={x:clamp(Number(next?.x)||0,-1,1),y:clamp(Number(next?.y)||0,-1,1)};},
    clearMovement(){movement={x:0,y:0};keyboard={x:0,y:0};keySet.clear();route=[];moveTarget=null;pendingVisit=null;player.moving=false;},
    setInputEnabled(enabled){inputEnabled=!!enabled;if(!inputEnabled){movement={x:0,y:0};keyboard={x:0,y:0};keySet.clear();drag=null;pinching=null;pointerMap.clear();player.moving=false;}dirty=true;},
    setViewportInsets(next){for(const key of ['left','right','top','bottom'])if(Number.isFinite(next?.[key]))insets[key]=Math.max(0,next[key]);if(!hasInsets){setCameraDefault();hasInsets=true;}dirty=true;},
    visitSelected(){const loc=LOCATIONS.find(l=>l.id===selected);if(mode!=='walk')return {ok:false,message:'Βγες πρώτα από το γραφείο για να επισκεφθείς το χωριό.'};if(!loc)return {ok:false,message:'Επίλεξε πρώτα ένα κτίριο στον χάρτη.'};const distance=Math.hypot(loc.x-player.x,loc.z-player.z);if(distance>=8.5)return {ok:false,message:'Πλησίασε το κτίριο με τον μουχτάρη και πάτησε ξανά Επίσκεψη.',distance};callbacks.onVisit?.(loc.id);return {ok:true,id:loc.id,distance};},
    walkToBuilding(id,options={}){const loc=LOCATIONS.find(l=>l.id===id);if(!loc)return {ok:false,message:'Δεν βρέθηκε αυτή η τοποθεσία.'};switchMode('walk');selected=id;callbacks.onSelect?.(id);const visit=options.visitOnArrival!==false;if(Math.hypot(loc.x-player.x,loc.z-player.z)<8.5){if(visit)callbacks.onVisit?.(id);return {ok:true,id,arrived:true};}const f=footprint(loc);setWalkTarget({x:loc.x+f.w*.35,z:loc.z+f.d/2+1.8});if(!route.length)return {ok:false,message:'Δεν βρέθηκε ελεύθερη διαδρομή. Πλησίασε με το joystick ή τα πλήκτρα.'};pendingVisit=visit?id:null;followPause=0;return {ok:true,id,arrived:false,steps:route.length};},
    renderFrame,
    getDebugState(){const nearest=LOCATIONS.map(l=>({id:l.id,name:l.name,distance:Math.hypot(l.x-player.x,l.z-player.z)})).sort((a,b)=>a.distance-b.distance)[0];return {width,height,dpr,mode,layer,selected,hovered,inputEnabled,camera:{...cam},insets:{...insets},player:{...player},nearest,route:[...route],pendingVisit,buildingCount:LOCATIONS.length,treeCount:trees.length,npcCount:npcs.length,hitboxes:hitboxes.map(b=>({...b})),labels:labelHits.map(l=>({...l})),cachedBuildings:sprites.size};},
    destroy(){destroyed=true;listeners.forEach(fn=>fn());observer?.disconnect();if(typeof cancelAnimationFrame==='function')cancelAnimationFrame(frameId);sprites.clear();treeSprites.clear();}
  };
}

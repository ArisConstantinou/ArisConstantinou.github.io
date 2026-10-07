import { LOCATIONS } from './locations.js?v=1.2.0';

// A hand-drawn, procedural interpretation of Moutoullas. Positions are deliberately
// a playable composition, never a claim to be cadastral or surveyed coordinates.
const U = 11.5, V = 5.65;
const TAU = Math.PI * 2;
const SPREAD=1.34, spread=v=>50+(v-50)*SPREAD;
const expand=path=>path.map(([x,z])=>[spread(x),spread(z)]);
const PALETTE = { ink:'#384338', ground:'#bcc49b', grass:'#b3bd90', path:'#d4c4a1', water:'#6caaa4', stone:'#b9b09a', roof:'#a96646' };
const clamp = (v,lo,hi) => Math.max(lo,Math.min(hi,v));
const lerp = (a,b,t) => a+(b-a)*t;
function rng(seed) { let s = seed >>> 0; return () => ((s = Math.imul(1664525,s)+1013904223 >>> 0) / 4294967296); }
function seedOf(s) { let h=2166136261; for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0; }
function elevation(x,z) {
  if(!TERRAIN_FIELD)return mountainHeightRaw(x,z);
  const q=(x-z-TERRAIN_FIELD.minQ)/TERRAIN_FIELD.step,t=(x+z-TERRAIN_FIELD.minT)/TERRAIN_FIELD.step;
  const i=clamp(Math.floor(q),0,TERRAIN_FIELD.n-2),j=clamp(Math.floor(t),0,TERRAIN_FIELD.m-2),a=clamp(q-i,0,1),b=clamp(t-j,0,1),v=TERRAIN_FIELD.values,k=i*TERRAIN_FIELD.m+j;
  return lerp(lerp(v[k],v[k+TERRAIN_FIELD.m],a),lerp(v[k+1],v[k+TERRAIN_FIELD.m+1],a),b);
}
let TERRAIN_FIELD=null;
function mountainHeightRaw(x,z) {
  // The village occupies the sides of an actual mountain valley. The stream is
  // its lowest continuous line; houses, people and roads use this same surface.
  const cross=x-riverXAt(z),distance=Math.sqrt(cross*cross+16)-4;
  const slope=cross>=0?.75:.52;
  // Rounded shoulders and diagonal wooded spurs break up the mountain mass.
  // Ridges vary mainly across x-z, preserving a single-valued visible surface.
  const shoulder=slope*distance-.00105*distance*distance;
  const ridge=(8.5*Math.sin((x-z)*.039-1.2)+3.4*Math.cos((x-z)*.078+.4))*distance/(distance+30);
  const fold=1.2*Math.sin(z*.038+distance*.026)*Math.min(1,distance/28);
  return riverElevation(z)+shoulder+ridge+fold;
}
function riverElevation(z){return 6+(90-z)*.17;}
function riverXAt(z){
  let a=RIVER[0],b=RIVER[1];
  for(let i=1;i<RIVER.length;i++){a=RIVER[i-1];b=RIVER[i];if(z<=b[1])break;}
  return lerp(a[0],b[0],(z-a[1])/(b[1]-a[1]));
}
function project(x,z,h=0,base=null) { return {x:(x-z)*U,y:(x+z)*V-(h+(base??elevation(x,z)))*U}; }
function unproject(sx,sy) {
  // x-z is fixed by the horizontal projection. Along that ray the terrain is
  // strictly monotone, so a bracketed solve remains stable on the steep slopes.
  const difference=sx/U;
  const yAt=t=>t*V-elevation((t+difference)/2,(t-difference)/2)*U;
  let low=-512,high=640;
  for(let i=0;i<12&&yAt(low)>sy;i++)low-=512;
  for(let i=0;i<12&&yAt(high)<sy;i++)high+=512;
  for(let i=0;i<48;i++){const mid=(low+high)/2;if(yAt(mid)<sy)low=mid;else high=mid;}
  const sum=(low+high)/2;return {x:(sum+difference)/2,z:(sum-difference)/2};
}
function poly(c,pts,fill,stroke=null,width=1) {
  if(!pts.length)return;c.beginPath();c.moveTo(pts[0].x,pts[0].y);for(let i=1;i<pts.length;i++)c.lineTo(pts[i].x,pts[i].y);c.closePath();
  if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}
}
function line(c,pts,color,width=1) {if(pts.length<2)return;c.beginPath();c.moveTo(pts[0].x,pts[0].y);for(let i=1;i<pts.length;i++)c.lineTo(pts[i].x,pts[i].y);c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.lineJoin='round';c.stroke();}
function oval(c,x,y,rx,ry,fill) {c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fillStyle=fill;c.fill();}
function rounded(c,x,y,w,h,r=8) {c.beginPath();if(c.roundRect)c.roundRect(x,y,w,h,r);else{c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);}c.closePath();}
const ROAD_PATHS = [
  [[39,83],[40,73],[44,64],[46,56],[48,50],[52,45],[53,37],[56,29],[58,14]],
  [[27,55],[34,55],[38,57],[44,57],[49,60],[55,64],[62,68],[69,74],[76,77],[86,85]],
  [[46,50],[45,43],[48,38],[55,37],[60,38],[66,42],[71,45],[80,49],[91,52]],
  [[52,46],[58,53],[65,53],[69,57],[73,62],[80,65],[91,70]],
  [[34,55],[31,43],[27,34],[23,22]],
  [[38,58],[32,60],[25,63],[25,68],[29,73],[30,78]],
  [[53,37],[61,30],[68,29],[76,25],[88,20],[102,17]],
  [[39,82],[47,82],[56,82],[63,77]],
  [[45,43],[41,34],[40,29],[44,24],[49,23],[56,29]],
].map(expand);
// Continue the same channel beyond the playable area so its ends stay out of view.
const RIVER = expand([[-5,-108],[15,-8],[18,7],[22,21],[28,34],[32,42],[36,51],[37,58],[33,70],[34,86],[39,105],[45,120],[85,220]]);
function distanceToSegment(p,a,b) {const dx=b[0]-a[0],dz=b[1]-a[1],d=dx*dx+dz*dz;const t=d?clamp(((p.x-a[0])*dx+(p.z-a[1])*dz)/d,0,1):0;return Math.hypot(p.x-a[0]-t*dx,p.z-a[1]-t*dz);}
function nearRoad(x,z,d=2.4){return ROAD_PATHS.some(path=>path.some((a,i)=>i&&distanceToSegment({x,z},path[i-1],a)<d));}
function nearRiver(x,z,d=3){return RIVER.some((a,i)=>i&&distanceToSegment({x,z},RIVER[i-1],a)<d);}
function samplePath(path,step=1) { const out=[];for(let i=1;i<path.length;i++){let a=path[i-1],b=path[i],n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/step);for(let j=0;j<n;j++)out.push([lerp(a[0],b[0],j/n),lerp(a[1],b[1],j/n)]);}out.push(path[path.length-1]);return out; }
const TRUNK_SAMPLES=ROAD_PATHS.map(p=>samplePath(p));
function entranceOf(loc){const f=footprint(loc);return {x:loc.x-f.w*.12,z:loc.z+f.d/2+2.15};}
const ACCESS_PATHS=LOCATIONS.filter(l=>!['bridge','orchard','square'].includes(l.type)).map(loc=>{
  const e=entranceOf(loc);let best=null,dist=Infinity;
  for(const road of TRUNK_SAMPLES)for(const a of road){const d=Math.hypot(e.x-a[0],e.z-a[1]);if(d<dist){best=a;dist=d;}}
  return best?[[best[0],best[1]],[(best[0]+e.x)/2,e.z],[e.x,e.z]]:[[e.x,e.z]];
});
const ROAD_SAMPLES=[...TRUNK_SAMPLES,...ACCESS_PATHS.map(p=>samplePath(p))];
const RIVER_SAMPLES=samplePath(RIVER,.8);

function buildTerrainField(){
  const step=1.5,minQ=-360,minT=-220,n=481,m=481,values=new Float32Array(n*m);
  const pads=LOCATIONS.filter(l=>footprint(l).h||['square','market','fountain','wash'].includes(l.type)).map(loc=>{
    const f=footprint(loc),special={square:[10,10],market:[9.5,8.5],fountain:[5.5,5.5],wash:[6.5,6.5]}[loc.type];
    const w=special?.[0]||f.w,d=special?.[1]||f.d;
    return {x:loc.x,z:loc.z,b:mountainHeightRaw(loc.x,loc.z),x0:loc.x-w/2-1.9,x1:loc.x+w/2+(loc.style==='courtyard'?3.3:1.9),z0:loc.z-d/2-.8,z1:loc.z+d/2+4.4};
  });
  for(let i=0;i<n;i++){
    const q=minQ+i*step;
    for(let j=0;j<m;j++){
      const t=minT+j*step,x=(t+q)/2,z=(t-q)/2;let h=mountainHeightRaw(x,z),best=0,flat=h;
      if(Math.abs(x-riverXAt(z))>3.7)for(const p of pads){
        const dx=Math.max(p.x0-x,0,x-p.x1),dz=Math.max(p.z0-z,0,z-p.z1),outside=Math.hypot(dx,dz);
        if(outside>=4.2)continue;const u=1-outside/4.2,weight=u*u*(3-2*u);
        if(weight>best){best=weight;flat=p.b;}
      }
      h=lerp(h,flat,best);
      values[i*m+j]=h;
    }
    // Extend the uphill approach when a pad needs extra support. Raising that
    // approach preserves the level yard and entrance instead of cutting its
    // downhill half away. Screen depth still remains strictly increasing.
    for(let j=m-2;j>=0;j--)values[i*m+j]=Math.max(values[i*m+j],values[i*m+j+1]-step*.432);
  }
  return {step,minQ,minT,n,m,values};
}
TERRAIN_FIELD=buildTerrainField();

function makeCanvas(w,h) {
  let c;if(typeof document!=='undefined'&&document.createElement)c=document.createElement('canvas');else if(typeof OffscreenCanvas!=='undefined')c=new OffscreenCanvas(w,h);else throw new Error('Canvas is unavailable');
  c.width=Math.ceil(w);c.height=Math.ceil(h);return c;
}
function footprint(loc){
  if(Number.isFinite(loc.w))return {w:loc.w,d:loc.d,h:loc.h};
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
  const random=rng(seed),width=Math.hypot(b.x-a.x,b.z-a.z),rows=Math.max(4,Math.round(h/.41));
  const P=(u,y)=>project(lerp(a.x,b.x,u/width),lerp(a.z,b.z,u/width),y,base);
  for(let row=0;row<rows;row++){
    const low=y0+row*h/rows,high=low+h/rows-.035;let u=-(row%2)*.37;
    while(u<width){
      const w=.36+random()*.63,left=Math.max(0,u+.025),right=Math.min(width,u+w-.025);
      if(right>left){const inset=.03+random()*.06,pts=[P(left,low+.055),P(right-inset,low+.02),P(right,low+.11),P(right-.01,high-.05),P(left+inset,high),P(left,high-.12)];
        const tone=random();poly(c,pts,tone<.2?'#d5c6a645':tone>.73?'#6c74634d':'#bbb39b25','#5f65552d',.55);
        if(tone<.3)line(c,[P(left+.08,high-.02),P(right-.1,high-.02)],'#e1d1b142',.7);
      }
      u+=w;
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
  const doorHeight=loc.id==='church'?1.95:Math.min(2.15,f.h-.28);
  poly(c,[get(-.61,0),get(.61,0),get(.61,doorHeight),get(-.61,doorHeight)],'#554b37','#c3b293',3.5);
  for(let i=-.4;i<.6;i+=.25)line(c,[get(i,.12),get(i,doorHeight-.12)],'#9c7a4866',.6);
  const dot=get(.33,1.15);oval(c,dot.x,dot.y,1,1.3,'#d1af67');
  if(side==='z')block(c,p,loc.z+f.d/2+.46,1.7,.8,.22,['#b6ae97','#898873','#a39c86'],base);
}
function roof(c,loc,condition,rand){
  if(loc.roofShape==='hip')return roofHip(c,loc,condition,rand);
  const f=footprint(loc),base=elevation(loc.x,loc.z),chapel=loc.id==='church',shed=loc.style==='shed';
  const over=chapel?1.06:.38,axis=loc.roofAxis||'x';
  const len=(axis==='x'?f.w:f.d)/2+over,half=(axis==='x'?f.d:f.w)/2+over;
  const h=f.h+.04,rise=chapel?3.0:loc.type==='church'?2.85:Math.min(2.2,half*.62);
  const P=(u,v,y)=>axis==='x'?project(loc.x+u,loc.z+v,y,base):project(loc.x+v,loc.z+u,y,base);
  const palettes=[['#ac7459','#875c45','#c3916d'],['#a8785c','#835e47','#bb9572'],['#99785e','#79634e','#b39877'],['#93806c','#756452','#ada089']];
  const colors=palettes[loc.roofTone??(seedOf(loc.id)%4)];
  const H=v=>shed?h+rise*(half-v)/(2*half):h+rise*(1-Math.abs(v)/half);
  // Each roof is a continuous weathered tile surface. There are no black panels.
  const damage=condition<48,notch=damage?.19+(48-condition)*.005:0;
  const eave=(v)=>{
    const out=[];for(let j=0;j<=18;j++){const u=-len+j*len/9;const irregular=damage&&j%5===2?notch*(.6+rand()*.7):.025;out.push(P(u,v+(v>0?-irregular:irregular),H(v)+irregular*.4));}return out;
  };
  if(!shed){
    const tip=f.h+rise-.06;
    for(const u of [-1,1])poly(c,[P(u*(len-over),-half+over,f.h),P(u*(len-over),half-over,f.h),P(u*(len-over),0,tip)],u===1?'#a59982':'#b7aa91','#80745d66',.5);
    for(const sign of [-1,1]){
      const vv=sign*half;poly(c,[P(-len,0,h+rise),P(len,0,h+rise),...eave(vv).reverse()],sign>0?colors[1]:colors[0],'#695641',.9);
    }
  }else{
    poly(c,[P(-len,-half,H(-half)),P(len,-half,H(-half)),...eave(half).reverse()],colors[1],'#695641',.9);
    poly(c,[P(len-over,-half+over,f.h),P(len-over,-half+over,H(-half)-.12),P(len-over,half-over,f.h)],'#a49477');
  }
  const bands=shed?1:2;
  for(let side=0;side<bands;side++){
    const from=shed?-half:0,end=shed?half:side===0?-half:half;
    const rows=Math.ceil(Math.abs(end-from)*2.7),cols=Math.ceil(len*2*2.9);
    for(let row=1;row<=rows;row++){
      const t=row/rows,v=lerp(from,end,t),prev=lerp(from,end,(row-.83)/rows);
      const edge=row===rows;
      for(let col=0;col<cols;col++){
        const u=-len+(col+(row%2)*.45)*len*2/cols;
        if(u>len-.05||damage&&edge&&(col%9===3||col%13===7))continue;
        const tone=rand();
        line(c,[P(u,prev,H(prev)+.014),P(u+.01,v,H(v)+.014)],tone<.13?colors[2]:tone>.85?'#69543e88':'#d2ad8259',.85);
        if(tone<.27){const next=Math.min(len,u+len*2/cols*.76);line(c,[P(u,v,H(v)+.018),P(next,v,H(v)+.018)],'#584b3754',.65);}
        if(damage&&tone<.055){const q=P(u,v,H(v)+.035);line(c,[q,{x:q.x+1.5,y:q.y-.3}],colors[2],1.7);}
      }
      if(!edge)line(c,[P(-len,v,H(v)),P(len,v,H(v))],'#c1a18132',.6);
    }
  }
  if(!shed){line(c,[P(-len,0,h+rise),P(len,0,h+rise)],colors[2],2.2);for(let u=-len;u<len;u+=.44)line(c,[P(u,0,h+rise),P(u+.08,.08,h+rise-.05)],'#6756419a',.65);}
  for(const sign of [-1,1])line(c,[P(-len,sign*half,H(sign*half)-.09),P(len,sign*half,H(sign*half)-.09)],'#6b5b4399',1.35);
  if(damage){
    // Exposed rafter ends and irregular missing eave tiles read as age, not PV.
    for(let i=0;i<5;i++){const u=-len+.6+i*(len*2-1.2)/4;line(c,[P(u,half-.25,H(half)+.02),P(u,half+.14,H(half)-.16)],'#b2976b',1.4);}
  }
  if(['bakery','cafe','inn'].includes(loc.type)||loc.style==='anogi'&&seedOf(loc.id)%2){
    const x=loc.x-f.w*.22,z=loc.z-f.d*.16;
    block(c,x,z,.53,.59,1.0,['#b6a990','#7d7967','#a3967c'],base,f.h+rise*.53);
    block(c,x,z,.73,.75,.15,['#c8b99b','#8d8169','#a29478'],base,f.h+rise*.53+.98);
  }
  return {top:Math.min(P(-len,0,h+rise).y,P(len,0,h+rise).y),rise};
}
function roofHip(c,loc,condition,rand){
  const f=footprint(loc),b=elevation(loc.x,loc.z),x0=loc.x-f.w/2-.42,x1=loc.x+f.w/2+.42,z0=loc.z-f.d/2-.42,z1=loc.z+f.d/2+.42,h=f.h+.04,rise=1.75;
  const P=(x,z,y)=>project(x,z,y,b),r0={x:loc.x-f.w*.24,z:loc.z,h:h+rise},r1={x:loc.x+f.w*.24,z:loc.z,h:h+rise};
  const faces=[[[x0,z0,h],[x1,z0,h],[r1.x,r1.z,r1.h],[r0.x,r0.z,r0.h]],[[x1,z0,h],[x1,z1,h],[r1.x,r1.z,r1.h]],[[x1,z1,h],[x0,z1,h],[r0.x,r0.z,r0.h],[r1.x,r1.z,r1.h]],[[x0,z1,h],[x0,z0,h],[r0.x,r0.z,r0.h]]];
  const colors=['#a17a5c','#8b664d','#997158','#a17d5e'];
  faces.forEach((face,i)=>{
    const pts=face.map(([x,z,h])=>P(x,z,h));poly(c,pts,colors[i],'#6d5942',.75);
    const a=face[0],bb=face[1],top=face[2],other=face[3]||face[2];
    for(let row=1;row<9;row++){
      const t=row/9,aa=a.map((v,k)=>lerp(v,other[k],t)),end=bb.map((v,k)=>lerp(v,top[k],t));
      line(c,[P(...aa),P(...end)],'#d5b58b60',.8);
      const cols=Math.ceil(Math.hypot(aa[0]-end[0],aa[1]-end[1])*2.7);
      for(let col=0;col<cols;col++){
        const u=col/cols,xyz=aa.map((v,k)=>lerp(v,end[k],u));const dd=P(...xyz);line(c,[dd,{x:dd.x+.4,y:dd.y-2.6}],rand()<.2?'#76583b75':'#dfbb8a50',.7);
      }
    }
  });
  line(c,[P(r0.x,r0.z,r0.h),P(r1.x,r1.z,r1.h)],'#c7a17c',2.1);
  for(const [a,b]of [[faces[1][0],faces[1][2]],[faces[1][1],faces[1][2]],[faces[3][0],faces[3][2]]])line(c,[P(...a),P(...b)],'#b9926b',1.5);
  if(condition<40)for(let i=0;i<6;i++){const x=lerp(x0+.3,x1-.3,(i+.2)/6);line(c,[P(x,z1-.2,h+.12),P(x,z1+.16,h-.12)],'#b2936c',1.4);}
  return {top:Math.min(P(r0.x,r0.z,r0.h).y,P(r1.x,r1.z,r1.h).y),rise};
}
function balcony(c,loc){
  const f=footprint(loc),b=elevation(loc.x,loc.z),z=loc.z+f.d/2+1.0,x0=loc.x-f.w*.47,x1=loc.x+f.w*.46,floor=f.h*.50;
  const P=(x,z,h)=>project(x,z,h,b);
  groundRect(c,(x0+x1)/2,z-.42,x1-x0,1.28,'#8b7857','#574b36',b,floor);
  for(let x=x0;x<=x1;x+=.35)line(c,[P(x,z,floor),P(x,z,floor+.83)],'#76654c',1.3);
  line(c,[P(x0,z,floor+.86),P(x1,z,floor+.86)],'#b19b74',2);
  for(const x of [x0,(x0+x1)/2,x1])line(c,[P(x,z,0),P(x,z,f.h-.1)],'#756145',2.5);
  line(c,[P(x0,z,floor),P(x1,z,floor)],'#564731',2.8);
  // The traditional covered iliakos makes the upper floor visually distinctive.
  poly(c,[P(x0-.15,z-1.3,f.h+.03),P(x1+.15,z-1.3,f.h+.03),P(x1+.15,z+.22,f.h-.35),P(x0-.15,z+.22,f.h-.35)],'#947659','#625038',.8);
  for(let x=x0;x<x1;x+=.31)line(c,[P(x,z-1.2,f.h+.05),P(x,z+.2,f.h-.33)],'#c2a0776e',.7);
  line(c,[P(x0,z,f.h-.29),P(x1,z,f.h-.29)],'#554731',2.5);
  // An exterior stone stair belongs to an old hillside house.
  for(let i=0;i<7;i++)block(c,x0-.68,z-.1-i*.48,1.0,.52,(i+1)*floor/7,['#b4ab91','#827e6b','#a29a82'],b);
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
  const f=footprint(loc),b=elevation(loc.x,loc.z),P=(x,z,h=0)=>project(x,z,h,b),style=loc.style||'cottage';
  const shadow=[P(loc.x-f.w/2,loc.z-f.d/2),P(loc.x+f.w/2,loc.z-f.d/2),P(loc.x+f.w/2+1.8,loc.z+f.d/2+1.1),P(loc.x-f.w/2+1.0,loc.z+f.d/2+1.7)];
  poly(c,shadow,'#38432b21');
  const tones=[['#beb39b','#898b7b','#a5a18b'],['#b7ad98','#848573','#a49b83'],['#c2b59c','#938a74','#b0a289']][seedOf(loc.id)%3];
  drawHillsideFoundation(c,loc);
  block(c,loc.x,loc.z,f.w+.12,f.d+.12,.27,['#b1a58b','#777b6a','#9b987f'],b-.08);
  block(c,loc.x,loc.z,f.w,f.d,f.h,tones,b);
  wallStones(c,{x:loc.x+f.w/2,z:loc.z-f.d/2},{x:loc.x+f.w/2,z:loc.z+f.d/2},0,f.h,'x',b,seedOf(loc.id),condition);
  wallStones(c,{x:loc.x-f.w/2,z:loc.z+f.d/2},{x:loc.x+f.w/2,z:loc.z+f.d/2},0,f.h,'z',b,seedOf(loc.id)+5,condition);
  const plaster=loc.id==='paraskevi'?'lime':loc.plaster||'stone';
  if(plaster!=='stone'){
    const light=plaster==='ochre'?'#cdb182':'#d9d3bc',dark=plaster==='ochre'?'#b69c70':'#b8baa7';
    const bottom=style==='anogi'?f.h*.48:.45;
    const points=[[.04,bottom],[.12,bottom+.25],[.27,bottom-.05],[.36,bottom+.18],[.6,bottom-.1],[.67,bottom+.3],[.85,bottom+.04],[.97,bottom+.3],[.98,f.h-.12],[.03,f.h-.12]];
    poly(c,points.map(([t,h])=>P(loc.x-f.w/2+t*f.w,loc.z+f.d/2+.018,h)),light+(condition>=60?'ed':'cd'));
    poly(c,points.map(([t,h])=>P(loc.x+f.w/2+.018,loc.z-f.d/2+t*f.d,h)),dark+'b8');
    for(let i=0;i<(condition<45?6:2);i++){
      const xx=loc.x-f.w/2+.2+rand()*(f.w-.4),zz=loc.z+f.d/2+.024,yy=bottom+.2+rand()*(f.h-bottom-.45);
      poly(c,[P(xx,zz,yy),P(xx+.38,zz,yy+.07),P(xx+.6,zz,yy+.41),P(xx+.26,zz,yy+.54),P(xx-.14,zz,yy+.32)],tones[2]+'b0');
    }
  }
  if(style==='anogi'){
    for(const h of [f.h*.49,f.h-.15])line(c,[P(loc.x-f.w/2,loc.z+f.d/2+.04,h),P(loc.x+f.w/2,loc.z+f.d/2+.04,h)],'#72634b',1.8);
  }
  if(loc.type==='church'){
    doorOn(c,loc,'x',.5);
    windowOn(c,loc,'z',.3,loc.id==='church'?.9:1.8,.42,loc.id==='church'?.7:1.1,false);windowOn(c,loc,'z',.72,loc.id==='church'?.9:1.8,.42,loc.id==='church'?.7:1.1,false);
    if(loc.id==='church'){
      const zz=loc.z+f.d/2+.9;
      for(let xx=loc.x-f.w/2-.65;xx<=loc.x+f.w/2+.7;xx+=(f.w+1.3)/4){line(c,[P(xx,zz),P(xx,zz,f.h+.1)],'#7b6849',2.4);line(c,[P(xx,zz,f.h*.64),P(xx+.46,zz,f.h+.1)],'#998160',1.2);}
      line(c,[P(loc.x-f.w/2-.9,zz,f.h),P(loc.x+f.w/2+.9,zz,f.h)],'#675339',2.8);
    }
  }else if(style==='openworkshop'){
    const front=loc.z+f.d/2+.03;
    poly(c,[P(loc.x-f.w*.44,front,.25),P(loc.x+f.w*.41,front,.25),P(loc.x+f.w*.41,front,f.h-.3),P(loc.x-f.w*.44,front,f.h-.3)],'#6b6650');
    for(const dx of [-.47,0,.45])line(c,[P(loc.x+f.w*dx,front,0),P(loc.x+f.w*dx,front,f.h)],'#b29260',2.8);
    line(c,[P(loc.x-f.w/2,front,f.h-.15),P(loc.x+f.w/2,front,f.h-.15)],'#715b3e',3.5);
    block(c,loc.x-.7,front-.3,3.5,.9,1.0,['#b59c6b','#806d49','#a48a5b'],b);drawTrough(c,loc.x-.4,front-.3,b+.95);
  }else{
    const doorT=style==='longhouse'?.46:style==='anogi'?.67:.29;
    doorOn(c,loc,'z',doorT);
    const windowH=f.h>4.5?1.0:1.05,wh=Math.min(1.2,f.h-1.38);
    windowOn(c,loc,'x',.34,windowH,.65,wh,style!=='shed');
    if(f.d>5.1)windowOn(c,loc,'x',.76,windowH,.63,wh);
    if(style==='anogi'||f.h>4.5){
      const y=f.h*.52+.22;
      windowOn(c,loc,'z',.26,y,.76,Math.min(1.4,f.h-y-.28));windowOn(c,loc,'z',.73,y,.76,Math.min(1.4,f.h-y-.28));windowOn(c,loc,'x',.5,y,.7,1.3);
    }else{
      windowOn(c,loc,'z',.77,1.05,.72,wh);
      if(style==='longhouse')windowOn(c,loc,'z',.15,1.05,.75,wh);
    }
  }
  if(condition<46){const x=loc.x+f.w*.18,z=loc.z+f.d/2+.04;line(c,[P(x-.18,z,f.h*.9),P(x,z,f.h*.68),P(x-.12,z,f.h*.51),P(x+.16,z,f.h*.26)],'#6c644d80',.65);}
  roof(c,loc,condition,rand);
  if(loc.id==='paraskevi')drawParishDome(c,loc,b);
  if(style==='anogi')balcony(c,loc);
  if(style==='courtyard'){
    const wing={...loc,id:loc.id+'-wing',x:loc.x+f.w/2+1.15,z:loc.z+.25,w:2.7,d:f.d+1.5,h:Math.min(2.7,f.h*.8),style:'shed',roofAxis:'z',type:'house',plaster:'stone'};
    drawHouse(c,wing,condition+7,rand);
    const zz=loc.z+f.d/2+3.6;
    drawStoneWall(c,[[loc.x-f.w/2-.2,zz],[loc.x+f.w*.05,zz]],.82);
    drawStoneWall(c,[[loc.x+f.w*.33,zz],[wing.x+1.25,zz],[wing.x+1.25,loc.z+f.d/2+1.1]],.68);
    drawTrough(c,loc.x-.5,zz-.65,b);
    pot(c,loc.x-1.5,zz-1.0,b,condition>50);
  }
  if(loc.type==='church'){
    const p=P(loc.x+f.w*.35,loc.z,f.h+(loc.id==='church'?3.3:3.08));line(c,[{x:p.x,y:p.y-7},{x:p.x,y:p.y+2}],'#675d43',1.7);line(c,[{x:p.x-3,y:p.y-4},{x:p.x+3,y:p.y-4}],'#675d43',1.5);
    if(loc.id==='paraskevi'){
      const xx=loc.x-f.w*.64,zz=loc.z+f.d*.24;
      block(c,xx,zz,1.35,1.45,6.2,['#c9bea4','#a69e86','#beb299'],b);
      const pp=P(xx,zz,6.55);poly(c,[{x:pp.x-12,y:pp.y+4},{x:pp.x,y:pp.y-12},{x:pp.x+12,y:pp.y+4}],'#977255','#6f593e',.7);
      oval(c,pp.x,pp.y+11,3.5,6,'#6b6550');line(c,[{x:pp.x,y:pp.y-12},{x:pp.x,y:pp.y-22}],'#6b6041',1.5);line(c,[{x:pp.x-3,y:pp.y-18},{x:pp.x+3,y:pp.y-18}],'#6b6041',1.4);
    }
  }
  if(loc.type==='office'){
    const p=P(loc.x+f.w*.43,loc.z+f.d/2+.1,3.9);line(c,[p,{x:p.x,y:p.y-20}],'#635d47',1.2);poly(c,[{x:p.x,y:p.y-20},{x:p.x+12,y:p.y-16},{x:p.x+12,y:p.y-8},{x:p.x,y:p.y-12}],'#e8e0c8');oval(c,p.x+6,p.y-14,2.2,1.3,'#bc9b57');
    const pp=P(loc.x+f.w*.07,loc.z+f.d/2+.1,2.3);c.save();c.translate(pp.x,pp.y);c.transform(1,.49,0,1,0,0);c.fillStyle='#676b52';c.fillRect(-11,-5,22,7);c.fillStyle='#e6ddbd';c.font='4px Georgia';c.textAlign='center';c.fillText('ΚΟΙΝΟΤΗΤΑ',0,.1);c.restore();
  }
  if(loc.type==='cafe'){
    for(const [dx,dz]of [[-2.6,3.2],[.3,4.0],[2.8,3.5]])drawTable(c,loc.x+dx,loc.z+dz,b);
    const zz=loc.z+f.d/2+2.0;
    for(const dx of [-.48,.48])line(c,[P(loc.x+dx*f.w,zz),P(loc.x+dx*f.w,zz,2.7)],'#8d7851',2.1);
    for(let dx=-f.w*.5;dx<=f.w*.5;dx+=.72)line(c,[P(loc.x+dx,loc.z+f.d/2,2.95),P(loc.x+dx,zz,2.7)],'#aa9060',2.1);
    line(c,[P(loc.x-f.w*.5,zz,2.7),P(loc.x+f.w*.5,zz,2.7)],'#7d6947',2.7);
    for(let j=0;j<13;j++){const pp=P(loc.x-f.w*.5+rand()*f.w,loc.z+f.d/2+.2+rand()*1.7,2.9);oval(c,pp.x,pp.y,5+rand()*4,2.5,'#879365a5');}
  }
  if(loc.type==='bakery'){
    const p=P(loc.x+f.w/2+1.0,loc.z+.7,.5);oval(c,p.x,p.y-6,12,11,'#bba27b');oval(c,p.x+1,p.y-1,5,5,'#6a5940');oval(c,p.x+1,p.y,2.5,3,'#dca34e');
    for(let i=0;i<5;i++)drawLog(c,loc.x+f.w/2+1.5,loc.z+1.7+i*.3,1.4,b);
  }
  if(loc.type==='workshop'){
    for(let i=0;i<4;i++)drawLog(c,loc.x-f.w/2-.8,loc.z-.7+i*.65,2.6,b);
    drawTrough(c,loc.x+1.5,loc.z+f.d/2+1.6,b);drawTrough(c,loc.x-1.2,loc.z+f.d/2+1.4,b);
  }
  if(loc.type==='coop'||loc.type==='inn')for(let i=0;i<3;i++)block(c,loc.x+f.w/2+.6,loc.z+.3+i*.7,.6,.6,.6,['#b4a173','#7b7150','#96825a'],b);
  if(!loc.id.endsWith('-wing')){pot(c,loc.x-f.w/2-.2,loc.z+f.d/2+.2,b,condition>=60);if(condition>=65)pot(c,loc.x+f.w/2+.2,loc.z+f.d/2+.4,b,true);}
  rubble(c,loc,condition,rand);
}
function drawParishDome(c,loc,b){
  const f=footprint(loc),p=project(loc.x,loc.z-.3,f.h+2.0,b),r=20,yy=p.y-12;
  // Drum and tiled dome of Agia Paraskevi, distinct from the medieval chapel.
  poly(c,[{x:p.x-r,y:yy-10},{x:p.x+r,y:yy-10},{x:p.x+r,y:yy+23},{x:p.x-r,y:yy+23}],'#d8ceb7','#998c74',.75);
  oval(c,p.x,yy+23,r,8.6,'#c6bda5');
  for(const [dx,dw,dh]of [[-13,5.6,15],[-3.5,7,18],[10,5.5,15]]){
    const x=p.x+dx,y=yy+3;
    c.beginPath();c.moveTo(x-dw/2,y+dh);c.lineTo(x-dw/2,y+2);c.bezierCurveTo(x-dw/2,y-7,x+dw/2,y-7,x+dw/2,y+2);c.lineTo(x+dw/2,y+dh);c.closePath();c.fillStyle='#6f7465';c.fill();c.strokeStyle='#ede0c5';c.lineWidth=2.2;c.stroke();
  }
  c.beginPath();c.moveTo(p.x-r-1,yy-8);c.bezierCurveTo(p.x-r,yy-23,p.x-7,yy-38,p.x,yy-39);c.bezierCurveTo(p.x+10,yy-37,p.x+r,yy-23,p.x+r+1,yy-8);c.bezierCurveTo(p.x+10,yy-1,p.x-10,yy-1,p.x-r-1,yy-8);c.closePath();c.fillStyle='#9f6b4d';c.fill();c.strokeStyle='#73563e';c.lineWidth=.8;c.stroke();
  for(const dx of [-14,-7,0,7,14]){c.beginPath();c.moveTo(p.x,yy-38);c.quadraticCurveTo(p.x+dx*.8,yy-28,p.x+dx,yy-5);c.strokeStyle='#d1a678b0';c.lineWidth=.8;c.stroke();}
  line(c,[{x:p.x,y:yy-38},{x:p.x,y:yy-50}],'#705a3c',1.7);line(c,[{x:p.x-3.4,y:yy-46},{x:p.x+3.4,y:yy-46}],'#705a3c',1.5);
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
function drawHillsideFoundation(c,loc){
  const f=footprint(loc),b=elevation(loc.x,loc.z),x0=loc.x-f.w/2-.55,x1=loc.x+f.w/2+.62,z0=loc.z-f.d/2-.35,z1=loc.z+f.d/2+1.2;
  // A level house is cut into the hill. Only its downhill sides need masonry;
  // the foundation follows the real ground below, never a repeated floating box.
  for(const [a,d]of [[[x1,z0],[x1,z1]],[[x0,z1],[x1,z1]]]){
    const n=Math.ceil(Math.hypot(d[0]-a[0],d[1]-a[1])/.75);
    for(let i=0;i<n;i++){
      const t=i/n,u=(i+1)/n,aa=[lerp(a[0],d[0],t),lerp(a[1],d[1],t)],bb=[lerp(a[0],d[0],u),lerp(a[1],d[1],u)],ea=Math.min(b,mountainHeightRaw(...aa)-.1),eb=Math.min(b,mountainHeightRaw(...bb)-.1);
      if(b-Math.min(ea,eb)<.1)continue;
      poly(c,[project(...aa,0,b),project(...bb,0,b),project(...bb,0,eb),project(...aa,0,ea)],a[0]===d[0]?'#747967':'#8d8c73','#5d67543d',.5);
      for(let h=.3;h<b-Math.min(ea,eb);h+=.42){const ya=Math.max(ea,b-h),yb=Math.max(eb,b-h);line(c,[project(...aa,0,ya),project(...bb,0,yb)],'#c4b59875',.75);}
      if(i%2===0)line(c,[project(...bb,0,b),project(...bb,0,eb)],'#525f493a',.6);
    }
  }
  groundRect(c,loc.x,loc.z+.4,f.w+1.17,f.d+1.55,'#b5a98b',null,b,.01);
}

function drawMountainRiser(c,points,height=1.3){
  const pts=samplePath(points,.8);
  for(let i=1;i<pts.length;i++){
    const a=pts[i-1],b=pts[i],pa=project(...a),pb=project(...b),aa=project(...a,-height),bb=project(...b,-height);
    poly(c,[pa,pb,bb,aa],i%3?'#7e8168':'#888770','#56634d35',.5);
    for(let y=.35;y<height;y+=.4)line(c,[project(...a,-y),project(...b,-y)],'#c0b28b60',.6);
    if(i%2===0)line(c,[pa,aa],'#59664d50',.55);
  }
  line(c,pts.map(p=>project(...p,.02)),'#b2ac83',2.3);
  line(c,pts.map(p=>project(...p,.15)),'#768a515f',2.4);
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
  const c=makeCanvas(4400,3400),g=c.getContext('2d');g.translate(2200,1450);
  const random=rng(1280);
  // A tessellated heightfield, lit from the upper left, makes the entire land a
  // continuous mountain slope. Warm exposed rock interrupts olive vegetation.
  const step=2.8,tiles=[];
  for(let x=-106;x<265;x+=step)for(let z=-100;z<252;z+=step){
    const mx=x+step/2,mz=z+step/2,h=elevation(mx,mz),hx=(elevation(mx+.25,mz)-elevation(mx-.25,mz))/.5,hz=(elevation(mx,mz+.25)-elevation(mx,mz-.25))/.5;
    const light=clamp((1+hx*.85-hz*.45)/Math.sqrt(1+hx*hx+hz*hz)/1.39,.32,1);
    const across=mx-riverXAt(mz),rocks=(Math.sin(mx*.095+mz*.078)+Math.cos(mx*.17-mz*.042))*.5;
    const rocky=clamp((Math.abs(across)-10)/16,0,1)*clamp((rocks-.2)*1.45,0,1),base=[142,157,105].map((v,i)=>lerp(v,[166,154,116][i],rocky)),shade=.53+light*.5,variation=Math.sin(mx*.23+mz*.09)*.7;
    const color=base.map(v=>Math.round(clamp(v*shade+variation,0,255))),dark=color.map(v=>Math.round(v*.975));
    const a=project(x,z),b=project(x+step,z),d=project(x,z+step),cc=project(x+step,z+step);
    tiles.push({depth:x+z,pts:[a,b,cc,d],color:`rgb(${color})`,dark:`rgb(${dark})`});
  }
  tiles.sort((a,b)=>a.depth-b.depth);
  for(const tile of tiles)poly(g,tile.pts,tile.color,tile.color,.8);
  // Broken outcrops run across the hillside. Their feet meet the same terrain
  // mesh; these are rock faces within the inhabited mountain, not a backdrop.
  for(let band=0;band<9;band++){
    const start=19+band*8.4,path=[];
    for(let i=0;i<13;i++){const z=13+i*9.5,x=riverXAt(z)+start+Math.sin(z*.071+band*.8)*2.2;path.push([x,z]);}
    for(let i=0;i<path.length-2;i+=3){
      const a=path[i],b=path[i+1],d=path[i+2];
      if([a,b,d].some(p=>nearRoad(...p,3.8)||LOCATIONS.some(l=>Math.hypot(l.x-p[0],l.z-p[1])<7)))continue;
      const pts=samplePath([a,b,d],1.3),upper=pts.map(p=>project(...p)),lower=pts.map(([x,z])=>project(x-2.3,z+.9));
      poly(g,[...upper,...lower.reverse()],band%3?'#9b997760':'#898b6b85');
      line(g,upper,'#c1b88a89',1.4);line(g,upper.map(p=>({x:p.x+.4,y:p.y+4})),'#656f5144',1.1);
    }
  }
  // Irregular, stony banks and a narrow stream, never a straight-sided canal.
  const riverBand=(half,color,phase,water=false)=>{
    const edge=(side)=>RIVER_SAMPLES.map(([x,z],i)=>project(x+side*(half+.22*Math.sin(i*.69+phase)+.14*Math.cos(i*.31)),z,0,water?riverElevation(z):null));
    poly(g,[...edge(1),...edge(-1).reverse()],color);
  };
  // The water occupies a carved continuous channel below the banks. Its own
  // downhill profile avoids tiny interpolation ripples from nearby level yards.
  riverBand(3.35,'#889d83',.4);riverBand(2.75,'#b4b797',1.2);riverBand(1.88,'#61968c',0,true);riverBand(1.25,'#82aca0',.5,true);
  line(g,RIVER_SAMPLES.map(([x,z],i)=>project(x+Math.sin(i*.18)*.31,z,0,riverElevation(z))),'#b9cbb067',5);
  for(let i=0;i<RIVER_SAMPLES.length;i+=2){const p=RIVER_SAMPLES[i];for(const sign of [-1,1]){const q=project(p[0]+sign*(2.0+random()*1.0),p[1]+random()-.5);oval(g,q.x,q.y,2.2+random()*3.6,1.5+random()*2.0,i%4?'#a1ac90':'#c5c6aa');}}
  // Lane widths stay human-scale; access spurs lead to front yards.
  ROAD_SAMPLES.forEach((path,i)=>{
    const pts=path.map(p=>project(...p)),main=i<TRUNK_SAMPLES.length;
    line(g,pts,main?'#5e6e444c':'#53674435',main?16:11);line(g,pts,main?'#bfb694':'#b6ac8b',main?11.5:7);line(g,pts,'#e1d5b426',main?4:2);
    for(let j=0;j<path.length;j+=2){const p=path[j];if(nearRiver(p[0],p[1],1.5)&&Math.abs(p[1]-spread(57))>2.2)continue;const q=project(p[0]+(random()-.5)*.6,p[1]+(random()-.5)*.6);line(g,[q,{x:q.x+1.7+random()*2,y:q.y+1}],j%3?'#aca78a54':'#ede0b64d',.75);}
    for(let j=1;j<path.length-1;j+=2){
      const a=path[j-1],b=path[j+1],rise=Math.abs(elevation(...b)-elevation(...a)),run=Math.hypot(b[0]-a[0],b[1]-a[1]);if(rise<run*.23||nearRiver(...path[j],2.2))continue;
      const p=project(...path[j]),pa=project(...a),pb=project(...b),dx=pb.x-pa.x,dy=pb.y-pa.y,len=Math.hypot(dx,dy)||1,w=main?5.6:3.3,edge=[{x:p.x-dy/len*w,y:p.y+dx/len*w},{x:p.x+dy/len*w,y:p.y-dx/len*w}];
      line(g,edge,'#787b5e',1.5);line(g,edge.map(v=>({x:v.x,y:v.y-1.2})),'#ddd0a9',.8);
    }
  });
  // Every homestead has its own irregular yard rather than a repeated square plot.
  for(const loc of LOCATIONS){
    if(['orchard','bridge','square','forest','trail'].includes(loc.type))continue;
    const f=footprint(loc),x=loc.x,z=loc.z,base=elevation(x,z),yard=loc.style==='courtyard'?4.0:loc.style==='anogi'?2.8:3.3;
    const pts=[[x-f.w/2-1.3,z-f.d/2-.5],[x+f.w/2+1.0,z-f.d/2-.85],[x+f.w/2+(loc.style==='courtyard'?3.1:1.6),z+f.d/2+yard],[x-f.w/2-.5,z+f.d/2+yard+.5],[x-f.w/2-1.8,z+f.d*.1]].map(([xx,zz])=>project(xx,zz,0,base));
    poly(g,pts,loc.id==='church'?'#c8bda1':'#c4ba9b67');
    if(f.h&&loc.type!=='church'){
      drawStoneWall(g,[[x-f.w/2-1.3,z-f.d/2-.6],[x-f.w/2-1.3,z+f.d*.27]],.5);
      if(loc.type==='house'){
        const gx=x-f.w/2-2.4,gz=z+f.d*.1;
        groundRect(g,gx,gz,1.4,3.8,'#a4a77c');for(let j=0;j<4;j++)line(g,[project(gx-.55,gz-1.5+j*.8),project(gx+.55,gz-1.5+j*.8)],'#6e825c86',2.7);
      }
    }
  }
  // Short, irregular stone terraces follow contour lanes rather than stacking
  // the whole village on identical platforms.
  for(const [i,path]of [ [[70,82],[80,85],[88,83]],[[68,86],[78,90],[88,88]],[[75,91],[84,95],[94,93]],[[64,20],[72,22],[81,20]],[[57,44],[63,48],[69,52]],[[45,58],[51,62],[58,67]],[[43,26],[48,29],[54,32]],[[63,35],[68,39],[72,44]] ].entries())drawMountainRiser(g,expand(path),.8+(i%3)*.38);
  for(let i=0;i<2000;i++){
    const x=-25+random()*185,z=-22+random()*180;
    if(nearRoad(x,z,2.2)||nearRiver(x,z,3.5)||LOCATIONS.some(b=>Math.hypot(b.x-x,b.z-z)<6.4))continue;
    const p=project(x,z);line(g,[{x:p.x-1.5,y:p.y},{x:p.x,y:p.y-2.3},{x:p.x+1,y:p.y}],i%3?'#76895038':'#e2d79c46',.8);
    if(i%8===0)oval(g,p.x+2,p.y+1,1.4,.9,'#c7bd9695');
  }
  return {canvas:c,x:-2200,y:-1450};
}

function createBuildingSprite(loc,condition){
  const sprite=makeCanvas(480,390),c=sprite.getContext('2d'),p=project(loc.x,loc.z);
  c.translate(225-p.x,280-p.y);c.lineJoin='round';c.lineCap='round';
  const random=rng(seedOf(loc.id));
  if(footprint(loc).h)drawHouse(c,loc,condition,random);else drawSpecial(c,loc,condition,random);
  return {canvas:sprite,ox:225,oy:280};
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
  let savedOfficeCamera=null,hitboxes=[],labelHits=[],worldBounds={minX:-1600,minY:-270,maxX:1650,maxY:1750};
  const insets={left:0,right:0,top:0,bottom:0};let hasInsets=false;
  const cam={x:-5,y:500,scale:.9};
  const officeLocation=LOCATIONS.find(l=>l.id==='office');
  const player={...entranceOf(officeLocation),phase:0,moving:false};
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
  while(trees.length<135&&attempts++<2000){
    const x=spread(-8+random()*122),z=spread(-6+random()*117);
    const center=Math.hypot((x-spread(53))*.8,z-spread(53));
    if(center<48&&random()>.13)continue;
    if(nearRoad(x,z,3.1)||nearRiver(x,z,3.5)||LOCATIONS.some(b=>Math.hypot(b.x-x,b.z-z)<(b.type==='orchard'?11:b.type==='forest'?5:7.8)))continue;
    const type=(x>65&&z<39)?(random()<.72?'pine':'cypress'):random()<.13?'cypress':random()<.45?'gold':'olive';
    addTree(x,z,type,.65+random()*.5);
  }
  // The square's plane tree, two church cypresses and riverbank trees are landmarks.
  addTree(spread(56.8),spread(40.6),'gold',1.25,.38);addTree(spread(80.3),spread(73),'cypress',1.15,.5);addTree(spread(69.1),spread(73.3),'cypress',1.05,.7);
  addTree(spread(31.3),spread(33.4),'gold',1,.4);addTree(spread(36.9),spread(74.2),'olive',.9,.6);addTree(spread(18.9),spread(56.4),'gold',1,.2);
  // Wooded shoulders frame the high homes. Clumps follow the mountain ridges,
  // leaving the settlement, its yards and its river crossings unobstructed.
  const ridgeGroves=[[108,38,17,22],[112,72,18,23],[90,110,18,15],[-4,31,14,27]];
  for(const [cx,cz,rx,rz]of ridgeGroves){
    let planted=0,tries=0;while(planted<27&&tries++<220){
      const a=random()*TAU,r=Math.sqrt(random()),x=cx+Math.cos(a)*rx*r,z=cz+Math.sin(a)*rz*r;
      if(nearRoad(x,z,3.7)||nearRiver(x,z,4.5)||LOCATIONS.some(l=>Math.hypot(x-l.x,z-l.z)<9.3)||trees.some(t=>Math.hypot(t.x-x,t.z-z)<2.5))continue;
      addTree(x,z,random()<.83?'pine':'olive',.72+random()*.38);planted++;
    }
  }
  // No decorative house clones: every visible dwelling is a distinct location.
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
  function setCameraDefault(){const availableWidth=width-insets.left-insets.right,availableHeight=height-insets.top-insets.bottom;cam.x=width<700?185:25;cam.y=width<700?235:145;cam.scale=width<700?.51:clamp(Math.min(availableWidth/1720,availableHeight/1020)*1.08,.48,.94);if(mode==='walk'){const p=project(player.x,player.z);cam.x=p.x;cam.y=p.y;cam.scale=Math.max(cam.scale,1.22);}}
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
    if(x<spread(-5)||x>spread(107)||z<spread(-4)||z>spread(108))return true;
    if(nearRiver(x,z,1.62)&&Math.abs(z-spread(57))>1.35)return true;
    return LOCATIONS.some(loc=>{
      const f=footprint(loc);if(!f.h&&loc.type!=='fountain')return false;
      const w=f.h?f.w/2+.35:1.3,d=f.h?f.d/2+.3:1.2;
      if(Math.abs(x-loc.x)<w&&Math.abs(z-loc.z)<d)return true;
      if(loc.style==='courtyard')return Math.abs(x-(loc.x+f.w/2+1.15))<1.7&&Math.abs(z-(loc.z+.25))<(f.d+1.5)/2+.3;
      return false;
    });
  }
  function setWalkTarget(target){
    pendingVisit=null;
    let tx=clamp(target.x,spread(-3),spread(105)),tz=clamp(target.z,spread(-2),spread(106));
    // A small navigation grid routes a walking mayor around houses and via the bridge.
    const step=1.2,min=spread(-4),dim=125;
    const toCell=(x,z)=>[clamp(Math.round((x-min)/step),0,dim-1),clamp(Math.round((z-min)/step),0,dim-1)];
    const toWorld=(a,b)=>({x:min+a*step,z:min+b*step});
    const isOpen=(a,b)=>{if(a<0||b<0||a>=dim||b>=dim)return false;const p=toWorld(a,b);return !blocked(p.x,p.z);};
    function freeCell(cell){if(isOpen(...cell))return cell;for(let r=1;r<8;r++)for(let a=-r;a<=r;a++)for(let b=-r;b<=r;b++){const v=[cell[0]+a,cell[1]+b];if((Math.abs(a)===r||Math.abs(b)===r)&&isOpen(...v))return v;}return cell;}
    const start=freeCell(toCell(player.x,player.z)),goal=freeCell(toCell(tx,tz)),key=(a,b)=>b*dim+a;
    const startKey=key(...start),goalKey=key(...goal),open=[{a:start[0],b:start[1],f:0}],cost=new Map([[startKey,0]]),parent=new Map(),closed=new Set();
    let found=false,count=0;
    while(open.length&&count++<16000){
      open.sort((a,b)=>b.f-a.f);const q=open.pop(),k=key(q.a,q.b);if(closed.has(k))continue;closed.add(k);if(k===goalKey){found=true;break;}
      for(const[da,db]of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){
        const a=q.a+da,b=q.b+db,n=key(a,b);if(!isOpen(a,b)||closed.has(n)||(da&&db&&(!isOpen(q.a+da,q.b)||!isOpen(q.a,q.b+db))))continue;
        const from=toWorld(q.a,q.b),to=toWorld(a,b);
        if([.25,.5,.75].some(t=>blocked(lerp(from.x,to.x,t),lerp(from.z,to.z,t))))continue;
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
      if(mode==='walk'&&loc){const distance=Math.hypot(player.x-loc.x,player.z-loc.z);if(distance<8.5){route=[];moveTarget=null;callbacks.onVisit?.(id);}else {setWalkTarget(entranceOf(loc));}}
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
    if(Math.hypot(mx,my)>.08){
      route=[];moveTarget=null;pendingVisit=null;
      // Invert the local terrain projection: pushing up still travels up the
      // screen on a steep slope instead of sliding diagonally down its face.
      const h=.025,hx=(elevation(player.x+h,player.z)-elevation(player.x-h,player.z))/(2*h),hz=(elevation(player.x,player.z+h)-elevation(player.x,player.z-h))/(2*h),ax=V-U*hx,az=V-U*hz,denom=ax+az;
      const difference=mx/U;dz=(my-ax*difference)/denom;dx=dz+difference;const length=Math.hypot(dx,dz)||1;dx/=length;dz/=length;
    }
    else if(route.length){const p=route[0],dist=Math.hypot(p.x-player.x,p.z-player.z);if(dist<.22){route.shift();if(!route.length)moveTarget=null;}else{dx=p.x-player.x;dz=p.z-player.z;}}
    const length=Math.hypot(dx,dz);player.moving=length>.01;
    if(player.moving){const stride=Math.min(length,dt*5.8);dx=dx/length*stride;dz=dz/length*stride;const nx=player.x+dx,nz=player.z+dz;if(!blocked(nx,nz)){player.x=nx;player.z=nz;}else if(!blocked(nx,player.z))player.x=nx;else if(!blocked(player.x,nz))player.z=nz;player.phase+=dt*2.5;dirty=true;}
    if(!drag&&!pinching&&followPause===0){const p=project(player.x,player.z);const smooth=1-Math.exp(-dt*4.5);cam.x=lerp(cam.x,p.x,smooth);cam.y=lerp(cam.y,p.y-18,smooth);}
    if(callbacks.onPlayerMove&&Math.floor(now/300)!==Math.floor((now-dt*1000)/300))callbacks.onPlayerMove?.({x:player.x,z:player.z,moving:player.moving});
    if(pendingVisit&&!route.length){const id=pendingVisit,loc=LOCATIONS.find(l=>l.id===id);pendingVisit=null;if(loc&&Math.hypot(loc.x-player.x,loc.z-player.z)<8.5)callbacks.onVisit?.(id);}
  }
  function drawBackdrop(now){
    const bg=ctx.createLinearGradient(0,0,0,height);bg.addColorStop(0,'#bcccca');bg.addColorStop(.46,'#d9d4b5');bg.addColorStop(1,'#839575');ctx.fillStyle=bg;ctx.fillRect(0,0,width,height);
    for(let layer=0;layer<3;layer++){
      const pts=[{x:-80,y:height}];for(let i=0;i<=20;i++){const x=-80+i*(width+160)/20,y=height*(.05+layer*.07)+Math.sin(i*.71+layer*2)*height*.045-Math.cos(i*.38+layer)*height*.055;pts.push({x,y});}pts.push({x:width+80,y:height});poly(ctx,pts,['#92a49a','#81978a','#738e77'][layer]);
    }
  }
  function drawWorld(now){
    const center=viewCenter();ctx.save();ctx.translate(center.x,center.y);ctx.scale(cam.scale,cam.scale);ctx.translate(-cam.x,-cam.y);
    ctx.drawImage(ground.canvas,ground.x,ground.y);
    // Fine moving reflections keep the river alive without noisy particle effects.
    for(let i=6;i<RIVER_SAMPLES.length-5;i+=7){const q=RIVER_SAMPLES[i],z=q[1]+Math.sin(now*.00015+i)*.5,p=project(q[0]+Math.sin(now*.00035+i)*.6,z,0,riverElevation(z));const alpha=.16+.12*Math.sin(now*.001+i);line(ctx,[{x:p.x-4,y:p.y},{x:p.x+4,y:p.y+2}],`rgba(233,239,209,${alpha})`,1.2);}
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
      const rx=Math.max((f.w+f.d+(loc.style==='courtyard'?3.0:0))*U/2,loc.type==='orchard'?108:loc.type==='square'?96:loc.type==='market'?88:34)*cam.scale;
      const top=(f.h>0?(f.h+(loc.id==='paraskevi'?5.5:2.4))*U+(f.w+f.d)*V/2:loc.type==='orchard'?92:loc.type==='market'?52:loc.type==='fountain'?58:loc.type==='forest'?35:32)*cam.scale;
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
      let y=screen.y-(f.h>0?(f.h+(loc.id==='paraskevi'?5.5:2.55))*U+(f.w+f.d)*V*.35:loc.type==='orchard'?77:loc.type==='market'?50:loc.type==='fountain'?55:36)*cam.scale-27;
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
    if(destroyed)return;
    // Keep walking speed at 5–10 fps. Small physics steps preserve collision and
    // arrival checks; a hidden-tab return can advance at most a quarter second.
    const elapsed=lastNow?Math.min(.25,Math.max(0,(now-lastNow)/1000)):0;lastNow=now;
    const steps=Math.max(1,Math.ceil(elapsed/.035)),dt=elapsed/steps;
    for(let i=0;i<steps;i++)updatePlayer(dt,now-(steps-1-i)*dt*1000);
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
    walkToBuilding(id,options={}){const loc=LOCATIONS.find(l=>l.id===id);if(!loc)return {ok:false,message:'Δεν βρέθηκε αυτή η τοποθεσία.'};switchMode('walk');selected=id;callbacks.onSelect?.(id);const visit=options.visitOnArrival!==false;if(Math.hypot(loc.x-player.x,loc.z-player.z)<8.5){if(visit)callbacks.onVisit?.(id);return {ok:true,id,arrived:true};}setWalkTarget(entranceOf(loc));if(!route.length)return {ok:false,message:'Δεν βρέθηκε ελεύθερη διαδρομή. Πλησίασε με το joystick ή τα πλήκτρα.'};pendingVisit=visit?id:null;followPause=0;return {ok:true,id,arrived:false,steps:route.length};},
    renderFrame,
    getGroundProjection(x,z){const p=project(x,z);return {...screenPoint(p),height:elevation(x,z),world:p};},
    getGroundAtScreen(x,y){return screenToGround(x,y);},
    getDebugState(){const nearest=LOCATIONS.map(l=>({id:l.id,name:l.name,distance:Math.hypot(l.x-player.x,l.z-player.z)})).sort((a,b)=>a.distance-b.distance)[0];return {width,height,dpr,mode,layer,selected,hovered,inputEnabled,camera:{...cam},insets:{...insets},player:{...player},nearest,route:[...route],pendingVisit,buildingCount:LOCATIONS.length,treeCount:trees.length,npcCount:npcs.length,hitboxes:hitboxes.map(b=>({...b})),labels:labelHits.map(l=>({...l})),cachedBuildings:sprites.size};},
    destroy(){destroyed=true;listeners.forEach(fn=>fn());observer?.disconnect();if(typeof cancelAnimationFrame==='function')cancelAnimationFrame(frameId);sprites.clear();treeSprites.clear();}
  };
}

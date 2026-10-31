const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),smooth=v=>{v=clamp(v);return v*v*(3-2*v);};
const mix=(a,b,u)=>a+(b-a)*u;
export function nominalClimb(l,t){
 const e=l.entryPitch??.12,initial=l.start.y-l.y,outside=-Math.hypot(l.start.x-l.x,l.start.z-l.z);
 const keys=[[0,initial,outside,e],[.12,initial+.08,outside,e-.10],[.23,initial-.01,outside,e+.02],[.36,initial+.15,outside,e-.12],[.44,initial+.02,outside,e],[.62,.08,outside,.30],[.76,.10,-.25,.30],[.88,.06,.30,.12],[1,0,.8,l.endPitch||0]];
 let i=1;while(i<keys.length-1&&t>keys[i][0])i++;const a=keys[i-1],b=keys[i],u=smooth((t-a[0])/(b[0]-a[0]));const d=mix(a[2],b[2],u);
 return{d,y:l.y+mix(a[1],b[1],u)+Math.max(0,d/.8)*(l.stand.y-l.y),pitch:mix(a[3],b[3],u),yaw:-.25*(1-smooth((t-.62)/.32))};
}
const rot=(p,angle,yaw=0)=>{const c=Math.cos(angle),s=Math.sin(angle),cy=Math.cos(yaw),sy=Math.sin(yaw),x=p[0]*cy+p[2]*sy,z=p[2]*cy-p[0]*sy;return[x,p[1]*c-z*s+.18*(1-c),p[1]*s+z*c-.18*s];};
export function plannedRoot(l,time){
 const t=clamp(time/l.duration),frames=l.plan?.frames;
 if(!frames){const p=nominalClimb(l,t);return{x:l.x+l.nx*p.d,z:l.z+l.nz*p.d,y:p.y,pitch:p.pitch,yaw:p.yaw,progress:t};}
 const f=t*(frames.length-1),i=Math.min(frames.length-2,Math.floor(f)),u=f-i,a=frames[i],b=frames[i+1],d=mix(a.d,b.d,u);
 return{x:l.x+l.nx*d,z:l.z+l.nz*d,y:mix(a.y,b.y,u),pitch:mix(a.pitch,b.pitch,u),yaw:mix(a.yaw,b.yaw,u),progress:t};
}
export function rotateQ(q,p){const[x,y,z]=p,[a,b,c,w]=q,tx=2*(b*z-c*y),ty=2*(c*x-a*z),tz=2*(a*y-b*x);return[x+w*tx+b*tz-c*ty,y+w*ty+c*tx-a*tz,z+w*tz+a*ty-b*tx];}
function mixQ(a,b,t){let d=a.reduce((s,x,i)=>s+x*b[i],0);if(d<0){b=b.map(x=>-x);d=-d;}if(d>.9995){const q=a.map((x,i)=>mix(x,b[i],t)),n=Math.hypot(...q);return q.map(x=>x/n);}const angle=Math.acos(clamp(d,-1,1)),s=Math.sin(angle);return a.map((x,i)=>(x*Math.sin((1-t)*angle)+b[i]*Math.sin(t*angle))/s);}
function wristPoint(p,arm){const off=rotateQ(p.q||[0,0,0,1],arm.offset);return{u:p.u-off[0],d:p.d-off[2],y:p.y-off[1]};}
export function handAt(hand,t){
 const u=smooth((t-hand.begin)/(hand.end-hand.begin)),a=hand.from,b=hand.to;
 return{u:mix(a.u,b.u,u),d:mix(a.d,b.d,u),y:mix(a.y,b.y,u)+Math.sin(u*Math.PI)*hand.lift,q:mixQ(a.q,b.q,u),moving:t>hand.begin&&t<hand.end};
}
function surfaceQ(surface,u,d){const y=surface(u,d);if(y===null)return[0,0,0,1];const grad=(a,b)=>{const A=surface(u+a,d+b),B=surface(u-a,d-b);return A!==null&&B!==null?(A-B)/.24:A!==null?(A-y)/.12:B!==null?(y-B)/.12:0;},nx=-grad(.12,0),nz=-grad(0,.12),n=Math.hypot(nx,1,nz),s=Math.sqrt(2*(1+1/n));return[nz/n/s,0,-nx/n/s,s/2];}
export function settleHandAt(hand,arm,t,root,surface){const u=smooth((t-hand.release)/(1-hand.release)),start=handAt(hand,hand.release),rest=rot([arm.pad[0]-arm.side*.02,arm.pad[1],arm.pad[2]],root.pitch,root.yaw),p={u:mix(start.u,rest[0],u),d:mix(start.d,root.d+rest[2],u),y:mix(start.y,root.y+rest[1],u)+Math.sin(Math.PI*u)*hand.arch,q:mixQ(start.q,hand.endQ,u),moving:true};for(const offset of arm.patch){const r=rotateQ(p.q,offset),y=surface(p.u+r[0],p.d+r[2]);if(y!==null)p.y=Math.max(p.y,y+.012-r[1]);}return p;}
export function buildClimbPlan(l,profile,top,ground,solid){
 const started=performance.now(),stats={queries:0};
 const surface=(u,d)=>{stats.queries++;return top(l.x+l.nz*u+l.nx*d,l.z-l.nx*u+l.nz*d);};
 const world=(u,d)=>[l.x+l.nz*u+l.nx*d,l.z-l.nx*u+l.nz*d];
 const candidates=(arm,begin,end)=>{
  const p0=nominalClimb(l,0),s0=rot(arm.shoulder,p0.pitch,p0.yaw),first=[],last=[];
  for(let u=Math.min(arm.pad[0],arm.shoulder[0])-.14;u<=Math.max(arm.pad[0],arm.shoulder[0])+.1401;u+=.04)for(let d=-.45;d<=1.2501;d+=.05){
   const y=surface(u,d);if(y===null||Math.abs(y-l.y)>.75)continue;const grad=(a,b)=>{const A=surface(u+a,d+b),B=surface(u-a,d-b);return A!==null&&B!==null?(A-B)/(.24):A!==null?(A-y)/.12:B!==null?(y-B)/.12:0;},nx=-grad(.12,0),nz=-grad(0,.12),length=Math.hypot(nx,1,nz),ny=1/length,s=Math.sqrt(2*(1+ny)),q=[nz/length/s,0,-nx/length/s,s/2],pad={u,d,y:y+.015,q};for(const offset of arm.patch){const r=rotateQ(q,offset),h=surface(u+r[0],d+r[2]);if(h!==null)pad.y=Math.max(pad.y,h+.012-r[1]);}const joint=wristPoint(pad,arm);
   const initialDistance=Math.hypot(joint.u-s0[0],joint.d-p0.d-s0[2],joint.y-p0.y-s0[1]);
   if(d<=.4&&initialDistance<arm.reach-(arm.reserve??.018)){const score=(u-s0[0])**2+d*d*.18+Math.abs(y-l.y)*.5+initialDistance**2*.06;first.push({...pad,score});}
   if(d>=(arm.side===1?.05:.20)){
    let score=(u-s0[0])**2+Math.abs(d-(arm.side===1?.20:.35))*.08+Math.abs(y-l.y)*.2;
    for(const t of[end,.74,.835]){const p=nominalClimb(l,t),s=rot(arm.shoulder,p.pitch,p.yaw),dist=Math.hypot(joint.u-s[0],joint.d-p.d-s[2],joint.y-p.y-s[1]);score+=Math.max(0,dist-(arm.reach-(arm.reserve??.018)))**2*15;}
    last.push({...pad,score});
   }
  }
  first.sort((a,b)=>a.score-b.score);last.sort((a,b)=>a.score-b.score);return{first:first.slice(0,4),last:last.slice(0,5),arm,begin,end};
 };
 const choices=profile.hands.map(h=>candidates(h,h.side===1?.58:.71,h.side===1?.73:.82));
 if(choices.some(c=>!c.first.length||!c.last.length))return{ok:false,reason:'no-reachable-hand-patch',choices:choices.map(c=>({side:c.arm.side,first:c.first.length,last:c.last.length})),ms:performance.now()-started};
 function makeHand(c,k){const from=c.first[Math.min(k,c.first.length-1)],to=c.last[Math.min(k,c.last.length-1)];let lift=.07;
  for(let i=1;i<20;i++){const t=i/20,u=mix(from.u,to.u,t),d=mix(from.d,to.d,t),y=surface(u,d);if(y!==null)lift=Math.max(lift,(y+.018-mix(from.y,to.y,t))/Math.sin(t*Math.PI));}
  const end=nominalClimb(l,1),p=rot([c.arm.pad[0]-c.arm.side*.02,c.arm.pad[1],c.arm.pad[2]],end.pitch,end.yaw);return{side:c.arm.side,from,to,lift,begin:c.begin,end:c.end,release:c.arm.side===1?.82:.86,arch:c.arm.side===1?.20:.14,endQ:surfaceQ(surface,p[0],end.d+p[2])};
 }
 let failure;
 for(let variant=0;variant<5;variant++){
  const hands=choices.map(c=>makeHand(c,variant));if(hands.some(h=>h.lift>.28)){failure={reason:'hand-path-blocked',variant};continue;}
  let frames=[];const n=192;let failed=false,beam=[{frames:[],cost:0}];
  for(let i=0;i<=n;i++){
   const t=i/n,desired=nominalClimb(l,t),pads=hands.map(h=>handAt(h,t));let diagnostic;const options=[];for(const state of beam){const prev=state.frames.at(-1);let best=null;
   const advances=i===0||i===n?[desired.d]:[desired.d,desired.d-.10,desired.d+.10,desired.d-.20,desired.d+.20,prev.d-.035,prev.d-.015,prev.d,prev.d+.015,prev.d+.035,prev.d+.05,prev.d+(.8-prev.d)/(n-i+1)];
   const angles=i===0||i===n?[desired.pitch]:[desired.pitch,desired.pitch-.12,desired.pitch+.12,desired.pitch-.24,desired.pitch+.24,prev.pitch-.03,prev.pitch,prev.pitch+.03,prev.pitch+((l.endPitch||0)-prev.pitch)/(n-i+1)];
   for(const d of advances)for(const pitch of angles){
    if(prev&&(Math.abs(d-prev.d)>.055||Math.abs(pitch-prev.pitch)>.075)||Math.abs(pitch-(l.endPitch||0))>(n-i)*.075+1e-6)continue;
    const[x,z]=world(0,d);let lo=ground(x,z),hi=Infinity,blocked=false;

    for(let k=0;k<profile.hands.length;k++){if(t>hands[k].release)continue;
     const arm=profile.hands[k],s=rot(arm.shoulder,pitch,desired.yaw),p=wristPoint(pads[k],arm),horizontal=(p.u-s[0])**2+(p.d-d-s[2])**2,r=arm.reach-(arm.reserve??.018);
     if(horizontal>=r*r){blocked=true;break;}const vertical=Math.sqrt(r*r-horizontal);hi=Math.min(hi,p.y+vertical-s[1]);lo=Math.max(lo,p.y-vertical-s[1]);
    }
    if(blocked||lo>hi){diagnostic={t,d,pitch,lo,hi,blocked};continue;}
    let y=null;const wanted=clamp(desired.y,lo,hi);for(const q of i===0||i===n?[wanted]:[wanted,prev.y+.015,prev.y-.015,lo+.005,hi-.005,prev.y+(l.stand.y-prev.y)/(n-i+1)]){if(q<lo||q>hi||prev&&Math.hypot(d-prev.d,q-prev.y)>.055||Math.hypot(.8-d,l.stand.y-q)>(n-i)*.055+1e-6)continue;let reachable=true;for(let k=0;k<hands.length;k++)if(t>hands[k].release){const arm=profile.hands[k],p=wristPoint(settleHandAt(hands[k],arm,t,{d,y:q,pitch,yaw:desired.yaw},surface),arm),s=rot(arm.shoulder,pitch,desired.yaw);if(Math.hypot(p.u-s[0],p.d-d-s[2],p.y-q-s[1])>arm.reach-(arm.reserve??.018)){diagnostic={reason:'settle-reach',side:arm.side,t,root:{d,y:q,pitch,yaw:desired.yaw},pad:settleHandAt(hands[k],arm,t,{d,y:q,pitch,yaw:desired.yaw},surface),wrist:p,shoulder:s,reach:Math.hypot(p.u-s[0],p.d-d-s[2],p.y-q-s[1]),limit:arm.reach-(arm.reserve??.018)};reachable=false;break;}}if(!reachable)continue;let collision=false;for(const point of profile.body){const p=rot(point,pitch,desired.yaw),[x,z]=world(p[0],d+p[2]);if(solid(x,q+p[1]-.005,z)){diagnostic={t,d,pitch,y:q,bodyPoint:point,worldPoint:[x,q+p[1],z]};collision=true;break;}}if(!collision){y=q;break;}}if(y===null)continue;
    if(i===0&&Math.abs(y-l.start.y)>.002||i===n&&Math.abs(y-l.stand.y)>.025)continue;
    if(prev&&Math.hypot(d-prev.d,y-prev.y)>.055)continue;
    const cost=(d-desired.d)**2*4+(pitch-desired.pitch)**2+(y-desired.y)**2*2+(prev?(d-prev.d)**2+(y-prev.y)**2:0);
    const candidate={d,y,pitch,yaw:desired.yaw,cost};options.push({frames:[...state.frames,candidate],cost:state.cost*.95+cost});if(!best||cost<best.cost)best=candidate;
   }
   }if(!options.length){failure={reason:'no-body-and-hands-fit',variant,frame:i,desired,previous:beam[0]?.frames.at(-1),diagnostic};failed=true;break;}options.sort((a,b)=>a.cost-b.cost);const cells=new Set();beam=[];for(const option of options){const p=option.frames.at(-1),key=[p.d,p.y,p.pitch].map(x=>Math.round(x/.035)).join(':');if(cells.has(key))continue;cells.add(key);beam.push(option);if(beam.length===6)break;}frames=beam[0].frames;
  }
  if(!failed)return{ok:true,frames,hands,ms:performance.now()-started,queries:stats.queries,variant};
 }
 return{ok:false,...failure,ms:performance.now()-started,queries:stats.queries};
}

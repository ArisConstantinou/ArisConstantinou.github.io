const clamp=x=>Math.max(0,Math.min(1,x));
const pulse=(t,a,b)=>t<=a||t>=b?0:Math.sin(Math.PI*(t-a)/(b-a))**2;
export function slipEffort(t){return pulse(t,.12,.40)+.82*pulse(t,.48,.80);}
const rotate=(p,pitch,yaw)=>{const c=Math.cos(pitch),s=Math.sin(pitch),cy=Math.cos(yaw),sy=Math.sin(yaw),u=p[0]*cy+p[2]*sy,d=p[2]*cy-p[0]*sy;return[u,p[1]*c-d*s+.18*(1-c),p[1]*s+d*c-.18*s];};
function rotateQ(q,p){const[x,y,z]=p,[a,b,c,w]=q,tx=2*(b*z-c*y),ty=2*(c*x-a*z),tz=2*(a*y-b*x);return[x+w*tx+b*tz-c*ty,y+w*ty+c*tx-a*tz,z+w*tz+a*ty-b*tx];}
function palm(arm,source,top){const{u,d}=source,y=top(u,d);if(y===null)return null;const gradient=(a,b)=>{const A=top(u+a,d+b),B=top(u-a,d-b);return A!==null&&B!==null?(A-B)/.24:A!==null?(A-y)/.12:B!==null?(y-B)/.12:0;},nx=-gradient(.12,0),nz=-gradient(0,.12),n=Math.hypot(nx,1,nz),s=Math.sqrt(2*(1+1/n)),q=[nz/n/s,0,-nx/n/s,s/2],p={u,d,y:y+.015,q};for(const offset of arm.patch){const r=rotateQ(q,offset),h=top(u+r[0],d+r[2]);if(h!==null)p.y=Math.max(p.y,h+.012-r[1]);}return p;}
// Only a physically valid first grip may become a failed haul. The palms stay
// attached while the torso and hind legs make exactly two efforts. A rejected
// first grip remains an ordinary fall; this never extends a joint or jump.
export function failedClimbPlan(l,profile,templates,{top:worldTop,ground,solid},reason='next-grip-unreachable'){
 const started=performance.now(),outside=-Math.hypot(l.start.x-l.x,l.start.z-l.z),top=(u,d)=>worldTop(l.x+l.nz*u+l.nx*d,l.z-l.nx*u+l.nz*d);let bodyQueries=0;
 const ranked=templates.map(({fixture:b})=>({b,score:Math.abs(l.start.y-l.y-b.start.y+b.y)*2+Math.abs(outside-b.plan.frames[0].d)+(b.kind===l.kind?0:.3)})).sort((a,b)=>a.score-b.score);
 for(const{b}of ranked){if(Math.abs(outside-b.plan.frames[0].d)>.35||Math.abs(l.start.y-l.y-b.start.y+b.y)>.45)continue;
  const hands=[];for(const source of b.plan.hands){const arm=profile.hands.find(h=>h.side===source.side),from=palm(arm,source.from,top);if(!from)break;hands.push({...source,from,to:from,lift:0,begin:2,end:3,release:2,arch:0,endQ:from.q});}if(hands.length!==profile.hands.length)continue;
  function fit(f){const x=l.x+l.nx*f.d,z=l.z+l.nz*f.d;if(f.y<ground(x,z)-.002)return false;for(const hand of hands){const arm=profile.hands.find(h=>h.side===hand.side),off=rotateQ(hand.from.q,arm.offset),s=rotate(arm.shoulder,f.pitch,f.yaw),p=hand.from;if(Math.hypot(p.u-off[0]-s[0],p.d-off[2]-f.d-s[2],p.y-off[1]-f.y-s[1])>arm.reach-(arm.reserve??.018)+1e-7)return false;}
   const c=Math.cos(f.pitch),s=Math.sin(f.pitch),cy=Math.cos(f.yaw),sy=Math.sin(f.yaw),py=.18*(1-c),pz=-.18*s;for(const p of profile.body){const u=p[0]*cy+p[2]*sy,d=p[2]*cy-p[0]*sy,y=p[1]*c-d*s+py,dz=p[1]*s+d*c+pz;bodyQueries++;if(solid(l.x+l.nz*u+l.nx*(f.d+dz),f.y+y-.005,l.z-l.nx*u+l.nz*(f.d+dz)))return false;}return true;
  }
  for(const offset of[0,.12,.24,.36,.48,-.12]){const start={d:outside,y:l.start.y,pitch:b.plan.frames[0].pitch+offset,yaw:b.plan.frames[0].yaw};if(!fit(start))continue;
   for(const amplitude of[1,.7,.45]){const frame=t=>{const e=slipEffort(t)*amplitude;return{d:start.d+.025*e,y:start.y+.10*e,pitch:start.pitch-.10*e,yaw:start.yaw};};if(!fit(frame(.26))||!fit(frame(.64)))continue;const frames=[];let valid=true;for(let i=0;i<=192;i++){const f=frame(i/192);if(!fit(f)){valid=false;break;}frames.push(f);}if(valid)return{ok:true,outcome:'slip',attempts:2,duration:3,frames,hands,variant:'safe-first-grip-two-efforts',failureReason:reason,endPitch:0,ms:performance.now()-started,bodyQueries};}
  }
 }
 return{ok:false,reason:'no-safe-initial-grip',ms:performance.now()-started,bodyQueries};
}

/* One shared posed skeleton for collision, gum attachments and visible reactions.
 * Enemy awareness is local: hearing gives a last-known position, never sight. */
import {TAU,clamp,add,sub,mul,len,norm,dot,dist,angleDelta,trs,point,node,segment,mm,raySphere} from './engine.js';
import {makeActor} from './actors.js';
import {GUM,moveBody} from './material4.js';
export const REGIONS=['head','chest','armL','armR','legL','legR'];
export const GROUPS=[
 {name:'Δυτική οικία',points:[[-25,0,10],[-22,0,12]]},
 {name:'Ανατολική οικία',points:[[22,0,15],[25,0,14],[26,0,17]]},
 {name:'Φρουραρχείο',points:[[-8,0,-20],[-4,0,-23],[-7,0,-26],[6,0,-20],[8,0,-24],[4,0,-26]]},
 {name:'Αποθήκη',points:[[-25,0,-8],[-23,0,-12],[-22,0,-9]]},
 {name:'Άνω φρουρά',points:[[3,5,-20],[7,5,-22]]},
 {name:'Υπόγειες στοές',points:[[12,-5,-16],[14,-5,-24],[20,-5,-17],[24,-5,-15],[29,-5,-24],[30,-5,-18]]}
];
const COLORS=[0x68ccdf,0xf2a17e,0xded393,0x7fa6d1,0xcf91d6,0x81bea6];
export function makeKnights(world,tier=1){let id=0;return GROUPS.flatMap((g,group)=>g.points.map((p,i)=>{const a=makeActor(id++,p,COLORS[group],g.name+' '+(i+1));a.height=2.12;a.group=group;a.maxHp=a.hp=100+(tier-1)*15;a.coat=Object.fromEntries(REGIONS.map(k=>[k,0]));a.vel=[0,0,0];a.balance=100;a.down=0;a.knock=0;a.anchors={};a.captured=false;a.yaw=(group%2?1:-1)*Math.PI/2;a.brain={mode:'patrol',suspicion:0,lastKnown:null,search:0,route:0,wait:1+i*.7};const offsets=[[0,0,0],[1.3,0,.8],[-1.4,0,1.3],[.8,0,-1.4]];a.route=offsets.map(o=>world.nearest(add(p,o))?.p||p).filter(q=>Math.abs(q[1]-p[1])<.3&&dist(q,p)<5).map(q=>q.slice());if(!a.route.length)a.route=[p.slice()];a.lastSafe=p.slice();return a;}));}
export function coating(a){return REGIONS.reduce((s,k)=>s+(a.coat?.[k]||0),0)/6;}
export function pose(a,t){const c=a.coat||{},down=a.down>0?Math.min(1,a.down/.4):0,root=trs(add(a.p,[0,down*.18,0]),[1,1,1],[-down*1.35,a.yaw,Math.sin(t*6+a.id)*(a.hanging?.07:Object.keys(a.anchors||{}).length?.05:0)+(a.knock||0)*.10]);const to=p=>point(root,p).slice(0,3);let phase=Math.sin(a.walk||0)*(a.moving||0),pts={head:to([0,1.88,0]),chest:to([0,1.23,0]),hips:to([0,.87,0])};
 for(const [side,label]of[[-1,'L'],[1,'R']]){const bound=(c['arm'+label]||0)>.68,legBound=(c['leg'+label]||0)>.72,blind=(c.head||0)>.72;let shoulder=[side*.51,1.48,0],elbow=bound?[side*.37,1.18,.22]:[side*.56,1.17,.20],hand=bound?[side*.19,1.19,.34]:[side*.39,1.23,.61];
  if(bound){hand[0]+=Math.sin(t*9+a.id)*.014;elbow[2]+=Math.sin(t*7+a.id)*.02;}if(blind&&!bound&&side<0){elbow=[-.65,1.60,.13];hand=[-.13,1.92,.34];}
  if(a.gripping){elbow=[side*.53,1.75,.28];hand=[side*.43,2.05,.50];}
  if(a.pathOn&&side<0){elbow=[-.55,1.05,.20];hand=[-.55,.83,.52];}
  pts['shoulder'+label]=to(shoulder);pts['elbow'+label]=to(elbow);pts['hand'+label]=to(hand);pts['hip'+label]=to([side*.225,.83,0]);pts['knee'+label]=to([side*.225,.49,legBound?.10:phase*side*.18]);pts['foot'+label]=to([side*.225,.14,legBound?.08:-phase*side*.25]);
  if(legBound&&a.anchors['leg'+label]&&!a.hanging&&down===0)pts['foot'+label]=add(a.anchors['leg'+label],[0,.12,0]);
 }
 pts.root=root;return pts;
}
function capsuleSpheres(a,b,r){const steps=Math.max(1,Math.ceil(dist(a,b)/(r*1.1)));return Array.from({length:steps+1},(_,i)=>({p:add(a,mul(sub(b,a),i/steps)),r}));}
export function hitShapes(a,t){const p=pose(a,t),shapes=[{region:'head',p:p.head,r:.335},...capsuleSpheres(point(p.root,[0,1.03,0]).slice(0,3),point(p.root,[0,1.42,0]).slice(0,3),.32).map(s=>({...s,region:'chest'}))];for(const l of['L','R']){shapes.push(...capsuleSpheres(p['shoulder'+l],p['elbow'+l],.19).map(s=>({...s,region:'arm'+l})),...capsuleSpheres(p['elbow'+l],p['hand'+l],.17).map(s=>({...s,region:'arm'+l})),...capsuleSpheres(p['hip'+l],p['knee'+l],.175).map(s=>({...s,region:'leg'+l})),...capsuleSpheres(p['knee'+l],p['foot'+l],.16).map(s=>({...s,region:'leg'+l})));}return shapes;}
export function hitActor(a,o,d,max,t,radius=0){let best=null;for(const s of hitShapes(a,t)){const h=raySphere(o,d,s.p,s.r+radius,max);if(h&&(!best||h.t<best.t)){best={...h,actor:a,region:s.region};max=h.t;}}return best;}
export function actorRay(actors,o,d,max,t,radius=0){let best=null;for(const a of actors){if(dist(o,a.p)>max+3)continue;let h=hitActor(a,o,d,max,t,radius);if(h&&(!best||h.t<best.t)){best=h;max=h.t;}}return best;}
export function regionPoint(a,zone,origin,world,t){const p=pose(a,t),candidates=zone==='head'?[{p:p.head,region:'head'}]:zone==='arms'?['L','R'].map(k=>({p:p['hand'+k],region:'arm'+k})):zone==='legs'?['L','R'].map(k=>({p:p['knee'+k],region:'leg'+k})):[{p:p.chest,region:'chest'}];return candidates.filter(c=>{const d=sub(c.p,origin);return !world.ray(origin,norm(d),Math.max(0,len(d)-.21));}).sort((a1,b)=>(a.coat[a1.region]||0)-(a.coat[b.region]||0)||dist(a1.p,origin)-dist(b.p,origin))[0]||null;}
export function hitRegion(a,region,source,impact,strength=1,world=null){if(!a.coat)return;const amount=.27*strength;a.coat[region]=clamp(a.coat[region]+amount,0,1.3);a.hp=Math.max(0,a.hp-5*strength);a.stamina=Math.max(0,a.stamina-11*strength);a.hitFlash=.16;a.hitTime=0;a.knock=Math.min(.7,strength*.18);a.lastRegion=region;
 const delta=sub(impact,a.p),c=Math.cos(a.yaw),s=Math.sin(a.yaw);a.splats.push({local:[delta[0]*c-delta[2]*s,delta[1],delta[0]*s+delta[2]*c],region});if(a.splats.length>24)a.splats.shift();
 const angle=Math.atan2(source[0]-a.p[0],source[2]-a.p[2])-a.yaw,sector=Math.floor((((angle+TAU/16)%TAU+TAU)%TAU)/(TAU/8));a.coverage[sector]=clamp(a.coverage[sector]+.16*strength,0,1);
 if(region==='chest'&&!a.captured){const d=norm([a.p[0]-source[0],0,a.p[2]-source[2]]);a.vel[0]+=d[0]*Math.min(8,1.7*strength);a.vel[2]+=d[2]*Math.min(8,1.7*strength);a.balance-=28*strength;if(a.balance<=0){a.down=2.5;a.balance=45;}}
 if(region.startsWith('leg')&&a.coat[region]>.72&&a.grounded&&world){const p=pose(a,0)['foot'+region.slice(-1)],floor=world.support(p[0],p[2],a.p[1],.25);if(floor&&Math.abs(floor.h-a.p[1])<.3)a.anchors[region]=[p[0],floor.h,p[2]];}
 if(!a.captured&&a.brain){if(a.brain.mode!=='combat')a.brain.mode='investigate';a.brain.lastKnown=source.slice();a.brain.search=5;a.brain.suspicion=Math.max(.55,a.brain.suspicion);}
}
export function coatedCapture(a){return coating(a)>.86&&a.coverage.filter(v=>v>.55).length>=6;}
export function isBlind(a){return a.coat.head>.72;}
export function canFire(a){return !a.captured&&!a.hanging&&!a.pin&&a.down<=0&&!isBlind(a)&&a.coat.armR<.72;}
export function seePlayer(a,p,world){if(a.captured||isBlind(a)||a.hanging||a.down>0)return false;const eye=add(a.p,[0,1.85,0]),target=add(p.p,[0,1.25,0]),d=sub(target,eye),distance=len(d);if(distance>13||Math.abs(d[1])>4.5)return false;const flat=norm([d[0],0,d[2]]);if(dot([Math.sin(a.yaw),0,Math.cos(a.yaw)],flat)<.47&&distance>1.6)return false;return !world.ray(eye,norm(d),distance-.45);}
export function hear(a,p,radius,world){if(a.captured||a.hanging||a.brain.mode==='combat')return;const d=dist(a.p,p),ob=world.ray(add(a.p,[0,1.6,0]),norm(sub(add(p,[0,1,0]),add(a.p,[0,1.6,0]))),Math.max(0,d-.5));if(d>radius*(ob?.4:1)||Math.abs(a.p[1]-p[1])>3)return;if(a.brain.mode!=='investigate'){a.brain.mode='investigate';a.brain.lastKnown=p.slice();a.brain.search=4.5;a.brain.suspicion=Math.max(.2,a.brain.suspicion);}}
export function updateKnight(a,player,world,dt,time,fire,{disabled=false}={}){a.hitFlash=Math.max(0,a.hitFlash-dt);a.knock=Math.max(0,a.knock-dt*2);a.hitTime=(a.hitTime||0)+dt;a.down=Math.max(0,a.down-dt);a.balance=Math.min(100,a.balance+dt*6);a.moving=0;
 if(a.captured||a.hanging||a.pin){if(a.pin){a.vel=[0,0,0];a.vy=0;}return;}
 const brain=a.brain,visible=!disabled&&seePlayer(a,player,world);a.sees=visible;
 if(!disabled){if(visible){brain.lastKnown=player.p.slice();brain.suspicion=Math.min(1,brain.suspicion+dt*(dist(a.p,player.p)<4?3.3:1.5));brain.search=4;if(brain.suspicion>=1)brain.mode='combat';else brain.mode='investigate';}else{brain.suspicion=Math.max(0,brain.suspicion-dt*.18);if(brain.mode==='combat'){brain.search-=dt;if(brain.search<=0){brain.mode='investigate';brain.search=3;}}}}
 let goal=null,speed=0;if(!disabled&&a.down<=0){if(brain.mode==='patrol'){brain.wait-=dt;if(brain.wait<=0){goal=a.route[brain.route%a.route.length];speed=1.05;if(dist(a.p,goal)<.45){brain.route++;brain.wait=1.4+(a.id%3)*.7;goal=null;}}}
 else if(brain.mode==='investigate'||brain.mode==='combat'){goal=brain.lastKnown;speed=brain.mode==='combat'?2.4:1.35;if(goal&&dist(a.home,goal)>14){brain.mode='return';goal=a.home;}else if(goal&&dist(a.p,goal)<(brain.mode==='combat'?5:.85)){goal=null;brain.search-=dt;if(brain.search<=0&&!visible)brain.mode='return';}}
 else if(brain.mode==='return'){goal=a.home;speed=1.4;if(dist(a.p,a.home)<.7){brain.mode='patrol';brain.lastKnown=null;brain.wait=2;brain.suspicion=0;}}}
 let dx=0,dz=0;if(goal){a.pathTimer-=dt;if(a.pathTimer<=0){a.path=world.path(a.p,goal);a.pathTimer=.8+(a.id%4)*.13;}const wp=a.path[0]||goal,d=sub(wp,a.p);d[1]=0;if(len(d)<.4)a.path.shift();else{const v=norm(d);a.yaw+=angleDelta(a.yaw,Math.atan2(v[0],v[2]))*Math.min(1,dt*3.5);const left=a.coat.legL,right=a.coat.legR,anchored=Object.keys(a.anchors).length>0;speed*=Math.max(.08,1-.60*Math.max(left,right)-.25*Math.min(left,right));if(anchored)speed=0;dx=v[0]*speed*dt;dz=v[2]*speed*dt;a.moving=speed/2.4;a.walk+=dt*speed*3.8;}}
 if(visible&&brain.mode==='combat')a.yaw+=angleDelta(a.yaw,Math.atan2(player.p[0]-a.p[0],player.p[2]-a.p[2]))*Math.min(1,dt*4);
 a.cooldown-=dt;if(visible&&brain.mode==='combat'&&canFire(a)&&a.cooldown<=0){fire(a,player);a.cooldown=1.9+(a.id%4)*.32;}
 if(a.hitTime>6&&!a.captured){for(const k of REGIONS)a.coat[k]=Math.max(0,a.coat[k]-dt*(k.startsWith('arm')?.018:.010));if(a.coat.legL<.65)delete a.anchors.legL;if(a.coat.legR<.65)delete a.anchors.legR;}
 a._move=[dx,dz];
}
export function renderKnight(a,t,out,isPlayer=false){const p=pose(a,t),c=a.coat||{},steel=isPlayer?0xe3e1ed:0xa9b5c6,dark=0x2b3346,gold=isPlayer?0x7ef4d2:0xd2b982;
 out.push(node('sphere',add(a.p,[0,.018,0]),[.60,.012,.47],[.04,.05,.08,.23]));
 const emit=(kind,pos,scale,color,rot=[0,0,0],props=[.33,0,0,0])=>{const n=node(kind,pos,scale,color,rot,props);n.m=mm(p.root,n.m);out.push(n);};
 emit('sphere',[0,1.23,0],[.41,.42,.27],a.hitFlash>0?0xffffff:steel);emit('stone',[0,1.27,.22],[.64,.58,.12],steel);emit('cube',[0,1.33,.295],[.10,.33,.04],gold);emit('cube',[0,1.35,.298],[.29,.10,.04],gold);emit('cylinder',[0,.87,0],[.33,.16,.25],dark);
 emit('sphere',[0,1.88,0],[.32,.34,.29],isPlayer?GUM:steel);emit('cube',[0,1.92,.28],[.48,.09,.07],dark);emit('stone',[0,1.72,.16],[.36,.16,.23],dark);emit('sphere',[0,2.15,-.10],[.08,.16,.24],a.color);if(isPlayer)emit('cube',[0,1.92,.322],[.34,.025,.01],0xb4ffea,[0,0,0],[.1,.7,0,0]);
 for(const l of['L','R']){out.push(segment('cylinder',p['shoulder'+l],p['elbow'+l],.13,dark),segment('cylinder',p['elbow'+l],p['hand'+l],.14,steel));for(const k of['shoulder','elbow','hand'])out.push(node('sphere',p[k+l],k==='shoulder'?[.23,.20,.25]:[.145,.14,.14],k==='hand'?dark:steel));out.push(segment('cylinder',p['hip'+l],p['knee'+l],.15,dark),segment('cylinder',p['knee'+l],p['foot'+l],.14,steel),node('sphere',p['knee'+l],[.19,.18,.17],steel),node('stone',p['foot'+l],[.33,.23,.43],dark,[0,a.yaw,0]));
  if(isPlayer){out.push(node('sphere',p['hand'+l],[.152,.145,.15],a.gripping?0xf4c86a:0x7ef4d2),node('cube',add(p['foot'+l],[0,-.12,0]),[.34,.06,.43],0x7ef4d2,[0,a.yaw,0]));}
  const arm=c['arm'+l]||0,leg=c['leg'+l]||0;if(arm>.04){out.push(segment('cylinder',p['elbow'+l],p['hand'+l],.14+.11*arm,GUM,[.12,.025,0,0]));if(arm>.65)out.push(segment('cylinder',p['hand'+l],add(p.chest,[0,-.03,.10]),.12,GUM,[.12,.02,0,0]));}
  if(leg>.04){out.push(segment('cylinder',p['knee'+l],p['foot'+l],.13+.11*leg,GUM,[.12,.02,0,0]));if(a.anchors?.['leg'+l])out.push(node('sphere',add(p['foot'+l],[0,-.09,0]),[.42,.15,.40],GUM));}
 }
 if((c.head||0)>.02)emit('sphere',[0,1.92,.29],[.27+.07*c.head,.06+.17*c.head,.045+.10*c.head],GUM,[0,0,0],[.12,.025,0,0]);
 if((c.chest||0)>.02)emit('sphere',[0,1.25,.27],[.28+.14*c.chest,.27+.18*c.chest,.06+.13*c.chest],GUM,[0,0,0],[.12,.025,0,0]);
 for(let i=0;i<8;i++){const coverage=a.coverage?.[i]||0;if(coverage>.05)emit('shell'+i,[0,1.1,0],[.60,1.05,.49],[.714,.416,1,Math.min(.95,coverage*.85)],[0,0,0],[.13,.01,0,0]);}
 if(!a.captured&&!a.pin){const hand=p.handR,tip=add(hand,[Math.sin(a.yaw)*.57,0,Math.cos(a.yaw)*.57]);out.push(segment('cylinder',hand,tip,.075,gold),node('stone',hand,[.25,.23,.38],dark,[0,a.yaw,0]),node('sphere',tip,[.10,.1,.1],a.color));}
 if(a.pin){out.push(node('sphere',add(a.p,[0,1.1,0]),[.75,1.14,.55],GUM,[0,a.yaw,0]));}
}

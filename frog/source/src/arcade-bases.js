// Shared arena geometry. The simulation, radar and Three.js scene use these
// exact footprints, so a visible gate is also the only physical way inside.
const freezePoint = (x, z) => Object.freeze({x, z});
const OWNER_IDS = ['player', 'rival-1', 'rival-2'];
const ACTOR_RADIUS = .78;
const NAV_RADIUS = .84;
const EPSILON = 1e-5;

export const CATAPULT_SITES=Object.freeze([
  {id:'catapult-player',owner:OWNER_IDS[0],x:0,z:12},
  {id:'catapult-rival-1',owner:OWNER_IDS[1],x:-14,z:-16},
  {id:'catapult-rival-2',owner:OWNER_IDS[2],x:14,z:-16},
].map(Object.freeze));

export const BASES = Object.freeze([
  {id:'base-player', owner:OWNER_IDS[0], x:0, z:20.5, spawn:freezePoint(-1,20.4), stock:freezePoint(0,21.4), gate:freezePoint(0,17.9), approach:freezePoint(0,16.25), side:'north', halfWidth:3.1, halfDepth:2.6},
  {id:'base-rival-1', owner:OWNER_IDS[1], x:-18, z:1, spawn:freezePoint(-18.1,0), stock:freezePoint(-19.1,1), gate:freezePoint(-14.9,1), approach:freezePoint(-13.25,1), side:'east', halfWidth:3.1, halfDepth:2.9},
  {id:'base-rival-2', owner:OWNER_IDS[2], x:18, z:1, spawn:freezePoint(18.1,2), stock:freezePoint(19.1,1), gate:freezePoint(14.9,1), approach:freezePoint(13.25,1), side:'west', halfWidth:3.1, halfDepth:2.9},
].map(Object.freeze));

// The operator and automatic dismount stay inside a clear south-facing gate.
export const CATAPULT_ENCLOSURES = Object.freeze([
  {id:'yard-player',owner:OWNER_IDS[0],x:0,z:12,halfWidth:3,halfDepth:2.65,side:'south',gate:freezePoint(0,14.65),approach:freezePoint(0,16.25)},
  {id:'yard-rival-1',owner:OWNER_IDS[1],x:-13.5,z:-15.6,halfWidth:2.45,halfDepth:2.75,side:'south',gate:freezePoint(-13.5,-12.85),approach:freezePoint(-13.5,-11.2)},
  {id:'yard-rival-2',owner:OWNER_IDS[2],x:13.5,z:-15.6,halfWidth:2.45,halfDepth:2.75,side:'south',gate:freezePoint(13.5,-12.85),approach:freezePoint(13.5,-11.2)},
].map(Object.freeze));

export const ENCLOSURES = Object.freeze([
  ...BASES.map(base=>Object.freeze({...base,kind:'shelter',height:2.3})),
  ...CATAPULT_ENCLOSURES.map(yard=>Object.freeze({...yard,kind:'catapult',height:1.65})),
]);

const GAP = 3.2, THICKNESS = .34;
function enclosureWalls(c) {
  const walls=[];
  const put=(side,x,z,hw,hd,part='whole')=>walls.push(Object.freeze({id:`${c.id}-${side}-${part}`,enclosureId:c.id,owner:c.owner,x,z,hw,hd,height:c.height}));
  for(const side of ['north','south']){
    const z=c.z+(side==='north'?-c.halfDepth:c.halfDepth);
    if(c.side===side){const half=(c.halfWidth-GAP/2)/2;for(const sign of [-1,1])put(side,c.x+sign*(GAP/2+half),z,half,THICKNESS/2,String(sign));}
    else put(side,c.x,z,c.halfWidth+THICKNESS/2,THICKNESS/2);
  }
  for(const side of ['west','east']){
    const x=c.x+(side==='west'?-c.halfWidth:c.halfWidth);
    if(c.side===side){const half=(c.halfDepth-GAP/2)/2;for(const sign of [-1,1])put(side,x,c.z+sign*(GAP/2+half),THICKNESS/2,half,String(sign));}
    else put(side,x,c.z,THICKNESS/2,c.halfDepth+THICKNESS/2);
  }
  return walls;
}
export const WALLS=Object.freeze(ENCLOSURES.flatMap(enclosureWalls));
export const TREES=Object.freeze([
  {id:'grove-west',x:-7,z:9,radius:3.1},
  {id:'grove-east',x:8,z:6.4,radius:3.1},
  {id:'grove-middle',x:0,z:-4.5,radius:3.4},
  {id:'grove-northwest',x:-7.2,z:-8.8,radius:2.5},
  {id:'grove-northeast',x:7.6,z:-9.2,radius:2.5},
].map(Object.freeze));

// Avoid a model import cycle: these match the existing rocks and fixed machines.
const NAV_CIRCLES=Object.freeze([
  {x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6},
  {x:0,z:12,r:.95,machine:true},{x:-14,z:-16,r:.95,machine:true},{x:14,z:-16,r:.95,machine:true},
]);

function bounds(w,padding=0){return {minX:w.x-w.hw-padding,maxX:w.x+w.hw+padding,minZ:w.z-w.hd-padding,maxZ:w.z+w.hd+padding};}
function within(x,z,b,epsilon=0){return x>b.minX+epsilon&&x<b.maxX-epsilon&&z>b.minZ+epsilon&&z<b.maxZ-epsilon;}
function segmentBox(x,z,nx,nz,w,padding=0){
  const b=bounds(w,padding),dx=nx-x,dz=nz-z;
  let entry=-Infinity,exit=Infinity,normalX=0,normalZ=0;
  for(const [start,delta,low,high,axis] of [[x,dx,b.minX,b.maxX,'x'],[z,dz,b.minZ,b.maxZ,'z']]){
    if(Math.abs(delta)<1e-12){if(start<low-EPSILON||start>high+EPSILON)return null;continue;}
    const first=(low-start)/delta,last=(high-start)/delta,near=Math.min(first,last),far=Math.max(first,last);
    if(near>entry){entry=near;normalX=axis==='x'?(delta>0?-1:1):0;normalZ=axis==='z'?(delta>0?-1:1):0;}
    exit=Math.min(exit,far);if(entry>exit+EPSILON)return null;
  }
  if(exit<0||entry>1)return null;
  if(entry<0&&!within(x,z,b,-EPSILON))return null;
  return {t:Math.max(0,entry),nx:normalX,nz:normalZ};
}

/** First wall collision along a projectile / line-of-sight segment. */
export function wallContact(x,z,nx,nz,padding=0){
  let closest=Infinity;
  for(const wall of WALLS){const contact=segmentBox(x,z,nx,nz,wall,padding);if(contact&&contact.t<closest)closest=contact.t;}
  return Number.isFinite(closest)?closest:null;
}
export function hasWallSight(a,b,padding=.1){return wallContact(a.x,a.z,b.x,b.z,padding)===null;}

/** Swept movement prevents tunnelling, and slides along the contacted wall. */
export function resolveWallMove(actor,dx,dz,radius=ACTOR_RADIUS){
  let x=actor.x,z=actor.z,rx=Number.isFinite(dx)?dx:0,rz=Number.isFinite(dz)?dz:0;
  // Saves made before fences existed can load inside a newly added fence.
  for(let pass=0;pass<4;pass++){
    let corrected=false;
    for(const wall of WALLS){const b=bounds(wall,radius);if(!within(x,z,b,EPSILON))continue;
      const options=[{distance:x-b.minX,x:b.minX-EPSILON,z},{distance:b.maxX-x,x:b.maxX+EPSILON,z},{distance:z-b.minZ,x,z:b.minZ-EPSILON},{distance:b.maxZ-z,x,z:b.maxZ+EPSILON}];
      options.sort((a,b)=>a.distance-b.distance);x=options[0].x;z=options[0].z;corrected=true;
    }
    if(!corrected)break;
  }
  for(let iteration=0;iteration<4&&(Math.abs(rx)>EPSILON||Math.abs(rz)>EPSILON);iteration++){
    let nearest=null;
    for(const wall of WALLS){const contact=segmentBox(x,z,x+rx,z+rz,wall,radius);if(contact&&(!nearest||contact.t<nearest.t))nearest=contact;}
    if(!nearest){x+=rx;z+=rz;break;}
    const fraction=Math.max(0,nearest.t-EPSILON);
    x+=rx*fraction;z+=rz*fraction;
    const remaining=1-nearest.t;rx*=remaining;rz*=remaining;
    const into=rx*nearest.nx+rz*nearest.nz;
    if(into<0){rx-=nearest.nx*into;rz-=nearest.nz*into;}
    else break;
  }
  return {x,z};
}

export function coverAt(actor){return TREES.find(tree=>Math.hypot(actor.x-tree.x,actor.z-tree.z)<=tree.radius)||null;}
export function terrainSpeed(actor){return coverAt(actor) ? .55 : 1;}
export function enclosingYard(actor){return ENCLOSURES.find(c=>Math.abs(actor.x-c.x)<c.halfWidth&&Math.abs(actor.z-c.z)<c.halfDepth)||null;}

function segmentCircle(a,b,c,r){
  const dx=b.x-a.x,dz=b.z-a.z,length=dx*dx+dz*dz;
  const t=length?Math.max(0,Math.min(1,((c.x-a.x)*dx+(c.z-a.z)*dz)/length)):0;
  return Math.hypot(a.x+t*dx-c.x,a.z+t*dz-c.z)<r-EPSILON;
}
function navigationSight(a,b){
  return hasWallSight(a,b,NAV_RADIUS)&&NAV_CIRCLES.every(c=>!segmentCircle(a,b,c,c.r+NAV_RADIUS));
}
function freePoint(p){
  return Math.hypot(p.x,p.z)<=23.85&&WALLS.every(w=>!within(p.x,p.z,bounds(w,NAV_RADIUS),-EPSILON))&&NAV_CIRCLES.every(c=>Math.hypot(p.x-c.x,p.z-c.z)>c.r+NAV_RADIUS+EPSILON);
}

let graph=null;
const routes=new WeakMap();
function makeGraph(){
  if(graph)return graph;
  const nodes=[];
  const add=(x,z)=>{const p={x,z};if(freePoint(p)&&!nodes.some(n=>Math.hypot(n.x-x,n.z-z)<.1))nodes.push(p);};
  for(const wall of WALLS){const b=bounds(wall,NAV_RADIUS+.06);for(const x of [b.minX,b.maxX])for(const z of [b.minZ,b.maxZ])add(x,z);}
  for(const circle of NAV_CIRCLES){for(let i=0;i<12;i++){const angle=i*Math.PI/6,r=(circle.r+NAV_RADIUS+.08)/Math.cos(Math.PI/12);add(circle.x+Math.cos(angle)*r,circle.z+Math.sin(angle)*r);}}
  for(const c of ENCLOSURES){add(c.gate.x,c.gate.z);add(c.approach.x,c.approach.z);add(c.gate.x+(c.x-c.gate.x)*.4,c.gate.z+(c.z-c.gate.z)*.4);}
  const edges=nodes.map(()=>[]);
  for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++)if(navigationSight(nodes[i],nodes[j])){const cost=Math.hypot(nodes[i].x-nodes[j].x,nodes[i].z-nodes[j].z);edges[i].push([j,cost]);edges[j].push([i,cost]);}
  graph={nodes,edges};return graph;
}

function goalPoint(actor,goal){
  let point={x:goal.x,z:goal.z};
  const machine=NAV_CIRCLES.find(c=>c.machine&&Math.hypot(point.x-c.x,point.z-c.z)<c.r+NAV_RADIUS);
  if(machine)point={x:machine.x,z:machine.z+2.05};
  return resolveWallMove(point,0,0,NAV_RADIUS+.02);
}
function findRoute(actor,goal){
  const {nodes,edges}=makeGraph(),count=nodes.length,dist=new Float64Array(count),previous=new Int32Array(count),used=new Uint8Array(count);
  dist.fill(Infinity);previous.fill(-1);
  const goalEdges=new Map();
  for(let i=0;i<count;i++){
    if(navigationSight(actor,nodes[i]))dist[i]=Math.hypot(actor.x-nodes[i].x,actor.z-nodes[i].z);
    if(navigationSight(nodes[i],goal))goalEdges.set(i,Math.hypot(goal.x-nodes[i].x,goal.z-nodes[i].z));
  }
  let best=-1,bestCost=Infinity;
  for(let pass=0;pass<count;pass++){
    let current=-1,score=Infinity;
    for(let i=0;i<count;i++)if(!used[i]&&dist[i]<score){score=dist[i];current=i;}
    if(current<0||score>=bestCost)break;used[current]=1;
    if(goalEdges.has(current)&&score+goalEdges.get(current)<bestCost){best=current;bestCost=score+goalEdges.get(current);}
    for(const [next,cost] of edges[current])if(score+cost<dist[next]){dist[next]=score+cost;previous[next]=current;}
  }
  if(best<0)return [];
  const path=[goal];for(let i=best;i>=0;i=previous[i])path.unshift(nodes[i]);return path;
}

/** Direction to a target through real gates, with a cached static visibility graph. */
export function navigateTo(actor,target){
  if(!Number.isFinite(target?.x)||!Number.isFinite(target?.z))return {x:0,z:0};
  // A shove can leave the actor touching the physical wall. Step clear of the
  // small navigation margin before searching; otherwise every ray starts blocked.
  const clearance=resolveWallMove(actor,0,0,NAV_RADIUS+.02),correction=Math.hypot(clearance.x-actor.x,clearance.z-actor.z);
  if(correction>.005){routes.delete(actor);return {x:(clearance.x-actor.x)/correction,z:(clearance.z-actor.z)/correction};}
  for(const circle of NAV_CIRCLES){
    const dx=actor.x-circle.x,dz=actor.z-circle.z,d=Math.hypot(dx,dz);
    if(d<circle.r+NAV_RADIUS+.01){routes.delete(actor);return d>1e-6?{x:dx/d,z:dz/d}:{x:0,z:1};}
  }
  const goal=goalPoint(actor,target),distance=Math.hypot(goal.x-actor.x,goal.z-actor.z);
  if(distance<.18){routes.delete(actor);return {x:0,z:0};}
  if(navigationSight(actor,goal)){routes.delete(actor);return {x:(goal.x-actor.x)/distance,z:(goal.z-actor.z)/distance};}
  let route=routes.get(actor);
  if(!route||Math.hypot(route.goal.x-goal.x,route.goal.z-goal.z)>1.1||Math.hypot(route.lastX-actor.x,route.lastZ-actor.z)>3){route={goal,path:findRoute(actor,goal),lastX:actor.x,lastZ:actor.z};routes.set(actor,route);}
  route.lastX=actor.x;route.lastZ=actor.z;
  while(route.path.length&&Math.hypot(route.path[0].x-actor.x,route.path[0].z-actor.z)<.18&&(route.path.length===1||navigationSight(actor,route.path[1])))route.path.shift();
  // Skip waypoints as soon as a clear route opens; this avoids corner wobble.
  for(let i=route.path.length-1;i>0;i--)if(navigationSight(actor,route.path[i])){route.path.splice(0,i);break;}
  const next=route.path[0];if(!next)return {x:0,z:0};
  const length=Math.hypot(next.x-actor.x,next.z-actor.z);
  return length?{x:(next.x-actor.x)/length,z:(next.z-actor.z)/length}:{x:0,z:0};
}

import {sceneContactsEnabled,sceneryPolygons,sceneryNavigationCircles} from './arcade-scenery-contact.js';
// Shared arena geometry. The simulation, radar and Three.js scene use these
// exact footprints, so a visible gate is also the only physical way inside.
import {machineFootprints,machineDetour} from './arcade-cartoon-machine-bounds.js';
import { FROG_BODY, frogBody } from './arcade-actor-bounds.js';
import { sweepBody, separateBody, clearBodySegment, rectangleClearance } from './arcade-collision.js';
import { ARENA_MOVE_RADIUS, BATTLEGROUND_ROCKS, BATTLEGROUND_COVER } from './arcade-battleground.js';
const freezePoint = (x, z) => Object.freeze({x, z});
const OWNER_IDS = ['player', 'rival-1', 'rival-2'];
const ACTOR_RADIUS = FROG_BODY.movementRadius;
const NAV_RADIUS = ACTOR_RADIUS+.08;
const EPSILON = 1e-5;

export const CATAPULT_SITES=Object.freeze([
  {id:'catapult-player',enclosureId:'yard-player',owner:OWNER_IDS[0],x:-8.5,z:16},
  {id:'catapult-rival-1',enclosureId:'yard-rival-1',owner:OWNER_IDS[1],x:-16,z:-8.5},
  {id:'catapult-rival-2',enclosureId:'yard-rival-2',owner:OWNER_IDS[2],x:16,z:-8.5},
].map(Object.freeze));

export const BASES = Object.freeze([
  {id:'base-player', owner:OWNER_IDS[0], x:0, z:20.5, spawn:freezePoint(0,19.65), spawnHeading:Math.PI, stock:freezePoint(0,21.4), gate:freezePoint(0,17.9), approach:freezePoint(0,16.25), side:'north', halfWidth:3.1, halfDepth:2.6},
  {id:'base-rival-1', owner:OWNER_IDS[1], x:-18, z:1, spawn:freezePoint(-17.35,1), spawnHeading:Math.PI/2, stock:freezePoint(-19.1,1), gate:freezePoint(-14.9,1), approach:freezePoint(-13.25,1), side:'east', halfWidth:3.1, halfDepth:2.9},
  {id:'base-rival-2', owner:OWNER_IDS[2], x:18, z:1, spawn:freezePoint(17.35,1), spawnHeading:-Math.PI/2, stock:freezePoint(19.1,1), gate:freezePoint(14.9,1), approach:freezePoint(13.25,1), side:'west', halfWidth:3.1, halfDepth:2.9},
].map(Object.freeze));

// A home is the whole enclosed, roofed footprint, not the small stock basket.
export function insideHome(base,point,radius=0){
  return Math.abs(point.x-base.x)+radius<base.halfWidth-.17&&Math.abs(point.z-base.z)+radius<base.halfDepth-.17;
}

// One shared level deck and sampled entrance ramp drives both actor height and
// the visible house floor. Natural creek slopes must not put a frog below its hut.
function createEnclosureFloors(enclosures,sampleHeight){
  return enclosures.map(base=>{
    let maximum=-Infinity,minimum=Infinity;
    const halfWidth=base.halfWidth+.18,halfDepth=base.halfDepth+.18;
    const cols=Math.ceil(halfWidth*2/.22),rows=Math.ceil(halfDepth*2/.22);
    for(let col=0;col<=cols;col++)for(let row=0;row<=rows;row++){const x=-halfWidth+halfWidth*2*col/cols,z=-halfDepth+halfDepth*2*row/rows,y=sampleHeight(base.x+x,base.z+z);maximum=Math.max(maximum,y);minimum=Math.min(minimum,y);}
    const height=maximum+.16,doorDistance=Math.hypot(base.gate.x-base.x,base.gate.z-base.z),dx=(base.gate.x-base.x)/doorDistance,dz=(base.gate.z-base.z)/doorDistance,rightX=-dz,rightZ=dx;
    const ramp={x:base.gate.x+dx*.18,z:base.gate.z+dz*.18,dx,dz,rightX,rightZ,halfWidth:1.55,length:2.5,rows:10,cols:6,heights:[]};
    for(let row=0;row<=ramp.rows;row++)for(let col=0;col<=ramp.cols;col++){
      const along=row/ramp.rows*ramp.length,across=(col/ramp.cols*2-1)*ramp.halfWidth;
      const x=ramp.x+dx*along+rightX*across,z=ramp.z+dz*along+rightZ*across;
      const end=sampleHeight(ramp.x+dx*ramp.length+rightX*across,ramp.z+dz*ramp.length+rightZ*across)+.015;
      ramp.heights.push(Math.max(height+(end-height)*row/ramp.rows,sampleHeight(x,z)+.015));
    }
    return {id:base.id,baseId:base.id,x:base.x,z:base.z,halfWidth,halfDepth,height,minimum,ramp};
  });
}
export function createHouseFloors(sampleHeight){return createEnclosureFloors(BASES,sampleHeight);}
export function createCatapultFloors(sampleHeight){return createEnclosureFloors(CATAPULT_ENCLOSURES,sampleHeight);}

export function houseFloorAt(x,z,floors){
  if(!floors)return null;
  for(const floor of floors){
    if(Math.abs(x-floor.x)<=floor.halfWidth+1e-7&&Math.abs(z-floor.z)<=floor.halfDepth+1e-7)return floor.height;
    const r=floor.ramp,dx=x-r.x,dz=z-r.z,along=dx*r.dx+dz*r.dz,across=dx*r.rightX+dz*r.rightZ;
    if(along< -1e-7||along>r.length+1e-7||Math.abs(across)>r.halfWidth+1e-7)continue;
    const row=Math.max(0,Math.min(r.rows,along/r.length*r.rows)),col=Math.max(0,Math.min(r.cols,(across/r.halfWidth+1)*.5*r.cols)),i=Math.min(r.rows-1,Math.floor(row)),j=Math.min(r.cols-1,Math.floor(col)),v=row-i,u=col-j;
    const a=r.heights[i*(r.cols+1)+j],b=r.heights[i*(r.cols+1)+j+1],c=r.heights[(i+1)*(r.cols+1)+j],d=r.heights[(i+1)*(r.cols+1)+j+1];
    return (a+(b-a)*u)*(1-v)+(c+(d-c)*u)*v;
  }
  return null;
}

// Stations sit beside their homes, leaving each front exit open to the arena.
// All yards share a clear south gate for approach, mounting and dismounting.
export const CATAPULT_ENCLOSURES = Object.freeze(CATAPULT_SITES.map(site=>Object.freeze({
  id:site.enclosureId,owner:site.owner,x:site.x,z:site.z,halfWidth:2.8,halfDepth:2.8,side:'south',
  gate:freezePoint(site.x,site.z+2.8),approach:freezePoint(site.x,site.z+4.45),
})));

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
  ...BATTLEGROUND_COVER,
].map(Object.freeze));

// One footprint source for movement, navigation and the rendered creek rocks.
export const ARENA_ROCKS=Object.freeze([
  {x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6},
  ...BATTLEGROUND_ROCKS,
].map(Object.freeze));
const NAV_CIRCLES=Object.freeze([
  ...ARENA_ROCKS,
  ...CATAPULT_SITES.map(site=>({id:site.id,x:site.x,z:site.z,r:.95,machine:true})),
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

/** Rounded clearance preserves sliding and lets a touching frog turn away. */
export function resolveWallMove(actor,dx,dz,radius=frogBody(actor).movementRadius){
  return sweepBody(actor,dx,dz,{walls:WALLS,radius});
}

/** All solids participate in the same sweep; a rock correction cannot re-enter a wall. */
export function resolveArenaMove(actor,dx,dz,{radius=frogBody(actor).movementRadius,arenaRadius=ARENA_MOVE_RADIUS,ground=()=>0,catapults=null}={}){
 let circles=actor.catapultId?NAV_CIRCLES.filter(c=>c.id!==actor.catapultId):NAV_CIRCLES,walls=WALLS;
 if(actor.flight||actor.support){
  const bottom=Number.isFinite(actor.flight?.y)?actor.flight.y:ground(actor.x,actor.z)+(actor.height||0),source=actor.support?.id||actor.flight?.sourceSupport;
  walls=WALLS.filter(w=>bottom<ground(w.x,w.z)+w.height+.135-.015);
  circles=circles.filter(c=>{
   if(c.machine)return source!=='machine:'+c.id&&bottom<ground(c.x,c.z)+.45-.015;
   const index=ARENA_ROCKS.indexOf(c);if(source==='rock:'+index)return false;
   const q=((actor.x-c.x)**2+(actor.z-c.z)**2)/(c.r*c.r),base=ground(c.x,c.z),top=base+c.r*.9+c.r*1.7;
   if(bottom>=top-.015)return false;
   if(q<=1&&bottom>=base+c.r*.9+c.r*1.7*Math.sqrt(1-q)-.015)return false;
   return true;
  });
 }
 if(actor.characterClass&&catapults?.length){
  circles=circles.filter(c=>!c.machine);const source=actor.support?.id||actor.flight?.sourceSupport,bottom=Number.isFinite(actor.flight?.y)?actor.flight.y:ground(actor.x,actor.z)+(actor.height||0);
  const machines=machineFootprints(catapults).filter(b=>{
   if(b.id===actor.catapultId||source==='machine:'+b.id)return false;
   const seat=Math.hypot(actor.x-b.station.x,actor.z-b.station.z)<.63,support=seat&&actor.flight?.vy<=0?frogBody(actor).mountedOffset:b.top;
   return bottom<ground(b.station.x,b.station.z)+support-.015;
  });walls=[...walls,...machines];
 }
 const polygons=sceneContactsEnabled(actor)?sceneryPolygons(actor,ground):[];if(sceneContactsEnabled(actor))circles=circles.filter(c=>c.machine);return sweepBody(actor,dx,dz,{walls,circles,polygons,radius,arenaRadius});
}

export function coverAt(actor){return TREES.find(tree=>Math.hypot(actor.x-tree.x,actor.z-tree.z)<=tree.radius)||null;}
export function terrainSpeed(actor){return coverAt(actor) ? .55 : 1;}
export function enclosingYard(actor){return ENCLOSURES.find(c=>Math.abs(actor.x-c.x)<c.halfWidth&&Math.abs(actor.z-c.z)<c.halfDepth)||null;}

let sceneNavCircles;
const navCircles=mode=>mode?(sceneNavCircles??=[...sceneryNavigationCircles(),...NAV_CIRCLES.filter(c=>c.machine)]):NAV_CIRCLES;
function navigationSight(a,b,mode=false){
  return clearBodySegment(a,b,{walls:WALLS,circles:navCircles(mode),radius:NAV_RADIUS,arenaRadius:ARENA_MOVE_RADIUS});
}
function freePoint(p,mode=false){
  return Math.hypot(p.x,p.z)<=ARENA_MOVE_RADIUS-.15&&WALLS.every(w=>rectangleClearance(p,w)>NAV_RADIUS+EPSILON)&&navCircles(mode).every(c=>Math.hypot(p.x-c.x,p.z-c.z)>c.r+NAV_RADIUS+EPSILON);
}

const graphs=new Map();
const routes=new WeakMap();
function makeGraph(mode=false){
  if(graphs.has(mode))return graphs.get(mode);
  const nodes=[];
  const add=(x,z)=>{const p={x,z};if(freePoint(p,mode)&&!nodes.some(n=>Math.hypot(n.x-x,n.z-z)<.1))nodes.push(p);};
  for(const wall of WALLS){const b=bounds(wall,NAV_RADIUS+.06);for(const x of [b.minX,b.maxX])for(const z of [b.minZ,b.maxZ])add(x,z);}
  for(const circle of navCircles(mode)){const count=circle.tree?4:mode?8:12;for(let i=0;i<count;i++){const angle=i*Math.PI*2/count,r=(circle.r+NAV_RADIUS+.08)/Math.cos(Math.PI/count);add(circle.x+Math.cos(angle)*r,circle.z+Math.sin(angle)*r);}}
  for(const c of ENCLOSURES){add(c.gate.x,c.gate.z);add(c.approach.x,c.approach.z);add(c.gate.x+(c.x-c.gate.x)*.4,c.gate.z+(c.z-c.gate.z)*.4);}
  const edges=nodes.map(()=>[]);
  for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++)if(navigationSight(nodes[i],nodes[j],mode)){const cost=Math.hypot(nodes[i].x-nodes[j].x,nodes[i].z-nodes[j].z);edges[i].push([j,cost]);edges[j].push([i,cost]);}
  const graph={nodes,edges};graphs.set(mode,graph);return graph;
}

function goalPoint(actor,goal){
  let point={x:goal.x,z:goal.z};
  const machine=NAV_CIRCLES.find(c=>c.machine&&Math.hypot(point.x-c.x,point.z-c.z)<c.r+NAV_RADIUS);
  if(machine)point={x:machine.x,z:machine.z+2.05};
  return sceneContactsEnabled(actor)?separateBody(point,{walls:WALLS,circles:navCircles(true),radius:NAV_RADIUS+.002,arenaRadius:ARENA_MOVE_RADIUS}):resolveArenaMove(point,0,0,{radius:NAV_RADIUS});
}
function findRoute(actor,goal,mode=false){
  const {nodes,edges}=makeGraph(mode),count=nodes.length,dist=new Float64Array(count),previous=new Int32Array(count),used=new Uint8Array(count);
  dist.fill(Infinity);previous.fill(-1);
  const goalEdges=new Map();
  for(let i=0;i<count;i++){
    if(navigationSight(actor,nodes[i],mode))dist[i]=Math.hypot(actor.x-nodes[i].x,actor.z-nodes[i].z);
    if(navigationSight(nodes[i],goal,mode))goalEdges.set(i,Math.hypot(goal.x-nodes[i].x,goal.z-nodes[i].z));
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
export function navigateTo(actor,target,{catapults=[]}={}){
  const mode=sceneContactsEnabled(actor);target=machineDetour(actor,target,catapults);
  if(!Number.isFinite(target?.x)||!Number.isFinite(target?.z))return {x:0,z:0};
  // A shove can leave the actor touching the physical wall. Step clear of the
  // small navigation margin before searching; otherwise every ray starts blocked.
  const physical=resolveArenaMove(actor,0,0,{radius:NAV_RADIUS,catapults}),clearance=mode?separateBody(physical,{circles:sceneryNavigationCircles(),radius:NAV_RADIUS+.002,arenaRadius:ARENA_MOVE_RADIUS}):physical,correction=Math.hypot(clearance.x-actor.x,clearance.z-actor.z);
  if(correction>.005){routes.delete(actor);return {x:(clearance.x-actor.x)/correction,z:(clearance.z-actor.z)/correction};}
  const goal=goalPoint(actor,target),distance=Math.hypot(goal.x-actor.x,goal.z-actor.z);
  if(distance<.18){routes.delete(actor);return {x:0,z:0};}
  if(navigationSight(actor,goal,mode)){routes.delete(actor);return {x:(goal.x-actor.x)/distance,z:(goal.z-actor.z)/distance};}
  let route=routes.get(actor);
  if(!route||!route.path.length||!navigationSight(actor,route.path[0],mode)||Math.hypot(route.goal.x-goal.x,route.goal.z-goal.z)>.35||Math.hypot(route.lastX-actor.x,route.lastZ-actor.z)>3){route={goal,path:findRoute(actor,goal,mode),lastX:actor.x,lastZ:actor.z};routes.set(actor,route);}
  route.lastX=actor.x;route.lastZ=actor.z;
  while(route.path.length&&Math.hypot(route.path[0].x-actor.x,route.path[0].z-actor.z)<.18&&(route.path.length===1||navigationSight(actor,route.path[1],mode)))route.path.shift();
  // Skip waypoints as soon as a clear route opens; this avoids corner wobble.
  for(let i=route.path.length-1;i>0;i--)if(navigationSight(actor,route.path[i],mode)){route.path.splice(0,i);break;}
  const next=route.path[0];if(!next)return {x:0,z:0};
  const length=Math.hypot(next.x-actor.x,next.z-actor.z);
  return length?{x:(next.x-actor.x)/length,z:(next.z-actor.z)/length}:{x:0,z:0};
}

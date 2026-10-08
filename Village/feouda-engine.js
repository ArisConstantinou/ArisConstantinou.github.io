import { FACTIONS, REGIONS, RESOURCE_NODES, UNIT_TYPES, BUILDINGS, TECHS, MAP, BRIDGES, heightAt, riverX, regionAt } from './feouda-data.js?v=2.5.0';

// Simulation uses world-space positions. Orders, arrows and siege stones travel
// through the same world the player sees; elapsed wall-clock time never fights wars.
export const SAVE_KEY = 'feouda-1280-v1';
const RESOURCE_KEYS = ['money', 'food', 'wood', 'stone', 'iron'];
const RESOURCE_LABELS = {money:'CY£', food:'τροφίμων', wood:'ξυλείας', stone:'πέτρας', iron:'σιδήρου'};
const FACTION_KEYS = Object.keys(FACTIONS);
const REGION_BY_ID = Object.fromEntries(REGIONS.map(r => [r.id, r]));
const GATHER_RATE = {food:.25, wood:.19, stone:.145, iron:.095};
const NODE_BUILDING = {food:'farm', wood:'lumberyard', stone:'quarry', iron:'mine'};
const PRICES = {food:{buy:1.6,sell:.85}, wood:{buy:2.1,sell:1.1}, stone:{buy:2.7,sell:1.45}, iron:{buy:4.8,sell:2.6}};
const FORMATIONS = ['line', 'column', 'wedge'];
const STANCES = ['aggressive', 'defensive'];
const ORDER_TYPES = ['move', 'attackMove', 'attack', 'capture', 'hold', 'retreat'];
const EPS = 1e-7;
const GRID = 6;
const MAX_SQUADS = 150;
const MAX_JOBS = 20;
const MAX_WORKERS_PER_NODE = 12;
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
const dist = (a,b) => Math.hypot(a.x-b.x,a.z-b.z);
const finite = v => typeof v === 'number' && Number.isFinite(v);
const has = (object,key) => typeof key === 'string' && Object.hasOwn(object,key);
const clone = v => JSON.parse(JSON.stringify(v));
const infantry = s => UNIT_TYPES[s.type]?.role === 'infantry';
const player = s => s.owner === 'player' && s.hp > 0;
const rounded = n => Math.round(n * 100) / 100;
const fail = message => ({ok:false, message});

// One source for production quotes and actual gathering. Rates use simulation
// seconds; pause/speed do not change them. Exhaustion caps the actual transfer.
function nodeProductionRates(state,node) {
  const buildingType=has(NODE_BUILDING,node?.type)?NODE_BUILDING[node.type]:null;
  const region=state?.regions&&has(state.regions,node?.regionId)?state.regions[node.regionId]:null;
  const rawLevel=buildingType?(region?.buildings?.[buildingType]??0):0;
  const buildingLevel=Number.isInteger(rawLevel)&&rawLevel>=0&&rawLevel<=BUILDINGS[buildingType]?.max?rawLevel:0;
  const agriculture=node?.type==='food'?(state?.techs?.agriculture??0):0;
  const usable=buildingType!==null&&region?.owner==='player'&&finite(node.amount)&&node.amount>0&&
    finite(state?.morale)&&state.morale>=0&&state.morale<=100&&buildingLevel===rawLevel&&
    Number.isInteger(agriculture)&&agriculture>=0&&agriculture<=TECHS.agriculture.max;
  const perWorkerPerSecond=usable?GATHER_RATE[node.type]*(1+.25*buildingLevel)*(1+.2*agriculture)*(.6+state.morale*.0055):0;
  const workers=Number.isInteger(node?.workers)&&node.workers>0&&node.workers<=MAX_WORKERS_PER_NODE?node.workers:0;
  const totalPerSecond=perWorkerPerSecond*workers;
  return {perWorkerPerSecond,totalPerSecond,active:totalPerSecond>0,buildingType,buildingLevel};
}

/** Gross node production per simulation minute, excluding passive farms and
 * food consumption. Unassigned usable nodes retain a prospective worker rate.
 * Inactive/invalid nodes return zero totals without changing campaign state. */
export function getNodeProduction(state,node) {
  const rates=nodeProductionRates(state,node);
  return {perWorkerPerMinute:rates.perWorkerPerSecond*60,totalPerMinute:rates.totalPerSecond*60,
    maxWorkers:MAX_WORKERS_PER_NODE,active:rates.active,buildingType:rates.buildingType,buildingLevel:rates.buildingLevel};
}

// World-metre rectangles include roof overhangs and the .78 model scale.
// Walls improve the existing fort and therefore never reserve a new plot.
export const BUILD_FOOTPRINTS=Object.freeze(Object.fromEntries(Object.keys(BUILDINGS).filter(type=>type!=='walls').map(type=>[
  type,Object.freeze({width:type==='houses'?8:type==='farm'?14:type==='market'?11:10,
    depth:type==='houses'?8:type==='farm'?11:type==='market'?12:type==='barracks'?11:10,
    clearance:1.5,blocking:type!=='farm'})
])));
export const BUILDING_FOOTPRINTS=BUILD_FOOTPRINTS;
// Squads may compress their visual formation at a bottleneck. The moving centre
// still reserves the full chassis of an engine, rather than a zero-size point.
export const UNIT_CLEARANCE=Object.freeze({spear:.8,sword:.8,archer:.8,cavalry:1.6,ram:4.8,trebuchet:4.8});
export const FORT_POLYGONS=Object.freeze(Object.fromEntries(REGIONS.map(r=>{
  const d=r.kind==='castle'?18:r.kind==='town'?12:9;
  const points=r.kind!=='castle'?[[-d,-d],[d,-d],[d,d],[-d,d]]:
    r.owner==='red'?[[-d,-d],[d*.72,-d*1.09],[d,d*.84],[-d*.91,d*.95]]:
    r.owner==='gold'?[[-d*.9,-d],[d*.97,-d*.73],[d*.82,d],[-d,d*.74]]:
    [[-d,-d*.82],[d*.82,-d],[d,d*.8],[-d*.87,d]];
  return [r.id,Object.freeze(points.map(([x,z])=>Object.freeze({x:r.x+x,z:r.z+z})))];
})));
const ROAD_PAIRS=[['home','firwood'],['home','farmland'],['home','crossing'],['farmland','quarry'],['ironhold','pass'],['ironhold','highlands'],['highlands','sunkeep'],['sunkeep','quarry'],['crossing','pass'],['crossing','highlands']];
const lerp=(a,b,t)=>a+(b-a)*t;
function roadSpline(anchors) {
  const out=[];
  for(let i=0;i<anchors.length-1;i++) {
    const p1=anchors[i],p2=anchors[i+1],p0=anchors[i-1]||[2*p1[0]-p2[0],2*p1[1]-p2[1]],p3=anchors[i+2]||[2*p2[0]-p1[0],2*p2[1]-p1[1]];
    const steps=Math.max(4,Math.ceil(Math.hypot(p2[0]-p1[0],p2[1]-p1[1])/1.6));
    for(let n=0;n<steps;n++) {const t=n/steps,t2=t*t,t3=t2*t;
      out.push([0,1].map(axis=>.5*(2*p1[axis]+(-p0[axis]+p2[axis])*t+(2*p0[axis]-5*p1[axis]+4*p2[axis]-p3[axis])*t2+(-p0[axis]+3*p1[axis]-3*p2[axis]+p3[axis])*t3)));
    }
  }
  out.push([...anchors.at(-1)]);return out;
}
export const PLACEMENT_ROADS=ROAD_PAIRS.map(([from,to])=>{
  const a=REGION_BY_ID[from],b=REGION_BY_ID[to],points=[[a.x,a.z+18]];
  if((a.x-riverX(a.z))*(b.x-riverX(b.z))<0) {
    const bridge=BRIDGES.reduce((best,p)=>dist(a,p)+dist(b,p)<dist(a,best)+dist(b,best)?p:best),sign=a.x<bridge.x?-1:1;
    points.push([bridge.x+sign*22,bridge.z],[bridge.x+sign*9,bridge.z],[bridge.x-sign*9,bridge.z],[bridge.x-sign*22,bridge.z]);
  } else points.push([lerp(a.x,b.x,.5)+6,lerp(a.z,b.z,.5)]);
  points.push([b.x,b.z+13]);return {id:`${from}-${to}`,width:3.5,points:roadSpline(points)};
});
const normalizedRotation=angle=>((angle%(Math.PI*2))+Math.PI*2)%(Math.PI*2);
function localPoint(p,rect) {
  const dx=p.x-rect.x,dz=p.z-rect.z,c=Math.cos(rect.rotation||0),s=Math.sin(rect.rotation||0);
  return {x:dx*c-dz*s,z:dx*s+dz*c};
}
function pointInsideRect(p,rect,padding=0) {
  const q=localPoint(p,rect);return Math.abs(q.x)<rect.width/2+padding&&Math.abs(q.z)<rect.depth/2+padding;
}
function segmentHitsRect(a,b,rect,padding=0) {
  const start=localPoint(a,rect),end=localPoint(b,rect);let lo=0,hi=1;
  for(const [axis,size] of [['x',rect.width/2+padding],['z',rect.depth/2+padding]]) {
    const d=end[axis]-start[axis];
    if(Math.abs(d)<EPS){if(start[axis]<=-size||start[axis]>=size)return false;}
    else {let t1=(-size-start[axis])/d,t2=(size-start[axis])/d;if(t1>t2)[t1,t2]=[t2,t1];lo=Math.max(lo,t1);hi=Math.min(hi,t2);if(lo>=hi-EPS)return false;}
  }
  return hi>EPS&&lo<1-EPS;
}
function rectanglePoints(rect) {
  const c=Math.cos(rect.rotation||0),s=Math.sin(rect.rotation||0),out=[];
  for(const x of [-rect.width/2,0,rect.width/2])for(const z of [-rect.depth/2,0,rect.depth/2])out.push({x:rect.x+x*c+z*s,z:rect.z-x*s+z*c});
  return out;
}
function rectanglesOverlap(a,b,padding=0) {
  const ca=Math.cos(a.rotation||0),sa=Math.sin(a.rotation||0),cb=Math.cos(b.rotation||0),sb=Math.sin(b.rotation||0);
  const axes=[[ca,-sa],[sa,ca],[cb,-sb],[sb,cb]],dx=b.x-a.x,dz=b.z-a.z;
  for(const [x,z] of axes) {
    // Split clearance between both rectangles. Expanding only the first
    // rectangle made rotated neighbours pass on placement but fail on reload.
    const reachA=(a.width/2+padding/2)*Math.abs(x*ca-z*sa)+(a.depth/2+padding/2)*Math.abs(x*sa+z*ca);
    const reachB=(b.width/2+padding/2)*Math.abs(x*cb-z*sb)+(b.depth/2+padding/2)*Math.abs(x*sb+z*cb);
    if(Math.abs(dx*x+dz*z)>=reachA+reachB)return false;
  }
  return true;
}
function inPolygon(p,polygon) {
  let inside=false;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
    const a=polygon[i],b=polygon[j];if((a[1]>p.z)!==(b[1]>p.z)&&p.x<(b[0]-a[0])*(p.z-a[1])/(b[1]-a[1])+a[0])inside=!inside;
  }return inside;
}
function structureRect(structure) {return {...BUILD_FOOTPRINTS[structure.type],x:structure.x,z:structure.z,rotation:structure.rotation};}
function withBounds(obstacle) {
  const c=Math.abs(Math.cos(obstacle.rotation||0)),s=Math.abs(Math.sin(obstacle.rotation||0));
  const halfX=obstacle.radius??(obstacle.width*c+obstacle.depth*s)/2;
  const halfZ=obstacle.radius??(obstacle.width*s+obstacle.depth*c)/2;
  return Object.freeze({...obstacle,minX:obstacle.x-halfX,maxX:obstacle.x+halfX,minZ:obstacle.z-halfZ,maxZ:obstacle.z+halfZ});
}
function houseFootprint(variant,large=false,scaleX=1,scaleZ=1) {
  const w=(large?7.8:4.8)+(variant%3)*.65,d=(large?6.1:4.4)+(variant%2)*.8;
  const h=(variant%3===0?5.9:4.1)+(large?1.5:0);
  const minX=(-w/2-.4)*scaleX,maxX=(w/2+(variant%3===1?1.56:.4))*scaleX;
  const minZ=(-d/2-.5)*scaleZ,maxZ=(d/2+(h>5?2.3:.5))*scaleZ;
  return {offsetX:(minX+maxX)/2,offsetZ:(minZ+maxZ)/2,width:maxX-minX,depth:maxZ-minZ};
}
const FORT_SOLIDS=Object.fromEntries(REGIONS.map(region=>{
  const parts=[],v=region.id.split('').reduce((sum,c)=>sum+c.charCodeAt(0),0),castle=region.kind==='castle';
  const add=(part)=>parts.push(withBounds({source:'fort',regionId:region.id,id:region.id+'-'+parts.length,minRatio:-1,...part}));
  const rect=(x,z,width,depth,extra={})=>add({x:region.x+x,z:region.z+z,width,depth,rotation:0,...extra});
  const house=(x,z,variant,large,rotation=0,scaleX=1,scaleZ=1)=>{
    const fp=houseFootprint(variant,large,scaleX,scaleZ),c=Math.cos(rotation),s=Math.sin(rotation);
    rect(x+fp.offsetX*c+fp.offsetZ*s,z-fp.offsetX*s+fp.offsetZ*c,fp.width,fp.depth,{rotation,part:'building'});
  };
  const points=FORT_POLYGONS[region.id];
  for(let i=0;i<points.length;i++) {
    const a=points[i],b=points[(i+1)%points.length],dx=b.x-a.x,dz=b.z-a.z,length=Math.hypot(dx,dz);
    const rotation=-Math.atan2(dz,dx),cx=(a.x+b.x)/2,cz=(a.z+b.z)/2,minRatio=i===2?.035:i===1?.17:0;
    if(i===2) {
      const lengthSide=(length-4.5)/2,offset=(length+4.5)/4;
      for(const sign of [-1,1])add({x:cx+sign*offset*dx/length,z:cz+sign*offset*dz/length,width:lengthSide,depth:2.5,rotation,minRatio,part:'wall'});
      add({x:cx,z:cz,width:4.2,depth:.5,rotation,minRatio:.16,part:'gate'});
    } else add({x:cx,z:cz,width:length+.1,depth:2.5,rotation,minRatio,part:'wall'});
    add({x:a.x,z:a.z,radius:castle?4.3:3.3,part:'tower'});
  }
  if(castle) {
    rect(0,-4,11.6,10.3,{part:'keep'});
    rect(-3,2,4.3,2.4,{part:'stairs'});
    add({x:region.x-5.1,z:region.z-8.5,radius:2.6,part:'keep'});
    // Renderer normalizes both detailed assets and loading fallbacks to these
    // centred footprints; the hall's source model is rotated a quarter turn.
    rect(-9,3.1,9.5,7.8,{part:'building'});
    rect(8.8,4,6.4,6.6,{part:'building'});
  } else {
    house(0,-2,v%4,region.kind==='town');
    if(region.kind==='outpost')rect(0,-4,7,7,{part:'keep'});
  }
  rect(3.5,7.6,3,2.3,{part:'cistern'});
  rect(-4.9,8.5,3.85,.8,{part:'supplies'});
  return [region.id,Object.freeze(parts)];
}));
const obstacleCache=new WeakMap();
/** The same solid geometry is shared with the renderer's individual soldiers. */
export function worldObstacles(s) {
  const mask=REGIONS.map(r=>{
    const control=s.regions[r.id],ratio=control.fortHp/control.maxFortHp;
    return (ratio>0?1:0)+(ratio>.035?2:0)+(ratio>.16?4:0)+(ratio>.17?8:0);
  }).join(',');
  const cached=obstacleCache.get(s),structures=s.structures||[];
  if(cached&&cached.structures===structures&&cached.count===structures.length&&cached.mask===mask)return cached.obstacles;
  const obstacles=[];
  for(const r of REGIONS) {
    const control=s.regions[r.id],ratio=control.fortHp/control.maxFortHp;
    for(const shape of FORT_SOLIDS[r.id])if(ratio>shape.minRatio)obstacles.push(shape);
  }
  for(const structure of structures)if(BUILD_FOOTPRINTS[structure.type]?.blocking)obstacles.push(withBounds({...structureRect(structure),source:'structure',id:structure.id,regionId:structure.regionId,part:'building'}));
  obstacleCache.set(s,{structures,count:structures.length,mask,obstacles});
  return obstacles;
}
function navigationOptions(unit=.65) {
  const radius=typeof unit==='number'?unit:UNIT_CLEARANCE[typeof unit==='string'?unit:unit?.type]??unit?.radius??.65;
  return {radius:Math.max(0,radius),terrainRadius:Math.max(0,typeof unit==='object'&&unit?.terrainRadius!==undefined?unit.terrainRadius:Math.min(radius,2.05))};
}
function terrainPointWalkable(p,options) {
  const radius=options.terrainRadius;
  if(!finite(p?.x)||!finite(p?.z)||p.x<MAP.minX+3+radius||p.x>MAP.maxX-3-radius||p.z<MAP.minZ+3+radius||p.z>MAP.maxZ-3-radius)return false;
  if(Math.abs(p.x-riverX(p.z))>=11+radius)return true;
  return BRIDGES.some(b=>Math.abs(p.z-b.z)<=3.25-radius&&Math.abs(p.x-b.x)<=17);
}
function obstacleContains(p,obstacle,radius) {
  if(p.x<obstacle.minX-radius||p.x>obstacle.maxX+radius||p.z<obstacle.minZ-radius||p.z>obstacle.maxZ+radius)return false;
  return obstacle.radius!==undefined?dist(p,obstacle)<obstacle.radius+radius:pointInsideRect(p,obstacle,radius);
}
function obstacleCrosses(a,b,obstacle,radius) {
  if(Math.max(a.x,b.x)<obstacle.minX-radius||Math.min(a.x,b.x)>obstacle.maxX+radius||Math.max(a.z,b.z)<obstacle.minZ-radius||Math.min(a.z,b.z)>obstacle.maxZ+radius)return false;
  if(obstacle.radius===undefined)return segmentHitsRect(a,b,obstacle,radius);
  const dx=b.x-a.x,dz=b.z-a.z,length2=dx*dx+dz*dz;
  const t=length2?clamp(((obstacle.x-a.x)*dx+(obstacle.z-a.z)*dz)/length2,0,1):0;
  return Math.hypot(a.x+dx*t-obstacle.x,a.z+dz*t-obstacle.z)<obstacle.radius+radius;
}
function pointWalkable(p,options,obstacles) {
  return terrainPointWalkable(p,options)&&!obstacles.some(shape=>obstacleContains(p,shape,options.radius));
}
function segmentWalkable(a,b,options,obstacles) {
  if(!terrainPointWalkable(a,options)||!terrainPointWalkable(b,options))return false;
  if(obstacles.some(shape=>obstacleCrosses(a,b,shape,options.radius)))return false;
  const steps=Math.max(1,Math.ceil(dist(a,b)/.75));
  for(let i=1;i<steps;i++)if(!terrainPointWalkable({x:a.x+(b.x-a.x)*i/steps,z:a.z+(b.z-a.z)*i/steps},options))return false;
  return true;
}
export function isWorldPointWalkable(s,p,unit=.65) {return pointWalkable(p,navigationOptions(unit),worldObstacles(s));}
export function isWorldSegmentWalkable(s,a,b,unit=.65) {return segmentWalkable(a,b,navigationOptions(unit),worldObstacles(s));}
function placementGeometry(type,x,z,rotation=0) {
  const footprint=BUILD_FOOTPRINTS[type];if(!footprint||!finite(x)||!finite(z)||!finite(rotation))return null;
  const rect={type,x,z,rotation:normalizedRotation(rotation),...footprint};
  const heights=rectanglePoints(rect).map(p=>heightAt(p.x,p.z));
  return {...rect,baseY:Math.max(...heights)+.04,terrainMin:Math.min(...heights)};
}
function validatePlacement(s,payload,{allowForeign=false,ignoreId=null,ignoreUnits=false}={}) {
  const {type,regionId,x,z}=payload,rotation=payload.rotation??0;
  const placement=placementGeometry(type,x,z,rotation),bad=message=>({ok:false,message,...(placement?{placement}:{})});
  if(!placement)return bad('Διάλεξε έγκυρη θέση και περιστροφή για το κτίριο.');
  const region=REGION_BY_ID[regionId];
  if(!region||(!allowForeign&&s.regions[regionId]?.owner!=='player'))return bad('Το κτίριο πρέπει να βρίσκεται σε δικό σου φέουδο.');
  const points=rectanglePoints(placement);
  if(points.some(p=>p.x<MAP.minX+4||p.x>MAP.maxX-4||p.z<MAP.minZ+4||p.z>MAP.maxZ-4))return bad('Ολόκληρο το οικόπεδο πρέπει να βρίσκεται μέσα στον χάρτη.');
  if(points.some(p=>!inPolygon(p,region.polygon)))return bad('Ολόκληρο το οικόπεδο πρέπει να βρίσκεται μέσα στο επιλεγμένο φέουδο.');
  for(let i=0;i<region.polygon.length;i++) {
    const a=region.polygon[i],b=region.polygon[(i+1)%region.polygon.length];
    if(segmentHitsRect({x:a[0],z:a[1]},{x:b[0],z:b[1]},placement))return bad('Το οικόπεδο τέμνει τα σύνορα του φέουδου. Μετακίνησέ το πιο μέσα.');
  }
  if(points.some(p=>Math.abs(p.x-riverX(p.z))<18))return bad('Άφησε απόσταση από το ποτάμι και την όχθη.');
  if(BRIDGES.some(b=>rectanglesOverlap(placement,{x:b.x,z:b.z,rotation:0,width:58,depth:17},1)))return bad('Η γέφυρα και οι προσβάσεις της πρέπει να μείνουν ελεύθερες.');
  for(const fort of REGIONS) {
    const half=fort.kind==='castle'?24:fort.kind==='town'?16:13;
    if(rectanglesOverlap(placement,{x:fort.x,z:fort.z,rotation:0,width:half*2,depth:half*2},1.5))return bad('Άφησε ελεύθερο χώρο γύρω από το οχυρό και τους πύργους.');
    if(rectanglesOverlap(placement,{x:fort.x,z:fort.z+half+9,rotation:0,width:12,depth:18},1.5))return bad('Η πύλη χρειάζεται ελεύθερη πρόσβαση για στρατεύματα και εφόδια.');
  }
  for(const n of s.nodes) {
    const plot=n.type==='food'?{x:n.x+4,z:n.z-3.5,rotation:0,width:22,depth:20}:{x:n.x,z:n.z,rotation:0,width:n.type==='wood'?20:14,depth:n.type==='wood'?20:14};
    if(rectanglesOverlap(placement,plot,1.5))return bad('Αυτή η θέση κρατιέται ελεύθερη για τη συλλογή πόρων.');
  }
  for(const other of s.structures||[])if(other.id!==ignoreId&&rectanglesOverlap(placement,structureRect(other),1.5))return bad('Το οικόπεδο επικαλύπτει κτίριο ή ενεργό εργοτάξιο.');
  for(const road of PLACEMENT_ROADS)for(let i=1;i<road.points.length;i++) {
    const a=road.points[i-1],b=road.points[i];
    if(segmentHitsRect({x:a[0],z:a[1]},{x:b[0],z:b[1]},placement,road.width/2+1.2))return bad('Άφησε τον δρόμο ελεύθερο για μετακινήσεις και ανεφοδιασμό.');
  }
  const span=placement.baseY-.04-placement.terrainMin;
  if(span>3.5)return bad('Η πλαγιά είναι πολύ απότομη για ασφαλή θεμέλια. Διάλεξε πιο ομαλό έδαφος.');
  for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++) {
    const distance=dist(points[i],points[j]);
    if(distance>1&&Math.abs(heightAt(points[i].x,points[i].z)-heightAt(points[j].x,points[j].z))/distance>.38)return bad('Η κλίση του εδάφους είναι μεγάλη. Μετακίνησε το κτίριο σε πιο ομαλό σημείο.');
  }
  if(!ignoreUnits&&(s.squads||[]).some(unit=>unit.hp>0&&pointInsideRect(unit,placement,Math.max(3,UNIT_CLEARANCE[unit.type])+.4)))return bad('Απομάκρυνε πρώτα τα στρατεύματα από το οικόπεδο.');
  return {ok:true,placement};
}
function findPlacement(s,type,regionId,rotation=0,preferred=null) {
  if(!has(BUILD_FOOTPRINTS,type)||!has(REGION_BY_ID,regionId)||!finite(rotation))return null;
  const region=REGION_BY_ID[regionId],check=p=>validatePlacement(s,{type,regionId,rotation,...p},{allowForeign:true});
  if(preferred){const attempt=check(preferred);if(attempt.ok)return attempt.placement;}
  const typeIndex=Object.keys(BUILDINGS).indexOf(type),baseAngle=(typeIndex%7)*.86+.38;
  for(let radius=34;radius<=170;radius+=7) {
    const count=Math.max(24,Math.ceil(radius*.75));
    for(let i=0;i<count;i++) {const angle=baseAngle+i*Math.PI*2/count;
      const result=check({x:region.x+Math.cos(angle)*radius,z:region.z+Math.sin(angle)*radius});if(result.ok)return result.placement;
    }
  }
  for(let x=MAP.minX+10;x<MAP.maxX-10;x+=8)for(let z=MAP.minZ+10;z<MAP.maxZ-10;z+=8) {
    if(!inPolygon({x,z},region.polygon))continue;const result=check({x,z});if(result.ok)return result.placement;
  }
  return null;
}
function migrateStructures(s,splitLevels=true) {
  if(Array.isArray(s.structures))return;
  if(s.structures!==undefined)throw new Error('Το αρχείο έχει μη έγκυρα οικόπεδα.');
  s.structures=[];
  for(const region of REGIONS)for(const [type,level] of Object.entries(s.regions[region.id].buildings)) {
    if(!has(BUILD_FOOTPRINTS,type))continue;
    // Older saves recorded aggregate upgrades rather than separate plots.
    // Keep those levels on a single existing building, so a developed old
    // province does not need dozens of newly invented parcels to load.
    const copies=splitLevels?level:Math.min(1,level);
    for(let i=0;i<copies;i++) {
      const typeIndex=Object.keys(BUILDINGS).indexOf(type),angle=(typeIndex%7)*.86+i*.3+.38,radius=(region.kind==='castle'?33:25)+Math.floor(typeIndex/7)*12+i*5;
      const placement=findPlacement(s,type,region.id,-angle+Math.PI/2,{x:region.x+Math.cos(angle)*radius,z:region.z+Math.sin(angle)*radius});
      if(!placement)throw new Error(`Δεν βρέθηκε ασφαλές οικόπεδο για ${BUILDINGS[type].name} στο ${region.name}.`);
      s.structures.push({id:`structure-${++s.nextId}`,type,regionId:region.id,x:placement.x,z:placement.z,rotation:placement.rotation,baseY:placement.baseY,terrainMin:placement.terrainMin,level:splitLevels?1:level,status:'ready',jobId:null,variant:typeIndex+i});
    }
  }
  for(const job of s.jobs) {
    if(job.kind!=='build'||!has(BUILD_FOOTPRINTS,job.type))continue;
    const placement=findPlacement(s,job.type,job.regionId,0);
    if(!placement)throw new Error('Δεν βρέθηκε ασφαλές οικόπεδο για ένα παλιό εργοτάξιο.');
    const structure={id:`structure-${++s.nextId}`,type:job.type,regionId:job.regionId,x:placement.x,z:placement.z,rotation:placement.rotation,baseY:placement.baseY,terrainMin:placement.terrainMin,level:0,status:'building',jobId:job.id,variant:Object.keys(BUILDINGS).indexOf(job.type)};
    s.structures.push(structure);Object.assign(job,{structureId:structure.id,x:structure.x,z:structure.z,rotation:structure.rotation,targetLevel:1});
  }
}
function validateStructures(s) {
  migrateStructures(s,false);
  const max=REGIONS.length*Object.values(BUILDINGS).reduce((sum,building)=>sum+building.max,0)+MAX_JOBS;
  if(!Array.isArray(s.structures)||s.structures.length>max)throw new Error('Το αρχείο έχει υπερβολικά πολλά οικόπεδα.');
  const ids=new Set([...s.squads.map(unit=>unit.id),...s.jobs.map(job=>job.id)]);
  const totals=Object.fromEntries(REGIONS.map(region=>[region.id,{}]));
  for(const structure of s.structures) {
    if(!structure||typeof structure.id!=='string'||structure.id.length>80||ids.has(structure.id)||!has(BUILD_FOOTPRINTS,structure.type)||!has(REGION_BY_ID,structure.regionId)||
      !finite(structure.x)||!finite(structure.z)||!finite(structure.rotation)||!Number.isInteger(structure.level)||structure.level<0||structure.level>BUILDINGS[structure.type].max||
      !['ready','building','upgrading'].includes(structure.status))throw new Error('Το αρχείο έχει μη έγκυρο κτίριο.');
    ids.add(structure.id);
    structure.rotation=normalizedRotation(structure.rotation);
    if(structure.status==='ready') {
      if(structure.level<1||structure.jobId!==null)throw new Error('Το ολοκληρωμένο κτίριο έχει μη έγκυρη κατάσταση.');
    } else {
      const job=s.jobs.find(job=>job.id===structure.jobId);
      if(!job||job.kind!=='build'||job.type!==structure.type||job.regionId!==structure.regionId||job.structureId!==structure.id||
        job.x!==structure.x||job.z!==structure.z||!finite(job.rotation)||Math.abs(normalizedRotation(job.rotation)-structure.rotation)>EPS||
        job.targetLevel!==structure.level+1||(structure.status==='building'&&structure.level!==0)||(structure.status==='upgrading'&&structure.level<1))throw new Error('Το εργοτάξιο δεν αντιστοιχεί στο έργο κατασκευής.');
    }
    const total=totals[structure.regionId];
    total[structure.type]=(total[structure.type]||0)+structure.level;
    structure.variant=Number.isInteger(structure.variant)&&structure.variant>=0&&structure.variant<1000?structure.variant:0;
  }
  for(const structure of s.structures) {
    const result=validatePlacement(s,structure,{allowForeign:true,ignoreId:structure.id,ignoreUnits:true});
    if(!result.ok)throw new Error('Το αποθηκευμένο οικόπεδο δεν είναι έγκυρο: '+result.message);
    structure.baseY=result.placement.baseY;structure.terrainMin=result.placement.terrainMin;
  }
  for(const region of REGIONS)for(const type of Object.keys(BUILD_FOOTPRINTS)) {
    const total=totals[region.id][type]||0;
    if(total!==(s.regions[region.id].buildings[type]||0))throw new Error('Οι βαθμίδες των κτιρίων δεν συμφωνούν με την πρόοδο του φέουδου.');
    const pending=s.jobs.filter(job=>job.kind==='build'&&job.type===type&&job.regionId===region.id);
    if(total+pending.length>BUILDINGS[type].max||pending.length>1)throw new Error('Το αρχείο περιέχει διπλό ή υπερβολικό έργο.');
  }
  for(const job of s.jobs)if(job.kind==='build'&&has(BUILD_FOOTPRINTS,job.type)&&!s.structures.some(structure=>structure.id===job.structureId&&structure.jobId===job.id))throw new Error('Ένα έργο δεν έχει αποθηκευμένο οικόπεδο.');
}

function newCampaign() {
  const regions = Object.fromEntries(REGIONS.map(r => [r.id, {
    id:r.id, owner:r.owner, fortHp:r.fortHp, maxFortHp:r.fortHp,
    level:1, buildings:{}, capture:0, captureOwner:null, attackClock:1.5,
    breached:false, lastAttack:-1000
  }]));
  Object.assign(regions.home.buildings, {houses:2,barracks:1,archery:1,stable:1,siege:1,well:1});
  Object.assign(regions.farmland.buildings, {houses:1,farm:1,granary:1,market:1});
  Object.assign(regions.quarry.buildings, {quarry:1,mine:1});
  for (const r of REGIONS.filter(r => ['red','gold'].includes(r.owner))) {
    Object.assign(regions[r.id].buildings, {barracks:1,archery:1});
    if (r.kind === 'castle') Object.assign(regions[r.id].buildings, {stable:1,siege:1,houses:2,market:1});
  }
  const nodes = RESOURCE_NODES.map(n => ({...n,workers:0}));
  const assignments = {'oak-west':5,'oak-home':3,'home-grain':4,'wheat-south':6,'chalk-pit':5,'home-iron':3,'iron-south':2};
  for (const n of nodes) n.workers = assignments[n.id] || 0;
  return {
    schema:1, t:0, day:1, paused:false, speed:1, era:0,
    resources:{money:620,food:680,wood:640,stone:430,iron:180},
    population:78, housing:96, morale:73, prosperity:34,
    workforce:39, availableWorkers:11, busyWorkers:0, assignedWorkers:28,
    armyCapacity:66, armyUsed:0, income:0, upkeep:0, foodBalance:0,
    regions, nodes, squads:[], jobs:[], techs:Object.fromEntries(Object.keys(TECHS).map(k=>[k,0])),
    effects:[], log:[],
    missions:[
      {id:'supply',title:'Η γη μάς θρέφει',description:'Συγκέντρωσε 350 πόρους με τους εργάτες σου.',progress:0,target:350,done:false,reward:{money:90,wood:50}},
      {id:'settlement',title:'Στέγη και φροντίδα',description:'Ολοκλήρωσε δύο έργα για τους οικισμούς.',progress:0,target:2,done:false,reward:{money:120,stone:70}},
      {id:'recruits',title:'Στρατός με συνοδεία',description:'Εκπαίδευσε δύο νέα αποσπάσματα.',progress:0,target:2,done:false,reward:{money:90,iron:45}},
      {id:'frontier',title:'Άνοιξε τη μεθόριο',description:'Διάρρηξε ένα οχυρό και κατέλαβέ το με πεζικό.',progress:0,target:1,done:false,reward:{money:180,food:100}},
      {id:'engineering',title:'Η τέχνη της πολιορκίας',description:'Ολοκλήρωσε τη Μηχανική αντιβάρου.',progress:0,target:1,done:false,reward:{wood:140,stone:100}},
      {id:'prosperity',title:'Ένας τόπος για τους ανθρώπους',description:'Ανέβασε την ευημερία στο 65 με στέγη, νερό και επάρκεια τροφίμων.',progress:34,target:65,done:false,reward:{money:200}},
      {id:'unite',title:'Ένωσε τα εννέα φέουδα',description:'Κράτησε και τις εννέα περιοχές, με ευημερία τουλάχιστον 65.',progress:3,target:9,done:false,reward:{}}
    ],
    stats:{gathered:0,trained:0,captured:0,kills:0,lost:0,built:0,casualties:0,enemyCasualties:0,breached:0},
    ai:{nextRaid:240,truce:{red:0,gold:0},warning:null,queues:[],
      factions:{red:{nextRaid:240,nextRecruit:125,treasury:180,raid:0,warned:false},
        gold:{nextRaid:395,nextRecruit:165,treasury:200,raid:0,warned:false}}},
    outcome:null, nextId:0, growth:0, lastHungerNotice:-1000,
    lastWageNotice:-1000, startedAt:null, lastSavedAt:null
  };
}

export function createGame({storage, now=()=>Date.now()}={}) {
  let state = newCampaign();
  let listeners = new Set();
  let noticeElapsed = 0, saveElapsed = 0, economyElapsed = 0, missionsElapsed = 0;
  let dirty = true, loaded = false, storageError = null;
  const getNow = () => typeof now === 'function' ? now() : Date.now();
  const uid = prefix => `${prefix}-${++state.nextId}`;
  const ownedRegions = owner => REGIONS.filter(r=>state.regions[r.id].owner===owner);
  const buildingTotal = (type,owner='player') => ownedRegions(owner).reduce((sum,r)=>sum+(state.regions[r.id].buildings[type]||0),0);
  const unitCount = owner => state.squads.filter(s=>s.owner===owner && s.hp>0).length;
  const techLevel = (type,owner='player') => owner==='player' ? (state.techs[type]||0) : 0;
  const isTruce = faction => ['red','gold'].includes(faction) && state.ai.truce[faction] > state.t;
  const hostile = (a,b) => a!==b && (a==='player' || b==='player' || a==='neutral' || b==='neutral') &&
    (!(a==='player'||b==='player') || !isTruce(a==='player'?b:a));
  const notify = () => {dirty=false; for (const fn of [...listeners]) {try {fn(state);} catch { /* UI listeners cannot stop a battle. */ }} };
  function log(type,title,text='') {
    state.log.unshift({id:uid('log'),t:state.t,type,title,text});
    if(state.log.length>90) state.log.length=90;
    dirty=true;
  }
  function effect(type,x,z,tx,tz,extra={}) {
    const e={id:uid('fx'),type,x,z,tx:tx??x,tz:tz??z,age:0,life:.65,...extra};
    state.effects.push(e);
    if(state.effects.length>180) {
      const cosmetic=state.effects.findIndex(f=>!f.damage);
      if(cosmetic>=0) state.effects.splice(cosmetic,1);
    }
    return e;
  }
  function bank(p) {return p.x < riverX(p.z) ? -1 : 1;}
  function onBridge(p) {return BRIDGES.some(b=>Math.abs(p.z-b.z)<=2.8 && Math.abs(p.x-b.x)<=17);}
  function inBounds(p) {return finite(p.x)&&finite(p.z)&&p.x>=MAP.minX+3&&p.x<=MAP.maxX-3&&p.z>=MAP.minZ+3&&p.z<=MAP.maxZ-3;}
  function terrainWalkable(p) {return terrainPointWalkable(p,navigationOptions(0));}
  function walkable(p,unit=.65) {return isWorldPointWalkable(state,p,unit);}
  function squadWalkable(s,p) {return walkable(p,s);}
  function clearSegment(a,b,unit=.65) {return isWorldSegmentWalkable(state,a,b,unit);}
  function nearestGround(p,unit=.65) {
    if(!finite(p?.x)||!finite(p?.z))return null;
    const options=navigationOptions(unit),obstacles=worldObstacles(state),test=q=>pointWalkable(q,options,obstacles);
    const margin=4+options.terrainRadius,start={x:clamp(p.x,MAP.minX+margin,MAP.maxX-margin),z:clamp(p.z,MAP.minZ+margin,MAP.maxZ-margin)};
    if(test(start))return start;
    for(let radius=.8;radius<=90;radius+=1.2)for(let i=0;i<32;i++) {
      const angle=i*Math.PI/16,q={x:start.x+Math.cos(angle)*radius,z:start.z+Math.sin(angle)*radius};
      if(test(q))return q;
    }
    return null;
  }
  function nearestReachableGround(start,p,unit=.65) {
    const first=nearestGround(p,unit);
    if(first&&findPath(start,first,unit))return first;
    for(let radius=3;radius<=75;radius+=3)for(let i=0;i<24;i++) {
      const angle=i*Math.PI/12,q={x:p.x+Math.cos(angle)*radius,z:p.z+Math.sin(angle)*radius};
      if(walkable(q,unit)&&findPath(start,q,unit))return q;
    }
    return {x:start.x,z:start.z};
  }
  // A* on dry ground includes the two bridge decks. Segment smoothing retains
  // the actual safe crossing, so soldiers cannot shortcut through the river.
  function findPath(start,end,unit=.65) {
    const options=navigationOptions(unit),obstacles=worldObstacles(state);
    const isOpen=p=>pointWalkable(p,options,obstacles),isClear=(a,b)=>segmentWalkable(a,b,options,obstacles);
    if(!isOpen(start)||!isOpen(end))return null;
    if(isClear(start,end))return [{...end}];
    const nx=Math.floor((MAP.maxX-MAP.minX-8)/GRID)+1;
    const nz=Math.floor((MAP.maxZ-MAP.minZ-8)/GRID)+1;
    const x0=MAP.minX+4,z0=MAP.minZ+4;
    const point=i=>{
      let z=z0+Math.floor(i/nx)*GRID;
      const bridge=BRIDGES.find(bridge=>Math.abs(z-bridge.z)<=GRID/2);
      if(bridge)z=bridge.z;
      let p={x:x0+(i%nx)*GRID,z};
      // A 4.5 m gate must remain a graph portal even when the regular grid
      // does not happen to have a sample down its centre.
      if(options.radius<2)for(const r of REGIONS) {
        if(state.regions[r.id].fortHp/state.regions[r.id].maxFortHp>.16)continue;
        const [a,b]=[FORT_POLYGONS[r.id][2],FORT_POLYGONS[r.id][3]],dx=b.x-a.x,dz=b.z-a.z,length=Math.hypot(dx,dz);
        const cx=(a.x+b.x)/2,cz=(a.z+b.z)/2,tangent=((p.x-cx)*dx+(p.z-cz)*dz)/length;
        const normal=(-(p.x-cx)*dz+(p.z-cz)*dx)/length;
        if(Math.abs(tangent)<=GRID/2&&Math.abs(normal)<=GRID*1.8){p={x:p.x-tangent*dx/length,z:p.z-tangent*dz/length};break;}
      }
      return p;
    };
    function closestIndex(p) {
      const gx=Math.round((p.x-x0)/GRID),gz=Math.round((p.z-z0)/GRID);
      let best=-1,score=Infinity;
      for(let dz=-3;dz<=3;dz++) for(let dx=-3;dx<=3;dx++) {
        const x=gx+dx,z=gz+dz;
        if(x<0||z<0||x>=nx||z>=nz) continue;
        const i=z*nx+x,q=point(i),d=dist(p,q);
        if(d<score && isOpen(q)&&isClear(p,q)) {best=i;score=d;}
      }
      return best;
    }
    const first=closestIndex(start),last=closestIndex(end);
    if(first<0||last<0) return null;
    const total=nx*nz,g=new Float64Array(total);g.fill(Infinity);
    const parent=new Int32Array(total);parent.fill(-1);
    const closed=new Uint8Array(total),valid=new Int8Array(total);valid.fill(-1);
    const heap=[];
    function push(i,f) {
      let n=heap.length;heap.push({i,f});
      while(n>0) {const p=(n-1)>>1;if(heap[p].f<=f)break;heap[n]=heap[p];n=p;}
      heap[n]={i,f};
    }
    function pop() {
      const out=heap[0],tail=heap.pop();
      if(heap.length) {let i=0;heap[0]=tail;
        while(true) {let child=i*2+1;if(child>=heap.length)break;if(child+1<heap.length&&heap[child+1].f<heap[child].f)child++;
          if(heap[i].f<=heap[child].f)break;[heap[i],heap[child]]=[heap[child],heap[i]];i=child;}}
      return out.i;
    }
    const goal=point(last);g[first]=0;push(first,dist(point(first),goal));
    let found=false;
    while(heap.length) {
      const cur=pop();if(closed[cur])continue;closed[cur]=1;
      if(cur===last){found=true;break;}
      const cx=cur%nx,cz=Math.floor(cur/nx),a=point(cur);
      for(let dz=-1;dz<=1;dz++) for(let dx=-1;dx<=1;dx++) {
        if(!dx&&!dz)continue;
        const x=cx+dx,z=cz+dz;if(x<0||z<0||x>=nx||z>=nz)continue;
        const next=z*nx+x;if(closed[next])continue;
        const b=point(next);
        if(valid[next]===-1) valid[next]=isOpen(b)?1:0;
        if(!valid[next]||!isClear(a,b))continue;
        const cost=g[cur]+(dx&&dz?GRID*Math.SQRT2:GRID);
        if(cost<g[next]){g[next]=cost;parent[next]=cur;push(next,cost+dist(b,goal));}
      }
    }
    if(!found)return null;
    const route=[];for(let at=last;at!==-1;at=parent[at])route.push(point(at));route.reverse();route.push({...end});
    const smooth=[];let from=start,index=0;
    while(index<route.length) {
      let best=index;
      for(let j=index+1;j<route.length;j++) {if(isClear(from,route[j]))best=j;}
      smooth.push(route[best]);from=route[best];index=best+1;
    }
    return smooth;
  }
  function fortAim(r,s) {
    let best=null,distance=Infinity;
    for(const shape of FORT_SOLIDS[r.id]) {
      if(!['wall','gate','tower'].includes(shape.part))continue;
      let p;
      if(shape.radius!==undefined) {
        const dx=s.x-shape.x,dz=s.z-shape.z,d=Math.hypot(dx,dz)||1;
        p={x:shape.x+dx/d*shape.radius,z:shape.z+dz/d*shape.radius};
      } else {
        const local=localPoint(s,shape),x=clamp(local.x,-shape.width/2,shape.width/2),z=clamp(local.z,-shape.depth/2,shape.depth/2);
        const c=Math.cos(shape.rotation||0),sn=Math.sin(shape.rotation||0);
        p={x:shape.x+x*c+z*sn,z:shape.z-x*sn+z*c};
      }
      const d=dist(s,p);if(d<distance){best=p;distance=d;}
    }
    return best||{x:r.x,z:r.z};
  }
  const gatePoint=r=>{
    const a=FORT_POLYGONS[r.id][2],b=FORT_POLYGONS[r.id][3],dx=b.x-a.x,dz=b.z-a.z,length=Math.hypot(dx,dz),offset=r.kind==='castle'?9:6;
    return {x:(a.x+b.x)/2+dz/length*offset,z:(a.z+b.z)/2-dx/length*offset};
  };
  function standOff(r,s,range) {
    const aim=fortAim(r,s),dx=s.x-aim.x,dz=s.z-aim.z,d=Math.hypot(dx,dz)||1;
    const clearance=Math.max(UNIT_CLEARANCE[s.type]+.3,range*.8);
    return nearestGround({x:aim.x+dx/d*clearance,z:aim.z+dz/d*clearance},s);
  }
  function homeFor(owner,from=null) {
    const regions=ownedRegions(owner);
    return regions.sort((a,b)=>(a.kind==='castle'?-70:0)+(from?dist(a,from):0)-(b.kind==='castle'?-70:0)-(from?dist(b,from):0))[0]||null;
  }
  function spawn(owner,type,regionId,index=0) {
    const r=REGION_BY_ID[regionId],def=UNIT_TYPES[type];
    if(!r||!def||state.squads.length>=MAX_SQUADS) return null;
    const angle=(owner==='player'?-.35:Math.PI-.4)+index*.65;
    const radius=(r.kind==='castle'?32:r.kind==='town'?24:21)+Math.floor(index/6)*9;
    let p=nearestGround({x:r.x+Math.cos(angle)*radius,z:r.z+Math.sin(angle)*radius},type);
    if(!p)return null;
    for(let turn=0;turn<12 && state.squads.some(s=>dist(s,p)<5);turn++) p=nearestGround({x:p.x+Math.cos(turn*1.6)*5,z:p.z+Math.sin(turn*1.6)*5},type)||p;
    const hp=def.hp*(1+techLevel('steel',owner)*.05);
    const s={id:uid('squad'),owner,type,x:p.x,z:p.z,hp,maxHp:hp,men:def.men,
      order:{type:'hold',x:p.x,z:p.z},stance:owner==='player'?'defensive':'aggressive',formation:'line',attackClock:.25+index*.18,lastAttack:-1000,
      path:[],heading:owner==='player'?Math.PI/2:-Math.PI/2,activity:'idle',engagedId:null,
      anchor:{...p},repathAt:0,charge:0,lastDamage:-1000,homeRegion:regionId};
    state.squads.push(s);dirty=true;return s;
  }
  function initializeArmies() {
    ['spear','spear','sword','archer','archer','cavalry','ram'].forEach((type,i)=>spawn('player',type,'home',i));
    for(const r of REGIONS) {
      if(r.owner==='neutral') {spawn('neutral','spear',r.id,0);continue;}
      if(r.owner==='player')continue;
      const types=r.kind==='castle'?['spear','archer','sword']:['spear','archer'];
      types.forEach((type,i)=>spawn(r.owner,type,r.id,i));
    }
  }
  function recomputeEconomy() {
    const ours=ownedRegions('player'),rs=state.resources;
    state.housing=60+buildingTotal('houses')*12+Math.max(0,ours.length-3)*5;
    state.workforce=Math.floor(state.population*.5);
    state.assignedWorkers=state.nodes.reduce((sum,n)=>sum+n.workers,0);
    state.busyWorkers=state.jobs.reduce((sum,j)=>sum+(j.workers||0),0);
    state.availableWorkers=Math.max(0,state.workforce-state.assignedWorkers-state.busyWorkers);
    state.armyCapacity=52+buildingTotal('barracks')*14+techLevel('logistics')*18+Math.max(0,ours.length-3)*5;
    state.armyUsed=state.squads.filter(player).reduce((sum,s)=>sum+UNIT_TYPES[s.type].men,0)+state.jobs.filter(j=>j.kind==='train').reduce((sum,j)=>sum+UNIT_TYPES[j.type].men,0);
    state.income=(ours.length*.17+state.population*.012*(.5+state.morale/200))*(1+buildingTotal('market')*.14);
    state.upkeep=state.squads.filter(player).reduce((sum,s)=>sum+UNIT_TYPES[s.type].men*.012+(UNIT_TYPES[s.type].role==='siege'?.025:0),0)*(1-techLevel('logistics')*.08);
    state.gatherRates={food:0,wood:0,stone:0,iron:0};
    for(const n of state.nodes) {
      const production=nodeProductionRates(state,n);
      if(production.active)state.gatherRates[n.type]+=production.totalPerSecond;
    }
    state.foodConsumption=state.population*.0035+state.squads.filter(player).reduce((sum,s)=>sum+UNIT_TYPES[s.type].men*.0045,0);
    state.foodBalance=state.gatherRates.food+buildingTotal('farm')*.06-state.foodConsumption;
    state.era=ours.length>=7 && techLevel('engineering')>0 ? 2 : ours.length>=4||state.prosperity>=55 ? 1 : 0;
    if(rs.food<0)rs.food=0;
  }
  function costAt(base,level=0) {
    return Object.fromEntries(Object.entries(base||{}).map(([key,value])=>[key,Math.ceil(value*(1+.45*level))]));
  }
  function missingCost(cost) {
    for(const [key,amount] of Object.entries(cost)) if(state.resources[key]+EPS<amount) return `Χρειάζονται ακόμη ${Math.ceil(amount-state.resources[key])} ${RESOURCE_LABELS[key]}.`;
    return null;
  }
  function pay(cost) {for(const [key,amount] of Object.entries(cost))state.resources[key]=Math.max(0,state.resources[key]-amount);}
  function grant(reward) {for(const [key,amount] of Object.entries(reward))state.resources[key]+=amount;}
  function cancelTruce(faction) {
    if(!isTruce(faction))return;
    state.ai.truce[faction]=0;
    const a=state.ai.factions[faction];if(a){a.nextRaid=Math.min(a.nextRaid,state.t+55);a.warned=false;}
    log('war','Η ανακωχή έληξε',`Η νέα επίθεση ακυρώνει τη συμφωνία με την αντίπαλη ηγεμονία (${FACTIONS[faction].shortName}).`);
  }
  function selectedSquads(ids) {
    if(!Array.isArray(ids)||!ids.length||ids.length>80) return {error:'Επίλεξε πρώτα ένα δικό σου απόσπασμα.'};
    const unique=[...new Set(ids)];
    const squads=unique.map(id=>state.squads.find(s=>s.id===id&&player(s)));
    if(squads.some(s=>!s))return {error:'Μπορείς να διατάξεις μόνο ζωντανά δικά σου αποσπάσματα.'};
    return {squads};
  }
  function frontier(regionId,owner='player') {
    const r=REGION_BY_ID[regionId];
    return r && r.neighbors.some(id=>state.regions[id]?.owner===owner);
  }
  function validateCommand(action,payload={}) {
    if(!payload||typeof payload!=='object'||Array.isArray(payload))return fail('Μη έγκυρη εντολή.');
    if(state.outcome)return fail('Η εκστρατεία ολοκληρώθηκε. Ξεκίνα νέα εκστρατεία για να συνεχίσεις.');
    recomputeEconomy();
    if(action==='assignWorkers') {
      const n=state.nodes.find(n=>n.id===payload.nodeId),delta=payload.delta;
      if(!n)return fail('Δεν βρέθηκε αυτή η πηγή πόρων.');
      if(state.regions[n.regionId].owner!=='player')return fail('Κατάλαβε πρώτα την περιοχή αυτής της πηγής.');
      if(!Number.isInteger(delta)||delta===0||Math.abs(delta)>MAX_WORKERS_PER_NODE)return fail('Διάλεξε έγκυρο αριθμό εργατών.');
      if(n.workers+delta<0)return fail('Δεν υπάρχουν τόσοι εργάτες σε αυτή την πηγή.');
      if(n.workers+delta>MAX_WORKERS_PER_NODE)return fail(`Η πηγή χωρά έως ${MAX_WORKERS_PER_NODE} εργάτες.`);
      if(delta>0&&n.amount<=0)return fail('Αυτή η πηγή έχει εξαντληθεί.');
      if(delta>state.availableWorkers)return fail('Δεν υπάρχουν αρκετοί διαθέσιμοι εργάτες. Μετακίνησε εργάτες από άλλη πηγή ή χτίσε κατοικίες.');
      return {ok:true,node:n,delta};
    }
    if(action==='train'||action==='build'||action==='repair') {
      const r=has(REGION_BY_ID,payload.regionId)?state.regions[payload.regionId]:null;
      if(!r||r.owner!=='player')return fail('Επίλεξε μια περιοχή που ελέγχεις.');
      if(state.jobs.length>=MAX_JOBS)return fail('Ολοκλήρωσε πρώτα κάποια από τα υπάρχοντα έργα.');
      if(action==='train') {
        const def=has(UNIT_TYPES,payload.type)?UNIT_TYPES[payload.type]:null;
        if(!def)return fail('Δεν υπάρχει αυτός ο τύπος στρατεύματος.');
        if(!r.buildings[def.requires])return fail(`Χρειάζεται ${BUILDINGS[def.requires]?.name||def.requires} στην περιοχή.`);
        if(def.tech&&!state.techs[def.tech])return fail(`Ερεύνησε πρώτα ${TECHS[def.tech].name}.`);
        if(state.armyUsed+def.men>state.armyCapacity)return fail('Ο στρατός έφτασε τη χωρητικότητά του. Χτίσε στρατώνα ή ερεύνησε Δρόμους εφοδιασμού.');
        if(state.squads.length+state.jobs.filter(j=>j.kind==='train').length>=MAX_SQUADS)return fail('Ο χάρτης έφτασε το όριο αποσπασμάτων.');
        if(state.jobs.filter(j=>j.kind==='train'&&j.regionId===r.id).length>=4)return fail('Η ουρά εκπαίδευσης αυτής της περιοχής είναι γεμάτη.');
        const cost={...def.cost},missing=missingCost(cost);if(missing)return fail(missing);
        return {ok:true,r,def,cost,duration:def.trainTime/(1+.15*techLevel('logistics')+.08*(r.buildings[def.requires]-1)),workers:0};
      }
      if(action==='repair') {
        const amount=r.maxFortHp-r.fortHp;
        if(amount<1)return fail('Τα τείχη βρίσκονται ήδη σε καλή κατάσταση.');
        if(state.jobs.some(j=>j.type==='repair'&&j.regionId===r.id))return fail('Τα τείχη επισκευάζονται ήδη.');
        if(state.availableWorkers<4)return fail('Χρειάζονται 4 διαθέσιμοι εργάτες για τα τείχη.');
        const cost={money:Math.ceil(amount*.055),wood:Math.ceil(amount*.025),stone:Math.ceil(amount*.075)};
        const missing=missingCost(cost);if(missing)return fail(missing);
        return {ok:true,r,cost,duration:25+amount*.035,workers:4,repairAmount:amount};
      }
      const def=has(BUILDINGS,payload.type)?BUILDINGS[payload.type]:null;if(!def)return fail('Δεν υπάρχει αυτό το κτίσμα.');
      const level=r.buildings[payload.type]||0;
      if(level>=def.max)return fail('Το κτίσμα έχει φτάσει στη μέγιστη βαθμίδα.');
      if(state.jobs.some(j=>j.kind==='build'&&j.type===payload.type&&j.regionId===r.id))return fail('Αυτό το έργο βρίσκεται ήδη σε εξέλιξη.');
      if(state.jobs.filter(j=>j.kind==='build'&&j.regionId===r.id).length>=2)return fail('Η περιοχή εκτελεί ήδη δύο έργα.');
      if(state.availableWorkers<4)return fail('Χρειάζονται 4 διαθέσιμοι εργάτες. Μείωσε προσωρινά την εξόρυξη ή τη συγκομιδή.');
      const cost=costAt(def.cost,level),missing=missingCost(cost);if(missing)return fail(missing);
      const base={ok:true,r,def,cost,duration:def.time*(1+.2*level),workers:4};
      if(payload.type==='walls')return {...base,requiresPlacement:false};
      if(payload.structureId!==undefined) {
        const structure=state.structures.find(s=>s.id===payload.structureId);
        if(!structure||structure.regionId!==r.id||structure.type!==payload.type)return fail('Δεν βρέθηκε το συγκεκριμένο κτίριο σε αυτό το φέουδο.');
        if(structure.status!=='ready')return fail('Το συγκεκριμένο κτίριο έχει ήδη ενεργό εργοτάξιο.');
        if((payload.x!==undefined&&payload.x!==structure.x)||(payload.z!==undefined&&payload.z!==structure.z)||(payload.rotation!==undefined&&(!finite(payload.rotation)||Math.abs(normalizedRotation(payload.rotation)-structure.rotation)>EPS)))return fail('Η αναβάθμιση γίνεται στην υπάρχουσα θέση. Δεν μετακινεί το κτίριο.');
        return {...base,structure,targetLevel:structure.level+1,placement:placementGeometry(structure.type,structure.x,structure.z,structure.rotation),requiresPlacement:false};
      }
      if(payload.x===undefined&&payload.z===undefined)return {...base,requiresPlacement:true};
      const check=validatePlacement(state,payload);if(!check.ok)return check;
      return {...base,placement:check.placement,targetLevel:1,requiresPlacement:false};
    }
    if(action==='research') {
      const def=has(TECHS,payload.type)?TECHS[payload.type]:null;if(!def)return fail('Δεν υπάρχει αυτή η έρευνα.');
      const level=state.techs[payload.type]||0;
      if(level>=def.max)return fail('Η έρευνα έχει ολοκληρωθεί στη μέγιστη βαθμίδα.');
      if(state.jobs.some(j=>j.kind==='research'))return fail('Οι τεχνίτες εκτελούν ήδη μία έρευνα.');
      if(state.availableWorkers<2)return fail('Χρειάζονται 2 διαθέσιμοι τεχνίτες για την έρευνα.');
      const cost=costAt(def.cost,level),missing=missingCost(cost);if(missing)return fail(missing);
      return {ok:true,def,cost,duration:def.time*(1+.2*level),workers:2};
    }
    if(action==='order'||action==='formation'||action==='stance') {
      const selected=selectedSquads(payload.ids);if(selected.error)return fail(selected.error);
      const squads=selected.squads;
      if(action==='formation')return FORMATIONS.includes(payload.formation)?{ok:true,squads}:fail('Διάλεξε γραμμή, φάλαγγα ή σφήνα.');
      if(action==='stance')return STANCES.includes(payload.stance)?{ok:true,squads}:fail('Διάλεξε αμυντική ή επιθετική στάση.');
      if(!ORDER_TYPES.includes(payload.type))return fail('Η τακτική εντολή δεν αναγνωρίζεται.');
      const {type}=payload;
      let region=null,target=null,point=null;
      if(payload.regionId&&has(REGION_BY_ID,payload.regionId))region=REGION_BY_ID[payload.regionId];
      if(payload.targetId) {
        if(has(REGION_BY_ID,payload.targetId))region=REGION_BY_ID[payload.targetId];
        else target=state.squads.find(s=>s.id===payload.targetId&&s.hp>0);
      }
      if((payload.regionId&&!region)||(payload.targetId&&!region&&!target))return fail('Ο στόχος δεν υπάρχει πια.');
      if(type==='capture') {
        if(!region)return fail('Επίλεξε το οχυρό που θέλεις να καταλάβεις.');
        if(state.regions[region.id].owner==='player')return fail('Αυτή η περιοχή είναι ήδη δική σου.');
        if(!frontier(region.id))return fail('Η περιοχή πρέπει να συνορεύει με ένα δικό σου φέουδο.');
        if(!squads.some(infantry))return fail('Χρειάζονται δορυφόροι ή ξιφομάχοι για κατάληψη. Οι μηχανές γκρεμίζουν τα τείχη.');
      }
      if(type==='attack') {
        if(!target&&!region)return fail('Επίλεξε εχθρικό απόσπασμα ή οχυρό.');
        if((target?.owner||state.regions[region.id]?.owner)==='player')return fail('Δεν μπορείς να επιτεθείς στις δικές σου δυνάμεις.');
      }
      if(type==='move'||type==='attackMove') {
        point={x:payload.x,z:payload.z};
        if(!inBounds(point))return fail('Επίλεξε σημείο μέσα στον χάρτη.');
        if(!terrainWalkable(point))return fail('Το ποτάμι διασχίζεται μόνο από τις δύο γέφυρες. Διάλεξε στεριά.');
        if(!walkable(point))return fail('Το σημείο καταλαμβάνεται από κτίριο, εργοτάξιο ή τείχος. Διάλεξε ελεύθερο έδαφος.');
      }
      if(type==='hold' && (payload.x!==undefined||payload.z!==undefined)) {
        point={x:payload.x,z:payload.z};if(!walkable(point))return fail('Επίλεξε προσβάσιμο σημείο για την άμυνα.');
      }
      if(type==='hold'&&region) {
        if(state.regions[region.id].owner!=='player')return fail('Μπορείς να υπερασπιστείς ένα δικό σου οχυρό.');
        point=gatePoint(region);
      }
      if(type==='retreat') {
        region=region||homeFor('player',squads[0]);
        if(!region||state.regions[region.id].owner!=='player')return fail('Δεν υπάρχει φιλικό φέουδο για υποχώρηση.');
        point=gatePoint(region);
      }
      return {ok:true,squads,region,target,point};
    }
    if(action==='trade') {
      const {resource,type,amount}=payload;
      if(!has(PRICES,resource)||!['buy','sell'].includes(type)||!Number.isInteger(amount)||amount<1||amount>1000)return fail('Διάλεξε πόρο και ποσότητα από 1 έως 1.000.');
      if(!buildingTotal('market'))return fail('Χτίσε αγορά σε ένα φέουδό σου για εμπόριο.');
      const price=rounded(PRICES[resource][type]*amount);
      if(type==='buy'&&state.resources.money+EPS<price)return fail(`Χρειάζεσαι ${Math.ceil(price)} CY£ για αυτή την αγορά.`);
      if(type==='sell'&&state.resources[resource]+EPS<amount)return fail('Δεν διαθέτεις αρκετό απόθεμα για αυτή την πώληση.');
      return {ok:true,price};
    }
    if(action==='truce') {
      const faction=payload.faction;
      if(!['red','gold'].includes(faction))return fail('Επίλεξε μία από τις δύο αντίπαλες ηγεμονίες.');
      if(!ownedRegions(faction).length)return fail('Αυτή η ηγεμονία δεν ελέγχει πια εδάφη.');
      if(isTruce(faction))return fail('Η ανακωχή βρίσκεται ήδη σε ισχύ.');
      const cost={money:180+ownedRegions(faction).length*35};
      const missing=missingCost(cost);if(missing)return fail(missing);
      return {ok:true,cost};
    }
    return fail('Η εντολή δεν αναγνωρίζεται.');
  }
  function groupOffset(index,count,formation,heading) {
    const width=Math.ceil(Math.sqrt(count)),row=Math.floor(index/width),col=index%width;
    let x=0,z=0;
    if(formation==='column'){x=((index%2)-.5)*5.5;z=Math.floor(index/2)*7;}
    else if(formation==='wedge'){x=(index%2?1:-1)*Math.ceil(index/2)*5;z=Math.ceil(index/2)*5;}
    else{x=(col-(Math.min(width,count)-1)/2)*7;z=row*7;}
    return {x:x*Math.cos(heading)-z*Math.sin(heading),z:x*Math.sin(heading)+z*Math.cos(heading)};
  }
  function prepareOrders(v,payload) {
    const prepared=[];
    const centre=v.squads.reduce((p,s)=>({x:p.x+s.x/v.squads.length,z:p.z+s.z/v.squads.length}),{x:0,z:0});
    const target=v.point||v.target||v.region||centre;
    const heading=Math.atan2(target.z-centre.z,target.x-centre.x)-Math.PI/2;
    for(let i=0;i<v.squads.length;i++) {
      const s=v.squads[i],def=UNIT_TYPES[s.type],offset=groupOffset(i,v.squads.length,s.formation,heading);
      let destination;
      if(v.point) {
        const bridge=BRIDGES.find(b=>Math.abs(v.point.z-b.z)<4&&Math.abs(v.point.x-b.x)<18);
        // A group ordered onto the bridge forms a column along the span.
        destination=nearestGround(bridge?{x:v.point.x+(i-(v.squads.length-1)/2)*5,z:bridge.z}:{x:v.point.x+offset.x,z:v.point.z+offset.z},s);
      }
      else if(v.target)destination=nearestGround(v.target,s);
      else if(v.region)destination=state.regions[v.region.id].fortHp>0?standOff(v.region,s,def.range):nearestGround(gatePoint(v.region),s);
      else destination={x:s.x,z:s.z};
      if(!destination)return fail('Δεν βρέθηκε προσβάσιμο σημείο για το απόσπασμα.');
      const path=findPath(s,destination,s);
      if(!path)return fail('Η διαδρομή είναι αποκλεισμένη. Διάλεξε διαφορετικό σημείο προσέγγισης.');
      prepared.push({s,path,destination});
    }
    return {ok:true,prepared};
  }
  function issueOrder(s,type,{point,region,target,path}={}) {
    s.order={type,...(region?{regionId:region.id,targetId:region.id}:{}),...(target?{targetId:target.id}:{}),...(point?{x:point.x,z:point.z}:{})};
    s.path=path||[];s.engagedId=null;s.repathAt=state.t+.7;s.activity=s.path.length?'march':'idle';
    if(type==='hold')s.anchor=point?{...point}:{x:s.x,z:s.z};
  }
  function command(action,payload={}) {
    const v=validateCommand(action,payload);if(!v.ok)return {ok:false,message:v.message};
    if(action==='build'&&v.requiresPlacement)return fail('Διάλεξε πρώτα τη θέση του κτιρίου στον χάρτη και επιβεβαίωσε την κατασκευή.');
    let message='Η εντολή δόθηκε.',details={};
    if(action==='assignWorkers') {
      v.node.workers+=v.delta;
      message=v.delta>0?`${v.delta} εργάτες ανέλαβαν τη συλλογή.`:`${-v.delta} εργάτες επέστρεψαν στη διαθέσιμη ομάδα.`;
    } else if(action==='train'||action==='build'||action==='repair'||action==='research') {
      const type=action==='repair'?'repair':payload.type;
      pay(v.cost);
      const job={id:uid('job'),kind:action==='train'?'train':action==='research'?'research':'build',type,
        label:action==='repair'?'Επισκευή τειχών':v.def.name,
        regionId:v.r?.id||homeFor('player')?.id,remaining:v.duration,duration:v.duration,workers:v.workers,
        cost:v.cost,owner:'player',queuedAt:state.t,...(action==='repair'?{repairAmount:v.repairAmount,applied:0}:{})};
      if(action==='build'&&has(BUILD_FOOTPRINTS,type)) {
        let structure=v.structure;
        if(structure){structure.status='upgrading';structure.jobId=job.id;}
        else {
          const p=v.placement;
          structure={id:uid('structure'),type,regionId:v.r.id,x:p.x,z:p.z,rotation:p.rotation,baseY:p.baseY,terrainMin:p.terrainMin,level:0,status:'building',jobId:job.id,variant:Object.keys(BUILDINGS).indexOf(type)+(v.r.buildings[type]||0)};
          state.structures.push(structure);
        }
        Object.assign(job,{structureId:structure.id,x:structure.x,z:structure.z,rotation:structure.rotation,targetLevel:v.targetLevel});
        refreshRoutesForStructure(structure);
        details.structureId=structure.id;
      }
      state.jobs.push(job);
      details.jobId=job.id;
      message=action==='train'?`${v.def.name}: προστέθηκαν στην ουρά εκπαίδευσης.`:action==='research'?`Ξεκίνησε η έρευνα: ${v.def.name}.`:`Ξεκίνησε το έργο: ${job.label}.`;
      log(action==='train'?'army':'build',job.label,message);
    } else if(action==='order') {
      const prep=prepareOrders(v,payload);if(!prep.ok)return prep;
      const faction=v.target?.owner||(v.region&&state.regions[v.region.id].owner);
      if(['attack','capture'].includes(payload.type))cancelTruce(faction);
      for(const {s,path,destination} of prep.prepared)issueOrder(s,payload.type,{point:destination,region:v.region,target:v.target,path});
      const labels={move:'Κίνηση προς το σημείο',attackMove:'Πορεία με εμπλοκή εχθρών',attack:'Επίθεση στον στόχο',capture:'Πολιορκία και κατάληψη',hold:'Άμυνα θέσης',retreat:'Υποχώρηση σε φιλικό οχυρό'};
      message=`${labels[payload.type]} · ${v.squads.length} αποσπάσματα.`;
    } else if(action==='formation') {
      for(const s of v.squads)s.formation=payload.formation;
      message=`Ο σχηματισμός άλλαξε σε ${payload.formation==='line'?'γραμμή':payload.formation==='column'?'φάλαγγα':'σφήνα'}.`;
    } else if(action==='stance') {
      for(const s of v.squads){s.stance=payload.stance;s.anchor={x:s.x,z:s.z};s.engagedId=null;}
      message=payload.stance==='aggressive'?'Τα αποσπάσματα θα εμπλέκονται και θα καταδιώκουν κοντινούς εχθρούς.':'Τα αποσπάσματα θα κρατούν κοντά την αμυντική τους θέση.';
    } else if(action==='trade') {
      if(payload.type==='buy'){state.resources.money-=v.price;state.resources[payload.resource]+=payload.amount;}
      else{state.resources[payload.resource]-=payload.amount;state.resources.money+=v.price;}
      message=`${payload.type==='buy'?'Αγορά':'Πώληση'} ${payload.amount} ${RESOURCE_LABELS[payload.resource]} · ${v.price} CY£.`;
      log('trade','Συναλλαγή στην αγορά',message);
    } else if(action==='truce') {
      pay(v.cost);state.ai.truce[payload.faction]=state.t+180;
      const a=state.ai.factions[payload.faction];a.nextRaid=Math.max(a.nextRaid,state.t+220);a.warned=false;
      if(state.ai.warning?.faction===payload.faction)state.ai.warning=null;
      for(const s of state.squads) {
        const target=state.squads.find(u=>u.id===s.order.targetId);
        const targetOwner=target?.owner||state.regions[s.order.regionId||s.order.targetId]?.owner;
        if((s.owner===payload.faction&&targetOwner==='player')||(s.owner==='player'&&targetOwner===payload.faction)) {
          if(s.owner==='player')issueOrder(s,'hold',{point:{x:s.x,z:s.z}});
          else {const home=homeFor(s.owner,s),point=home&&nearestGround(gatePoint(home),s);issueOrder(s,'retreat',{point,region:home,path:point?findPath(s,point,s)||[]:[]});}
        }
        s.engagedId=null;
      }
      message=`Ανακωχή 3 λεπτών · ${FACTIONS[payload.faction].shortName}. Δική σου επίθεση την ακυρώνει.`;
      log('diplomacy','Υπογράφηκε ανακωχή',message);
    }
    recomputeEconomy();dirty=true;notify();save();return {ok:true,message,...details};
  }
  function refreshRoutesForStructure(structure) {
    if(!BUILD_FOOTPRINTS[structure.type]?.blocking)return;
    const rect=structureRect(structure);
    for(const s of state.squads) {
      if(s.order.type==='hold'&&s.anchor&&pointInsideRect(s.anchor,rect,UNIT_CLEARANCE[s.type])) {
        const safe=nearestReachableGround(s,s.anchor,s);if(safe){s.anchor={...safe};s.order.x=safe.x;s.order.z=safe.z;}
      }
      if(['move','attackMove','retreat'].includes(s.order.type)&&finite(s.order.x)&&pointInsideRect(s.order,rect,UNIT_CLEARANCE[s.type])) {
        const safe=nearestReachableGround(s,s.order,s);if(safe){s.order.x=safe.x;s.order.z=safe.z;}
      }
      let previous=s,blocked=false;
      for(const point of s.path||[]){if(segmentHitsRect(previous,point,rect,UNIT_CLEARANCE[s.type])){blocked=true;break;}previous=point;}
      if(blocked){s.path=[];s.repathAt=0;}
    }
  }
  function applyUnitDamage(target,amount,owner) {
    if(!target||target.hp<=0||!hostile(owner,target.owner))return;
    const before=target.men;
    target.hp=Math.max(0,target.hp-amount);target.men=target.hp>0?Math.max(1,Math.ceil(UNIT_TYPES[target.type].men*target.hp/target.maxHp)):0;
    target.lastDamage=state.t;
    if(target.owner==='player')state.stats.casualties+=before-target.men;
    else if(owner==='player')state.stats.enemyCasualties+=before-target.men;
    effect('hit',target.x,target.z,undefined,undefined,{life:.42,owner,intensity:amount});
    if(target.hp<=0) {
      if(target.owner==='player'){state.stats.lost++;log('loss','Χάθηκε απόσπασμα',UNIT_TYPES[target.type].name);}
      else if(owner==='player'){state.stats.kills++;dirty=true;}
      target.activity='fallen';target.path=[];
    }
  }
  function applyFortDamage(regionId,amount,owner) {
    const r=state.regions[regionId];
    if(!r||r.fortHp<=0||!hostile(owner,r.owner))return;
    const before=r.fortHp;r.fortHp=Math.max(0,r.fortHp-amount);r.lastAttack=state.t;
    if(r.fortHp===0&&before>0) {
      r.breached=true;dirty=true;
      if(owner==='player')state.stats.breached++;
      log(r.owner==='player'?'warning':'siege',`Ρήγμα στα τείχη · ${REGION_BY_ID[regionId].name}`,'Τα τείχη έπεσαν. Πεζικό πρέπει να κρατήσει την πύλη για να καταλάβει την περιοχή.');
      const p=gatePoint(REGION_BY_ID[regionId]);effect('hit',p.x,p.z,undefined,undefined,{life:2.4,intensity:220,owner});
    }
  }
  function rangeFor(s) {return UNIT_TYPES[s.type].range;}
  // Arrows can clear a wall; a blade or spear cannot strike through a house.
  function contactClear(s,target) {
    const def=UNIT_TYPES[s.type];
    return def.role==='ranged'||s.type==='trebuchet'||isWorldSegmentWalkable(state,s,target,.12);
  }
  function damageFor(s,target,structure=false) {
    const def=UNIT_TYPES[s.type];
    let amount=def.damage*Math.max(.2,s.hp/s.maxHp)*(1+.15*techLevel('steel',s.owner));
    if(s.owner==='player')amount*=.65+state.morale*.005;
    if(s.formation==='column')amount*=.91;
    if(s.formation==='line'&&def.role==='ranged')amount*=1.12;
    if(s.formation==='wedge')amount*=def.role==='cavalry'?1.22:def.role==='infantry'?1.08:.95;
    if(structure) {
      amount*=def.structureBonus;
      if(def.role==='siege')amount*=1+.12*techLevel('engineering',s.owner);
      return amount;
    }
    const other=UNIT_TYPES[target.type];
    amount*=def.bonus?.[target.type]||1;
    // Armor is an amount per strike, not a percentage; steel and a held line help.
    let armor=other.armor+techLevel('steel',target.owner)*2;
    if(target.stance==='defensive'&&target.formation==='line'&&other.role==='infantry')armor+=2;
    if(def.role==='ranged')amount*=clamp(1+(heightAt(s.x,s.z)-heightAt(target.x,target.z))*.018,.82,1.3);
    if(def.role==='cavalry'&&s.charge>=13){amount*=1.4;s.charge=0;}
    if(s.type==='trebuchet'&&dist(s,target)<15)amount*=.28;
    return Math.max(2,amount-armor);
  }
  function launchAttack(s,target,isFort=false) {
    if(s.attackClock>EPS)return;
    const def=UNIT_TYPES[s.type],r=isFort?REGION_BY_ID[target.id]:null,aim=isFort?fortAim(r,s):target;
    if(dist(s,aim)>rangeFor(s)+.45||(!isFort&&!contactClear(s,target)))return;
    s.activity='attack';s.attackClock=def.cooldown;s.lastAttack=state.t;s.heading=Math.atan2(aim.x-s.x,aim.z-s.z);
    const amount=damageFor(s,target,isFort);
    if(def.role==='ranged'||s.type==='trebuchet') {
      effect(s.type==='trebuchet'?'stone':'arrow',s.x,s.z,aim.x,aim.z,{
        life:clamp(dist(s,aim)/(s.type==='trebuchet'?31:65),.23,2.4),owner:s.owner,
        damage:amount,targetId:target.id,targetKind:isFort?'region':'squad',sourceId:s.id
      });
    } else {
      if(isFort){applyFortDamage(target.id,amount,s.owner);effect('hit',aim.x,aim.z,undefined,undefined,{life:.5,owner:s.owner,intensity:amount});}
      else applyUnitDamage(target,amount,s.owner);
    }
  }
  function updateEffects(dt) {
    const impacts=[];
    for(const e of state.effects) {
      e.age+=dt;
      if(e.damage&&e.targetKind==='squad') {
        const target=state.squads.find(s=>s.id===e.targetId&&s.hp>0);
        if(target){e.tx=target.x;e.tz=target.z;}
      }
      if(e.age>=e.life&&e.damage)impacts.push(e);
    }
    state.effects=state.effects.filter(e=>e.age<e.life);
    for(const e of impacts) {
      if(e.targetKind==='region')applyFortDamage(e.targetId,e.damage,e.owner);
      else applyUnitDamage(state.squads.find(s=>s.id===e.targetId),e.damage,e.owner);
      if(e.type==='stone')effect('hit',e.tx,e.tz,undefined,undefined,{life:1.1,owner:e.owner,intensity:e.damage});
    }
  }
  function moveAlong(s,dt) {
    if(!s.path?.length){s.activity='idle';return false;}
    const def=UNIT_TYPES[s.type];
    let speed=def.speed*(s.formation==='column'?1.15:s.formation==='wedge'?1.03:1);
    if(s.owner==='player'&&state.resources.food<=0)speed*=.8;
    const next=s.path[0],d=dist(s,next);
    if(!onBridge(s)&&!onBridge(next)&&d>1) {
      const slope=(heightAt(next.x,next.z)-heightAt(s.x,s.z))/d;
      speed*=clamp(1-slope*.32,.66,1.08);
    }
    let movement=speed*dt,moved=0;
    while(s.path.length&&movement>EPS) {
      const p=s.path[0],distance=dist(s,p);
      if(distance<.1){s.path.shift();continue;}
      const travel=Math.min(distance,movement),q={x:s.x+(p.x-s.x)*travel/distance,z:s.z+(p.z-s.z)*travel/distance};
      // Both the swept segment and the destination are checked. Even fast
      // cavalry or crowd separation cannot tunnel through a thin wall.
      if(!squadWalkable(s,q)||!clearSegment(s,q,s)) {s.path=[];s.repathAt=0;s.activity='blocked';break;}
      s.heading=Math.atan2(q.x-s.x,q.z-s.z);s.x=q.x;s.z=q.z;movement-=travel;moved+=travel;
      if(travel>=distance-EPS)s.path.shift();
    }
    if(moved>EPS){s.activity='march';s.charge=Math.min(25,(s.charge||0)+moved);}
    return moved>EPS;
  }
  function chase(s,destination) {
    if(state.t<s.repathAt&&s.path.length)return;
    const end=nearestGround(destination,s);
    s.path=end?findPath(s,end,s)||[]:[];s.repathAt=state.t+1.25;
  }
  function enemyNear(s,radius,anchor=null,leash=Infinity) {
    let nearest=null,distance=radius;
    for(const other of state.squads) {
      if(other.hp<=0||!hostile(s.owner,other.owner))continue;
      if(anchor&&dist(other,anchor)>leash)continue;
      const d=dist(s,other);if(d<distance){nearest=other;distance=d;}
    }
    return nearest;
  }
  function engage(s,target,dt,mayChase=true) {
    s.engagedId=target.id;
    if(dist(s,target)<=rangeFor(s)+.4&&contactClear(s,target)){s.path=[];s.activity='attack';s.heading=Math.atan2(target.x-s.x,target.z-s.z);launchAttack(s,target);return true;}
    if(mayChase){chase(s,target);moveAlong(s,dt);return true;}
    return false;
  }
  function updateSquads(dt) {
    for(const s of state.squads) {
      if(s.hp<=0)continue;
      const previousEngagement=s.engagedId;
      s.attackClock=Math.max(0,(s.attackClock||0)-dt);s.engagedId=null;
      const order=s.order,def=UNIT_TYPES[s.type];
      if(order.type==='attackMove') {
        const enemy=enemyNear(s,def.role==='siege'?Math.min(def.range,12):Math.min(def.range+8,38));
        if(enemy){engage(s,enemy,dt,true);continue;}
        // A chase path ends at the opponent. Resume the original ground order
        // after that opponent dies, retreats out of sight or becomes friendly.
        if(previousEngagement){s.path=[];s.repathAt=0;}
        if(!s.path.length&&finite(order.x)&&dist(s,order)>2)chase(s,order);
        moveAlong(s,dt);
        if(!s.path.length&&finite(order.x)&&dist(s,order)<3)issueOrder(s,'hold',{point:{x:s.x,z:s.z}});
        continue;
      }
      if(order.type==='move'||order.type==='retreat') {
        if(!s.path.length&&finite(order.x)&&dist(s,order)>2)chase(s,{x:order.x,z:order.z});
        moveAlong(s,dt);
        if(!s.path.length&&finite(order.x)&&dist(s,order)<3){issueOrder(s,'hold',{point:{x:s.x,z:s.z}});}
        continue;
      }
      if((order.type==='attack'||order.type==='capture')&&order.targetId&&!REGION_BY_ID[order.targetId]) {
        const target=state.squads.find(other=>other.id===order.targetId&&other.hp>0);
        if(target&&hostile(s.owner,target.owner))engage(s,target,dt,true);
        else issueOrder(s,'hold',{point:{x:s.x,z:s.z}});
        continue;
      }
      const regionId=order.regionId||order.targetId;
      if((order.type==='attack'||order.type==='capture')&&REGION_BY_ID[regionId]) {
        const r=REGION_BY_ID[regionId],control=state.regions[regionId];
        if(control.owner===s.owner||!hostile(s.owner,control.owner)){issueOrder(s,'hold',{point:{x:s.x,z:s.z}});continue;}
        const immediate=enemyNear(s,def.role==='siege'?Math.min(def.range,10):def.range+9);
        // Siege crews keep working on the walls unless threatened at close range.
        if(immediate&&(def.role!=='siege'||dist(s,immediate)<7)){engage(s,immediate,dt,true);continue;}
        if(control.fortHp>0) {
          const aim=fortAim(r,s);
          if(dist(s,aim)<=def.range+.4){s.activity='siege';launchAttack(s,control,true);}
          else {const p=standOff(r,s,def.range);if(p)chase(s,p);moveAlong(s,dt);}
        } else if(infantry(s)) {
          const gate=gatePoint(r);
          if(dist(s,gate)>10){chase(s,gate);moveAlong(s,dt);}
          else{s.activity='capture';s.path=[];}
        } else {
          const enemy=enemyNear(s,def.range+14);
          if(enemy)engage(s,enemy,dt,s.stance==='aggressive');else{s.activity='guard';s.path=[];}
        }
        continue;
      }
      if(order.type==='hold') {
        const anchor=s.anchor||s,leash=s.stance==='aggressive'?42:18;
        const enemy=enemyNear(s,def.range+(s.stance==='aggressive'?25:7),anchor,def.range+leash);
        if(enemy)engage(s,enemy,dt,dist(s,anchor)<leash);
        else {
          s.activity='idle';
          if(dist(s,anchor)>5){chase(s,anchor);moveAlong(s,dt);}
        }
      }
    }
    // Formations have physical breathing room, including at bridge bottlenecks.
    for(let i=0;i<state.squads.length;i++) {
      const a=state.squads[i];if(a.hp<=0)continue;
      for(let j=i+1;j<state.squads.length;j++) {
        const b=state.squads[j];if(b.hp<=0)continue;
        const minimum=(UNIT_TYPES[a.type].role==='siege'||UNIT_TYPES[b.type].role==='siege')?4.4:3.3;
        const d=dist(a,b);if(d>=minimum)continue;
        const dx=d>.001?(a.x-b.x)/d:1,dz=d>.001?(a.z-b.z)/d:0,push=Math.min(.38,(minimum-d)*.35);
        const pa={x:a.x+dx*push,z:a.z+dz*push},pb={x:b.x-dx*push,z:b.z-dz*push};
        if(squadWalkable(a,pa)&&clearSegment(a,pa,a)){a.x=pa.x;a.z=pa.z;}
        if(squadWalkable(b,pb)&&clearSegment(b,pb,b)){b.x=pb.x;b.z=pb.z;}
      }
    }
    state.squads=state.squads.filter(s=>s.hp>0);
  }
  function updateFortresses(dt) {
    for(const meta of REGIONS) {
      const r=state.regions[meta.id];r.attackClock=Math.max(0,(r.attackClock||0)-dt);
      if(r.fortHp>0&&r.attackClock<=0) {
        const range=meta.kind==='castle'?48:meta.kind==='town'?35:32;
        let target=null,near=range;
        for(const s of state.squads) {
          if(s.hp<=0||!hostile(r.owner,s.owner))continue;
          const d=dist(meta,s);if(d<near){target=s;near=d;}
        }
        if(target) {
          const aim=fortAim(meta,target),damage=(meta.kind==='castle'?24:meta.kind==='town'?14:16)*(1+(r.buildings.walls||0)*.13)*(1+.1*techLevel('masonry',r.owner));
          const armor=UNIT_TYPES[target.type].armor;
          effect('arrow',aim.x,aim.z,target.x,target.z,{life:clamp(near/64,.25,1.1),owner:r.owner,damage:Math.max(3,damage-armor*.7),targetId:target.id,targetKind:'squad',sourceId:r.id});
          r.attackClock=meta.kind==='castle'?2.5:3.25;r.lastAttack=state.t;
        }
      }
      if(r.fortHp<=0) {
        const gate=gatePoint(meta),counts={};
        for(const s of state.squads) {
          if(!infantry(s)||s.hp<=0||dist(s,gate)>13)continue;
          if(s.owner===r.owner)continue;
          if(!hostile(s.owner,r.owner)||!frontier(meta.id,s.owner))continue;
          if(!['attack','capture'].includes(s.order.type)||(s.order.regionId||s.order.targetId)!==r.id)continue;
          counts[s.owner]=(counts[s.owner]||0)+s.men;
        }
        const candidate=Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];
        if(candidate) {
          const [owner,men]=candidate;
          const contested=state.squads.some(s=>s.hp>0&&s.owner!==owner&&hostile(owner,s.owner)&&dist(s,gate)<22);
          if(!contested) {
            if(r.captureOwner!==owner){r.captureOwner=owner;r.capture=0;}
            r.capture=Math.min(100,r.capture+dt*(2.2+Math.min(men,18)*.31));
            if(r.capture>=100)captureRegion(r.id,owner);
          } else r.capture=Math.max(0,r.capture-dt*.8);
        } else r.capture=Math.max(0,r.capture-dt*2);
      } else {r.capture=0;r.captureOwner=null;}
      if(r.owner==='player'&&r.buildings.infirmary) {
        for(const s of state.squads)if(player(s)&&state.t-s.lastDamage>12&&dist(s,meta)<47&&s.hp<s.maxHp&&s.activity!=='attack') {
          s.hp=Math.min(s.maxHp,s.hp+dt*(2+r.buildings.infirmary*2));s.men=Math.ceil(UNIT_TYPES[s.type].men*s.hp/s.maxHp);
        }
      }
    }
  }
  function captureRegion(id,owner) {
    const r=state.regions[id],previous=r.owner;r.owner=owner;r.capture=0;r.captureOwner=null;r.capturedAt=state.t;r.lastAttack=state.t;
    r.maxFortHp=REGION_BY_ID[id].fortHp*(1+.2*techLevel('masonry',owner))+(r.buildings.walls||0)*450;
    r.fortHp=Math.min(r.fortHp,r.maxFortHp);
    for(const n of state.nodes)if(n.regionId===id)n.workers=0;
    const lostJobs=state.jobs.filter(j=>j.regionId===id);state.jobs=state.jobs.filter(j=>j.regionId!==id);
    for(const structure of state.structures)if(structure.regionId===id&&structure.status==='upgrading'){structure.status='ready';structure.jobId=null;}
    state.structures=state.structures.filter(structure=>structure.regionId!==id||structure.status!=='building');
    if(owner==='player') {
      state.stats.captured++;state.morale=clamp(state.morale+4,0,100);
      log('capture',`${REGION_BY_ID[id].name}: δικό σου φέουδο`,'Οι σημαίες άλλαξαν. Ανάθεσε εργάτες στους πόρους και επισκεύασε τα τείχη πριν από αντεπίθεση.');
    } else if(previous==='player') {
      state.morale=clamp(state.morale-9,0,100);
      log('warning',`Χάθηκε περιοχή · ${REGION_BY_ID[id].name}`,lostJobs.length?'Τα έργα εγκαταλείφθηκαν και οι εργάτες επέστρεψαν.':'Ανασύνταξε τον στρατό και προστάτεψε τις υπόλοιπες περιοχές.');
    } else log('war',`Κατάληψη · ${REGION_BY_ID[id].name}`,`Η αντίπαλη ηγεμονία ${FACTIONS[owner].shortName} επεκτείνει τα σύνορά της.`);
    const p=REGION_BY_ID[id];effect('capture',p.x,p.z,undefined,undefined,{life:3,owner});
    recomputeEconomy();dirty=true;
  }
  function updateEconomy(dt) {
    const rs=state.resources;
    rs.money=Math.max(0,rs.money+(state.income-state.upkeep)*dt);
    let foodGathered=buildingTotal('farm')*.06*dt;
    rs.food+=foodGathered;
    for(const n of state.nodes) {
      const production=nodeProductionRates(state,n);
      if(!production.active)continue;
      const amount=Math.min(n.amount,production.totalPerSecond*dt);n.amount-=amount;rs[n.type]+=amount;state.stats.gathered+=amount;
      if(n.amount<=EPS){n.amount=0;n.workers=0;log('economy','Μια πηγή εξαντλήθηκε','Οι εργάτες είναι ξανά διαθέσιμοι. Ανάθεσέ τους σε άλλη πηγή.');}
    }
    rs.food=Math.max(0,rs.food-state.foodConsumption*dt);
    const foodSafe=rs.food>70,paid=rs.money>0;
    const wells=buildingTotal('well'),granaries=buildingTotal('granary');
    const moraleTarget=clamp(61+wells*3+granaries*3+(foodSafe?9:-29)+(paid?0:-18)-(state.population>state.housing?12:0),15,96);
    state.morale+=clamp(moraleTarget-state.morale,-.18*dt,.12*dt);
    const civic=buildingTotal('houses')*2.5+wells*3+granaries*3+buildingTotal('market')*3+buildingTotal('infirmary')*2;
    const prosperityTarget=clamp(13+civic+state.population*.17+(foodSafe?8:-20)+(paid?3:-12),4,98);
    state.prosperity+=clamp(prosperityTarget-state.prosperity,-.09*dt,.075*dt);
    if(foodSafe&&paid&&state.morale>55&&state.population<state.housing) {
      state.growth+=dt*(1+techLevel('agriculture')*.25);
      if(state.growth>=32){state.growth-=32;state.population++;dirty=true;}
    }
    if(rs.food<=0&&state.t-state.lastHungerNotice>60) {
      state.lastHungerNotice=state.t;log('warning','Οι αποθήκες τροφίμων άδειασαν','Μετάφερε εργάτες σε χωράφια ή αγόρασε τρόφιμα. Η πείνα μειώνει το ηθικό και την ταχύτητα του στρατού.');
    }
    if(!paid&&state.t-state.lastWageNotice>60) {
      state.lastWageNotice=state.t;log('warning','Δεν επαρκούν οι λίρες για τη φρουρά','Πούλησε πλεονάσματα ή ανάπτυξε τις αγορές. Το απλήρωτο στράτευμα χάνει ηθικό.');
    }
    for(const key of RESOURCE_KEYS)rs[key]=clamp(rs[key],0,1e9);
  }
  function finishJob(j) {
    const r=state.regions[j.regionId];if(!r||r.owner!=='player')return;
    if((j.type==='walls'&&!fortChangeIsSafe(j.regionId,r.fortHp>0?Math.min(r.maxFortHp+450,r.fortHp+450):0,r.maxFortHp+450))||
      (j.kind==='research'&&j.type==='masonry'&&ownedRegions('player').some(meta=>{
        const fort=state.regions[meta.id],bonus=meta.fortHp*.2;
        return !fortChangeIsSafe(meta.id,fort.fortHp>0?fort.fortHp+bonus:0,fort.maxFortHp+bonus);
      }))) {
      j.blocked=true;j.blockedReason='Απομάκρυνε τα στρατεύματα από τα τείχη πριν ολοκληρωθεί η ενίσχυση.';return false;
    }
    if(j.kind==='train') {
      const s=spawn('player',j.type,j.regionId,state.stats.trained%8);
      if(s){state.stats.trained++;log('army',`${UNIT_TYPES[j.type].name}: έτοιμοι`,`${REGION_BY_ID[j.regionId].name} · το απόσπασμα περιμένει έξω από την πύλη.`);}
    } else if(j.kind==='research') {
      state.techs[j.type]=(state.techs[j.type]||0)+1;
      if(j.type==='masonry') for(const meta of ownedRegions('player')) {
        const fort=state.regions[meta.id],bonus=meta.fortHp*.2;fort.maxFortHp+=bonus;if(fort.fortHp>0)fort.fortHp=Math.min(fort.maxFortHp,fort.fortHp+bonus);
      }
      if(j.type==='steel')for(const s of state.squads.filter(player)){const bonus=UNIT_TYPES[s.type].hp*.05;s.maxHp+=bonus;s.hp+=bonus;}
      log('research',`Ολοκληρώθηκε: ${TECHS[j.type].name}`,TECHS[j.type].benefit);
    } else if(j.type==='repair') {
      r.breached=r.fortHp<=0;log('build',`Επισκευάστηκαν τα τείχη στο ${REGION_BY_ID[j.regionId].name}`,'Η φρουρά έχει ξανά προστασία.');
    } else {
      if(j.structureId) {
        const structure=state.structures.find(s=>s.id===j.structureId);
        if(!structure)return;
        structure.level=j.targetLevel;structure.status='ready';structure.jobId=null;
      }
      r.buildings[j.type]=(r.buildings[j.type]||0)+1;
      if(j.type==='walls'){r.maxFortHp+=450;if(r.fortHp>0)r.fortHp=Math.min(r.maxFortHp,r.fortHp+450);r.breached=r.fortHp<=0;}
      r.level=1+Math.floor(Object.values(r.buildings).reduce((sum,n)=>sum+n,0)/5);
      state.stats.built++;log('build',`${BUILDINGS[j.type].name}: ολοκληρώθηκε`,`${REGION_BY_ID[j.regionId].name} · ${BUILDINGS[j.type].benefit}`);
    }
    dirty=true;recomputeEconomy();
    return true;
  }
  function fortChangeIsSafe(regionId,hp,maxHp) {
    const fort=state.regions[regionId],oldRatio=fort.fortHp/fort.maxFortHp,newRatio=hp/maxHp;
    const restored=FORT_SOLIDS[regionId].filter(shape=>oldRatio<=shape.minRatio&&newRatio>shape.minRatio);
    return !state.squads.some(squad=>squad.hp>0&&restored.some(shape=>obstacleContains(squad,shape,UNIT_CLEARANCE[squad.type]+.1)));
  }
  function updateJobs(dt) {
    const busy=new Set(),completed=[];
    for(const j of state.jobs) {
      if(state.regions[j.regionId]?.owner!=='player'){completed.push(j.id);continue;}
      if(j.kind==='train') {
        const facility=`${j.regionId}-${UNIT_TYPES[j.type].requires}`;
        if(busy.has(facility)){j.waiting=true;continue;}busy.add(facility);j.waiting=false;
      }
      if(j.type==='repair') {
        const r=state.regions[j.regionId],gate=gatePoint(REGION_BY_ID[j.regionId]);
        const threatened=state.squads.some(s=>s.hp>0&&hostile('player',s.owner)&&dist(s,gate)<23);
        j.blocked=threatened;j.blockedReason=threatened?'Εχθρικά στρατεύματα απειλούν την πύλη.':null;if(threatened)continue;
        const amount=Math.min(j.repairAmount-(j.applied||0),j.repairAmount*dt/j.duration);
        if(!fortChangeIsSafe(j.regionId,Math.min(r.maxFortHp,r.fortHp+amount),r.maxFortHp)) {
          j.blocked=true;j.blockedReason='Απομάκρυνε τα στρατεύματα από το σημείο επισκευής των τειχών.';continue;
        }
        r.fortHp=Math.min(r.maxFortHp,r.fortHp+amount);j.applied=(j.applied||0)+amount;r.breached=r.fortHp<=0;
      }
      j.remaining=Math.max(0,j.remaining-dt);
      if(j.remaining<=EPS&&finishJob(j)!==false)completed.push(j.id);
    }
    if(completed.length)state.jobs=state.jobs.filter(j=>!completed.includes(j.id));
  }
  function aiOrder(s,type,region) {
    const def=UNIT_TYPES[s.type],p=state.regions[region.id].fortHp>0?standOff(region,s,def.range):nearestGround(gatePoint(region),s);
    if(!p)return false;
    const path=findPath(s,p,s);if(!path)return false;
    issueOrder(s,type,{point:p,region,path});s.stance='aggressive';return true;
  }
  function raidTarget(faction) {
    const own=ownedRegions(faction),ours=ownedRegions('player');
    let possible=ours.filter(r=>frontier(r.id,faction));
    if(!possible.length)possible=REGIONS.filter(r=>state.regions[r.id].owner==='neutral'&&frontier(r.id,faction));
    if(!possible.length)possible=ours;
    return possible.sort((a,b)=>Math.min(...own.map(r=>dist(r,a)))+state.regions[a.id].fortHp*.018-Math.min(...own.map(r=>dist(r,b)))-state.regions[b.id].fortHp*.018)[0]||null;
  }
  function updateAI(dt) {
    for(const faction of ['red','gold']) {
      const a=state.ai.factions[faction],regions=ownedRegions(faction);
      if(!regions.length)continue;
      a.treasury=Math.min(650,a.treasury+dt*(.2+regions.length*.16));
      if(state.t>=a.nextRecruit&&unitCount(faction)+state.ai.queues.filter(q=>q.owner===faction).length<13&&a.treasury>=70) {
        const home=homeFor(faction),types=['spear','archer','sword','ram','cavalry'];
        const type=types[(a.raid+Math.floor(state.t/110))%types.length];
        state.ai.queues.push({id:uid('ai-job'),owner:faction,regionId:home.id,type,remaining:UNIT_TYPES[type].trainTime,duration:UNIT_TYPES[type].trainTime});
        a.treasury-=70;a.nextRecruit=state.t+105+regions.length*7;
      }
      if(isTruce(faction)){a.nextRaid=Math.max(a.nextRaid,state.ai.truce[faction]+38);continue;}
      const target=raidTarget(faction);
      if(target&&state.t>=a.nextRaid-45&&!a.warned) {
        a.warned=true;state.ai.warning={faction,regionId:target.id,at:a.nextRaid};
        log('warning',`Αναφορά ανιχνευτών · ${FACTIONS[faction].shortName}`,`Ετοιμάζει επιδρομή προς ${target.name} σε περίπου 45 δευτερόλεπτα. Φέρε φρουρά, ενίσχυσε τα τείχη ή διαπραγματεύσου ανακωχή.`);
      }
      if(target&&state.t>=a.nextRaid) {
        const eligible=state.squads.filter(s=>s.owner===faction&&s.hp>s.maxHp*.35&&!['attack','capture'].includes(s.order.type));
        eligible.sort((s1,s2)=>dist(s1,target)-dist(s2,target));
        const count=Math.min(2+Math.floor(a.raid/2),4,Math.max(0,eligible.length-1));
        let march=eligible.slice(0,count);
        const foot=eligible.find(infantry);
        if(foot&&march.length&&!march.some(infantry))march[march.length-1]=foot;
        let launched=0;for(const s of march)if(aiOrder(s,'attack',target))launched++;
        if(launched){a.raid++;log('war',`${FACTIONS[faction].shortName}: ο στρατός ξεκίνησε`,`${launched} αποσπάσματα βαδίζουν προς ${target.name}. Η μάχη θα αρχίσει όταν φτάσουν.`);}
        a.nextRaid=state.t+230+(faction==='gold'?40:0);a.warned=false;if(state.ai.warning?.faction===faction)state.ai.warning=null;
      }
    }
    for(const q of state.ai.queues)q.remaining-=dt;
    for(const q of state.ai.queues.filter(q=>q.remaining<=0))if(state.regions[q.regionId].owner===q.owner)spawn(q.owner,q.type,q.regionId,state.ai.factions[q.owner].raid+3);
    state.ai.queues=state.ai.queues.filter(q=>q.remaining>0&&state.regions[q.regionId].owner===q.owner);
    const raids=['red','gold'].filter(f=>ownedRegions(f).length).map(f=>state.ai.factions[f].nextRaid);
    state.ai.nextRaid=raids.length?Math.min(...raids):null;
  }
  function updateMissions() {
    const count=ownedRegions('player').length;
    const progress={supply:state.stats.gathered,settlement:state.stats.built,recruits:state.stats.trained,frontier:state.stats.captured,
      engineering:state.techs.engineering,prosperity:state.prosperity,unite:count};
    for(const m of state.missions) {
      if(m.done)continue;
      m.progress=Math.min(m.target,progress[m.id]||0);
      if(m.progress+EPS>=m.target&&(m.id!=='unite'||state.prosperity>=65)) {
        m.done=true;grant(m.reward||{});log('mission',`Αποστολή: ${m.title}`,Object.keys(m.reward||{}).length?'Οι κάτοικοι στηρίζουν την εκστρατεία σου με νέες προμήθειες.':'Τα φέουδα ενώθηκαν κάτω από τη σημαία σου.');
      }
    }
    if(count===0) {state.outcome='defeat';state.paused=true;log('defeat','Η ηγεμονία έπεσε','Χάθηκαν όλα τα φέουδα. Μπορείς να ξεκινήσεις νέα εκστρατεία από το μενού.');}
    else if(count===REGIONS.length&&state.prosperity>=65) {state.outcome='victory';state.paused=true;log('victory','Τα φέουδα ενώθηκαν','Κατέκτησες τον χάρτη και έδωσες στους κατοίκους έναν τόπο που ευημερεί.');}
  }
  function substep(dt) {
    state.t+=dt;state.day=Math.floor(state.t/600)+1;
    economyElapsed+=dt;missionsElapsed+=dt;
    if(economyElapsed>=.75){recomputeEconomy();economyElapsed=0;}
    updateEconomy(dt);updateJobs(dt);updateAI(dt);updateEffects(dt);updateSquads(dt);updateFortresses(dt);
    if(missionsElapsed>=1){updateMissions();missionsElapsed=0;}
  }
  function step(realSeconds) {
    if(!finite(realSeconds)||realSeconds<=0)return state;
    // A resumed tab cannot turn a multi-hour gap into an unseen enemy attack.
    const real=Math.min(realSeconds,1);
    if(!state.paused&&!state.outcome) {
      const total=real*state.speed,n=Math.max(1,Math.ceil(total/.1)),dt=total/n;
      for(let i=0;i<n&&!state.outcome;i++)substep(dt);
    }
    noticeElapsed+=real;saveElapsed+=real;
    if(noticeElapsed>=.5){noticeElapsed=0;recomputeEconomy();notify();}
    if(saveElapsed>=12){saveElapsed=0;save();}
    return state;
  }
  function validateSave(text) {
    if(typeof text!=='string'||text.length>2500000)throw new Error('Το αρχείο εκστρατείας δεν έχει έγκυρο μέγεθος.');
    let envelope;try{envelope=JSON.parse(text);}catch{throw new Error('Το αρχείο δεν περιέχει έγκυρη αποθηκευμένη εκστρατεία.');}
    if(envelope?.game!=='feouda-1280'||envelope.version!==1||envelope.state?.schema!==1)throw new Error('Αυτό δεν είναι αρχείο εκστρατείας των Φέουδων 1280.');
    const s=envelope.state;
    if(!finite(s.t)||s.t<0||s.t>1e9||!Number.isSafeInteger(s.nextId)||s.nextId<0||!s.regions||!Array.isArray(s.squads)||s.squads.length>MAX_SQUADS||!Array.isArray(s.nodes)||s.nodes.length!==RESOURCE_NODES.length||!Array.isArray(s.jobs)||s.jobs.length>MAX_JOBS)throw new Error('Η δομή της εκστρατείας δεν είναι έγκυρη.');
    for(const key of RESOURCE_KEYS)if(!finite(s.resources?.[key])||s.resources[key]<0||s.resources[key]>1e9)throw new Error('Το αρχείο έχει μη έγκυρα αποθέματα.');
    for(const key of ['population','morale','prosperity'])if(!finite(s[key])||s[key]<0||s[key]>(key==='population'?10000:100))throw new Error('Το αρχείο έχει μη έγκυρο πληθυσμό ή ηθικό.');
    for(const r of REGIONS) {
      const v=s.regions[r.id];
      if(!v||v.id!==r.id||!FACTION_KEYS.includes(v.owner)||!finite(v.fortHp)||!finite(v.maxFortHp)||v.fortHp<0||v.maxFortHp<1||v.maxFortHp>30000||v.fortHp>v.maxFortHp||!finite(v.capture)||v.capture<0||v.capture>100||!v.buildings||typeof v.buildings!=='object')throw new Error('Το αρχείο έχει μη έγκυρες οχυρώσεις.');
      for(const [key,n] of Object.entries(v.buildings))if(!has(BUILDINGS,key)||!Number.isInteger(n)||n<0||n>BUILDINGS[key].max)throw new Error('Το αρχείο έχει μη έγκυρα κτίσματα.');
      v.attackClock=finite(v.attackClock)?clamp(v.attackClock,0,20):1.5;v.lastAttack=finite(v.lastAttack)?v.lastAttack:-1000;
      v.captureOwner=FACTION_KEYS.includes(v.captureOwner)?v.captureOwner:null;
    }
    const ids=new Set();
    for(const u of s.squads) {
      if(typeof u.id!=='string'||ids.has(u.id)||!has(UNIT_TYPES,u.type)||!FACTION_KEYS.includes(u.owner)||!terrainWalkable(u)||!finite(u.hp)||!finite(u.maxHp)||u.hp<=0||u.maxHp<=0||u.maxHp>10000||u.hp>u.maxHp||!u.order||!ORDER_TYPES.includes(u.order.type)||!FORMATIONS.includes(u.formation)||!STANCES.includes(u.stance))throw new Error('Το αρχείο έχει μη έγκυρα αποσπάσματα.');
      ids.add(u.id);u.men=Math.ceil(UNIT_TYPES[u.type].men*u.hp/u.maxHp);
      if(!Array.isArray(u.path)||u.path.length>1000||u.path.some(p=>!terrainWalkable(p)))throw new Error('Το αρχείο έχει μη έγκυρες διαδρομές.');
      if(!u.anchor||!inBounds(u.anchor))u.anchor={x:u.x,z:u.z};
      for(const key of ['attackClock','heading','repathAt','charge','lastDamage','lastAttack'])if(!finite(u[key]))u[key]=key==='lastDamage'||key==='lastAttack'?-1000:0;
      if(u.order.x!==undefined&&(!finite(u.order.x)||!finite(u.order.z)))throw new Error('Το αρχείο έχει μη έγκυρους στόχους.');
      if(u.order.type==='attackMove'&&!inBounds(u.order))throw new Error('Η πορεία με εμπλοκή χρειάζεται έγκυρο σημείο προορισμού.');
      if(u.order.regionId!==undefined&&!has(REGION_BY_ID,u.order.regionId))throw new Error('Το αρχείο έχει άγνωστη περιοχή στόχου.');
      if(u.order.targetId!==undefined&&(typeof u.order.targetId!=='string'||['__proto__','constructor','prototype'].includes(u.order.targetId)))throw new Error('Το αρχείο έχει μη έγκυρο στόχο.');
    }
    let workers=0;const nodeIds=new Set();
    for(const n of s.nodes) {
      const ref=RESOURCE_NODES.find(ref=>ref.id===n.id);
      if(!ref||nodeIds.has(n.id)||n.type!==ref.type||n.regionId!==ref.regionId||!finite(n.amount)||n.amount<0||n.amount>ref.amount||!Number.isInteger(n.workers)||n.workers<0||n.workers>MAX_WORKERS_PER_NODE||(n.workers>0&&s.regions[n.regionId].owner!=='player'))throw new Error('Το αρχείο έχει μη έγκυρες εργασίες συλλογής.');
      n.x=ref.x;n.z=ref.z;workers+=n.workers;nodeIds.add(n.id);
    }
    const jobIds=new Set();
    for(const j of s.jobs) {
      if(typeof j.id!=='string'||jobIds.has(j.id)||!['train','build','research'].includes(j.kind)||!has(REGION_BY_ID,j.regionId)||s.regions[j.regionId].owner!=='player'||!finite(j.remaining)||!finite(j.duration)||j.remaining<0||j.duration<=0||j.duration>100000||j.remaining>j.duration||!Number.isInteger(j.workers)||j.workers<0||j.workers>4)throw new Error('Το αρχείο έχει μη έγκυρα έργα.');
      const dictionary=j.kind==='train'?UNIT_TYPES:j.kind==='research'?TECHS:BUILDINGS;
      const def=j.kind==='build'&&j.type==='repair'?true:has(dictionary,j.type);
      if(!def)throw new Error('Το αρχείο περιέχει άγνωστο έργο.');
      if(j.type==='repair'&&(!finite(j.repairAmount)||!finite(j.applied)||j.repairAmount<0||j.applied<0||j.applied>j.repairAmount+EPS))throw new Error('Το αρχείο έχει μη έγκυρη επισκευή.');
      workers+=j.workers;jobIds.add(j.id);
    }
    if(workers>Math.floor(s.population*.5))throw new Error('Οι αναθέσεις ξεπερνούν τους διαθέσιμους εργάτες.');
    for(const [key,def] of Object.entries(TECHS))if(!Number.isInteger(s.techs?.[key])||s.techs[key]<0||s.techs[key]>def.max)throw new Error('Το αρχείο έχει μη έγκυρη έρευνα.');
    if(!s.ai?.factions||!s.ai.truce||!Array.isArray(s.ai.queues)||s.ai.queues.length>30)throw new Error('Το αρχείο έχει μη έγκυρη κατάσταση αντιπάλων.');
    for(const faction of ['red','gold']) {
      if(!finite(s.ai.truce[faction]))throw new Error('Το αρχείο έχει μη έγκυρη διπλωματία.');
      for(const key of ['nextRaid','nextRecruit','treasury','raid'])if(!finite(s.ai.factions[faction]?.[key])||s.ai.factions[faction][key]<0)throw new Error('Το αρχείο έχει μη έγκυρη κατάσταση αντιπάλων.');
    }
    for(const q of s.ai.queues)if(!['red','gold'].includes(q.owner)||!has(UNIT_TYPES,q.type)||!has(REGION_BY_ID,q.regionId)||!finite(q.remaining)||!finite(q.duration)||q.remaining<0||q.duration<=0)throw new Error('Το αρχείο έχει μη έγκυρη ενίσχυση αντιπάλων.');
    if(!s.stats||Object.values(s.stats).some(v=>!finite(v)||v<0))throw new Error('Το αρχείο έχει μη έγκυρη πρόοδο.');
    if(!Array.isArray(s.missions)||s.missions.length!==7||!Array.isArray(s.log)||s.log.length>90)throw new Error('Το αρχείο έχει μη έγκυρες αποστολές.');
    const original=newCampaign();
    s.missions=original.missions.map(m=>{
      const saved=s.missions.find(v=>v.id===m.id);if(!saved||typeof saved.done!=='boolean')throw new Error('Το αρχείο έχει μη έγκυρες αποστολές.');
      return {...m,done:saved.done,progress:finite(saved.progress)?clamp(saved.progress,0,m.target):0};
    });
    s.log=s.log.map(entry=>({id:String(entry.id).slice(0,80),t:finite(entry.t)?entry.t:0,type:String(entry.type).slice(0,30),title:String(entry.title).slice(0,250),text:String(entry.text).slice(0,1000)}));
    if(!Array.isArray(s.effects)||s.effects.length>250)throw new Error('Το αρχείο έχει μη έγκυρη μάχη.');
    s.effects=s.effects.filter(e=>['arrow','stone','hit','capture'].includes(e.type)&&finite(e.x)&&finite(e.z)&&finite(e.tx)&&finite(e.tz)&&finite(e.age)&&finite(e.life)&&e.life>0&&e.life<10&&e.age>=0&&(!e.damage||(finite(e.damage)&&e.damage>0&&e.damage<10000&&FACTION_KEYS.includes(e.owner)&&['region','squad'].includes(e.targetKind))));
    s.speed=[1,2,4].includes(s.speed)?s.speed:1;s.paused=!!s.paused;
    if(![null,'victory','defeat'].includes(s.outcome))throw new Error('Το αρχείο έχει μη έγκυρη έκβαση.');
    if(s.outcome)s.paused=true;
    s.growth=finite(s.growth)?clamp(s.growth,0,32):0;
    s.day=Math.floor(s.t/600)+1;s.lastHungerNotice=finite(s.lastHungerNotice)?s.lastHungerNotice:-1000;s.lastWageNotice=finite(s.lastWageNotice)?s.lastWageNotice:-1000;
    validateStructures(s);
    return s;
  }
  function exportSave() {
    return JSON.stringify({game:'feouda-1280',version:1,savedAt:getNow(),state});
  }
  function save() {
    if(!storage?.setItem)return {ok:true,message:'Η εκστρατεία είναι έτοιμη για εξαγωγή.'};
    try {state.lastSavedAt=getNow();storage.setItem(SAVE_KEY,exportSave());storageError=null;return {ok:true,message:'Η εκστρατεία αποθηκεύτηκε.'};}
    catch {storageError='Δεν υπάρχει διαθέσιμος χώρος αποθήκευσης. Εξήγαγε την εκστρατεία σε αρχείο.';return fail(storageError);}
  }
  function importSave(text) {
    let candidate;try{candidate=validateSave(text);}catch(error){return fail(error.message);}
    state=candidate;restoreNavigation();recomputeEconomy();economyElapsed=0;missionsElapsed=0;saveElapsed=0;noticeElapsed=0;
    dirty=true;notify();const result=save();
    return {ok:true,message:result.ok?'Η εκστρατεία φορτώθηκε. Ο χρόνος απουσίας δεν προκάλεσε μάχες.':result.message,persisted:result.ok};
  }
  function quoteCommand(action,payload) {
    const r=has(REGION_BY_ID,payload?.regionId)?state.regions[payload.regionId]:null;
    if(action==='train'&&has(UNIT_TYPES,payload?.type)) {
      const def=UNIT_TYPES[payload.type],level=Math.max(1,r?.buildings[def.requires]||1);
      return {cost:{...def.cost},duration:def.trainTime/(1+.15*techLevel('logistics')+.08*(level-1))};
    }
    if(action==='build'&&has(BUILDINGS,payload?.type)) {
      const def=BUILDINGS[payload.type],level=r?.buildings[payload.type]||0;
      return {cost:costAt(def.cost,level),duration:def.time*(1+.2*level)};
    }
    if(action==='research'&&has(TECHS,payload?.type)) {
      const def=TECHS[payload.type],level=state.techs[payload.type]||0;
      return {cost:costAt(def.cost,level),duration:def.time*(1+.2*level)};
    }
    if(action==='repair'&&r) {
      const amount=Math.max(0,r.maxFortHp-r.fortHp);
      return {cost:{money:Math.ceil(amount*.055),wood:Math.ceil(amount*.025),stone:Math.ceil(amount*.075)},duration:25+amount*.035};
    }
    if(action==='truce'&&['red','gold'].includes(payload?.faction))return {cost:{money:180+ownedRegions(payload.faction).length*35},duration:180};
    return {};
  }
  function reset() {
    state=newCampaign();migrateStructures(state);initializeArmies();state.startedAt=getNow();recomputeEconomy();
    log('campaign','Το στέμμα περιμένει τις αποφάσεις σου','Κράτησε τους ανθρώπους χορτάτους, στήριξε τον στρατό και άνοιξε τα περάσματα. Ο κριός σου είναι έτοιμος για την πρώτη πολιορκία.');
    economyElapsed=0;missionsElapsed=0;saveElapsed=0;noticeElapsed=0;notify();save();return {ok:true,message:'Ξεκίνησε νέα εκστρατεία.'};
  }
  function restoreNavigation() {
    for(const squad of state.squads) {
      if(!walkable(squad,squad)) {
        const safe=nearestGround(squad,squad);
        if(safe){squad.x=safe.x;squad.z=safe.z;}
        squad.path=[];squad.repathAt=0;
      }
      if(!walkable(squad.anchor,squad))squad.anchor=nearestGround(squad.anchor,squad)||{x:squad.x,z:squad.z};
      if(['move','retreat','hold'].includes(squad.order.type)&&finite(squad.order.x)&&!walkable(squad.order,squad)) {
        const safe=nearestGround(squad.order,squad)||{x:squad.x,z:squad.z};
        squad.order.x=safe.x;squad.order.z=safe.z;
      }
      let previous=squad;
      for(const p of squad.path) {
        if(!clearSegment(previous,p,squad)){squad.path=[];squad.repathAt=0;break;}
        previous=p;
      }
    }
  }
  let storedText=null;
  try {
    storedText=storage?.getItem?.(SAVE_KEY);
    if(storedText){state=validateSave(storedText);loaded=true;}
  } catch {
    storageError='Η προηγούμενη εκστρατεία δεν μπόρεσε να φορτωθεί.';
    if(storedText)try{storage?.setItem?.(`${SAVE_KEY}-recovery`,storedText);storageError+=' Κρατήθηκε αντίγραφο για ανάκτηση.';}catch{}
  }
  if(!loaded) {
    migrateStructures(state);initializeArmies();state.startedAt=getNow();
    log('campaign','1280 · Η Αργυρή Δρυς σε χρειάζεται','Διαθέτεις τρία φέουδα, επτά αποσπάσματα και έναν κριό. Χτίσε για τους ανθρώπους σου, προφύλαξε τις γέφυρες και διεκδίκησε τη μεθόριο.');
    if(storageError)log('warning','Ανάκτηση αποθήκευσης',storageError);
  }
  if(loaded)restoreNavigation();
  recomputeEconomy();
  return {
    get state(){return state;},
    get storageError(){return storageError;},
    get loaded(){return loaded;},
    subscribe(fn){if(typeof fn!=='function')return()=>{};listeners.add(fn);return()=>listeners.delete(fn);},
    step,command,save,exportSave,importSave,reset,
    canCommand(action,payload={}) {
      const result=validateCommand(action,payload);
      return {...quoteCommand(action,payload),ok:result.ok,message:result.message||'Η εντολή είναι διαθέσιμη.',...(result.cost?{cost:{...result.cost}}:{}),...(result.duration?{duration:result.duration}:{}),
        ...(result.requiresPlacement!==undefined?{requiresPlacement:result.requiresPlacement}:{}),...(result.placement?{placement:{...result.placement}}:{}),
        ...(result.structure?{structureId:result.structure.id}:{}),...(result.targetLevel?{targetLevel:result.targetLevel}:{})};
    },
    findBuildLocation(type,regionId,rotation=0){return state.regions[regionId]?.owner==='player'?findPlacement(state,type,regionId,rotation):null;},
    setPaused(value){state.paused=state.outcome?true:!!value;dirty=true;notify();save();return state.paused;},
    setSpeed(value){if(![1,2,4].includes(value))return fail('Η ταχύτητα μπορεί να είναι 1×, 2× ή 4×.');state.speed=value;dirty=true;notify();save();return {ok:true,message:`Ταχύτητα ${value}×.`};},
    getNavigation(){return {isWalkable:(p,unit=.65)=>walkable(p,unit),findPath:(a,b,unit=.65)=>findPath(a,b,unit),clearSegment:(a,b,unit=.65)=>clearSegment(a,b,unit),nearestGround:(p,unit=.65)=>nearestGround(p,unit),getObstacles:()=>worldObstacles(state),fortGate:id=>has(REGION_BY_ID,id)?gatePoint(REGION_BY_ID[id]):null,onBridge,bank};}
  };
}

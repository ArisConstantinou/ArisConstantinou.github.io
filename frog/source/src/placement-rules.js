/**
 * Building placement uses camp-local X/Z in world units and Three.js Y yaw.
 * The bounds are centered on the rendered building pivots, not the shelter mesh.
 */
import {SHELTER_LAYOUT_SCALE} from './world-config.js';
const scale=SHELTER_LAYOUT_SCALE;
const footprint=f=>Object.freeze(Object.fromEntries(Object.entries(f).map(([k,v])=>[k,k==='yaw'?v:v*scale])));
export const COURTYARD_RADIUS = 12.1 * scale;
export const PLACEMENT_CLEARANCE = 0.1 * scale;
export const BUILDING_FOOTPRINTS = Object.freeze({
  store: footprint({width:4.4,depth:3.6}),
  nursery: footprint({width:5.8,depth:5.9}),
  watchtower: footprint({width:4.8,depth:4}),
  training: footprint({width:5.7,depth:4.8}),
  palisade: footprint({width:7,depth:1})
});
export const CORE_FOOTPRINT = footprint({x:-1.1825,z:-1.0664,yaw:0,width:7.68,depth:8.25});
export const EXTRA_HUT_FOOTPRINT = footprint({x:-6.45,z:0.43,yaw:-0.5,width:4.8,depth:5.2});

const DEFAULTS = Object.freeze({
  store: footprint({x:-6.0962,z:4.9054,yaw:0}),
  nursery: footprint({x:6.5601,z:-3.869,yaw:0}),
  watchtower: footprint({x:6.6295,z:5.3482,yaw:0}),
  training: footprint({x:-6.2831,z:-6.0974,yaw:0}),
  palisade: footprint({x:0,z:9.8,yaw:0})
});
const types=Object.keys(BUILDING_FOOTPRINTS);
const finitePosition=p=>!!p&&typeof p==='object'&&Number.isFinite(p.x)&&Number.isFinite(p.z)&&Number.isFinite(p.yaw);
const activeCamp=camp=>!!camp&&camp.team==='ally'&&!camp.destroyed&&(camp.hp===undefined||Number.isFinite(camp.hp)&&camp.hp>0);
const bought=(camp,type)=>!!camp?.buildings?.[type];
const yawOf=yaw=>yaw>=-Math.PI&&yaw<=Math.PI?yaw:Math.atan2(Math.sin(yaw),Math.cos(yaw));

export function defaultPlacement(type) {
  return Object.hasOwn(DEFAULTS,type)?{...DEFAULTS[type]}:null;
}

function rectangle(shape,position,padding=0) {
  const c=Math.cos(position.yaw),s=Math.sin(position.yaw);
  // Three.js positive Y rotation maps local +X toward world -Z.
  return {
    x:position.x,z:position.z,
    u:{x:c,z:-s},v:{x:s,z:c},
    hx:shape.width/2+padding,hz:shape.depth/2+padding
  };
}
function corners(rect) {
  return [-1,1].flatMap(a=>[-1,1].map(b=>({
    x:rect.x+a*rect.hx*rect.u.x+b*rect.hz*rect.v.x,
    z:rect.z+a*rect.hx*rect.u.z+b*rect.hz*rect.v.z
  })));
}
function overlap(a,b) {
  const dx=b.x-a.x,dz=b.z-a.z;
  for(const axis of [a.u,a.v,b.u,b.v]) {
    const distance=Math.abs(dx*axis.x+dz*axis.z);
    const radius=r=>r.hx*Math.abs(r.u.x*axis.x+r.u.z*axis.z)+r.hz*Math.abs(r.v.x*axis.x+r.v.z*axis.z);
    if(distance>=radius(a)+radius(b)-1e-9)return false;
  }
  return true;
}
function insideCourt(rect) {
  return corners(rect).every(p=>p.x*p.x+p.z*p.z<=COURTYARD_RADIUS*COURTYARD_RADIUS+1e-9);
}

/** Reject invalid previews without mutating camp inventory, resources or positions. */
export function validateBuildingPlacement(camp,type,position) {
  const fail=reason=>({valid:false,reason});
  if(!activeCamp(camp))return fail('inactive-camp');
  if(camp.safe===false)return fail('unsafe-camp');
  if(!Object.hasOwn(BUILDING_FOOTPRINTS,type))return fail('unknown-building');
  if(bought(camp,type))return fail('already-owned');
  if(!finitePosition(position))return fail('invalid-position');
  const candidate=rectangle(BUILDING_FOOTPRINTS[type],position,PLACEMENT_CLEARANCE/2);
  if(!insideCourt(candidate))return fail('outside-courtyard');
  const core=rectangle(CORE_FOOTPRINT,CORE_FOOTPRINT,PLACEMENT_CLEARANCE/2);
  if(overlap(candidate,core))return fail('overlap-core');
  // Keep the future sleeping extension clear even at tier one: bought buildings
  // cannot yet be moved, so an early placement must never prevent an upgrade.
  if(overlap(candidate,rectangle(EXTRA_HUT_FOOTPRINT,EXTRA_HUT_FOOTPRINT,PLACEMENT_CLEARANCE/2)))return fail('overlap-core');
  for(const other of types) {
    if(!bought(camp,other))continue;
    const saved=camp.buildingPlacements?.[other];
    // An old palisade is the complete purchased perimeter, not a new fence segment.
    if(other==='palisade'&&!finitePosition(saved))continue;
    const occupied=finitePosition(saved)?saved:defaultPlacement(other);
    if(overlap(candidate,rectangle(BUILDING_FOOTPRINTS[other],occupied,PLACEMENT_CLEARANCE/2)))return fail('overlap-building');
  }
  return {valid:true,reason:''};
}

/**
 * Keep only finite, purchased, spatially valid saved placements. Missing legacy
 * positions remain missing so the renderer keeps its original authored layout.
 */
export function normalizeBuildingPlacements(camp) {
  const source=camp?.buildingPlacements;
  if(!source||typeof source!=='object'||Array.isArray(source))return {};
  const candidates={};
  for(const type of types) {
    const p=source[type];
    if(!bought(camp,type)||!finitePosition(p))continue;
    if(Math.abs(p.x)>COURTYARD_RADIUS||Math.abs(p.z)>COURTYARD_RADIUS)continue;
    const normalized={x:p.x,z:p.z,yaw:yawOf(p.yaw)};
    if(!insideCourt(rectangle(BUILDING_FOOTPRINTS[type],normalized,PLACEMENT_CLEARANCE/2)))continue;
    candidates[type]=normalized;
  }
  const result={};
  // Save validation must also work for enemy shelters and ruins, where the
  // purchased geometry is retained for capture/rebuilding.
  const validationCamp={...camp,team:'ally',hp:Math.max(1,Number.isFinite(camp?.hp)?camp.hp:350),destroyed:false,safe:true,buildingPlacements:candidates};
  for(const [type,position] of Object.entries(candidates)) {
    const withoutSelf={...validationCamp,buildings:{...camp.buildings,[type]:false}};
    if(validateBuildingPlacement(withoutSelf,type,position).valid)result[type]=position;
  }
  return result;
}


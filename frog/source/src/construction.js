/** Real frog builders, reachable work stations and staged physical scaffolding. */
import * as THREE from 'three';
import { FORT_RADIUS, GATE_WIDTH, campWorld, campLocal, gatePoint, clearFortPosition } from './fortification.js';
import { BUILDING_FOOTPRINTS, defaultPlacement } from './placement-rules.js';
import { SHELTER_RADIUS } from './world-config.js';

export const MAX_BUILDERS_PER_SITE = 3;
export const BUILDER_REACH = 1.8;
export const PLAYER_BUILD_REACH = 3;
const distance=(a,b)=>Math.hypot((a?.x||0)-(b?.x||0),(a?.z||0)-(b?.z||0));
const living=f=>!!f&&!f.dead&&(f.hp??1)>0;
const clamp=(v,min,max)=>Math.min(max,Math.max(min,Number(v)||0));
const validJob=job=>job&&job.kind==='construction';
const campFor=(game,job)=>(game.camps||[]).find(c=>c.id===(job.siteId||job.campId));
const matrix=new THREE.Matrix4(),rotation=new THREE.Quaternion(),position=new THREE.Vector3(),scale=new THREE.Vector3();
let resources=null;

function materials(){
  if(!resources)resources={box:new THREE.BoxGeometry(1,1,1),wood:new THREE.MeshStandardMaterial({color:0x9e7543,roughness:.92}),stone:new THREE.MeshStandardMaterial({color:0xb5ad88,roughness:.95}),cloth:new THREE.MeshStandardMaterial({color:0xc3bc5d,roughness:.9,side:THREE.DoubleSide})};
  return resources;
}
function state(game){game.constructionSites??=new Map();return game.constructionSites;}
function workers(game){game.constructionWorkers??=new Map();return game.constructionWorkers;}
function safe(game,record){
  const camp=campFor(game,record.job);
  return !!camp&&camp.team==='ally'&&!camp.destroyed&&(camp.hp??1)>0&&(typeof game.campSafe!=='function'||game.campSafe(camp));
}
function freeFollower(game,f){
  if(!living(f)||f.team!=='ally'||f.guard||f.surrendered||f.trainingPaid||f.grabbedBy||(f.fear||0)>0)return false;
  if(!['follow','regroup',undefined,null].includes(f.order))return false;
  if(f.combatTarget&&(f.combatUntil||0)>(game.elapsed||0))return false;
  if(['attack','camp-attack'].includes(f.intent?.kind))return false;
  return true;
}
function nearThreat(game,f){
  const candidates=game.nearbyFrogs?.(f,10)||game.frogs||[];
  if(candidates.some(other=>living(other)&&other!==f&&!other.surrendered&&String(other.team).startsWith('enemy')&&distance(f,other)<10))return true;
  return (game.predators||[]).some(p=>living(p)&&!['patrol','dormant','dead','flee'].includes(p.phase)&&distance(f,p)<15);
}

function footprint(game,job){
  const camp=campFor(game,job),local=job.placement?.local||defaultPlacement(job.type),shelter=job.type==='shelter';
  if(shelter)return {camp,center:{x:camp?.x??job.placement?.x??0,z:camp?.z??job.placement?.z??0},yaw:camp?.yaw??job.placement?.yaw??0,width:FORT_RADIUS*1.55,depth:FORT_RADIUS*1.55,shelter:true};
  if(local&&BUILDING_FOOTPRINTS[job.type]&&job.type!=='palisade')return {camp,center:campWorld(camp,local),yaw:(camp.yaw||0)+(local.yaw||0),width:BUILDING_FOOTPRINTS[job.type].width,depth:BUILDING_FOOTPRINTS[job.type].depth,shelter:false,local};
  return {camp,center:gatePoint(camp,-2.8),yaw:camp.yaw||0,width:GATE_WIDTH+1.5,depth:2.8,shelter:false,perimeter:true};
}
function orient(center,yaw,x,z){return {x:center.x+Math.cos(yaw)*x+Math.sin(yaw)*z,z:center.z-Math.sin(yaw)*x+Math.cos(yaw)*z};}
function workStations(game,shape){
  if(shape.shelter||shape.perimeter){
    const camp=shape.camp,offset=shape.shelter?2.8:-3.2;
    return [-2,0,2].map(x=>campWorld(camp,{x,z:FORT_RADIUS+offset}));
  }
  const {center,yaw,width,depth,camp}=shape;
  const candidates=[{x:0,z:depth/2+1.5,side:'front'},{x:0,z:-depth/2-1.5,side:'back'},{x:width/2+1.5,z:0,side:'right'},{x:-width/2-1.5,z:0,side:'left'}];
  const suitable=candidates.map(point=>({point,world:orient(center,yaw,point.x,point.z)})).filter(({world})=>{
    const local=campLocal(camp,world),cleared=clearFortPosition(camp,world);
    return Math.hypot(local.x,local.z)<FORT_RADIUS-1.3&&distance(cleared,world)<.35;
  });
  suitable.sort((a,b)=>distance(a.world,game.player)-distance(b.world,game.player));
  const chosen=suitable[0]||{point:candidates[0],world:orient(center,yaw,candidates[0].x,candidates[0].z)};
  const alongX=['front','back'].includes(chosen.point.side),spots=[];
  for(const spread of [-1.8,0,1.8]){
    const world=orient(center,yaw,chosen.point.x+(alongX?spread:0),chosen.point.z+(alongX?0:spread));
    const local=campLocal(camp,world),cleared=clearFortPosition(camp,world);
    if(Math.hypot(local.x,local.z)<FORT_RADIUS-1.1&&distance(cleared,world)<.4)spots.push(world);
  }
  return spots.length?spots:[chosen.world];
}

function addInstances(group,name,parts,material){
  if(!parts.length)return;
  const mesh=new THREE.InstancedMesh(materials().box,material,parts.length);mesh.name=name;mesh.castShadow=false;mesh.receiveShadow=true;
  for(let i=0;i<parts.length;i++){
    const p=parts[i];position.set(p.x||0,p.y||0,p.z||0);scale.set(p.sx||.1,p.sy||.1,p.sz||.1);
    rotation.setFromEuler(new THREE.Euler(p.rx||0,p.ry||0,p.rz||0));matrix.compose(position,rotation,scale);mesh.setMatrixAt(i,matrix);
  }
  mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();group.add(mesh);
}
function clearVisual(record){
  if(!record.group)return;
  record.group.removeFromParent();record.group.traverse(o=>{if(o.isInstancedMesh)o.dispose?.();});record.group=null;
}
function buildVisual(game,record,stage){
  clearVisual(record);
  const shape=record.shape,group=new THREE.Group();group.name=`construction-${record.job.id}`;
  group.position.set(shape.center.x,(game.world?.sampleHeight?.(shape.center.x,shape.center.z)||0)+.09,shape.center.z);group.rotation.y=shape.yaw;
  const wood=[],stone=[],cloth=[],w=shape.width/2,d=shape.depth/2,height=.85+stage*.65;
  const edgePoints=shape.shelter?[-1,-.5,0,.5,1].flatMap(q=>[{x:q*w,z:-d},{x:q*w,z:d},{x:-w,z:q*d},{x:w,z:q*d}]):[{x:-w,z:-d},{x:w,z:-d},{x:-w,z:d},{x:w,z:d}];
  for(const point of edgePoints)wood.push({...point,y:height/2,sx:.14,sy:height,sz:.14});
  if(stage>=1){
    for(const y of [.65,height]){
      wood.push({x:0,y,z:-d,sx:shape.width,sy:.13,sz:.13},{x:0,y,z:d,sx:shape.width,sy:.13,sz:.13},{x:-w,y,z:0,sx:.13,sy:.13,sz:shape.depth},{x:w,y,z:0,sx:.13,sy:.13,sz:shape.depth});
    }
  }
  if(stage>=2){
    for(const side of [-1,1])wood.push({x:side*w,y:height*.5,z:0,sx:.14,sy:height,sz:.14,rx:Math.atan2(d*1.4,height)},{x:0,y:height*.5,z:side*d,sx:.14,sy:height,sz:.14,rz:Math.atan2(w*1.4,height)});
    for(const side of [-1,1])cloth.push({x:side*w,y:height*.65,z:0,sx:.025,sy:height*.38,sz:Math.min(3,shape.depth*.7)});
  }
  // Material stacks shrink as the real structure reaches later stages.
  const pileCount=Math.max(2,8-stage*2);
  const station=record.workPoints[Math.floor(record.workPoints.length/2)]||record.workPoints[0];
  const dx=station.x-shape.center.x,dz=station.z-shape.center.z,local={x:Math.cos(shape.yaw)*dx-Math.sin(shape.yaw)*dz,z:Math.sin(shape.yaw)*dx+Math.cos(shape.yaw)*dz};
  const face=Math.atan2(-local.x,-local.z),right={x:Math.cos(face),z:-Math.sin(face)},forward={x:Math.sin(face),z:Math.cos(face)};
  const stationPoint=(side,ahead=0)=>({x:local.x+right.x*side+forward.x*ahead,z:local.z+right.z*side+forward.z*ahead});
  for(let i=0;i<pileCount;i++){
    wood.push({...stationPoint(-3.7+(i%2)*.3,.3),y:.18+Math.floor(i/2)*.17,sx:.23,sy:.18,sz:2.4,ry:face});
    stone.push({...stationPoint(3.3+(i%2)*.45,.2),y:.15+Math.floor(i/2)*.25,sx:.42,sy:.27,sz:.5,ry:face});
  }
  // A physical bench and small cloth marker identify where a solo frog can work.
  wood.push({...stationPoint(0,1.2),y:.38,sx:4.8,sy:.18,sz:.75,ry:face},{...stationPoint(-2,1.2),y:.2,sx:.18,sy:.4,sz:.18},{...stationPoint(2,1.2),y:.2,sx:.18,sy:.4,sz:.18},{...stationPoint(3.5),y:1.1,sx:.1,sy:2.2,sz:.1});
  cloth.push({...stationPoint(3.9),y:1.8,sx:.8,sy:.45,sz:.025,ry:face});
  addInstances(group,'timber-scaffolding',wood,materials().wood);addInstances(group,'stored-construction-stone',stone,materials().stone);addInstances(group,'site-cloth',cloth,materials().cloth);
  group.userData.constructionJobId=record.job.id;group.userData.stage=stage;game.scene?.add?.(group);record.group=group;record.stage=stage;
  game.world?.setConstructionProgress?.(record.job,clamp(record.job.progress/Math.max(.001,record.job.duration),0,1),shape.camp);
}

function makeMallet(f){
  const wrist=f.model?.bones?.wrist1;if(!wrist||f.constructionMallet)return;
  const group=new THREE.Group();group.name='borrowed-construction-mallet';
  addInstances(group,'reed-handle-and-head',[{x:0,y:.08,z:.13,sx:.055,sy:.055,sz:.44},{x:0,y:.08,z:.32,sx:.29,sy:.15,sz:.14}],materials().wood);
  wrist.add(group);f.constructionMallet=group;
}
function removeMallet(f){
  const group=f.constructionMallet;if(!group)return;group.removeFromParent();group.traverse(o=>{if(o.isInstancedMesh)o.dispose?.();});delete f.constructionMallet;
}
function setWorking(f,value){
  if(!f)return;f.buildWorking=!!value;f.model?.setWorking?.(!!value);
  if(value)makeMallet(f);else removeMallet(f);
}
function releaseWorker(game,id){
  const entry=workers(game).get(id);if(!entry)return;
  const f=entry.actor;state(game).get(entry.jobId)?.workers.delete(id);
  if(f.buildJobId===entry.jobId)delete f.buildJobId;
  setWorking(f,false);f.intent=null;f.brain=0;workers(game).delete(id);
}
function releaseSite(game,record){
  for(const id of [...record.workers])releaseWorker(game,id);
  clearVisual(record);state(game).delete(record.job.id);
}

export function constructionQueued(game,job){
  if(!validJob(job))return null;
  if(state(game).has(job.id))return state(game).get(job.id);
  const camp=campFor(game,job);if(!camp)return null;
  const shape=footprint(game,job),record={job,shape,workers:new Set(),workPoints:workStations(game,shape),stage:-1,nextAssignmentAt:0,group:null};
  job.workPoint={...record.workPoints[Math.floor(record.workPoints.length/2)]};job.workersPresent=0;job.workersAssigned=0;job.workRate=0;
  state(game).set(job.id,record);buildVisual(game,record,Math.min(3,Math.floor(clamp(job.progress/Math.max(.001,job.duration),0,1)*4)));
  return record;
}

function assignWorkers(game,record){
  for(const id of [...record.workers]){
    const entry=workers(game).get(id),f=entry?.actor;
    if(!f||!freeFollower(game,f)||nearThreat(game,f)||!(game.frogs||[]).includes(f))releaseWorker(game,id);
  }
  if(!safe(game,record)){for(const id of [...record.workers])releaseWorker(game,id);return;}
  if((game.elapsed||0)<record.nextAssignmentAt)return;record.nextAssignmentAt=(game.elapsed||0)+.5;
  const count=Math.min(MAX_BUILDERS_PER_SITE,record.workPoints.length);
  const available=(game.frogs||[]).filter(f=>freeFollower(game,f)&&!workers(game).has(f.id)&&!nearThreat(game,f)&&distance(f,record.job.workPoint)<=75).sort((a,b)=>distance(a,record.job.workPoint)-distance(b,record.job.workPoint));
  while(record.workers.size<count&&available.length){
    const f=available.shift(),index=[...Array(record.workPoints.length).keys()].find(i=>![...record.workers].some(id=>workers(game).get(id)?.index===i));
    record.workers.add(f.id);workers(game).set(f.id,{actor:f,jobId:record.job.id,index});f.buildJobId=record.job.id;f.intent=null;f.brain=0;
  }
}

function playerAtWork(game,record){
  const p=game.player;
  if(!living(p)||p.grabbedBy||p.grounded===false||p.swimming||p.blocking||p.stun>0||(p.attackAnim||0)>.02||game.input?.left||nearThreat(game,p))return false;
  if(Math.hypot(p.vx||0,p.vz||0)>.45||(p.speed||0)>.6)return false;
  return record.workPoints.some(point=>distance(p,point)<=PLAYER_BUILD_REACH);
}

/** Existing movement/routing handles this target; construction never teleports workers. */
export function builderIntent(game,f){
  const entry=workers(game).get(f.id);if(!entry)return null;
  const record=state(game).get(entry.jobId);
  if(!record||!safe(game,record)||!freeFollower(game,f)||nearThreat(game,f)||!(game.economy?.jobs||[]).some(job=>job.id===entry.jobId)){
    releaseWorker(game,f.id);return null;
  }
  return {kind:'move',target:record.workPoints[entry.index],building:true,jobId:entry.jobId};
}

/** Progress is impossible without a living, stationary frog physically at a work station. */
export function constructionWorkRate(game,job){
  if(!validJob(job))return 1;
  const record=state(game).get(job.id)||constructionQueued(game,job);if(!record)return 0;
  record.job=job;
  if(!safe(game,record)){job.workersPresent=0;job.workersAssigned=record.workers.size;job.playerBuilding=false;job.workRate=0;return 0;}
  let present=0;
  for(const id of record.workers){
    const entry=workers(game).get(id),f=entry?.actor,point=record.workPoints[entry?.index||0];
    const working=!!f&&freeFollower(game,f)&&!nearThreat(game,f)&&distance(f,point)<=BUILDER_REACH&&Math.hypot(f.vx||0,f.vz||0)<.7&&f.grounded!==false&&!f.swimming;
    setWorking(f,working);if(working){present++;f.yaw=Math.atan2(record.shape.center.x-f.x,record.shape.center.z-f.z);}
  }
  const player=(!game.constructionPlayerActiveJob||game.constructionPlayerActiveJob===job.id)&&playerAtWork(game,record);job.playerBuilding=player;
  if(player){present++;game.constructionPlayerActiveJob=job.id;game.player.buildJobId=job.id;setWorking(game.player,true);}
  job.workersPresent=present;job.workersAssigned=record.workers.size;job.workRate=present?Math.min(1.75,1+(present-1)*.25):0;
  if(!present)job.reason=record.workers.size?'Οι οικοδόμοι πηγαίνουν στο εργοτάξιο.':'Πλησίασε το σημείο εργασίας ή φέρε ελεύθερους συνοδούς.';
  return job.workRate;
}

export function updateConstructionSites(game,dt=0){
  const jobs=(game.economy?.jobs||[]).filter(validJob),current=new Set(jobs.map(job=>job.id));
  for(const record of [...state(game).values()])if(!current.has(record.job.id))releaseSite(game,record);
  game.constructionPlayerActiveJob=null;
  for(const job of jobs){
    const record=state(game).get(job.id)||constructionQueued(game,job);if(!record)continue;
    record.job=job;assignWorkers(game,record);
    const stage=Math.min(3,Math.floor(clamp(job.progress/Math.max(.001,job.duration),0,1)*4));
    if(stage!==record.stage)buildVisual(game,record,stage);
    constructionWorkRate(game,job);
  }
  if(!game.constructionPlayerActiveJob){setWorking(game.player,false);if(game.player?.buildJobId)delete game.player.buildJobId;}
}

/** Release temporary tools and assignments on region change or world reset. */
export function disposeConstructionSites(game){
  for(const record of [...state(game).values()])releaseSite(game,record);
  for(const id of [...workers(game).keys()])releaseWorker(game,id);
  setWorking(game.player,false);if(game.player?.buildJobId)delete game.player.buildJobId;
  game.constructionSites=new Map();game.constructionWorkers=new Map();game.constructionPlayerActiveJob=null;
}

import {worldRings,contains,polygonBounds} from './geometry.mjs';
import {heightCm,openingLine,architecture} from './architecture.mjs';

export const STRUCTURE_TYPES=['column','beam','ceiling'];
export const DEFAULT_RULES={edges:true,outerFirst:false,toleranceCm:5,gridCm:1,nudgeCm:.1};
export const precise=n=>Math.round(n*1e6)/1e6;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export const rules=plan=>({...DEFAULT_RULES,...plan.editing});
export const unitCm=plan=>plan.measurement?.cmPerUnit??1;
export function validateStructure(i){
  const out={};
  for(const [key,min,max] of [['elevationCm',0,10000],['thicknessCm',1,1000],['depthCm',1,1000],['offsetCm',-10000,10000],['projectionCm',-1000,1000]]){
    if(i[key]!==undefined){if(!STRUCTURE_TYPES.includes(i.type)||typeof i[key]!=='number'||!Number.isFinite(i[key])||i[key]<min||i[key]>max)throw Error('Μη έγκυρη στάθμη ή διάσταση δομικού στοιχείου.');out[key]=i[key];}
  }
  for(const key of ['ceilingSourceId','ceilingId'])if(i[key]!==undefined){if(typeof i[key]!=='string'||!i[key]||i[key].length>80||(key==='ceilingSourceId'?i.type!=='ceiling':i.type!=='beam'))throw Error('Μη έγκυρη σύνδεση οροφής.');out[key]=i[key];}
  if(i.outerAnchor!==undefined){if(typeof i.outerAnchor!=='boolean')throw Error('Μη έγκυρη εξωτερική αναφορά.');out.outerAnchor=i.outerAnchor;}
  const validRef=r=>r&&typeof r.id==='string'&&r.id.length>0&&r.id.length<=80&&(['column'].includes(r.kind)||r.kind==='wall'&&Number.isInteger(r.ring)&&r.ring>=0&&r.ring<50&&Number.isInteger(r.edge)&&r.edge>=0&&r.edge<800&&Number.isFinite(r.t)&&r.t>=0&&r.t<=1);
  if(i.wallAttachment!==undefined){const r=i.wallAttachment;if(i.type!=='column'||!validRef({...r,kind:'wall'})||![1,-1].includes(r.side))throw Error('Μη έγκυρη σύνδεση κολώνας.');out.wallAttachment={...r};}
  if(i.beamEnds!==undefined){if(i.type!=='beam'||!Array.isArray(i.beamEnds)||i.beamEnds.length!==2||i.beamEnds.some(r=>r!==null&&!validRef(r)))throw Error('Μη έγκυρες συνδέσεις δοκαριού.');out.beamEnds=i.beamEnds.map(r=>r?{...r}:null);}
  return out;
}
export function validateRules(value){
  if(value===undefined)return undefined;
  if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Μη έγκυροι κανόνες στοίχισης.');
  const out={...DEFAULT_RULES};
  for(const key of ['edges','outerFirst'])if(value[key]!==undefined){if(typeof value[key]!=='boolean')throw Error('Μη έγκυροι κανόνες στοίχισης.');out[key]=value[key];}
  for(const [key,min,max] of [['toleranceCm',.1,100],['gridCm',.01,100],['nudgeCm',.001,100]])if(value[key]!==undefined){if(typeof value[key]!=='number'||!Number.isFinite(value[key])||value[key]<min||value[key]>max)throw Error('Μη έγκυρο βήμα στοίχισης.');out[key]=value[key];}
  return out;
}
export function wallEdges(plan,includeHidden=true){
  const cm=unitCm(plan),out=[];
  for(const i of plan.items.filter(i=>i.floor===plan.activeFloor&&(includeHidden||!i.hidden)&&(i.type==='wall'||['room','ramp','stairs'].includes(i.type)&&!i.floorOnly))){
    const rings=i.type==='wall'?[openingLine({...i,type:'window'},1)]:worldRings(i);
    rings.forEach((ring,ri)=>ring.forEach((a,ei)=>{if(i.type==='wall'&&ei)return;const b=ring[(ei+1)%ring.length],length=Math.hypot(b.x-a.x,b.y-a.y);if(length<1e-8)return;
      const mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2},left={x:-(b.y-a.y)/length,y:(b.x-a.x)/length};
      if(i.type!=='wall'&&!contains(rings,{x:mid.x+left.x*.001,y:mid.y+left.y*.001})){left.x*=-1;left.y*=-1;}
      out.push({a,b,length,normal:left,thickness:i.type==='wall'?i.h:14/cm,id:i.id,ring:ri,edge:ei,item:i});
    }));
  }return out;
}
export function nearestWall(plan,p,id){
  let best;
  for(const e of wallEdges(plan,false)){if(id&&e.id!==id)continue;const dx=e.b.x-e.a.x,dy=e.b.y-e.a.y,t=clamp(((p.x-e.a.x)*dx+(p.y-e.a.y)*dy)/(e.length*e.length),0,1),q={x:e.a.x+t*dx,y:e.a.y+t*dy},distance=Math.hypot(p.x-q.x,p.y-q.y);
    if(!best||distance<best.distance)best={...e,t,point:q,distance};
  }return best;
}
export function columnPose(plan,i,ref){
  const e=wallEdges({...plan,activeFloor:i.floor}).find(e=>e.id===ref.id&&e.ring===ref.ring&&e.edge===ref.edge);if(!e)return null;
  const t=clamp(ref.t,0,1),cm=unitCm(plan),side=ref.side??1,offset=e.thickness/2+(i.projectionCm??i.h*cm/2)/cm-i.h/2;
  const cx=e.a.x+(e.b.x-e.a.x)*t+e.normal.x*side*offset,cy=e.a.y+(e.b.y-e.a.y)*t+e.normal.y*side*offset;
  return {x:precise(cx-i.w/2),y:precise(cy-i.h/2),rotation:precise(Math.atan2(e.b.y-e.a.y,e.b.x-e.a.x)*180/Math.PI),wallAttachment:{id:e.id,ring:e.ring,edge:e.edge,t,side}};
}
export function attachColumn(plan,i,p,id){const e=nearestWall({...plan,activeFloor:i.floor},p,id);return e?columnPose(plan,i,{id:e.id,ring:e.ring,edge:e.edge,t:e.t,side:i.wallAttachment?.side??1}):null;}
export function referenceCeiling(plan,i){
  const choices=plan.items.filter(o=>o.floor===i.floor&&(o.type==='ceiling'||['room','ramp','stairs'].includes(o.type)));
  const ref=choices.find(o=>o.id===i.ceilingId)??choices.find(o=>o.type==='ceiling'&&contains(worldRings(o),{x:i.x+i.w/2,y:i.y+i.h/2}))??choices.find(o=>contains(worldRings(o),{x:i.x+i.w/2,y:i.y+i.h/2}));
  return {id:ref?.id,elevationCm:ref?.type==='ceiling'?(ref.elevationCm??280):ref?heightCm(ref):280,thicknessCm:ref?.type==='ceiling'?(ref.thicknessCm??20):20};
}
export function structuralSpan(plan,i){
  if(i.type==='column')return {bottom:0,top:heightCm(i)};
  if(i.type==='ceiling')return {bottom:i.elevationCm??280,top:(i.elevationCm??280)+(i.thicknessCm??20)};
  const ref=referenceCeiling(plan,i),top=ref.elevationCm+(i.offsetCm??0);return {bottom:top-(i.depthCm??40),top,reference:ref.elevationCm,drop:Math.max(0,ref.elevationCm-top+(i.depthCm??40))};
}
export function beamPose(a,b,width){const w=Math.hypot(b.x-a.x,b.y-a.y);if(w<.000001)return null;return {x:precise((a.x+b.x)/2-w/2),y:precise((a.y+b.y)/2-width/2),w:precise(w),h:width,rotation:precise(Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI)};}
export function beamPoints(i){const a=i.rotation*Math.PI/180,dx=Math.cos(a)*i.w/2,dy=Math.sin(a)*i.w/2,cx=i.x+i.w/2,cy=i.y+i.h/2;return [{x:cx-dx,y:cy-dy},{x:cx+dx,y:cy+dy}];}
function refPoint(plan,r){if(!r)return null;const i=plan.items.find(i=>i.id===r.id);if(!i)return null;if(r.kind==='column')return {x:i.x+i.w/2,y:i.y+i.h/2};const e=wallEdges({...plan,activeFloor:i.floor}).find(e=>e.id===r.id&&e.ring===r.ring&&e.edge===r.edge);return e?{x:e.a.x+(e.b.x-e.a.x)*r.t,y:e.a.y+(e.b.y-e.a.y)*r.t}:null;}
export function reconcileStructure(plan,before){
  const changedPose=(a,b,keys)=>keys.some(k=>a?.[k]!==b?.[k]);
  for(const i of plan.items.filter(i=>i.type==='ceiling'&&i.ceilingSourceId)){
    const source=plan.items.find(o=>o.id===i.ceilingSourceId&&o.floor===i.floor&&['room','ramp','stairs'].includes(o.type));
    const old=before?.items.find(o=>o.id===i.id),oldSource=before?.items.find(o=>o.id===i.ceilingSourceId);
    if(!source||old&&changedPose(old,i,['x','y','w','h','rotation'])&&!changedPose(oldSource,source,['x','y','w','h','rotation'])){delete i.ceilingSourceId;continue;}
    for(const k of ['x','y','w','h','rotation'])i[k]=source[k];if(source.outline)i.outline=structuredClone(source.outline);else delete i.outline;
  }
  for(const i of plan.items.filter(i=>i.type==='column'&&i.wallAttachment)){
    const old=before?.items.find(o=>o.id===i.id),host=plan.items.find(o=>o.id===i.wallAttachment.id),oldHost=before?.items.find(o=>o.id===i.wallAttachment.id);
    if(old&&old.projectionCm===i.projectionCm&&old.w===i.w&&old.h===i.h&&JSON.stringify(old.wallAttachment)===JSON.stringify(i.wallAttachment)&&changedPose(old,i,['x','y','rotation'])&&!changedPose(oldHost,host,['x','y','w','h','rotation'])){delete i.wallAttachment;continue;}
    const pose=columnPose(plan,i,i.wallAttachment);if(pose)Object.assign(i,pose);else delete i.wallAttachment;
  }
  for(const i of plan.items.filter(i=>i.type==='beam'&&i.beamEnds)){
    const old=before?.items.find(o=>o.id===i.id);
    const hostsChanged=i.beamEnds.some(r=>r&&changedPose(before?.items.find(o=>o.id===r.id),plan.items.find(o=>o.id===r.id),['x','y','w','h','rotation']));
    if(old&&!hostsChanged&&JSON.stringify(old.beamEnds)===JSON.stringify(i.beamEnds)&&changedPose(old,i,['x','y','w','rotation'])){delete i.beamEnds;continue;}
    const points=beamPoints(i),next=i.beamEnds.map((r,n)=>refPoint(plan,r)??points[n]),pose=beamPose(next[0],next[1],i.h);
    if(pose)Object.assign(i,pose);i.beamEnds=i.beamEnds.map(r=>r&&refPoint(plan,r)?r:null);
  }
}
export function snapPoint(plan,p,tolerance){
  const cm=unitCm(plan),tol=tolerance??rules(plan).toleranceCm/cm;let best;
  for(const i of plan.items.filter(i=>i.floor===plan.activeFloor&&!i.hidden&&i.type==='column')){const q={x:i.x+i.w/2,y:i.y+i.h/2},d=Math.hypot(q.x-p.x,q.y-p.y);if(d<=tol&&(!best||d<best.distance))best={point:q,distance:d,ref:{kind:'column',id:i.id}};}
  const e=nearestWall(plan,p);if(e&&e.distance<=tol&&(!best||e.distance<best.distance))best={point:e.point,distance:e.distance,ref:{kind:'wall',id:e.id,ring:e.ring,edge:e.edge,t:e.t}};
  if(best)return best;
  const grid=plan.measurement?rules(plan).gridCm/cm:10;
  return {point:{x:precise(Math.round(p.x/grid)*grid),y:precise(Math.round(p.y/grid)*grid)},ref:null};
}
export function snapMove(plan,originals,dx,dy,tolerance){
  const settings=rules(plan),ids=new Set(originals.map(i=>i.id)),cm=unitCm(plan),tol=tolerance??settings.toleranceCm/cm;
  const targets=plan.items.filter(i=>i.floor===plan.activeFloor&&!i.hidden&&!ids.has(i.id)&&!['route','text','note','marker','ceiling','beam'].includes(i.type)&&(!settings.outerFirst||i.outerAnchor));
  let sx=null,sy=null;const guides=[];
  if(settings.edges){
    const moving=polygonBounds(originals.flatMap(i=>worldRings({...i,x:i.x+dx,y:i.y+dy})));
    const values=b=>[[b.x,b.x+b.w/2,b.x+b.w],[b.y,b.y+b.h/2,b.y+b.h]];
    const [mx,my]=values(moving);
    for(const i of targets){const [tx,ty]=values(polygonBounds(worldRings(i)));for(const x of mx)for(const t of tx){const d=t-x;if(Math.abs(d)<=tol&&(sx===null||Math.abs(d)<Math.abs(sx.delta)))sx={delta:d,value:t};}for(const y of my)for(const t of ty){const d=t-y;if(Math.abs(d)<=tol&&(sy===null||Math.abs(d)<Math.abs(sy.delta)))sy={delta:d,value:t};}}
  }
  const grid=plan.measurement?settings.gridCm/cm:10;
  if(sx){dx+=sx.delta;guides.push({axis:'x',value:sx.value});}else dx=Math.round(dx/grid)*grid;
  if(sy){dy+=sy.delta;guides.push({axis:'y',value:sy.value});}else dy=Math.round(dy/grid)*grid;
  return {dx:precise(dx),dy:precise(dy),guides};
}
export function snapResizePoint(plan,original,p,sx,sy){
  const r=rules(plan),cm=unitCm(plan),tol=r.toleranceCm/cm,grid=plan.measurement?r.gridCm/cm:10,targets=plan.items.filter(i=>i.id!==original.id&&i.floor===original.floor&&!i.hidden&&!['route','text','note','marker','ceiling','beam'].includes(i.type)&&(!r.outerFirst||i.outerAnchor));
  const guides=[],out={...p},a=original.rotation*Math.PI/180,c=Math.cos(a),s=Math.sin(a),origin={x:original.x+original.w/2+c*sx*original.w/2-s*sy*original.h/2,y:original.y+original.h/2+s*sx*original.w/2+c*sy*original.h/2};
  for(const [axis,enabled] of [['x',Math.abs(c*sx)+Math.abs(s*sy)>1e-8],['y',Math.abs(s*sx)+Math.abs(c*sy)>1e-8]]){if(!enabled)continue;let best;
    if(r.edges)for(const i of targets){const b=polygonBounds(worldRings(i)),values=axis==='x'?[b.x,b.x+b.w/2,b.x+b.w]:[b.y,b.y+b.h/2,b.y+b.h];for(const value of values){const d=value-p[axis];if(Math.abs(d)<=tol&&(!best||Math.abs(d)<Math.abs(best.d)))best={d,value};}}
    if(best){out[axis]=best.value;guides.push({axis,value:best.value});}else out[axis]=precise(origin[axis]+Math.round((p[axis]-origin[axis])/grid)*grid);
  }return {...out,guides};
}
// Intersect the same polygon rings and vertical spans used by the 3D view.
export function sectionIntervals(rings,axis,position){
  const along=axis==='x'?'x':'y',across=axis==='x'?'y':'x',hits=[];
  for(const ring of rings)ring.forEach((a,n)=>{const b=ring[(n+1)%ring.length];if((a[across]<=position&&b[across]>position)||(b[across]<=position&&a[across]>position)){const t=(position-a[across])/(b[across]-a[across]);hits.push(a[along]+(b[along]-a[along])*t);}});
  hits.sort((a,b)=>a-b);const spans=[];for(let n=1;n<hits.length;n+=2)if(hits[n]-hits[n-1]>1e-7)spans.push([hits[n-1],hits[n]]);return spans;
}
export function sectionGeometry(plan,axis,position){
  const cm=unitCm(plan),items=plan.items.filter(i=>i.floor===plan.activeFloor&&!i.hidden),blocks=[];
  const add=(i,rings,span)=>{for(const [left,right] of sectionIntervals(rings,axis,position))blocks.push({id:i.id,type:i.type,label:i.label,color:i.color,left:left*cm/100,right:right*cm/100,bottom:span.bottom/100,top:span.top/100,drop:span.drop});};
  for(const i of items){if(STRUCTURE_TYPES.includes(i.type))add(i,worldRings(i),structuralSpan(plan,i));else if(['room','ramp','stairs'].includes(i.type))add(i,worldRings(i),{bottom:-8,top:0});}
  const model=architecture(items,cm);
  for(const wall of model.blocks){const dx=wall.b.x-wall.a.x,dy=wall.b.y-wall.a.y,len=Math.hypot(dx,dy),nx=-dy/len*wall.thickness/2,ny=dx/len*wall.thickness/2;
    const ring=[{x:wall.a.x+nx,y:wall.a.y+ny},{x:wall.b.x+nx,y:wall.b.y+ny},{x:wall.b.x-nx,y:wall.b.y-ny},{x:wall.a.x-nx,y:wall.a.y-ny}].map(p=>({x:p.x*100/cm,y:p.y*100/cm}));
    add({id:wall.owners[0],type:'wall',color:'#a4b2b2',label:'Τοίχος'},[ring],{bottom:wall.bottom*100,top:wall.top*100});
  }
  for(const i of items.filter(i=>['room','ramp','stairs'].includes(i.type)&&!i.floorOnly&&!plan.items.some(o=>o.floor===i.floor&&o.type==='ceiling'&&o.ceilingSourceId===i.id)))add({...i,type:'ceiling',color:'#cad6d2'},worldRings(i),{bottom:heightCm(i),top:heightCm(i)+6});
  return blocks;
}

/** Chapter two: deterministic, game-only lower-deck movement and perception. */
export const LIMITS={minX:-6.8,maxX:6.8,minZ:.3,maxZ:25.7};
export const START={x:-4.5,z:23.1};
export const WALLS=[
 {x:-7,z:13,w:.25,d:26},{x:7,z:13,w:.25,d:26},{x:0,z:0,w:14,d:.25},{x:0,z:26,w:14,d:.25},
 {x:-2,z:22,w:.22,d:8},{x:-2,z:14.9,w:.22,d:2.2},{x:-2,z:11.95,w:.22,d:3.9},{x:-2,z:4,w:.22,d:8},
 {x:-6.25,z:20,w:1.5,d:.22},{x:-2.75,z:20,w:1.5,d:.22},
 {x:-4.5,z:14,w:5,d:.22},{x:-4.5,z:6,w:5,d:.22},
 {x:2,z:23,w:.22,d:6},{x:2,z:14,w:.22,d:8},{x:2,z:4,w:.22,d:8},
 {x:4.5,z:14,w:5,d:.22},{x:4.5,z:6,w:5,d:.22}
];
export const FURNITURE=[
 {id:'bed',x:-5.5,z:24.4,w:2.1,d:1.05,h:.6},
 {id:'wash',x:-5.7,z:17.7,w:1.2,d:1.2,h:1.1},
 {id:'linen',x:-3.1,z:18.8,w:.85,d:1.1,h:1.3},
 {id:'desk',x:5,z:8.9,w:2,d:.85,h:.85},
 {id:'store',x:-5.8,z:8.1,w:.7,d:2.2,h:1.5},
 {id:'locker',x:5.9,z:21.4,w:.85,d:2.3,h:1.5},
 {id:'trolley',x:4.9,z:17.6,w:1.2,d:.7,h:.7}
];
export const HATCH={x:-4.5,z:20,w:2,d:.26,id:'hatch'};
export const STORE_DOOR={x:-2,z:9,w:.28,d:2,id:'storeDoor'};
export const LOW={x:-4.5,z:20,w:2,d:1.4};
export const ITEMS=[
 {id:'mug',label:'ΜΕΤΑΛΛΙΚΟ ΚΥΠΕΛΛΟ',x:-3.3,z:22.4},
 {id:'tin',label:'ΑΔΕΙΟ ΔΟΧΕΙΟ',x:-3.0,z:15.7},
 {id:'bottle-empty',label:'ΑΔΕΙΟ ΜΠΟΥΚΑΛΙ',x:3.2,z:18.1}
];
export const HOTSPOTS=[
 {id:'hatch',x:-4.5,z:20.5,label:'ΑΝΟΙΞΕ ΘΥΡΙΔΑ',icon:'↗'},
 {id:'card',x:5,z:9.3,label:'ΠΑΡΕ ΚΑΡΤΑ',icon:'▣'},
 {id:'storeDoor',x:-1.8,z:9,label:'ΑΝΟΙΞΕ ΑΠΟΘΗΚΗ',icon:'▤'},
 {id:'whisky',x:-5.2,z:8.1,label:'ΠΑΡΕ ΟΥΙΣΚΙ',icon:'🥃'},
 {id:'exit',x:0,z:1.35,label:'ΑΝΕΒΑ ΣΤΟ ΚΑΤΑΣΤΡΩΜΑ',icon:'↥'}
];
export const ROUTES=[
 {role:'steward',name:'ΠΛΗΡΩΜΑ',route:[{x:0,z:22.7},{x:0,z:16.8},{x:4,z:18.9},{x:0,z:18.9}],speed:.86},
 {role:'securityM',name:'ΦΥΛΑΚΑΣ',route:[{x:.7,z:12.3},{x:.7,z:5.0},{x:-.7,z:5.0},{x:-.7,z:12.3}],speed:.90},
 {role:'securityF',name:'ΑΣΦΑΛΕΙΑ',route:[{x:3.3,z:16},{x:3.3,z:19.2},{x:5.8,z:19.2}],speed:.78}
];
export const bound=(v,a,b)=>Math.max(a,Math.min(b,v));
export const angle=a=>Math.atan2(Math.sin(a),Math.cos(a));
export const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
export function inside(p,b,r=0){return Math.abs(p.x-b.x)<b.w/2+r&&Math.abs(p.z-b.z)<b.d/2+r;}
export function collides(p,b,r=.34){const x=bound(p.x,b.x-b.w/2,b.x+b.w/2),z=bound(p.z,b.z-b.d/2,b.z+b.d/2);return Math.hypot(p.x-x,p.z-z)<r;}
export function segment(a,b,o){let lo=0,hi=1;for(const [axis,size]of [['x','w'],['z','d']]){const d=b[axis]-a[axis],min=o[axis]-o[size]/2,max=o[axis]+o[size]/2;if(Math.abs(d)<1e-7){if(a[axis]<min||a[axis]>max)return false;}else{let t=(min-a[axis])/d,u=(max-a[axis])/d;if(t>u)[t,u]=[u,t];lo=Math.max(lo,t);hi=Math.min(hi,u);if(lo>hi)return false;}}return hi>0.015&&lo<.985;}
export function obstacles(s){return [...WALLS,...FURNITURE,...(!s.hatch?[HATCH]:[]),...(!s.storeOpen?[STORE_DOOR]:[])];}
export function clear(a,b,solids){return !solids.some(o=>segment(a,b,o));}
export function walkable(p,solids,crouch=false,r=.34){return p.x>LIMITS.minX+r&&p.x<LIMITS.maxX-r&&p.z>LIMITS.minZ+r&&p.z<LIMITS.maxZ-r&&!solids.some(o=>collides(p,o,r))&&(crouch||!inside(p,LOW,r));}
export function move(p,dx,dz,solids,crouch=false){const n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.08)),before={...p};for(let i=0;i<n;i++)for(const axis of ['x','z']){const next={...p,[axis]:p[axis]+(axis==='x'?dx:dz)/n};if(walkable(next,solids,crouch))p[axis]=next[axis];}return distance(p,before);}
export function canSee(g,p,crouch,solids){const d=distance(g,p);if(d>(crouch?3.3:4.6))return false;if(d>.85&&Math.abs(angle(Math.atan2(p.x-g.x,p.z-g.z)-g.yaw))>(crouch?.53:.62))return false;return clear(g,p,solids);}
export function path(from,to,solids,crouch=false){
 const step=.45,key=p=>Math.round(p.x/step)+','+Math.round(p.z/step),nodes=new Map(),open=[],closed=new Set();
 const start={x:Math.round(from.x/step)*step,z:Math.round(from.z/step)*step,g:0,parent:null};start.f=distance(start,to);open.push(start);nodes.set(key(start),start);let best=start;
 for(let count=0;open.length&&count<2500;count++){
  open.sort((a,b)=>b.f-a.f);const a=open.pop(),k=key(a);if(closed.has(k))continue;closed.add(k);if(distance(a,to)<distance(best,to))best=a;
  if(distance(a,to)<step*.8&&clear(a,to,solids)){best={...to,parent:a};break;}
  for(const [dx,dz]of [[step,0],[-step,0],[0,step],[0,-step]]){const b={x:a.x+dx,z:a.z+dz},id=key(b);if(closed.has(id)||!walkable(b,solids,crouch,.35)||!clear(a,b,solids))continue;const g=a.g+step,old=nodes.get(id);if(old&&old.g<=g)continue;Object.assign(b,{g,f:g+distance(b,to),parent:a});nodes.set(id,b);open.push(b);}
 }
 const result=[];for(let p=best;p&&p.parent;p=p.parent)result.push({x:p.x,z:p.z});return result.reverse();
}
export function newEscape(){return {position:{...START},yaw:Math.PI,time:0,crouch:false,hatch:false,card:false,storeOpen:false,bottle:false,intox:0,alert:0,stage:'sleep',caught:0,throws:0,heard:0,held:null,checkpoint:'cell'};}
export function snapshot(s){return {position:{...s.position},yaw:s.yaw,hatch:!!s.hatch,card:!!s.card,storeOpen:!!s.storeOpen,bottle:!!s.bottle,intox:bound(s.intox,0,100),caught:s.caught,throws:s.throws,heard:s.heard,checkpoint:s.checkpoint};}
export function restore(data){const s=newEscape();if(!data||typeof data!=='object')return s;for(const k of ['hatch','card','storeOpen','bottle'])s[k]=data[k]===true;for(const k of ['intox','caught','throws','heard'])s[k]=bound(Number(data[k])||0,0,k==='intox'?100:9999);if(data.position&&Number.isFinite(data.position.x)&&Number.isFinite(data.position.z)&&walkable(data.position,obstacles(s),true)){s.position={x:data.position.x,z:data.position.z};s.crouch=inside(s.position,LOW,.35);}s.yaw=Number.isFinite(data.yaw)?data.yaw:Math.PI;s.checkpoint=s.bottle?'store':s.card?'card':data.checkpoint==='laundry'?'laundry':'cell';s.stage='escape';return s;}

/** Shared walkable architecture: visuals, player and guards use the same decks and stairs. */
import {clamp,circleBox} from './chaos-model170.js';
export const DECKS=[
 {id:'service',name:'04 · Μηχανοστάσιο / πλήρωμα',y:6.65,z0:-43,z1:40,w:8.5},
 {id:'main',name:'05 · Κύριο κατάστρωμα',y:10.10,z0:-66,z1:71.5,w:12},
 {id:'pool',name:'06 · Πισίνα / καμπίνες',y:13.12,z0:-60.8,z1:40.8,w:10.10},
 {id:'dining',name:'07 · Εστιατόριο / θέατρο',y:15.83,z0:-40.7,z1:33.6,w:9.73},
 {id:'upper',name:'08 · Άνω κατάστρωμα / γέφυρα',y:18.57,z0:-34.1,z1:32.9,w:9.28},
 {id:'sky',name:'09 · Πανοραμικό σαλόνι',y:21.35,z0:-27.3,z1:27.3,w:8.18}
];
export const CORES=[{id:'fore',x:6.4,w:2.2,z0:18,z1:26},{id:'aft',x:-6.4,w:2.2,z0:-25,z1:-17}];
export const STAIRS=[];
for(let i=0;i<DECKS.length-1;i++)for(const c of CORES)STAIRS.push({...c,id:c.id+i,low:DECKS[i].y,high:DECKS[i+1].y});
// Both sides of the existing pool are now reachable without crossing the basin.
STAIRS.push({id:'pool-port',x:-6.4,w:2.2,z0:-59,z1:-51,low:10.1,high:13.12});
STAIRS.push({id:'pool-starboard',x:6.4,w:2.2,z0:-59,z1:-51,low:10.1,high:13.12});
const stations=[[-68,4.5],[-66,7.2],[-62,9.7],[-54,11.55],[-40,12],[-20,12.3],[6,12.3],[28,11.95],[43,10.85],[55,8.4],[63,5.8],[70,2.9],[75,.12]];
export function hullWidth(z){z=clamp(z,-68,75);let i=0;while(i<stations.length-2&&z>stations[i+1][0])i++;const p0=stations[Math.max(0,i-1)][1],p1=stations[i][1],p2=stations[i+1][1],p3=stations[Math.min(stations.length-1,i+2)][1],t=(z-stations[i][0])/(stations[i+1][0]-stations[i][0]);return .5*(2*p1+(-p0+p2)*t+(2*p0-5*p1+4*p2-p3)*t*t+(-p0+3*p1-3*p2+p3)*t*t*t);}
export function deckWidth(d,z){if(d.id==='main')return hullWidth(z)*.98-.36;return Math.min(d.w,hullWidth(z)-.8);}
const inStair=(st,x,z,pad=0)=>Math.abs(x-st.x)<=st.w/2+pad&&z>=st.z0-pad&&z<=st.z1+pad;
export function floorCandidates(x,z){
 const out=[];
 // Existing bridge and its visible starboard access are retained.
 if(x>=-9.65&&x<=10.45&&z>=31.9&&z<=46.4)out.push({y:18.43,id:'bridge'});
 if(x>=9.3&&x<=13.42&&z>=31.85&&z<=33.85)out.push({y:18.43,id:'bridge-access'});
 if(x>=11.78&&x<=13.42&&z>=33.75&&z<=49.32)out.push({y:18.43-clamp((z-33.85)/15.25,0,1)*8.33,id:'original-stair',ramp:true});
 if(x>=7.65&&x<=13.42&&z>=49.12&&z<=51.58)out.push({y:10.1,id:'landing'});
 for(const d of DECKS){if(z<d.z0||z>d.z1||Math.abs(x)>deckWidth(d,z))continue;
  // The bridge replaces the front of deck 08, rather than overlapping two floors.
  if(d.id==='upper'&&z>31.9)continue;
  if(STAIRS.some(t=>Math.abs(t.high-d.y)<.05&&inStair(t,x,z)&&z<t.z1-.03))continue;
  out.push({y:d.y,id:d.id});
 }
 for(const st of STAIRS)if(inStair(st,x,z))out.push({y:st.low+(st.high-st.low)*(z-st.z0)/(st.z1-st.z0),id:st.id,ramp:true});
 return out;
}
export function floorAt(x,z,hint=10.1){const c=floorCandidates(x,z);if(!c.length)return null;let best=null;
 // Enter a ramp from a matching landing. Never snap across vertically overlapping decks.
 const ramps=c.filter(o=>o.ramp&&Math.abs(o.y-hint)<.65);const options=ramps.length?ramps:c;
 for(const o of options)if(!best||Math.abs(o.y-hint)<Math.abs(best.y-hint))best=o;
 return best?.y??null;
}
export function onFloor(x,z,r=.27,hint=10.1){const y=floorAt(x,z,hint);return y!==null&&Math.abs(y-hint)<.68&&[[r,0],[-r,0],[0,r],[0,-r]].every(([dx,dz])=>{const h=floorAt(x+dx,z+dz,y);return h!==null&&Math.abs(h-y)<.62;});}
export function moveCharacter(p,dx,dz,solids=[],bodies=[],radius=.27){const n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.085));let total=0;
 for(let i=0;i<n;i++)for(const axis of ['x','z']){const x=p.x+(axis==='x'?dx/n:0),z=p.z+(axis==='z'?dz/n:0),y=floorAt(x,z,p.y);if(y===null||Math.abs(y-p.y)>.65||!onFloor(x,z,radius,y))continue;
 if(solids.some(b=>b.active!==false&&y+.12<(b.y??y)+(b.h??2.2)&&y+1.65>(b.y??y)+.10&&circleBox(x,z,radius,b)))continue;
 if(bodies.some(b=>b.active!==false&&Math.abs((b.y??y)-y)<1.4&&(x-b.x)**2+(z-b.z)**2<(radius+(b.radius??.28))**2))continue;
 total+=Math.hypot(x-p.x,z-p.z);p.x=x;p.y=y;p.z=z;
 }return total;
}
export const DESTINATIONS=[
 {id:'bridge',name:'Γέφυρα / τιμόνι',x:1.2,y:18.43,z:44.4},
 {id:'bar',name:'Μπαρ πλώρης',x:4.8,y:10.1,z:54},
 {id:'bow',name:'Πλώρη',x:0,y:10.1,z:68},
 {id:'port',name:'Αριστερός περίπατος',x:-10.7,y:10.1,z:2},
 {id:'starboard',name:'Δεξιός περίπατος',x:10.7,y:10.1,z:2},
 {id:'stern',name:'Πρύμνη',x:0,y:10.1,z:-64},
 {id:'lounge',name:'Σαλόνι επιβατών',x:0,y:10.1,z:8},
 {id:'pool',name:'Πισίνα',x:6,y:13.12,z:-49},
 {id:'cabins',name:'Καμπίνες επιβατών',x:0,y:13.12,z:0},
 {id:'restaurant',name:'Εστιατόριο',x:0,y:15.83,z:7},
 {id:'theatre',name:'Μικρό θέατρο',x:0,y:15.83,z:-8},
 {id:'terrace',name:'Άνω βεράντα',x:0,y:18.57,z:-31},
 {id:'sky',name:'Πανοραμικό σαλόνι',x:0,y:21.35,z:7},
 {id:'engine',name:'Μηχανοστάσιο',x:0,y:6.65,z:-8},
 {id:'crew',name:'Χώρος πληρώματος',x:0,y:6.65,z:10}
];
export function zoneAt(p){if(p.y>17.9&&p.y<19&&p.z>31)return 'ΓΕΦΥΡΑ';const d=DECKS.reduce((a,b)=>Math.abs(b.y-p.y)<Math.abs(a.y-p.y)?b:a);if(Math.abs(p.y-d.y)>.3)return 'ΣΚΑΛΑ';if(d.id==='main'){if(p.z>48)return 'ΠΛΩΡΗ · ΜΠΑΡ';if(p.z<-44)return 'ΠΡΥΜΝΗ';if(Math.abs(p.x)>9.4)return p.x<0?'ΑΡΙΣΤΕΡΟΣ ΠΕΡΙΠΑΤΟΣ':'ΔΕΞΙΟΣ ΠΕΡΙΠΑΤΟΣ';return 'ΣΑΛΟΝΙ ΕΠΙΒΑΤΩΝ';}if(d.id==='pool'&&p.z<-42)return 'ΠΙΣΙΝΑ';return d.name.split(' · ')[1].toUpperCase();}
export {clamp,circleBox};

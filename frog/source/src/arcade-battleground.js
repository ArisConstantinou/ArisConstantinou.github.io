// Authored additions to the arena, in the same world units as the original
// frogs, houses and machines. No object or movement scale changes with the map.
export const ARENA_RADIUS=38;
export const ARENA_MOVE_RADIUS=ARENA_RADIUS-1;
export const BATTLEGROUND_PALETTE=Object.freeze({sky:'#88bfc0',fog:'#b9d0b4',earth:'#93af67',wet:'#64885c',deep:'#386e61',leaf:'#acd47b',rock:'#a4af99',moss:'#86a35f',bark:'#715b42',reed:'#b8b56e',water:'#367d71',nightWater:'#153d43'});

export const BATTLEGROUND_AREAS=Object.freeze([
 {id:'crossing',name:'Κεντρικό πέρασμα',x:0,z:3,rx:7,rz:7,height:.42,tint:'#91ac5b',kind:'crossing'},
 {id:'reeds',name:'Καλαμιώνας',x:-20,z:-24,rx:6.4,rz:5.8,height:.65,tint:'#b2ac66',kind:'reeds'},
 {id:'pond',name:'Λίμνη νούφαρων',x:1,z:-29,rx:8,rz:5.8,height:-.48,tint:'#518b77',kind:'pond'},
 {id:'roots',name:'Δάσος ριζών',x:-29,z:1,rx:6.3,rz:7.6,height:.88,tint:'#608052',kind:'roots'},
 {id:'terraces',name:'Πέτρινες αναβαθμίδες',x:29,z:1,rx:6.3,rz:8,height:1.12,tint:'#a6ae87',kind:'terraces'},
 {id:'flowers',name:'Ανθισμένη όχθη',x:8,z:29,rx:9,rz:5.8,height:.56,tint:'#a2b968',kind:'flowers'},
].map(Object.freeze));

// Points are [x,z,height]. Broad blended banks support each route; the visible
// ribbon follows the rendered terrain triangles, never an independent plane.
export const BATTLEGROUND_ROUTES=Object.freeze([
 {id:'home-spine',width:2.8,points:[[0,3,.42],[0,10,.42],[0,14,.52],[0,16.25,.55]]},
 {id:'west-spine',width:2.8,points:[[0,3,.42],[-5,-1,.5],[-10,-1.5,.6],[-11,1,.65],[-13.25,1,.72]]},
 {id:'east-spine',width:2.8,points:[[0,3,.42],[6,2,.52],[10,1,.65],[11,1,.68],[13.25,1,.75]]},
 {id:'north-spine',width:3,points:[[0,3,.42],[3,-5,.42],[3,-13,.45],[1,-21,.4],[1,-29,.35]]},
 {id:'west-flank',width:2.8,points:[[-11,1,.65],[-14,6,.75],[-22,10,.83],[-29,8,.88],[-29,1,.88]]},
 {id:'east-flank',width:2.8,points:[[11,1,.68],[14,6,.8],[18,12,.92],[24,16,1],[29,12,1.12],[29,1,1.12]]},
 {id:'west-north',width:2.8,points:[[-29,1,.88],[-29,-11,.8],[-25,-18,.7],[-20,-24,.65],[1,-29,.35]]},
 {id:'east-north',width:2.8,points:[[29,1,1.12],[29,-11,.92],[21,-20,.68],[11,-26,.42],[1,-29,.35]]},
 {id:'reed-approach',width:2.8,points:[[-10,-1.5,.6],[-10,-13,.68],[-14,-20,.65],[-20,-24,.65]]},
 {id:'flower-approach',width:3,points:[[0,14,.52],[6,15,.6],[12,21,.6],[8,29,.56]]},
 {id:'south-loop',width:2.8,points:[[8,29,.56],[0,29,.55],[-12,28,.65],[-21,21,.8],[-22,10,.83]]},
 {id:'west-home-link',width:2.8,points:[[0,10,.42],[-5,10,.5],[-13,11,.65],[-18,15,.75],[-21,21,.8]]},
 {id:'east-flower-link',width:2.8,points:[[24,16,1],[22,23,.82],[14,29,.6],[8,29,.56]]},
].map(route=>Object.freeze({...route,points:Object.freeze(route.points.map(Object.freeze))})));

export const BATTLEGROUND_ROCKS=Object.freeze([
 {x:-32,z:-7,r:1.1},{x:-25,z:-4,r:1.2},{x:26,z:6,r:1.5},{x:33,z:-5,r:1.1},
 {x:-17,z:-28,r:1.2},{x:-24,z:-26,r:1},{x:-2,z:-33,r:1},{x:13,z:25,r:1.2},{x:4,z:33,r:1.1},
].map(Object.freeze));
export const BATTLEGROUND_COVER=Object.freeze([
 {id:'grove-outer-west',x:-33,z:5,radius:2.3},
 {id:'grove-reeds',x:-24,z:-21,radius:2.4},
 {id:'grove-pond',x:8,z:-30,radius:2.5},
 {id:'grove-flowers',x:-5,z:32,radius:2.8},
 {id:'grove-terraces',x:33,z:8,radius:2.1},
].map(Object.freeze));
export const BATTLEGROUND_SWARMS=Object.freeze([[-29,1],[1,-29],[29,1],[8,29]].map(Object.freeze));

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a),0,1);return t*t*(3-2*t);};
export function routeSample(x,z){
 let best=null;
 for(const route of BATTLEGROUND_ROUTES)for(let i=1;i<route.points.length;i++){
  const a=route.points[i-1],b=route.points[i],dx=b[0]-a[0],dz=b[1]-a[1],t=clamp(((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz),0,1);
  const distance=Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t);
  if(!best||distance-route.width/2<best.distance-best.width/2)best={distance,width:route.width,height:a[2]+(b[2]-a[2])*t,id:route.id};
 }
 return best;
}
export function battlegroundAreaAt(x,z){
 let chosen=null,nearest=1.2;
 for(const area of BATTLEGROUND_AREAS){const d=Math.hypot((x-area.x)/area.rx,(z-area.z)/area.rz);if(d<nearest){nearest=d;chosen=area;}}
 return chosen;
}
export function battlegroundHeight(x,z,naturalHeight){
 if(Math.hypot(x,z)>ARENA_RADIUS+7)return naturalHeight;
 let height=naturalHeight;
 for(const area of BATTLEGROUND_AREAS){
  const d=Math.hypot((x-area.x)/area.rx,(z-area.z)/area.rz),weight=1-smooth(.68,1.34,d);
  height+=(area.height-height)*weight;
 }
 const route=routeSample(x,z),weight=1-smooth(route.width*.46,route.width*.5+2.4,route.distance);
 return height+(route.height-height)*weight;
}
export function battlegroundTint(x,z){
 if(Math.hypot(x,z)>ARENA_RADIUS+4)return null;
 const route=routeSample(x,z),pathWeight=1-smooth(route.width*.28,route.width*.62,route.distance);
 if(pathWeight>.05)return {color:'#a68a60',weight:pathWeight*.72};
 const area=battlegroundAreaAt(x,z);
 if(!area)return null;
 const d=Math.hypot((x-area.x)/area.rx,(z-area.z)/area.rz);
 return {color:area.tint,weight:(1-smooth(.7,1.25,d))*.48};
}

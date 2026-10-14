export const BOSS_DEFINITIONS = Object.freeze({
 colossus:{name:'Ο Πέτρινος Κολοσσός',hp:240,speed:1.3,mass:16,radius:.73,cy:1.2,height:3.4,color:0x70d8c7,attacks:[{clip:'Slam',hit:.95,duration:2.4,range:3.5,radius:3.15,damage:22},{clip:'Sweep',hit:1.05,duration:2.2,range:2.9,radius:2.8,damage:18}]},
 gargoyle:{name:'Το Gargoyle του Καμπαναριού',hp:210,speed:1.9,mass:10,radius:.65,cy:1.1,height:3.2,color:0xf0aa70,attacks:[{clip:'Dive',hit:1.65,duration:2.8,range:6,radius:2.1,damage:22},{clip:'Claw',hit:.95,duration:1.9,range:2.5,radius:2.2,damage:16}]},
 wraith:{name:'Το Φάντασμα των Αλυσίδων',hp:240,speed:1.55,mass:9,radius:.62,cy:1.05,height:3.3,color:0x94dab0,attacks:[{clip:'ChainSweep',hit:1.15,duration:2.4,range:3.4,radius:3.1,damage:19},{clip:'Binding',hit:1.3,duration:2.6,range:4.2,radius:4.1,damage:16}]},
});
export const BOSS_ROOMS = Object.freeze([
 {name:'courtyard',xMin:-10,xMax:10,zMin:5.5,zMax:15,spawnZ:[8,12],fallback:{x:0,z:10}},
 {name:'hall',xMin:-8,xMax:8,zMin:-8.8,zMax:2.5,spawnZ:[-7,-2],fallback:{x:0,z:-5.8}},
 {name:'crypt',xMin:-5.8,xMax:5.8,zMin:-21.8,zMax:-11.3,spawnZ:[-20.5,-13],fallback:{x:0,z:-20.5}},
]);
export function insideBossRoom(p,r,margin=0){return p.x>=r.xMin+margin&&p.x<=r.xMax-margin&&p.z>=r.zMin+margin&&p.z<=r.zMax-margin;}
export function createBossLayout(random=Math.random,isClear=()=>true,previous=[]){
 const types=Object.keys(BOSS_DEFINITIONS);
 for(let i=types.length-1;i>0;i--){const j=Math.min(i,Math.floor(Math.max(0,random())*(i+1)));[types[i],types[j]]=[types[j],types[i]];}
 if(types.every((v,i)=>v===previous[i]))types.push(types.shift());
 return BOSS_ROOMS.map((room,i)=>{
  const type=types[i],radius=BOSS_DEFINITIONS[type].radius;
  for(let attempt=0;attempt<32;attempt++){const p={x:(random()-.5)*5.6,z:room.spawnZ[0]+random()*(room.spawnZ[1]-room.spawnZ[0])};if(insideBossRoom(p,room,radius)&&isClear(p,radius))return {type,room,...p};}
  if(isClear(room.fallback,radius))return {type,room,...room.fallback};
  for(let z=room.spawnZ[0];z<=room.spawnZ[1];z+=.6)for(let x=-3;x<=3;x+=.6){const p={x,z};if(insideBossRoom(p,room,radius)&&isClear(p,radius))return {type,room,...p};}
  throw new Error(`No safe boss spawn in ${room.name}`);
 });
}
export function bossAttackCrossed(previous,current,hit){return previous<hit&&current>=hit;}

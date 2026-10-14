import * as T from 'three';

// Reuse the approved kit's construction, shared geometry/materials and museum
// urn. Every variant fits the existing 2.7 x 1.2 x 1.7m furniture reservation.
// These are game adaptations of everyday/workshop equipment, not exact scans.
const water=new T.MeshStandardMaterial({color:0x29434a,roughness:.23,metalness:.16});

export function addRoomWorkFurniture(g,kind,p,kit,h){
 const {table,box,cylinder,beam,bowl,vase,wood,iron,bronze,clay,linen}=h;
 if(kind==='forge-stock'){
  g.name='Forge · billets, hammer and pivoted tongs';table(g,p,2.4,1.15,1.04);
  for(let i=0;i<5;i++)box(g,-.55+(i%2)*.28,1.19+Math.floor(i/2)*.12,.03,.16,.10,.65,i%2?bronze:iron);
  beam(g,[.30,1.20,-.30],[.90,1.20,.18],.027,wood);
  const head=box(g,.81,1.20,.13,.34,.15,.18,iron);head.rotation.y=.67;
  const tongs=new T.Group();tongs.name='Crossed reins, pivot and gripping jaws';g.add(tongs);
  beam(tongs,[-.02,1.19,-.40],[.28,1.19,.29],.018,iron);
  beam(tongs,[.28,1.19,-.40],[-.02,1.19,.29],.018,iron);
  cylinder(tongs,.13,1.21,-.05,.042,.035,bronze);
  beam(tongs,[.28,1.19,.29],[.18,1.19,.40],.022,iron);
  beam(tongs,[-.02,1.19,.29],[.08,1.19,.40],.022,iron);
 }else if(kind==='quench-station'){
  g.name='Forge · low work basin, iron stock and water jar';
  box(g,.38,.14,0,1.24,.28,1.08,p.stone);bowl(g,.38,.25,0,.48,p.edge);
  cylinder(g,.38,.61,0,.43,.012,water);
  vase(g,-.82,0,0,.72,kit);
  // A bar rests across both sides of the basin, rather than floating in it.
  beam(g,[-.18,.69,-.05],[.95,.69,-.05],.027,iron);
  box(g,.91,.69,-.05,.14,.065,.11,iron);
 }else if(kind==='prison-supplies'){
  g.name='Prison · water jar, plain stool, bowls and linen';
  vase(g,-.8,0,0,.8,kit);
  box(g,.43,.60,0,1.3,.14,.82,wood);
  for(const x of [-.07,.93])for(const z of [-.29,.29])cylinder(g,x,.27,z,.065,.54,wood);
  bowl(g,.15,.68,.17,.16,clay);bowl(g,.68,.68,.13,.12,clay);
  const roll=cylinder(g,.43,.78,-.18,.10,.57,linen);roll.rotation.z=Math.PI/2;
 }else return false;
 return true;
}

import * as THREE from './vendor/three.module.js';
import {box,cylinder,mergeStatic} from './feouda-models.js?v=2.7.0';

const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const mix=(a,b,t)=>a+(b-a)*t;
const COURSE_COUNT=12,ROOF_SECTIONS=6;
const PHASE_NAMES={travel:'Το συνεργείο έρχεται',foundation:'Θεμέλια',walls:'Τοιχοποιία',roof:'Στέγη',finish:'Αποπεράτωση',paused:'Το έργο είναι σε παύση',blocked:'Το έργο περιμένει',complete:'Ολοκληρώθηκε'};

function beam(group,material,a,b,width=.13,depth=width){
 const delta=new THREE.Vector3(...b).sub(new THREE.Vector3(...a)),mesh=box(group,material,0,0,0,width,delta.length(),depth);
 mesh.position.set(...a).addScaledVector(delta,.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return mesh;
}

// Clip real architecture, including normals and both authored UV sets. Courses
// retain their true size and location; no completed building grows out of soil.
function clip(polygon,axis,limit,above){
 const out=[];
 for(let i=0;i<polygon.length;i++){
  const a=polygon[i],b=polygon[(i+1)%polygon.length],ina=above?a.p[axis]>=limit:a.p[axis]<=limit,inb=above?b.p[axis]>=limit:b.p[axis]<=limit;
  if(ina)out.push(a);
  if(ina!==inb){const t=(limit-a.p[axis])/(b.p[axis]-a.p[axis]),vertex={};for(const key of['p','n','uv','uv1','color'])vertex[key]=a[key].map((v,j)=>mix(v,b[key][j],t));out.push(vertex);}
 }
 return out;
}
function append(batch,material,polygon,attributes){
 if(polygon.length<3)return;let data=batch.get(material);
 if(!data){data={p:[],n:[],uv:[],uv1:[],color:[],hasUV1:!!attributes.uv1,hasColor:!!attributes.color};batch.set(material,data);}
 data.hasUV1||=!!attributes.uv1;data.hasColor||=!!attributes.color;
 for(let i=1;i<polygon.length-1;i++)for(const vertex of[polygon[0],polygon[i],polygon[i+1]])for(const key of['p','n','uv','uv1','color'])data[key].push(...vertex[key]);
}
function sectionPolygon(polygon,batches,material,attributes,axis,min,max){
 if(polygon.length<3)return;const count=batches.length,span=Math.max(.0001,max-min),values=polygon.map(vertex=>vertex.p[axis]),low=Math.min(...values),high=Math.max(...values);
 const first=clamp(Math.floor((low-min)/span*count),0,count-1),last=high-low<.000001?first:clamp(Math.ceil((high-min)/span*count)-1,0,count-1);
 for(let i=first;i<=last;i++)append(batches[i],material,clip(clip(polygon,axis,mix(min,max,i/count),true),axis,mix(min,max,(i+1)/count),false),attributes);
}
function meshBatch(batch,kind,index){
 const group=new THREE.Group();group.name=`Construction_${kind}_${index+1}`;group.userData.constructionPart=kind;group.userData.course=index;
 for(const[material,data]of batch){
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(data.p,3));geometry.setAttribute('normal',new THREE.Float32BufferAttribute(data.n,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(data.uv,2));
  if(data.hasUV1)geometry.setAttribute('uv1',new THREE.Float32BufferAttribute(data.uv1,2));if(data.hasColor)geometry.setAttribute('color',new THREE.Float32BufferAttribute(data.color,3));geometry.computeBoundingSphere();
  const mesh=new THREE.Mesh(geometry,material);mesh.castShadow=mesh.receiveShadow=true;mesh.userData.constructionSlice=true;group.add(mesh);
 }
 return group;
}
function architectureParts(model,materials,bounds,{field=false,openWorksite=false}={}){
 const courseBatches=Array.from({length:COURSE_COUNT},()=>new Map()),roofBatches=Array.from({length:ROOF_SECTIONS},()=>new Map()),finishBatch=new Map(),vector=new THREE.Vector3(),normal=new THREE.Vector3();
 const height=Math.max(.4,bounds.max.y-bounds.min.y),roofAxis=bounds.max.z-bounds.min.z>=bounds.max.x-bounds.min.x?2:0,roofMin=roofAxis===2?bounds.min.z:bounds.min.x,roofMax=roofAxis===2?bounds.max.z:bounds.max.x;
 const roofs=new Set([materials.roof,materials.darkRoof,materials.straw].filter(Boolean)),roofMaterial=(material,mesh)=>roofs.has(material)||/roof|thatch|straw|range_tent/i.test(`${material?.name||''} ${mesh.name||''}`);
 let namedRoof=false;
 model.updateMatrixWorld(true);model.traverseVisible(mesh=>{if(mesh.isMesh&&(Array.isArray(mesh.material)?mesh.material:[mesh.material]).some(material=>roofMaterial(material,mesh)))namedRoof=true;});
 // Some imported cottages use one atlas for every surface. Their actual upper
 // geometry is sectioned at the eaves; no generic replacement roof is invented.
 const inferredRoof=!namedRoof&&!field&&!openWorksite&&height>2.3,eave=bounds.min.y+height*.63,wallTop=inferredRoof?eave:bounds.max.y;
 model.traverseVisible(mesh=>{
  if(!mesh.isMesh||mesh.isInstancedMesh)return;const geometry=mesh.geometry,p=geometry.attributes.position;if(!p)return;
  const attributes=geometry.attributes,n=attributes.normal,uv=attributes.uv,uv1=attributes.uv1,col=attributes.color,index=geometry.index,normalMatrix=new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld),count=index?.count||p.count;
  const read=i=>{mesh.getVertexPosition(i,vector).applyMatrix4(mesh.matrixWorld);if(n)normal.fromBufferAttribute(n,i).applyMatrix3(normalMatrix).normalize();else normal.set(0,1,0);return{p:vector.toArray(),n:normal.toArray(),uv:uv?[uv.getX(i),uv.getY(i)]:[0,0],uv1:uv1?[uv1.getX(i),uv1.getY(i)]:[0,0],color:col?[col.getX(i),col.getY(i),col.getZ(i)]:[1,1,1]};};
  for(let at=0;at+2<count;at+=3){
   const triangle=[read(index?index.getX(at):at),read(index?index.getX(at+1):at+1),read(index?index.getX(at+2):at+2)],material=Array.isArray(mesh.material)?mesh.material[(geometry.groups.find(g=>at>=g.start&&at<g.start+g.count)||{}).materialIndex||0]:mesh.material;
   const isRoof=!field&&roofMaterial(material,mesh),isFinish=!isRoof&&!field&&/window|churchdoor|doorType|tradehall_Sign|saddle|mane|bridle|bay coat/i.test(material?.name||'');
   if(isFinish){append(finishBatch,material,triangle,attributes);continue;}
   const body=isRoof?[]:inferredRoof?clip(triangle,1,eave,false):triangle,roof=isRoof?triangle:inferredRoof?clip(triangle,1,eave,true):[];
   sectionPolygon(body,courseBatches,material,attributes,field?2:1,field?bounds.min.z:bounds.min.y,field?bounds.max.z:wallTop);
   sectionPolygon(roof,roofBatches,material,attributes,roofAxis,roofMin,roofMax);
  }
 });
 return{courses:courseBatches.map((batch,i)=>meshBatch(batch,'masonry',i)),roofSections:roofBatches.map((batch,i)=>meshBatch(batch,'roof',i)),finishes:meshBatch(finishBatch,'fittings',0),namedRoof,inferredRoof};
}

function supplyBundles(materials,w,d,field,roofing){
 const bundles=[],add=(kind,until,index,create)=>{const group=new THREE.Group();group.userData={supply:kind,consumedAt:until,bundle:index};create(group);mergeStatic(group);bundles.push(group);};
 const stoneX=-w/2+.7,stoneZ=-d/2+.75,woodX=w/2-.72,woodZ=-d/2+1.25;
 if(!field)for(let i=0;i<6;i++)add('stone',.10+i*.10,i,g=>{const x=stoneX+(i%2)*.61,z=stoneZ+Math.floor(i/2)*.58;for(let layer=0;layer<2;layer++)for(let j=0;j<2;j++)box(g,materials.paleStone,x+j*.26,.11+layer*.22,z,.245,.205,.46,(j+layer)%2?.025:-.025);});
 for(let i=0;i<5;i++)add('timber',.35+i*.115,i,g=>{for(let j=0;j<3;j++){const log=cylinder(g,materials.wood,woodX+(j-1)*.18,.12+i*.15,woodZ,.085,2.05,8);log.rotation.x=Math.PI/2;}for(const z of[woodZ-.7,woodZ+.7])box(g,materials.darkWood,woodX,.14+i*.15,z,.56,.035,.045);});
 if(roofing)for(let i=0;i<4;i++)add('tiles',.68+i*.07,i,g=>{for(let j=0;j<4;j++)box(g,materials.roof||materials.darkRoof,w/2-.75-i*.29,.055+j*.07,d/2-.52,.27,.06,.43);});
 if(field)for(let i=0;i<4;i++)add('seed',.25+i*.18,i,g=>{const sack=new THREE.Mesh(new THREE.SphereGeometry(.24,8,6),materials.sacking||materials.straw);sack.position.set(-w/2+.5+i*.38,.22,-d/2+.65);sack.scale.set(.8,1,.78);sack.castShadow=true;g.add(sack);});
 return bundles;
}

export function createConstructionSite(type,materials,footprint,completedModel,{upgrading=false}={}){
 completedModel.updateMatrixWorld(true);const bounds=new THREE.Box3().setFromObject(completedModel,true),height=Math.max(.4,bounds.max.y),field=type==='farm',openWorksite=['quarry','mine','well'].includes(type),w=footprint.width-.4,d=footprint.depth-.4,site=new THREE.Group();
 const parts=upgrading?{courses:[],roofSections:[],finishes:new THREE.Group()}:architectureParts(completedModel,materials,bounds,{field,openWorksite}),ground=new THREE.Group(),footings=new THREE.Group(),lower=new THREE.Group(),upper=new THREE.Group();
 site.name='ConstructionSite';box(ground,materials.dirt,0,.025,0,w,.05,d);
 const px=w/2-.20,pz=d/2-.20;
 for(const x of[-px,px])for(const z of[-pz,pz])box(ground,materials.wood,x,.34,z,.10,.68,.10);
 for(const z of[-pz,pz])beam(ground,materials.sacking||materials.paleStone,[-px,.29,z],[px,.29,z],.017);
 for(const x of[-px,px])beam(ground,materials.sacking||materials.paleStone,[x,.29,-pz],[x,.29,pz],.017);
 // Low blocks mark the excavation. All substantial walls are the real model.
 if(!field)for(const side of[-1,1])for(let i=0;i<5;i++)box(footings,materials.darkStone,side*(w*.32),.1,(i-2)*d*.12,.26,.20,d*.11);
 const scaffoldHeight=Math.min(7.0,Math.max(2.2,height*.83)),deck=Math.min(1.7,scaffoldHeight*.43),nearZ=-pz+.29;
 if(!field&&!openWorksite){
  for(const x of[-px,0,px]){box(lower,materials.wood,x,deck*.53,-pz,.14,deck*1.06,.14);box(upper,materials.wood,x,(deck+scaffoldHeight)/2,-pz,.14,scaffoldHeight-deck,.14);}
  for(const y of[deck*.42,deck])box(lower,materials.darkWood,0,y,-pz,w-.2,.12,.12);
  for(const y of[scaffoldHeight-.88,scaffoldHeight-.18])box(upper,materials.wood,0,y,-pz,w-.2,.12,.12);
  for(let i=0;i<5;i++){box(lower,materials.wood,0,deck,nearZ+i*.145,w-.24,.085,.13);box(upper,materials.wood,0,scaffoldHeight-1.12,nearZ+i*.145,w-.24,.085,.13);}
  beam(lower,materials.darkWood,[-px,.16,-pz],[-.2,deck,-pz],.11);beam(lower,materials.darkWood,[.2,deck,-pz],[px,.16,-pz],.11);
  beam(upper,materials.darkWood,[-px,deck,-pz],[-.2,scaffoldHeight-.18,-pz],.11);beam(upper,materials.darkWood,[.2,scaffoldHeight-.18,-pz],[px,deck,-pz],.11);
  // A braced return makes the work platform readable from an oblique camera.
  for(const z of[-pz,-pz+Math.min(2.5,d*.32)])box(lower,materials.wood,-px,deck*.53,z,.14,deck*1.06,.14);
  beam(lower,materials.darkWood,[-px,.12,-pz],[-px,deck,-pz+Math.min(2.5,d*.32)],.10);
  const ladderX=px-.66;for(const side of[-.24,.24])beam(lower,materials.wood,[ladderX+side,.08,-pz+1.30],[ladderX+side,deck+.28,-pz+.59],.06);
  for(let i=1;i<=8;i++){const t=i/8;box(lower,materials.wood,ladderX,.08+(deck+.2)*t,-pz+1.30-.71*t,.55,.055,.08);}
 }
 for(const group of[ground,footings,lower,upper]){mergeStatic(group);site.add(group);}
 const supplies=supplyBundles(materials,w,d,field,!field&&!openWorksite);site.add(...supplies,...parts.courses,...parts.roofSections,parts.finishes,completedModel);
 // Course and bundle visibility changes invalidate the software scene cache.
 // Static architecture retains its textures and occludes passing crews there.
 site.userData={...site.userData,construction:true,completedModel,courses:parts.courses,bands:parts.courses,roofSections:parts.roofSections,finishes:parts.finishes,ground,footings,supplies,lower,upper,upgrading,field,openWorksite,height,footprint:{width:footprint.width,depth:footprint.depth},namedRoof:parts.namedRoof,inferredRoof:parts.inferredRoof};
 setConstructionProgress(site,0);return site;
}

export function setConstructionProgress(site,progress,status={}){
 const s=site.userData;if(!s.construction)return site;
 const p=clamp(Number.isFinite(progress)?progress:0),stage=status.stage||(p<.2?'foundation':p<.6?'walls':p<.85?'roof':'finish'),phase=status.phase||(p>=1?'complete':'work');
 s.constructionProgress=p;s.constructionPhase=phase;s.constructionStage=stage;s.constructionStageLabel=phase==='work'?(status.stageTitle||PHASE_NAMES[stage]):PHASE_NAMES[phase]||PHASE_NAMES[stage];s.crewArrived=status.arrived??null;s.crewAssigned=status.assigned??null;
 if(s.field&&phase==='work'&&!status.stageTitle)s.constructionStageLabel=({foundation:'Χάραξη χωραφιού',walls:'Προετοιμασία εδάφους',roof:'Σπορά',finish:'Καλλιέργεια'})[stage];
 if(s.upgrading&&phase==='work')s.constructionStageLabel=stage==='finish'?'Αποπεράτωση αναβάθμισης':'Εργασίες αναβάθμισης';
 s.completedModel.visible=s.upgrading||p>=.965;
 for(let i=0;i<s.courses.length;i++){const threshold=s.field?.20+i*.06:i<3?.045+i*.055:.21+(i-3)*(.37/8);s.courses[i].visible=!s.upgrading&&p<.965&&p>=threshold;}
 for(let i=0;i<s.roofSections.length;i++)s.roofSections[i].visible=!s.upgrading&&p<.965&&p>=.61+i*.047;
 s.finishes.visible=!s.upgrading&&p>=.90&&p<.965;
 s.ground.visible=p<.99;s.footings.visible=!s.upgrading&&!s.field&&p>=.025&&p<.22;
 for(const bundle of s.supplies)bundle.visible=p<bundle.userData.consumedAt;
 s.lower.visible=!s.field&&!s.openWorksite&&p>=.13&&p<.985;s.upper.visible=!s.field&&!s.openWorksite&&p>=.34&&p<.94;
 return site;
}

import * as THREE from './vendor/three.module.js';
import {box,cylinder,mergeStatic} from './feouda-models.js?v=2.4.1';

const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t);};
const hash=(x,z)=>{let n=Math.imul(x,374761393)+Math.imul(z,668265263);n=Math.imul(n^(n>>>13),1274126177);return((n^(n>>>16))>>>0)/4294967295;};
function noise(x,z){const ix=Math.floor(x),iz=Math.floor(z),fx=smooth(0,1,x-ix),fz=smooth(0,1,z-iz),a=hash(ix,iz),b=hash(ix+1,iz),c=hash(ix,iz+1),d=hash(ix+1,iz+1);return(a+(b-a)*fx)*(1-fz)+(c+(d-c)*fx)*fz;}
const distanceToSegment=(x,z,a,b)=>{const dx=b[0]-a[0],dz=b[1]-a[1],t=clamp(((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz||1));return Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t);};

// Paint the existing measured mesh. No vertex moves, height edits or extra blockers.
// The four channels are bare earth, exposed rock, woodland floor and dry meadow.
export function paintTerrain(geometry,{heightAt,riverX,regions=[],resources=[],roads=[]}){
 const p=geometry.attributes.position,colors=new Float32Array(p.count*3),blend=new Float32Array(p.count*4),buckets=new Map(),cell=32;
 for(const road of roads)for(let i=1;i<road.points.length;i++){const a=road.points[i-1],b=road.points[i],pad=road.width*.5+7,segment={a,b,width:road.width};for(let x=Math.floor((Math.min(a[0],b[0])-pad)/cell);x<=Math.floor((Math.max(a[0],b[0])+pad)/cell);x++)for(let z=Math.floor((Math.min(a[1],b[1])-pad)/cell);z<=Math.floor((Math.max(a[1],b[1])+pad)/cell);z++){const key=x+':'+z;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(segment);}}
 const grass=new THREE.Color('#707657'),dry=new THREE.Color('#91815e'),earth=new THREE.Color('#82745e'),rockColor=new THREE.Color('#99958a'),woodland=new THREE.Color('#4d5940'),color=new THREE.Color();
 for(let i=0;i<p.count;i++){
  const x=p.getX(i),z=p.getZ(i),h=p.getY(i),large=noise(x*.019+11,z*.019-7),fine=noise(x*.092,z*.092),dryness=smooth(.3,.78,large*.76+fine*.24),bank=Math.abs(x-riverX(z)),slope=Math.hypot(heightAt(x+3,z)-heightAt(x-3,z),heightAt(x,z+3)-heightAt(x,z-3))/6;
  let soil=.05+dryness*.22,rock=smooth(.24,.62,slope)*.72+smooth(27,66,h)*.19,forest=0,settled=0;
  for(const r of regions){const radius=r.kind==='castle'?45:r.kind==='town'?37:31,d=Math.hypot((x-r.x)/(radius*1.15),(z-r.z)/radius),wear=(1-smooth(.48,1.24,d+(fine-.5)*.17));settled=Math.max(settled,wear);soil=Math.max(soil,wear*(.67+fine*.15));}
  const naturalCluster=Math.sin(x*.044)*Math.cos(z*.052)+Math.sin(x*.019+z*.047);forest=smooth(.12,1.12,naturalCluster)*(1-settled)*.7;
  for(const n of resources){const d=Math.hypot(x-n.x,z-n.z);if(n.type==='wood')forest=Math.max(forest,(1-smooth(9,22,d))*.92);else if(n.type==='stone'||n.type==='iron')rock=Math.max(rock,(1-smooth(5,16,d))*.82);else if(n.type==='food')soil=Math.max(soil,(1-smooth(6,19,d))*.58);}
  for(const r of buckets.get(Math.floor(x/cell)+':'+Math.floor(z/cell))||[]){const d=distanceToSegment(x,z,r.a,r.b);soil=Math.max(soil,(1-smooth(r.width*.45,r.width*.5+5.5,d))*.92);}
  const shore=(1-smooth(10,24,bank))*(.68+fine*.2);soil=Math.max(soil,shore);forest*=smooth(11,26,bank);rock*=smooth(9,19,bank);
  soil=clamp(soil);rock=clamp(rock);forest=clamp(forest);blend.set([soil,rock,forest,dryness],i*4);
  color.copy(grass).lerp(dry,dryness*.62).lerp(earth,soil).lerp(rockColor,rock).lerp(woodland,forest*.55).multiplyScalar(.93+fine*.13);colors.set(color.toArray(),i*3);
 }
 geometry.setAttribute('color',new THREE.BufferAttribute(colors,3));geometry.setAttribute('terrainBlend',new THREE.BufferAttribute(blend,4));geometry.userData.terrainLayers=['meadow','soil','rock','woodland'];return geometry;
}

// Imported needles need alpha-coverage mipmaps. Ordinary averaging removed the
// entire crown at RTS distance while leaving the opaque trunk visible.
const forestMaterials=new WeakMap();
export function createForestMaterial(source){
 if(Array.isArray(source))return source.map(createForestMaterial);
 if(!source?.map||!(source.alphaTest>0))return source;
 if(forestMaterials.has(source))return forestMaterials.get(source);
 const material=source.clone(),texture=source.map.clone(),image=source.map.image;
 material.map=texture;material.alphaTest=.32;material.alphaToCoverage=true;material.userData={...source.userData,forestMaterial:true};
 if(image?.width&&image?.height){
  const make=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;},base=make(image.width,image.height),ctx=base.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0);
  const alpha=ctx.getImageData(0,0,base.width,base.height).data,cutoff=material.alphaTest*255;let covered=0;for(let i=3;i<alpha.length;i+=4)if(alpha[i]>=cutoff)covered++;const target=covered/(alpha.length/4),mips=[base];
  for(let w=Math.max(1,base.width>>1),h=Math.max(1,base.height>>1);;w=Math.max(1,w>>1),h=Math.max(1,h>>1)){
   const canvas=make(w,h),g=canvas.getContext('2d',{willReadFrequently:true});g.drawImage(base,0,0,w,h);const data=g.getImageData(0,0,w,h),pixels=data.data;let lo=.2,hi=12;
   for(let pass=0;pass<14;pass++){const scale=(lo+hi)*.5;let count=0;for(let i=3;i<pixels.length;i+=4)if(pixels[i]*scale>=cutoff)count++;if(count/(pixels.length/4)<target)lo=scale;else hi=scale;}
   const scale=(lo+hi)*.5;for(let i=3;i<pixels.length;i+=4)pixels[i]=Math.min(255,Math.round(pixels[i]*scale));g.putImageData(data,0,0);mips.push(canvas);if(w===1&&h===1)break;
  }
  texture.mipmaps=mips;texture.generateMipmaps=false;texture.minFilter=THREE.LinearMipmapLinearFilter;texture.needsUpdate=true;material.userData.alphaCoverage=target;material.userData.coverageMipLevels=mips.length;
 }
 let disposed=false;material.userData.disposeForestMaterial=()=>{if(disposed)return;disposed=true;texture.dispose();material.dispose();forestMaterials.delete(source);};forestMaterials.set(source,material);return material;
}

function beam(group,material,a,b,width=.13,depth=width){const delta=new THREE.Vector3(...b).sub(new THREE.Vector3(...a)),mesh=box(group,material,0,0,0,width,delta.length(),depth);mesh.position.set(...a).addScaledVector(delta,.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return mesh;}
function clipped(polygon,y,above){const out=[];for(let i=0;i<polygon.length;i++){const a=polygon[i],b=polygon[(i+1)%polygon.length],ina=above?a.p[1]>=y:a.p[1]<=y,inb=above?b.p[1]>=y:b.p[1]<=y;if(ina)out.push(a);if(ina!==inb){const t=(y-a.p[1])/(b.p[1]-a.p[1]),mix=(x,v)=>x.map((a,i)=>a+(v[i]-a)*t);out.push({p:mix(a.p,b.p),n:mix(a.n,b.n),uv:mix(a.uv,b.uv),uv1:mix(a.uv1,b.uv1),color:mix(a.color,b.color)});}}return out;}
function buildingBands(model,height){
 const levels=[0,.21,.49,.77,1.001],groups=levels.slice(1).map(()=>new THREE.Group()),batches=groups.map(()=>new Map()),vector=new THREE.Vector3(),normal=new THREE.Vector3();
 model.updateMatrixWorld(true);
 model.traverseVisible(mesh=>{
  if(!mesh.isMesh||mesh.isInstancedMesh)return;const geometry=mesh.geometry,p=geometry.attributes.position,n=geometry.attributes.normal,uv=geometry.attributes.uv,uv1=geometry.attributes.uv1,col=geometry.attributes.color,index=geometry.index,normalMatrix=new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld),count=index?.count||p.count;
  const read=i=>{mesh.getVertexPosition(i,vector).applyMatrix4(mesh.matrixWorld);if(n)normal.fromBufferAttribute(n,i).applyMatrix3(normalMatrix).normalize();else normal.set(0,1,0);return{p:vector.toArray(),n:normal.toArray(),uv:uv?[uv.getX(i),uv.getY(i)]:[0,0],uv1:uv1?[uv1.getX(i),uv1.getY(i)]:[0,0],color:col?[col.getX(i),col.getY(i),col.getZ(i)]:[1,1,1]};};
  for(let at=0;at<count;at+=3){const triangle=[read(index?index.getX(at):at),read(index?index.getX(at+1):at+1),read(index?index.getX(at+2):at+2)],min=Math.min(...triangle.map(v=>v.p[1])),max=Math.max(...triangle.map(v=>v.p[1])),material=Array.isArray(mesh.material)?mesh.material[(geometry.groups.find(g=>at>=g.start&&at<g.start+g.count)||{}).materialIndex||0]:mesh.material;
   for(let band=0;band<groups.length;band++){const low=levels[band]*height-.002,high=levels[band+1]*height;if(max<low||min>high)continue;const polygon=clipped(clipped(triangle,low,true),high,false);if(polygon.length<3)continue;let data=batches[band].get(material);if(!data){data={p:[],n:[],uv:[],uv1:[],color:[],hasUV1:!!uv1,hasColor:!!col};batches[band].set(material,data);}for(let i=1;i<polygon.length-1;i++)for(const v of[polygon[0],polygon[i],polygon[i+1]])for(const key of['p','n','uv','uv1','color'])data[key].push(...v[key]);}
  }
 });
 for(let band=0;band<groups.length;band++)for(const[material,data]of batches[band]){const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(data.p,3));geometry.setAttribute('normal',new THREE.Float32BufferAttribute(data.n,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(data.uv,2));if(data.hasUV1)geometry.setAttribute('uv1',new THREE.Float32BufferAttribute(data.uv1,2));if(data.hasColor)geometry.setAttribute('color',new THREE.Float32BufferAttribute(data.color,3));geometry.computeBoundingSphere();const mesh=new THREE.Mesh(geometry,material);mesh.castShadow=mesh.receiveShadow=true;mesh.userData.constructionSlice=true;groups[band].add(mesh);}
 return groups;
}

// Finished architecture is revealed in fixed, geometry-clipped courses. Scaffolds
// are normal-sized joinery throughout: construction never stretches a building.
export function createConstructionSite(type,materials,footprint,completedModel,{upgrading=false}={}){
 const site=new THREE.Group(),m=materials,w=footprint.width-.4,d=footprint.depth-.4,halfW=w/2,halfD=d/2,field=type==='farm';
 completedModel.updateMatrixWorld(true);const bounds=new THREE.Box3().setFromObject(completedModel,true),height=Math.max(.4,bounds.max.y),bands=upgrading?[]:buildingBands(completedModel,height);
 site.add(completedModel);const ground=new THREE.Group(),supplies=new THREE.Group(),lower=new THREE.Group(),upper=new THREE.Group(),roof=new THREE.Group();
 box(ground,m.dirt,0,.015,0,w,.03,d);
 if(!field){const fw=w*.61,fd=d*.62;for(const x of[-fw/2,fw/2])box(ground,m.darkStone,x,.11,0,.28,.22,fd);for(const z of[-fd/2,fd/2])box(ground,m.darkStone,0,.11,z,fw,.22,.28);}
 const postX=halfW-.18,postZ=halfD-.18,scaffoldHeight=field?.6:Math.min(6.4,Math.max(2.2,height*.86));
 for(const x of[-postX,postX])for(const z of[-postZ,postZ])box(ground,m.wood,x,.34,z,.10,.68,.10);
 for(let i=0;i<5;i++)box(supplies,m.wood,halfW-.73,.14+i*.095,-halfD+1.45,1.0,.085,2.25,0);
 if(!field){for(let i=0;i<6;i++)box(supplies,m.paleStone,-halfW+.65+(i%2)*.48,.15+Math.floor(i/2)*.24,-halfD+.68,.43,.23,.65,i%2?.06:-.04);
  const lift=Math.min(1.65,scaffoldHeight*.43),deckZ=-postZ+.32;
  for(const x of[-postX,0,postX]){box(lower,m.wood,x,lift*.54,-postZ,.13,lift*1.08,.13);box(upper,m.wood,x,(lift+scaffoldHeight)*.5,-postZ,.13,scaffoldHeight-lift,.13);}
  for(const y of[lift*.45,lift])box(lower,m.darkWood,0,y,-postZ,w-.25,.13,.13);
  for(const y of[Math.min(scaffoldHeight-.15,lift+1.25),scaffoldHeight-.08])box(upper,m.wood,0,y,-postZ,w-.25,.12,.12);
  for(let i=0;i<5;i++){box(lower,m.wood,0,lift,deckZ+i*.13,w-.28,.08,.11);box(upper,m.wood,0,scaffoldHeight-.8,deckZ+i*.13,w-.28,.08,.11);}
  beam(lower,m.darkWood,[-postX,.18,-postZ],[-.2,lift,-postZ],.10);beam(lower,m.darkWood,[.2,lift,-postZ],[postX,.18,-postZ],.10);
  beam(upper,m.darkWood,[-postX,lift,-postZ],[-.2,scaffoldHeight-.15,-postZ],.10);beam(upper,m.darkWood,[.2,scaffoldHeight-.15,-postZ],[postX,lift,-postZ],.10);
  const ladderX=postX-.75;for(const side of[-.23,.23])beam(lower,m.wood,[ladderX+side,.08,-postZ+1.22],[ladderX+side,lift+.28,-postZ+.57],.055);for(let i=1;i<=7;i++){const t=i/7;box(lower,m.wood,ladderX,.08+(lift+.2)*t,-postZ+1.22-.65*t,.53,.055,.075);}
  // Roof courses come from the actual architecture in buildingBands. A generic
  // gable frame would sit incorrectly on courtyards, mills and irregular plans.
 }
 for(const group of[ground,supplies,lower,upper,roof]){mergeStatic(group);site.add(group);}for(const band of bands)site.add(band);
 site.userData={...site.userData,softwareDynamic:true,construction:true,completedModel,bands,ground,supplies,lower,upper,roof,upgrading,field,height,footprint:{width:footprint.width,depth:footprint.depth},constructionStage:0,constructionStageLabel:'Θεμέλια'};
 setConstructionProgress(site,0);return site;
}
export function setConstructionProgress(site,progress){
 const s=site.userData;if(!s.construction)return;const p=clamp(Number.isFinite(progress)?progress:0),stage=p>=1?5:Math.min(4,Math.floor(p*5));s.constructionStage=stage;s.constructionProgress=p;s.constructionStageLabel=['Θεμέλια','Τοιχοποιία','Σκελετός','Στέγη','Αποπεράτωση','Ολοκληρώθηκε'][stage];
 s.completedModel.visible=s.upgrading||p>=.9;for(let i=0;i<s.bands.length;i++)s.bands[i].visible=!s.upgrading&&p<.9&&p>=[.12,.34,.56,.77][i];
 s.ground.visible=p<.99;s.supplies.visible=p<.91;s.lower.visible=!s.field&&p>=.18&&p<1;s.upper.visible=!s.field&&p>=.4&&p<.95;s.roof.visible=!s.upgrading&&!s.field&&p>=.56&&p<.77;
 if(s.field)s.constructionStageLabel=['Χάραξη χωραφιού','Προετοιμασία εδάφους','Σπορά','Καλλιέργεια','Αποπεράτωση','Ολοκληρώθηκε'][stage];return site;
}

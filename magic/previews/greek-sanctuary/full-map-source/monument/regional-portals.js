import {indexedClone} from '../indexed-geometry.js';
import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {architectureProfile} from '../architecture-plan.js';
import {siegeSurface} from '../game/src/siege-environment.js';
export function regionalGateIsGothic(spec){const ids=[spec.from,spec.to,spec.approach,spec.id==='archive-secret'?'library':spec.id?.split('-')[0]];return ids.some(id=>id&&architectureProfile(id).style==='gothic');}
let sandstone,iron;
function materials(){if(sandstone)return;const maps=siegeSurface('castle_wall_slates');sandstone=new T.MeshStandardMaterial({color:0xb9ab90,roughness:.91,map:maps.map});sandstone.onBeforeCompile=s=>{s.vertexShader='varying vec3 portalP;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <worldpos_vertex>','#include <worldpos_vertex>\n portalP=(modelMatrix*vec4(transformed,1.)).xyz;');s.fragmentShader='varying vec3 portalP;\n'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('#include <map_fragment>','diffuseColor.rgb*=mix(texture2D(map,portalP.xy/2.8).rgb*1.5,texture2D(map,portalP.zy/2.8).rgb*1.5,.5);');};sandstone.customProgramCacheKey=()=> 'gothic-portal-sandstone-v1';iron=new T.MeshStandardMaterial({color:0x343c3d,roughness:.78,metalness:.48});}
// Square-headed medieval portal: moulded clustered jambs, deep rebates,
// carved quatrefoil lintel and ironbound timber. Its opening exactly retains
// the established physical rectangle and never narrows the HEARTH route.
export function regionalGateFrame(spec){materials();const g=new T.Group(),unit=new T.BoxGeometry(1,1,1),{width,height,x,z,floorY=0,rotation=0}=spec;
 const block=(x,y,z,w,h,d,m=sandstone)=>{const o=new T.Mesh(unit,m);o.position.set(x,y,z);o.scale.set(w,h,d);g.add(o);};
 for(const side of [-1,1]){
  block(side*(width/2+.13),height/2,0,.26,height,.9);
  for(const face of [-1,1]){for(const dx of [.06,.23,.40]){const o=new T.Mesh(new T.CylinderGeometry(.065,.065,height-.35,12),sandstone);o.position.set(side*(width/2+dx),height/2,face*.48);g.add(o);}block(side*(width/2+.23),.16,face*.48,.63,.32,.26);block(side*(width/2+.23),height-.14,face*.48,.63,.24,.27);}
 }
 for(const [y,w,h,d]of [[height+.06,width+.80,.12,1.08],[height+.25,width+.66,.28,.98],[height+.45,width+.96,.13,1.14]])block(0,y,0,w,h,d);
 const n=Math.max(1,Math.floor(width/1.05));for(let i=0;i<n;i++)for(const face of [-1,1]){const xx=(i-(n-1)/2)*.98;for(const [dx,dy]of [[-.075,0],[.075,0],[0,-.075],[0,.075]]){const o=new T.Mesh(new T.TorusGeometry(.073,.016,6,16),sandstone);o.position.set(xx+dx,height+.25+dy,face*.505);g.add(o);}}
 const groups=new Map();g.updateMatrixWorld(true);g.traverse(o=>{if(!o.isMesh)return;const geo=indexedClone(o.geometry);geo.applyMatrix4(o.matrixWorld);if(!groups.has(o.material))groups.set(o.material,[]);groups.get(o.material).push(geo);});const frame=new T.Group();for(const [m,geos]of groups){const mesh=new T.Mesh(mergeGeometries(geos,false),m);mesh.castShadow=mesh.receiveShadow=true;frame.add(mesh);geos.forEach(g=>g.dispose());}frame.position.set(x,floorY,z);frame.rotation.y=rotation;frame.name=spec.id+' · medieval moulded sandstone portal';frame.userData.regionalPortal='gothic';return frame;
}
export function styleRegionalGate(frame,doors,spec){if(!regionalGateIsGothic(spec))return;doors.userData.regionalPortal='gothic';doors.traverse(o=>{if(!o.isMesh)return;const m=o.material;if(m.metalness>.3){m.color.setHex(0x343c3d);m.metalness=.48;m.roughness=.78;}else if(m.name.includes('cypress')||m.name.includes('Cypress')){m.color.setHex(0x60503c);m.roughness=.92;}if(m.userData.baseColor)m.userData.baseColor=m.color.clone();});}

import * as T from 'three';
const states=new WeakMap();
const visible=o=>{for(let node=o;node;node=node.parent)if(!node.visible)return false;return true;};
export function installFullMapOcclusion(world,architecture){
 const walls=[],decor=[];
 world.root.traverse(o=>{if(o.userData.fullMapWall)walls.push({meta:o.userData.fullMapWall,parts:[o],label:o.name,kind:'wall'});else if(o.userData.fullMapStairSection)walls.push({meta:null,parts:[o],label:o.name,kind:'stair',stairId:o.userData.fullMapStairSection.stairId});else if(o.userData.fullMapWallDecoration)decor.push(o);});
 for(const part of decor){
  const d=part.userData.fullMapWallDecoration;let closest=null,distance=Infinity;
  for(const wall of walls){const w=wall.meta;if(!w)continue;const along=w.alongX?Math.abs(d.x-w.x):Math.abs(d.z-w.z),normal=w.alongX?Math.abs(d.z-w.z):Math.abs(d.x-w.x);
   if(Math.abs(d.floorY-w.floorY)<.3&&along<=w.length/2+.5&&normal<(d.type==='column'?2.6:1)&&normal<distance){closest=wall;distance=normal;}
  }
  if(closest)closest.parts.push(part);else walls.push({meta:null,parts:[part],label:part.name||d.type});
 }
 for(const gate of architecture.gates)if(gate.frame&&gate.doors&&!gate.frame.parent?.userData.fullMapWall)walls.push({meta:null,parts:[gate.frame,gate.doors],label:gate.id+' complete portal'});
 const owners=new Map(),meshes=[];
 for(const wall of walls)for(const part of wall.parts)part.traverse(o=>{if(!o.isMesh)return;if(!owners.has(o)){owners.set(o,new Set());meshes.push(o);}owners.get(o).add(wall);});
 states.set(world,{walls,owners,meshes,elapsed:1,hidden:new Set(),ray:new T.Raycaster(),lastFocus:new T.Vector3(1e9,0,0),lastCamera:new T.Vector3(1e9,0,0)});world.fullMap.cutawaySections=walls.length;
}
export function updateFullMapOcclusion(world,subject,camera,dt,playing=true){
 const state=states.get(world);if(!state)return;
 const body=subject.body.position,focus=new T.Vector3(body.x,body.y,body.z);state.elapsed+=dt;
 if(state.elapsed>=.1||state.lastFocus.distanceToSquared(focus)>.09||state.lastCamera.distanceToSquared(camera.position)>.09){
  state.elapsed=0;state.lastFocus.copy(focus);state.lastCamera.copy(camera.position);
  // Restore previous cutaways before ray queries, so hidden walls do not
  // oscillate between visible and invisible on stationary camera updates.
  for(const wall of state.hidden)for(const part of wall.parts)part.visible=true;
  state.hidden.clear();
  if(playing){
   const candidates=state.meshes.filter(visible),height=subject.cy>1?1.2:.5,shoulder=subject.cy>1?1.25:.42,across=new T.Vector3().setFromMatrixColumn(camera.matrixWorld,0).multiplyScalar(shoulder);
   // Head, torso, feet and shoulders keep the complete character readable,
   // including the wide HEARTH silhouette behind a staircase cheek.
   for(const point of [focus.clone(),focus.clone().add(new T.Vector3(0,height,0)),focus.clone().add(new T.Vector3(0,-.3,0)),focus.clone().add(across),focus.clone().sub(across)]){
    const direction=point.clone().sub(camera.position),length=direction.length();state.ray.set(camera.position,direction.normalize());state.ray.far=length-.45;
    for(const hit of state.ray.intersectObjects(candidates,false))for(const wall of state.owners.get(hit.object)||[])state.hidden.add(wall);
   }
  }
  for(const wall of state.hidden)for(const part of wall.parts)part.visible=false;
 }
 world.fullMap.occlusion={hidden:state.hidden.size,sections:[...state.hidden].map(w=>({name:w.label,kind:w.kind||'wall',stairId:w.stairId,parts:w.parts.length,allHidden:w.parts.every(p=>!p.visible)}))};
}

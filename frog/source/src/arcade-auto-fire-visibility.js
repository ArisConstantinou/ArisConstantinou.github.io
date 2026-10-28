import {Ray,Vector3} from 'three';
import {projectileOrigin,traceWorldRay} from './arcade-model.js';
import {projectileGround} from './arcade-projectiles.js';
import {guardActive,GUARD_BODY} from './arcade-guards.js';

const contexts=new WeakMap();
const finitePoint=point=>point&&['x','y','z'].every(axis=>Number.isFinite(point[axis]));
const scratchFor=game=>{
 let scratch=contexts.get(game);
 if(!scratch){scratch={ray:new Ray(),hit:new Vector3()};contexts.set(game,scratch);}
 return scratch;
};

// Visibility is separate from the actual projectile eligibility check. It never
// rotates the camera, redirects the shot, or replaces the player's stored aim.
export function autoFireTargetVisible(game,targetId,{directional=false}={}){
 if(!game||!targetId)return false;
 const player=game.state?.actors?.[0],body=game.state?.actors?.find(candidate=>candidate.id===targetId)||game.state?.guards?.find(candidate=>candidate.id===targetId);
 if(!player||!body||body.id===player.id||body.ko||body.eliminated||body.kind==='guard'&&(!guardActive(body)||body.owner===player.id))return false;
 const scratch=scratchFor(game);
 let ray,target;
 if(directional){
  if(!finitePoint(game.camera?.position))return false;
  target=body.kind==='guard'?{x:body.x,y:projectileGround(game.state,body.x,body.z)+GUARD_BODY.centerY,z:body.z}:projectileOrigin(game.state,body);
  if(!finitePoint(target))return false;
  ray=scratch.ray;ray.origin.copy(game.camera.position);ray.direction.set(target.x,target.y,target.z).sub(ray.origin);
  const range=ray.direction.length();if(range<1e-8)return false;
  ray.direction.multiplyScalar(1/range);
  const muzzle=projectileOrigin(game.state,player);
  const solidFrom=Math.max(0,(muzzle.x-ray.origin.x)*ray.direction.x+(muzzle.y-ray.origin.y)*ray.direction.y+(muzzle.z-ray.origin.z)*ray.direction.z);
  // Match point-aim camera rays: camera-side scenery can already be faded to
  // reveal the local frog, while the separate muzzle trace still checks cover.
  const hit=traceWorldRay(game.state,ray.origin,ray.direction,range,{ignoreId:player.id,solidFrom});
  if(hit?.targetId!==targetId)return false;
  target=hit;
 }else{
  if(!game.mouse?.valid||game.mouse.targetId!==targetId||!finitePoint(game.mouse.target))return false;
  ray=game.mouseRay?.ray;target=game.mouse.target;
  if(!ray||!finitePoint(ray.origin)||!finitePoint(ray.direction))return false;
 }
 const distanceSq=(target.x-ray.origin.x)**2+(target.y-ray.origin.y)**2+(target.z-ray.origin.z)**2;
 for(const visual of game.basesView?.bases?.values()||[]){
  // Decorative roofs and stock baskets are visual occluders, not new solids.
  if(visual.roof.visible&&visual.roofMaterial.opacity>.5&&ray.intersectsBox(visual.roofBounds)){
   for(const triangle of visual.roofTriangles)if(ray.intersectTriangle(triangle.a,triangle.b,triangle.c,false,scratch.hit)&&scratch.hit.distanceToSquared(ray.origin)<distanceSq-.01)return false;
  }
  if(visual.cabin.visible&&visual.stockMaterials[0].opacity>.5&&ray.intersectBox(visual.stockBounds,scratch.hit)&&scratch.hit.distanceToSquared(ray.origin)<distanceSq-.01)return false;
 }
 return true;
}

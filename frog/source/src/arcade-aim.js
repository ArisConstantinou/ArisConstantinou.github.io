import {traceShot} from './arcade-model.js';
import {projectileLaunch,projectilePoint,PROJECTILE} from './arcade-projectiles.js';

// `origin` is the shot source at actor X/Z, ground + .45, plus jump height for
// explicit 3D aiming. `muzzle` is its swept .8-unit offset. All Y values are world Y.
// The default range includes that offset plus the existing full fly lifetime.
export function traceAim(state,actor,range){
 const preview=traceShot(state,actor,range),launch=projectileLaunch(state,actor),path=[];
 // Show the actual surface-following flight instead of a straight chord over
 // slopes. Include the swept source-to-mouth offset and preserve the precise
 // first contact returned by the same collision test used by a real fly.
 const count=launch.followGround?Math.max(1,Math.ceil(preview.distance/PROJECTILE.terrainStep)):1;
 for(let i=0;i<count;i++)path.push(projectilePoint(state,launch,preview.distance*i/count));
 path.push({x:preview.x,y:preview.y,z:preview.z});
 return {...preview,path};
}

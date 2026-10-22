import {NavigationGrid} from './systems.js';
import {supportHeight,supportedRoute} from './walkable-support.js';

// Pressure puzzles can be solved by the wizard. Fire gates must remain blocked
// when validating access to the engine that is needed to open them.
export function createHearthAccess(world,gates=[]){
 const passable=new Set(gates.filter(g=>g.kind!=='fire').map(g=>g.blocker));
 const obstacles=world.colliders.filter(b=>!passable.has(b));
 const grid=new NavigationGrid(world.floors,obstacles,.65,.53);
 const origin={x:world.spawn.x,y:supportHeight(world.floors,world.spawn.x,world.spawn.z,world.spawn.y??0),z:world.spawn.z};
 return point=>{
  if(origin.y===null)return false;
  const route=grid.path(origin,point);if(!route.length)return false;
  if(Math.hypot(route.at(-1).x-point.x,route.at(-1).z-point.z)>.01)return false;
  let previous=origin;
  for(const p of route){
   const y=supportHeight(world.floors,p.x,p.z,previous.y,{rise:.25,drop:.25});
   if(y===null)return false;
   const next={...p,y};if(!supportedRoute(world.floors,obstacles,previous,next,.43,1.8))return false;previous=next;
  }
  return true;
 };
}

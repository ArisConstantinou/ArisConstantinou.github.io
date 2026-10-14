import {plateOccupants} from './game/src/greek-puzzle-rules.js';

// A carried weight may pass over a pressed socket at its normal carry height.
// Lowering it onto an existing resting weight can push that weight off its plate.
export function emptyPressurePlateFor(entity,position,gates){
 if(!entity?.indestructible||!position)return null;
 const weights=gates.flatMap(g=>g.weights||[]);
 for(const plate of gates.flatMap(g=>g.plates)){
  const floorY=plate.y??0;
  if(!(Math.hypot(position.x-plate.x,position.z-plate.z)<.48&&position.y>floorY+.3&&position.y<floorY+3.2))continue;
  if(!plateOccupants([plate],weights,entity)[0])return plate;
 }
 return null;
}

// Objective groups are rooted at the floor. Context sight must target the
// visible shaft/rift above its support, without moving either objective.
export function objectiveInteractionPoint(position,kind){
 return {x:position.x,y:position.y+(kind==='relic'?1.77:1.68),z:position.z};
}

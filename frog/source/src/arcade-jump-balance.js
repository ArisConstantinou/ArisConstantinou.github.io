// Heights are measured above the take-off surface, including a second jump or dash.
export const MAX_JUMP_RISE=3.1;
const singles=Object.freeze({heavy:1.9,skinny:2.6,medium:2.3});
export const jumpRise=actor=>singles[actor?.characterClass]??Infinity;
export const jumpCeiling=(actor,takeoff)=>Number.isFinite(jumpRise(actor))?takeoff+MAX_JUMP_RISE:Infinity;

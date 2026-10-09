/* Camp snapshots only: no arbitrary class/object deserialisation or cloud account. */
export const SAVE_KEY='bubble-skyward-camp-v1';
const finite=(v,a,b)=>Number.isFinite(v)&&v>=a&&v<=b;
export function validateSave(s){
 if(!s||s.schema!==1||!Number.isInteger(s.checkpoint)||s.checkpoint<0||s.checkpoint>3)return null;
 if(!Array.isArray(s.bag)||s.bag.length!==3||!s.bag.every(v=>Number.isInteger(v)&&v>=0&&v<=120))return null;
 if(!finite(s.elapsed,0,86400)||!finite(s.penalty,0,86400)||!finite(s.hp,1,100))return null;
 return {schema:1,checkpoint:s.checkpoint,bag:s.bag.slice(),elapsed:s.elapsed,penalty:s.penalty,hp:s.hp,bonus:finite(s.bonus,0,80)?s.bonus:0,
  looted:Array.isArray(s.looted)?s.looted.filter(x=>typeof x==='string'&&/^\d:[0-3]$/.test(x)).slice(0,20):[],
  rewards:Array.isArray(s.rewards)?s.rewards.filter(x=>Number.isInteger(x)&&x>=1&&x<=3):[],
  route:['valley','ridge'].includes(s.route)?s.route:null,routeDone:s.routeDone===true,
  learned:Array.isArray(s.learned)?s.learned.slice(0,4).map(Boolean):[false,false,false,false]};
}
export function readSave(storage){try{return validateSave(JSON.parse(storage.getItem(SAVE_KEY)));}catch{return null;}}
export function writeSave(storage,s){const checked=validateSave(s);if(!checked)return false;try{storage.setItem(SAVE_KEY,JSON.stringify(checked));return true;}catch{return false;}}

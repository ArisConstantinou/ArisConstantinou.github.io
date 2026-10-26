/** Serializable local wildlife timing; advances only in active simulation. */
const number=(value,fallback=0)=>Number.isFinite(value)?value:fallback;
export function normalizeCreekSociety(value={},elapsed=0){
  return {version:1,initialized:value?.initialized===true,sequence:Math.max(0,Math.floor(number(value?.sequence))),
    nextMigrationAt:Math.max(0,number(value?.nextMigrationAt,elapsed+420)),
    nextRivalAt:Math.max(0,number(value?.nextRivalAt,elapsed+600)),
    warned:value?.warned===true,phaseStamp:typeof value?.phaseStamp==='string'?value.phaseStamp.slice(0,100):'',
    agreements:Math.max(0,Math.floor(number(value?.agreements)))};
}

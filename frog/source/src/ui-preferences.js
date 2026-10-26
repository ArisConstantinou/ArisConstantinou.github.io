/** Readable UI preference, independent of renderer pixel ratio and browser zoom. */
export function normalizeUIScale(value){
  if(value===undefined||value===null||value===''||!Number.isFinite(Number(value)))return 1;
  return Math.round(Math.max(.85,Math.min(1.4,Number(value)))*100)/100;
}

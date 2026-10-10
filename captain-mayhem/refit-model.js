/** Deliberately arcade ship systems. Not naval engineering or real equipment guidance. */
export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export const ENGINE_STAGES=['ΛΕΙΤΟΥΡΓΕΙ','ΚΡΑΔΑΣΜΟΙ','ΚΑΠΝΟΣ','ΦΩΤΙΑ','ΚΑΤΕΣΤΡΑΜΜΕΝΗ'];
export function stageFor(hp,broken=false){return broken?4:hp<=25?3:hp<=50?2:hp<=75?1:0;}
export function newPlant(){return {time:0,engines:Array.from({length:4},(_,i)=>({id:i,hp:100,stage:0,rpm:1,fireTime:0,broken:false,fire:0})),breaches:[0,0,0,0],flood:[0,0,0,0],sink:0,roll:0,pitch:0,power:1,status:'ΣΤΑΘΕΡΟ',lost:false};}
export function damageEngine(s,id,amount){const e=s.engines[id];if(!e||e.broken||!Number.isFinite(amount))return false;e.hp=Math.max(1,e.hp-Math.max(0,amount));e.stage=stageFor(e.hp);return true;}
export function tickPlant(s,dt){dt=clamp(dt,0,.1);s.time+=dt;
 for(const e of s.engines){if(e.stage===3){e.fireTime+=dt;e.fire=clamp(e.fire+dt*.32,0,1);if(e.fireTime>=7){e.hp=0;e.broken=true;e.stage=4;}}else e.fire=Math.max(0,e.fire-dt*.12);const target=e.broken?0:1-(100-e.hp)/135;e.rpm+=(target-e.rpm)*(1-Math.exp(-dt*4));}
 for(let i=0;i<4;i++){const near=i^1;const inflow=s.breaches[i]*.019*(1+s.sink*.09);const exchange=(s.flood[near]-s.flood[i])*.013;s.flood[i]=clamp(s.flood[i]+(inflow+exchange)*dt,0,1);}
 const volume=s.flood.reduce((a,b)=>a+b,0)/4;const opened=s.breaches.filter(Boolean).length;
 let depth=volume*7;if(volume>.40)depth+=Math.pow((volume-.40)/.60,1.25)*26;
 s.sink+=(depth-s.sink)*(1-Math.exp(-dt*.3));s.roll+=((s.flood[0]+s.flood[2]-s.flood[1]-s.flood[3])*.17-s.roll)*dt*.6;s.pitch+=((s.flood[2]+s.flood[3]-s.flood[0]-s.flood[1])*.075-s.pitch)*dt*.5;
 s.power=s.engines.reduce((a,e)=>a+(e.broken?0:e.rpm),0)/4;s.lost=s.sink>27;s.status=s.lost?'ΒΥΘΙΣΜΕΝΟ':s.sink>7?'ΒΥΘΙΖΕΤΑΙ':volume>.10?'ΠΑΙΡΝΕΙ ΝΕΡΑ':opened?'ΕΙΣΡΟΗ ΝΕΡΟΥ':s.power<.2?'ΧΩΡΙΣ ΠΡΟΩΣΗ':'ΣΤΑΘΕΡΟ';return s;
}
export function validPlant(v){return v&&Array.isArray(v.engines)&&v.engines.length===4&&v.engines.every(e=>Number.isFinite(e.hp)&&e.hp>=0&&e.hp<=100)&&Array.isArray(v.flood)&&v.flood.length===4&&v.flood.every(n=>Number.isFinite(n)&&n>=0&&n<=1)&&Array.isArray(v.breaches)&&v.breaches.length===4;}

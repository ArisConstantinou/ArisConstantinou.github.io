export const LEADERBOARD_KEY='frog-leaderboard-v1';
export const SCORE_RULE='100 πόντοι / αποθήκη · 10 / νοκ άουτ · 1 / εύστοχη βολή';
export const STAT_KEYS=Object.freeze(['shots','shotHits','kos','deaths','caught','bases']);
export const freshStats=()=>Object.fromEntries(STAT_KEYS.map(k=>[k,0]));
const count=value=>Math.max(0,Math.min(1e7,Math.floor(Number(value)||0)));
export function cleanStats(value={}){const stats=Object.fromEntries(STAT_KEYS.map(k=>[k,count(value[k])]));stats.shotHits=Math.min(stats.shots,stats.shotHits);return stats;}
export function playerName(value){return typeof value==='string'?value.replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,18)||'Παίκτης':'Παίκτης';}
export function score(stats={}){return count(stats.bases)*100+count(stats.kos)*10+count(stats.shotHits);}
export function accuracy(stats={}){return stats.shots>0?Math.round(stats.shotHits/stats.shots*100):null;}
export function matchStandings(state,name='Παίκτης'){
 const alive=(state.bases||[]).filter(b=>!b.destroyed),destroyed=(state.bases||[]).filter(b=>b.destroyed),single=alive.length===1;
 return (state.actors||[]).map(actor=>{
  const base=state.bases?.find(b=>b.owner===actor.id),stats=cleanStats(state.scoreboard?.[actor.id]);let rank=null;
  if(!base?.destroyed)rank=1;
  else if(Number.isFinite(base.destroyedAt))rank=alive.length+1+destroyed.filter(b=>Number.isFinite(b.destroyedAt)&&b.destroyedAt>base.destroyedAt).length;
  if(actor.id==='player'&&state.status==='lost')rank=alive.length+1;
  return {id:actor.id,name:actor.id==='player'?playerName(name):actor.id==='rival-1'?'Αντίπαλος 1':'Αντίπαλος 2',rank,tied:!base?.destroyed&&alive.length>1,status:base?.destroyed?'Αποθήκη εκτός':single?'Νικητής':'Ενεργή αποθήκη',...stats,points:score(stats),accuracy:accuracy(stats)};
 }).sort((a,b)=>(a.rank??99)-(b.rank??99)||b.points-a.points||a.id.localeCompare(b.id));
}
function parseStore(raw){
 if(raw===null)return {ok:true,records:[]};
 try{const data=JSON.parse(raw);if(data?.version!==1||!Array.isArray(data.records))return {ok:false,records:[]};
  const records=data.records.filter(r=>r&&typeof r.id==='string'&&r.id.length<=90&&Number.isFinite(r.at)&&r.stats&&Number.isFinite(r.duration)).map(r=>({...r,name:playerName(r.name),stats:cleanStats(r.stats),points:score(r.stats)}));return {ok:true,records};
 }catch{return {ok:false,records:[]};}
}
export function readLeaderboard(storage){try{return parseStore(storage.getItem(LEADERBOARD_KEY));}catch{return {ok:false,records:[]};}}
export function saveLeaderboardRound(storage,state,name,now=Date.now()){
 if(state.training||!['won','lost'].includes(state.status)||state.scoreboardSince>0||!state.recordId)return {saved:false,reason:'ineligible'};
 const store=readLeaderboard(storage);if(!store.ok)return {saved:false,reason:'storage'};
 if(store.records.some(r=>r.id===state.recordId))return {saved:true,duplicate:true};
 const stats=cleanStats(state.scoreboard?.player),record={id:state.recordId,name:playerName(name),at:now,duration:Math.floor(state.time),won:state.status==='won',stats,points:score(stats)};
 const records=[...store.records,record].sort((a,b)=>b.points-a.points||Number(b.won)-Number(a.won)||b.at-a.at).slice(0,50);
 try{storage.setItem(LEADERBOARD_KEY,JSON.stringify({version:1,records}));return {saved:true,record};}catch{return {saved:false,reason:'storage'};}
}

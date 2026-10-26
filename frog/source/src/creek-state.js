/** Persistent exploration rules. No renderer, wall clock, combat or economy dependency. */
const object=v=>!!v&&typeof v==='object'&&!Array.isArray(v);
const finite=(v,fallback=0)=>Number.isFinite(v)?v:fallback;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,finite(v,a)));
const count=v=>Math.floor(clamp(v,0,1e9));
const text=(v,fallback='')=>typeof v==='string'?v.slice(0,160):fallback;
const unique=rows=>[...new Set(rows)];
const point=v=>({x:clamp(finite(v?.x),-10000,10000),z:clamp(finite(v?.z),-10000,10000)});
export const CREEK_VERSION=1;
export const CREEK_LANDMARK_IDS=Object.freeze(['pond','creek','bank','roots']);
export const CREEK_METRICS=Object.freeze(['chargedLeaps','bankLandings','swimSeconds','fliesCaught','observeSeconds','croaks','companionsMax','distance','commands']);

export const CREEK_PHASES=Object.freeze([
  {id:'steady',label:'Ήρεμη ροή',hint:'Τα έντομα κινούνται πάνω από τα νούφαρα. Παρατήρησε πού πηγαίνουν.',waterOffset:0,flow:.45,foodShift:'pond'},
  {id:'low',label:'Το νερό υποχωρεί',hint:'Οι ρίζες αποκαλύπτονται. Η γυμνή όχθη έχει λιγότερη κάλυψη.',waterOffset:-.38,flow:.3,foodShift:'roots'},
  {id:'rising',label:'Δυνατό ρεύμα',hint:'Το νερό ανεβαίνει. Τα έντομα και τα μικρά ζώα αναζητούν ψηλότερες όχθες.',waterOffset:.28,flow:1.15,foodShift:'bank'},
  {id:'full',label:'Γεμάτες κοιλότητες',hint:'Τα ρηχά περάσματα πλημμύρισαν. Κοίτα ποια ζώα χρησιμοποιούν νέες διαδρομές.',waterOffset:.08,flow:.7,foodShift:'creek'}
]);
const PHASE_SECONDS=150;
const smooth=t=>t*t*(3-2*t);
/** Ecological time follows active play. Killing or clearing a territory never advances it. */
export function creekPhase(clock=0,realmIndex=0){
  const elapsed=Math.max(0,finite(clock))+(count(realmIndex)*47)%PHASE_SECONDS;
  const whole=Math.floor(elapsed/PHASE_SECONDS),index=whole%CREEK_PHASES.length;
  const phase=CREEK_PHASES[index],previous=CREEK_PHASES[(index+CREEK_PHASES.length-1)%CREEK_PHASES.length];
  const local=elapsed%PHASE_SECONDS,t=whole===0?1:smooth(clamp(local/32,0,1));
  return {...phase,waterOffset:previous.waterOffset+(phase.waterOffset-previous.waterOffset)*t,
    flow:previous.flow+(phase.flow-previous.flow)*t,index,cycle:Math.floor(whole/CREEK_PHASES.length),
    stamp:`${Math.floor(whole/CREEK_PHASES.length)}:${phase.id}`,secondsToChange:PHASE_SECONDS-local};
}

export const CREEK_ABILITIES=Object.freeze([
  {id:'leap',label:'Δυνατά πίσω πόδια',description:'Μεγαλύτερο φορτισμένο άλμα, με την ίδια κατεύθυνση και πιο μακρινή προσγείωση.',metric:'chargedLeaps',target:3,landmark:'pond',hint:'Γνώρισε τη λιμνούλα και κάνε 3 φορτισμένα άλματα.',controls:'Κράτησε και άφησε Space',icon:'jump'},
  {id:'grip',label:'Κράτημα στις πέτρες',description:'Πιάσε χαμηλές προεξοχές και βγες από το νερό σε πιο απότομες όχθες.',metric:'bankLandings',target:2,landmark:'bank',hint:'Εξερεύνησε την όχθη και προσγειώσου εκεί με 2 άλματα.',controls:'Space προς πέτρα ή προεξοχή',icon:'jump'},
  {id:'dive',label:'Βουτιά στο ρεύμα',description:'Βούτηξε κάτω από την επιφάνεια και κινήσου καλύτερα μέσα στα ρεύματα.',metric:'swimSeconds',target:15,landmark:'creek',hint:'Βρες το ρυάκι και κολύμπησε για λίγο.',controls:'Κράτησε δεξί κλικ μέσα στο νερό',icon:'swim'},
  {id:'tongue',label:'Μακρινή γλώσσα',description:'Πιάσε τροφή και φτάσε στόχους από μεγαλύτερη απόσταση.',metric:'fliesCaught',target:6,landmark:'pond',hint:'Πιάσε 6 μύγες με τη γλώσσα κοντά στο νερό.',controls:'Σημάδεψε και πάτησε αριστερό κλικ',icon:'tongue'},
  {id:'hide',label:'Ακίνητος σαν φύλλο',description:'Μείνε χαμηλά και ακίνητος στην κάλυψη για να δυσκολέψεις τον εντοπισμό σου.',metric:'observeSeconds',target:8,landmark:null,hint:'Παρατήρησε έναν θηρευτή ακίνητος, από την κάλυψη της όχθης ή των ριζών.',controls:'Κράτησε δεξί κλικ, ακίνητος στην κάλυψη',icon:'scout'},
  {id:'croak',label:'Δυνατό κόασμα',description:'Το κάλεσμά σου φτάνει πιο μακριά και επηρεάζει εντονότερα κοντινές απειλές.',metric:'croaks',target:2,landmark:null,hint:'Βρες έναν σύντροφο και χρησιμοποίησε 2 φορές το κόασμά σου.',controls:'R',icon:'intimidate'}
]);

function normalizedItem(value){
  if(typeof value==='string'&&value)return {id:text(value),label:'Φυσικό εύρημα',region:0};
  if(!object(value)||typeof value.id!=='string'||!value.id)return null;
  return {id:text(value.id),label:text(value.label,'Φυσικό εύρημα'),region:count(value.region)};
}
function items(value){
  const seen=new Set();
  return (Array.isArray(value)?value:[]).map(normalizedItem).filter(v=>v&&!seen.has(v.id)&&seen.add(v.id));
}
function normalizedDrop(value,index=0){
  if(!object(value)||!Number.isFinite(value.x)||!Number.isFinite(value.z))return null;
  return {id:text(value.id,`drop-${index}`),...point(value),createdAt:clamp(value.createdAt,0,1e12),
    food:clamp(value.food,0,1e9),finds:items(value.finds),keepsakes:items(value.keepsakes)};
}
function normalizedRegion(value){
  const source=object(value)?value:{},nest=object(source.nest)?source.nest:{};
  return {discovered:unique((Array.isArray(source.discovered)?source.discovered:[]).filter(id=>CREEK_LANDMARK_IDS.includes(id))),
    collectedIds:unique((Array.isArray(source.collectedIds)?source.collectedIds:[]).filter(id=>typeof id==='string'&&id.length).map(id=>text(id))),
    drops:(Array.isArray(source.drops)?source.drops:[]).map(normalizedDrop).filter(Boolean),
    nest:{safeSeconds:clamp(nest.safeSeconds,0,1e9),level:Math.floor(clamp(nest.level,0,3)),visited:nest.visited===true},
    lastPhase:typeof source.lastPhase==='string'?text(source.lastPhase):null,visits:count(source.visits)};
}
export function normalizeCreekState(value,{elapsed=0,realmIndex=0}={}){
  const source=object(value)?value:{},regions={};
  for(const [key,entry] of Object.entries(object(source.regions)?source.regions:{})){
    if(/^\d+$/.test(key)&&Number.isSafeInteger(Number(key))&&object(entry))regions[key]=normalizedRegion(entry);
  }
  const active=String(count(realmIndex));regions[active]??=normalizedRegion(null);
  const largestDrop=Object.values(regions).flatMap(r=>r.drops).reduce((n,d)=>Math.max(n,count(Number(d.id.match(/^creek-drop-\d+-(\d+)$/)?.[1]))),0);
  return {version:CREEK_VERSION,clock:clamp(source.clock??Math.max(0,finite(elapsed)),0,1e12),nextDrop:Math.max(count(source.nextDrop),largestDrop),
    metrics:Object.fromEntries(CREEK_METRICS.map(key=>[key,clamp(source.metrics?.[key],0,1e9)])),
    unlocked:unique((Array.isArray(source.unlocked)?source.unlocked:[]).filter(id=>CREEK_ABILITIES.some(a=>a.id===id))),
    inventory:{finds:items(source.inventory?.finds),keepsakes:items(source.inventory?.keepsakes)},regions};
}
export const createCreekState=normalizeCreekState;
export function creekRegion(state,index=0){
  const key=String(count(index));return state.regions[key]??=normalizedRegion(null);
}
export function hasDiscovered(state,id){return Object.values(state.regions).some(r=>r.discovered.includes(id));}
export function abilityStatus(state,ability){
  const unlocked=state.unlocked.includes(ability.id),value=clamp(state.metrics[ability.metric],0,ability.target);
  const placeReady=!ability.landmark||hasDiscovered(state,ability.landmark);
  const companionReady=ability.id!=='croak'||state.metrics.companionsMax>=1;
  return {...ability,unlocked,progress:value,current:value,ready:placeReady&&companionReady&&value>=ability.target,
    requirement:!placeReady?'Ανακάλυψε πρώτα το αντίστοιχο μέρος':!companionReady?'Χρειάζεται ένας σύντροφος':ability.hint};
}
export function unlockCreekAbilities(state){
  const unlocked=[];
  for(const ability of CREEK_ABILITIES)if(!state.unlocked.includes(ability.id)&&abilityStatus(state,ability).ready){state.unlocked.push(ability.id);unlocked.push(ability);}
  return unlocked;
}
export function recordCreekMetric(state,key,amount=1){
  if(!CREEK_METRICS.includes(key)||!Number.isFinite(amount)||amount<=0)return false;
  state.metrics[key]=clamp(state.metrics[key]+amount,0,1e9);return true;
}
export function remainingDropFood(drop,clock){
  // Animals find food after a grace period. Finds and keepsakes never decay.
  const age=Math.max(0,finite(clock)-drop.createdAt-90);
  return Math.max(0,Math.floor(drop.food*(1-clamp(age/420,0,1))));
}
export function dropCreekInventory(state,regionIndex,position,food=0){
  const finds=state.inventory.finds,keepsakes=state.inventory.keepsakes,amount=clamp(food,0,1e9);
  if(amount===0&&!finds.length&&!keepsakes.length)return null;
  const drop={id:`creek-drop-${count(regionIndex)}-${++state.nextDrop}`,...point(position),createdAt:state.clock,food:amount,finds:[...finds],keepsakes:[...keepsakes]};
  creekRegion(state,regionIndex).drops.push(drop);state.inventory={finds:[],keepsakes:[]};return drop;
}
export function recoverCreekDrop(state,regionIndex,id){
  const region=creekRegion(state,regionIndex),index=region.drops.findIndex(d=>d.id===id);
  if(index<0)return null;
  const [drop]=region.drops.splice(index,1);
  state.inventory.finds=items([...state.inventory.finds,...drop.finds]);
  state.inventory.keepsakes=items([...state.inventory.keepsakes,...drop.keepsakes]);
  return {food:remainingDropFood(drop,state.clock),finds:drop.finds.length,keepsakes:drop.keepsakes.length};
}
export function collectCreekFind(state,regionIndex,find){
  const region=creekRegion(state,regionIndex);
  if(!find?.id||region.collectedIds.includes(find.id))return false;
  const item=normalizedItem({...find,region:count(regionIndex)});if(!item)return false;
  region.collectedIds.push(find.id);
  const kind=find.kind==='keepsakes'?'keepsakes':'finds';state.inventory[kind]=items([...state.inventory[kind],item]);return true;
}
export function creekModifiers(state){
  const has=id=>state?.unlocked?.includes(id)===true;
  return {leapStrength:has('leap')?1.2:1,grip:has('grip'),dive:has('dive'),swimSpeed:has('dive')?1.3:1,
    tongueRange:has('tongue')?14:10,camouflage:has('hide'),croakRadius:has('croak')?1.35:1,croakPower:has('croak')?1.3:1,airControl:has('leap')?.12:0};
}

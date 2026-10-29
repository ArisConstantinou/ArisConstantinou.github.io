// Older saves have no fire-mode preference. Restore player-controlled shots
// unless the player has explicitly selected automatic mobile fire.
export function normalizeFireSettings(settings={}){
 return {touchFireMode:['manual','tap','auto'].includes(settings?.touchFireMode)?settings.touchFireMode:'manual'};
}

// Apply the requested mobile trial once; later explicit choices survive reload.
export function applyMobileFireTrial(settings,touch){
 if(!touch||settings.touchControlVersion===1)return false;
 settings.touchFireMode='tap';settings.touchControlVersion=1;return true;
}

const HELP={
 tap:'Σύρε δεξιά για στόχευση και περιστροφή. Άφησε χωρίς βολή. Πάτα σύντομα στην ελεύθερη δεξιά περιοχή για μία βολή. Κράτα το ΠΥΡ για συνεχόμενες βολές. Το αριστερό χειριστήριο κινεί τον βάτραχο με άλματα.', 
 manual:'Σύρε στη δεξιά πλευρά για θέα και στόχευση. Κράτα το ξεχωριστό ΠΥΡ για βολή· σύρε πάνω του για στόχευση ενώ πυροβολείς. Ελεύθερη εξάσκηση και στην προετοιμασία.',
 auto:'Στόχευσε αντίπαλο ή εχθρικό σκαθάρι με σύρσιμο στη δεξιά πλευρά για αυτόματη βολή. Το ξεχωριστό ΠΥΡ παραμένει διαθέσιμο για ελεύθερη εξάσκηση.',
};

// This is a native select: keyboard, mouse and touch retain their normal
// selection behavior. Persistence belongs to the caller's settings store.
export function installFireSettings(game,{onChange=()=>{}}={}){
 const select=game.$('touch-fire-mode'),help=game.$('touch-fire-mode-help');
 if(!select)throw new Error('Fire settings need #touch-fire-mode');
 const sync=()=>{
  const normalized=normalizeFireSettings(game.settings);
  Object.assign(game.settings,normalized);select.value=normalized.touchFireMode;
  if(help)help.textContent=HELP[normalized.touchFireMode];
  return normalized;
 };
 const change=()=>{
  const previous=game.settings.touchFireMode;
  Object.assign(game.settings,normalizeFireSettings({touchFireMode:select.value}));
  const normalized=sync();
  if(normalized.touchFireMode===previous)return;
  // A held aiming or fire pointer cannot carry into the other mode.
  game.clearInputs();game.updateHUD();game.touchLayout?.refresh();
  onChange(normalized);
 };
 sync();select.addEventListener('change',change);
 return()=>select.removeEventListener('change',change);
}

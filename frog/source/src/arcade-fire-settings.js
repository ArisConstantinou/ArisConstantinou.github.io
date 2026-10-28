// Older saves have no fire-mode preference. Restore player-controlled shots
// unless the player has explicitly selected automatic mobile fire.
export function normalizeFireSettings(settings={}){
 return {touchFireMode:settings?.touchFireMode==='auto'?'auto':'manual'};
}

const HELP={
 manual:'Κράτα το ΠΥΡ στο κέντρο του δεξιού joystick και σύρε για βολή μαζί με στόχευση. Η περιφέρεια στρίβει χωρίς να πυροβολεί. Ελεύθερη εξάσκηση και στην προετοιμασία.',
 auto:'Στόχευσε αντίπαλο ή εχθρικό σκαθάρι με την περιφέρεια του δεξιού joystick ή με σύρσιμο για αυτόματη βολή. Το κεντρικό ΠΥΡ παραμένει διαθέσιμο για ελεύθερη εξάσκηση.',
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

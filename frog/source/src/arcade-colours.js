export const DEFAULT_COLOURS=Object.freeze({playerColour:'#86da38',enemy1Colour:'#ff694a',enemy2Colour:'#bb70ed'});
export function normalizeColours(settings={}){return Object.fromEntries(Object.entries(DEFAULT_COLOURS).map(([key,fallback])=>[key,/^#[\da-f]{6}$/i.test(settings[key]||'')?settings[key].toLowerCase():fallback]));}
export function actorColour(settings,id){const key=id==='player'?'playerColour':id==='rival-1'?'enemy1Colour':'enemy2Colour',value=settings?.[key];return /^#[\da-f]{6}$/i.test(value||'')?value.toLowerCase():DEFAULT_COLOURS[key];}
export function applyActorColours(game){
 for(const [i,model] of (game.models||[]).entries()){
  const colour=actorColour(game.settings,game.state.actors[i].id);
  model.mesh.material.userData?.tint?.set(colour);model.setOutline(colour,true);
 }
 for(const dot of game.$('base-dots').children)dot.style.backgroundColor=actorColour(game.settings,dot.dataset.owner);
}
export function installColourSettings(game,save){
 Object.assign(game.settings,normalizeColours(game.settings));
 const section=document.createElement('fieldset');section.className='frog-colour-settings';section.innerHTML='<legend>Χρώματα βατράχων</legend><div class="frog-colour-grid">'+[['playerColour','Παίκτης'],['enemy1Colour','Αντίπαλος 1'],['enemy2Colour','Αντίπαλος 2']].map(([key,label])=>`<label for="${key}"><span>${label}</span><input type="color" id="${key}" value="${game.settings[key]}" aria-label="Χρώμα: ${label}"></label>`).join('')+'</div><button type="button" class="colour-reset">Αρχικά χρώματα</button>';
 const panel=game.$('settings-panel');panel.insertBefore(section,panel.querySelector('.camera-settings-heading'));
 section.addEventListener('input',event=>{if(event.target.type!=='color')return;Object.assign(game.settings,normalizeColours({...game.settings,[event.target.id]:event.target.value}));applyActorColours(game);save();});
 section.querySelector('button').onclick=()=>{Object.assign(game.settings,DEFAULT_COLOURS);for(const [key,value] of Object.entries(DEFAULT_COLOURS))section.querySelector('#'+key).value=value;applyActorColours(game);save();};
}

import './style.css';
import './hud-layout.css';
import './garrison-ui.css';
import {describeObjective} from './guidance.js';
import {pictogram,gangEmblem,frogAvatar,rolePictogram} from './visuals.js';

const $ = (root, selector) => root.querySelector(selector);
const $$ = (root, selector) => Array.from(root.querySelectorAll(selector));
const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, Number(v) || 0));
const esc = (v = '') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const materialText = text => String(text||'').replace(/καλάμια/gi,'υλικά κατασκευής').replace(/καλαμιών/gi,'υλικών κατασκευής');
const available = n => Math.max(0, Math.floor(Number(n) || 0));
const whole = n => Math.max(0, Math.round(Number(n) || 0));
const fraction = (n, d) => clamp((Number(n) || 0) / (Number(d) || 100));
const placementTypes=new Set(['shelter','store','nursery','training','watchtower']);
const actionCaptions={'primary-attack':'Γλώσσα','special-attack':'Κλωτσιά',dodge:'Αποφυγή',interact:'Πλησίασε','open-build':'Χτίσε','hud-more':'Άλλα',intimidate:'Εκφόβισε','gang-toggle':'Επίθεση ομάδας','gang-forage':'Βρείτε τροφή','gang-regroup':'Όλοι μαζί','cycle-view':'Κάμερα','open-roster':'Ομάδα','open-map':'Χάρτης','open-pause':'Παύση'};
const compactCaptions={'Στρατολόγησε':'Ένταξη','Κατασκευές':'Χτίσε','Ακολούθησε':'Έλα','Φρούρησε':'Φρουρά','Αποφυγή':'Ελιγμός'};
const captionMarkup=label=>`<span class="fg-caption-wide">${esc(label)}</span><span class="fg-caption-compact">${esc(compactCaptions[label]||label)}</span>`;
const goalCaption=g=>({'gather-food':'Τροφή',food:'Τροφή','gather-reeds':'Υλικά',reeds:'Υλικά','build-shelter':'Οχυρό',shelter:'Οχυρό','build-store':'Αποθήκη',store:'Αποθήκη','build-nursery':'Φωλιά',nursery:'Φωλιά','build-training':'Εκπαιδευτήριο',training:'Εκπαιδευτήριο','recruit-allies':'Σύμμαχοι',allies:'Σύμμαχοι','train-starters':'Εκπαιδευμένοι',trained:'Εκπαιδευμένοι','train-army':'Εκπαιδευμένοι','expand-shelters':'Οχυρά','expand-buildings':'Κτίρια',territories:'Περιοχές'}[g.id]||({heron:'Ερωδιός',snake:'Νερόφιδο',fish:'Ψάρι'}[g.type||g.icon]?(g.boss?'Αρχηγός ':'')+({heron:'Ερωδιός',snake:'Νερόφιδο',fish:'Ψάρι'}[g.type||g.icon]):describeObjective(g).title));
const roleNames = { scout:'Ανιχνευτής', hunter:'Κυνηγός', bruiser:'Μαχητής', brute:'Βαρύς μαχητής', guardian:'Φύλακας', guard:'Φρουρός', leader:'Αρχηγός', agile:'Ακροβάτης', warrior:'Πολεμιστής', striker:'Μαχητής', intimidator:'Εκφοβιστής', caller:'Κράχτης' };
const predatorNames = {heron:'ΕΡΩΔΙΟΣ',snake:'ΝΕΡΟΦΙΔΟ',fish:'ΑΡΠΑΚΤΙΚΟ ΨΑΡΙ'};
const mapPredatorNames={heron:'Ερωδιός',snake:'Νερόφιδο',fish:'Αρπακτικό ψάρι'};
const visibleMapPredators=world=>(world.predators||[]).filter(p=>!p.dead&&!(Number.isFinite(p.hp)&&p.hp<=0)&&p.active!==false&&!['dormant','dead'].includes(p.phase));
const predatorNotes = {heron:'Απέφυγε το ράμφος. Χτύπησε όταν ορμήσει.',snake:'Άνοιξε την ομάδα. Επίθεση από τα πλάγια.',fish:'Πήγαινε σε πέτρες και ρηχά. Πρόσεχε τη σκιά.'};
const icons = {
  leaf:'<path d="M19 3C8 2 3 7 4 14c1 6 9 7 12 1 2-4 1-7 3-12Z"/><path d="M5 20 15 8M8 15l-1-5M11 12l5 1"/>',
  fly:'<path d="M12 8v11M9 10l-4-4M15 10l4-4M9 14l-5 2M15 14l5 2M10 18l-3 3M14 18l3 3"/><ellipse cx="7" cy="9" rx="3" ry="5" transform="rotate(-35 7 9)"/><ellipse cx="17" cy="9" rx="3" ry="5" transform="rotate(35 17 9)"/>',
  reeds:'<path d="M7 22V8m5 14V4m5 18V10M5 7V3h4v4Zm5-4V1h4v2Zm5 6V5h4v4Z"/>',
  heart:'<path d="m12 20-8-8C-1 6 7 1 12 7c5-6 13-1 8 5Z"/>',
  bolt:'<path d="m14 2-9 12h6l-1 8 9-13h-6Z"/>',
  stomach:'<path d="M10 3v6c-5-1-7 2-6 6 1 6 10 8 15 2 4-5 0-11-5-9V3M6 14c2-2 4 1 6 1"/>',
  moon:'<path d="M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',
  shield:'<path d="m12 2 8 3v7c0 5-8 10-8 10S4 17 4 12V5Z"/><path d="m8 12 3 3 6-6"/>',
  group:'<circle cx="12" cy="7" r="3"/><path d="M6 21v-4c0-6 12-6 12 0v4M4 7a3 3 0 0 0 0 6M20 7a3 3 0 0 1 0 6M2 20v-3m20 3v-3"/>',
  camp:'<path d="M3 21V5h3v3h3V5h6v3h3V5h3v16ZM9 21v-7a3 3 0 0 1 6 0v7M3 11h18"/>',
  crown:'<path d="m3 6 4 4 5-7 5 7 4-4-3 14H6ZM7 16h10"/>',
  arrow:'<path d="m5 12 14 0m-6-6 6 6-6 6"/>',
  close:'<path d="m5 5 14 14M19 5 5 19"/>',
  sound:'<path d="M3 9v6h4l5 5V4L7 9ZM16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  pin:'<path d="M19 9c0 5-7 13-7 13S5 14 5 9a7 7 0 1 1 14 0Z"/><circle cx="12" cy="9" r="2"/>',
  skull:'<path d="M8 21v-4H5V9a7 7 0 0 1 14 0v8h-3v4ZM12 18v3"/><circle cx="9" cy="10" r="1.5"/><circle cx="15" cy="10" r="1.5"/>',
  more:'<circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
};
function icon(name, cls='') { return `<svg class="fg-icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.leaf}</svg>`; }
const key = text => `<kbd>${text}</kbd>`;

/**
 * DOM-only presentation. All gameplay remains in the owning game controller.
 * update(state) accepts the contract sent to root. resources may be a number or
 * {food,reeds}; buildOptions may override the default costs and availability.
 * Portrait values must be actual rendered image URLs/data URLs.
 */
export class GameUI {
  constructor({onAction=()=>{},onStart=()=>{},onResume=()=>{},onSettings=()=>{}}={}) {
    this.callbacks={onAction,onStart,onResume,onSettings};
    this.abort=new AbortController(); this.state={}; this.portraits={};
    this.panel=null; this.menu=null; this.lastDraw=0; this.lastPanel=0;
    this.hudDisclosure=null;this.rosterFilter='all';this.buildView='catalog';this.defenseCampId=null;this.toastKeys=new Map();this.portraitCache=new Map();
    this.settings={quality:'high',volume:0.65,sensitivity:1};
    this.root=document.createElement('div'); this.root.id='frog-ui';
    this.root.innerHTML=this.markup(); document.body.append(this.root);
    $(this.root,'.fg-title-art').style.backgroundImage='url("./art/creek.jpg")';
    this.refs={};
    for(const el of $$(this.root,'[data-ref]')) this.refs[el.dataset.ref]=el;
    this.root.addEventListener('click', e=>this.click(e), {signal:this.abort.signal});
    this.root.addEventListener('dragstart',e=>this.beginBuildDrag(e),{signal:this.abort.signal});
    document.addEventListener('dragover',e=>this.moveBuildDrag(e),{signal:this.abort.signal});
    document.addEventListener('drop',e=>this.dropBuildDrag(e),{signal:this.abort.signal});
    document.addEventListener('dragend',()=>this.finishBuildDrag(),{signal:this.abort.signal});
    this.root.addEventListener('scroll',e=>{if(e.target.classList?.contains('fg-illustrated-build'))this.syncBuildCatalog();},{capture:true,signal:this.abort.signal});
    this.root.addEventListener('input', e=>this.setting(e), {signal:this.abort.signal});
    this.root.addEventListener('change', e=>this.setting(e), {signal:this.abort.signal});
    this.root.addEventListener('contextmenu', e=>e.preventDefault(), {signal:this.abort.signal});
    this.root.addEventListener('keydown',e=>this.hudKeydown(e),{signal:this.abort.signal});
    document.addEventListener('keydown',e=>{if(this.hudDisclosure&&e.code==='Escape'){e.preventDefault();e.stopPropagation();this.closeHudDisclosure(true);}},{capture:true,signal:this.abort.signal});
    document.addEventListener('pointerdown',e=>{if(this.hudDisclosure&&!e.target.closest?.('.fg-objective,.fg-action-drawer,[data-action="hud-more"]'))this.closeHudDisclosure();},{signal:this.abort.signal});
    window.addEventListener('resize',()=>{this.lastDraw=0;},{signal:this.abort.signal});
    this.setLoading('Δημιουργία του ποταμού…');
  }
  toggleHudDisclosure(name){
    const next=this.hudDisclosure===name?null:name;this.setHudDisclosure(next);
  }
  setHudDisclosure(name,restoreFocus=false){
    const previous=this.hudDisclosure||null;if(previous===name)return;this.hudDisclosure=name;
    if(this.refs.objectiveDetails)this.refs.objectiveDetails.hidden=name!=='objectives';
    if(this.refs.actionDrawer)this.refs.actionDrawer.hidden=name!=='actions';
    this.refs.objectiveToggle?.setAttribute('aria-expanded',String(name==='objectives'));
    this.refs.moreToggle?.setAttribute('aria-expanded',String(name==='actions'));
    this.refs.objectiveBox?.classList.toggle('is-expanded',name==='objectives');
    this.root.classList.toggle('fg-hud-drawer-open',Boolean(name));
    if(restoreFocus){const button=previous==='objectives'?this.refs.objectiveToggle:this.refs.moreToggle;button?.focus({preventScroll:true});}
    this.callbacks.onAction('hud-disclosure',{name,open:Boolean(name)});
  }
  closeHudDisclosure(restoreFocus=false){if(this.hudDisclosure)this.setHudDisclosure(null,restoreFocus);}
  hudKeydown(event){
    if(this.hudDisclosure&&event.code==='Escape'){event.preventDefault();event.stopPropagation();this.closeHudDisclosure(true);return;}
    const button=event.target.closest?.('button');
    if(button&&['Space','Enter'].includes(event.code)){event.preventDefault();event.stopPropagation();button.click();return;}
    if(event.target.matches?.('input,select')||(event.target.closest?.('.fg-panel')&&!['Escape','Tab','KeyV'].includes(event.code)&&!this.state.buildPlacement?.active))event.stopPropagation();
  }
  scrollBuildCatalog(direction){
    const catalog=$(this.refs.panel,'.fg-illustrated-build');if(!catalog)return;
    const width=$(catalog,'.fg-picture-building')?.getBoundingClientRect().width||220;
    const reduce=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    catalog.scrollBy({left:Math.sign(direction||1)*(width+14),behavior:reduce?'instant':'smooth'});
  }
  syncBuildCatalog(){
    if(this.panel!=='build')return;const catalog=$(this.refs.panel,'.fg-illustrated-build');if(!catalog)return;
    const previous=$(this.refs.panel,'[data-action="build-scroll"][data-direction="-1"]'),next=$(this.refs.panel,'[data-action="build-scroll"][data-direction="1"]');
    if(previous)previous.disabled=catalog.scrollLeft<=2;
    if(next)next.disabled=catalog.scrollLeft+catalog.clientWidth>=catalog.scrollWidth-2;
  }
  beginBuildDrag(event){
    const card=event.target.closest('.fg-picture-building[draggable="true"]');
    if(!card||card.disabled||!placementTypes.has(card.dataset.type)){event.preventDefault();return;}
    this.draggingBuild=true;this.dragClickUntil=Infinity;
    if(event.dataTransfer){
      event.dataTransfer.effectAllowed='copy';
      event.dataTransfer.setData('application/x-frog-building',card.dataset.type);
      event.dataTransfer.setData('text/plain',card.dataset.type);
      const art=card.querySelector('.fg-building-art');if(art)event.dataTransfer.setDragImage(art,art.clientWidth/2,art.clientHeight/2);
    }
    this.callbacks.onAction('begin-placement',{type:card.dataset.type,dragging:true});
    if(!this.state.buildPlacement?.active){this.draggingBuild=false;this.dragClickUntil=performance.now()+180;event.preventDefault();return;}
    this.dragVisibilityFrame=requestAnimationFrame(()=>{if(this.draggingBuild)this.root.classList.add('fg-build-dragging');});
  }
  moveBuildDrag(event){
    if(!this.draggingBuild)return;
    event.preventDefault();if(event.dataTransfer)event.dataTransfer.dropEffect='copy';
    this.callbacks.onAction('move-placement',{clientX:event.clientX,clientY:event.clientY,dragging:true});
  }
  dropBuildDrag(event){
    if(!this.draggingBuild)return;
    event.preventDefault();event.stopPropagation();
    const point={clientX:event.clientX,clientY:event.clientY};
    this.finishBuildDrag(false);
    this.callbacks.onAction('drop-placement',point);
  }
  finishBuildDrag(cancelUnplaced=true){
    if(!this.draggingBuild)return;
    this.draggingBuild=false;this.dragClickUntil=performance.now()+180;
    cancelAnimationFrame(this.dragVisibilityFrame);
    this.root.classList.remove('fg-build-dragging');this.closePanels();
    // A handled document drop clears the drag flag before native dragend.
    // Remaining dragend events include Escape consumed by the browser itself.
    if(cancelUnplaced&&this.state.buildPlacement?.active)this.callbacks.onAction('cancel-placement',{});
  }
  updatePlacement(placement){
    const active=Boolean(placement?.active),r=this.resources(this.state.resources);
    if(!active&&this.draggingBuild)this.finishBuildDrag(false);
    if(active)this.closeHudDisclosure();
    this.root.classList.toggle('fg-is-placing',active);this.refs.buildPlacement.hidden=!active;
    if(!active)return;
    const valid=Boolean(placement.valid),cost=typeof placement.cost==='number'?{food:placement.cost,reeds:0}:placement.cost||{};
    const art={shelter:'camp'}[placement.type]||placement.type||'camp';
    if(this.placementArt!==art){this.placementArt=art;this.refs.placementArt.innerHTML=pictogram(art);}
    const status=valid?'check':'invalid';
    if(this.placementStatus!==status){this.placementStatus=status;this.refs.placementStatus.innerHTML=pictogram(status);}
    this.refs.buildPlacement.classList.toggle('is-invalid',!valid);
    this.refs.buildPlacement.classList.toggle('is-dragging',Boolean(placement.dragging));
    this.refs.buildPlacement.title=materialText(placement.reason||(valid?'Έτοιμο για τοποθέτηση':'Ακατάλληλη θέση κατασκευής'));
    this.refs.placementConfirm.disabled=!valid;
    this.setText('placementAngle',`${Math.round(((Number(placement.yaw)||0)*180/Math.PI%360+360)%360)}°`);
    this.setText('placementFood',`${available(r.food)} / ${whole(cost.food)}`);
    this.setText('placementMaterials',`${available(r.reeds)} / ${whole(cost.reeds)}`);
    this.refs.placementFood.parentElement.classList.toggle('is-short',r.food<(cost.food||0));
    this.refs.placementMaterials.parentElement.classList.toggle('is-short',r.reeds<(cost.reeds||0));
  }
  actionTile(action,art,k,label,cooldown=''){
    return `<button class="fg-action-tile" data-action="${action}" data-cooldown="${cooldown}" aria-label="${esc(label)}" title="${esc(label)}"><span class="fg-action-art">${art==='more'?icon('more'):pictogram(art)}</span><span class="fg-action-caption">${captionMarkup(actionCaptions[action]||label)}</span>${action==='interact'?'<span class="fg-interaction-cost" data-ref="interactionCost" hidden></span>':''}<span class="fg-cooldown-cover"></span><span class="fg-cooldown-time"></span>${k?key(k):''}<span class="fg-ready-line"></span></button>`;
  }
  commandButton(command,action='selection-command',id=''){
    const names={follow:'Ακολουθήστε',attack:'Επίθεση',forage:'Βρείτε μύγες · τροφή και θεραπεία',guard:'Υπεράσπιση οχυρού',regroup:action==='gang-command'?'Όλοι μαζί · Shift+X · ανακαλεί και τις φρουρές':'Συγκέντρωση επιλεγμένων',train:'Εκπαίδευση',promote:'Προαγωγή'};
    const captions={follow:'Μαζί μου',attack:'Επίθεση',forage:'Τροφή',guard:'Φρουρά',regroup:action==='gang-command'?'Όλοι μαζί':'Επιστροφή'};
    const art={guard:'shield',train:'training',training:'training',promote:'crown'}[command]||command;
    return `<button class="fg-command-image${captions[command]?' fg-named-command':''}" data-action="${action}" data-command="${command}"${id?` data-id="${esc(id)}"`:''} aria-label="${names[command]||command}" title="${names[command]||command}">${pictogram(art)}${captions[command]?`<span class="fg-command-caption">${captions[command]}</span>`:''}</button>`;
  }
  trainingButton(scope='selection'){
    const s=this.state,allies=s.allies||[],chosen=this.chosen(),unit=s.training?.cost||{food:8,reeds:4};
    const frogs=(scope==='gang'?allies:allies.filter(f=>chosen.has(String(f.id))));
    const eligible=frogs.filter(f=>!f.trained&&!(f.trainingProgress>0)&&!['train','training'].includes(f.order));
    const count=eligible.length,cost={food:count*(unit.food||0),reeds:count*(unit.reeds||0)},r=this.resources(s.resources);
    const camps=[...(s.camps||[]),...(s.currentCamp?[s.currentCamp]:[])];
    const hasSite=camps.some(c=>['ally','player','friendly',0].includes(c.team)&&!c.destroyed&&c.hp!==0&&c.buildings?.training);
    const affordable=r.food>=cost.food&&r.reeds>=cost.reeds,enabled=count>0&&hasSite&&affordable;
    const label=count?`Εκπαίδευση ${count} βατράχων · ${whole(cost.food)} τροφή + ${whole(cost.reeds)} υλικά κατασκευής · ${whole(s.training?.duration||18)} δευτερόλεπτα ανά βάτραχο${!hasSite?' · Χρειάζεται χώρος εκπαίδευσης':!affordable?' · Δεν αρκούν τα αποθέματα':''}`:'Επίλεξε βατράχους που χρειάζονται εκπαίδευση';
    if(scope==='gang')return `<button class="fg-command-image fg-global-training" data-action="gang-command" data-command="train" title="${esc(label)}" aria-label="${esc(label)}" ${enabled?'':'disabled'}>${pictogram('training')}<span class="fg-command-caption">Εκπαίδευση</span><b>${count}</b></button>`;
    return `<button class="fg-training-order${!affordable?' is-short':''}" data-action="selection-command" data-command="train" title="${esc(label)}" aria-label="${esc(label)}" ${enabled?'':'disabled'}><strong class="fg-training-title">Εκπαίδευση</strong><span class="fg-training-order-image">${pictogram('training')}<b>${count}</b></span><span class="fg-training-costs"><span>${pictogram('fly')}<b>${whole(cost.food)}</b></span><span>${pictogram('reeds')}<b>${whole(cost.reeds)}</b></span></span><span class="fg-training-state">${pictogram(enabled?'check':'warning')}</span></button>`;
  }
  portrait(f={}){
    const src=f.portrait||this.portraits[f.id]||this.portraits[f.role];if(src)return src;
    const id=String(f.id??f.name??f.role??'frog')+':'+(f.tier||1)+':'+(f.role||'hunter');
    if(!this.portraitCache.has(id))this.portraitCache.set(id,frogAvatar(f));
    return this.portraitCache.get(id);
  }
  chosen(){return new Set((this.state.selectedIds||this.state.allies?.filter(f=>f.selected).map(f=>f.id)||[]).map(String));}
  updateSelectionDock(allies,selected){
    // Only these two portraits are visible. Never serialize the entire army's
    // PNG data URLs or rebuild the image nodes when an off-screen frog changes.
    const shown=[];
    for(const f of allies){if(selected.size&&!selected.has(String(f.id)))continue;shown.push(f);if(shown.length===2)break;}
    const cards=shown.map(f=>({id:String(f.id),name:f.name||'Βάτραχος',portrait:this.portrait(f),selected:selected.has(String(f.id)),guard:Boolean(f.guard||f.order==='guard'),health:fraction(f.hp,f.maxHp)}));
    const count=selected.size||allies.length,previous=this.dockCards;
    const changed=this.dockCount!==count||!previous||previous.length!==cards.length||cards.some((card,i)=>['id','name','portrait','selected','guard'].some(key=>card[key]!==previous[i][key]));
    if(changed){
      this.refs.selectionPortraits.innerHTML=cards.map(f=>`<button class="fg-dock-frog${f.selected?' is-selected':''}" data-action="select-frog" data-id="${esc(f.id)}" aria-label="${esc(f.name)}" title="${esc(f.name)}"><img src="${esc(f.portrait)}" alt="${esc(f.name)}"><span style="width:${f.health*100}%"></span>${f.guard?`<i>${pictogram('shield')}</i>`:''}</button>`).join('')+(count>2?`<button class="fg-dock-more" data-action="open-roster" title="Όλη η ομάδα"><span class="fg-dock-rest-wide">+${count-2}</span><span class="fg-dock-rest-short">+${count-1}</span></button>`:'');
      this.dockHealthBars=$$(this.refs.selectionPortraits,'.fg-dock-frog>span');
    }else{
      for(let i=0;i<cards.length;i++)if(cards[i].health!==previous[i].health&&this.dockHealthBars[i])this.dockHealthBars[i].style.width=`${cards[i].health*100}%`;
    }
    this.dockCards=cards;this.dockCount=count;
  }
  markup(){return `
    <div class="fg-hud fg-visual-hud fg-compact-hud" data-ref="hud" hidden>
      <div class="fg-hud-top">
      <section class="fg-player" aria-label="Κατάσταση παίκτη">
        <div class="fg-player-top"><div class="fg-avatar"><img data-ref="playerPortrait" alt="Ο βάτραχός σου" hidden><span data-ref="playerBadge">${pictogram('frog')}</span><b data-ref="level">1</b></div><div class="fg-player-crest" title="Πράσινο Ρεύμα">${gangEmblem('ally')}<span data-ref="tier">I</span></div><button class="fg-members-button" data-action="open-roster" title="Διοίκηση συμμορίας · TAB" aria-label="Διοίκηση συμμορίας">${pictogram('group')}<b data-ref="gangCount">1</b></button></div>
        <div class="fg-vital fg-health" title="Υγεία">${pictogram('heart')}<div class="fg-meter"><span data-ref="hpBar"></span></div><small data-ref="hpLabel">100</small></div>
        <div class="fg-vital fg-energy" title="Αντοχή">${pictogram('stamina')}<div class="fg-meter"><span data-ref="staminaBar"></span></div><small data-ref="staminaLabel">100</small></div>
        <div class="fg-vital fg-hunger" title="Στομάχι">${pictogram('stomach')}<div class="fg-meter"><span data-ref="stomachBar"></span></div><small data-ref="stomachLabel">70%</small></div>
        <div class="fg-xp" title="Εμπειρία"><span data-ref="xpBar"></span></div>
        <div class="fg-player-rank" data-ref="playerRank" title="Κράτησε τρία αντίπαλα οχυρά για να στεφθείς βασιλιάς."><span data-ref="rankIcon">${icon('shield')}</span><strong data-ref="rankTitle">Ευγενής</strong><small data-ref="rankProgress">Στέψη 0/3</small></div>
        <button class="fg-population" data-action="open-roster" data-ref="populationButton" title="Ολόκληρη η συμμορία σου · χωρίς όριο πληθυσμού" aria-label="Πληθυσμός συμμορίας"><span class="fg-population-total">${pictogram('group')}<span>Πληθυσμός</span><b data-ref="populationTotal">1</b></span><span class="fg-population-duties"><span>Συνοδοί <b data-ref="populationTravelers">0</b></span><span>Φρουροί <b data-ref="populationGuards">0</b></span></span></button>
      </section>
      <section class="fg-location" aria-label="Πόροι και χάρτης λίμνης"><div class="fg-resource-row fg-resource-bank" aria-label="Κοινά αποθέματα"><span title="Κοινό απόθεμα τροφής" aria-label="Τροφή">${pictogram('fly')}<b data-ref="food">0</b><small>Τροφή</small></span><span title="Υλικά κατασκευής (ξύλο, φύλλα, καλάμια)" aria-label="Υλικά κατασκευής">${pictogram('reeds')}<b data-ref="reeds">0</b><small>Υλικά</small></span></div>
        <div class="fg-minimap-shell"><div class="fg-location-tools"><strong>Λίμνη</strong><div class="fg-clock"><span data-ref="dayIcon">${icon('sun')}</span><b data-ref="clock">09:00</b><span data-ref="day">1</span></div></div>
          <button class="fg-map-button fg-minimap" data-action="open-map" data-ref="minimapButton" aria-label="Χάρτης λίμνης · κλικ για μεγέθυνση" title="Κλικ για μεγάλο χάρτη"><canvas data-ref="minimap" width="440" height="440" aria-label="Θέσεις συμμάχων, αντιπάλων, οχυρών και αρχηγών"></canvas><span class="fg-map-north" aria-hidden="true">N</span></button>
          <div class="fg-minimap-legend" aria-label="Υπόμνημα χάρτη"><span><i class="is-ally"></i>Εσύ / ομάδα</span><span><i class="is-enemy"></i>Αντίπαλοι</span><span>${pictogram('crown')}Αρχηγοί</span></div>
          <div class="fg-map-stronghold" data-ref="mapStronghold" hidden>${pictogram('fort')}<span>Εχθρικό οχυρό: <b data-ref="strongholdPopulation">0</b> βάτραχοι</span></div>
          <div class="fg-map-bosses" data-ref="mapBosses" aria-label="Ενεργοί αρχηγοί" aria-live="polite" hidden></div>
        </div>
      </section>
      </div>
      <section class="fg-objective" data-ref="objectiveBox" aria-label="Στόχοι εκστρατείας">
        <button class="fg-objective-toggle" data-action="hud-objectives" data-ref="objectiveToggle" aria-expanded="false" aria-controls="fg-objective-details" title="Στόχοι εκστρατείας" aria-label="Άνοιγμα στόχων εκστρατείας"><span class="fg-objective-lead" data-ref="objectiveArt" hidden>${pictogram('camp')}</span><span class="fg-objective-next" data-ref="objectiveNext">${pictogram('fly')}</span><span class="fg-objective-brief"><strong data-ref="objectiveTitle">Βρες τροφή</strong><span class="fg-objective-count"><b data-ref="objectiveSummary">0 / 30</b><span class="fg-objective-track"><span data-ref="objectiveMeter"></span></span></span></span><span class="fg-disclosure-arrow">${icon('arrow')}</span></button>
        <div class="fg-objective-details" data-ref="objectiveDetails" id="fg-objective-details" hidden><p class="fg-objective-help" data-ref="objectiveHint"></p><div class="fg-conquest-summary"><span class="fg-conquest-label">Συμμορίες</span><div class="fg-territories" data-ref="territories"></div><b data-ref="objectiveProgress">0 / 5</b></div><div class="fg-campaign-strip" data-ref="campaignObjectives"></div></div>
      </section>
      <section class="fg-hunt" data-ref="hunt" aria-live="polite" hidden>
        <div class="fg-hunt-portrait"><img data-ref="predatorPortrait" alt="Θηρευτής" hidden><span data-ref="predatorFallback">${pictogram('heron')}</span><span class="fg-hunt-badge">${pictogram('enemy')}</span></div>
        <div class="fg-hunt-content"><div class="fg-hunt-heading"><span data-ref="predatorPhaseIcon">${pictogram('windup')}</span><span data-ref="predatorHpLabel">100 / 100</span></div><div class="fg-predator-health"><span data-ref="predatorHp"></span></div><div class="fg-phase-track"><span data-ref="predatorPhaseBar"></span></div><div class="fg-hunt-response" data-ref="predatorResponse"></div></div>
      </section>
      <div class="fg-crosshair" data-ref="crosshair"><i></i><i></i><i></i><i></i><span></span></div>
      <div class="fg-context" data-ref="context" hidden><span data-ref="contextArt"></span><kbd data-ref="contextKey">E</kbd><div class="fg-context-track"><span data-ref="contextBar"></span></div></div>
      <div class="fg-recruit-prompt" data-ref="recruitPrompt" role="status" hidden><strong data-ref="recruitName"></strong><span data-ref="recruitReason"></span></div>
      <section class="fg-selection-dock" data-ref="selectionDock" aria-label="Επιλεγμένη ομάδα"><button class="fg-squad-entry" data-action="open-roster" aria-label="Διοίκηση συμμορίας" title="Διοίκηση συμμορίας · TAB"><span data-ref="squadMode">${pictogram('follow')}</span><span class="fg-squad-caption"><small data-ref="selectionLabel">Ομάδα</small><b data-ref="selectionCount">0</b></span>${gangEmblem('ally')}</button><div class="fg-dock-portraits" data-ref="selectionPortraits"></div></section>
      <div class="fg-actionbar fg-image-actionbar fg-primary-actions" aria-label="Βασικές ενέργειες">
        ${this.actionTile('primary-attack','tongue','LMB','Επίθεση με τη γλώσσα','attack')}
        ${this.actionTile('special-attack','kick','Q','Ειδική επίθεση','special')}
        ${this.actionTile('intimidate','roar','R','Εκφοβισμός','roar')}
        ${this.actionTile('dodge','dodge','Z','Αποφυγή','dodge')}
        ${this.actionTile('interact','recruit','E','Αλληλεπίδραση','interact')}
        ${this.actionTile('open-build','camp','V','Κατασκευές')}
        ${this.actionTile('hud-more','more','B','Περισσότερες ενέργειες · B').replace('data-action="hud-more"','data-action="hud-more" data-ref="moreToggle" aria-controls="fg-action-drawer" aria-expanded="false"')}
      </div>
      <section class="fg-action-drawer" data-ref="actionDrawer" id="fg-action-drawer" aria-label="Πρόσθετες ενέργειες" hidden>
        <button class="fg-drawer-close" data-action="hud-close" aria-label="Κλείσιμο πρόσθετων ενεργειών" title="Κλείσιμο">${pictogram('close')}</button>
        <div class="fg-secondary-actions">${this.actionTile('gang-toggle','attack','F','Επίθεση / ακολουθήστε')}${this.actionTile('gang-forage','forage','T','Αναζήτηση μυγών και θεραπεία')}${this.actionTile('gang-regroup','regroup','⇧X','Όλοι μαζί · Shift+X · ανακαλεί και τις φρουρές')}${this.actionTile('cycle-view','third','C','Αλλαγή κάμερας','view')}${this.actionTile('open-roster','group','TAB','Διοίκηση συμμορίας')}${this.actionTile('open-map','topdown','','Χάρτης')}${this.actionTile('open-pause','pause','ESC','Παύση')}</div>
        <div class="fg-special-picker" aria-label="Επιλογή ειδικής κίνησης">${['kick','slam','tongue'].map((art,i)=>`<button data-action="special-select" data-index="${i}" title="${['Κλωτσιά','Άλμα κρούσης','Σάρωση γλώσσας'][i]}" aria-label="${['Κλωτσιά','Άλμα κρούσης','Σάρωση γλώσσας'][i]}" class="${i===0?'is-selected':''}">${pictogram(art)}<span class="fg-special-caption">${['Κλωτσιά','Άλμα','Σάρωση'][i]}</span>${key(i+1)}</button>`).join('')}</div>
      </section>
      <section class="fg-placement-hud fg-placement-tools" data-ref="buildPlacement" aria-label="Τοποθέτηση κατασκευής" hidden>
        <div class="fg-placement-building"><span data-ref="placementArt">${pictogram('camp')}</span><i data-ref="placementStatus">${pictogram('check')}</i></div>
        <div class="fg-placement-costs"><span title="Τροφή: διαθέσιμη / κόστος">${pictogram('fly')}<b data-ref="placementFood">0 / 0</b></span><span title="Υλικά κατασκευής: διαθέσιμα / κόστος">${pictogram('reeds')}<b data-ref="placementMaterials">0 / 0</b></span></div>
        <div class="fg-placement-rotation"><div><button data-action="rotate-placement" data-direction="-1" title="Περιστροφή αριστερά · Q" aria-label="Περιστροφή αριστερά">${pictogram('rotate-left')}${key('Q')}</button><button data-action="rotate-placement" data-direction="1" title="Περιστροφή δεξιά · R" aria-label="Περιστροφή δεξιά">${pictogram('rotate-right')}${key('R')}</button></div><b data-ref="placementAngle">0°</b></div>
        <button class="fg-placement-confirm" data-action="confirm-placement" data-ref="placementConfirm" title="Τοποθέτηση · πληρωμή και κατασκευή" aria-label="Επιβεβαίωση τοποθέτησης">${pictogram('place')}${key('LMB')}</button>
        <button class="fg-placement-cancel" data-action="cancel-placement" title="Ακύρωση · χωρίς χρέωση" aria-label="Ακύρωση τοποθέτησης">${pictogram('close')}${key('ESC')}</button>
      </section>
      <div class="fg-save-status" data-ref="saveStatus" title="Η πρόοδος αποθηκεύτηκε" hidden>${pictogram('save')}</div>
    </div>
    <div class="fg-toasts" data-ref="toasts" role="status" aria-live="polite"></div>
    <div class="fg-loading" data-ref="loading"><div class="fg-loading-mark">${icon('leaf')}</div><b>FROG</b><span data-ref="loadingText">Δημιουργία του ποταμού…</span><div class="fg-loading-line"></div></div>
    <section class="fg-title fg-overlay" data-ref="title" hidden>
      <div class="fg-title-art"></div><div class="fg-title-shade"></div><div class="fg-title-top"><span>${icon('leaf')} ARIS CONSTANTINOU</span><small>3D SURVIVAL · TERRITORY · GANGS</small></div>
      <div class="fg-title-body"><div class="fg-eyebrow fg-title-kicker">ΕΝΑΣ ΠΟΤΑΜΟΣ. ΠΟΛΛΕΣ ΣΥΜΜΟΡΙΕΣ.</div><h1>FROG<span>CREEK DOMINION</span></h1><p>Κυνήγησε. Στρατολόγησε. Κυριάρχησε.<br>Κράτησε τη συμμορία σου ζωντανή.</p><div class="fg-title-actions"><button class="fg-button fg-primary" data-action="continue" data-ref="continueButton" hidden>Συνέχεια ${icon('arrow')}</button><button class="fg-button fg-primary" data-action="new-game" data-ref="newButton">Μπες στον ποταμό ${icon('arrow')}</button><button class="fg-button fg-subtle" data-action="title-help">Χειρισμός & οδηγός</button></div><div class="fg-title-note">Ποντίκι για στόχευση · WASD για κίνηση · Αποθήκευση στη συσκευή σου</div></div>
      <div class="fg-title-bottom"><div><b>01</b><span>Βρες τα μεγάλα σμήνη</span></div><div><b>02</b><span>Χτίσε και υπερασπίσου</span></div><div><b>03</b><span>Ένωσε τον ποταμό</span></div></div>
    </section>
    <section class="fg-modal-layer" data-ref="pause" hidden><div class="fg-panel fg-pause-panel"><div class="fg-panel-head"><div><span class="fg-eyebrow">ΜΙΑ ΑΝΑΣΑ ΣΤΗΝ ΟΧΘΗ</span><h2>Παύση</h2></div><button class="fg-icon-button" data-action="resume" aria-label="Συνέχεια">${icon('close')}</button></div><p class="fg-muted">Ο ποταμός σε περιμένει.</p><div class="fg-pause-actions"><button class="fg-button fg-primary" data-action="resume">Επιστροφή στο παιχνίδι ${icon('arrow')}</button><button class="fg-button" data-action="save">Αποθήκευση προόδου ${icon('check')}</button></div><div class="fg-settings"><label>Ποιότητα γραφικών<select data-setting="quality"><option value="high">Υψηλή</option><option value="medium">Ισορροπημένη</option><option value="low">Απόδοση</option></select><small class="fg-performance" title="Τελευταία μέτρηση κατά τη διάρκεια του παιχνιδιού">Παιχνίδι: <output data-ref="fpsValue">—</output> FPS</small></label><label>Ένταση ήχου <output data-ref="volumeOutput">65%</output><input type="range" min="0" max="100" value="65" data-setting="volume"></label><label>Ευαισθησία ποντικιού <output data-ref="sensitivityOutput">1.0×</output><input type="range" min="30" max="200" value="100" data-setting="sensitivity"></label></div><button class="fg-text-button" data-action="pause-help">Πλήρης χειρισμός & οδηγός ${icon('arrow')}</button><button class="fg-text-button fg-danger-text" data-action="restart-confirm">Νέο ταξίδι</button><div data-ref="restartConfirm" class="fg-confirm" hidden><p>Η τρέχουσα αποθηκευμένη πρόοδος θα αντικατασταθεί.</p><button class="fg-button fg-danger" data-action="restart">Έναρξη νέου παιχνιδιού</button><button class="fg-button" data-action="restart-cancel">Ακύρωση</button></div></div></section>
    <section class="fg-modal-layer" data-ref="panelLayer" hidden><div class="fg-panel fg-game-panel" data-ref="panel"></div></section>
    <section class="fg-modal-layer" data-ref="ending" hidden><div class="fg-panel fg-ending-panel"><span class="fg-ending-mark" data-ref="endingMark">${icon('crown')}</span><span class="fg-eyebrow" data-ref="endingEyebrow">Ο ΠΟΤΑΜΟΣ ΕΝΩΘΗΚΕ</span><h2 data-ref="endingTitle">Κυρίαρχος του ποταμού</h2><p data-ref="endingText"></p><div class="fg-ending-stats" data-ref="endingStats"></div><div class="fg-pause-actions"><button class="fg-button fg-primary" data-action="continue-after-end" data-ref="endingContinue">Συνέχισε την εξερεύνηση</button><button class="fg-button" data-action="restart">Νέο ταξίδι</button></div></div></section>`;}

  click(event){
    const target=event.target.closest('[data-action]'); if(!target || target.disabled) return;
    const action=target.dataset.action;
    event.stopPropagation();
    if(action==='build-scroll'){this.scrollBuildCatalog(Number(target.dataset.direction)||1);return;}
    if(action==='hud-objectives'){this.toggleHudDisclosure('objectives');return;}
    if(action==='hud-more'){this.toggleHudDisclosure('actions');return;}
    if(action==='hud-close'){this.closeHudDisclosure(true);return;}
    this.closeHudDisclosure();
    if(action==='build-view'){this.buildView=target.dataset.view==='defense'?'defense':'catalog';this.renderPanel(true);return;}
    if(action==='defense-open'){this.openDefenses(target.dataset.camp);return;}
    if(action==='garrison-command'){this.callbacks.onAction('garrison-command',{campId:target.dataset.camp,command:target.dataset.command});this.renderPanel(true);return;}
    if(action==='defense-frog'){this.callbacks.onAction('select-frog',{id:target.dataset.id,additive:false});this.showPanel('roster');return;}
    if(action==='build'&&performance.now()<(this.dragClickUntil||0))return;
    if(action==='rotate-placement'){target.blur?.();this.callbacks.onAction('rotate-placement',{direction:Number(target.dataset.direction)||1});return;}
    if(action==='confirm-placement'||action==='cancel-placement'){target.blur?.();this.callbacks.onAction(action,{});return;}
    if(action==='new-game'||action==='continue'){
      this.hideMenus(); this.menu=null; this.refs.hud.hidden=false;
      this.callbacks.onStart(action==='continue'?'continue':'new'); return;
    }
    if(action==='resume'||action==='close-panel'||action==='continue-after-end'){
      this.hideMenus(); this.callbacks.onResume(); return;
    }
    if(action==='open-pause'){this.showPause(true);this.callbacks.onAction('pause',{});return;}
    if(action==='open-build'){this.callbacks.onAction('panel-open',{name:'build'});return;}
    if(action==='open-roster'){this.callbacks.onAction('panel-open',{name:'roster'});return;}
    if(action==='open-map'){this.callbacks.onAction('panel-open',{name:'map'});return;}
    if(action==='special-select'){this.callbacks.onAction('special-select',{index:Number(target.dataset.index)});return;}
    if(action==='select-frog'){this.callbacks.onAction('select-frog',{id:target.dataset.id,additive:Boolean(event.shiftKey||event.ctrlKey||event.metaKey)});if(this.panel==='roster')this.renderPanel(true);return;}
    if(action==='select-all'){this.callbacks.onAction('select-all',{filter:target.dataset.filter||'all'});this.renderPanel(true);return;}
    if(action==='roster-filter'){this.rosterFilter=target.dataset.filter||'all';this.renderPanel(true);return;}
    if(action==='gang-command'){this.callbacks.onAction('gang-command',{command:target.dataset.command});return;}
    if(action==='selection-command'){this.callbacks.onAction('selection-command',{command:target.dataset.command,ids:Array.from(this.chosen())});return;}
    if(action==='gang-forage'){this.callbacks.onAction('gang-command',{command:'forage'});return;}
    if(action==='title-help'||action==='pause-help'){
      this.returnMenu=action==='title-help'?'title':'pause'; this.showPanel('help');return;
    }
    if(action==='help-back'){
      this.closePanels(); if(this.returnMenu==='title')this.showTitle(this.hasSave);else this.showPause(true);return;
    }
    if(action==='tab-roster'||action==='tab-map'){this.showPanel(action==='tab-map'?'map':'roster');return;}
    if(action==='build'){this.callbacks.onAction('build',{type:target.dataset.type,campId:target.dataset.camp || this.state.currentCampId});return;}
    if(action==='frog-command'){this.callbacks.onAction('frog-command',{id:target.dataset.id,command:target.dataset.command});return;}
    if(action==='gang-toggle'){
      this.callbacks.onAction('gang-command',{command:this.state.squadMode==='attack'?'follow':'attack'});return;
    }
    if(action==='gang-follow'||action==='gang-guard'||action==='gang-attack'||action==='gang-regroup'){
      this.callbacks.onAction('gang-command',{command:action.slice(5)});return;
    }
    if(action==='restart-confirm'){this.refs.restartConfirm.hidden=false;return;}
    if(action==='restart-cancel'){this.refs.restartConfirm.hidden=true;return;}
    if(action==='restart'){this.hideMenus();this.refs.hud.hidden=false;this.callbacks.onAction('restart',{});return;}
    if(action==='save'){this.callbacks.onAction('save',{});return;}
    if(action==='consume'){this.callbacks.onAction('consume',{});return;}
    if(action==='recruit'){this.callbacks.onAction('recruit',{});return;}
    this.callbacks.onAction(action,{});
  }
  setting(event){
    const campSelect=event.target.closest('[data-defense-camp]');
    if(campSelect){this.defenseCampId=campSelect.value;this.renderPanel(true);return;}
    const input=event.target.closest('[data-setting]');if(!input)return;
    const field=input.dataset.setting;
    this.settings[field]=field==='quality'?input.value:Number(input.value)/100;
    this.refs.volumeOutput.textContent=`${whole(this.settings.volume*100)}%`;
    this.refs.sensitivityOutput.textContent=`${this.settings.sensitivity.toFixed(1)}×`;
    this.callbacks.onSettings({...this.settings});
  }
  setSettings(settings={}){
    Object.assign(this.settings,settings);
    for(const input of $$(this.root,'[data-setting]')){
      const field=input.dataset.setting;input.value=field==='quality'?this.settings[field]:this.settings[field]*100;
    }
    this.refs.volumeOutput.textContent=`${whole(this.settings.volume*100)}%`;
    this.refs.sensitivityOutput.textContent=`${this.settings.sensitivity.toFixed(1)}×`;
  }
  setLoading(text,progress){
    this.refs.loading.hidden=false;this.refs.loadingText.textContent=text;
    if(progress!==undefined)this.refs.loading.style.setProperty('--progress',`${clamp(progress)*100}%`);
  }
  showTitle(hasSave=false){
    this.hasSave=hasSave;this.hideMenus();this.menu='title';
    this.refs.loading.hidden=true;this.refs.title.hidden=false;this.refs.hud.hidden=true;
    this.refs.continueButton.hidden=!hasSave;
    this.refs.newButton.innerHTML=hasSave?`Νέο ταξίδι ${icon('arrow')}`:`Μπες στον ποταμό ${icon('arrow')}`;
    this.refs.newButton.classList.toggle('fg-primary',!hasSave);
  }
  showPause(paused=true){
    if(paused)this.closeHudDisclosure();
    if(!paused){this.refs.pause.hidden=true;if(this.menu==='pause')this.menu=null;return;}
    this.closePanels();this.menu='pause';this.refs.pause.hidden=false;this.refs.restartConfirm.hidden=true;
    this.setText('fpsValue',Number.isFinite(this.state.fps)?whole(this.state.fps):'—');
    document.exitPointerLock?.();
  }
  hideMenus(){
    this.closeHudDisclosure();
    for(const name of ['title','pause','ending','panelLayer','loading'])this.refs[name].hidden=true;
    this.panel=null;this.menu=null;
  }
  isBlocking(){return Boolean(this.menu||(this.panel&&!this.state.buildPlacement?.active));}
  closePanels(){this.panel=null;this.refs.panelLayer.hidden=true;}
  togglePanel(name,data){if(this.panel===name)this.closePanels();else this.showPanel(name,data);}
  showPanel(name,data){
    this.closeHudDisclosure();
    this.panel=name;this.panelData=data||{};
    if(name==='build'){this.buildView=data?.view==='defense'?'defense':'catalog';this.defenseCampId=data?.campId||this.state.currentCampId||this.defenseCampId;}
    this.refs.pause.hidden=true;
    this.refs.panelLayer.hidden=false;
    document.exitPointerLock?.();
    this.renderPanel(true);
  }
  setPortraits(portraits){
    Object.assign(this.portraits,portraits);
    if(this.portraits.frog){this.refs.playerPortrait.src=this.portraits.frog;this.refs.playerPortrait.hidden=false;this.refs.playerBadge.hidden=true;}
    this.activePortrait=null;
  }
  update(state={}){
    this.state=state;this.updatePlacement(state.buildPlacement);
    const p=state.player||{},allies=state.allies||[],selected=this.chosen();
    this.meter('hpBar',fraction(p.hp,p.maxHp));this.meter('staminaBar',fraction(p.stamina,p.maxStamina));
    this.meter('stomachBar',fraction(p.stomach,p.maxStomach));this.meter('xpBar',fraction(p.xp,p.nextXp));
    this.setText('hpLabel',whole(p.hp));this.setText('staminaLabel',whole(p.stamina));
    this.setText('stomachLabel',`${whole(fraction(p.stomach,p.maxStomach)*100)}%`);
    this.setText('level',p.level||1);this.setText('tier',['','I','II','III','IV','V'][p.tier||1]||p.tier);
    const rank=p.rank||{crowned:!!p.crowned,title:p.crowned?'Βασιλιάς':'Ευγενής',territories:0,target:3};
    this.setText('rankTitle',rank.title);this.setText('rankProgress',rank.crowned?'Στέφθηκες':`Στέψη ${Math.min(rank.territories,rank.target)}/${rank.target}`);
    if(this.refs.playerRank){this.refs.playerRank.title=rank.detail||'Κράτησε τρία αντίπαλα οχυρά για το στέμμα.';this.refs.playerRank.classList.toggle('is-crowned',rank.crowned);}
    if(this.lastCrowned!==rank.crowned&&this.refs.rankIcon){this.refs.rankIcon.innerHTML=icon(rank.crowned?'crown':'shield');this.lastCrowned=rank.crowned;}
    const livingAllies=allies.filter(f=>!f.dead&&!(Number.isFinite(f.hp)&&f.hp<=0));
    const population=Number.isFinite(state.gangCount)?whole(state.gangCount):livingAllies.length+(!p.dead&&!(Number.isFinite(p.hp)&&p.hp<=0)?1:0),guards=Math.min(livingAllies.length,whole(state.defenses?.guardCount??livingAllies.filter(f=>f.guard||f.order==='guard').length));
    this.setText('gangCount',population);this.setText('populationTotal',population);this.setText('populationTravelers',livingAllies.length-guards);this.setText('populationGuards',guards);
    this.refs.populationButton?.setAttribute('aria-label',`Πληθυσμός ${population} · Συνοδοί ${livingAllies.length-guards} · Φρουροί ${guards} · Χωρίς όριο πληθυσμού`);
    this.updateMapLegend(state.world||{});
    this.root.classList.toggle('fg-low-health',fraction(p.hp,p.maxHp)<.25);
    this.root.classList.toggle('fg-low-hunger',fraction(p.stomach,p.maxStomach)<.15);
    const r=this.resources(state.resources);this.setText('food',available(r.food));this.setText('reeds',available(r.reeds));
    for(const name of ['food','reeds'])this.refs[name].parentElement.classList.toggle('is-large-value',String(available(r[name])).length>5);
    this.setText('clock',state.timeLabel||'09:00');this.setText('day',state.day||1);
    const night=Boolean(state.night);if(night!==this.lastNight){this.refs.dayIcon.innerHTML=icon(night?'moon':'sun');this.lastNight=night;}
    this.refs.crosshair.hidden=this.isBlocking()||state.viewMode==='topdown';this.root.classList.toggle('fg-aiming',Boolean(state.aiming));
    const camps=state.camps||[],obj=state.objectiveVisual||{};
    const targets=obj.targets||camps.filter(c=>c.originalTeam?.startsWith('enemy')||String(c.team).startsWith('enemy')).slice(0,5).map(c=>({...c,done:c.destroyed||['ally','player','friendly'].includes(c.team)}));
    const normalized=targets.length?targets:Array.from({length:5},(_,i)=>({id:i,team:'enemy'+i,done:false}));
    const current=obj.current??normalized.filter(t=>t.done).length,total=obj.total||5;
    const territorySignature=JSON.stringify(normalized.map(t=>[t.id,t.team,t.originalTeam,t.done]));
    if(territorySignature!==this.territorySignature){
      this.territorySignature=territorySignature;
      this.refs.territories.innerHTML=normalized.map((t,i)=>`<span class="fg-territory${t.done?' is-conquered':''}" title="${esc(t.name||`Συμμορία ${i+1}`)}">${gangEmblem(t.originalTeam||(''+t.team).startsWith('enemy')&&t.team||'enemy'+i)}${t.done?`<i>${pictogram('check')}</i>`:''}</span>`).join('');
    }
    this.meter('objectiveMeter',obj.progress??current/total);this.setText('objectiveProgress',`${whole(current)} / ${whole(total)}`);
    const campaign=state.campaign||{},goals=campaign.objectives||[];
    const nextGoal=goals.find(g=>!g.done)||goals.at(-1),summaryArt=nextGoal?.icon||'crown';
    if(summaryArt!==this.summaryArt){this.summaryArt=summaryArt;this.refs.objectiveNext.innerHTML=pictogram(summaryArt);}
    this.setText('objectiveSummary',nextGoal?`${Math.min(whole(nextGoal.target),['fly','food','reeds','materials'].includes(nextGoal.icon)?available(nextGoal.current):whole(nextGoal.current))} / ${whole(nextGoal.target)}`:`${whole(current)} / ${whole(total)}`);
    this.meter('objectiveMeter',nextGoal?clamp(nextGoal.progress??nextGoal.current/nextGoal.target):obj.progress??current/total);
    const objectiveGuide=describeObjective(nextGoal);this.setText('objectiveTitle',objectiveGuide.title);this.setText('objectiveHint',objectiveGuide.hint);
    this.refs.objectiveToggle.title=materialText(nextGoal?.label||'Στόχοι εκστρατείας');
    const goalSignature=JSON.stringify(goals.map(g=>[g.id,g.icon,g.current,g.target,g.progress,g.done]));
    if(goalSignature!==this.goalSignature){
      this.goalSignature=goalSignature;this.refs.campaignObjectives.hidden=!goals.length;this.refs.campaignObjectives.classList.toggle('has-many',goals.length>6);
      this.refs.campaignObjectives.innerHTML=goals.map(g=>{
        const count=Math.min(whole(g.target),['food','fly','reeds','materials'].includes(g.icon)?available(g.current):whole(g.current));
        return `<div class="fg-campaign-goal${g.done?' is-done':''}" title="${esc(materialText(g.label||g.id))}"><span>${pictogram(g.icon||'camp')}</span><strong class="fg-goal-caption">${esc(goalCaption(g))}</strong><b>${count}<small>/ ${whole(g.target)}</small></b><div><i style="width:${clamp(g.progress??g.current/g.target)*100}%"></i></div>${g.done?`<em>${pictogram('check')}</em>`:''}</div>`;
      }).join('');
    }
    const objectiveArt=({settlement:'camp',hunters:'heron',preparation:'training',bosses:'boss',complete:'crown'}[campaign.phase])||({food:'forage',forage:'forage',build:'camp',shelter:'camp',defend:'shield',conquer:'crown',victory:'crown'}[obj.type])||'camp';
    if(objectiveArt!==this.objectiveArt){this.objectiveArt=objectiveArt;this.refs.objectiveArt.innerHTML=pictogram(objectiveArt);}
    this.refs.objectiveBox.title=typeof state.objective==='string'?state.objective:state.objective?.title||'Στόχοι εκστρατείας';
    const context=state.context||{},contextType=context.type,contextArt=context.actionIcon||{recruit:'recruit',loot:'store','persuade-camp':'persuade',persuade:'persuade',home:'camp',gather:'forage',reeds:'reeds',ally:'group',flies:'tongue'}[contextType]||contextType;
    if(this.refs.recruitPrompt){this.refs.recruitPrompt.hidden=!['recruit','rally'].includes(contextType)||this.isBlocking()||Boolean(this.hudDisclosure)||Boolean(state.buildPlacement?.active);this.refs.recruitPrompt.classList.toggle('is-unavailable',context.available===false);}
    if(['recruit','rally'].includes(contextType)){this.setText('recruitName',`${context.name||'Βάτραχος'} · E · ${context.actionLabel||'Στρατολόγησε'}`);this.setText('recruitReason',context.reason||'');}
    this.refs.context.hidden=!contextType||contextType==='none'||this.isBlocking();
    this.refs.context.title=materialText(state.hint||context.label||'');this.refs.context.classList.toggle('is-unavailable',context.available===false);
    if(contextArt!==this.contextArt){this.contextArt=contextArt;this.refs.contextArt.innerHTML=pictogram(contextArt||'recruit');$(this.root,'[data-action="interact"] .fg-action-art').innerHTML=pictogram(contextArt&&contextType!=='none'?contextArt:'recruit');}
    const interactTile=$(this.root,'[data-action="interact"]');interactTile.classList.toggle('has-context',Boolean(contextType&&contextType!=='none'));interactTile.classList.toggle('is-unavailable',context.available===false);interactTile.title=materialText([state.hint,context.reason].filter(Boolean).join(' · ')||'Πλησίασε βάτραχο, σμήνος ή οχυρό');interactTile.disabled=!contextType||contextType==='none';
    const contextFood=context.cost?.food,costBadge=this.refs.interactionCost;
    if(costBadge){
      costBadge.hidden=contextFood==null||contextType==='none';costBadge.title=context.reason||'';
      const costValue=contextFood>0?whole(contextFood):0;
      // Browser-normalized SVG innerHTML differs from its source markup. Compare
      // the displayed value so an unchanged cost never reparses the icon.
      if(!costBadge.hidden&&costValue!==this.contextCostValue){this.contextCostValue=costValue;costBadge.innerHTML=costValue>0?`${pictogram('fly')}<b>${costValue}</b>`:`${pictogram('check')}<b>0</b>`;}
      costBadge.classList.toggle('is-short',context.available===false&&!(context.cooldown>0));
    }
    const contextCaption=context.actionLabel||({recruit:'Στρατολόγησε',loot:'Λάφυρα','persuade-camp':'Πείσε',persuade:'Πείσε',home:'Κατασκευές',gather:'Μάζεψε',reeds:'Μάζεψε',ally:'Ομάδα',flies:'Μάζεψε'}[contextType]||'Πλησίασε');
    if(contextCaption!==this.contextCaption){this.contextCaption=contextCaption;$(interactTile,'.fg-action-caption').innerHTML=captionMarkup(contextCaption);}
    this.setText('contextKey',contextType==='home'?'V':'E');this.meter('contextBar',context.progress??1);
    const pred=state.predator,hunting=Boolean(pred&&pred.hp>0);if(hunting&&!this.wasHunting)this.closeHudDisclosure();this.wasHunting=hunting;this.root.classList.toggle('fg-is-hunted',hunting);this.refs.hunt.hidden=!hunting;this.refs.objectiveBox.hidden=hunting;
    if(hunting){
      this.refs.hunt.title=`${pred.name||predatorNames[pred.type]||'Θηρευτής'} · ${pred.objective||pred.note||predatorNotes[pred.type]||''}`;
      this.setText('predatorHpLabel',`${whole(pred.hp)} / ${whole(pred.maxHp)}`);this.meter('predatorHp',fraction(pred.hp,pred.maxHp));
      const phase=pred.phase||pred.state||'stalk',phaseArt={windup:'windup',lunge:'attack',attack:'attack',recover:'recover',grab:'rescue',grabbed:'rescue',flee:'attack',stalk:'enemy'}[phase]||'enemy';
      let phaseProgress=pred.phaseProgress;
      if(phaseProgress==null)phaseProgress=phase==='windup'?(pred.phaseTime||0)/(pred.windup||1):['grab','grabbed'].includes(phase)?(pred.rescueDamage||0)/(pred.rescueNeeded||45):phase==='recover'?(pred.phaseTime||0)/(pred.recover||1):['lunge','attack'].includes(phase)?1:.12;
      this.meter('predatorPhaseBar',phaseProgress);this.refs.hunt.dataset.phase=phase;this.refs.hunt.classList.toggle('is-boss',Boolean(pred.boss||pred.isBoss));this.refs.hunt.classList.toggle('is-enraged',Boolean(pred.enraged));
      const phaseSignature=`${pred.type}:${phaseArt}:${Boolean(pred.boss||pred.isBoss)}`;
      if(this.phaseSignature!==phaseSignature){
        this.phaseSignature=phaseSignature;this.refs.predatorPhaseIcon.innerHTML=pictogram(phaseArt);this.refs.predatorFallback.innerHTML=pictogram(pred.type||'heron');
        $(this.refs.hunt,'.fg-hunt-badge').innerHTML=pictogram(pred.boss||pred.isBoss?'crown':'enemy');
        this.refs.predatorResponse.innerHTML=['grab','grabbed'].includes(phase)?`${pictogram('rescue')}${key('Q')}${key('SPACE')}${key('R')}`:phase==='windup'?`${pictogram('dodge')}${key('Z')}${pictogram('shield')}${key('RMB')}`:`${pictogram('attack')}${key('LMB')}${key('Q')}`;
      }
      const src=pred.portrait||this.portraits[pred.type];if(src&&src!==this.activePortrait){this.refs.predatorPortrait.src=src;this.refs.predatorPortrait.alt=pred.name||predatorNames[pred.type]||'Θηρευτής';this.activePortrait=src;}
      this.refs.predatorPortrait.hidden=!src;this.refs.predatorFallback.hidden=Boolean(src);
    }
    const cooldowns={attack:[p.attackCD,.43],special:[p.specialCD,p.specialDuration||5.2],dodge:[p.dodgeCD,1.5],roar:[p.roarCD,8],interact:[context.cooldown??p.interactCD,context.cooldownDuration||4]};
    for(const [name,[remaining,totalTime]] of Object.entries(cooldowns)){
      const tile=$(this.root,`.fg-action-tile[data-cooldown="${name}"]`);if(!tile)continue;
      const value=Math.max(0,Number(remaining)||0);tile.style.setProperty('--cooldown',`${clamp(value/totalTime)*100}%`);tile.classList.toggle('is-cooling',value>.02);$(tile,'.fg-cooldown-time').textContent=value>.02?value.toFixed(1):'';
    }
    const special=Number(p.specialIndex??state.specialIndex??0);if(special!==this.specialIndex){this.specialIndex=special;$(this.root,'[data-cooldown="special"] .fg-action-caption').innerHTML=captionMarkup(['Κλωτσιά','Άλμα','Σάρωση'][special]||'Ειδική');$(this.root,'[data-cooldown="special"] .fg-action-art').innerHTML=pictogram(['kick','slam','tongue'][special]||'kick');for(const button of $$(this.root,'[data-action="special-select"]'))button.classList.toggle('is-selected',Number(button.dataset.index)===special);}
    if(this.viewMode!==state.viewMode){this.viewMode=state.viewMode;$(this.root,'[data-cooldown="view"] .fg-action-art').innerHTML=pictogram({first:'first',topdown:'topdown'}[state.viewMode]||'third');}
    const mode=state.squadMode||'follow';if(mode!==this.squadMode){this.squadMode=mode;this.refs.squadMode.innerHTML=pictogram({guard:'shield',train:'training',training:'training'}[mode]||mode);}
    this.setText('selectionCount',selected.size?`${selected.size} / ${allies.length}`:allies.length);this.refs.selectionDock.hidden=!allies.length;this.setText('selectionLabel',selected.size?'Επιλογή':'Ομάδα');
    this.updateSelectionDock(allies,selected);
    if(state.savedAt&&state.savedAt!==this.savedAt){this.savedAt=state.savedAt;this.refs.saveStatus.hidden=false;clearTimeout(this.saveTimer);this.saveTimer=setTimeout(()=>this.refs.saveStatus.hidden=true,2500);}
    const now=performance.now();if(now-this.lastDraw>100){this.drawMap(this.refs.minimap,state.world||{},false);this.lastDraw=now;if(this.panel==='map'){const canvas=$(this.refs.panel,'canvas');if(canvas)this.drawMap(canvas,state.world||{},true);}}
    if(this.panel&&now-this.lastPanel>700&&!['help','map'].includes(this.panel)){this.renderPanel(false);this.lastPanel=now;}
  }
  resources(resource){
    if(typeof resource==='number')return {food:resource,reeds:resource};
    return {food:resource?.food??resource?.flies??0,reeds:resource?.reeds??resource?.wood??resource?.materials??0};
  }
  setText(ref,value){const el=this.refs[ref];if(el&&el.textContent!==String(value))el.textContent=String(value);}
  meter(ref,value){const el=this.refs[ref];if(el)el.style.transform=`scaleX(${clamp(value)})`;}
  panelHeader(eyebrow,title,extra=''){
    return `<div class="fg-panel-head"><div><span class="fg-eyebrow">${eyebrow}</span><h2>${title}</h2></div><button class="fg-icon-button" data-action="${this.panel==='help'?'help-back':'close-panel'}" aria-label="Κλείσιμο">${icon('close')}</button></div>${extra}`;
  }
  renderPanel(force=false){
    const container=this.refs.panel;if(!this.panel||this.draggingBuild)return;
    const catalogScroll=$(container,'.fg-illustrated-build')?.scrollLeft||0;
    const scrollTop=container.scrollTop,gridScroll=$(container,'.fg-frog-grid')?.scrollTop||0,active=document.activeElement;
    if(!force&&container.contains(active)&&['INPUT','SELECT'].includes(active.tagName))return;
    container.classList.toggle('fg-command-panel',this.panel==='roster');container.classList.toggle('fg-building-panel',this.panel==='build');
    const s=this.state;
    const defenseSignature=(s.defenses?.camps||[]).map(c=>[c.id,c.name,c.watchtower,c.assigned,c.stationed,c.status,c.threats,s.camps?.find(fort=>fort.id===c.id)?.gateHp,s.camps?.find(fort=>fort.id===c.id)?.gateMaxHp,c.guards?.map(f=>[f.id,f.hp,f.status,f.order])]);
    const signature=this.panel==='roster'?JSON.stringify([this.panel,this.rosterFilter,Array.from(this.chosen()),s.allies?.map(f=>[f.id,f.name,f.hp,f.stomach,f.level,f.tier,f.order,f.guard,f.canPromote,f.trained,f.trainingProgress,Boolean(f.portrait)]),s.resources,s.capacity,s.recruitmentUnlimited,s.training,s.camps?.map(c=>[c.id,c.team,c.destroyed,Boolean(c.buildings?.training)]),s.currentCamp?.buildings,s.defenses?.traveling,s.defenses?.guardCount]):this.panel==='build'?JSON.stringify([this.panel,this.buildView,this.defenseCampId,Array.from(this.chosen()),s.resources,s.buildOptions,s.currentCamp?.id,s.currentCamp?.hp,s.currentCamp?.gateHp,s.currentCamp?.gateMaxHp,s.currentCamp?.buildings,s.placement,s.capacity,defenseSignature]):this.panel;
    if(!force&&this.panelSignature===signature)return;this.panelSignature=signature;
    if(this.panel==='help')container.innerHTML=this.helpMarkup();
    else if(this.panel==='build')container.innerHTML=this.buildMarkup();
    else if(this.panel==='roster')container.innerHTML=this.rosterMarkup();
    else if(this.panel==='map'){
      container.innerHTML=this.panelHeader('Ο ΚΟΣΜΟΣ ΣΟΥ','Ο Μεγάλος Ποταμός',this.tabs('map'))+`<div class="fg-large-map"><canvas width="1024" height="720"></canvas><span class="fg-map-north">N</span></div><div class="fg-map-legend"><span><i style="--legend:#c8f3a1"></i>Εσύ & σύμμαχοι</span><span><i style="--legend:#ee9a71"></i>Αντίπαλοι</span><span><i style="--legend:#f6db82"></i>Τροφή</span><span><i style="--legend:#c2b9e8"></i>Ελεύθερες θέσεις</span><span><i style="--legend:#f85a48"></i>Θηρευτές</span><span>${pictogram('crown')} Αρχηγοί · εικονίδιο είδους</span></div>`;
      this.drawMap($(container,'canvas'),this.state.world||{},true);
    }
    container.scrollTop=scrollTop;const catalog=$(container,'.fg-illustrated-build');if(catalog){catalog.scrollLeft=catalogScroll;this.syncBuildCatalog();}const grid=$(container,'.fg-frog-grid');if(grid)grid.scrollTop=gridScroll;
  }
  tabs(which){return `<div class="fg-tabs"><button class="${which==='roster'?'active':''}" data-action="tab-roster">${icon('group')} Συμμορία</button><button class="${which==='map'?'active':''}" data-action="tab-map">${icon('pin')} Χάρτης</button></div>`;}
  buildViews(){
    const defense=this.buildView==='defense';
    return `<div class="fg-build-views" aria-label="Προβολή οχυρών"><button data-action="build-view" data-view="catalog" class="${defense?'':'is-active'}" aria-pressed="${!defense}">${pictogram('camp')}<span>Κτίρια</span></button><button data-action="build-view" data-view="defense" class="${defense?'is-active':''}" aria-pressed="${defense}">${pictogram('shield')}<span>Άμυνα</span></button></div>`;
  }
  defenseCamps(){
    if(Array.isArray(this.state.defenses?.camps))return this.state.defenses.camps;
    return (this.state.camps||[]).filter(c=>['ally','player','friendly',0].includes(c.team)&&!c.destroyed).map(c=>{
      const guards=(this.state.allies||[]).filter(f=>f.home===c.id&&(f.guard||f.order==='guard')).map(f=>({...f,status:f.status||'stationed'}));
      const watchtower=Boolean(c.buildings?.watchtower);
      return {id:c.id,name:c.name,watchtower,slots:watchtower?4:2,assigned:guards.length,stationed:guards.length,staffed:guards.length>0,status:guards.length?'guarded':'empty',threats:0,range:watchtower?26:14,damageReduction:watchtower?18:0,guards};
    });
  }
  defenseCamp(){
    const camps=this.defenseCamps();
    return camps.find(c=>c.id===this.defenseCampId)||camps.find(c=>c.id===this.state.currentCampId)||camps[0]||null;
  }
  openDefenses(campId){
    this.defenseCampId=campId||this.state.currentCampId||this.defenseCampId;
    if(this.panel!=='build'){this.showPanel('build',{view:'defense',campId:this.defenseCampId});return;}
    this.buildView='defense';this.renderPanel(true);
  }
  gateMarkup(camp){
    if(!camp||!Number.isFinite(camp.gateMaxHp)||camp.gateMaxHp<=0)return '';
    const hp=whole(camp.gateHp),maximum=whole(camp.gateMaxHp);
    return `<span class="fg-gate-condition${hp>0?'':' is-breached'}" title="${hp>0?'Αντοχή της πύλης · επισκευάζεται μαζί με το οχυρό':'Η πύλη έσπασε · επισκεύασε το οχυρό για να κλείσει το πέρασμα'}">${pictogram('gate')}<span><small>${hp>0?'Πύλη':'Παραβιασμένη πύλη'}</small><b>${hp} / ${maximum}</b></span></span>`;
  }
  defenseMarkup(){
    const camps=this.defenseCamps(),camp=this.defenseCamp(),chosen=this.chosen();
    const header=this.panelHeader('ΦΡΟΥΡΑ & ΠΕΡΙΠΟΛΙΑ','Υπεράσπιση οχυρών',this.buildViews());
    if(!camp)return header+`<div class="fg-defense-empty"><span>${pictogram('camp')}</span><h3>Χρειάζεται οχυρό</h3><p>Χτίσε πρώτα μια βάση. Μετά ανάθεσε βατράχους για να την υπερασπίζονται όσο εξερευνάς.</p><button class="fg-defense-action" data-action="build-view" data-view="catalog">${pictogram('place')}<span>Χτίσε οχυρό</span></button></div>`;
    const fort=(this.state.camps||[]).find(f=>f.id===camp.id)||camp;
    const guards=camp.guards||[],assigned=whole(camp.assigned??guards.length),stationed=whole(camp.stationed),slots=Math.max(1,whole(camp.slots||2));
    const staffed=camp.staffed??stationed>0,status=camp.status||(!assigned?'empty':!stationed?'arriving':'guarded');
    const labels={empty:'Αφύλακτο',arriving:'Οι φρουροί έρχονται',guarded:'Σε περιπολία','under-attack':'Υπό επίθεση'};
    const statusArt={empty:'warning',arriving:'follow',guarded:'shield','under-attack':'attack'}[status]||'shield';
    const selected=(this.state.allies||[]).filter(f=>chosen.has(String(f.id))),missing=Math.max(0,slots-assigned);
    const guardLabels={stationed:'Στη θέση του',arriving:'Καθ’ οδόν',fighting:'Σε μάχη',training:'Εκπαίδευση'};
    const guardArt={stationed:'shield',arriving:'follow',fighting:'attack',training:'training'};
    return header+`
      <label class="fg-defense-camp-picker"><span>${pictogram('camp')}Οχυρό</span><select data-defense-camp aria-label="Οχυρό φρουράς">${camps.map(c=>`<option value="${esc(c.id)}" ${c.id===camp.id?'selected':''}>${esc(c.name)} · ${whole(c.assigned??c.guards?.length)} φρουροί</option>`).join('')}</select></label>
      <div class="fg-defense-layout">
        <section class="fg-defense-overview is-${esc(status)}">
          <div class="fg-defense-illustration">${pictogram(camp.watchtower?'watchtower':'camp')}<span>${pictogram(statusArt)}</span></div>
          <h3>${camp.watchtower?'Σκοπιά & φρουρά':'Φρουρά οχυρού'}</h3>
          <strong class="fg-defense-state">${labels[status]||'Φρουρά'}${camp.threats?` · ${whole(camp.threats)} απειλές`:''}</strong>
          ${this.gateMarkup(fort)}
          <div class="fg-defense-staffing"><span>${pictogram('group')}<b>${assigned}<small> / ${slots}</small></b></span><div><span style="width:${clamp(assigned/slots)*100}%"></span></div><small>Προτεινόμενη φρουρά · επιτρέπονται επιπλέον σύμμαχοι</small></div>
          <div class="fg-defense-benefits${staffed?' is-active':''}"><span>${pictogram('topdown')}<b>${whole(camp.range||14)} μ.</b><small>Εντοπισμός</small></span><span>${pictogram('shield')}<b>−${whole(camp.damageReduction)}%</b><small>Ζημιά φρουρών</small></span></div>
          <p class="fg-defense-benefit-note">${camp.watchtower?(staffed?'Ενεργή σκοπιά: εντοπισμός και προστασία των κοντινών φρουρών.':'Χωρίς παρόντες φρουρούς η σκοπιά παραμένει ανενεργή.'):'Οι φρουροί περιπολούν τη βάση και αποκρούουν εισβολείς. Μια σκοπιά αυξάνει την εμβέλεια και την προστασία τους.'}</p>
        </section>
        <section class="fg-defense-team"><div class="fg-defense-team-heading"><h3>Φρουροί</h3><span>${stationed} παρόντες · ${Math.max(0,assigned-stationed)} εκτός θέσης</span></div>
          <div class="fg-defense-guards">${guards.map(f=>`<button class="fg-defense-guard is-${esc(f.status||'arriving')}" data-action="defense-frog" data-id="${esc(f.id)}" aria-label="Διοίκηση ${esc(f.name)}" title="${esc(f.name)} · ${guardLabels[f.status]||'Καθ’ οδόν'}"><span class="fg-defense-portrait"><img src="${esc(this.portrait(f))}" alt="${esc(f.name)}"><i>${pictogram(guardArt[f.status]||'follow')}</i></span><strong>${esc(f.name)}</strong><span class="fg-defense-health"><i style="width:${fraction(f.hp,f.maxHp)*100}%"></i></span><small>${guardLabels[f.status]||'Καθ’ οδόν'}</small></button>`).join('')}${Array.from({length:missing},()=>`<div class="fg-defense-vacancy"><span>${pictogram('group')}</span><small>Κενή θέση</small></div>`).join('')}</div>
          <p class="fg-defense-how">Πάτησε <b>Επάνδρωση</b> για ανάθεση κοντινών συμμάχων. Θα μείνουν σε αυτή τη βάση μέχρι να τους ανακαλέσεις.</p>
          <div class="fg-defense-actions"><button class="fg-defense-action fg-defense-fill" data-action="garrison-command" data-command="assign" data-camp="${esc(camp.id)}" ${missing?'':'disabled'} title="Συμπλήρωση της προτεινόμενης φρουράς χωρίς κόστος · διατηρεί έναν συνοδό μαζί σου">${pictogram('shield')}<span>${missing?'Επάνδρωση':'Πλήρης φρουρά'}</span>${missing?`<b>+${missing}</b>`:''}</button><button class="fg-defense-action" data-action="garrison-command" data-command="assign-selected" data-camp="${esc(camp.id)}" ${selected.length?'':'disabled'} title="Ανάθεση των επιλεγμένων βατράχων, ακόμη και πάνω από την προτεινόμενη φρουρά">${pictogram('group')}<span>Επιλεγμένοι</span><b>${selected.length}</b></button><button class="fg-defense-action fg-defense-recall" data-action="garrison-command" data-command="recall" data-camp="${esc(camp.id)}" ${assigned?'':'disabled'} title="Οι φρουροί αυτού του οχυρού επιστρέφουν μαζί σου">${pictogram('regroup')}<span>Ανάκληση φρουράς</span></button></div>
          <small class="fg-defense-no-cost">Χωρίς κόστος πόρων · κρατά έναν συνοδό μαζί σου. Κλείσε το V για να ξεκινήσουν οι φρουροί.</small>
        </section>
      </div>`;
  }
  buildMarkup(){
    if(this.buildView==='defense')return this.defenseMarkup();
    const s=this.state,r=this.resources(s.resources),camp=s.currentCamp||this.panelData?.camp;
    const defaults=[
      {type:'shelter',name:'Νέο οχυρό',cost:{food:30,reeds:45}},
      {type:'store',name:'Αποθήκη',cost:{food:16,reeds:24}},
      {type:'nursery',name:'Φωλιά',cost:{food:24,reeds:32}},
      {type:'training',name:'Χώρος εκπαίδευσης',cost:{food:24,reeds:28}},
      {type:'watchtower',name:'Σκοπιά',cost:{food:22,reeds:34}},
      {type:'palisade',name:'Οχυρά τείχη',description:'Ενίσχυση ολόκληρης της περιμέτρου και της πύλης με μία αγορά.',cost:{food:18,reeds:30}},
      {type:'repair',name:'Επισκευή',cost:{food:8,reeds:12}},
      {type:'upgrade',name:'Αναβάθμιση',cost:{food:45,reeds:45}}
    ];
    const options=s.buildOptions||this.panelData?.buildOptions||defaults;
    const owned=(s.camps||[]).filter(c=>['ally','player','friendly',0].includes(c.team)&&!c.destroyed);
    const valid=s.placement?.valid!==false;
    const artFor=type=>({shelter:'camp',upgrade:'crown',promote:'crown','promote-player':'crown',repair:'repair'}[type]||type);
    const effectFor=type=>({shelter:'group',store:'fly',nursery:'recruit',watchtower:'shield',palisade:'shield',upgrade:'group',repair:'heart',promote:'attack','promote-player':'attack',training:'training'}[type]||'check');
    return this.panelHeader('ΚΑΤΑΣΚΕΥΗ & ΑΜΥΝΑ','Τα κάστρα σου',this.buildViews())+`
      <div class="fg-build-overview"><div class="fg-camp-illustration">${pictogram('camp')}${gangEmblem('ally')}</div><div class="fg-base-health"><h3>${esc(camp?.name||s.campName||'Νέο οχυρό')}</h3><div class="fg-base-healthbar"><span style="width:${camp?fraction(camp.hp,camp.maxHp)*100:100}%"></span></div><div class="fg-base-badges"><span title="Αντοχή οχυρού">${pictogram('heart')}<b>${camp?`${whole(camp.hp)} / ${whole(camp.maxHp)}`:'—'}</b></span>${this.gateMarkup(camp)}<span title="Συμμαχικά οχυρά">${pictogram('camp')}<b>${owned.length}</b></span><span title="Ενεργές φωλιές · χωρίς όριο πληθυσμού">${pictogram('nursery')}<b>${owned.filter(c=>c.buildings?.nursery).length}</b></span></div></div><div class="fg-build-bank" aria-label="Διαθέσιμα κοινά αποθέματα"><span class="fg-bank-label">Διαθέσιμα</span><div title="Κοινό απόθεμα τροφής">${pictogram('fly')}<b>${available(r.food)}</b><small>Τροφή</small></div><div title="Υλικά κατασκευής (ξύλο, φύλλα, καλάμια)">${pictogram('reeds')}<b>${available(r.reeds)}</b><small>Υλικά</small></div></div></div>
      <div class="fg-build-catalog-toolbar"><span>Κτίρια · σύρε ή επίλεξε</span><div><button class="fg-build-nav" data-action="build-scroll" data-direction="-1" title="Προηγούμενα κτίρια" aria-label="Προηγούμενα κτίρια">${icon('arrow')}</button><button class="fg-build-nav" data-action="build-scroll" data-direction="1" title="Επόμενα κτίρια" aria-label="Επόμενα κτίρια">${icon('arrow')}</button></div></div>
      <div class="fg-build-grid fg-illustrated-build" role="region" aria-label="Κατάλογος κτιρίων" tabindex="0">${options.map((o,i)=>{
        const cost=typeof o.cost==='number'?{food:o.cost,reeds:0}:(o.cost||{}),affordable=r.food>=(cost.food||0)&&r.reeds>=(cost.reeds||0);
        const built=Boolean(o.built||camp?.buildings?.[o.type]),siteOK=o.type==='shelter'?valid:Boolean(camp)||['promote','promote-player'].includes(o.type);
        const enabled=o.enabled!==false&&affordable&&!built&&siteOK,managed=built&&o.type==='watchtower'&&Boolean(camp?.id);
        const defense=managed?this.defenseCamps().find(c=>c.id===camp.id):null;
        const status=managed?'operational':built?'built':!siteOK?'site':!affordable?'resources':enabled?'ready':'locked';
        const explanation=managed?'Διαχείριση φρουράς · ανάθεση και ανάκληση βατράχων':materialText(o.reason||(!siteOK?'Απαιτείται κατάλληλη θέση ή συμμαχικό οχυρό':!affordable?'Δεν αρκούν τα κοινά αποθέματα':built?'Έχει ήδη κατασκευαστεί':o.description||''));
        const dragHelp=enabled&&placementTypes.has(o.type)?' · Σύρε στον χώρο ή κάνε κλικ και τοποθέτησε · Q/R περιστροφή · Esc ακύρωση':'';
        const statusArt={operational:'shield',built:'check',site:'warning',resources:'store',ready:'repair',locked:'warning'}[status];
        return `<button class="fg-build-card fg-picture-building is-${status}" data-action="${managed?'defense-open':'build'}" data-type="${esc(o.type)}" draggable="${enabled&&placementTypes.has(o.type)?'true':'false'}" data-camp="${esc(camp?.id||s.currentCampId||'')}" title="${esc((o.name||o.type)+' · '+explanation+dragHelp)}" aria-label="${esc((o.name||o.type)+' · '+explanation+dragHelp)}" ${enabled||managed?'':'disabled'}><div class="fg-building-art">${pictogram(artFor(o.type))}${enabled&&placementTypes.has(o.type)?`<span class="fg-building-drag" title="Σύρε και τοποθέτησε">${pictogram('place')}</span>`:''}<span class="fg-building-benefit" title="${esc(o.description||'')}">${pictogram(effectFor(o.type))}</span><span class="fg-building-state">${pictogram(statusArt)}</span></div><h3>${esc(o.name||o.type)}${o.type==='palisade'?'<small class="fg-building-scope">Όλη η περίμετρος + πύλη</small>':''}</h3><p class="fg-building-description">${esc(materialText(o.description||''))}</p>${!enabled&&!managed&&!built?`<p class="fg-building-reason">${esc(explanation)}</p>`:''}${managed?`<span class="fg-cost-label">Φρουρά οχυρού</span><div class="fg-building-operation">${pictogram('group')}<b>${whole(defense?.assigned)} / ${whole(defense?.slots||4)}</b><span>${defense?.stationed?'Επανδρωμένη':'Ανάθεσε φρουρούς'}</span></div>`:`<span class="fg-cost-label">Κόστος</span><div class="fg-material-requirements">${[['food','fly','Τροφή'],['reeds','reeds','Υλικά κατασκευής']].map(([resource,art,label])=>`<div class="fg-material ${r[resource]>=(cost[resource]||0)?'is-enough':'is-short'}" title="${label}: ${available(r[resource])} / ${whole(cost[resource]||0)}">${pictogram(art)}<div><b>${whole(cost[resource]||0)}</b><span><i style="width:${cost[resource]?clamp(r[resource]/cost[resource])*100:100}%"></i></span></div></div>`).join('')}</div>`}<div class="fg-build-purchase">${managed?'<strong>Άνοιγμα φρουράς</strong>':o.type==='palisade'?`<strong>${built?'Οχυρωμένη περίμετρος':'Ενίσχυσε τείχη'}</strong>`:key(i+1)}<span>${pictogram(managed?'shield':built?'check':enabled?(placementTypes.has(o.type)?'place':'repair'):'warning')}</span></div></button>`;
      }).join('')}</div>
      <div class="fg-build-footer"><div class="fg-placement-status${valid?'':' is-invalid'}" title="${esc(materialText(s.placement?.reason||(valid?'Κατάλληλη θέση κατασκευής':'Ακατάλληλη θέση κατασκευής')))}">${pictogram('camp')}${pictogram(valid?'check':'warning')}</div><button class="fg-image-meal" data-action="consume" title="Τροφή από κοινά αποθέματα" aria-label="Τροφή από κοινά αποθέματα" ${s.inCamp||camp?'':'disabled'}>${pictogram('fly')}${pictogram('heal')}${key('G')}</button><button class="fg-image-meal" data-action="gang-forage" title="Η ομάδα βρίσκει μύγες και θεραπεύεται" aria-label="Αναζήτηση τροφής">${pictogram('forage')}${key('T')}</button><div class="fg-build-exit">${key('V')}${key('ESC')}</div></div>`;
  }
  rosterMarkup(){
    const s=this.state,allies=s.allies||[],chosen=this.chosen(),r=this.resources(s.resources);
    const guardIds=new Set(this.defenseCamps().flatMap(c=>(c.guards||[]).map(f=>String(f.id))));
    const isGuard=f=>f.guard||f.order==='guard'||guardIds.has(String(f.id)),isInjured=f=>fraction(f.hp,f.maxHp)<.85,isForaging=f=>f.order==='forage';
    const filters={all:allies,injured:allies.filter(isInjured),guards:allies.filter(isGuard),forage:allies.filter(isForaging)};
    const shown=filters[this.rosterFilter]||allies,selected=allies.filter(f=>chosen.has(String(f.id))),single=selected.length===1?selected[0]:null;
    const promotion=single?.promoteCost,promotionCost=typeof promotion==='number'?{food:promotion,reeds:0}:promotion||{food:0,reeds:0};
    const health=selected.length?selected.reduce((sum,f)=>sum+fraction(f.hp,f.maxHp),0)/selected.length:0,hunger=selected.length?selected.reduce((sum,f)=>sum+fraction(f.stomach,f.maxStomach),0)/selected.length:0;
    const orderArt=f=>({guard:'shield',stay:'shield',train:'training',training:'training'}[f.order]||f.order||(f.guard?'shield':'follow'));
    const cardMeter=(art,percent,text,kind)=>`<div class="fg-card-meter ${kind}">${pictogram(art)}<span><b style="width:${clamp(percent)*100}%"></b></span><small>${text}</small></div>`;
    return this.panelHeader('ΤΑΚΤΙΚΗ ΔΙΟΙΚΗΣΗ','Πράσινο Ρεύμα',this.tabs('roster'))+`
      <div class="fg-command-summary"><span class="fg-hq-crest">${gangEmblem('ally')}</span><span class="fg-command-metric" title="Η συμμορία σου · απεριόριστη στρατολόγηση">${pictogram('group')}<b>${s.gangCount??allies.length+1}</b><small>Πληθυσμός</small></span><span class="fg-command-metric fg-duty-metric" title="Συνοδοί που ταξιδεύουν μαζί σου">${pictogram('follow')}<span><b>${whole(s.defenses?.traveling??allies.length-filters.guards.length)}</b><small>Συνοδοί</small></span></span><button class="fg-command-metric fg-duty-metric fg-duty-button" data-action="defense-open" title="Διαχείριση φρουρών οχυρών" aria-label="Διαχείριση φρουρών">${pictogram('shield')}<span><b>${whole(s.defenses?.guardCount??filters.guards.length)}</b><small>Φρουροί</small></span></button><span class="fg-command-metric fg-hq-food" title="Κοινό απόθεμα τροφής">${pictogram('fly')}<b>${available(r.food)}</b></span><span class="fg-command-metric fg-hq-reeds" title="Υλικά κατασκευής (ξύλο, φύλλα, καλάμια)">${pictogram('reeds')}<b>${available(r.reeds)}</b></span><div class="fg-global-command">${this.commandButton('regroup','gang-command')}${this.commandButton('forage','gang-command')}${this.trainingButton('gang')}</div></div>
      <div class="fg-command-layout"><div class="fg-army-main"><div class="fg-roster-toolbar"><div class="fg-roster-filters">${[['all','group','Όλοι'],['injured','heal','Τραυματισμένοι'],['guards','shield','Φρουροί'],['forage','forage','Σε αναζήτηση τροφής']].map(([filter,art,label])=>`<button data-action="roster-filter" data-filter="${filter}" class="${this.rosterFilter===filter?'is-active':''}" title="${label}" aria-label="${label}">${pictogram(art)}<b>${filters[filter].length}</b></button>`).join('')}</div><button class="fg-select-filter" data-action="select-all" data-filter="${this.rosterFilter}" title="Επιλογή όλων στο φίλτρο" aria-label="Επιλογή όλων στο φίλτρο">${pictogram('check')}${key('ALL')}</button></div><div class="fg-frog-grid">${shown.length?shown.map((f,i)=>`
        <button class="fg-frog-card${chosen.has(String(f.id))?' is-selected':''}${isInjured(f)?' is-wounded':''}" data-action="select-frog" data-id="${esc(f.id)}" aria-label="${esc(f.name||`Βάτραχος ${i+1}`)}" title="${esc((f.name||'Βάτραχος')+' · '+(roleNames[f.role]||f.role||'Κυνηγός'))}"><div class="fg-frog-picture"><img src="${esc(this.portrait(f))}" alt="${esc(f.name||'Βάτραχος')}" loading="lazy"><span class="fg-frog-crest">${gangEmblem('ally')}</span><span class="fg-frog-role">${pictogram(rolePictogram(f.role))}</span><span class="fg-frog-tier">${'◆'.repeat(Math.min(5,Math.max(1,f.tier||1)))}</span><b class="fg-frog-level">${whole(f.level||1)}</b>${chosen.has(String(f.id))?`<span class="fg-frog-chosen">${pictogram('check')}</span>`:''}${f.trainingProgress>0?`<div class="fg-training-card-progress"><span style="width:${clamp(f.trainingProgress)*100}%"></span>${pictogram('training')}</div>`:''}${f.trained?`<span class="fg-trained-badge" title="Εκπαιδευμένος">${pictogram('training')}</span>`:''}</div><div class="fg-frog-card-caption"><strong>${esc(f.name||`Βάτραχος ${i+1}`)}</strong><span>${pictogram(orderArt(f))}</span></div>${cardMeter('heart',fraction(f.hp,f.maxHp),whole(f.hp),'health')}${cardMeter('stomach',fraction(f.stomach,f.maxStomach),`${whole(fraction(f.stomach,f.maxStomach)*100)}%`,'hunger')}</button>`).join(''):`<div class="fg-roster-empty">${pictogram('recruit')}${key('E')}</div>`}</div></div>
      <aside class="fg-command-detail"><div class="fg-selection-title"><span>${pictogram('group')}</span><h3>${single?esc(single.name):selected.length?`${selected.length} βάτραχοι`:'Επιλογή ομάδας'}</h3></div><div class="fg-selected-hero">${selected.length?`<img src="${esc(this.portrait(selected[0]))}" alt="${esc(selected[0].name||'Επιλεγμένος βάτραχος')}"><span>${pictogram(single?rolePictogram(single.role):'group')}</span><b>${single?whole(single.level||1):selected.length}</b>`:pictogram('regroup')}</div>${cardMeter('heart',health,`${whole(health*100)}%`,'health')}${cardMeter('stomach',hunger,`${whole(hunger*100)}%`,'hunger')}<div class="fg-selected-orders">${['follow','attack','forage','guard','regroup'].map(command=>this.commandButton(command)).join('')}</div>${this.trainingButton('selection')}${single?`<button class="fg-promote-picture" data-action="frog-command" data-id="${esc(single.id)}" data-command="promote" aria-label="Προαγωγή" title="Προαγωγή · ${whole(promotionCost.food)} τροφή + ${whole(promotionCost.reeds)} υλικά κατασκευής" ${single.canPromote===false?'disabled':''}>${pictogram('crown')}<span>${'◆'.repeat(Math.min(5,(single.tier||1)+1))}</span>${pictogram('fly')}<b>${whole(promotionCost.food)}</b>${pictogram('reeds')}<b>${whole(promotionCost.reeds)}</b></button>`:''}<div class="fg-detail-selection-count">${pictogram('group')}<b>${selected.length} / ${allies.length}</b>${key('SHIFT')}</div></aside></div>`;
  }
  helpMarkup(){
    const rows=[['W A S D','Κίνηση σε σχέση με την κάμερα · σταθερή κατεύθυνση στην κάτοψη'],['Ποντίκι','Κάμερα και στόχευση · ελεύθερος δείκτης στην κάτοψη'],['C','Τρίτο πρόσωπο → πρώτο πρόσωπο → κάτοψη'],['Ροδέλα','Απόσταση κάμερας / μεγέθυνση κάτοψης'],['SPACE','Άλμα σε φύλλα και βράχους'],['SHIFT','Γρήγορη κίνηση · καταναλώνει αντοχή'],['Z','Γρήγορη αποφυγή επίθεσης'],['LMB','Γλώσσα για μύγες και επιθέσεις · κλικ σε σύμμαχο για επιλογή'],['SHIFT + κλικ','Προσθήκη ή αφαίρεση βατράχου από την επιλογή'],['RMB','Στόχευση / αμυντική στάση'],['Q','Επιλεγμένη ειδική επίθεση'],['1 / 2 / 3','Επιλογή ειδικής κίνησης'],['E','Στρατολόγηση ουδέτερου μπροστά σου έως 7μ · συλλογή σε σμήνος ή όχθη'],['R','Εκφοβισμός των αντιπάλων'],['F','Επίθεση / ακολουθήστε'],['T','Ομάδα: αναζήτηση μυγών για τροφή και θεραπεία'],['X','Επάνδρωση κοντινού οχυρού · κρατά έναν συνοδό μαζί σου'],['SHIFT + X','Όλοι μαζί · ανακαλεί και τις φρουρές όλων των βάσεων'],['B','Πρόσθετες ενέργειες'],['V','Κατασκευές · σύρε κάρτα στον χώρο ή κάνε κλικ και τοποθέτησε'],['Q / R','Κατά την τοποθέτηση: περιστροφή αριστερά / δεξιά'],['LMB / ESC','Κατά την τοποθέτηση: επιβεβαίωση / ακύρωση χωρίς χρέωση'],['G','Τροφή από τα κοινά αποθέματα κοντά στη βάση'],['TAB','Διοίκηση συμμορίας'],['Χάρτης πάνω δεξιά','Πάντα ανοιχτός · κλικ για μεγέθυνση · χρυσό στεφάνι στα ενεργά bosses'],['ESC','Παύση / απελευθέρωση ποντικιού']];
    const chapters=[
      ['01','camp','Θεμελίωσε τη συμμορία','Ξεκινάς μόνος ως Ευγενής. Πλησίασε τους κίτρινους ουδέτερους βατράχους και πάτησε E για στρατολόγηση με 4 τροφή. Συγκέντρωσε 30 τροφή και 45 υλικά κατασκευής. Χτίσε οχυρό, αποθήκη, φωλιά και χώρο εκπαίδευσης. Στρατολόγησε 6 συμμάχους και εκπαίδευσε 3.',['fly','reeds','camp','store','nursery','training','group']],
      ['02','heron','Αντιμετώπισε τους κυνηγούς','Οι πρώτες αποστολές ξεκλειδώνουν ερωδιό, νερόφιδο και αρπακτικό ψάρι. Διάβασε την εικόνα της επίθεσης, απέφυγε και αντεπιτέσου με την ομάδα.',['heron','snake','fish','dodge','attack']],
      ['03','training','Ετοίμασε τον στρατό','Επέκτεινε σε 2 οχυρά, 6 κτίρια και 6 εκπαιδευμένους συμμάχους. Κράτα φρουρούς στις βάσεις και δώσε εντολή αναζήτησης τροφής στους τραυματισμένους.',['camp','watchtower','training','shield','forage']],
      ['04','boss','Κυριάρχησε στον ποταμό','Νίκησε τους 3 μεγάλους θηρευτές και ένωσε και τις 5 αντίπαλες συμμορίες με κατάκτηση ή πειθώ. Μόλις κρατήσεις 3 αντίπαλα οχυρά, στέφεσαι Βασιλιάς και φοράς στέμμα. Οι μεγάλοι θηρευτές επιτίθενται σε διαδοχικές ορμές.',['boss','crown','persuade','attack']]
    ];
    return this.panelHeader('ΚΡΑΤΗΣΕ ΤΑ ΔΑΧΤΥΛΑ ΚΟΝΤΑ ΣΤΟ WASD','Χειρισμός & επιβίωση')+`<div class="fg-help-grid"><div><h3>Χειρισμός</h3><dl class="fg-controls">${rows.map(([k,t])=>`<div><dt>${key(k)}</dt><dd>${t}</dd></div>`).join('')}</dl><div class="fg-help-training"><span class="fg-help-training-art">${pictogram('training')}</span><div><h3>Εκπαίδευση ανά βάτραχο</h3><div class="fg-help-costs"><span>${pictogram('fly')}<b>8</b></span><span>${pictogram('reeds')}<b>4</b></span><span>${pictogram('recover')}<b>18″</b></span></div><p>Επίλεξε συμμάχους στη διοίκηση και πάτησε την εικόνα εκπαίδευσης. Το κόστος εμφανίζεται πριν δώσεις εντολή. Οι βάτραχοι πηγαίνουν σε συμμαχικό χώρο εκπαίδευσης· ο χρόνος αρχίζει όταν φτάσουν. Οι φρουροί επιστρέφουν στο καθήκον τους μετά το μάθημα.</p></div></div></div><div class="fg-guide fg-campaign-guide"><h3>Τα 4 κεφάλαια της εκστρατείας</h3>${chapters.map(([n,art,title,description,arts])=>`<article class="fg-help-chapter"><span class="fg-help-chapter-art">${pictogram(art)}</span><div><b>${n} / ${title}</b><p>${description}</p><div class="fg-help-chapter-images">${arts.map(a=>pictogram(a)).join('')}</div></div></article>`).join('')}<div class="fg-help-forage"><span>${pictogram('forage')}${key('T')}</span><div><b>Οι μύγες θεραπεύουν την ομάδα</b><p>Η εντολή αναζήτησης οδηγεί τους συμμάχους στα σμήνη για τροφή, θεραπεία και προμήθειες. Οι φρουροί κρατούν τη βάση τους. Στο V → Άμυνα αναθέτεις ή ανακαλείς τη φρουρά κάθε βάσης. Με Shift+X ή «Όλοι μαζί» επιστρέφουν όλοι οι φρουροί στην ομάδα. Ο πληθυσμός δεν έχει ανώτατο όριο. Οι φωλιές συνεχίζουν να γεννούν όσο υπάρχουν οι απαιτούμενοι πόροι. Ο μετρητής πάνω αριστερά δείχνει όλη τη συμμορία, τους συνοδούς και τους φρουρούς.</p></div></div><div class="fg-help-fort"><span>${pictogram('fort')}</span><div><b>Κάστρα, τείχη και πύλες</b><p>Κάθε οχυρό έχει περιμετρικά τείχη και πύλη. Στο V, το «Οχυρά τείχη» ενισχύει ολόκληρη την περίμετρο και την πύλη με μία αγορά. Στην πολιορκία παρακολούθησε την αντοχή της πύλης από την Κατασκευή ή την Άμυνα. Η Επισκευή αποκαθιστά το οχυρό και την πύλη του. Κράτα φρουρούς για να υπερασπίζονται την αυλή.</p></div></div><div class="fg-help-emblems"><span title="Σύμμαχοι">${gangEmblem('ally')}</span><span title="Αντίπαλες συμμορίες">${gangEmblem('enemy0')}</span><span title="Μεγάλος θηρευτής">${pictogram('boss')}</span></div></div></div>`;
  }
  emblemImage(team){
    if(!this.mapEmblems)this.mapEmblems=new Map();if(this.mapEmblems.has(team))return this.mapEmblems.get(team);
    const image=new Image();image.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(gangEmblem(team))}`;this.mapEmblems.set(team,image);return image;
  }
  mapSymbolImage(name){
    if(!this.mapSymbols)this.mapSymbols=new Map();if(this.mapSymbols.has(name))return this.mapSymbols.get(name);
    const image=new Image();image.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(pictogram(name))}`;this.mapSymbols.set(name,image);return image;
  }
  updateMapLegend(world={}){
    const stronghold=world.stronghold;
    if(this.refs.mapStronghold){
      this.refs.mapStronghold.hidden=!stronghold;
      if(stronghold){this.setText('strongholdPopulation',whole(stronghold.population));this.refs.mapStronghold.title=`${stronghold.name||'Εχθρικό οχυρό'} · ${whole(stronghold.population)} παρόντες βάτραχοι${stronghold.population<stronghold.target?' · Ενισχύεται προς '+whole(stronghold.target):''}`;}
    }
    const bosses=visibleMapPredators(world).filter(p=>p.boss||p.isBoss),signature=bosses.map(p=>`${p.id||p.type}:${p.name||''}`).join('|');
    if(signature===this.mapBossSignature)return;this.mapBossSignature=signature;
    if(this.refs.mapBosses){this.refs.mapBosses.hidden=!bosses.length;this.refs.mapBosses.innerHTML=bosses.map(p=>`<span class="fg-map-boss" title="${esc(p.name||mapPredatorNames[p.type]||'Αρχηγός')}"><i>${pictogram(p.type||'boss')}${pictogram('crown')}</i><b>${esc(mapPredatorNames[p.type]||'Αρχηγός')}</b></span>`).join('');}
    this.refs.minimapButton?.setAttribute('aria-label',`Χάρτης λίμνης · κλικ για μεγέθυνση${bosses.length?' · Ενεργοί αρχηγοί: '+bosses.map(p=>p.name||mapPredatorNames[p.type]||'Αρχηγός').join(', '):''}`);
  }
  drawMap(canvas,world={},large=false){
    const ctx=canvas.getContext('2d');if(!ctx)return;
    const w=canvas.width,h=canvas.height,radius=world.radius||110;
    const scale=Math.min(w,h)/(radius*2.12);const cx=w/2,cy=h/2;
    const pos=p=>[cx+(p.x??p.position?.x??0)*scale,cy+(p.z??p.position?.z??0)*scale];
    ctx.clearRect(0,0,w,h);ctx.fillStyle='#102825';ctx.fillRect(0,0,w,h);
    ctx.strokeStyle='#263e37';ctx.lineWidth=1;
    const grid=20*scale;
    ctx.beginPath();
    for(let x=cx%grid;x<w;x+=grid){ctx.moveTo(x,0);ctx.lineTo(x,h);}
    for(let y=cy%grid;y<h;y+=grid){ctx.moveTo(0,y);ctx.lineTo(w,y);}
    ctx.stroke();
    for(const region of world.mapRegions||[]){const[x,y]=pos(region);ctx.fillStyle=region.tint||'#355b43';ctx.globalAlpha=.16;ctx.beginPath();ctx.arc(x,y,(region.radius||20)*scale,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
    for(const route of world.routes||[]){const points=route.points||[route.from,route.to];if(points.length<2||!points.every(p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.z)))continue;ctx.strokeStyle='#8b9d7b44';ctx.lineWidth=large?2:1;ctx.beginPath();points.forEach((p,i)=>{const[x,y]=pos(p);i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.stroke();}
    if(world.platforms?.length){ctx.fillStyle='#42523d';ctx.beginPath();for(const p of world.platforms){const [x,y]=pos(p),r=Math.max(1,(p.radius||1)*scale);ctx.moveTo(x+r,y);ctx.arc(x,y,r,0,Math.PI*2);}ctx.fill();}
    for(const spot of world.hotspots||[]){if(spot.flies===0)continue;const [x,y]=pos(spot);ctx.fillStyle=spot.rich?'#d6b96b':'#8c9c6e';ctx.globalAlpha=.65;ctx.beginPath();ctx.arc(x,y,large?5:3,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
    for(const camp of world.camps||this.state.camps||[]){
      const [x,y]=pos(camp);const friendly=['player','ally','friendly',0].includes(camp.team);const neutral=camp.team==='neutral'||camp.team==null;
      ctx.strokeStyle=friendly?'#b8e89b':neutral?'#b6a9da':'#e89470';ctx.fillStyle=friendly?'#324e35':neutral?'#332f45':'#51392e';ctx.lineWidth=large?2:1.5;
      const stronghold=!camp.destroyed&&Boolean(camp.isStronghold||(world.stronghold&&camp.id===world.stronghold.id)),s=stronghold?17:12,emblem=stronghold?this.mapSymbolImage('fort'):this.emblemImage(friendly?'ally':neutral?'neutral':camp.originalTeam||camp.team);
      if(stronghold){ctx.fillStyle='#482f23';ctx.strokeStyle='#f1b679';ctx.lineWidth=large?3:2.5;ctx.beginPath();ctx.moveTo(x-s-3,y-s);ctx.lineTo(x-s-3,y+s+3);ctx.lineTo(x+s+3,y+s+3);ctx.lineTo(x+s+3,y-s);ctx.lineTo(x+s-2,y-s);ctx.lineTo(x+s-2,y-s-5);ctx.lineTo(x+3,y-s-5);ctx.lineTo(x+3,y-s);ctx.lineTo(x-3,y-s);ctx.lineTo(x-3,y-s-5);ctx.lineTo(x-s+2,y-s-5);ctx.lineTo(x-s+2,y-s);ctx.closePath();ctx.fill();ctx.stroke();}
      if(emblem.complete&&emblem.naturalWidth)ctx.drawImage(emblem,x-s,y-s*1.1,s*2,s*2.2);else{ctx.beginPath();ctx.moveTo(x,y-s);ctx.lineTo(x+s,y-s*.5);ctx.lineTo(x+s*.8,y+s*.5);ctx.lineTo(x,y+s);ctx.lineTo(x-s*.8,y+s*.5);ctx.lineTo(x-s,y-s*.5);ctx.closePath();ctx.fill();ctx.stroke();}
      if(large&&camp.name){ctx.font='13px system-ui';ctx.textAlign='center';ctx.fillStyle=stronghold?'#f1c696':'#c9d0ba';ctx.fillText(camp.name,x,y+s+16);if(stronghold){ctx.font='11px system-ui';ctx.fillText(`Οχυρό · ${whole(world.stronghold?.population??camp.garrisonCount)} βάτραχοι`,x,y+s+31);}}
    }
    const drawDots=(arr,color,size)=>{if(!arr?.length)return;ctx.fillStyle=color;ctx.beginPath();for(const p of arr){if(p.dead)continue;const[x,y]=pos(p);ctx.moveTo(x+size,y);ctx.arc(x,y,size,0,Math.PI*2);}ctx.fill();};
    drawDots(world.enemies,'#df936f',large?3:3.2);drawDots(world.allies,'#94ca8c',large?3:3.2);
    for(const predator of visibleMapPredators(world)){
      const [rawX,rawY]=pos(predator),boss=Boolean(predator.boss||predator.isBoss),s=boss?(large?17:17):(large?8:6);
      const x=clamp(rawX,s+4,w-s-4),y=clamp(rawY,s+15,h-s-4);
      if(boss){
        ctx.fillStyle='#39271a';ctx.strokeStyle='#ffdb79';ctx.lineWidth=large?3:2.5;
        ctx.beginPath();ctx.arc(x,y,s,0,Math.PI*2);ctx.fill();ctx.stroke();
        const species=this.mapSymbolImage(predator.type||'boss'),crown=this.mapSymbolImage('crown');
        if(species.complete&&species.naturalWidth)ctx.drawImage(species,x-s+3,y-s+3,(s-3)*2,(s-3)*2);
        else{ctx.fillStyle='#ffdf87';ctx.font=`bold ${s}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(({heron:'Ε',snake:'Ν',fish:'Ψ'})[predator.type]||'!',x,y);ctx.textBaseline='alphabetic';}
        if(crown.complete&&crown.naturalWidth)ctx.drawImage(crown,x-s*.6,y-s-13,s*1.2,16);
        else{ctx.strokeStyle='#ffdb79';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-7,y-s-2);ctx.lineTo(x-9,y-s-9);ctx.lineTo(x-3,y-s-6);ctx.lineTo(x,y-s-12);ctx.lineTo(x+3,y-s-6);ctx.lineTo(x+9,y-s-9);ctx.lineTo(x+7,y-s-2);ctx.stroke();}
        if(large){ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.fillStyle='#ffdf87';ctx.fillText(predator.name||mapPredatorNames[predator.type]||'Αρχηγός',x,y+s+17);}
      }else{ctx.save();ctx.translate(x,y);ctx.rotate(Math.PI/4);ctx.fillStyle=predator.hunting?'#ff6953':'#b47b67';ctx.fillRect(-s,-s,s*2,s*2);ctx.restore();}
    }
    const player=world.player||{x:0,z:0,yaw:0};const[px,py]=pos(player);
    ctx.strokeStyle='rgba(199,235,165,.16)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(px,py,18*scale,0,Math.PI*2);ctx.stroke();
    ctx.save();ctx.translate(px,py);ctx.rotate(Math.PI-(player.yaw||0));ctx.fillStyle='#e2f4bc';ctx.strokeStyle='#142a20';ctx.lineWidth=2;const sz=large?9:13;ctx.beginPath();ctx.moveTo(0,-sz);ctx.lineTo(sz*.65,sz*.7);ctx.lineTo(0,sz*.35);ctx.lineTo(-sz*.65,sz*.7);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
    if(large){for(const region of world.mapRegions||[]){if(!region.name)continue;const[x,y]=pos(region);ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillStyle='#b6c6a5';ctx.fillText(region.name,x,y+(region.radius||20)*scale*.6);}ctx.font='12px system-ui';ctx.textAlign='left';ctx.fillStyle='#829b8c';ctx.fillText('Κάθε τετράγωνο: 20 μονάδες',20,h-20);}
  }
  toast(message,kind='info'){
    const item=typeof message==='object'&&message?message:{detail:String(message),tone:kind},detail=materialText(item.detail||item.message||''),tone=item.tone||kind;
    const infer=()=>{
      if(/εκπαίδευ|training/i.test(detail))return 'training';if(/προαγ|βαθμίδ|επίπεδ/i.test(detail))return 'crown';
      if(/στρατολογ|ενώθηκ|συμμάχ/i.test(detail))return 'recruit';if(/μύγ|τροφή|έφαγ|γεμάτ|χόρτα/i.test(detail))return 'fly';
      if(/θεραπε|υγεί/i.test(detail))return 'heal';if(/υλικ|ξύλ|καλάμ|καλαμ/i.test(detail))return 'reeds';
      if(/φρουρ|υπεράσπ/i.test(detail))return 'shield';if(/καταφύγ|οχυρ|κάστρ|τείχ|πύλη|αποθήκ|φωλιά|χτίσ|χτίστ/i.test(detail))return 'camp';
      if(/πέθαν|έπεσ|νεκρ/i.test(detail))return 'enemy';if(/κάμερ|πρόσωπο|κάτοψ/i.test(detail))return 'camera';
      if(/αντοχ/i.test(detail))return 'stamina';if(/επίθε|χτύπ|θηρευτ|ερωδι|νερόφιδ|ψάρι/i.test(detail))return 'attack';
      return tone==='warning'||tone==='danger'?'warning':tone==='success'?'check':tone==='food'?'fly':'leaf';
    };
    const art=item.icon||infer(),id=item.id||`${tone}:${art}:${detail}`,now=performance.now();
    if(this.toastKeys.has(id)&&now-this.toastKeys.get(id)<1800)return;this.toastKeys.set(id,now);
    if(this.toastKeys.size>70)for(const [k,t] of this.toastKeys)if(now-t>10000)this.toastKeys.delete(k);
    const value=item.value??detail.match(/\+\s*\d+/)?.[0],life=['warning','danger'].includes(tone)?5200:3600;
    const toast=document.createElement('div');toast.className=`fg-toast fg-visual-toast fg-notice-${tone}${item.label?' has-label':''}${item.resources?' has-resources':''}`;toast.title=detail;toast.setAttribute('aria-label',detail||art);toast.style.setProperty('--notice-life',`${life}ms`);
    const resourceRows=item.resources?`<span class="fg-notice-resources">${[['food','fly','Τροφή'],['reeds','reeds','Υλικά']].filter(([name])=>Number(item.resources[name])>0).map(([name,image,label])=>`<span aria-label="${label} +${whole(item.resources[name])}">${pictogram(image)}<b>+${whole(item.resources[name])}</b></span>`).join('')}</span>`:'';
    toast.innerHTML=`<span class="fg-notice-art">${item.portrait?`<img src="${esc(item.portrait)}" alt="">`:pictogram(art)}</span><span class="fg-notice-payload">${resourceRows||pictogram(item.portrait?art:item.secondaryIcon||(['warning','danger'].includes(tone)?'warning':'check'))}${!resourceRows&&value!==undefined?`<b>${esc(value)}</b>`:''}${item.label?`<small class="fg-notice-label">${esc(item.label)}</small>`:''}${item.progress!==undefined?`<span class="fg-notice-progress"><span style="width:${clamp(item.progress)*100}%"></span></span>`:''}</span><span class="fg-notice-lifetime"></span>`;
    this.refs.toasts.append(toast);while(this.refs.toasts.children.length>2)this.refs.toasts.firstChild.remove();
    setTimeout(()=>{toast.classList.add('fg-toast-out');setTimeout(()=>toast.remove(),250);},life);
  }
  showEnding(victory,stats={}){
    this.hideMenus();this.menu='ending';this.refs.ending.hidden=false;document.exitPointerLock?.();
    this.refs.endingMark.innerHTML=icon(victory?'crown':'leaf');
    this.setText('endingEyebrow',victory?'Ο ΠΟΤΑΜΟΣ ΕΝΩΘΗΚΕ':'ΤΟ ΤΑΞΙΔΙ ΤΕΛΕΙΩΣΕ');
    this.setText('endingTitle',victory?'Κυρίαρχος του ποταμού':'Η λίμνη θυμάται');
    this.setText('endingText',victory?'Οι αντίπαλες βάσεις έπεσαν ή επέλεξαν να ενωθούν μαζί σου. Η συμμορία σου γράφει πλέον την ιστορία του ποταμού.':'Κάθε διαδρομή αφήνει μια ιστορία. Επέστρεψε με καλύτερη φρουρά, γεμάτα στομάχια και μια πιο δεμένη συμμορία.');
    this.refs.endingContinue.hidden=!victory;
    const metrics=[['Ημέρες',stats.days||stats.day||1],['Μύγες',stats.fliesCaught||stats.flies||0],['Στρατολογήσεις',stats.recruited||0],['Οχυρά',stats.campsCaptured||stats.camps||0],['Θηρευτές',stats.predatorsKilled||stats.predators||0]];
    this.refs.endingStats.innerHTML=metrics.map(([label,value])=>`<div><b>${whole(value)}</b><span>${label}</span></div>`).join('');
  }
  destroy(){this.abort.abort();clearTimeout(this.saveTimer);cancelAnimationFrame(this.dragVisibilityFrame);this.root.remove();}
}


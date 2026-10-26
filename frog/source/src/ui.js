import './style.css';
import './hud-layout.css';
import './garrison-ui.css';
import './realm-ui.css';
import './live-panels.css';
import './recruitment-card.css';
import './gameplay-hints.css';
import './start-screen.css';
import './readability.css';
import './creek-ui.css';
import {describeObjective} from './guidance.js';
import {pictogram,gangEmblem,frogAvatar,rolePictogram} from './visuals.js';
import {GUIDE_CATEGORIES,GUIDE_CARDS,GUIDE_ACTIONS,GUIDE_BUILDINGS,guideCard} from './field-guide.js';
import {refreshHUDLayout} from './hud-layout.js';
import {recruitmentCardMarkup,placeRecruitmentCard} from './recruitment-card.js';
import {normalizeUIScale} from './ui-preferences.js';
import {CREEK_GUIDE_CARDS,CREEK_GUIDE_CATEGORIES,creekGuideCard} from './creek-guide.js';
import {creekUIMethods,creekRefugeStatus} from './creek-ui.js';

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
const compactCaptions={'Απαιτήσεις':'Όροι','Στρατολόγησε':'Ένταξη','Κατασκευές':'Χτίσε','Ακολούθησε':'Έλα','Φρούρησε':'Φρουρά','Αποφυγή':'Ελιγμός'};
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
  play:'<path d="m8 4 12 8-12 8Z" fill="currentColor" stroke-width="1"/>',
  settings:'<path d="m9 3 1-2h4l1 2 3 2 2 0 2 3-1 2v4l1 2-2 3h-2l-3 2-1 2h-4l-1-2-3-2H4l-2-3 1-2v-4L2 8l2-3h2Z"/><circle cx="12" cy="12" r="3.5"/>',
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
const constructionStages=['Θεμέλια','Σκελετός','Κτίσιμο','Ολοκλήρωση'];
const clockDuration=seconds=>`${Math.floor(Math.max(0,Math.ceil(seconds))/60)}:${String(Math.max(0,Math.ceil(seconds))%60).padStart(2,'0')}`;
export function constructionPresentation(job={}){
  const duration=Math.max(.001,Number(job.duration)||1),progress=Math.max(0,Math.min(duration,Number(job.progress)||0));
  const remaining=Math.max(0,duration-progress),rate=Math.max(0,Number(job.workRate)||0),ratio=progress/duration;
  const running=remaining>0&&job.status==='working'&&rate>0;
  return {progress,duration,remaining,ratio,percent:Math.floor(ratio*100),stage:Math.min(3,Math.floor(ratio*4)),running,eta:running?Math.ceil(remaining/rate):remaining===0?0:null,time:remaining===0?'Ολοκληρώθηκε':running?`≈ ${clockDuration(remaining/rate)}`:'Σε αναμονή',reason:job.reason||(running?'Οι οικοδόμοι εργάζονται':'Χρειάζεται παρών οικοδόμος σε ασφαλές εργοτάξιο.')};
}

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
    this.panelExpanded=true;this.pauseExpanded=true;this.constructionExpanded=true;this.conceptPanelsOpen=false;this.lastGuideHintId='movement';
    this.recruitmentBubbleOpen=false;this.recruitmentTargetId=null;this.recruitmentAnchor=null;
    this.hudDisclosure=null;this.rosterFilter='all';this.buildView='catalog';this.defenseCampId=null;this.toastKeys=new Map();this.portraitCache=new Map();
    this.guideCategory='all';this.guideQuery='';this.guideId=null;this.guideReturn=null;this.guideBackToBook=false;this.guideFirstEncounter=false;
    this.settings={quality:'high',volume:0.65,sensitivity:1,uiScale:1};
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
    window.addEventListener('resize',()=>{this.lastDraw=0;this.lastPanelLayout=0;this.layoutDockedPanels();},{signal:this.abort.signal});
    if(typeof ResizeObserver!=='undefined'){
      this.layoutObserver=new ResizeObserver(()=>{if(this.layoutFrame)return;this.layoutFrame=requestAnimationFrame(()=>{this.layoutFrame=0;this.layoutDockedPanels();});});
      for(const element of $$(this.root,'.fg-player,.fg-knowledge-tools,.fg-location,.fg-primary-actions,.fg-objective,.fg-hunt,[data-ref="selectionDock"],[data-ref="tacticsDock"],[data-ref="practicalTutorial"],[data-ref="constructionBody"],[data-ref="panel"],[data-ref="pausePanel"]'))this.layoutObserver.observe(element);
    }
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
    this.layoutDockedPanels();
  }
  closeHudDisclosure(restoreFocus=false){if(this.hudDisclosure)this.setHudDisclosure(null,restoreFocus);}
  hudKeydown(event){
    if(this.menu==='title'&&event.code==='Escape'&&this.titleSettingsOpen){event.preventDefault();event.stopPropagation();this.closeTitleSettings();return;}
    if(this.hudDisclosure&&event.code==='Escape'){event.preventDefault();event.stopPropagation();this.closeHudDisclosure(true);return;}
    const button=event.target.closest?.('button');
    if(button&&['Space','Enter'].includes(event.code)){event.preventDefault();event.stopPropagation();if(!event.repeat)button.click();return;}
    const inCard=event.target.closest?.('.fg-recruitment-bubble'),inPanel=event.target.closest?.('.fg-panel');
    if(event.code==='Tab'&&(inPanel||inCard||this.menu==='title')){event.stopPropagation();return;}
    const allowed=['Escape','Tab','KeyV','KeyU','KeyH','KeyO','AltLeft','AltRight','KeyW','KeyA','KeyS','KeyD','ShiftLeft','ShiftRight'];if(inCard)allowed.push('KeyE');
    if(event.target.matches?.('input,select,textarea')||((inPanel||inCard)&&!allowed.includes(event.code)&&!this.state.buildPlacement?.active))event.stopPropagation();
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
    const guide=GUIDE_ACTIONS[action];
    return `<div class="fg-action-slot"><button class="fg-action-tile" data-action="${action}" data-cooldown="${cooldown}" aria-label="${esc(label)}" title="${esc(label)}"><span class="fg-action-art">${art==='more'?icon('more'):pictogram(art)}</span><span class="fg-action-caption">${captionMarkup(actionCaptions[action]||label)}</span>${action==='interact'?'<span class="fg-interaction-cost" data-ref="interactionCost" hidden></span>':''}<span class="fg-cooldown-cover"></span><span class="fg-cooldown-time"></span>${k?key(k):''}<span class="fg-ready-line"></span></button>${guide?`<button class="fg-action-help" data-guide-open="${guide}" aria-label="Οδηγία: ${esc(label)}" title="Πώς λειτουργεί;">?</button>`:''}</div>`;
  }
  commandButton(command,action='selection-command',id=''){
    const names={follow:'Ακολουθήστε',attack:'Επίθεση',forage:'Βρείτε μύγες · τροφή και θεραπεία',guard:this.state.creek?.enabled?'Κρατήστε θέση στη φιλική περιοχή':'Υπεράσπιση οχυρού',regroup:action==='gang-command'?'Όλοι μαζί · Shift+X · ανακαλεί και τις φρουρές':'Συγκέντρωση επιλεγμένων',train:'Εκπαίδευση',promote:'Προαγωγή',scout:'Εξερευνήστε μπροστά μου χωρίς να αρχίσετε μάχη',distract:'Αποσπάστε την προσοχή της απειλής που στόχευσα',protect:'Μείνετε κοντά και προστατέψτε την ομάδα',retreat:'Διακόψτε την επίθεση και υποχωρήστε'};
    const captions={follow:'Μαζί μου',attack:'Επίθεση',forage:'Τροφή',guard:'Φρουρά',regroup:action==='gang-command'?'Όλοι μαζί':'Επιστροφή',scout:'Ανίχνευση',distract:'Αντιπερισπασμός',protect:'Προστασία',retreat:'Υποχώρηση'};
    const art={guard:'shield',train:'training',training:'training',promote:'crown',scout:'leaf',distract:'roar',protect:'shield',retreat:'regroup'}[command]||command;
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
    const natural=Boolean(this.state.creek?.enabled),id=String(f.id??f.name??f.role??'frog')+':'+(f.tier||1)+':'+(natural?'natural':f.role||'hunter');
    if(!this.portraitCache.has(id))this.portraitCache.set(id,frogAvatar(natural?{...f,role:'hunter'}:f));
    return this.portraitCache.get(id);
  }
  chosen(){return new Set((this.state.selectedIds||this.state.allies?.filter(f=>f.selected).map(f=>f.id)||[]).map(String));}
  guideEntry(id){return this.state.creek?.enabled?creekGuideCard(id):guideCard(id);}
  presentationText(text){return this.state.creek?.enabled?String(text||''):materialText(text);}
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
        <div class="fg-breath" data-ref="breath" role="status" hidden><span>Ανάσα</span><progress data-ref="breathBar" max="100" value="100" aria-label="Ανάσα κατάδυσης"></progress><b data-ref="breathValue">100%</b></div>
        <div class="fg-player-rank" data-ref="playerRank" title="Κράτησε τρία αντίπαλα οχυρά για να στεφθείς βασιλιάς."><span data-ref="rankIcon">${icon('shield')}</span><strong data-ref="rankTitle" role="status" aria-live="polite" aria-atomic="true">Ευγενής</strong><small data-ref="rankProgress">Στέψη 0/3</small></div>
        <button class="fg-population" data-action="open-roster" data-ref="populationButton" title="Όλο το βασίλειο · χωρίς όριο πληθυσμού" aria-label="Πληθυσμός βασιλείου"><span class="fg-population-total">${pictogram('group')}<span>Πληθυσμός</span><b data-ref="populationTotal">1</b></span><span class="fg-population-duties"><span>Συνοδοί <b data-ref="populationTravelers">0</b></span><span>Φρουροί <b data-ref="populationGuards">0</b></span></span><span class="fg-population-duties fg-population-regions" data-ref="populationRegions" hidden><span>Εδώ <b data-ref="populationLocal">1</b></span><span>Άλλες λίμνες <b data-ref="populationAway">0</b></span></span></button>
        <div class="fg-player-guidance">
        <div class="fg-knowledge-tools"><button data-action="open-guide" aria-label="Εικονογραφημένο βιβλίο οδηγιών">${icon('leaf')}<span>Οδηγός</span></button><button data-action="open-realm" aria-label="Περιοχές και μεθόριος">${icon('pin')}<span>Περιοχές</span></button></div>
        <section class="fg-practical-tutorial" data-ref="practicalTutorial" aria-label="Πρακτική εκπαίδευση" hidden></section>
        </div>
      </section>
      <section class="fg-location" aria-label="Πόροι και χάρτης λίμνης"><div class="fg-resource-row fg-resource-bank" aria-label="Κοινά αποθέματα"><span title="Κοινό απόθεμα τροφής" aria-label="Τροφή">${pictogram('fly')}<b data-ref="food">0</b><small>Τροφή</small><button class="fg-resource-guide" data-guide-open="food" aria-label="Οδηγία για τροφή και συντήρηση">?</button></span><span title="Υλικά κατασκευής (ξύλο, φύλλα, καλάμια)" aria-label="Υλικά κατασκευής">${pictogram('reeds')}<b data-ref="reeds">0</b><small>Υλικά</small><button class="fg-resource-guide" data-guide-open="materials" aria-label="Οδηγία για τα υλικά">?</button></span><span title="Σπάνια μαργαριτάρια" aria-label="Μαργαριτάρια"><i class="fg-pearl" aria-hidden="true"></i><b data-ref="pearls">0</b><small>Πέρλες</small><button class="fg-resource-guide" data-guide-open="pearls" aria-label="Οδηγία για τα μαργαριτάρια">?</button></span></div><button class="fg-supply-summary" data-ref="supplySummary" data-guide-open="food" hidden></button>
        <div class="fg-minimap-shell"><div class="fg-location-tools"><strong>Λίμνη</strong><div class="fg-clock"><span data-ref="dayIcon">${icon('sun')}</span><b data-ref="clock">09:00</b><span data-ref="day">1</span></div></div>
          <button class="fg-map-button fg-minimap" data-action="open-map" data-ref="minimapButton" aria-label="Χάρτης λίμνης · κλικ για μεγέθυνση" title="Κλικ για μεγάλο χάρτη"><canvas data-ref="minimap" width="440" height="440" aria-label="Θέσεις συμμάχων, αντιπάλων, οχυρών και αρχηγών"></canvas><span class="fg-map-north" aria-hidden="true">N</span></button>
          <div class="fg-minimap-legend" aria-label="Υπόμνημα χάρτη"><span><i class="is-ally"></i>Εσύ / ομάδα</span><span><i class="is-enemy"></i>Αντίπαλοι</span><span>${pictogram('crown')}Αρχηγοί</span></div>
          <div class="fg-map-stronghold" data-ref="mapStronghold" hidden>${pictogram('fort')}<span>Εχθρικό οχυρό: <b data-ref="strongholdPopulation">0</b> βάτραχοι</span></div>
          <div class="fg-map-bosses" data-ref="mapBosses" aria-label="Ενεργοί αρχηγοί" aria-live="polite" hidden></div>
        </div>
      </section>
      </div>
      <section class="fg-objective" data-ref="objectiveBox" aria-label="Στόχοι εκστρατείας">
        <button class="fg-objective-toggle" data-action="hud-objectives" data-ref="objectiveToggle" aria-expanded="false" aria-controls="fg-objective-details" aria-keyshortcuts="O" aria-label="Στόχοι εκστρατείας · O"><span class="fg-objective-lead" data-ref="objectiveArt" hidden>${pictogram('camp')}</span><span class="fg-objective-next" data-ref="objectiveNext">${pictogram('fly')}</span><span class="fg-objective-brief"><strong data-ref="objectiveTitle">Βρες τροφή</strong><span class="fg-objective-count"><b data-ref="objectiveSummary">0 / 30</b><span class="fg-objective-track"><span data-ref="objectiveMeter"></span></span></span></span></button>
        <p class="fg-objective-instruction" data-ref="objectiveHint"></p>
        <div class="fg-objective-shortcuts"><span><kbd>O</kbd> Στόχοι</span><span><kbd>Alt</kbd> Δείκτης</span></div>
        <div class="fg-objective-details" data-ref="objectiveDetails" id="fg-objective-details" hidden><div class="fg-conquest-summary"><span class="fg-conquest-label">Συμμορίες</span><div class="fg-territories" data-ref="territories"></div><b data-ref="objectiveProgress">0 / 5</b></div><div class="fg-campaign-strip" data-ref="campaignObjectives"></div></div>
      </section>
      <section class="fg-hunt" data-ref="hunt" aria-live="polite" hidden>
        <div class="fg-hunt-portrait"><img data-ref="predatorPortrait" alt="Θηρευτής" hidden><span data-ref="predatorFallback">${pictogram('heron')}</span><span class="fg-hunt-badge">${pictogram('enemy')}</span></div>
        <div class="fg-hunt-content"><div class="fg-hunt-heading"><span data-ref="predatorPhaseIcon">${pictogram('windup')}</span><span data-ref="predatorHpLabel">100 / 100</span></div><div class="fg-predator-health"><span data-ref="predatorHp"></span></div><div class="fg-phase-track"><span data-ref="predatorPhaseBar"></span></div><div class="fg-hunt-response" data-ref="predatorResponse"></div></div>
      </section>
      <div class="fg-crosshair" data-ref="crosshair"><i></i><i></i><i></i><i></i><span></span></div>
      <div class="fg-context" data-ref="context" hidden><span data-ref="contextArt"></span><kbd data-ref="contextKey">E</kbd><div class="fg-context-track"><span data-ref="contextBar"></span></div></div>
      <div class="fg-recruit-prompt" data-ref="recruitPrompt" role="status" hidden><strong data-ref="recruitName"></strong><span data-ref="recruitReason"></span><button class="fg-recruit-details" data-action="recruit-inspect">Δες τις απαιτήσεις</button><button class="fg-context-help" data-guide-open="recruit" aria-label="Πώς στρατολογώ;">?</button></div>
      <section class="fg-recruitment-bubble" data-ref="recruitmentBubble" role="region" aria-label="Απαιτήσεις στρατολόγησης" hidden></section>
      <div class="fg-tactics-dock" data-ref="tacticsDock" aria-label="Αποθηκευμένες ομάδες" hidden></div>
      <aside class="fg-guide-hint fg-concept-panel" id="fg-concept-panel" data-ref="guideHint" aria-label="Εικονογραφημένη οδηγία" hidden></aside>
      <section class="fg-construction-hud" data-ref="constructionHUD" aria-label="Ζωντανή πρόοδος κατασκευών" hidden><button class="fg-construction-heading" data-action="construction-expand" data-ref="constructionToggle" aria-expanded="true" aria-controls="fg-construction-body"><span>${icon('camp')} Κατασκευές <b data-ref="constructionCount"></b></span><span class="fg-construction-heading-progress" data-ref="constructionBrief"></span>${icon('arrow')}</button><div id="fg-construction-body" data-ref="constructionBody"></div></section>
      <section class="fg-selection-dock" data-ref="selectionDock" aria-label="Επιλεγμένη ομάδα"><button class="fg-squad-entry" data-action="open-roster" aria-label="Διοίκηση συμμορίας" title="Διοίκηση συμμορίας · TAB"><span data-ref="squadMode">${pictogram('follow')}</span><span class="fg-squad-caption"><small data-ref="selectionLabel">Ομάδα</small><b data-ref="selectionCount">0</b></span>${gangEmblem('ally')}</button><div class="fg-dock-portraits" data-ref="selectionPortraits"></div></section>
      <div class="fg-actionbar fg-image-actionbar fg-primary-actions" aria-label="Βασικές ενέργειες">
        ${this.actionTile('primary-attack','tongue','LMB','Επίθεση με τη γλώσσα','attack')}
        ${this.actionTile('special-attack','kick','Q','Ειδική επίθεση','special')}
        ${this.actionTile('intimidate','roar','R','Εκφοβισμός','roar')}
        ${this.actionTile('dodge','dodge','Z','Αποφυγή','dodge')}
        ${this.actionTile('interact','recruit','E','Αλληλεπίδραση','interact')}
        ${this.actionTile('open-build','camp','V','Κατασκευές')}
        ${this.actionTile('hud-more','more','B','Περισσότερες ενέργειες · B').replace('data-action="hud-more"','data-action="hud-more" data-ref="moreToggle" aria-controls="fg-action-drawer" aria-expanded="false"')}
        <div class="fg-action-slot"><button class="fg-action-tile fg-concept-nav" data-action="concept-toggle" data-ref="conceptToggle" aria-label="Εικόνες και οδηγίες · U" aria-expanded="false" aria-controls="fg-concept-panel" title="Εικόνες και οδηγίες · U"><span class="fg-action-art fg-concept-nav-art"><img src="./guide/movement.webp" alt="Εικονογραφημένος οδηγός βατράχων" width="40" height="40"></span><span class="fg-action-caption">${captionMarkup('Εικόνες')}</span>${key('U')}<span class="fg-ready-line"></span></button></div>
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
    <div class="fg-loading" data-ref="loading" role="status"><span class="fg-loading-status" data-ref="loadingText">Loading…</span><div class="fg-loading-line" aria-hidden="true"></div></div>
    <section class="fg-title fg-overlay fg-start-menu" data-ref="title" aria-label="Main menu" hidden>
      <div class="fg-title-art" aria-hidden="true"></div><div class="fg-title-shade" aria-hidden="true"></div>
      <div class="fg-title-actions" data-ref="titleActions">
        <button class="fg-menu-button fg-menu-primary" data-action="continue" data-ref="continueButton" hidden><span class="fg-menu-icon">${icon('play')}</span><span class="fg-menu-label">RESUME</span></button>
        <button class="fg-menu-button fg-menu-primary" data-action="new-game" data-ref="newButton"><span class="fg-menu-icon">${icon('play')}</span><span class="fg-menu-label">PLAY GAME</span></button>
        <button class="fg-menu-button fg-menu-settings" data-action="title-settings" data-ref="titleSettingsButton"><span class="fg-menu-icon">${icon('settings')}</span><span class="fg-menu-label">SETTINGS</span></button>
      </div>
      <section class="fg-title-settings" data-ref="titleSettings" aria-labelledby="fg-title-settings-heading" hidden>
        <header class="fg-menu-settings-head"><h2 id="fg-title-settings-heading">SETTINGS</h2><button class="fg-menu-settings-back" data-action="title-settings-back" data-ref="titleSettingsBack" aria-label="Back to main menu">${icon('close')}</button></header>
        <div class="fg-settings"><label>Graphics<select data-setting="quality" data-ref="titleQuality"><option value="high">High</option><option value="medium">Balanced</option><option value="low">Performance</option></select></label><label>Volume <output data-ref="titleVolumeOutput">65%</output><input type="range" min="0" max="100" value="65" data-setting="volume"></label><label>Mouse sensitivity <output data-ref="titleSensitivityOutput">1.0×</output><input type="range" min="30" max="200" value="100" data-setting="sensitivity"></label><label>Μέγεθος πληροφοριών <output data-ref="titleUIScaleOutput">100%</output><input type="range" min="85" max="140" step="5" value="100" data-setting="uiScale" aria-label="Μέγεθος πληροφοριών"></label></div>
        <button class="fg-menu-reset" data-action="title-new-confirm" data-ref="titleNewGame" hidden>New game</button>
        <div class="fg-title-reset-confirm" data-ref="titleRestartConfirm" hidden><p>Start a new game? This replaces your saved game.</p><div><button class="fg-button fg-danger" data-action="title-new-game">Start new game</button><button class="fg-button" data-action="title-new-cancel" data-ref="titleRestartCancel">Cancel</button></div></div>
      </section>
    </section>
    <section class="fg-pause-dock" data-ref="pause" aria-label="Πάνελ παύσης" hidden><div class="fg-panel fg-pause-panel" data-ref="pausePanel"><header class="fg-pause-heading"><span class="fg-pause-symbol" aria-hidden="true">Ⅱ</span><div><span class="fg-eyebrow">FROG · CREEK DOMINION</span><h2>Σε παύση</h2><small>Ο κόσμος και ο ήχος έχουν σταματήσει</small></div><button class="fg-icon-button fg-panel-expander" data-action="pause-collapse" data-ref="pauseToggle" aria-expanded="true" aria-controls="fg-pause-body" aria-label="Σύμπτυξη παύσης" title="Σύμπτυξη πάνελ">${icon('arrow')}</button><button class="fg-icon-button" data-action="resume" aria-label="Συνέχεια παιχνιδιού" title="Συνέχεια · Esc">${icon('close')}</button></header><div id="fg-pause-body" class="fg-pause-body" data-ref="pauseBody"><div class="fg-pause-summary"><span><small>Αρχηγός</small><b data-ref="pauseRank">Ευγενής</b></span><span><small>Σύμμαχοι</small><b data-ref="pauseAllies">0</b></span><span><small>Ημέρα</small><b data-ref="pauseDay">1</b></span></div><button class="fg-button fg-primary fg-pause-resume" data-action="resume"><span>Συνέχισε το ταξίδι</span>${key('ESC')}${icon('arrow')}</button><div class="fg-pause-quick-actions"><button class="fg-button" data-action="save">${icon('check')} Αποθήκευση</button><button class="fg-button" data-action="pause-help">${icon('leaf')} Οδηγός</button></div><details class="fg-pause-settings" open><summary><span>Ρυθμίσεις παιχνιδιού</span>${icon('arrow')}</summary><div class="fg-settings"><label>Γραφικά<select data-setting="quality"><option value="high">Υψηλή ποιότητα</option><option value="medium">Ισορροπημένα</option><option value="low">Υψηλή απόδοση</option></select><small class="fg-performance" title="Τελευταία μέτρηση κατά τη διάρκεια του παιχνιδιού"><output data-ref="fpsValue">—</output> FPS στο παιχνίδι</small></label><label>Ένταση μετά τη συνέχεια <output data-ref="volumeOutput">65%</output><input type="range" min="0" max="100" value="65" data-setting="volume"></label><label>Ευαισθησία ποντικιού <output data-ref="sensitivityOutput">1.0×</output><input type="range" min="30" max="200" value="100" data-setting="sensitivity"></label><label>Μέγεθος πληροφοριών <output data-ref="uiScaleOutput">100%</output><input type="range" min="85" max="140" step="5" value="100" data-setting="uiScale" aria-label="Μέγεθος πληροφοριών"></label></div></details><footer class="fg-pause-footer"><button class="fg-text-button" data-action="restart-confirm">Νέο παιχνίδι · Μόνος</button><span>Η αποθήκευση διατηρεί το ταξίδι σου στη συσκευή</span></footer><div data-ref="restartConfirm" class="fg-confirm" hidden><p>Το νέο παιχνίδι ξεκινά με έναν βάτραχο και αντικαθιστά την τρέχουσα αποθήκευση.</p><button class="fg-button fg-danger" data-action="restart">Ξεκίνα μόνος</button><button class="fg-button" data-action="restart-cancel">Επιστροφή</button></div></div></div></section>
    <section class="fg-live-panel-layer" data-ref="panelLayer" hidden><div class="fg-panel fg-game-panel" data-ref="panel"></div></section>
    <section class="fg-ending-dock" data-ref="ending" hidden><div class="fg-panel fg-ending-panel"><span class="fg-ending-mark" data-ref="endingMark">${icon('crown')}</span><span class="fg-eyebrow" data-ref="endingEyebrow">Ο ΠΟΤΑΜΟΣ ΕΝΩΘΗΚΕ</span><h2 data-ref="endingTitle">Κυρίαρχος του ποταμού</h2><p data-ref="endingText"></p><div class="fg-ending-stats" data-ref="endingStats"></div><div class="fg-pause-actions"><button class="fg-button fg-primary" data-action="continue-after-end" data-ref="endingContinue">Συνέχισε την εξερεύνηση</button><button class="fg-button" data-action="restart">Νέο ταξίδι</button></div></div></section>`;}

  click(event){
    const guideTarget=event.target.closest('[data-guide-open]');if(guideTarget?.dataset?.guideOpen){event.stopPropagation();const id=guideTarget.dataset.guideOpen==='kick'&&guideTarget.classList?.contains('fg-action-help')?['kick','slam','sweep'][this.specialIndex||0]:guideTarget.dataset.guideOpen;this.showGuideCard(id);return;}
    const target=event.target.closest('[data-action]'); if(!target || target.disabled) return;
    const action=target.dataset.action;
    event.stopPropagation();
    if(action==='panel-collapse'){this.setPanelExpanded(!this.panelExpanded);return;}
    if(action==='pause-collapse'){this.setPauseExpanded(!this.pauseExpanded);return;}
    if(action==='concept-toggle'){this.toggleConceptPanels();return;}
    if(action==='construction-expand'){this.constructionExpanded=!this.constructionExpanded;this.updateConstructionHUD(this.state);this.layoutDockedPanels();return;}
    if(action==='guide-close'){this.closeGuideCard();return;}
    if(action==='open-guide'){this.openGuideLibrary();return;}
    if(action==='guide-category'){this.guideCategory=target.dataset.category||'all';this.renderPanel(true);return;}
    if(action==='guide-library'){this.guideBackToBook=false;this.showPanel('help');return;}
    if(action==='guide-hint-close'){this.toggleConceptPanels(false);return;}
    if(action==='tutorial-dismiss'){this.callbacks.onAction('tutorial-dismiss',{});return;}
    if(action==='tutorial-details'){this.tutorialDetailsOpen=!this.tutorialDetailsOpen;this.tutorialSignature=null;this.updateRealmHUD(this.state);this.layoutDockedPanels();return;}
    if(action==='open-realm'){this.callbacks.onAction('panel-open',{name:'realm'});return;}
    if(action==='realm-travel'){this.callbacks.onAction('realm-travel',{targetIndex:Number(target.dataset.region)});return;}
    if(action==='recruit-inspect'){this.callbacks.onAction('recruit-inspect',{});return;}
    if(action==='recruit-target'||action==='recruit-help'||action==='recruit-close'){this.callbacks.onAction(action,{id:target.dataset.id||this.recruitmentTargetId});return;}
    if(action==='camp-specialization'){this.callbacks.onAction(action,{campId:target.dataset.camp,specialization:target.dataset.specialization});return;}
    if(action==='craft-equipment'){this.callbacks.onAction(action,{campId:target.dataset.camp,recipeId:target.dataset.recipe,targetIds:this.state.realmEconomy?.craftTargetIds||[]});return;}
    if(action==='cancel-job'){this.callbacks.onAction(action,{jobId:target.dataset.job});return;}
    if(action==='save-group'||action==='select-group'){this.callbacks.onAction(action,{groupId:target.dataset.group});return;}
    if(action==='group-command'){this.callbacks.onAction(action,{groupId:target.dataset.group,command:target.dataset.command});return;}
    if(action==='build-scroll'){this.scrollBuildCatalog(Number(target.dataset.direction)||1);return;}
    if(action==='hud-objectives'){this.toggleHudDisclosure('objectives');return;}
    if(action==='hud-more'){this.toggleHudDisclosure('actions');return;}
    if(action==='hud-close'){this.closeHudDisclosure(true);return;}
    this.closeHudDisclosure();
    if(action==='build-view'){const view=['defense','organization','workshop'].includes(target.dataset.view)?target.dataset.view:'catalog';if(view!==this.buildView)this.resetPanelScroll();this.buildView=view;this.renderPanel(true);return;}
    if(action==='defense-open'){this.openDefenses(target.dataset.camp);return;}
    if(action==='garrison-command'){this.callbacks.onAction('garrison-command',{campId:target.dataset.camp,command:target.dataset.command});this.renderPanel(true);return;}
    if(action==='defense-frog'){this.callbacks.onAction('select-frog',{id:target.dataset.id,additive:false});this.showPanel('roster');return;}
    if(action==='build'&&performance.now()<(this.dragClickUntil||0))return;
    if(action==='rotate-placement'){target.blur?.();this.callbacks.onAction('rotate-placement',{direction:Number(target.dataset.direction)||1});return;}
    if(action==='confirm-placement'||action==='cancel-placement'){target.blur?.();this.callbacks.onAction(action,{});return;}
    if(action==='title-settings'){this.showTitleSettings();return;}
    if(action==='title-settings-back'){this.closeTitleSettings();return;}
    if(action==='title-new-confirm'){
      if(this.menu!=='title'||!this.titleSettingsOpen||!this.hasSave)return;
      this.refs.titleRestartConfirm.hidden=false;this.refs.titleNewGame.hidden=true;this.refs.titleRestartCancel.focus?.({preventScroll:true});return;
    }
    if(action==='title-new-cancel'){
      this.refs.titleRestartConfirm.hidden=true;this.refs.titleNewGame.hidden=!this.hasSave;this.refs.titleNewGame.focus?.({preventScroll:true});return;
    }
    if(action==='title-new-game'){
      if(this.menu!=='title'||!this.titleSettingsOpen||this.refs.titleRestartConfirm.hidden)return;
      this.startFromTitle('new');return;
    }
    if(action==='new-game'||action==='continue'){
      this.startFromTitle(action==='continue'?'continue':'play');return;
    }
    if(action==='close-panel'&&(this.menu==='pause'||this.state.paused)){this.closePanels();this.showPause(true);return;}
    if(action==='resume'||action==='close-panel'||action==='continue-after-end'){
      this.hideMenus(); this.callbacks.onResume(); return;
    }
    if(action==='open-pause'){this.showPause(true);this.callbacks.onAction('pause',{});return;}
    if(action==='locate-shelter'){
      if(!this.creekHomeNest())return;
      this.mapFocus='nest';
      if(this.panel==='map')this.renderPanel(true);else this.callbacks.onAction('panel-open',{name:'map'});
      return;
    }
    if(action==='map-overview'){this.mapFocus=null;this.renderPanel(true);return;}
    if(action==='open-exploration'||action==='open-build'){this.callbacks.onAction('panel-open',{name:this.state.creek?.enabled?'exploration':'build'});return;}
    if(action==='open-roster'){this.callbacks.onAction('panel-open',{name:'roster'});return;}
    if(action==='open-map'){this.mapFocus=null;this.callbacks.onAction('panel-open',{name:'map'});return;}
    if(action==='special-select'){this.callbacks.onAction('special-select',{index:Number(target.dataset.index)});return;}
    if(action==='select-frog'){this.callbacks.onAction('select-frog',{id:target.dataset.id,additive:Boolean(event.shiftKey||event.ctrlKey||event.metaKey)});if(this.panel==='roster')this.renderPanel(true);return;}
    if(action==='select-all'){this.callbacks.onAction('select-all',{filter:target.dataset.filter||'all'});this.renderPanel(true);return;}
    if(action==='roster-filter'){this.rosterFilter=target.dataset.filter||'all';this.renderPanel(true);return;}
    if(action==='gang-command'){this.callbacks.onAction('gang-command',{command:target.dataset.command});return;}
    if(action==='selection-command'){this.callbacks.onAction('selection-command',{command:target.dataset.command,ids:Array.from(this.chosen())});return;}
    if(action==='gang-forage'){this.callbacks.onAction('gang-command',{command:'forage'});return;}
    if(action==='title-help'||action==='pause-help'){
      this.returnMenu=action==='title-help'?'title':'pause';this.openGuideLibrary();return;
    }
    if(action==='help-back'){
      if(this.guideReturn){this.closeGuideCard();return;}
      this.closePanels(); if(this.returnMenu==='title')this.showTitle(this.hasSave);else this.showPause(true);return;
    }
    if(action==='tab-roster'||action==='tab-map'){this.mapFocus=null;this.showPanel(action==='tab-map'?'map':'roster');return;}
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
    const guideSearch=event.target.closest('[data-guide-search]');if(guideSearch?.dataset?.guideSearch!==undefined){this.guideQuery=guideSearch.value;const position=guideSearch.selectionStart;this.renderPanel(true);const replacement=$(this.refs.panel,'[data-guide-search]');replacement?.focus({preventScroll:true});replacement?.setSelectionRange?.(position,position);return;}
    const campSelect=event.target.closest('[data-defense-camp]');
    if(campSelect){this.defenseCampId=campSelect.value;this.renderPanel(true);return;}
    const input=event.target.closest('[data-setting]');if(!input)return;
    const field=input.dataset.setting;
    this.settings[field]=field==='quality'?input.value:Number(input.value)/100;
    this.setSettings();
    this.callbacks.onSettings({...this.settings});
  }
  setSettings(settings={}){
    Object.assign(this.settings,settings);
    this.settings.uiScale=normalizeUIScale(this.settings.uiScale);
    this.root.style.setProperty('--fg-ui-scale',String(this.settings.uiScale));
    for(const input of $$(this.root,'[data-setting]')){
      const field=input.dataset.setting;input.value=field==='quality'?this.settings[field]:this.settings[field]*100;
    }
    for(const ref of ['volumeOutput','titleVolumeOutput'])if(this.refs[ref])this.refs[ref].textContent=`${whole(this.settings.volume*100)}%`;
    for(const ref of ['sensitivityOutput','titleSensitivityOutput'])if(this.refs[ref])this.refs[ref].textContent=`${this.settings.sensitivity.toFixed(1)}×`;
    for(const ref of ['uiScaleOutput','titleUIScaleOutput'])if(this.refs[ref])this.refs[ref].textContent=`${whole(this.settings.uiScale*100)}%`;
    this.recruitmentSignature=null;
    if(this.recruitmentBubbleOpen)this.renderRecruitmentBubble();
    this.layoutDockedPanels();
  }
  setLoading(text,progress){
    this.refs.loading.hidden=false;this.refs.loadingText.textContent=text;
    if(progress!==undefined)this.refs.loading.style.setProperty('--progress',`${clamp(progress)*100}%`);
  }
  showTitle(hasSave=false){
    const refreshing=this.menu==='title'&&!this.refs.title.hidden;
    const focused=typeof document!=='undefined'?document.activeElement:null;
    this.hasSave=Boolean(hasSave);
    this.refs.continueButton.hidden=!hasSave;
    this.refs.newButton.hidden=Boolean(hasSave);
    this.refs.titleNewGame.hidden=!hasSave||!this.refs.titleRestartConfirm.hidden;
    // Persistent save discovery only refreshes the choices. It must not dismiss
    // Settings or uncover the menu over a pending start request.
    if(refreshing){
      if(!this.titleSettingsOpen&&[this.refs.newButton,this.refs.continueButton].includes(focused))(hasSave?this.refs.continueButton:this.refs.newButton).focus?.({preventScroll:true});
      return;
    }
    if(this.titleStartPending)return;
    this.hideMenus();this.menu='title';
    this.refs.loading.hidden=true;this.refs.title.hidden=false;this.refs.hud.hidden=true;
    this.closeRecruitmentBubble();this.syncConceptVisibility();
    (hasSave?this.refs.continueButton:this.refs.newButton).focus?.({preventScroll:true});
  }
  startFromTitle(mode){
    this.hideMenus();this.titleStartPending=true;this.setLoading('Loading…');
    this.callbacks.onStart(mode);
  }
  showTitleSettings(){
    if(this.menu!=='title')return;
    this.titleSettingsOpen=true;this.refs.titleActions.hidden=true;this.refs.titleSettings.hidden=false;
    this.refs.titleRestartConfirm.hidden=true;this.refs.titleNewGame.hidden=!this.hasSave;
    this.setSettings();this.refs.titleQuality.focus?.({preventScroll:true});
  }
  closeTitleSettings(){
    if(this.menu!=='title')return;
    this.titleSettingsOpen=false;this.refs.titleSettings.hidden=true;this.refs.titleActions.hidden=false;
    this.refs.titleRestartConfirm.hidden=true;this.refs.titleNewGame.hidden=!this.hasSave;
    this.refs.titleSettingsButton.focus?.({preventScroll:true});
  }
  showPause(paused=true){
    if(paused)this.closeHudDisclosure();
    if(!paused){this.refs.pause.hidden=true;if(this.menu==='pause')this.menu=null;this.layoutDockedPanels();return;}
    this.closePanels();this.guideReturn=null;this.guideBackToBook=false;this.menu='pause';this.refs.pause.hidden=false;this.refs.restartConfirm.hidden=true;
    this.setPauseExpanded(true);
    this.setText('pauseRank',this.state.creek?.enabled?'Εξερευνητής':this.state.player?.rank?.title||'Ευγενής');this.setText('pauseAllies',(this.state.allies||[]).length);this.setText('pauseDay',this.state.day||1);
    this.setText('fpsValue',Number.isFinite(this.state.fps)?whole(this.state.fps):'—');
    document.exitPointerLock?.();
    if(this.refs.recruitmentBubble)this.refs.recruitmentBubble.hidden=true;
    this.layoutDockedPanels();
  }
  hideMenus(){
    this.closeHudDisclosure();
    for(const name of ['title','pause','ending','panelLayer','loading'])this.refs[name].hidden=true;
    this.titleStartPending=false;this.titleSettingsOpen=false;
    if(this.refs.titleSettings)this.refs.titleSettings.hidden=true;
    if(this.refs.titleActions)this.refs.titleActions.hidden=false;
    if(this.refs.titleRestartConfirm)this.refs.titleRestartConfirm.hidden=true;
    this.panel=null;this.menu=null;this.guideReturn=null;this.guideBackToBook=false;
    this.root.classList.remove('fg-game-panel-open');
    this.syncConceptVisibility();this.layoutDockedPanels();
  }
  isBlocking(){return Boolean(this.menu);}
  closePanels(){this.panel=null;this.mapFocus=null;this.refs.panelLayer.hidden=true;this.root.classList.remove('fg-game-panel-open');this.syncConceptVisibility();this.layoutDockedPanels();}
  resetPanelScroll(){this.refs.panel.scrollTop=0;const body=$(this.refs.panel,'.fg-live-panel-body');if(body)body.scrollTop=0;}
  setPanelExpanded(expanded){
    this.panelExpanded=Boolean(expanded);this.refs.panel.classList.toggle('is-collapsed',!this.panelExpanded);
    const toggle=$(this.refs.panel,'[data-action="panel-collapse"]');toggle?.setAttribute?.('aria-expanded',String(this.panelExpanded));toggle?.setAttribute?.('aria-label',this.panelExpanded?'Σύμπτυξη πάνελ':'Ανάπτυξη πάνελ');
    const body=$(this.refs.panel,'.fg-live-panel-body');if(body)body.hidden=!this.panelExpanded;
    this.refs.panelLayer.classList.toggle('is-collapsed',!this.panelExpanded);
    if(this.panelExpanded&&this.narrowPanelViewport()&&this.conceptPanelsOpen&&!['guide','help'].includes(this.panel))this.setConceptPanelsOpen(false);
    this.layoutDockedPanels();
  }
  setPauseExpanded(expanded){
    this.pauseExpanded=Boolean(expanded);this.refs.pausePanel?.classList.toggle('is-collapsed',!this.pauseExpanded);
    if(this.refs.pauseBody)this.refs.pauseBody.hidden=!this.pauseExpanded;
    this.refs.pauseToggle?.setAttribute?.('aria-expanded',String(this.pauseExpanded));this.refs.pauseToggle?.setAttribute?.('aria-label',this.pauseExpanded?'Σύμπτυξη παύσης':'Ανάπτυξη παύσης');
    if(this.pauseExpanded&&this.narrowPanelViewport()&&this.conceptPanelsOpen)this.setConceptPanelsOpen(false);
    this.layoutDockedPanels();
  }
  togglePanel(name,data){if(this.panel===name)this.closePanels();else this.showPanel(name,data);}
  showPanel(name,data){
    this.closeHudDisclosure();
    if(this.state.creek?.enabled&&name==='build')name='exploration';
    if(name!=='map')this.mapFocus=null;
    this.panel=name;this.panelData=data||{};
    this.panelExpanded=true;this.root.classList.add('fg-game-panel-open');
    if(this.narrowPanelViewport()&&this.conceptPanelsOpen&&!['guide','help'].includes(name))this.setConceptPanelsOpen(false);
    if(name==='build'){this.buildView=['defense','organization','workshop'].includes(data?.view)?data.view:'catalog';this.defenseCampId=data?.campId||this.state.currentCampId||this.defenseCampId;}
    this.refs.pause.hidden=true;
    this.refs.panelLayer.hidden=false;
    this.refs.panel.setAttribute?.('role','region');this.refs.panel.setAttribute?.('aria-modal','false');
    this.refs.panelLayer.classList.toggle('is-guide',['guide','help'].includes(name));
    document.exitPointerLock?.();
    this.resetPanelScroll();
    this.renderPanel(true);
    this.layoutDockedPanels();
  }
  layoutDockedPanels(){
    this.syncConceptVisibility();
    this.hudLayout=refreshHUDLayout(this);
    if(this.recruitmentAnchor)this.updateRecruitmentAnchor(this.recruitmentAnchor);
  }
  showRecruitmentBubble(recruitment){
    const id=recruitment?.targetId??recruitment?.id;if(id==null)return false;
    this.closeHudDisclosure();
    if(String(id)!==this.recruitmentTargetId){this.recruitmentSignature=null;this.recruitmentAnchor=null;}
    this.recruitmentTargetId=String(id);this.recruitmentBubbleOpen=true;
    this.root.classList.add('fg-recruitment-open');
    if(this.refs.recruitPrompt)this.refs.recruitPrompt.hidden=true;
    this.renderRecruitmentBubble(recruitment);
    if(!this.recruitmentAnchor)this.refs.recruitmentBubble.hidden=true;
    return true;
  }
  closeRecruitmentBubble(){
    this.recruitmentBubbleOpen=false;this.recruitmentTargetId=null;this.recruitmentAnchor=null;this.recruitmentSignature=null;
    if(this.refs.recruitmentBubble)this.refs.recruitmentBubble.hidden=true;
    this.root.classList.remove('fg-recruitment-open');
  }
  renderRecruitmentBubble(recruitment=this.state.recruitment){
    if(!this.recruitmentBubbleOpen||!this.refs.recruitmentBubble)return false;
    const r=recruitment,bubble=this.refs.recruitmentBubble;
    if(!r||String(r.targetId??r.id)!==this.recruitmentTargetId){bubble.hidden=true;return false;}
    const signature=JSON.stringify([r.targetId??r.id,r.name,r.level,r.requirements,r.cost,r.canRecruit,r.helpAvailable,r.helpAccepted,r.quest?.kind,r.reason,Boolean(this.state.paused)]);
    if(signature!==this.recruitmentSignature){
      const active=typeof document!=='undefined'?document.activeElement:null,restore=bubble.contains?.(active)?active?.dataset?.action:null;
      bubble.innerHTML=recruitmentCardMarkup(r,Boolean(this.state.paused));
      const pending=(r.requirements||[]).filter(q=>q.id!=='food'&&!q.done&&!q.waived).length;
      const preferred=(pending>1?300:pending||!r.canRecruit?270:240)*normalizeUIScale(this.settings?.uiScale);
      this.recruitmentBadgeWidth=Math.min(preferred,Math.max(100,(globalThis.innerWidth||preferred+20)-20));
      bubble.style.width=`${this.recruitmentBadgeWidth}px`;
      bubble.setAttribute?.('aria-label',`${this.state.creek?.enabled?'Τροφή και συνθήκες για να σε ακολουθήσει':'Απαιτήσεις στρατολόγησης'} · ${r.name||'Βάτραχος'}`);
      this.recruitmentSignature=signature;
      if(restore){const button=$(bubble,`[data-action="${restore}"]`),next=button&&!button.disabled?button:$(bubble,'button:not(:disabled)');next?.focus?.({preventScroll:true});}
    }
    if(this.recruitmentAnchor)this.updateRecruitmentAnchor(this.recruitmentAnchor);
    return true;
  }
  updateRecruitmentAnchor(anchor){
    if(!this.recruitmentBubbleOpen||!this.refs.recruitmentBubble)return false;
    if(anchor?.targetId!=null&&String(anchor.targetId)!==this.recruitmentTargetId)return false;
    this.recruitmentAnchor=anchor;const bubble=this.refs.recruitmentBubble;
    if(!anchor?.visible||this.menu||this.state.paused||this.state.buildPlacement?.active){bubble.hidden=true;return false;}
    const width=anchor.width||globalThis.innerWidth||this.hudLayout?.viewport?.width,height=anchor.height||globalThis.innerHeight||this.hudLayout?.viewport?.height;
    bubble.hidden=false;
    const wantedWidth=Math.min(this.recruitmentBadgeWidth||240,Math.max(100,width-20));bubble.style.width=`${wantedWidth}px`;
    const bounds=bubble.getBoundingClientRect?.(),badgeWidth=Math.ceil(bounds?.width||wantedWidth),badgeHeight=Math.ceil(bounds?.height||bubble.scrollHeight||64);
    const placement=placeRecruitmentCard({anchor,viewport:{width,height},size:{width:badgeWidth,height:badgeHeight},occupied:this.hudLayout?.reservedRects||[]});
    bubble.hidden=!placement.visible;if(!placement.visible)return false;
    Object.assign(bubble.style,{left:`${placement.left}px`,top:`${placement.top}px`,width:`${placement.width}px`,maxHeight:'none'});
    bubble.dataset.side=placement.side;return true;
  }
  setPortraits(portraits){
    Object.assign(this.portraits,portraits);
    if(this.portraits.frog){this.refs.playerPortrait.src=this.portraits.frog;this.refs.playerPortrait.hidden=false;this.refs.playerBadge.hidden=true;}
    this.activePortrait=null;
  }
  updateCreekPresentation(state=this.state){
    const enabled=Boolean(state.creek?.enabled),p=state.player||{};
    this.root.classList.toggle('fg-creek-mode',enabled);
    this.root.classList.toggle('fg-in-cover',enabled&&Boolean(p.hiddenInCover));
    if(this.refs.breath){
      this.refs.breath.hidden=!enabled||!p.diving;
      this.refs.breath.classList.toggle('is-low',Number(p.breath)<25);
      if(this.refs.breathBar)this.refs.breathBar.value=clamp(p.breath,0,100);
      this.setText('breathValue',`${whole(p.breath)}%`);
    }
    if(this.lastCreekEnabled===enabled)return;this.lastCreekEnabled=enabled;
    const tile=$(this.root,'[data-action="open-build"],[data-action="open-exploration"]');
    if(tile){
      tile.dataset.action=enabled?'open-exploration':'open-build';
      tile.title=enabled?'Ανακαλύψεις και μόνιμες ικανότητες · V':'Κατασκευές · V';
      tile.setAttribute('aria-label',tile.title);
      const art=$(tile,'.fg-action-art'),caption=$(tile,'.fg-action-caption');
      if(art)art.innerHTML=pictogram(enabled?'leaf':'camp');
      if(caption)caption.innerHTML=captionMarkup(enabled?'Ανακαλύψεις':'Χτίσε');
      const help=tile.closest?.('.fg-action-slot')?.querySelector?.('[data-guide-open]');
      if(help){help.dataset.guideOpen=enabled?'exploration':'build';help.setAttribute('aria-label',enabled?'Οδηγός εξερεύνησης':'Οδηγός κατασκευής');}
    }
    const croak=$(this.root,'[data-action="intimidate"]');
    if(croak){
      croak.title=enabled?'Κόασμα · R':'Εκφοβισμός · R';croak.setAttribute('aria-label',croak.title);
      const caption=$(croak,'.fg-action-caption');if(caption)caption.innerHTML=captionMarkup(enabled?'Κόασμα':'Εκφόβισε');
    }
    for(const [guide,label] of [['food',enabled?'Οδηγία για τροφή στην εξόρμηση':'Οδηγία για τροφή και συντήρηση'],['interact',enabled?'Οδηγία: βάτραχοι, τροφή και φυσικά ευρήματα':'Οδηγία: βάτραχοι, τροφή και οχυρά'],['intimidate',enabled?'Οδηγία: κόασμα':'Οδηγία: εκφοβισμός'],['recruit',enabled?'Πώς με ακολουθεί ένας βάτραχος;':'Πώς στρατολογώ;']]){
      for(const help of $$(this.root,`[data-guide-open="${guide}"]`))help.setAttribute('aria-label',label);
    }
    for(const [ref,label,description] of [
      ['reeds',enabled?'Ευρήματα':'Υλικά',enabled?'Φυσικά ευρήματα της εξόρμησης':'Υλικά κατασκευής'],
      ['pearls',enabled?'Ενθύμια':'Πέρλες',enabled?'Σημαντικά ενθύμια που κρατάς':'Σπάνια μαργαριτάρια']
    ]){
      const parent=this.refs[ref]?.parentElement;if(!parent)continue;
      parent.title=description;parent.setAttribute?.('aria-label',description);
      const small=parent.querySelector?.('small');if(small)small.textContent=label;
      const guide=parent.querySelector?.('[data-guide-open]');if(guide){guide.dataset.guideOpen=enabled?'finds':ref==='reeds'?'materials':'pearls';guide.setAttribute('aria-label',description);}
    }
    const conquest=$(this.root,'.fg-conquest-label');if(conquest)conquest.textContent=enabled?'Γνώριμα σημεία':'Συμμορίες';
    const location=$(this.root,'.fg-location-tools>strong');if(location)location.textContent=enabled?'Ρυάκι':'Λίμνη';
    const locationPanel=$(this.root,'.fg-location');locationPanel?.setAttribute?.('aria-label',enabled?'Ευρήματα και χάρτης ρυακιού':'Πόροι και χάρτης λίμνης');
    this.refs.minimap?.setAttribute?.('aria-label',enabled?'Θέσεις βατράχων, καταφυγίου, φυσικών περιοχών, θηρευτών και χαμένων ευρημάτων':'Θέσεις συμμάχων, αντιπάλων, οχυρών και αρχηγών');
    this.refs.mapBosses?.setAttribute?.('aria-label',enabled?'Μεγάλοι θηρευτές':'Ενεργοί αρχηγοί');
    this.refs.recruitmentBubble?.setAttribute?.('aria-label',enabled?'Τροφή και συνθήκες για να σε ακολουθήσει ο βάτραχος':'Απαιτήσεις στρατολόγησης');
    const legend=$(this.root,'.fg-minimap-legend');if(legend)legend.innerHTML=enabled?`<span><i class="is-ally"></i>Εσύ / ομάδα</span><span><i class="is-pact"></i>Συνύπαρξη</span><span><i class="is-enemy"></i>Αντίπαλοι</span><span>${pictogram('leaf')}Καταφύγιο</span>`:`<span><i class="is-ally"></i>Εσύ / ομάδα</span><span><i class="is-enemy"></i>Αντίπαλοι</span><span>${pictogram('crown')}Αρχηγοί</span>`;
    this.refs.objectiveBox?.setAttribute?.('aria-label',enabled?'Ενδείξεις εξερεύνησης':'Στόχοι εκστρατείας');
    this.refs.objectiveToggle?.setAttribute?.('aria-label',enabled?'Ενδείξεις εξερεύνησης · O':'Στόχοι εκστρατείας · O');
    if(enabled&&this.panel==='build'){this.panel='exploration';this.renderPanel(true);}
  }
  update(state={}){
    this.state=state;this.updatePlacement(state.buildPlacement);
    this.updateCreekPresentation(state);
    const p=state.player||{},allies=state.allies||[],selected=this.chosen();
    this.meter('hpBar',fraction(p.hp,p.maxHp));this.meter('staminaBar',fraction(p.stamina,p.maxStamina));
    this.meter('stomachBar',fraction(p.stomach,p.maxStomach));this.meter('xpBar',fraction(p.xp,p.nextXp));
    this.setText('hpLabel',whole(p.hp));this.setText('staminaLabel',whole(p.stamina));
    this.setText('stomachLabel',`${whole(fraction(p.stomach,p.maxStomach)*100)}%`);
    this.setText('level',p.level||1);this.setText('tier',['','I','II','III','IV','V'][p.tier||1]||p.tier);
    const creek=state.creek?.enabled,rank=creek?{crowned:false,title:'Εξερευνητής',detail:'Παρατήρησε το ρυάκι και βρες νέους τρόπους να κινηθείς.'}:p.rank||{crowned:!!p.crowned,title:p.crowned?'Βασιλιάς':'Ευγενής',territories:0,target:3};
    const refuge=creek?creekRefugeStatus(state.creek.shelter):null;
    this.root.classList.toggle('fg-refuge-status',Boolean(refuge));this.root.classList.toggle('fg-refuge-covered',Boolean(refuge?.covered));
    this.root.classList.toggle('fg-refuge-threat',Boolean(refuge?.warning));
    this.setText('rankTitle',refuge?.label||(creek&&p.hiddenInCover?'Σε κάλυψη':rank.title));this.setText('rankProgress',creek?`${whole(state.creek.discoveryCount)} σημεία`:rank.crowned?'Στέφθηκες':`Στέψη ${Math.min(rank.territories,rank.target)}/${rank.target}`);
    if(this.refs.playerRank){this.refs.playerRank.title=refuge?.detail||rank.detail||'Κράτησε τρία αντίπαλα οχυρά για το στέμμα.';this.refs.playerRank.classList.toggle('is-crowned',rank.crowned);}
    if(this.lastCrowned!==rank.crowned&&this.refs.rankIcon){this.refs.rankIcon.innerHTML=icon(rank.crowned?'crown':'shield');this.lastCrowned=rank.crowned;}
    this.updatePopulation(state);
    this.updateMapLegend(state.world||{});
    this.root.classList.toggle('fg-low-health',fraction(p.hp,p.maxHp)<.25);
    this.root.classList.toggle('fg-low-hunger',fraction(p.stomach,p.maxStomach)<.15);
    const r=this.resources(state.resources);this.setText('food',available(creek?state.creek.inventory?.food??r.food:r.food));this.setText('reeds',available(creek?state.creek.inventory?.finds:r.reeds));
    for(const name of ['food','reeds'])this.refs[name].parentElement.classList.toggle('is-large-value',String(available(name==='reeds'&&creek?state.creek.inventory?.finds:r[name])).length>5);
    this.setText('clock',state.timeLabel||'09:00');this.setText('day',state.day||1);
    const night=Boolean(state.night);if(night!==this.lastNight){this.refs.dayIcon.innerHTML=icon(night?'moon':'sun');this.lastNight=night;}
    this.refs.crosshair.hidden=this.isBlocking()||state.viewMode==='topdown';this.root.classList.toggle('fg-aiming',Boolean(state.aiming));
    const camps=state.camps||[],obj=state.objectiveVisual||{};
    const targets=obj.targets||camps.filter(c=>c.originalTeam?.startsWith('enemy')||String(c.team).startsWith('enemy')).slice(0,5).map(c=>({...c,done:c.destroyed||['ally','player','friendly'].includes(c.team)}));
    const normalized=creek?(state.creek.discoveries||[]).map(d=>({...d,name:d.label,done:d.found})):targets.length?targets:Array.from({length:5},(_,i)=>({id:i,team:'enemy'+i,done:false}));
    const current=creek?state.creek.discoveryCount:obj.current??normalized.filter(t=>t.done).length,total=creek?state.creek.totalLandmarks||4:obj.total||5;
    const territorySignature=JSON.stringify(normalized.map(t=>[t.id,t.team,t.originalTeam,t.done]));
    if(territorySignature!==this.territorySignature){
      this.territorySignature=territorySignature;
      this.refs.territories.innerHTML=normalized.map((t,i)=>`<span class="fg-territory${t.done?' is-conquered':''}" title="${esc(t.name||`Συμμορία ${i+1}`)}">${creek?pictogram(t.done?'leaf':'eye'):gangEmblem(t.originalTeam||(''+t.team).startsWith('enemy')&&t.team||'enemy'+i)}${t.done?`<i>${pictogram('check')}</i>`:''}</span>`).join('');
    }
    this.meter('objectiveMeter',obj.progress??current/total);this.setText('objectiveProgress',`${whole(current)} / ${whole(total)}`);
    const campaign=state.campaign||{},goals=campaign.objectives||[];
    const nextGoal=goals.find(g=>!g.done)||goals.at(-1),summaryArt=nextGoal?.icon||'crown';
    if(summaryArt!==this.summaryArt){this.summaryArt=summaryArt;this.refs.objectiveNext.innerHTML=pictogram(summaryArt);}
    this.setText('objectiveSummary',nextGoal?`${Math.min(whole(nextGoal.target),['fly','food','reeds','materials'].includes(nextGoal.icon)?available(nextGoal.current):whole(nextGoal.current))} / ${whole(nextGoal.target)}`:`${whole(current)} / ${whole(total)}`);
    this.meter('objectiveMeter',nextGoal?clamp(nextGoal.progress??nextGoal.current/nextGoal.target):obj.progress??current/total);
    const objectiveGuide=describeObjective(nextGoal);this.setText('objectiveTitle',objectiveGuide.title);this.setText('objectiveHint',objectiveGuide.hint);
    const goalSignature=JSON.stringify(goals.map(g=>[g.id,g.icon,g.current,g.target,g.progress,g.done]));
    if(goalSignature!==this.goalSignature){
      this.goalSignature=goalSignature;this.refs.campaignObjectives.hidden=!goals.length;this.refs.campaignObjectives.classList.toggle('has-many',goals.length>6);
      this.refs.campaignObjectives.innerHTML=goals.map(g=>{
        const count=Math.min(whole(g.target),['food','fly','reeds','materials'].includes(g.icon)?available(g.current):whole(g.current));
        return `<div class="fg-campaign-goal${g.done?' is-done':''}" title="${esc(this.presentationText(g.title||g.label||g.id))}"><span>${pictogram(g.icon||(creek?'leaf':'camp'))}</span><strong class="fg-goal-caption">${esc(creek?describeObjective(g).title:goalCaption(g))}</strong><b>${count}<small>/ ${whole(g.target)}</small></b><div><i style="width:${clamp(g.progress??g.current/g.target)*100}%"></i></div>${g.done?`<em>${pictogram('check')}</em>`:''}</div>`;
      }).join('');
    }
    const objectiveArt=({settlement:'camp',hunters:'heron',preparation:'training',bosses:'boss',complete:'crown'}[campaign.phase])||({food:'forage',forage:'forage',build:'camp',shelter:'camp',defend:'shield',conquer:'crown',victory:'crown'}[obj.type])||'camp';
    if(objectiveArt!==this.objectiveArt){this.objectiveArt=objectiveArt;this.refs.objectiveArt.innerHTML=pictogram(objectiveArt);}
    this.refs.objectiveBox.title=typeof state.objective==='string'?state.objective:state.objective?.title||'Στόχοι εκστρατείας';
    const context=state.context||{},contextType=context.type,contextArt=context.actionIcon||{recruit:'recruit',loot:'store','persuade-camp':'persuade',persuade:'persuade',home:creek?'leaf':'camp',gather:'forage',reeds:'reeds',ally:'group',flies:'tongue','creek-find':'leaf','creek-recover':'recover','creek-nest':'heal'}[contextType]||contextType;
    if(this.refs.recruitPrompt){this.refs.recruitPrompt.hidden=!['recruit','rally'].includes(contextType)||this.recruitmentBubbleOpen||this.isBlocking()||Boolean(this.hudDisclosure)||Boolean(state.buildPlacement?.active);this.refs.recruitPrompt.classList.toggle('is-unavailable',context.available===false);}
    if(['recruit','rally'].includes(contextType)){this.setText('recruitName',`${context.name||'Βάτραχος'} · E · ${context.actionLabel||(creek?'Προσέγγιση':'Στρατολόγησε')}`);this.setText('recruitReason',context.reason||'');}
    this.refs.context.hidden=!contextType||contextType==='none'||this.isBlocking();
    this.refs.context.title=this.presentationText(state.hint||context.label||'');this.refs.context.classList.toggle('is-unavailable',context.available===false);
    if(contextArt!==this.contextArt){this.contextArt=contextArt;this.refs.contextArt.innerHTML=pictogram(contextArt||'recruit');$(this.root,'[data-action="interact"] .fg-action-art').innerHTML=pictogram(contextArt&&contextType!=='none'?contextArt:'recruit');}
    const interactTile=$(this.root,'[data-action="interact"]');interactTile.classList.toggle('has-context',Boolean(contextType&&contextType!=='none'));interactTile.classList.toggle('is-unavailable',context.available===false);interactTile.title=this.presentationText([state.hint,context.reason].filter(Boolean).join(' · ')||(creek?'Πλησίασε βάτραχο, σμήνος ή φυσικό εύρημα':'Πλησίασε βάτραχο, σμήνος ή οχυρό'));interactTile.disabled=!contextType||contextType==='none';
    const contextFood=context.cost?.food,costBadge=this.refs.interactionCost;
    if(costBadge){
      costBadge.hidden=contextFood==null||contextType==='none';costBadge.title=context.reason||'';
      const costValue=contextFood>0?whole(contextFood):0;
      // Browser-normalized SVG innerHTML differs from its source markup. Compare
      // the displayed value so an unchanged cost never reparses the icon.
      if(!costBadge.hidden&&costValue!==this.contextCostValue){this.contextCostValue=costValue;costBadge.innerHTML=costValue>0?`${pictogram('fly')}<b>${costValue}</b>`:`${pictogram('check')}<b>0</b>`;}
      costBadge.classList.toggle('is-short',context.available===false&&!(context.cooldown>0));
    }
    const contextCaption=context.actionLabel||({recruit:creek?'Προσέγγιση':'Στρατολόγησε',loot:creek?'Ευρήματα':'Λάφυρα','persuade-camp':creek?'Προσέγγιση':'Πείσε',persuade:creek?'Προσέγγιση':'Πείσε',home:creek?'Ξεκουράσου':'Κατασκευές',gather:'Μάζεψε',reeds:'Μάζεψε',ally:'Ομάδα',flies:'Μάζεψε','creek-find':'Συλλογή','creek-recover':'Ανάκτηση','creek-nest':'Φωλιά'}[contextType]||'Πλησίασε');
    if(contextCaption!==this.contextCaption){this.contextCaption=contextCaption;$(interactTile,'.fg-action-caption').innerHTML=captionMarkup(contextCaption);}
    this.setText('contextKey',!creek&&contextType==='home'?'V':'E');this.meter('contextBar',context.progress??1);
    const pred=state.predator,hunting=Boolean(pred&&pred.hp>0);if(hunting&&!this.wasHunting)this.closeHudDisclosure();this.wasHunting=hunting;this.root.classList.toggle('fg-is-hunted',hunting);this.refs.hunt.hidden=!hunting;this.refs.objectiveBox.hidden=false;
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
    this.updateRealmHUD(state);
    this.renderRecruitmentBubble(state.recruitment);
    if(state.savedAt&&state.savedAt!==this.savedAt){this.savedAt=state.savedAt;this.refs.saveStatus.hidden=false;clearTimeout(this.saveTimer);this.saveTimer=setTimeout(()=>this.refs.saveStatus.hidden=true,2500);}
    this.updateConstructionHUD(state);
    const now=performance.now();if(now-(this.lastPanelLayout||0)>500){this.layoutDockedPanels();this.lastPanelLayout=now;}if(now-this.lastDraw>100){this.drawMap(this.refs.minimap,state.world||{},false);this.lastDraw=now;if(this.panel==='map'){const canvas=$(this.refs.panel,'canvas');if(canvas)this.drawMap(canvas,state.world||{},true);}}
    if(this.panel&&now-this.lastPanel>700&&!['help','map','guide'].includes(this.panel)){this.renderPanel(false);this.lastPanel=now;}
  }
  resources(resource){
    if(typeof resource==='number')return {food:resource,reeds:resource,pearls:0};
    return {food:resource?.food??resource?.flies??0,reeds:resource?.reeds??resource?.wood??resource?.materials??0,pearls:resource?.pearls??0};
  }
  updatePopulation(state){
    const p=state.player||{},living=(state.allies||[]).filter(f=>!f.dead&&!(Number.isFinite(f.hp)&&f.hp<=0));
    const local=Number.isFinite(state.gangCount)?whole(state.gangCount):living.length+(!p.dead&&!(Number.isFinite(p.hp)&&p.hp<=0)?1:0);
    const total=Number.isFinite(state.kingdomPopulation)?whole(state.kingdomPopulation):local;
    const localGuards=Math.min(living.length,whole(state.defenses?.guardCount??living.filter(f=>f.guard||f.order==='guard').length));
    const guards=Number.isFinite(state.kingdomGuards)?whole(state.kingdomGuards):localGuards,travelers=living.length-localGuards,away=Math.max(0,total-local);
    this.setText('gangCount',local);this.setText('populationTotal',total);this.setText('populationTravelers',travelers);this.setText('populationGuards',guards);
    this.setText('populationLocal',local);this.setText('populationAway',away);if(this.refs.populationRegions)this.refs.populationRegions.hidden=!away;
    const description=state.creek?.enabled?`Σύντροφοι ${Math.max(0,total-1)} · Εδώ ${local} · Άλλες περιοχές ${away} · Συνοδοί ${travelers} · Σε φύλαξη ${guards}`:`Πληθυσμός βασιλείου ${total} · Εδώ ${local} · Άλλες λίμνες ${away} · Συνοδοί εδώ ${travelers} · Φρουροί σε όλες τις λίμνες ${guards} · Χωρίς όριο πληθυσμού`;
    this.refs.populationButton?.setAttribute('aria-label',description);if(this.refs.populationButton)this.refs.populationButton.title=description;
  }
  setText(ref,value){const el=this.refs[ref];if(el&&el.textContent!==String(value))el.textContent=String(value);}
  meter(ref,value){const el=this.refs[ref];if(el)el.style.transform=`scaleX(${clamp(value)})`;}
  panelHeader(eyebrow,title,extra=''){
    const expanded=this.panelExpanded!==false;
    return `<header class="fg-panel-head"><div><span class="fg-eyebrow">${eyebrow}</span><h2>${title}</h2><small class="fg-panel-live-label">${this.menu==='pause'?'Το παιχνίδι παραμένει σε παύση':'Ζωντανό πάνελ · ο κόσμος συνεχίζει'}</small></div><button class="fg-icon-button fg-panel-expander" data-action="panel-collapse" aria-expanded="${expanded}" aria-controls="fg-live-panel-body" aria-label="${expanded?'Σύμπτυξη πάνελ':'Ανάπτυξη πάνελ'}" title="Ανάπτυξη / σύμπτυξη">${icon('arrow')}</button><button class="fg-icon-button" data-action="${this.panel==='guide'?'guide-close':this.panel==='help'?'help-back':'close-panel'}" aria-label="Κλείσιμο">${icon('close')}</button></header>${extra}`;
  }
  renderPanel(force=false){
    const container=this.refs.panel;if(!this.panel||this.draggingBuild)return;
    const catalogScroll=$(container,'.fg-illustrated-build')?.scrollLeft||0;
    const scrollTop=container.scrollTop,bodyScroll=$(container,'.fg-live-panel-body')?.scrollTop||0,gridScroll=$(container,'.fg-frog-grid')?.scrollTop||0,active=document.activeElement;
    if(!force&&container.contains(active)&&['INPUT','SELECT'].includes(active.tagName))return;
    const focusData=container.contains(active)&&active?.tagName==='BUTTON'?{...active.dataset}:null;
    const disclosureStates=new Map($$(container,'details[data-creek-section]').map(d=>[d.dataset.creekSection,d.open]));
    container.classList.toggle('fg-command-panel',this.panel==='roster');container.classList.toggle('fg-building-panel',this.panel==='build');
    container.classList.toggle('fg-guide-panel',['help','guide'].includes(this.panel));container.classList.toggle('fg-field-open',this.panel==='guide');container.classList.toggle('fg-exploration-panel',this.panel==='exploration');
    const s=this.state;
    const defenseSignature=(s.defenses?.camps||[]).map(c=>[c.id,c.name,c.watchtower,c.assigned,c.stationed,c.status,c.threats,s.camps?.find(fort=>fort.id===c.id)?.gateHp,s.camps?.find(fort=>fort.id===c.id)?.gateMaxHp,c.guards?.map(f=>[f.id,f.hp,f.status,f.order])]);
    const signature=this.panel==='roster'?JSON.stringify([this.panel,this.rosterFilter,Array.from(this.chosen()),s.tacticalGroups,s.allies?.map(f=>[f.id,f.name,f.hp,f.stomach,f.level,f.tier,f.order,f.guard,f.canPromote,f.trained,f.trainingProgress,Boolean(f.portrait)]),s.resources,s.capacity,s.recruitmentUnlimited,s.training,s.camps?.map(c=>[c.id,c.team,c.destroyed,Boolean(c.buildings?.training)]),s.currentCamp?.buildings,s.defenses?.traveling,s.defenses?.guardCount]):this.panel==='build'?JSON.stringify([this.panel,this.buildView,this.defenseCampId,Array.from(this.chosen()),s.resources,s.buildOptions,s.currentCamp?.id,s.currentCamp?.hp,s.currentCamp?.gateHp,s.currentCamp?.gateMaxHp,s.currentCamp?.buildings,s.placement,s.capacity,defenseSignature,s.realmEconomy]):JSON.stringify([this.panel,this.panel==='realm'?s.realm:this.panel==='recruitment'?s.recruitment:this.panel==='guide'?this.guideId:this.panel==='help'?[this.guideCategory,this.guideQuery,s.guide?.seen]:null]);
    const finalSignature=this.panel==='exploration'?JSON.stringify([signature,s.creek]):signature;
    if(!force&&this.panelSignature===finalSignature)return;this.panelSignature=finalSignature;
    if(this.panel==='help')container.innerHTML=this.helpMarkup();
    else if(this.panel==='guide')container.innerHTML=this.guideCardMarkup();
    else if(this.panel==='realm')container.innerHTML=this.realmMarkup();
    else if(this.panel==='exploration')container.innerHTML=this.explorationMarkup();
    else if(this.panel==='recruitment')container.innerHTML=this.recruitmentMarkup();
    else if(this.panel==='build')container.innerHTML=this.buildMarkup();
    else if(this.panel==='roster')container.innerHTML=this.rosterMarkup();
    else if(this.panel==='map'){
      const creek=Boolean(s.creek?.enabled),home=this.creekHomeNest(),focused=Boolean(home&&this.mapFocus==='nest');
      const homeControl=home?`<button class="fg-map-home-control" data-action="${focused?'map-overview':'locate-shelter'}" aria-label="${focused?'Δείξε ολόκληρο τον χάρτη':'Εστίαση στο φυσικό καταφύγιο'}">${pictogram(focused?'eye':'leaf')}${focused?'Όλος ο χάρτης':'Καταφύγιο'}</button>`:'';
      container.innerHTML=this.panelHeader('Ο ΚΟΣΜΟΣ ΣΟΥ',creek?'Το ζωντανό ρυάκι':'Ο Μεγάλος Ποταμός',this.tabs('map'))+`<div class="fg-large-map"><canvas width="1024" height="720" aria-label="${focused?'Το καταφύγιο και η θέση του βατράχου σου':creek?'Φυσικές περιοχές, καταφύγιο, βάτραχοι και θηρευτές':'Μεγάλος χάρτης'}"></canvas>${homeControl}<span class="fg-map-north">N</span></div><div class="fg-map-legend">${home?`<span>${pictogram('leaf')} Καταφύγιο</span>`:''}<span><i style="--legend:#c8f3a1"></i>Εσύ & σύμμαχοι</span>${creek?'<span><i style="--legend:#79c4be"></i>Ομάδες σε συνύπαρξη</span>':''}<span><i style="--legend:#ee9a71"></i>Αντίπαλοι</span><span><i style="--legend:#f6db82"></i>Τροφή</span><span><i style="--legend:${creek?'#a8d8c6':'#c2b9e8'}"></i>${creek?'Γνώριμα σημεία':'Ελεύθερες θέσεις'}</span><span><i style="--legend:#f85a48"></i>Θηρευτές</span>${creek?'<span><i style="--legend:#f5d78f"></i>E · Χαμένα ευρήματα</span>':`<span>${pictogram('crown')} Αρχηγοί · εικονίδιο είδους</span>`}</div>`;
      this.drawMap($(container,'canvas'),this.state.world||{},true);
    }
    const headerEnd=container.innerHTML.indexOf('</header>')+9;
    if(headerEnd>8)container.innerHTML=container.innerHTML.slice(0,headerEnd)+`<div class="fg-live-panel-body" id="fg-live-panel-body">`+container.innerHTML.slice(headerEnd)+'</div>';
    this.setPanelExpanded(this.panelExpanded!==false);
    for(const details of $$(container,'details[data-creek-section]'))if(disclosureStates.has(details.dataset.creekSection))details.open=disclosureStates.get(details.dataset.creekSection);
    container.scrollTop=scrollTop;const body=$(container,'.fg-live-panel-body');if(body)body.scrollTop=bodyScroll;
    const catalog=$(container,'.fg-illustrated-build');if(catalog){catalog.scrollLeft=catalogScroll;this.syncBuildCatalog();}const grid=$(container,'.fg-frog-grid');if(grid)grid.scrollTop=gridScroll;
    if(focusData)$$(container,'button').find(button=>Object.entries(focusData).every(([name,value])=>button.dataset[name]===value))?.focus?.({preventScroll:true});
    if(this.panel==='map'){const canvas=$(container,'canvas');if(canvas)this.drawMap(canvas,this.state.world||{},true);}
  }
  tabs(which){return `<div class="fg-tabs"><button class="${which==='roster'?'active':''}" data-action="tab-roster">${icon('group')} Συμμορία</button><button class="${which==='map'?'active':''}" data-action="tab-map">${icon('pin')} Χάρτης</button><button class="${which==='realm'?'active':''}" data-action="open-realm">${icon('camp')} Περιοχές</button><button data-action="open-guide">${icon('leaf')} Οδηγός</button></div>`;}
  buildViews(){
    const view=this.buildView||'catalog';
    return `<div class="fg-build-views" aria-label="Προβολή οχυρών">${[['catalog','camp','Κτίρια'],['defense','shield','Άμυνα'],['organization','store','Οργάνωση'],['workshop','training','Εργαστήριο']].map(([id,art,label])=>`<button data-action="build-view" data-view="${id}" class="${view===id?'is-active':''}" aria-pressed="${view===id}">${pictogram(art)}<span>${label}</span></button>`).join('')}</div>`;
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
    if(this.buildView!=='defense')this.resetPanelScroll();
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
    if(this.buildView==='organization')return this.organizationMarkup();
    if(this.buildView==='workshop')return this.workshopMarkup();
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
    return this.panelHeader('ΚΑΤΑΣΚΕΥΗ & ΑΜΥΝΑ','Τα κάστρα σου',this.buildViews())+this.economyMarkup()+`
      <div class="fg-build-overview"><div class="fg-camp-illustration">${pictogram('camp')}${gangEmblem('ally')}</div><div class="fg-base-health"><h3>${esc(camp?.name||s.campName||'Νέο οχυρό')}</h3><div class="fg-base-healthbar"><span style="width:${camp?fraction(camp.hp,camp.maxHp)*100:100}%"></span></div><div class="fg-base-badges"><span title="Αντοχή οχυρού">${pictogram('heart')}<b>${camp?`${whole(camp.hp)} / ${whole(camp.maxHp)}`:'—'}</b></span>${this.gateMarkup(camp)}<span title="Συμμαχικά οχυρά">${pictogram('camp')}<b>${owned.length}</b></span><span title="Ενεργές φωλιές · χωρίς όριο πληθυσμού">${pictogram('nursery')}<b>${owned.filter(c=>c.buildings?.nursery).length}</b></span></div></div><div class="fg-build-bank" aria-label="Διαθέσιμα κοινά αποθέματα"><span class="fg-bank-label">Διαθέσιμα</span><div title="Κοινό απόθεμα τροφής">${pictogram('fly')}<b>${available(r.food)}</b><small>Τροφή</small></div><div title="Υλικά κατασκευής (ξύλο, φύλλα, καλάμια)">${pictogram('reeds')}<b>${available(r.reeds)}</b><small>Υλικά</small></div></div></div>
      <div class="fg-build-catalog-toolbar"><span>Κτίρια · σύρε ή επίλεξε</span>${this.guideButton('build','Πώς χτίζω;')}<div><button class="fg-build-nav" data-action="build-scroll" data-direction="-1" title="Προηγούμενα κτίρια" aria-label="Προηγούμενα κτίρια">${icon('arrow')}</button><button class="fg-build-nav" data-action="build-scroll" data-direction="1" title="Επόμενα κτίρια" aria-label="Επόμενα κτίρια">${icon('arrow')}</button></div></div>
      <div class="fg-build-grid fg-illustrated-build" role="region" aria-label="Κατάλογος κτιρίων" tabindex="0">${options.map((o,i)=>{
        const cost=typeof o.cost==='number'?{food:o.cost,reeds:0}:(o.cost||{}),affordable=r.food>=(cost.food||0)&&r.reeds>=(cost.reeds||0);
        const built=Boolean(o.built||camp?.buildings?.[o.type]),siteOK=o.type==='shelter'?valid:Boolean(camp)||['promote','promote-player'].includes(o.type);
        const enabled=o.enabled!==false&&affordable&&!built&&siteOK,managed=built&&o.type==='watchtower'&&Boolean(camp?.id);
        const defense=managed?this.defenseCamps().find(c=>c.id===camp.id):null;
        const status=managed?'operational':built?'built':!siteOK?'site':!affordable?'resources':enabled?'ready':'locked';
        const explanation=managed?'Διαχείριση φρουράς · ανάθεση και ανάκληση βατράχων':materialText(o.reason||(!siteOK?'Απαιτείται κατάλληλη θέση ή συμμαχικό οχυρό':!affordable?'Δεν αρκούν τα κοινά αποθέματα':built?'Έχει ήδη κατασκευαστεί':o.description||''));
        const dragHelp=enabled&&placementTypes.has(o.type)?' · Σύρε στον χώρο ή κάνε κλικ και τοποθέτησε · Q/R περιστροφή · Esc ακύρωση':'';
        const statusArt={operational:'shield',built:'check',site:'warning',resources:'store',ready:'repair',locked:'warning'}[status];
        return `<button class="fg-build-card fg-picture-building is-${status}" data-action="${managed?'defense-open':'build'}" data-type="${esc(o.type)}" draggable="${enabled&&placementTypes.has(o.type)?'true':'false'}" data-camp="${esc(camp?.id||s.currentCampId||'')}" title="${esc((o.name||o.type)+' · '+explanation+dragHelp)}" aria-label="${esc((o.name||o.type)+' · '+explanation+dragHelp)}" ${enabled||managed?'':'disabled'}><div class="fg-building-art">${pictogram(artFor(o.type))}${enabled&&placementTypes.has(o.type)?`<span class="fg-building-drag" title="Σύρε και τοποθέτησε">${pictogram('place')}</span>`:''}<span class="fg-building-benefit" title="${esc(o.description||'')}">${pictogram(effectFor(o.type))}</span><span class="fg-building-state">${pictogram(statusArt)}</span></div><h3>${esc(o.name||o.type)}${o.type==='palisade'?'<small class="fg-building-scope">Όλη η περίμετρος + πύλη</small>':''}</h3><p class="fg-building-description">${esc(materialText(o.description||''))}</p>${Number(o.duration)>0&&!built?`<p class="fg-building-time" title="Βασικός χρόνος εργασίας με έναν παρόντα οικοδόμο. Πρόσθετοι οικοδόμοι αυξάνουν τον ρυθμό.">${whole(o.duration)}″ εργασίας · χρειάζεται οικοδόμο</p>`:''}${!enabled&&!managed&&!built?`<p class="fg-building-reason">${esc(explanation)}</p>`:''}${managed?`<span class="fg-cost-label">Φρουρά οχυρού</span><div class="fg-building-operation">${pictogram('group')}<b>${whole(defense?.assigned)} / ${whole(defense?.slots||4)}</b><span>${defense?.stationed?'Επανδρωμένη':'Ανάθεσε φρουρούς'}</span></div>`:`<span class="fg-cost-label">Κόστος</span><div class="fg-material-requirements">${[['food','fly','Τροφή'],['reeds','reeds','Υλικά κατασκευής']].map(([resource,art,label])=>`<div class="fg-material ${r[resource]>=(cost[resource]||0)?'is-enough':'is-short'}" title="${label}: ${available(r[resource])} / ${whole(cost[resource]||0)}">${pictogram(art)}<div><b>${whole(cost[resource]||0)}</b><span><i style="width:${cost[resource]?clamp(r[resource]/cost[resource])*100:100}%"></i></span></div></div>`).join('')}</div>`}<div class="fg-build-purchase">${managed?'<strong>Άνοιγμα φρουράς</strong>':o.type==='palisade'?`<strong>${built?'Οχυρωμένη περίμετρος':'Ενίσχυσε τείχη'}</strong>`:key(i+1)}<span>${pictogram(managed?'shield':built?'check':enabled?(placementTypes.has(o.type)?'place':'repair'):'warning')}</span></div></button>`;
      }).join('')}</div>
      ${this.jobsMarkup()}<div class="fg-build-footer"><div class="fg-placement-status${valid?'':' is-invalid'}" title="${esc(materialText(s.placement?.reason||(valid?'Κατάλληλη θέση κατασκευής':'Ακατάλληλη θέση κατασκευής')))}">${pictogram('camp')}${pictogram(valid?'check':'warning')}</div><button class="fg-image-meal" data-action="consume" title="Τροφή από κοινά αποθέματα" aria-label="Τροφή από κοινά αποθέματα" ${s.inCamp||camp?'':'disabled'}>${pictogram('fly')}${pictogram('heal')}${key('G')}</button><button class="fg-image-meal" data-action="gang-forage" title="Η ομάδα βρίσκει μύγες και θεραπεύεται" aria-label="Αναζήτηση τροφής">${pictogram('forage')}${key('T')}</button><div class="fg-build-exit">${key('V')}${key('ESC')}</div></div>`;
  }
  rosterMarkup(){
    if(this.state.creek?.enabled)return this.creekRosterMarkup();
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
      ${this.tacticalGroupsMarkup()}<div class="fg-command-layout"><div class="fg-army-main"><div class="fg-roster-toolbar"><div class="fg-roster-filters">${[['all','group','Όλοι'],['injured','heal','Τραυματισμένοι'],['guards','shield','Φρουροί'],['forage','forage','Σε αναζήτηση τροφής']].map(([filter,art,label])=>`<button data-action="roster-filter" data-filter="${filter}" class="${this.rosterFilter===filter?'is-active':''}" title="${label}" aria-label="${label}">${pictogram(art)}<b>${filters[filter].length}</b></button>`).join('')}</div><button class="fg-select-filter" data-action="select-all" data-filter="${this.rosterFilter}" title="Επιλογή όλων στο φίλτρο" aria-label="Επιλογή όλων στο φίλτρο">${pictogram('check')}${key('ALL')}</button></div><div class="fg-frog-grid">${shown.length?shown.map((f,i)=>`
        <button class="fg-frog-card${chosen.has(String(f.id))?' is-selected':''}${isInjured(f)?' is-wounded':''}" data-action="select-frog" data-id="${esc(f.id)}" aria-label="${esc(f.name||`Βάτραχος ${i+1}`)}" title="${esc((f.name||'Βάτραχος')+' · '+(roleNames[f.role]||f.role||'Κυνηγός'))}"><div class="fg-frog-picture"><img src="${esc(this.portrait(f))}" alt="${esc(f.name||'Βάτραχος')}" loading="lazy"><span class="fg-frog-crest">${gangEmblem('ally')}</span><span class="fg-frog-role">${pictogram(rolePictogram(f.role))}</span><span class="fg-frog-tier">${'◆'.repeat(Math.min(5,Math.max(1,f.tier||1)))}</span><b class="fg-frog-level">${whole(f.level||1)}</b>${chosen.has(String(f.id))?`<span class="fg-frog-chosen">${pictogram('check')}</span>`:''}${f.trainingProgress>0?`<div class="fg-training-card-progress"><span style="width:${clamp(f.trainingProgress)*100}%"></span>${pictogram('training')}</div>`:''}${f.trained?`<span class="fg-trained-badge" title="Εκπαιδευμένος">${pictogram('training')}</span>`:''}</div><div class="fg-frog-card-caption"><strong>${esc(f.name||`Βάτραχος ${i+1}`)}</strong><span>${pictogram(orderArt(f))}</span></div>${cardMeter('heart',fraction(f.hp,f.maxHp),whole(f.hp),'health')}${cardMeter('stomach',fraction(f.stomach,f.maxStomach),`${whole(fraction(f.stomach,f.maxStomach)*100)}%`,'hunger')}</button>`).join(''):`<div class="fg-roster-empty">${pictogram('recruit')}${key('E')}</div>`}</div></div>
      <aside class="fg-command-detail"><div class="fg-selection-title"><span>${pictogram('group')}</span><h3>${single?esc(single.name):selected.length?`${selected.length} βάτραχοι`:'Επιλογή ομάδας'}</h3></div><div class="fg-selected-hero">${selected.length?`<img src="${esc(this.portrait(selected[0]))}" alt="${esc(selected[0].name||'Επιλεγμένος βάτραχος')}"><span>${pictogram(single?rolePictogram(single.role):'group')}</span><b>${single?whole(single.level||1):selected.length}</b>`:pictogram('regroup')}</div>${cardMeter('heart',health,`${whole(health*100)}%`,'health')}${cardMeter('stomach',hunger,`${whole(hunger*100)}%`,'hunger')}<div class="fg-selected-orders">${['follow','attack','forage','guard','regroup'].map(command=>this.commandButton(command)).join('')}</div>${this.trainingButton('selection')}${single?`<button class="fg-promote-picture" data-action="frog-command" data-id="${esc(single.id)}" data-command="promote" aria-label="Προαγωγή" title="Προαγωγή · ${whole(promotionCost.food)} τροφή + ${whole(promotionCost.reeds)} υλικά κατασκευής" ${single.canPromote===false?'disabled':''}>${pictogram('crown')}<span>${'◆'.repeat(Math.min(5,(single.tier||1)+1))}</span>${pictogram('fly')}<b>${whole(promotionCost.food)}</b>${pictogram('reeds')}<b>${whole(promotionCost.reeds)}</b></button>`:''}<div class="fg-detail-selection-count">${pictogram('group')}<b>${selected.length} / ${allies.length}</b>${key('SHIFT')}</div></aside></div>`;
  }
  guideButton(id,label='Πώς λειτουργεί;'){
    return `<button class="fg-guide-link" data-guide-open="${esc(id)}">?<span>${esc(label)}</span></button>`;
  }
  rememberGuideReturn(){
    if(!this.guideReturn)this.guideReturn={panel:this.panel,menu:this.menu,returnMenu:this.returnMenu||null,panelData:this.panelData,panelExpanded:this.panelExpanded,pauseExpanded:this.pauseExpanded,focusElement:typeof document!=='undefined'?document.activeElement:null};
  }
  openGuideLibrary(){
    this.rememberGuideReturn();this.guideBackToBook=false;this.guideFirstEncounter=false;
    this.showPanel('help');this.callbacks.onAction('guide-open',{id:null,library:true});
    return true;
  }
  showGuideCard(id,{firstEncounter=false}={}){
    const entry=this.guideEntry(id);if(!entry)return false;id=entry.id;
    this.rememberGuideReturn();this.guideBackToBook=this.panel==='help'||this.guideBackToBook;
    this.guideId=id;this.guideFirstEncounter=Boolean(firstEncounter);
    this.showPanel('guide');if(this.refs.guideHint)this.refs.guideHint.hidden=true;
    this.callbacks.onAction('guide-open',{id,firstEncounter:Boolean(firstEncounter)});
    return true;
  }
  closeGuideCard(){
    if(this.panel==='guide'&&this.guideBackToBook){this.guideBackToBook=false;this.guideFirstEncounter=false;this.showPanel('help');return true;}
    const previous=this.guideReturn||{panel:null,menu:null},id=this.guideId,conceptOpen=this.conceptPanelsOpen;
    this.guideReturn=null;this.guideBackToBook=false;this.guideFirstEncounter=false;this.closePanels();
    if(previous.menu==='title')this.showTitle(this.hasSave);
    else if(previous.menu==='pause')this.showPause(true);
    else if(previous.panel&&!['guide','help'].includes(previous.panel))this.showPanel(previous.panel,previous.panelData);
    else this.menu=null;
    if(this.panel&&previous.panelExpanded!=null)this.setPanelExpanded(previous.panelExpanded);
    if(this.menu==='pause'&&previous.pauseExpanded!=null)this.setPauseExpanded(previous.pauseExpanded);
    this.setConceptPanelsOpen(conceptOpen);
    if(conceptOpen&&this.narrowPanelViewport()){
      if(this.panel&&!['guide','help'].includes(this.panel))this.setPanelExpanded(false);
      if(this.menu==='pause')this.setPauseExpanded(false);
    }
    this.layoutDockedPanels();
    if(previous.focusElement?.isConnected)previous.focusElement.focus?.({preventScroll:true});
    this.callbacks.onAction('guide-close',{id,returnPanel:previous.panel,returnMenu:previous.menu});
    return true;
  }
  showGuideHint(id){
    const entry=this.guideEntry(id);if(!entry||!this.refs.guideHint)return false;
    this.lastGuideHintId=entry.id;
    this.refs.guideHint.innerHTML=`<header class="fg-concept-heading"><span>ΕΙΚΟΝΕΣ & ΟΔΗΓΙΕΣ</span><button data-action="guide-hint-close" aria-label="Σύμπτυξη εικονογραφημένων οδηγιών · U">${key('U')}${icon('close')}</button></header><button class="fg-guide-hint-content" data-guide-open="${entry.id}"><img src="${entry.image}" alt="${esc(entry.title)}" loading="lazy"><span><strong>${esc(entry.title)}</strong><em>${esc(entry.subtitle)}</em><span class="fg-concept-keys">${entry.keys.map(key).join('')}</span><b>Βήματα & λεπτομέρειες ${icon('arrow')}</b></span></button><p class="fg-concept-tip">${esc(entry.tip)}</p>`;
    this.syncConceptVisibility();
    this.refs.conceptToggle?.setAttribute?.('title',`Εικόνες και οδηγίες · ${entry.title} · U`);
    return true;
  }
  toggleConceptPanels(force){
    const open=typeof force==='boolean'?force:this.hudDisclosure?true:!this.conceptPanelsOpen;
    if(open)this.closeHudDisclosure();
    this.setConceptPanelsOpen(open);
    if(this.conceptPanelsOpen&&this.narrowPanelViewport()){
      if(this.panel&&!['help','guide'].includes(this.panel))this.setPanelExpanded(false);
      if(this.menu==='pause')this.setPauseExpanded(false);
    }
    this.showGuideHint(this.lastGuideHintId||this.guideId||'movement');
    this.layoutDockedPanels();
    this.callbacks.onAction('hud-disclosure',{name:'concepts',open:this.conceptPanelsOpen});
    return this.conceptPanelsOpen;
  }
  narrowPanelViewport(){const width=Number(globalThis.innerWidth);return width>0&&width<590;}
  setConceptPanelsOpen(open){
    this.conceptPanelsOpen=Boolean(open);this.refs.conceptToggle?.setAttribute?.('aria-expanded',String(this.conceptPanelsOpen));
    this.syncConceptVisibility();
  }
  syncConceptVisibility(){
    if(this.refs.guideHint)this.refs.guideHint.hidden=!this.conceptPanelsOpen||Boolean(this.hudDisclosure)||['guide','help'].includes(this.panel)||this.menu==='title'||Boolean(this.state.buildPlacement?.active);
  }
  guideCardMarkup(){
    const creek=this.state.creek?.enabled,entry=this.guideEntry(this.guideId)||(creek?CREEK_GUIDE_CARDS[0]:GUIDE_CARDS[0]),category=(creek?CREEK_GUIDE_CATEGORIES:GUIDE_CATEGORIES).find(c=>c.id===entry.category)?.label||'Οδηγός';
    return this.panelHeader(this.guideFirstEncounter?'ΠΡΩΤΗ ΣΥΝΑΝΤΗΣΗ · ΖΩΝΤΑΝΟΣ ΟΔΗΓΟΣ':esc(category),esc(entry.title))+`
      <article class="fg-field-card" data-guide-card="${entry.id}">
        <div class="fg-field-art"><img src="${entry.image}" alt="${esc(entry.subtitle)}"><div class="fg-field-art-caption"><span>FROG · ΟΔΗΓΟΣ ΠΕΔΙΟΥ</span><strong>${esc(entry.title)}</strong></div></div>
        <div class="fg-field-copy"><p class="fg-field-intro">${esc(entry.subtitle)}</p><div class="fg-field-keys" aria-label="Χειρισμός">${entry.keys.map(key).join('')}</div>
          <ol class="fg-field-steps">${entry.steps.map((step,i)=>`<li><span>${i+1}</span><p>${esc(step)}</p></li>`).join('')}</ol>
          <dl class="fg-field-outcome"><div><dt>Τι απαιτεί</dt><dd>${esc(entry.cost)}</dd></div><div><dt>Τι πετυχαίνεις</dt><dd>${esc(entry.result)}</dd></div></dl>
          <aside class="fg-field-tip">${icon('leaf')}<p>${esc(entry.tip)}</p></aside>
        </div>
      </article>
      <div class="fg-field-footer"><div class="fg-field-related"><span>Σχετικές οδηγίες</span>${entry.related.map(id=>this.guideEntry(id)).filter(Boolean).map(c=>`<button data-guide-open="${c.id}">${esc(c.title)}</button>`).join('')}</div><div class="fg-field-footer-actions"><button class="fg-button" data-action="guide-library">Όλο το βιβλίο</button><button class="fg-button fg-primary" data-action="guide-close">${this.guideBackToBook?'Πίσω στο βιβλίο':'Το κατάλαβα'} ${icon('arrow')}</button></div></div>`;
  }
  helpMarkup(){
    const searchable=value=>String(value||'').normalize('NFD').replace(/\p{M}/gu,'').toLocaleLowerCase('el');
    const category=this.guideCategory||'all',query=searchable(this.guideQuery).trim(),seen=new Set(this.state.guide?.seen||[]);
    const creek=this.state.creek?.enabled,categories=creek?CREEK_GUIDE_CATEGORIES:GUIDE_CATEGORIES;
    const cards=(creek?CREEK_GUIDE_CARDS:GUIDE_CARDS).filter(c=>(category==='all'||category===c.category)&&(!query||searchable([c.title,c.subtitle,...c.keys,...c.steps].join(' ')).includes(query)));
    return this.panelHeader('ΓΝΩΡΙΣΕ ΤΟΝ ΚΟΣΜΟ · ΔΙΑΛΕΞΕ ΜΙΑ ΕΙΚΟΝΑ','Το βιβλίο της όχθης')+`
      <div class="fg-guide-intro"><p>Κάθε ενέργεια έχει τη δική της εικόνα, χειρισμό, απαίτηση και αποτέλεσμα. Όλες οι οδηγίες είναι διαθέσιμες από την αρχή.</p><label class="fg-guide-search"><span>Αναζήτηση</span><input type="search" data-guide-search value="${esc(this.guideQuery||'')}" placeholder="π.χ. μύγες, στρατολόγηση, Q" aria-label="Αναζήτηση στον εικονογραφημένο οδηγό"></label></div>
      <nav class="fg-guide-categories" aria-label="Κατηγορίες οδηγού">${categories.map(c=>`<button data-action="guide-category" data-category="${c.id}" aria-pressed="${category===c.id}">${esc(c.label)}</button>`).join('')}</nav>
      <div class="fg-guide-result-count">${cards.length} εικονογραφημένες οδηγίες</div>
      <div class="fg-guide-library">${cards.length?cards.map(c=>`<button class="fg-guide-entry" data-guide-open="${c.id}" aria-label="${esc(c.title+' · '+c.subtitle)}"><div><img src="${c.image}" alt="" loading="lazy">${seen.has(c.id)?'<span class="fg-guide-read">Διαβάστηκε</span>':''}</div><section><h3>${esc(c.title)}</h3><p>${esc(c.subtitle)}</p><span class="fg-guide-entry-keys">${c.keys.slice(0,3).map(key).join('')}</span></section></button>`).join(''):'<p class="fg-realm-empty">Δεν βρέθηκε οδηγία. Δοκίμασε άλλη λέξη ή κατηγορία.</p>'}</div>`;
  }
  updateRealmHUD(state){
    const creek=state.creek?.enabled,economy=creek?null:this.economyTotals(state);
    this.setText('pearls',available(creek?state.creek.inventory?.keepsakes:state.resources?.pearls));
    if(this.refs.supplySummary){
      this.refs.supplySummary.hidden=creek?!state.creek.phase?.label:!economy;
      if(creek){
        this.refs.supplySummary.textContent=state.creek.phase?.label||'';
        this.refs.supplySummary.title=state.creek.phase?.hint||'Παρατήρησε τις αλλαγές στο ρυάκι.';
        this.refs.supplySummary.setAttribute?.('aria-label',`${state.creek.phase?.label||'Συνθήκες ρυακιού'} · Δες τις αλλαγές του οικοσυστήματος`);
        this.refs.supplySummary.classList.toggle('is-short',false);
        this.refs.supplySummary.dataset.action='open-exploration';
        this.refs.supplySummary.removeAttribute?.('data-guide-open');
      }
      if(economy){const net=Number(economy.netFoodPerMinute)||0;this.refs.supplySummary.classList.toggle('is-short',Boolean(economy.shortage)||net<0);this.refs.supplySummary.textContent=`Τροφή ${net>=0?'+':''}${net.toFixed(1)}/λεπτό`;this.refs.supplySummary.title=`Σύνολο βασιλείου · Παραγωγή ${(Number(economy.foodIncomePerMinute)||0).toFixed(1)} · Συντήρηση ${(Number(economy.foodPerMinute)||0).toFixed(1)} ανά λεπτό`;}
    }
    const tutorial=creek?[]:state.guide?.tutorial||state.tutorial||[],active=tutorial.find(t=>!t.done),blocked=this.isBlocking()||state.buildPlacement?.active||state.predator?.hp>0;
    if(this.refs.practicalTutorial){
      this.refs.practicalTutorial.hidden=!active||Boolean(state.guide?.tutorialDismissed)||blocked;
      if(active?.id!==this.tutorialStepId){this.tutorialStepId=active?.id;this.tutorialDetailsOpen=false;}
      const detailsOpen=Boolean(this.tutorialDetailsOpen),signature=JSON.stringify(active&&[active.id,active.current,active.target,tutorial.filter(t=>t.done).length,detailsOpen]);
      if(active&&signature!==this.tutorialSignature){this.tutorialSignature=signature;this.refs.practicalTutorial.innerHTML=`<div><span>ΠΡΩΤΑ ΒΗΜΑΤΑ · ${tutorial.filter(t=>t.done).length}/${tutorial.length}</span><button data-action="tutorial-dismiss" aria-label="Απόκρυψη πρακτικής εκπαίδευσης">${icon('close')}</button></div><strong>${esc(active.label)}</strong><button class="fg-tutorial-details-toggle" data-action="tutorial-details" aria-expanded="${detailsOpen}" aria-controls="fg-tutorial-detail">${detailsOpen?'Λιγότερα':'Λεπτομέρειες'} ${icon('arrow')}</button><div class="fg-tutorial-detail" id="fg-tutorial-detail" ${detailsOpen?'':'hidden'}><p>${esc(active.detail)}</p><button data-guide-open="${esc(active.guideId||'movement')}">Δείξε μου πώς ${icon('arrow')}</button></div><progress value="${Math.min(Number(active.current)||0,Number(active.target)||1)}" max="${Number(active.target)||1}" aria-label="Πρόοδος πρακτικού βήματος"></progress>`;}
    }
    const groups=state.tacticalGroups||[];
    if(this.refs.tacticsDock){
      this.refs.tacticsDock.hidden=!groups.some(g=>(g.count??g.ids?.length??0)>0)||blocked;
      const signature=JSON.stringify(groups.map(g=>[g.id,g.name,g.count??g.ids?.length,g.selected]));
      if(signature!==this.tacticsSignature){this.tacticsSignature=signature;this.refs.tacticsDock.innerHTML=groups.map((g,i)=>`<button data-action="select-group" data-group="${esc(g.id)}" aria-pressed="${!!g.selected}" title="${esc(g.name||`Ομάδα ${i+1}`)} · ${whole(g.count??g.ids?.length)} βάτραχοι">${key(i+4)}<span>${esc(g.name||`Ομάδα ${i+1}`)}</span><b>${whole(g.count??g.ids?.length)}</b></button>`).join('');}
    }
    if(this.refs.guideHint)this.refs.guideHint.classList.toggle('is-obscured',this.menu==='title'||Boolean(state.buildPlacement?.active));
  }
  recruitmentMarkup(){
    if(this.state.creek?.enabled)return this.creekRecruitmentMarkup();
    const r=this.state.recruitment;
    if(!r)return this.panelHeader('ΣΥΜΦΩΝΙΑ','Στρατολόγηση')+`<div class="fg-realm-empty">Πλησίασε και κοίτα έναν ουδέτερο ή παραδομένο βάτραχο για να δεις την προσωπική του πρόταση.${this.guideButton('recruit','Πώς κερδίζω έναν σύμμαχο;')}</div>`;
    const requirements=r.requirements||[],ready=Boolean(r.canRecruit),targetId=r.targetId||r.id||'';
    return this.panelHeader('Η ΕΝΤΑΞΗ ΕΙΝΑΙ ΜΙΑ ΣΥΜΦΩΝΙΑ',esc(r.name||'Νέος σύμμαχος'))+`
      <div class="fg-recruit-contract"><div class="fg-contract-portrait"><img src="${esc(r.portrait||'./guide/neutral.webp')}" alt="${esc(r.name||'Ουδέτερος βάτραχος')}"><span>${esc(roleNames[r.role]||'Υποψήφιος σύμμαχος')}</span>${r.level?`<b>Επίπεδο ${whole(r.level)}</b>`:''}</div><section><p class="fg-contract-intro">${esc(r.description||r.reason||'Οι απαιτήσεις αφορούν αυτόν τον βάτραχο. Το κύρος σου μπορεί να τις μειώσει.')}</p><ul class="fg-contract-requirements">${requirements.map(req=>{const met=Boolean(req.done??req.met);return `<li class="${met?'is-met':''}"><span>${icon(met?'check':'leaf')}</span><div><strong>${esc(req.label||req.id)}</strong>${req.detail?`<p>${esc(req.detail)}</p>`:''}${req.target!=null?`<small>${whole(req.current)} / ${whole(req.target)}</small>`:''}</div></li>`;}).join('')||'<li class="is-met">Δεν απομένει προϋπόθεση. Ο βάτραχος αναγνωρίζει το κύρος σου.</li>'}</ul><div class="fg-contract-price"><span>Κόστος ένταξης</span>${this.costMarkup(r.cost||{food:0})}</div>${r.helpAvailable||requirements.some(q=>q.id==='help'&&!q.done)?`<button class="fg-button" data-action="recruit-help" data-id="${esc(targetId)}">${r.helpAccepted?'Δες τη βοήθεια που χρειάζεται':'Ανάλαβε να τον βοηθήσεις'}</button>`:''}<button class="fg-button fg-primary" data-action="recruit-target" data-id="${esc(targetId)}" ${ready?'':'disabled'}>${ready?'Ένταξη στην ομάδα':'Ολοκλήρωσε τις απαιτήσεις'} ${icon('arrow')}</button><p class="fg-contract-note">${esc(r.instant?'Το κύρος σου αρκεί για άμεση ένταξη.':r.blockReason||(!ready?'Οι πόροι χρεώνονται μόνο όταν η ένταξη ολοκληρωθεί.':'Ο νέος σύμμαχος θα ακολουθεί την ομάδα σου.'))}</p>${this.guideButton('recruit','Πώς λειτουργεί η συμφωνία;')}</section></div>`;
  }
  costMarkup(cost={}){
    const parts=[['food','Τροφή','fly'],['reeds','Υλικά','reeds'],['pearls','Μαργαριτάρια','pearl']].filter(([id])=>(Number(cost[id])||0)>0);
    return `<span class="fg-exact-cost">${parts.length?parts.map(([id,label,art])=>`<span title="${label}">${id==='pearls'?'<i class="fg-pearl" aria-hidden="true"></i>':pictogram(art)}<b>${whole(cost[id])}</b><small>${label}</small></span>`).join(''):'<span><b>0</b><small>Χωρίς χρέωση</small></span>'}</span>`;
  }
  economyTotals(state=this.state){
    const e=state.realmEconomy;if(!e)return null;
    const background=e.background||state.realm?.background||{};
    const total=key=>(Number(e[key])||0)+(Number(background[key])||0);
    const net=total('netFoodPerMinute'),food=typeof state.resources==='number'?state.resources:state.resources?.food;
    return {...e,armyCount:total('armyCount'),foodIncomePerMinute:total('foodIncomePerMinute'),foodPerMinute:total('foodPerMinute'),netFoodPerMinute:net,minutesOfFood:net>=0?Infinity:Number.isFinite(food)?Math.max(0,food)/-net:e.minutesOfFood};
  }
  economyMarkup(){
    const e=this.economyTotals();if(!e)return '';
    const net=Number(e.netFoodPerMinute)||0;
    return `<div class="fg-economy-summary"><span><small>Παραγωγή βασιλείου</small><b>+${(Number(e.foodIncomePerMinute)||0).toFixed(1)}<em>/λεπτό</em></b></span><span><small>Συντήρηση στρατού</small><b>−${(Number(e.foodPerMinute)||0).toFixed(1)}<em>/λεπτό</em></b></span><span class="${net<0?'is-short':'is-positive'}"><small>Ισοζύγιο</small><b>${net>=0?'+':''}${net.toFixed(1)}<em>/λεπτό</em></b></span><span><small>Απόθεμα για</small><b>${Number.isFinite(e.minutesOfFood)?`${Math.max(0,e.minutesOfFood).toFixed(1)} λεπτά`:'Σταθερή τροφοδοσία'}</b></span></div>${e.shortage?'<p class="fg-realm-warning">Η τροφοδοσία δεν επαρκεί. Ενίσχυσε την παραγωγή ή στείλε συλλέκτες σε ασφαλή σμήνη.</p>':''}`;
  }
  jobMarkup(job){
    const construction=job.kind==='construction',display=constructionPresentation(job),remaining=Math.max(0,Number.isFinite(Number(job.remaining))?Number(job.remaining):display.remaining),rate=Number(job.workRate)||0;
    const running=job.status==='working',eta=construction?display.eta:null;
    const time=construction?display.time:remaining<=0?'Έτοιμο':clockDuration(remaining);
    const status=job.reason||({working:'Σε εξέλιξη',queued:'Στην ουρά',paused:'Σε αναμονή',blocked:'Η εργασία σταμάτησε',delivery:'Περιμένει τον παραλήπτη'}[job.status])||job.status||'Σε εξέλιξη';
    const player=Boolean(job.playerBuilding),assigned=whole(job.workersAssigned),helpers=Math.max(0,whole(job.workersPresent)-(player?1:0));
    const site=job.workPoint,p=this.state.world?.player||this.state.player,siteDistance=site&&p&&Number.isFinite(site.x)&&Number.isFinite(site.z)&&Number.isFinite(p.x)&&Number.isFinite(p.z)?Math.ceil(Math.hypot(site.x-p.x,site.z-p.z)):null;
    const workforce=construction?`<div class="fg-job-workforce"><span>${pictogram('group')}Σύμμαχοι <b>${helpers} / ${assigned}</b><small>παρόντες / ανατεθειμένοι</small></span><span class="${player?'is-working':''}">${player?'Εσύ χτίζεις':'Εσύ εκτός πάγκου'}${rate>0?`<small>Ρυθμός ${rate.toFixed(2)}×</small>`:''}</span></div><p class="fg-job-help">${player?'Μείνε ακίνητος στον πάγκο για να συνεχίσεις την εργασία.':`Πήγαινε στον πάγκο με τη σημαία${siteDistance!==null?` · ${siteDistance} μ. από εδώ`:''}. Στάσου ακίνητος ή φέρε ελεύθερους συνοδούς.`} Η βάση πρέπει να παραμένει ασφαλής.</p>`:'';
    return `<article class="fg-job"><div><strong>${esc(job.label||job.type||'Εργασία')} <b class="fg-job-percent">${display.percent}%</b></strong><span>${esc(job.campName||'Οχυρό')}${job.targetName?' · '+esc(job.targetName):''}</span></div><progress value="${Number(job.progress)||0}" max="${Number(job.duration)||1}" aria-label="Πρόοδος ${esc(job.label||'εργασίας')}"></progress>${construction?this.constructionTimelineMarkup(display):''}<p><span>${esc(status)}</span><b title="${eta!==null?'Εκτίμηση με τον τρέχοντα αριθμό οικοδόμων':construction?'Η εργασία περιμένει. Χρόνος θα εμφανιστεί όταν αρχίσει το χτίσιμο.':'Χρόνος εργαστηρίου'}">${time}</b></p>${workforce}${job.canCancel?`<button class="fg-text-button" data-action="cancel-job" data-job="${esc(job.id)}" title="Ακύρωση σε ασφαλή βάση · επιστρέφεται το μισό κόστος">Ακύρωση · επιστροφή 50%</button>`:''}</article>`;
  }
  constructionTimelineMarkup(display){
    return `<ol class="fg-construction-timeline" aria-label="Στάδια κατασκευής">${constructionStages.map((stage,index)=>`<li class="${index<display.stage||display.percent===100?'is-complete':index===display.stage?'is-current':''}"${index===display.stage?' aria-current="step"':''}><i></i><span>${stage}</span></li>`).join('')}</ol>`;
  }
  constructionTrackerMarkup(job){
    const d=constructionPresentation(job),workers=whole(job.workersPresent),player=Boolean(job.playerBuilding);
    return `<article class="fg-construction-live-job${d.running?' is-working':' is-waiting'}" data-live-job="${esc(job.id)}"><div class="fg-construction-title"><span><strong>${esc(job.label||job.type||'Κατασκευή')}</strong><small>${esc(job.campName||'Εργοτάξιο')}</small></span><b>${d.percent}%</b></div><progress value="${d.progress}" max="${d.duration}" aria-label="${esc(job.label||'Κατασκευή')}: ${d.percent}%"></progress><div class="fg-construction-timing"><span>${d.running?'Απομένουν':d.remaining===0?'Έτοιμο':'Η εργασία σταμάτησε'}</span><strong>${d.time}</strong></div>${this.constructionTimelineMarkup(d)}<div class="fg-construction-live-detail"><p>${esc(d.reason)}</p><span>${workers} ${workers===1?'οικοδόμος':'οικοδόμοι'}${player?' · χτίζεις κι εσύ':''}${d.running?` · ${Number(job.workRate).toFixed(2)}×`:''}</span>${!d.running&&d.remaining>0?`<small>Απομένουν ${clockDuration(d.remaining)} βασικής εργασίας.</small>`:''}</div></article>`;
  }
  updateConstructionHUD(state=this.state){
    if(!this.refs.constructionHUD)return;
    if(state.creek?.enabled){this.refs.constructionHUD.hidden=true;this.root.classList.toggle('fg-has-construction',false);return;}
    const jobs=(state.realmEconomy?.jobs||[]).filter(job=>job.kind==='construction').map(job=>state.paused?{...job,status:'paused',reason:'Το παιχνίδι είναι σε παύση.'}:job),visible=jobs.length>0;
    this.refs.constructionHUD.hidden=!visible;
    this.root.classList.toggle('fg-has-construction',visible);
    if(!visible){this.constructionHUDSignature=null;return;}
    const expanded=this.constructionExpanded!==false;
    this.refs.constructionHUD.classList.toggle('is-expanded',expanded);
    this.refs.constructionToggle?.setAttribute?.('aria-expanded',String(expanded));
    this.setText('constructionCount',jobs.length>1?jobs.length:'');
    const first=constructionPresentation(jobs[0]);this.setText('constructionBrief',`${first.percent}% · ${first.time}`);
    if(this.refs.constructionBody)this.refs.constructionBody.hidden=!expanded;
    const signature=JSON.stringify(jobs.map(job=>{const d=constructionPresentation(job);return [job.id,job.label,job.campName,d.percent,d.eta,d.stage,d.reason,job.workersPresent,job.workRate,job.playerBuilding];}));
    if(signature!==this.constructionHUDSignature){this.constructionHUDSignature=signature;this.refs.constructionBody.innerHTML=jobs.map(job=>this.constructionTrackerMarkup(job)).join('');}
  }
  jobsMarkup(kind=null){
    const jobs=(this.state.realmEconomy?.jobs||[]).filter(job=>!kind||job.kind===kind);
    return `<section class="fg-job-section"><h3>${kind==='craft'?'Στον πάγκο των τεχνιτών':'Εργασίες σε εξέλιξη'}</h3>${jobs.length?`<div class="fg-job-list">${jobs.map(job=>this.jobMarkup(job)).join('')}</div>`:'<p class="fg-realm-empty">Δεν υπάρχουν ενεργές εργασίες.</p>'}</section>`;
  }
  organizationMarkup(){
    const camps=this.state.realmEconomy?.camps||[];
    return this.panelHeader('ΧΩΡΟΣ · ΤΡΟΦΟΔΟΣΙΑ · ΕΙΔΙΚΕΥΣΗ','Οργάνωση οχυρών',this.buildViews())+this.economyMarkup()+`
      <div class="fg-realm-section-heading"><p>Οι θέσεις περιορίζουν τα κτίρια μέσα στην αυλή. Ο πληθυσμός παραμένει απεριόριστος.</p>${this.guideButton('specialization')}</div>
      <div class="fg-specialization-camps">${camps.length?camps.map(c=>`<article class="fg-camp-organization"><header><span>${pictogram('fort')}</span><div><h3>${esc(c.name)}</h3><p>${esc(c.specializationLabel||'Χωρίς ειδίκευση')} · ${c.underConstruction?'Υπό κατασκευή':c.safe?'Ασφαλές':'Υπό απειλή'}</p></div><strong>${whole(c.slotsUsed)}${c.slotsReserved?` + ${whole(c.slotsReserved)}`:''} / ${whole(c.slotsTotal)}<small>χτισμένα + δεσμευμένα</small></strong></header><div class="fg-specialization-options">${(c.availableSpecializations||[]).map(spec=>`<button data-action="camp-specialization" data-camp="${esc(c.id)}" data-specialization="${esc(spec.id)}" class="${c.specialization===spec.id?'is-selected':''}" ${spec.enabled===false?'disabled':''}><span>${pictogram({production:'store',defense:'shield',training:'training'}[spec.id]||'camp')}</span><strong>${esc(spec.label)}</strong><p>${esc(spec.description)}</p>${spec.reason?`<small>${esc(spec.reason)}</small>`:''}</button>`).join('')}</div></article>`).join(''):'<p class="fg-realm-empty">Ολοκλήρωσε το πρώτο οχυρό για να οργανώσεις την παραγωγή και τις θέσεις του.</p>'}</div>`+this.jobsMarkup();
  }
  workshopMarkup(){
    const e=this.state.realmEconomy||{},r=this.resources(this.state.resources),recipes=e.recipes||[];
    return this.panelHeader('ΑΠΟ ΤΟ ΥΛΙΚΟ ΣΤΟΝ ΕΞΟΠΛΙΣΜΟ','Εργαστήριο',this.buildViews())+`
      <div class="fg-workshop-intro"><img src="./guide/craft.webp" alt="Τεχνίτης κατασκευάζει εξοπλισμό από πραγματικά υλικά"><div><h3>Ο εξοπλισμός πρέπει να κατασκευαστεί.</h3><p>Χρειάζεσαι ασφαλή χώρο εκπαίδευσης κοντά σου. Το κόστος αφορά όλους τους επιλεγμένους παραλήπτες.</p><strong>Παραλήπτης: ${esc(e.craftTargetsLabel||'Ο παίκτης')}</strong><button class="fg-text-button" data-action="craft-target-player">Επιλογή του παίκτη</button>${this.guideButton('craft','Δες τη διαδικασία')}</div></div>
      <div class="fg-workshop-bank">Διαθέσιμα ${this.costMarkup({food:r.food,reeds:r.reeds,pearls:r.pearls})}</div>
      <div class="fg-recipes">${recipes.length?recipes.map(recipe=>`<article class="fg-recipe"><span class="fg-recipe-icon">${pictogram(recipe.id?.includes('crest')?'crown':recipe.id?.includes('bracers')?'attack':'shield')}</span><h3>${esc(recipe.name)}</h3><p>${esc(recipe.description)}</p><div class="fg-recipe-facts"><span>Επίπεδο ${whole(recipe.requiredLevel||1)}</span><span>${whole(recipe.duration)}″ ανά τεμάχιο</span><span>${whole(recipe.targetCount)} παραλήπτες</span></div>${this.costMarkup(recipe.totalCost||recipe.cost)}<button class="fg-button fg-primary" data-action="craft-equipment" data-camp="${esc(e.currentCampId||'')}" data-recipe="${esc(recipe.id)}" ${recipe.enabled?'':'disabled'}>Κατασκευή ${icon('arrow')}</button>${recipe.reason?`<small class="fg-recipe-reason">${esc(recipe.reason)}</small>`:''}</article>`).join(''):'<p class="fg-realm-empty">Οι συνταγές θα εμφανιστούν όταν ανοίξει το εργαστήριο.</p>'}</div>`+this.jobsMarkup('craft');
  }
  tacticalGroupsMarkup(){
    const groups=this.state.tacticalGroups||[];if(!groups.length)return '';
    const selected=groups.find(g=>g.selected),commands=[['attack','Επίθεση'],['flank-left','Αριστερή πλευρά'],['flank-right','Δεξιά πλευρά'],...(this.state.creek?.enabled?[['scout','Ανίχνευση'],['distract','Αντιπερισπασμός'],['protect','Προστασία'],['retreat','Υποχώρηση']]:[]),['guard','Φρουρά'],['follow','Ακολουθήστε']];
    return `<section class="fg-tactical-groups"><div class="fg-realm-section-heading"><h3>Σταθερές ομάδες</h3>${this.guideButton('groups','Ομάδες και πλαγιοκόπηση')}</div><div class="fg-tactical-cards">${groups.map((g,i)=>`<article class="${g.selected?'is-selected':''}"><button class="fg-group-select" data-action="select-group" data-group="${esc(g.id)}" aria-pressed="${!!g.selected}">${key(i+4)}<strong>${esc(g.name||`Ομάδα ${i+1}`)}</strong><b>${whole(g.count??g.ids?.length)}<small>βάτραχοι</small></b></button><button class="fg-group-save" data-action="save-group" data-group="${esc(g.id)}" ${this.chosen().size?'':'disabled'}>Ανάθεση επιλογής ${key('Shift+'+(i+4))}</button></article>`).join('')}</div><div class="fg-group-orders"><span>${selected?esc(selected.name):'Επίλεξε μια αποθηκευμένη ομάδα'}</span>${commands.map(([command,label])=>`<button data-action="group-command" data-group="${esc(selected?.id||'')}" data-command="${command}" ${selected&&(selected.count??selected.ids?.length)>0?'':'disabled'}>${esc(label)}</button>`).join('')}</div></section>`;
  }
  realmMarkup(){
    if(this.state.creek?.enabled)return this.creekRealmMarkup();
    const realm=this.state.realm||{},regions=realm.regions||[],milestones=realm.milestones||[];
    return this.panelHeader('ΕΝΑΣ ΚΟΣΜΟΣ ΠΟΥ ΣΥΝΕΧΙΖΕΤΑΙ','Οι περιοχές του βασιλείου',this.tabs('realm'))+`
      <div class="fg-frontier-intro"><img src="./guide/frontier.webp" alt="Εκστρατεία βατράχων προς νέες λίμνες"><div><span class="fg-eyebrow">ΤΡΕΧΟΥΣΑ ΠΕΡΙΟΧΗ</span><h3>${esc(realm.name||'Η πρώτη λίμνη')}</h3><p>Οι κατακτήσεις και οι φρουρές αποθηκεύονται σε κάθε περιοχή. Οι συνοδοί ταξιδεύουν μαζί σου.</p>${realm.nextEvent?`<strong>${esc(realm.nextEvent.label)} · ${Math.ceil(Number(realm.nextEvent.seconds)||0)}″</strong>`:''}${this.guideButton('frontier','Πώς επεκτείνω το βασίλειο;')}</div></div>
      ${realm.background?.regions?`<p class="fg-realm-background">Στις ${whole(realm.background.regions)} άλλες περιοχές σου παραμένουν ${whole(realm.background.guards)} φρουροί. Οι ασφαλείς βάσεις παράγουν και τροφοδοτούν τους κατοίκους τους. Οι εργασίες και οι μάχες συνεχίζονται όταν επιστρέψεις στην αντίστοιχη λίμνη.</p>`:''}
      ${milestones.length?`<section class="fg-realm-milestones"><h3>Επόμενα ορόσημα</h3>${milestones.map(m=>`<div class="${m.done?'is-done':''}"><span>${pictogram(m.done?'check':m.icon||'camp')}</span><strong>${esc(m.label)}</strong><b>${whole(m.current)} / ${whole(m.target)}</b><progress value="${Math.min(Number(m.current)||0,Number(m.target)||1)}" max="${Number(m.target)||1}"></progress></div>`).join('')}</section>`:''}
      <div class="fg-region-list">${regions.map(region=>{const travel=region.travel||{},active=Boolean(region.active);return `<article class="fg-region ${active?'is-current':''}"><div class="fg-region-number">${String((Number(region.index)||0)+1).padStart(2,'0')}</div><div class="fg-region-copy"><small>${active?'ΒΡΙΣΚΕΣΑΙ ΕΔΩ':region.visited?'ΓΝΩΣΤΗ ΠΕΡΙΟΧΗ':'ΝΕΑ ΜΕΘΟΡΙΟΣ'}</small><h3>${esc(region.name)}</h3><div class="fg-region-metrics"><span>${whole(region.owned)} κάστρα</span><span>${whole(region.garrison)} φρουροί</span><span>${whole(region.enemies)} αντίπαλοι</span></div>${!active?`<ul class="fg-travel-requirements">${(travel.requirements||[]).map(req=>`<li class="${req.met?'is-met':''}">${icon(req.met?'check':'leaf')}${esc(req.label)}</li>`).join('')}</ul>`:''}</div><div class="fg-region-action">${active?'<span>Ενεργή περιοχή</span>':`${this.costMarkup(travel.cost)}<button class="fg-button ${travel.allowed?'fg-primary':''}" data-action="realm-travel" data-region="${Number(travel.targetIndex??region.index)}" ${travel.allowed?'':'disabled'}>${region.visited?'Επιστροφή':'Νέα αποστολή'} ${icon('arrow')}</button>${travel.reason?`<p>${esc(travel.reason)}</p>`:''}`}</div></article>`;}).join('')||'<p class="fg-realm-empty">Σταθεροποίησε την πρώτη σου βάση για να εξερευνήσεις τη μεθόριο.</p>'}</div>`;
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
    const creek=Boolean(this.state.creek?.enabled),stronghold=creek?null:world.stronghold;
    if(this.refs.mapStronghold){
      this.refs.mapStronghold.hidden=!stronghold;
      if(stronghold){this.setText('strongholdPopulation',whole(stronghold.population));this.refs.mapStronghold.title=`${stronghold.name||'Εχθρικό οχυρό'} · ${whole(stronghold.population)} παρόντες βάτραχοι${stronghold.population<stronghold.target?' · Ενισχύεται προς '+whole(stronghold.target):''}`;}
    }
    const bosses=visibleMapPredators(world).filter(p=>p.boss||p.isBoss),signature=String(creek)+bosses.map(p=>`${p.id||p.type}:${p.name||''}`).join('|');
    if(signature===this.mapBossSignature)return;this.mapBossSignature=signature;
    if(this.refs.mapBosses){this.refs.mapBosses.hidden=!bosses.length;this.refs.mapBosses.innerHTML=bosses.map(p=>`<span class="fg-map-boss" title="${esc(p.name||mapPredatorNames[p.type]||(creek?'Μεγάλος θηρευτής':'Αρχηγός'))}"><i>${pictogram(p.type||'boss')}${creek?'':pictogram('crown')}</i><b>${esc(mapPredatorNames[p.type]||(creek?'Θηρευτής':'Αρχηγός'))}</b></span>`).join('');}
    this.refs.minimapButton?.setAttribute('aria-label',`Χάρτης ${creek?'ρυακιού':'λίμνης'} · κλικ για μεγέθυνση${bosses.length?' · '+(creek?'Μεγάλοι θηρευτές: ':'Ενεργοί αρχηγοί: ')+bosses.map(p=>p.name||mapPredatorNames[p.type]||(creek?'Θηρευτής':'Αρχηγός')).join(', '):''}`);
  }
  drawMap(canvas,world={},large=false){
    const ctx=canvas.getContext('2d');if(!ctx)return;
    const w=canvas.width,h=canvas.height,creek=Boolean(this.state.creek?.enabled),home=this.creekHomeNest(),focused=Boolean(large&&home&&this.mapFocus==='nest');
    const player=world.player||{x:0,z:0,yaw:0},distance=home?Math.hypot((player.x||0)-home.x,(player.z||0)-home.z):0;
    const radius=focused?Math.min(world.radius||110,Math.max(24,distance/2+16)):world.radius||110;
    const origin=focused?{x:((player.x||0)+home.x)/2,z:((player.z||0)+home.z)/2}:{x:0,z:0};
    const camps=world.camps||this.state.camps||[],campById=new Map([...camps,...(this.state.camps||[])].map(c=>[String(c.id),c]));
    const hasPact=camp=>creek&&['coexist','respect'].includes(camp?.creekRelation);
    const scale=Math.min(w,h)/(radius*2.12);const cx=w/2,cy=h/2;
    const pos=p=>[cx+((p.x??p.position?.x??0)-origin.x)*scale,cy+((p.z??p.position?.z??0)-origin.z)*scale];
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
    for(const camp of camps){
      const [x,y]=pos(camp);const friendly=['player','ally','friendly',0].includes(camp.team);const neutral=camp.team==='neutral'||camp.team==null;
      if(this.state.creek?.enabled||camp.natural){
        if(camp.destroyed)continue;
        const pact=hasPact(camp);
        ctx.fillStyle=friendly?'#9bc89088':pact?'#79c4be88':neutral?'#b8ad8a88':'#d28e6588';ctx.strokeStyle=friendly?'#d5efb4':pact?'#a8ded8':neutral?'#d8cca4':'#ecb18c';ctx.lineWidth=large?2:1.5;
        ctx.beginPath();ctx.ellipse(x,y,large?12:9,large?8:6,-.4,0,Math.PI*2);ctx.fill();ctx.stroke();
        if(large&&camp.name){ctx.font='15px system-ui';ctx.textAlign='center';ctx.fillStyle='#dce4cb';ctx.fillText(camp.name,x,y+26);}
        continue;
      }
      ctx.strokeStyle=friendly?'#b8e89b':neutral?'#b6a9da':'#e89470';ctx.fillStyle=friendly?'#324e35':neutral?'#332f45':'#51392e';ctx.lineWidth=large?2:1.5;
      const stronghold=!camp.destroyed&&Boolean(camp.isStronghold||(world.stronghold&&camp.id===world.stronghold.id)),s=stronghold?17:12,emblem=stronghold?this.mapSymbolImage('fort'):this.emblemImage(friendly?'ally':neutral?'neutral':camp.originalTeam||camp.team);
      if(stronghold){ctx.fillStyle='#482f23';ctx.strokeStyle='#f1b679';ctx.lineWidth=large?3:2.5;ctx.beginPath();ctx.moveTo(x-s-3,y-s);ctx.lineTo(x-s-3,y+s+3);ctx.lineTo(x+s+3,y+s+3);ctx.lineTo(x+s+3,y-s);ctx.lineTo(x+s-2,y-s);ctx.lineTo(x+s-2,y-s-5);ctx.lineTo(x+3,y-s-5);ctx.lineTo(x+3,y-s);ctx.lineTo(x-3,y-s);ctx.lineTo(x-3,y-s-5);ctx.lineTo(x-s+2,y-s-5);ctx.lineTo(x-s+2,y-s);ctx.closePath();ctx.fill();ctx.stroke();}
      if(emblem.complete&&emblem.naturalWidth)ctx.drawImage(emblem,x-s,y-s*1.1,s*2,s*2.2);else{ctx.beginPath();ctx.moveTo(x,y-s);ctx.lineTo(x+s,y-s*.5);ctx.lineTo(x+s*.8,y+s*.5);ctx.lineTo(x,y+s);ctx.lineTo(x-s*.8,y+s*.5);ctx.lineTo(x-s,y-s*.5);ctx.closePath();ctx.fill();ctx.stroke();}
      if(large&&camp.name){ctx.font='13px system-ui';ctx.textAlign='center';ctx.fillStyle=stronghold?'#f1c696':'#c9d0ba';ctx.fillText(camp.name,x,y+s+16);if(stronghold){ctx.font='11px system-ui';ctx.fillText(`Οχυρό · ${whole(world.stronghold?.population??camp.garrisonCount)} βάτραχοι`,x,y+s+31);}}
    }
    if(this.state.creek?.enabled){
      for(const discovery of this.state.creek.discoveries||[]){
        if(!discovery.found)continue;const[x,y]=pos(discovery);ctx.strokeStyle='#a8d8c6';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,large?8:5,0,Math.PI*2);ctx.stroke();
        if(large){ctx.font='15px system-ui';ctx.textAlign='center';ctx.fillStyle='#d1ebe3';ctx.fillText(discovery.label||'',x,y-14);}
      }
      for(const drop of this.state.creek.dropped||[]){
        const[x,y]=pos(drop);ctx.strokeStyle='#f5d78f';ctx.fillStyle='#473c24';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,large?10:7,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#fff0be';ctx.font=`bold ${large?15:12}px system-ui`;ctx.textAlign='center';ctx.fillText('E',x,y+4);
      }
    }
    const drawDots=(arr,color,size)=>{if(!arr?.length)return;ctx.fillStyle=color;ctx.beginPath();for(const p of arr){if(p.dead)continue;const[x,y]=pos(p);ctx.moveTo(x+size,y);ctx.arc(x,y,size,0,Math.PI*2);}ctx.fill();};
    const pactFrogs=creek?(world.enemies||[]).filter(f=>hasPact(campById.get(String(f.home)))):[];
    drawDots(creek?(world.enemies||[]).filter(f=>!hasPact(campById.get(String(f.home)))):world.enemies,'#df936f',large?3:3.2);
    drawDots(pactFrogs,'#79c4be',large?3:3.2);drawDots(world.allies,'#94ca8c',large?3:3.2);
    for(const predator of visibleMapPredators(world)){
      const [rawX,rawY]=pos(predator),boss=Boolean(predator.boss||predator.isBoss),s=boss?(large?17:17):(large?8:6);
      const x=clamp(rawX,s+4,w-s-4),y=clamp(rawY,s+15,h-s-4);
      if(boss){
        ctx.fillStyle='#39271a';ctx.strokeStyle='#ffdb79';ctx.lineWidth=large?3:2.5;
        ctx.beginPath();ctx.arc(x,y,s,0,Math.PI*2);ctx.fill();ctx.stroke();
        const species=this.mapSymbolImage(predator.type||'boss'),crown=creek?null:this.mapSymbolImage('crown');
        if(species.complete&&species.naturalWidth)ctx.drawImage(species,x-s+3,y-s+3,(s-3)*2,(s-3)*2);
        else{ctx.fillStyle='#ffdf87';ctx.font=`bold ${s}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(({heron:'Ε',snake:'Ν',fish:'Ψ'})[predator.type]||'!',x,y);ctx.textBaseline='alphabetic';}
        if(crown?.complete&&crown.naturalWidth)ctx.drawImage(crown,x-s*.6,y-s-13,s*1.2,16);
        else if(!creek){ctx.strokeStyle='#ffdb79';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-7,y-s-2);ctx.lineTo(x-9,y-s-9);ctx.lineTo(x-3,y-s-6);ctx.lineTo(x,y-s-12);ctx.lineTo(x+3,y-s-6);ctx.lineTo(x+9,y-s-9);ctx.lineTo(x+7,y-s-2);ctx.stroke();}
        if(large){ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.fillStyle='#ffdf87';ctx.fillText(predator.name||mapPredatorNames[predator.type]||'Αρχηγός',x,y+s+17);}
      }else{ctx.save();ctx.translate(x,y);ctx.rotate(Math.PI/4);ctx.fillStyle=predator.hunting?'#ff6953':'#b47b67';ctx.fillRect(-s,-s,s*2,s*2);ctx.restore();}
    }
    const[px,py]=pos(player);
    if(home){
      const[x,y]=pos(home),nearPlayer=Math.hypot(x-px,y-py)<42,size=large?18:15;
      const mx=clamp(x+(nearPlayer?size+13:0),size+4,w-size-4),my=clamp(y-size-10,size+4,h-size-4);
      ctx.strokeStyle=focused?'#f7efb6':'#d6e8a9';ctx.lineWidth=focused?3:2;
      ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(mx,my+size);ctx.stroke();
      if(focused){ctx.beginPath();ctx.arc(mx,my,size+7,0,Math.PI*2);ctx.stroke();}
      ctx.fillStyle=home.visited?'#356846':'#263f31';ctx.beginPath();ctx.arc(mx,my,size,0,Math.PI*2);ctx.fill();ctx.stroke();
      const leaf=this.mapSymbolImage('leaf');
      if(leaf.complete&&leaf.naturalWidth)ctx.drawImage(leaf,mx-size+3,my-size+3,(size-3)*2,(size-3)*2);
      else {ctx.strokeStyle='#e4efba';ctx.beginPath();ctx.moveTo(mx-size*.5,my+size*.4);ctx.lineTo(mx,my-size*.45);ctx.lineTo(mx+size*.5,my+size*.4);ctx.stroke();}
      if(large){ctx.font=`600 ${focused?22:18}px system-ui`;ctx.textAlign='center';ctx.fillStyle='#edf3ca';ctx.fillText('Καταφύγιο',mx,my-size-12);}
      if(focused&&Number.isFinite(home.entrance?.x)&&Number.isFinite(home.entrance?.z)){
        const[ex,ey]=pos(home.entrance);ctx.fillStyle='#efcf8c';ctx.strokeStyle='#132b20';ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(ex,ey,6,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.font='600 20px system-ui';ctx.fillStyle='#f5dfad';ctx.fillText('Είσοδος',ex,ey+25);
      }
    }
    ctx.strokeStyle='rgba(199,235,165,.16)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(px,py,18*scale,0,Math.PI*2);ctx.stroke();
    ctx.save();ctx.translate(px,py);ctx.rotate(Math.PI-(player.yaw||0));ctx.fillStyle='#e2f4bc';ctx.strokeStyle='#142a20';ctx.lineWidth=2;const sz=large?9:13;ctx.beginPath();ctx.moveTo(0,-sz);ctx.lineTo(sz*.65,sz*.7);ctx.lineTo(0,sz*.35);ctx.lineTo(-sz*.65,sz*.7);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
    if(large){for(const region of world.mapRegions||[]){if(!region.name)continue;const[x,y]=pos(region);ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillStyle='#b6c6a5';ctx.fillText(region.name,x,y+(region.radius||20)*scale*.6);}ctx.font='12px system-ui';ctx.textAlign='left';ctx.fillStyle='#829b8c';ctx.fillText('Κάθε τετράγωνο: 20 μονάδες',20,h-20);}
  }
  toast(message,kind='info'){
    const item=typeof message==='object'&&message?message:{detail:String(message),tone:kind},detail=this.presentationText(item.detail||item.message||''),tone=item.tone||kind;
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
    this.layoutDockedPanels();
  }
  destroy(){this.abort.abort();clearTimeout(this.saveTimer);cancelAnimationFrame(this.dragVisibilityFrame);cancelAnimationFrame(this.layoutFrame);this.layoutObserver?.disconnect();this.root.remove();}
}

Object.assign(GameUI.prototype,creekUIMethods);


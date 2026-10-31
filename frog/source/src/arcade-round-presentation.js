// Presentation reads simulation time; it never starts a second game timer.
import {RULES} from './arcade-model.js';
import {installObjectiveReader} from './arcade-objective-reader.js';
const WARMUP_SECONDS=RULES.introSeconds;
export function formatRoundClock(seconds){const n=Math.max(0,Math.floor((Number(seconds)||0)+1e-7));return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`;}
export function roundPresentation(state){
 const training=state.training===true,warmup=!training&&state.phase==='countdown',remaining=warmup?Math.max(0,Math.ceil((Number(state.intro)||0)-1e-8)):0;
 const age=warmup?Math.max(0,WARMUP_SECONDS-(Number(state.intro)||0)):0;
 const seconds=warmup?remaining:Math.max(0,(Number(state.time)||0)-(training?0:WARMUP_SECONDS));
 return {training,warmup,remaining,seconds,clock:formatRoundClock(seconds),label:training?'ΕΞΑΣΚΗΣΗ':warmup?'ΜΑΧΗ ΣΕ':'ΧΡΟΝΟΣ ΑΓΩΝΑ',notice:false,goals:false,countdown:warmup&&remaining>0&&remaining<=5};
}
const OBJECTIVES=[
 {id:'collect',title:'Γέμισε με μύγες',copy:'Πλησίασε σμήνη ή την αποθήκη σου.',alt:'Πράσινος βάτραχος πιάνει μύγα με τη γλώσσα του',position:'0% 0%'},
 {id:'fight',title:'Βγάλε αντιπάλους KO',copy:'Ρίξε μύγες και πλησίασε για κλωτσιά.',alt:'Βάτραχος ρίχνει μύγα σε ζαλισμένο αντίπαλο',position:'100% 0%'},
 {id:'sabotage',title:'Ρίξε τις 2 αποθήκες',copy:'Μπες στην εχθρική αποθήκη.',alt:'Βάτραχος αδειάζει τα καλάθια μυγών σε εχθρική αποθήκη',position:'0% 100%'},
 {id:'defend',title:'Φύλαξε τη δική σου',copy:'Αν χαθεί η αποθήκη σου, χάνεις.',alt:'Βάτραχος προστατεύει το σπίτι του και τα αποθέματα μυγών',position:'100% 100%'},
];
export function installRoundPresentation(game){
 const doc=game.ui.ownerDocument,node=(tag,css,text)=>{const e=doc.createElement(tag);if(css)e.className=css;if(text!==undefined)e.textContent=text;return e;};
 game.ui.classList.add('has-round-presentation');
 function art(index,css=''){const e=node('span','objective-art '+css);e.setAttribute('role','img');e.setAttribute('aria-label',OBJECTIVES[index].alt);e.dataset.scene=OBJECTIVES[index].id;e.style.backgroundPosition=OBJECTIVES[index].position;e.style.backgroundImage='url("./art/round-objectives.png")';return e;}
 function cards(){const grid=node('div','objective-cards');for(const [i,item] of OBJECTIVES.entries()){const card=node('article','objective-card');card.append(art(i),node('h3',null,item.title),node('p',null,item.id==='sabotage'?(game.touch?`Κράτα ΚΑΤΑΣΤΡΟΦΗ για ${RULES.sabotageSeconds}″ μέσα στην αποθήκη.`:`Μπες μέσα και κράτα E για ${RULES.sabotageSeconds}″.`):item.copy));grid.append(card);}return grid;}
 const brand=node('h1','game-brand');brand.setAttribute('aria-label','Βαλτομαχίες');
 const titleArt=node('img','game-title-art');titleArt.src='./art/menu-title-cartoon.png';titleArt.alt='';titleArt.width=2172;titleArt.height=724;titleArt.decoding='async';titleArt.fetchPriority='high';titleArt.draggable=false;const crop=node('span','game-title-crop');crop.setAttribute('aria-hidden','true');crop.append(titleArt);brand.append(crop);
 const menu=game.$('menu-main');menu.classList.add('with-game-brand');menu.prepend(brand);
 const goalsButton=node('button','menu-utility-button objectives-button');goalsButton.id='objectives-button';goalsButton.type='button';goalsButton.append(art(0),node('span',null,'ΠΩΣ ΠΑΙΖΕΤΑΙ'));menu.append(goalsButton);
 const panel=node('section','objectives-panel');panel.id='objectives-panel';panel.hidden=true;panel.setAttribute('aria-labelledby','objectives-heading');const heading=node('h2',null,'Μείνε ο τελευταίος στον βάλτο');heading.id='objectives-heading';const back=node('button','objectives-back','ΠΙΣΩ ΣΤΟ ΜΕΝΟΥ');back.id='objectives-back';back.type='button';panel.append(node('span','presentation-kicker','ΟΙ ΣΤΟΧΟΙ ΣΟΥ'),heading,cards(),back);game.$('arcade-menu').append(panel);
 function openGoals(){if(game.running)game.pause();game.roundUI?.panel&&(game.roundUI.panel.hidden=true);game.$('settings-panel').hidden=true;game.$('result-panel').hidden=true;menu.hidden=true;panel.hidden=false;back.focus({preventScroll:true});}
 function closeGoals(){panel.hidden=true;if(game.mode==='result')game.$('result-panel').hidden=false;else menu.hidden=false;goalsButton.focus({preventScroll:true});}
 goalsButton.onclick=openGoals;back.onclick=closeGoals;
 panel.addEventListener('keydown',e=>{if(e.code==='Escape'){e.preventDefault();e.stopPropagation();closeGoals();}});
 const clock=node('div','match-clock');clock.id='match-clock';clock.hidden=true;clock.setAttribute('role','timer');clock.setAttribute('aria-live','off');const clockFace=node('span','clock-face');clockFace.setAttribute('aria-hidden','true');clockFace.innerHTML='<i></i>';const label=node('span','match-clock-label'),digits=node('strong','match-clock-digits','0:20');clock.append(clockFace,label,digits);game.ui.append(clock);
 const notice=node('section','warmup-notice');notice.id='warmup-notice';notice.hidden=true;notice.setAttribute('role','status');const noticeCopy=node('div','warmup-notice-copy'),duration=node('strong','warmup-duration','20″');noticeCopy.append(node('span','presentation-kicker','ΠΡΙΝ ΑΠΟ ΤΗ ΜΑΧΗ'),node('h2',null,'ΠΡΟΘΕΡΜΑΝΣΗ'),node('p',null,'Δοκίμασε κινήσεις. Ετοιμάσου για τον γύρο!'));notice.append(art(0,'warmup-hero'),noticeCopy,duration);game.ui.append(notice);
 const warmupGoals=node('section','warmup-goals');warmupGoals.id='warmup-goals';warmupGoals.hidden=true;warmupGoals.setAttribute('aria-label','Στόχοι του γύρου');warmupGoals.append(node('h2',null,'Η αποστολή σου'),cards());game.ui.append(warmupGoals);
 const reader=installObjectiveReader(game,warmupGoals);
 let lastKey='',pose=roundPresentation(game.state);
 function update(){
  pose=roundPresentation(game.state);reader.update(pose);const visible=(game.running||game.mode==='objectives')&&!game.layoutEditing;clock.hidden=!visible;notice.hidden=!game.running||!visible||!pose.notice;
  const key=`${pose.clock}|${pose.label}|${visible}`;if(lastKey!==key){label.textContent=pose.label;digits.textContent=pose.warmup?`${pose.remaining}″`:pose.clock;clock.dataset.phase=pose.warmup?'warmup':pose.training?'training':'battle';clock.setAttribute('aria-label',`${pose.label} ${pose.warmup?pose.remaining+" δευτερόλεπτα":pose.clock}`);duration.textContent=`${pose.remaining}″`;lastKey=key;}
  // CSS animations are suspended while the menu is hidden, in Settings or in a background tab.
  const brandActive=!doc.hidden&&!menu.hidden&&!game.$('arcade-menu').hidden;brand.classList.toggle('is-alive',brandActive);
 }
 return {update,openGoals,closeGoals,openReader:reader.open,minimizeReader:reader.minimize,inspect:()=>({...pose,...reader.inspect(),clockVisible:!clock.hidden,noticeVisible:!notice.hidden,goalsVisible:!warmupGoals.hidden})};
}

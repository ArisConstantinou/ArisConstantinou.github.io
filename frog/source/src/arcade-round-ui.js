import {accuracy,matchStandings,readLeaderboard,saveLeaderboardRound,SCORE_RULE} from './arcade-leaderboard.js';
import {actorColour} from './arcade-colours.js';
import {installRoundPresentation} from './arcade-round-presentation.js';
export function countdownValue(state){return !state.training&&state.phase==='countdown'&&state.intro>0&&state.intro<=5?String(Math.max(1,Math.ceil(state.intro-1e-8))):null;}
const clock=seconds=>`${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;
export function installRoundUI(game){
 const doc=game.ui.ownerDocument,el=(tag,text,className)=>{const node=doc.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;};
 const overlay=el('div',undefined,'battle-countdown');overlay.id='battle-countdown';overlay.hidden=true;overlay.setAttribute('role','status');overlay.setAttribute('aria-live','polite');overlay.setAttribute('aria-atomic','true');
 const number=el('strong','5');overlay.append(el('span','Η ΜΑΧΗ ΞΕΚΙΝΑ'),number);game.ui.append(overlay);
 const presentation=installRoundPresentation(game);
 const results=el('div',undefined,'results-leaderboard');game.$('result-copy').after(results);
 const historyButton=el('button','ΡΕΚΟΡ ΣΥΣΚΕΥΗΣ','small-result-button');historyButton.type='button';const actions=el('div',undefined,'results-actions');actions.append(game.$('replay-button'),historyButton,game.$('result-settings'));game.$('result-panel').append(actions);
 const panel=el('section',undefined,'leaderboard-panel');panel.id='leaderboard-panel';panel.hidden=true;panel.setAttribute('aria-label','Πίνακες κατάταξης');
 const title=el('h2','Κατάταξη'),tabs=el('div',undefined,'leaderboard-tabs'),matchTab=el('button','ΑΓΩΝΑΣ'),recordsTab=el('button','ΡΕΚΟΡ ΣΥΣΚΕΥΗΣ'),content=el('div',undefined,'leaderboard-content'),back=el('button','ΠΙΣΩ','leaderboard-back');
 for(const button of [matchTab,recordsTab,back])button.type='button';tabs.append(matchTab,recordsTab);panel.append(title,tabs,content,back);game.$('arcade-menu').append(panel);
 let round=null,last=null,tab='match',anchorKey='';
 function anchorTimer(){
  const key=`${game.w}:${game.h}:${game.touch}`;if(key===anchorKey)return;
  const map=game.$('minimap')?.getBoundingClientRect();if(!map?.width)return;
  const bottoms=['ammo-card','base-status','pause-button'].map(id=>game.$(id)?.getBoundingClientRect().bottom||0);
  game.ui.style.setProperty('--start-timer-right',`${Math.max(12,game.w-map.left+8)}px`);
  game.ui.style.setProperty('--start-timer-top',`${Math.max(70,...bottoms)+8}px`);anchorKey=key;
 }
 function makeTable(rows,historical=false){
  const wrapper=el('div',undefined,'leaderboard-table-wrap'),table=el('table',undefined,'leaderboard-table'),thead=el('thead'),tr=el('tr');table.setAttribute('aria-label',historical?'Καλύτεροι ολοκληρωμένοι γύροι στη συσκευή':'Κατάταξη αγώνα');
  for(const [label,css] of [['#'],['Βάτραχος'],['Πόντοι'],['KO','wide-stat'],['Θάνατοι','wide-stat'],['Ακρίβεια']])tr.append(el('th',label,css));thead.append(tr);table.append(thead);const body=el('tbody');
  rows.forEach((row,index)=>{
   const line=el('tr',undefined,row.id==='player'?'is-player':'');line.append(el('td',historical?String(index+1):row.rank===null?'—':`${row.rank}${row.tied?'=':''}`,'rank-cell'));
   const name=el('td'),strong=el('strong',row.name);if(!historical)strong.style.setProperty('--frog-colour',actorColour(game.settings,row.id));name.append(strong);
   const detail=el('small'),mobile=el('span',`KO ${row.kos} · Θάνατοι ${row.deaths} · `,'mobile-stats');detail.append(mobile,doc.createTextNode(`${row.shotHits}/${row.shots} βολές`));name.append(detail);
   if(row.status)name.append(el('small',row.status,'entry-status'));line.append(name,el('td',String(row.points),'points-cell'),el('td',String(row.kos),'wide-stat'),el('td',String(row.deaths),'wide-stat'),el('td',row.accuracy===null?'—':`${row.accuracy}%`));body.append(line);
  });table.append(body);wrapper.append(table);return wrapper;
 }
 function paintMatch(target){
  target.replaceChildren();if(!game.state?.scoreboard){target.append(el('p','Ξεκίνα έναν γύρο για να εμφανιστεί η κατάταξη.','leaderboard-empty'));return;}
  const rows=matchStandings(game.state,game.settings.playerName);target.append(makeTable(rows),el('p',SCORE_RULE,'score-rule'));
  if(game.state.status==='lost'&&rows.filter(row=>row.status==='Ενεργή αποθήκη').length>1)target.append(el('p','Η κατάταξη καταγράφεται στο τέλος του δικού σου γύρου. Οι ενεργές αποθήκες ισοβαθμούν.','leaderboard-note'));
  if(game.state.scoreboardSince>0)target.append(el('p','Στατιστικά από τη συνέχεια αυτού του παλαιότερου γύρου. Τα νέα πλήρη ρεκόρ ξεκινούν με νέο γύρο.','leaderboard-note'));
 }
 function paintRecords(){
  content.replaceChildren();let store;try{store=readLeaderboard(globalThis.localStorage);}catch{store={ok:false,records:[]};}
  content.append(el('p','Καλύτεροι ολοκληρωμένοι γύροι · Σε αυτή τη συσκευή','leaderboard-note'));
  if(!store.ok){content.append(el('p','Τα αποθηκευμένα ρεκόρ δεν είναι διαθέσιμα. Δεν αντικαταστάθηκαν.','leaderboard-empty'));return;}
  if(!store.records.length){content.append(el('p','Ολοκλήρωσε έναν κανονικό γύρο για το πρώτο σου ρεκόρ. Η εξάσκηση δεν καταχωρίζεται.','leaderboard-empty'));return;}
  const rows=store.records.map(record=>({...record.stats,id:record.id,name:record.name,points:record.points,accuracy:accuracy(record.stats),status:`${record.won?'Νίκη':'Ήττα'} · ${clock(record.duration)} · ${new Date(record.at).toLocaleDateString('el-GR')}`}));content.append(makeTable(rows,true),el('p',SCORE_RULE,'score-rule'));
 }
 function paint(){matchTab.classList.toggle('selected',tab==='match');recordsTab.classList.toggle('selected',tab==='records');matchTab.setAttribute('aria-pressed',String(tab==='match'));recordsTab.setAttribute('aria-pressed',String(tab==='records'));if(tab==='match')paintMatch(content);else paintRecords();}
 function open(){if(game.running)game.pause();game.$('menu-main').hidden=true;game.$('result-panel').hidden=true;game.$('settings-panel').hidden=true;panel.hidden=false;tab=game.mode==='title'?'records':'match';paint();back.focus({preventScroll:true});}
 function close(){panel.hidden=true;if(game.mode==='result')game.$('result-panel').hidden=false;else game.$('menu-main').hidden=false;}
 matchTab.onclick=()=>{tab='match';paint();};recordsTab.onclick=()=>{tab='records';paint();};back.onclick=close;historyButton.onclick=()=>{open();tab='records';paint();};
 function update(){
  presentation.update();
  if(round!==game.state){round=game.state;last=null;}
  const visible=game.running&&!game.layoutEditing,value=visible?countdownValue(game.state):null;overlay.hidden=true;
  const plainWarmup=!game.state.training&&game.state.phase==='countdown'&&!game.state.actors[0].ko&&!game.layoutEditing,status=game.$('round-status');status.classList.toggle('plain-warmup',plainWarmup);
  
  if(plainWarmup){status.hidden=true;if(!value)game.$('round-time').textContent=String(Math.max(1,Math.ceil(game.state.intro-1e-8)));}
  if(value===last)return;last=value;if(!value)return;
  number.textContent=value;overlay.setAttribute('aria-label',`Η μάχη ξεκινά σε ${value}`);game.sound.play('countdown');
  if(!overlay.hidden&&!globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches)number.animate?.([{transform:'scale(1.35)',opacity:1},{transform:'scale(.94)',opacity:1,offset:.7},{transform:'scale(1)',opacity:1}],{duration:350,easing:'cubic-bezier(.2,.8,.2,1)'});
 }
 function battle(){round=game.state;last=null;game.sound.play('battle');update();}
 function showResults(){
  game.sound.stopMusic?.();paintMatch(results);const rows=matchStandings(game.state,game.settings.playerName),you=rows.find(row=>row.id==='player');
  game.$('result-title').textContent=game.state.status==='won'?'ΝΙΚΗ!':'ΤΕΛΟΣ ΓΥΡΟΥ';game.$('result-copy').textContent=`${you?.rank??'—'}η θέση · ${you?.points??0} πόντοι · ${clock(game.state.time)} γύρου`;
  try{const saved=saveLeaderboardRound(globalThis.localStorage,game.state,game.settings.playerName);if(saved.reason==='storage')results.append(el('p','Το ρεκόρ δεν αποθηκεύτηκε στη συσκευή.','leaderboard-note'));}catch{}
 }
 return {update,battle,showResults,open,close,panel,presentation};
}

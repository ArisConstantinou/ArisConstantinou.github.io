export function installSoundPanel({audio,enable}){
  const panel=document.createElement('section');panel.id='soundPanel150';
  panel.innerHTML=`<h3>Ήχος και φωνές</h3><p class="audio-state" aria-live="polite"></p><div class="audio-tests"><button data-clip="captain1">Καπετάνιος</button><button data-clip="rock">Πλήρωμα</button><button data-clip="panic">Επιβάτης</button><button data-effect="horn">Κόρνα</button></div><label>Φωνές <input data-volume="voices" type="range" min="0" max="100"></label><label>Θάλασσα / μηχανές <input data-volume="environment" type="range" min="0" max="100"></label><label>Ηχητικά εφέ <input data-volume="effects" type="range" min="0" max="100"></label><p class="audio-note">Τα έτοιμα ελληνικά MP3 είναι συνθετικές φωνές. Οι δικές σου ανθρώπινες ηχογραφήσεις έχουν προτεραιότητα.</p><button class="audio-report">Αντιγραφή διάγνωσης</button>`;
  const modal=document.querySelector('#pauseScreen .modal');modal.insertBefore(panel,document.getElementById('restart'));
  const style=document.createElement('style');style.textContent=`#pauseScreen .modal{max-height:90dvh;overflow-y:auto}#soundPanel150{padding:12px 0;margin:10px 0;border-top:1px solid #778d9566;text-align:left}#soundPanel150 h3{font-size:15px;margin:0 0 5px}#soundPanel150 .audio-state{font-size:11px;line-height:1.5;letter-spacing:0}#soundPanel150 .audio-tests{display:flex;flex-wrap:wrap;gap:6px;margin:9px 0}#soundPanel150 button,#introAudioTest{min-height:40px;border:1px solid #8daab466;background:#173342;color:#fff;padding:7px 10px;border-radius:7px;font-size:11px;touch-action:manipulation}#soundPanel150 label{display:flex;align-items:center;justify-content:space-between;font-size:12px;margin:6px 0}#soundPanel150 input{max-width:50%;height:28px}#soundPanel150 .audio-note{font-size:10px;line-height:1.5;opacity:.75}#introAudioTest{margin:7px 0}#soundPanel150 button:active,#introAudioTest:active{background:#355766}`;document.head.append(style);
  const intro=document.createElement('button');intro.id='introAudioTest';intro.type='button';intro.textContent='🔊 Δοκιμή ήχου';document.getElementById('introSound').insertAdjacentElement('afterend',intro);
  const status=panel.querySelector('.audio-state');let pending=0;
  function update(){
    const s=audio.voiceStatus();
    status.textContent=(!s.enabled?'Σίγαση':s.contextState!=='running'?'Ο ήχος περιμένει άγγιγμα — πάτησε μία δοκιμή.':`Ενεργός ήχος · ${s.preRenderedGreekLoaded}/18 ελληνικές φωνές · ${s.effectsLoaded}/2 ανθρώπινα εφέ`)+(s.failed?' · Αποτυχία: '+Object.keys(s.errors).join(', '):'');
    for(const i of panel.querySelectorAll('[data-volume]'))if(document.activeElement!==i)i.value=Math.round(s.volumes[i.dataset.volume]*100);
  }
  async function preview(id,effect){
    const ticket=++pending;enable();audio.stopVoice();if(audio.voiceStatus().volumes.voices===0)audio.setVolume('voices',.95);
    const starting=audio.start();intro.textContent='Φόρτωση ήχου…';
    await starting;
    if(effect){audio.horn();}else{await audio.loadVoices();if(ticket===pending)audio.voice(id,{priority:4});}
    intro.textContent='🔊 Δοκιμή ήχου';update();
  }
  intro.onclick=()=>preview('captain1');
  panel.querySelectorAll('[data-clip]').forEach(b=>b.onclick=()=>preview(b.dataset.clip));
  panel.querySelector('[data-effect]').onclick=()=>preview(null,true);
  panel.querySelectorAll('[data-volume]').forEach(i=>i.oninput=()=>audio.setVolume(i.dataset.volume,Number(i.value)/100));
  panel.querySelector('.audio-report').onclick=async()=>{const data=JSON.stringify(audio.voiceStatus(),null,2);try{await navigator.clipboard.writeText(data);status.textContent='Η διάγνωση αντιγράφηκε.';}catch{status.textContent=data;}};
  setInterval(()=>{if(!document.getElementById('pauseScreen').classList.contains('hidden'))update();},600);update();
}

import {flightState} from './physics.js?v=0.6.0';
import {threatLabel} from './combat052.js?v=0.5.2';
export function pilotFeedback(game){
 const a=game.player,b=a.balloon,state=flightState(a,a.controlUp||0);
 const command=(a.controlUp||0)>0?'↑ ΕΝΤΟΛΗ ΑΝΟΔΟΥ':(a.controlUp||0)<0?'↓ ΕΝΤΟΛΗ ΚΑΘΟΔΟΥ':'↔ ΟΥΔΕΤΕΡΟ / ΦΡΕΝΟ';
 let reason='Άφησε ↑ / ↓ για σταθεροποίηση.',warning=false;
 if(!a.alive){reason='Επιστροφή στην τελευταία προσγείωση.';warning=true;}
 else if(!b){reason=a.grounded?'Στο έδαφος · ΜΕΙΓΜΑ / B για νέο μπαλόνι.':(a.lastBalloonEvent||'ΧΩΡΙΣ ΜΠΑΛΟΝΙ')+' · ΕΛΕΥΘΕΡΗ ΠΤΩΣΗ';warning=!a.grounded;}
 else if(a.envelopeContact){reason='ΕΜΠΟΔΙΟ · απομακρύνσου από τη γεωμετρία.';warning=true;}
 else if(b.exhausted>0){reason='ΕΞΑΝΤΛΗΣΗ · '+Math.ceil(12-b.exhausted)+' s εφεδρείας · προσγειώσου!';warning=true;}
 else if(state.reserve<0){reason='ΥΠΕΡΦΟΡΤΩΣΗ · '+(-state.reserve).toFixed(1)+' kg πάνω από την άνωση.';warning=true;}
 else if(b.life<20){reason='ΠΡΟΣΓΕΙΩΣΟΥ · απομένουν '+Math.ceil(b.life)+' s πτήσης.';warning=true;}
 else if(b.integrity/b.maxIntegrity<.3){reason='ΧΑΜΗΛΗ ΑΝΤΟΧΗ ΜΕΜΒΡΑΝΗΣ · απέφυγε τα πυρά.';warning=true;}
 const box=document.getElementById('pilotStatus');box.classList.toggle('warning',warning);
 document.getElementById('pilotCommand').textContent=command;
 document.getElementById('pilotReason').textContent=reason;
 document.getElementById('localThreat').textContent=threatLabel(game);
 return state;
}

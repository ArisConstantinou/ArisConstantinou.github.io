export const CONFIG=Object.freeze({world:'single-courtyard',fullWorld:false,baselineSeconds:15,maximumSeconds:90,enemyCount:6,enemyHealth:'normal',playerHealth:'unlimited',torchFlames:true,activeTorchLights:true,physics:true,props:true,statues:true,animations:true,enemyAI:'held during baseline; normal during combat',autoFire:true,autoStomp:true,staticShadowCache:true,batchShadowCache:false,muted:true,navigationExperiment:false});
export const FINDINGS=Object.freeze([
 {label:'Ένα δωμάτιο μόνο',measurement:'45 s · late 45,8 FPS',result:'Δεν αρκούσε για 60'},
 {label:'Ορατές φλόγες OFF',measurement:'45,6 → 45,6 FPS',result:'No effect · φλόγες ON'},
 {label:'Ένταση point lights = 0',measurement:'45,5 → 48,7 FPS',result:'Μερικό κέρδος'},
 {label:'Όλα τα point lights εκτός λίστας',measurement:'44,6 → 60,0 · επανάληψη 56,4 FPS',result:'Όφελος, όχι σταθερό 60 · ενεργά φώτα ON τώρα'},
 {label:'Μόνο μηδενικά lights εκτός',measurement:'45,9 → 59,9 · επανάληψη 51,5 FPS',result:'Όφελος, όχι αρκετό μόνο του'},
 {label:'Frame diagnostics OFF',measurement:'51,6 → 52,5 FPS',result:'No effect · καταγραφή ON'},
 {label:'Static shadow cache OFF',measurement:'51,6 → 45,5 FPS',result:'Χειρότερα · cache ON'},
 {label:'Πάγωμα παραγωγής σκιών',measurement:'51,6 → 60,0 · επιβεβαίωση 60,0 FPS',result:'Όφελος · διαγνωστικό OFF νέων σκιών'},
 {label:'Νέα cache batches τοίχων',measurement:'ON 59,95 / OFF 59,95 / ON 58,99 FPS',result:'No effect σε αυτό το δωμάτιο · OFF'},
 {label:'Διπλά frame callbacks / UI events',measurement:'12.516 callbacks · 0 διπλά timestamps',result:'Δεν επιβεβαιώθηκε διπλό game loop'},
 {label:'Αγάλματα / props / physics / μάγος OFF',measurement:'Δεν ολοκληρώθηκαν χωριστές μετρήσεις',result:'Άγνωστο · παραμένουν ON'},
 {label:'Δυναμικό φίλτρο lights σε κίνηση PC',measurement:'180 shader links / 2.591,9 ms μέγιστο',result:'Κίνδυνος νέων shaders όταν αλλάζει το πλήθος · καταγράφεται ανά run'},
 {label:'Πρώτη εμφάνιση μοντέλων · PC',measurement:'Προθέρμανση: max 396,2 → 56,9 ms',result:'Μειώθηκε το πρώτο κόλλημα · προθέρμανση ON'},
 {label:'Πλήρης κόσμος · πλοήγηση AI στο PC',measurement:'5.149 διαδρομές / 15 s · 9.580 ms CPU',result:'Επιβεβαιωμένο κόστος · πλήρης κόσμος και νέα πειραματική διόρθωση OFF'}
]);
export function selectCombatTarget(enemies,position){let best=null,distance=Infinity;for(const e of enemies){if(e.dead||e.removed)continue;const d=Math.hypot(e.body.position.x-position.x,e.body.position.z-position.z);if(d<distance){distance=d;best=e;}}return best;}
export function combatMovement(from,to){const dx=to.x-from.x,dz=to.z-from.z,d=Math.hypot(dx,dz);return d>3.15?{moveX:dx/d*.6,moveZ:dz/d*.6}:{moveX:0,moveZ:0};}
export function combatComplete({elapsedMs,remaining}){return elapsedMs>=90000||elapsedMs>=18000&&remaining===0;}

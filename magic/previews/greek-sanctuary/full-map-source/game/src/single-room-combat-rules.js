export const ENCOUNTER=Object.freeze([
 {kind:'boss',bossType:null,name:'Iron Warden',x:-6,z:9},
 {kind:'boss',bossType:'colossus',name:'Colossus',x:-2,z:9},
 {kind:'boss',bossType:'gargoyle',name:'Gargoyle',x:2,z:9},
 {kind:'boss',bossType:'wraith',name:'Wraith',x:6,z:9},
 ...[-9,-5,-1,3,7,10].map((x,i)=>({kind:['guard','archer','heavy'][i%3],x,z:13})),
 ...[-10,-7,-4,4,7,10].map((x,i)=>({kind:['heavy','guard','archer'][i%3],x,z:16})),
]);
export const CONFIG=Object.freeze({world:'single-courtyard',fullWorld:false,baselineSeconds:15,maximumSeconds:180,enemyCount:ENCOUNTER.length,regularEnemyCount:12,bossCount:4,bossTypes:['warden','colossus','gargoyle','wraith'],bossSummoning:true,enemyHealth:'normal',playerHealth:'unlimited',torchFlames:true,activeTorchLights:true,physics:true,props:true,statues:true,animations:true,enemyAI:'held during baseline; normal during combat',autoFire:true,autoStomp:true,staticShadowCache:true,batchShadowCache:false,muted:true,navigationExperiment:false});
export const REPORT_HISTORY=Object.freeze([
 {version:'1.6.37',measurement:'iPhone · όλοι οι bosses: παλιό 20,1 FPS · SMAA 37,9 · shader 42,3',action:'SMAA αντί MSAA · ακριβής παράκαμψη μάσκας μόνο μέσα στο δωμάτιο · GPU warm-up',status:'12 εχθροί + 4 bosses ON · καμία νέα απενεργοποίηση · σταθερά 60 FPS ακόμη ανοικτά'},
 {version:'1.6.29',measurement:'iPhone · μάχη 27,94 FPS · max 72 ms',action:'Έλεγχος shaders και φωτισμού',status:'Αρχική μέτρηση · 6 εχθροί'},
 {version:'1.6.30–31',measurement:'PC · λιγότερες παραλλαγές shaders',action:'Προετοιμασία φωτισμού 5/7/11 · νέα μοντέλα',status:'Δημοσιευμένα · όχι απομόνωση αιτίας iPhone'},
 {version:'1.6.31',measurement:'iPhone · μάχη 49,76 FPS · max 965 ms',action:'Έλεγχος αιχμών · κανένα νέο σύστημα OFF',status:'Μεμονωμένα κολλήματα παρέμεναν'},
 {version:'1.6.32',measurement:'iPhone · μάχη 59,26 FPS · max 40 ms',action:'Σταθερό magic-benchmark.json · καμία αλλαγή απόδοσης',status:'6/6 · 0 σφάλματα · εκτός μάχης 145/84 ms'},
 {version:'1.6.33',measurement:'iPhone · μάχη 20,78 / 21,00 FPS · 2 JSON',action:'Πτώση επαναλαμβάνεται · ίδια αρχική σύνθεση · 0 σφάλματα',status:'Επιβάρυνση μοντέλων/υφών · ακριβής αιτία ανοικτή'},
 {version:'1.6.34',measurement:'Περίπου 115 MiB λιγότερα texels μαζί με mipmaps',action:'Gargoyle: αχρησιμοποίητα περιθώρια υφών · Archer: ομοιόχρωμη υφή',status:'Νέο iPhone JSON: 20,06 FPS · η μνήμη μειώθηκε, τα FPS ΟΧΙ'},
 {version:'1.6.35',measurement:'Απομόνωση · η αιτία παραμένει ανοικτή',action:'Προεπιλογή: 6 εχθροί / bosses OFF · 12 χωρίς / κάθε boss / όλοι / εμφάνιση OFF / AI OFF',status:'iPhone: 6 εχθροί / bosses OFF · μάχη 45,67 FPS · max 224 ms'},
 {version:'1.6.36',measurement:'Διόρθωση φόρτωσης και επαναχρησιμοποίηση εφέ',action:'Μόνο επιλεγμένα μοντέλα · pool αριθμών/δακτυλίων · shaders πριν τη μάχη · ανάκτηση JSON',status:'iPhone JSON: 12 εχθροί · 23,59 FPS · bosses δεν απαιτούνται για την πτώση'},
]);
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
export function combatComplete({elapsedMs,remaining}){return elapsedMs>=CONFIG.maximumSeconds*1000||elapsedMs>=18000&&remaining===0;}

// Fictional frontier states, 1280. CY£ is the requested game currency.
export const MAP={minX:-240,maxX:240,minZ:-176,maxZ:176,width:480,depth:352,waterLevel:.6};
export const FACTIONS={
 player:{name:'Ηγεμονία της Αργυρής Δρυός',shortName:'Αργυρή Δρυς',color:'#427b9d',motto:'Πρώτα ο λαός. Έπειτα το στέμμα.'},
 red:{name:'Δεσποτάτο του Σιδηρού Λύκου',shortName:'Σιδηρός Λύκος',color:'#a73f39',motto:'Το πέρασμα ανήκει στον ισχυρό.'},
 gold:{name:'Μαρκιωνία του Ήλιου',shortName:'Οίκος του Ήλιου',color:'#c49a49',motto:'Ο πλούτος χτίζει τείχη.'},
 neutral:{name:'Ελεύθερες μεθόριοι',shortName:'Ελεύθερη μεθόριος',color:'#a7aa95',motto:'Χωρίς προστάτη, χωρίς αφέντη.'}
};
const v=(x,z)=>[x*1.6,z*1.6];
const grid=[ [v(-150,-110),v(-58,-110),v(49,-110),v(150,-110)], [v(-150,-35),v(-48,-42),v(50,-30),v(150,-35)], [v(-150,42),v(-42,38),v(53,42),v(150,44)], [v(-150,110),v(-52,110),v(47,110),v(150,110)] ];
// Shared irregular frontiers follow the same line from either neighbouring fief.
function frontier(a,b){if((a[0]===b[0]&&Math.abs(a[0])===240)||(a[1]===b[1]&&Math.abs(a[1])===176))return[a,b];const forward=a[0]<b[0]||(a[0]===b[0]&&a[1]<b[1]),p=forward?a:b,q=forward?b:a,dx=q[0]-p[0],dz=q[1]-p[1],len=Math.hypot(dx,dz),seed=p[0]*.021+q[1]*.033,out=[];for(let i=0;i<=7;i++){const t=i/7,offset=Math.sin(t*Math.PI)*Math.sin(t*13.7+seed)*5.5;out.push([p[0]+dx*t-dz/len*offset,p[1]+dz*t+dx/len*offset]);}return forward?out:out.reverse();}
const cell=(c,r)=>{const corners=[grid[r][c],grid[r][c+1],grid[r+1][c+1],grid[r+1][c]];return corners.flatMap((p,i)=>frontier(p,corners[(i+1)%4]).slice(0,-1));};
export const REGIONS=[
 {id:'firwood',name:'Δρυόκαστρο',subtitle:'Ελεύθερη δασική μεθόριος',owner:'neutral',polygon:cell(0,0),x:-167,z:-119,kind:'outpost',neighbors:['home','pass'],fortHp:440},
 {id:'pass',name:'Πύλη του Βορρά',subtitle:'Το οχυρωμένο πέρασμα',owner:'red',polygon:cell(1,0),x:48,z:-119,kind:'outpost',neighbors:['firwood','crossing','ironhold'],fortHp:850},
 {id:'ironhold',name:'Σιδηρόκαστρο',subtitle:'Έδρα του Σιδηρού Λύκου',owner:'red',polygon:cell(2,0),x:166,z:-120,kind:'castle',neighbors:['pass','highlands'],fortHp:1850},
 {id:'home',name:'Αργυρόκαστρο',subtitle:'Το φέουδό σου',owner:'player',polygon:cell(0,1),x:-158,z:0,kind:'castle',neighbors:['firwood','crossing','farmland'],fortHp:1450},
 {id:'crossing',name:'Σταυροδρόμι',subtitle:'Οι δρόμοι του εμπορίου',owner:'neutral',polygon:cell(1,1),x:-30,z:-4,kind:'outpost',neighbors:['home','pass','highlands','quarry'],fortHp:540},
 {id:'highlands',name:'Καστανή Ράχη',subtitle:'Η ανατολική οχύρωση',owner:'gold',polygon:cell(2,1),x:168,z:1,kind:'outpost',neighbors:['ironhold','crossing','sunkeep'],fortHp:900},
 {id:'farmland',name:'Σιτοχώραφα',subtitle:'Η γη που μας θρέφει',owner:'player',polygon:cell(0,2),x:-159,z:120,kind:'town',neighbors:['home','quarry'],fortHp:480},
 {id:'quarry',name:'Λευκόπετρα',subtitle:'Λατομεία και νότια γέφυρα',owner:'player',polygon:cell(1,2),x:-22,z:131,kind:'outpost',neighbors:['farmland','crossing','sunkeep'],fortHp:700},
 {id:'sunkeep',name:'Ηλιόκαστρο',subtitle:'Έδρα του Οίκου του Ήλιου',owner:'gold',polygon:cell(2,2),x:167,z:121,kind:'castle',neighbors:['quarry','highlands'],fortHp:1750}
];
export const riverX=z=>9+Math.sin(z*.025)*13+Math.sin(z*.012)*5;
export const BRIDGES=[{x:riverX(-84),z:-84,width:22},{x:riverX(84),z:84,width:22}];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function rawHeight(x,z){const d=Math.abs(x-riverX(z));const hill=5+3*Math.sin(x*.021+z*.009)+2*Math.cos(z*.022)+28*Math.exp(-((x-165)**2/13000+(z+127)**2/6500))+18*Math.exp(-((x+185)**2/9500+(z+132)**2/8200))+9*Math.exp(-((x-163)**2/7800+(z-75)**2/11000));const bank=clamp((d-5)/16,0,1);return -.9+(hill+1)*bank;}
export function heightAt(x,z){let h=rawHeight(x,z);if(Math.abs(x-riverX(z))<10)return h;for(const r of REGIONS){const d=Math.hypot(x-r.x,z-r.z),flat=r.kind==='castle'?25:r.kind==='town'?20:16,edge=flat+12;if(d<edge){let k=clamp((edge-d)/(edge-flat),0,1);k=k*k*(3-2*k);h=h*(1-k)+rawHeight(r.x,r.z)*k;}}return h;}
export function regionAt(x,z){for(const r of REGIONS){let inside=false;for(let i=0,j=r.polygon.length-1;i<r.polygon.length;j=i++){const a=r.polygon[i],b=r.polygon[j];if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])inside=!inside;}if(inside)return r.id;}return null;}
const node=(id,type,regionId,x,z,amount)=>({id,type,regionId,x,z,amount,workers:0});
export const RESOURCE_NODES=[
 node('oak-west','wood','home',-211,-19,18000),node('oak-home','wood','home',-103,24,14000),node('home-stone','stone','home',-194,41,10000),node('home-iron','iron','home',-108,-39,8500),node('home-grain','food','home',-206,24,25000),
 node('wheat-south','food','farmland',-202,112,30000),node('orchard-south','food','farmland',-110,91,23000),node('south-timber','wood','farmland',-191,159,18000),
 node('chalk-pit','stone','quarry',-60,111,27000),node('iron-south','iron','quarry',42,139,13000),node('river-grain','food','quarry',-47,160,15000),
 node('pine-north','wood','firwood',-211,-129,30000),node('forest-iron','iron','firwood',-107,-133,21000),node('forest-stone','stone','firwood',-172,-71,13000),
 node('crossing-timber','wood','crossing',-63,18,24000),node('crossing-grain','food','crossing',52,19,23000),node('pass-iron','iron','pass',-27,-140,28000),node('pass-stone','stone','pass',57,-72,22000),
 node('ironhold-mine','iron','ironhold',209,-132,40000),node('ironhold-pine','wood','ironhold',117,-152,28000),node('east-stone','stone','highlands',212,31,32000),node('east-wheat','food','highlands',122,-12,25000),
 node('sunkeep-wheat','food','sunkeep',123,146,38000),node('sunkeep-wood','wood','sunkeep',211,101,24000),node('sunkeep-stone','stone','sunkeep',207,159,20000)
];
export const UNIT_TYPES={
 spear:{name:'Δορυφόροι',plural:'Δορυφόροι',description:'Κρατούν τη γραμμή και αναχαιτίζουν ιππικό. Προστάτεψε με αυτούς τους τοξότες.',role:'infantry',men:6,hp:330,damage:22,range:4.6,speed:4.7,cooldown:1.3,armor:3,cost:{money:38,food:45,wood:22},trainTime:22,requires:'barracks',bonus:{cavalry:2.3},structureBonus:.28},
 sword:{name:'Ξιφομάχοι',plural:'Ξιφομάχοι',description:'Θωρακισμένο πεζικό για έφοδο, προστασία μηχανών και κατάληψη οχυρών.',role:'infantry',men:6,hp:440,damage:29,range:4.2,speed:4.3,cooldown:1.2,armor:6,cost:{money:60,food:45,iron:25},trainTime:30,requires:'barracks',bonus:{spear:1.35},structureBonus:.4},
 archer:{name:'Τοξότες',plural:'Τοξότες',description:'Βάλλουν από απόσταση. Ισχυρότεροι από ψηλό έδαφος, ευάλωτοι στο ιππικό.',role:'ranged',men:5,hp:220,damage:25,range:29,speed:4.9,cooldown:1.9,armor:1,cost:{money:45,food:30,wood:35},trainTime:25,requires:'archery',bonus:{spear:1.25},structureBonus:.14},
 cavalry:{name:'Έφιπποι',plural:'Έφιπποι',description:'Γρήγορο πλευροκόπημα και κυνήγι τοξοτών. Απόφυγε τη γραμμή των δοράτων.',role:'cavalry',men:3,hp:430,damage:43,range:5.5,speed:8,cooldown:1.7,armor:5,cost:{money:95,food:80,iron:25},trainTime:42,requires:'stable',bonus:{archer:1.9,trebuchet:2.1,ram:1.5},structureBonus:.3},
 ram:{name:'Πολιορκητικός κριός',plural:'Κριοί',description:'Καλυμμένος κριός για πύλες και τείχη. Χρειάζεται συνοδεία πεζικού.',role:'siege',men:2,hp:660,damage:46,range:8,speed:2.6,cooldown:2.5,armor:13,cost:{money:105,wood:130,iron:20},trainTime:55,requires:'siege',bonus:{},structureBonus:3.7},
 trebuchet:{name:'Τρεμπουσέ',plural:'Τρεμπουσέ',description:'Καταπέλτης με αντίβαρο. Χτυπά τείχη από μακριά, αλλά απειλείται από κοντινή έφοδο.',role:'siege',men:2,hp:380,damage:70,range:63,speed:1.8,cooldown:7,armor:2,cost:{money:200,wood:180,stone:90,iron:45},trainTime:85,requires:'siege',tech:'engineering',bonus:{},structureBonus:3.2}
};
export const BUILDINGS={
 houses:{name:'Κατοικίες',description:'Στέγη για 12 επιπλέον κατοίκους και σταδιακή αύξηση πληθυσμού.',cost:{money:40,wood:70,stone:20},time:35,max:4,benefit:'+12 στέγη'},
 farm:{name:'Αγροκτήματα',description:'Καλύτερα εργαλεία και καλλιέργειες στο φέουδο.',cost:{money:45,wood:60},time:40,max:3,benefit:'+25% τρόφιμα'},
 lumberyard:{name:'Υλοτομείο',description:'Οργανωμένη μεταφορά και επεξεργασία τοπικής ξυλείας.',cost:{money:45,wood:55,stone:20},time:40,max:3,benefit:'+25% ξυλεία'},
 quarry:{name:'Λατομείο',description:'Πάγκοι λατόμων και καλύτερη μεταφορά πέτρας.',cost:{money:55,wood:65,stone:20},time:45,max:3,benefit:'+25% πέτρα'},
 mine:{name:'Μεταλλείο',description:'Εργαλεία εξόρυξης και καμίνι για σίδηρο.',cost:{money:75,wood:70,stone:40},time:55,max:3,benefit:'+25% σίδηρος'},
 granary:{name:'Σιταποθήκη',description:'Ασφαλείς προμήθειες, καλύτερο ηθικό και ευημερία.',cost:{money:70,wood:90,stone:40},time:55,max:2,benefit:'+ευημερία / ηθικό'},
 market:{name:'Αγορά',description:'Εμπορική δραστηριότητα και περισσότερες εισφορές σε CY£.',cost:{money:90,wood:85,stone:40},time:65,max:3,benefit:'+εισόδημα σε CY£'},
 barracks:{name:'Στρατώνας',description:'Εκπαιδεύει δορυφόρους και ξιφομάχους.',cost:{money:90,wood:105,stone:50},time:55,max:2,benefit:'Πεζικό'},
 archery:{name:'Πεδίο τοξοβολίας',description:'Εκπαίδευση τοξοτών για τις γραμμές και τα τείχη.',cost:{money:80,wood:100,stone:25},time:50,max:2,benefit:'Τοξότες'},
 stable:{name:'Στάβλοι',description:'Εκπαιδεύουν τα έφιππα αποσπάσματα.',cost:{money:120,wood:130,stone:55},time:70,max:2,benefit:'Ιππικό'},
 siege:{name:'Μηχανουργείο πολιορκίας',description:'Ξυλουργοί και σιδεράδες κατασκευάζουν κριούς και τρεμπουσέ.',cost:{money:160,wood:160,stone:80,iron:30},time:90,max:2,benefit:'Πολιορκητικές μηχανές'},
 walls:{name:'Ενίσχυση τειχών',description:'Ισχυρότερα τείχη, μεγαλύτερη αντοχή και άμυνα πύργων.',cost:{money:120,wood:60,stone:150},time:80,max:3,benefit:'+450 αντοχή οχυρού'},
 well:{name:'Κοινοτικό πηγάδι',description:'Καθαρό νερό και φροντίδα για τους ανθρώπους του οικισμού.',cost:{money:60,wood:25,stone:60},time:45,max:2,benefit:'+ηθικό / ευημερία'},
 infirmary:{name:'Θεραπευτήριο',description:'Ανάπαυση και ταχύτερη αποκατάσταση φιλικών στρατευμάτων κοντά στο οχυρό.',cost:{money:110,wood:70,stone:60},time:70,max:2,benefit:'Θεραπεία φρουράς'}
};
export const TECHS={
 agriculture:{name:'Τριετής αμειψισπορά',description:'Αποδοτικότερη παραγωγή τροφής και ανάπτυξη οικισμών.',cost:{money:130,wood:90,food:100},time:95,max:2,benefit:'+20% συγκομιδή'},
 steel:{name:'Τέχνη της σιδηρουργίας',description:'Καλύτερες λεπίδες, αιχμές και θωράκιση.',cost:{money:150,iron:100,wood:60},time:110,max:2,benefit:'+15% επίθεση'},
 masonry:{name:'Λιθοξοΐα',description:'Καλύτερο δέσιμο τοίχων και ισχυρότερη φρουρά.',cost:{money:150,stone:160,wood:60},time:110,max:2,benefit:'+20% οχύρωση'},
 engineering:{name:'Μηχανική αντιβάρου',description:'Ξεκλειδώνει τρεμπουσέ στο μηχανουργείο πολιορκίας.',cost:{money:220,wood:170,iron:90,stone:80},time:145,max:1,benefit:'Τρεμπουσέ'},
 logistics:{name:'Δρόμοι εφοδιασμού',description:'Γρηγορότερη εκπαίδευση, καλύτερος ανεφοδιασμός και χώροι στρατού.',cost:{money:150,wood:120,food:90},time:100,max:2,benefit:'Εκπαίδευση / εφοδιασμός'}
};
export const RESOURCE_NAMES={money:'Κυπριακές λίρες',food:'Τρόφιμα',wood:'Ξυλεία',stone:'Πέτρα',iron:'Σίδηρος'};
export const ERAS=['Συνοριακή αρχοντία','Καστροπολιτεία','Ηγεμονία'];

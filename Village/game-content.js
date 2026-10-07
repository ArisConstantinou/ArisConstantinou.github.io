// All residents, disputes and the ruined starting condition are fictional.
// Place names are a researched inspiration; the playable map is not a survey.
export const SAVE_VERSION = 1;
export const STORAGE_KEY = 'moutoullas-mouchtaris-v1';
export const DAY_SECONDS = 3600;
export const CAMPAIGN_SECONDS = 72 * 3600;
export const OFFLINE_CAP_SECONDS = 48 * 3600;
export const SANDBOX_SPEED = 240;

export const RESOURCES = {
  money: {id:'money',name:'Κυπριακές λίρες',short:'CY£',icon:'£',buy:0,sell:0},
  wood: {id:'wood',name:'Ξυλεία',short:'Ξύλο',icon:'▰',unit:'μον.',buy:2.2,sell:1.1},
  stone: {id:'stone',name:'Πέτρα',short:'Πέτρα',icon:'◆',unit:'μον.',buy:1.8,sell:.85},
  food: {id:'food',name:'Τρόφιμα',short:'Τρόφιμα',icon:'●',unit:'μον.',buy:.85,sell:.38},
  goods: {id:'goods',name:'Χειροποίητα προϊόντα',short:'Προϊόντα',icon:'◒',unit:'τεμ.',buy:11,sell:7},
};

export const ROLES = [
  {id:'wood',name:'Δασικό συνεργείο',short:'Ξυλεία',description:'Επιλεκτική συλλογή ξύλου. Η υπερβολή μειώνει την υγεία του δάσους.',buildingId:'forest',resource:'wood',baseRate:9,icon:'♣'},
  {id:'stone',name:'Λιθοξόοι',short:'Πέτρα',description:'Διαλέγουν και επαναχρησιμοποιούν ντόπια πέτρα για αποκαταστάσεις.',buildingId:'stone',resource:'stone',baseRate:11,icon:'◆'},
  {id:'farm',name:'Περιβολάρηδες',short:'Περιβόλια',description:'Παράγουν τρόφιμα. Το αρδευτικό και οι πεζούλες βελτιώνουν την απόδοση.',buildingId:'orchard',resource:'food',baseRate:16,icon:'❧'},
  {id:'craft',name:'Σκαφάδες',short:'Εργαστήρι',description:'Κάθε προϊόν χρειάζεται 2 μονάδες ξύλου. Χρειάζεται επισκευασμένο εργαστήρι.',buildingId:'woodshop',resource:'goods',baseRate:3,minCondition:55,icon:'◒'},
  {id:'tourism',name:'Ξεναγοί & φιλοξενία',short:'Επισκέπτες',description:'Μικρές παρέες επισκεπτών φέρνουν άμεσο εισόδημα. Χρειάζεται λειτουργικός ξενώνας.',buildingId:'inn',resource:'money',baseRate:12,minCondition:55,icon:'☀'},
];

const project = (id,name,category,buildingId,duration,workers,cost,extra={}) => ({id,name,title:name,category,buildingId,duration,workers,cost,requires:[],minElapsed:0,...extra});
export const PROJECTS = [
  project('repair_fountain','Νερό ξανά στη βρύση','urgent','fountain',45,2,{money:30,wood:4,stone:10},{description:'Καθαρισμός, επισκευή σωλήνωσης και λιθοδομής. Μια πρώτη, ορατή νίκη για το χωριό.',condition:60,effects:{trust:6,order:2}}),
  project('clean_square','Η πλατεία παίρνει ανάσα','urgent','square',120,2,{money:22,wood:2,stone:5},{description:'Μαζεύουμε τα σπασμένα, επισκευάζουμε καθιστικά και ξαναδίνουμε χώρο στους κατοίκους.',condition:52,effects:{trust:5,order:6}}),
  project('restore_woodshop','Ξανά χτύπος στο εργαστήρι','production','woodshop',240,3,{money:72,wood:18,stone:20},{description:'Αποκατάσταση του εργαστηρίου σκαφάδων. Οι τεχνίτες φτιάχνουν ξύλινες σκάφες και μικρά είδη.',requires:['repair_fountain'],condition:55,effects:{trust:4,heritage:5}}),
  project('repair_house','Στέγη σε πέτρινο σπίτι','housing',null,480,2,{money:28,wood:7,stone:15},{description:'Σώζουμε λιθοδομή, ξύλινα δοκάρια και κεραμίδια. Διάλεξε ένα από τα σπίτια του χάρτη.',allowHouses:true,repeatable:true,requires:['repair_fountain'],condition:48,maxCondition:100,effects:{trust:2,heritage:2}}),
  project('repair_bridge','Ασφαλές πέρασμα στον Σέτραχο','urgent','bridge',900,3,{money:52,wood:12,stone:28},{description:'Επισκευάζουμε το μικρό γεφύρι και τα στηθαία για ασφαλή μετακίνηση στις γειτονιές.',requires:['clean_square'],condition:56,effects:{order:5,trust:3}}),
  project('irrigation','Νερό στις πεζούλες','production','orchard',1200,3,{money:48,wood:10,stone:25},{description:'Καθαρίζουμε το αρδευτικό και επισκευάζουμε ξερολιθιές. Περισσότερη τροφή από τα υπάρχοντα περιβόλια.',requires:['repair_fountain'],condition:42,effects:{trust:3,nature:4}}),
  project('market_restore','Στήσιμο της μικρής αγοράς','production','market',600,2,{money:38,wood:15,stone:10},{description:'Επαναφέρουμε πάγκους, σκίαση και καθαρό χώρο για πώληση και ανταλλαγές.',requires:['clean_square'],condition:57,effects:{order:4,trust:3}}),
  project('cafe_restore','Το καφενείο ξανανοίγει','community','cafe',900,2,{money:40,wood:12,stone:12},{description:'Μικρές επισκευές στο φανταστικό καφενείο «Η Παρέα». Χώρος για κουβέντα και συμφιλίωση.',requires:['clean_square'],condition:42,effects:{trust:5,order:4}}),
  project('forest_plan','Συμφωνία φροντίδας του δάσους','nature','forest',600,2,{money:28,wood:3,stone:4},{description:'Ορίζουμε επιλεκτική συλλογή, ζώνες προστασίας και πρόγραμμα φύτευσης. Αυξάνει τη φυσική αναγέννηση.',condition:28,effects:{nature:10,order:2}}),
  project('stone_yard','Πέτρα που ξαναχρησιμοποιείται','production','stone',600,2,{money:30,wood:5,stone:10},{description:'Οργανωμένη διαλογή παλιάς πέτρας. Αυξάνεται η απόδοση των λιθοξόων χωρίς μεγάλο λατομείο.',condition:40,effects:{heritage:3,nature:3}}),
  project('oven_restore','Φωτιά στον κοινοτικό φούρνο','production','bakery',900,2,{money:42,wood:8,stone:24},{description:'Φροντίδα του παραδοσιακού φούρνου. Μειώνει τη σπατάλη τροφίμων της κοινότητας.',requires:['repair_fountain'],condition:48,effects:{trust:4,heritage:3}}),
  project('restore_wash','Φροντίδα στα πλυσταριά','heritage','wash',1800,3,{money:55,wood:7,stone:32},{description:'Καθαρισμός και προσεκτική συντήρηση της παραποτάμιας θέσης, εμπνευσμένης από Τα Χλιο.',requires:['repair_bridge'],condition:51,effects:{heritage:7,trust:3,nature:4}}),
  project('inn_restore','Ένα σπίτι για φιλοξενία','tourism','inn',2400,3,{money:95,wood:24,stone:35},{description:'Το υπάρχον πέτρινο σπίτι γίνεται μικρός ξενώνας. Ανοίγει δουλειές φιλοξενίας και ξενάγησης.',requires:['repair_bridge','market_restore'],condition:58,effects:{trust:4,heritage:4}}),
  project('trail_clear','Περίπατος δίπλα στο νερό','tourism','trail',1200,2,{money:35,wood:9,stone:15},{description:'Καθαρίζουμε μονοπάτι, διορθώνουμε σκαλοπάτια και τοποθετούμε διακριτική σήμανση.',requires:['repair_bridge'],condition:56,effects:{nature:5,heritage:4}}),
  project('church_survey','Μελέτη για το μνημείο του 1280','heritage','church',1800,1,{money:70,stone:4},{description:'Ειδικοί τεκμηριώνουν τις ανάγκες της Παναγίας του Μουτουλλά. Το υπάρχον μνημείο προστατεύεται.',requires:['clean_square'],minElapsed:3600,condition:6,effects:{heritage:6},specialist:true}),
  project('church_conserve','Ειδικοί στη συντήρηση της Παναγίας','heritage','church',7200,2,{money:175,wood:6,stone:12},{description:'Συντήρηση από ειδικούς σύμφωνα με τη μελέτη. Στο παιχνίδι δεν αγγίζουμε μόνοι μας τοιχογραφίες και ιστορικά υλικά.',requires:['church_survey'],minElapsed:28800,condition:40,effects:{heritage:13,trust:4},specialist:true}),
  project('school_restore','Σχολή παραδοσιακών τεχνών','heritage','school',3600,3,{money:90,wood:25,stone:38},{description:'Παλιό κτίριο δέχεται νέους μαθητευόμενους. Δύο κάτοικοι εντάσσονται στα διαθέσιμα συνεργεία.',requires:['restore_woodshop','stone_yard'],minElapsed:7200,condition:55,effects:{heritage:7,trust:5},addWorkers:2}),
  project('cooperative_restore','Συνεργατικό παντοπωλείο','production','coop',3600,3,{money:110,wood:22,stone:35},{description:'Κοινό απόθεμα και ομαδικές παραγγελίες. Οι τιμές πώλησης αυξάνονται κατά 10%.',requires:['market_restore','irrigation'],minElapsed:14400,condition:58,effects:{trust:5,order:5}}),
  project('community_feast','Τραπέζι για όλο το χωριό','community','square',900,1,{money:10,food:18},{description:'Κοινό τραπέζι χωρίς εισιτήριο. Με φαγητό και κουβέντα πέφτουν οι τόνοι.',repeatable:true,cooldown:21600,requires:['clean_square'],effects:{trust:7,order:5}}),
  project('market_day','Ημέρα ντόπιων προϊόντων','production','market',1200,1,{money:6,goods:5,food:8},{description:'Μικρή οργανωμένη αγορά με συνολικά έσοδα CY£ 54 όταν τελειώσει. Το κόστος φαίνεται πριν τη διοργάνωση.',repeatable:true,cooldown:14400,requires:['market_restore'],reward:{money:54},effects:{trust:2,order:1}}),
  project('plant_trees','Φύτεμα και φροντίδα νεαρών δέντρων','nature','forest',900,2,{money:12,wood:2},{description:'Φύτευση στα κατάλληλα σημεία και φροντίδα του υφιστάμενου δάσους. Επαναλαμβάνεται ανά 6 ώρες χωριού.',repeatable:true,cooldown:21600,effects:{nature:14,trust:1}}),
  project('youth_workshop','Οι νέοι πιάνουν τα εργαλεία','community','school',1800,2,{money:15,wood:8,food:6},{description:'Μάθημα σκαφικής και λιθοδομής. Οι ταραξίες βρίσκουν δημιουργική δουλειά.',repeatable:true,cooldown:21600,requires:['school_restore'],reward:{goods:5},effects:{trust:5,order:7,heritage:2}}),
  project('orchard_expand','Αποκατάσταση εγκαταλειμμένων πεζουλών','production','orchard',5400,3,{money:80,wood:14,stone:50},{description:'Επιστρέφουν στην παραγωγή παλιά περιβόλια. Δεν επεκτείνουμε το χωριό μέσα στο δάσος.',requires:['irrigation'],minElapsed:14400,condition:25,effects:{nature:6,trust:4}}),
  project('office_archive','Ανοιχτό τεφτέρι της κοινότητας','community','office',1800,1,{money:36,wood:5,stone:5},{description:'Διαφανής κατάλογος έργων και ήπιες ρυθμίσεις οφειλών. Βελτιώνει την είσπραξη χωρίς νέο φόρο.',requires:['cafe_restore'],minElapsed:7200,condition:23,effects:{order:7,trust:6}}),
  project('master_craft','Η τέχνη περνά στην επόμενη γενιά','production','woodshop',14400,3,{money:155,wood:50,stone:12},{description:'Πάγκοι μαθητευομένων και εργαλεία για καλύτερη παραγωγή χειροποίητων σκαφών.',requires:['school_restore'],minElapsed:28800,condition:24,effects:{heritage:6,trust:3}}),
  project('guest_network','Μικρό δίκτυο χωριάτικης φιλοξενίας','tourism','inn',21600,3,{money:190,wood:45,stone:60},{description:'Συντονισμός οικοδεσποτών σε υπάρχοντα σπίτια, περιπάτων και επισκέψεων στο εργαστήρι.',requires:['inn_restore','trail_clear','cooperative_restore'],minElapsed:86400,condition:24,effects:{trust:6,heritage:5},addWorkers:2}),
  project('fire_safety','Φροντίδα και πρόληψη στο δάσος','nature','forest',10800,3,{money:95,wood:12,stone:25},{description:'Καθαρισμός ξερής βλάστησης κοντά στα σπίτια, σημεία νερού και εθελοντική οργάνωση.',requires:['forest_plan','irrigation'],minElapsed:28800,condition:24,effects:{nature:10,order:6}}),
  project('stone_lanes','Καλντερίμια που ξαναενώνουν','heritage','square',14400,4,{money:145,wood:8,stone:110},{description:'Επισκευή μονοπατιών και στενών με συμβατά υλικά. Διατηρούμε την κλίμακα και την εικόνα του χωριού.',requires:['stone_yard','repair_bridge'],minElapsed:43200,condition:23,effects:{heritage:7,trust:5}}),
  project('river_care','Καθαρή κοίτη, ζωντανό νερό','nature','wash',3600,2,{money:20,wood:3,food:8},{description:'Εθελοντική φροντίδα στις προσβάσιμες όχθες και απομάκρυνση απορριμμάτων.',repeatable:true,cooldown:43200,requires:['restore_wash'],effects:{nature:9,trust:3}}),
  project('village_covenant','Συμφωνία για το αύριο του χωριού','community','office',14400,2,{money:105,food:25,goods:8},{description:'Κάτοικοι και επαγγελματίες συμφωνούν σε δίκαιες εισφορές, εργασίες και προστασία του χαρακτήρα του τόπου.',requires:['office_archive','cooperative_restore','school_restore'],minElapsed:86400,condition:12,effects:{trust:9,order:12,heritage:4}}),
  project('annual_festival','Η μεγάλη γιορτή της επιστροφής','community','square',28800,4,{money:240,food:100,goods:35,wood:20},{description:'Μια γιορτή με προϊόντα, τέχνες, περιπάτους και παρέες. Η κοινότητα ετοιμάζεται επί 8 ώρες.',requires:['village_covenant','guest_network','church_conserve'],minElapsed:172800,effects:{trust:12,order:8,heritage:7},reward:{money:310}}),
  project('paraskevi_care','Φροντίδα του περιβόλου της Αγίας Παρασκευής','heritage','paraskevi',5400,2,{money:65,wood:8,stone:32},{description:'Συντήρηση του κοινόχρηστου περιβόλου και των προσβάσεων, με σεβασμό στον ναό.',requires:['clean_square'],minElapsed:14400,condition:37,effects:{heritage:5,trust:4}}),
];

export const BARTERS = [
  {id:'wood_stone',name:'Ξυλεία για πέτρα',description:'Το συνεργείο των λιθοξόων χρειάζεται ξύλο για τις επισκευές του.',cost:{wood:10},reward:{stone:13}},
  {id:'food_wood',name:'Προμήθειες για ξύλο',description:'Καλάθια τροφίμων για το δασικό συνεργείο.',cost:{food:20},reward:{wood:6}},
  {id:'craft_food',name:'Σκάφες για προμήθειες',description:'Οι περιβολάρηδες ανταλλάσσουν τρόφιμα με χειροποίητα είδη.',cost:{goods:2},reward:{food:25}},
  {id:'stone_food',name:'Πέτρα για το περιβόλι',description:'Επισκευή μικρής ξερολιθιάς με αντάλλαγμα τρόφιμα.',cost:{stone:12},reward:{food:20}},
];

const choice = (id,label,description,cost={},effects={},reward={}) => ({id,label,description,cost,effects,reward});
export const EVENTS = [
  {id:'tefteri',title:'Η παρέα «Τεφτέρι» ξέχασε… πάλι',name:'Η παρέα «Τεφτέρι»',text:'Η φανταστική παρέα του καφενείου ορκίζεται πως θα πληρώσει «την άλλη Δευτέρα». Οι υπόλοιποι ζητούν δικαιοσύνη. Πώς προχωράς;',choices:[
    choice('arrange','Ρύθμιση με μικρές δόσεις','Δίνεις έναν καθαρό, κοινό κανόνα για όλους. Μικρή είσπραξη τώρα και περισσότερη εμπιστοσύνη.',{},{trust:5,order:7},{money:12}),
    choice('collect','Απαιτείς όλο το ποσό τώρα','Το ταμείο ενισχύεται γρήγορα, αλλά η παρέα δυσανασχετεί.',{},{trust:-6,order:10},{money:38}),
    choice('forgive','Χαρίζεις την οφειλή αυτή τη φορά','Η παρέα σε συμπαθεί. Οι συνεπείς όμως θεωρούν ότι αδικούνται.',{},{trust:2,order:-7}),
  ]},
  {id:'goat',title:'Μια κατσίκα στην ημερήσια διάταξη',name:'Η κατσίκα στην πλατεία',text:'Η κατσίκα της κυρίας Ελένης μπήκε στην πλατεία και δοκιμάζει τις γλάστρες. Το χωριό παρακολουθεί σαν να είναι μεγάλο θέαμα.',choices:[
    choice('repair','Μικρή περίφραξη και βοήθεια','Λύνεις το πρακτικό πρόβλημα με λίγη ξυλεία.',{wood:4},{trust:4,order:4}),
    choice('return','Την επιστρέφεις με μια ήρεμη κουβέντα','Χωρίς κόστος, αλλά το πρόβλημα μπορεί να επιστρέψει.',{},{trust:2,order:1}),
    choice('fee','Συμφωνία αποζημίωσης','Η Ελένη πληρώνει τις γλάστρες, αλλά χάνει τη διάθεσή της για κουβέντα.',{},{trust:-3,order:5},{money:8}),
  ]},
  {id:'visitors',title:'Έφτασε μια παρέα επισκεπτών',name:'Οι πρώτοι επισκέπτες',text:'Μια μικρή ομάδα θέλει να γνωρίσει τις τέχνες, το νερό και τα μνημεία του τόπου. Ρωτούν τι μπορεί να προσφέρει το χωριό.',choices:[
    choice('guided','Περίπατος και επίδειξη σκαφικής','Προσφέρεις ένα μικρό καλάθι και μια οργανωμένη εμπειρία.',{food:8,goods:1},{trust:3,heritage:3},{money:30}),
    choice('directions','Τους δίνεις διαδρομή και ιστορίες','Μια ζεστή υποδοχή που δεν χρειάζεται χρήματα.',{},{trust:2,heritage:2},{money:8}),
    choice('quick','Μόνο μια γρήγορη εμπορική στάση','Περισσότερα χρήματα τώρα, λιγότερη φροντίδα στην εμπειρία.',{},{trust:-2,heritage:-2},{money:24}),
  ]},
  {id:'storm',title:'Η βροχή βρήκε τις παλιές στέγες',name:'Βροχή στο χωριό',text:'Μια δυνατή μπόρα άφησε μικροζημιές και λάσπη στα στενά. Οι κάτοικοι ζητούν συντονισμό, χωρίς πανικό.',choices:[
    choice('crew','Συνεργείο άμεσης φροντίδας','Αγοράζεις υλικά και φροντίζεις τις προσβάσεις.',{money:18,wood:5,stone:6},{trust:5,order:5}),
    choice('neighbors','Οργανώνεις γείτονες σε μικρές ομάδες','Κοινή προσπάθεια με διαθέσιμα χέρια και χωρίς δαπάνη.',{},{trust:3,order:2}),
    choice('delay','Το βάζεις στην επόμενη ημερήσια διάταξη','Κρατάς τους πόρους, όμως η καθυστέρηση φέρνει μουρμούρα.',{},{trust:-4,order:-3}),
  ]},
  {id:'wood_offer',title:'Μια βιαστική πρόταση για ξυλεία',name:'Η εύκολη συμφωνία',text:'Ένας φανταστικός έμπορος προτείνει περισσότερη συλλογή ξύλου από όση είχατε προγραμματίσει. Το άμεσο κέρδος έχει κόστος για το δάσος.',choices:[
    choice('selective','Μόνο την επιλεκτική συλλογή','Μικρή συμφωνία μέσα στα όρια του σχεδίου φροντίδας.',{wood:8},{nature:1,order:2},{money:14}),
    choice('refuse','Το δάσος χρειάζεται ανάπαυση','Δεν παίρνεις χρήματα. Κρατάς τη συμφωνία της κοινότητας.',{},{nature:5,trust:3}),
    choice('extra','Δέχεσαι την επιπλέον συλλογή','Άμεσο έσοδο, αλλά σημαντική επιβάρυνση στη φύση.',{},{nature:-18,trust:-4},{money:55}),
  ]},
  {id:'music',title:'Ποιος έβαλε τα ηχεία απέναντι;',name:'Η μουσική των δύο αυλών',text:'Δύο παρέες έστησαν διαφορετική μουσική σε απέναντι αυλές. Κάθε παράπονο ανεβάζει κι άλλο την ένταση.',choices:[
    choice('shared','Μία κοινή βραδιά στην πλατεία','Λίγες προμήθειες, κοινό πρόγραμμα και συμφωνημένη ώρα λήξης.',{money:8,food:10},{trust:6,order:7}),
    choice('mediate','Κουβέντα και ώρες κοινής ησυχίας','Χωρίς κόστος. Χρειάζεται να ακούσεις και τις δύο πλευρές.',{},{trust:3,order:4}),
    choice('cancel','Ακυρώνεις και τις δύο βραδιές','Επιστρέφει η ησυχία, αλλά η κοινότητα νιώθει ότι δεν ακούστηκε.',{},{trust:-5,order:7}),
  ]},
  {id:'apprentice',title:'Ένας νέος θέλει να μείνει',name:'Μια νέα αρχή',text:'Ο Μιχάλης σκέφτεται να φύγει από το χωριό. Θα έμενε αν μπορούσε να μάθει μια τέχνη και να έχει σταθερό ρόλο.',choices:[
    {...choice('training','Θέση μαθητείας στο εργαστήρι','Στηρίζεις πρακτική εκπαίδευση. Ένας νέος εργάτης εντάσσεται στο χωριό.',{money:32,wood:8},{trust:5,heritage:3}),addWorkers:1},
    choice('community','Πρώτα συμμετοχή στα κοινά','Του δίνεις ρόλο στις δράσεις. Η εκπαίδευση μπορεί να ακολουθήσει.',{},{trust:3,order:2}),
    choice('postpone','Ζητάς χρόνο να βρεις λύση','Δεν δίνεις υπόσχεση που δεν μπορείς να τηρήσεις.',{},{trust:-1}),
  ]},
  {id:'old_stone',title:'Βρέθηκαν παλιές πέτρες στην αυλή',name:'Η πέτρα έχει δεύτερη ζωή',text:'Ένα συνεργείο βρήκε καλοδιατηρημένες πέτρες και παλιά ξύλα. Οι κάτοικοι προτείνουν διαφορετικές χρήσεις.',choices:[
    choice('reuse','Καταγραφή και επαναχρησιμοποίηση','Λίγη οργάνωση για υλικά που ταιριάζουν στο χωριό.',{money:12},{heritage:5,nature:3},{stone:28,wood:8}),
    choice('keep','Τα φυλάς στην αυλή των λιθοξόων','Παίρνεις λιγότερο υλικό τώρα, χωρίς κόστος.',{},{heritage:2},{stone:12}),
    choice('sell','Πώληση σε εξωτερικό έμπορο','Έσοδο τώρα, λιγότερα διαθέσιμα υλικά για αποκαταστάσεις.',{},{heritage:-5},{money:35}),
  ]},
  {id:'water_dispute',title:'Δύο περιβόλια, μία σειρά ποτίσματος',name:'Η σειρά του νερού',text:'Ο Αντρέας και η Μαρούλλα διαφωνούν για το ποιος ποτίζει πρώτος. Η συζήτηση έφτασε μέχρι την πόρτα σου.',choices:[
    choice('schedule','Κοινός πίνακας ποτίσματος','Επισκευάζεις δύο μικρά σημεία και βάζεις διαφανές πρόγραμμα.',{money:8,stone:4},{trust:5,order:6,nature:3}),
    choice('alternate','Εναλλάξ, με παρουσία και των δύο','Λύση χωρίς κόστος που μοιράζει δίκαια τον διαθέσιμο χρόνο.',{},{trust:3,order:4}),
    choice('priority','Προτεραιότητα στον μεγαλύτερο παραγωγό','Παίρνεις προϊόντα γρήγορα, αλλά δημιουργείται αίσθημα αδικίας.',{},{trust:-5,order:-2},{food:25}),
  ]},
  {id:'modern_sign',title:'Η πινακίδα είναι μεγαλύτερη από το μαγαζί',name:'Η μεγάλη πινακίδα',text:'Ένας επαγγελματίας θέλει τεράστια φωτεινή πινακίδα. Ελπίζει να προσελκύσει κόσμο, οι γείτονες ανησυχούν για την εικόνα του τόπου.',choices:[
    choice('crafted','Μικρή, χειροποίητη ξύλινη πινακίδα','Στηρίζεις διακριτική σήμανση και τον ντόπιο τεχνίτη.',{money:10,wood:4},{heritage:6,trust:3},{goods:1}),
    choice('agree','Κοινή συμφωνία για μέγεθος και υλικά','Συνεννόηση χωρίς επιδότηση.',{},{heritage:3,order:3}),
    choice('sponsor','Δέχεσαι τη χορηγία όπως προτάθηκε','Χρήματα στο ταμείο, αλλά ο χαρακτήρας του χωριού υποχωρεί.',{},{heritage:-13,trust:-3},{money:45}),
  ]},
  {id:'order',title:'Μια παραγγελία για τις σκάφες σας',name:'Η παραγγελία του τεχνίτη',text:'Ένας έμπορος είδε τη δουλειά των σκαφάδων και ζητά ένα μικρό πακέτο προϊόντων. Μπορείτε να το αναλάβετε;',choices:[
    choice('complete','Παραδίδεις ολόκληρη την παραγγελία','Οκτώ χειροποίητα είδη σε καλή τιμή.',{goods:8},{trust:3,heritage:2},{money:76}),
    choice('sample','Στέλνεις ένα δείγμα','Δύο προϊόντα και μια πρώτη μικρή συνεργασία.',{goods:2},{trust:2},{money:17}),
    choice('later','Κλείνετε νέα συζήτηση αργότερα','Δεν δεσμεύεις απόθεμα που χρειάζεται το χωριό.',{},{order:1}),
  ]},
  {id:'photo',title:'Φωτογράφοι στη γειτονιά',name:'Μια εικόνα που ταξιδεύει',text:'Επισκέπτες θέλουν να φωτογραφίσουν τις αποκαταστάσεις και να γνωρίσουν τους τεχνίτες. Μερικοί κάτοικοι θέλουν πρώτα μια κουβέντα.',choices:[
    choice('consent','Συνεννόηση και μικρή ξενάγηση','Οργανώνεις τη διαδρομή με όσους θέλουν να συμμετέχουν.',{food:5},{trust:4,heritage:4},{money:12}),
    choice('public','Μόνο δημόσιοι χώροι και τοπία','Σέβεσαι τον χώρο των κατοίκων χωρίς επιπλέον κόστος.',{},{trust:3,heritage:2}),
    choice('crowd','Διαφημίζεις ανοιχτή περιήγηση παντού','Περισσότερος κόσμος τώρα, αλλά δυσαρέσκεια στις αυλές.',{},{trust:-7,heritage:-3},{money:28}),
  ]},
];

export const NPCS = [
  {id:'sofia',name:'Σοφία',role:'Γραμματέας της κοινότητας',buildingId:'office',color:'#547d79',text:'Μουχτάρη, το χωριό δεν θέλει μεγάλα λόγια. Νερό στη βρύση, μια δουλειά για τον καθένα και ένα τεφτέρι που να βγαίνει.',choices:[
    choice('open_books','Ανοίγουμε το τεφτέρι μαζί','Κοιτάζετε τις οφειλές και εξηγείτε τα έξοδα στους κατοίκους.',{},{order:3,trust:2}),
    choice('supplies','Μικρό αποθεματικό ανάγκης','Με CY£ 12 οργανώνεις βασικές προμήθειες αξίας μεγαλύτερης από το κόστος.',{money:12},{trust:1},{food:20,wood:3}),
  ]},
  {id:'savvas',name:'Κυρ Σάββας',role:'Σκαφάς',buildingId:'woodshop',color:'#b0804c',text:'Η σκάφη θέλει υπομονή και σωστό ξύλο. Αν φτιάξεις το εργαστήρι, θα δείξουμε και στους νέους πώς δουλεύεται.',choices:[
    choice('listen','Πες μου για την τέχνη σου','Ακούς τον τεχνίτη και κρατάς σημειώσεις για το εργαστήρι.',{},{heritage:3,trust:2}),
    choice('sample','Υλικά για μια μικρή επίδειξη','Πέντε μονάδες ξύλου γίνονται δύο χειροποίητα είδη.',{wood:5},{heritage:2},{goods:2}),
  ]},
  {id:'maroulla',name:'Μαρούλλα',role:'Περιβολάρισσα',buildingId:'orchard',color:'#6e8d52',text:'Το περιβόλι δεν μεγαλώνει με διατάγματα. Θέλει νερό, καθαρές πεζούλες και χέρια που επιστρέφουν κάθε μέρα.',choices:[
    choice('listen','Συμφωνούμε στη σειρά ποτίσματος','Η φροντίδα της παραγωγής αρχίζει με καλή συνεννόηση.',{},{order:3,trust:2}),
    choice('basket','Αγοράζεις το κοινοτικό καλάθι','Τοπικές προμήθειες σε συμφωνημένη τιμή.',{money:10},{trust:2},{food:18}),
  ]},
  {id:'lefteris',name:'Λευτέρης',role:'Η παρέα «Τεφτέρι»',buildingId:'cafe',color:'#ab6853',text:'Εγώ δεν είπα ότι δεν πληρώνω! Είπα να πληρώσω μόλις τελειώσει η παρτίδα. Εντάξει… κρατά από χτες.',choices:[
    choice('agreement','Μικρή δόση και μια καθαρή συμφωνία','Ένα πρακτικό βήμα που μπορεί να τηρηθεί.',{},{order:4,trust:2},{money:6}),
    choice('volunteer','Βοήθεια στην πλατεία αντί για μουρμούρα','Η παρέα συμμετέχει σε μια κοινή δουλειά.',{},{order:3,trust:3}),
  ]},
  {id:'eleni',name:'Ελένη',role:'Οικοδέσποινα',buildingId:'inn',color:'#ae8866',text:'Ο επισκέπτης θα θυμάται τη φιλοξενία μας. Αν το χωριό γίνει βιτρίνα, τι ακριβώς θα του δείξουμε;',choices:[
    choice('route','Σχεδιάζετε μια ήρεμη διαδρομή','Μικρές παρέες, αληθινές ιστορίες και σεβασμός στις αυλές.',{},{heritage:3,trust:2}),
    choice('welcome','Καλάθι καλωσορίσματος','Τοπικά προϊόντα για την επόμενη μικρή παρέα.',{food:6,goods:1},{trust:3},{money:16}),
  ]},
  {id:'andreas',name:'Αντρέας',role:'Λιθοξόος',buildingId:'stone',color:'#85847a',text:'Τούτη η πέτρα ξέρει ήδη τον τόπο της. Να τη φροντίσουμε και να την ξαναβάλουμε σωστά, πριν ζητήσουμε καινούργια.',choices:[
    choice('materials','Σχεδιάζετε τις επόμενες επισκευές','Διατηρείτε υλικά και αναλογίες που ταιριάζουν στα σπίτια.',{},{heritage:3,order:2}),
    choice('sort','Μικρή διαλογή παλιάς πέτρας','Εξασφαλίζεις υλικό για το επόμενο συνεργείο.',{money:8},{nature:2},{stone:12}),
  ]},
  {id:'anna',name:'Άννα',role:'Επισκέπτρια από την Ελλάδα',buildingId:'trail',color:'#748a9e',text:'Ήρθα για έναν ήρεμο περίπατο και για να γνωρίσω το χωριό. Πώς συνδέονται το νερό, τα μνημεία και οι άνθρωποι που δουλεύουν εδώ;',choices:[
    choice('stories','Της δείχνεις τη διαδρομή και μιλάτε για τον τόπο','Ξενάγηση με σεβασμό στις γειτονιές και τις όχθες.',{},{heritage:3,trust:2},{money:8}),
    choice('walk','Οργανώνεις περίπατο με τοπικό καλάθι','Μια μικρή εμπειρία με ντόπια προϊόντα και χωρίς βιασύνη.',{food:6,goods:1},{heritage:3,trust:3},{money:25}),
  ]},
  {id:'james',name:'Τζέιμς',role:'Επισκέπτης από τη Βρετανία',buildingId:'church',color:'#718d83',text:'Διάβασα για την Παναγία του Μουτουλλά και θέλω να μάθω την ιστορία της. Θα μπορούσες να μου δείξεις τον τόπο και τη δουλειά των ντόπιων τεχνιτών;',choices:[
    choice('monument','Μιλάτε για την εκκλησία του 1280','Εξηγείς ότι το μνημείο προϋπάρχει και οι εργασίες συντήρησης ανατίθενται σε ειδικούς.',{},{heritage:4,trust:1},{money:8}),
    choice('craft_visit','Περιήγηση στο χωριό και ένα χειροποίητο ενθύμιο','Ο επισκέπτης γνωρίζει τη σκαφική και στηρίζει τη μικρή παραγωγή.',{goods:2},{heritage:3,trust:2},{money:22}),
  ]},
];

const mission = (id,name,description,chapter,goal,reward,extra={}) => ({id,name,title:name,description,chapter,goal,reward,...extra});
export const MISSIONS = [
  mission('water','Η πρώτη υπόσχεση','Αποκατάστησε την κοινοτική βρύση.',1,{type:'project',id:'repair_fountain'},{money:30,wood:10,food:12}),
  mission('square','Χώρος για να ξαναβρεθούμε','Καθάρισε την πλατεία και επισκέψου 3 σημεία του χωριού.',1,{type:'all',goals:[{type:'project',id:'clean_square'},{type:'visits',count:3}]},{money:25,stone:15}),
  mission('voices','Άκου πριν διατάξεις','Μίλησε με 3 διαφορετικούς κατοίκους και λύσε το πρώτο περιστατικό.',1,{type:'all',goals:[{type:'talks',count:3},{type:'events',count:1}]},{money:35,food:15},{metrics:{trust:3}}),
  mission('craft','Η τέχνη ζωντανεύει','Επισκεύασε το εργαστήρι και ανέθεσε τουλάχιστον έναν σκαφά.',1,{type:'all',goals:[{type:'project',id:'restore_woodshop'},{type:'assigned',role:'craft',count:1}]},{money:40,wood:18}),
  mission('roofs','Τρεις στέγες, τρεις ανάσες','Φέρε 3 πέτρινα σπίτια σε κατάσταση τουλάχιστον 60%.',2,{type:'houses',count:3,condition:60},{money:65,wood:20,stone:25}),
  mission('food','Το χωριό τρέφεται','Αποκατάστησε το αρδευτικό και τον κοινοτικό φούρνο.',2,{type:'all',goals:[{type:'project',id:'irrigation'},{type:'project',id:'oven_restore'}]},{money:65,food:35}),
  mission('trade','Τα προϊόντα βρίσκουν δρόμο','Άνοιξε την αγορά και παρήγαγε 8 προϊόντα στο εργαστήρι.',2,{type:'all',goals:[{type:'project',id:'market_restore'},{type:'produced',resource:'goods',count:8}]},{money:75,wood:25}),
  mission('welcome','Καλώς να ορίσετε','Αποκατάστησε ξενώνα και μονοπάτι. Κέρδισε CY£ 10 από εργαζόμενους στη φιλοξενία.',2,{type:'all',goals:[{type:'project',id:'inn_restore'},{type:'project',id:'trail_clear'},{type:'tourism',count:10}]},{money:85,goods:8}),
  mission('nature','Το δάσος είναι συνεργάτης','Ολοκλήρωσε το σχέδιο δάσους και μία φύτευση. Φέρε τη φύση στο 60%.',3,{type:'all',goals:[{type:'project',id:'forest_plan'},{type:'project',id:'plant_trees'},{type:'metric',metric:'nature',count:60}]},{money:75,wood:20},{metrics:{nature:3}}),
  mission('memory','Η μνήμη θέλει φροντίδα','Αποκατάστησε τα πλυσταριά και ανέθεσε τη μελέτη για την Παναγία.',3,{type:'all',goals:[{type:'project',id:'restore_wash'},{type:'project',id:'church_survey'}]},{money:90,stone:25},{metrics:{heritage:3}}),
  mission('apprentices','Η επόμενη γενιά','Άνοιξε τη σχολή τεχνών και το συνεργατικό παντοπωλείο.',3,{type:'all',goals:[{type:'project',id:'school_restore'},{type:'project',id:'cooperative_restore'}]},{money:120,wood:30,stone:30}),
  mission('fairness','Ένα τεφτέρι για όλους','Άνοιξε το κοινοτικό αρχείο, επίλυσε 5 περιστατικά και φέρε την τάξη στο 55%.',3,{type:'all',goals:[{type:'project',id:'office_archive'},{type:'events',count:5},{type:'metric',metric:'order',count:55}]},{money:100,food:40}),
  mission('monument','Το 1280 συναντά το αύριο','Ολοκλήρωσε τη συντήρηση του μνημείου από ειδικούς και κράτησε την κληρονομιά τουλάχιστον στο 75%.',4,{type:'all',goals:[{type:'project',id:'church_conserve'},{type:'metric',metric:'heritage',count:75}]},{money:140,goods:15}),
  mission('neighborhood','Σπίτια με ζωή','Αποκατάστησε 8 σπίτια στο 60%, τα καλντερίμια και κράτησε την εμπιστοσύνη στο 65%. Απαιτούνται 24 ώρες εκστρατείας.',4,{type:'all',goals:[{type:'houses',count:8,condition:60},{type:'project',id:'stone_lanes'},{type:'metric',metric:'trust',count:65},{type:'elapsed',count:86400}]},{money:180,wood:45,stone:50}),
  mission('future','Παραγωγικό, με τον χαρακτήρα του','Ολοκλήρωσε τη συμφωνία του χωριού, το δίκτυο φιλοξενίας και την προηγμένη μαθητεία.',4,{type:'all',goals:[{type:'project',id:'village_covenant'},{type:'project',id:'guest_network'},{type:'project',id:'master_craft'}]},{money:220,food:80,goods:20}),
  mission('homecoming','Το χωριό στάθηκε ξανά στα πόδια του','Μετά από τουλάχιστον 72 ώρες εκστρατείας: μεγάλη γιορτή, 10 σπίτια στο 60%, εμπιστοσύνη 75%, τάξη 70%, κληρονομιά 80% και φύση 60%.',5,{type:'all',goals:[{type:'elapsed',count:259200},{type:'project',id:'annual_festival'},{type:'houses',count:10,condition:60},{type:'metric',metric:'trust',count:75},{type:'metric',metric:'order',count:70},{type:'metric',metric:'heritage',count:80},{type:'metric',metric:'nature',count:60}]},{money:350},{metrics:{trust:4},final:true}),
];

export const CHAPTERS = [
  {id:1,name:'Να σταθεί το χωριό',description:'Νερό, πλατεία, πρώτες κουβέντες και δουλειές.',minElapsed:0},
  {id:2,name:'Χέρια στην παραγωγή',description:'Στέγες, τρόφιμα, αγορά και μικρές παρέες επισκεπτών.',minElapsed:3600},
  {id:3,name:'Εμπιστοσύνη και μνήμη',description:'Τέχνες, συνεργασία, δίκαιοι κανόνες και φροντίδα της φύσης.',minElapsed:28800},
  {id:4,name:'Το χωριό βρίσκει ρυθμό',description:'Μεγάλες αποκαταστάσεις σε ανθρώπινη κλίμακα.',minElapsed:86400},
  {id:5,name:'Η γιορτή της επιστροφής',description:'Η κοινότητα στέκεται μόνη της. Η ζωή συνεχίζεται.',minElapsed:172800},
];

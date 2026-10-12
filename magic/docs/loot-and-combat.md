# MAGIC 1.3.0 — ρίψεις, Goliath και μόνιμος εξοπλισμός

Εγκεκριμένες και οι τρεις φάσεις. Inventory και εξοπλισμός παραμένουν μετά από θάνατο, νέα προσπάθεια και reload. Τα φίλτρα καταναλώνονται όταν χρησιμοποιούνται. Εκτέλεση με τη ρητά εγκεκριμένη ρύθμιση GPT-6.1 Sol xhigh, χωρίς agents, εγκαταστάσεις, αλλαγές dependencies ή πληρωμένες κλήσεις παραγωγής assets.

## Χειρισμός

- Κλικ/άγγιγμα για αρπαγή και σύρσιμο. Το σημείο του pointer/δαχτύλου επιλέγει στόχο· η πρόσφατη κίνηση δίνει δύναμη. Η αναστροφή του swipe δεν ακυρώνει τη δύναμη. Το σημάδι δείχνει τον στόχο, το πορτοκαλί σημάδι την πρόσκρουση σε τοίχο. Μικρή γραμμή δείχνει μόνο την πραγματική αναπήδηση ή την πλευρική μετατόπιση εχθρού.
- **I / ΣΑΚΟΣ:** 24 θέσεις, τέσσερις θέσεις εξοπλισμού, σύγκριση attributes, εξοπλισμός/αφαίρεση, χρήση φίλτρου και διάλυση. Το παιχνίδι παγώνει όσο είναι ανοιχτό. I ή Esc για κλείσιμο.
- **1:** φίλτρο ζωής. **2:** φίλτρο ενέργειας. Υπάρχουν αντίστοιχα πλήκτρα αφής. Πλήρης μπάρα δεν καταναλώνει φίλτρο.
- Κάθε εχθρός αφήνει ένα αντικείμενο. Οι bosses αφήνουν εξοπλισμό Lv 3–5. Η συλλογή γίνεται με προσέγγιση. Γεμάτος σάκος κρατά το drop στο έδαφος. Διάλυση αφόρετου εξοπλισμού δίνει μόνιμα θραύσματα για τις υπάρχουσες αναβαθμίσεις.
- Το όριο 10 πετρών, κράτημα R με 7 κοντινές πέτρες και η συναρμολόγηση πέτρα προς πέτρα διατηρούνται. Ο Goliath ακολουθεί, προσελκύει χτυπήματα, αναχαιτίζει βέλη και χτυπά με εναλλασσόμενα χέρια. Η ζημιά 34 εφαρμόζεται μία φορά στο τέλος της προέκτασης, με έλεγχο απόστασης/ύψους/τοίχων. Δεν χτυπά τον εχθρό που κρατά ο μάγος.

## Εξοπλισμός

| Επίπεδο | Χρώμα | Κατηγορία |
|---|---|---|
| 1 | Γκρι | Κοινό |
| 2 | Πράσινο | Ενισχυμένο |
| 3 | Μπλε | Σπάνιο |
| 4 | Μοβ | Επικό |
| 5 | Χρυσό | Θρυλικό |

Ράβδος: μαγική ζημιά. Μανδύας: ζωή και άμυνα. Φυλαχτό: ενέργεια και αναγέννηση. Δαχτυλίδι: ταχύτητα και αναμονή. Τα υψηλότερα επίπεδα προσθέτουν attributes και τρεις παραλλαγές ανά τύπο. Ακριβείς τιμές: `_source/src/loot.js`. Εξοπλισμός δεν θεραπεύει δωρεάν ούτε διπλασιάζει τα bonus με επανειλημμένο equip. Μείωση ζημιάς/αναμονής έως 30% συνολικά.

## Προστασία και διάγνωση

Κύρια έκδοση `C:/Users/arz0r/Documents/ChatGPT/Magic`, branch `codex/trajectory-collision`, commit `30717d7`. Ανεξάρτητο checkout `C:/Users/arz0r/.codex/worktrees/magic-goliath-concept/Magic`, branch `codex/loot-and-combat`, βάση `9cec13c` (1.2.1). Η μοναδική θύρα παραμένει 5173. Το άσχετο untracked `concepts/` της κύριας έκδοσης διατηρείται.

Προστατευμένο build: <http://127.0.0.1:5173/.cache/goliath-build/>. Νέο source: <http://127.0.0.1:5173/.cache/loot-game/>. Νέο compiled preview: <http://127.0.0.1:5173/.cache/loot-build/>. Διακριτή αποθήκευση `magic-loot-preview-v1`, με εφάπαξ αντίγραφο των έγκυρων προηγούμενων δεδομένων χωρίς εγγραφή στις αρχικές αποθηκεύσεις. Δεν υπάρχει Git remote· δημόσια έκδοση και κύρια έκδοση δεν προωθούνται με αυτό το task.

Στον τελικό έλεγχο η κύρια έκδοση είχε προχωρήσει ανεξάρτητα στο `8aab99a`, με νέα boss assets και σχετική ενσωμάτωση. Αυτές οι παράλληλες αλλαγές διατηρούνται άθικτες. Το παρόν candidate παραμένει στη συμφωνημένη βάση `9cec13c` και δεν τις έχει συγχωνεύσει. Το commit/preview αυτού του task δεν αντικαθιστά την κύρια έκδοση.

Αίτια: η παλιά ρίψη υπολόγιζε τη διεύθυνση από τον μάγο ενώ η εκτόξευση ξεκινούσε από το κρατούμενο σώμα, με σταθερή ανοδική ταχύτητα. Η νέα λύση υπολογίζει την ίδια αποσβεσμένη κίνηση του Cannon από το πραγματικό σημείο εκτόξευσης, με περιορισμένη πρόβλεψη τρέχουσας ταχύτητας στόχου. Δεν αλλάζει πορεία μετά την απελευθέρωση. Το forecast δεν προβλέπει μελλοντικές αποφάσεις AI ή νέα inputs.

Το σώμα του Goliath κοιμόταν ενώ η παλιά κίνηση παιζόταν από το γενικό χρονόμετρο. Τώρα η κίνηση βασίζεται στην πραγματική μετατόπιση και σε σταθερό πόδι στήριξης. Ο τελικός έλεγχος αποκάλυψε κόλλημα σε ζεύγη βαρελιών. Πλάγιες παρακάμψεις και ένα δυναμικό πλέγμα δεν αρκούσαν: το πλέγμα έκλεινε πραγματικά περάσματα και δημιουργούσε μεγάλες διαδρομές. Μικρές συνεχείς διαδρομές γύρω από τα πραγματικά AABB των props κρατούν την αρχική διαδρομή του κάστρου. Οι φυσικές συγκρούσεις παραμένουν ενεργές.

## Επαναλήψιμοι έλεγχοι

Από το isolated checkout, με τον υπάρχοντα server ενεργό:

```powershell
cd _source
npm test
npm run test:physics
npm run build
cd ..
node _source/scripts/serve-loot-game.mjs 'C:/Users/arz0r/Documents/ChatGPT/Magic/_source'
node _source/scripts/verify-marked-throws.mjs
node _source/scripts/verify-loot-combat.mjs
node _source/scripts/verify-goliath-navigation.mjs
$env:MAGIC_TEST_URL='http://127.0.0.1:5173/.cache/loot-build/'
node scripts/verify-goliath-build.mjs
node _source/scripts/verify-loot-combat.mjs --compiled
```

Η αρχική αναπαραγωγή, τα αποτυχημένα διαγνωστικά και τα τελικά reports διατηρούνται στο ignored `output/`. Οι native χειρισμοί χρησιμοποιούν owned Chrome με πραγματικό WebGL. Τα source fixtures εισάγουν ελεγχόμενη κατάσταση στη module closure μόνο στο test response. Το compiled build ελέγχεται χωρίς αλλαγή του bundle. Η συλλογή όλων των πέντε επιπέδων σε screenshots inventory είναι δηλωμένο test fixture· πραγματικοί θάνατοι/drop/pickup ελέγχονται χωριστά. Touch emulation δεν αποδεικνύει φυσικό τηλέφωνο ή Safari.

## Αποτελέσματα τοπικής επαλήθευσης

| Έλεγχος | Αποτέλεσμα | Report στο `output/loot-combat/` |
|---|---|---|
| Unit tests | 79/79 | `unit-final.log` |
| Πραγματικά impact/hurt, ρίψεις και αποστολή | 0 failures | `physics-final.log` |
| Native ρίψεις PC/αφής, side preview, τοίχοι, δύναμη | 18/18 | `marked-final/report.json` |
| Inventory, drops, επιμονή, gait και melee | 77/77 | `integration-final/report.json` |
| Κάστρο, ritual, προστασία, πόρτες, τέσσερις boss channels, αποστολή | 137/137 | `castle-navigation-final/game-report.json` |
| Planner, τέσσερα seeded ζεύγη, ίδιο υπόλοιπο runtime | 4/4 μετά, 2/4 αποτυχίες πριν | `navigation-verified/report.json` |
| Compiled native χειρισμοί, ritual και worker | 19/19 | `compiled-verified/report.json` |
| Τελικό compiled inventory, απόκρυψη/επαναφορά joystick | 35/35 | `compiled-inventory-clean/report.json` |
| Τελικό game-skill movement/dash smoke | Επιτυχές | `skill-release/` |

Κανένα game error στα τελικά browser reports, κανένα υπόλοιπο PID των owned browsers. Το source report77 και το video gait/strike έγιναν πριν την τελευταία διόρθωση planner, χωρίς props στη σκηνή της κίνησης. Ο planner επαληθεύτηκε χωριστά και στη συνολική δοκιμή137. Το compiled report19 προηγείται της μικρής CSS διόρθωσης joystick· ο κώδικας/worker διατηρείται, ενώ το τελευταίο UI/build ελέγχθηκε με35 tests και τελικό smoke. Ζωντανός χρονισμός και μικρές διαφορές θέσεων/input timing παραμένουν στα seeded ζεύγη.

Διορθώθηκαν επίσης ακύρωση της δύναμης στην αναστροφή swipe, πρόωρο τέλος preview στο πρώτο άγγιγμα εδάφους αντί της επόμενης σύγκρουσης με τοίχο, και joystick πάνω από το inventory. Ένα test έκλεισε context με ενεργό routed request: προστέθηκε αναμονή handlers πριν το cleanup, χωρίς αλλαγή κριτηρίων gameplay. Αποτυχημένα reports/logs διατηρούνται.

Εικόνες: [ρίψη πριν](../output/loot-preflight/crate-drag-before.png), [σημάδι μετά](../output/loot-combat/marked-final/pc-enemy-crate.png), [side preview](../output/loot-combat/marked-final/pc-side-crate.png), [desktop inventory](../output/loot-combat/compiled-inventory-clean/desktop-inventory.png), [inventory αφής](../output/loot-combat/compiled-inventory-clean/portrait-inventory.png). Οι ρίψεις έχουν ίδια σκηνή, κάμερα και1440×900· διαφέρουν held-body θέση, mana και χρόνος toasts. [Κίνηση Goliath](../output/loot-combat/goliath-motion-final.mp4): απόσπασμα8–15.6s της [πραγματικής καταγραφής](../output/loot-combat/integration-final/desktop.webm), χωρίς καλλωπισμό εικόνας.

## Απόδοση και artifact

`performance-final/report.json`: Chrome, RTX5080/ANGLE D3D11, DPR1, desktop1440×900 high και touch390×844 low, seed7431,180 δείγματα ανά σενάριο. Στόχος PC: CPU frame p95<16.7ms, καμία αιχμή>50ms. Συγκρίθηκαν isolated Goliath, castle crowd,20 drops και Goliath στο γεμάτο κάστρο. Και τα16 σενάρια χωρίς καρέ>50ms. Νέα έκδοση: desktop CPU p95 έως5.1ms, φορτωμένος Goliath/loot4.8ms· touch emulation έως4.9ms. Παρατηρούμενο rAF p95≈4.3ms· δεν αποτελεί hardware FPS ούτε απόδειξη αιτιώδους επιτάχυνσης από μία διαδοχική εκτέλεση.

Στο στατικό castle crowd,20 drops προσθέτουν60 draw calls,1,960 τρίγωνα,2 geometries και20 textures. Έξι επανεκκινήσεις με drops: σταθερά62 geometries/45 textures. Πόδι στήριξης: ολίσθηση<0.015m. Φυσικό κινητό/Safari, GPU utilization, απόλυτη RAM/VRAM, μακρά συνεδρία και πλήρης offline εγκατάσταση δεν μετρήθηκαν.

Build1.3.0:18 runtime files,3.57MiB, main `engine/index-BsqsG0uF.js`, worker `engine/trajectory-worker-C_6nxUnO.js`, CSS `engine/index-Chto8TQZ.css`, offline cache `96de2981bea16757de7c8bb9`. Παραμένει η υπάρχουσα προειδοποίηση Vite για chunk>500kB.

Το source diff περνά whitespace check. Το generated bundle έχει τις ίδιες πέντε γραμμές trailing whitespace μέσα στα GLSL strings που είχε η βάση9cec13c, επαληθευμένες byte προς byte· δεν μεταβλήθηκαν οι shaders για να καλυφθεί το warning.

`provenance.json`:18/18 νέα αρχεία ταιριάζουν με το build μέσω SHA256·18/18 προστατευμένα με τη βάση9cec13c. Ο Vite μετασχηματίζει HTML/JS/CSS: ο έλεγχος αποκωδικοποιεί `?raw&import` για το ακριβές artifact source, με απευθείας HTTP bytes για binary files. Μόνο στη σύγκριση Git της προστατευμένης βάσης κανονικοποιούνται CRLF/LF. Τα compiled requests/worker ελέγχθηκαν χωριστά στον browser.

Τελευταία μέτρηση account `get_usage_limits`,2026-10-11 22:23:33 Asia/Nicosia:12% του κοινού εβδομαδιαίου ορίου χρησιμοποιημένο, ordinary usage allowed. Χρήση που αποδίδεται στο task και καταναλωμένα credits: μη διαθέσιμα. Χωρίς paid API, αγορά ή reset.

Παράδοση με focused local commit στο `codex/loot-and-combat`. Συγχώνευση των νεότερων boss assets της κύριας έκδοσης και δημόσια προώθηση παραμένουν ξεχωριστές αποφάσεις. Τα screenshots/videos/reports του ignored `output/` είναι τοπικά και δεν περιλαμβάνονται στο Git commit.

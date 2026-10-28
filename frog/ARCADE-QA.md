# FROG 4.3.14 — στόχευση, χειρισμός και οπτική αναβάθμιση

28 Οκτωβρίου 2026.

## Αποτελέσματα

- **1.235/1.235 αυτοματοποιημένοι έλεγχοι** επιτυχείς, χωρίς αποτυχίες, παραλείψεις ή ακυρώσεις, σε 63,30 δευτερόλεπτα.
- Μετά την τελική ελάφρυνση της γεωμετρίας των φτερών επανελέγχθηκαν οι **23 σχετικοί έλεγχοι χάρτη και οπτικής ενσωμάτωσης**, όλοι επιτυχείς.
- **40/40 έλεγχοι πραγματικής διεπαφής σε Chromium** επιτυχείς πάνω στο τελικό production build: 0 runtime, console ή shader errors και 0 αποτυχίες πόρων παιχνιδιού.
- Το production build ολοκληρώθηκε. JavaScript: **index-B3r2HBjC.js**, 895.268 bytes. CSS: **index-C6AM5HRI.css**, 36.999 bytes.
- JavaScript SHA-256: **8b7ced6d3869c675ceee510b3daba4f67963c9a29719ae4f7187f11ab72b54c6**.
- Καταγράφηκαν 18 εικόνες. Ελέγχθηκαν οπτικά η κανονική κάτοψη, η κίνηση και το άλμα τρίτου προσώπου, τα ξύλινα δάπεδα και ο ανανεωμένος καταπέλτης.

## Συμπεριφορές που επιβεβαιώθηκαν

Η κάμερα τρίτου προσώπου κρατά τον βάτραχο κάτω και αριστερά από το σταυρόνημα. Οι δοκιμές χρησιμοποιούν τα όρια του πραγματικού σκελετωμένου μοντέλου, διαφορετικές αναλογίες οθόνης/φακού και το μέγιστο ύψος του άλματος. Η περιστροφή με ποντίκι έχει αυξημένη απόκριση, ενώ η κατακόρυφη κίνηση του άλματος δεν μετακινεί τη βάση της κάμερας.

Η σκόπιμη κατεύθυνση της βολής παραμένει μετά την απελευθέρωση του κουμπιού, την πλάγια μετακίνηση και την προσγείωση. Το Q και η ένδειξη κοντινής κλωτσιάς χρησιμοποιούν τον ίδιο έλεγχο διαθεσιμότητας· η σύντομη προστασία αμέσως μετά από εύστοχη βολή δεν κρατά την κλωτσιά ανενεργή. Η κλωτσιά προκαλεί μία επιτυχία και διατηρεί τους κανονικούς κανόνες knockout.

Η βοήθεια στόχευσης είναι κλειστή από προεπιλογή. Η επιλογή της από τις ρυθμίσεις αποθηκεύεται κανονικά. Το δεξί κλικ αποκτά έναν έγκυρο ορατό στόχο ανά κράτημα· απαιτείται ξεχωριστή βολή με αριστερό κλικ. Απελευθέρωση, αποκλεισμός από τοίχο ή απώλεια στόχου σταματούν το κλείδωμα, χωρίς αυτόματη μετάβαση σε άλλον αντίπαλο.

Τα πατώματα χρησιμοποιούν μία επιφάνεια με διακριτές σανίδες και ραφές. Οι έλεγχοι γεωμετρίας καλύπτουν 3.960 ακτίνες στα έξι δάπεδα. Η προεπισκόπηση του καταπέλτη ακολουθεί την ίδια καμπύλη με την πραγματική πέτρα και ο εξωτερικός κύκλος δείχνει την πραγματική ακτίνα χτυπήματος. Αποβίβαση, νέος γύρος, παύση και συνέχεια καθαρίζουν τα προηγούμενα στοιχεία στόχευσης.

Η νέα εμφάνιση διατηρεί τις θέσεις, τις διαδρομές και τις επιφάνειες σύγκρουσης. Ελέγχθηκαν η διαφάνεια της κοντινής φυλλωσιάς, τα υπάρχοντα shader hooks, οι αλλαγές στον πραγματικό shader του νερού και η αποδέσμευση των πρόσθετων πόρων. Η βλάστηση χρησιμοποιεί δύο πρόσθετα instanced batches και ο ουρανός μία πρόσθετη κλήση σχεδίασης.

## Αναφορά και ενδεικτικές εικόνες

- [Αναλυτικό αποτέλεσμα browser](qa/arcade-4314/report.json)
- [Κανονική κάτοψη του ανανεωμένου χάρτη](qa/arcade-4314/startup-topdown-single-reticle.png)
- [Καταπέλτης και κινούμενη τροχιά](qa/arcade-4314/high-quality-catapult-ready-complete-trajectory.png)

## Αναπαραγωγή και όρια

Οι βασικοί έλεγχοι εκτελούνται με npm test. Το qa/arcade-4314.mjs εκτελείται μετά από npm run build, με το dist διαθέσιμο σε τοπικό HTTP server και Playwright/Chromium. Οι μεταβλητές BASE_URL, OUT_DIR, PLAYWRIGHT_MODULE και CHROMIUM_EXECUTABLE επιτρέπουν ξεχωριστή εγκατάσταση του test runner.

Οι έλεγχοι browser χρησιμοποιούν desktop Chromium και software WebGL. Δεν αποτελούν μέτρηση FPS ούτε δοκιμή σε πραγματικό κινητό. Τα fixtures τοποθετούν και παγώνουν αντιπάλους, αλλά διατηρούν το παραγωγικό simulation, τα υλικά, τη στόχευση και τα πραγματικά πατήματα ποντικιού/πληκτρολογίου. Σε διαδοχικά βήματα παραλείπεται μόνο η ενδιάμεση σχεδίαση WebGL, όχι η λογική του παιχνιδιού.

Η συνολική εικόνα του χάρτη χρησιμοποιεί δηλωμένη υπερυψωμένη κάμερα επισκόπησης· η κοντινή λήψη καταπέλτη χρησιμοποιεί τον κανονικό μηχανισμό κάμερας με φακό 74 και zoom 1,15 για να χωρέσει όλη η καμπύλη. Οι εικόνες κίνησης χρησιμοποιούν τις κανονικές ρυθμίσεις παιχνιδιού. Η ομίχλη διατηρείται σε όλες τις λήψεις. Μόνο το αυτόματο αίτημα /favicon.ico απαντάται με 204 από το test harness, επειδή ο τοπικός server δεν διαθέτει εικονίδιο· όλα τα σφάλματα παιχνιδιού, shader και HTTP παραμένουν ενεργοί έλεγχοι.

---

## Προηγούμενες αναφορές

# FROG 4.3.1 — Controls and indoor-spawn repair

## Confirmed defects in 4.3.0

The previous camera followed the frog's movement, aim and kick heading. Freezing a world-space input direction concealed a real screen-space defect: holding D rotated the camera about 85 degrees, and holding S rotated it about 177 degrees, so the visible movement no longer matched the key. Mouse hover could rotate it about 79 degrees and the aim timeout could snap it back.

The old spawn was inside a fenced yard but outside the small canopy over the stock. The player also started off-center from the narrow doorway, so straight W hit its edge. Uneven natural ground did not match a level house interior. A legacy-save migration restarted preparation while retaining old outdoor positions.

The new browser regression reproduced **25 failed checks** against 4.3.0. It now measures actual per-frame displacement projected through the displayed camera, including repeated and overlapping keys. A constant world-space vector alone is no longer accepted as sufficient evidence.

## Repair

- The camera follows position with an independent yaw and pitch. Movement, aim, firing and kicking cannot rotate it. Right-button dragging, or dragging the empty world on touch, deliberately turns the view.
- WASD, arrows and the touch stick use the current displayed camera axes, including after an intentional orbit. Mouse aim stays under the cursor without a timed camera snap.
- Mouse-button chords, pointer cancellation and queued taps cannot leave an orbit stuck or fire an unintended shot. A cursor ray above the horizon uses a finite current direction rather than an old target.
- All three spawns are centered inside their actual full-size roofed houses and face the door. Shared floor/ramp heights drive the visible building and the rendered frog. The old decorative refuges were removed from the arcade scene.
- New rounds, KO returns and legacy migrations use the corrected spawns. Normal version-2 continuation retains intentional progress and position. The explicit **ΝΕΟΣ ΓΥΡΟΣ** menu action allows a fresh start.
- The loaded-frog render offset keeps swollen front feet above the new level floor.

## Validation

- **135/135 affected arcade tests passed**, covering the model, indoor spawn/migration/return, gates, houses, floor/ramp geometry, camera math, artillery and touch layout.
- **51/51 browser regression checks passed**, with zero uncaught runtime errors. The same harness exposes the prior camera and doorway defects.
- **10/10 final targeted browser checks passed** on the published candidate `index-CbD9qxyI.js`: mouse chords, version-2 continuation, explicit new-round reset and visible 60-fly indoor clearance. The only changes after the main desktop pass were that menu action and the verified render-only foot offset; the main mobile pass also used the final bundle.
- Desktop coverage includes isolated and repeated W/D/S/A, W→W+D→W, natural spawn-to-doorway travel, hover, firing, kick, intentional orbit, movement after orbit, chorded mouse-button release, queued taps and horizon aiming.
- Touch coverage checks screen-relative strafe while independently aiming, and deliberate world-drag orbit without firing.
- Actual skinned-frog geometry was checked for all three characters at 0, 30 and 60 flies, both graphics levels, over 121 idle poses: **2,178 posed bounds checks**. Bodies remain inside the walls and beneath the roof, clear of the basket; the load offset corrects visible foot penetration.
- Production build succeeds with 30 modules. Release assets: `index-CbD9qxyI.js` and `index-Z7y7G4VM.css`.
- Source/documentation whitespace checks pass. Generated Three.js shader strings retain upstream trailing whitespace.

## Reproduce

From `frog/source`:

```sh
npm ci
node --test --test-isolation=none tests/arcade*.test.mjs
npm run build
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

With Playwright and Chromium installed, use another terminal:

```sh
node qa/arcade-431.mjs
QA_SCOPE=final-checks node qa/arcade-431.mjs
```

`BASE_URL` overrides the local server, `PLAYWRIGHT_MODULE` selects an existing installation, and `OUT_DIR` selects the evidence folder. To reproduce the earlier regression against the archived 4.3.0 build, set `EXPECTED_VERSION=4.3.0 QA_MODE=reproduce`.

## Limits

Browser checks use Chromium with software WebGL and emulated touch; they do not measure FPS on a physical iPhone or Android. Real keyboard, mouse and touch events feed the production frame function. Free-area fixtures separate controller behavior from enemy pressure and obstacles, while a separate natural-start check traverses the real house doorway. Screenshots verify the actual rendered scene.

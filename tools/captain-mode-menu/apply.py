from pathlib import Path
r=Path(__file__).resolve().parents[2]/'captain'
p=r/'index.html';s=p.read_text()
if 'id="modeSelectionTitle"' in s:
 print('Main-menu mode selector already applied');raise SystemExit(0)
s=s.replace('<title>LAST CALL — Καπετάνιος στη φουρτούνα</title>','<title>LAST CALL — Ιστορία / Mayhem</title>')
s=s.replace('</head>','<meta name="captain-menu" content="1.0">\n<link rel="stylesheet" href="./mode-menu.css?v=1">\n<script defer src="./mode-menu.js?v=1"></script>\n</head>')
s=s.replace('<section id="intro" class="screen">','<section id="intro" class="screen mode-hub" data-selected-mode="story">')
s=s.replace('UTTER CHAOS · ΚΕΦΑΛΑΙΟ 01','ΕΝΑΣ ΚΑΠΕΤΑΝΙΟΣ. ΔΥΟ ΤΡΟΠΟΙ ΝΑ ΠΑΙΞΕΙΣ.',1)
a='        <p class="tagline">Μία γουλιά.<br>Μία καταστροφική βάρδια.</p>'
assert a in s
s=s.replace(a,'''        <div class="mode-selection" aria-labelledby="modeSelectionTitle">
          <h2 id="modeSelectionTitle">ΕΠΙΛΟΓΗ MODE</h2>
          <div class="mode-cards" role="tablist" aria-label="Επιλογή παιχνιδιού">
            <button type="button" class="mode-card" id="modeStory" role="tab" aria-selected="true" aria-controls="storyModePanel" tabindex="0">
              <span class="mode-card-top"><span>01 / STORY</span><span class="mode-selected" aria-hidden="true">✓</span></span>
              <strong>ΙΣΤΟΡΙΑ</strong><small>Καβγάδες · κελί · απόδραση</small>
            </button>
            <button type="button" class="mode-card mode-card-mayhem" id="modeMayhem" role="tab" aria-selected="false" aria-controls="mayhemModePanel" tabindex="-1">
              <span class="mode-card-top"><span class="mode-new">ΝΕΟ MODE</span><span class="mode-selected" aria-hidden="true">✓</span></span>
              <strong>MAYHEM</strong><small>Ελεύθερο χάος · χωρίς τέλος</small>
            </button>
          </div>
        </div>
        <div id="storyModePanel" class="mode-panel" role="tabpanel" aria-labelledby="modeStory">
        <p class="tagline">Μία γουλιά. Μία καταστροφική βάρδια.</p>''')
b='        <div class="intro-help"><span><b>A D / ← →</b> Τιμόνι</span><span><b>W S / ↑ ↓</b> Μηχανές</span><span><b>C</b> Κάμερα</span><span><b>9</b> Ουίσκι · <b>F</b> Σήκω</span></div>'
assert b in s
s=s.replace(b,b+'''
        </div>
        <div id="mayhemModePanel" class="mode-panel" role="tabpanel" aria-labelledby="modeMayhem" hidden>
          <p class="tagline">Δικό σου το πλοίο. Δικοί σου οι μπελάδες.</p>
          <p class="intro-description">Περπάτα μεθυσμένος, πλάκωσέ τους και κάνε ζημιές. Σπάσε περάσματα, πέτα έπιπλα και ξέφυγε από την ασφάλεια.<br><b>Χωρίς θελήματα. Χωρίς υποχρεωτικό κελί.</b></p>
          <div class="mode-features"><span>ΕΛΕΥΘΕΡΗ ΚΑΤΑΣΤΡΟΦΗ</span><span>6 ΚΑΤΑΣΤΡΩΜΑΤΑ</span></div>
          <a id="launchMayhem" class="primary-button mode-launch" href="../captain-mayhem/?v=100"><span>ΠΑΙΞΕ MAYHEM</span><span aria-hidden="true">→</span></a>
          <p class="mode-save-note">Ξεχωριστή πρόοδος. Η αποθήκευση της Ιστορίας μένει ανέπαφη.</p>
        </div>''')
s=s.replace('ΚΑΤΕΒΑ · ΠΡΟΚΑΛΕΣΕ · ΑΝΤΙΣΤΑΘΟΥ','ΙΣΤΟΡΙΑ / MAYHEM · ΕΠΙΛΕΞΕ MODE',1)
p.write_text(s)
print('Main-page mode selection added. No gameplay or save files changed.')

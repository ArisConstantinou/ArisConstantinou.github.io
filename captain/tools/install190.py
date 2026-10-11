from pathlib import Path
import base64,zlib,json,hashlib,re
R=Path(__file__).resolve().parents[2]
T=Path(__file__).parent
parts=[p.read_text().strip() for p in sorted(T.glob('payload190-*.txt'))]
assert len(parts)==5,'Five bundle parts required'
# Correct a transport transcription, then require the exact locally generated bundle hash.
parts[3]=parts[3].replace('lIKGoo+yiiV','lIKoo+yiiV')
blob=''.join(parts)
expected='bb183a5eb1773cadd9b0fa037f80fbf656f4c9bc405feca2d4ec51289762a274'
if hashlib.sha256(blob.encode()).hexdigest()!=expected:
 for i,p in enumerate(parts,1):
  b=p.encode();print('PART',i,len(b),hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest())
 raise RuntimeError('Bundle integrity check failed')
manifest=json.loads(zlib.decompress(base64.b64decode(blob)))
for f in manifest:
 rel=Path(f['path'])
 assert rel.parts[0] in ('captain','captain-mayhem') and '..' not in rel.parts
 if 'content' in f:s=f['content']
 else:
  s=(R/f['base']).read_text()
  assert hashlib.sha256(s.encode()).hexdigest()==f['hash'],'Baseline changed: '+f['base']
  lines=s.splitlines(keepends=True)
  for a,b,v in reversed(f['edits']):lines[a:b]=[v]
  s=''.join(lines)
 p=R/rel;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(s)
 print('GENERATED',rel,len(s))
for folder,entry,version in [('captain','main190.js','1.9.0'),('captain-mayhem','main110.js','MAYHEM 1.1.0')]:
 p=R/folder/'index.html';s=p.read_text()
 s=re.sub(r'<meta name="captain-build" content="[^"]+">',f'<meta name="captain-build" content="{version}">',s)
 s=re.sub(r'<script type="module" src="\./main(?:\d+)?\.js(?:\?[^\"]*)?"></script>',f'<script type="module" src="./{entry}?v=190"></script>',s)
 if folder=='captain':
  css='<link rel="stylesheet" href="./repair190.css?v=190">'
  s=re.sub(r'(href="\.\./captain-mayhem/)\?v=\d+',r'\1?v=110',s)
 else:
  css='<link rel="stylesheet" href="../captain/repair190.css?v=190"><link rel="stylesheet" href="./marine190.css?v=190">'
  s=s.replace('SANDBOX / MS AURORA','OPEN SEA / MS AURORA')
  s=s.replace('Σπάσε περάσματα. Στείλε έπιπλα στον αέρα. Παίξε με την κλίση του πλοίου και ξέφυγε από την ασφάλεια.','Ξεκίνα σε καθαρή θάλασσα κοντά στο λιμάνι. Κυβέρνησε το πλοίο, εξερεύνησε τους χώρους και παίξε με μηχανισμούς και αντικείμενα. Αν επιτεθείς στην ακτοφυλακή, αρχίζει ατελείωτη καταδίωξη.')
 if 'repair190.css' not in s:s=s.replace('</head>',css+'</head>')
 p.write_text(s)
p=R/'captain/sw.js';s=p.read_text();s=re.sub(r"last-call-1\.8\.[^'\"]+",'last-call-1.9.0',s)
core=[f['path'].removeprefix('captain/') for f in manifest if f['path'].startswith('captain/') and not f['path'].startswith('captain/tools/') and f['path'].endswith(('.js','.css'))]
s=s.replace('const CORE=[','const CORE='+json.dumps(core)[:-1]+',',1);p.write_text(s)
print('Integrated Story 1.9.0 and Mayhem 1.1.0; preserved original mode menu and saves')

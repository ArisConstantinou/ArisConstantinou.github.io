"""Small QA-driven corrections after the guarded refit, before publication."""
from pathlib import Path
P=Path('captain')
p=P/'simulation.js';s=p.read_text();a='best={...o,clearance,tti,risk,astern:sign<0}';b='best={id:o.id,type:o.type,x:o.x,z:o.z,radius:o.radius,clearance,tti,risk,astern:sign<0}'
assert a in s;s=s.replace(a,b);p.write_text(s)
p=P/'main.js';s=p.read_text();s=s.replace('Καπετάνιε, το λιμάνι είναι 3,8 χιλιόμετρα βόρεια. Κοίτα το ραντάρ και κράτα το πλοίο μακριά από τους πάγους.','Λιμάνι: 3,8 km βόρεια. Πρόσεχε το ραντάρ.').replace('accum=0;radioTime=15;','accum=0;radioTime=5;');s=s.replace('camera:mode=>{cameraMode=mode;syncCameraControls();',"camera:mode=>{cameraMode=mode;$('cameraName').textContent=cameraLabels[cameraMode];syncCameraControls();");p.write_text(s)
p=P/'tools/qa130.py';s=p.read_text();s=s.replace("window.__lastCall.test.say('calm')","window.__lastCall.test.say('panic')");p.write_text(s)
print('Forecast no longer exports circular scene objects; short silent briefing retained.')

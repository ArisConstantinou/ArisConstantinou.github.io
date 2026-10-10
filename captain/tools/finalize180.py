from pathlib import Path
p=Path('captain/escape180.js');s=p.read_text()
bad='advance:n=>{for(let i=0;i<n*60;i++)update(1/60);}};'
good='advance:n=>{for(let i=0;i<n*60;i++)update(1/60);}}};'
if bad in s:s=s.replace(bad,good);p.write_text(s)
else:assert good in s, 'Unexpected escape controller return structure'
# Isolate alcohol absorption from a legitimate guard detection at the open door.
p=Path('captain/tools/qa180.py');s=p.read_text()
anchor="  p.keyboard.press('Digit9');ck('Whisky not applied instantly'"
if 'fixture(p,-4.5,12.0)' not in s:
 assert anchor in s
 s=s.replace(anchor,"  fixture(p,-4.5,12.0) # sheltered absorption fixture, guards remain active\n"+anchor)
old="p.wait_for_timeout(300);p.keyboard.up('KeyW')"
new="p.wait_for_function('(before)=>window.__lastCall.getState().throttle>before+.02',arg=before,timeout=15000);p.keyboard.up('KeyW')"
s=s.replace(old,new);p.write_text(s)
# Jail remains a recap scene but the primary continuation must be above the fold.
p=Path('captain/escape180.css');s=p.read_text()
if '/* Jail primary action */' not in s:
 s+='\n/* Jail primary action */\n#chaos170[data-phase=cell] #arrestCard{display:flex;flex-direction:column;align-items:stretch}#chaos170[data-phase=cell] #arrestCard[hidden]{display:none}#arrestCard h2{order:-2}#continueFromCell180{order:-1;flex-shrink:0}\n'
p.write_text(s)
print('Controller syntax, visible continuation and frame-based regressions prepared')

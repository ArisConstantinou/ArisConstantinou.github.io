from pathlib import Path
p=Path('captain/escape180.js')
s=p.read_text()
bad='advance:n=>{for(let i=0;i<n*60;i++)update(1/60);}};'
good='advance:n=>{for(let i=0;i<n*60;i++)update(1/60);}}};'
if bad in s:
 s=s.replace(bad,good)
 p.write_text(s)
else:
 assert good in s, 'Unexpected escape controller return structure'
# The absorption test has its own sheltered fixture. Guard detection is tested
# separately; do not disable guards or reduce their ability to detect a player.
p=Path('captain/tools/qa180.py');s=p.read_text()
anchor="  p.keyboard.press('Digit9');ck('Whisky not applied instantly'"
if 'fixture(p,-4.5,12.0)' not in s:
 assert anchor in s
 s=s.replace(anchor,"  fixture(p,-4.5,12.0) # behind storage wall, outside the open doorway sightline\n"+anchor)
p.write_text(s)
print('Escape controller structure and isolated regression fixtures verified')

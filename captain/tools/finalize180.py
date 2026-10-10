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
print('Escape controller return structure verified')

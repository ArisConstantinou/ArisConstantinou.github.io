from pathlib import Path
import re
p=Path('captain/chaos173.js');s=p.read_text()
s,n=re.subn(r"\$\('chaosUse'\)\.textContent=.*?;",'',s,count=1);assert n==1
s=s.replace('target=closestTarget(2.7)','target=closestTarget(2.5)')
p.write_text(s)
p=Path('captain/security173.js');s=p.read_text().replace("let stamp=''","let stamp=null").replace("stamp='';nodes=[]","stamp=null;nodes=[]");p.write_text(s)

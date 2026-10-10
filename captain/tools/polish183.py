from pathlib import Path
r=Path('captain')
p=r/'actors183.js';s=p.read_text().replace("rh=[-.23,1.30+k*.22,.38-k*.07];re=[-.40,1.18,.02];","rh=fps?[-.10,1.38+k*.22,.54-k*.05]:[-.23,1.30+k*.22,.38-k*.07];re=[-.40,1.18,.02];");p.write_text(s)
p=r/'tools/qa183.py';s=p.read_text().replace("event(cd,'touchEnd',[point(lx,ly-18,0)]);look=ch(p)['look'];", "event(cd,'touchEnd',[point(x+12,y,1)]);look=ch(p)['look'];")
p.write_text(s)

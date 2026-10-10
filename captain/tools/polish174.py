from pathlib import Path
r=Path(__file__).resolve().parents[1]
p=r/'escape174.js';s=p.read_text()
s=s.replace("timer=0;time=0;aimSet=false;resetObjects()","timer=0;time=0;lastHud=-10;noteUntil=0;aimSet=false;resetObjects()")
s=s.replace("for(;d<range;d+=.2)if(!clearSight(n,{x:n.x+Math.sin(a)*d,z:n.z+Math.cos(a)*d}))break;", "for(;d<range;d+=.2){const x=n.x+Math.sin(a)*d,z=n.z+Math.cos(a)*d,c=cellAt(x,z);if(!c||c.zone==='crawl'||FURNITURE.some(o=>Math.abs(x-o.x)<o.w/2&&Math.abs(z-o.z)<o.d/2))break;}")
p.write_text(s)
p=r/'chaos174.js';s=p.read_text().replace("s.foot=phase==='escape';setPhase(phase);","s.foot=phase==='escape';if(phase!=='escape')resetInput();setPhase(phase);")
p.write_text(s)

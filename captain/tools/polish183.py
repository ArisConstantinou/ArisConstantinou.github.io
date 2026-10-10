from pathlib import Path
r=Path('captain')
p=r/'actors183.js';s=p.read_text().replace("rh=[-.23,1.30+k*.22,.38-k*.07];re=[-.40,1.18,.02];","rh=fps?[-.10,1.38+k*.22,.54-k*.05]:[-.23,1.30+k*.22,.38-k*.07];re=[-.40,1.18,.02];");p.write_text(s)
p=r/'whisky183.js';s=p.read_text().replace("root.name='Captain held whisky';","root.name='Captain held whisky';root.scale.set(.64,.90,.64);").replace('lift*.68','lift*.22');p.write_text(s)
p=r/'tools/qa183.py';s=p.read_text().replace("event(cd,'touchEnd',[point(lx,ly-18,0)]);look=ch(p)['look'];", "event(cd,'touchEnd',[point(x+12,y,1)]);look=ch(p)['look'];")
s=s.replace("p.mouse.click(640,300);check('Desktop left click retains slap',ch(p)['attack']['kind']=='slap');adv(p,.6)","p.wait_for_timeout(150);p.mouse.move(660,310,steps=3);p.mouse.down();p.mouse.up();check('Desktop left click retains slap',(ch(p)['attack'] or {}).get('kind')=='slap',ch(p));adv(p,.6)")
s=s.replace("p.mouse.click(640,300,button='right');check('Desktop right click retains punch',ch(p)['attack']['kind']=='punch');", "p.mouse.down(button='right');p.mouse.up(button='right');check('Desktop right click retains punch',(ch(p)['attack'] or {}).get('kind')=='punch',ch(p));")
p.write_text(s)

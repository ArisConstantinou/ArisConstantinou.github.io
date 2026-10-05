from pathlib import Path
import re
ROOT=Path(__file__).resolve().parent.parent

def bundle(test=False):
    js='\n'.join((ROOT/'src'/f).read_text() for f in ['engine.js','world.js','actors.js','combat.js','game.js'])
    js=re.sub(r'^import .*?;\s*$', '', js, flags=re.M)
    js=js.replace('export ','')
    if test: js=js.replace("TEST=new URLSearchParams(location.search).has('test')",'TEST=true')
    html=(ROOT/'index.html').read_text()
    html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+ (ROOT/'style.css').read_text().replace("@import url('data:text/css,');",'')+'</style>')
    html=html.replace('<script type="module" src="src/game.js"></script>','<script type="module">\n'+js+'\n</script>')
    return html
if __name__=='__main__':
    out=ROOT/'Bubble.html';out.write_text(bundle());print(out, out.stat().st_size)

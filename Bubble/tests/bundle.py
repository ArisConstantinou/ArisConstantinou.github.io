"""Build a dependency-free HTML, including the exact same game modules and CSS."""
from pathlib import Path
import re
ROOT = Path(__file__).resolve().parent.parent
MODULES = ['engine.js', 'world.js', 'actors.js', 'combat.js', 'gum.js', 'progression.js', 'game.js']
def bundle(test=False):
    js = '\n'.join((ROOT / 'src' / name).read_text() for name in MODULES)
    js = re.sub(r'^import .*?;\s*$', '', js, flags=re.M)
    js = re.sub(r'\bexport (?=(?:const|let|function|class)\b)', '', js)
    if test:
        js = js.replace("TEST=new URLSearchParams(location.search).has('test')", 'TEST=true')
    html = (ROOT / 'index.html').read_text()
    for name in ['style.css', 'systems.css']:
        css = (ROOT / name).read_text().replace("@import url('data:text/css,');", '')
        html = re.sub(r'<link rel="stylesheet" href="'+re.escape(name)+r'(?:\?[^\"]*)?">', lambda _: '<style>'+css+'</style>', html)
    return re.sub(r'<script type="module" src="src/game\.js(?:\?[^\"]*)?"></script>', lambda _: '<script type="module">\n'+js+'\n</script>', html)
if __name__ == '__main__':
    out = ROOT / 'Bubble.html'
    out.write_text(bundle())
    print(out, out.stat().st_size)

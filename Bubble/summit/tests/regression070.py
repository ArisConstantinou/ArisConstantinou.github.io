"""Run the unchanged 68-check Expedition suite against the Ridge Run modules."""
from pathlib import Path
source = Path(__file__).with_name('qa060.py').read_text()
source = source.replace('from harness060 import load', 'from harness070 import load')
source = source.replace("check('Production source boots 0.6.0 with real WebGL renderer',run(\"return __summit.version==='0.6.0'", "check('Production source boots 0.7.0 with real WebGL renderer',run(\"return __summit.version==='0.7.0'")
exec(compile(source, __file__, 'exec'), globals())

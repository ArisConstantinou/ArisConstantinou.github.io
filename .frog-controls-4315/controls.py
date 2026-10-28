"""Launch production-browser controls and regression checks. Requires Playwright for Node."""
import pathlib
import subprocess
import sys
sys.exit(subprocess.run(['node', str(pathlib.Path(__file__).with_name('arcade-4315.mjs'))]).returncode)

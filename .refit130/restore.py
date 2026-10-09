from pathlib import Path
import base64,gzip,json,hashlib
root=Path('captain')
if (root/'helm130.js').exists():
    print('Refit already materialized; testing existing staged sources.')
else:
    payload=''.join((Path('.refit130')/f'part{i:02}').read_text() for i in range(8))
    assert hashlib.sha256(payload.encode()).hexdigest()=='624cf8fc81601747e6013bf2460096c63fb9d69aede63c572342af1ef40eb49a', 'Transport checksum mismatch'
    patches=json.loads(gzip.decompress(base64.b64decode(payload)))
    allowed={'main.js','style.css','index.html','audio.js','passengers.js','simulation.js','sw.js','helm130.js','helm130.css','reactions130.js'}
    assert set(patches)==allowed
    outputs={}
    for name,rec in patches.items():
        path=root/name
        old=path.read_text() if path.exists() else ''
        if rec['expected'] is None: assert not path.exists(), name
        else: assert hashlib.sha256(old.encode()).hexdigest()==rec['expected'], name+' base mismatch'
        lines=old.splitlines(keepends=True)
        for start,end,text in reversed(rec['edits']): lines[start:end]=[text]
        new=''.join(lines)
        assert hashlib.sha256(new.encode()).hexdigest()==rec['sha256'], name+' result mismatch'
        outputs[path]=new
    for path,text in outputs.items(): path.write_text(text)
    print('Verified and restored all ten tested source files.')

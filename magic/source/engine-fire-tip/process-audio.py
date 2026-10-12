"""Clean and loop only the user's exact Newsflare reference recording."""
from pathlib import Path
import hashlib, json, subprocess, wave
import numpy as np

root=Path(__file__).resolve().parents[2]
original=root/'.source/engine-fire-audio/original-capture.webm'
clean=root/'.source/engine-fire-audio/clean.wav'
loop=root/'.source/engine-fire-audio/loop.wav'
asset=root/'_source/src/assets/hearth-flamethrower.mp3'
asset.parent.mkdir(parents=True,exist_ok=True)
filters='highpass=f=90,lowpass=f=7500,afftdn=nr=6:nf=-28,equalizer=f=180:t=q:w=0.8:g=2,equalizer=f=1900:t=q:w=1:g=1.5,acompressor=threshold=0.16:ratio=2.5:attack=8:release=120'
subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(original),'-ac','1','-ar','48000','-af',filters,'-c:a','pcm_s16le',str(clean)],check=True)
with wave.open(str(clean),'rb') as w:
    rate=w.getframerate(); x=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(np.float64)/32768
x=x[round(.3*rate):round(5.9*rate)]
n=round(.18*rate); t=(np.arange(n)+.5)/n; blend=.5-.5*np.cos(np.pi*t)
# Tail-to-head crossfade wraps into the first untouched sample without a gap.
y=np.concatenate([x[n:-n],x[-n:]*(1-blend)+x[:n]*blend]); y-=y.mean()
gain=min(.23/np.sqrt(np.mean(y*y)),.88/np.max(np.abs(y))); y*=gain
with wave.open(str(loop),'wb') as w:
    w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes(np.round(y*32767).astype('<i2').tobytes())
subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(loop),'-c:a','libmp3lame','-b:a','128k',str(asset)],check=True)
digest=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
report={'sourceUrl':'https://www.youtube.com/shorts/wO4Z7zM3Aag','title':'Dad Uses Flamethrower For Snow Removal','author':'Newsflare','selection':'User explicitly requested the audio from this exact video','acquisition':'Audio track captured directly from the selected video playback; no replacement sound','captureSeconds':[1.999338,8.468284],'originalCaptureSha256':digest(original),'originalCaptureBytes':original.stat().st_size,'originalPreserved':'.source/engine-fire-audio/original-capture.webm','processing':{'ffmpegFilters':filters,'trimFromCaptureSeconds':[.3,5.9],'tailToHeadCrossfadeSeconds':.18,'gain':float(gain)},'loop':{'durationSeconds':len(y)/rate,'sampleRate':rate,'channels':1,'rms':float(np.sqrt(np.mean(y*y))),'peak':float(np.max(np.abs(y))),'seamStep':float(abs(y[-1]-y[0])),'wavSha256':digest(loop),'asset':'_source/src/assets/hearth-flamethrower.mp3','assetSha256':digest(asset),'assetBytes':asset.stat().st_size},'rights':'User-selected third-party reference. No independent redistribution license verified; this task updates the local candidate only.'}
(root/'source/engine-fire-tip/AUDIO-PROVENANCE.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
print(json.dumps(report['loop']))

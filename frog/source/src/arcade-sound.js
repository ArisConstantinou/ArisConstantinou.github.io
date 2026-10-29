import {ArcadeMusic} from './arcade-music.js';
export const COMBAT_SOUNDS=Object.freeze({
 hop:{duration:.12,frequency:180,end:320,noise:.045,band:850,gain:.14,noiseGain:.12},
 hopLand:{duration:.10,frequency:110,end:62,noise:.055,band:460,gain:.12,noiseGain:.13},
 shot:{duration:.105,frequency:460,end:135,noise:.085,band:1900,gain:.17},
 hit:{duration:.19,frequency:145,end:48,noise:.14,band:580,gain:.25},
 hitConfirm:{duration:.14,frequency:260,end:85,noise:.10,band:1150,gain:.21},
 kick:{duration:.16,frequency:195,end:68,noise:.10,band:700,gain:.20}
});
export class ArcadeSound{
 constructor(){this._volume=.5;this._musicVolume=.35;this.music=null;this.paused=true;this.musicAllowed=false;this.ctx=null;this.gain=null;this.noise=null;this.last=new Map();}
 get volume(){return this._volume;}
 set volume(value){this._volume=Math.max(0,Math.min(1,Number(value)||0));if(this.gain&&this.ctx?.state==='running')this.gain.gain.setTargetAtTime(this._volume,this.ctx.currentTime,.02);if(this.music){if(!this._volume)this.music.stop();else if(!this.paused&&this.musicAllowed)this.music.start();}}
 get musicVolume(){return this._musicVolume;}
 set musicVolume(value){this._musicVolume=Math.max(0,Math.min(1,Number(value)||0));if(this.music){this.music.volume=this._musicVolume;if(!this.paused&&this.musicAllowed&&this.volume>0)this.music.start();}}
 resume(){try{this.paused=false;this.musicAllowed=true;if(!this.ctx){this.ctx=new(window.AudioContext||window.webkitAudioContext)();this.gain=this.ctx.createGain();this.gain.connect(this.ctx.destination);this.noise=this.ctx.createBuffer(1,this.ctx.sampleRate*.35,this.ctx.sampleRate);const data=this.noise.getChannelData(0);let seed=731;for(let i=0;i<data.length;i++){seed=(seed*1664525+1013904223)>>>0;data[i]=seed/4294967296*2-1;}this.music=new ArcadeMusic(this.ctx,this.gain);this.music.volume=this.musicVolume;}this.gain.gain.value=this.volume;this.ctx.resume().then(()=>{if(!this.paused&&this.musicAllowed&&this.volume>0)this.music.start();}).catch(()=>{});}catch{}}
 pause(){this.paused=true;this.music?.stop();if(this.ctx){this.gain.gain.value=0;this.ctx.suspend().catch(()=>{});}}
 stopMusic(){this.musicAllowed=false;this.music?.stop();}
 play(kind,level=1){
  if(!this.ctx||this.ctx.state!=='running'||this.volume<=0)return;
  const c=this.ctx,t=c.currentTime;if(t-(this.last.get(kind)??-Infinity)<.035)return;this.last.set(kind,t);
  const notes={countdown:[640,620,.10],battle:[440,880,.30],tongue:[560,150,.11],storageAlert:[740,480,.3],guardWindup:[330,650,.18],stoneShot:[110,65,.2],stoneImpact:[75,35,.3],land:[95,50,.13],dizzy:[700,240,.28],ko:[80,330,.26],win:[400,800,.45],lost:[220,55,.4]};
  const spec=COMBAT_SOUNDS[kind],n=notes[kind];if(!spec&&!n)return;
  const strength=Math.max(0,Math.min(1,level));const duration=spec?.duration||n[2],osc=c.createOscillator(),gain=c.createGain();
  osc.type=spec?'triangle':'sine';osc.frequency.setValueAtTime(spec?.frequency||n[0],t);osc.frequency.exponentialRampToValueAtTime(spec?.end||n[1],t+duration);
  gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(Math.max(.0001,(spec?.gain||.14)*strength),t+.006);gain.gain.exponentialRampToValueAtTime(.0001,t+duration);
  osc.connect(gain);gain.connect(this.gain);osc.start(t);osc.stop(t+duration+.01);osc.onended=()=>{osc.disconnect();gain.disconnect();};
  if(spec){const source=c.createBufferSource(),filter=c.createBiquadFilter(),envelope=c.createGain();source.buffer=this.noise;filter.type='bandpass';filter.frequency.setValueAtTime(spec.band,t);filter.frequency.exponentialRampToValueAtTime(spec.band*.42,t+spec.noise);filter.Q.value=kind==='shot'?1.8:.65;envelope.gain.setValueAtTime(.0001,t);envelope.gain.exponentialRampToValueAtTime(Math.max(.0001,(spec.noiseGain??(kind==='shot'?.30:.38))*strength),t+.004);envelope.gain.exponentialRampToValueAtTime(.0001,t+spec.noise);source.connect(filter);filter.connect(envelope);envelope.connect(this.gain);source.start(t);source.stop(t+spec.noise+.01);source.onended=()=>{source.disconnect();filter.disconnect();envelope.disconnect();};}
 }
}

export const COMBAT_SOUNDS=Object.freeze({
 shot:{duration:.105,frequency:460,end:135,noise:.085,band:1900,gain:.17},
 hit:{duration:.19,frequency:145,end:48,noise:.14,band:580,gain:.25},
 hitConfirm:{duration:.14,frequency:260,end:85,noise:.10,band:1150,gain:.21},
 kick:{duration:.16,frequency:195,end:68,noise:.10,band:700,gain:.20}
});
export class ArcadeSound{
 constructor(){this._volume=.5;this.ctx=null;this.gain=null;this.noise=null;this.last=new Map();}
 get volume(){return this._volume;}
 set volume(value){this._volume=Math.max(0,Math.min(1,Number(value)||0));if(this.gain&&this.ctx?.state==='running')this.gain.gain.setTargetAtTime(this._volume,this.ctx.currentTime,.02);}
 resume(){try{if(!this.ctx){this.ctx=new(window.AudioContext||window.webkitAudioContext)();this.gain=this.ctx.createGain();this.gain.connect(this.ctx.destination);this.noise=this.ctx.createBuffer(1,this.ctx.sampleRate*.35,this.ctx.sampleRate);const data=this.noise.getChannelData(0);let seed=731;for(let i=0;i<data.length;i++){seed=(seed*1664525+1013904223)>>>0;data[i]=(seed/4294967296*2-1);}}this.gain.gain.value=this.volume;this.ctx.resume().catch(()=>{});}catch{}}
 pause(){if(this.ctx){this.gain.gain.value=0;this.ctx.suspend().catch(()=>{});}}
 play(kind,level=1){
  if(!this.ctx||this.ctx.state!=='running'||this.volume<=0)return;
  const c=this.ctx,t=c.currentTime;if(t-(this.last.get(kind)??-Infinity)<.035)return;this.last.set(kind,t);
  const notes={tongue:[560,150,.11],storageAlert:[740,480,.3],guardWindup:[330,650,.18],stoneShot:[110,65,.2],stoneImpact:[75,35,.3],land:[95,50,.13],dizzy:[700,240,.28],ko:[80,330,.26],win:[400,800,.45],lost:[220,55,.4]};
  const spec=COMBAT_SOUNDS[kind],n=notes[kind];if(!spec&&!n)return;
  const strength=Math.max(0,Math.min(1,level));const duration=spec?.duration||n[2],osc=c.createOscillator(),gain=c.createGain();
  osc.type=spec?'triangle':'sine';osc.frequency.setValueAtTime(spec?.frequency||n[0],t);osc.frequency.exponentialRampToValueAtTime(spec?.end||n[1],t+duration);
  gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(Math.max(.0001,(spec?.gain||.14)*strength),t+.006);gain.gain.exponentialRampToValueAtTime(.0001,t+duration);
  osc.connect(gain);gain.connect(this.gain);osc.start(t);osc.stop(t+duration+.01);osc.onended=()=>{osc.disconnect();gain.disconnect();};
  if(spec){const source=c.createBufferSource(),filter=c.createBiquadFilter(),envelope=c.createGain();source.buffer=this.noise;filter.type='bandpass';filter.frequency.setValueAtTime(spec.band,t);filter.frequency.exponentialRampToValueAtTime(spec.band*.42,t+spec.noise);filter.Q.value=kind==='shot'?1.8:.65;envelope.gain.setValueAtTime(.0001,t);envelope.gain.exponentialRampToValueAtTime(Math.max(.0001,(kind==='shot'?.30:.38)*strength),t+.004);envelope.gain.exponentialRampToValueAtTime(.0001,t+spec.noise);source.connect(filter);filter.connect(envelope);envelope.connect(this.gain);source.start(t);source.stop(t+spec.noise+.01);source.onended=()=>{source.disconnect();filter.disconnect();envelope.disconnect();};}
 }
}

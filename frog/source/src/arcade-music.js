// Original eight-bar pond theme: soft mallets, a warm bass and quiet shakers.
// Render once off the realtime audio graph; playback is one native looping node.
export const POND_THEME=Object.freeze({tempo:104,beats:32,sampleRate:32000});
const melody=[
 [74,-1,78,81,83,81,78,-1],[76,-1,78,74,71,-1,74,-1],
 [71,74,78,-1,81,-1,78,76],[74,-1,71,69,71,-1,-1,-1],
 [74,78,81,-1,83,86,83,81],[78,-1,76,74,71,-1,74,76],
 [79,-1,78,74,76,78,76,-1],[74,-1,69,-1,74,-1,-1,-1],
];
const chords=[[50,54,57],[47,50,54],[43,47,50],[45,49,52]];
const hz=midi=>440*2**((midi-69)/12);
export async function renderPondTheme(Offline=globalThis.OfflineAudioContext||globalThis.webkitOfflineAudioContext){
 if(!Offline)return null;
 const beat=60/POND_THEME.tempo,duration=POND_THEME.beats*beat;
 const c=new Offline(1,Math.ceil(duration*POND_THEME.sampleRate),POND_THEME.sampleRate),mix=c.createGain();mix.gain.value=4.5;mix.connect(c.destination);
 const tone=(midi,t,length,level,type='sine',harmonic=false)=>{
  if(t+length>=duration)length=duration-t-.015;if(length<=.01)return;
  const osc=c.createOscillator(),gain=c.createGain();osc.type=type;osc.frequency.value=hz(midi)*(harmonic?2:1);
  gain.gain.setValueAtTime(.00001,t);gain.gain.exponentialRampToValueAtTime(level,t+.008);gain.gain.exponentialRampToValueAtTime(.00001,t+length);
  osc.connect(gain);gain.connect(mix);osc.start(t);osc.stop(t+length+.005);
 };
 const noise=c.createBuffer(1,1600,POND_THEME.sampleRate);let seed=731;const data=noise.getChannelData(0);
 for(let i=0;i<data.length;i++){seed=(seed*1664525+1013904223)>>>0;data[i]=(seed/4294967296*2-1)*Math.exp(-i/210);}
 for(let bar=0;bar<8;bar++){
  const chord=chords[bar%4],base=bar*4*beat+.025;
  for(const offset of [0,2]){
   tone(chord[0]-12,base+offset*beat,.7*beat,.09,'triangle');
   for(const note of chord)tone(note,base+offset*beat,1.65*beat,.025);
  }
  for(let step=0;step<8;step++){
   const t=base+step*.5*beat,note=melody[bar][step];
   if(note>=0){tone(note,t,.72*beat,.072,'sine');tone(note,t,.4*beat,.019,'sine',true);}
   if(step%2){const source=c.createBufferSource(),filter=c.createBiquadFilter(),gain=c.createGain();source.buffer=noise;filter.type='highpass';filter.frequency.value=1800;gain.gain.value=.032;source.connect(filter);filter.connect(gain);gain.connect(mix);source.start(t);}
  }
 }
 return c.startRendering();
}

export class ArcadeMusic{
 constructor(ctx,output,{render=renderPondTheme}={}){this.ctx=ctx;this.bus=ctx.createGain();this.bus.connect(output);this.render=render;this.promise=null;this.buffer=null;this.source=null;this.playing=false;this.offset=0;this.startedAt=0;this.token=0;this._volume=.35;this.bus.gain.value=this._volume;this.renderCount=0;this.readyMs=null;}
 get volume(){return this._volume;}
 set volume(value){this._volume=Math.max(0,Math.min(1,Number(value)||0));this.bus.gain.setTargetAtTime(this._volume,this.ctx.currentTime,.03);if(!this._volume)this.stopSource();else if(this.playing)this.ensureSource();}
 start(){if(!this.playing){this.playing=true;this.token++;}this.ensureSource();}
 async ensureSource(){
  if(!this.playing||!this.volume||this.source)return;
  const token=this.token;
  if(!this.promise){this.renderCount++;const start=globalThis.performance?.now()||0;this.promise=Promise.resolve().then(()=>this.render()).then(buffer=>{this.buffer=buffer;this.readyMs=(globalThis.performance?.now()||0)-start;return buffer;}).catch(()=>null);}
  const buffer=await this.promise;
  if(!buffer||token!==this.token||!this.playing||!this.volume||this.source||this.ctx.state!=='running')return;
  const source=this.ctx.createBufferSource();source.buffer=buffer;source.loop=true;source.connect(this.bus);this.source=source;this.startedAt=this.ctx.currentTime;
  source.onended=()=>{source.disconnect();if(this.source===source)this.source=null;};source.start(0,this.offset%buffer.duration);
 }
 stopSource(){const source=this.source;if(!source)return;this.offset=(this.offset+this.ctx.currentTime-this.startedAt)%(this.buffer?.duration||1);this.source=null;try{source.stop();}catch{}source.disconnect();}
 stop(){this.playing=false;this.token++;this.stopSource();}
}

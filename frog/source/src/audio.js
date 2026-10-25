/** Original synthesized creek soundscape. No audio downloads or autoplay. */
export class GameAudio {
  constructor({volume=.65}={}) {
    this.volume=Math.max(0,Math.min(1,volume)); this._muted=false;this._paused=false;
    this.context=null;this.master=null;this.started=false;this.elapsed=0;
    this.nextCroak=7;this.nextBird=4;this.nextNote=12;
    this.lastPlayed=new Map();this.ambient=[];this.activeVoices=0;this.oneShots=new Set();
    this.seed=78103;this.night=false;this.hunt=false;this.water=false;
  }
  random(){this.seed=(Math.imul(this.seed,1664525)+1013904223)>>>0;return this.seed/4294967296;}
  async init(){
    if(this.context){if(!this._paused&&this.context.state==='suspended')await this.context.resume().catch(()=>{});return;}
    const Context=window.AudioContext||window.webkitAudioContext;if(!Context)return;
    try{
      this.context=new Context();
      const c=this.context;
      this.master=c.createGain();this.master.gain.value=this._muted||this._paused?0:this.volume*.58;
      this.compressor=c.createDynamicsCompressor();
      this.compressor.threshold.value=-18;this.compressor.knee.value=18;this.compressor.ratio.value=3;
      this.compressor.attack.value=.012;this.compressor.release.value=.2;
      this.master.connect(this.compressor);this.compressor.connect(c.destination);
      this.sfx=c.createGain();this.sfx.gain.value=.8;this.sfx.connect(this.master);
      this.ambience=c.createGain();this.ambience.gain.value=.6;this.ambience.connect(this.master);
      const length=c.sampleRate*4;
      this.noise=c.createBuffer(1,length,c.sampleRate);
      const samples=this.noise.getChannelData(0);
      let brown=0;
      for(let i=0;i<length;i++){brown=(brown+(this.random()*2-1)*.025)/1.015;samples[i]=brown*5;}
      this.white=c.createBuffer(1,c.sampleRate*2,c.sampleRate);
      const white=this.white.getChannelData(0);
      for(let i=0;i<white.length;i++)white[i]=this.random()*2-1;
      this.startAmbience();
      if(!this._paused&&c.state==='suspended')await c.resume().catch(()=>{});
      if(this._paused&&c.state==='running')await c.suspend().catch(()=>{});
    }catch{this.context=null;}
  }
  async start(){await this.init();this.started=Boolean(this.context);this.syncPauseState();}
  get muted(){return this._muted;}
  set muted(value){this._muted=Boolean(value);this.setVolume(this.volume);}
  setVolume(value){
    this.volume=Math.max(0,Math.min(1,Number(value)||0));
    this.applyVolume();
  }
  applyVolume(immediate=false){
    if(!this.master||!this.context)return;
    const gain=this.master.gain,t=this.context.currentTime,target=this._muted||this._paused?0:this.volume*.58;
    gain.cancelScheduledValues?.(t);
    if(immediate||this._paused)gain.setValueAtTime(target,t);
    else gain.setTargetAtTime(target,t,.04);
  }
  get paused(){return this._paused;}
  setPaused(value){
    const paused=Boolean(value);if(this._paused===paused)return;
    this._paused=paused;this.applyVolume(true);
    if(paused){
      // Silence both currently playing and delayed effects, without changing volume preferences.
      for(const voice of this.oneShots){try{voice.stop();voice.disconnect();}catch{}}
      this.oneShots.clear();
    }
    this.syncPauseState();
  }
  syncPauseState(){
    if(!this.context)return;
    // Serialize browser suspend/resume promises so rapid Pause/Resume obeys the latest choice.
    this.contextSync=(this.contextSync||Promise.resolve()).catch(()=>{}).then(async()=>{
      const c=this.context;if(!c||c.state==='closed')return;
      if(this._paused&&c.state==='running')await c.suspend().catch(()=>{});
      else if(!this._paused&&this.started&&c.state==='suspended')await c.resume().catch(()=>{});
      this.applyVolume(this._paused);
    });
  }
  setMuted(value){this.muted=value;}
  async resume(){if(!this._paused&&this.context?.state==='suspended')await this.context.resume().catch(()=>{});}
  async suspend(){if(this.context?.state==='running')await this.context.suspend().catch(()=>{});}
  startAmbience(){
    const c=this.context;
    const makeNoise=(buffer,type,freq,gain)=>{
      const source=c.createBufferSource();source.buffer=buffer;source.loop=true;
      const filter=c.createBiquadFilter();filter.type=type;filter.frequency.value=freq;filter.Q.value=.5;
      const volume=c.createGain();volume.gain.value=gain;
      source.connect(filter);filter.connect(volume);volume.connect(this.ambience);source.start();
      this.ambient.push(source);return {source,filter,volume};
    };
    this.current=makeNoise(this.noise,'lowpass',650,.11);
    this.breeze=makeNoise(this.white,'bandpass',1800,.018);
    this.insects=makeNoise(this.white,'bandpass',6200,.0015);
    this.lowTone=c.createOscillator();this.lowTone.type='sine';this.lowTone.frequency.value=73.416;
    this.lowGain=c.createGain();this.lowGain.gain.value=.002;
    this.lowTone.connect(this.lowGain);this.lowGain.connect(this.ambience);this.lowTone.start();this.ambient.push(this.lowTone);
  }
  update(dt,{night=false,water=false,hunt=false,paused=false}={}){
    this.setPaused(paused);
    if(!this.context||!this.started||this.context.state!=='running'||paused)return;
    this.elapsed+=Math.min(dt,.1);this.night=night;this.water=water;this.hunt=hunt;
    const t=this.context.currentTime;
    this.current.volume.gain.setTargetAtTime((water?.2:.075)+Math.sin(this.elapsed*.31)*.015,t,.5);
    this.breeze.volume.gain.setTargetAtTime((night?.009:.019)+(Math.sin(this.elapsed*.071)+1)*.004,t,1);
    this.insects.volume.gain.setTargetAtTime(night?.005:.001,t,1.4);
    this.lowGain.gain.setTargetAtTime(hunt?.025:.002,t,1.1);
    this.lowTone.frequency.setTargetAtTime(hunt?55:73.416,t,.5);
    if(this.elapsed>this.nextCroak){
      this.nextCroak=this.elapsed+(night?5:9)+this.random()*14;
      this.croak(.2+this.random()*.15,180+this.random()*110,(this.random()-.5)*1.8);
    }
    if(!night&&this.elapsed>this.nextBird){
      this.nextBird=this.elapsed+11+this.random()*21;
      this.chirp(.08,(this.random()-.5)*1.6);
    }
    if(!hunt&&this.elapsed>this.nextNote){
      this.nextNote=this.elapsed+15+this.random()*13;
      const notes=night?[146.832,220,293.665]:[196,246.942,293.665,440];
      const n=notes[Math.floor(this.random()*notes.length)];
      this.tone(n,n,3.8,.014,'sine',.6,(this.random()-.5)*.8,this.ambience);
      this.tone(n*1.5,n*1.5,4.4,.005,'sine',.8,0,this.ambience);
    }
  }
  output(pan=0,bus){
    const c=this.context;
    if(c.createStereoPanner){const p=c.createStereoPanner();p.pan.value=Math.max(-1,Math.min(1,pan));p.connect(bus||this.sfx);return p;}
    return bus||this.sfx;
  }
  tone(start,end,duration,gain=.1,wave='sine',attack=.005,pan=0,bus,delay=0){
    if(!this.context||this._paused||this._muted)return;
    const c=this.context,t=c.currentTime+delay;
    const osc=c.createOscillator();osc.type=wave;osc.frequency.setValueAtTime(Math.max(20,start),t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20,end),t+duration);
    const env=c.createGain();env.gain.setValueAtTime(0,t);
    env.gain.linearRampToValueAtTime(gain,t+Math.min(attack,duration*.4));
    env.gain.exponentialRampToValueAtTime(.0001,t+duration);
    const out=this.output(pan,bus);osc.connect(env);env.connect(out);this.oneShots.add(osc);osc.start(t);osc.stop(t+duration+.03);
    osc.onended=()=>{this.oneShots.delete(osc);osc.disconnect();env.disconnect();if(out!==this.sfx&&out!==this.ambience)out.disconnect();};
  }
  noiseBurst(duration,gain=.1,frequency=1000,q=.4,type='bandpass',pan=0,delay=0){
    if(!this.context||this._paused||this._muted)return;
    const c=this.context,t=c.currentTime+delay;
    const source=c.createBufferSource();source.buffer=this.white;
    const filter=c.createBiquadFilter();filter.type=type;filter.frequency.value=frequency;filter.Q.value=q;
    const env=c.createGain();env.gain.setValueAtTime(0,t);env.gain.linearRampToValueAtTime(gain,t+.006);env.gain.exponentialRampToValueAtTime(.0001,t+duration);
    const out=this.output(pan);source.connect(filter);filter.connect(env);env.connect(out);this.oneShots.add(source);source.start(t,this.random()*.7);source.stop(t+duration+.02);
    source.onended=()=>{this.oneShots.delete(source);source.disconnect();filter.disconnect();env.disconnect();if(out!==this.sfx)out.disconnect();};
  }
  croak(volume=.35,pitch=210,pan=0){
    this.tone(pitch*1.2,pitch*.72,.17,volume*.12,'sawtooth',.018,pan);
    this.tone(pitch*.7,pitch*.55,.22,volume*.17,'sine',.02,pan);
    this.tone(pitch,pitch*.76,.18,volume*.1,'triangle',.012,pan,undefined,.16);
    this.noiseBurst(.18,volume*.025,900,2,'bandpass',pan);
  }
  chirp(volume=.2,pan=0){
    const p=1600+this.random()*1000;
    this.tone(p,p*1.32,.09,volume*.3,'sine',.012,pan);
    this.tone(p*1.45,p,.12,volume*.22,'sine',.008,pan,undefined,.13);
    this.tone(p,p*1.18,.07,volume*.2,'sine',.006,pan,undefined,.3);
  }
  play(name,options={}){
    if(!this.context||this.context.state!=='running'||this._muted||this._paused)return;
    if(typeof options==='number')options={intensity:options};
    const now=this.context.currentTime;
    const cooldown={splash:.11,hit:.065,tongue:.09,footstep:.14,water:.15,ui:.04,'impact-flesh':.07,'impact-heavy':.1,'impact-block':.08,'attack-swing':.075,'attack-miss':.09}[name]||.045;
    if(!options.priority&&now-(this.lastPlayed.get(name)??-100)<cooldown)return;
    this.lastPlayed.set(name,now);
    const v=Math.max(.03,Math.min(2,options.volume??options.intensity??1));
    const pan=options.pan||0;
    switch(name){
      case 'attack-swing':
        this.noiseBurst(options.kind==='slam'?.20:.12,.037*v,options.kind==='tongue'?2200:1300,.5,'bandpass',pan);
        if(options.kind==='tongue')this.tone(480,140,.13,.035*v,'sine',.003,pan);break;
      case 'attack-miss':
        this.noiseBurst(.095,.028*v,2400,.35,'highpass',pan);break;
      case 'impact-flesh':
        this.tone(145,48,.13,.14*v,'sine',.001,pan);
        this.noiseBurst(.065,.11*v,1150,.65,'bandpass',pan);
        this.noiseBurst(.026,.045*v,3100,.5,'bandpass',pan,.008);break;
      case 'impact-heavy':
        this.tone(102,31,.22,.19*v,'sine',.002,pan);
        this.noiseBurst(.13,.14*v,760,.55,'lowpass',pan);
        this.noiseBurst(.045,.07*v,2200,.7,'bandpass',pan,.008);break;
      case 'impact-block':
        this.tone(510,180,.075,.085*v,'triangle',.001,pan);
        this.noiseBurst(.052,.085*v,2700,1.1,'bandpass',pan);
        this.tone(120,65,.08,.04*v,'sine',.002,pan);break;
      case 'tongue':case 'catch':
        this.tone(650,125,.13,.085*v,'sine',.002,pan);
        this.tone(190,420,.065,.06*v,'triangle',.001,pan);
        this.noiseBurst(.035,.035*v,1700,.8,'bandpass',pan);break;
      case 'eat':case 'fly':case 'food':
        this.tone(430,220,.075,.075*v,'sine',.003,pan);
        this.noiseBurst(.08,.025*v,1300,.7,'bandpass',pan);
        this.tone(740,880,.09,.018*v,'sine',.004,pan,undefined,.04);break;
      case 'jump':
        this.noiseBurst(.17,.065*v,500,.7,'bandpass',pan);
        this.tone(140,65,.16,.055*v,'sine',.005,pan);break;
      case 'land':case 'footstep':
        this.noiseBurst(.085,.055*v,410,.7,'lowpass',pan);
        this.tone(100,45,.11,.055*v,'sine',.002,pan);break;
      case 'splash':case 'water':
        this.noiseBurst(.42,.15*v,1700,.2,'lowpass',pan);
        this.noiseBurst(.16,.08*v,3600,.4,'bandpass',pan,.025);
        this.tone(140,50,.24,.07*v,'sine',.003,pan);
        this.tone(660,220,.13,.018*v,'sine',.005,pan,undefined,.08);break;
      case 'hit':case 'kick':case 'damage':
        this.tone(125,38,.16,.18*v,'sine',.002,pan);
        this.noiseBurst(.105,.12*v,850,.5,'lowpass',pan);
        this.noiseBurst(.04,.055*v,2600,.6,'bandpass',pan);break;
      case 'slam':case 'heavy':
        this.tone(90,27,.42,.23*v,'sine',.005,pan);
        this.noiseBurst(.35,.2*v,1100,.3,'lowpass',pan);
        this.noiseBurst(.18,.1*v,3200,.5,'bandpass',pan,.02);break;
      case 'roar':case 'intimidate':
        this.croak(.8*v,115,pan);this.tone(77,51,.65,.15*v,'triangle',.05,pan);
        this.croak(.7*v,105,pan);break;
      case 'croak':this.croak(.6*v,180+this.random()*75,pan);break;
      case 'hurt':
        this.tone(330,120,.2,.07*v,'sawtooth',.005,pan);
        this.tone(160,90,.25,.095*v,'sine',.006,pan);break;
      case 'death':
        this.tone(220,43,.55,.08*v,'triangle',.01,pan);
        this.noiseBurst(.3,.065*v,1200,.5,'lowpass',pan);break;
      case 'recruit':case 'success':
        this.croak(.3*v,220,pan);
        [392,493.883,587.33].forEach((f,i)=>this.tone(f,f,.28,.045*v,'sine',.015,pan,undefined,i*.1));break;
      case 'promote':case 'levelup':case 'level-up':
        [293.665,392,493.883,587.33].forEach((f,i)=>this.tone(f,f,.6,.06*v,'sine',.014,pan,undefined,i*.12));
        this.tone(146.832,146.832,1.2,.045*v,'sine',.03,pan);break;
      case 'build':
        for(let i=0;i<4;i++){this.noiseBurst(.09,.085*v,1000+i*350,.8,'bandpass',pan,i*.12);this.tone(210+i*35,80,.11,.06*v,'triangle',.003,pan,undefined,i*.12);}break;
      case 'loot':case 'gather':
        this.noiseBurst(.2,.055*v,2300,.7,'bandpass',pan);
        [550,740].forEach((f,i)=>this.tone(f,f*1.04,.18,.035*v,'sine',.006,pan,undefined,i*.08));break;
      case 'flap':
        this.noiseBurst(.2,.19*v,550,.3,'lowpass',pan);
        this.noiseBurst(.17,.12*v,900,.5,'bandpass',pan,.22);break;
      case 'heron':case 'hunt':case 'warning':
        this.tone(490,170,.55,.085*v,'sawtooth',.045,pan);
        this.noiseBurst(.6,.09*v,1900,1.2,'bandpass',pan);
        this.tone(65,52,.8,.1*v,'sine',.06,pan);break;
      case 'snake':case 'hiss':
        this.noiseBurst(.7,.12*v,4200,1.3,'bandpass',pan);break;
      case 'fish':
        this.noiseBurst(.65,.21*v,950,.4,'lowpass',pan);
        this.tone(90,25,.45,.2*v,'sine',.008,pan);break;
      case 'night':
        this.tone(196,196,2,.025*v,'sine',.3,pan);this.tone(293.665,293.665,2.6,.018*v,'sine',.4,pan);break;
      case 'victory':case 'win':
        [196,246.942,293.665,392,493.883,587.33,784].forEach((f,i)=>this.tone(f,f,1.3,.05*v,'sine',.03,pan,undefined,i*.19));break;
      case 'defeat':case 'lose':
        [196,174.614,146.832,98].forEach((f,i)=>this.tone(f,f,1,.04*v,'sine',.04,pan,undefined,i*.28));break;
      case 'ui':case 'click':
        this.tone(520,440,.045,.035*v,'sine',.002,pan);break;
      case 'blocked':case 'error':
        this.tone(150,120,.1,.04*v,'triangle',.003,pan);break;
      default:break;
    }
  }
  async destroy(){
    for(const source of this.oneShots){try{source.stop();source.disconnect();}catch{}}
    this.oneShots.clear();
    for(const source of this.ambient){try{source.stop();source.disconnect();}catch{}}
    this.ambient=[];
    if(this.context)await this.context.close().catch(()=>{});
    this.context=null;this.started=false;
  }
}


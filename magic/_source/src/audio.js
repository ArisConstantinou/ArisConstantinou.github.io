export class MagicAudio {
  constructor(muted=false){this.muted=muted;this.ctx=null;this.master=null;this.ambient=null;}
  async start(){
    try{
      if(!this.ctx){
        this.ctx=new (window.AudioContext||window.webkitAudioContext)();
        this.master=this.ctx.createGain();this.master.gain.value=this.muted?0:.24;this.master.connect(this.ctx.destination);
        const noise=this.ctx.createBuffer(1,this.ctx.sampleRate,this.ctx.sampleRate),d=noise.getChannelData(0);
        for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;this.noise=noise;
        const ag=this.ctx.createGain();ag.gain.value=.1;ag.connect(this.master);this.ambient=ag;
        for(const hz of [55,82.41,110.4]){const o=this.ctx.createOscillator();o.type='sine';o.frequency.value=hz;o.connect(ag);o.start();}
      }
      if(this.ctx.state==='suspended')await this.ctx.resume();
    }catch{}
  }
  setMuted(value){this.muted=value;if(this.master)this.master.gain.setTargetAtTime(value?0:.24,this.ctx.currentTime,.08);}
  sound(type){
    if(!this.ctx||this.muted)return;
    const ctx=this.ctx,t=ctx.currentTime;
    const specs={grab:[220,660,.25,'sine',.35],throw:[380,90,.18,'triangle',.45],
      impact:[90,34,.2,'triangle',.7],dash:[240,640,.13,'sine',.3],
      pulse:[80,28,.55,'sawtooth',.38],hurt:[140,50,.25,'sawtooth',.3],
      pickup:[660,880,.16,'sine',.24],relic:[220,880,.85,'sine',.4],
      win:[440,880,.9,'triangle',.32],death:[160,30,1.1,'sine',.5],
      alert:[330,250,.3,'triangle',.22],arrow:[500,140,.14,'triangle',.2]};
    const s=specs[type]||specs.impact,o=ctx.createOscillator(),g=ctx.createGain();
    o.type=s[3];o.frequency.setValueAtTime(s[0],t);o.frequency.exponentialRampToValueAtTime(s[1],t+s[2]);
    g.gain.setValueAtTime(.001,t);g.gain.exponentialRampToValueAtTime(s[4],t+.015);g.gain.exponentialRampToValueAtTime(.001,t+s[2]);
    o.connect(g);g.connect(this.master);o.start(t);o.stop(t+s[2]+.03);
    if(['throw','impact','pulse','dash','hurt'].includes(type)){
      const n=ctx.createBufferSource(),f=ctx.createBiquadFilter(),ng=ctx.createGain();
      n.buffer=this.noise;f.type='lowpass';f.frequency.setValueAtTime(type==='impact'?1700:3800,t);f.frequency.exponentialRampToValueAtTime(120,t+s[2]);
      ng.gain.setValueAtTime(.25,t);ng.gain.exponentialRampToValueAtTime(.001,t+s[2]);n.connect(f);f.connect(ng);ng.connect(this.master);n.start(t);n.stop(t+s[2]);
    }
  }
}

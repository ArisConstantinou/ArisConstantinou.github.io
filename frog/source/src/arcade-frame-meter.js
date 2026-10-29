export function createFrameMeter({capacity=240,interval=500}={}){
 const frames=new Float64Array(capacity);let count=0,index=0,last=null,emitAt=null,work=0,workN=0,snapshot=null;
 return {reset(){count=index=work=workN=0;last=emitAt=null;snapshot=null;},
 sample(now,visible=true){if(!visible||!Number.isFinite(now)){this.reset();return null;}if(last===null){last=emitAt=now;return null;}const dt=now-last;if(dt<=0)return null;if(dt>1000){this.reset();last=emitAt=now;return null;}last=now;frames[index]=dt;index=(index+1)%capacity;count=Math.min(capacity,count+1);if(now-emitAt<interval)return null;emitAt=now;const values=Array.from(frames.slice(0,count)).sort((a,b)=>a-b),mean=values.reduce((a,b)=>a+b,0)/count;snapshot={fps:1000/mean,frameMs:mean,p95Ms:values[Math.min(count-1,Math.floor(count*.95))],maxMs:values.at(-1),workMs:workN?work/workN:null,samples:count};work=workN=0;return {...snapshot};},
 work(ms){if(Number.isFinite(ms)&&ms>=0){work+=ms;workN++;}},inspect(){return snapshot?{...snapshot}:null;}};
}
export function installFrameMeter(game){
 const meter=createFrameMeter(),node=document.createElement('output');node.id='fps-counter';node.setAttribute('aria-label','Live frames per second');node.innerHTML='<b>FPS —</b><span>ΜΕΤΡΗΣΗ…</span>';document.body.append(node);let start=0;
 const reset=()=>meter.reset();document.addEventListener('visibilitychange',reset);
 return {begin(now){start=performance.now();const value=meter.sample(now,!document.hidden);if(value){node.querySelector('b').textContent='FPS '+Math.round(value.fps);node.querySelector('span').textContent=value.frameMs.toFixed(1)+' ms · p95 '+value.p95Ms.toFixed(1);node.dataset.fps=String(value.fps);node.title='Πραγματικά διαστήματα καρέ. Οι μετρήσεις επηρεάζονται από τη συσκευή, τον browser και το όριο οθόνης.';}},end(now){meter.work(now-start);},inspect:()=>meter.inspect(),dispose(){document.removeEventListener('visibilitychange',reset);node.remove();}};
}

export function distribution(values){
 const a=values.filter(Number.isFinite).sort((x,y)=>x-y);if(!a.length)return null;
 const mean=a.reduce((s,x)=>s+x,0)/a.length;
 return {count:a.length,mean,p50:a[Math.ceil(a.length*.5)-1],p95:a[Math.ceil(a.length*.95)-1],max:a.at(-1),over50:a.filter(x=>x>50).length,over100:a.filter(x=>x>100).length};
}
export function frameSummary(rows){
 const frames=distribution(rows.map(r=>r.interval));if(!frames)return null;
 const sections={};for(const key of new Set(rows.flatMap(r=>Object.keys(r.cpu))))sections[key]=distribution(rows.map(r=>r.cpu[key]));
 return {frames,fps:1000/frames.mean,minInstantFPS:1000/frames.max,cpu:sections,gpu:distribution(rows.map(r=>r.gpuMs)),drawCalls:distribution(rows.map(r=>r.calls)),triangles:distribution(rows.map(r=>r.triangles)),worst:rows.slice().sort((a,b)=>b.interval-a.interval).slice(0,10)};
}
export function phaseSummary(rows){const active=rows.filter(r=>r.active!==false);return {all:frameSummary(active),firstTwoSeconds:frameSummary(active.filter(r=>r.elapsed<2000)),steady:frameSummary(active.filter(r=>r.elapsed>=2000))};}

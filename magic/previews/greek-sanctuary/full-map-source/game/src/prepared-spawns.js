// Bounded one-shot visuals. A handed-off rig belongs to its actor forever;
// never recycle it across entities with cached picking/room ownership state.
export function createPreparedSpawns(factories){
 const queues=new Map();let ready=false,built=0,hits=0,misses=0;
 function clear(){for(const queue of queues.values())for(const visual of queue)visual.dispose();queues.clear();ready=false;built=hits=misses=0;}
 function snapshot(){return{ready,built,hits,misses,remaining:Object.fromEntries([...queues].map(([kind,q])=>[kind,q.length]))};}
 function take(kind){if(!ready||!factories[kind])return null;const visual=queues.get(kind)?.shift();if(visual){hits++;return visual;}misses++;return null;}
 async function prepare({counts,parent,position,prepareSurface,nextFrame=()=>new Promise(requestAnimationFrame)}){
  clear();const staged=[];
  const unstage=()=>{for(const visual of staged)visual.group.removeFromParent();};
  try{
   for(const[kind,count]of Object.entries(counts)){
    if(!factories[kind]||!Number.isInteger(count)||count<0||count>3)throw Error('Invalid prepared spawn count: '+kind);
    const queue=[];queues.set(kind,queue);
    for(let i=0;i<count;i++){
     await nextFrame();const visual=factories[kind]();queue.push(visual);built++;
     if(visual.ready)await visual.ready;
     visual.reset?.();visual.group.position.set(position.x+(staged.length%3-1)*.7,0,position.z-2-(staged.length/3|0)*.7);
     parent.add(visual.group);staged.push(visual);await prepareSurface(visual.group);
    }
   }
   ready=true;return unstage;
  }catch(error){unstage();clear();throw error;}
 }
 return{take,prepare,clear,snapshot};
}

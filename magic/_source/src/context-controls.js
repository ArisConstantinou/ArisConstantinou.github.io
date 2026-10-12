// A deliberate fast inward touch stroke arms a carried object as a shield.
// Ordinary aiming, slow inward drags and desktop mouse motion never latch it.
export function shieldGesture({type,start,previous,point,character}) {
  if(type!=='touch'||!previous||!character)return false;
  const elapsed=point.time-previous.time;
  if(elapsed<=0||elapsed>220)return false;
  const from=Math.max(Math.hypot(start.x-character.x,start.y-character.y),Math.hypot(previous.x-character.x,previous.y-character.y));
  const to=Math.hypot(point.x-character.x,point.y-character.y);
  const travel=Math.hypot(point.x-previous.x,point.y-previous.y);
  return from>16&&to<=34&&from-to>=16&&travel/elapsed*1000>=Math.max(160,from*3);
}

export function nearestContext(candidates,currentId) {
  const available=candidates.filter(c=>c.reachable&&c.distance<=c.range);
  const active=available.filter(c=>c.enabled!==false);
  const sorted=(active.length?active:available).sort((a,b)=>(b.priority||0)-(a.priority||0)||a.distance-b.distance);
  const best=sorted[0];if(!best)return null;
  const current=sorted.find(c=>c.id===currentId);
  return current&&(current.priority||0)===(best.priority||0)&&current.distance<=best.distance+.45?current:best;
}

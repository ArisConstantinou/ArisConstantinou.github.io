/** Keep continuous heat damage immediate, but display readable accumulated
 * amounts at five labels/second instead of allocating a new "0" every frame.
 * This collector changes only presentation; it never changes health or hits.
 */
export function createHearthDamageLabels(){
 const pending=new WeakMap();
 return (entity,damage,time)=>{
  if(!(damage>0))return false;
  let entry=pending.get(entity);
  if(!entry){entry={amount:0,nextAt:time+.2};pending.set(entity,entry);}
  entry.amount+=Math.min(damage,Math.max(0,entity.hp));
  if(time+1e-8<entry.nextAt&&entity.hp>damage)return false;
  const value=Math.round(entry.amount*10)/10;entry.amount=0;entry.nextAt=time+.2;
  return value>0?value:false;
 };
}

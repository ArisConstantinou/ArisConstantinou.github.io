import {layoutAnnotations} from './annotation-layout.mjs';
const NS='http://www.w3.org/2000/svg';
const measured=new Map();
function node(svg,name,attributes={}){const el=svg.ownerDocument.createElementNS(NS,name);for(const [key,value] of Object.entries(attributes))el.setAttribute(key,String(value));return el;}
function measureGroups(groups){
 // Identical SVG text, font and local coordinates share bounds across redraws.
 // Measure before adding rectangles to avoid alternating layout reads/writes.
 return groups.map(group=>{const key=group.innerHTML;let b=measured.get(key);if(!b){const box=group.getBBox();b={x:box.x,y:box.y,width:box.width,height:box.height};if(b.width&&b.height){if(measured.size>=2048)measured.delete(measured.keys().next().value);measured.set(key,b);}}return b;});
}
function backgrounds(svg,groups,scale,boxes=measureGroups(groups)){
 const pad=2*scale;
 groups.forEach((group,index)=>{const b=boxes[index];if(!b.width||!b.height)return;const label=group.dataset.boundText==='label';group.insertBefore(node(svg,'rect',{class:'label-background',x:b.x-pad,y:b.y-pad,width:b.width+pad*2,height:b.height+pad*2,rx:2*scale,fill:label?'transparent':'#f7f9f8',stroke:'none'}),group.firstChild);if(label)for(const text of group.querySelectorAll('text')){text.setAttribute('paint-order','stroke');text.setAttribute('stroke','#f7f9f8');text.setAttribute('stroke-width',String(2.5*scale));text.setAttribute('stroke-linejoin','round');}});
}
function textGroups(svg,selector){
 const groups=[];for(const text of svg.querySelectorAll(selector)){const group=node(svg,'g',{class:'dimension-caption'}),transform=text.getAttribute('transform');if(transform){group.setAttribute('transform',transform);text.removeAttribute('transform');}text.before(group);group.append(text);groups.push(group);}return groups;
}
export function protectSvgText(svg,selector,scale=1){backgrounds(svg,textGroups(svg,selector),scale);}
export function raisePlanAnnotations(svg,scale=1,items=[]){
 const lines=node(svg,'g',{'data-annotation-layer':'lines','pointer-events':'none'}),labels=node(svg,'g',{'data-annotation-layer':'labels','pointer-events':'none'}),captionsToProtect=[];
 svg.append(lines,labels);
 for(const item of svg.querySelectorAll('.plan-item')){
  const owner=node(svg,'g',{class:'annotation-owner','data-owner':item.dataset.id,transform:item.getAttribute('transform')||''});
  labels.append(owner);
  for(const text of [...item.querySelectorAll('.bound-text')]){owner.append(text);if(text.dataset.boundText==='label')captionsToProtect.push(text);}
  if(!owner.childNodes.length)owner.remove();
 }
 for(const dimensions of [...svg.querySelectorAll('.section-dimension-lines,.building-dimensions')]){
  const transform=dimensions.parentElement.classList.contains('plan-item')?dimensions.parentElement.getAttribute('transform'):'';
  const captions=node(svg,'g',{class:'annotation-owner','data-owner':dimensions.parentElement.dataset.id||'',transform:transform||'',fill:dimensions.getAttribute('fill')||'#9c332e','pointer-events':'none'});
  labels.append(captions);
  for(const text of [...dimensions.querySelectorAll('text')])captions.append(text);
  const owner=node(svg,'g',{class:'annotation-owner',transform:transform||''});owner.append(dimensions);lines.append(owner);
 }
 const dimensions=textGroups(labels,'.annotation-owner > text'),protectedGroups=[...captionsToProtect,...dimensions],groups=[...labels.querySelectorAll('.bound-text,.dimension-caption')],boxes=measureGroups(groups);
 const byGroup=new Map(groups.map((group,n)=>[group,boxes[n]]));
 if(items.length)layoutAnnotations(svg,groups,boxes,items,scale);
 backgrounds(svg,protectedGroups,scale,protectedGroups.map(group=>byGroup.get(group)));
}

// One pixel-sized marker for the first real projectile contact, or its range
// endpoint. An edge marker points toward an offscreen endpoint; it is not an
// impact at the clamped screen position. No aim input is changed here.
export const RETICLE_COLORS=Object.freeze({clear:'#f4ffdd',target:'#c4ff83',blocked:'#ffbb73'});
const SOLID_KINDS=new Set(['wall','rock','terrain','boundary']);
const finitePoint=point=>point&&Number.isFinite(point.x)&&Number.isFinite(point.y)&&Number.isFinite(point.z);

// project(x,y,z) returns pixel x/y, visible, and preferably behind. Explicit
// camera-space behind information lets us undo perspective's mirrored X/Y.
export function computeReticle(preview,project,width,height,{inset=22}={}){
 if(!finitePoint(preview)||typeof project!=='function'||!Number.isFinite(width)||!Number.isFinite(height)||width<=0||height<=0)return null;
 const projected=project(preview.x,preview.y,preview.z);
 if(!projected||!Number.isFinite(projected.x)||!Number.isFinite(projected.y))return null;
 const margin=Math.max(0,Math.min(Number.isFinite(inset)?inset:22,Math.max(0,(Math.min(width,height)-2)/2)));
 const centerX=width/2,centerY=height/2,halfWidth=centerX-margin,halfHeight=centerY-margin;
 const behind=projected.behind===true;
 const offscreen=behind||projected.visible===false||projected.x<margin||projected.x>width-margin||projected.y<margin||projected.y>height-margin;
 let x=projected.x,y=projected.y,edgeAngle=null;
 if(offscreen){
  let dx=(projected.x-centerX)*(behind?-1:1),dy=(projected.y-centerY)*(behind?-1:1);
  // Straight behind has no unique left/right bearing. Use the bottom edge,
  // while a clipped straight-ahead point keeps the forward/top indication.
  if(Math.hypot(dx,dy)<1e-8){dx=0;dy=behind?1:-1;}
  const scale=Math.min(dx===0?Infinity:halfWidth/Math.abs(dx),dy===0?Infinity:halfHeight/Math.abs(dy));
  x=centerX+dx*scale;y=centerY+dy*scale;edgeAngle=Math.atan2(dy,dx);
 }
 const sourceKind=typeof preview.kind==='string'?preview.kind:null;
 const blocked=preview.blocked===true||SOLID_KINDS.has(sourceKind);
 const kind=blocked?'blocked':sourceKind==='actor'||preview.targetId!=null?'target':'clear';
 return {x,y,color:RETICLE_COLORS[kind],kind,sourceKind,offscreen,edgeAngle,behind,
  endpoint:{x:preview.x,y:preview.y,z:preview.z},projection:{x:projected.x,y:projected.y}};
}

export function drawReticle(context,reticle){
 if(!context||!reticle)return;
 const {x,y,color,kind,offscreen,edgeAngle}=reticle,inner=offscreen?3:4,outer=offscreen?7:10;
 context.save();context.globalAlpha=1;context.lineCap='round';context.lineJoin='round';
 context.beginPath();
 for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
  context.moveTo(x+dx*inner,y+dy*inner);context.lineTo(x+dx*outer,y+dy*outer);
 }
 if(kind==='blocked'){
  context.moveTo(x-2.5,y-2.5);context.lineTo(x+2.5,y+2.5);
  context.moveTo(x+2.5,y-2.5);context.lineTo(x-2.5,y+2.5);
 }
 if(offscreen&&Number.isFinite(edgeAngle)){
  const dx=Math.cos(edgeAngle),dy=Math.sin(edgeAngle),sideX=-dy,sideY=dx;
  context.moveTo(x+dx*10+sideX*4,y+dy*10+sideY*4);
  context.lineTo(x+dx*15,y+dy*15);
  context.lineTo(x+dx*10-sideX*4,y+dy*10-sideY*4);
 }
 context.strokeStyle='#173c35';context.lineWidth=4;context.stroke();
 context.strokeStyle=color;context.lineWidth=2;context.stroke();
 if(kind==='target'){
  context.beginPath();context.arc(x,y,2,0,Math.PI*2);
  context.strokeStyle='#173c35';context.lineWidth=2;context.stroke();
  context.fillStyle=color;context.fill();
 }
 context.restore();
}

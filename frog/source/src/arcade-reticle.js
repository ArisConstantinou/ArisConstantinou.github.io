// The crosshair belongs to the input. Physical contact changes its feedback,
// never its position: a stationary mouse must remain stationary while the
// camera, frog and things under the pointer move.
export const RETICLE_COLORS=Object.freeze({clear:'#f4ffdd',target:'#c4ff83',blocked:'#ffbb73'});
export const RETICLE_BEARING_DISTANCE=8;
const SOLID_KINDS=new Set(['wall','rock','terrain','boundary']);
const finitePoint=point=>point&&Number.isFinite(point.x)&&Number.isFinite(point.y)&&Number.isFinite(point.z);
const finitePixels=point=>point&&Number.isFinite(point.x)&&Number.isFinite(point.y);

// pointer is already in the label canvas's CSS-pixel coordinate space. Center
// is used for locked mouse/touch chase. A directional stick supplies a standing
// origin and bearing; its marker stays a fixed distance away, not at a wall or
// target whose changing depth would make it jump. Only that bearing marker may
// use an edge chevron. Mouse pixels are never clamped or smoothed.
export function computeReticle(preview,project,width,height,{pointer,centered=false,origin,bearing,distance=RETICLE_BEARING_DISTANCE,inset=22}={}){
 if(!finitePoint(preview)||!Number.isFinite(width)||!Number.isFinite(height)||width<=0||height<=0)return null;
 const physical=typeof project==='function'?project(preview.x,preview.y,preview.z):null;
 const projection=finitePixels(physical)?{x:physical.x,y:physical.y}:null;
 let anchor='center',anchorWorld=null,projected={x:width/2,y:height/2,visible:true};
 if(!centered&&finitePixels(pointer)){
  anchor='pointer';projected={x:pointer.x,y:pointer.y,visible:true};
 }else if(!centered&&finitePoint(origin)&&Number.isFinite(bearing?.x)&&Number.isFinite(bearing?.z)&&Math.hypot(bearing.x,bearing.z)>1e-8&&typeof project==='function'){
  const length=Math.hypot(bearing.x,bearing.z),reach=Number.isFinite(distance)&&distance>0?distance:RETICLE_BEARING_DISTANCE;
  anchor='bearing';anchorWorld={x:origin.x+bearing.x/length*reach,y:origin.y,z:origin.z+bearing.z/length*reach};
  projected=project(anchorWorld.x,anchorWorld.y,anchorWorld.z);
  if(!finitePixels(projected))return null;
 }
 const margin=Math.max(0,Math.min(Number.isFinite(inset)?inset:22,Math.max(0,(Math.min(width,height)-2)/2)));
 const centerX=width/2,centerY=height/2,halfWidth=centerX-margin,halfHeight=centerY-margin;
 const behind=anchor==='bearing'&&projected.behind===true;
 const offscreen=anchor==='bearing'&&(behind||projected.visible===false||projected.x<margin||projected.x>width-margin||projected.y<margin||projected.y>height-margin);
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
 const kind=blocked?'blocked':sourceKind==='actor'||sourceKind==='guard'||preview.targetId!=null?'target':'clear';
 return {x,y,color:RETICLE_COLORS[kind],kind,sourceKind,offscreen,edgeAngle,behind,
  anchor,anchorWorld,anchorProjection:{x:projected.x,y:projected.y},endpoint:{x:preview.x,y:preview.y,z:preview.z},projection};
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

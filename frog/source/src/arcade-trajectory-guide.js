import * as THREE from 'three';
import {LineSegmentsGeometry} from 'three/addons/lines/LineSegmentsGeometry.js';
import {LineSegments2} from 'three/addons/lines/LineSegments2.js';
import {LineMaterial} from 'three/addons/lines/LineMaterial.js';

// Reuses the existing sampled ballistic path. Width is in screen pixels.
// Both layers share one segment buffer; changing aim allocates no new buffers.
export function createWideTrajectory(geometry,legacy,{width=4.5}={}){
 const count=geometry.attributes.position.count;if(count<2)throw Error('Trajectory requires two samples');
 const packed=new Float32Array((count-1)*6),wide=new LineSegmentsGeometry().setPositions(packed);
 const distances=new THREE.InstancedInterleavedBuffer(new Float32Array((count-1)*2),2,1);
 wide.setAttribute('instanceDistanceStart',new THREE.InterleavedBufferAttribute(distances,1,0));
 wide.setAttribute('instanceDistanceEnd',new THREE.InterleavedBufferAttribute(distances,1,1));
 const colors=geometry.attributes.color?new Float32Array(packed.length):null;if(colors)wide.setColors(colors);
 const common={dashed:true,dashSize:legacy.dashSize||.36,gapSize:legacy.gapSize||.2,worldUnits:false,transparent:true,depthWrite:false,depthTest:false,toneMapped:false,alphaToCoverage:true};
 const border=new LineMaterial({...common,color:'#143b30',linewidth:width+4.5,opacity:.96});
 const ink=new LineMaterial({...common,color:legacy.color,vertexColors:!!colors,linewidth:width,opacity:.94});
 const outer=new LineSegments2(wide,border),inner=new LineSegments2(wide,ink),root=new THREE.Group();
 outer.frustumCulled=inner.frustumCulled=root.frustumCulled=false;outer.renderOrder=0;inner.renderOrder=1;root.add(outer,inner);
 root.geometry=geometry;root.material=legacy;root.isWideTrajectory=true;root.guideWidths={ink:width,border:width+4.5};
 const prepare=inner.onBeforeRender;inner.onBeforeRender=function(renderer,...args){prepare.call(this,renderer,...args);ink.color.copy(legacy.color);ink.opacity=legacy.opacity<.4?.7:.94;};
 root.computeLineDistances=()=>{const p=geometry.attributes.position,c=geometry.attributes.color;let length=0;
  for(let i=0;i<count-1;i++){const offset=i*6,x=p.getX(i),y=p.getY(i),z=p.getZ(i),u=p.getX(i+1),v=p.getY(i+1),w=p.getZ(i+1);
   packed.set([x,y,z,u,v,w],offset);distances.array[i*2]=length;length+=Math.hypot(u-x,v-y,w-z);distances.array[i*2+1]=length;
   if(colors)colors.set([c.getX(i),c.getY(i),c.getZ(i),c.getX(i+1),c.getY(i+1),c.getZ(i+1)],offset);
  }wide.attributes.instanceStart.data.needsUpdate=true;distances.needsUpdate=true;if(colors)wide.attributes.instanceColorStart.data.needsUpdate=true;return root;
 };
 root.prewarm=async(renderer,camera,scene)=>{const visible=root.visible;root.visible=true;try{await renderer.compileAsync(root,camera,scene);}finally{root.visible=visible;}};
 geometry.addEventListener('dispose',()=>{wide.dispose();border.dispose();ink.dispose();});
 root.computeLineDistances();return root;
}
export function drawTrajectoryArrows(game){
 if(!game.running||game.layoutEditing)return;
 const roots=game.trajectoryGuides||[],c=game.labelCtx;
 for(const line of roots){if(!line?.visible||!line.isWideTrajectory)continue;const p=line.geometry.attributes.position;
  c.save();c.strokeStyle='#143b30';c.fillStyle=line.material.color.getStyle();c.lineWidth=3;
  for(let i=0;i<3;i++){const u=(game.elapsed*.12+i/3)%1,index=Math.max(1,Math.min(p.count-2,Math.round(u*(p.count-1)))),point=game.project(p.getX(index),p.getY(index)+.08,p.getZ(index)),next=game.project(p.getX(index+1),p.getY(index+1)+.08,p.getZ(index+1));
   if(point.behind||point.x<20||point.x>game.w-20||point.y<80||point.y>game.h-30)continue;
   c.save();c.translate(point.x,point.y);c.rotate(Math.atan2(next.y-point.y,next.x-point.x));c.beginPath();c.moveTo(-5,-4);c.lineTo(5,0);c.lineTo(-5,4);c.closePath();c.stroke();c.fill();c.restore();
  }c.restore();
 }
}

import * as THREE from './vendor/three/three.module.min.js';
import {OrbitControls} from './vendor/three/OrbitControls.js';
import {architecture,heightCm,AREA_3D} from './architecture.mjs';
import {worldRings,signedArea,contains} from './geometry.mjs';

function shapes(rings){
  const parents=rings.map((r,n)=>rings.map((p,k)=>({k,area:Math.abs(signedArea(p))})).filter(v=>v.k!==n&&v.area>Math.abs(signedArea(r))&&contains([rings[v.k]],r[0])).sort((a,b)=>a.area-b.area)[0]?.k??-1);
  const depth=n=>parents[n]<0?0:1+depth(parents[n]);
  const path=(ring,isShape)=>{const p=isShape?new THREE.Shape():new THREE.Path();ring.forEach((v,n)=>p[n?'lineTo':'moveTo'](v.x,-v.y));p.closePath();return p;};
  return rings.flatMap((ring,n)=>{if(depth(n)%2)return [];const shape=path(ring,true);shape.holes=rings.flatMap((r,k)=>parents[k]===n?[path(r,false)]:[]);return [shape];});
}
function floorGeometry(rings,depth=.08){const g=new THREE.ExtrudeGeometry(shapes(rings),{depth,bevelEnabled:false,curveSegments:1});g.rotateX(-Math.PI/2);g.translate(0,-depth,0);return g;}
function mergeGeometries(parts){
  const positions=[],normals=[];for(const g of parts){const p=g.index?g.toNonIndexed():g;positions.push(...p.attributes.position.array);normals.push(...p.attributes.normal.array);if(p!==g)p.dispose();g.dispose();}
  const merged=new THREE.BufferGeometry();merged.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));merged.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));merged.computeBoundingSphere();return merged;
}
export function createPlan3D(host,{onSelect,onError,onDoorPlace,onDoorMove,onDoorMoveEnd}){
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'default'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor('#e8eeec');renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.9;
  const canvas=renderer.domElement;canvas.id='three-canvas';canvas.setAttribute('aria-label','3D κάτοψη · πάτησε χώρο για επιλογή');canvas.tabIndex=0;host.prepend(canvas);
  const gl=renderer.getContext(),debug=gl.getExtension('WEBGL_debug_renderer_info');host.dataset.renderDevice=debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);
  const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-10,10,10,-10,.01,1000);scene.add(new THREE.HemisphereLight(0xffffff,0x799589,2.4));const light=new THREE.DirectionalLight(0xffffff,2.6);light.position.set(-12,25,15);scene.add(light);
  const controls=new OrbitControls(camera,canvas);controls.enableDamping=false;controls.minPolarAngle=0;controls.maxPolarAngle=Math.PI*.47;controls.screenSpacePanning=true;
  const root=new THREE.Group();scene.add(root);const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2(),labels=host.querySelector('#three-labels');
  let signature='',selected=new Set(),floorMeshes=[],pickables=[],labelEntries=[],wallMesh,wallOwners=[],ceilings=[],active=false,frame=0,angle='angle',ceilingVisible=false,extent=10,modelBounds,observer,disposed=false,currentItems=[],modelWalls=[],doorMode=false,doorDrag=null;
  host.dataset.ceilings='false';
  const material=color=>new THREE.MeshStandardMaterial({color,roughness:.85,metalness:0});
  function disposeModel(){root.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});root.clear();floorMeshes=[];pickables=[];ceilings=[];labelEntries=[];wallMesh=null;wallOwners=[];labels.replaceChildren();}
  function add(mesh,id,pick=true){mesh.userData.id=id;mesh.userData.baseColor=mesh.material.color.getHex();root.add(mesh);if(pick)pickables.push(mesh);return mesh;}
  function box(w,h,d,x,y,z,rotation=0){const g=new THREE.BoxGeometry(w,h,d);g.rotateY(rotation);g.translate(x,y,z);return g;}
  function lineGeometry(a,b,bottom,top,thickness=.14){return box(Math.hypot(b.x-a.x,b.y-a.y),top-bottom,thickness,(a.x+b.x)/2,(top+bottom)/2,(a.y+b.y)/2,-Math.atan2(b.y-a.y,b.x-a.x));}
  function makeLabel(item,rings){
    let point={x:rings.flat().reduce((n,p)=>n+p.x,0)/rings.flat().length,y:rings.flat().reduce((n,p)=>n+p.y,0)/rings.flat().length};
    if(!contains(rings,point)){const g=new THREE.ShapeGeometry(shapes(rings));const p=g.attributes.position;if(p.count>=3)point={x:(p.getX(0)+p.getX(1)+p.getX(2))/3,y:-(p.getY(0)+p.getY(1)+p.getY(2))/3};g.dispose();}
    const el=document.createElement('span');el.className='three-label';el.dataset.area=item.id;el.dataset.worldX=String(point.x);el.dataset.worldY=String(point.y);el.textContent=[item.number,item.label].filter(Boolean).join(' · ');labels.append(el);labelEntries.push({el,item,position:new THREE.Vector3(point.x,.12,point.y)});
  }
  function rebuild(plan){
    const start=performance.now();disposeModel();const items=plan.items.filter(i=>i.floor===plan.activeFloor&&!i.hidden),model=architecture(items,plan.measurement.cmPerUnit);currentItems=items;modelWalls=model.walls;
    for(const f of model.floors){
      const mesh=add(new THREE.Mesh(floorGeometry(f.rings),material(f.item.color)),f.item.id);mesh.userData.baseColor=f.item.color;mesh.userData.width=f.item.w*model.scale;mesh.userData.length=f.item.h*model.scale;mesh.userData.height=heightCm(f.item)/100;floorMeshes.push(mesh);
      const roof=add(new THREE.Mesh(floorGeometry(f.rings,.06),material('#f5f4ed')),f.item.id);roof.position.y=heightCm(f.item)/100+.06;roof.visible=ceilingVisible;roof.userData.ceiling=true;ceilings.push(roof);makeLabel(f.item,f.rings);
      if(f.item.type==='stairs'){
        const stairParts=[];const a=-f.item.rotation*Math.PI/180;for(let n=0;n<12;n++){const localZ=(n/12-.5+.5/12)*f.item.h*model.scale,h=(n+1)/12*heightCm(f.item)/100,x=(f.item.x+f.item.w/2)*model.scale+localZ*Math.sin(a),z=(f.item.y+f.item.h/2)*model.scale+localZ*Math.cos(a);stairParts.push(box(f.item.w*model.scale,h,f.item.h*model.scale/12,x,h/2,z,a));}add(new THREE.Mesh(mergeGeometries(stairParts),material(f.item.color)),f.item.id);
      }
    }
    const wallParts=[];for(const wall of model.blocks){wallParts.push(lineGeometry(wall.a,wall.b,wall.bottom,wall.top,wall.thickness));wallOwners.push(...Array(12).fill(wall.owners));}
    if(wallParts.length){const g=mergeGeometries(wallParts);g.setAttribute('color',new THREE.BufferAttribute(new Float32Array(g.attributes.position.count*3),3));const m=material('#ffffff');m.vertexColors=true;wallMesh=new THREE.Mesh(g,m);root.add(wallMesh);pickables.push(wallMesh);}
    for(const i of items.filter(i=>['window','door','ac'].includes(i.type))){
      const a=-i.rotation*Math.PI/180,x=(i.x+i.w/2)*model.scale,z=(i.y+i.h/2)*model.scale,h=heightCm(i)/100;
      if(i.type==='ac')add(new THREE.Mesh(box(i.w*model.scale,h,i.h*model.scale,x,h/2,z,a),material(i.color)),i.id);
      else {
        const opening=model.openings.find(o=>o.item.id===i.id),[p,q]=opening.line;
        if(i.type==='window'){
          const pane=new THREE.Mesh(lineGeometry(p,q,.9,.9+h,.035),new THREE.MeshStandardMaterial({color:'#9fc9d8',transparent:true,opacity:.52,roughness:.18,side:THREE.DoubleSide}));add(pane,i.id);
          const frameParts=[lineGeometry(p,q,.88,.96,.14),lineGeometry(p,q,.9+h-.04,.9+h+.04,.14),box(.06,h,.14,p.x,.9+h/2,p.y),box(.06,h,.14,q.x,.9+h/2,q.y)];add(new THREE.Mesh(mergeGeometries(frameParts),material('#516e76')),i.id);
        } else {
          const len=Math.hypot(q.x-p.x,q.y-p.y),leafEnd={x:p.x+(q.y-p.y),y:p.y-(q.x-p.x)};
          add(new THREE.Mesh(lineGeometry(p,leafEnd,0,h,.055),material('#77a7ae')),i.id);
          const arc=[];for(let n=0;n<=16;n++){const v=n/16*Math.PI/2,dx=(q.x-p.x)*Math.cos(v)+(q.y-p.y)*Math.sin(v),dy=(q.y-p.y)*Math.cos(v)-(q.x-p.x)*Math.sin(v);arc.push(new THREE.Vector3(p.x+dx,.025,p.y+dy));}const curve=new THREE.CatmullRomCurve3(arc);add(new THREE.Mesh(new THREE.TubeGeometry(curve,16,Math.min(.015,len/100),3,false),material('#3686b4')),i.id);
        }
      }
    }
    for(const i of items.filter(i=>i.type==='door')){
      const g=new THREE.PlaneGeometry(i.w*model.scale,i.h*model.scale);g.rotateX(-Math.PI/2);g.rotateY(-i.rotation*Math.PI/180);g.translate((i.x+i.w/2)*model.scale,.045,(i.y+i.h/2)*model.scale);
      add(new THREE.Mesh(g,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false})),i.id);
      makeLabel(i,worldRings(i).map(r=>r.map(p=>({x:p.x*model.scale,y:p.y*model.scale}))));
    }
    for(const i of items.filter(i=>i.type==='route')){
      const a=i.rotation*Math.PI/180,c=Math.cos(a),s=Math.sin(a),points=(i.points??[{x:1,y:1},{x:1,y:0},{x:0,y:0}]).map(p=>{const x=(p.x-.5)*i.w,y=(p.y-.5)*i.h;return new THREE.Vector3((i.x+i.w/2+x*c-y*s)*model.scale,.03,(i.y+i.h/2+x*s+y*c)*model.scale);});
      const parts=[];for(let n=1;n<points.length;n++){const p=points[n-1],q=points[n],len=p.distanceTo(q);if(!len)continue;const g=new THREE.CylinderGeometry(.025,.025,len,4);g.rotateZ(-Math.PI/2);g.rotateY(-Math.atan2(q.z-p.z,q.x-p.x));g.translate((p.x+q.x)/2,.03,(p.z+q.z)/2);parts.push(g);}if(parts.length)add(new THREE.Mesh(mergeGeometries(parts),material(i.color)),i.id);
    }
    modelBounds=new THREE.Box3().setFromObject(root);if(modelBounds.isEmpty())modelBounds=new THREE.Box3(new THREE.Vector3(-2,0,-2),new THREE.Vector3(2,2,2));
    host.dataset.areas=String(floorMeshes.length);host.dataset.wallSegments=String(model.walls.length);host.dataset.wallBlocks=String(model.blocks.length);host.dataset.buildMs=(performance.now()-start).toFixed(2);highlight();
  }
  function highlight(){for(const mesh of floorMeshes){const chosen=selected.has(mesh.userData.id);mesh.material.color.set(chosen?'#38bfa9':mesh.userData.baseColor);mesh.material.emissive.set(chosen?'#13463f':'#000000');mesh.material.emissiveIntensity=chosen?.28:0;if(chosen){host.dataset.selectedWidth=String(mesh.userData.width);host.dataset.selectedLength=String(mesh.userData.length);host.dataset.selectedHeight=String(mesh.userData.height);}}for(const roof of ceilings)roof.material.color.set(selected.has(roof.userData.id)?'#9fe7d9':'#f5f4ed');for(const label of labelEntries)label.el.classList.toggle('selected',selected.has(label.item.id));host.dataset.selected=[...selected].join(',');}
  function updateLabels(){const r=host.getBoundingClientRect();for(const l of labelEntries){const p=l.position.clone().project(camera),wide=l.item.w*currentScale()*camera.zoom*r.width/(camera.right-camera.left)>75,show=p.z>-1&&p.z<1&&Math.abs(p.x)<1&&Math.abs(p.y)<1&&(wide||selected.has(l.item.id));l.el.hidden=!show;l.el.style.left=((p.x+1)*r.width/2)+'px';l.el.style.top=((-p.y+1)*r.height/2)+'px';}}
  function currentScale(){return floorMeshes[0]?floorMeshes[0].userData.width/labelEntries[0].item.w:1;}
  function highlightObjects(){
    if(wallMesh){const colors=wallMesh.geometry.attributes.color,base=new THREE.Color('#f5f3e9'),chosen=new THREE.Color('#38bfa9');wallOwners.forEach((owners,face)=>{const c=owners.some(id=>selected.has(id))?chosen:base;for(let n=0;n<3;n++)colors.setXYZ(face*3+n,c.r,c.g,c.b);});colors.needsUpdate=true;}
    for(const mesh of pickables){if(!mesh.userData.id||floorMeshes.includes(mesh)||ceilings.includes(mesh))continue;mesh.material.color.set(selected.has(mesh.userData.id)?0x38bfa9:mesh.userData.baseColor);}
  }
  function draw(){frame=0;if(!active)return;const start=performance.now();renderer.render(scene,camera);updateLabels();host.dataset.renderMs=(performance.now()-start).toFixed(2);host.dataset.drawCalls=String(renderer.info.render.calls);host.dataset.triangles=String(renderer.info.render.triangles);host.dataset.geometries=String(renderer.info.memory.geometries);}
  function request(){if(active&&!frame)frame=requestAnimationFrame(draw);}
  function resize(){const r=host.getBoundingClientRect();if(r.width<1||r.height<1)return;renderer.setSize(r.width,r.height,false);const aspect=r.width/r.height;camera.left=-extent*aspect/2;camera.right=extent*aspect/2;camera.top=extent/2;camera.bottom=-extent/2;camera.updateProjectionMatrix();request();}
  function fit(){if(!modelBounds)return;const center=modelBounds.getCenter(new THREE.Vector3()),size=modelBounds.getSize(new THREE.Vector3()),r=host.getBoundingClientRect(),aspect=Math.max(.2,r.width/r.height);extent=Math.max(size.z,size.x/aspect,size.y*1.5,2)*1.35;camera.zoom=1;controls.target.set(center.x,0,center.z);const distance=Math.max(size.x,size.z,size.y,4)*1.8;
    camera.position.copy(controls.target).add(angle==='top'?new THREE.Vector3(0,distance,.0001):new THREE.Vector3(distance*.65,distance*1.5,distance*.8));camera.up.set(0,1,0);camera.lookAt(controls.target);controls.update();camera.updateMatrixWorld();
    const projected=[];for(const x of [modelBounds.min.x,modelBounds.max.x])for(const y of [modelBounds.min.y,modelBounds.max.y])for(const z of [modelBounds.min.z,modelBounds.max.z])projected.push(new THREE.Vector3(x,y,z).applyMatrix4(camera.matrixWorldInverse));
    const low=Math.min(...projected.map(p=>p.y)),high=Math.max(...projected.map(p=>p.y));extent=Math.max((Math.max(...projected.map(p=>p.x))-Math.min(...projected.map(p=>p.x)))/aspect,high-low,2)*1.22;
    const shift=(high+low)/2;const up=new THREE.Vector3(0,1,0).applyQuaternion(camera.quaternion).multiplyScalar(shift);camera.position.add(up);controls.target.add(up);controls.update();resize();
  }
  function setAngle(next){angle=next;host.dataset.angle=angle;controls.enableRotate=angle!=='top';controls.mouseButtons.LEFT=angle==='top'?THREE.MOUSE.PAN:THREE.MOUSE.ROTATE;controls.touches.ONE=angle==='top'?THREE.TOUCH.PAN:THREE.TOUCH.ROTATE;fit();}
  function aim(e){const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(pointer,camera);}
  function hit(e){aim(e);return raycaster.intersectObjects(pickables,false).find(h=>h.object.visible);}
  function wallAt(e,fallback=false){
    aim(e);const h=wallMesh&&raycaster.intersectObject(wallMesh,false)[0];if(h)return {roomId:wallOwners[h.faceIndex][0],point:{x:h.point.x,y:h.point.z}};
    if(!fallback)return null;const p=raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),0),new THREE.Vector3());if(!p)return null;
    let best;for(const wall of modelWalls){const dx=wall.b.x-wall.a.x,dy=wall.b.y-wall.a.y,den=dx*dx+dy*dy,t=Math.max(0,Math.min(1,((p.x-wall.a.x)*dx+(p.z-wall.a.y)*dy)/den)),point={x:wall.a.x+t*dx,y:wall.a.y+t*dy},distance=Math.hypot(point.x-p.x,point.y-p.z);if(distance<.7&&(!best||best.distance>distance))best={roomId:wall.owners[0],point,distance};}return best;
  }
  const pointers=new Set();let down=null;
  canvas.addEventListener('pointerdown',e=>{
    pointers.add(e.pointerId);down=pointers.size===1?{id:e.pointerId,x:e.clientX,y:e.clientY,moved:false}:null;
    if(pointers.size>1){if(doorDrag?.moved)onDoorMoveEnd?.();doorDrag=null;controls.enabled=active&&!doorMode;return;}
    if(doorMode){controls.enabled=false;canvas.setPointerCapture(e.pointerId);return;}
    const h=hit(e),id=h?.object.userData.id,item=currentItems.find(i=>i.id===id);doorDrag=item?.type==='door'&&!item.locked&&selected.has(id)?{id,pointer:e.pointerId,moved:false}:null;
  },true);
  canvas.addEventListener('pointermove',e=>{
    if(down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)>7)down.moved=true;
    if(doorDrag&&pointers.size===1&&down?.moved){doorDrag.moved=true;controls.enabled=false;const wall=wallAt(e,true);if(wall)onDoorMove?.(doorDrag.id,wall.roomId,wall.point);}
  },true);
  canvas.addEventListener('pointerup',e=>{
    const tap=down&&down.id===e.pointerId&&!down.moved&&pointers.size===1;pointers.delete(e.pointerId);down=null;
    if(doorMode){const wall=wallAt(e,true);if(wall)onDoorPlace?.(wall.roomId,wall.point);if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);return;}
    if(doorDrag?.moved){doorDrag=null;onDoorMoveEnd?.();controls.enabled=active;return;}doorDrag=null;controls.enabled=active;if(!tap)return;
    const h=hit(e);if(h){const owners=h.object===wallMesh?wallOwners[h.faceIndex]:[h.object.userData.id];onSelect(owners?.find(id=>selected.has(id))??owners?.[0],e.shiftKey);}else onSelect(null,false);
  },true);
  canvas.addEventListener('pointercancel',e=>{pointers.delete(e.pointerId);down=null;if(doorDrag?.moved)onDoorMoveEnd?.();doorDrag=null;controls.enabled=active&&!doorMode;});
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();if(!disposed)onError('Η 3D όψη διακόπηκε. Το σχέδιο παραμένει αποθηκευμένο· επέστρεψε στη 2D και ξανάνοιξε τη 3D.');});
  controls.addEventListener('change',request);observer=new ResizeObserver(resize);observer.observe(host);
  return {
    sync(plan,ids){selected=new Set(ids);if(!plan.measurement)return;const next=JSON.stringify([plan.activeFloor,plan.measurement.cmPerUnit,plan.items]);if(next!==signature){const first=!signature;signature=next;rebuild(plan);if(first)fit();}else highlight();highlightObjects();request();},
    setActive(value){active=value;controls.enabled=value&&!doorMode;if(value){resize();request();}else if(frame){cancelAnimationFrame(frame);frame=0;}},
    setDoorMode(value){doorMode=value;controls.enabled=active&&!value;canvas.style.cursor=value?'crosshair':'';},
    setAngle,fit,zoom(factor){camera.zoom=Math.max(.1,Math.min(30,camera.zoom/factor));camera.updateProjectionMatrix();request();},
    setCeilings(value){ceilingVisible=value;for(const roof of ceilings)roof.visible=value;host.dataset.ceilings=String(value);request();},
    dispose(){disposed=true;if(frame)cancelAnimationFrame(frame);observer.disconnect();controls.dispose();disposeModel();renderer.dispose();renderer.forceContextLoss();canvas.remove();},
    project(id){const mesh=floorMeshes.find(m=>m.userData.id===id);if(!mesh)return null;const p=new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3()).project(camera),r=canvas.getBoundingClientRect();return {x:r.left+(p.x+1)*r.width/2,y:r.top+(1-p.y)*r.height/2};}
  };
}

import * as THREE from 'three';

// Airborne props use one vertical placement shadow. Their original directional
// casters are restored as soon as the placement shadow stops being displayed.
// Physics, aiming and plate activation are deliberately independent of this layer.
export function projectedHalfExtents(ext, q) {
  const {x,y,z,w}=q,xx=x*x,yy=y*y,zz=z*z;
  return {
    x:Math.abs(1-2*(yy+zz))*ext.x+Math.abs(2*(x*y-z*w))*ext.y+Math.abs(2*(x*z+y*w))*ext.z,
    y:Math.abs(2*(x*y+z*w))*ext.x+Math.abs(1-2*(xx+zz))*ext.y+Math.abs(2*(y*z-x*w))*ext.z,
    z:Math.abs(2*(x*z-y*w))*ext.x+Math.abs(2*(y*z+x*w))*ext.y+Math.abs(1-2*(xx+yy))*ext.z,
  };
}

export function shadowSupport(position, bottom, surfaces) {
  let support=null;
  for(const s of surfaces){
    const top=s.y+s.h/2;
    if(top>bottom+.09||Math.abs(position.x-s.x)>s.w/2||Math.abs(position.z-s.z)>s.d/2)continue;
    if(!support||top>support.y)support={x:s.x,z:s.z,y:top,w:s.w,d:s.d};
  }
  return support;
}

export function createItemShadows(scene) {
  const capacity=256,geometry=new THREE.PlaneGeometry(1,1).rotateX(-Math.PI/2);
  const parameters=new THREE.InstancedBufferAttribute(new Float32Array(capacity*2),2);
  const limits=new THREE.InstancedBufferAttribute(new Float32Array(capacity*4),4);
  geometry.setAttribute('shadowParameters',parameters);geometry.setAttribute('surfaceLimits',limits);
  const material=new THREE.ShaderMaterial({
    transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,
    vertexShader:`attribute vec2 shadowParameters;attribute vec4 surfaceLimits;
      varying vec2 vUv;varying vec2 vWorld;varying vec2 vParameters;varying vec4 vLimits;
      void main(){vUv=uv;vParameters=shadowParameters;vLimits=surfaceLimits;
        vec4 p=modelMatrix*instanceMatrix*vec4(position,1.0);vWorld=p.xz;
        gl_Position=projectionMatrix*viewMatrix*p;}`,
    fragmentShader:`varying vec2 vUv;varying vec2 vWorld;varying vec2 vParameters;varying vec4 vLimits;
      void main(){
        if(vWorld.x<vLimits.x||vWorld.x>vLimits.y||vWorld.y<vLimits.z||vWorld.y>vLimits.w)discard;
        vec2 p=abs(vUv*2.0-1.0);float shape=mix(max(p.x,p.y),length(p),vParameters.y);
        float alpha=(1.0-smoothstep(.48,1.0,shape))*vParameters.x;
        if(alpha<.003)discard;gl_FragColor=vec4(.025,.035,.04,alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const mesh=new THREE.InstancedMesh(geometry,material,capacity);
  mesh.name='Item placement shadows';mesh.count=0;mesh.frustumCulled=false;
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.renderOrder=1;scene.add(mesh);
  const transform=new THREE.Object3D(),plateBounds=new WeakMap(),suppressed=new Map();let records=[];
  function restore(e){for(const caster of suppressed.get(e)||[])caster.castShadow=true;suppressed.delete(e);}
  return {
    update(entities,held,world,puzzles){
      const surfaces=[...world.floors,...world.colliders];
      // Tray decks are physical fixtures, while the brass plate face sits above them.
      for(const gate of puzzles?.gates||[]){
        surfaces.push(...gate.fixtures.filter(s=>s.floor));
        for(let i=0;i<gate.plates.length;i++){
          const p=gate.plates[i],face=gate.platesVisual[i];
          if(!face)continue;
          let bounds=plateBounds.get(face);
          if(!bounds){const box=new THREE.Box3().setFromObject(face.g);bounds={offset:box.max.y-face.g.position.y,w:box.max.x-box.min.x,d:box.max.z-box.min.z};plateBounds.set(face,bounds);}
          surfaces.push({x:p.x,z:p.z,y:face.g.position.y+bounds.offset,h:0,w:bounds.w,d:bounds.d});
        }
      }
      records=[];let count=0;const active=new Set();
      for(const e of entities){
        if(e.category!=='prop'||e.removed||e.reserved||e.assemblyRestore||!e.ext||!e.mesh.visible||e!==held&&e.body.sleepState===2)continue;
        const p=e.body.position,half=projectedHalfExtents(e.ext,e.body.quaternion),bottom=p.y-half.y;
        const floor=shadowSupport(p,bottom,surfaces);if(!floor)continue;
        const height=Math.max(0,bottom-floor.y);
        if(e!==held&&height<.07)continue;
        if(count===capacity)break;
        active.add(e);
        if(!suppressed.has(e)){
          const casters=[];e.mesh.traverse(o=>{if(o.castShadow){casters.push(o);o.castShadow=false;}});
          suppressed.set(e,casters);
        }
        const spread=.18+Math.min(height,6)*.035;
        const opacity=Math.max(.52,.76-height*.035)*(e===held?1:Math.min(1,height/.25));
        transform.position.set(p.x,floor.y+.025,p.z);
        transform.scale.set((half.x+spread)*2,1,(half.z+spread)*2);transform.updateMatrix();
        mesh.setMatrixAt(count,transform.matrix);
        parameters.setXY(count,opacity,['stone','urn','barrel'].includes(e.kind)?1:0);
        limits.setXYZW(count,floor.x-floor.w/2,floor.x+floor.w/2,floor.z-floor.d/2,floor.z+floor.d/2);
        records.push({id:e.body.id,kind:e.kind,x:p.x,y:floor.y,z:p.z,height,width:transform.scale.x,depth:transform.scale.z});count++;
      }
      for(const e of suppressed.keys())if(!active.has(e))restore(e);
      mesh.count=count;mesh.instanceMatrix.needsUpdate=true;parameters.needsUpdate=true;limits.needsUpdate=true;
    },
    snapshot:()=>({count:mesh.count,drawCalls:mesh.count?1:0,items:records}),
    dispose(){for(const e of suppressed.keys())restore(e);mesh.removeFromParent();geometry.dispose();material.dispose();},
  };
}

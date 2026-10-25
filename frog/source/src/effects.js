import * as THREE from 'three';

const V=THREE.Vector3;
function fragmentGeometry(kind){
  if(kind==='flash'){
    // Two crossing tapered slashes, shared by a fixed instanced contact pool.
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute([-.035,0,-.09,.035,0,-.09,0,0,.56,0,-.035,-.09,0,.035,-.09,0,0,.56],3));geometry.setIndex([0,1,2,3,4,5]);return geometry;
  }
  const positions=[],indices=[],rows=kind==='leaf'?8:10,segments=kind==='leaf'?4:12;
  if(kind==='leaf'){
    for(let i=0;i<=rows;i++){const t=i/rows,width=Math.sin(Math.PI*t)*(.19+.02*Math.sin(i*3));for(let j=0;j<=segments;j++){const u=j/segments*2-1;positions.push(u*width,.04*(1-u*u)+.025*Math.sin(t*5),t*.7-.35);}}
  }else{
    for(let i=0;i<=rows;i++){const phi=i/rows*Math.PI,y=Math.cos(phi),shape=kind==='drop'?(1-.4*y):1;for(let j=0;j<=segments;j++){const a=j/segments*Math.PI*2,n=kind==='mud'?1+.16*Math.sin(i*2.7+j*1.3)+.09*Math.cos(j*2):1;positions.push(Math.sin(phi)*Math.cos(a)*.1*shape*n,y*(kind==='drop'?.18:.105)*n,Math.sin(phi)*Math.sin(a)*.1*shape*n);}}
  }
  for(let i=0;i<rows;i++)for(let j=0;j<segments;j++){const a=i*(segments+1)+j,b=a+segments+1;indices.push(a,b,a+1,b,b+1,a+1);}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}
function mistTexture(){
  const size=64,data=new Uint8Array(size*size*4);
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){const dx=(x-31.5)/31.5,dy=(y-31.5)/31.5,r=dx*dx+dy*dy,noise=.65+.2*Math.sin(x*.53+y*.26)+.15*Math.sin(y*.91-x*.35),i=(y*size+x)*4;data[i]=218;data[i+1]=226;data[i+2]=210;data[i+3]=Math.round(Math.max(0,Math.exp(-r*4)-.018)*noise*175);}
  const texture=new THREE.DataTexture(data,size,size);texture.needsUpdate=true;texture.colorSpace=THREE.SRGBColorSpace;return texture;
}
/** Organic world-space impacts. No attack rings, floating letters or CSS effects. */
export class GameVFX {
  constructor(scene){
    this.scene=scene;this.tongues=[];this.trails=[];this.mist=[];this.texture=mistTexture();this.dummy=new THREE.Object3D();
    const definitions={leaf:{count:150,color:0x789754},mud:{count:160,color:0x635341},drop:{count:180,color:0xbdd9d3},flash:{count:32,color:0xfff4cf}};
    this.pools={};
    for(const [kind,def] of Object.entries(definitions)){
      const material=kind==='flash'?new THREE.MeshBasicMaterial({color:def.color,transparent:true,opacity:.92,depthWrite:false,side:THREE.DoubleSide}):kind==='drop'?new THREE.MeshPhysicalMaterial({color:def.color,roughness:.1,metalness:.02,transparent:true,opacity:.72,transmission:.12}):new THREE.MeshStandardMaterial({color:def.color,roughness:.88,side:THREE.DoubleSide});
      const mesh=new THREE.InstancedMesh(fragmentGeometry(kind),material,def.count);mesh.name='natural-'+kind+'-fragments';mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.frustumCulled=false;mesh.count=0;scene.add(mesh);this.pools[kind]={mesh,count:def.count,particles:[]};
    }
  }
  tongue(actor,end,color=0xd88f9d){
    let e=this.tongues.find(x=>x.life<=0);
    if(!e){
      const n=24,m=7,g=new THREE.BufferGeometry();const pos=new Float32Array((n+1)*(m+1)*3),idx=[];
      for(let i=0;i<n;i++)for(let j=0;j<m;j++){const a=i*(m+1)+j,b=a+m+1;idx.push(a,b,a+1,b,b+1,a+1);}
      g.setAttribute('position',new THREE.BufferAttribute(pos,3).setUsage(THREE.DynamicDrawUsage));g.setIndex(idx);
      const mesh=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color,roughness:.3,metalness:0,side:THREE.DoubleSide}));mesh.frustumCulled=false;mesh.castShadow=true;this.scene.add(mesh);
      e={mesh,g,pos,n,m,life:0};this.tongues.push(e);
    }
    e.actor=actor;e.end=end.clone();e.life=.29;e.total=.29;e.latched=false;e.target=null;e.mesh.visible=true;e.mesh.material.color.set(color);
  }

  confirmTongueHit(actor,target,point){
    const active=this.tongues.find(entry=>entry.actor===actor&&entry.life>0);
    if(!active||!target||!point)return;
    active.target=target;active.targetOffset=point.clone().sub(new V(target.x,target.y||0,target.z));active.end.copy(point);
    active.latched=true;active.life=.165;active.total=.165;
  }

  cue(){return null;}
  number(){return null;}
  emit(kind,position,yaw,count,power=1,options={}){
    const pool=this.pools[kind];
    for(let i=0;i<count&&pool.particles.length<pool.count;i++){
      const a=yaw+(Math.random()-.5)*2.9,speed=(1+Math.random()*3)*power;
      const spread=options.spread??.45,life=options.lifetime?(options.lifetime*(.75+Math.random()*.5)):.55+Math.random()*.65;
      pool.particles.push({position:position.clone().add(new V((Math.random()-.5)*spread,Math.random()*Math.min(.2,spread),(Math.random()-.5)*spread)),velocity:new V(Math.sin(a)*speed,kind==='flash'?0:(1.4+Math.random()*3.2)*power,Math.cos(a)*speed),rotation:kind==='flash'?new V(0,yaw,0):new V(Math.random()*6,Math.random()*6,Math.random()*6),spin:kind==='flash'?new V():new V(Math.random()*6-3,Math.random()*6-3,Math.random()*6-3),life,total:life,scale:(.65+Math.random()*.9)*Math.sqrt(power)});
    }
  }
  impact(position,yaw=0,{heavy=false,blocked=false,water=false,power=1,priority=false}={}){
    if(!position||![position.x,position.y,position.z,yaw,power].every(Number.isFinite))return;
    power=Math.max(.25,Math.min(1.5,power));
    const contact={spread:.12,lifetime:heavy?.34:.23};
    this.emit('flash',position,yaw,1,power,{spread:.025,lifetime:heavy?.085:.065});
    this.emit('leaf',position,yaw,blocked?4:heavy?3:2,power*.65,contact);
    this.emit('drop',position,yaw,blocked?1:water?9:heavy?8:5,power*.8,contact);
    if(heavy&&!blocked)this.emit('mud',position,yaw,4,power*.65,contact);
    if(heavy&&priority)this.cloud(position,power*.55,water);
  }
  cloud(position,power=1,water=false){
    if(this.mist.length>=21)return;
    const material=new THREE.SpriteMaterial({map:this.texture,color:water?0xd3e4df:0xaba690,transparent:true,opacity:.28,depthWrite:false,rotation:Math.random()*6});
    const sprite=new THREE.Sprite(material);sprite.position.copy(position);sprite.scale.setScalar(.7*power);this.scene.add(sprite);this.mist.push({sprite,life:.55,total:.55,power});
  }
  trail(position,yaw,power=1){
    if(this.trails.length>=30)return;
    const positions=[],indices=[],n=10;
    for(let i=0;i<=n;i++){const t=i/n,along=(.3+t*2)*power,width=Math.sin(Math.PI*t)*.13*power;for(const side of [-1,1])positions.push(position.x+Math.sin(yaw)*along+Math.cos(yaw)*width*side,position.y+.15+Math.sin(t*Math.PI)*.22,position.z+Math.cos(yaw)*along-Math.sin(yaw)*width*side);if(i<n&&i%4!==3){const a=i*2;indices.push(a,a+1,a+2,a+1,a+3,a+2);}}
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setIndex(indices);
    const material=new THREE.MeshBasicMaterial({color:0xc7d1c1,side:THREE.DoubleSide,transparent:true,opacity:.3,depthWrite:false});
    const mesh=new THREE.Mesh(geometry,material);mesh.name='tapered-motion-fragments';this.scene.add(mesh);this.trails.push({mesh,life:.13,total:.13});
  }
  strike(type,position,yaw=0,power=1){
    if(!position||![position.x,position.y,position.z,yaw,power].every(Number.isFinite))return;power=Math.max(.15,Math.min(3,power));
    const watery=type==='fish',heavy=type==='slam'||type==='debris';
    this.emit('mud',position,yaw,heavy?18:watery?4:7,power);
    this.emit('leaf',position,yaw,type==='croak'?3:heavy?12:6,power*.8);
    this.emit('drop',position,yaw,watery?28:type==='heron'?10:heavy?14:5,power);
    if(type!=='croak')this.cloud(position,power,watery);
    if(['kick','tongue','heron','snake'].includes(type))this.trail(position,yaw,power);
  }
  update(dt){
    dt=Math.max(0,Math.min(.1,Number.isFinite(dt)?dt:0));
    const start=new THREE.Vector3(),delta=new THREE.Vector3(),side=new THREE.Vector3(),up=new THREE.Vector3(),vup=new THREE.Vector3(0,1,0);
    for(const e of this.tongues){if(e.life<=0)continue;e.life-=dt;if(e.life<=0){e.mesh.visible=false;continue;}
      if(e.latched&&e.target)e.end.set(e.target.x,e.target.y||0,e.target.z).add(e.targetOffset);
      e.actor.model.mouthWorld(start);delta.copy(e.end).sub(start);const phase=1-e.life/e.total,extend=e.latched?Math.sin(Math.min(1,e.life/.13)*Math.PI/2):Math.sin(Math.PI*phase)**.6;delta.multiplyScalar(extend);
      side.crossVectors(delta,vup).normalize();if(side.lengthSq()<.01)side.set(1,0,0);up.crossVectors(side,delta).normalize();
      for(let i=0;i<=e.n;i++){const t=i/e.n,c=start.clone().addScaledVector(delta,t);c.y+=Math.sin(t*Math.PI)*.12*(1-extend);const radius=(.035+.028*Math.pow(t,8))*(.8+.2*Math.sin(Math.PI*t));
        for(let j=0;j<=e.m;j++){const a=j/e.m*Math.PI*2,k=(i*(e.m+1)+j)*3;e.pos[k]=c.x+(side.x*Math.cos(a)+up.x*Math.sin(a))*radius;e.pos[k+1]=c.y+(side.y*Math.cos(a)+up.y*Math.sin(a))*radius;e.pos[k+2]=c.z+(side.z*Math.cos(a)+up.z*Math.sin(a))*radius;}}
      e.g.attributes.position.needsUpdate=true;e.g.computeVertexNormals();
    }

    for(const [kind,pool] of Object.entries(this.pools)){
      for(let i=pool.particles.length-1;i>=0;i--){const p=pool.particles[i];p.life-=dt;if(p.life<=0){pool.particles.splice(i,1);continue;}p.velocity.y-=dt*(kind==='flash'?0:kind==='leaf'?3.8:12);p.position.addScaledVector(p.velocity,dt);p.rotation.addScaledVector(p.spin,dt);if(p.position.y<.03){p.position.y=.03;p.velocity.y=Math.abs(p.velocity.y)*.22;p.velocity.x*=.7;p.velocity.z*=.7;}p.velocity.multiplyScalar(Math.exp(-dt*(kind==='leaf'?1.8:.25)));}
      pool.mesh.count=pool.particles.length;pool.particles.forEach((p,i)=>{this.dummy.position.copy(p.position);this.dummy.rotation.set(p.rotation.x,p.rotation.y,p.rotation.z);const fade=Math.min(1,kind==='flash'?p.life/.025:p.life*5);this.dummy.scale.setScalar(p.scale*fade);this.dummy.updateMatrix();pool.mesh.setMatrixAt(i,this.dummy.matrix);});pool.mesh.instanceMatrix.needsUpdate=true;
    }
    for(let i=this.trails.length-1;i>=0;i--){const e=this.trails[i];e.life-=dt;if(e.life<=0){this.scene.remove(e.mesh);e.mesh.geometry.dispose();e.mesh.material.dispose();this.trails.splice(i,1);}else e.mesh.material.opacity=.3*e.life/e.total;}
    for(let i=this.mist.length-1;i>=0;i--){const e=this.mist[i];e.life-=dt;if(e.life<=0){this.scene.remove(e.sprite);e.sprite.material.dispose();this.mist.splice(i,1);}else{const phase=1-e.life/e.total;e.sprite.position.y+=dt*.35;e.sprite.scale.setScalar(e.power*(.7+phase*1.9));e.sprite.material.opacity=.3*(1-phase);}}
  }
  clear(){
    for(const e of this.tongues){e.life=0;e.mesh.visible=false;e.latched=false;e.target=null;}
    for(const e of this.trails){this.scene.remove(e.mesh);e.mesh.geometry.dispose();e.mesh.material.dispose();}
    for(const e of this.mist){this.scene.remove(e.sprite);e.sprite.material.dispose();}
    this.trails=[];this.mist=[];for(const p of Object.values(this.pools)){p.particles=[];p.mesh.count=0;}
  }
}


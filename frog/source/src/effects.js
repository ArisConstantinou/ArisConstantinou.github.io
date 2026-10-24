import * as THREE from 'three';

/** All action feedback is rendered in world space, including tongues and warning tells. */
export class GameVFX {
  constructor(scene){this.scene=scene;this.tongues=[];this.cues=[];this.labels=[];this.tmp=new THREE.Vector3();}
  tongue(actor,end,color=0xd88f9d){
    let e=this.tongues.find(x=>x.life<=0);
    if(!e){
      const n=24,m=7,g=new THREE.BufferGeometry();const pos=new Float32Array((n+1)*(m+1)*3),idx=[];
      for(let i=0;i<n;i++)for(let j=0;j<m;j++){const a=i*(m+1)+j,b=a+m+1;idx.push(a,b,a+1,b,b+1,a+1);}
      g.setAttribute('position',new THREE.BufferAttribute(pos,3).setUsage(THREE.DynamicDrawUsage));g.setIndex(idx);
      const mesh=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color,roughness:.3,metalness:0,side:THREE.DoubleSide}));mesh.frustumCulled=false;mesh.castShadow=true;this.scene.add(mesh);
      e={mesh,g,pos,n,m,life:0};this.tongues.push(e);
    }
    e.actor=actor;e.end=end.clone();e.life=.29;e.total=.29;e.mesh.visible=true;e.mesh.material.color.set(color);
  }
  cue(position,radius=2,duration=1,color=0xff8054){
    const n=72,p=[],idx=[];
    for(let i=0;i<=n;i++){const a=i/n*Math.PI*2;for(const r of [radius*.94,radius])p.push(Math.sin(a)*r,0,Math.cos(a)*r);if(i<n){const q=i*2;idx.push(q,q+1,q+2,q+1,q+3,q+2);}}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setIndex(idx);g.computeVertexNormals();
    const mat=new THREE.MeshBasicMaterial({color,transparent:true,opacity:.65,depthWrite:false,side:THREE.DoubleSide});
    const mesh=new THREE.Mesh(g,mat);mesh.position.copy(position);mesh.position.y=Math.max(.12,position.y+.035);this.scene.add(mesh);
    this.cues.push({mesh,life:duration,total:duration});return mesh;
  }
  number(position,text,color='#f5ebc5'){
    if(this.labels.length>24)return;
    const c=document.createElement('canvas');c.width=128;c.height=64;const ctx=c.getContext('2d');
    ctx.font='bold 36px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineWidth=5;ctx.strokeStyle='#14271d';ctx.strokeText(String(text),64,32);ctx.fillStyle=color;ctx.fillText(String(text),64,32);
    const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;
    const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false,depthWrite:false}));sprite.position.copy(position).add(new THREE.Vector3(0,1.7,0));sprite.scale.set(1.1,.55,1);this.scene.add(sprite);this.labels.push({sprite,life:.85});
  }
  update(dt){
    const start=new THREE.Vector3(),delta=new THREE.Vector3(),side=new THREE.Vector3(),up=new THREE.Vector3(),vup=new THREE.Vector3(0,1,0);
    for(const e of this.tongues){if(e.life<=0)continue;e.life-=dt;if(e.life<=0){e.mesh.visible=false;continue;}
      e.actor.model.mouthWorld(start);delta.copy(e.end).sub(start);const phase=1-e.life/e.total,extend=Math.sin(Math.PI*phase)**.6;delta.multiplyScalar(extend);
      side.crossVectors(delta,vup).normalize();if(side.lengthSq()<.01)side.set(1,0,0);up.crossVectors(side,delta).normalize();
      for(let i=0;i<=e.n;i++){const t=i/e.n,c=start.clone().addScaledVector(delta,t);c.y+=Math.sin(t*Math.PI)*.12*(1-extend);const radius=(.035+.028*Math.pow(t,8))*(.8+.2*Math.sin(Math.PI*t));
        for(let j=0;j<=e.m;j++){const a=j/e.m*Math.PI*2,k=(i*(e.m+1)+j)*3;e.pos[k]=c.x+(side.x*Math.cos(a)+up.x*Math.sin(a))*radius;e.pos[k+1]=c.y+(side.y*Math.cos(a)+up.y*Math.sin(a))*radius;e.pos[k+2]=c.z+(side.z*Math.cos(a)+up.z*Math.sin(a))*radius;}}
      e.g.attributes.position.needsUpdate=true;e.g.computeVertexNormals();
    }
    for(let i=this.cues.length-1;i>=0;i--){const e=this.cues[i];e.life-=dt;if(e.life<=0){this.scene.remove(e.mesh);e.mesh.geometry.dispose();e.mesh.material.dispose();this.cues.splice(i,1);}else{const q=e.life/e.total;e.mesh.material.opacity=.15+.6*q;e.mesh.scale.setScalar(1+(1-q)*.15);}}
    for(let i=this.labels.length-1;i>=0;i--){const e=this.labels[i];e.life-=dt;e.sprite.position.y+=dt*.8;e.sprite.material.opacity=Math.min(1,e.life*3);if(e.life<=0){this.scene.remove(e.sprite);e.sprite.material.map.dispose();e.sprite.material.dispose();this.labels.splice(i,1);}}
  }
  clear(){for(const e of this.tongues){e.life=0;e.mesh.visible=false;}for(const e of this.cues){this.scene.remove(e.mesh);e.mesh.geometry.dispose();e.mesh.material.dispose();}this.cues=[];for(const e of this.labels){this.scene.remove(e.sprite);e.sprite.material.map.dispose();e.sprite.material.dispose();}this.labels=[];}
}

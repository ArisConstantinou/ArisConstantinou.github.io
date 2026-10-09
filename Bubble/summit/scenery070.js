/* Detailed camp dressing and lower-frequency, world-space terrain materials.
 * Decoration never replaces the authoritative terrain or collision objects. */
import * as T from 'three';
import {ROUTE} from './physics.js?v=0.6.0';
const V=(x=0,y=0,z=0)=>new T.Vector3(x,y,z);
export class RidgeScenery {
 constructor(g){this.g=g;this.groups=[];this.flags=[];this.fires=[];this.cover=[];this.materials();this.terrain();for(let i=0;i<ROUTE.length;i++)this.camp(ROUTE[i],i);}
 materials(){const w=this.g.world;this.wood=w.woodMaterial;this.stone=w.stoneMaterial;this.canvas=new T.MeshStandardMaterial({color:0x71867e,roughness:.96,side:T.DoubleSide});this.rope=new T.MeshStandardMaterial({color:0xc1b086,roughness:1});this.iron=new T.MeshStandardMaterial({color:0x293c40,metalness:.68,roughness:.48});this.brass=new T.MeshStandardMaterial({color:0xc69b59,metalness:.68,roughness:.38});this.cloth=new T.MeshStandardMaterial({color:0x67bdac,roughness:1,side:T.DoubleSide});this.flame=new T.MeshBasicMaterial({color:0xffaa53,transparent:true,opacity:.7,depthWrite:false});}
 terrain(){const g=this.g,m=g.world.terrain.material,grassMap=this.stone.map;this.stone.map=m.map;this.stone.normalMap=m.normalMap;this.stone.color.setHex(0xbac0bf);this.stone.needsUpdate=true;m.normalScale.set(.25,.25);m.onBeforeCompile=s=>{
  s.uniforms.ridgeGrass={value:grassMap};s.uniforms.campPoints={value:ROUTE.map(p=>new T.Vector2(p.x,p.z))};s.vertexShader='varying vec3 ridgePos;varying vec3 ridgeN;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nridgePos=position;ridgeN=normal;');
  s.fragmentShader='varying vec3 ridgePos;varying vec3 ridgeN;uniform sampler2D ridgeGrass;uniform vec2 campPoints[5];\n'+s.fragmentShader;
  s.fragmentShader=s.fragmentShader.replace('#include <map_fragment>',`vec3 rn=normalize(ridgeN);vec3 blend=pow(abs(rn),vec3(4.));blend/=max(.001,blend.x+blend.y+blend.z);
   vec3 soil=texture2D(map,ridgePos.xz*.14).rgb;
   vec3 soil2=texture2D(map,ridgePos.xz*.027+vec2(.31,.53)).rgb;
   float patchWeight=.5+.26*sin(ridgePos.x*.006+sin(ridgePos.z*.009))+.18*cos(ridgePos.z*.013);
   vec3 turf=texture2D(ridgeGrass,ridgePos.xz*.08).rgb;vec3 grass=turf*mix(vec3(.85,.97,.77),vec3(.98,1.05,.88),patchWeight);
   grass=mix(grass,soil2*vec3(.72,.96,.63),.18);float campMask=0.;for(int i=0;i<5;i++){campMask=max(campMask,1.-smoothstep(22.,49.,distance(ridgePos.xz,campPoints[i])));}grass=mix(grass,soil,campMask*.52);
   vec3 rockX=texture2D(map,ridgePos.zy*.044).rgb;
   vec3 rockY=texture2D(map,ridgePos.xz*.044).rgb;
   vec3 rockZ=texture2D(map,ridgePos.xy*.044).rgb;
   vec3 gravel=rockX*blend.x+rockY*blend.y+rockZ*blend.z;float grey=dot(gravel,vec3(.299,.587,.114));vec3 stone=mix(gravel,vec3(grey)*vec3(.94,.98,1.04),.88)*1.48;
   float cliff=1.-smoothstep(.48,.87,rn.y);
   float snow=smoothstep(625.,790.,ridgePos.y)*smoothstep(.48,.84,rn.y);
   diffuseColor.rgb*=mix(mix(grass,stone,cliff),vec3(.84,.90,.92),snow*.88);`);
  };m.customProgramCacheKey=()=> 'ridge-worldspace-070';m.needsUpdate=true;
  g.sun.color.setHex(0xffe7c9);g.sun.intensity=2.4;g.renderer.toneMappingExposure=1.10;g.scene.fog.density=.00038;
 }
 add(geo,mat,x,y,z,parent=this.g.scene){const m=new T.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;parent.add(m);return m;}
 beam(a,b,r=.05,mat=this.wood,parent=this.g.scene){const d=b.clone().sub(a),m=this.add(new T.CylinderGeometry(r,r,d.length(),8),mat,...a.clone().add(b).multiplyScalar(.5).toArray(),parent);m.quaternion.setFromUnitVectors(V(0,1,0),d.normalize());return m;}
 panel(points,mat,parent){const geo=new T.BufferGeometry;geo.setAttribute('position',new T.Float32BufferAttribute(points.flat(),3));geo.setIndex([0,1,2,0,2,3]);geo.computeVertexNormals();return this.add(geo,mat,0,0,0,parent);}
 sign(text,sub,x,y,z,color='#c5eee1',parent=this.g.scene){const c=document.createElement('canvas');c.width=768;c.height=256;const ctx=c.getContext('2d');ctx.fillStyle='#1d3437';ctx.fillRect(0,0,768,256);ctx.strokeStyle=color;ctx.lineWidth=7;ctx.strokeRect(9,9,750,238);ctx.textAlign='center';ctx.fillStyle=color;ctx.font='700 52px system-ui';ctx.fillText(text,384,109);ctx.fillStyle='#e2e5d4';ctx.font='30px system-ui';ctx.fillText(sub,384,178);const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;return this.add(new T.PlaneGeometry(4.6,1.5),new T.MeshStandardMaterial({map,roughness:.95,side:T.DoubleSide}),x,y,z,parent);}
 camp(p,index){const w=this.g.world,group=new T.Group;this.g.scene.add(group);this.groups.push({group,x:p.x,z:p.z});const y=p.y;
  // Open expedition awning: stitched canvas, supporting wooden posts and ropes.
  const x=p.x-19,z=p.z+10,roof=y+3.7;
  for(const dx of[-4.2,4.2])for(const dz of[-3,3]){this.beam(V(x+dx,y,z+dz),V(x+dx,roof-.35,z+dz),.12,this.wood,group);w.collider(x+dx,y,z+dz,.24,3.4,.24,'camp-post');}
  this.beam(V(x-4.5,roof+.5,z),V(x+4.5,roof+.5,z),.10,this.wood,group);
  for(const side of[-1,1]){this.panel([[x-4.7,roof+.5,z],[x+4.7,roof+.5,z],[x+4.7,roof-.35,z+side*3.5],[x-4.7,roof-.35,z+side*3.5]],this.canvas,group);
   for(let seam=-4;seam<=4;seam+=1.1)this.beam(V(x+seam,roof+.51,z),V(x+seam,roof-.34,z+side*3.45),.012,this.rope,group);
  }
  // Conservative canopy bounds, kept clear of the essential supply crate.
  w.collider(x,roof-.35,z,9.4,1,7,'canvas-roof');
  for(const side of[-1,1])this.beam(V(x+side*4.2,roof-.35,z+3),V(x+side*5.8,y,z+4.9),.024,this.rope,group);
  for(const dx of[-3.2,3.2]){this.add(new T.BoxGeometry(2.5,.13,.72),this.wood,x+dx,y+.7,z,group);for(const o of[-.8,.8])this.add(new T.BoxGeometry(.12,.7,.58),this.iron,x+dx+o,y+.35,z,group);w.collider(x+dx,y,z,2.5,.8,.72,'bench');}
  this.sign(index===0?'ΠΡΩΤΗ ΑΠΟΣΤΟΛΗ':'ΣΤΑΘΜΟΣ 0'+index,index===0?'Πιάσε · μάσησε · πέτα':'Εφόδια · ξεκούραση · νέα πτήση',x,roof-.9,z-2.7,'#c5eee1',group);
  // A small fire pit, textured logs, radial stones and slowly moving embers.
  const fx=x+1.7,fz=z+6.8;for(let i=0;i<12;i++){const a=i/12*Math.PI*2,m=this.add(new T.IcosahedronGeometry(.28,1),this.stone,fx+Math.cos(a)*1.1,y+.15,fz+Math.sin(a)*1.1,group);m.scale.y=.65;}
  for(const a of[.6,2.1,3.8])this.beam(V(fx-Math.sin(a)*.7,y+.18,fz-Math.cos(a)*.7),V(fx+Math.sin(a)*.7,y+.18,fz+Math.cos(a)*.7),.13,this.wood,group);
  const fire=this.add(new T.ConeGeometry(.53,1.3,7),this.flame,fx,y+.75,fz,group);fire.castShadow=false;this.fires.push(fire);
  // A readable wind flag that is cloth, not a floating button.
  const px=p.x+15,pz=p.z+8;this.beam(V(px,y,pz),V(px,y+6,pz),.055,this.iron,group);w.collider(px,y,pz,.11,6,.11,'flag-pole');
  const geo=new T.PlaneGeometry(2.1,.75,10,3);geo.translate(1.05,0,0);const flag=this.add(geo,this.cloth,px,y+5.7,pz,group);flag.userData.rest=new Float32Array(geo.attributes.position.array);this.flags.push(flag);
  // Layered field cover: both visible timber and corresponding collider.
  if(index>0&&index<4)for(const side of[-1,1]){const cx=p.x+side*17,cz=p.z-6;for(let h=0;h<4;h++)this.beam(V(cx-2,y+.2+h*.29,cz),V(cx+2,y+.2+h*.29,cz),.17,this.wood,group);w.collider(cx,y,cz,4.3,1.3,.38,'log-cover');this.cover.push({x:cx,y,z:cz,site:index});}
  // Stone footpath follows sampled terrain; no artificial walk-through ramp.
  for(let i=0;i<9;i++){const xx=p.x+6-i*.65,zz=p.z+7-i*.7,yy=w.height(xx,zz);const m=this.add(new T.CylinderGeometry(.55,.61,.06,7),this.stone,xx,yy+.035,zz,group);m.rotation.y=i*.9;m.receiveShadow=true;}
 }
 tick(time){const p=this.g.player;for(const c of this.groups)c.group.visible=!p||Math.hypot(p.x-c.x,p.z-c.z)<500;
  for(const f of this.flags){if(!f.parent.visible)continue;const a=f.geometry.attributes.position,rest=f.userData.rest;for(let i=0;i<a.count;i++){const x=rest[i*3];a.setZ(i,Math.sin(time*3+x*3+rest[i*3+1])*x*.085);}a.needsUpdate=true;f.geometry.computeVertexNormals();}
  for(const f of this.fires){f.scale.set(1+.06*Math.sin(time*9),.83+.15*Math.sin(time*11),1);f.rotation.y=time*.7;}
 }
}

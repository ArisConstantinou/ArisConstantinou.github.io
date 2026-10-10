import * as T from 'three';
/** Environmental interaction set: visual meshes and colliders are registered together. */
export function dressMayhem(ship,world){
 const {M}=world,added=[],root=world.root;
 const dark=new T.MeshStandardMaterial({color:0x142e32,roughness:.5,metalness:.2});
 const brass=new T.MeshStandardMaterial({color:0xc39452,roughness:.28,metalness:.72});
 const red=new T.MeshStandardMaterial({color:0xb53322,roughness:.27,metalness:.28});
 const glass=new T.MeshPhysicalMaterial({color:0x81bcbc,transparent:true,opacity:.28,roughness:.1,metalness:.15,side:T.DoubleSide,depthWrite:false});
 function mesh(parent,g,m,x=0,y=0,z=0){const q=new T.Mesh(g,m);q.position.set(x,y,z);q.castShadow=true;q.receiveShadow=true;parent.add(q);return q;}
 function box(parent,w,h,d,m,x=0,y=0,z=0){return mesh(parent,new T.BoxGeometry(w,h,d),m,x,y,z);}
 function prop(type,x,y,z,opts){const p=world.addProp(type,x,z,{y,...opts});added.push(p);return p;}
 function sign(parent,text,x,y,z,w=1.8){const c=document.createElement('canvas');c.width=512;c.height=128;const g=c.getContext('2d');g.fillStyle='#0a212a';g.fillRect(0,0,512,128);g.strokeStyle='#c89956';g.lineWidth=3;g.strokeRect(7,7,498,114);g.fillStyle='#f4e2bd';g.font='600 34px sans-serif';g.textAlign='center';g.fillText(text,256,77,480);const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;return mesh(parent,new T.PlaneGeometry(w,w/4),new T.MeshBasicMaterial({map:tx,side:T.DoubleSide}),x,y,z);}
 for(const [x,y,z] of [[2.45,10.1,6],[-2.45,10.1,6],[2.3,13.12,-2.5]]){
  const q=prop('window',x,y,z,{w:.13,d:1.65,h:2.14,hp:24,label:'ΓΥΑΛΙΝΗ ΠΟΡΤΑ · ΣΠΑΣΕ ΓΙΑ ΠΕΡΑΣΜΑ'});q.shortcut=true;
  const pane=mesh(q.group,new T.PlaneGeometry(1.64,1.98),glass,0,1.08,0);pane.rotation.y=Math.PI/2;
  for(const dz of [-.83,.83])box(q.group,.09,2.2,.055,brass,0,1.1,dz);box(q.group,.09,.06,1.75,brass,0,2.2,0);
  box(q.group,.17,.35,.04,brass,.03,1.08,.50);
  const tag=sign(q.group,'BREAK / PASS',.08,1.65,0,.95);tag.rotation.y=Math.PI/2;
 }
 for(const x of [-5.8,5.8]){const q=prop('window',x,15.83,1,{w:1.8,d:.12,h:1.7,hp:28,label:'ΓΥΑΛΙΝΟ ΔΙΑΧΩΡΙΣΤΙΚΟ'});mesh(q.group,new T.PlaneGeometry(1.7,1.55),glass,0,.92,0);for(const dx of [-.91,.91])box(q.group,.055,1.8,.08,brass,dx,.9,0);}
 for(const [x,y,z] of [[3.8,10.1,54],[-3.6,10.1,8],[4,15.83,5],[3.8,21.35,5]]){
  const q=prop('extinguisher',x,y,z,{w:.25,d:.25,h:.74,hp:999,grab:true,label:'ΠΥΡΟΣΒΕΣΤΗΡΑΣ · ΠΑΡΕ / ΨΕΚΑΣΕ'});
  mesh(q.group,new T.CylinderGeometry(.11,.12,.5,20),red,0,.31,0);mesh(q.group,new T.SphereGeometry(.11,16,8),red,0,.57,0);
  box(q.group,.15,.08,.06,dark,0,.68,0);const hose=new T.CatmullRomCurve3([new T.Vector3(.06,.64,0),new T.Vector3(.19,.48,0),new T.Vector3(.16,.19,.02)]);mesh(q.group,new T.TubeGeometry(hose,12,.022,6,false),dark);
  mesh(q.group,new T.CircleGeometry(.045,16),M.ivory,0,.58,.115);box(q.group,.16,.2,.003,M.ivory,0,.3,.12);
 }
 for(const [x,y,z]of [[5.3,10.1,9],[-4.8,15.83,4],[4.6,21.35,10]]){
  const q=prop('cart',x,y,z,{w:1.1,d:.7,h:1.02,hp:70,grab:true,label:'ΚΑΡΟΤΣΙ · ΚΛΩΤΣΑ / ΠΕΤΑ'});
  for(const yy of [.21,.78])box(q.group,1.1,.06,.68,M.wood,0,yy,0);
  for(const xx of [-.45,.45])for(const zz of [-.25,.25]){mesh(q.group,new T.CylinderGeometry(.022,.022,.82,8),brass,xx,.53,zz);const wh=mesh(q.group,new T.TorusGeometry(.08,.027,6,12),dark,xx,.095,zz);wh.rotation.y=Math.PI/2;}
  for(let i=0;i<3;i++)mesh(q.group,new T.CylinderGeometry(.08,.065,.23,12),M.ivory,-.27+i*.25,.935,0);
 }
 for(const [x,y,z]of [[-7.2,10.1,8],[7.2,10.1,14],[-7,15.83,14],[5.6,21.35,14]]){
  const q=prop('vase',x,y,z,{w:.58,d:.58,h:1.25,hp:16,grab:true,label:'ΚΕΡΑΜΙΚΟ ΒΑΖΟ'});
  mesh(q.group,new T.LatheGeometry([[.20,0],[.28,.04],[.31,.58],[.22,.85],[.16,.90]].map(a=>new T.Vector2(...a)),24),M.ivory);
  const leaves=new T.MeshStandardMaterial({color:0x245f49,roughness:.8,side:T.DoubleSide});
  for(let i=0;i<9;i++){const leaf=mesh(q.group,new T.SphereGeometry(1,10,6),leaves,Math.sin(i*2.4)*.20,1.05+(i%3)*.11,Math.cos(i*2.4)*.20);leaf.scale.set(.07,.4,.055);leaf.rotation.z=Math.sin(i)*.7;}
 }
 sign(root,'LAST CALL  /  MAYHEM',0,13.06,51.11,5.2);
 return {added,glass,brass};
}

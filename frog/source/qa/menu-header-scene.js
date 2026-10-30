import * as THREE from 'three';
import {createCreature} from '../src/creatures.js';
import {configureArcadeAppearance} from '../src/arcade-appearance.js';
window.drawMenuHeader=()=>{
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});renderer.setSize(1400,480);renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;document.body.append(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-7,7,2.4,-2.4,.1,100);camera.position.set(0,7.4,12);camera.lookAt(0,.8,0);
 scene.add(new THREE.HemisphereLight('#fff6d3','#436f67',3));const key=new THREE.DirectionalLight('#fff2c6',4);key.position.set(-3,8,6);key.castShadow=true;key.shadow.mapSize.set(2048,1024);Object.assign(key.shadow.camera,{left:-8,right:8,top:5,bottom:-5});key.shadow.bias=-.001;scene.add(key);const rim=new THREE.DirectionalLight('#b4f2ec',2);rim.position.set(6,4,-3);scene.add(rim);
 const ground=new THREE.Mesh(new THREE.PlaneGeometry(20,12),new THREE.ShadowMaterial({opacity:.22}));ground.rotation.x=-Math.PI/2;ground.position.y=-.04;ground.receiveShadow=true;scene.add(ground);
 function frog(x,z,yaw,colour,pose,seed){const model=createCreature('frog',{seed,team:'player',role:'hunter',tier:1,level:1});model.setEquipment({});configureArcadeAppearance(model);model.mesh.material.userData.tint.set(colour);model.setOutline('#234c3b',true);model.group.position.set(x,0,z);model.group.rotation.y=yaw;model.update(.05,{time:1,...pose});scene.add(model.group);return model;}
 const green=frog(-4.1,.25,1.15,'#96e343',{attack:{type:'kick',phase:.49}},7);
 const red=frog(-1.65,.1,-.9,'#ff7758',{hit:.8,hop:{phase:'air',progress:.6}},46);red.group.position.y=.32;red.group.rotation.z=-.14;
 const purple=frog(2.65,.1,1.0,'#c18af7',{attack:{type:'tongue',phase:.5}},85);
 const yellow=frog(5.0,-.8,-.7,'#e2bd45',{hop:{phase:'air',progress:.52}},122);yellow.group.position.y=.65;yellow.group.scale.setScalar(.66);
 const dark=new THREE.MeshStandardMaterial({color:'#243c3c',roughness:.6}),wing=new THREE.MeshStandardMaterial({color:'#e6ffff',transparent:true,opacity:.88,side:THREE.DoubleSide});
 function fly(x,y,z,scale=1){const group=new THREE.Group(),body=new THREE.Mesh(new THREE.SphereGeometry(.085,12,8),dark);body.scale.set(1,1,1.45);group.add(body);for(const sign of [-1,1]){const w=new THREE.Mesh(new THREE.SphereGeometry(.1,12,8),wing);w.scale.set(1.45,.12,1);w.position.set(sign*.1,.075,0);w.rotation.z=sign*.18;group.add(w);}group.position.set(x,y,z);group.scale.setScalar(scale);scene.add(group);return group;}
 const meal=fly(4.45,1.5,.8,1.3);fly(4.9,2.0,-.2);fly(5.7,1.65,.4);fly(3.8,2.2,-.4);fly(-2.8,1.1,.7,1.1);fly(-2.25,1.25,.62,.9);
 const mouth=purple.mouthWorld(),end=meal.position,curve=new THREE.CatmullRomCurve3([mouth,mouth.clone().lerp(end,.45).add(new THREE.Vector3(0,.2,0)),end]);scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve,24,.042,8,false),new THREE.MeshStandardMaterial({color:'#ff7e99',roughness:.4})));
 const starShape=new THREE.Shape();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,r=i%2?.075:.17;const x=Math.cos(a)*r,y=Math.sin(a)*r;if(i)starShape.lineTo(x,y);else starShape.moveTo(x,y);}starShape.closePath();for(let i=0;i<3;i++){const star=new THREE.Mesh(new THREE.ShapeGeometry(starShape),new THREE.MeshBasicMaterial({color:'#ffde66',side:THREE.DoubleSide}));star.position.set(-1.65+(i-1)*.52,2.1+Math.sin(i)*.18,.3);star.quaternion.copy(camera.quaternion);scene.add(star);}
 for(const [x,z,size] of [[-4,.2,1.35],[-1.5,.1,1.15],[2.7,.1,1.3]]){const leaf=new THREE.Mesh(new THREE.SphereGeometry(1,36,12),new THREE.MeshStandardMaterial({color:'#568e42',roughness:.8}));leaf.scale.set(size,.045,size*.68);leaf.position.set(x,-.06,z);leaf.receiveShadow=true;scene.add(leaf);}
 renderer.render(scene,camera);return renderer.domElement.toDataURL('image/png');
};

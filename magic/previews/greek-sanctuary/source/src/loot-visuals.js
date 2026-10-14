import * as THREE from 'three';
import {TIERS,LOOT_PATHS} from './loot.js';
const sprites=new Map(),rings=new Map();
const ringGeometry=new THREE.RingGeometry(.25,.29,24);
export function createLootVisual(item){
 const key=item.kind+item.level;
 if(!sprites.has(key)){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const ctx=canvas.getContext('2d');
  ctx.fillStyle='#14262c';ctx.beginPath();ctx.arc(64,64,58,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=TIERS[item.level].color;ctx.lineWidth=4;ctx.stroke();
  ctx.save();ctx.translate(16,16);ctx.scale(4,4);ctx.strokeStyle=item.kind==='health'?'#ff9f99':item.kind==='mana'?'#91c9ff':TIERS[item.level].color;ctx.lineWidth=1.2;ctx.lineCap=ctx.lineJoin='round';ctx.stroke(new Path2D(LOOT_PATHS[item.kind]));ctx.restore();
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  sprites.set(key,new THREE.SpriteMaterial({map:texture,transparent:true,depthWrite:false,toneMapped:false}));
 }
 if(!rings.has(item.level))rings.set(item.level,new THREE.MeshBasicMaterial({color:TIERS[item.level].color,transparent:true,opacity:.85,side:THREE.DoubleSide,depthWrite:false}));
 const group=new THREE.Group(),sprite=new THREE.Sprite(sprites.get(key)),ring=new THREE.Mesh(ringGeometry,rings.get(item.level));
 sprite.position.y=.7;sprite.scale.setScalar(.7);ring.rotation.x=-Math.PI/2;ring.position.y=.04;group.add(sprite,ring);
 group.userData.sprite=sprite;return group;
}

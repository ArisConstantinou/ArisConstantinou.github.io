import * as THREE from './vendor/three.module.js';

// All surface detail is generated once; the battlefield has no external runtime dependency.
const seeded = seed => () => {seed = Math.imul(seed ^ seed >>> 15, 1 | seed); seed ^= seed + Math.imul(seed ^ seed >>> 7, 61 | seed); return ((seed ^ seed >>> 14) >>> 0) / 4294967296;};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function canvasTexture(size,draw,repeat=1){const c=document.createElement('canvas');c.width=c.height=size;const g=c.getContext('2d');draw(g,size,seeded(912713));const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(repeat,repeat);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;}
function grain(g,n,r,amount=26){const d=g.getImageData(0,0,n,n);for(let i=0;i<d.data.length;i+=4){const q=(r()-.5)*amount;d.data[i]=clamp(d.data[i]+q,0,255);d.data[i+1]=clamp(d.data[i+1]+q,0,255);d.data[i+2]=clamp(d.data[i+2]+q,0,255);}g.putImageData(d,0,0);}
export function createMaterials(){
 const stone=canvasTexture(1024,(g,n,r)=>{g.fillStyle='#49463e';g.fillRect(0,0,n,n);const rows=18,h=n/rows;for(let y=-1;y<rows+1;y++){let x=y%2?-47:-6;while(x<n){const w=58+r()*42, shade=135+r()*49;g.fillStyle=`rgb(${shade|0},${(shade*.94)|0},${(shade*.81)|0})`;g.beginPath();g.moveTo(x+3,y*h+3+r()*2);g.lineTo(x+w-3,y*h+2);g.lineTo(x+w-2,(y+1)*h-4);g.lineTo(x+2,(y+1)*h-3);g.closePath();g.fill();g.strokeStyle='rgba(232,218,183,.27)';g.lineWidth=2;g.beginPath();g.moveTo(x+4,(y+1)*h-6);g.lineTo(x+4,y*h+5);g.lineTo(x+w-6,y*h+5);g.stroke();if(r()>.7){g.strokeStyle='rgba(49,51,42,.33)';g.lineWidth=1;g.beginPath();g.moveTo(x+w*.35,y*h+4);g.lineTo(x+w*.45,y*h+h*.58);g.lineTo(x+w*.34,(y+1)*h-4);g.stroke();}x+=w;}}grain(g,n,r,20);for(let i=0;i<30;i++){const grad=g.createRadialGradient(r()*n,r()*n,5,r()*n,r()*n,160);grad.addColorStop(0,'rgba(44,50,24,.06)');grad.addColorStop(1,'rgba(44,50,24,0)');g.fillStyle=grad;g.fillRect(0,0,n,n);}});
 const plaster=canvasTexture(256,(g,n,r)=>{g.fillStyle='#bfb095';g.fillRect(0,0,n,n);grain(g,n,r,33);for(let i=0;i<400;i++){g.fillStyle=r()>.5?'rgba(50,44,31,.11)':'rgba(230,224,193,.15)';g.fillRect(r()*n,r()*n,1+r()*9,1+r()*5);}});
 const wood=canvasTexture(512,(g,n,r)=>{g.fillStyle='#6e4c30';g.fillRect(0,0,n,n);for(let x=0;x<n;x+=42){g.fillStyle=`rgba(24,14,9,${.2+r()*.16})`;g.fillRect(x,0,3,n);g.fillStyle='rgba(208,160,89,.15)';g.fillRect(x+4,0,2,n);}for(let i=0;i<1500;i++){const x=r()*n;g.strokeStyle=`rgba(${r()>.4?'32,21,10':'197,159,101'},${.1+r()*.22})`;g.lineWidth=.4+r()*1.5;g.beginPath();g.moveTo(x,r()*n);g.bezierCurveTo(x+6,90,x-5,290,x+3,n);g.stroke();}grain(g,n,r,12);});
 const roof=canvasTexture(512,(g,n,r)=>{g.fillStyle='#614137';g.fillRect(0,0,n,n);const w=43,h=35;for(let y=-1;y<16;y++)for(let x=-1;x<13;x++){const a=84+r()*40;g.fillStyle=`rgb(${a|0},${(a*.66)|0},${(a*.51)|0})`;g.fillRect(x*w+(y%2)*w/2+2,y*h+1,w-3,h-2);g.fillStyle='rgba(225,170,108,.14)';g.fillRect(x*w+(y%2)*w/2+2,y*h+1,w-3,3);g.fillStyle='rgba(25,19,17,.28)';g.fillRect(x*w+(y%2)*w/2+2,(y+1)*h-3,w-3,2);}grain(g,n,r,13);});
 const ground=canvasTexture(512,(g,n,r)=>{g.fillStyle='#928769';g.fillRect(0,0,n,n);grain(g,n,r,54);for(let i=0;i<12000;i++){g.fillStyle=r()>.5?'rgba(26,33,14,.14)':'rgba(211,197,160,.19)';const x=r()*n,y=r()*n;g.fillRect(x,y,.3+r()*2,.3+r()*2);}},36);
 const standard=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.88,metalness:0,...extra});
 const m={
 stone:standard('#c5bca3',{map:stone,bumpMap:stone,bumpScale:.17}),
 paleStone:standard('#dfcfac',{map:stone,bumpMap:stone,bumpScale:.15}),
 darkStone:standard('#837c69',{map:stone,bumpMap:stone,bumpScale:.2}),
 plaster:standard('#f0dcc0',{map:plaster,bumpMap:plaster,bumpScale:.05}),
 ochre:standard('#bc9e70',{map:plaster,bumpMap:plaster,bumpScale:.05}),
 wood:standard('#d4af77',{map:wood,bumpMap:wood,bumpScale:.13}),
 darkWood:standard('#6b5037',{map:wood,bumpMap:wood,bumpScale:.09}),
 roof:standard('#bc9180',{map:roof,bumpMap:roof,bumpScale:.11}),
 darkRoof:standard('#62615b',{map:roof,bumpMap:roof,bumpScale:.1}),
 ground:standard('#ffffff',{map:ground,vertexColors:true,bumpMap:ground,bumpScale:.28}),
 dirt:standard('#ab9874',{map:ground}),
 road:standard('#b2a384',{map:ground,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2}),
 rock:standard('#878577',{map:plaster,flatShading:false}),
 foliage:standard('#3b512e',{roughness:1}),foliageLight:standard('#677145',{roughness:1}),trunk:standard('#59452f'),
 water:new THREE.MeshPhysicalMaterial({color:'#357c80',roughness:.27,metalness:.19,transparent:true,opacity:.78,clearcoat:.65,clearcoatRoughness:.22,side:THREE.DoubleSide}),
 foam:new THREE.MeshBasicMaterial({color:'#d4e4d5',transparent:true,opacity:.22,depthWrite:false}),
 iron:standard('#747c7c',{metalness:.67,roughness:.47}),darkIron:standard('#333b3b',{metalness:.62,roughness:.57}),
 cloth:standard('#475b50'),leather:standard('#5a4332'),skin:standard('#bfa082',{roughness:.91}),boots:standard('#332f28'),
 wheat:standard('#b7a25a'),straw:standard('#a5915c'),ironOre:standard('#574d42',{metalness:.34}),
 window:new THREE.MeshStandardMaterial({color:'#252b27',roughness:.8}),
 embers:new THREE.MeshBasicMaterial({color:'#ec8d32',transparent:true,opacity:.85}),
 flagPlayer:standard('#427b9d',{side:THREE.DoubleSide}),flagRed:standard('#813b34',{side:THREE.DoubleSide}),flagGold:standard('#ba9652',{side:THREE.DoubleSide}),flagNeutral:standard('#918b73',{side:THREE.DoubleSide})
 };m.flags={player:m.flagPlayer,red:m.flagRed,gold:m.flagGold,neutral:m.flagNeutral};
 const loader=new THREE.TextureLoader();
 const photo=(name,color=false,repeat=1)=>{const t=loader.load(new URL(`./assets/medieval/${name}_1k.jpg`,import.meta.url).href);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(repeat,repeat);t.anisotropy=8;if(color)t.colorSpace=THREE.SRGBColorSpace;return t;};
 const stonePhoto=photo('castle_wall_color',true),stoneNormal=photo('castle_wall_normal'),stoneRough=photo('castle_wall_roughness');
 for(const mat of [m.stone,m.paleStone,m.darkStone]){mat.map=stonePhoto;mat.bumpMap=null;mat.normalMap=stoneNormal;mat.normalScale=new THREE.Vector2(.52,.52);mat.roughnessMap=stoneRough;mat.roughness=1;}
 m.ground.map=photo('earth_color',true,270);m.ground.bumpMap=null;m.ground.normalMap=photo('earth_normal',false,270);m.ground.normalScale=new THREE.Vector2(.28,.28);m.ground.roughnessMap=photo('earth_roughness',false,270);m.ground.roughness=1;
 const timber=photo('timber_color',true),timberNormal=photo('timber_normal'),timberRough=photo('timber_roughness');for(const mat of [m.wood,m.darkWood]){mat.map=timber;mat.bumpMap=null;mat.normalMap=timberNormal;mat.normalScale=new THREE.Vector2(.42,.42);mat.roughnessMap=timberRough;mat.roughness=1;}
 m.dispose=()=>{const tex=new Set;for(const v of Object.values(m)){if(v?.isMaterial){for(const k of ['map','bumpMap','normalMap','roughnessMap'])if(v[k])tex.add(v[k]);v.dispose();}}for(const t of tex)t.dispose();};return m;
}

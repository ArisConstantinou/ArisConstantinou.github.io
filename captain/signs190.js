import * as T from 'three';
/** Separate front-facing surfaces: never a mirrored backface. Distances in game metres. */
export function shipSign(text,{width=1.5,height=.30,backText=text}={}){
 const group=new T.Group();group.name='Sign: '+text;group.userData={sign:true,text,backText,width,height};
 function face(copy,back){const c=document.createElement('canvas');c.width=1024;c.height=Math.max(160,Math.round(1024*height/width));const g=c.getContext('2d');g.fillStyle='#122e3c';g.fillRect(0,0,c.width,c.height);g.strokeStyle='#ceb989';g.lineWidth=6;g.strokeRect(5,5,c.width-10,c.height-10);g.fillStyle='#fff3da';g.textAlign='center';g.textBaseline='middle';let size=c.height*.45;g.font=`700 ${size}px system-ui`;while(g.measureText(copy).width>c.width-55&&size>18)g.font=`700 ${--size}px system-ui`;g.fillText(copy,c.width/2,c.height*.52);const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;tx.anisotropy=4;const f=new T.Mesh(new T.PlaneGeometry(width,height),new T.MeshBasicMaterial({map:tx,side:T.FrontSide,toneMapped:false}));f.rotation.y=back?Math.PI:0;f.position.z=back?-.026:.026;group.add(f);}
 face(text,false);face(backText,true);const board=new T.Mesh(new T.BoxGeometry(width,height,.045),new T.MeshStandardMaterial({color:0x132d38,roughness:.6}));group.add(board);return group;
}

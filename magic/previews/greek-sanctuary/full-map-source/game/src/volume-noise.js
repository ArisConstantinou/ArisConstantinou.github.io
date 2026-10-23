import {Data3DTexture,RedFormat,UnsignedByteType,LinearFilter,RepeatWrapping} from 'three';
const SIZE=64,F=Math.fround,fract=x=>x-Math.floor(x);
let shared;
export function createVolumeNoiseData(){
 const data=new Uint8Array(SIZE*SIZE*SIZE);let at=0;
 for(let z=0;z<SIZE;z++)for(let y=0;y<SIZE;y++)for(let x=0;x<SIZE;x++){
  const px=F(fract(F(F(x*F(.3183099))+F(.13)))*17),py=F(fract(F(F(y*F(.3183099))+F(.37)))*17),pz=F(fract(F(F(z*F(.3183099))+F(.71)))*17);
  data[at++]=Math.round(fract(F(F(F(px*py)*pz)*F(F(px+py)+pz)))*255);
 }
 return data;
}
export function volumeNoiseTexture(){
 if(!shared){shared=new Data3DTexture(createVolumeNoiseData(),SIZE,SIZE,SIZE);shared.name='shared-fire-noise-lattice';shared.format=RedFormat;shared.type=UnsignedByteType;shared.minFilter=shared.magFilter=LinearFilter;shared.wrapS=shared.wrapT=shared.wrapR=RepeatWrapping;shared.unpackAlignment=1;shared.needsUpdate=true;}
 return shared;
}
// Hardware trilinear interpolation replaces eight lattice hashes per noise
// evaluation. Keep the original smooth interpolation and all ray-march steps.
// The field tiles every64 units; quantization is one byte per lattice sample.
export const sampledVolumeNoise=`uniform highp sampler3D fireNoiseLattice;
float noise3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return texture(fireNoiseLattice,(i+f+.5)/64.).r;}
float fbm(vec3 p){return .57*noise3(p)+.29*noise3(p*2.03+7.1)+.14*noise3(p*4.11+13.7);}`;

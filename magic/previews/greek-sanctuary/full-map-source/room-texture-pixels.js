// Area-average the existing tangent-space pixels, like a normal-map mip level.
// Row orientation, tile layout and seams stay as authored; only resolution
// follows the already approved mobile texture cap.
export function downsampleNormalPixels(source,size,target){
 const step=size/target;
 if(!Number.isInteger(step)||step<1||source.length!==size*size*4)throw Error('Invalid normal-map dimensions');
 if(step===1)return source;
 const result=new Uint8Array(target*target*4),area=step*step;
 for(let y=0;y<target;y++)for(let x=0;x<target;x++)for(let channel=0;channel<4;channel++){
  let sum=0;for(let yy=0;yy<step;yy++)for(let xx=0;xx<step;xx++)sum+=source[((y*step+yy)*size+x*step+xx)*4+channel];
  result[(y*target+x)*4+channel]=Math.round(sum/area);
 }
 return result;
}

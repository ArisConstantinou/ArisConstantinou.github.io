import {RGBAFormat,UnsignedByteType,NoColorSpace,SRGBColorSpace} from 'three';

/** Prepare the original uncompressed glTF bitmap in bounded, exact-pixel rows.
 * Unsupported texture types keep Three's normal path. The original source and
 * mip settings remain intact, including Three's ordinary context restoration.
 */
export function createBatchedTextureUploader({renderer,nextFrame,createBitmap=globalThis.createImageBitmap,
  pixelsPerBatch=262144,minPixels=1048576,onBatch=()=>{}}) {
  if(!Number.isInteger(pixelsPerBatch)||pixelsPerBatch<1)throw Error('Invalid texture batch size');
  return async texture=>{
    const image=texture.image,source=texture.source,width=image?.width,height=image?.height;
    const supported=typeof createBitmap==='function'&&renderer.getContext&&renderer.properties&&
      width>0&&height>0&&width*height>=minPixels&&texture.format===RGBAFormat&&texture.type===UnsignedByteType&&
      [NoColorSpace,SRGBColorSpace].includes(texture.colorSpace)&&!texture.flipY&&!texture.premultiplyAlpha&&
      !texture.isDataTexture&&!texture.isDataArrayTexture&&!texture.isData3DTexture&&
      !texture.isCompressedTexture&&!texture.isVideoTexture&&!texture.isCubeTexture&&!texture.isDepthTexture&&
      !texture.mipmaps.length&&source.dataReady===true&&width<=renderer.capabilities.maxTextureSize&&height<=renderer.capabilities.maxTextureSize;
    if(!supported){await nextFrame();renderer.initTexture(texture);return{batched:false}}
    const gl=renderer.getContext();
    if(!gl.texStorage2D){await nextFrame();renderer.initTexture(texture);return{batched:false}}
    const properties=renderer.properties.get(texture);
    if(properties.__webglTexture&&properties.__version===texture.version)return{batched:false,alreadyReady:true};
    const originalReady=source.dataReady;
    let bitmap;
    try {
      await nextFrame();
      // Three r180 allocates all the original mip levels but skips its single
      // full-image texSubImage2D call when Source.dataReady is false.
      source.dataReady=false;
      try{renderer.initTexture(texture)}finally{source.dataReady=originalReady}
      const handle=renderer.properties.get(texture).__webglTexture;
      if(!handle)throw Error('Original texture allocation failed');
      const rows=Math.max(1,Math.floor(pixelsPerBatch/width));
      const stores=[gl.UNPACK_FLIP_Y_WEBGL,gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,gl.UNPACK_ALIGNMENT,
        gl.UNPACK_COLORSPACE_CONVERSION_WEBGL,gl.UNPACK_ROW_LENGTH,gl.UNPACK_SKIP_PIXELS,gl.UNPACK_SKIP_ROWS];
      function bound(operation){
        const active=gl.getParameter(gl.ACTIVE_TEXTURE);
        gl.activeTexture(gl.TEXTURE0);
        const previous=gl.getParameter(gl.TEXTURE_BINDING_2D),unpack=gl.getParameter(gl.PIXEL_UNPACK_BUFFER_BINDING);
        const values=stores.map(store=>gl.getParameter(store));
        try{
          gl.bindTexture(gl.TEXTURE_2D,handle);gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER,null);
          [false,false,texture.unpackAlignment,gl.NONE,0,0,0].forEach((value,i)=>gl.pixelStorei(stores[i],value));
          operation();
        }finally{
          stores.forEach((store,i)=>gl.pixelStorei(store,values[i]));
          gl.bindBuffer(gl.PIXEL_UNPACK_BUFFER,unpack);gl.bindTexture(gl.TEXTURE_2D,previous);gl.activeTexture(active);
        }
      }
      for(let top=0;top<height;top+=rows){
        await nextFrame();
        const count=Math.min(rows,height-top);
        bitmap=await createBitmap(image,0,top,width,count,{imageOrientation:'none',premultiplyAlpha:'none',colorSpaceConversion:'none'});
        if(gl.isContextLost())throw Error('Context lost during texture preparation');
        try{bound(()=>gl.texSubImage2D(gl.TEXTURE_2D,0,0,top,gl.RGBA,gl.UNSIGNED_BYTE,bitmap))}
        finally{bitmap.close?.();bitmap=undefined}
        onBatch({texture,top,rows:count,pixels:width*count});
      }
      if(texture.generateMipmaps){await nextFrame();bound(()=>gl.generateMipmap(gl.TEXTURE_2D))}
      return{batched:true,width,height,batches:Math.ceil(height/rows)};
    }catch(error){
      // A later ordinary Three upload can recover without replacing the asset.
      source.dataReady=originalReady;texture.needsUpdate=true;throw error;
    }finally{bitmap?.close?.();source.dataReady=originalReady}
  };
}

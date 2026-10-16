let textures={};

// Keep the large generated object out of the shared game module. Desktop
// neither parses nor retains this mobile-only lookup table.
export async function loadTextureProfile(read,{baseURI=globalThis.document?.baseURI,mobile=usesMobileTextures()}={}){
 if(!mobile)return false;
 const data=await read(new URL('mobile-textures.json',baseURI).href);
 textures=JSON.parse(new TextDecoder().decode(data));
 return true;
}

export function usesMobileTextures({userAgent=globalThis.navigator?.userAgent||'',maxTouchPoints=globalThis.navigator?.maxTouchPoints||0}={}){
 return /iPhone|iPad|iPod|Android/i.test(userAgent)||/Macintosh/i.test(userAgent)&&maxTouchPoints>1;
}
export function textureVariant(url,{baseURI=globalThis.document?.baseURI,mobile=usesMobileTextures(),manifest=textures}={}){
 if(!mobile||!baseURI)return null;
 const root=new URL('.',baseURI),source=new URL(url,root);
 if(source.origin!==root.origin||!source.pathname.startsWith(root.pathname))return null;
 const key=decodeURIComponent(source.pathname.slice(root.pathname.length)),variant=manifest[key];
 return variant?{...variant,url:new URL(variant.file,root).href}:null;
}

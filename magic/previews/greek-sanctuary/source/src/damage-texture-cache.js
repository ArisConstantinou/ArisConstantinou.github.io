/** Reuse identical text pixels without disposing a texture still displayed
 * by another label. Capacity bounds retained, inactive canvas textures.
 */
export function createDamageTextureCache(capacity=64){
 const entries=new Map();
 function trim(){for(const [key,entry] of entries){if(entries.size<=capacity)break;if(entry.references===0){entry.texture.dispose();entries.delete(key);}}}
 function acquire(key,create){let entry=entries.get(key);if(entry){entries.delete(key);entries.set(key,entry);}else{entry={texture:create(),references:0};entries.set(key,entry);}entry.references++;trim();return entry;}
 function release(entry){if(entry.references<=0)throw Error('Damage texture released twice');entry.references--;trim();}
 function clear(){for(const entry of entries.values())entry.texture.dispose();entries.clear();}
 return {acquire,release,clear,get size(){return entries.size;}};
}

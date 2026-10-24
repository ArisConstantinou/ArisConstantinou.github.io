import {Material}from'three';
import {hasFragmentOnlySkinCallback}from'./skinned-room-bounds.js';
const callbacks=new WeakMap();
// Author-owned contract: this exact callback changes shading/varyings only.
// Keep it separate from room-interior shader eligibility and skin culling.
export function registerShadowPositionMaterial(material){let known=callbacks.get(material);if(!known){known=new Set();callbacks.set(material,known);}known.add(material.onBeforeCompile);}
export function shadowPositionsPreserved(material,compile=material?.onBeforeCompile){return !!material&&(compile===Material.prototype.onBeforeCompile||hasFragmentOnlySkinCallback(material,compile)||callbacks.get(material)?.has(compile)===true);}

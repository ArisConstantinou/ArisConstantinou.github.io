// Rigid prop trees have no skeleton/mixer. Reuse their complete world matrices
// only while every local transform and the parent's world matrix stay identical.
// Unlike a local-matrix cache, this also avoids forced descendant multiplies
// from an unchanged Scene matrix. Moving/reparented props take Three's normal path.
export function cacheRigidWorldMatrices(root){
 const original=root.updateMatrixWorld,own=Object.hasOwn(root,'updateMatrixWorld');
 let entries=[],topology=true,valid=false,parent=null,enabled=true,disposed=false;
 const parentMatrix=new Float64Array(16),rootMatrix=new Float64Array(16);
 const stats={reused:0,updated:0};
 const changed=()=>{topology=true;valid=false;};
 function rebuild(){
  for(const {node}of entries){node.removeEventListener('childadded',changed);node.removeEventListener('childremoved',changed);}
  entries=[];root.traverse(node=>{entries.push({node,state:new Float64Array(10)});node.addEventListener('childadded',changed);node.addEventListener('childremoved',changed);});topology=false;
 }
 function equal(){
  if(!valid||parent!==root.parent)return false;
  const pm=root.parent?.matrixWorld.elements,wm=root.matrixWorld.elements;
  for(let i=0;i<16;i++)if(rootMatrix[i]!==wm[i]||pm&&parentMatrix[i]!==pm[i])return false;
  for(const {node:n,state:s}of entries){
   // Manual matrix ownership and deforming nodes retain the original behavior.
   if(!n.matrixAutoUpdate||!n.matrixWorldAutoUpdate||n.matrixWorldNeedsUpdate||n.isSkinnedMesh||n.isBone)return false;
   const p=n.position,q=n.quaternion,z=n.scale;
   if(s[0]!==p.x||s[1]!==p.y||s[2]!==p.z||s[3]!==q.x||s[4]!==q.y||s[5]!==q.z||s[6]!==q.w||s[7]!==z.x||s[8]!==z.y||s[9]!==z.z)return false;
  }
  return true;
 }
 function remember(){
  parent=root.parent;if(parent)parentMatrix.set(parent.matrixWorld.elements);rootMatrix.set(root.matrixWorld.elements);
  for(const {node:n,state:s}of entries){const p=n.position,q=n.quaternion,z=n.scale;s[0]=p.x;s[1]=p.y;s[2]=p.z;s[3]=q.x;s[4]=q.y;s[5]=q.z;s[6]=q.w;s[7]=z.x;s[8]=z.y;s[9]=z.z;}
  valid=true;
 }
 function update(force){
  if(topology)rebuild();
  if(enabled&&equal()){stats.reused++;return;}
  const result=original.call(this,force);stats.updated++;remember();return result;
 }
 root.updateMatrixWorld=update;
 return {stats,setEnabled(value){enabled=!!value;valid=false;},dispose(){if(disposed)return;disposed=true;for(const {node}of entries){node.removeEventListener('childadded',changed);node.removeEventListener('childremoved',changed);}if(root.updateMatrixWorld===update){if(own)root.updateMatrixWorld=original;else delete root.updateMatrixWorld;}entries=[];}};
}

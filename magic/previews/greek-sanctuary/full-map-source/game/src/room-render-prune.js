// Only immutable, bounded surfaces can prove an entire render branch hidden.
// Dynamic particles, rigs, lights and unknown bounds retain the normal path.
export function hiddenRoomBranches(root,boxFor,overlaps){
 function visit(node){
  const children=node.children.map(visit);
  let ownHidden=false;
  if(node.isMesh&&!node.isSkinnedMesh&&!node.isBatchedMesh&&node.frustumCulled!==false
    &&node.matrixAutoUpdate===false&&node.matrixWorldAutoUpdate===false){
   const box=boxFor(node);ownHidden=!!box&&!overlaps(box);
  }else if(node.type==='Group'||node.type==='Object3D')ownHidden=node.children.length>0;
  const hidden=node!==root&&ownHidden&&children.every(c=>c.hidden);
  return {hidden,branches:hidden?[node]:children.flatMap(c=>c.branches)};
 }
 return visit(root).branches;
}

// Visibility belongs to gameplay. Mask it only for this synchronous render,
// restoring every previous value even when a renderer/callback throws.
export function renderWithoutBranches(branches,render){
 const changed=[];
 try{for(const node of branches)if(node.visible){changed.push(node);node.visible=false;}return render();}
 finally{for(const node of changed)node.visible=true;}
}

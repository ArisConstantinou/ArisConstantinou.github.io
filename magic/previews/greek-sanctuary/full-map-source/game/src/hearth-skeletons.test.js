import test from'node:test';import assert from'node:assert/strict';
import {Bone,Group,Skeleton,SkinnedMesh,BufferGeometry,Float32BufferAttribute,Uint16BufferAttribute,Matrix4,Vector3}from'three';
import {shareHearthSkeletons}from'./hearth-character.js';

test('shared HEARTH palettes preserve posed skin vertices, mesh bind matrices and independent actor joints',()=>{
 const root=new Group(),hip=new Bone(),arm=new Bone();root.add(hip);hip.add(arm);arm.position.y=1;root.updateMatrixWorld(true);
 const inverses=[new Matrix4(),new Matrix4().makeTranslation(0,-1,0)];
 const make=(bones=[hip,arm],inv=inverses)=>{const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute([.2,1.1,.3],3));g.setAttribute('skinIndex',new Uint16BufferAttribute([0,1,0,0],4));g.setAttribute('skinWeight',new Float32BufferAttribute([.25,.75,0,0],4));const m=new SkinnedMesh(g);m.skeleton=new Skeleton(bones,inv.map(v=>v.clone()));m.bindMatrix.makeTranslation(.1,.2,0);m.bindMatrixInverse.copy(m.bindMatrix).invert();root.add(m);return m;};
 const first=make(),second=make(),changed=make([hip,arm],[new Matrix4(),new Matrix4().makeTranslation(0,-.9,0)]),other=make([new Bone(),new Bone()]);
 let released=0;second.skeleton.addEventListener?.('dispose',()=>released++);const oldDispose=second.skeleton.dispose.bind(second.skeleton);second.skeleton.dispose=()=>{released++;oldDispose();};
 const vertex=mesh=>mesh.applyBoneTransform(0,new Vector3().fromBufferAttribute(mesh.geometry.attributes.position,0)).toArray();
 const matrices=[first,second,changed,other].map(m=>m.bindMatrix.clone());
 const before=[];for(const angle of [0,.4,-.9,1.2]){arm.rotation.z=angle;root.updateMatrixWorld(true);before.push([vertex(first),vertex(second),vertex(changed)]);}
 assert.equal(shareHearthSkeletons(root),3);assert.equal(first.skeleton,second.skeleton);assert.notEqual(first.skeleton,changed.skeleton);assert.notEqual(first.skeleton,other.skeleton);assert.equal(released,1);
 let i=0;for(const angle of [0,.4,-.9,1.2]){arm.rotation.z=angle;root.updateMatrixWorld(true);assert.deepEqual([vertex(first),vertex(second),vertex(changed)],before[i++]);}
 [first,second,changed,other].forEach((m,i)=>assert(m.bindMatrix.equals(matrices[i])));assert.equal(shareHearthSkeletons(root),3);assert.equal(released,1);
 for(const m of [first,second,changed,other])m.geometry.dispose();for(const s of new Set([first,second,changed,other].map(m=>m.skeleton)))s.dispose();
});

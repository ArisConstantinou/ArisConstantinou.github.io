import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
const cache=new WeakMap();
export function alignedHouseDimensions(base){
 const sideways=base.side==='east'||base.side==='west',across=sideways?base.halfDepth:base.halfWidth,along=sideways?base.halfWidth:base.halfDepth;
 return {across,along,wallAcross:across+.17,wallAlong:along+.17,roofAcross:across+.32,roofAlong:along+.32,doorHalf:1.6,yaw:base.side==='east'?Math.PI/2:base.side==='west'?-Math.PI/2:Math.PI};
}
export function createAlignedHouse(asset,base,floorY){
 const marker=asset.getObjectByName('Gameplay_House');if(marker?.userData.alignmentVersion!==2)throw new Error('House alignment asset version mismatch');
 const d=alignedHouseDimensions(base),key=d.across+':'+d.along;let variants=cache.get(asset);if(!variants){variants=new Map();cache.set(asset,variants);}let prepared=variants.get(key);
 if(!prepared){
  const roof=asset.getObjectByName('imported-house-roof'),body=asset.getObjectByName('imported-house-walls');if(!roof||!body)throw new Error('Missing aligned house surfaces');
  const geometries=[];
  for(const name of ['walls','front-left','front-right']){
   const mesh=asset.getObjectByName('imported-house-'+name);if(!mesh)throw new Error('Missing house facade '+name);
   const sign=name==='front-left'?-1:name==='front-right'?1:0,inner=d.doorHalf/d.wallAcross,a=sign?2*(1-inner):1,b=sign*(2*inner-1),matrix=new THREE.Matrix4().makeScale(d.wallAcross*a,1,d.wallAlong);matrix.setPosition(d.wallAcross*b,0,0);
   geometries.push(mesh.geometry.clone().applyMatrix4(matrix));
  }
  const walls=mergeGeometries(geometries,false);if(!walls)throw new Error('House facade merge failed');for(const g of geometries)g.dispose();walls.computeBoundingBox();walls.computeBoundingSphere();
  const roofGeometry=roof.geometry.clone().applyMatrix4(new THREE.Matrix4().makeScale(d.roofAcross,1,d.roofAlong));roofGeometry.computeBoundingBox();roofGeometry.computeBoundingSphere();
  prepared={walls,roof:roofGeometry,wallMaterial:body.material,roofMaterial:roof.material};variants.set(key,prepared);
 }
 const root=new THREE.Group();root.name='Imported-'+base.id;root.position.set(base.x,floorY,base.z);root.rotation.y=d.yaw;root.userData.houseAlignment={version:2,...d};
 const roof=new THREE.Mesh(prepared.roof,prepared.roofMaterial);roof.name='imported-house-roof';const walls=new THREE.Mesh(prepared.walls,prepared.wallMaterial);walls.name='imported-house-walls';root.add(roof,walls);return root;
}


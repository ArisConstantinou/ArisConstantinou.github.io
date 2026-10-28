import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {BASES,ENCLOSURES,WALLS,TREES,enclosingYard} from './arcade-bases.js';
import {plankedFloorGeometry} from './arcade-floor-geometry.js';

const COLORS=['#b5dc72','#ee8c72','#bd9ee3'];
const clamp=(n,min=0,max=1)=>Math.max(min,Math.min(max,n));
const TAU=Math.PI*2;
const ROOF_SIGHT_BONES=['pelvis','spine','head','eyeL','eyeR','wrist-1','wrist1','foot-1','foot1'];

// Geometry comes from the same footprints used by collisions and AI routes.
// The roof and nearby foliage fade locally, while the physical walls stay solid.
export class ArcadeBasesView {
  constructor(game){
    this.game=game;this.scene=game.scene;this.clock=0;
    this.group=new THREE.Group();this.group.name='storage-homes-and-fenced-catapult-yards';this.scene.add(this.group);
    this.bases=new Map();this.groves=[];this.enclosures=new Map();this.ownedGeometries=[];this.ownedMaterials=[];this.dummy=new THREE.Object3D();
    this.sightRay=new THREE.Ray();this.sightTarget=new THREE.Vector3();this.sightHit=new THREE.Vector3();
    this.roofRay=new THREE.Ray();this.roofHit=new THREE.Vector3();this.roofCamera=new THREE.Vector3();this.roofAnchor=new THREE.Vector3();this.roofNearest=new THREE.Vector3();
    this.roofTargets=Array.from({length:16},()=>new THREE.Vector3());this.roofTargetCount=0;
    this.geometries={box:new THREE.BoxGeometry(1,1,1),cylinder:new THREE.CylinderGeometry(.5,.5,1,8),cone:new THREE.ConeGeometry(1,1,5),leaf:new THREE.IcosahedronGeometry(1,1),ring:new THREE.RingGeometry(.91,1,40),wing:new THREE.SphereGeometry(1,6,4),sphere:new THREE.SphereGeometry(1,8,6)};
    this.materials={wood:new THREE.MeshToonMaterial({color:'#866244'}),lightWood:new THREE.MeshToonMaterial({color:'#c69b62'}),darkWood:new THREE.MeshToonMaterial({color:'#554535'}),leaf:new THREE.MeshToonMaterial({color:'#56874d'}),fly:new THREE.MeshToonMaterial({color:'#233e38'}),wing:new THREE.MeshToonMaterial({color:'#d5eee1',transparent:true,opacity:.85}),ruin:new THREE.MeshToonMaterial({color:'#6a6855'}),dark:new THREE.MeshBasicMaterial({color:'#173b31'}),alert:new THREE.MeshBasicMaterial({color:'#f4af69'})};
    this.buildWalls();
    for(const [index,base] of BASES.entries())this.bases.set(base.id,this.buildBase(base,index));
    for(const [index,grove] of TREES.entries())this.groves.push(this.buildGrove(grove,index));
  }
  ground(x,z){return this.game.ground(x,z);}
  mesh(parent,geometry,material,x=0,y=0,z=0,sx=1,sy=1,sz=1){
    const mesh=new THREE.Mesh(geometry,material);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);parent.add(mesh);return mesh;
  }
  material(options){const material=new THREE.MeshToonMaterial(options);this.ownedMaterials.push(material);return material;}
  mergeParts(parts,material,name){
    if(!parts.length)return null;
    const geometry=mergeGeometries(parts);for(const part of parts)part.dispose();this.ownedGeometries.push(geometry);
    const mesh=new THREE.Mesh(geometry,material);mesh.name=name;this.group.add(mesh);return mesh;
  }
  boxPart(parts,x,y,z,sx,sy,sz){const geometry=this.geometries.box.clone();geometry.scale(sx,sy,sz);geometry.translate(x,y,z);parts.push(geometry);}

  buildWalls(){
    const stone=[];
    for(const yard of ENCLOSURES){
      const index=BASES.findIndex(b=>b.owner===yard.owner),wood=[],caps=[],boxes=[];
      const woodMaterial=this.material({color:'#866244',transparent:true,opacity:1}),capMaterial=this.material({color:COLORS[index],transparent:true,opacity:1});
      for(const wall of WALLS){
        if(wall.enclosureId!==yard.id)continue;
        const ground=this.ground(wall.x,wall.z);
        this.boxPart(stone,wall.x,ground+.25,wall.z,wall.hw*2+.08,.5,wall.hd*2+.08);
        this.boxPart(wood,wall.x,ground+wall.height*.5,wall.z,wall.hw*2,wall.height,wall.hd*2);
        this.boxPart(caps,wall.x,ground+wall.height+.055,wall.z,wall.hw*2+.05,.16,wall.hd*2+.05);
        const horizontal=wall.hw>wall.hd,length=horizontal?wall.hw*2:wall.hd*2,steps=Math.max(1,Math.floor(length/.65));
        for(let i=0;i<=steps;i++){
          const t=steps?i/steps-.5:0;
          this.boxPart(wood,wall.x+(horizontal?t*length:0),ground+wall.height*.55,wall.z+(horizontal?0:t*length),.15,wall.height+.32,.15);
        }
        boxes.push(new THREE.Box3(new THREE.Vector3(wall.x-wall.hw-.1,ground,wall.z-wall.hd-.1),new THREE.Vector3(wall.x+wall.hw+.1,ground+wall.height+.35,wall.z+wall.hd+.1)));
      }
      const wallMesh=this.mergeParts(wood,woodMaterial,`${yard.id}-solid-walls`),capMesh=this.mergeParts(caps,capMaterial,`${yard.id}-wall-tops`);
      this.enclosures.set(yard.id,{definition:yard,wallMesh,capMesh,woodMaterial,capMaterial,boxes,faded:false});
      const g=this.ground(yard.gate.x,yard.gate.z);
      const gate=new THREE.Group();gate.name=`${yard.id}-single-open-entrance`;gate.position.set(yard.gate.x,g,yard.gate.z);this.group.add(gate);
      const sideways=yard.side==='east'||yard.side==='west';if(sideways)gate.rotation.y=Math.PI/2;
      this.mesh(gate,this.geometries.box,woodMaterial,-1.6,1.25,0,.18,2.5,.25);
      this.mesh(gate,this.geometries.box,woodMaterial,1.6,1.25,0,.18,2.5,.25);
      this.mesh(gate,this.geometries.box,capMaterial,0,2.5,0,3.38,.22,.3);
      // Open floor marking and a side-colored leaf show the entrance without a panel.
      const threshold=this.mesh(gate,this.geometries.box,this.material({color:COLORS[index]}),0,.045,0,2.8,.07,.5);
      threshold.name='walkable-gate-threshold';
      const flag=this.mesh(gate,this.geometries.leaf,this.material({color:COLORS[index]}),0,2.9,0,.4,.35,.1);flag.rotation.z=.25;
    }
    this.mergeParts(stone,this.materials.ruin,'enclosure-foundations');
  }

  updateWallVisibility(player,yard,dt){
    const camera=this.game.camera;
    let targetDistance=0;
    if(player&&camera){
      this.sightTarget.set(player.x,this.ground(player.x,player.z)+(player.height||0)+.9,player.z);
      this.sightRay.origin.copy(camera.position);this.sightRay.direction.copy(this.sightTarget).sub(camera.position);
      targetDistance=this.sightRay.direction.lengthSq();this.sightRay.direction.normalize();
    }
    const recovery=1-Math.exp(-Math.max(dt,.016)*10);
    for(const enclosure of this.enclosures.values()){
      let faded=yard?.id===enclosure.definition.id;
      if(!faded&&targetDistance>0){
        for(const box of enclosure.boxes){
          if(this.sightRay.intersectBox(box,this.sightHit)&&this.sightHit.distanceToSquared(this.sightRay.origin)<targetDistance-.05){faded=true;break;}
        }
      }
      enclosure.faded=faded;
      // Reveal immediately at spawn / camera turns. Recover smoothly on exit.
      // This only changes rendering; WALLS remain fully active in the model.
      const opacity=faded ? .2 : enclosure.woodMaterial.opacity+(1-enclosure.woodMaterial.opacity)*recovery;
      enclosure.woodMaterial.opacity=enclosure.capMaterial.opacity=opacity;
      enclosure.woodMaterial.depthWrite=enclosure.capMaterial.depthWrite=opacity>.95;
    }
  }

  prepareRoofSight(player){
    this.roofTargetCount=0;
    const camera=this.game.camera;if(!player||!camera)return;
    camera.getWorldPosition(this.roofCamera);
    const model=this.game.models?.[0],load=clamp(player.load||0);
    if(model?.group){
      model.group.updateWorldMatrix(true,true);this.roofAnchor.setFromMatrixPosition(model.group.matrixWorld);
      for(const name of ROOF_SIGHT_BONES){
        const bone=model.bones?.[name];if(bone)this.roofTargets[this.roofTargetCount++].setFromMatrixPosition(bone.matrixWorld);
      }
    }else this.roofAnchor.set(player.x,this.ground(player.x,player.z)+(player.height||0)+load*.28+(player.catapultId?.45:0),player.z);
    // Cover the full visible body as well as the rig's head, hands and feet.
    // A centre-only ray can miss a roof cutting across one edge of the frog.
    const radius=.86+load*.45,bodyY=.55+load*.22,topY=.85+load*.32,anchor=this.roofAnchor;
    this.roofTargets[this.roofTargetCount++].set(anchor.x,anchor.y+bodyY,anchor.z);
    this.roofTargets[this.roofTargetCount++].set(anchor.x-radius,anchor.y+bodyY,anchor.z);
    this.roofTargets[this.roofTargetCount++].set(anchor.x+radius,anchor.y+bodyY,anchor.z);
    this.roofTargets[this.roofTargetCount++].set(anchor.x,anchor.y+bodyY,anchor.z-radius);
    this.roofTargets[this.roofTargetCount++].set(anchor.x,anchor.y+bodyY,anchor.z+radius);
    this.roofTargets[this.roofTargetCount++].set(anchor.x,anchor.y+.08,anchor.z);
    this.roofTargets[this.roofTargetCount++].set(anchor.x,anchor.y+topY,anchor.z);
  }

  roofObstructsPlayer(visual){
    if(!this.roofTargetCount)return false;
    const origin=this.roofCamera,ray=this.roofRay;
    // Also remove a roof crossing the camera's near plane. Such a surface can
    // fill the screen even when the centre ray starts just beyond its edge.
    const camera=this.game.camera,near=camera.near||.1,tan=Math.tan((camera.fov||52)*Math.PI/360);
    const clearance=Math.max(.35,near*Math.sqrt(1+tan*tan*(1+(camera.aspect||1)**2))+.08);
    for(const triangle of visual.roofTriangles){
      triangle.closestPointToPoint(origin,this.roofNearest);
      if(this.roofNearest.distanceToSquared(origin)<clearance*clearance)return true;
    }
    ray.origin.copy(origin);
    for(let i=0;i<this.roofTargetCount;i++){
      ray.direction.copy(this.roofTargets[i]).sub(origin);const distanceSq=ray.direction.lengthSq();
      if(distanceSq<1e-8)continue;ray.direction.normalize();
      if(!ray.intersectsBox(visual.roofBounds))continue;
      for(const triangle of visual.roofTriangles){
        if(ray.intersectTriangle(triangle.a,triangle.b,triangle.c,false,this.roofHit)&&this.roofHit.distanceToSquared(origin)<distanceSq)return true;
      }
    }
    return false;
  }

  stockObstructsPlayer(visual){
    if(!this.roofTargetCount)return false;
    const origin=this.roofCamera,ray=this.roofRay,box=visual.stockBounds,camera=this.game.camera;
    const near=camera.near||.1,tan=Math.tan((camera.fov||52)*Math.PI/360);
    const clearance=Math.max(.35,near*Math.sqrt(1+tan*tan*(1+(camera.aspect||1)**2))+.08);
    if(box.distanceToPoint(origin)<clearance)return true;
    ray.origin.copy(origin);
    for(let i=0;i<this.roofTargetCount;i++){
      ray.direction.copy(this.roofTargets[i]).sub(origin);const distanceSq=ray.direction.lengthSq();
      if(distanceSq<1e-8)continue;ray.direction.normalize();
      if(ray.intersectBox(box,this.roofHit)&&this.roofHit.distanceToSquared(origin)<distanceSq-1e-5)return true;
    }
    return false;
  }

  buildHouse(base,roofMaterial,team){
    const floor=this.game.houseFloors?.find(item=>item.baseId===base.id);
    const floorY=floor?.height??this.ground(base.x,base.z),halfWidth=base.halfWidth+.18,halfDepth=base.halfDepth+.18;
    const house=new THREE.Group();house.name=`${base.id}-actual-roofed-house`;house.position.set(base.x,floorY,base.z);this.group.add(house);
    const floorThickness=.18,deckGeometry=plankedFloorGeometry(halfWidth,halfDepth,floorThickness);this.ownedGeometries.push(deckGeometry);
    const deck=this.mesh(house,deckGeometry,[this.materials.darkWood,this.materials.lightWood]);deck.name='house-floor-at-actor-height';
    const supports=[];
    for(const x of [-base.halfWidth,base.halfWidth])for(const z of [-base.halfDepth,base.halfDepth]){
      const terrain=this.game.world?.getSurface(base.x+x,base.z+z).height??floor?.minimum??floorY-.2;
      const height=Math.max(.05,floorY-floorThickness-terrain);this.boxPart(supports,x,-floorThickness-height*.5,z,.3,height,.3);
    }
    const supportGeometry=mergeGeometries(supports);for(const part of supports)part.dispose();this.ownedGeometries.push(supportGeometry);this.mesh(house,supportGeometry,this.materials.darkWood);
    // A full rectangular gabled roof covers the same solid house walls and
    // interior used for spawning. The former little stock canopy was not a home.
    const sideways=base.side==='east'||base.side==='west',w=(sideways?base.halfDepth:base.halfWidth)+.32,d=(sideways?base.halfWidth:base.halfDepth)+.32,eave=2.62,ridge=4.05;
    const roofGeometry=new THREE.BufferGeometry();
    roofGeometry.setAttribute('position',new THREE.Float32BufferAttribute([-w,eave,-d,0,ridge,-d,w,eave,-d,-w,eave,d,0,ridge,d,w,eave,d],3));
    roofGeometry.setIndex([0,3,4,0,4,1,1,4,5,1,5,2,0,1,2,3,5,4]);roofGeometry.computeVertexNormals();
    if(sideways)roofGeometry.rotateY(Math.PI/2);this.ownedGeometries.push(roofGeometry);
    const roof=this.mesh(house,roofGeometry,roofMaterial);roof.name='full-house-leaf-roof';
    // Cache the actual rendered faces in world space. Roofs are static, so
    // visibility can use exact triangles without raycast arrays each frame.
    roof.updateWorldMatrix(true,false);
    const roofTriangles=[],roofBounds=new THREE.Box3(),positions=roofGeometry.attributes.position,indices=roofGeometry.index;
    for(let i=0;i<indices.count;i+=3){
      const triangle=new THREE.Triangle();
      triangle.a.fromBufferAttribute(positions,indices.getX(i)).applyMatrix4(roof.matrixWorld);
      triangle.b.fromBufferAttribute(positions,indices.getX(i+1)).applyMatrix4(roof.matrixWorld);
      triangle.c.fromBufferAttribute(positions,indices.getX(i+2)).applyMatrix4(roof.matrixWorld);
      roofTriangles.push(triangle);roofBounds.expandByPoint(triangle.a).expandByPoint(triangle.b).expandByPoint(triangle.c);
    }
    const roofStem=this.mesh(house,this.geometries.cylinder,team,0,ridge+.18,0,.13,.55,.13);roofStem.rotation.z=.2;
    const roofLeaf=this.mesh(house,this.geometries.leaf,team,.2,ridge+.48,0,.5,.14,.24);roofLeaf.rotation.z=.3;
    let ramp=null;
    if(floor?.ramp){
      const r=floor.ramp,vertices=[],indices=[];
      for(let row=0;row<=r.rows;row++)for(let col=0;col<=r.cols;col++){
        const along=row/r.rows*r.length,across=(col/r.cols*2-1)*r.halfWidth;
        vertices.push(r.x+r.dx*along+r.rightX*across,r.heights[row*(r.cols+1)+col],r.z+r.dz*along+r.rightZ*across);
      }
      for(let row=0;row<r.rows;row++)for(let col=0;col<r.cols;col++){const a=row*(r.cols+1)+col,b=a+1,c=a+r.cols+1,e=c+1;indices.push(a,c,b,b,c,e);}
      const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.setIndex(indices);geometry.computeVertexNormals();this.ownedGeometries.push(geometry);
      const material=this.material({color:'#b18b59',side:THREE.DoubleSide});ramp=new THREE.Mesh(geometry,material);ramp.name=`${base.id}-walkable-door-ramp`;this.group.add(ramp);
    }
    house.userData={baseId:base.id,interior:{x:base.x,z:base.z,halfWidth:base.halfWidth-.17,halfDepth:base.halfDepth-.17},floorY,roofEaveY:floorY+eave,roofRidgeY:floorY+ridge};
    return {house,deck,ramp,roof,roofStem,roofLeaf,roofTriangles,roofBounds};
  }

  buildBase(base,index){
    const group=new THREE.Group();group.name=`${base.id}-shelter`;group.position.set(base.stock.x,this.ground(base.stock.x,base.stock.z),base.stock.z);this.group.add(group);
    const backYaw=base.side==='north'?0:base.side==='east'?Math.PI/2:-Math.PI/2;
    const cabin=new THREE.Group();cabin.rotation.y=backYaw;group.add(cabin);
    const team=this.material({color:COLORS[index]}),roofMaterial=this.material({color:index===0?'#61975b':index===1?'#ba7356':'#9270b0',transparent:true,opacity:1,depthWrite:true,side:THREE.DoubleSide});
    // Only this basket may fade. Its wood and owner band must not share the
    // materials used by house floors, trunks, flags or other stock baskets.
    const stockMaterials=[this.materials.wood,this.materials.darkWood,team].map(source=>{const material=source.clone();material.transparent=true;this.ownedMaterials.push(material);return material;});
    const rim=this.mesh(cabin,this.geometries.cylinder,stockMaterials[0],0,.38,0,1.25,.76,1.25);rim.name='infinite-fly-stock-basket';
    const lid=this.mesh(cabin,this.geometries.cylinder,stockMaterials[1],0,.77,0,1.15,.09,1.15);lid.name='stock-basket-lid';
    const body=this.mesh(cabin,this.geometries.cylinder,stockMaterials[2],0,.42,0,1.31,.14,1.31);body.name='owner-color-on-stock';
    const stockMeshes=[rim,lid,body];
    const {house,deck,ramp,roof,roofStem,roofLeaf,roofTriangles,roofBounds}=this.buildHouse(base,roofMaterial,team);
    const supply=new THREE.Group();supply.name='visible-fly-reserve';cabin.add(supply);
    const flyBodies=new THREE.InstancedMesh(this.geometries.sphere,this.materials.fly,8),flyWings=new THREE.InstancedMesh(this.geometries.wing,this.materials.wing,16);
    flyBodies.name='reserve-fly-bodies';flyWings.name='reserve-fly-wings';flyBodies.frustumCulled=flyWings.frustumCulled=false;supply.add(flyBodies,flyWings);
    const markerMaterial=new THREE.MeshBasicMaterial({color:COLORS[index],transparent:true,opacity:.36,side:THREE.DoubleSide,depthWrite:false});this.ownedMaterials.push(markerMaterial);
    const marker=this.mesh(group,this.geometries.ring,markerMaterial,0,.045,0,2.05,2.05,2.05);marker.rotation.x=-Math.PI/2;marker.name='stock-refill-ring';
    const bar=new THREE.Group();bar.name='storage-destruction-progress';bar.position.set(0,2.12,0);group.add(bar);
    this.mesh(bar,this.geometries.box,this.materials.dark,0,0,0,2.2,.17,.09);
    const fill=this.mesh(bar,this.geometries.box,this.materials.alert,-1.06,0,.055,0,.115,.05);bar.visible=false;
    const ruins=new THREE.Group();ruins.name='destroyed-storage-remains';ruins.visible=false;group.add(ruins);
    const wreck=[];for(let i=0;i<5;i++){
      const piece=this.geometries.box.clone();piece.scale(.2,.2,1.1);piece.rotateY(i*.8);piece.translate(Math.sin(i*2.4)*.8,.12+(i%2)*.08,Math.cos(i*2.4)*.7);wreck.push(piece);
    }
    const wreckGeometry=mergeGeometries(wreck);for(const part of wreck)part.dispose();this.ownedGeometries.push(wreckGeometry);this.mesh(ruins,wreckGeometry,this.materials.ruin);
    group.updateWorldMatrix(true,true);
    const stockBounds=new THREE.Box3();for(const mesh of stockMeshes)stockBounds.union(new THREE.Box3().setFromObject(mesh));stockBounds.expandByScalar(.03);
    return {definition:base,group,cabin,house,deck,ramp,roof,roofStem,roofLeaf,roofTriangles,roofBounds,roofObstructed:false,roofHold:0,roofMaterial,stockMeshes,stockMaterials,stockBounds,stockObstructed:false,marker,markerMaterial,bar,fill,supply,flyBodies,flyWings,ruins,index};
  }

  buildGrove(definition,index){
    const group=new THREE.Group();group.name=definition.id;this.group.add(group);
    const foliageColors=['#487c47','#609147','#397553','#668349','#4d825a'];
    const material=this.material({color:foliageColors[index%foliageColors.length],transparent:true,opacity:.94,depthWrite:true});
    const foliage=[],trunks=[],understory=[];
    const canopy=new THREE.Group();canopy.name='tree-cover-canopy';group.add(canopy);
    for(let i=0;i<3;i++){
      const angle=i*TAU/3+index*.7,x=definition.x+Math.cos(angle)*definition.radius*.43,z=definition.z+Math.sin(angle)*definition.radius*.43,ground=this.ground(x,z),height=3.3+(i%2)*.5;
      const trunk=this.geometries.cylinder.clone();trunk.scale(.24,height,.24);trunk.translate(x,ground+height/2,z);trunks.push(trunk);
      for(let j=0;j<3;j++){
        const leaf=this.geometries.leaf.clone();leaf.scale(1.35+j*.12,.8,1.25);leaf.translate(x+Math.sin(j*2.1)*.42,ground+height+j*.35,z+Math.cos(j*2.1)*.35);foliage.push(leaf);
      }
      const bush=this.geometries.leaf.clone();bush.scale(.7,.35,.7);bush.translate(x+.5,ground+.22,z-.25);understory.push(bush);
    }
    const merge=(parts,mat,name,parent)=>{const geometry=mergeGeometries(parts);for(const part of parts)part.dispose();this.ownedGeometries.push(geometry);const mesh=new THREE.Mesh(geometry,mat);mesh.name=name;parent.add(mesh);return mesh;};
    merge(trunks,this.materials.wood,'grove-trunks',group);
    merge(foliage,material,'grove-leaf-crown',canopy);
    merge(understory,this.materials.leaf,'slow-moving-underbrush',group);
    // A subtle leaf-shaped ground bed makes the actual slowdown/cover radius legible.
    const bedMaterial=new THREE.MeshBasicMaterial({color:'#50733f',transparent:true,opacity:.2,side:THREE.DoubleSide,depthWrite:false});this.ownedMaterials.push(bedMaterial);
    const bed=this.mesh(group,this.geometries.ring,bedMaterial,definition.x,this.ground(definition.x,definition.z)+.02,definition.z,definition.radius,definition.radius,definition.radius);bed.rotation.x=-Math.PI/2;
    return {definition,group,canopy,material};
  }

  update(dt=0){
    const advancing=this.game.running?Math.max(0,Math.min(.1,dt)):0;this.clock+=advancing;
    const player=this.game.state.actors?.[0],yard=player?enclosingYard(player):null;
    this.updateWallVisibility(player,yard,dt);this.prepareRoofSight(player);
    const states=this.game.state.bases||[];
    for(const visual of this.bases.values()){
      const state=states.find(item=>item.id===visual.definition.id||item.owner===visual.definition.owner);
      const destroyed=!!state?.destroyed,progress=clamp((state?.progress||0)/10),active=progress>0&&!destroyed;
      visual.cabin.visible=!destroyed;visual.supply.visible=!destroyed;visual.ruins.visible=destroyed;
      visual.stockObstructed=!destroyed&&this.stockObstructsPlayer(visual);
      const recovered=visual.stockMaterials[0].opacity+(1-visual.stockMaterials[0].opacity)*(1-Math.exp(-Math.max(dt,.016)*10));
      const stockOpacity=visual.stockObstructed?.18:recovered>.995?1:recovered;
      for(const material of visual.stockMaterials){material.opacity=stockOpacity;material.depthWrite=stockOpacity===1;}
      visual.markerMaterial.color.set(destroyed?'#5c7067':active?'#ff9b58':COLORS[visual.index]);
      visual.markerMaterial.opacity=destroyed ? .12 : active ? .4+.12*Math.sin(this.clock*8) : .28;
      visual.bar.visible=active;visual.fill.scale.x=2.12*progress;visual.fill.position.x=-1.06+1.06*progress;
      if(this.game.camera)visual.bar.quaternion.copy(this.game.camera.quaternion);
      visual.roofObstructed=yard?.id===visual.definition.id||this.roofObstructsPlayer(visual);
      visual.roofHold=visual.roofObstructed?.18:Math.max(0,visual.roofHold-Math.max(dt,.016));
      const cutaway=visual.roofObstructed||visual.roofHold>0;
      visual.roof.visible=!destroyed&&!cutaway;
      visual.roofMaterial.opacity=cutaway?0:visual.roofMaterial.opacity+(1-visual.roofMaterial.opacity)*(1-Math.exp(-Math.max(dt,.016)*10));
      visual.roofMaterial.depthWrite=visual.roofMaterial.opacity>.9;
      visual.roofStem.visible=visual.roofLeaf.visible=visual.roof.visible&&visual.roofMaterial.opacity>.6;
      visual.cabin.position.x=active?Math.sin(this.clock*25)*.025:0;
      for(let i=0;i<8;i++){
        const angle=this.clock*(1.4+(i%3)*.2)+i*TAU/8,r=.3+(i%3)*.13;
        const x=Math.sin(angle)*r,y=1.05+(i%3)*.17+Math.sin(this.clock*4+i)*.08,z=Math.cos(angle)*r,d=this.dummy;
        d.position.set(x,y,z);d.scale.set(.09,.08,.13);d.rotation.set(0,angle,0);d.updateMatrix();visual.flyBodies.setMatrixAt(i,d.matrix);
        for(let side=0;side<2;side++){const sign=side===0?-1:1;d.position.set(x+Math.cos(angle)*sign*.105,y+.035,z-Math.sin(angle)*sign*.105);d.scale.set(.15,.016,.07);d.rotation.set(0,angle,Math.sin(this.clock*36+i)*.55*sign);d.updateMatrix();visual.flyWings.setMatrixAt(i*2+side,d.matrix);}
      }
      visual.flyBodies.instanceMatrix.needsUpdate=true;visual.flyWings.instanceMatrix.needsUpdate=true;
    }
    for(const grove of this.groves){
      const near=player&&Math.hypot(player.x-grove.definition.x,player.z-grove.definition.z)<grove.definition.radius+1.4;
      const opacity=near ? .23 : .94;grove.material.opacity+=(opacity-grove.material.opacity)*(1-Math.exp(-Math.max(dt,.016)*8));grove.material.depthWrite=grove.material.opacity>.9;
    }
  }

  dispose(){
    this.group.removeFromParent();
    for(const geometry of this.ownedGeometries)geometry.dispose();for(const geometry of Object.values(this.geometries))geometry.dispose();
    for(const material of this.ownedMaterials)material.dispose();for(const material of Object.values(this.materials))material.dispose();
    this.bases.clear();this.enclosures.clear();this.groves.length=0;
  }
}

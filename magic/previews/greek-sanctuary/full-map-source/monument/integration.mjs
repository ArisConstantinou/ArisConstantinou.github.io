import path from 'node:path';
export function monumentIntegration({dir,replace}){const mod=n=>path.join(dir,'monument',n).replaceAll('\\','/');return {name:'magic-connected-monument',transform(input,id){let code=input.replaceAll('\r\n','\n');const name=id.replaceAll('\\','/');
 if(name===path.join(dir,'architecture-plan.js').replaceAll('\\','/')){
  code=`import {monumentPieces,MONUMENT_REGIONS} from '${mod('plan.js')}';\n`+code;
  code=replace(code,'active=[...originals,...pieces];return active;','active=[...originals,...pieces,...monumentPieces(originals)];return active;','Temple precinct and connecting floor belong to the same physical floor union');
  code=replace(code,"return ROOM_ARCHITECTURE[id?.replace('-secret','')]", "return MONUMENT_REGIONS[id?.replace('-secret','')]||ROOM_ARCHITECTURE[id?.replace('-secret','')]",'Regional proportions include the Greek monument and Gothic undercroft');
  code=replace(code,'r.architectureWing&&(!roomId||r.id===roomId)','r.architectureWing&&!r.monument&&(!roomId||r.id===roomId)','The authored monument routes use their own circulation plan');
 }else if(name===path.join(dir,'navigation.js').replaceAll('\\','/')){
  code=replace(code,'!(stair&&b.stairId===f.stairId)&&blocked(b)','!(stair&&b.stairId===f.stairId)&&!(this.bodyProfile&&b.tag===\'fullmap-stair\'&&top(b)<=y+this.maxStep&&!inside(b,p.x,p.z))&&blocked(b)','Exact HEARTH clearance admits physically verified low risers ahead, without creating floor nodes inside the solid stair');
 }else if(name===path.join(dir,'floors.js').replaceAll('\\','/')){
  code=`import {installMonument} from '${mod('scene.js')}';\nimport {monumentReservations} from '${mod('plan.js')}';\n`+code;
  code=replace(code,'reservations.push(...architecturalWingReservations());','reservations.push(...architecturalWingReservations(),...monumentReservations());','Keep the Sanctum-to-temple puzzle and passage clear while furnishing');
  code=replace(code,'installRegionalArchitecture(world,architecture);','installRegionalArchitecture(world,architecture);\n installMonument(world,architecture);','Build the actual monument before installing whole-section occlusion');
 }else if(name.endsWith('/src/greek-environment.js')){
  code=`import {foldsAgainstWall,parkedGateLeaf} from '${mod('door-parking.js')}';\n`+code;
  code=`import {regionalGateIsGothic,regionalGateFrame,styleRegionalGate} from '${mod('regional-portals.js')}';\n`+code;
  code=`import {monumentPavement} from '${mod('scene.js')}';\nimport {monumentIsGothic} from '${mod('plan.js')}';\n`+code;
  code=replace(code,'const roomSurface=makeRoomSurface(room,',"if(room.id==='parthenon')return monumentPavement();\n const roomSurface=makeRoomSurface(room,",'Precinct uses existing photographic stone at physical scale');
  code=replace(code,"if(room.id==='bridge'||room.id==='courtyard')continue;","if(room.id==='bridge'||room.id==='courtyard'||monumentIsGothic(room.id))continue;",'Greek wall/floor emblems stay in the Greek region');
  code=replace(code,'spec={...spec,plates:spec.plates.map','const gothic=regionalGateIsGothic(spec);\n spec={...spec,foldFlat:foldsAgainstWall(spec.id),customFrame:spec.customFrame||gothic,plates:spec.plates.map','Gothic passages use a regional portal rather than the Greek column kit');
  code=replace(code,'frame=mergeStatic(frame);root.add(frame);','frame=gothic?regionalGateFrame(spec):mergeStatic(frame);root.add(frame);','Medieval moulded jambs retain exact existing doorway clearance');
  code=replace(code,"clone(spec.kind==='fire'?'wood-leaf':'bronze-leaf')","clone(spec.kind==='fire'||gothic?'wood-leaf':'bronze-leaf')",'Castle leaves reuse existing timber boards and straps');
  code=replace(code,'return {...spec,frame,doors,floorY,','styleRegionalGate(frame,doors,spec);\n return {...spec,regionalStyle:gothic?\'gothic\':\'greek\',frame,doors,floorY,','Castle timber hardware uses weathered iron rather than Greek bronze');
  code=replace(code,'const a=g.open*g.open*(3-2*g.open)*Math.PI/2;','const a=g.open*g.open*(3-2*g.open)*(g.foldFlat?Math.PI:Math.PI/2);','Library leaves fold flat so the opened door does not seal the staircase bypass');
  code=replace(code,'const lx=i===0?-g.width/2:g.width/2,lz=-length/2*(g.approachSign||1);\n     const b={x:g.x+Math.cos(r)*lx+Math.sin(r)*lz,y:(g.floorY??0)+g.height/2,z:g.z-Math.sin(r)*lx+Math.cos(r)*lz,w:r?length:.26,h:g.height,d:r?.26:length,tag:\'parked-\'+g.id};','const b=parkedGateLeaf(g,i);','Parked collision boxes match the full visible leaf angle and retain the original thickness');
 }else if(name.endsWith('/src/main.js')){
  code=`import {assemblyMesh} from '${mod('assembly-source.js')}';\n`+code;
  code=`import {populateMonument} from '${mod('scene.js')}';\n`+code;
  code=replace(code,'cameraOrbit.maxDistance=40;','cameraOrbit.maxDistance=110;','Monument may be viewed at its real scale without changing normal close framing');
  code=replace(code,'populateFullMap(worldMap,entities);','populateFullMap(worldMap,entities);populateMonument(worldMap,entities);','Sanctum encounter occupies the real temple floor');
  code=replace(code,'if(!nav.isFree(p.x,p.z)){p.x=e.spawn.x;p.z=e.spawn.z;}','if(!nav.isFree(p.x,p.z,p.y)){p.x=e.spawn.x;p.z=e.spawn.z;}','Boss recovery checks its actual support elevation');
  code=replace(code,'nav.isFree(next.x,next.z))','nav.isFree(next.x,next.z,p.y))','Boss walking and dive attacks check the actual raised floor',true);
  code=replace(code,'at=>goliathNav.isFree(at.x,at.z)&&entities.every','at=>goliathNav.isFree(at.x,at.z,p.y)&&entities.every','Goliath escort slots share its raised support');
  code=replace(code,'at=>visibleLine(p,at,1.0)&&(!hearth.occupied','at=>visibleLine(p,{...at,y:(at.y??0)+1.1},1.0)&&(!hearth.occupied','Assembly sight tests the standing volume above the support instead of intersecting the floor endpoint');
  code=replace(code,'const source=e.mesh.children.find(n=>n.isMesh),name=assemblyCreature.assemblyOrder[index]','const source=assemblyMesh(e.mesh),name=assemblyCreature.assemblyOrder[index]','Ritual transfers the actual nested GLTF stone mesh');
  code=replace(code,'e.assemblyRestore={part:name,geometry:source.geometry','e.assemblyRestore={part:name,parent:source.parent,localScale:source.scale.clone(),geometry:source.geometry','Ritual cancellation retains the original asset hierarchy and scale');
  code=replace(code,'source.geometry=part.mesh.geometry;source.material=part.mesh.material;','source.geometry=part.mesh.geometry;source.material=part.mesh.material;source.scale.copy(part.mesh.scale);','Transferred stone adopts the articulated part scale');
  code=replace(code,'e.mesh.add(part.mesh);part.mesh.position.copy(restore.localPosition);','(restore.parent||e.mesh).add(part.mesh);part.mesh.scale.copy(restore.localScale);part.mesh.position.copy(restore.localPosition);','Cancelled assembly restores the downloaded mesh without changing its proportions');
  code=replace(code,'let destination={x:pp.x+aimDirection.x*2.2,z:pp.z+aimDirection.z*2.2};','let destination={x:pp.x+aimDirection.x*2.2,y:playerFloorHeight(),z:pp.z+aimDirection.z*2.2};','Goliath follows the player on the actual floor');
  code=replace(code,'destination={x:pp.x+(t.x-pp.x)/d*Math.min(2.5,d*.55),z:pp.z+(t.z-pp.z)/d*Math.min(2.5,d*.55)}','destination={x:pp.x+(t.x-pp.x)/d*Math.min(2.5,d*.55),y:groundAt(worldMap,t),z:pp.z+(t.z-pp.z)/d*Math.min(2.5,d*.55)}','Goliath combat destination uses the encounter elevation');
  code=replace(code,'destination=slot||{x:p.x,z:p.z};','destination={...(slot||{x:p.x,z:p.z}),y:playerFloorHeight()};','HEARTH escort destination retains the same floor');
  code=replace(code,'e.creature.animate(dt,{attack:e.strikeTime','e.creature.animate(dt,{floorY,floorAt:p=>groundAt(worldMap,{...p,y:floorY+.25}),attack:e.strikeTime','Goliath feet sample the same physical support as the actor');
  code=replace(code,'shape:new CANNON.Box(new CANNON.Vec3(box.w/2,box.h/2,box.d/2))','shape:box.cylinderRadius?new CANNON.Cylinder(box.cylinderRadius,box.cylinderRadius,box.h,24):new CANNON.Box(new CANNON.Vec3(box.w/2,box.h/2,box.d/2))','Doric shafts use vertical physical cylinders, with separate capital boxes');
 }else if(name.endsWith('/src/stone-creature.js')){
  code=`import {assemblyMesh} from '${mod('assembly-source.js')}';\n`+code;
  code=replace(code,"const reference = createPropMesh('stone').mesh.children.find(child => child.isMesh);","const reference = assemblyMesh(createPropMesh('stone').mesh);",'Goliath and summoned minions read the actual nested downloaded stone geometry');
  code=replace(code,'function animate(dt,{attack=0,attackSide=1,protecting=false}={})','function animate(dt,{attack=0,attackSide=1,protecting=false,floorY=group.position.y,floorAt=null}={})','World-space planted feet use their actual floor elevation');
  code=replace(code,'p.y=.02;return p;','p.y=(floorAt?.(p)??floorY)+.02;return p;','Gait target rests on the local floor');
  code=replace(code,';to.y=.02;',';to.y=(floorAt?.(to)??floorY)+.02;','New stride lands on actual support');
  code=replace(code,'s.to.y=.02;','s.to.y=(floorAt?.(s.to)??floorY)+.02;','Moving stride retains physical support');
  code=replace(code,'const foot=gait.feet[i].clone();if(gait.swing?.index===i)','const foot=gait.feet[i].clone();foot.y=(floorAt?.(foot)??floorY)+.02;if(gait.swing?.index===i)','Feet remain above raised stone rather than the global zero plane');
 }else if(name.endsWith('/src/goliath-navigation.js')){
  code=replace(code,'const boxes=[];','const boxes=[],floorY=(from.y??1.67)-1.67;','Loose-prop navigation tests vertical overlap relative to Goliath support');
  code=replace(code,'a.lowerBound.y>3.3||a.upperBound.y<.1','a.lowerBound.y>floorY+3.3||a.upperBound.y<floorY+.1','Props on other floors do not block Goliath');
  code=replace(code,'const nodes=[{x:from.x,z:from.z},goal];','const nodes=[{x:from.x,y:from.y,z:from.z},goal];','Detours retain their starting support');
  code=replace(code,'const p={x:box.x+sx*(box.w/2+.06),z:box.z+sz*(box.d/2+.06)};','const p={x:box.x+sx*(box.w/2+.06),y:from.y,z:box.z+sz*(box.d/2+.06)};','Detour corners use the same raised-floor reference');
  code=replace(code,'nav.isFree(p.x,p.z)&&','nav.isFree(p.x,p.z,p.y)&&','Goliath detour clearance checks its actual elevation');
 }else if(name===path.join(dir,'statues.js').replaceAll('\\','/')){
  code=replace(code,'const r=world.zones.find(r=>r.name===room),prefab=',"const r=room==='sanctum'&&world.fullMap.monument?world.fullMap.monument.statueBay:world.zones.find(r=>r.name===room),floorY=r.floorY??0,prefab=",'Approved Artemision replica moves to the temple cella');
  code=replace(code,'b.y-b.h/2<3.4&&b.y+b.h/2>0','b.y-b.h/2<floorY+3.4&&b.y+b.h/2>floorY','Statue clearance uses the actual stylobate elevation');
  code=replace(code,'m.position.set(at.x,y,at.z);','m.position.set(at.x,floorY+y,at.z);','Statue plinth rests on the temple floor');
  code=replace(code,'y:.31,z:at.z','y:floorY+.31,z:at.z','Temple plinth collision height');
  code=replace(code,'floorY:.62','floorY:floorY+.62','Statue and metadata share raised support',true);
 }else return null;return {code,map:null};}};}

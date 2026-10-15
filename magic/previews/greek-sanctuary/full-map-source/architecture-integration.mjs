import path from 'node:path';
export function architectureIntegration({dir,replace}){
 const module=name=>path.join(dir,name).replaceAll('\\','/');
 return {name:'magic-regional-architecture',transform(input,id){
  const name=id.replaceAll('\\','/');let code=input.replaceAll('\r\n','\n');
  if(name.endsWith('/src/world.js')){
   code=`import {architecturePieces,architecturalHeight} from '${module('architecture-plan.js')}';\n`+code;
   code=replace(code,'let positionScale=1;','let positionScale=1;\n const architectureWings=architecturePieces([...existingRooms,...newRooms,...corridors,...secretAreas]).filter(r=>r.architectureWing);\n for(const r of architectureWings)floor(r.x,r.x+r.w,r.z,r.z+r.d,0x63616c,r.id);','Build physical floor patches for connected architectural wings');
   code=replace(code,'const h=low?Math.min(height,1.08):height;','const h=low?Math.min(height,1.08):architecturalHeight(room,height);','Regional wall heights match visible and colliding masonry');
   code=replace(code,"section,4.25,r.axis==='x',{room:r.parent});","section,4.25,r.axis==='x',{room:r.id});",'Secret returns retain measured clearance and their own height');
   code=replace(code,'zones: [...secretAreas.map(r=>({...r,secret:true})),...existingRooms,...newRooms]','zones: [...secretAreas.map(r=>({...r,secret:true})),...existingRooms,...newRooms,...architectureWings]','Register each actual wing footprint while preserving original zone lookup order');
   code=replace(code,'({name:r.id,label:r.label,secret:!!r.secret,','({name:r.id,label:r.label,secret:!!r.secret,architectureWing:!!r.architectureWing,','Mark additional semantic floor patches without changing original room lookups');
  }else if(name.endsWith('/src/castle-boundaries.js')){
   code=`import {architecturePieces} from '${module('architecture-plan.js')}';\n`+code;
   code=replace(code,'export function castleBoundaries(rectangles) {','export function castleBoundaries(rectangles) {\n rectangles=architecturePieces(rectangles);','All decoration, furniture and wall boundaries use the same compound floor union');
  }else if(name.endsWith('/src/greek-environment.js')){
   code=`import {regionalWall,regionalColumn} from '${module('regional-architecture.js')}';\n`+code;
   code=replace(code,"const {stone,edge,pigment}=palette(room);\n const g=new THREE.Group();g.name='Greek ashlar and continuous entablature';","if(regionalWall(root,x,z,length,height,alongX,room,floorY))return;\n const {stone,edge,pigment}=palette(room);\n const g=new THREE.Group();g.name='Greek ashlar and continuous entablature';",'Regional wall construction replaces identical Doric shells');
   code=replace(code,"if(!greekEnabled)return false;const g=clone('column');","if(!greekEnabled)return false;if(regionalColumn(root,x,z,h))return true;const g=clone('column');",'Gothic compound piers replace Greek columns inside the western castle');
   code=replace(code,"for(const e of boundary.filter(e=>e.room===room.id&&e.hi-e.lo>5.5)){","for(const e of []){",'Regional windows belong to their full wall cutaway section');
  }else if(name.endsWith('/src/greek-progression.js')){
   code=`import {pressureTransitReservations,architecturalSupplyAreas,architecturalSupplyRange} from '${module('architecture-plan.js')}';\n`+code;
   code=replace(code,'const hx=g.secret?.86:1.66','const areas=architecturalSupplyAreas(g,room),supplyRange=architecturalSupplyRange(g,areas);\n const hx=g.secret?.86:1.66','Supply planning uses the actual compound room footprint');
   code=replace(code,'distance>10||signed<1.8','distance>supplyRange||signed<1.8','Watchtower search covers its real wings while keeping supplies inside its room');
   code=replace(code,'for(let x=room.x+hx+.6;x<room.x+room.w-hx-.6;x+=.65)for(let z=room.z+hz+.6;z<room.z+room.d-hz-.6;z+=.65){','for(const area of areas)for(let x=area.x+hx+.6;x<area.x+area.w-hx-.6;x+=.65)for(let z=area.z+hz+.6;z<area.z+area.d-hz-.6;z+=.65){','Pressure stations may use real architectural wings');
   code=replace(code,'for(let x=room.x+1;x<room.x+room.w-1;x+=.65)for(let z=room.z+1;z<room.z+room.d-1;z+=.65){','for(const area of areas)for(let x=area.x+1;x<area.x+area.w-1;x+=.65)for(let z=area.z+1;z<area.z+area.d-1;z+=.65){','Indestructible weights stay on physical room patches near their station');
   code=replace(code,"candidates.sort((a,b)=>a.score-b.score+(g.approach==='watchtower'?((a.z>room.z+room.d-3.6?-20:0)-(b.z>room.z+room.d-3.6?-20:0)):0));",'candidates.sort((a,b)=>a.score-b.score);','Replace the former front-bay bias with explicit transit reservations');
   code=replace(code,'||!clear(x,z,hx,hz))continue;',"||!clear(x,z,hx,hz)||pressureTransitReservations(g).some(b=>Math.abs(x-b.x)<hx+b.w/2+.22&&Math.abs(z-b.z)<hz+b.d/2+.22))continue;",'Fixed trays preserve engine side routes while movable weights may start in those aisles');
  }else if(name.endsWith('/src/spawn-rules.js')){
   code=replace(code,"r.name!=='bridge'&&!r.secret","r.name!=='bridge'&&!r.secret&&!r.architectureWing",'Room wings do not multiply the original HEARTH spawn probabilities');
   code=replace(code,'return !!room&&(point.x<room.xMin-radius||point.x>room.xMax+radius||point.z<room.zMin-radius||point.z>room.zMax+radius);','return !!room&&zones.filter(r=>r.name===room.name).every(r=>point.x<r.xMin-radius||point.x>r.xMax+radius||point.z<r.zMin-radius||point.z>r.zMax+radius);','The entire compound starting courtyard retains enemy spawn protection');
  }else if(name===path.join(dir,'floors.js').replaceAll('\\','/')){
   code=`import {architecturalWingReservations} from '${module('architecture-plan.js')}';\n`+code;
   code=`import {regionalColumn,regionalReturn,installRegionalArchitecture} from '${module('regional-architecture.js')}';\n`+code;
   code=replace(code,'function column(g,x,z,h){','function column(g,x,z,h){\n if(regionalColumn(g,x,z,h)){solid(x,h/2,z,.7,h,.7,\'fullmap-support\');return;}','Upper-floor support piers follow the Gothic region without widening collisions');
   code=replace(code,'world.colliders.push(...reservations);',"reservations.push(...architecturalWingReservations());\n for(const s of LEVELS){const r=rooms.find(r=>r.id===s.id),front=r.z+r.d;reservations.push({x:r.x+r.w/2,y:1.95,z:(s.startZ+front)/2,w:r.w-1.2,h:3.9,d:Math.min(3.2,front-s.startZ-.5),tag:'architecture-stair-front-circulation'});}\n world.colliders.push(...reservations);",'Furniture preserves all twelve wing routes and all three stair entrance/dismounting areas');
   code=replace(code,"box(divider,xx,spec.floorY+2.3,gateZ,half,4.6,.65,stone);solid(xx,spec.floorY+2.3,gateZ,half,4.6,.65,'fullmap-door-return');","regionalReturn(divider,xx,gateZ,half,4.6,spec.id,spec.floorY);solid(xx,spec.floorY+2.3,gateZ,half,4.6,.8,'fullmap-door-return');",'Upper doorway returns share their regional masonry and matched physical depth');
   code=replace(code,'installFullMapOcclusion(world,architecture);','installRegionalArchitecture(world,architecture);\n installFullMapOcclusion(world,architecture);','Record regional layout and include integral wall decoration in cutaway installation');
  }else return null;
  return {code,map:null};
 }};
}

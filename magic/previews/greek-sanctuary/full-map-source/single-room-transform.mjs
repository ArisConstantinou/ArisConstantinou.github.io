// Diagnostic build transform only. It is never included in a normal release.
// Reuse the actual courtyard factories/materials; suppress other room creation.
const audit=[];
function replace(code,from,to,label){
 const count=code.split(from).length-1;if(count!==1)throw Error(`One-room ${label}: expected one anchor, got${count}`);
 audit.push(label);return code.replace(from,to);
}
export function createSingleRoomPlugin({combat=false}={}){return {name:'magic-single-courtyard-diagnostic',transform(input,id){
 const name=id.replaceAll('\\','/');let code=input.replaceAll('\r\n','\n');
 if(name.endsWith('/src/castle-layout.js')){
  code+='\nexistingRooms.splice(0,existingRooms.length,...existingRooms.filter(r=>r.id===\'courtyard\'));newRooms.length=0;corridors.length=0;secretAreas.length=0;\n';
 }else if(name.endsWith('/architecture-plan.js')){
  code=replace(code,'active=[...originals,...pieces,...monumentPieces(originals)];return active;','active=originals;return active;','one physical floor region');
 }else if(name.endsWith('/floors.js')){
  code=replace(code,'export function groundAt(world,p){','LEVELS.length=0;\nexport function groundAt(world,p){','no upper floors or stairs');
  code=replace(code,'installRegionalArchitecture(world,architecture);','/* other room architecture omitted */','no regional wings');
  code=replace(code,'installMonument(world,architecture);','/* other room monument omitted */','no monument');
 }else if(name.endsWith('/src/greek-progression.js')){
  code=replace(code,'const depth=depths();',"const depth=new Map([['courtyard',0]]);",'single room has no progression graph');
  code=replace(code,'export function greekGatePlan(engineRoom=null){',"export function greekGatePlan(engineRoom=null){return GREEK_GATES.filter(g=>g.id==='hall-pressure').map(g=>({...g,approach:'courtyard',plates:g.plates.map(p=>({...p})),homes:g.homes.map(p=>({...p})),approachSign:1}));\n",'retain courtyard door only');
 }else if(name.endsWith('/statues.js')){
  code=replace(code,'for(const id of IDS){',"for(const id of IDS.filter(id=>id==='caryatid')){",'load courtyard scan only');
  code=replace(code,"[['courtyard','caryatid'],['gallery','venus'],['sanctum','artemision']]","[['courtyard','caryatid']]",'no other statue bays');
 }else if(name.endsWith('/src/world.js')){
  code=replace(code,'function add(key, geometry, material, transform, color) {',"const oneRoomAt=(x,z)=>x>=-15.3&&x<=15.3&&z>=4.7&&z<=25.3;\n  function add(key, geometry, material, transform, color) {",'courtyard construction bounds');
  code=replace(code,'const cell = `${Math.floor(transform.elements[12] / 12)},${Math.floor(transform.elements[14] / 12)}`;',"if(!oneRoomAt(transform.elements[12],transform.elements[14]))return {key:'omitted',index:-1};\n    const cell = `${Math.floor(transform.elements[12] / 12)},${Math.floor(transform.elements[14] / 12)}`;",'omit outside instance cells before allocation');
  code=replace(code,"function box(x, y, z, w, h, d, color = 0x69717a, mat = 'masonry', ry = 0, key = mat) {","function box(x, y, z, w, h, d, color = 0x69717a, mat = 'masonry', ry = 0, key = mat) {\n    if(!oneRoomAt(x*positionScale,z*positionScale))return;",'omit outside boxes and wood records');
  code=replace(code,'function collider(x, y, z, w, h, d, tag) {','function collider(x, y, z, w, h, d, tag) {\n    if(!oneRoomAt(x*positionScale,z*positionScale))return;','omit outside rigid colliders');
  code=replace(code,'function atLayoutPoint(fn,x,z,args){','function atLayoutPoint(fn,x,z,args){if(!oneRoomAt(x*positionScale,z*positionScale))return;','omit outside architectural helpers');
  code=replace(code,'function prop(kind, x, z, rotation = 0) {','function prop(kind, x, z, rotation = 0) {\n    if(!oneRoomAt(x*positionScale,z*positionScale))return;','omit outside props');
  code=replace(code,'update(0, 0);',"for(const node of [...root.children])if(node===relic||node===ritual||node===exit)node.removeFromParent();\n  update(0, 0);",'remove off-room mission scenery');
 }else if(name.endsWith('/src/hearth-system.js')&&!combat){
  code="export function createHearthSystem(){const noop=()=>{},no=()=>false;return{reset:noop,propPosition:p=>p,interact:no,drive:noop,update:noop,sync:noop,near:no,dispose:noop,snapshot:()=>({state:'sleep',fuel:0,occupied:false}),exit:no,stomp:no,strikeDoor:no,engine:null,mounted:false,occupied:false,blocked:false,throw:()=>true};}";
 }else if(name.endsWith('/src/room-visibility.js')){
  if(code.includes('interiorBypass=true'))code=replace(code,'interiorBypass=true','interiorBypass=false','same original room shader for causal comparison');
 }else if(name.endsWith('/src/ui.js')){
  code=replace(code,'export function createUI(callbacks = {}) {','export function createUI(callbacks = {}) {\n  if(globalThis.__MAGIC_LOOP_AUDIT__)globalThis.__MAGIC_LOOP_AUDIT__.uiCalls++;','count UI construction');
  code=replace(code,'const listen = (node, type, handler, options = {}) => node.addEventListener(type, handler, { ...options, signal });',`const listen = (node,type,handler,options={})=>{
   const a=globalThis.__MAGIC_LOOP_AUDIT__,key=(node===window?'window':node===document?'document':node.id||node.tagName)+':'+type;
   if(a)a.registrations[key]=(a.registrations[key]||0)+1;
   return node.addEventListener(type,function(...args){if(a)a.events[key]=(a.events[key]||0)+1;return handler.apply(this,args);},{...options,signal});
  };`,'count event registration and invocation without changing dispatch');
 }else if(name.endsWith('/src/main.js')){
  code=`const loopAudit=globalThis.__MAGIC_LOOP_AUDIT__||={moduleLoads:0,bootCalls:0,uiCalls:0,frames:0,renders:0,duplicateFrames:0,lastFrame:null,registrations:{},events:{},errors:[]};loopAudit.moduleLoads++;
   window.addEventListener('error',e=>{if(loopAudit.errors.length<20)loopAudit.errors.push(String(e.message).slice(0,500));});
   window.addEventListener('unhandledrejection',e=>{if(loopAudit.errors.length<20)loopAudit.errors.push(String(e.reason?.message||e.reason).slice(0,500));});\n`+code;
  code=replace(code,'async function boot(){','async function boot(){loopAudit.bootCalls++;','count boot calls');
  code=replace(code,'function frame(now,manual=false){','function frame(now,manual=false){if(!manual){loopAudit.frames++;if(loopAudit.lastFrame===now)loopAudit.duplicateFrames++;loopAudit.lastFrame=now;}','count duplicate game callbacks per display timestamp');
  code=replace(code,'performanceTest?.beginRender(renderer);renderer.info.reset();','performanceTest?.beginRender(renderer);loopAudit.renders++;renderer.info.reset();','count actual main rendering submissions');
  code=replace(code,'populateMonument(worldMap,entities);','/* no off-room monument encounter */','skip absent monument encounter');
  if(!combat)code=replace(code,'greekPuzzles?.reset();hearth.reset();greekPuzzles?.configureForEngine(hearth.engine.location.room.name,hearth.engine.body.position);','greekPuzzles?.reset();hearth.reset();','no off-room engine spawn');
  code=replace(code,'await Promise.all([loadBossCharacters(),loadStoneMinion({camera})]);','/* no off-room boss/minion model downloads */','skip absent model families');
  if(!combat)code=replace(code,'await loadHearth();','/* HEARTH absent from this courtyard fixture */','skip absent engine model download');
  code=code.replaceAll("hearth.engine.heart.firing=false;","if(hearth.engine)hearth.engine.heart.firing=false;");
  code+='\nwindow.__MAGIC_ONE_ROOM__={room:"courtyard",diagnostic:true,construction:"one room; outside layout/cells/colliders/props suppressed at construction",audit:()=>({rooms:worldMap.rooms.map(r=>r.id),zones:worldMap.zones.map(r=>r.name),floors:worldMap.floors.length,colliders:worldMap.colliders.length,bodies:physics.bodies.length,entities:entities.length,quality,canvas:[renderer.domElement.width,renderer.domElement.height],interiorBypass:!!roomVisibility.snapshot().interiorBypass})};\n';
 }else return null;
 return {code,map:null};
}};}
export const singleRoomPlugin=createSingleRoomPlugin();
export const singleRoomAudit=()=>[...audit];

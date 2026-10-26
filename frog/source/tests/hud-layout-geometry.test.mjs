import test from 'node:test';
import assert from 'node:assert/strict';
import {computeHUDLayout,hudRectsOverlap,refreshHUDLayout,needsCompactHUD} from '../src/hud-layout.js';
const r=(left,top,width,height)=>({left,top,width,height,right:left+width,bottom:top+height});
const desktop=()=>({viewport:{width:1280,height:720},bounds:{player:r(16,16,222,184),navigation:r(16,208,222,35),minimap:r(1018,16,246,396),actionbar:r(300,616,680,88),selection:r(16,640,260,44),objective:r(523,16,234,52),mainHeader:r(16,166,560,78)},mainPanel:{open:true,expanded:true}});
const fixed=(data,layout)=>['player','navigation','minimap','tutorial','actionbar','selection','tactics'].map(key=>['selection','tactics'].includes(key)?layout[key]:data.bounds[key]).filter(Boolean);
function inside(rectangle,viewport){assert.ok(rectangle.left>=0&&rectangle.top>=0);assert.ok(rectangle.right<=viewport.width+.01);assert.ok(rectangle.bottom<=viewport.height+.01);assert.ok(rectangle.width>=0&&rectangle.height>=0);}
function clear(rectangle,obstacles,label){for(const obstacle of obstacles)assert.equal(hudRectsOverlap(rectangle,obstacle),false,`${label} overlaps ${JSON.stringify(obstacle)}`);}

test('left gameplay and pause panels start below actual population and out-of-flow navigation at both population heights',()=>{
  for(const extraHeight of [0,42])for(const pauseOpen of [false,true]){
    const data=desktop();data.bounds.player.height+=extraHeight;data.bounds.player.bottom+=extraHeight;data.bounds.navigation.top+=extraHeight;data.bounds.navigation.bottom+=extraHeight;data.pauseOpen=pauseOpen;
    const layout=computeHUDLayout(data);
    assert.ok(layout.left.top>=data.bounds.navigation.bottom+10);clear(layout.left,fixed(data,layout),'left panel');inside(layout.left,data.viewport);
  }
  const data=desktop();data.pauseOpen=true;data.bounds.tutorial=r(16,251,222,124);
  const layout=computeHUDLayout(data);assert.ok(layout.left.top>=385);clear(layout.left,fixed(data,layout),'pause before tutorial refresh');
});

test('right guide and U illustrations stay below minimap growth and above the measured eight-button action bar',()=>{
  for(const bossRows of [0,35,70]){
    const data=desktop();data.mainPanel={open:true,guide:true};data.conceptOpen=true;data.bounds.minimap.height+=bossRows;data.bounds.minimap.bottom+=bossRows;
    const layout=computeHUDLayout(data);assert.equal(layout.fullGuideOpen,true);assert.deepEqual(layout.concept,layout.right);
    assert.ok(layout.right.top>=data.bounds.minimap.bottom+10);clear(layout.right,fixed(data,layout),'right pane');inside(layout.right,data.viewport);
  }
});

test('construction, goals and left gameplay panels occupy disjoint rectangles with the real screen obstacles',()=>{
  const data=desktop();data.bounds.construction=r(485,90,310,226);
  const layout=computeHUDLayout(data);
  clear(layout.goal,fixed(data,layout),'goal');clear(layout.construction,[...fixed(data,layout),layout.goal],'construction');clear(layout.left,[...fixed(data,layout),layout.goal,layout.construction],'main panel');
  for(const item of [layout.goal,layout.construction,layout.left])inside(item,data.viewport);
  assert.ok(layout.left.height>250);
});

test('the readable objective and predator warning remain separate and clear of the minimap and action bar',()=>{
  const cases=[
    {...desktop(),bounds:{...desktop().bounds,objective:r(476,16,328,112),hunt:r(469,138,342,84),construction:r(485,232,310,130)}},
    {viewport:{width:390,height:844},bounds:{player:r(10,10,177,198),navigation:r(10,216,177,35),minimap:r(195,10,185,340),actionbar:r(17,704,356,124),objective:r(10,261,177,142),hunt:r(10,413,177,100)}}
  ];
  for(const data of cases){
    const layout=computeHUDLayout(data),obstacles=fixed(data,layout);
    assert.equal(layout.goal.height,data.bounds.objective.height);
    assert.equal(layout.hunt.height,data.bounds.hunt.height);
    assert.ok(layout.hunt.top>=layout.goal.bottom+10);
    clear(layout.goal,obstacles,'objective instruction');clear(layout.hunt,[...obstacles,layout.goal],'predator warning');
    for(const item of [layout.goal,layout.hunt])inside(item,data.viewport);
    if(layout.construction)clear(layout.construction,[...obstacles,layout.goal,layout.hunt],'construction');
  }
});

test('a short phone keeps the complete predator warning below the minimap when the squad fills the left footer',()=>{
  const data={viewport:{width:360,height:640},bounds:{player:r(10,10,160,190),navigation:r(10,208,160,32),minimap:r(180,10,170,300),actionbar:r(10,506,340,124),selection:r(10,570,250,50),objective:r(10,250,160,142),hunt:r(10,402,160,100)}};
  const layout=computeHUDLayout(data);
  assert.equal(layout.goal.height,142);assert.equal(layout.hunt.height,100,'reserve the actual visible warning, not a clipped placeholder');
  assert.ok(layout.hunt.left>=data.bounds.minimap.left);assert.ok(layout.hunt.top>=data.bounds.minimap.bottom+10);
  clear(layout.hunt,[...fixed(data,layout),layout.goal],'complete predator warning');inside(layout.hunt,data.viewport);
  assert.equal(layout.reservedRects.includes(layout.hunt),true);
});

test('phone panels use the actual two-row footer, and collapsed main header leaves the remaining slot for U',()=>{
  const data={viewport:{width:390,height:844},bounds:{player:r(10,10,177,198),navigation:r(10,216,177,35),minimap:r(195,10,185,340),actionbar:r(17,704,356,124),objective:r(10,261,177,50),construction:r(10,321,177,200),mainHeader:r(10,460,370,78)},mainPanel:{open:true,expanded:false},conceptOpen:true};
  const layout=computeHUDLayout(data);assert.equal(layout.stackedPanels,true);assert.equal(layout.left.height,78);assert.ok(layout.right.height>100);
  for(const [name,pane] of [['left',layout.left],['right',layout.right],['construction',layout.construction],['goal',layout.goal]]){inside(pane,data.viewport);clear(pane,fixed(data,layout),name);}
  clear(layout.right,[layout.left,layout.construction,layout.goal],'concept');clear(layout.left,[layout.construction,layout.goal],'collapsed main');
  const paused=computeHUDLayout({...data,mainPanel:{open:false},pauseOpen:true,pauseExpanded:false,bounds:{...data.bounds,pauseHeader:r(10,460,370,84)}});assert.equal(paused.left.height,84);assert.ok(paused.right.top>=paused.left.bottom+10);
});

test('narrow desktop and short landscape docks remain inside the viewport without covering status, minimap or nav',()=>{
  const cases=[
    {viewport:{width:768,height:1024},bounds:{player:r(12,12,200,184),navigation:r(12,204,200,35),minimap:r(538,12,218,366),actionbar:r(44,924,680,88),selection:r(12,872,220,44),tactics:r(12,824,220,40),objective:r(258,12,234,52),construction:r(222,74,306,226)},mainPanel:{open:true}},
    {viewport:{width:960,height:540},bounds:{player:r(10,10,200,170),navigation:r(10,188,200,32),minimap:r(790,10,160,278),actionbar:r(140,442,680,88),objective:r(363,10,234,50)},pauseOpen:true},
    {viewport:{width:360,height:640},bounds:{player:r(10,10,160,190),navigation:r(10,208,160,32),minimap:r(180,10,170,300),actionbar:r(10,506,340,124),objective:r(10,250,160,50),construction:r(10,310,160,200)},mainPanel:{open:true}}
  ];
  for(const data of cases){const layout=computeHUDLayout(data);inside(layout.left,data.viewport);clear(layout.left,fixed(data,layout),'responsive main');if(layout.construction){clear(layout.left,[layout.construction,layout.goal],'responsive stack');assert.ok(layout.construction.height>=34);}}
});

test('mobile More drawer scrolls in the measured clear slot and temporarily releases underlying panel reservations',()=>{
  const data={viewport:{width:390,height:844},bounds:{player:r(10,10,177,198),navigation:r(10,216,177,35),minimap:r(195,10,185,340),actionbar:r(17,704,356,124),objective:r(10,261,177,50),construction:r(10,321,177,200),actionDrawer:r(10,300,370,400)},mainPanel:{open:true},pauseOpen:true,actionDrawerOpen:true};
  const layout=computeHUDLayout(data);
  assert.equal(layout.hudDrawerOpen,true);assert.ok(layout.actionDrawer.height>100&&layout.actionDrawer.height<400);
  assert.equal(layout.actionDrawer.bottom,data.bounds.actionbar.top-10);
  inside(layout.actionDrawer,data.viewport);clear(layout.actionDrawer,[...fixed(data,layout),layout.goal,layout.construction],'More drawer');
  assert.equal(layout.reservedRects.includes(layout.actionDrawer),true);
  assert.equal(layout.reservedRects.includes(layout.left),false);
});

test('layout adapter reserves real header/population rectangles, hides duplicate guide through CSS and survives DOM-free fixtures',()=>{
  assert.equal(refreshHUDLayout({root:{querySelector:()=>null,style:{setProperty(){}}},refs:{}}),null);
  const classes=new Set(),styles={},data=desktop();
  const element=b=>({hidden:false,scrollHeight:b.height,getBoundingClientRect:()=>b,closest:()=>null});
  const elements={'.fg-player':element(data.bounds.player),'.fg-knowledge-tools':element(data.bounds.navigation),'.fg-location':element(data.bounds.minimap),'.fg-primary-actions':element(data.bounds.actionbar)};
  const root={querySelector:s=>elements[s]||null,getBoundingClientRect:()=>r(0,0,1280,720),style:{setProperty:(key,value)=>styles[key]=value},classList:{toggle:(key,on)=>on?classes.add(key):classes.delete(key),add:key=>classes.add(key)}};
  const layout=refreshHUDLayout({root,refs:{panelLayer:{hidden:false},pause:{hidden:true},ending:{hidden:true},guideHint:{hidden:false}},panel:'help',menu:null,conceptPanelsOpen:true});
  assert.equal(classes.has('fg-full-guide-open'),true);assert.equal(classes.has('fg-layout-ready'),true);assert.equal(styles['--hud-bar-height'],'88px');assert.equal(styles['--hud-right-panel-y'],'422px');assert.ok(layout.reservedRects.length>=5);
});

test('populated squad and tactics avoid the wider action row at desktop, landscape and phone widths',()=>{
  const cases=[
    {viewport:{width:1200,height:720},bounds:{player:r(16,16,222,184),navigation:r(16,208,222,35),minimap:r(938,16,246,396),actionbar:r(260,616,680,88),selection:r(16,652,260,52),tactics:r(16,602,260,42)}},
    {viewport:{width:844,height:390},bounds:{player:r(8,8,164,126),navigation:r(8,142,164,29),minimap:r(676,8,160,240),actionbar:r(154,316,536,66),selection:r(8,332,205,50),tactics:r(8,260,225,44)}},
    {viewport:{width:390,height:844},bounds:{player:r(10,10,177,198),navigation:r(10,216,177,35),minimap:r(195,10,185,340),actionbar:r(17,704,356,124),selection:r(10,646,250,50),tactics:r(10,603,230,44)}}
  ];
  for(const data of cases){
    assert.equal(hudRectsOverlap(data.bounds.selection,data.bounds.actionbar),data.viewport.width!==390,'fixture captures the old shared-bottom collision');
    const layout=computeHUDLayout({...data,mainPanel:{open:true}});
    clear(layout.selection,[data.bounds.actionbar],'squad');clear(layout.tactics,[data.bounds.actionbar,layout.selection],'tactics');
    clear(layout.left,[layout.selection,layout.tactics,data.bounds.actionbar],'open main panel');
    for(const name of ['selection','tactics']){
      inside(layout[name],data.viewport);assert.equal(layout[name].width,data.bounds[name].width);assert.equal(layout[name].height,data.bounds[name].height);
      assert.equal(layout.reservedRects.includes(layout[name]),true,'recruitment cards reserve the actual moved dock');
    }
    if(data.viewport.width===844){assert.ok(layout.tactics.left>layout.selection.right);assert.ok(layout.left.height>=50,'one dock row leaves a usable main-panel header on landscape screens');}
  }
});

test('squad docks return beside the bar after widening the window and do not drift across layout passes',()=>{
  const narrow={viewport:{width:1200,height:720},bounds:{player:r(16,16,222,184),actionbar:r(260,616,680,88),selection:r(16,652,260,52),tactics:r(16,602,260,42)}};
  const stacked=computeHUDLayout(narrow);assert.ok(stacked.selection.bottom<narrow.bounds.actionbar.top);
  const wide={viewport:{width:1600,height:900},bounds:{...narrow.bounds,actionbar:r(460,796,680,88),selection:stacked.selection,tactics:stacked.tactics}};
  const first=computeHUDLayout(wide),second=computeHUDLayout({...wide,bounds:{...wide.bounds,selection:first.selection,tactics:first.tactics}});
  assert.equal(first.selection.bottom,wide.bounds.actionbar.bottom);assert.deepEqual(first.selection,second.selection);assert.deepEqual(first.tactics,second.tactics);
  clear(first.selection,[wide.bounds.actionbar],'wide squad');clear(first.tactics,[wide.bounds.actionbar,first.selection],'wide tactics');
});

test('an expanded objective list scrolls while keeping a visible construction progress header',()=>{
  const data={viewport:{width:390,height:844},bounds:{player:r(10,10,177,198),navigation:r(10,216,177,35),minimap:r(195,10,185,340),actionbar:r(17,704,356,124),selection:r(10,646,250,50),objective:r(10,261,177,50),objectiveDetails:r(10,321,370,600),construction:r(10,321,177,226),constructionHeader:r(10,321,177,38)},objectiveDetailsOpen:true};
  const layout=computeHUDLayout(data);
  assert.ok(layout.objectiveDetails.height>100&&layout.objectiveDetails.height<600);
  assert.ok(layout.construction.height>=38,'construction remains readable while the objective drawer scrolls');
  clear(layout.objectiveDetails,[...fixed(data,layout),layout.construction],'objective details');clear(layout.construction,[...fixed(data,layout),layout.goal],'construction');
});

test('a construction widget clipped to zero height is measured from its contents and recovers after resize',()=>{
  const styles={},element=(bounds,scrollHeight=bounds.height)=>({hidden:false,scrollHeight,getBoundingClientRect:()=>bounds,closest:()=>null});
  const data=desktop(),elements={'.fg-player':element(data.bounds.player),'.fg-knowledge-tools':element(data.bounds.navigation),'.fg-location':element(data.bounds.minimap),'.fg-primary-actions':element(data.bounds.actionbar)};
  const root={querySelector:s=>elements[s]||null,getBoundingClientRect:()=>r(0,0,1280,720),style:{setProperty:(key,value)=>styles[key]=value},classList:{toggle(){},add(){}}};
  const layout=refreshHUDLayout({root,refs:{constructionHUD:element(r(485,310,310,0),34),constructionToggle:element(r(485,310,310,34)),constructionBody:{scrollHeight:192},panelLayer:{hidden:true}},constructionExpanded:true});
  assert.equal(layout.construction.height,226);assert.equal(styles['--hud-construction-height'],'226px');
});

test('readable 1440p HUD reserves larger text containers at every supported interface scale',()=>{
  for(const uiScale of [.85,1,1.4]){
    const s=uiScale,width=2560,height=1440,playerWidth=294*s,mapWidth=320*s,barWidth=950*s;
    const data={uiScale,viewport:{width,height},bounds:{
      player:r(20,20,playerWidth,225*s),navigation:r(20,253*s,playerWidth,46*s),tutorial:r(20,309*s,playerWidth,115*s),
      minimap:r(width-20-mapWidth,20,mapWidth,590*s),actionbar:r((width-barWidth)/2,height-20-116*s,barWidth,116*s),
      selection:r(20,height-20-72*s,330*s,72*s),tactics:r(20,height-108*s,300*s,58*s),
      objective:r(1060,20,440*s,170*s),hunt:r(1065,200,430*s,120*s),
      construction:r(1085,330,390*s,250*s),constructionHeader:r(1085,330,390*s,48*s)
    },mainPanel:{open:true,expanded:true},conceptOpen:true};
    const layout=computeHUDLayout(data),obstacles=fixed(data,layout);
    assert.equal(layout.goal.width,440*s);assert.equal(layout.hunt.width,430*s);assert.equal(layout.construction.width,390*s);
    assert.equal(layout.left.width,640*s);assert.equal(layout.right.width,380*s);
    for(const [name,item] of Object.entries({goal:layout.goal,hunt:layout.hunt,construction:layout.construction,left:layout.left,right:layout.right})){
      inside(item,data.viewport);clear(item,obstacles,`readable ${name} at ${s}`);
    }
    clear(layout.hunt,[layout.goal],'readable warning');clear(layout.construction,[layout.goal,layout.hunt],'readable progress');
    clear(layout.left,[layout.goal,layout.hunt,layout.construction,layout.right],'readable main panel');
    clear(layout.right,[layout.goal,layout.hunt,layout.construction],'readable concept panel');
  }
});

test('large readable text keeps More and objective details above the footer while preserving real construction header height',()=>{
  const base={uiScale:1.4,viewport:{width:1366,height:900},bounds:{
    player:r(20,20,412,285),navigation:r(20,313,412,60),tutorial:r(20,383,412,132),
    minimap:r(898,20,448,510),actionbar:r(20,716,1326,164),selection:r(20,810,300,70),
    objective:r(452,20,426,220),hunt:r(452,250,426,125),construction:r(452,385,426,280),constructionHeader:r(452,385,426,68),
    objectiveDetails:r(452,250,426,500),actionDrawer:r(347,500,672,430)
  }};
  for(const mode of ['objectives','actions']){
    const data={...base,objectiveDetailsOpen:mode==='objectives',actionDrawerOpen:mode==='actions'};
    const layout=computeHUDLayout(data),drawer=mode==='objectives'?layout.objectiveDetails:layout.actionDrawer;
    inside(drawer,data.viewport);clear(drawer,[...fixed(data,layout),layout.goal,layout.hunt,layout.construction],mode);
    assert.ok(drawer.height>0,`${mode} remains reachable`);
    assert.ok(layout.construction.height>=68,'the larger progress header is never clipped to the old 34px budget');
  }
});

test('readable scale changes reserve larger widths without accumulating coordinate drift',()=>{
  const data={...desktop(),viewport:{width:1920,height:1080},bounds:{...desktop().bounds,player:r(20,20,294,225),navigation:r(20,253,294,46),minimap:r(1580,20,320,510),actionbar:r(485,944,950,116),objective:r(740,20,440,170)}};
  const normal=computeHUDLayout({...data,uiScale:1}),large=computeHUDLayout({...data,uiScale:1.4});
  assert.equal(normal.goal.width,440);assert.equal(large.goal.width,616);
  const again=computeHUDLayout({...data,uiScale:1,bounds:{...data.bounds,objective:large.goal,selection:large.selection}});
  assert.deepEqual(again.goal,normal.goal);assert.deepEqual(again.selection,normal.selection);
  const legacy=computeHUDLayout(data);assert.equal(legacy.goal.width,328,'non-game callers keep their existing geometry contract');
});

test('browser-measured 1280 by 720 at 140 percent leaves a real roster body beside every essential HUD item',()=>{
  // Measured from the live GameUI fixture with roster, recruitment condition and
  // a heron warning. The compact class retains 140% type and removes duplicate docks.
  const data={uiScale:1.4,viewport:{width:1280,height:720},bounds:{
    player:r(12,12,364,188.59),navigation:r(13,207.59,362,45.36),minimap:r(960,12,308,298.80),
    actionbar:r(12,598,1256,110),objective:r(386,12,564,162.42),hunt:r(386,184.42,564,111.36),
    mainHeader:r(12,305.78,896,64)
  },mainPanel:{open:true,expanded:true}};
  assert.equal(needsCompactHUD(data.viewport,1.4),true);
  assert.equal(needsCompactHUD({width:2560,height:1440},1.4),false,'1440p retains its full layout');
  const layout=computeHUDLayout(data),obstacles=fixed(data,layout);
  assert.equal(layout.goal.height,162.42,'reserve the full painted objective instead of clipping its layout box');
  assert.equal(layout.hunt.height,111.36);
  assert.ok(layout.left.height>=280,'the open roster has usable height, not just a zero-height anchor');
  assert.ok(layout.left.height-data.bounds.mainHeader.height>=210,'large text still has a scrollable body below its visible header');
  for(const [name,item] of Object.entries({goal:layout.goal,hunt:layout.hunt,left:layout.left})){inside(item,data.viewport);clear(item,obstacles,name);}
  clear(layout.goal,[layout.hunt,layout.left],'objective');clear(layout.hunt,[layout.left],'warning');
  assert.ok(layout.left.bottom<=data.bounds.actionbar.top-10);
});

test('a shallow wide drawer moves into a clear column instead of becoming unreachable below the viewport',()=>{
  const data={uiScale:1.4,viewport:{width:1280,height:800},bounds:{
    player:r(12,12,412,290),navigation:r(12,310,412,49),minimap:r(820,12,448,500),
    actionbar:r(12,678,1256,110),objective:r(12,369,412,160),hunt:r(12,539,412,110),mainHeader:r(12,659,798,80)
  },mainPanel:{open:true,expanded:true}};
  const layout=computeHUDLayout(data);
  assert.ok(layout.left.height>=200);assert.ok(layout.left.width>=300);
  assert.ok(layout.left.left>data.bounds.player.right,'the free centre column remains a usable option');
  inside(layout.left,data.viewport);clear(layout.left,[...fixed(data,layout),layout.goal,layout.hunt],'fallback drawer');
});

test('compact composition is applied before DOM measurements and restored after widening to 1440p',()=>{
  const classes=new Set(),measurements=[],styles={};let width=1280,height=720;
  const bounds={'.fg-player':r(12,12,364,188.59),'.fg-knowledge-tools':r(13,207.59,362,45.36),'.fg-location':r(960,12,308,298.80),'.fg-primary-actions':r(12,598,1256,110)};
  const root={querySelector:selector=>bounds[selector]?{hidden:false,closest:()=>null,getBoundingClientRect(){measurements.push(classes.has('fg-short-hud'));return bounds[selector];}}:null,getBoundingClientRect:()=>r(0,0,width,height),style:{setProperty:(key,value)=>styles[key]=value},classList:{toggle:(key,on)=>on?classes.add(key):classes.delete(key),add:key=>classes.add(key)}};
  const ui={root,settings:{uiScale:1.4},refs:{panelLayer:{hidden:false}},panel:'roster',menu:null};
  refreshHUDLayout(ui);assert.ok(measurements.every(Boolean),'CSS changes must take effect before the first rectangle read');assert.equal(classes.has('fg-main-open'),true);
  width=2560;height=1440;measurements.length=0;ui.panel=null;
  refreshHUDLayout(ui);assert.ok(measurements.every(value=>!value));assert.equal(classes.has('fg-main-open'),false);
});

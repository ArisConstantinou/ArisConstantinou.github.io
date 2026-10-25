import test from 'node:test';
import assert from 'node:assert/strict';
import {computeHUDLayout,hudRectsOverlap,refreshHUDLayout} from '../src/hud-layout.js';
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

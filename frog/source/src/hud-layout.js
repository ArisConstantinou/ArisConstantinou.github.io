/** Measured HUD layout. Pixel sizes describe panel widths; positions come from live bounds. */
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const number=(n,fallback=0)=>Number.isFinite(Number(n))?Number(n):fallback;
const rect=value=>{
  if(!value)return null;
  const x=number(value.x??value.left),y=number(value.y??value.top);
  const width=number(value.width,number(value.right)-x),height=number(value.height,number(value.bottom)-y);
  return width>0&&height>0?{x,y,left:x,top:y,width,height,right:x+width,bottom:y+height}:null;
};
const box=(x,y,width,height)=>({x,y,left:x,top:y,width:Math.max(0,width),height:Math.max(0,height),right:x+Math.max(0,width),bottom:y+Math.max(0,height)});
const crossesX=(a,b,gap=0)=>a.left<b.right+gap&&a.right>b.left-gap;
export const hudRectsOverlap=(a,b)=>Boolean(a&&b&&a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top);
export const needsCompactHUD=(viewport={},uiScale=1)=>number(viewport.width)>600&&number(viewport.height)/clamp(number(uiScale,1),.85,1.4)<690;

// A wide drawer may have no room below every intersecting HUD card. In that
// case use an actual free column with enough height for its header and body.
function freePanelSlot({left,right,top,bottom,width,preferredWidth,minHeight,obstacles}){
  const edges=[left,right,...obstacles.flatMap(o=>[o.left-10,o.right+10])].filter(x=>x>=left&&x<=right);
  const candidates=[];
  for(const x of edges){
    for(const end of edges){
      const w=Math.min(preferredWidth,end-x);if(w<Math.min(300,width))continue;
      const column=box(x,top,w,bottom-top),blocked=obstacles.filter(o=>crossesX(column,o,5)).sort((a,b)=>a.top-b.top);
      let y=top;
      for(const obstacle of [...blocked,{top:bottom+10,bottom:bottom+10}]){
        const available=Math.min(bottom,obstacle.top-10)-y;
        if(available>=minHeight)candidates.push(box(x,y,w,available));
        y=Math.max(y,obstacle.bottom+10);if(y>=bottom)break;
      }
    }
  }
  candidates.sort((a,b)=>(b.width*b.height-b.left*12)-(a.width*a.height-a.left*12));
  return candidates[0]||null;
}

function bottomDock(source,bottom,obstacles,gap){
  if(!source)return null;
  let placed=box(source.left,bottom-source.height,source.width,source.height);
  for(const obstacle of obstacles.filter(Boolean).sort((a,b)=>b.top-a.top)){
    if(crossesX(placed,obstacle,gap)&&placed.bottom>obstacle.top-gap&&placed.top<obstacle.bottom+gap){
      placed=box(source.left,obstacle.top-gap-source.height,source.width,source.height);
    }
  }
  return placed;
}

export function computeHUDLayout({viewport={},bounds={},mainPanel={},pauseOpen=false,pauseExpanded=true,endingOpen=false,conceptOpen=false,objectiveDetailsOpen=false,actionDrawerOpen=false,uiScale,gap=10,insets={}}={}){
  const width=Math.max(1,number(viewport.width,1)),height=Math.max(1,number(viewport.height,1));
  // Callers without a UI preference retain their existing layout contract.
  // The game passes its saved scale and reserves real space for larger type.
  const readable=uiScale!==undefined,scale=readable?clamp(number(uiScale,1),.85,1.4):1;
  const metrics=readable?{goal:440,hunt:430,details:480,construction:390,main:640,pause:460,ending:500,guide:520,concept:380,drawer:480,constructionHeader:48,constructionCompact:160}:{goal:328,hunt:342,details:376,construction:310,main:560,pause:390,ending:440,guide:430,concept:300,drawer:380,constructionHeader:34,constructionCompact:125};
  const preferred=name=>metrics[name]*scale;
  const b=Object.fromEntries(Object.entries(bounds).map(([key,value])=>[key,rect(value)]));
  const left=clamp(number(insets.left,b.player?.left??gap),0,width/3),right=clamp(number(insets.right,b.minimap?width-b.minimap.right:gap),0,width/3),top=clamp(number(insets.top,Math.min(b.player?.top??gap,b.minimap?.top??gap)),0,height/3),bottom=clamp(number(insets.bottom,gap),0,height/3);
  // Re-anchor on every pass so docks return beside the bar when space becomes available.
  // Their measured sizes, including populated squad portraits, remain unchanged.
  const footerBottom=Math.min(height-bottom,b.actionbar?.bottom??height-bottom);
  b.selection=bottomDock(b.selection,footerBottom,[b.actionbar],gap);
  if(b.tactics){
    const source=box(b.selection?.left??left,b.tactics.top,b.tactics.width,b.tactics.height);
    b.tactics=bottomDock(source,b.selection?b.selection.top-gap:footerBottom,[b.actionbar,b.selection],gap);
    // A shared row above the bar avoids spending two rows on a short landscape screen.
    if(b.selection&&b.actionbar&&b.selection.bottom<=b.actionbar.top-gap){
      const beside=box(b.selection.right+gap,b.selection.bottom-source.height,source.width,source.height);
      const obstacles=[b.player,b.navigation,b.minimap,b.tutorial,b.actionbar].filter(Boolean);
      if(beside.right<=width-right&&beside.top>=top&&obstacles.every(o=>!crossesX(beside,o,gap)||beside.bottom<=o.top-gap||beside.top>=o.bottom+gap))b.tactics=beside;
    }
  }
  const usableWidth=Math.max(1,width-left-right),upper=[b.player,b.navigation,b.minimap,b.tutorial].filter(Boolean),lower=[b.actionbar,b.selection,b.tactics].filter(Boolean);
  const span=(x,w)=>box(x,0,w,height);
  const topAt=(x,w,obstacles=upper)=>Math.max(top,...obstacles.filter(o=>crossesX(span(x,w),o,gap/2)).map(o=>o.bottom+gap));
  const bottomAt=(x,w)=>Math.min(height-bottom,...lower.filter(o=>crossesX(span(x,w),o,gap/2)).map(o=>o.top-gap));
  const leftHUDRight=Math.max(left,...[b.player,b.navigation,b.tutorial].filter(Boolean).map(o=>o.right));
  const rightHUDLeft=b.minimap?.left??width-right;
  const corridorLeft=leftHUDRight+gap,corridorRight=rightHUDLeft-gap,corridorWidth=Math.max(0,corridorRight-corridorLeft);
  const centerAvailable=corridorWidth>=(readable?Math.min(300*scale,usableWidth):180);
  const reservedRects=[...upper,...lower];
  const hudDrawerOpen=Boolean(actionDrawerOpen||objectiveDetailsOpen);
  const result={viewport:{width,height},reservedRects,selection:b.selection,tactics:b.tactics,hudDrawerOpen,fullGuideOpen:Boolean(mainPanel.open&&mainPanel.guide&&!hudDrawerOpen),constructionCompact:false,stackedPanels:false};

  const centerWidth=w=>centerAvailable?Math.min(w,corridorWidth):Math.min(w,Math.max(130,leftHUDRight-left),usableWidth);
  const centerX=w=>centerAvailable?corridorLeft+(corridorWidth-w)/2:left;
  const goalSource=b.objective||b.hunt,goalWidth=centerWidth(preferred(b.objective?'goal':'hunt')),goalX=centerX(goalWidth);
  const goalTop=centerAvailable?top:topAt(goalX,goalWidth);
  // The objective is not a scroll container: reserve the height it really paints.
  const goal=box(goalX,goalTop,goalWidth,goalSource?.height||0);
  result.goal=goal;if(goalSource&&goal.height)reservedRects.push(goal);

  let centerObstacles=goalSource&&goal.height?[goal]:[];
  if(b.hunt){
    let huntWidth=centerWidth(preferred('hunt')),huntX=centerX(huntWidth);
    let huntTop=b.objective?Math.max(goal.bottom+gap,topAt(huntX,huntWidth)):goal.top;
    // Short phones can fit the warning beside the objective, below the map.
    // Its natural height must stay intact: the health/response UI cannot scroll.
    if(b.objective&&b.minimap&&huntTop+b.hunt.height>bottomAt(huntX,huntWidth)){
      const alternateWidth=Math.min(b.minimap.width,usableWidth),alternateX=width-right-alternateWidth;
      const alternateTop=topAt(alternateX,alternateWidth),alternate=box(alternateX,alternateTop,alternateWidth,b.hunt.height);
      if(alternate.bottom<=bottomAt(alternateX,alternateWidth)&&![...upper,...lower,goal].some(o=>hudRectsOverlap(alternate,o))){
        huntWidth=alternateWidth;huntX=alternateX;huntTop=alternateTop;
      }
    }
    result.hunt=b.objective?box(huntX,huntTop,huntWidth,b.hunt.height):goal;
    if(b.objective&&result.hunt.height){centerObstacles.push(result.hunt);reservedRects.push(result.hunt);}
  }
  if(objectiveDetailsOpen&&b.objective){
    const detailWidth=Math.min(preferred('details'),centerAvailable?corridorWidth:usableWidth),detailX=centerAvailable?corridorLeft+(corridorWidth-detailWidth)/2:left;
    const detailTop=Math.max(goal.bottom+gap,(result.hunt?.bottom||0)+gap,topAt(detailX,detailWidth));
    const constructionWidth=centerWidth(preferred('construction')),constructionX=centerX(constructionWidth);
    const constructionReserve=b.construction&&crossesX(span(detailX,detailWidth),span(constructionX,constructionWidth),gap)?Math.min(b.construction.height,b.constructionHeader?.height||preferred('constructionHeader'))+gap:0;
    const detailHeight=Math.min(b.objectiveDetails?.height||220,Math.max(0,bottomAt(detailX,detailWidth)-detailTop-constructionReserve));
    result.objectiveDetails=box(detailX,detailTop,detailWidth,detailHeight);
    centerObstacles.push(result.objectiveDetails);reservedRects.push(result.objectiveDetails);
  }

  const showLeft=Boolean(!hudDrawerOpen&&(pauseOpen||endingOpen||(mainPanel.open&&!mainPanel.guide)));
  const showRight=Boolean(result.fullGuideOpen||conceptOpen);
  const leftExpanded=pauseOpen?pauseExpanded:mainPanel.expanded!==false;
  const leftHeaderHeight=(pauseOpen?b.pauseHeader:b.mainHeader)?.height||80;
  const leftPreferred=preferred(pauseOpen?'pause':endingOpen?'ending':'main'),rightPreferred=preferred(result.fullGuideOpen?'guide':'concept');
  let leftWidth=Math.min(leftPreferred,usableWidth),rightWidth=Math.min(rightPreferred,usableWidth);
  // A left panel can be wider than the status card without entering the minimap column.
  if(usableWidth>=600&&b.minimap)leftWidth=Math.min(leftWidth,Math.max(300,rightHUDLeft-gap-left));
  if(showLeft&&showRight){
    if(usableWidth>=590){leftWidth=Math.min(leftWidth,usableWidth-gap-Math.min(rightWidth,300));rightWidth=Math.min(rightWidth,usableWidth-gap-leftWidth);}
    else {result.stackedPanels=true;leftWidth=usableWidth;rightWidth=usableWidth;}
  }
  const leftX=left,rightX=width-right-rightWidth;
  const leftBaseTop=topAt(leftX,leftWidth),rightBaseTop=topAt(rightX,rightWidth);
  const leftBottom=bottomAt(leftX,leftWidth),rightBottom=bottomAt(rightX,rightWidth);
  const drawerRight=showRight&&usableWidth>=590?rightX-gap:width-right;
  const drawerWidth=Math.min(preferred('drawer'),Math.max(1,drawerRight-left));
  const drawerCenter=b.actionbar?(b.actionbar.left+b.actionbar.right)/2:width/2;
  const drawerX=clamp(drawerCenter-drawerWidth/2,left,drawerRight-drawerWidth);
  const drawerBaseTop=topAt(drawerX,drawerWidth),drawerBottom=bottomAt(drawerX,drawerWidth);

  if(b.construction){
    const constructionWidth=centerWidth(preferred('construction')),constructionX=centerX(constructionWidth);
    const constructionTop=Math.max(topAt(constructionX,constructionWidth),...centerObstacles.filter(o=>crossesX(span(constructionX,constructionWidth),o,gap)).map(o=>o.bottom+gap));
    let constructionBottom=bottomAt(constructionX,constructionWidth);
    const primarySpan=actionDrawerOpen?span(drawerX,drawerWidth):showLeft?span(leftX,leftWidth):showRight?span(rightX,rightWidth):null;
    const primaryTop=actionDrawerOpen?drawerBaseTop:showLeft?leftBaseTop:rightBaseTop,primaryBottom=actionDrawerOpen?drawerBottom:showLeft?leftBottom:rightBottom;
    if(primarySpan&&crossesX(span(constructionX,constructionWidth),primarySpan,gap)){
      const remaining=Math.max(0,primaryBottom-Math.max(primaryTop,constructionTop));
      const primaryReserve=Math.min(230,Math.max(95,remaining*.58));
      const minimum=Math.min(b.constructionHeader?.height||preferred('constructionHeader'),b.construction.height,Math.max(0,constructionBottom-constructionTop));
      constructionBottom=Math.max(constructionTop+minimum,Math.min(constructionBottom,primaryBottom-primaryReserve-gap));
    }
    const constructionHeight=Math.min(b.construction.height,Math.max(0,constructionBottom-constructionTop));
    result.construction=box(constructionX,constructionTop,constructionWidth,constructionHeight);
    result.constructionCompact=constructionHeight<preferred('constructionCompact');
    if(constructionHeight){centerObstacles.push(result.construction);reservedRects.push(result.construction);}
  }
  if(actionDrawerOpen){
    const drawerTop=topAt(drawerX,drawerWidth,[...upper,...centerObstacles]);
    const drawerHeight=Math.min(b.actionDrawer?.height||340,Math.max(0,drawerBottom-drawerTop));
    result.actionDrawer=box(drawerX,Math.max(drawerTop,drawerBottom-drawerHeight),drawerWidth,drawerHeight);
    if(drawerHeight){centerObstacles.push(result.actionDrawer);reservedRects.push(result.actionDrawer);}
  }
  const allUpper=[...upper,...centerObstacles];
  const leftTop=topAt(leftX,leftWidth,allUpper),rightTop=topAt(rightX,rightWidth,allUpper);
  const leftSlot=box(leftX,leftTop,leftWidth,Math.max(0,leftBottom-leftTop));
  const rightSlot=box(rightX,rightTop,rightWidth,Math.max(0,rightBottom-rightTop));
  if(result.stackedPanels){
    const sharedTop=Math.max(leftTop,rightTop),sharedBottom=Math.min(leftBottom,rightBottom),space=Math.max(0,sharedBottom-sharedTop-gap);
    const leftHeight=leftExpanded?space*.56:Math.min(leftHeaderHeight,space);
    result.left=box(leftX,sharedTop,leftWidth,leftHeight);
    result.right=box(rightX,sharedTop+leftHeight+gap,rightWidth,Math.max(0,space-leftHeight));
  }else {result.left=leftSlot;result.right=rightSlot;}
  if(readable&&width>600&&showLeft&&!result.stackedPanels){
    const minHeight=leftHeaderHeight+(leftExpanded?120:0);
    if(result.left.height<minHeight){
      const alternate=freePanelSlot({left,right:width-right,top,bottom:height-bottom,width:usableWidth,preferredWidth:leftWidth,minHeight,obstacles:[...upper,...lower,...centerObstacles,...(showRight&&result.right.height?[result.right]:[])]});
      if(alternate)result.left=alternate;
    }
  }
  // The compact illustration and full book share one right slot, never two overlapping cards.
  result.concept=result.right;
  if(showLeft&&result.left.height)reservedRects.push(result.left);
  if(showRight&&result.right.height)reservedRects.push(result.right);
  return result;
}

function visibleBounds(element,{naturalHeight=false}={}){
  if(!element||element.hidden||element.closest?.('[hidden]'))return null;
  const value=element.getBoundingClientRect?.();if(!value||value.width<=0||(!naturalHeight&&value.height<=0))return null;
  const result=rect(value)||(naturalHeight?rect({left:value.left,top:value.top,width:value.width,height:element.scrollHeight}):null);if(naturalHeight&&result)result.height=Math.max(result.height,number(element.scrollHeight,result.height));
  if(result)result.bottom=result.y+result.height;return result;
}
function setPlacement(root,name,placement){
  if(!placement)return;
  for(const [property,value] of Object.entries({x:placement.x,y:placement.y,width:placement.width,height:placement.height}))root.style.setProperty(`--hud-${name}-${property}`,`${Math.max(0,Math.round(value*100)/100)}px`);
}
/** DOM adapter. It writes layout styles/classes only; all game and disclosure state stays owned by GameUI. */
export function refreshHUDLayout(ui){
  const root=ui?.root;if(!root?.querySelector||!root?.style?.setProperty)return null;
  const rootBounds=root.getBoundingClientRect?.(),width=number(globalThis.innerWidth,rootBounds?.width),height=number(globalThis.innerHeight,rootBounds?.height);
  if(!(width>0&&height>0))return null;
  const refs=ui.refs||{},find=selector=>root.querySelector(selector),uiScale=ui.settings?.uiScale;
  // Apply the compact composition before measuring. Text keeps the chosen scale;
  // portraits, duplicated summaries and spacing yield room to the live drawer.
  const compact=uiScale!==undefined&&needsCompactHUD({width,height},uiScale);
  root.classList.toggle('fg-short-hud',compact);
  root.classList.toggle('fg-main-open',Boolean(ui.panel||ui.menu==='pause'||ui.menu==='ending'||ui.hudDisclosure));
  const constructionLimit=uiScale===undefined?350:460*clamp(number(uiScale,1),.85,1.4);
  const actionbar=visibleBounds(find('.fg-primary-actions'));
  if(actionbar)root.style.setProperty('--hud-bar-height',`${Math.ceil(actionbar.height)}px`);
  const bounds={player:visibleBounds(find('.fg-player')),navigation:visibleBounds(find('.fg-knowledge-tools')),minimap:visibleBounds(find('.fg-location')),tutorial:visibleBounds(refs.practicalTutorial),actionbar,selection:visibleBounds(refs.selectionDock),tactics:visibleBounds(refs.tacticsDock),objective:visibleBounds(refs.objectiveBox),hunt:visibleBounds(refs.hunt),objectiveDetails:visibleBounds(refs.objectiveDetails,{naturalHeight:true}),actionDrawer:visibleBounds(refs.actionDrawer,{naturalHeight:true}),construction:visibleBounds(refs.constructionHUD,{naturalHeight:true}),constructionHeader:visibleBounds(refs.constructionToggle),mainHeader:visibleBounds(refs.panel?.querySelector?.('.fg-panel-head')),pauseHeader:visibleBounds(refs.pausePanel?.querySelector?.('.fg-pause-heading'))};
  if(bounds.minimap)root.style.setProperty('--hud-map-bottom',`${Math.ceil(bounds.minimap.bottom)}px`);
  if(bounds.construction){
    const heading=visibleBounds(refs.constructionToggle),content=refs.constructionBody;
    bounds.construction.height=ui.constructionExpanded===false?(heading?.height||bounds.construction.height):Math.min(constructionLimit,(heading?.height||34)+number(content?.scrollHeight));
    bounds.construction.bottom=bounds.construction.y+bounds.construction.height;
  }
  const hudDrawerOpen=Boolean(ui.hudDisclosure);
  const mainPanel={open:Boolean(ui.panel&&!refs.panelLayer?.hidden&&!hudDrawerOpen),guide:['guide','help'].includes(ui.panel),expanded:ui.panelExpanded!==false};
  const options={viewport:{width,height},bounds,mainPanel,uiScale,pauseOpen:Boolean(ui.menu==='pause'&&!refs.pause?.hidden&&!hudDrawerOpen),pauseExpanded:ui.pauseExpanded!==false,endingOpen:Boolean(ui.menu==='ending'&&!refs.ending?.hidden&&!hudDrawerOpen),conceptOpen:Boolean(ui.conceptPanelsOpen&&!refs.guideHint?.hidden&&!mainPanel.guide&&!(hudDrawerOpen&&width<590)),objectiveDetailsOpen:ui.hudDisclosure==='objectives',actionDrawerOpen:ui.hudDisclosure==='actions'};
  let layout=computeHUDLayout(options);
  // Width changes can wrap labels. Measure once more synchronously before placing later panels.
  setPlacement(root,'goal',layout.goal);setPlacement(root,'hunt',layout.hunt);setPlacement(root,'construction',layout.construction);setPlacement(root,'action-drawer',layout.actionDrawer);
  const resizedGoal=visibleBounds(refs.objectiveBox),resizedHunt=visibleBounds(refs.hunt);
  if(resizedGoal&&bounds.objective)bounds.objective.height=resizedGoal.height;
  if(resizedHunt&&bounds.hunt)bounds.hunt.height=resizedHunt.height;
  if(bounds.construction&&ui.constructionExpanded!==false)bounds.construction.height=Math.min(constructionLimit,(visibleBounds(refs.constructionToggle)?.height||34)+number(refs.constructionBody?.scrollHeight));
  const resizedDrawer=visibleBounds(refs.actionDrawer,{naturalHeight:true});if(resizedDrawer)bounds.actionDrawer=resizedDrawer;
  layout=computeHUDLayout(options);
  setPlacement(root,'selection',layout.selection);setPlacement(root,'tactics',layout.tactics);setPlacement(root,'left-panel',layout.left);setPlacement(root,'right-panel',layout.right);setPlacement(root,'goal',layout.goal);setPlacement(root,'hunt',layout.hunt);setPlacement(root,'goal-details',layout.objectiveDetails);setPlacement(root,'construction',layout.construction);setPlacement(root,'concept',layout.concept);setPlacement(root,'action-drawer',layout.actionDrawer);
  root.classList.toggle('fg-full-guide-open',layout.fullGuideOpen);root.classList.toggle('fg-hud-drawer-open',layout.hudDrawerOpen);root.classList.toggle('fg-layout-construction-compact',layout.constructionCompact);root.classList.toggle('fg-layout-stacked-panels',layout.stackedPanels);root.classList.add('fg-layout-ready');
  return layout;
}

"""Offline browser integration: xvfb-run -a python tests/browser.py.
Uses Chromium's real WebGL renderer and real emulated touch events. RAF is
controlled by the harness; advance() steps the same production update loop.
No network, mocked renderer, or generated/concept screenshots.
"""
import json, os
from pathlib import Path
from playwright.sync_api import sync_playwright
from bundle import bundle
OUT=Path(os.environ.get('BUBBLE_TEST_OUTPUT',str(Path(__file__).resolve().parent/'artifacts')))
OUT.mkdir(parents=True,exist_ok=True)
results=[]
def check(name, condition, details=None):
    results.append({'name':name,'passed':bool(condition),'details':details})
    print(('PASS ' if condition else 'FAIL ')+name+((' '+str(details)) if not condition else ''),flush=True)
def state(page):return page.evaluate('BUBBLE_TEST.state')
def advance(page,t=0.02):page.evaluate('(t)=>BUBBLE_TEST.advance(t)',t)
def boot(browser, size, mobile=False):
    page=browser.new_page(viewport={'width':size[0],'height':size[1]},has_touch=mobile,is_mobile=mobile,device_scale_factor=1)
    errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    html=bundle(test=True).replace('<head>','<head><script>window.requestAnimationFrame=()=>0;</script>',1)
    page.set_content(html,wait_until='load')
    page.wait_for_function('window.BUBBLE_TEST !== undefined',timeout=20000)
    page.select_option('#quality','low')
    page.click('#start')
    page.evaluate('BUBBLE_TEST.setAI(false);BUBBLE_TEST.invincible(true);BUBBLE_TEST.advance(.02)')
    return page,errors

def buttons(page, ids):
    return page.evaluate('''ids=>ids.map(id=>{const e=document.getElementById(id),r=e.getBoundingClientRect(),p=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return {id,x:r.x,y:r.y,w:r.width,h:r.height,ok:r.width>0&&r.x>=0&&r.y>=0&&r.right<=innerWidth+1&&r.bottom<=innerHeight+1&&(p===e||e.contains(p))}})''',ids)
def center(page,id):
    b=page.locator('#'+id).bounding_box();return [b['x']+b['width']/2,b['y']+b['height']/2]
def touch(cdp,typ,points):
    cdp.send('Input.dispatchTouchEvent',{'type':typ,'touchPoints':[{'x':p[0],'y':p[1],'id':i,'radiusX':4,'radiusY':4,'force':1}for i,p in enumerate(points)]})

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM','/usr/bin/chromium'),headless=False,args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
    page,errors=boot(browser,(1280,800))
    check('Desktop WebGL boot / version / 10 bots',state(page)['version']=='0.3.0' and len(state(page)['bots'])==10 and not errors)
    ids=['inventoryBtn','forgeBtn','anchorBtn','tetherModeBtn','pullBtn','slamBtn','cutBtn']
    rects=buttons(page,ids);check('Desktop ability and RPG buttons reachable',all(x['ok']for x in rects),rects)
    page.screenshot(path=str(OUT/'desktop.png'))
    page.keyboard.down('KeyW');advance(page,.5);page.keyboard.up('KeyW')
    check('Desktop WASD moves actual actor',state(page)['player']['p'][2]<22)
    page.keyboard.press('Space');advance(page,.15);s=state(page)
    check('Desktop jump uses vertical velocity',s['player']['p'][1]>.5,s['player']['p'])
    check('Top-down wall cutaway remains stable while airborne',abs(s['cutHeight']-1.48)<.001,s['cutHeight'])
    page.evaluate('BUBBLE_TEST.position([7,1,-13.85]);BUBBLE_TEST.setPlayer({grounded:false,vy:-1,lastJump:-10});BUBBLE_TEST.jump()')
    check('Airborne wall jump applies outward impulse',state(page)['player']['gumV'][2]>0)
    page.evaluate('BUBBLE_TEST.position([0,0,24]);BUBBLE_TEST.gum.reset()')
    sling=page.evaluate('''()=>{const t=BUBBLE_TEST,p=t.state.player.p;t.gum.select({kind:'surface',p:[-4,.06,21]},[0,0,-1]);t.gum.select({kind:'surface',p:[4,.06,21]},[0,0,-1]);return{before:p,after:t.state.player.p,vy:t.state.player.vy}}''')
    check('Live SLING starts at current position, not midpoint',sling['before']==sling['after'] and sling['vy']>0,sling)
    advance(page,.3);check('Live SLING produces flight',state(page)['player']['p'][1]>1 and state(page)['player']['p'][2]<24)
    page.screenshot(path=str(OUT/'slingshot.png'))
    page.evaluate('BUBBLE_TEST.gum.cancel();BUBBLE_TEST.position([0,0,18]);BUBBLE_TEST.setBot(0,[-4,0,13]);BUBBLE_TEST.setBot(1,[4,0,13]);BUBBLE_TEST.gum.setMode("link");BUBBLE_TEST.gum.select({kind:"actor",id:0},[0,0,-1]);BUBBLE_TEST.gum.select({kind:"actor",id:1},[0,0,-1])')
    advance(page,.7);s=state(page)
    check('Live enemy-to-enemy LINK closes their separation',abs(s['bots'][0]['p'][0]-s['bots'][1]['p'][0])<7)
    page.evaluate('BUBBLE_TEST.gum.cancel();for(let i=1;i<10;i++)BUBBLE_TEST.setBot(i,[25,0,-25]);BUBBLE_TEST.setBot(0,[0,0,12],{gumV:[0,0,0],grounded:true,vy:0});BUBBLE_TEST.setAuto(true);BUBBLE_TEST.pull()')
    advance(page,.7);s=state(page)
    check('Live PULL brings targeted enemy toward player',s['bots'][0]['p'][2]>12 and len(s['gum']['links'])>0,s['bots'][0]['p'])
    page.evaluate('BUBBLE_TEST.slam()');advance(page,1);s=state(page)
    check('Live SLAM landing makes enemy dizzy',s['bots'][0]['state']in['dizzy','pinning'],s['bots'][0]['state'])
    page.click('#inventoryBtn');check('Inventory pauses combat',state(page)['paused'])
    page.evaluate('BUBBLE_TEST.grantXP(100)');check('LV2 updates visible XP and skill points',page.locator('#levelValue').inner_text()=='2' and page.locator('#skillPointsPanel').inner_text()=='1')
    page.click('#upgrade-vitality');check('Skill button spends point and increases maximum HP',state(page)['progress']['skills']['vitality']==1 and state(page)['player']['maxHp']==110)
    page.evaluate('''()=>{const p=BUBBLE_TEST.progress;for(const[id,type,power]of[['feed','armor',8],['worn','charm',15]]){p.pickup({id,type,power,name:type==='armor'?'Knight Shell':'Gumheart',rarity:0,upgrades:0,locked:false,damage:0,armor:type==='armor'?power:0,stretch:type==='charm'?power:0});}p.p.gold=100;p.p.dust=10;BUBBLE_TEST.equip('worn');}''')
    check('Forge excludes equipped sacrifice',page.locator('#forgeFeed option[value="worn"]').count()==0)
    page.select_option('#forgeFeed','feed');check('Forge previews the exact lost item and cost','Knight Shell' in page.locator('#forgePreview').inner_text() and '10 Gold' in page.locator('#forgePreview').inner_text())
    page.click('#forgeBtnPanel');s=state(page)
    check('Forge button consumes selected feed only',not any(x['id']=='feed'for x in s['progress']['items']) and any(x['id']=='worn'for x in s['progress']['items']) and s['progress']['gold']==90)
    page.check('#autoForgeToggle');check('Auto Forge UI records opt-in',state(page)['progress']['autoForge'])
    page.screenshot(path=str(OUT/'inventory.png'))
    page.click('#closeInventory');check('Inventory closes without unpausing incorrectly',not state(page)['paused'])
    page.evaluate('BUBBLE_TEST.captureAll();BUBBLE_TEST.advance(.1)');check('Ten captures spawn ARACHNE-09',state(page)['boss']is not None)
    page.evaluate('for(let i=0;i<150&&BUBBLE_TEST.state.boss.state!=="captured";i++)BUBBLE_TEST.bossHit();BUBBLE_TEST.advance(3)')
    s=state(page)
    check('Victory screen receives guaranteed boss loot',s['ended'] and sum(x['rarity']==4 for x in s['progress']['items'])>=3 and page.locator('#nextTier').is_visible())
    lv=s['progress']['level'];page.click('#nextTier');s=state(page)
    check('Next siege keeps character and increases difficulty',s['progress']['tier']==2 and s['progress']['level']==lv and s['bots'][0]['hp']>100 and not s['ended'])
    check('Desktop has no runtime page errors',not errors,errors);page.close()

    for size,label in [((430,932),'portrait'),((932,430),'landscape'),((375,667),'small-portrait')]:
        page,errors=boot(browser,size,True);cdp=page.context.new_cdp_session(page)
        check(label+' uses touch layout',page.evaluate('matchMedia("(pointer:coarse)").matches'))
        rects=buttons(page,ids+['jumpBtn','fireBtn','reloadBtn','cameraBtn','autoAimBtn','moveStick','aimStick'])
        check(label+' all controls reachable',all(x['ok']for x in rects),rects)
        check(label+' LV/XP/Gold/Dust visible',page.evaluate('''()=>{const r=document.getElementById('rpgStrip').getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+1&&r.top>=0&&r.bottom<innerHeight}'''))
        page.screenshot(path=str(OUT/(label+'.png')))
        if label=='portrait':
            pt=center(page,'moveStick');touch(cdp,'touchStart',[pt]);touch(cdp,'touchMove',[[pt[0],pt[1]-30]]);advance(page,.5);touch(cdp,'touchEnd',[])
            check('Touch movement joystick moves actor',state(page)['player']['p'][2]<23)
            page.touchscreen.tap(*center(page,'jumpBtn'));advance(page,.12);check('Touch JUMP button works and preserves cutaway',state(page)['player']['p'][1]>.4 and abs(state(page)['cutHeight']-1.48)<.001)
            page.evaluate('BUBBLE_TEST.position([0,0,18]);for(let i=0;i<10;i++)BUBBLE_TEST.setBot(i,[25,0,-25],{state:"captured"});BUBBLE_TEST.setBot(0,[0,0,13],{state:"active"});BUBBLE_TEST.setBot(1,[0,0,23],{state:"active"});BUBBLE_TEST.setAuto(true)')
            check('AUTO chooses nearest visible enemy',state(page)['aimTarget']==0,state(page)['aimTarget'])
            page.evaluate('BUBBLE_TEST.setBot(0,[0,0,6]);BUBBLE_TEST.advance(1.3)')
            check('AUTO retargets closer opponent behind',state(page)['aimTarget']==1,state(page)['aimTarget'])
            pt=center(page,'aimStick');touch(cdp,'touchStart',[pt]);touch(cdp,'touchMove',[[pt[0],pt[1]-38]]);advance(page,.1)
            check('Manual touch aim overrides AUTO selection',state(page)['aimTarget']==0,state(page)['aimTarget']);touch(cdp,'touchEnd',[])
            page.touchscreen.tap(*center(page,'tetherModeBtn'));advance(page)
            check('Mobile MODE switches SLING to LINK',state(page)['gum']['mode']=='link' and page.locator('#anchorLabel').inner_text()=='LINK')
            page.touchscreen.tap(*center(page,'anchorBtn'));advance(page)
            check('Mobile LINK action chooses actual target',state(page)['gum']['pending']is not None)
            page.touchscreen.tap(*center(page,'cutBtn'));check('Mobile CUT clears pending anchor',state(page)['gum']['pending']is None)
            page.touchscreen.tap(*center(page,'cameraBtn'));advance(page);check('Mobile camera switches to FPS',state(page)['mode']=='fp')
            yaw=state(page)['player']['yaw'];pt=center(page,'aimStick');touch(cdp,'touchStart',[pt]);touch(cdp,'touchMove',[[pt[0]+30,pt[1]]]);advance(page,.3);touch(cdp,'touchEnd',[])
            check('FPS right stick turns camera continuously',abs(state(page)['player']['yaw']-yaw)>.2)
            ammo=state(page)['ammo'];pt=center(page,'fireBtn');touch(cdp,'touchStart',[pt]);advance(page,.5);check('Touch held FIRE expends ammunition',state(page)['ammo']<ammo)
            page.evaluate('BUBBLE_TEST.openInventory()');touch(cdp,'touchEnd',[]);before=state(page)['ammo'];advance(page,.5)
            check('Inventory opening stops held touch fire',state(page)['ammo']==before and state(page)['paused'])
            page.screenshot(path=str(OUT/'mobile-inventory.png'))
            page.touchscreen.tap(*center(page,'closeInventory'));advance(page,.5)
            check('Inventory close does not leave stuck fire',state(page)['ammo']==before and not state(page)['paused'])
        page.touchscreen.tap(*center(page,'forgeBtn'))
        check(label+' Forge opens and scrolls into view',page.locator('#inventory').is_visible() and page.locator('#forgeBtnPanel').is_visible())
        check(label+' has no runtime errors',not errors,errors)
        page.close()
    browser.close()
report={'version':'0.3.0','environment':'Chromium + SwiftShader in Xvfb; offline exact-source bundle; deterministic RAF; emulated touch, NOT physical iPhone/Safari','passed':sum(x['passed']for x in results),'total':len(results),'checks':results}
(OUT/'browser-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({k:report[k]for k in ['passed','total']}),flush=True)
raise SystemExit(0 if report['passed']==report['total']else 1)

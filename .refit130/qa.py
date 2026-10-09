import asyncio,json,shutil,threading,http.server,functools,traceback
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('.qa130');OUT.mkdir(exist_ok=True)
report={'version':'1.3.0','backend':'Real WebGL2 / Chromium / SwiftShader','checks':[],'errors':[],'console':[]}
def check(name,cond,detail=None):
    report['checks'].append({'name':name,'pass':bool(cond),'detail':detail})
    assert cond, name+' '+str(detail)
class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',8765),functools.partial(Handler,directory=str(Path.cwd())))
threading.Thread(target=server.serve_forever,daemon=True).start()
async def run():
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True,args=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage'])
        page=await browser.new_page(viewport={'width':430,'height':744},device_scale_factor=1,is_mobile=True,has_touch=True,service_workers='block')
        page.on('pageerror',lambda e:report['errors'].append(str(e)))
        page.on('console',lambda m:report['console'].append(m.text) if m.type=='error' else None)
        await page.add_init_script("localStorage.setItem('lc-sound','false');localStorage.setItem('lc-quality','1');localStorage.setItem('lc-motion','true');")
        async def state(): return await page.evaluate('__lastCall.getState()')
        async def rect(s): return await page.locator(s).bounding_box()
        try:
            await page.goto('http://127.0.0.1:8765/captain/',wait_until='domcontentloaded')
            await page.wait_for_function('window.__lastCall?.getState().ready',timeout=120000)
            await page.locator('#start').click()
            await page.wait_for_function('__lastCall.getState().time>.3',timeout=30000)
            s=await state();report['initial']=s
            check('Game advances after Start',s['playing'] and s['time']>.3,s['time'])
            check('Real renderer issues geometry draw calls',s['drawCalls']>0 and s['triangles']>0,{'drawCalls':s['drawCalls'],'triangles':s['triangles']})
            check('World-anchored cabin arrows visible',s['helm']['wheelVisible'],s['helm'])
            await page.screenshot(path=str(OUT/'bridge-portrait.png'))
            cdp=await page.context.new_cdp_session(page)
            async def touch(kind,points):
                await cdp.send('Input.dispatchTouchEvent',{'type':kind,'touchPoints':[{'id':i,'x':x,'y':y} for i,x,y in points]})
            r=await rect('.lc-starboard');x,y=r['x']+r['width']/2,r['y']+r['height']/2
            await touch('touchStart',[(1,x,y)])
            await page.wait_for_function('__lastCall.getState().input.turn>.6',timeout=15000)
            check('Holding arrow continuously turns',(await state())['helm']['steering'])
            await touch('touchMove',[(1,x-120,y)])
            await page.wait_for_function('__lastCall.getState().input.turn<0')
            check('Same held finger slides into opposite rudder',(await state())['input']['turn']<0)
            r=await rect('.lc-lever');lx=r['x']+r['width']/2;cy=r['y']+r['height']/2
            await touch('touchStart',[(1,x-120,y),(2,lx,r['y']+18)])
            await page.wait_for_timeout(250)
            s=await state();check('Independent wheel and engine touches',s['helm']['steering'] and s['helm']['engine'] and s['input']['throttle']>.8,s['helm'])
            await touch('touchMove',[(1,x-120,y),(2,lx,cy)])
            await page.wait_for_timeout(200)
            check('Engine centre is neutral',(await state())['input']['throttle']==0)
            await touch('touchMove',[(1,x-120,y),(2,lx,r['y']+r['height']-16)])
            await page.wait_for_timeout(200)
            check('Lower half commands astern',(await state())['input']['throttle']<-.3)
            await touch('touchEnd',[])
            await page.wait_for_function('__lastCall.getState().input.turn===0')
            s=await state();check('Release centres helm but retains engine demand',s['input']['turn']==0 and s['input']['throttle']<-.3,s['input'])
            await page.locator('.lc-neutral').click();check('Neutral button', (await state())['input']['throttle']==0)
            for mode,name in [(2,'deck'),(0,'outside')]:
                await page.locator('#camera').click()
                await page.wait_for_function(f'__lastCall.getState().helm.mode==={mode}')
                check(name+' uses compact joystick',await page.locator('.lc-pad').is_visible())
                await page.screenshot(path=str(OUT/(name+'-portrait.png')))
            r=await rect('.lc-pad-track');px,py=r['x']+r['width']-10,r['y']+r['height']/2
            await touch('touchStart',[(1,px,py)])
            await page.wait_for_function('__lastCall.getState().input.turn>.5')
            await touch('touchCancel',[])
            await page.wait_for_function('__lastCall.getState().input.turn===0')
            check('Exterior joystick cancellation resets steering',not (await state())['helm']['steering'])
            for w,h in [(390,664),(430,744),(932,430),(1280,720)]:
                await page.set_viewport_size({'width':w,'height':h});await page.wait_for_timeout(400)
                boxes=await page.evaluate("[...document.querySelectorAll('.lc-pad-track,.lc-lever,.lc-dock')].filter(e=>e.getClientRects().length).map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}})")
                check(f'Controls fit {w}x{h}',all(b['x']>=-1 and b['y']>=-1 and b['x']+b['w']<=w+1 and b['y']+b['h']<=h+1 for b in boxes),boxes)
                check(f'No large console {w}x{h}',await page.locator('.controls-bottom').evaluate("e=>getComputedStyle(e).display==='none'"))
            await page.set_viewport_size({'width':932,'height':430})
            await page.locator('#camera').click();await page.wait_for_timeout(500)
            await page.screenshot(path=str(OUT/'bridge-landscape.png'))
            await page.set_viewport_size({'width':430,'height':744});await page.wait_for_timeout(400)
            check('Return to cabin restores wheel arrows',(await state())['helm']['wheelVisible'])
            await page.locator('#drink').click()
            await page.wait_for_function('__lastCall.getState().dialogue.length>0',timeout=30000)
            s=await state();check('One staged dialogue, no default robotic narration',s['intox']>10 and not s['narration'] and len(s['dialogue'])==1,s['dialogue'])
            await page.screenshot(path=str(OUT/'captain-dialogue.png'))
            await page.locator('#pause').click();check('Pause releases controls',(await state())['paused'] and not (await state())['helm']['steering'])
            await page.locator('#restart').click();await page.wait_for_timeout(250)
            s=await state();check('Restart resets input',s['intox']==0 and not s['dialogue'] and s['input']['throttle']==.55,s['input'])
            check('No uncaught JS exceptions',not report['errors'],report['errors'])
            check('No shader compilation errors',not any('Shader Error' in x or 'VALIDATE_STATUS' in x for x in report['console']),report['console'])
            report['final']=await state();report['success']=True
        except Exception:
            report['success']=False;report['traceback']=traceback.format_exc()
            await page.screenshot(path=str(OUT/'failure.png'))
            raise
        finally:
            (OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
            await browser.close()
try: asyncio.run(run())
finally: server.shutdown()

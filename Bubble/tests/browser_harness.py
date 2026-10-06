from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]
ORDER=['engine','world','actors','progression','material4','knights4','ui4','ring4','controls4','aim4','twinfire4','siege4']
def load(page,test=True):
 html=(ROOT/'index.html').read_text()
 html=re.sub(r'<link rel="stylesheet"[^>]+>',lambda m: '<style>'+ (ROOT/re.search(r'href="([^"?]+)',m.group()).group(1)).read_text()+'</style>',html)
 html=re.sub(r'<script type="module".*?</script>','',html,flags=re.S)
 page.set_content(html,wait_until='domcontentloaded')
 modules={name:(ROOT/'src'/f'{name}.js').read_text() for name in ORDER}
 page.evaluate('''async ({modules,test})=>{
 window.__BUBBLE_TEST=test;const urls={};
 for(const [name,code] of Object.entries(modules)){
  const source=code.replace(/from ['"]\\.\\/([\\w]+)\\.js(?:\\?[^'"]*)?['"]/g,(_,n)=>`from '${urls[n]}'`);
  urls[name]=URL.createObjectURL(new Blob([source],{type:'text/javascript'}));
 }
 await import(urls.siege4);
 }''',dict(modules=modules,test=test))
 page.wait_for_function("document.querySelector('#bootStatus').textContent.includes('Έτοιμο')",timeout=15000)

const CLASSES=['heavy','medium','skinny'];
// Never expose the obsolete artwork while the actual character performances decode.
export function installCartoonMenu(game){
 const doc=game.ui.ownerDocument,top=game.ui.querySelector('.menu-frogs-top'),bottom=game.ui.querySelector('.menu-frogs-settings'),boot=doc.getElementById('boot');top.hidden=true;bottom.hidden=true;
 const imgs=CLASSES.map((id,i)=>{const image=doc.createElement('img');image.alt='';image.draggable=false;image.className='cartoon-menu-frog cartoon-menu-'+id;image.dataset.character=id;image.hidden=true;(i===2?bottom:top).before(image);return image;});
 let ready=false,failed=false,visible=false;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function motion(){for(const [i,image]of imgs.entries())image.src=`./art/cartoon/${CLASSES[i]}-${reduced.matches?'card.png':'menu.webp'}`;}
 reduced.addEventListener('change',motion);motion();
 const loading=Promise.all(imgs.map(i=>i.decode())).then(()=>{for(const image of imgs)image.hidden=false;ready=true;if(boot&&!boot.classList.contains('has-error'))boot.remove();return true;},error=>{
  failed=true;console.error('Cartoon menu images',error);if(boot){boot.classList.add('has-error');const target=doc.getElementById('boot-error');if(target)target.textContent='Δεν φορτώθηκαν οι εικόνες των χαρακτήρων. Έλεγξε τη σύνδεση και πάτησε ΞΑΝΑ.';const retry=doc.createElement('button');retry.id='menu-load-retry';retry.type='button';retry.textContent='ΞΑΝΑ';retry.style.cssText='min-height:48px;padding:12px 24px;font:800 16px system-ui;cursor:pointer';retry.onclick=()=>location.reload();boot.append(retry);}return false;
 });
 return {ready:loading,update(){visible=!doc.hidden&&!game.$('arcade-menu').hidden&&!game.$('menu-main').hidden;for(const image of imgs)image.style.visibility=visible?'visible':'hidden';},inspect:()=>({ready,failed,visible,faceMode:'actual-rig-authored-performances',characters:CLASSES,reducedMotion:reduced.matches}),destroy(){reduced.removeEventListener('change',motion);for(const image of imgs)image.remove();}};
}

const CLASSES=['heavy','medium','skinny'];
// Actual skeletal performances are baked once; the title keeps one WebGL context.
export function installCartoonMenu(game){
 const doc=game.ui.ownerDocument,top=game.ui.querySelector('.menu-frogs-top'),bottom=game.ui.querySelector('.menu-frogs-settings');
 const imgs=CLASSES.map((id,i)=>{const image=doc.createElement('img');image.src=`./art/cartoon/${id}-menu.webp`;image.alt='';image.draggable=false;image.className='cartoon-menu-frog cartoon-menu-'+id;image.dataset.character=id;image.hidden=true;(i===2?bottom:top).before(image);return image;});
 let ready=false,visible=false;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function motion(){for(const [i,image] of imgs.entries())image.src=`./art/cartoon/${CLASSES[i]}-${reduced.matches?'card.png':'menu.webp'}`;}
 reduced.addEventListener('change',motion);motion();
 Promise.all(imgs.map(i=>i.decode())).then(()=>{top.hidden=true;bottom.hidden=true;for(const image of imgs)image.hidden=false;ready=true;}).catch(error=>{console.error('Cartoon menu images',error);});
 return {update(){visible=!doc.hidden&&!game.$('arcade-menu').hidden&&!game.$('menu-main').hidden;for(const image of imgs)image.style.visibility=visible?'visible':'hidden';},inspect:()=>({ready,visible,faceMode:'actual-rig-authored-performances',characters:CLASSES,reducedMotion:reduced.matches}),destroy(){reduced.removeEventListener('change',motion);for(const image of imgs)image.remove();}};
}

// Mobile overview aim is latched when the finger lifts. A fire-button drag
// moves the existing reticle by its delta, never to the button's screen corner.
export function freezeOverviewTouchAim(game){
 if(game.viewMode!=='overview'||game.state?.actors?.[0]?.catapultId)return;
 game.mouse.valid=false;game.mouse.inside=false;game.mouse.targetId=null;
}
export function overviewFireAnchor(game){
 if(game.viewMode!=='overview'||game.state?.actors?.[0]?.catapultId)return null;
 const r=game.currentAimReticle;return {x:Number.isFinite(r?.x)?r.x:game.w/2,y:Number.isFinite(r?.y)?r.y:game.h/2};
}
export function shiftOverviewFireAim(game,cursor,dx,dy){
 if(!cursor||![dx,dy].every(Number.isFinite))return;
 const r=game.renderer.domElement.getBoundingClientRect();if(!(r.width>0&&r.height>0))return;
 cursor.x=Math.max(0,Math.min(game.w,cursor.x+dx*game.w/r.width));cursor.y=Math.max(0,Math.min(game.h,cursor.y+dy*game.h/r.height));
 game.captureMouseAim({clientX:r.left+cursor.x*r.width/game.w,clientY:r.top+cursor.y*r.height/game.h});
}

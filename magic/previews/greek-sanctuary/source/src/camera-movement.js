// Screen-relative input projected onto the horizontal world plane. Preserve
// analogue strength and diagonal length; the movement controller normalises it.
export function cameraRelativeMovement(moveX,moveZ,direction){
 const length=Math.hypot(direction.x,direction.z);
 const fx=length>1e-6?direction.x/length:0,fz=length>1e-6?direction.z/length:-1;
 return {moveX:-fz*moveX-fx*moveZ,moveZ:fx*moveX-fz*moveZ};
}
const vectors=new WeakMap();
export function cameraRelativeInput(input,camera){
 let direction=vectors.get(camera);if(!direction){direction=camera.position.clone();vectors.set(camera,direction);}
 camera.getWorldDirection(direction);
 return {...input,...cameraRelativeMovement(input.moveX,input.moveZ,direction)};
}

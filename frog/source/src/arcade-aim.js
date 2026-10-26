import {traceShot} from './arcade-model.js';

// `origin` is the shot source at actor X/Z, ground + .45, plus jump height for
// explicit 3D aiming. `muzzle` is its swept .8-unit offset. All Y values are world Y.
// The default range includes that offset plus the existing full fly lifetime.
export function traceAim(state,actor,range){return traceShot(state,actor,range);}

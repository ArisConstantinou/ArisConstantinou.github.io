# FROG 4.2.0 verification

## Result

The release adds automatic localized fly collection, smooth directional hopping, centered overhead framing, deliberate aiming and confirmed hits, fair onboarding and ranged knockouts, and fixed automatically reloading catapults. Stones physically lift and push frogs; native Three.js droplets and surface ripples accompany impacts and landings.

## Validation

- Production build: `npm run build` succeeds. Published bundle: `index-BYxpt8tZ.js`, styles: `index-D2W-9Lik.css`.
- Full project regression run: 772/772 passed before the final impact/knock-up refinement.
- Final affected model, movement and artillery tests: 52/52 passed, including center/rim lift, displacement, one landing event, mounted-operator ejection and unchanged fly impacts.
- Final aiming, camera and onboarding regression tests: 22/22 passed.
- Native effect pool: 12 focused headless checks passed for depth, terrain, pause, ballistic droplets, bounds, expiry and disposal.
- [Core browser report](qa/arcade-420/controls-report.json): 22/22 checks, desktop and mobile portrait/landscape, real mouse/keyboard/multitouch handlers. This pass precedes only the final effects/knock-up and portrait-status adjustment.
- [Final effects/layout report](qa/arcade-420/impact-report.json): 6/6 checks on the final build; real catapult shot, preview/impact agreement, nonlethal lift, visible 3D effects, landing and corrected portrait layout. No uncaught JavaScript or WebGL shader errors.

The measured lift reached 0.84919 for a configured peak of 0.85. Rendered body position exactly followed ground plus simulated height, then returned to ground at the landing event. Portrait status and exit action have a 14 px gap.

## Selected rendered captures

- [Portrait controls and mounted catapult](qa/arcade-420/phone-portrait.png)
- [Stone impact and airborne frog](qa/arcade-420/stone-impact.png)

The report JSON retains the original local capture paths; these two selected images are published here. The harnesses generate all other captures when run.

## Reproduce

Source is in `source/`. Install with `npm ci`, run `npm test`, then `npm run build`. Serve `dist/` locally. Browser harnesses are `source/qa/arcade-420.mjs` and `source/qa/arcade-impact-420.mjs`; they require Playwright and Chromium. Point `BASE_URL` to the server and execute each with Node. Long model simulations use the production test hook with live input handlers; real WebGL frames are rendered at checkpoints.

## Limits

Browser checks used Chromium and CDP touch emulation, including real WebGL rendering through software graphics. These checks do not establish performance or behavior on a physical iPhone/Android. The swamp vehicle illustrations are visual concepts for a future feature; this release contains fixed catapults.

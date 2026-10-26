# FROG 4.3.0 verification

## Release scope

The round now starts all three frogs inside their own shelters with zero carried flies and a shared, immediate 20-second preparation clock. Intact home stock is unlimited, carried capacity is 60, and both players and AI refill automatically. Ten uninterrupted seconds at an enemy stock destroy it; damage or a canceled action resets the attempt. KO returns an owner after 12 seconds while their stock survives. The final intact stock wins.

Six real walled enclosures have one entrance each. Tree cover slows movement and prevents distant automatic detection. The default rear camera, explicit fire control and in-battle touch-layout editor are integrated with existing automatically reloading catapults and 3D impact effects. Nearby walls and roofs become transparent when needed to keep the frog visible; collisions remain active.

## Automated validation

- Full project regression suite: **824/824 passed** before the final wall-visibility, HUD and aim-glyph corrections.
- Final affected arcade regression suite: **127/127 passed**, including the added wall-cutaway tests and the completed source changes.
- Production build: `npm run build` succeeds with 30 modules. Release assets are `index-DHbaYnI0.js` and `index-CNFQrALc.css`.
- Source/documentation whitespace checks pass. The generated Three.js shader strings retain upstream trailing whitespace in the production JavaScript bundle.
- Defensive boundary check: an actual projectile received at 9.99 seconds interrupts storage destruction before completion.
- AI pathing simulations with two deterministic seeds finish the stock objective naturally, including combat, KO, the ten-second channel and elimination.

## Browser validation

The browser harness is `source/qa/arcade-430.mjs`. Chromium with real WebGL rendering and CDP touch input completed **28 functional/mobile checks**, followed by **2 targeted desktop checks** after a layout correction. No uncaught runtime exceptions were observed.

Coverage includes fresh and saved rounds, 0-to-60 automatic refill, the shared preparation clock, pause/audio, sustained keyboard movement with the following camera, camera toggle, aimed mouse hits, KO/return, wall-protected catapult access, explicit stone launch, E-hold storage attack and release, projectile interruption, exact ten-second completion, save/reload, victory and defeat. Touch coverage includes simultaneous movement and aiming, the independent fire button, dragging controls while play is frozen, persistence across reload and orientation changes, storage actions and catapult launch.

Checked viewports: **1280×800, 390×844, 844×390, 360×640 and 640×360**. HUD, minimap and visible controls fit without overlap or horizontal scrolling, including context-sensitive actions and custom control positions. Sixteen rendered captures were collected. Visual inspection confirmed that the rear wall no longer hides the frog or its stock.

The first full browser pass found a 2.5 px desktop ammo/status overlap. The status was moved down and a targeted pass verified a clear gap. Its earlier failed report is retained in local evidence rather than rewritten. The mobile and functional checks already passed. The subsequent final source change replaces an unsupported full-width plus glyph with an ASCII plus; it does not change input behavior.

## Reproduce

From `frog/source`:

```sh
npm ci
npm test
npm run build
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

In another terminal, with Playwright and Chromium installed:

```sh
node qa/arcade-430.mjs
```

`BASE_URL` overrides the server URL; `PLAYWRIGHT_MODULE` can point to an existing Playwright installation. `QA_SCOPE=desktop-layout` runs the focused desktop layout/cutaway check. `OUT_DIR` chooses the screenshot/report directory. Generated evidence is not required by the game.

## Practical limits

These are Chromium desktop and emulated touch checks using software graphics, not measurements on a physical iPhone or Android. Real keyboard, mouse and touch handlers feed the production simulation. Long waits use fixed simulation steps, and combat fixtures place actors or projectiles into reproducible states. Render checkpoints use real WebGL frames. The checks establish control and rules integration, not real-device FPS or a complete human-played campaign balance assessment.

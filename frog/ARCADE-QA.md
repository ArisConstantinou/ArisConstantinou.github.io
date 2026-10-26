# FROG 4.3.1 — Controls and indoor-spawn repair

## Confirmed defects in 4.3.0

The previous camera followed the frog's movement, aim and kick heading. Freezing a world-space input direction concealed a real screen-space defect: holding D rotated the camera about 85 degrees, and holding S rotated it about 177 degrees, so the visible movement no longer matched the key. Mouse hover could rotate it about 79 degrees and the aim timeout could snap it back.

The old spawn was inside a fenced yard but outside the small canopy over the stock. The player also started off-center from the narrow doorway, so straight W hit its edge. Uneven natural ground did not match a level house interior. A legacy-save migration restarted preparation while retaining old outdoor positions.

The new browser regression reproduced **25 failed checks** against 4.3.0. It now measures actual per-frame displacement projected through the displayed camera, including repeated and overlapping keys. A constant world-space vector alone is no longer accepted as sufficient evidence.

## Repair

- The camera follows position with an independent yaw and pitch. Movement, aim, firing and kicking cannot rotate it. Right-button dragging, or dragging the empty world on touch, deliberately turns the view.
- WASD, arrows and the touch stick use the current displayed camera axes, including after an intentional orbit. Mouse aim stays under the cursor without a timed camera snap.
- Mouse-button chords, pointer cancellation and queued taps cannot leave an orbit stuck or fire an unintended shot. A cursor ray above the horizon uses a finite current direction rather than an old target.
- All three spawns are centered inside their actual full-size roofed houses and face the door. Shared floor/ramp heights drive the visible building and the rendered frog. The old decorative refuges were removed from the arcade scene.
- New rounds, KO returns and legacy migrations use the corrected spawns. Normal version-2 continuation retains intentional progress and position. The explicit **ΝΕΟΣ ΓΥΡΟΣ** menu action allows a fresh start.
- The loaded-frog render offset keeps swollen front feet above the new level floor.

## Validation

- **135/135 affected arcade tests passed**, covering the model, indoor spawn/migration/return, gates, houses, floor/ramp geometry, camera math, artillery and touch layout.
- **51/51 browser regression checks passed**, with zero uncaught runtime errors. The same harness exposes the prior camera and doorway defects.
- **10/10 final targeted browser checks passed** on the published candidate `index-CbD9qxyI.js`: mouse chords, version-2 continuation, explicit new-round reset and visible 60-fly indoor clearance. The only changes after the main desktop pass were that menu action and the verified render-only foot offset; the main mobile pass also used the final bundle.
- Desktop coverage includes isolated and repeated W/D/S/A, W→W+D→W, natural spawn-to-doorway travel, hover, firing, kick, intentional orbit, movement after orbit, chorded mouse-button release, queued taps and horizon aiming.
- Touch coverage checks screen-relative strafe while independently aiming, and deliberate world-drag orbit without firing.
- Actual skinned-frog geometry was checked for all three characters at 0, 30 and 60 flies, both graphics levels, over 121 idle poses: **2,178 posed bounds checks**. Bodies remain inside the walls and beneath the roof, clear of the basket; the load offset corrects visible foot penetration.
- Production build succeeds with 30 modules. Release assets: `index-CbD9qxyI.js` and `index-Z7y7G4VM.css`.
- Source/documentation whitespace checks pass. Generated Three.js shader strings retain upstream trailing whitespace.

## Reproduce

From `frog/source`:

```sh
npm ci
node --test --test-isolation=none tests/arcade*.test.mjs
npm run build
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

With Playwright and Chromium installed, use another terminal:

```sh
node qa/arcade-431.mjs
QA_SCOPE=final-checks node qa/arcade-431.mjs
```

`BASE_URL` overrides the local server, `PLAYWRIGHT_MODULE` selects an existing installation, and `OUT_DIR` selects the evidence folder. To reproduce the earlier regression against the archived 4.3.0 build, set `EXPECTED_VERSION=4.3.0 QA_MODE=reproduce`.

## Limits

Browser checks use Chromium with software WebGL and emulated touch; they do not measure FPS on a physical iPhone or Android. Real keyboard, mouse and touch events feed the production frame function. Free-area fixtures separate controller behavior from enemy pressure and obstacles, while a separate natural-start check traverses the real house doorway. Screenshots verify the actual rendered scene.

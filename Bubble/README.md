# Bubble — Material Siege 0.4.3

Play: https://arisconstantinou.github.io/Bubble/?v=0.4.3

Source stays **only in `Bubble/` on `main` of `ArisConstantinou/ArisConstantinou.github.io`**. This is the requested outer-fire-ring control change over 0.4.2, not a new game or a concept image.

## Right joystick: inner aim, outer trigger

The **inner disc only aims**, including at full aiming speed. The **purple outer ring** deliberately enables normal SPLAT firing. Keep the same right finger down and drag outward to shoot. Drag back inside to stop firing while continuing to aim. Lifting/cancelling the right touch stops with no queued or release-time normal shot. **The left joystick only moves** and is not part of the firing decision.

The outer ring glows while it operates. Thumb distance is measured against the actual displayed outer radius, separately from the aiming vector. Full aiming input is reached at 60% of the outer radius; firing begins at 76%, and ends at or below 72%. The small hysteresis band within the ring filters boundary tremor. Simply looking around no longer automatically fires as it did in 0.4.2.

Normal shots retain their 0.16-second simulation cadence, with no catch-up bursts. An empty tank reloads automatically. Staying in the ring resumes shots after reload; moving back inside during reload does not resume shooting. The existing **ΦΟΡΤΙΣΗ** button remains for charged/lob shots and takes exclusive ammunition priority; a held ring cannot drain ammo during that charge.

**FLOW / ERASE:** inner disc aims only; outer ring runs the continuous tool. Returning inside stops deposition/erasure. The separate FIRE button still works. **STRAND:** connection stays on its separate intentional button; the ring is dimmed and does not repeatedly connect/release. Switching a tool or camera while holding the ring requires an inward return followed by a fresh outward gesture before the new action begins.

## Touch ownership and UI

The native-Touch ownership fixes from 0.4.2 remain. Movement, aim and the separate trigger have their own finger IDs. A right-side lift/cancel or unrelated pointer-capture event does not clear a still-held left finger. Tracking continues outside the visual joystick. Pause, BAG, page hiding and restart clear controls safely.

A browser-toolbar or orientation resize disarms the ring before another shot, without cancelling the held left movement contact. Return inside, then outward, to resume firing.

The right joystick is larger with visible inner and outer zones. Nearby utility buttons are repositioned beside the ring, not over it or in the middle of the screen. Portrait, compact portrait and landscape styles retain safe-area insets. Text selection, copy/cut/paste, dragging and touch callouts stay blocked inside the game document, not the browser interface.

## Existing gameplay is preserved

The original castle, player movement/sprint/jump, gum material/collision recovery, body-region aiming, local stealth patrols, charged shots, FLOW, PATH, GRIP, object tethers, swing, suspension, seals, boss, skills and Forge remain. World geometry and enemy behavior are unchanged by this patch. The basic left movement is not modified to repair firing behavior.

Character saves still use **`bubble-character-v3`**, at the same browser/origin. Level, XP, skills, items, materials and Forge preferences remain compatible. Do not clear site data to update; refresh and verify `0.4.3`. Live siege positions and constructions are not saved across a page reload. There is no multiplayer, cloud save, analytics, advertising or new external runtime dependency.

Gum is still the existing bounded static scalar volume, not a full viscous-fluid/soft-body simulation. Infinite FLOW supply does not imply unlimited memory or structural-collapse simulation. None of these systems have been reworked in this controls patch.

## Run / verify

Serve this directory with `python3 -m http.server 8080` and open http://localhost:8080 .

- `npm test`: 39 existing material/progression checks, 11 collision regressions, and the updated pure ring/trigger tests.
- `BUBBLE_SKIP_MOBILE=1 xvfb-run -a python3 tests/browser4.py`: existing desktop gameplay regression suite.
- `xvfb-run -a python3 tests/ring43.py`: actual production WebGL2 modules and Chromium CDP multi-touch tests at 430×744, 430×932, 932×430 and 375×667, including simulated landscape safe areas.

`CHROMIUM` overrides the Chromium executable, `BUBBLE_VIEWPORT=430x744` selects one touch viewport, and `BUBBLE_TEST_OUTPUT` selects the report directory. The harness uses the exact local production modules as blob URLs; it does not mock rendering, touch handlers or gameplay. Tests deliberately stage isolated guard scenes for repeatability.

`src/ring4.js` contains the pure radial-intent gate. `src/controls4.js` measures independent aim radius and owns touches. `src/twinfire4.js` implements the ring trigger/cadence and manual-fire priority. `ring4.css` and the corresponding markup render the zones. `src/siege4.js` integrates the trigger and tool state. Existing renderer/world/material files remain unchanged.

Final verification: **302 / 302 checks passed** — 39 existing material/progression, 11 movement/collision, 31 ring logic, 36 desktop WebGL regressions and 185 production multi-touch checks. All were run against the published source files; the report records Git blob hashes. See `tests/hotfix-0.4.3-results.json`. Browser tests use Chromium/SwiftShader and synthetic touch, **not a physical iPhone 14 Pro Max or Safari**. The feel on an actual device still needs user testing. Test controls are not exposed during normal play.

# Bubble — Material Siege 0.4.2

Play: https://arisconstantinou.github.io/Bubble/?v=0.4.2

Changes remain **only in `Bubble/` on `main` of `ArisConstantinou/ArisConstantinou.github.io`**. This release addresses the player's report of movement interruption during fights and the need to lift the aim thumb to fire. It also disables text selection and copy/paste menus inside the game document.

## Two-thumb combat

**Left joystick moves. Right joystick aims AND fires normal SPLAT shots while displaced.** No release is needed to shoot. The centre dead zone does not fire; centring, lifting or cancelling that right touch stops normal shots without clearing the left touch. The cadence is one normal shot per 0.16 seconds of simulation time, with no catch-up burst. An empty tank reloads automatically and shooting resumes while the same thumbs remain held.

The separate **ΦΟΡΤΙΣΗ / FIRE** button retains tap shooting and hold/release charged shots; drag upwards while holding for a lob. It takes exclusive trigger ownership during a charge, so the right stick cannot simultaneously drain the tank. Releasing an aim touch does not cancel a different finger's charge. Normal shots never build up a charge.

In **FLOW / ERASE / STRAND**, the right stick remains aim-only. FIRE operates the selected tool; connecting uses the existing connection action. This prevents accidental construction while looking around. The right-stick label changes between `AIM + FIRE` and `AIM` to match the tool.

## Independent touch ownership

Mobile input now tracks each finger by its native Touch identifier. One owner controls movement, one controls aim, and another can operate FIRE or an action button. Document-level tracking continues outside a joystick's visible circle. A changed right touch never replaces the unchanged left state. Mouse/pen use Pointer Events separately, so a mobile touch is not processed twice.

A lost pointer-capture notification is not treated as a lifted native touch. A real `touchend` or `touchcancel` releases only its matching owner. A visible-page focus change on mobile does not globally reset movement. Actual page hiding, app exit, pause, inventory and restart still stop controls safely. Resuming does not replay stale input. Action buttons execute once without a duplicate compatibility click.

The 0.4.1 collision fix remains: bounded escape from overlapping self-deposited gum, shooter clearance during deposition and solid normal obstacles. This release does **not** disable collision, remove player-built cover or change enemies' combat rules to make movement appear fixed.

## No selection or copy/paste inside the page

All static and dynamic game UI disables text selection, dragging, iOS touch callouts and tap highlighting. The document cancels selection/context-menu/copy/cut/paste events, clears residual DOM selections, and blocks the corresponding Ctrl/Cmd shortcuts. Game menus, scrolling help, settings and BAG/Forge remain usable. This applies to the **game page**, not Safari's address bar, browser interface or operating-system menus.

## Other controls

WALK cycles walk, RUN and SNEAK. JUMP or double-tap the left stick jumps. TOP targeting still supports body-region selection, tap-to-select a visible guard, and terrain tapping for construction. Projectiles hit the first physical obstruction; there is no shooting through cover.

On desktop: WASD/arrows move, Shift sprints, Control sneaks, Space jumps, mouse aims, left mouse fires/charges, Alt selects a lob. C changes camera; T changes tool; 1–4 selects a body region; E connects/releases; R reloads; B toggles PATH; V changes grade; G toggles GRIP; X selects ERASE; F selects wall FLOW; I opens BAG; Escape pauses.

## Preserved game systems

The castle, houses, stairs, upper keep, underground vault, sprint/jumps, equipment, skills, Gold/Dust and explicit safe Forge remain. The player suit has anti-adhesive lining and soles, with selectable sticky glove pads; it does not destroy material. Captured/immobilized enemies are not killed or deleted.

There are 22 locally patrolling guards in groups of 2/3/6/3/2/6. Hearing produces a `?` investigation; sight confirmation is required to attack. Collect three seals in the west house, upper keep and vault to summon ARACHNE-09. A weighted plate and a remotely operated lever open gates. Capturing all guards is optional. The boss retains its second phase, toxic projectiles and dizzy window; victory grants Legendary loot and unlocks a harder siege.

The standard tank contains 180 units and reloads from reserve. A fully held SPLAT consumes the available tank. FLOW has unlimited supply but a finite active-material memory budget; ERASE frees it. Frontal charged splashes do not coat the unseen back. Swinging, pulling and hanging use springs, gravity and collision.

## Simulation and save limits

Gum construction is a bounded static scalar volume, not a complete fluid or soft-body simulation. It fuses into a generated mesh, supports bodies and blocks rays, but does not collapse structurally when its support is removed. Enemy reactions are procedural poses. Infinite supply does not mean unlimited device memory; construction stops at the budget rather than deleting a platform under the player.

The **`bubble-character-v3`** save format is unchanged. Level, XP, skills, gear and Forge preferences remain local to the same browser/origin. Refreshing starts a new live siege, not a new character; current positions, gum structures, enemies and seals are not persisted. **Do not clear site data to update the build**, because that removes the character save. No multiplayer, analytics, ads, external runtime assets or service-worker cache is included.

## Verification for 0.4.2

The baseline came from the deployed Pages artifact for commit `a0cfc1c68ca137ca8f676aa2f33ab13dc1c07fda`. Tests use the exact production modules, real WebGL2 renderer, DOM handlers and Chromium DevTools Protocol touch input. No rendering or collision mocks are substituted.

Completed: **70 logic checks** (39 material/AI/progression + 11 movement regressions + 20 new firing checks), **64 browser regression checks**, and **128 new touch/combat checks**. The new suite runs 32 checks at each of 430×744, 430×932, 932×430 and 375×667. The browser regression suite also checks landscape safe-area margins. Reports distinguish native synthetic touches from deliberate fault injection of focus/capture/cancel events.

Coverage includes movement while receiving enemy damage, repeated right-thumb re-grips with an unmoving left contact, leaving joystick bounds, normal firing without thumb release, charge priority, reload/resume, third-finger actions, cancellation, pause, resize, FPS, selection blocking and working BAG. See `tests/hotfix-0.4.2-results.json` for recorded suite totals and source hashes.

**Chromium 144 / SwiftShader under Xvfb with emulated touch, not a physical iPhone or Safari.** Safari operating-system callout behaviour, real-device performance and subjective thumb comfort still need real-device playtesting. Passing these checks is not a claim that every possible device issue is eliminated.

```
npm test
xvfb-run -a python3 tests/browser4.py
xvfb-run -a python3 tests/touch42.py
```

Browser tests require Python Playwright and Chromium. `CHROMIUM` selects the executable; `BUBBLE_TEST_OUTPUT` selects the report directory; `BUBBLE_VIEWPORT=430x744` restricts the new touch suite to one viewport. The local test harness loads the production files as blob modules to avoid network navigation dependencies. Historical `mobile_fix.py` describes the old 0.4.1 aim-only behaviour; use `touch42.py` for this release.

## Current source

`controls4.js`: independent finger ownership and document interaction protection. `twinfire4.js`: simulation-clock normal-shot cadence and manual-charge priority. `touch4.css`: document protection and firing feedback. `siege4.js`: production integration. `aim4.js`, `material4.js` and the scene/combat/progression foundations are preserved. The old Controls class in `ui4.js` remains unused; that file still supplies BAG/Forge.

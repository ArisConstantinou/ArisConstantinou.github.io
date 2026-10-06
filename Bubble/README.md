# Bubble — Material Siege 0.4.0

Updated 6 October 2026 for Aris. Published in **`Bubble/` on `main` of `ArisConstantinou/ArisConstantinou.github.io`**, at https://arisconstantinou.github.io/Bubble/ . No separate repository. The original castle, houses, stairs, upper keep and underground vault remain. Native WebGL2, no external runtime JavaScript, textures, models, fonts, analytics or ads.

## What replaces the 0.3 toolkit

The active entry point is now `src/siege4.js`. The old SLING / LINK / PULL / SLAM button strip is **not loaded**. Earlier source files remain in the repository for reference, not as a second overlay. Movement, sprint, jump, wall-jump, FPS / top-down, equipment, skills and Forge remain.

- **SPLAT / charge:** tap and release for a small projectile. Hold then release for a larger mass, up to the entire current 180-unit tank after 2.8 seconds. Drag FIRE upwards, or hold Alt on desktop, for a gravity-driven overhead shot. Frontal charged impacts coat four facing sectors; they do not complete the unseen back. Overhead impacts can cover more regions, subject to line-of-sight and impact direction. Impulse can knock a guard down or pin them to nearby wall geometry.
- **FLOW:** infinite supply, sustained short-range material deposition. Repeated deposits combine in a sparse density field. The field generates the visible marching-tetrahedra mesh and also drives support, body collision, bullet collision and occlusion. The next shot collides with the outside of existing gum. Select MASS, WALL or CUSHION. WALL grows upwards from a floor-supported base; it is not a free floating instant door. CUSHION is a wide, elastic pad. All gum softens landing damage; designated cushions additionally bounce.
- **Connection / E:** tether a crate or a sufficiently coated guard and pull by moving. Aim at a high surface and connect again to suspend the held object or guard. With no held target, connect to a high wall/beam for an elastic swing. Filaments have travel time, spring forces, gravity and collision; they do not teleport the body. E or jump releases a swing while retaining velocity.
- **PATH / left glove:** toggle from a stable starting surface, then walk and steer. A roughly two-metre-wide thick route grows ahead of the left hand. Change grade between uphill, downhill and level. Curves are built from movement, not a straight line between two clicked endpoints. Ceilings and walls obstruct construction. Unsupported continuous runs are limited to 18 metres before another support is needed.
- **GRIP:** the standard player suit has an anti-adhesive outer layer and soles. This does not dissolve or erase gum. Engaging the gloves exposes adhesive pads: move towards a gum-coated wall to climb; stop input to hold position; jump to release. Climbing and holding consume stamina. This is baseline equipment, not a rare armor requirement. Toxic impacts still cause damage.
- **ERASE:** locally remove gum and cut nearby tether endpoints, without deleting all constructions. Shots striking gum at a shallow angle can physically deflect with reduced velocity; more direct enemy hits erode it.

## Enemy interactions and stealth

There are 22 guards, in local groups **2 / 3 / 6 / 3 / 2 / 6**. Their initial patrols are in rooms, the keep and the dungeon, away from the spawn. Hearing produces **`?` investigation of a last-known position**, not perfect knowledge or an instant attack. Sight checks use facing, distance, height and physical occlusion. Guards attack only after sight confirmation and remain locally bounded. Hidden guards are not displayed through the top-down cutaway.

The same procedural skeleton drives the rendered pose and hit shapes in both cameras. Separate head, torso, left/right arm and left/right leg regions accumulate gum. Head coating covers the visor and prevents sight; a free hand tries to clean it. A bound weapon arm stops shooting. Chest hits produce velocity impulses and loss of balance. Grounded, sufficiently coated feet attach to the floor and stop the patrol moving. These are gameplay changes as well as poses, not only colored flashes. Knockdown shapes follow the fallen pose.

FPS uses the actual aim ray. Top-down lets the player choose head / chest / arms / legs, with assistance towards an accessible point. **The projectile still hits the first physical obstruction or body region in its path.** The requested region is not assigned as damage through an obstacle.

Zero HP alone does not count as a capture. Full coating, a successful wall pin or coated suspension can secure a guard. Rewards are awarded once. A frontal charged shot provides broad front coverage without automatically capturing the whole body.

## A reason to explore quietly

Collect three seals: **west house, upper keep, underground vault**. This summons ARACHNE-09 in the main courtyard. Capturing every guard is optional, giving stealth a real purpose. The spider retains two phases, toxic projectiles/puddles and a dizzy damage window. Winning grants three Legendary items and unlocks the next siege difficulty in the existing castle, not a new map.

Two small working environment interactions are included: a weighted plate opens the west-house gate, and a remotely operated lever opens a vault gate. A crate, the player or enough deposited gum can operate the plate. This is a first interactive scenario, not a claim of a complete authored puzzle campaign.

## Controls

**Desktop:** WASD/arrows move; Shift sprints; Control sneaks. Space jumps or releases a swing. Mouse aims; left button presses/releases SPLAT or holds FLOW. Alt selects a lob while charging. C changes camera, T changes tool, 1–4 chooses body region, E connects/releases, R refills, B toggles PATH, V changes grade, G toggles GRIP, X selects eraser, F selects wall FLOW, I opens BAG, Escape pauses. Click the FPS canvas for pointer lock.

**Mobile:** left joystick moves. Right joystick aims and holds the shot/flow; release it to fire a charge. A separate FIRE button is also available, including upward dragging for a lob. Double-tap the left joystick or use JUMP. WALK cycles WALK / RUN / SNEAK. Tools sit beside the two joysticks, not across the screen centre. PATH exposes its grade button only while active. Camera, BAG and pause stay in the upper corner. Safe-area insets and portrait/landscape layouts are supported. Auto quality uses the lightweight render preset on touch devices; full shadows can be selected in pause settings.

## Character compatibility

`progression.js` and the **`bubble-character-v3`** save format are unchanged. Existing level, XP, skills, gear, Gold, Dust, unlocked siege tiers and Auto Forge preference are reused. Equipment and crafting protection remain. Character saves are local to the current browser/origin. There is no cloud account or synchronization. Position, guards, seals, gum geometry and active tethers are not a saved live match: refreshing starts a fresh siege with the same character. Clearing site data removes the save.

## Simulation limits — deliberate and visible

This is a **bounded, game-oriented material simulation**, not a physical chewing-gum fluid solver. World construction is a static scalar volume; it does not reproduce continuous viscous flow, fully simulated soft bodies or structural collapse when a support is removed. Moving objects, suspension and swinging use explicit approximate spring/rigid-body motion. Body reactions are procedural poses, not an anatomical ragdoll. Construction meshes update incrementally. The armor interaction is an explicit fictional equipment rule.

FLOW has unlimited supply, **not unlimited device memory**. At 18,000 active density samples on touch / 26,000 on desktop, new construction stops and the HUD asks the player to erase unwanted gum. Existing supports are never silently removed to make room. Erasure frees the budget. Long-session balance, Safari behavior and real-device frame rates still need playtesting. No multiplayer or service-worker cache is included.

## Source map

`engine.js`, `world.js`, `actors.js`, `progression.js`: preserved 0.3 renderer, castle, spider/weapon and character system.

`material4.js`: sparse gum field, mesh generation, shared collision, props, springs and tether motion.

`knights4.js`: posed hit regions, gum responses, local perception and patrols.

`ui4.js`: safe touch/keyboard controls and equipment/Forge UI.

`siege4.js`: current game, material tools, charge/lob, player actions, objectives, boss, rendering and integration.

`play4.css`: responsive two-thumb layout. `index.html`: only the 0.4 entry point.

## Run and verify

Serve this directory with `python3 -m http.server 8080` and open http://localhost:8080 . No npm install is required for play or logic tests.

`npm test` runs the deterministic material / combat / progression checks. Browser checks require Python Playwright, Chromium and (in a headless Linux environment) Xvfb: `xvfb-run -a python3 tests/browser4.py`.

The browser harness loads the **exact local production modules as blob modules**, using a deterministic simulation clock. It uses the real WebGL2 renderer, DOM input handlers, synthetic touch events through Chromium and actual gameplay update loops; it does not mock rendering or physics. Network navigation is not needed. `CHROMIUM` and `BUBBLE_TEST_OUTPUT` can override the executable and report directory.

Verification for this revision: **39 logic checks and 64 browser integration checks**. Viewports include 1280×800, 430×932, 932×430, 375×667 and simulated landscape safe areas. Tests use Chromium 144 / SwiftShader and emulated touch, **not a physical iPhone 14 Pro Max or Safari**. Reports list every check. Test controls exist only with `?test=1` or the explicit local test flag; normal play does not expose `__bubble`.

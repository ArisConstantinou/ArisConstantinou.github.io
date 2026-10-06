# Bubble — Material Siege 0.4.1

Play: https://arisconstantinou.github.io/Bubble/?v=0.4.1

Source remains **only in `Bubble/` on `main` in `ArisConstantinou/ArisConstantinou.github.io`**. This is a movement/aiming hotfix over 0.4.0, not another gameplay redesign.

## Fixed in 0.4.1

**Player trapped by their own material.** The old collision code rejected every small move when a new gum mound intersected the player's collision body, including moves toward free space. The fix permits only penetration-reducing escape steps, with small bounded correction. It does not remove existing gum, teleport through the castle or disable obstacles. New deposition also respects the shooter's occupied body. Footprint support samples reduce snagging on rounded, low gum edges. Tall barriers remain solid.

**Aiming no longer fires or charges.** The mobile right joystick only aims. FIRE alone taps a small shot or holds/releases a charged shot. Cancelling an aim touch does not cancel a separate firing touch. Aim and movement pointers have independent capture/reset state and a dead zone.

**Stable top-down targets.** Aim toward a visible guard, release the right joystick, then use FIRE while moving with the left thumb. The selected target remains locked while visible and in range; deliberate aiming in another direction changes it. Tapping a visible guard selects that specific target. Tapping terrain selects a world-space aim point for building. Selected head/chest/arms/legs aim at actual posed body regions; projectiles still hit the first obstruction. Locks are dropped behind new cover. Moving no longer overwrites an intentional aim direction. The target marker is larger and highlighted.

## Mobile controls

Left joystick: movement. WALK cycles walk, RUN and SNEAK. JUMP or double-tap the left stick jumps. Right joystick: **aim only**. FIRE: tap/release for SPLAT; hold/release for charge; swipe upwards while holding FIRE for a lob. In FLOW or ERASE, hold FIRE for continuous operation.

SPLAT / FLOW / STRAND / ERASE are selected with the tool button. The adjacent region button selects head, chest, arms or legs for top-down combat; in FLOW it selects MASS, WALL or CUSHION. Connection grabs a crate or coated guard, attaches a held target to a high surface, or swings the player from a high anchor. PATH builds a thick route from the left glove while moving; its grade button selects up, level or down. GRIP activates the glove pads for climbing gum-coated walls. Camera, BAG and pause remain at the screen edge. Action buttons are beside the joysticks, not across the center.

On desktop, WASD/arrows move; Shift sprints; Control sneaks; Space jumps; mouse aims; left mouse is the trigger; Alt selects charged lob. C changes camera, T changes tool, 1–4 selects region, E connects/releases, R reloads, B toggles PATH, V changes grade, G toggles GRIP, X selects erase, F selects wall FLOW, I opens BAG and Escape pauses.

## Preserved game systems

The castle, houses, stairs, upper keep, underground vault, sprint/jumps, equipment, skills, Gold/Dust and explicit safe Forge remain. The player suit has anti-adhesive lining and soles, with selectable sticky glove pads; it does not destroy material. Captured/immobilized enemies are not killed or deleted.

There are 22 locally patrolling guards in groups of 2/3/6/3/2/6. Hearing produces a `?` investigation; sight confirmation is required to attack. Collect three seals in the west house, upper keep and vault to summon ARACHNE-09. A weighted plate and a remotely operated lever open gates. Capturing all guards is optional. The boss retains its second phase, toxic projectiles and dizzy window; victory grants Legendary loot and unlocks a harder siege.

The standard tank contains 180 units and reloads from reserve. A fully held SPLAT consumes the available tank. FLOW has unlimited supply but a finite active-material memory budget; ERASE frees it. Frontal charged splashes do not coat the unseen back. Swinging, pulling and hanging use springs, gravity and collision.

## Simulation and save limits

Gum construction is a bounded static scalar volume, not a complete fluid or soft-body simulation. It fuses into a generated mesh, supports bodies and blocks rays, but does not collapse structurally when its support is removed. Enemy reactions are procedural poses. Infinite supply does not mean unlimited device memory; construction stops at the budget rather than deleting a platform under the player.

The **`bubble-character-v3`** save format is unchanged. Level, XP, skills, gear and Forge preferences remain local to the same browser/origin. Refreshing starts a new live siege, not a new character; current positions, gum structures, enemies and seals are not persisted. **Do not clear site data to update the build**, because that removes the character save. No multiplayer, analytics, ads, external runtime assets or service-worker cache is included.

## Verification

The original source was obtained from the Pages artifact for commit `e33d59917bec695da6e3905cd8eb79817ef85498` and checked against Git blob hashes before editing. The collision lock was reproduced before the fix.

Completed checks: **39 inherited logic checks, 11 new movement/material regressions, 36 desktop browser checks, and 64 new touch checks** (16 each at 430×744, 430×932, 932×430 and 375×667). The shorter 430×744 viewport represents the reduced play area with browser chrome. Checks cover real multi-touch aiming/movement, touch cancellation, resizing, lock retention, tap targeting, limb hits and escape from overlapping gum. See `tests/hotfix-0.4.1-results.json`.

Browser runs use the actual WebGL renderer and production modules in **Chromium/SwiftShader with emulated touch, not a physical iPhone or Safari**. Real-device frame rate and subjective aiming feel still require playtesting.

Run `npm test` for logic and movement regressions. Browser tests require Python Playwright and Chromium:

```
BUBBLE_SKIP_MOBILE=1 xvfb-run -a python3 tests/browser4.py
BUBBLE_VIEWPORT=430x744 xvfb-run -a python3 tests/mobile_fix.py
```

Omit `BUBBLE_VIEWPORT` to test all four mobile sizes in one run. The harness loads the exact local modules as blob modules, without a network navigation dependency. `CHROMIUM` and `BUBBLE_TEST_OUTPUT` override the executable/report destination. Production does not expose the test controls unless `?test=1` is explicitly used.

## Current source

`material4.js`: shared gum volume and collision; `controls4.js`: independent input; `aim4.js`: mobile targeting; `siege4.js`: integration. Original `ui4.js` remains the source for BAG/Forge, but its old Controls class is no longer instantiated. `knights4.js`, `world.js`, `engine.js`, `actors.js` and `progression.js` retain the existing scene/combat/character foundations.

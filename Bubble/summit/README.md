# Bubble Skyward — Ridge Run 0.7.0

Play: https://arisconstantinou.github.io/Bubble/?v=0.7.0

This is an incremental visual and mechanical update of the published Expedition 0.6.0, not a replacement game or the alternate 1.0 draft. The former castle and all non-Bubble projects remain intact. This is still a playable prototype, not a finished AAA release.

## Choose a route by flying, not by clicking a menu

The first flight now has two optional, spatially different three-gate routes. Passing the first cyan or orange gate selects that branch. Complete its three gates in sequence. Both choices lead toward the first required landing plateau; you can also skip the optional gates.

- **ΚΟΙΛΑΔΑ / valley:** wider, lower cyan gates with a weak updraft. Complete all three for **15 additional seconds on the current balloon**, increasing both remaining and maximum duration.
- **ΡΑΧΗ / ridge:** narrower, higher orange gates with local lateral gusts. Complete all three to earn **40 additional integrity on the next balloon**.

The gate's physical crossing test follows the balloon centre and accounts for its radius. A distant teleport does not count as a crossing. Labels identify the next gate, horizontal distance and vertical offset; the map shows both branches. These are alternate first-flight gate courses through the existing terrain, not newly carved canyons or four completely redesigned levels. The previous eight optional wind rings and four required flight legs remain.

## Optional ground combat with a reward

Each of the three intermediate camps has an orange **guard storage crate**, separate from the essential supply cache. Defeat that site's guards, approach the orange crate and use F / the existing loot action. It awards a full gum kit and a pending **+40 integrity upgrade**. A pending upgrade is capped at 40, not stacked repeatedly; it is applied and consumed once when the next bubble is launched.

The essential golden cache remains available without clearing the guard group. It still gives a complete recipe, ammunition and healing. AI cannot take the player's essential kit. Automatic landing capture, explicit resupply guidance and the physical gum-to-mouth sequence are unchanged. A player can avoid the optional battle and continue the route.

## Enemies respond to their situation

Wounded or reloading guards try to use the new collidable log cover. A guard under player aim/fire pressure can strafe instead of standing still. The existing acquisition range, reaction time and visibility rules remain: 38 m for garrisons and 50 m for rivals, with finite projectile travel.

Rivals carrying at least 20 kg of gum, or with membrane integrity below 30%, attempt an emergency approach to a nearby plateau rather than blindly maintaining the race route. After grounding, they remove attached gum before preparing to continue. This is an attempt, not a guaranteed rescue: terrain, damage and lost lift still apply. Local obstacle checks and alternative headings are used; there is no complete navigation mesh or sophisticated squad planner.

## Learning through movement

The first flight presents short instructions for movement, ascent, braking after release and descent. Each step advances only after the relevant input and resulting motion are observed. The checklist does not gate flight progression. On small screens the current instruction uses the existing main objective card instead of adding large side panels. Flight instruments are hidden while on foot; the in-game K / question-mark guide includes the new route and storage rules.

## Camp continuation

A separate local save key, `bubble-skyward-camp-v1`, stores camp progress at the start of a new run, when a required landing is registered, and after collecting supplies or an optional storage reward. The starting screen offers **ΣΥΝΕΧΕΙΑ ΑΠΟ ΤΟ ΦΥΛΑΚΙΟ** when valid data is present.

The snapshot stores checkpoint, materials, health, elapsed time/penalty, personal crate collection state, storage rewards, pending reinforcement, completed route choice and learning flags. It validates numeric ranges and arrays before use. Missing or unavailable storage is handled visibly rather than preventing play. Starting a new run clears only this game's camp key, never the archived castle's character save.

**This is camp recovery, not frame-accurate race saving.** It does not restore airborne positions, every projectile or the exact enemy battle. The player resumes on the ground; rival racers restart around the restored checkpoint, and guards are re-created. Therefore it is expedition continuation, not a competitively exact saved race. Clearing site data removes the save; there is no cloud account or synchronization. The storage serializer/restoration was tested with an explicit in-memory storage adapter in the offline browser harness, not by claiming an opaque test origin had native localStorage persistence.

## Visual changes

Existing photographic surfaces are remapped to more appropriate terrain regions: grass on gentler slopes, soil around camps, desaturated gravel/rock blending on steep faces and snow higher up. World-space/triplanar sampling and lower normal strength reduce the previous stretched/tiled appearance. Lighting, exposure and fog are adjusted without replacing the terrain geometry.

Camps now contain pitched canvas awnings, stitched seams, posts, ropes, benches, log-and-stone fire pits, animated flags, footstones and layered log cover. Posts, roofs, benches and cover have conservative collision bounds. Small decorative details do not imply per-leaf/per-rope collision. Camp groups are distance-culled; the previous forest partitioning remains. On-foot framing is closer and its flight-only readouts are removed.

Human models and their procedural animation are retained, not newly motion-captured. The fire, cloth and architecture are game geometry and approximations. These changes do not establish photorealistic or AAA visual quality, real chewing-gum physics, or a device frame-rate guarantee.

## Controls retained

WASD / arrows move; Space ascends or jumps; X descends. Release vertical input to brake. Q/E lean/strafe, Shift sprints on foot. Left mouse holds normal fire; right mouse holds and releases a heavy shot. R reloads, B opens the coloured gum table, F collects, H cleans gum on the ground, C switches FPS/top view, M opens the map, K opens help, Escape pauses. Ctrl/Command/Alt are not flight modifiers.

Mobile keeps independent left movement and right inner-aim / outer-fire ring. Hold the altitude buttons and release to return to neutral. Preparation still means picking a gum piece, moving the existing character's hand to the lips, then pulling the small bubble outward to inflate. No recipe-button wizard is restored.

## Verification and reproduction

Final local checks: **35/35 new checks plus 68/68 retained integration checks, 103 total**. Both optional routes were physically flown with scripted control through the actual terrain/controller. The retained suite covers four flight legs, three resupplies, four real gum-to-mouth/inflation gestures, projectile/body/envelope contact, weight, first-obstruction blocking, X descent, guide pause/resume and independent touch controls. New checks cover route rewards, optional storage, basic tactical states, camp serialization/restoration, teaching, colliders and shader/runtime errors.

Browser: Chromium with SwiftShader under Linux/Xvfb. Production logic and WebGL rendering were used with only asset/import URLs rebased to local blobs. Input checks use native browser keyboard/mouse events and synthetic multi-touch. Flight steering is scripted; screenshots are controlled test scenes. Viewports include 1440x900, 430x932, 430x744, 932x430 and 375x667. **No physical iPhone or Safari test was performed.** These assertions do not certify fun, complete balance, every hardware/browser shortcut or real-device performance.

From the repository root, serve with `python3 -m http.server 8080` and open `/Bubble/`. Tests require Python Playwright, Chromium and Xvfb:

```
xvfb-run -a python3 Bubble/summit/tests/ridge070.py
xvfb-run -a python3 Bubble/summit/tests/regression070.py
```

`SUMMIT_ROOT` points to the Bubble folder; `SUMMIT_REPORTS` changes output location. The scripts use `/usr/bin/chromium`. `regression070.py` runs the retained `qa060.py` suite with the new import harness and updated boot-version assertion; its inherited JSON metadata/file name still identifies that older suite. `verified-0.7.0.json` records the aggregate and exact runtime source blob hashes.

Asset and vendor licences remain unchanged in `assets/HUMAN-ASSET-LICENSE.txt`, `assets/SURFACE-LICENSE.txt` and `vendor/LICENSE.txt`. Prior implementation notes are retained in `EXPEDITION-0.6.0.md`.

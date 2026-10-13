# MAGIC bosses — editable Blender sources

Three original characters based on the user's approved concept sheets. The latest request increases actual GLB geometry and material detail as well as preview resolution.

Unit-animation revision: Colossus and Gargoyle have articulated opposite-arm Walk actions plus distance-driven planted-foot IK. Gargoyle normally flies with separate wing shoulder/tip motion, a forward-pitched body, tucked knees and prepared claws. Production Cannon physics holds its cruise body 1.1m above its grounded height; Claw lands first, and Dive rises, plunges, braces at the original damage time and returns to flight. Stun, grab, throw, ragdoll and death release flight control. Wraith uses a visible Hover; it has no invented walking legs.

The user selected [Riot's Galio](https://www.leagueoflegends.com/en-us/champions/galio/) as the animation reference. Actual Hero's Entrance video frames at 2.6s (compact airborne body/broad wings), 3.65s (low impact brace) and 4.15s (planted recovery) were inspected. These movement principles adapt to the existing original Gargoyle model; no Riot model or animation asset is copied. New flight motion does not change its original attack timings, damage or room navigation.

| Asset | Bones | Triangles | Animations |
| --- | ---: | ---: | --- |
| Rune Colossus | 15 | 4,830 | Idle, Walk, Slam, Sweep, Stagger, Death |
| Belfry Gargoyle | 23 | 6,112 | Idle, Walk, Hover, Dive, Claw, Stagger, Death |
| Chain Wraith | 21 | 11,825 | Idle, Walk, Hover, ChainSweep, Binding, Stagger, Death |

Each `.blend` contains the editable mesh, named bone hierarchy, skin weights, UVs, packed images, PBR materials and actions. `textures/` retains the original generated maps: 2048×2048 base detail and 1024×1024 normal/roughness. These are locally authored surfaces, with mesh geometry for the carved runes, joints, claws, folded cloth and scalloped wing membranes. No external model downloads or asset services were used.

Source units: metres, Z up, front +Y. Blender glTF export is Y up and front -Z; `boss-characters.js` applies a 180° Y rotation for the game's +Z facing convention. Movement is driven by the game; clips contain vertical motion, turning and secondary motion in place. The wraith's final opacity fade is a runtime material effect in addition to its skeletal Death action.

Rebuild with the verified Blender 5.1.2 installation:

```powershell
& 'C:\Program Files\Blender Foundation\Blender 5.1\blender.exe' --background --factory-startup --python source\bosses\build_bosses.py
& 'C:\Program Files\Blender Foundation\Blender 5.1\blender.exe' --background --factory-startup --python-exit-code 1 --python source\bosses\update_locomotion.py
```

The original builder alone recreates the old locomotion. The updater changes only Colossus Walk and Gargoyle Walk/Hover/Dive on the retained rigs. Original geometry, bind transforms, indices, UVs, weights, materials, packed images and other action channels are verified against protected assets by scripts/verify-unit-assets.mjs. Run only the updater when re-authoring these existing actions. source/hearth-bulwark/verify_locomotion.py reopens both editable boss sources and imports their actual GLBs to inspect joints, actions, weights and separate wing pivots.

Exports: `_source/public/models/bosses/*.glb`; the normal production build copies them into `models/bosses/`. No Unreal import claim is made.

Development viewer on the fixed project server: `http://127.0.0.1:5173/boss-viewer.html?type=gargoyle`. Select a character/clip, pause it, rotate or zoom. The viewer is not bundled into the shipped game.

Validation commands from the repository root:

```powershell
node scripts\inspect-boss-assets.mjs --all --hires
node scripts\verify-bosses.mjs
node scripts\benchmark-bosses.mjs
node scripts\check-locomotion.mjs --all
node scripts\check-gargoyle-flight.mjs
node scripts\capture-boss-motion.mjs
```

The reviewed compiled candidate is http://127.0.0.1:5173/.cache/latest-locomotion-delivery/index.htm. Latest evidence and limits are indexed in source/UNIT-ANIMATION-VERIFICATION.json. The flight check uses actual production AI and Cannon with reachable, controlled encounter fixtures; the motion comparison uses real before/after rigs in explicit presentation fixtures. Physical phone performance remains unverified.

For the actual Vite-served viewer after local integration, add `--live` to the inspection command. Closed mesh topology is checked during every export (outward signed volume, consistent shared-edge winding, manifold edges and non-degenerate triangles). A dedicated Blender regression covers both sculpted and manufactured plates plus the other closed primitives:

```powershell
& 'C:\Program Files\Blender Foundation\Blender 5.1\blender.exe' --background --factory-startup --python-exit-code 1 --python source\bosses\verify_surface_topology.py
```

The reported hollow-armour defect came from reversed XZ extrusion winding. Both plate cap variants and their bevels now face outwards; the regression fails on the original builder and passes after the correction. Backface culling remains enabled for opaque stone and metal. The colossus's arm and strike-slab rune strips are projected onto the corrected faceted surfaces so the raised caps do not hide the markings.

The first script imports actual GLBs into Three.js, samples posed bounds and loop continuity, captures 2560×1920 views and records real animation playback. The encounter script uses production gameplay/physics with explicit position fixtures and real pointer/keyboard input. Browser interception serves the candidate on the existing 5173 origin without a second server; it is not an unaided playthrough. The comparison script is a desktop before/after benchmark. Reports and recordings go under ignored `output/bosses/`; Playwright test profiles are owned and cleaned up.

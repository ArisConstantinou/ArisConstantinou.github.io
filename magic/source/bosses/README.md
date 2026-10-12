# MAGIC bosses — editable Blender sources

Three original characters based on the user's approved concept sheets. The latest request increases actual GLB geometry and material detail as well as preview resolution.

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
```

Exports: `_source/public/models/bosses/*.glb`; the normal production build copies them into `models/bosses/`. No Unreal import claim is made.

Development viewer on the fixed project server: `http://127.0.0.1:5173/boss-viewer.html?type=gargoyle`. Select a character/clip, pause it, rotate or zoom. The viewer is not bundled into the shipped game.

Validation commands from the repository root:

```powershell
node scripts\inspect-boss-assets.mjs --all --hires
node scripts\verify-bosses.mjs
node scripts\benchmark-bosses.mjs
```

For the actual Vite-served viewer after local integration, add `--live` to the inspection command. Closed mesh topology is checked during every export (outward signed volume, consistent shared-edge winding, manifold edges and non-degenerate triangles). A dedicated Blender regression covers both sculpted and manufactured plates plus the other closed primitives:

```powershell
& 'C:\Program Files\Blender Foundation\Blender 5.1\blender.exe' --background --factory-startup --python-exit-code 1 --python source\bosses\verify_surface_topology.py
```

The reported hollow-armour defect came from reversed XZ extrusion winding. Both plate cap variants and their bevels now face outwards; the regression fails on the original builder and passes after the correction. Backface culling remains enabled for opaque stone and metal. The colossus's arm and strike-slab rune strips are projected onto the corrected faceted surfaces so the raised caps do not hide the markings.

The first script imports actual GLBs into Three.js, samples posed bounds and loop continuity, captures 2560×1920 views and records real animation playback. The encounter script uses production gameplay/physics with explicit position fixtures and real pointer/keyboard input. Browser interception serves the candidate on the existing 5173 origin without a second server; it is not an unaided playthrough. The comparison script is a desktop before/after benchmark. Reports and recordings go under ignored `output/bosses/`; Playwright test profiles are owned and cleaned up.

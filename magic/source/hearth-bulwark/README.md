# C — HEARTH BULWARK

Playable unit-animation candidate: http://127.0.0.1:5173/.cache/latest-locomotion-delivery/index.htm

Interactive real 3D animation viewer: http://127.0.0.1:5173/.cache/hearth-viewer/hearth-viewer.html

The dormant clay/iron suit is reserved in a clear off-centre pocket in a random courtyard, hall or crypt. Nearby props and guards are preserved and repositioned only when needed to avoid overlap; bosses retain their own randomized room encounters. The permanent server is 5173. Normal source, saves and public release are protected.

1. C / ΦΛΟΓΑ absorbs a nearby visible torch, consumes 10 mana and extinguishes that real source. One flame can be carried.
2. At the sleeping suit, E / ΧΡΗΣΗ transfers that stored flame to the heart. The core lights and the suit wakes over 2.1 seconds.
3. E / ΧΡΗΣΗ boards through the rear gate and ladder over 2.4 seconds. Move with WASD or the existing touch stick.
4. Hold V / ΠΥΡ to fire from the nozzle under the right forearm. The nozzle follows the actual articulated pose; the jet and damage stop at walls. Hands remain free for telekinetic grabs and drag/release throws. Wooden props ignite, stone/metal do not.
5. Heart capacity 100; continuous fire uses 12 per second, piloting .2 per second, movement adds .55 per second, each throw uses 4. These are initial balance values in hearth-rules.js. E exits manually. Depletion performs safe exit, then kneels into sleep. Refill by absorbing another finite torch flame.
6. F / ΣΤΟΜΠ lifts the right leg .72m and plunges it into the floor. Damage, branching cracks, chips, dust and the bass impact start at sole contact (.62s), once per action. The left foot supports the suit. It retains the existing pulse's 25-mana cost and 5.2-second cooldown. Pause freezes the action; an empty heart cancels it before impact and starts the existing safe exit.
7. Measured thigh/shin lengths are .706m/.760m, extended .20m each from the approved short-leg rig. The upper suit and boarding anchors rise .40m; soles, topology, weights, textures and materials are preserved. Distance-driven world foot contacts and two-bone IK keep walking active during fire/throw. Stationary aim rotates the waist and pilot controls independently of planted legs.

Editable source: hearth-bulwark.blend with packed materials/maps, 30 named joints and 10 action clips including Stomp; generated GLB in _source/public/models/hearth-bulwark. Ground-contact IK and independent aim are runtime overlays in _source/src/locomotion.js and hearth-character.js. Pilot contacts are a separate skeletal IK overlay in _source/src/hearth-pilot.js, applied to the existing KayKit mage; they are not baked into the suit's clips. Blender 5.1.2 and project-local authoring helpers are pinned in provenance.json. Runtime Three.js 0.180.0 / Cannon 0.20.0. The original approved image is retained byte-for-byte. Geometry is deliberately adapted to the game's stylized art and camera; it is not a pixel-identical reconstruction.

Rebuild asset from repository root:

```powershell
& 'C:\Program Files\Blender Foundation\Blender 5.1\blender.exe' --background --factory-startup --python-exit-code 1 --python source/hearth-bulwark/build_bulwark.py
& 'C:\Program Files\Blender Foundation\Blender 5.1\blender.exe' --background --factory-startup --python-exit-code 1 --python source/hearth-bulwark/update_locomotion.py
```

The original builder alone produces the old nine-clip, short-leg asset. The idempotent updater preserves the new proportions and actions. To update animation on the retained editable source, run only update_locomotion.py. Verify source and actual GLB reimport with source/hearth-bulwark/verify_locomotion.py and scripts/verify-unit-assets.mjs before building.

Run npm test and npm run test:physics in _source; npm run build produces the isolated worktree's delivery. scripts/stage-locomotion.mjs stages immutable before and candidate builds into ignored subroutes of the existing 5173 server. No second port is used. See source/UNIT-ANIMATION-VERIFICATION.json for the latest contact, native controls, flight, visual, reimport and performance evidence. Primary/public promotion requires separate approval.

QA: check-hearth.mjs covers all clips and fuel/boarding/depletion/random placement; check-hearth-controls.mjs performs native desktop and CDP touch control sequences; benchmark-hearth.mjs records ABBA frame timings and an active-fire sample. check-hearth-delivery.mjs verifies served assets, normal saves and rendered restart resources. check-hearth-viewer.mjs tests animated pilot entry/exit; check-hearth-lifecycle.mjs tests mounted restart/death. See VERIFICATION.md and verification/ for results; full evidence is in output/hearth. The hearthQA query exposes explicit staging hooks only for tests; it is not enabled in the normal preview link. Test fixtures position actors and pause enemies; they are not claimed as an unaided full playthrough. Physical mobile devices and Unreal integration were not tested.

# C — HEARTH BULWARK

Playable candidate: http://127.0.0.1:5173/.cache/hearth-bulwark/index.html

Interactive real 3D animation viewer: http://127.0.0.1:5173/.cache/hearth-viewer/hearth-viewer.html

The dormant clay/iron suit is reserved in a clear off-centre pocket in a random courtyard, hall or crypt. Nearby props and guards are preserved and repositioned only when needed to avoid overlap; bosses retain their own randomized room encounters. The permanent server is 5173. Normal source, saves and public release are protected.

1. C / ΦΛΟΓΑ absorbs a nearby visible torch, consumes 10 mana and extinguishes that real source. One flame can be carried.
2. At the sleeping suit, E / ΧΡΗΣΗ transfers that stored flame to the heart. The core lights and the suit wakes over 2.1 seconds.
3. E / ΧΡΗΣΗ boards through the rear gate and ladder over 2.4 seconds. Move with WASD or the existing touch stick.
4. Hold V / ΠΥΡ to fire from the nozzle under the right forearm. The nozzle follows the actual articulated pose; the jet and damage stop at walls. Hands remain free for telekinetic grabs and drag/release throws. Wooden props ignite, stone/metal do not.
5. Heart capacity 100; continuous fire uses 12 per second, piloting .2 per second, movement adds .55 per second, each throw uses 4. These are initial balance values in hearth-rules.js. E exits manually. Depletion performs safe exit, then kneels into sleep. Refill by absorbing another finite torch flame.

Editable source: hearth-bulwark.blend with packed materials/maps, named weights and 9 action clips; generated GLB in _source/public/models/hearth-bulwark. Pilot contacts are a separate runtime skeletal IK overlay in _source/src/hearth-pilot.js, applied to the existing KayKit mage; they are not baked into the suit's clips. Blender 5.1.2 and project-local authoring helpers are pinned in provenance.json. Runtime Three.js 0.180.0 / Cannon 0.20.0. The original approved image is retained byte-for-byte. Geometry is deliberately adapted to the game's stylized art and camera; it is not a pixel-identical reconstruction.

Rebuild asset from repository root:

```powershell
& 'C:\Program Files\Blender Foundation\Blender 5.1\blender.exe' --background --factory-startup --python source/hearth-bulwark/build_bulwark.py
node scripts/record-hearth-provenance.mjs
```

Run npm test and npm run test:physics in _source; npm run build produces the isolated worktree's delivery. From root, publish-hearth-preview.mjs copies that verified candidate only into the ignored subroute of the existing server. build-hearth-viewer.mjs publishes the companion viewer there.

QA: check-hearth.mjs covers all clips and fuel/boarding/depletion/random placement; check-hearth-controls.mjs performs native desktop and CDP touch control sequences; benchmark-hearth.mjs records ABBA frame timings and an active-fire sample. check-hearth-delivery.mjs verifies served assets, normal saves and rendered restart resources. check-hearth-viewer.mjs tests animated pilot entry/exit; check-hearth-lifecycle.mjs tests mounted restart/death. See VERIFICATION.md and verification/ for results; full evidence is in output/hearth. The hearthQA query exposes explicit staging hooks only for tests; it is not enabled in the normal preview link. Test fixtures position actors and pause enemies; they are not claimed as an unaided full playthrough. Physical mobile devices and Unreal integration were not tested.

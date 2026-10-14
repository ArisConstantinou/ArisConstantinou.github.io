# MAGIC: connected map integration candidate

The full game keeps fourteen main rooms, the bridge, three secret areas, four bosses, combat, loot, fire, telekinesis and the actual HEARTH system. This candidate adds three upper floors (library 5.2m, gallery 4.8m, watchtower 6m), physical stair treads, floor-aware navigation, room-specific furnishings, upper rewards and single/double pressure gates. It is the connected game, not the earlier isolated threshold art sample.

The chosen camera is elevated perspective. Middle mouse drag rotates; wheel zooms; left grab and right shield stay assigned to combat. Keyboard and analogue movement use the current camera bearing for both mage and HEARTH.

When architecture obscures the controlled character, the complete wall section is hidden together with its trim, nearby attached columns, window surrounds and doorway members. It is restored when the camera moves. Physical walls and locked doors remain solid. The pressure trays and weights remain independent from the doorway cutaway. Materials are not faded into glass walls.

The build applies guarded transforms to the original game modules. It does not rewrite the primary checkout or the shared main/world/Greek architecture source. Existing published entries and hashed builds are preserved. The project keeps strict port 5173.

## Rebuild in the owned checkout

Run `node source/greek-environment/full-map/build.mjs` from the MAGIC checkout with its existing pinned dependencies. Run `node --test source/greek-environment/full-map/navigation.test.js` and `node source/greek-environment/full-map/verify.mjs`. The camera and cutaway scripts verify actual native input, comparable screenshots and measured desktop frame times. `baseline/source` is the pre-integration source snapshot, not a release.

## Verification and remaining scope

The local candidate passes 39 traversal/layout checks and 35 camera-input checks. These cover physical mage/HEARTH stair ascent and descent, native boarding/exit/reboarding on each floor, real plate contact, preserved room/boss counts and all WASD keys at four camera bearings. Cutaway before/after evidence is recorded separately; earlier test-fixture failures remain in the evidence folder.

The complete art objective is still active: approximately 70% Greek / 30% upgraded Gothic, contrasting regions, varied ground footprints, regional old Greek buildings and a monumental ruined Parthenon. The current rectangular ground plan and mostly Greek interior kit are not claimed as that finished result. Upper-floor Goliath and broader combat/loot behaviour still require verification. Browser portrait checks do not prove physical-phone performance. No new paid assets or generated models were used for this integration.

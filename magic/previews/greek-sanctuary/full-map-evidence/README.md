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

## Museum statues, partial stair cutaway and HEARTH clearance

The user's exact Caryatid and Venus GLBs are preserved under `statues/originals` with SHA256 provenance. The Artemision mesh comes from the SMK public-domain download. The packed editable `statues/greek-statues.blend` retains originals and separate runtime/fracture collections; `statues/greek-statues-source.zip` is a local archive, excluded from Git and hosting because it exceeds 100MB. Licenses and rebuild scripts accompany the six Draco-compressed runtime GLBs. The statues are marble replicas, including the originally bronze Artemision figure.

One statue stands in each of courtyard, gallery and sanctum. Collision damage breaks each into nine initial source-derived marble shards. Fragments retain normal collision and telekinetic pickup, then expire after 18 seconds. Static intact bodies use detailed hulls; moving debris uses oriented box colliders with unchanged visible geometry. The test fixture seeds projectile launches through actual hold/throw/contact damage; fragment pickup is verified with native mouse input. It does not establish every native flamethrower aiming scenario.

Stair cutaway now hides individual groups of three treads together with matching cheeks and stringers. The rest of the staircase stays visible and all physical treads remain. Identical camera/player fixtures fail six visibility assertions before the change and pass all thirteen afterward. The bearing column/beam moved slightly to clear a secret approach, so that geometric difference is visible in the comparison.

Secret gates and wall returns now clear a 3.8m by 4.25m opening, with matching manoeuvring space and a clear watchtower stair lane. All fourteen rooms, the bridge and all three secrets are reachable in the measured compound-body graph; native HEARTH boarding, entry and exit pass for all three secrets. Clearance fixtures use real pressure contacts but synthetic flame intersections for fire gates; complete native puzzle progression remains pending.

Final local checks: 215 game unit tests, 10 integration unit tests, 39 traversal, 35 camera, 12 wall cutaway, 13 stair cutaway, 14 clearance and 14 statue assertions pass. At 1440x1000 on this desktop, the sampled stair scene p95 is 8.5ms and the 24-active-shard statue fixture p95 is 14.7ms; these are bounded observations, not physical-device guarantees. The new comparison images and full logs remain local; hosted JSON reports are updated while older published screenshots remain archived.

# HEARTH palette sharing — candidate1.6.42

Protected public base:1.6.41, commitb2fe5dde4b6a71cf9fc39df0a728b8d8d76a85ab. The full-world60FPS goal remains open.

The public41 physical-phone structure audit found three visible HEARTH skins with three separate Skeleton objects but equal bone matrices:12,288bytes of bone textures. Regular actors and bosses already share their bindings; they were not changed.

`createHearth` now merges only SkeletonUtils-owned palettes with identical live Bone references, identical ordered inverse-bind matrices and equal bone counts. Mesh bind matrices, rigs, all authored animations and runtimeIK/aim/stomp remain unchanged. Independently animated actors and unequal bindings stay separate. Duplicate owned palettes are disposed before rendering; normal actor disposal retains unique ownership.

CPU test compares deformed vertices before/after across four arm rotations, confirms distinct inverse binds/actor bones remain independent and disposal occurs once. Private rejected culling experiments are absent from the runtime and publication list.

Physical-phone validation completed: all12initial regular enemies, all4bosses and native summons, exact source-byte match, palette-count read-back, separate same-pose Fire image A/B/A with strict zero-channel-change gate, exact save/benchmark restoration and public-menu recovery. No PC gameplay/FPS tests.

Existing compromises remain explicit: Lambert diffuse/IBL+normal/specular omissions, sampled fire noise and diagnostic frozen shadow generation. No new visual/gameplay feature is disabled. No FPS gain is attributed to removing two4KiB palettes. Two clean near60FPS fights plus dynamic shadow restoration are still required before room expansion.


Verified candidate engine:d1e813d45fd28ee41993a11a4055d5ede7b390096c71d17df82ba0aac4c171da. Native battle:19kills,4bosses,3summons,0errors/0prepared-reserve misses. Combat45.5787FPS, P9529ms, max85ms,5intervals>50ms. Idle58.75FPS. Every frame interval retained. Visible494x856canvas unchanged.

Same frozen Fire pose, separate/shared/separate:3/1/3palettes and12,288/4,096/12,288texture bytes. Shared and restored controls both changed0canvas channels. Screenshots inspected. Exact localStorage/IndexedDB restoration and public41menu/no-hooks recovery confirmed; connections closed.507local CPUtests passed (494publication-source tests plus13unused private experiment tests). This demonstrates a specific redundant resource/update correction; no meanFPS improvement is claimed.

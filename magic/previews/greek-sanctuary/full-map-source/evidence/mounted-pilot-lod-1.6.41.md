# Mounted pilot camera update — candidate1.6.41

The mounted mage is animated/posed by `hearth.sync`; `syncVisuals` deliberately
skips occupied players. That pose update does not receive an animation camera,
so `rigLod.update(options.camera)` returns early. On a fresh mobile benchmark
run the pilot remains at the initialLOD1, regardless of its small seated size.

Physical public1.6.40 inspection confirmed occupied=true, scale0.72, LOD1,
projectedPixels=null and40,551visible mage triangles. The public hashed engine
was read back and verified. This was an idle visual inspection only, stopped
before combat; it is not a combat FPS baseline. The prior complete1.6.40 fight
remains44.98FPS/P9528/max79ms.

The fix updates the mounted player's existing rig LOD from the current camera
after the engine/pilot pose and camera are established. It is mobile-only.
Existing on-foot updates, assets, thresholds, rig, seated hand targets, limbs,
pilot visibility, boarding/exiting and desktop behavior are retained. The
existingLOD2 has10,353triangles; no new model/export/texture was generated.

Verification criteria: existingCPUtests/build; physical seated view with
LOD2/10,353triangles; full native four-boss fight with all twelve regular
enemies and summons; every timed pilot sample must remain visible/LOD2 with
a valid projected size; no new shader/runtime errors; exact save restoration.
The full-world goal still requires sustained60FPS, dynamic shadows and later
room expansion. No improvement in total combat FPS is claimed from a vertex
count alone.

Full-combat result:46.89FPS/P9528ms/max85ms/four frames>50ms,19kills including
all four bosses and three native summons. All116timed pilot samples stayed
atLOD2, projected body32.59–33.49CSSpixels. Idle geometry averaged596,979scene
triangles versus627,945in the prior idle inspection. The pilot's native visible
surface is10,353triangles; its scale and seated pose remain unchanged. Phone
images were visually inspected. No runtime/shader errors or preparation misses.

The prior complete40fight was44.98FPS/P9528/max79/one frame>50ms. These are
different native paths and are not a paired FPS experiment; do not attribute
the small FPS difference to the fix. The geometry/LOD correction is verified.
Spikes remain visible in the full report and the sustained60gate is still open.

497existing localCPUtests and the canonical build passed. Actual WebKit engine
bytes matched01c24b7d74d7320bd46a4d2f30b80854cd190610b71f0ccb5d66f656ced453fa.
Exact phone storage was restored; public40menu/no hooks returned and all
connections closed. Publication verification is pending.

Fixed raw evidence folders: `tests/phone/pilot-lod-baseline` and
`tests/phone/mounted-pilot-lod` under `E:/CodexGenerated/Magic/staging`.
Private connection/storage backups must not be published.

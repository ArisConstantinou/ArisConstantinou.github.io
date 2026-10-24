# Mobile HEARTH projected-body LOD — 1.6.40

The elevated perspective camera makes the body axis shorter in the image.
HEARTH's previous LOD calculation estimated a face-on body from distance/FOV,
so it selected182,024triangles even at a small visible body size. The mobile
controller now projects both body endpoints into the actual drawing buffer,
including parent scale and camera orientation. The existing90/115pixel
hysteresis and close-detail thresholds remain unchanged. Desktop keeps the
previous metric. `hearthLod=legacy` is a diagnostic comparison override.

This chooses the existing58,892triangle surface of the same model: rig,
animations, pilot, textures, nozzles, flames, damage and attacks remain active.
It does not remove models or force a coarse surface at close viewing sizes.
The fixed mobile gameplay camera does not offer a user zoom; CPU checks cover
the close-view, rolled-camera, scaled-parent and near-plane selection cases.

## Physical iPhone evidence

iPhone14ProMax/iOS27.0.1/ChromeiOS. Canvas494x856, visible viewport430x745.
No PC rendering or desktop FPS measurements. QA seed10837 fixes the initial
roster; frame-dependent paths and summon timings can still vary.

| Public1.6.39 control | Combat FPS | P95 | Max | Kills | HEARTH triangles |
| --- | ---: | ---: | ---: | ---: | ---: |
| Original |39.45|31ms|455ms|19|182024|
| Existing LOD2, temporary render override |47.85|28ms|73ms|19|58892|
| Original restored |40.70|30ms|61ms|19|182024|

The455msfirst-run spike is retained. These measurements use the CURRENT
Lambert diffuse pipeline. The older PBR control had no useful LOD gain and is
not being relabelled as evidence for this change.

The third end-of-run probe already recordedLOD2 after the results camera moved;
it is not a combat snapshot. Timed early combat submitted755,989/632,756/756,021
triangles respectively, with zero render overrides in both original controls.
Their idle means were750,728/627,235/750,744. This is the restoration evidence.

Actual public engine bytes matched819fa8542c5734a4294ce2549776f60799f67e6959db8ca2deaf9c5e79280619
in all three runs. No AI, physics, attacks, summons, lights or fire were removed.

## Automatic-policy candidate verification

Exact intercepted candidate engine25e7079feb428f9e4d71ac2a6df7b74655b626bbdcb0a78f1b7f377be2509def
was read back from WebKit, not assumed from the response payload. A complete
native fight:44.98FPS/P9528ms/max79ms/one frame>50ms,19kills including all four
bosses and three native summons. No runtime/shader errors. All109timeline
samples selectedLOD2 automatically; body spans88.84–89.97drawing-buffer pixels.
Mean submitted combat geometry642,183triangles vs772,652in the first original
control. Prepared summons remained3hits/0misses.

Visual phone captures inspected: armour, limbs, pilot and silhouettes intact
at the gameplay viewing distance. The original LOD assets have different
geometry, so this is not a pixel-identical material/shader change. Saves and
the previous benchmark were restored exactly; public1.6.39menu returned with
no hooks and all USB inspector connections closed.

497localCPUtests (463game+34outer) passed, including retained private experiment
tests. The rejected skin-normal and flame-proxy experiments are removed from
the runtime and are not part of this release. Their private evidence is kept.

## Limits and remaining work

The candidate result is45FPS, not the47.85of the forced-LOD control and not60.
The courtyard60FPS gate remains open (two complete fights>=59FPS/P95<=20ms,
no combat frames>50ms), as do dynamic shadow restoration and room expansion.
Previous mobile Lambert/IBL/normal/specular compromises and the diagnostic
shadow freeze remain explicitly recorded. No new effect is disabled here.

Raw fixed-location evidence: `tests/phone/room-scaling-diffuse/report.json`
and `tests/phone/projected-hearth-lod/report.json` under the canonical staging
root. No private save/serial data belongs in the published evidence summary.

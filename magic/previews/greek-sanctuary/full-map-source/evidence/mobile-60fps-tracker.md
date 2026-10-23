# Physical-mobile 60 FPS progression

Goal: full world including real combat at sustained approximately 60 FPS on the connected iPhone. User approved step-by-step expansion, temporary feature disabling for diagnosis, fixes, and commit/push after every verified success. User also approved coordination with Epiphanios. No PC gameplay or desktop FPS tests.

## Acceptance gates

1. Courtyard: 12 regular enemies plus all four bosses, native attacks/summons, automatic real fire and stomp. Two repeat complete battles near the 60 Hz ceiling: target mean >=59 FPS, P95 <=20 ms, no combat frames >50 ms. Preserve every measured combat interval; loading is measured separately.
2. Add one adjoining room and verify fighting, movement, doorway transitions, loading stalls and saved-state recovery on the phone.
3. Repeat room-by-room. Full-world acceptance requires traversing the whole native world and repeating representative heavy combat, not just loading the map.

## Current protected release

1.6.37, ef80cb24041221785c2c008758eb555a9f27ba49. Public and source hashes verified. Editable source: `.source/combat-fps-20261021/source/game`. Canonical build: `E:/CodexGenerated/Magic/staging/build`. Latest previous final phone battle: 34.64 FPS, P95 42 ms, max126 ms. Stable60 unresolved.

## Checked / fixed / disabled

| Area | State | Evidence / next step |
| --- | --- | --- |
| Device USB / inspector | Connected | iPhone15,3, iOS27.0.1, Chrome; visible public game menu; 430x745 viewport /494x856 buffer. |
| PC rendering | Not running | All gameplay/FPS work on phone. Epiphanios coordination message sent to active owner; no competing Unreal process in host snapshot. |
| Mobile antialiasing | Fixed in1.6.37 | SMAA replaces native MSAA at same canvas size. |
| Interior room-mask shader | Fixed in1.6.37 | Conservative bound fast path; boundary path retained. |
| First-use GPU pipelines | Prepared in1.6.37 | Actual offscreen warm draw and asynchronous fence. |
| Bosses / regular enemies | All ON | Four bosses plus twelve initial regular enemies, native summons. |
| Torch flames / active lights / animation / physics | ON | No new suppression in current control. |
| HEARTH geometry | Checked, original retained | Phone A/B/A 28.08 /28.88 /27.45 FPS; ~117k fewer triangles did not resolve combat cost. No model-detail change retained. |
| Shadows | Existing diagnostic freeze | First frames generate original shadow maps; subsequent maps frozen in the existing courtyard fixture. Must address before full-world acceptance. |
| Full world | Not yet under test | Courtyard gate must pass first. |

Private raw evidence and save backups stay under the fixed generated tests/phone directories. Never publish private phone connection data or storage backups. Benchmark export remains `magic-benchmark.json`.

## Current next control

Temporarily omit only the two named `hearth-jet-volume` draws, then restore and repeat the full fight. Models, smoke, light values, damage, physics and AI remain active. The volume shader marches32 samples per pixel at mobile quality, with procedural turbulence at each active sample. Causality is pending the phone result.

Inspector recovery: large restore input timed out; compressed chunk transfer restored exact localStorage and IndexedDB values. Public menu and connections restored successfully. This changes the test tool only, not game performance.

Jet volume draw control completed on phone:35.82FPS with volumes omitted,27.89FPS after restoration. Damage, lights, smoke, models and AI stayed ON. Significant partial GPU cost; not the sole cause. Next: compare reversible passes on exactly one frozen combat pose/camera to avoid different combat paths confounding the controls. This frozen render experiment cannot count as60FPS combat acceptance.

## PBR controls and next applied candidate

Same frozen pose: baseline29.60FPS; environmentOFF59.90; shadowsOFF30.26; normal/bumpOFF57.84; restored33.59. Global mediump material was BLACK and is invalid despite60FPS. Tangent/partial-lighting precision follow-up did not improve the valid visible scene (~25 vs27FPS), so neither is retained.

Candidate1.6.38 applies temporary IBL environment lighting OFF on mobile, keeps normal maps, shadows, all lights and all fire. Native reference can be restored by `mobileIBL=1`. Physical full-fight result: idle54.40FPS/P9526ms; combat31.11FPS/P9541ms/max181ms/16frames over50ms. All four bosses and19 total enemies killed, no reported errors,79 visible normal-mapped materials, correct visible screenshot. Exact storage/public menu restored. This FAILS the courtyard gate; further identical repetitions were skipped and the candidate has NOT been published.

Next bounded diagnosis: candidate environmentOFF, same frozen pose after six seconds of real combat; compare fire shader omission, point-light omission, normal/bump omission, combined fire/light omission, and restored baseline. These are controls only, not combat acceptance. Goal remains active; full-world expansion has not started.

Attribution correction: the jet-volume whole-fight difference is confounded by changing combat paths. The earlier frozen-pose omission improved only29.02to30.38FPS. PBR controls give stronger evidence of material shading cost. Global mediump's black image is rejected regardless of its measured cadence.

## Real-combat follow-up (not published)

- Correctly applied IBL+normal/bump OFF: idle59.34FPS, combat30.23FPS/P9541ms/max167ms. Visible normal count0; all models/lights/fire retained. The first material implementation's cached-clone map restoration was fixed and regression-tested. Correct application still did not solve combat.
- Important limitation of the six-second frozen-pose experiment: the engine was in Stomp and `firing:false`. It did not represent active volumetric fire. Stop treating those frozen controls as combat predictions.
- Live diagnostic upper bound: point-light drawing + all custom game shader draws OFF, PBR retained:43.69FPS/P9526ms. Additional flat-textured PBR replacement:59.33FPS/P9518ms/max285ms, four frames over50ms. All models, AI, physics and kills stayed active. Neither visual control is a deliverable.
- Blinn-Phong candidate with lights/fire restored:31.04FPS/P9539ms/max178ms;107 valid changed shader programs, no shader errors. No useful gain; not published.
- Current next candidate: stock Lambert diffuse lighting plus shared256KiB3D noise for the two jets/smoke, with the original32mobile ray steps. IBL/normal maps remain temporaryOFF. All models, point lights, fire and current shadows stayON. Full phone battle and image validation pending under `tests/phone/lambert-volume`.
- Source suite454game+34outer tests passed. One canonical build reused. No PC gameplay. Published version remains1.6.37; no failed candidate pushed.

## Verified intermediate improvement prepared for publication

Lambert+shared3Dnoise candidate full phone fight:48.33FPS/P9530ms/max176ms,13combat intervals over50ms.19kills including4bosses; original12+4initial roster; attacks and summonsON;0errors.110valid Lambert programs and6noise programs,0link failures. Actual engine source bytes SHA-256 match canonical build (`fc4632ffa2532cf9ab45200679e8e02577cdc1903890816cad089ce89df2fa72`). Correct visible phone screenshot,0visible normal-mapped materials, active lights retained, exact storage restoration and connections closed.

This is one visual full fight, including screenshot overhead, and an intermediate improvement over the protected public battle34.64FPS. It is NOT the courtyard60FPS gate and does not authorize room expansion. Temporary trade-off: Lambert diffuse lighting, IBL/normal/bump/metallic specular shading omitted; original colour/AO/emissive textures, all models and point lights/fire retained. Existing frozen shadow generation remains diagnostic. Full reference uses `mobileIBL=1&mobileNormals=1&fireNoise=procedural`. Correction: pinned r180 Lambert is per-fragment diffuse lighting, not vertex lighting; the earlier description was inaccurate.

Next: test the mobile render budget at430x745 (one drawing-buffer pixel per CSS pixel) instead of494x856, then combat stalls/first-use preparation. This is an explicit resolution trade-off; physical screen/DPR and DOM controls remain unchanged. Two clean near60FPS battles and restored dynamic shadows remain required before adjacent-room expansion. User requires commit/push each verified improvement;1.6.38 committed/pushed as `f081e0d8f22368228a91ac16d4d77658f3991661`, Pages/public verification pending.

Publication verified: Pages run40035571881 succeeded forf081e0d, all planned committed source and public runtime hashes matched. Release hash0f4672bc6fb072a1b66820b046574df468c1b8047b6b94befb3c50d9caa54c6b. Phone restored to the public1.6.38 menu, exact saves/benchmark preserved, no hooks, connections closed. Receipt: `E:/CodexGenerated/Magic/staging/work/single-room-publication/mobile-material-receipt.json`.

430x745 control completed:50.81FPS/P9528ms/max168ms, four combat frames over50ms. This small improvement does not solve the gate; lower resolution NOT retained in source. PhysicalDPR3 was immediately restored; source keeps494x856. Next concrete stall: gameplay57ms+render43ms at25270ms aligns with first native three summons (timeline25411ms). Precreation/preparation during loading is the next candidate, not disabling summons.

## 1.6.39 — specific summon-stall fix verified

Bounded one-shot precreation/preparation of nine original visuals during Start loading, then native summons take them at their original attack times. No new visual/gameplay feature OFF. Initial six-visual trial exhausted during a three-wave fight; stale miss telemetry was caught and corrected before publication. Live snapshot provider now exposes current hit/miss counts.

Final three complete phone fights: all four bosses killed each; diagnostic run exercised9summons/9preparedhits, clean runs3summons/3hits each;0misses and0errors throughout. Clean summon windows: gameplay12/13ms and render8/11ms, compared with prior57/43ms. Clean full battles44.12/42.66FPS, P9532/33ms, max75/54ms,2/1frames over50ms. This is a stall fix, NOT a mean-FPS improvement or the60FPS gate. Exact saved state/public menu restoration verified.491source tests and canonical build passed; exact phone engine hash819fa8542c5734a4294ce2549776f60799f67e6959db8ca2deaf9c5e79280619.

One visual fight additionally captured WebKit Timeline/native counters and a native draw inventory; diagnostic only. Device-wide GPU utilization was about60–66%, Composite mean wall-time10.14ms (not direct GPU time), layout/paint small. Inventory includes182k HEARTH and41k mage triangles. Next: reduce renderer work while preserving the original geometry and appearance, beginning with the pinned skin-normal shader's matrix calculations. Courtyard near60 repeat and dynamic-shadow gates remain required before room2.

# Physical-mobile 60 FPS progression

Goal: full world including real combat at sustained approximately 60 FPS on the connected iPhone. User approved step-by-step expansion, temporary feature disabling for diagnosis, fixes, and commit/push after every verified success. User also approved coordination with Epiphanios. No PC gameplay or desktop FPS tests.

## Acceptance gates

1. Courtyard: 12 regular enemies plus all four bosses, native attacks/summons, automatic real fire and stomp. Two repeat complete battles near the 60 Hz ceiling: target mean >=59 FPS, P95 <=20 ms, no combat frames >50 ms. Preserve every measured combat interval; loading is measured separately.
2. Add one adjoining room and verify fighting, movement, doorway transitions, loading stalls and saved-state recovery on the phone.
3. Repeat room-by-room. Full-world acceptance requires traversing the whole native world and repeating representative heavy combat, not just loading the map.

## Protected base44 and verified update45

1.6.44, commit e42d046fd26edae634e45705c3ec4d87a5ccfe52: Pages40067999891/nativepublic enginef73bf8be0b63/defaultprofile/savehashes verified. Heavy5276vs21889distance surface shipped, originalnearassets intact. Verified45update below adds Archer5500vs19998triangles; observed native48.71→52.56FPS withsame19kills/4bosses/3summons, not sustained60FPS. Publication identity is served release.json. Fullworld/dynamic-shadow gates remain OPEN.

## Checked / fixed / disabled

| Area | State | Evidence / next step |
| --- | --- | --- |
| Device USB / inspector | Connected | Physical iPhone15,3/Chrome; private43stage and exactengine proof succeed after fresh inspector reattach. Main save/report preserved across completed controls. |
| PC rendering | Not running | All gameplay/FPS work on phone. Epiphanios coordination message sent to active owner; no competing Unreal process in host snapshot. |
| Mobile antialiasing | Fixed in1.6.37 | SMAA replaces native MSAA at same canvas size. |
| Interior room-mask shader | Fixed in1.6.37 | Conservative bound fast path; boundary path retained. |
| First-use GPU pipelines | Prepared in1.6.37 | Actual offscreen warm draw and asynchronous fence. |
| Bosses / regular enemies | All ON | Four bosses plus twelve initial regular enemies, native summons. |
| Torch flames / active lights / animation / physics | ON | No new suppression in current control. |
| HEARTH geometry | Fixed in1.6.40 | Mobile projected-body LOD uses the existing58892triangle surface at~89.6pixel body size, original rig/textures/nozzles/pilot. Current diffuse A/B/A39.45/47.85/40.70FPS; automatic policy44.98FPS. Desktop metric unchanged. |
| Mobile surface lighting | Temporary approximation | Lambert per-fragment diffuse; IBL, normal/bump and metallic/roughness specular omitted. Full-reference query remains documented. |
| Fire noise | Temporary sampled approximation | Shared256KiB64cubed lattice; same32mobile samples/shape/lights/smoke. Rejected shader/proxy experiments are absent from runtime. |
| Mounted mage | Fixed in1.6.41 | Existing LOD2 now selected from the camera after seated posing;10353vs40551triangles,116timed samples at32.59–33.49CSSpixels. No asset/rig/animation changes. |
| HEARTH bone palettes | Fixed in1.6.42 | Three exactly equal live bindings share one palette;8192bytes and two redundant palette updates removed,0changedFire-pose channels. No new feature disabled. |
| Shadows | Existing default freeze retained; cache fix verified privately |43dynamic nativecontrol:40.66FPS/P9533,19kills/all4bosses/3summons, cachehits3947to6087,0uncovered static triangles/latecallbackfailures. Full/cached/full-repeat Fireimages0changed channels. Dynamic-default proposal rejected; final43default-profile verification pending. Must restore dynamics before full-world acceptance. |
| Full world | Not yet under test | Courtyard gate must pass first. |

Private raw evidence and save backups stay under the fixed generated tests/phone directories. Never publish private phone connection data or storage backups. Benchmark export remains `magic-benchmark.json`.

## Current next step

Latest authoritative checkpoint:523CPUchecks/buildpass. Fixed actual static-triangle coverage and room/Lambert shader-wrapper proof propagation, same original1024/44unit map and light direction. Full dynamic43control completed with exact source/save/pixelproof, but40.66FPS is below60;43retains42's existing default freeze. FINAL default-profile actualengine82dd9fff4a4b proof and fullfight passed:48.35FPS/P9528/max85/threecombat>50ms,25kills/all4bosses/9summons,0errors/misses; idle58.82/settle60.05. Separate live-shadow full/cached/fullrepeat pixels0changed; exactstorage restored.42baseline45.58had3summons, so no causal meanFPS-gain claim. Publication preparation follows; no43pushyet. Then integrate/test the PRIVATE Heavy5276triangle indexsidecar (original21889) on the phone;28actualclip CPUposes pass and original buffers/rig remain shared. Exact2Meshoptimizerfiles approved/downloaded/verified. Earlier notes below are superseded checkpoints.

Private1.6.43: fixed-room sun projection and conservative receiver guard now integrated;516CPUchecks and canonical build pass. Whole1.401roomfade fringe is covered with .8unit spare margin (>18current shadow texels). Unknown vertex callbacks, exposed foundations, adjoining rooms and unsupported actor heights retain the original following sun. The actual foundation rocks extend to-13.33m; receiver visibility uses the perspective frustum/floor occlusion proof rather than ignoring them. Native42 dynamic-shadow reference37.59FPS/P9538/max90/10combat intervals>50ms,19kills/4bosses/3summons.43native stage/sourceproof/combat/full-cached-full image gate pending USB reconnection; no performance gain claimed and no43commit/push. Unknown custom world-material callbacks may still force safe fallback and need exact native inspection before reviewed contracts are added. Production shadow freeze unchanged; candidate tests explicitly use freeze=0.

Independent far-LOD path: actual original67bone/7clip Heavy rig decoded offline,28numericposes checked; index-only sidecar loader shares original vertex/skin/UV buffers and validates provenance atomically. It remains unimported, with no new model installed. Pending user approval for only pinned Meshoptimizer v1.3JS67671bytes+MIT1079bytes; no download or global installation performed. This is separate from the pending phone reconnection question.

Default494x856 retained. Native42 pixel-budget control: A53.50FPS/19kills/3summons vs B50.82FPS/25kills/9summons at365x633; differing workloads confound causality and no practical gain was established. ThirdA skipped. Exactphone saves/benchmark/public42menu/nativeDPR3 restored, connectionsclosed. No lower-resolution production change.

Allactors already use existingfarLOD2: regularArcher19,998triangles,Heavy21,889 at~39–40CSSpixels. Heavy authoring source and original compressed geometry/bindings identified. Derived Blendercollapse prototype only reaches20,217 atrequested.25ratio; strippingUVs or removingArmature during reduction gives exactlysame count. No acceptednewasset and no invalid-source claim. See HEAVY-FAR-STATE.json for exact hashes/results and next alternative retaining skinIndex/skinWeight. No repeats of unchanged failed methods. Native pose/image/fullcombat tests required before publication; dynamicshadow restoration stillrequired before room2.

## Earlier controls — historical1.6.37/PBR pipeline

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

1.6.39 publication completed: commit74299a7 pushed to main and benchmark branch; Pages40039978584 success, all public runtime and committed source hashes matched. Release hashced63cdcb936d55a2080a8ada7c8b081da7d37cccc35b3a2dedf45798dbedc2b. Receipt: `E:/CodexGenerated/Magic/staging/work/single-room-publication/prepared-spawns-receipt.json`.

## Unpublished1.6.40 shader control — no established FPS gain

Reassociated affine skin-normal arithmetic passed200matrix cases, normal/tangent branches, actual shader links, and132/127rig checks with no non-affine inputs. Original-matrix native battle41.71FPS/P9534/max77ms,22kills,789k mean triangles; affine3x3 battle44.63FPS/P9532/max90ms,19kills,758k mean triangles. Different workloads confound that small difference. Both screenshots were captured during idle, outside measured combat; storage restored and public1.6.39 menu returned.

The3x3 shader is now diagnostic opt-in only (`skinNormals=optimized`), NOT enabled by default and NOT published as a performance improvement. Default source uses original math.493source tests and canonical diagnostic build passed. Future controls have seed10837 in the test harness only; those seeded runs have NOT been executed and must not be confused with the existing unseeded evidence. Stronger matched input is needed before attributing small FPS changes. Full-world goal stays ACTIVE; no room expansion yet.


## Private40 follow-up: flame raster bounds (31.0%, goal ACTIVE)

Implemented conservative CPU support bounds around the unchanged volume shader;360,000scalar samples and495tests pass. Physical seeded A/B,actual resource96c20574verified,both initial16actors/canvas494x856:39.34FPS/P9537/max74/22kills vs39.54/P9531/max82/19kills. No gain;idle also differed57.76vs48.90with invisible jets. No third repeat or publication;original proxy remains default. Separate frozen two-jet visual fixture uses48samples,not production32: visually intact but2782pixels differ(max9/255,mean0.000407/255),not exactpixel pass. Phone saves restored/public39menu,no hooks/connections. Source safety fix after test preserves transparent sorting centre,CPUcovered;canonical rebuilt,not phoneverified. Details JET-RASTER-BOUNDS.md. Next bounded investigation: original model projected LOD under current diffuse pipeline,not more blind shader controls. No room expansion until60gate.


## 1.6.40 projected-body mobile HEARTH LOD — verified candidate, publication pending (36.0%)

Current diffuse public39 A/B/A:39.45/47.85/40.70FPS,same19kills,182024/58892/182024HEARTHtriangles. Fixed mobile LOD projection (actual body endpoints/drawing-buffer span,scale and angle),existing thresholds/hysteresis retained,desktop unchanged. Candidate automatic policy44.98FPS/P9528/max79ms/19kills/4bosses/3summons;109samples allLOD2,88.84–89.97pixels,noerrors,3preparedhits/0misses. Meancombat642183triangles. Allphone saves restored/public39menu/nohooks/connectionsclosed.497localCPUtests/build passed. Skin-normal/flame-proxy experimental integrations removed from runtime. Specific LOD fix is ready for commit/push;60FPS gate and fullworld remainOPEN. Details PROJECTED-HEARTH-LOD.md.


1.6.40 publication VERIFIED: commit3ed15b9135330ecf09ced0a9008338d62dc2709b on main+benchmark, Pages40046836316success. Releasehashca984a016e8509c288609b099345a13435fabfba5b2b017f9b0172e0dec5e162, all runtime/source hashes match. Physicalpublic40menu loaded exactengine25e7079f, noQA/hooks; exactsave/report hashes preserved; connectionsclosed. No activejob/writer. GoalACTIVE38.0%,not60/fullworldcomplete.


## 1.6.41 mounted pilot camera update — verified candidate, publication pending (40.0%)

Public40idleinspectionconfirmedmountedMageLOD1/40551triangles/projectedPixelsnull/scale.72:hearth.syncanimateswithoutcameraandnormalsyncskipspilotedplayer. One mobile rigLod.update(camera)afterpose/camerafixesitusingexisting10353triangleLOD2,noassetschanged. Fullnative41fight46.89FPS/P9528/max85/four>50ms/19kills/4bosses/3summons;116timedsamplesallpilotLOD2at32.59–33.49CSSpixels,previousHEARTHLOD2retained,zeroerrors/misses. Differentpathsfrom40reference44.98FPS:smallFPSdifferenceisnotattributed. Actualengine01c24b7dverified;497localtests/buildpassed,seatimageinspected,savesrestored/public40menu/nohooks/connectionsclosed.60FPS/fullworldOPEN. DetailsMOUNTED-PILOT-LOD.md.


1.6.41 publication VERIFIED: b2fe5dde4b6a71cf9fc39df0a728b8d8d76a85ab/main+benchmark;Pages40048723203success;releasehashb58245903057aa94d0326920a3e389ebcf3a95b13b6e0578a4d0aaa275ffd905. Runtime/source hashes match. Actualpublicphone41menuengine01c24b7d/noQA/hooks,save/reporthashesunchanged,connectionsclosed. GoalACTIVE41.0%,not60/fullworldcomplete. Rawpublic40summaryretainedonceinphone/public-release/before.json.


## Closed-surface controls — rejected, not shipped

Public41 native opaque FrontSide A/B/A:46.12/53.94/44.98FPS. This broad diagnostic could hide open cloth/interiors and was never a production fix. Exact-position topology classification (including exact skin bindings) admitted only50,144 weighted triangles of552,005 audited opaque DoubleSide triangles. Regular/boss actors already share their palettes; only HEARTH had redundant ones.

The first conservative material-side candidate completed25kills/4bosses/9summons at43.39FPS, P9533ms, max55ms, one combat interval>50ms. Same-pose A/B/A changed13channels, max45/255; restored A matched exactly. The raster-only revision kept the original shader, but still changed34channels, max61/255; restored A again matched exactly. Its frozen render wall times were approximately2–4ms in both modes, not a combatFPS measurement. Both approaches failed the strict pixel gate, were removed from runtime and were NOT committed/published. Private classifier/raster tests remain unused experiments only.

Source check: fire noise already uses a single hardware-trilinear3Dtexture sample per noise evaluation. No second copy of that optimization was added. No new feature was disabled.

Next applied candidate42: share HEARTH's exactly equal live joint/inverse-bind palettes,3to1(12to4KiB visible bone textures). Original mesh bind matrices, rig/IK, geometry, materials and animations retained. This is a small redundant-work correction, not a claimed60FPS solution. Native full battle plus same frozen Fire-pose separate/shared/separate control pending.


Candidate42 palette fix verified on physical iPhone:3skins/1palette/4096bytes before and after the complete native battle;19kills/4bosses/3summons,0errors/0reserve misses.45.58FPS/P9529/max85/fivecombat intervals>50ms. Separate/shared/separate Fire-pose images:3/1/3palettes,12288/4096/12288bytes,0changed channels in shared and restored views.507local CPUchecks passed including13private experiment tests excluded from publication. Saves/report exactly restored; public41menu/nohooks/connectionsclosed. Publication of the narrow resource fix is next; no FPS gain or60FPS acceptance claimed.


42publication completed:97ceb1d main+benchmark, Pages40053701515success, allpublicruntime/sourcehashesverified, release4020abc2fe2f4ccfff5231e225e311c05fc4bdf3b50ef8aaba742b8e461b22e7. Physicalpublic42source readback and exactsavehashes passed; noQA/hooks. Next bounded phone pixel-budget control running.


Heavyfar offline checkpoint: originalsourcehash093d4557... unchanged. Derived20,217triangle draft is NOT integrated/accepted. UV and Armature-stack hypotheses rejected by equal-result controls. Current42defaultresolution/models unchanged. Goalactive45.0%.

Private43 continuation: reviewed world shader contracts registered separately from skin/interior eligibility; Lambert propagation and late callback invalidation verified.519CPUchecks/buildpassed. See ROOM-SHADOW-ANCHOR.md. USB remains absent; no native43 measurement/publication.

Blocked audit: USB absent for3consecutive goal turns (latest authoritative usbmux=[]). No activephone job;519CPUchecks/buildalreadycomplete. Goalmarkedblocked pending physical reconnection/resume. Protectedpublic42; private43notpublished; fullworld60FPSunachieved. Separate exact2fileMeshoptimizer approval stillpending.

2026-10-24 native shadow milestone (PRIVATE43): exact static triangles + safe room/Lambert wrapper compositions fixed; dynamicsON realfight40.66FPS/P9533/max86,19kills/all4bosses/3summons;exactcachehits3947to6087;6243roomframes/0uncoveredtriangles/0latecallbackfailures. Full/cached/full-repeat Fireimage0changed channels, exact storage restored. Dynamic-default proposal REJECTED;43finaldefaultretains42freeze.523CPUchecks/buildpassed. Final default-profile native39335 live; no43pushyet.

43milestone verified: commit/pushmain+benchmark, Pages, allsource/runtimehashes and actualpubliciPhone43default/source/storage proof passed. GoalACTIVE48.0%; courtyard60gate NOT passed; no adjoiningroom expansion. NextHeavy5276sidecar nativeimage/fullcombat/tailvalidation; futurepublicationbaseb97/priorroom-shadow-plan/version44. Do notrerun43push.


## 1.6.44 — Heavy mobile LOD verified; publication identity in release.json
- FIXED: distant Heavy21889→5276triangles, same original vertex attributes/materials/live rig; no extra bone palette. Optional3rd distance band51/69CSSpx; near models unchanged. New JSON records actual installation/LOD/triangles/errors.
- CHECKED:524CPU checks,28numeric actual-rig poses,12inspected native same-pose images, complete iPhone fights with all4bosses. Original43.13FPS/9summons; candidate48.76FPS/3summons. Workloads differ: no causal FPS-gain claim. Exact saves/benchmark restored.
- DISABLED: no new disable; existing Lambert/IBL/normal/specular omissions and diagnostic shadow freeze remain.60FPS/fullworld and room2gate still OPEN.
- See HEAVY-INDEX-LOD.md and native heavy-index-lod comparison/visual-review evidence. Prior separate image fixture with results-overlay obstruction is rejected.


## 1.6.45 — Archer mobile LOD verified
- FIXED: distant Archer19998→5500triangles; mainbody17746→3248, all9small crossbow/garment parts original. Same92bones/8clips/vertexattrs/materials,1actorpalette. Completeprimitive coverage andunchanged-accessory guards. New JSON records actual ArcherLOD/recipe/triangles/errors. Heavy44retained.
- CHECKED:525CPUchecks,32actual-rig numericposes,16inspected native aiming/walk/shot/reload front/side images. Allposepairs sharedrig/attrs/bind/worldmatrix assertions passed. CompleteiPhone original48.7108FPS/P9527 vsnew52.5577FPS/P9525/max71, same19kills/4bosses/3summons; exactsaves restored/noerrors. Frame-dependent paths differ; observedpair not guaranteedcausal fixed-frame gain. Steadyinitial geometry528752→470760tris.
- DISABLED: none new. Existing Lambert/IBL/normal/specular omissions andfreeze remain.25–35s combat47–50FPS stillfails60gate; room2/fullworld OPEN.
- See ARCHER-INDEX-LOD.md and scoped native evidence.

# MAGIC 1.6.24: automatic evidence for the idle 60-to-28 transition

The user reconfirmed that accepted 1.6.23 starts at 60 FPS and then falls to about 28 while stationary. The cause on that device is **unconfirmed**. Neither sustained physical-mobile60 nor PC200 across supported scenes is certified. No phone connection is required to continue engineering or collect this release's automatic report.

The protected baseline is main `fae9d52ba1907c54e7b8223924922eaff39c550e` / 1.6.23. Work is isolated in `.source/idle-bottleneck-20261020/source`; the existing port5173 serves its own candidate route and isolated save. Primary `codex/trajectory-collision` and unrelated dirty/untracked work are preserved. Previous compiled engine files are retained.

## Findings and decisions

- Natural desktop idle measurement agrees with the HUD counter. Its native windows measure about60 FPS and5.1ms JavaScript/driver work per frame. Sixfold CDP CPU throttling produces about17.4 FPS,55ms work and8.5ms physics work; restoration returns to60. This is a controlled CPU-capacity experiment, not phone emulation, proof of thermal throttling or reproduction of the user's specific platform transition.
- Rendering, animation and120Hz fixed physics continue while standing. At lower rendering cadence more physics substeps run in each rendered frame. This can amplify lost CPU headroom. The physics step, solver, AI and gameplay were not changed.
- The shadow cache on/off/on test did not account for the CPU collapse. Heap samples did not grow monotonically. Earlier natural public idle captures also showed no ongoing rise in texture uploads or submitted geometry. These observations do not exclude loading or contention on the actual phone.
- Bypassing matrix walks for414 proven hidden room branches/749 descendants was measured and rejected. At6x CPU slowdown A/B/A was17.80/17.00/17.33 FPS; it has no demonstrated benefit and is absent from the release.
- A build transform was computing `groundAt` for every prop immediately before returning without using that result. The lookup now runs after the prop return. Actors retain the exact floor resolver, flight, foot placement and upper-floor behavior. This removes avoidable work; it is not presented as the cure for60-to28.
- A native mobile-viewport desktop A/B/A retained221 draws and713,371 triangles throughout, with60 FPS in every stable window. Whole-frame CPU means were5.64/5.84ms before,5.07/4.97 candidate,5.29/5.23 restored. GPU means also drifted; these are bounded observations, not a reliable mobile FPS improvement percentage. This capture preceded the context-recovery-only diagnostic fixes.

## Automatic local report

Normal play records one-second windows: actual rAF cadence, JavaScript/driver work and phase costs, draw/triangle counts, canvas/quality, room, position/speed, texture lifecycle, renderer resources and awake-body count. It retains180 recent windows,12 early windows and up to40 distinct events. Repeated blocked frames retain a gap's start/end/count instead of erasing earlier context events.

After a window at least50 FPS followed by three consecutive windows below36, one drop record is saved locally under `magic-performance:last-drop`. The report says `cause: unconfirmed`. A later export also includes the saved drop after a page reload. It neither sends telemetry nor includes the game profile/inventory.

At most one GPU sample per second uses a timer query where supported. A zero-timeout asynchronous fence also provides a completion upper bound where timer queries are unavailable. Fence results include timer scheduling delay and must not be called GPU duration or proof of a browser cap. There are no synchronous GPU waits, flushes, omitted passes, quality changes or synthetic game frames. Context loss/restoration resets the extension state, Pause and background gaps are excluded from play cadence; texture stalls remain included in actual cadence and are annotated explicitly.

Pause -> **Αναφορά απόδοσης** downloads `magic-1.6.24-performance.json`. The new control is14px with a44px touch height in both orientations. Capturing requires normal play, not a manual benchmark or a connected phone.

## Verification and limits

427 unit tests (364 game,63 root/monument), production build, native touch movement/conjure/pulse/pause/resume in both orientations, local report export with timer-query support and without it, and actual WebGL context loss/restoration/resume are covered. The last context test waits for real texture preparation and subsequent measured frames; checking only `phase=playing` was insufficient. The initial client invocation was a menu smoke; the corrected gameplay invocation is tracked separately.

The controlled recorder test deliberately reduces only the owned browser tab's CPU capacity to generate the transition. The output correctly preserves early60 FPS, later roughly24-31 FPS, unchanged texture uploads, greater CPU work and restoration. That validates the recorder, not the diagnosis of the user's phone.

The1.6.23 first-pose portrait six-channel1/255 image discrepancy is unchanged and remains recorded in the prior release evidence. No image/asset/shader changes are introduced here. The deliberate offline upgrade test can produce a worker fetch error for the network-only release-check route; exact save preservation and offline game reload are checked separately.

Evidence and current publication state: `STATE.json`, `VERIFICATION.json`, `DELIVERY.json`, `PUBLICATION.json`. No new agents, installations, dependencies or model changes were used in this follow-up. Attributable task usage and credits are unavailable.

The final2560x1440 High desktop A/B/A measured260/268,266/263,258/272 FPS respectively, on an RTX5080 with uncapped browser flags. The candidate overlaps its controls. This verifies a short idle throughput condition, not actual200Hz display presentation or all-scene performance. The timing capture preceded the final load-gap accounting fix, which does not change stable-play work. Final recorder, context recovery, release upgrade and compiled asset checks pass; see `VERIFICATION.json`.

The final2560x1440 High desktop A/B/A measured260/268,266/263,258/272 FPS respectively, on an RTX5080 with uncapped browser flags. The candidate overlaps its controls. This verifies a short idle throughput condition, not actual200Hz display presentation or all-scene performance. Final recorder, context recovery, release upgrade and compiled asset checks pass; see `VERIFICATION.json`.

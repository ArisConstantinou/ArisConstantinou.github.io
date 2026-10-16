# MAGIC 1.6.5 — benchmark and bounded performance corrections

Release package approved for publication to main on 2026-10-16. This release does not establish that the reported phone crash or every slow PC scene is fixed.

## User-visible changes

- The main menu has **ΕΛΕΓΧΟΣ ΑΠΟΔΟΣΗΣ · BENCHMARK**, following Electrical-Game's menu, return-to-menu and retained-report flow. It starts only on request, runs two passes of courtyard idle, camera rotation and controlled combat with 18 existing enemies, and stores a report on the device. JSON export, copy, share, stop and main-menu controls are available. Game saves are not changed by the benchmark.
- The report includes actual frame intervals, FPS, P95/max frame time, stalls, CPU sections, draw calls, triangles, startup stages/resources, setup costs, device settings and scene captures. It does not measure GPU execution time or VRAM. Benchmark fixture setup uses seed 821; live AI and frame scheduling remain real-time. This is a controlled courtyard fixture, not a traversal of every room.
- Loading distinguishes bytes read from cache and file preparation. An update can reuse byte-identical assets from the previous release instead of downloading them again. Changed assets keep a separate content hash; an older filename alone is not accepted as proof.

## Changes behind the measurements

Original models and texture bytes are preserved. WebP dimensions are read from the header rather than by decoding the entire image just to discover its size. Texture clones reuse an upload only after matching Three.js's actual live GPU handle. Context restoration retains the original encoded bytes. Only the active render target is compiled at startup.

The Cannon collision matrix clears the contact cells written during the previous step. Immutable masonry uses BatchedMesh with original geometry, materials and transforms; original meshes remain available for exact raycasts and cutaway visibility. Animated, transparent and custom-shader meshes retain their normal path. No enemy-count, texture-resolution or geometry-detail reduction was made.

## Evidence and limits

Sequential comparison on native Windows Chrome / RTX 5080, desktop 1440×900 DPR 1, seed 821, same 18-enemy fixture and fixed 1/60 simulation steps:

| Scene | CPU P95 before → after | Frame P95 before → after | Draw calls before → after |
|---|---:|---:|---:|
| Courtyard idle | 12.7 → 13.1 ms | 16.6 → 12.6 ms | 905 → 820 |
| Crowded combat | 22.1 → 16.4 ms | 25.0 → 16.7 ms | 1005 → 919 |

These are one paired capture per case, not a general FPS guarantee. Both desktop cases retain equal triangle counts; all cases retain 69 actors and 1112 initial physics bodies. Portrait 390×844 DPR 3 at CPU 4× slowdown remains slow: crowd frame P95 91.5 → 87.6 ms; idle 70.9 → 75.0 ms. Desktop mobile emulation is not physical-phone evidence.

The final separate fresh-browser startup pair was **11.722 → 12.094 seconds** over localhost. First use still reads approximately **154 MiB** of resources. No cold-start speedup or smaller first download is claimed. Bitmap creations dropped 125 → 62, live decoded CPU bitmap bytes remained zero, transient decoded peak remained 16 MiB, and uploads dropped 71 → 46 in that portrait fixture. Heap after GC rose 411.1 → 426.4 MB, sampled heap peak fell 575.7 → 552.0 MB, and owned-browser private bytes rose 3.011 → 3.063 GB. These browser-process metrics include helpers and are not GPU memory or handset memory measurements.

The actual-worker upgrade test reused **158,434,259 loader asset bytes** from existing cache and reached gameplay offline. It uses original cached 1.6.4 response bytes copied into the candidate's separate test scope to model an in-place public upgrade. Cache hits still require decoding and scene preparation; they do not imply instant readiness. The pre-publication checks did not establish public-CDN or physical-iPhone performance for 1.6.5.

Validation includes 264 game tests, 49 map tests and a release-cache migration test; 57 GPU texture samples; exact context-restored frozen frame; actual-worker save/mute, touch, quality, restart, offline and missing-asset retry checks; and the menu benchmark/export/restore/stall/stop flow. Detailed receipts and retained limitations are in VERIFICATION.json. The final benchmark UI changes affect only benchmark mode/report wording; general runtime, cache and comparison evidence predates those small changes and is identified in that receipt.

## Review and recovery

- Candidate: http://127.0.0.1:5173/performance-check/after/performance-benchmark-1.6.5/index.html
- Benchmark: http://127.0.0.1:5173/performance-check/after/performance-benchmark-1.6.5/index.html?benchmark=1
- Protected source: `.source/mobile-memory-1.6.4/source`
- Editable candidate: `.source/performance-benchmark-1.6.5/source`
- Portable delta: SOURCE.patch with SOURCE-CHANGES.json; prepared publication whitelist: PROMOTION.json.
- Sole listener 5173/PID 38392 retained; no dependency upgrade, installation, agent, generated art, or paid asset call.
- Publication was explicitly approved by the user under AGENTS.md section 12. The previous 1.6.4 commit and hashed assets are retained for recovery.

Technical reference for WebP header fields: https://developers.google.com/speed/webp/docs/riff_container

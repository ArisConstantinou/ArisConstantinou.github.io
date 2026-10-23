# Mobile battle FPS regression — 1.6.33

## Latest repeated phone report

The second all-boss 1.6.33 report repeats the sustained slowdown with matching device, canvas, quality and initial encounter/settings: idle50.12 FPS, combat21.00 FPS (previous20.78), settle30.46 FPS. Combat P95 remains59 ms; maximum falls from340 to128 ms. It completed22 kills including4 bosses and6 summons, with zero errors. Summon counts differ from the previous19 kills/3 summons, so this is not a deterministic identical battle.

Loading improves from27.443 to9.623 seconds, while combat stays near21 FPS. Faster loading and fewer extreme stalls therefore do not resolve the sustained slowdown. In both runs the final five idle seconds drop before AI/fire:37.18 then34.57 FPS. Estimated texture allocation is essentially unchanged at389.1 then388.9 MiB. This strengthens evidence that the regression repeats under this encounter; it does not isolate models, thermal throttling, GPU time or browser scheduling as the cause. No new system is disabled and no performance fix is claimed. The latest comparison is recorded in the existing comparison.json under latestRepeat.

The new supplied phone report confirms a sustained slowdown: combat 20.78 FPS, P95 59 ms, maximum 340 ms and 311 frames above 50 ms. The preceding 1.6.32 six-enemy run measured 59.26 FPS, P95 19 ms, maximum 40 ms and zero combat frames above 50 ms. Both used the same 494x856 canvas and low quality. The new encounter completed 19 kills, including all four bosses and three summons, without reported errors.

The workloads differ. Models alone have not been isolated as the cause. The new phone run falls from approximately 60 FPS to 37 FPS in the last five idle seconds, before enemy AI and HEARTH fire start. Combat averages 250 draw calls versus 146 previously, and 759,837 triangles versus 555,303. Estimated uploaded textures rise from 139.6 to 389.1 MiB; this is not measured VRAM. Measured CPU sections average 9.89 ms against a 48.13 ms frame interval. GPU timing is unsupported, so the remaining time must not be labelled proven GPU or thermal time.

An actual PC mobile-viewport draw inventory confirmed that Archer, Warden and Gargoyle use their far LOD2, not close surfaces. Each Archer still submits 10 materials (four Archers: 40 draws), Warden 12, Gargoyle 13. Their far surfaces contain 19,998, 27,982 and 24,999 triangles respectively. Colossus uses one draw/13,000 triangles and Wraith three draws/17,053 triangles. The new GLBs contain 10/12/13 distinct materials; exact image/material deduplication found no duplicates. Removing duplicate references therefore cannot solve this workload.

The PC battle completed with no JavaScript errors and screenshots were inspected. Its FPS is not evidence of physical-phone recovery. The capture process left background descendants; StorageGuard correctly failed the job and stopped its contained tree. Captured observations are retained, but that browser job is not marked PASS. The separate deterministic report-analysis job validates and saves the comparison without a browser.

Progress: JSON comparison complete; runtime LOD/material inventory complete; accidental close LOD not observed on PC; model-only causal isolation pending; FPS fix and phone verification pending. No additional game system is disabled. No model replacement or quality reduction is approved by this finding. Existing all-boss composition, shadows/lighting options, normal enemy health and fixed magic-benchmark.json are unchanged.

The useful next optimization target is material/texture consolidation for the native distance models while retaining geometry, joints, animation and appearance. A new atlas requires visual/material validation and a same-phone before/after comparison. It is a candidate direction, not an implemented or verified fix.

Evidence: mobile-battle-1.6.33-comparison.json. Detailed PC inventory and screenshot are retained in the canonical local test folder. Local runtime: http://127.0.0.1:5173/performance-check/canonical/index.html?hearthQA=1 . Public runtime remains 1.6.33; this report does not change the in-game LIST/JSON table.

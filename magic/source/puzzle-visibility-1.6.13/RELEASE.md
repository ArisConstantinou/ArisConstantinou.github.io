# MAGIC 1.6.13 — visible puzzles and unlimited benchmark health

Pressure trays and their loose weights no longer spawn beneath stairs or upper floors. The watchtower station moves into the open front-side bay; the library station uses its open reading wing. Library, gallery and watchtower supply searches can use their whole connected room, while fixed trays preserve engine circulation lanes. Room geometry, assets, lighting and puzzle rules remain intact.

Both manual and automatic benchmarks protect the player's health. Ordinary hit effects, damage cooldowns, enemy attacks, physics and ability costs still run. The health HUD shows infinity with an accessible label. Exported reports record this condition explicitly. Normal gameplay retains lethal damage. Automatic enemy health remains boosted for repeatability.

Validation: 327 unit/integration tests; actual browser manual/automatic lethal hits, normal-game death, saved-report recovery, all pressure-supply overhead checks and physical solving of both relocated puzzles. 117 supply plans across 13 engine rooms; measured compound HEARTH and wizard navigation before/after. Native gameplay client runs twice. Landscape and portrait screenshots inspected.

Native Windows Chrome GPU comparison, 814x358 touch viewport, seed 821, identical watchtower camera, 8 seconds real requestAnimationFrame: frame P95 18.6 to 18.5 ms; draw calls approximately 577 in both. This is a regression check, not proof of iPhone frame rate. No new assets or quality reduction. GPU time/actual VRAM are not established by this test. Previous iPhone low FPS/interruption and physical-device touch confirmation remain separate open items.

Rollback: retain the complete 1.6.12 bundle and worker manifest. Release only from the approved Pages publisher after candidate checks, then verify public file hashes and runtime.

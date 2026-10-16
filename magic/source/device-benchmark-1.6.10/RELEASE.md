# MAGIC 1.6.10 — device diagnostics and wall stability

The device benchmark now measures first-use stalls instead of discarding its first two seconds. It runs two passes through eight scenarios: courtyard idle and camera movement, an 18-enemy approach, multiple wizard abilities, populated Library/Forge/Sanctum rooms, and the HEARTH machine with boarding, walking, flamethrowers, stomp and exit. Automatic room transitions use controlled placement; manual recording supports normal exploration and interactions for up to five minutes. Actual action counts show what was exercised and what was not.

Recording uses a compact toolbar clear of the mobile movement and ability controls. Marking a problem retains its location, recent frame measurements and five actual successive frame images. Runtime, shader, non-finite position and context-loss errors are recorded. These checks cannot identify every visual or gameplay defect without a specific expected result.

GPU time is measured asynchronously when EXT_disjoint_timer_query_webgl2 is available. Unsupported browsers display the reason. Memory figures estimate known texture, geometry and render-target resources; they are not total or resident VRAM. The WebGL API does not expose that value. CPU stages and GPU times remain separate.

Reports use IndexedDB for images and a compact localStorage fallback for measurements, with periodic recovery checkpoints. Storage denial and quota errors retain their names, and JSON download remains available. Game progression is not saved by benchmark runs.

A reproduced wall cutaway defect near the Watchtower toggled a complete wall across a roughly 2 mm position boundary. Blockers now hide immediately and restore after 350 ms of continuous clearance. The same camera/path regression verifies stable visibility without changing wall geometry or materials.

See EVIDENCE.json for validation and limits. The physical iPhone enemy-approach FPS problem remains open. This release improves diagnosis and fixes the reproduced wall transition; it does not claim a general FPS cure, a complete visual audit or physical iPhone verification. Original assets, enemy counts and graphical quality are preserved.

References: [Khronos timer-query extension](https://registry.khronos.org/webgl/extensions/EXT_disjoint_timer_query_webgl2/) and [WebGL resource accounting guidance](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices).

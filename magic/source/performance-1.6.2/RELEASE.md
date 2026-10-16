# MAGIC1.6.2 — loading, crowd CPU and cached-release recovery

The initial mandatory offline cache is9 files/about1.43MiB rather than93 files/327.62MiB. Runtime models, textures and audio cache when actually requested; the previous cache retires only after successful boot and writes. Fresh entry navigation and an actual worker-version handshake prevent future stale-entry/model mixing. Optional close surfaces still stream on first use.

Sight queries avoid copying the entire castle for every enemy. The broadphase skips only pairs Cannon already rejects, preserving exact collision order, contacts, motion, solver and substeps. Pagehide pauses and silences the game, including the BFCache boundary handler. No actor count, artwork, visual quality or gameplay reductions.

292 rules/navigation cases,18 real-runtime update/save/touch/audio/offline checks,2 prescribed gameplay-client iterations and6 served hash matches. CPU4x portrait surrogate with18 nearby enemies: CPU p95 76.6 to63.1ms; frame p95 remains71ms. Desktop3 before/after samples: mean CPU p95 12.77 to11.93ms; frame p95 remains about18.47ms. Identical primary draw/triangle counts and69 actors/1112 bodies. These desktop measurements do not establish physical-phone performance, Internet startup, GPU memory or long-term leak behavior. Existing large-bundle warning remains.

Published to main as runtime commit `9ad023a060097ef99b416be10894a43de2f83b08`; GitHub Pages deployment passed. Public hashes, native HEARTH left-mouse controls, progress, touch, audio and offline movement were verified. See [PUBLICATION.json](PUBLICATION.json) for evidence and the retained save-fixture/replay limitations. Previous hashed assets and the existing progress key are preserved. The wider unit redesign remains in progress.

# MAGIC 1.6.4

Approved release of the latest verified working patches to `main`.

Original textures now decode only when needed, upload serially and release their CPU bitmaps after upload. WebGL context restoration recreates the original textures and environment lighting. A guarded Draco worker uses the existing pinned Three.js 0.180.0 JavaScript decoder once if its worker fails, preserving the original compressed geometry.

The current complete map, 69 actors, 1112 physics bodies, full texture dimensions, materials, models, animations and controls are retained. No unfinished unit redesign is included. Previous releases and hashed assets remain available for recovery.

Candidate validation passed 262 game and 47 map tests, 20 native runtime checks, 57 GPU texture comparisons, exact rendered-frame restoration, controlled WebKit decoder-failure recovery and two gameplay-client iterations. The publication record contains the additional fresh release checks and public deployment result.

Sequential Windows Chrome measurements at an iPhone 13 viewport recorded live decoded CPU bitmaps falling from 710 MiB to zero after upload, with a 16 MiB transient peak. Owned browser-process private memory was 562.7 MiB lower in that pair; this is not phone or GPU memory. Sampled JS/external peak increased from 483.6 to 596.0 MB and local startup changed from 8.879 to 11.588 seconds. Existing frame benchmarks passed their predefined 10% CPU regression allowance with unchanged scene counts. No loading-speed or physical-phone FPS improvement is claimed.

Physical iPhone/Safari crash stability still requires a device trial. The initial asset transfer remains approximately 153 MiB. Windows Chrome/WebKit and emulated viewports do not establish physical-phone stability.

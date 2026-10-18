Experimental source branch: codex/idle-rendering-uploads-20261018

Based on public MAGIC 1.6.21 (b829d0f6718d96f72825a3fbb35972f81be76450). This branch contains five source/test changes and this evidence only; it does not replace the compiled public game. Before any stable release, build with a distinct release version and complete the outstanding device/visual checks.

Separate bounded per-camera integer draw-ID streams remove repeated static uploads between colour and shadow views. Identical flame instance matrices upload only on real state changes; the original shader time animation remains. Geometry, material/shader source, assets, quality, AI and physics remain unchanged.

387 tests and build passed locally, with three new regressions failing the previous code. Native touch in two orientations and two installed-client iterations passed. Desktop A/B/A counts were about30.5/8.1/30.2 texture uploads per frame; the integrated build confirmed8.02 with665draws and1,783,477triangles. These counts do not establish an equivalent FPS gain on iPhone.

Five frozen states once had identical colour/shadow output, but a stricter follow-up had nine1/255 colour-channel differences in original-to-original controls. That follow-up remains inconclusive. The phone was unavailable for direct verification; sustained60FPS and the full cause of19-28FPS are unproven.

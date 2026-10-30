# Βαλτομαχίες4.4.1

Paused gameplay already froze simulation/3D animation, but rendered the complete unchanged scene every callback. The new gate reuses the last canvas after two settled frames and invalidates on camera/projection/settings/buffer/resource changes, actor rebuilding, quality changes and resize. DOM menu animations continue normally; live play/title/results/finishing/loading/layout editing still render as before.

No model, texture, material, resolution, collision or gameplay change. Four meaningful regression tests added;1410 total units passed. Desktop/portrait/landscape actual built-game tests cover cached pause, redraw after same-size resize and normal resumed rendering/simulation. Standard game client passed.

Actual iPhone14ProMax/Chrome High,645x1117, same paused camera: original42.36FPS → cached59.96FPS → restored42.20FPS; storage byte-identical. This measures the PAUSED UI, not a live combat improvement or a2x performance result. The user's29FPS live-game report and proper distant-asset pipeline remain open. Private mesh/LOD candidates were not included in this release.

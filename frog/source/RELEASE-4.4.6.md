# Βαλτομαχίες4.4.6

The game previously always rendered the512x512 water mirror on alternate frames, including on mobile. Settings now offer water reflections On/Off. On remains the default and retains the exact original Water material/shader and cadence. Off keeps the waves, normal lighting, transparency and sun glints while skipping the second scene render, and never displays a stale mirror image. The explicit preference persists; `?reflections=on` and `?reflections=off` provide temporary comparisons without overwriting it. Shadows are already disabled in the normal arcade renderer.

Validated1441 source tests, desktop/portrait/landscape built-game flows, saved preference and round preservation, override URLs, movement/jump/pause/resume, and the standard game client. Actual matching3Dcanvas captures show both water modes. No models, original artwork, textures, resolution, physics or saved-round format changed.

Same-scene RTX5080 engineering A/B/A/B at High1398x645: frame work3.244→2.516ms; GPU1.920→1.282ms. Mirror passes become zero with Off. This is33.2% less GPU time on that PC scene, not a measured iPhone FPS gain. Physical iPhone battle acceptance remains pending.

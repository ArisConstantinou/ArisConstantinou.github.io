# Βαλτομαχίες 4.4.9

Fix post-landing movement on houses and rocks. Walking hops now follow the supporting slope; descending contacts use the previous surface height for swept landing eligibility. Support hops, unsupported falls, vertical jumps and body slams cannot magnetically latch to walls. Deliberate wall jumps remain: move away or dash to release a manual hold even when the selected destination is invalid. Selected camera/orbit remain unchanged.

Instructions are opt-in through U or the objectives control. The countdown no longer automatically opens a reading modal and pauses play. Manual open/minimize still pauses/resumes correctly.

Heavy deliberate jumps create a large, surface-aware impact at the actual landing height: water spray/foam rings on water, dust/shockwaves on dry surfaces. Walking hops remain small. No extra attack damage. Reuse the existing particle/ripple pools (64 drops per mobile burst,96 desktop; fixed capacities96/144), with no new models or textures. Duplicate body-slam landing visuals are suppressed.

Validated1464 source tests, regression failures before the fix, all-class real-world roof/rock traversal, a wider surface/direction matrix, historical4.4.8 before/after captures, desktop/mobile help and water/dry impact sequences, bounded cleanup and actual draw/GPU timing, plus the standard game client. PC GPU timing is not physical iPhone evidence. Original assets, fast menu loading, model cache keys, camera controls, selection and reflection preference are preserved.


HUD correction: remove the unnecessary80px top reservation on wide desktop. Only the ammo card shifts horizontally around the unchanged illustrated top-left signature; clock, map and right controls return to their original top positions. Verify1280x800,1440x900,1000x700 and unchanged portrait/landscape mobile layouts, real control hits and renewed impact frames.

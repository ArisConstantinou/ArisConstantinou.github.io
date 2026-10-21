# Magic 1.6.26: remove ambient buzz

Removed the three continuously running sine oscillators at 55, 82.41 and 110.4 Hz from MagicAudio.start. Action effects, flamethrower audio, volume, mute and pause behavior remain unchanged.

Validation: 376 game tests pass. Browser comparison reproduces three unbounded oscillators in 1.6.25 and zero in 1.6.26. Three finite action effects remain active; pause/resume and gameplay pass without page errors. Installed web-game client passes two iterations, and screenshots were inspected. Production build passed.

This release is based on the accepted 1.6.25 source. It contains no experimental performance changes and does not claim the outstanding 200 FPS combat target.

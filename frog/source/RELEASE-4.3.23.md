# FROG 4.3.23

Frog movement animations now face the actual sideways/backward hop or dash. Deliberate shooting retains aim priority and the camera/input directions remain independent.

Mobile overview aim stays at its exact last bearing after touch release. Small fire-button drags move the current reticle relatively, avoiding a jump to the button corner. Pressing the centre of the aim stick preserves the existing bearing.

The visible FPS counter uses actual browser frame intervals and shows mean/p95 frame timing. It includes slow frames and resets after tab suspension. It does not use the clamped simulation time.

Validation:1328 source tests,48 native directional keyboard/multitouch cases,23 existing flight/volley scenarios, native overview aiming regressions and the standard game client. Public release checks cover automatic update, exact save preservation, menu poses, artifact hashes and touch controls. The only preexisting client console issue is the unrelated root favicon404.

This controls/measurement release preserves the current graphics. The reference graphics improvement and2x-performance target remain ongoing; physical iPhone14ProMax/Chrome results are not yet measured.

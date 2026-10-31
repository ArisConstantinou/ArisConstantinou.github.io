# Βαλτομαχίες 4.4.20

Changing wall-jump mode in Settings after opening the destination picker retained the temporary manual override. Choosing Automatic now clears the picker, selected destination, cached aim and pending launch, then applies the selected mode. On resume, the frog automatically chooses and launches toward the nearest reachable surface. Mouse/touch manual destination selection and explicit launch remain supported.

Validation:1539 source tests;9 before/9 after native settings-switch cases and9 native manual destination/cancel/reopen/launch/landing cases across all3 frog classes and desktop/portrait/landscape viewports; stock web-game client and visual inspection; matched desktop-GPU render/memory/CPU checks. All105 protected original assets are unchanged. Mobile viewport testing is not physical-iPhone performance proof.

Heavy anatomical ledge struggle remains an isolated, unaccepted work prototype and is excluded from this release. Published Heavy jump limits and whole-character menu entrance remain unchanged.

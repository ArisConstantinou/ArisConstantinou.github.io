# MAGIC 1.6.12 — touch gesture ownership

The running benchmark panel was outside the game's selection protection. Its text and padding allowed browser selection and pinch/pan gestures while the player used game controls. The same native interaction reproduced text selection and a page scale of 1.06667 with viewport displacement in 1.6.11.

The canvas, HUD and running recording panel now declare touch-action:none, user-select:none and -webkit-touch-callout:none. Scoped cancelable touchmove and WebKit gesture listeners prevent page gestures during play, without stopping Pointer Event propagation or cancelling touchstart/end. This preserves native pause, resume and recording button clicks and independent movement/ability contacts. Completed reports and menus retain browser scrolling/selection/zoom. The UI's AbortSignal owns cleanup.

No graphics assets, enemies, lighting, resolution, game rules or per-frame calculations changed. The mobile resource corrections in 1.6.11 remain. This release does not claim to solve the outstanding physical iPhone FPS/interruption issue.

Validation and exact source/artifact hashes are recorded in EVIDENCE.json. Native Chrome touch automation and Windows WebKit provide local evidence; physical iPhone confirmation remains necessary.

Platform references: [touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action), [touch event default behavior](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events), [Safari gesture handling](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html).

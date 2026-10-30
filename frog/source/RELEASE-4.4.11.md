# Βαλτομαχίες 4.4.11

The final native touch test exposed a real4.4.10 editor action problem: pointerdown/up reached Save after dragging, but Chromium did not always synthesize click. Waiting3seconds did not help and no localStorage write occurred. Mouse-based editor tests had passed; that evidence did not cover this path.

Settings layout entry, Save, Cancel and Reset now reuse installMenuAction, the existing tested menu input helper. Touch/pen release activates once; cancelled/outside gestures do not activate, delayed duplicate clicks are suppressed and keyboard/mouse remain supported. No3D assets or approved signature changes.

Validation:1474 source tests, production update-hook/build checks, six-view mobile/desktop editor and all-class jump interactions, actual CDP touch drag followed by Save in portrait/landscape, frozen state and persisted layout checks, standard web-game client. Public release/updater/hash checks are recorded separately. CDP touch is browser emulation, not a physical iPhone FPS measurement.

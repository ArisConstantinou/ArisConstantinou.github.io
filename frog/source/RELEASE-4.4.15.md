# Βαλτομαχίες 4.4.15

Fix the skinny character's left hindleg breaking during the menu kick. Preserve the true rest knee bend plane and let the kicking ankle follow the shin; smooth only the narrow left-leg/body weight transition in the menu-only Blender scene.

The full4.8-second action,20-FPS source,448px transparency, original materials and quality88 encoding remain. Gameplay GLBs, physics, camera, saves, branding and the heavy/medium menu clips are unchanged. The experimental heavy ledge prototype is excluded.

Validation: the actual skinned ankle mesh passes all97 evaluated poses; maximum local edge stretch falls from4.7303x to1.0214x, rest knee error falls from0.112m to0.000000152m, and the loop closes exactly. Actual menu recordings and matching timestamp screenshots cover desktop/portrait/landscape, reduced motion and controls. Full source tests, exact release build, standard client and scoped public/update/save/hash checks are recorded separately.

Editable menu scene: existing work/menu-performances/skinny.blend in the canonical local staging project. The qa/menu-skinny-leg authoring recipe depends on the retained original local asset inputs; no runtime Blender dependency is introduced. Physical-phone FPS is not established by this correction.

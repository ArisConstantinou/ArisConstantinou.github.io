# Rendering improvements — 1.6.28

The one-room test reached59.95FPS over60seconds. This release retains verified zero-light filtering, exact room-mask short-circuiting and hiddenHEARTH colour culling. All active lighting, flames, dynamic shadows, geometry and quality presets remain.

Validation:453 source tests, production build, muted installed game client (two gameplay iterations), and11+11+18 strict colour/shadow comparison cases with zero differences. Full-map exploration/doors and sustained combat60FPS on physical iPhone remain unverified. Further iPhone connections were prohibited by the user. The separately committed reachableHEARTH spawn/minimap source is included in this runtime. Unfinished replacement enemy models and rejected experiments are excluded.

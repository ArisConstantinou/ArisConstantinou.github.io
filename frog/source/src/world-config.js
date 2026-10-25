/** World distances are metres; actors and buildings keep their original scale. */
export const WORLD_LAYOUT_VERSION = 2;
export const WORLD_SCALE = 1.7;
export const WORLD_EXTENT = 190;
export const WORLD_MOVE_LIMIT = WORLD_EXTENT - 2;

/** Shared anchors keep the campaign, terrain and map in the same coordinate space. */
export const WORLD_PREDATOR_ANCHORS = Object.freeze({
  heron: Object.freeze({ x: 34 * WORLD_SCALE, z: 14 * WORLD_SCALE }),
  snake: Object.freeze({ x: -38 * WORLD_SCALE, z: -22 * WORLD_SCALE }),
  fish: Object.freeze({ x: 12 * WORLD_SCALE, z: 48 * WORLD_SCALE })
});

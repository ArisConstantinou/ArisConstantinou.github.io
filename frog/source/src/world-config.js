/** Shared spatial contract. Frog sizes stay fixed as the creek and camps grow. */
export const WORLD_SCALE = 1.8;
export const WORLD_REVISION = 2;
export const WORLD_RADIUS = 110 * WORLD_SCALE;
export const WORLD_BOUNDARY = 108 * WORLD_SCALE;
export const SHELTER_SCALE = 3;
export const SHELTER_LAYOUT_SCALE = SHELTER_SCALE / 2.15;
export const SHELTER_RADIUS = 12.3 * SHELTER_LAYOUT_SCALE;
// The outer towers reach beyond the courtyard. Leave real, level earth under
// the complete castle, with room to walk outside its walls before the bank falls.
export const CASTLE_GROUND_RADIUS = SHELTER_RADIUS + 6;
export const ISLAND_TERRACE_RADIUS = SHELTER_RADIUS + 8;
export const CASTLE_BANK_BLEND = 17;

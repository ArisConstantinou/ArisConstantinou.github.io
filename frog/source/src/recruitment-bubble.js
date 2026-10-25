/** Read-only lifecycle and projection for the neutral frog's local conversation. */
import { Vector3 } from 'three';
import { RECRUIT_RANGE } from './squad-rules.js';
import { fortLineClear } from './fortification.js';

const projected = new Vector3();

export function recruitmentBubbleTarget(game, id = game.activeRecruitId) {
  const player = game.player, frog = (game.frogs || []).find(actor => actor.id === id);
  if (!player || player.dead || player.hp <= 0 || !frog || frog.dead || frog.hp <= 0 || frog.team !== 'neutral') return null;
  if (Math.hypot(frog.x - player.x, frog.z - player.z) > RECRUIT_RANGE) return null;
  if (!fortLineClear(game.camps || [], player, frog)) return null;
  return frog;
}

/** Raw CSS-pixel anchor; the UI places its compact card beside this point. */
export function recruitmentBubbleAnchor(game, frog, width, height) {
  const hidden = {targetId:frog?.id || null, x:0, y:0, width, height, visible:false};
  if (!frog || !game.camera || !(width > 0) || !(height > 0)) return hidden;
  projected.set(frog.x, (Number(frog.y) || 0) + 1.45, frog.z).project(game.camera);
  if (!Number.isFinite(projected.x) || !Number.isFinite(projected.y) || projected.z < -1 || projected.z > 1 || Math.abs(projected.x) > 1 || Math.abs(projected.y) > 1) return hidden;
  return {targetId:frog.id, x:(projected.x * .5 + .5) * width, y:(.5 - projected.y * .5) * height, width, height, visible:true};
}

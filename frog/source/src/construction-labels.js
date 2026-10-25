/** Compact screen-space labels anchored to the real construction work bench. */
import { Vector3 } from 'three';
import { BUILDINGS } from './rules.js';

export const CONSTRUCTION_LABEL_STAGES = Object.freeze(['Θεμέλια', 'Σκελετός', 'Κτίσιμο', 'Ολοκλήρωση']);
const anchor = new Vector3();
const finite = value => Number.isFinite(Number(value)) ? Number(value) : 0;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const durationText = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

/** A remaining work amount becomes an ETA only while real frogs are working. */
export function constructionLabelStatus(job, paused = false) {
  const duration = Math.max(.001, finite(job.duration));
  const progress = clamp(finite(job.progress), 0, duration), ratio = progress / duration;
  const remaining = Math.max(0, duration - progress), rate = Math.max(0, finite(job.workRate));
  const running = !paused && job.status === 'working' && rate > 0 && remaining > 0;
  const eta = running ? Math.ceil(remaining / rate) : remaining === 0 ? 0 : null;
  const workers = Math.max(0, Math.floor(finite(job.workersPresent)));
  return {
    ratio, percent: Math.floor(ratio * 100), stage: Math.min(3, Math.floor(ratio * 4)), running, eta,
    title: BUILDINGS[job.type]?.name || job.label || 'Κατασκευή',
    detail: paused ? 'Παύση παιχνιδιού' : running
      ? `≈ ${durationText(eta)} · ${workers} ${workers === 1 ? 'οικοδόμος' : 'οικοδόμοι'}`
      : remaining === 0 ? 'Ολοκληρώθηκε' : job.reason || 'Σε αναμονή οικοδόμου',
  };
}

/** Select nearby on-screen sites; labels never accumulate for distant regions. */
export function visibleConstructionLabels(game, width, height) {
  if (!game.camera || !game.player || width < 180 || height < 160) return [];
  const candidates = [];
  for (const job of game.economy?.jobs || []) {
    const point = job.workPoint;
    if (job.kind !== 'construction' || !point || !Number.isFinite(point.x) || !Number.isFinite(point.z)) continue;
    const distance = Math.hypot(point.x - game.player.x, point.z - game.player.z);
    if (distance > 72 || finite(job.progress) >= Math.max(.001, finite(job.duration))) continue;
    const ground = finite(game.world?.sampleHeight?.(point.x, point.z));
    anchor.set(point.x, ground + 3.8, point.z).project(game.camera);
    if (!Number.isFinite(anchor.x) || !Number.isFinite(anchor.y) || anchor.z < -1 || anchor.z > 1 || Math.abs(anchor.x) > 1 || Math.abs(anchor.y) > 1) continue;
    candidates.push({ job, distance, x: (anchor.x * .5 + .5) * width, y: (-anchor.y * .5 + .5) * height });
  }
  candidates.sort((a, b) => a.distance - b.distance);
  const labels = [], boxWidth = Math.min(260, width - 24), boxHeight = 82;
  for (const candidate of candidates) {
    const left = candidate.x - boxWidth / 2, top = candidate.y - boxHeight;
    // Do not pin off-screen sites to the edge, or cover another worksite label.
    if (left < 8 || left + boxWidth > width - 8 || top < 8 || candidate.y > height - 12) continue;
    if (labels.some(other => left < other.left + boxWidth + 8 && left + boxWidth + 8 > other.left && top < other.top + boxHeight + 8 && top + boxHeight + 8 > other.top)) continue;
    labels.push({ ...candidate, left, top, width: boxWidth, height: boxHeight, status: constructionLabelStatus(candidate.job, Boolean(game.paused)) });
    if (labels.length === 3) break;
  }
  return labels;
}

function fitText(ctx, text, maxWidth) {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let result = text;
  while (result.length > 1 && ctx.measureText(result + '…').width > maxWidth) result = result.slice(0, -1);
  return result + '…';
}

/** Draw after frog health bars on the existing pointer-transparent canvas. */
export function drawConstructionLabels(game, ctx, width, height) {
  const labels = visibleConstructionLabels(game, width, height);
  if (!labels.length) return;
  ctx.save();
  ctx.textBaseline = 'alphabetic';
  for (const label of labels) {
    const { left, top, status } = label, inset = 11, inner = label.width - inset * 2;
    const accent = status.running ? '#b8db8c' : '#e2c891';
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(8, 24, 22, .92)';
    ctx.strokeStyle = 'rgba(181, 211, 164, .50)'; ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(left, top, label.width, label.height, 8);
    else ctx.rect(left, top, label.width, label.height);
    ctx.fill(); ctx.stroke();
    ctx.font = '600 12px "Segoe UI", sans-serif'; ctx.textAlign = 'left'; ctx.fillStyle = '#f0f2df';
    ctx.fillText(fitText(ctx, status.title, inner - 44), left + inset, top + 19);
    ctx.textAlign = 'right'; ctx.fillStyle = accent;
    ctx.fillText(`${status.percent}%`, left + label.width - inset, top + 19);
    const gap = 4, segment = (inner - gap * 3) / 4;
    for (let stage = 0; stage < 4; stage++) {
      const x = left + inset + stage * (segment + gap), fraction = clamp(status.ratio * 4 - stage, 0, 1);
      ctx.fillStyle = 'rgba(215, 231, 201, .18)'; ctx.fillRect(x, top + 29, segment, 6);
      if (fraction > 0) { ctx.fillStyle = accent; ctx.fillRect(x, top + 29, segment * fraction, 6); }
      ctx.font = '9px "Segoe UI", sans-serif'; ctx.textAlign = 'center';
      ctx.fillStyle = stage === status.stage ? '#f0f2df' : '#9aaea0';
      ctx.fillText(fitText(ctx, CONSTRUCTION_LABEL_STAGES[stage], segment), x + segment / 2, top + 48);
    }
    ctx.font = '11px "Segoe UI", sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = accent;
    ctx.fillText(fitText(ctx, status.detail, inner), left + label.width / 2, top + 68);
  }
  ctx.restore();
}

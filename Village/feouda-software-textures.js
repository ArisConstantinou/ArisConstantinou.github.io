// Canvas-only affine texture mapping for the software battlefield renderer.
// Texture UVs use Three's convention. Repeating patterns remain at their native
// image size; no atlas expansion or per-frame pixel readback is needed.
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
const linearToSrgb = value => value <= .0031308 ? value * 12.92 : 1.055 * Math.pow(value, 1 / 2.4) - .055;
const MAX_COORDINATE = 1e7;

/**
 * drawTriangle(ctx, texture, vertices, lighting = 1, tint = null) -> boolean
 *
 * vertices: three projected {x, y, u, v} points, with unmodified model UVs.
 * texture: a Three-like texture with .image, .repeat, .offset and .flipY.
 * lighting: scalar brightness, clamped to 0..2; one preserves the image.
 * tint: CSS colour, 0xRRGGBB, THREE.Color, normalized {r,g,b}, or
 *       {color: one of the above, alpha: 0..1}. Tint uses multiply blending.
 *
 * The affine mapping is intentionally approximate under perspective. The caller
 * may subdivide large near-camera triangles. All canvas drawing state is restored.
 * false means the caller should draw its normal solid-colour fallback instead.
 */
export function createTexturePainter() {
  let patterns = new WeakMap();
  let colours = new WeakMap();
  let disposed = false;

  function patternFor(ctx, image) {
    if (!image || typeof image !== 'object' || image.complete === false) return null;
    const width = image.naturalWidth || image.videoWidth || image.width;
    const height = image.naturalHeight || image.videoHeight || image.height;
    if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1) return null;
    let byImage = patterns.get(ctx);
    if (!byImage) patterns.set(ctx, byImage = new WeakMap());
    let entry = byImage.get(image);
    if (entry && entry.width === width && entry.height === height) return entry;
    const pattern = ctx.createPattern(image, 'repeat');
    if (!pattern) return null; // A loading image can succeed on a later frame.
    entry = { pattern, width, height };
    byImage.set(image, entry);
    return entry;
  }

  function colourStyle(colour) {
    if (typeof colour === 'string') {
      const css = colour.trim();
      return /^(?:#fff(?:fff)?|white|rgb\(\s*255\s*[, ]\s*255\s*[, ]\s*255\s*\))$/i.test(css) ? null : css;
    }
    if (typeof colour === 'number' && Number.isFinite(colour)) {
      const value = clamp(Math.round(colour), 0, 0xffffff);
      return value === 0xffffff ? null : `#${value.toString(16).padStart(6, '0')}`;
    }
    if (!colour || typeof colour !== 'object') return null;
    const { r, g, b } = colour;
    if (![r, g, b].every(Number.isFinite)) return null;
    const linear = colour.isColor === true;
    const cached = colours.get(colour);
    if (cached && cached.r === r && cached.g === g && cached.b === b && cached.linear === linear) return cached.css;
    const channel = value => Math.round(clamp(linear ? linearToSrgb(clamp(value, 0, 1)) : value, 0, 1) * 255);
    const red = channel(r), green = channel(g), blue = channel(b);
    const css = red === 255 && green === 255 && blue === 255 ? null : `rgb(${red},${green},${blue})`;
    colours.set(colour, { r, g, b, linear, css });
    return css;
  }

  function drawTriangle(ctx, texture, vertices, lighting = 1, tint = null) {
    if (disposed || !ctx || !texture || !vertices || vertices.length !== 3) return false;
    const p0 = vertices[0], p1 = vertices[1], p2 = vertices[2];
    for (const p of vertices) {
      if (!p || ![p.x, p.y, p.u, p.v].every(Number.isFinite) || Math.abs(p.x) > MAX_COORDINATE || Math.abs(p.y) > MAX_COORDINATE || Math.abs(p.u) > 1e12 || Math.abs(p.v) > 1e12) return false;
    }
    const sx1 = p1.x - p0.x, sy1 = p1.y - p0.y;
    const sx2 = p2.x - p0.x, sy2 = p2.y - p0.y;
    const signedArea = sx1 * sy2 - sx2 * sy1;
    if (Math.abs(signedArea) < .08) return false;

    let entry;
    try { entry = patternFor(ctx, texture.image || texture.source?.data); }
    catch { return false; }
    if (!entry) return false;

    const repeatX = texture.repeat?.x ?? 1, repeatY = texture.repeat?.y ?? 1;
    const offsetX = texture.offset?.x ?? 0, offsetY = texture.offset?.y ?? 0;
    const rotation = texture.rotation ?? 0;
    if (![repeatX, repeatY, offsetX, offsetY, rotation].every(Number.isFinite)) return false;
    const cx = texture.center?.x ?? 0, cy = texture.center?.y ?? 0;
    if (!Number.isFinite(cx) || !Number.isFinite(cy)) return false;
    const cosine = rotation ? Math.cos(rotation) : 1, sine = rotation ? Math.sin(rotation) : 0;
    const uv = p => ({
      u: repeatX * (cosine * (p.u - cx) + sine * (p.v - cy)) + cx + offsetX,
      v: repeatY * (-sine * (p.u - cx) + cosine * (p.v - cy)) + cy + offsetY
    });
    const t0 = uv(p0), t1 = uv(p1), t2 = uv(p2);
    for (const p of [t0, t1, t2]) if (!Number.isFinite(p.u) || !Number.isFinite(p.v) || Math.abs(p.u) > 1e12 || Math.abs(p.v) > 1e12) return false;
    // Removing whole tile offsets preserves repeat phase and avoids large
    // cancellation errors when the battlefield uses world-space UVs.
    const anchorU = Math.floor(t0.u), anchorV = Math.floor(t0.v);
    const flipY = texture.flipY !== false;
    const texels = p => ({
      x: (p.u - anchorU) * entry.width,
      y: (flipY ? 1 - (p.v - anchorV) : p.v - anchorV) * entry.height
    });
    const q0 = texels(t0), q1 = texels(t1), q2 = texels(t2);
    const ux1 = q1.x - q0.x, uy1 = q1.y - q0.y;
    const ux2 = q2.x - q0.x, uy2 = q2.y - q0.y;
    const determinant = ux1 * uy2 - ux2 * uy1;
    const uvScale = Math.hypot(ux1, uy1) * Math.hypot(ux2, uy2);
    if (!Number.isFinite(uvScale) || uvScale === 0 || Math.abs(determinant) < uvScale * 1e-8) return false;

    const a = (sx1 * uy2 - sx2 * uy1) / determinant;
    const b = (sy1 * uy2 - sy2 * uy1) / determinant;
    const c = (sx2 * ux1 - sx1 * ux2) / determinant;
    const d = (sy2 * ux1 - sy1 * ux2) / determinant;
    const e = p0.x - a * q0.x - c * q0.y;
    const f = p0.y - b * q0.x - d * q0.y;
    const transformDeterminant = Math.abs(a * d - b * c);
    if (![a, b, c, d, e, f].every(Number.isFinite) || transformDeterminant < 1e-16) return false;

    const paddingX = Math.max(1, 1.5 * (Math.abs(d) + Math.abs(c)) / transformDeterminant);
    const paddingY = Math.max(1, 1.5 * (Math.abs(b) + Math.abs(a)) / transformDeterminant);
    const minimumX = Math.min(q0.x, q1.x, q2.x) - paddingX;
    const minimumY = Math.min(q0.y, q1.y, q2.y) - paddingY;
    const width = Math.max(q0.x, q1.x, q2.x) - minimumX + paddingX;
    const height = Math.max(q0.y, q1.y, q2.y) - minimumY + paddingY;
    // A malformed projection must not ask Canvas to rasterize an enormous tile
    // domain. Normal world-space 2 m UVs are comfortably below this bound.
    if (!Number.isFinite(width) || !Number.isFinite(height) || width > 1e8 || height > 1e8) return false;
    const brightness = Number.isFinite(lighting) ? clamp(lighting, 0, 2) : 1;
    const tintColour = tint && typeof tint === 'object' && 'color' in tint ? tint.color : tint;
    const tintAlpha = tint && typeof tint === 'object' && Number.isFinite(tint.alpha) ? clamp(tint.alpha, 0, 1) : 1;
    const tintStyle = tintAlpha ? colourStyle(tintColour) : null;
    let saves = 0;
    try {
      ctx.save(); saves++;
      ctx.beginPath();
      // Opaque neighbouring faces overlap by less than one device-independent
      // pixel, hiding Canvas's antialiased seams without adding mesh outlines.
      // Limit mitres at narrow corners so small faces cannot produce spikes.
      const overlap = ctx.globalAlpha > .98 ? .45 : 0;
      if (overlap) {
        const winding = Math.sign(signedArea);
        const edges = vertices.map((p, i) => {
          const next = vertices[(i + 1) % 3], dx = next.x - p.x, dy = next.y - p.y;
          const length = Math.hypot(dx, dy);
          return { x: winding * dy / length, y: -winding * dx / length };
        });
        for (let i = 0; i < 3; i++) {
          const previous = edges[(i + 2) % 3], next = edges[i], point = vertices[i];
          const amount = overlap / Math.max(.025, 1 + previous.x * next.x + previous.y * next.y);
          let dx = (previous.x + next.x) * amount, dy = (previous.y + next.y) * amount;
          const limit = Math.min(1, 1.4 / (Math.hypot(dx, dy) || 1));
          dx *= limit; dy *= limit;
          if (i) ctx.lineTo(point.x + dx, point.y + dy); else ctx.moveTo(point.x + dx, point.y + dy);
        }
      } else {
        ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
      }
      ctx.closePath();
      ctx.clip();
      ctx.save(); saves++;
      ctx.transform(a, b, c, d, e, f);
      ctx.fillStyle = entry.pattern;
      ctx.fillRect(minimumX, minimumY, width, height);
      ctx.restore(); saves--;

      if (tintStyle || brightness !== 1) {
        const left = Math.min(p0.x, p1.x, p2.x) - 2, top = Math.min(p0.y, p1.y, p2.y) - 2;
        const spanX = Math.max(p0.x, p1.x, p2.x) - left + 2, spanY = Math.max(p0.y, p1.y, p2.y) - top + 2;
        const alpha = ctx.globalAlpha;
        if (tintStyle) {
          ctx.globalCompositeOperation = 'multiply';
          ctx.globalAlpha = alpha * tintAlpha;
          ctx.fillStyle = '#ffffff'; // An unsupported CSS colour leaves a neutral tint.
          ctx.fillStyle = tintStyle;
          ctx.fillRect(left, top, spanX, spanY);
        }
        if (brightness !== 1) {
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = alpha * (brightness < 1 ? 1 - brightness : (brightness - 1) * .38);
          ctx.fillStyle = brightness < 1 ? '#000000' : '#ffffff';
          ctx.fillRect(left, top, spanX, spanY);
        }
      }
      ctx.restore(); saves--;
      return true;
    } catch {
      // A loading, unsupported, or lost canvas source can recover via solid fill.
      while (saves-- > 0) { try { ctx.restore(); } catch { break; } }
      return false;
    }
  }

  return {
    drawTriangle,
    dispose() { disposed = true; patterns = new WeakMap(); colours = new WeakMap(); }
  };
}

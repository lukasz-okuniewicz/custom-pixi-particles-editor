/**
 * Detects animated sprite sequence prefixes from texture ids (spritesheets + user files).
 * Matches custom-pixi-particles frame naming: `${prefix}${paddedIndex}.png` etc.
 *
 * Built-in spritesheets contain many `name_00.png` keys that are static particle choices,
 * not frame strips. Only prefixes listed in BUILT_IN_ANIMATED_SPRITE_PREFIX_ALLOWLIST are
 * offered from sheets; user-added particle images still get full detection.
 */

const FRAME_FILENAME_RE = /^(.+?)(\d+)\.(png|jpg|jpeg|webp)$/i;

const SHEET_RESOURCE_KEYS = ["multipacked-0.json", "images.json"];

const IMAGE_KEY_RE = /\.(png|jpg|jpeg|webp)$/i;

/** Spritesheet frame sequences that are real animated strips in this editor (not multi-file static pools). */
export const BUILT_IN_ANIMATED_SPRITE_PREFIX_ALLOWLIST = new Set(["coin_"]);

/**
 * Single static particle texture keys (e.g. flare.png) — not an animated prefix like coin_.
 * Used so we do not show static textures[0] in the animated sprite name select.
 */
export function isStaticSingleParticleTextureId(id) {
  if (!id || typeof id !== "string") return false;
  const trimmed = id.trim();
  if (!/\.(png|jpg|jpeg|webp)$/i.test(trimmed)) return false;
  if (FRAME_FILENAME_RE.test(trimmed)) return false;
  return true;
}

/**
 * Prefer explicit animatedSpriteName; otherwise textures[0] only if it is not a static file like flare.png.
 */
export function resolveAnimatedSpriteSelectValue(animatedSpriteName, textures0) {
  const explicit =
    typeof animatedSpriteName === "string" ? animatedSpriteName.trim() : "";
  if (explicit) return explicit;
  const t0 = typeof textures0 === "string" ? textures0.trim() : "";
  if (t0 && isStaticSingleParticleTextureId(t0)) return "";
  return t0;
}

/**
 * When the resolved value is empty but exactly one animated sequence exists, use it so the
 * controlled select value matches an option (empty value with only coin_ breaks picking).
 */
export function coerceAnimatedSpriteSelectValue(resolved, detected) {
  const r = typeof resolved === "string" ? resolved.trim() : "";
  if (r) return r;
  if (Array.isArray(detected) && detected.length === 1) return detected[0].prefix;
  return "";
}

/**
 * @param {import("@pixi/loaders").Loader} loader - e.g. Loader.shared
 * @param {Array<{ fileName?: string }>|undefined} particleTextureSources
 * @param {string[]|undefined} textures - legacy config.texture file names
 * @returns {string[]}
 */
export function collectTextureIdCandidates(
  loader,
  particleTextureSources,
  textures,
) {
  const set = new Set();
  const resources = loader?.resources || {};

  for (const sheetKey of SHEET_RESOURCE_KEYS) {
    const sheetTextures = resources[sheetKey]?.textures;
    if (sheetTextures && typeof sheetTextures === "object") {
      for (const k of Object.keys(sheetTextures)) {
        set.add(k);
      }
    }
  }

  if (Array.isArray(particleTextureSources)) {
    for (const s of particleTextureSources) {
      if (s && typeof s.fileName === "string" && s.fileName) {
        set.add(s.fileName);
      }
    }
  }

  if (Array.isArray(textures)) {
    for (const t of textures) {
      if (typeof t === "string" && t) set.add(t);
    }
  }

  for (const key of Object.keys(resources)) {
    if (IMAGE_KEY_RE.test(key)) set.add(key);
  }

  return [...set];
}

/**
 * Texture ids from packed JSON only (multipack + images).
 * @param {import("@pixi/loaders").Loader} loader
 * @returns {string[]}
 */
export function collectSheetTextureIds(loader) {
  const set = new Set();
  const resources = loader?.resources || {};
  for (const sheetKey of SHEET_RESOURCE_KEYS) {
    const sheetTextures = resources[sheetKey]?.textures;
    if (sheetTextures && typeof sheetTextures === "object") {
      for (const k of Object.keys(sheetTextures)) {
        set.add(k);
      }
    }
  }
  return [...set];
}

/**
 * Built-in sheet sequences: only allowlisted prefixes. User particle files: any detected sequence.
 * @param {import("@pixi/loaders").Loader} loader
 * @param {Array<{ fileName?: string }>|undefined} particleTextureSources
 * @param {string[]|undefined} textures - names not present in packed sheets are treated as user assets
 * @returns {{ prefix: string, frameCount: number }[]}
 */
export function getAnimatedSpritePrefixesForEditor(
  loader,
  particleTextureSources,
  textures,
) {
  const fromSheets = detectAnimatedPrefixes(collectSheetTextureIds(loader)).filter(
    (p) => BUILT_IN_ANIMATED_SPRITE_PREFIX_ALLOWLIST.has(p.prefix),
  );

  const sheetIdSet = new Set(collectSheetTextureIds(loader));
  const userIdSet = new Set();
  if (Array.isArray(particleTextureSources)) {
    for (const s of particleTextureSources) {
      if (s && typeof s.fileName === "string" && s.fileName) userIdSet.add(s.fileName);
    }
  }
  if (Array.isArray(textures)) {
    for (const t of textures) {
      if (typeof t === "string" && t && !sheetIdSet.has(t)) userIdSet.add(t);
    }
  }
  const fromUser = detectAnimatedPrefixes([...userIdSet]);

  const byPrefix = new Map();
  for (const d of [...fromSheets, ...fromUser]) {
    const prev = byPrefix.get(d.prefix);
    if (!prev || prev.frameCount < d.frameCount) {
      byPrefix.set(d.prefix, d);
    }
  }
  return [...byPrefix.values()].sort((a, b) => a.prefix.localeCompare(b.prefix));
}

/**
 * @param {string[]} candidateIds
 * @returns {{ prefix: string, frameCount: number }[]}
 */
export function detectAnimatedPrefixes(candidateIds) {
  const byPrefix = new Map();
  for (const id of candidateIds) {
    if (typeof id !== "string") continue;
    const m = id.match(FRAME_FILENAME_RE);
    if (!m) continue;
    const prefix = m[1];
    const indexStr = m[2];
    if (!byPrefix.has(prefix)) byPrefix.set(prefix, new Set());
    byPrefix.get(prefix).add(indexStr);
  }

  const out = [];
  for (const [prefix, frames] of byPrefix) {
    if (frames.size >= 2) {
      out.push({ prefix, frameCount: frames.size });
    }
  }
  out.sort((a, b) => a.prefix.localeCompare(b.prefix));
  return out;
}

/**
 * @param {{ prefix: string, frameCount: number }[]} detected
 * @param {string} currentName
 * @param {{ prependPlaceholder?: boolean }} [options]
 * @returns {{ key: string, displayName: string, value?: string, disabled?: boolean }[]}
 */
export function buildAnimatedSpriteNameSelectElements(
  detected,
  currentName,
  options = {},
) {
  const { prependPlaceholder = false } = options;
  const base = detected.map(({ prefix, frameCount }) => ({
    key: prefix,
    displayName: `${prefix} (${frameCount} frames)`,
  }));

  const placeholderRow =
    prependPlaceholder && base.length > 0
      ? [
          {
            key: "__placeholder__",
            displayName: "Select animated sequence…",
            value: "",
            disabled: true,
          },
        ]
      : [];

  const raw = String(currentName || "").trim();
  const name = isStaticSingleParticleTextureId(raw) ? "" : raw;
  if (name && !base.some((o) => o.key === name)) {
    return [
      ...placeholderRow,
      { key: name, displayName: `${name} (not in list)` },
      ...base,
    ];
  }
  if (base.length === 0 && name) {
    return [{ key: name, displayName: `${name} (not in list)` }];
  }
  return [...placeholderRow, ...base];
}

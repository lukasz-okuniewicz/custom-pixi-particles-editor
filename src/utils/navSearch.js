"use client";

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function words(value) {
  const n = normalize(value);
  return n ? n.split(/\s+/g) : [];
}

/**
 * Lightweight fuzzy score for navigation queries.
 * - strong: exact/prefix matches
 * - medium: word-prefix/substring
 * - weak: ordered-char subsequence
 * @returns {number}
 */
export function fuzzyScore(query, candidate) {
  const q = normalize(query);
  const c = normalize(candidate);
  if (!q || !c) return 0;
  if (c === q) return 1200;
  if (c.startsWith(q)) return 950 - Math.min(80, c.length - q.length);
  if (c.includes(` ${q}`)) return 820;
  if (c.includes(q)) return 700 - Math.min(120, c.indexOf(q));

  const qWords = words(q);
  if (qWords.length > 1) {
    const cWords = words(c);
    let matched = 0;
    for (const qw of qWords) {
      if (cWords.some((cw) => cw.startsWith(qw))) matched += 1;
    }
    if (matched === qWords.length) return 650 + matched * 12;
    if (matched > 0) return 360 + matched * 16;
  }

  let qi = 0;
  let start = -1;
  for (let i = 0; i < c.length && qi < q.length; i++) {
    if (c[i] === q[qi]) {
      if (start < 0) start = i;
      qi += 1;
    }
  }
  if (qi === q.length) {
    const spread = Math.max(0, c.length - q.length);
    const penalty = start >= 0 ? start : 0;
    return 220 - Math.min(140, spread + penalty);
  }
  return 0;
}

/**
 * @param {string} query
 * @param {string[]} candidates
 * @returns {number}
 */
export function bestFuzzyScore(query, candidates) {
  let best = 0;
  for (const c of candidates || []) {
    const s = fuzzyScore(query, c);
    if (s > best) best = s;
  }
  return best;
}


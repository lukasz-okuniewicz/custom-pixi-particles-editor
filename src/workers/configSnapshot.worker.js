"use strict";

function sortObjectKeysDeep(value) {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(sortObjectKeysDeep);
  const sorted = {};
  for (const key of Object.keys(value).sort()) {
    sorted[key] = sortObjectKeysDeep(value[key]);
  }
  return sorted;
}

function snapshotForCompare(config) {
  if (!config || typeof config !== "object") return "";
  try {
    const clone = JSON.parse(JSON.stringify(config));
    delete clone.refresh;
    return JSON.stringify(sortObjectKeysDeep(clone));
  } catch {
    return "";
  }
}

self.onmessage = (event) => {
  const { id, type, config, draft, base } = event.data || {};
  if (!id || !type) return;
  try {
    if (type === "serialize") {
      const serialized = JSON.stringify(config ?? null);
      self.postMessage({ id, type, serialized });
      return;
    }
    if (type === "compare") {
      const baseSnapshot = snapshotForCompare(base);
      const draftSnapshot = snapshotForCompare(draft);
      self.postMessage({
        id,
        type,
        equal: baseSnapshot === draftSnapshot,
      });
    }
  } catch (error) {
    self.postMessage({
      id,
      type,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

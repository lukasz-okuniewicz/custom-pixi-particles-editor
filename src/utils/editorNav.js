import { menuLabelToPanelId } from "@utils/behaviourSummary";

export const GENERAL_PROPERTIES_PANEL_ID = menuLabelToPanelId("General Properties");

/**
 * If the panel has a collapsed body (`display:none` via `.collapse`), simulate a click on the
 * owning `<legend>` so React re-opens the section (required after command-palette jumps to hints).
 * @param {string | undefined} panelId
 * @returns {boolean} true if a legend was clicked to expand
 */
export function expandSidebarPanelIfCollapsed(panelId) {
  if (!panelId || typeof document === "undefined") return false;
  const root = document.getElementById(panelId);
  if (!root) return false;
  const collapsed = root.querySelector("div.collapse");
  if (!collapsed) return false;
  let el = collapsed.previousElementSibling;
  while (el && el.tagName !== "LEGEND") {
    el = el.previousElementSibling;
  }
  if (el && el.tagName === "LEGEND") {
    el.click();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("editor-sidebar-accordion-open", {
          detail: { panelId },
        }),
      );
    }
    return true;
  }
  const leg = root.querySelector("legend");
  if (leg) {
    leg.click();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("editor-sidebar-accordion-open", {
          detail: { panelId },
        }),
      );
    }
    return true;
  }
  return false;
}

const PROPERTY_FLASH_MS = 2200;

/**
 * Briefly highlight the form row for a property hint key (matches control `id` / `select:Label` in {@link behaviourPropertyHints}).
 * @param {string | undefined} hintKey
 */
export function highlightHintField(hintKey) {
  if (!hintKey || typeof document === "undefined") return;

  let el = document.getElementById(hintKey);
  if (!el && hintKey.startsWith("select:")) {
    const label = hintKey.slice("select:".length);
    const derived = `select-field-${String(label).replace(/\s+/g, "-").toLowerCase()}`;
    el = document.getElementById(derived);
  }
  if (!el && typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    try {
      el = document.querySelector(`[id^="${CSS.escape(hintKey)}-"]`);
    } catch {
      el = null;
    }
  }
  if (!el) {
    const hintSpan = document.getElementById(`${hintKey}-hint`);
    el = hintSpan?.closest?.(".form-group") ?? null;
  }
  if (!el) return;

  const target = el.closest(".form-group") || el;
  target.classList.remove("editor-property-flash");
  void target.offsetWidth;
  target.classList.add("editor-property-flash");
  window.setTimeout(() => target.classList.remove("editor-property-flash"), PROPERTY_FLASH_MS);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });

  const focusable = target.querySelector?.('input:not([type="hidden"]), select, textarea, button');
  if (focusable && typeof focusable.focus === "function") {
    try {
      focusable.focus({ preventScroll: true });
    } catch {
      focusable.focus();
    }
  }
}

function scrollFlash(panelId, onAfterScroll, highlightHintKey) {
  const el = document.getElementById(panelId);
  if (!el) return;
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  el.classList.add("editor-panel-flash");
  window.setTimeout(() => el.classList.remove("editor-panel-flash"), 520);
  if (typeof onAfterScroll === "function") onAfterScroll();
  if (highlightHintKey) {
    window.setTimeout(() => highlightHintField(highlightHintKey), 100);
  }
}

function runAfterPanelSettles(panelId, fn) {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const el = document.getElementById(panelId);
  if (!el) return;

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    fn();
  };

  if (typeof IntersectionObserver === "function") {
    const obs = new IntersectionObserver(
      (entries) => {
        const ok = entries.some((e) => e.target === el && e.isIntersecting);
        if (ok) {
          obs.disconnect();
          finish();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    window.setTimeout(() => {
      obs.disconnect();
      finish();
    }, 240);
    return;
  }

  window.requestAnimationFrame(() => window.requestAnimationFrame(finish));
}

/**
 * Scroll a sidebar section into view and flash it. No-op if the panel is missing (e.g. effect-only mode).
 * @param {string | undefined} panelId
 * @param {object} [opts]
 * @param {() => void} [opts.onAfterScroll] e.g. close mobile menu / command palette
 * @param {boolean} [opts.expandCollapsed] if true, expand folded behaviour section before scrolling (waits for React paint)
 * @param {string} [opts.highlightHintKey] property hint key → flash matching `.form-group` (e.g. from command palette)
 */
export function scrollToSidebarPanel(panelId, opts = {}) {
  if (!panelId || typeof document === "undefined") return;
  const el = document.getElementById(panelId);
  if (!el) return;

  const runScroll = () =>
    scrollFlash(panelId, opts.onAfterScroll, opts.highlightHintKey);

  if (opts.expandCollapsed) {
    const expanded = expandSidebarPanelIfCollapsed(panelId);
    if (expanded) {
      window.setTimeout(() => runAfterPanelSettles(panelId, runScroll), 80);
      return;
    }
  }

  runAfterPanelSettles(panelId, runScroll);
}

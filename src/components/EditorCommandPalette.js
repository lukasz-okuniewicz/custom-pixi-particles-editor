"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { COMMAND_PALETTE_SECTION_LABELS, menuLabelToPanelId } from "@utils/behaviourSummary";
import { filterPropertyHintsForSearch } from "@utils/propertyHintNavIndex";
import { scrollToSidebarPanel } from "@utils/editorNav";
import { updateProps } from "@utils";
import { bestFuzzyScore } from "@utils/navSearch";

/**
 * @typedef {{ id: string, kind: 'action' | 'section' | 'hint', title: string, subtitle?: string, run: () => void }} PaletteItem
 */

const PALETTE_RECENT_STORAGE_KEY = "particleEditor.commandPaletteRecent.v1";
const PALETTE_PINNED_STORAGE_KEY = "particleEditor.commandPalettePinned.v1";
const MAX_RECENT = 14;

function loadStoredIds(key) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function saveStoredIds(key, ids) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

export default function EditorCommandPalette({
  open,
  onClose,
  onAfterNavigate,
  isNarrowViewport,
  onTriggerLoad,
  onToggleMobileMenu,
}) {
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentIds, setRecentIds] = useState(() => loadStoredIds(PALETTE_RECENT_STORAGE_KEY));
  const [pinnedIds, setPinnedIds] = useState(() => loadStoredIds(PALETTE_PINNED_STORAGE_KEY));

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  const jump = useCallback(
    (panelId, hintKey) => {
      scrollToSidebarPanel(panelId, {
        onAfterScroll: onAfterNavigate,
        expandCollapsed: true,
        highlightHintKey: hintKey || undefined,
      });
      onClose();
    },
    [onClose, onAfterNavigate],
  );

  const registerRecent = useCallback((id) => {
    if (!id) return;
    setRecentIds((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, MAX_RECENT));
  }, []);

  const togglePin = useCallback((id) => {
    if (!id) return;
    setPinnedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]));
  }, []);

  useEffect(() => saveStoredIds(PALETTE_RECENT_STORAGE_KEY, recentIds), [recentIds]);
  useEffect(() => saveStoredIds(PALETTE_PINNED_STORAGE_KEY, pinnedIds), [pinnedIds]);

  const items = useMemo(() => {
    /** @type {PaletteItem[]} */
    const out = [];
    const q = query.trim().toLowerCase();

    const addAction = (id, title, subtitle, keywords, run) => {
      const score = q ? bestFuzzyScore(q, [title, subtitle || "", keywords || ""]) : 400;
      if (q && score <= 0) return;
      out.push({ id, kind: "action", title, subtitle, run, score });
    };

    addAction("save", "Save JSON", "Download config snapshot", "download export", () => {
      updateProps("noConfig.download-config");
      onClose();
    });
    addAction("refresh", "Refresh particles", "Rebuild from current settings", "reload", () => {
      updateProps("noConfig.refresh");
      onClose();
    });
    addAction("load", "Load JSON…", "Pick a config file", "import open", () => {
      onTriggerLoad?.();
      onClose();
    });
    addAction("search", "Focus sidebar search", "Filter enabled behaviours", "find sections", () => {
      const el = document.getElementById("sidebar-behaviour-search");
      el?.focus?.();
      onClose();
    });
    if (isNarrowViewport && onToggleMobileMenu) {
      addAction("menu", "Toggle sidebar menu", "Open or close the drawer", "mobile", () => {
        onToggleMobileMenu();
        onClose();
      });
    }

    for (const label of COMMAND_PALETTE_SECTION_LABELS) {
      const panelId = menuLabelToPanelId(label);
      const score = q ? bestFuzzyScore(q, [label, "jump section"]) : 280;
      if (q && score <= 0) continue;
      out.push({
        id: `sec-${panelId}`,
        kind: "section",
        title: label,
        subtitle: "Jump to section",
        run: () => jump(panelId),
        score,
      });
    }

    if (q.length >= 1) {
      for (const row of filterPropertyHintsForSearch(q, 40)) {
        const score = bestFuzzyScore(q, [
          row.hintKey,
          row.sectionLabel,
          row.snippet || "",
        ]);
        if (score <= 0) continue;
        out.push({
          id: `hint-${row.hintKey}`,
          kind: "hint",
          title: row.snippet || row.hintKey,
          subtitle: `${row.sectionLabel} · ${row.hintKey}`,
          run: () => jump(row.panelId, row.hintKey),
          score,
        });
      }
    }

    if (q) {
      return out
        .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
        .slice(0, 60);
    }

    const byId = new Map(out.map((item) => [item.id, item]));
    const pinned = [];
    for (const id of pinnedIds) {
      if (byId.has(id)) pinned.push(byId.get(id));
    }
    const recent = [];
    for (const id of recentIds) {
      if (byId.has(id) && !pinnedIds.includes(id)) recent.push(byId.get(id));
    }
    const defaults = out.filter((item) =>
      item.kind === "action" || item.id === "sec-behaviour-panel-general-properties",
    );
    const merged = [...pinned, ...recent, ...defaults];
    const seen = new Set();
    return merged.filter((item) => {
      if (!item || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [
    query,
    jump,
    onClose,
    isNarrowViewport,
    onTriggerLoad,
    onToggleMobileMenu,
    recentIds,
    pinnedIds,
  ]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    setActiveIndex((i) => Math.min(i, Math.max(0, items.length - 1)));
  }, [items.length]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector?.(`[data-palette-index="${activeIndex}"]`);
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, open, items.length]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onDoc, true);
    return () => document.removeEventListener("keydown", onDoc, true);
  }, [open, onClose]);

  if (!open) return null;

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(0, items.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = items[activeIndex];
      if (item) {
        registerRecent(item.id);
        item.run?.();
      }
    }
  };

  return (
    <div
      className="editor-command-palette-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="editor-command-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="search"
          className="editor-command-palette__input"
          placeholder="Type to find a section or property hint — or use the actions below"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          spellCheck={false}
        />
        <ul
          ref={listRef}
          className="editor-command-palette__list"
          role="listbox"
          aria-activedescendant={items[activeIndex] ? `palette-item-${items[activeIndex].id}` : undefined}
        >
          {items.length === 0 ? (
            <li className="editor-command-palette__empty" role="option">
              No matches
            </li>
          ) : (
            items.map((item, index) => (
              <li key={item.id} role="none">
                <div
                  className={
                    index === activeIndex
                      ? "editor-command-palette__row-wrap editor-command-palette__row-wrap--active"
                      : "editor-command-palette__row-wrap"
                  }
                >
                  <button
                    type="button"
                    id={`palette-item-${item.id}`}
                    data-palette-index={index}
                    role="option"
                    aria-selected={index === activeIndex}
                    className={
                      index === activeIndex
                        ? "editor-command-palette__row editor-command-palette__row--active"
                        : "editor-command-palette__row"
                    }
                    onClick={() => {
                      registerRecent(item.id);
                      item.run();
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <span className="editor-command-palette__kind">{item.kind}</span>
                    <span className="editor-command-palette__text">
                      <span className="editor-command-palette__title">{item.title}</span>
                      {item.subtitle ? (
                        <span className="editor-command-palette__subtitle">{item.subtitle}</span>
                      ) : null}
                    </span>
                  </button>
                  {item.kind !== "action" ? (
                    <button
                      type="button"
                      className={
                        pinnedIds.includes(item.id)
                          ? "editor-command-palette__pin editor-command-palette__pin--active"
                          : "editor-command-palette__pin"
                      }
                      onClick={() => togglePin(item.id)}
                      aria-label={pinnedIds.includes(item.id) ? "Remove from favourites" : "Add to favourites"}
                      title={pinnedIds.includes(item.id) ? "Remove from favourites" : "Add to favourites"}
                    >
                      {pinnedIds.includes(item.id) ? "Favourite" : "Add"}
                    </button>
                  ) : null}
                </div>
              </li>
            ))
          )}
        </ul>
        <div className="editor-command-palette__footer" aria-hidden="true">
          <span>↑↓ navigate</span>
          <span>Enter run</span>
          <span>Esc close</span>
          <span>Pin save target</span>
        </div>
      </div>
    </div>
  );
}

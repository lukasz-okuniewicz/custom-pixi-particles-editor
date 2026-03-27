"use client";

import { useEffect, useMemo, useState } from "react";
import {
  EMISSION_TYPE_SUMMARY,
  getAllSidebarNavItems,
  getEnabledBehaviourSummaries,
  menuLabelToPanelId,
  SIDEBAR_FAVOURITES_STORAGE_KEY,
} from "@utils/behaviourSummary";
import { scrollToSidebarPanel } from "@utils/editorNav";
import { filterPropertyHintsForSearch } from "@utils/propertyHintNavIndex";
import { bestFuzzyScore } from "@utils/navSearch";

const SEARCH_ALIAS_TOKENS = {
  color: ["colour", "hue", "tint"],
  spawn: ["birth", "origin", "generator"],
  turbulence: ["noise", "chaos"],
  emission: ["rate", "density"],
  life: ["lifetime", "duration"],
};

const SIDEBAR_FAVOURITES_CHANGED_EVENT = "editor-sidebar-favourites-changed";
const SIDEBAR_RECENT_STORAGE_KEY = "particleEditor.sidebarRecentNav.v1";
const MAX_RECENTS = 8;

function loadStoredLabels(key) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function saveStoredLabels(key, labels) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(labels));
  } catch {
    /* ignore */
  }
}

export default function ActiveBehavioursSummary({ defaultConfig }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const [pinned, setPinned] = useState(() => loadStoredLabels(SIDEBAR_FAVOURITES_STORAGE_KEY));
  const [recentLabels, setRecentLabels] = useState(() =>
    loadStoredLabels(SIDEBAR_RECENT_STORAGE_KEY),
  );
  const [activeSearchIndex, setActiveSearchIndex] = useState(0);

  const behaviourItems = useMemo(
    () => getEnabledBehaviourSummaries(defaultConfig),
    [defaultConfig],
  );
  /** Shown when the search box is empty: enabled behaviours + Emission Type. */
  const enabledChips = useMemo(() => {
    const merged = [EMISSION_TYPE_SUMMARY, ...behaviourItems];
    merged.sort((a, b) => a.label.localeCompare(b.label));
    return merged;
  }, [behaviourItems]);

  const allNavItems = useMemo(
    () => getAllSidebarNavItems(defaultConfig),
    [defaultConfig],
  );

  const isFiltering = searchQuery.trim().length > 0;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  /** Labels shown when not searching (Emission Type + enabled behaviours only). */
  const enabledLabelSet = useMemo(
    () => new Set(enabledChips.map((row) => row.label)),
    [enabledChips],
  );

  const displayedChips = useMemo(() => {
    const q = normalizedQuery;
    if (!q) return enabledChips;
    const sectionMatches = allNavItems
      .map((row) => {
        const aliasScore = Object.entries(SEARCH_ALIAS_TOKENS).some(
          ([key, aliases]) =>
            row.label.toLowerCase().includes(key) && aliases.some((a) => a.includes(q)),
        )
          ? 120
          : 0;
        const score = bestFuzzyScore(q, [row.label, row.key]) + aliasScore;
        return score > 0 ? { ...row, score, resultType: "section" } : null;
      })
      .filter(Boolean);
    const hintMatches = filterPropertyHintsForSearch(q, 40).map((h) => {
      const score = bestFuzzyScore(q, [h.sectionLabel, h.hintKey, h.snippet || ""]);
      return {
        label: `${h.sectionLabel} · ${h.snippet}`,
        panelId: h.panelId,
        key: `hint-${h.hintKey}`,
        score,
        resultType: "property",
      };
    });
    const merged = [...sectionMatches];
    const keys = new Set(sectionMatches.map((r) => r.key));
    for (const h of hintMatches) {
      if (!keys.has(h.key)) {
        keys.add(h.key);
        merged.push(h);
      }
    }
    merged.sort((a, b) => b.score - a.score || a.label.localeCompare(b.label));
    return merged;
  }, [normalizedQuery, enabledChips, allNavItems]);

  const togglePin = (label) => {
    setPinned((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label],
    );
  };

  const pinnedRows = displayedChips.filter((row) => pinned.includes(row.label));
  const pinnedLabelSet = useMemo(() => new Set(pinned), [pinned]);
  const favouritesOnlyRows = useMemo(
    () => displayedChips.filter((row) => pinnedLabelSet.has(row.label)),
    [displayedChips, pinnedLabelSet],
  );
  const listRows = useMemo(
    () =>
      showFavouritesOnly
        ? favouritesOnlyRows
        : displayedChips.filter((row) => !pinnedLabelSet.has(row.label)),
    [displayedChips, pinnedLabelSet, showFavouritesOnly, favouritesOnlyRows],
  );

  const registerRecent = (label) => {
    if (!label) return;
    setRecentLabels((prev) => [label, ...prev.filter((item) => item !== label)].slice(0, MAX_RECENTS));
  };

  const scrollToPanel = (panelId, label, key) => {
    const hintKey =
      typeof key === "string" && key.startsWith("hint-")
        ? key.slice("hint-".length)
        : undefined;
    scrollToSidebarPanel(panelId, {
      expandCollapsed: true,
      highlightHintKey: hintKey,
    });
    registerRecent(label);
  };

  useEffect(() => {
    saveStoredLabels(SIDEBAR_FAVOURITES_STORAGE_KEY, pinned);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(SIDEBAR_FAVOURITES_CHANGED_EVENT));
    }
  }, [pinned]);

  useEffect(() => {
    saveStoredLabels(SIDEBAR_RECENT_STORAGE_KEY, recentLabels);
  }, [recentLabels]);

  useEffect(() => {
    setActiveSearchIndex(0);
  }, [normalizedQuery]);

  const searchResults = isFiltering ? displayedChips : [];

  return (
    <div
      className={
        behaviourItems.length === 0
          ? "enabled-behaviours-summary enabled-behaviours-summary--empty"
          : "enabled-behaviours-summary"
      }
    >
      <div className="enabled-behaviours-summary__head">
        <span className="enabled-behaviours-summary__title">Enabled behaviours</span>
        <span
          className="enabled-behaviours-summary__count"
          title={
            isFiltering
              ? `${displayedChips.length} sidebar section match${displayedChips.length === 1 ? "" : "es"} (${allNavItems.length} total sections)`
              : `${enabledChips.length} in list (search matches sidebar section names)`
          }
        >
          {isFiltering
            ? `${displayedChips.length}/${allNavItems.length}`
            : enabledChips.length}
        </span>
      </div>
      <p className="enabled-behaviours-summary__sub">
        Chips list enabled behaviours. Search matches section titles and
        property hints; dimmed rows are not enabled yet. Click to jump. Shortcuts:
        {" "}
        <kbd className="editor-kbd">/</kbd>
        {" "}focus,
        {" "}
        <kbd className="editor-kbd">Esc</kbd>
        {" "}clear.
      </p>
      <p className="enabled-behaviours-summary__meta">
        {pinned.length > 0 ? `${pinned.length} favourites` : "No favourites yet"}
        {" · "}
        Click the favourite button on any row.
      </p>
      <input
        id="sidebar-behaviour-search"
        type="search"
        className="enabled-behaviours-summary__search"
        placeholder="Search sections & property hints…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setSearchQuery("");
          if (!isFiltering || searchResults.length === 0) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveSearchIndex((i) => Math.min(i + 1, searchResults.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveSearchIndex((i) => Math.max(i - 1, 0));
          } else if (e.key === "Enter") {
            e.preventDefault();
            const row = searchResults[activeSearchIndex];
            if (row) scrollToPanel(row.panelId, row.label, row.key);
          }
        }}
        autoComplete="off"
        spellCheck={false}
        aria-label="Search sidebar sections and property hints"
      />
      <div className="enabled-behaviours-summary__actions">
        <button
          type="button"
          className="enabled-behaviours-summary__action-btn"
          onClick={() => scrollToPanel(menuLabelToPanelId("General Properties"), "General Properties")}
        >
          Jump to General
        </button>
        <button
          type="button"
          className="enabled-behaviours-summary__action-btn"
          onClick={() => setSearchQuery("")}
          disabled={!searchQuery}
        >
          Clear search
        </button>
        <button
          type="button"
          className="enabled-behaviours-summary__action-btn"
          onClick={() => setPinned([])}
          disabled={pinned.length === 0}
        >
          Clear favourites
        </button>
        <button
          type="button"
          className={`enabled-behaviours-summary__action-btn ${showFavouritesOnly ? "enabled-behaviours-summary__action-btn--active" : ""}`}
          onClick={() => setShowFavouritesOnly((v) => !v)}
          disabled={pinned.length === 0}
        >
          {showFavouritesOnly ? "Show all" : "Favourites only"}
        </button>
      </div>
      {behaviourItems.length === 0 ? (
        <p className="enabled-behaviours-summary__hint">
          No particle behaviours are enabled. Emission Type always applies; open a
          behaviour section to turn others on or load a preset.
        </p>
      ) : null}
      {pinnedRows.length > 0 && !showFavouritesOnly ? (
        <>
          <p className="enabled-behaviours-summary__sub enabled-behaviours-summary__sub--split">
            Favourites
          </p>
          <div className="enabled-behaviours-summary__chips" role="list">
            {pinnedRows.map(({ label, panelId, key }) => (
              <div key={`pin-${key}`} className="enabled-behaviours-summary__chip-row" role="listitem">
                <button
                  type="button"
                  className="enabled-behaviours-summary__chip enabled-behaviours-summary__chip--pinned"
                  onClick={() => scrollToPanel(panelId, label, key)}
                >
                  {label}
                </button>
                <button
                  type="button"
                  className="enabled-behaviours-summary__pin-btn"
                  onClick={() => togglePin(label)}
                  title="Remove from favourites"
                  aria-label={`Remove ${label} from favourites`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      ) : null}
      <p className="enabled-behaviours-summary__sub enabled-behaviours-summary__sub--split">
        {showFavouritesOnly ? "Favourites" : isFiltering ? "Search results" : "Enabled list"}
      </p>
      <div className="enabled-behaviours-summary__chips" role="list">
        {listRows.length === 0 && isFiltering ? (
          <p className="enabled-behaviours-summary__no-match" role="status">
            {`No behaviours match "${searchQuery.trim()}".`}
          </p>
        ) : (
          listRows.map(({ label, panelId, key, resultType }, index) => {
            const fromHintSearch = typeof key === "string" && key.startsWith("hint-");
            const dimmed =
              isFiltering && !fromHintSearch && !enabledLabelSet.has(label);
            const isActiveSearch = isFiltering && index === activeSearchIndex;
            return (
              <div key={key} className="enabled-behaviours-summary__chip-row" role="listitem">
                <button
                  type="button"
                  className={
                    `${dimmed
                      ? "enabled-behaviours-summary__chip enabled-behaviours-summary__chip--inactive"
                      : "enabled-behaviours-summary__chip"}${isActiveSearch ? " enabled-behaviours-summary__chip--active-search" : ""}`
                  }
                  title={
                    dimmed
                      ? "Not in the enabled list — open the section to turn on"
                      : fromHintSearch
                        ? "Property hint — expand section, scroll, and highlight field"
                        : undefined
                  }
                  onClick={() => scrollToPanel(panelId, label, key)}
                >
                  {isFiltering ? (
                    <span className="enabled-behaviours-summary__chip-content">
                      <span className="enabled-behaviours-summary__chip-label">{label}</span>
                      <span className="enabled-behaviours-summary__chip-type">
                        {resultType === "property" ? "Property" : "Section"}
                      </span>
                    </span>
                  ) : (
                    label
                  )}
                </button>
                <button
                  type="button"
                  className={`enabled-behaviours-summary__pin-btn ${
                    pinned.includes(label) ? "enabled-behaviours-summary__pin-btn--active" : ""
                  }`}
                  onClick={() => togglePin(label)}
                  aria-label={`${pinned.includes(label) ? "Remove from favourites" : "Add to favourites"} ${label}`}
                  title={pinned.includes(label) ? "Remove from favourites" : "Add to favourites"}
                >
                  {pinned.includes(label) ? "Favourite" : "Add"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

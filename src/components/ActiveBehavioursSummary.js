"use client";

import { useMemo, useState } from "react";
import {
  EMISSION_TYPE_SUMMARY,
  getAllSidebarNavItems,
  getEnabledBehaviourSummaries,
} from "@utils/behaviourSummary";

const SEARCH_ALIAS_TOKENS = {
  color: ["colour", "hue", "tint"],
  spawn: ["birth", "origin", "generator"],
  turbulence: ["noise", "chaos"],
  emission: ["rate", "density"],
  life: ["lifetime", "duration"],
};

export default function ActiveBehavioursSummary({ defaultConfig }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pinned, setPinned] = useState([]);
  const [recentLabels, setRecentLabels] = useState([]);

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
    return allNavItems.filter((row) => {
      const labelLower = row.label.toLowerCase();
      if (labelLower.includes(q)) return true;
      return Object.entries(SEARCH_ALIAS_TOKENS).some(
        ([key, aliases]) =>
          labelLower.includes(key) && aliases.some((a) => a.includes(q)),
      );
    });
  }, [normalizedQuery, enabledChips, allNavItems]);

  const togglePin = (label) => {
    setPinned((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label],
    );
  };

  const pinnedRows = displayedChips.filter((row) => pinned.includes(row.label));
  const recentRows = allNavItems.filter((row) => recentLabels.includes(row.label));

  const registerRecent = (label) => {
    if (!label) return;
    setRecentLabels((prev) => [label, ...prev.filter((item) => item !== label)].slice(0, 5));
  };

  const scrollToPanel = (panelId, label) => {
    const el = document.getElementById(panelId);
    if (!el) return;
    registerRecent(label);
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    el.classList.add("editor-panel-flash");
    window.setTimeout(() => el.classList.remove("editor-panel-flash"), 520);
  };

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
        Chips list enabled behaviours. Search matches sidebar
        section titles; dimmed rows are not enabled yet. Click
        to jump. Shortcuts:
        {" "}
        <kbd className="editor-kbd">/</kbd>
        {" "}focus,
        {" "}
        <kbd className="editor-kbd">Esc</kbd>
        {" "}clear.
      </p>
      <p className="enabled-behaviours-summary__meta">
        {pinned.length > 0 ? `${pinned.length} pinned` : "No pins yet"}
        {" · "}
        Click the pin button on any row.
      </p>
      <input
        id="sidebar-behaviour-search"
        type="search"
        className="enabled-behaviours-summary__search"
        placeholder="Search sidebar sections…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setSearchQuery("");
        }}
        autoComplete="off"
        spellCheck={false}
        aria-label="Search sidebar section names"
      />
      <div className="enabled-behaviours-summary__actions">
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
          Clear pinned
        </button>
      </div>
      {behaviourItems.length === 0 ? (
        <p className="enabled-behaviours-summary__hint">
          No particle behaviours are enabled. Emission Type always applies; open a
          behaviour section to turn others on or load a preset.
        </p>
      ) : null}
      {pinnedRows.length > 0 ? (
        <>
          <p className="enabled-behaviours-summary__sub enabled-behaviours-summary__sub--split">
            Pinned
          </p>
          <div className="enabled-behaviours-summary__chips" role="list">
            {pinnedRows.map(({ label, panelId, key }) => (
              <div key={`pin-${key}`} className="enabled-behaviours-summary__chip-row" role="listitem">
                <button
                  type="button"
                  className="enabled-behaviours-summary__chip enabled-behaviours-summary__chip--pinned"
                  onClick={() => scrollToPanel(panelId, label)}
                >
                  {label}
                </button>
                <button
                  type="button"
                  className="enabled-behaviours-summary__pin-btn"
                  onClick={() => togglePin(label)}
                  title="Unpin"
                  aria-label={`Unpin ${label}`}
                >
                  Unpin
                </button>
              </div>
            ))}
          </div>
        </>
      ) : null}
      {recentRows.length > 0 ? (
        <>
          <p className="enabled-behaviours-summary__sub enabled-behaviours-summary__sub--split">
            Recent jumps
          </p>
          <div className="enabled-behaviours-summary__chips" role="list">
            {recentRows.map(({ label, panelId, key }) => (
              <button
                key={`recent-${key}`}
                type="button"
                role="listitem"
                className="enabled-behaviours-summary__chip enabled-behaviours-summary__chip--recent"
                onClick={() => scrollToPanel(panelId, label)}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      ) : null}
      <p className="enabled-behaviours-summary__sub enabled-behaviours-summary__sub--split">
        {isFiltering ? "Search results" : "Enabled list"}
      </p>
      <div className="enabled-behaviours-summary__chips" role="list">
        {displayedChips.length === 0 && isFiltering ? (
          <p className="enabled-behaviours-summary__no-match" role="status">
            {`No behaviours match "${searchQuery.trim()}".`}
          </p>
        ) : (
          displayedChips.map(({ label, panelId, key }) => {
            const dimmed = isFiltering && !enabledLabelSet.has(label);
            return (
              <div key={key} className="enabled-behaviours-summary__chip-row" role="listitem">
                <button
                  type="button"
                  className={
                    dimmed
                      ? "enabled-behaviours-summary__chip enabled-behaviours-summary__chip--inactive"
                      : "enabled-behaviours-summary__chip"
                  }
                  title={
                    dimmed
                      ? "Not in the enabled list — open the section to turn on"
                      : undefined
                  }
                  onClick={() => scrollToPanel(panelId, label)}
                >
                  {label}
                </button>
                <button
                  type="button"
                  className={`enabled-behaviours-summary__pin-btn ${
                    pinned.includes(label) ? "enabled-behaviours-summary__pin-btn--active" : ""
                  }`}
                  onClick={() => togglePin(label)}
                  aria-label={`${pinned.includes(label) ? "Unpin" : "Pin"} ${label}`}
                  title={pinned.includes(label) ? "Unpin" : "Pin"}
                >
                  {pinned.includes(label) ? "Pinned" : "Pin"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

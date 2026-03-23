"use client";

import { useMemo } from "react";
import { getEnabledBehaviourSummaries } from "@utils/behaviourSummary";

export default function ActiveBehavioursSummary({ defaultConfig }) {
  const items = useMemo(
    () => getEnabledBehaviourSummaries(defaultConfig),
    [defaultConfig],
  );

  const scrollToPanel = (panelId) => {
    const el = document.getElementById(panelId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (items.length === 0) {
    return (
      <div className="enabled-behaviours-summary enabled-behaviours-summary--empty">
        <div className="enabled-behaviours-summary__title">Enabled behaviours</div>
        <p className="enabled-behaviours-summary__hint">
          No behaviours are enabled in the current config. Open a section and turn
          on the behaviour, or load a preset that uses them.
        </p>
      </div>
    );
  }

  return (
    <div className="enabled-behaviours-summary">
      <div className="enabled-behaviours-summary__head">
        <span className="enabled-behaviours-summary__title">Enabled behaviours</span>
        <span className="enabled-behaviours-summary__count">{items.length}</span>
      </div>
      <p className="enabled-behaviours-summary__sub">
        Click a name to jump to that panel (works when the section is collapsed).
      </p>
      <div className="enabled-behaviours-summary__chips" role="list">
        {items.map(({ label, panelId, key }) => (
          <button
            key={key}
            type="button"
            role="listitem"
            className="enabled-behaviours-summary__chip"
            onClick={() => scrollToPanel(panelId)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

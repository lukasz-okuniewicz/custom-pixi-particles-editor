"use client";

import { useSidebarBehaviourAccordion } from "@context/SidebarBehaviourAccordionContext";

import { useCallback } from "react";

/**
 * Preference: when enabled, only one behaviour section stays expanded at a time.
 */
export default function SidebarAccordionToggle() {
  const { accordionSingleSection, setAccordionSingleSection } =
    useSidebarBehaviourAccordion();

  const onChange = useCallback(
    (e) => {
      setAccordionSingleSection(e.target.checked);
    },
    [setAccordionSingleSection],
  );

  return (
    <label className="editor-sidebar-pref-row">
      <input
        type="checkbox"
        className="editor-sidebar-pref-row__input"
        checked={accordionSingleSection}
        onChange={onChange}
      />
      <span className="editor-sidebar-pref-row__label">
        One sidebar section open at a time
      </span>
    </label>
  );
}

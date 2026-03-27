"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const Ctx = createContext(null);

export const SIDEBAR_ACCORDION_SINGLE_SECTION_STORAGE_KEY =
  "particleEditor.sidebarAccordionSingleSection.v1";

function readAccordionPreference() {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(
      SIDEBAR_ACCORDION_SINGLE_SECTION_STORAGE_KEY,
    );
    if (raw === null) return true;
    if (raw === "true" || raw === "1") return true;
    if (raw === "false" || raw === "0") return false;
    return JSON.parse(raw) !== false;
  } catch {
    return true;
  }
}

/** Keeps at most one behaviour sidebar section expanded when the preference is on. */
export function SidebarBehaviourAccordionProvider({ children }) {
  const [openPanelId, setOpenPanelId] = useState(null);
  const [accordionSingleSection, setAccordionSingleSectionState] = useState(
    readAccordionPreference,
  );
  const prevAccordionRef = useRef(null);

  useEffect(() => {
    const onOpen = (e) => {
      if (!accordionSingleSection) return;
      const id = e?.detail?.panelId;
      if (typeof id === "string") setOpenPanelId(id);
    };
    window.addEventListener("editor-sidebar-accordion-open", onOpen);
    return () =>
      window.removeEventListener("editor-sidebar-accordion-open", onOpen);
  }, [accordionSingleSection]);

  const setAccordionSingleSection = useCallback((next) => {
    setAccordionSingleSectionState(!!next);
    try {
      window.localStorage.setItem(
        SIDEBAR_ACCORDION_SINGLE_SECTION_STORAGE_KEY,
        String(!!next),
      );
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (prevAccordionRef.current === null) {
      prevAccordionRef.current = accordionSingleSection;
      return;
    }
    if (!prevAccordionRef.current && accordionSingleSection) {
      setOpenPanelId(null);
    }
    prevAccordionRef.current = accordionSingleSection;
  }, [accordionSingleSection]);

  const value = useMemo(
    () => ({
      openPanelId,
      setOpenPanelId,
      accordionSingleSection,
      setAccordionSingleSection,
    }),
    [openPanelId, accordionSingleSection, setAccordionSingleSection],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSidebarBehaviourAccordion() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error(
      "useSidebarBehaviourAccordion must be used within SidebarBehaviourAccordionProvider",
    );
  }
  return ctx;
}

/**
 * @param {string | undefined} panelId stable id from {@link menuLabelToPanelId} (sidebar section root `#id`)
 */
export function useBehaviourSectionCollapse(panelId) {
  const ctx = useContext(Ctx);
  const useAccordionMode = !!ctx && ctx.accordionSingleSection !== false;
  const [local, setLocal] = useState("collapse");
  const prevAccordionModeRef = useRef(null);

  useEffect(() => {
    if (!panelId || !ctx) return;
    if (prevAccordionModeRef.current === null) {
      prevAccordionModeRef.current = useAccordionMode;
      return;
    }
    const wasSingleSection = prevAccordionModeRef.current;
    if (wasSingleSection && !useAccordionMode) {
      setLocal(ctx.openPanelId === panelId ? "" : "collapse");
    }
    prevAccordionModeRef.current = useAccordionMode;
  }, [panelId, ctx, ctx?.openPanelId, useAccordionMode]);

  const isSubmenuVisible = useMemo(() => {
    if (!panelId || !useAccordionMode) return local;
    return ctx.openPanelId === panelId ? "" : "collapse";
  }, [panelId, ctx, ctx?.openPanelId, local, useAccordionMode]);

  const toggleSubmenuVisibility = useCallback(() => {
    if (!panelId || !useAccordionMode) {
      setLocal((p) => (p === "collapse" ? "" : "collapse"));
      return;
    }
    ctx.setOpenPanelId((prev) => (prev === panelId ? null : panelId));
  }, [panelId, ctx, useAccordionMode]);

  return { isSubmenuVisible, toggleSubmenuVisibility };
}

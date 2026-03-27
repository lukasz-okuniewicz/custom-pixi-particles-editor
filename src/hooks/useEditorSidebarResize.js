"use client";

import { useCallback, useEffect, useRef } from "react";

const STORAGE_KEY = "particleEditor.sidebarWidthPx.v1";
const MIN_PX = 240;
const MAX_RATIO = 0.62;

function maxWidthPx() {
  if (typeof window === "undefined") return 720;
  return Math.min(720, Math.round(window.innerWidth * MAX_RATIO));
}

function isDesktopSidebar() {
  return typeof window !== "undefined" && window.matchMedia("(min-width: 769px)").matches;
}

function clampWidth(px) {
  const max = maxWidthPx();
  return Math.min(max, Math.max(MIN_PX, Math.round(px)));
}

function applySidebarWidthPx(px) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--editor-sidebar-width", `${px}px`);
}

function clearCustomSidebarWidth() {
  if (typeof document === "undefined") return;
  document.documentElement.style.removeProperty("--editor-sidebar-width");
}

/**
 * Persists user sidebar width on desktop; clears on narrow viewports so CSS breakpoints apply.
 * @returns {{ onResizeHandleMouseDown: (e: React.MouseEvent) => void }}
 */
export function useEditorSidebarResize() {
  const dragRef = useRef(null);
  const moveRafRef = useRef(0);

  const endDrag = useCallback(() => {
    const st = dragRef.current;
    if (!st) return;
    dragRef.current = null;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    window.removeEventListener("mousemove", st.onMove);
    window.removeEventListener("mouseup", st.onUp);
    if (moveRafRef.current) {
      window.cancelAnimationFrame(moveRafRef.current);
      moveRafRef.current = 0;
    }
    const w = clampWidth(st.lastWidth);
    applySidebarWidthPx(w);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(w));
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event("resize"));
  }, []);

  const onMove = useCallback((clientX, startX, startWidth) => {
    const delta = startX - clientX;
    return clampWidth(startWidth + delta);
  }, []);

  const onResizeHandleMouseDown = useCallback(
    (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      if (!isDesktopSidebar()) return;
      const startX = e.clientX;
      const root = typeof document !== "undefined" ? document.documentElement : null;
      const computed = root
        ? parseFloat(getComputedStyle(root).getPropertyValue("--editor-sidebar-width")) || 390
        : 390;
      const startWidth = clampWidth(computed);

      const moveHandler = (ev) => {
        const next = onMove(ev.clientX, startX, startWidth);
        if (!dragRef.current) return;
        dragRef.current.lastWidth = next;
        if (moveRafRef.current) return;
        moveRafRef.current = window.requestAnimationFrame(() => {
          moveRafRef.current = 0;
          if (!dragRef.current) return;
          applySidebarWidthPx(dragRef.current.lastWidth);
        });
      };
      const upHandler = () => endDrag();

      dragRef.current = { onMove: moveHandler, onUp: upHandler, lastWidth: startWidth };
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";
      window.addEventListener("mousemove", moveHandler);
      window.addEventListener("mouseup", upHandler);
    },
    [endDrag, onMove],
  );

  useEffect(() => {
    const applyFromStorageOrClear = () => {
      if (!isDesktopSidebar()) {
        clearCustomSidebarWidth();
        return;
      }
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const w = raw ? parseInt(raw, 10) : NaN;
        if (!Number.isFinite(w)) return;
        applySidebarWidthPx(clampWidth(w));
      } catch {
        /* ignore */
      }
    };

    applyFromStorageOrClear();
    const mq = window.matchMedia("(min-width: 769px)");
    const onChange = () => applyFromStorageOrClear();
    mq.addEventListener?.("change", onChange);
    window.addEventListener("resize", onChange);
    return () => {
      mq.removeEventListener?.("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

  return { onResizeHandleMouseDown };
}

import { useCallback, useLayoutEffect, useRef } from "react";

/**
 * Syncs textarea height to its content. For controlled inputs, pass `value`
 * so height updates when the value changes from state; for uncontrolled,
 * `onInput` handles typing after mount.
 */
export function useAutoResizeTextarea(value) {
  const ref = useRef(null);

  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useLayoutEffect(() => {
    resize();
  }, [value, resize]);

  return { ref, onInput: resize };
}

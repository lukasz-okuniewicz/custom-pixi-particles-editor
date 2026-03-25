"use client";

import { useEffect, useState } from "react";
import InputNumberBase from "@components/html/InputNumber";
import CheckboxBase from "@components/html/Checkbox";
import ColorPickerBase from "@components/html/ColorPicker";
import InputStringBase from "@components/html/InputString";
import SelectBase from "@components/html/Select";
import { propertyHint } from "./behaviourPropertyHints";

export function BfInputNumber({ id, tooltipText, ...props }) {
  return (
    <InputNumberBase
      id={id}
      tooltipText={tooltipText ?? propertyHint(id)}
      {...props}
    />
  );
}

export function BfCheckbox({ id, tooltipText, ...props }) {
  return (
    <CheckboxBase
      id={id}
      tooltipText={tooltipText ?? propertyHint(id)}
      {...props}
    />
  );
}

export function BfInputString({ id, tooltipText, ...props }) {
  return (
    <InputStringBase
      id={id}
      tooltipText={tooltipText ?? propertyHint(id)}
      {...props}
    />
  );
}

export function BfColorPicker({ id, tooltipText, ...props }) {
  const hint =
    tooltipText != null && tooltipText !== ""
      ? tooltipText
      : propertyHint(id);
  return (
    <ColorPickerBase {...props} id={id} tooltipText={hint} />
  );
}

/** Shared Select; hints keyed as `select:${label}` in behaviourPropertyHints. */
export function BfSelect({ label, tooltipText, ...props }) {
  const key = `select:${label}`;
  const t =
    tooltipText != null && tooltipText !== ""
      ? tooltipText
      : propertyHint(key);
  return (
    <SelectBase
      label={label}
      id={props.id || `select-field-${String(label).replace(/\s+/g, "-").toLowerCase()}`}
      tooltipText={t || undefined}
      {...props}
    />
  );
}

/**
 * Hover hint for native controls (select, textarea) that share an id with the hint map.
 * Use `hintKey` when the control id is dynamic but the copy should be shared (e.g. custom behaviour JSON).
 */
export function BfFieldHint({ id, hintKey }) {
  const t = propertyHint(hintKey ?? id);
  if (!t) return null;
  const hintSpanId = id != null ? `${id}-hint` : `${hintKey}-hint`;
  return (
    <span className="tooltiptext" id={hintSpanId}>
      {t}
    </span>
  );
}

export const BfSelectHint = BfFieldHint;

export function BfJsonTextarea({
  id,
  label,
  value,
  onValidJson,
  className = "form-control",
}) {
  const [raw, setRaw] = useState(
    typeof value === "string" ? value : JSON.stringify(value ?? [], null, 2),
  );
  const [error, setError] = useState("");

  useEffect(() => {
    setRaw(typeof value === "string" ? value : JSON.stringify(value ?? [], null, 2));
  }, [value]);

  return (
    <>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className={className}
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
        value={raw}
        onChange={(e) => {
          setRaw(e.target.value);
          if (error) setError("");
        }}
        onBlur={(e) => {
          try {
            const parsed = JSON.parse(e.target.value || "[]");
            setError("");
            onValidJson(parsed);
          } catch (jsonError) {
            setError(
              `Invalid JSON: ${jsonError instanceof Error ? jsonError.message : "Malformed JSON"}`,
            );
          }
        }}
        spellCheck={false}
      />
      <BfFieldHint id={id} />
      {error ? <p className="alert p-2 text-xs rounded mt-2">{error}</p> : null}
    </>
  );
}

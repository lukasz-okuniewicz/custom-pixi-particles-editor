"use client";

const defaultOptions = [
  {
    key: "palette",
    label: "Palette",
    title: "Lock palette-related fields when applying presets.",
  },
  {
    key: "recursion",
    label: "Recursion",
    title: "Lock recursion/branching fields when applying presets.",
  },
  {
    key: "reactive",
    label: "Reactive",
    title: "Lock reactive routing and thresholds when applying presets.",
  },
  {
    key: "performance",
    label: "Performance",
    title: "Lock performance/safety caps when applying presets.",
  },
];

export default function PresetLockControls({
  idPrefix = "preset-lock",
  value = {},
  onChange,
  options = defaultOptions,
}) {
  return (
    <div className="col-xs-8">
      {options.map((option) => {
        const inputId = `${idPrefix}-${option.key}`;
        return (
          <label
            key={option.key}
            htmlFor={inputId}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, marginRight: 10 }}
          >
            <input
              id={inputId}
              type="checkbox"
              title={option.title}
              checked={Boolean(value[option.key])}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, [option.key]: e.target.checked }))
              }
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import pixiRefs from "@pixi/pixiRefs";

function clamp01(x) {
  const v = Number.isFinite(x) ? x : 0;
  return Math.max(0, Math.min(1, v));
}

function Bar({ label, value }) {
  const v = clamp01(value);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "90px 1fr 42px",
        gap: 8,
        alignItems: "center",
        marginBottom: 6,
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.85 }}>{label}</div>
      <div
        style={{
          height: 8,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.round(v * 100)}%`,
            background: "rgba(80, 210, 255, 0.85)",
          }}
        />
      </div>
      <div
        style={{
          fontVariantNumeric: "tabular-nums",
          fontSize: 12,
          opacity: 0.75,
          textAlign: "right",
        }}
      >
        {v.toFixed(2)}
      </div>
    </div>
  );
}

export default function ReactiveInspector({ behaviour, onCalibrate }) {
  const [signals, setSignals] = useState(null);

  useEffect(() => {
    const update = () => {
      try {
        // Best-effort: library may expose Model on emitter.
        const model =
          pixiRefs?.particles?.emitter?.model || pixiRefs?.particles?.model || null;
        setSignals(model?.reactiveSignals || null);
      } catch {
        setSignals(null);
      }
    };
    update();
    const interval = window.setInterval(update, 100);
    return () => window.clearInterval(interval);
  }, []);

  const rows = useMemo(() => {
    if (!signals) return [];
    return [
      ["energy", signals.energy],
      ["loudness", signals.loudness],
      ["onset", signals.onset],
      ["flux", signals.flux],
      ["low", signals.lowBand],
      ["mid", signals.midBand],
      ["high", signals.highBand],
      ["beat", signals.beat],
      ["phase1x", signals.phase1x],
      ["phase2x", signals.phase2x],
      ["phase4x", signals.phase4x],
    ];
  }, [signals]);

  const v2 = signals?.debug?.v2 || null;

  return (
    <details style={{ marginTop: 10 }}>
      <summary style={{ cursor: "pointer", fontWeight: 600, marginBottom: 8 }}>
        Reactive Inspector
      </summary>
      <div className="explanation" style={{ marginBottom: 8 }}>
        Live signals appear when the runtime exposes the Model. Enable{" "}
        <code style={{ padding: "0 4px" }}>reactiveV2.debug</code> to view mapped
        outputs.
      </div>
      {!signals ? (
        <div className="explanation">
          Inspector unavailable (runtime model not exposed).
        </div>
      ) : (
        <>
          {rows.map(([label, value]) => (
            <Bar key={`rf-rs-${label}`} label={label} value={value} />
          ))}
          {v2 ? (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>
                ReactiveV2 mapped
              </div>
              <Bar label="spawnMult" value={(v2.spawnAmountMult - 1) / 2} />
              <Bar label="childMult" value={(v2.childChanceMult - 1) / 2} />
              <Bar label="spreadMult" value={(v2.spreadMult - 1) / 2} />
            </div>
          ) : null}
          {typeof onCalibrate === "function" ? (
            <button
              type="button"
              className="btn btn-default btn-xs"
              style={{ marginTop: 10 }}
              onClick={() => onCalibrate(signals, behaviour)}
            >
              Auto-calibrate thresholds
            </button>
          ) : null}
        </>
      )}
    </details>
  );
}


import { useRef } from "react";

const FlickerDescription = () => {
  const contentRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleContent = () => {
    const isShowing = contentRef.current.classList.toggle("show");
    buttonRef.current.innerText = isShowing
      ? "Hide Description"
      : "Show Description";
  };

  return (
    <>
      <div className="showContent" onClick={toggleContent} ref={buttonRef}>
        Show Description
      </div>
      <div className="explanation" ref={contentRef}>
        <p>
          <b>Flicker Behaviour</b> adds random or noise-based flicker to
          particle alpha and/or scale. Use &quot;noise&quot; for smooth
          variation (e.g. fire, neon) or &quot;random&quot; for sharp, glitchy
          flicker.
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behaviour on or off.
          </li>
          <li>
            <b>Priority</b>: Execution order (higher runs first).
          </li>
          <li>
            <b>Intensity</b>: How much alpha/size varies (e.g. 0.3 = ±30%).
          </li>
          <li>
            <b>Speed</b>: How fast the flicker changes over time.
          </li>
          <li>
            <b>Flicker Alpha</b>: When on, modulates particle alpha.
          </li>
          <li>
            <b>Flicker Size</b>: When on, modulates particle scale.
          </li>
          <li>
            <b>Mode</b>: <code>noise</code> = smooth simplex noise,{" "}
            <code>random</code> = per-frame random.
          </li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>intensity</b> — How much alpha/size varies (e.g. 0.3 = ±30%).</li>
          <li><b>speed</b> — How fast the flicker changes over time.</li>
          <li><b>flickerAlpha</b> — When on, modulate particle alpha.</li>
          <li><b>flickerSize</b> — When on, modulate particle scale.</li>
          <li><b>mode</b> — &quot;noise&quot; (smooth) or &quot;random&quot; (sharp).</li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>Fire, candles, neon signs, static.</li>
          <li>Glitch or unstable effects.</li>
        </ul>
      </div>
    </>
  );
};

export default FlickerDescription;

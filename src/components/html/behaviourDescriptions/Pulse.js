import { useRef } from "react";

const PulseDescription = () => {
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
          <b>Pulse Behaviour</b> modulates particle size and/or alpha (and
          optionally color) with a sine wave over their life or over global
          time. Use it for breathing, energy orbs, or &quot;alive&quot;
          highlights.
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
            <b>Frequency</b>: How many pulse cycles per life (or per time unit).
          </li>
          <li>
            <b>Amplitude</b>: Strength of the pulse (e.g. 0.3 = ±30% around
            base).
          </li>
          <li>
            <b>Pulse Size</b>: When on, scales particle size by the pulse
            factor.
          </li>
          <li>
            <b>Pulse Alpha</b>: When on, scales particle alpha by the pulse
            factor.
          </li>
          <li>
            <b>Pulse Color</b>: When on, blends particle color toward
            Color Blend with the pulse.
          </li>
          <li>
            <b>Color Blend</b>: Target color used when Pulse Color is enabled.
          </li>
          <li>
            <b>Mode</b>: <code>life</code> = pulse over particle life progress,{" "}
            <code>time</code> = pulse over global time.
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>frequency</b> — Pulse cycles per life (or per time unit).</li>
          <li><b>amplitude</b> — Strength of pulse (e.g. 0.3 = ±30%).</li>
          <li><b>pulseSize</b> — When on, scale particle size by pulse.</li>
          <li><b>pulseAlpha</b> — When on, scale particle alpha by pulse.</li>
          <li><b>pulseColor</b> — When on, blend color toward colorBlend.</li>
          <li><b>colorBlend</b> — Target color when pulseColor is on (r, g, b, alpha).</li>
          <li><b>mode</b> — &quot;life&quot; (over particle life) or &quot;time&quot; (global time).</li>
          <li><b>phaseOffset</b> — Shifts the sine wave in radians for desynchronized pulses.</li>
        </ul>

        <h4>Use Cases:</h4>
        <ul>
          <li>Energy orbs, breathing blobs, UI highlights.</li>
          <li>Giving particles a subtle &quot;alive&quot; feel.</li>
        </ul>
      </div>
    </>
  );
};

export default PulseDescription;

import { useRef } from "react";

const PhaseCoherenceDescription = () => {
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
          <b>Phase Coherence Behaviour</b> uses Kuramoto-style phase coupling:
          each particle has an internal phase and tries to align with nearby
          particles. Many particles together produce synchronized waves, flashing
          bands, or gradual lock-in.
        </p>
        <h4>Visual outputs</h4>
        <ul>
          <li><code>particle.phaseCoherencePhase</code> [0-1] — phase on the cycle (e.g. hue).</li>
          <li><code>particle.phaseCoherenceOrder</code> [0-1] — order parameter (in-sync = bright).</li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>naturalFrequency</b> — Phase evolution (rad/s).</li>
          <li><b>couplingStrength</b> — Kuramoto coupling (higher = faster sync).</li>
          <li><b>radius</b> — Neighbor radius for phase coupling.</li>
          <li><b>driftStrength</b> — Optional velocity in phase direction.</li>
          <li><b>writePhaseForColor</b> — Write <code>particle.phaseCoherencePhase</code> [0-1].</li>
          <li><b>writeOrderForVisual</b> — Write <code>particle.phaseCoherenceOrder</code> [0-1].</li>
          <li><b>scaleByOrder</b> — Scale particle size by order (sync = larger).</li>
          <li><b>orderScaleMin</b>, <b>orderScaleMax</b> — Scale range when scaleByOrder is on.</li>
        </ul>
      </div>
    </>
  );
};

export default PhaseCoherenceDescription;

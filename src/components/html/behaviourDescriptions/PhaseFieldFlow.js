import { useRef } from "react";

const PhaseFieldFlowDescription = () => {
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
          <b>Phase Field Flow Behaviour</b> advects particles with a
          time-varying 2D phase field. Velocity is the curl of the phase
          (vx = ∂φ/∂y, vy = −∂φ/∂x), giving smooth, deterministic flow cells
          that evolve over time.
        </p>
        <h4>Visual outputs</h4>
        <ul>
          <li><code>particle.phaseFlowSpeed</code> [0-1] — velocity magnitude for color.</li>
          <li><code>particle.phaseFlowPhase</code> [0-1] — local phase for pulsing.</li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>strength</b> — First wave amplitude.</li>
          <li><b>scaleX</b>, <b>scaleY</b> — First wave spatial scale.</li>
          <li><b>timeScale</b> — First wave time scale.</li>
          <li><b>strength2</b> — Second wave amplitude (0 to disable).</li>
          <li><b>scaleX2</b>, <b>scaleY2</b> — Second wave spatial scale.</li>
          <li><b>timeScale2</b> — Second wave time scale.</li>
          <li><b>writeSpeedForColor</b> — Write <code>particle.phaseFlowSpeed</code> [0-1].</li>
          <li><b>writePhaseForVisual</b> — Write <code>particle.phaseFlowPhase</code> [0-1].</li>
        </ul>
      </div>
    </>
  );
};

export default PhaseFieldFlowDescription;

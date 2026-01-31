import { useRef } from "react";

const LimitCycleDescription = () => {
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
          <b>Limit Cycle Behaviour</b> gives each particle an internal Hopf-type
          oscillator (θ, r). Velocity gets a tangential component (r·cos θ,
          r·sin θ), producing stable circular motion per particle. Many
          particles together create swirling, breathing patterns without a
          single vortex center.
        </p>
        <h4>Visual outputs</h4>
        <ul>
          <li><code>particle.limitCyclePhase</code> [0-1] — phase on the cycle (e.g. hue).</li>
          <li><code>particle.limitCycleRadius</code> [0-1] — r/R0 (breathing).</li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>angularFrequency</b> — Angular speed (rad/s).</li>
          <li><b>targetRadius</b> — Target radius of the limit cycle.</li>
          <li><b>relaxationRate</b> — Rate at which r tends to targetRadius.</li>
          <li><b>strength</b> — Magnitude of tangential velocity added.</li>
          <li><b>phaseSpread</b> — Spread initial phase by particle uid.</li>
          <li><b>initialRadiusFraction</b> — Initial r as fraction of targetRadius (0-1).</li>
          <li><b>writePhaseForColor</b> — Write <code>particle.limitCyclePhase</code> [0-1].</li>
          <li><b>writeRadiusForVisual</b> — Write <code>particle.limitCycleRadius</code> [0-1].</li>
          <li><b>scaleByRadius</b> — Scale particle size by oscillator radius (breathing).</li>
          <li><b>radiusScaleMin</b>, <b>radiusScaleMax</b> — Scale range when scaleByRadius is on.</li>
        </ul>
      </div>
    </>
  );
};

export default LimitCycleDescription;

import { useRef } from "react";

const AizawaAttractorDescription = () => {
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
          <b>Aizawa Strange Attractor</b> — Deterministic chaos: particles
          follow a 3D ODE that traces a bounded &quot;pulsing sphere&quot; with
          hollow core. Small differences in initial conditions fill the volume.
        </p>
        <h4>Visual outputs</h4>
        <ul>
          <li>
            <b>Color by distance</b>: <code>particle.aizawaDistance</code> [0-1]
            — core = furnace, shell = cooling embers.
          </li>
          <li>
            <b>Scale by velocity</b>: <code>particle.aizawaSpeed</code> [0-1] —
            high energy = larger.
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>speed</b> — Time scale for the ODE integration.</li>
          <li><b>scaleXY</b> — Scale 3D position to 2D display (multiply x, y).</li>
          <li><b>a, b, c, d, e, f</b> — Aizawa ODE constants (standard: a=0.95, b=0.7, c=0.6, d=3.5, e=0.25, f=0.1).</li>
          <li><b>writeDistanceForColor</b> — Write <code>particle.aizawaDistance</code> [0-1] for color.</li>
          <li><b>writeSpeedForScale</b> — Write <code>particle.aizawaSpeed</code> [0-1] for scale.</li>
          <li><b>distanceNormalize</b> — Divide distance by this to get [0-1] (typical attractor radius).</li>
          <li><b>speedNormalize</b> — Divide velocity magnitude by this to get [0-1].</li>
        </ul>
      </div>
    </>
  );
};

export default AizawaAttractorDescription;

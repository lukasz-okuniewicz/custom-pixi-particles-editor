import { useRef } from "react";

const BoidsFlockingDescription = () => {
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
          <b>Boids Flocking Behaviour</b> creates emergent flocking using
          separation, alignment, and cohesion from neighboring particles. Many
          particles together form flocks, streams, and avoidance patterns
          without a single attractor.
        </p>
        <h4>Visual outputs</h4>
        <ul>
          <li><code>particle.flockSpeed</code> [0-1] — speed for color (e.g. fast = brighter).</li>
        </ul>
        <p>
          <b>Note:</b> Neighbor lookups use <code>particleListGetter</code> (wired to emitter list by parser).
        </p>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>separationRadius</b> — Radius within which to steer away from neighbors.</li>
          <li><b>separationStrength</b> — Strength of separation force.</li>
          <li><b>alignmentRadius</b> — Radius for averaging neighbor velocity.</li>
          <li><b>alignmentStrength</b> — Strength of alignment steering.</li>
          <li><b>cohesionRadius</b> — Radius for steering toward average position.</li>
          <li><b>cohesionStrength</b> — Strength of cohesion steering.</li>
          <li><b>maxSpeed</b> — Clamp particle speed.</li>
          <li><b>maxSteerForce</b> — Clamp steering force magnitude.</li>
          <li><b>scaleByDensity</b> — Scale particle size by local neighbor count.</li>
          <li><b>densityScaleMin</b>, <b>densityScaleMax</b> — Scale range when scaleByDensity is on.</li>
          <li><b>densityRadius</b> — Radius for density count.</li>
          <li><b>writeSpeedForColor</b> — Write <code>particle.flockSpeed</code> [0-1].</li>
        </ul>
      </div>
    </>
  );
};

export default BoidsFlockingDescription;

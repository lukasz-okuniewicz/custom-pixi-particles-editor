import { useRef } from "react";

const ToroidalFlowDescription = () => {
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
          <b>Toroidal Magnetic Flow</b> — Particles spiral on the surface of
          an invisible torus (doughnut): major rotation around the center, minor
          around the tube. Like a &quot;magnetic bottle.&quot;
        </p>
        <h4>Visual outputs</h4>
        <ul>
          <li>
            <b>Opacity by surface distance</b>:{" "}
            <code>particle.toroidalSurfaceDist</code> [0-1] — particles flicker
            out when they drift from the surface (0 = on surface).
          </li>
          <li>
            <b>Velocity for stretch</b>: <code>particle.toroidalVelX/Y</code> —
            tangent for stretch/flow effects.
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>center</b> — Torus center (x, y). Use &quot;Select Position&quot; to set by clicking on the canvas.</li>
          <li><b>majorRadius</b> — Distance from center to tube center.</li>
          <li><b>minorRadius</b> — Tube radius.</li>
          <li><b>majorSpeed</b> — Angular speed around the center (major rotation).</li>
          <li><b>minorSpeed</b> — Angular speed around the tube (minor rotation).</li>
          <li><b>strength</b> — Scale of tangent velocity (for <code>toroidalVelX/Y</code>).</li>
          <li><b>writeSurfaceDistForVisual</b> — Write <code>particle.toroidalSurfaceDist</code> [0-1].</li>
          <li><b>surfaceDistFalloff</b> — Distance beyond surface for smoothstep (opacity falloff).</li>
        </ul>
      </div>
    </>
  );
};

export default ToroidalFlowDescription;

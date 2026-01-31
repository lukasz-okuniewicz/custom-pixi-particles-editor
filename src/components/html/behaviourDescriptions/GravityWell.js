import { useRef } from "react";

const GravityWellDescription = () => {
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
          <b>Gravity Well Behaviour</b> pulls particles toward a center point
          with a configurable falloff (e.g. inverse square). It only adds to
          velocity; position is updated by your normal position/velocity
          integration. Optional kill radius can remove particles that get too
          close.
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
            <b>Well center</b>: (x, y) position of the well. Use &quot;Select Position&quot; to set by clicking on the canvas.
          </li>
          <li>
            <b>Strength</b>: Magnitude of the pull.
          </li>
          <li>
            <b>Falloff Exponent</b>: 2 = inverse square, 1 = linear, etc.
          </li>
          <li>
            <b>Max Speed</b>: Cap on particle speed (0 = no cap).
          </li>
          <li>
            <b>Kill Radius</b>: If &gt; 0 and Kill On Enter is on, particles
            inside this radius are killed.
          </li>
          <li>
            <b>Kill On Enter</b>: When on, particles that enter Kill Radius are
            removed.
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>center</b> — (x, y) position of the well. Use &quot;Select Position&quot; to set on canvas.</li>
          <li><b>strength</b> — Magnitude of the pull.</li>
          <li><b>falloffExponent</b> — 2 = inverse square, 1 = linear.</li>
          <li><b>maxSpeed</b> — Cap on particle speed (0 = no cap).</li>
          <li><b>killRadius</b> — If &gt; 0 and killOnEnter on, particles inside are killed.</li>
          <li><b>killOnEnter</b> — When on, remove particles that enter killRadius.</li>
          <li>
            <b>Min Distance</b>: Minimum distance in math to avoid huge forces
            at the center.
          </li>
        </ul>

        <h4>Use Cases:</h4>
        <ul>
          <li>Black holes, magnets, vortex sinks.</li>
          <li>Strong attractors distinct from simple linear attraction.</li>
        </ul>
      </div>
    </>
  );
};

export default GravityWellDescription;

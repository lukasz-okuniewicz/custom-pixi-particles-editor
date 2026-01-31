import { useRef } from "react";

const VortexDescription = () => {
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
          <b>Vortex Behaviour</b> applies spiral motion around a center point.
          Particles are pulled tangentially (orbit) and optionally radially
          inward or outward, creating drain, whirlpool, or galaxy-style effects.
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behaviour on or off.
          </li>
          <li>
            <b>Priority</b>: Execution order relative to other behaviours
            (higher runs first).
          </li>
          <li>
            <b>Vortex center</b>: (x, y) position of the vortex center. Use &quot;Select Position&quot; to set by clicking on the canvas.
          </li>
          <li>
            <b>Strength</b>: How strong the tangential (orbital) force is.
            Higher values spin particles faster.
          </li>
          <li>
            <b>Spiral Direction</b>: <code>in</code> pulls particles toward the
            center, <code>out</code> pushes them away, <code>none</code> keeps
            pure orbit.
          </li>
          <li>
            <b>Spiral Strength</b>: Magnitude of the radial (in/out) component.
          </li>
          <li>
            <b>Falloff Power</b>: How quickly the effect weakens with distance
            (e.g. 1 = linear, 2 = inverse square).
          </li>
          <li>
            <b>Min Distance</b>: Minimum distance used in calculations to avoid
            division by zero near the center.
          </li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>center</b> — (x, y) vortex center. Use &quot;Select Position&quot; to set on canvas.</li>
          <li><b>strength</b> — Tangential (orbital) force magnitude.</li>
          <li><b>spiralDirection</b> — &quot;in&quot;, &quot;out&quot;, or &quot;none&quot;.</li>
          <li><b>spiralStrength</b> — Radial (in/out) force magnitude.</li>
          <li><b>falloffPower</b> — Distance falloff (e.g. 1 = linear).</li>
          <li><b>minDistance</b> — Minimum distance (avoid division by zero).</li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>Drains, black holes, whirlpools, water spirals.</li>
          <li>Portals, galaxy or orbit-style motion.</li>
          <li>Combining with emission for spiral trails.</li>
        </ul>
      </div>
    </>
  );
};

export default VortexDescription;

import { useRef } from "react";

const OrbitDescription = () => {
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
          <b>Orbit Behaviour</b> makes particles orbit around a center point
          with a configurable radius and angular speed. Optional spiral (radius
          change over time) can create inward or outward spirals.
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
            <b>Orbit center</b>: (x, y) center of the orbit. Use &quot;Select Position&quot; to set by clicking on the canvas.
          </li>
          <li>
            <b>Base Radius</b>: Default orbit radius.
          </li>
          <li>
            <b>Radius Variance</b>: Random spread of radius per particle (e.g.
            ring thickness).
          </li>
          <li>
            <b>Angular Speed</b>: Radians per second; sign controls direction.
          </li>
          <li>
            <b>Spiral Rate</b>: Change of radius per second (positive =
            outward, negative = inward).
          </li>
          <li>
            <b>Angle Variance</b>: Random spread of starting angle (radians).
          </li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>center</b> — (x, y) center of the orbit. Use &quot;Select Position&quot; to set on canvas.</li>
          <li><b>baseRadius</b> — Default orbit radius.</li>
          <li><b>radiusVariance</b> — Random spread of radius per particle.</li>
          <li><b>angularSpeed</b> — Radians per second (sign = direction).</li>
          <li><b>spiralRate</b> — Change of radius per second (positive = outward).</li>
          <li><b>angleVariance</b> — Random spread of starting angle (radians).</li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>Planetary rings, galaxies, decorative orbits.</li>
          <li>Spiral-in or spiral-out effects.</li>
        </ul>
      </div>
    </>
  );
};

export default OrbitDescription;

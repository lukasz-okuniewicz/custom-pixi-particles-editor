import { useRef } from "react";

const ProximityStateDescription = () => {
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
          <b>Proximity State Behaviour</b> switches particle behaviour by
          distance to a target. Far from target: smooth wander (curl motion).
          Near target: seek toward it with optional arrival slowdown.
        </p>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Target</b>: (x, y) position that defines near vs far. Use &quot;Select Position&quot; to set by clicking on the canvas.
          </li>
          <li>
            <b>Near Radius</b>: Distance threshold; inside = seek, outside =
            wander.
          </li>
          <li>
            <b>Wander Strength / Phase Speed</b>: Strength and phase speed of
            the curl when far.
          </li>
          <li>
            <b>Seek Strength / Max Speed / Arrival Radius</b>: How strongly
            particles seek and slow down near the target.
          </li>
          <li>
            <b>Write State For Color / Write Distance For Visual</b>: Writes{" "}
            <code>particle.proximityState</code> (0 = far, 1 = near) and{" "}
            <code>particle.proximityDistNorm</code> [0-1] for tint/scale.
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>target</b> — (x, y) position; inside nearRadius = seek, outside = wander. Use &quot;Select Position&quot; to set on canvas.</li>
          <li><b>nearRadius</b> — Distance threshold for near vs far.</li>
          <li><b>wanderStrength</b>, <b>wanderPhaseSpeed</b> — Curl motion when far.</li>
          <li><b>seekStrength</b>, <b>seekMaxSpeed</b>, <b>arrivalRadius</b> — Seek and slowdown near target.</li>
          <li><b>writeStateForColor</b> — Write <code>particle.proximityState</code> (0 or 1).</li>
          <li><b>writeDistanceForVisual</b> — Write <code>particle.proximityDistNorm</code> [0-1].</li>
        </ul>
      </div>
    </>
  );
};

export default ProximityStateDescription;

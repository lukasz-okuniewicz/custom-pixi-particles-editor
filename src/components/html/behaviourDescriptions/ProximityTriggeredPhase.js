import { useRef } from "react";

const ProximityTriggeredPhaseDescription = () => {
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
          <b>Proximity-Triggered State Phase</b> — Bistable swarming: Dormant
          (gentle orbit) until a trigger (e.g. player) enters radius, then
          Kinetic (escape + jitter). State weight = 1 − smoothstep(0,
          triggerRadius, dist).
        </p>
        <h4>Visual outputs</h4>
        <ul>
          <li>
            <b>Color by state</b>: <code>particle.proximityTriggeredState</code>{" "}
            [0-1] — lerp cool blue (0) to white/orange (1).
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>triggerPos</b> — Trigger position (e.g. player) — x, y. Use &quot;Select Position&quot; to set on canvas.</li>
          <li><b>triggerRadius</b> — Radius within which state goes to Kinetic.</li>
          <li><b>orbitStrength</b> — Dormant orbit velocity strength.</li>
          <li><b>orbitPhaseSpeed</b> — Phase speed for orbit.</li>
          <li><b>escapeStrength</b> — Kinetic escape/repulsion strength.</li>
          <li><b>jitterStrength</b> — Kinetic jitter amount.</li>
          <li><b>stateSmoothEdge</b> — Smoothstep edge (0-1, fraction of triggerRadius).</li>
          <li><b>writeStateForColor</b> — Write <code>particle.proximityTriggeredState</code> [0-1].</li>
        </ul>
      </div>
    </>
  );
};

export default ProximityTriggeredPhaseDescription;

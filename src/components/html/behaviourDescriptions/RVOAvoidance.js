import { useRef } from "react";

const RVOAvoidanceDescription = () => {
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
          <b>RVO Avoidance (lite)</b> is a lightweight reciprocal velocity
          obstacle–style step: particles look at neighbors within a radius and
          adjust acceleration to reduce future collisions. The emitter supplies
          the particle list automatically—no manual wiring. Use it for crowds,
          swarms, or debris that should not pass through itself.
        </p>
        <h4>Key properties:</h4>
        <ul>
          <li>
            <b>Enabled / Priority</b>: Toggle and behaviour ordering (this
            often runs late so it sees updated velocities).
          </li>
          <li>
            <b>Neighbor radius</b>: How far each particle searches for others
            when planning avoidance.
          </li>
          <li>
            <b>Time horizon</b>: How far ahead (seconds) the solver looks when
            predicting conflicts—longer horizons are more cautious.
          </li>
          <li>
            <b>Max accel</b>: Cap on corrective acceleration per frame.
          </li>
          <li>
            <b>Weight</b>: Blend factor for how strongly avoidance overrides
            other steering.
          </li>
          <li>
            <b>Min separation</b>: Desired minimum spacing between particles;
            larger values keep groups more spread out.
          </li>
        </ul>
      </div>
    </>
  );
};

export default RVOAvoidanceDescription;

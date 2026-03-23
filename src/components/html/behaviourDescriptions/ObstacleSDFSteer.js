import { useRef } from "react";

const ObstacleSDFSteerDescription = () => {
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
          <b>Obstacle SDF Steer</b> keeps particles outside (or sliding along)
          simple solid shapes by treating their union as a signed distance field
          (SDF). You describe obstacles as JSON primitives—typically circles and
          axis-aligned boxes. The behaviour pushes particles along the SDF
          gradient when they penetrate or approach the surface, with tunable
          slip for sliding motion along walls.
        </p>
        <h4>Key properties:</h4>
        <ul>
          <li>
            <b>Enabled / Priority</b>: Toggle and execution order.
          </li>
          <li>
            <b>Primitives JSON</b>: Array of shape objects (e.g. circles and
            axis-aligned boxes with fields like center, radius, or min/max)—see
            your engine or sample config for the exact schema. The union forms
            one composite obstacle.
          </li>
          <li>
            <b>Margin</b>: Extra clearance beyond the true surface so particles
            stop slightly before contact.
          </li>
          <li>
            <b>Push strength</b>: How hard particles are expelled from the
            interior or repelled near the boundary.
          </li>
          <li>
            <b>Slip factor</b>: How much tangential motion is preserved vs.
            normal rejection (0 = full bounce-off, 1 = more slide-along).
          </li>
          <li>
            <b>Max push / frame</b>: Limits corrective displacement per update
            for stability.
          </li>
        </ul>
      </div>
    </>
  );
};

export default ObstacleSDFSteerDescription;

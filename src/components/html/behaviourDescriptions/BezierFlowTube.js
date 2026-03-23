import { useRef } from "react";

const BezierFlowTubeDescription = () => {
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
          <b>Bezier Flow Tube</b> moves particles along a cubic Bézier curve
          defined by four control points (P0–P3). Each particle carries a
          parameter along the curve; motion follows the tangent with configurable
          speed and optional lateral noise—good for ribbons, streams, and guided
          flows. It typically runs after base position logic (check priority vs.
          Position).
        </p>
        <h4>Key properties:</h4>
        <ul>
          <li>
            <b>Enabled / Priority</b>: Toggle and ordering versus other
            behaviours.
          </li>
          <li>
            <b>P0–P3</b>: The four Bézier anchors in world space (start, two
            handles, end).
          </li>
          <li>
            <b>Speed</b>: How fast particles advance along the curve.
          </li>
          <li>
            <b>Noise amplitude</b>: Lateral jitter perpendicular to the path for
            organic variation.
          </li>
          <li>
            <b>Loop t</b>: When enabled, wraps the curve parameter so motion
            repeats seamlessly.
          </li>
          <li>
            <b>Align rotation to tangent</b>: Rotates each particle to face
            along the local direction of travel.
          </li>
        </ul>
      </div>
    </>
  );
};

export default BezierFlowTubeDescription;

import { useRef } from "react";

const ScreenSpaceFlowMapDescription = () => {
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
          <b>Screen Space Flow Map</b> applies a 2D velocity field sampled from a
          CPU grid. Each cell stores a horizontal and vertical flow component{" "}
          <code>[vx, vy]</code>, laid out row-major. Particles read the field at
          their world position (with optional bilinear filtering) and steer
          accordingly—ideal for wind maps, vector fields exported from tools, or
          scripted currents.
        </p>
        <h4>Key properties:</h4>
        <ul>
          <li>
            <b>Enabled / Priority</b>: Turn the behaviour on and set execution
            order relative to other behaviours.
          </li>
          <li>
            <b>Grid width / height</b>: Resolution of the flow grid (number of
            cells along X and Y).
          </li>
          <li>
            <b>World min / max</b>: Axis-aligned rectangle in world space that
            maps the grid corners. Positions outside this box still sample using
            the grid edges.
          </li>
          <li>
            <b>flowData (JSON)</b>: Flat array of numbers with length{" "}
            <code>width × height × 2</code>, alternating vx and vy per cell in
            row-major order. Populate from code or paste valid JSON.
          </li>
          <li>
            <b>Strength</b>: Scales how strongly the sampled velocity affects
            motion.
          </li>
          <li>
            <b>Bilinear</b>: When enabled, interpolates between the four nearest
            grid samples for smoother motion; when off, uses nearest-cell
            sampling.
          </li>
        </ul>
      </div>
    </>
  );
};

export default ScreenSpaceFlowMapDescription;

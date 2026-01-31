import { useRef } from "react";

const CurvatureFlowDescription = () => {
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
          <b>Curvature Flow Behaviour</b> advects particles along the gradient
          of local density. Particles flow toward higher density, producing
          surface-tension-like blobs and tendrils; many particles form smooth,
          coherent boundaries. Uses an internal spatial grid for performance.
        </p>
        <h4>Visual outputs</h4>
        <ul>
          <li><code>particle.curvatureFlowDensity</code> [0-1] — normalized density (dense = brighter).</li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>radius</b> — Influence radius for density kernel.</li>
          <li><b>strength</b> — Flow magnitude (positive = toward higher density).</li>
          <li><b>kernelType</b> — &quot;poly&quot; (smooth) or &quot;linear&quot; density kernel.</li>
          <li><b>maxSpeed</b> — Clamp particle speed.</li>
          <li><b>writeDensityForColor</b> — Write <code>particle.curvatureFlowDensity</code> [0-1].</li>
          <li><b>scaleByDensity</b> — Scale particle size by local density.</li>
          <li><b>densityScaleMin</b>, <b>densityScaleMax</b> — Scale range when scaleByDensity is on.</li>
          <li><b>densityNormalizeCount</b> — Expected max neighbors for [0-1] density output.</li>
        </ul>
      </div>
    </>
  );
};

export default CurvatureFlowDescription;

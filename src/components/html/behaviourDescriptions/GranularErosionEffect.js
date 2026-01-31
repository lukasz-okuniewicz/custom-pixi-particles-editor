import { useRef } from "react";

const GranularErosionEffectDescription = () => {
  const contentRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleContent = () => {
    const isShowing = contentRef.current.classList.toggle("show");
    buttonRef.current.innerText = isShowing ? "Hide Description" : "Show Description";
  };

  return (
    <>
      <div className="showContent" onClick={toggleContent} ref={buttonRef}>Show Description</div>
      <div className="explanation" ref={contentRef}>
        <p><b>Granular Erosion Effect</b> turns the sprite into grains that fall with simulated gravity and wind. A noise-based threshold decides which pixels &quot;break loose&quot;; those pixels are shifted downward and swept by a horizontal sine-wave wind.</p>
        <h4>Parameters:</h4>
        <ul>
          <li><b>erosionProgress</b> — 0–1, how much has broken loose (final amount over duration).</li>
          <li><b>gravityScale</b> — Vertical fall speed (pixels per second).</li>
          <li><b>windTurbulence</b> — Horizontal wind amplitude.</li>
          <li><b>grainSize</b> — Noise frequency; higher = finer grains.</li>
          <li><b>duration</b> — Effect length (seconds).</li>
        </ul>
      </div>
    </>
  );
};

export default GranularErosionEffectDescription;

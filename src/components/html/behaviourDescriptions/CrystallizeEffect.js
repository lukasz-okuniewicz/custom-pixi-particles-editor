import { useRef } from "react";

const CrystallizeEffectDescription = () => {
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
        <p><b>Crystallize Effect</b> turns the sprite into crystal-like facets using a Voronoi-style grid. Each cell gets the average color of its pixels, with optional facet highlight and tint variation for a gem look.</p>
        <h4>Parameters:</h4>
        <ul>
          <li><b>cellScale</b> — Approximate cell size (pixels).</li>
          <li><b>jitter</b> — Random offset of cell centers (0–1).</li>
          <li><b>highlightStrength</b> — Facet sheen (0–1).</li>
          <li><b>edgeSoftness</b> — Cell edge softness (0–1).</li>
          <li><b>tintByCell</b> — Slight tint variation per cell.</li>
          <li><b>duration</b> — Blend from original to crystallize.</li>
        </ul>
      </div>
    </>
  );
};

export default CrystallizeEffectDescription;

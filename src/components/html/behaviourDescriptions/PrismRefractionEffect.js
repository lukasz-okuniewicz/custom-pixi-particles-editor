import { useRef } from "react";

const PrismRefractionEffectDescription = () => {
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
        <p><b>Prism Refraction Effect</b> creates a holographic dispersion look by shifting the red and blue channels in opposite directions while keeping green centered. You get rainbow fringing and a “light through a prism” feel. Optional scan line and fresnel-style edge intensity.</p>
        <h4>Parameters:</h4>
        <ul>
          <li><b>dispersionStrength</b> — Pixel offset of R/B channels.</li>
          <li><b>dispersionAngle</b> — Direction of dispersion (radians).</li>
          <li><b>duration</b> — Effect length (seconds).</li>
          <li><b>scanSpeed</b> — Scan line speed (0 = off).</li>
          <li><b>fresnelPower</b> — Edge-only strength (0 = off).</li>
        </ul>
      </div>
    </>
  );
};

export default PrismRefractionEffectDescription;

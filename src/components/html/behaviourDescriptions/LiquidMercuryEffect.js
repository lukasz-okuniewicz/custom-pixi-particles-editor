import { useRef } from "react";

const LiquidMercuryEffectDescription = () => {
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
        <p><b>Liquid Mercury Effect</b> makes the sprite look like reflective, viscous liquid metal. The alpha channel is smoothed for rounded edges; a fake normal from the alpha gradient is used to sample a reflection (MatCap-style); scrolling noise adds ripples.</p>
        <h4>Parameters:</h4>
        <ul>
          <li><b>viscosity</b> — 0–1, blur/smooth for blobby look.</li>
          <li><b>reflectivity</b> — 0–1, strength of reflection.</li>
          <li><b>rippleSpeed</b> — Scroll speed of ripple noise.</li>
          <li><b>edgeRoundness</b> — Smooth-step power for rounded edges.</li>
          <li><b>duration</b> — Effect length (seconds).</li>
        </ul>
      </div>
    </>
  );
};

export default LiquidMercuryEffectDescription;

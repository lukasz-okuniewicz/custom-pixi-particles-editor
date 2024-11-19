import { useRef } from "react";

const TurbulenceDescription = () => {
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
      <span className="explanation" ref={contentRef}>
        <b>Turbulence</b> in a particle system introduces random or semi-random
        motion to particles, simulating chaotic, natural effects like swirling
        smoke, drifting leaves, or turbulent water flows. It makes particle
        motion less uniform, adding realism and complexity to the simulation.
        <span>
          <a
            href="https://okuniewicz.eu/?effect=fireWithTurbulence"
            target="_blank"
          >
            Example
          </a>
        </span>
      </span>
    </>
  );
};

export default TurbulenceDescription;

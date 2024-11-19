import { useRef } from "react";

const AttractionRepulsionDescription = () => {
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
        <span>
          <b>Attraction/Repulsion Behaviour</b>: This behavior dynamically
          influences particle motion by applying attraction or repulsion forces
          based on predefined points. Each influence point has adjustable
          strength (positive for attraction, negative for repulsion), range, and
          effect radius. Forces are applied additively, allowing seamless
          integration with other behaviors like position and velocity updates.
          Ideal for creating effects like gravitational pull, magnetic fields,
          or particle dispersion.
        </span>
        <span>
          <a
            href="https://okuniewicz.eu/?effect=attractionRepulsion"
            target="_blank"
          >
            Example
          </a>
        </span>
      </span>
    </>
  );
};

export default AttractionRepulsionDescription;

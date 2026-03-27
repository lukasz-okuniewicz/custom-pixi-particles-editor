import { useRef } from "react";

const PredatorPreyDescription = () => {
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const toggleContent = () => {
    const isShowing = contentRef.current.classList.toggle("show");
    buttonRef.current.innerText = isShowing ? "Hide Description" : "Show Description";
  };

  return (
    <>
      <div className="showContent" onClick={toggleContent} ref={buttonRef}>
        Show Description
      </div>
      <div className="explanation" ref={contentRef}>
        <p>
          <b>Predator/Prey</b> assigns particles into two species where predators
          chase and prey evade.
        </p>
        <ul>
          <li><b>Predator Ratio</b> sets species split at spawn.</li>
          <li><b>Reaction Radius</b> limits local interaction.</li>
          <li><b>Chase/Evade Strength</b> tune pursuit intensity.</li>
        </ul>
      </div>
    </>
  );
};

export default PredatorPreyDescription;

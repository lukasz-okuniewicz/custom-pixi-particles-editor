import { useRef } from "react";

const FlowFieldDriftDescription = () => {
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
          <b>Flow Field Drift</b> samples a procedural vector field so particles
          follow smoky, organic paths.
        </p>
        <ul>
          <li><b>Field Scale</b> changes swirl size.</li>
          <li><b>Strength</b> controls acceleration magnitude.</li>
          <li><b>Curl</b> adds rotational eddy motion.</li>
        </ul>
      </div>
    </>
  );
};

export default FlowFieldDriftDescription;

import { useRef } from "react";

const FlockingDescription = () => {
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
          <b>Flocking Behaviour</b> creates fish/bird-like motion via separation,
          alignment, and cohesion steering.
        </p>
        <ul>
          <li><b>Separation</b>: avoid neighbors that are too close.</li>
          <li><b>Alignment</b>: match heading with nearby particles.</li>
          <li><b>Cohesion</b>: move toward the local group center.</li>
        </ul>
      </div>
    </>
  );
};

export default FlockingDescription;

import { useRef } from "react";

const GlitchBehaviourDescription = () => {
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
          <b>Glitch Behaviour</b> injects occasional jitter and teleport jumps for
          cyber/noisy motion accents.
        </p>
        <ul>
          <li><b>Jitter</b> adds small chaotic offsets.</li>
          <li><b>Teleport</b> introduces rare large discontinuities.</li>
          <li><b>Chromatic Shift</b> boosts blue on glitch events.</li>
        </ul>
      </div>
    </>
  );
};

export default GlitchBehaviourDescription;

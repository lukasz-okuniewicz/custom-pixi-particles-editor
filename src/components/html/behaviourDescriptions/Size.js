import { useRef } from "react";

const SizeDescription = () => {
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
          <b>Rotation Behaviour</b> in a particle system control how the size of
          particles changes throughout their lifetime:
        </span>
        Key Properties:
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behavior on or off.
          </li>
          <li>
            <b>Priority</b>: Set execution order if multiple behaviors are
            applied.
          </li>
          <li>
            <b>Size Start and Variance</b>: Sets the initial size of particles
            and adds randomness for variation among particles.
          </li>
          <li>
            <b>Size End and Variance</b>: Defines the final size of particles as
            they reach the end of their life, with variance introducing
            additional randomness.
          </li>
        </ul>
        <span>
          These settings are used to create effects where particles grow,
          shrink, or vary dynamically over time, enhancing realism and visual
          appeal.
        </span>
      </span>
    </>
  );
};

export default SizeDescription;

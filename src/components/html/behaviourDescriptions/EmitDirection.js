import { useRef } from "react";

const EmitDirectionDescription = () => {
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
          <b>Emit Direction (Angle, Angle Variance)</b>: Controls the initial
          direction particles move when emitted.
        </span>
        <ul>
          <li>
            <b>Angle</b>: Sets the main direction of particle emission, defined
            in radians.
          </li>
          <li>
            <b>Angle Variance</b>: Adds randomness to the direction, allowing
            particles to spread within a range around the main angle.
          </li>
        </ul>
        <span>
          This behavior calculates the cosine and sine of the direction angle
          (adjusted with variance) to determine the particle&apos;s movement. It
          ensures that each particle&apos;s trajectory aligns with the specified
          angle, while variance introduces natural variation, creating effects
          like sprays or bursts.
        </span>
        <span>
          <a href="https://okuniewicz.eu/?effect=bubbles" target="_blank">
            Example
          </a>
        </span>
      </span>
    </>
  );
};

export default EmitDirectionDescription;

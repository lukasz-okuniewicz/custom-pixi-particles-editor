import { useRef } from "react";

const NoiseBasedMotionDescription = () => {
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
          <b>Noise-Based Motion Behaviour</b> introduces natural, flowing, and
          seemingly random movement patterns to particles by leveraging Perlin
          noise. This behavior creates smooth, non-repetitive motion that is
          ideal for simulating organic or dynamic effects in particle systems.
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
            <b>Noise Scale</b>: Defines the level of detail in the noise field.
          </li>
          <li>
            <b>Noise Intensity</b>: Scales the effect of the noise forces.
          </li>
          <li>
            <b>Noise Speed</b>: Controls how fast particles traverse the noise
            grid.
          </li>
          <li>
            <b>Noise Direction</b>: Determines the global direction of
            noise-based movement.
          </li>
        </ul>
        <span>
          The Noise-Based Motion Behaviour is perfect for users aiming to
          simulate smooth and natural motion patterns in particle systems,
          offering customizable parameters for complete creative control.
        </span>
        <span>
          <a href="/?effect=background" target="_blank">
            Example
          </a>
        </span>
      </span>
    </>
  );
};

export default NoiseBasedMotionDescription;

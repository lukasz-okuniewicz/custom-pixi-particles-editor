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
        <span>
          <b>Turbulence Behaviour</b> introduces dynamic and complex particle
          interactions by simulating turbulence and vortex effects. It allows
          particles to interact with vortex-like fields, producing swirling,
          chaotic, or directional motion for visually captivating animations.
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
            <b>Effect</b>: Define the type of turbulence effect (e.g., swirling,
            pulling, or repelling).
          </li>
          <li>
            <b>Position & Variance</b>: Configure vortex positions and add
            randomness for natural effects.
          </li>
          <li>
            <b>Velocity & Acceleration</b>: Set vortex movement and acceleration
            properties for dynamic interactions.
          </li>
          <li>
            <b>Size Start & End</b>: Adjust vortex size over time for evolving
            turbulence patterns.
          </li>
          <li>
            <b>Turbulence Pool:</b>: Manage and interact with a collection of
            vortices.
          </li>
        </ul>
        <span>
          The Turbulence Behaviour is ideal for users seeking to create visually
          rich and dynamic particle systems, offering extensive customization
          and interaction with vortex-like turbulence fields.
        </span>
        <span>
          <a href="/?effect=fireWithTurbulence" target="_blank">
            Example
          </a>
        </span>
      </span>
    </>
  );
};

export default TurbulenceDescription;

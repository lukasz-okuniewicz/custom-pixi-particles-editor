import { useRef } from "react";

const ForceFieldsDescription = () => {
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
          <b>Force Fields Behaviour</b>: This behavior introduces dynamic
          regions in particle system where particles are influenced by forces
          such as wind, gravity, or turbulence. Each force field has
          customizable properties like position, radius, and strength, allowing
          you to define areas of influence.
          <br />
          <br />
          Types of Force Fields:
          <ul>
            <li>
              <b>Wind</b>: Applies a directional force (e.g., simulate wind
              blowing particles in a specific direction).
            </li>
            <li>
              <b>Gravity</b>: Attracts particles toward a specific point (e.g.,
              a gravity well or black hole effect).
            </li>
            <li>
              <b>Turbulence</b>: Adds random directional forces to particles for
              chaotic motion.
            </li>
          </ul>
          <br />
          Customizable Parameters:
          <ul>
            <li>
              <b>Position</b>: Location of the field’s center.
            </li>
            <li>
              <b>Radius</b>: Determines the field&apos;s area of influence.
            </li>
            <li>
              <b>Strength</b>: Controls the intensity of the force.
            </li>
            <li>
              <b>Direction (for Wind)</b>: Specifies the direction of the force
              vector.
            </li>
          </ul>
          <br />
          Forces weaken as particles move away from the field&apos;s center,
          creating a realistic gradient effect.
        </span>
        <span>
          <a href="/?effect=forceFields" target="_blank">
            Example
          </a>
        </span>
      </span>
    </>
  );
};

export default ForceFieldsDescription;

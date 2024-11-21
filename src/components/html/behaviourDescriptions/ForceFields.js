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
          <b>Force Fields Behaviour</b> enables particles to respond to
          region-based forces like wind, gravity, and turbulence. These
          simulated environmental effects add depth, motion dynamics, and
          realism to particle systems, allowing for creative and complex
          animations.
        </span>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Activates or deactivates the force field behavior.
          </li>
          <li>
            <b>Priority</b>: Determines the order in which this behavior
            executes relative to others.
          </li>
          <li>
            <b>Fields</b>: Defines an array of force fields, each with specific
            attributes:
            <ul>
              <li>
                <b>Position</b>: Sets the central point of the force field.
              </li>
              <li>
                <b>Radius</b>: Defines the field&apos;s area of influence.
                Particles outside this radius are unaffected.
              </li>
              <li>
                <b>Strength</b>: Determines how strongly the force affects
                nearby particles.
              </li>
              <li>
                <b>Type</b>: Specifies the type of force:
                <ul>
                  <li>
                    <b>Wind</b>: Applies a directional force to particles.
                  </li>
                  <li>
                    <b>Gravity</b>: Pulls particles toward the field&apos;s
                    center.
                  </li>
                  <li>
                    <b>Turbulence</b>: Adds random motion for chaotic effects.
                  </li>
                </ul>
              </li>
              <li>
                <b>Direction</b>: (For wind fields) Sets the direction of the
                wind force using x and y vectors.
              </li>
            </ul>
          </li>
        </ul>
        <h4>Practical Applications:</h4>
        <ul>
          <li>
            <b>Wind Simulation</b>: Use directional wind fields to push
            particles along a specified path, simulating breezy or stormy
            environments.
          </li>
          <li>
            <b>Gravity Wells</b>: Create fields that attract particles to a
            central point, mimicking black holes or magnetic forces.
          </li>
          <li>
            <b>Dynamic Turbulence</b>: Add random chaotic motion to particles
            for effects like smoke, fire, or swirling debris.
          </li>
        </ul>
        <h4>Advanced Features:</h4>
        <ul>
          <li>
            <b>Combining Forces</b>: Overlay multiple fields for complex
            interactions, such as wind pushing particles into a gravity well.
          </li>
          <li>
            <b>Distance-Based Influence</b>: Particles closer to the
            field&apos;s center experience stronger effects, providing smooth
            transitions.
          </li>
        </ul>
      </span>
    </>
  );
};

export default ForceFieldsDescription;

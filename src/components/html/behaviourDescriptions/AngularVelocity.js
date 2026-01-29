import { useRef } from "react";

const AngularVelocityDescription = () => {
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
      <div className="explanation" ref={contentRef}>
        <span>
          <b>Angular Velocity Behaviour</b> adds rotational dynamics to
          particles, enabling them to orbit smoothly around a center point with
          customizable radius and angular velocity. This behavior supports
          advanced features like oscillation, dynamic radius variations, and
          flexible control over rotation speed and direction.
        </span>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Activates or deactivates the behavior.
          </li>
          <li>
            <b>Priority</b>: Determines execution order relative to other
            behaviors.
          </li>
          <li>
            <b>Degrees</b>: Sets the base angular velocity in degrees per
            second.
          </li>
          <li>
            <b>Degrees Variance</b>: Introduces random variations to the angular
            velocity, creating more natural or chaotic motion.
          </li>
          <li>
            <b>Radius</b>:
            <ul>
              <li>
                <b>Max Radius</b>: Defines the starting distance from the center
                of rotation.
              </li>
              <li>
                <b>Max Radius Variance</b>: Adds randomness to the initial
                radius for each particle.
              </li>
              <li>
                <b>Min Radius</b>: Specifies the radius as the particle
                approaches the end of its life.
              </li>
              <li>
                <b>Min Radius Variance</b>: Adjusts the variability of the final
                radius.
              </li>
            </ul>
          </li>
          <li>
            <b>Oscillation</b>:
            <ul>
              <li>
                <b>Enabled</b>: Adds oscillating angular velocity for dynamic
                effects.
              </li>
              <li>
                <b>Speed</b>: Controls the frequency of oscillation.
              </li>
              <li>
                <b>Amplitude</b>: Sets the oscillation intensity in degrees.
              </li>
            </ul>
          </li>
          <li>
            <b>Radius Reduction</b>:
            <ul>
              <li>
                <b>Linear</b>: Reduces the radius linearly over the particle’s
                lifetime.
              </li>
              <li>
                <b>Exponential</b>: Creates a sharper reduction in radius using
                non-linear scaling.
              </li>
            </ul>
          </li>
          <li>
            <b>Dynamic Radius</b>: Allows real-time radius changes during the
            particle&apos;s lifetime for effects like breathing or pulsing
            motion.
          </li>
        </ul>
        <h4>Advanced Features:</h4>
        <ul>
          <li>
            <b>Oscillation</b>: Perfect for creating wavy or undulating
            rotational patterns.
          </li>
          <li>
            <b>Dynamic Radius</b>: Adds organic motion by varying radius in real
            time.
          </li>
          <li>
            <b>Exponential Radius Reduction</b>: Achieve sharper shrinking
            effects compared to linear scaling.
          </li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>
            Simulating orbiting particles like celestial objects or satellites.
          </li>
          <li>
            Creating twisting or swirling effects for magical or fluid-like
            visuals.
          </li>
          <li>
            Designing dynamic particle patterns for interactive art or games.
          </li>
        </ul>
        <h4>Live Examples:</h4>
        <span>
          <a href="/?effect=twist" target="_blank">
            Example: Twist Effect
          </a>
          <br />
          <a href="/?effect=angularVelocity" target="_blank">
            Example: Angular Velocity
          </a>
        </span>
      </div>
    </>
  );
};

export default AngularVelocityDescription;

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
          <b>Emit Direction Behaviour</b>: provides advanced control over the
          initial and ongoing directional movement of particles. It offers
          features like oscillation, noise-based direction changes, and velocity
          scaling, allowing for dynamic and visually diverse emission patterns.
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
            <b>Angle</b>: Sets the main direction of particle emission, defined
            in radians.
          </li>
          <li>
            <b>Angle Variance</b>: Adds randomness to the direction, allowing
            particles to spread within a range around the main angle.
          </li>
          <li>
            <b>Oscillation</b>:
            <ul>
              <li>
                <b>Enabled</b>: Toggle oscillation for direction changes.
              </li>
              <li>
                <b>Speed</b>: Define the speed of oscillation cycles.
              </li>
              <li>
                <b>Amplitude</b>: Set the intensity of oscillation in radians.
              </li>
            </ul>
          </li>
          <li>
            <b>Noise-Based Direction</b>:
            <ul>
              <li>
                <b>Enabled</b>: Use noise to modify direction dynamically.
              </li>
              <li>
                <b>Scale</b>: Adjust the granularity of the noise effect.
              </li>
            </ul>
          </li>
          <li>
            <b>Velocity Scaling</b>: Enable scaling of velocity based on
            particle lifecycle.
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
          <a href="/?effect=bubbles" target="_blank">
            Example
          </a>
        </span>
      </span>
    </>
  );
};

export default EmitDirectionDescription;

import { useRef } from "react";

const RotationDescription = () => {
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
      <button className="showContent" onClick={toggleContent} ref={buttonRef}>
        Show Description
      </button>
      <div className="explanation" ref={contentRef}>
        <p>
          <b>Rotation Behaviour</b> in a particle system defines how particles
          change their angle over time, creating dynamic visual effects.
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggles the behavior on or off.
          </li>
          <li>
            <b>Priority</b>: Determines the execution order if multiple
            behaviors are applied to the same particle.
          </li>
          <li>
            <b>Rotation</b>: The base speed at which a particle's angle changes,
            measured in degrees or radians per second.
          </li>
          <li>
            <b>Variance</b>: Adds randomness to the rotation speed, creating
            variation among particles for a more natural effect.
          </li>
        </ul>
        <br />
        <h4>Advanced Properties:</h4>
        <ul>
          <li>
            <b>Oscillate</b>: Enables oscillation, allowing particles to sway
            back and forth in their rotation.
          </li>
          <li>
            <b>Oscillation Speed</b>: Controls the speed of the oscillation
            effect.
          </li>
          <li>
            <b>Oscillation Amplitude</b>: Defines the maximum rotation angle of
            the oscillation.
          </li>
          <li>
            <b>Use Noise</b>: Introduces Perlin noise for smooth pseudo-random
            changes in rotation, creating chaotic or natural motion.
          </li>
          <li>
            <b>Noise Scale</b>: Adjusts the intensity and scale of the noise
            effect.
          </li>
          <li>
            <b>Acceleration</b>: Gradually increases or decreases the rotation
            speed over time, allowing for dynamic effects like spinning up or
            slowing down.
          </li>
          <li>
            <b>Clockwise</b>: Determines the direction of rotation (clockwise or
            counterclockwise).
          </li>
        </ul>
        <br />
        <p>
          These settings enable you to create complex particle effects, such as:
        </p>
        <ul>
          <li>Spinning sparks in a firework display</li>
          <li>Swirling debris in a storm</li>
          <li>Graceful spinning leaves in the wind</li>
        </ul>
      </div>
    </>
  );
};

export default RotationDescription;

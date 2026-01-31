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
          <b>Rotation Behaviour</b> enables dynamic control over particle
          rotation, allowing for smooth or chaotic changes in angular motion.
          This behavior is ideal for creating realistic and captivating
          particle-based effects.
        </p>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggles the behavior on or off.
          </li>
          <li>
            <b>Priority</b>: Defines the execution order when multiple behaviors
            are applied.
          </li>
          <li>
            <b>Rotation</b>: The base angular velocity in degrees or radians per
            second.
          </li>
          <li>
            <b>Variance</b>: Adds randomness to the base rotation speed,
            simulating natural or chaotic motion.
          </li>
        </ul>
        <h4>Advanced Properties:</h4>
        <ul>
          <li>
            <b>Oscillation</b>: Enables oscillatory rotation, creating swaying
            effects for particles.
            <ul>
              <li>
                <b>Oscillation Speed</b>: Adjusts how quickly particles sway.
              </li>
              <li>
                <b>Oscillation Amplitude</b>: Defines the maximum angular
                variation during oscillation.
              </li>
            </ul>
          </li>
          <li>
            <b>Use Noise</b>: Applies Perlin noise for smooth pseudo-random
            rotation, adding an organic feel.
          </li>
          <li>
            <b>Noise Scale</b>: Controls the intensity of the noise effect.
          </li>
          <li>
            <b>Acceleration</b>: Gradually increases or decreases the angular
            velocity, enabling effects like spinning up or slowing down.
          </li>
          <li>
            <b>Clockwise</b>: Sets the rotation direction (clockwise or
            counterclockwise).
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>rotation</b> — Base angular velocity (degrees or rad/sec).</li>
          <li><b>variance</b> — Random variation in rotation speed.</li>
          <li><b>oscillate</b> — Enable oscillatory rotation (swaying).</li>
          <li><b>oscillationSpeed</b>, <b>oscillationAmplitude</b> — Sway frequency and angular variation.</li>
          <li><b>useNoise</b> — Perlin noise for rotation.</li>
          <li><b>noiseScale</b> — Noise intensity.</li>
          <li><b>acceleration</b> — Angular acceleration (spin up/down).</li>
          <li><b>clockwise</b> — Rotation direction.</li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>Simulating spinning sparks in a firework display</li>
          <li>Creating swirling debris effects in storms or explosions</li>
          <li>Designing gracefully rotating leaves or snowflakes</li>
          <li>
            Adding oscillatory or chaotic rotation to particles for more natural
            motion
          </li>
        </ul>
        <h4>Live Examples:</h4>
        <ul>
          <li>
            <a href="/?effect=rotatingParticles" target="_blank">
              Rotating Particles
            </a>
          </li>
          <li>
            <a href="/?effect=swirlingDebris" target="_blank">
              Swirling Debris
            </a>
          </li>
          <li>
            <a href="/?effect=oscillatingRotation" target="_blank">
              Oscillating Rotation
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default RotationDescription;

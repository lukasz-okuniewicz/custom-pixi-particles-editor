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
      <div className="explanation" ref={contentRef}>
        <p>
          <b>Emit Direction Behaviour</b> controls the initial and ongoing
          directional movement of particles, providing a flexible framework for
          dynamic emission patterns. Features such as oscillation,
          noise-influenced direction changes, and velocity scaling offer
          extensive customization for creating visually appealing effects.
        </p>

        <h4>Key Features:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behavior on or off to control particle
            direction dynamically.
          </li>
          <li>
            <b>Priority</b>: Determine the execution order when multiple
            behaviors are applied to a particle.
          </li>
          <li>
            <b>Angle</b>: Set the primary direction of particle emission in
            radians.
          </li>
          <li>
            <b>Variance</b>: Introduce randomness to the emission angle, adding
            natural spread to particle motion.
          </li>
        </ul>

        <h4>Advanced Features:</h4>
        <ul>
          <li>
            <b>Oscillation</b>: Create dynamic directional changes with
            oscillation.
            <ul>
              <li>
                <b>Enabled</b>: Toggle oscillation for periodic directional
                shifts.
              </li>
              <li>
                <b>Speed</b>: Control the frequency of oscillation cycles.
              </li>
              <li>
                <b>Amplitude</b>: Adjust the range of directional oscillation in
                radians.
              </li>
            </ul>
          </li>
          <li>
            <b>Noise-Based Direction</b>: Use Perlin noise for random but smooth
            directional variation.
            <ul>
              <li>
                <b>Enabled</b>: Activate noise-driven directional changes.
              </li>
              <li>
                <b>Scale</b>: Set the granularity of the noise effect to control
                its intensity and smoothness.
              </li>
            </ul>
          </li>
          <li>
            <b>Velocity Scaling</b>: Dynamically adjust velocity based on the
            particle&apos;s life progress, enabling effects like gradual
            acceleration or deceleration.
          </li>
        </ul>

        <h4>How It Works:</h4>
        <p>
          The behavior calculates the cosine and sine of the angle (modified by
          variance, oscillation, or noise) to determine directional movement.
          Combined with scaling and variance, this results in a wide range of
          effects, from focused beams to dispersed sprays.
        </p>

        <h4>Use Cases:</h4>
        <ul>
          <li>Simulating spray patterns or focused beams of particles.</li>
          <li>
            Adding natural variation and randomness to particle trajectories
            using noise.
          </li>
          <li>Creating pulsating or oscillating bursts for dynamic effects.</li>
          <li>
            Adjusting particle velocity progressively over their lifetime.
          </li>
        </ul>

        <h4>Live Examples:</h4>
        <span>
          <a href="/?effect=bubbles" target="_blank">
            Emit Direction Example
          </a>
        </span>
      </div>
    </>
  );
};

export default EmitDirectionDescription;

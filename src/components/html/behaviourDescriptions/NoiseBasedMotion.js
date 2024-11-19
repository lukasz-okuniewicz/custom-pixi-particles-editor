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
          <b>Noise-Based Motion Behaviour</b>: This behavior adds smooth,
          natural-looking randomness to particle motion using Perlin noise.
          Particles drift in organic patterns, ideal for effects like flowing
          water, drifting clouds, or smoke. You can customize the intensity (how
          far particles move), scale (granularity of the motion), and speed
          (rate of motion evolution) to achieve the desired effect. Noise motion
          integrates seamlessly with other behaviors, enhancing realism in
          particle movement.
        </span>
        <ul>
          <li>
            <b>Noise Intensity</b>: Controls the strength of the noise effect on
            particle motion. Higher values result in larger deviations from the
            original movement.
            <ul>
              <li>Low value (e.g., 5): Subtle random drifting.</li>
              <li>High value (e.g., 50): Large, chaotic particle movements.</li>
            </ul>
          </li>
          <li>
            <b>Noise Scale</b>: Determines the granularity of the noise field.
            Smaller values create smooth, large-scale patterns; larger values
            create finer, more detailed randomness.
            <ul>
              <li>Low value (e.g., 0.01): Gentle, sweeping motions.</li>
              <li>High value (e.g., 0.1): Rapid, jittery movements.</li>
            </ul>
          </li>
          <li>
            <b>Noise Speed</b>: Adjusts the rate at which the noise pattern
            evolves over time. Higher values make the motion appear faster.
            <ul>
              <li>Low value (e.g., 0.01): Slow drifting.</li>
              <li>High value (e.g., 0.5): Rapid, energetic motion.</li>
            </ul>
          </li>
          <li>
            <b>Noise Direction</b>: Sets a directional bias for the noise
            motion.
            <ul>
              <li>
                X controls the horizontal influence, and Y controls the vertical
                influence.
              </li>
              <li>
                A value of (1, 0) makes motion predominantly horizontal, while
                (0, 1) makes it vertical.
              </li>
              <li>(1, 0.5): Diagonal bias.</li>
            </ul>
          </li>
        </ul>
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

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
      <div className="explanation" ref={contentRef}>
        <span>
          <b>Noise-Based Motion Behaviour</b> generates smooth, natural, and
          flowing movement patterns for particles using Perlin noise. This
          technique produces organic, non-repetitive motion, ideal for creating
          lifelike effects in particle systems.
        </span>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggles the behavior on or off.
          </li>
          <li>
            <b>Priority</b>: Determines the order in which this behavior is
            applied relative to others.
          </li>
          <li>
            <b>Noise Scale</b>: Controls the level of detail in the noise field.
            Smaller values create finer, more detailed noise.
          </li>
          <li>
            <b>Noise Intensity</b>: Scales the effect of the noise on particle
            movement, increasing or decreasing motion amplitude.
          </li>
          <li>
            <b>Noise Speed</b>: Adjusts how quickly particles traverse the noise
            field, affecting the rate of change in their motion.
          </li>
          <li>
            <b>Noise Direction</b>: Sets the global direction of motion
            influenced by the noise, defined as a 2D vector.
          </li>
        </ul>
        <h4>Advanced Features:</h4>
        <ul>
          <li>
            <b>Custom Gradients</b>: Uses pre-generated random gradients for
            smooth directional transitions across the noise field.
          </li>
          <li>
            <b>Grid Size</b>: The size of the noise grid, determining how far
            gradients are spaced. Larger grids produce broader noise patterns.
          </li>
        </ul>
        <p>Use this behavior to create:</p>
        <ul>
          <li>Organic motions, such as flowing water or drifting particles.</li>
          <li>Dynamic effects for backgrounds or environmental elements.</li>
          <li>
            Subtle and non-repetitive motion patterns for aesthetic
            enhancements.
          </li>
        </ul>
        <h4>Live Examples:</h4>
        <a href="/?effect=background" target="_blank">
          Example
        </a>
      </div>
    </>
  );
};

export default NoiseBasedMotionDescription;

import { useRef } from "react";

const StretchDescription = () => {
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
          <b>Stretch Behaviour</b> introduces a dynamic scaling effect for
          particles based on their speed. It adjusts a particle`&apos;s
          dimensions and rotation to simulate stretching and alignment in the
          direction of movement, creating realistic motion effects.
        </p>

        <h4>Key Features:</h4>
        <ul>
          <li>
            <b>Speed-Based Scaling:</b> Scales the particle`&apos;s width
            (X-axis) proportionally to its speed while maintaining a constant
            height (Y-axis).
          </li>
          <li>
            <b>Rotation Alignment:</b> Rotates particles to align with their
            direction of movement for a seamless motion effect.
          </li>
          <li>
            <b>Customizable Parameters:</b> Fine-tune the behavior with options
            such as:
            <ul>
              <li>
                <b>Base Scale:</b> Defines the default height of the particle.
              </li>
              <li>
                <b>Stretch Factor:</b> Controls the sensitivity of width scaling
                based on speed.
              </li>
              <li>
                <b>Minimum Stretch:</b> Sets a lower limit for the width
                scaling.
              </li>
              <li>
                <b>Maximum Stretch:</b> Caps the width scaling at an upper
                limit.
              </li>
            </ul>
          </li>
          <li>
            <b>Efficiency:</b> Optimized calculations ensure real-time updates
            for particle scaling and rotation, even in high-density systems.
          </li>
        </ul>

        <h4>Applications:</h4>
        <ul>
          <li>
            Simulate speed trails or motion blur effects for fast-moving
            particles.
          </li>
          <li>
            Enhance particle-based animations with dynamic motion effects.
          </li>
          <li>
            Align particles with their movement direction for increased realism.
          </li>
        </ul>

        <h4>Examples:</h4>
        <span>
          <a href="/?effect=stretch" target="_blank">
            Stretch Effect
          </a>
        </span>
      </div>
    </>
  );
};

export default StretchDescription;

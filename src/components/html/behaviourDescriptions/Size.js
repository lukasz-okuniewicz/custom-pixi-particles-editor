import { useRef } from "react";

const SizeDescription = () => {
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
          <b>Size Behaviour</b> in a particle system controls how the size of
          particles evolves during their lifetime, providing options for dynamic
          and realistic scaling effects.
        </span>
        <br />
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggles the size behavior on or off.
          </li>
          <li>
            <b>Priority</b>: Determines the order in which this behavior is
            applied relative to others.
          </li>
          <li>
            <b>Size Start and Variance</b>: Specifies the initial size of
            particles, with optional randomness for variation.
          </li>
          <li>
            <b>Size End and Variance</b>: Sets the target size for particles at
            the end of their lifetime, with additional randomness for variation.
          </li>
          <li>
            <b>Max Size</b>: Limits the maximum size a particle can reach,
            preventing overly large particles.
          </li>
          <li>
            <b>Uniform Scaling</b>: Ensures particles maintain their aspect
            ratio while scaling (e.g., circles remain circular).
          </li>
        </ul>
        <br />
        <h4>Advanced Features:</h4>
        <ul>
          <li>
            <b>Pulsation</b>: Adds a pulsing effect to the particle size,
            simulating breathing or throbbing objects. This is controlled by:
            <ul>
              <li>
                <b>Pulsation Speed</b>: The speed of the pulsation cycle.
              </li>
              <li>
                <b>Pulsation Amplitude</b>: The intensity of size fluctuations.
              </li>
            </ul>
          </li>
          <li>
            <b>Easing Functions</b>: Controls the rate of size change over time
            for both the x- and y-axes, allowing for smooth or dynamic
            transitions. Options include:
            <ul>
              <li>
                <b>Linear</b>: Uniform scaling from start to end.
              </li>
              <li>
                <b>Ease In</b>: Slower growth at the start, accelerating over
                time.
              </li>
              <li>
                <b>Ease Out</b>: Faster growth initially, slowing near the end.
              </li>
              <li>
                <b>Ease In-Out</b>: Combines ease-in and ease-out for smooth
                transitions.
              </li>
            </ul>
          </li>
          <li>
            <b>Noise Modulation</b>: Uses a pseudo-random noise function to
            dynamically adjust size for chaotic or natural-looking effects.
            Controlled by:
            <ul>
              <li>
                <b>Noise Scale</b>: Adjusts the intensity and scale of the noise
                effect.
              </li>
            </ul>
          </li>
          <li>
            <b>Invert at Midpoint</b>: Flips the size transition halfway through
            the particle's life, creating unique shrinking and expanding
            effects.
          </li>
          <li>
            <b>Multi-Step Transitions</b>: Allows particles to follow a defined
            sequence of size points throughout their life.
          </li>
          <li>
            <b>Time Offset</b>: Delays or advances the scaling process for
            particles.
          </li>
          <li>
            <b>Size-Alpha Dependency</b>: Links particle size to their alpha
            (transparency) for synchronized fading and scaling effects.
          </li>
        </ul>
        <br />
        <h4>Use Cases:</h4>
        <ul>
          <li>Particles that grow or shrink over their lifetime.</li>
          <li>Dynamic pulsating particles for magical or energy effects.</li>
          <li>Controlled size changes with easing for smoother animations.</li>
          <li>
            Unique transitions like shrinking halfway or following custom
            size-step patterns.
          </li>
          <li>Realistic effects with size linked to transparency.</li>
        </ul>
      </span>
    </>
  );
};

export default SizeDescription;

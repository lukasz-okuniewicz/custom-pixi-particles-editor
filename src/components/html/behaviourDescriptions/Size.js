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
      <div className="explanation" ref={contentRef}>
        <p>
          <b>Size Behaviour</b> in a particle system controls how particle sizes
          evolve during their lifecycle, providing options for dynamic,
          realistic, and visually engaging effects.
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggles the behavior on or off.
          </li>
          <li>
            <b>Priority</b>: Determines the execution order relative to other
            behaviors.
          </li>
          <li>
            <b>Size Start and Variance</b>: Defines the initial size of
            particles and adds optional randomness for variety.
          </li>
          <li>
            <b>Size End and Variance</b>: Sets the target size for particles at
            the end of their lifecycle, with additional randomness for
            variation.
          </li>
          <li>
            <b>Max Size</b>: Limits the maximum size particles can achieve.
          </li>
          <li>
            <b>Uniform Scaling</b>: Ensures particles maintain their aspect
            ratio while scaling.
          </li>
        </ul>

        <h4>Advanced Features:</h4>
        <ul>
          <li>
            <b>Pulsation</b>: Simulates a breathing or throbbing effect with:
            <ul>
              <li>
                <b>Pulsation Speed</b>: Determines how fast the pulsation
                occurs.
              </li>
              <li>
                <b>Pulsation Amplitude</b>: Controls the intensity of pulsation.
              </li>
            </ul>
          </li>
          <li>
            <b>Easing Functions</b>: Controls scaling transitions for both x-
            and y-axes:
            <ul>
              <li>
                <b>Linear</b>: Uniform scaling throughout the lifecycle.
              </li>
              <li>
                <b>Ease In</b>: Gradual start, accelerating over time.
              </li>
              <li>
                <b>Ease Out</b>: Fast at the start, slowing down near the end.
              </li>
              <li>
                <b>Ease In-Out</b>: Combines gradual start and end for smooth
                transitions.
              </li>
            </ul>
          </li>
          <li>
            <b>Noise Modulation</b>: Introduces pseudo-random noise for dynamic
            or natural size variations:
            <ul>
              <li>
                <b>Noise Scale</b>: Adjusts the intensity of the noise effect.
              </li>
            </ul>
          </li>
          <li>
            <b>Invert at Midpoint</b>: Flips size transitions halfway through
            the particle&apos;s life, creating shrinking and growing effects.
          </li>
          <li>
            <b>Multi-Step Transitions</b>: Enables particles to follow a
            sequence of predefined size points during their lifecycle.
          </li>
          <li>
            <b>Time Offset</b>: Delays or advances the scaling process for
            particles, creating staggered effects.
          </li>
          <li>
            <b>Size-Alpha Dependency</b>: Links particle size to transparency,
            enabling synchronized scaling and fading effects.
          </li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>sizeStart</b>, <b>sizeEnd</b> — Start and end size (x, y).</li>
          <li><b>startVariance</b>, <b>endVariance</b> — Random variation for size.</li>
          <li><b>maxSize</b> — Maximum size clamp (x, y).</li>
          <li><b>uniformScaling</b> — Keep aspect ratio when scaling.</li>
          <li><b>pulsate</b> — Breathing/throbbing effect.</li>
          <li><b>pulsationSpeed</b>, <b>pulsationAmplitude</b> — Pulsation frequency and intensity.</li>
          <li><b>useNoise</b> — Pseudo-random noise for size.</li>
          <li><b>noiseScale</b> — Noise intensity.</li>
          <li><b>invertAtMidpoint</b> — Flip size transition halfway.</li>
          <li><b>sizeSteps</b> — Multi-step size sequence (array of (x, y)).</li>
          <li><b>timeOffset</b> — Delay or advance scaling.</li>
          <li><b>xScalingFunction</b>, <b>yScalingFunction</b> — Easing: linear, easeIn, easeOut, easeInOut.</li>
          <li><b>sizeAlphaDependency</b> — Link size to alpha.</li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>Particles that grow or shrink dynamically over time.</li>
          <li>
            Pulsating particles for effects like magical spells, energy bursts,
            or breathing orbs.
          </li>
          <li>Realistic animations with easing for smooth transitions.</li>
          <li>
            Unique transitions such as shrinking halfway or following a custom
            size-step pattern.
          </li>
          <li>
            Integrating size changes with alpha for fading or glowing effects.
          </li>
        </ul>
      </div>
    </>
  );
};

export default SizeDescription;

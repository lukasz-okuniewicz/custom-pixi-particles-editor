import { useRef } from "react";

const ColorDescription = () => {
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
          <b>Color Behaviour</b> is a highly customizable feature for managing
          dynamic color transitions in particle systems. It supports advanced
          visual effects such as multi-gradient transitions, pulsing, noise
          modulation, and flickering, offering unparalleled creative control.
        </span>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Activates or deactivates the behavior.
          </li>
          <li>
            <b>Priority</b>: Determines the execution order when multiple
            behaviors are applied.
          </li>
          <li>
            <b>Start & End Colors</b>: Define the starting and ending colors for
            the particle&apos;s lifecycle, allowing smooth color transitions.
          </li>
          <li>
            <b>Start & End Variance</b>: Introduce randomness to the start and
            end colors for variation across particles.
          </li>
          <li>
            <b>Color Stops</b>: Create multi-step gradient transitions with
            additional intermediate colors.
          </li>
          <li>
            <b>Sinusoidal Alpha Modulation</b>: Applies a sinusoidal wave to
            alpha transparency, creating a fade-in/out effect.
          </li>
          <li>
            <b>Use Perlin Noise</b>: Adds dynamic, noise-based color changes for
            natural and non-linear effects.
          </li>
          <li>
            <b>Pulse Speed & Intensity</b>: Configures the speed and intensity
            of a pulsing color effect, ideal for magical or glowing effects.
          </li>
          <li>
            <b>Mirror Transition</b>: Reverses the color transition midway for a
            symmetrical gradient effect.
          </li>
          <li>
            <b>Fade to Gray</b>: Gradually desaturates colors, simulating fading
            or aging effects.
          </li>
          <li>
            <b>Fade to Transparent</b>: Reduces particle opacity over time,
            creating a natural fade-out effect.
          </li>
          <li>
            <b>Flicker Intensity</b>: Controls random brightness variations for
            a flickering effect, ideal for flames or unstable energy sources.
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>start</b>, <b>end</b> — Start and end colors (r, g, b, alpha).</li>
          <li><b>startVariance</b>, <b>endVariance</b> — Random variation for start/end colors.</li>
          <li><b>sinus</b> — Sinusoidal alpha modulation (fade in/out).</li>
          <li><b>usePerlin</b> — Perlin noise-based color changes.</li>
          <li><b>mirrorTransition</b> — Reverse gradient midway.</li>
          <li><b>fadeToGray</b> — Desaturate over life.</li>
          <li><b>fadeToTransparent</b> — Reduce opacity over life.</li>
          <li><b>flickerIntensity</b> — Random brightness variation.</li>
          <li><b>pulseIntensity</b>, <b>pulseSpeed</b> — Pulsing color effect.</li>
          <li><b>colorStops</b> — Multi-step gradient (array of r, g, b, alpha).</li>
        </ul>
        <h4>Practical Applications:</h4>
        <ul>
          <li>
            <b>Fire Effects</b>: Combine flickering with red-to-orange gradient
            transitions for a realistic fire simulation.
          </li>
          <li>
            <b>Magical Orbs</b>: Use pulsing colors with Perlin noise to create
            dynamic, otherworldly glowing particles.
          </li>
          <li>
            <b>Ambient Light</b>: Apply subtle fade-to-gray effects for
            background ambiance.
          </li>
          <li>
            <b>Energy Trails</b>: Use mirrored transitions and sinusoidal alpha
            to simulate trailing energy effects.
          </li>
        </ul>
        <span>
          This behavior is essential for creating visually captivating effects
          in particle systems, whether for subtle background enhancements or
          attention-grabbing visuals.
        </span>
        <h4>Live Examples:</h4>
        <span>
          <a href="/?effect=colorBehaviourDemo" target="_blank">
            Dynamic Color Behaviour Demo
          </a>
        </span>
      </div>
    </>
  );
};

export default ColorDescription;

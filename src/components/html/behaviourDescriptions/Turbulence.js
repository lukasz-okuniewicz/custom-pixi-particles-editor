import { useRef } from "react";

const TurbulenceDescription = () => {
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
          <b>Turbulence Behaviour</b> adds dynamic, swirling motion to particles
          by simulating interactions with vortex-like fields. This behavior
          enables complex motion patterns, making it ideal for effects like
          whirlpools, flames, smoke, and other chaotic systems.
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behavior on or off.
          </li>
          <li>
            <b>Priority</b>: Determines the order in which this behavior is
            applied relative to others.
          </li>
          <li>
            <b>Show Vortices</b>: Toggle visibility of vortex positions in the
            canvas for editing and debugging.
          </li>
          <li>
            <b>Effect (Turbulence Version)</b>: Select the type of vortex
            effect: ClockWise rotation, Non ClockWise rotation, Pushing V1/V2,
            Sucking V1/V2.
          </li>
          <li>
            <b>Start Variance, End Variance</b>: Random variation for vortex
            size at start and end of life.
          </li>
          <li>
            <b>Position & Position Variance</b>: Vortex center position and
            randomness. Use &quot;Select Position&quot; to set the vortex by
            clicking on the canvas.
          </li>
          <li>
            <b>Velocity & Velocity Variance</b>: Vortex movement and
            randomness.
          </li>
          <li>
            <b>Acceleration & Acceleration Variance</b>: Vortex acceleration
            over time.
          </li>
          <li>
            <b>Size Start, Size Start Variance, Size End, Size End Variance</b>:
            Vortex size at start and end of its life, with optional randomness.
          </li>
          <li>
            <b>Emit/sec</b>: Number of vortices emitted per second.
          </li>
          <li>
            <b>Duration</b>: How long vortices are emitted (-1 = indefinitely).
          </li>
          <li>
            <b>Max Life Time</b>: Maximum lifetime of each vortex.
          </li>
          <li>
            <b>Vortile Size</b>: Size/influence radius of each vortex.
          </li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>showVortices</b> — Show vortex positions on canvas.</li>
          <li><b>effect</b> — Vortex type (0-5: ClockWise, Non ClockWise, Pushing V1/V2, Sucking V1/V2).</li>
          <li><b>startVariance</b>, <b>endVariance</b> — Vortex size variance at start/end.</li>
          <li><b>duration</b> — Emit duration (-1 = indefinitely).</li>
          <li><b>position</b>, <b>positionVariance</b> — Vortex center (x, y) and variance.</li>
          <li><b>velocity</b>, <b>velocityVariance</b> — Vortex movement and variance.</li>
          <li><b>acceleration</b>, <b>accelerationVariance</b> — Vortex acceleration.</li>
          <li><b>sizeStart</b>, <b>sizeEnd</b> — Vortex size at start/end (x, y).</li>
          <li><b>emitPerSecond</b> — Vortices emitted per second.</li>
          <li><b>maxLifeTime</b> — Max lifetime of each vortex.</li>
          <li><b>vortileSize</b> — Influence radius of each vortex.</li>
        </ul>
        <h4>How It Works:</h4>
        <p>
          The behavior applies vortex effects to particles based on their
          proximity to defined vortices. Particles are influenced by the type of
          effect (e.g., swirling, pulling, or repelling) and the calculated
          strength of the vortex field, which diminishes with distance. This
          interaction creates dynamic, visually engaging motion patterns.
        </p>

        <h4>Use Cases:</h4>
        <ul>
          <li>Simulating smoke or flame turbulence in a realistic manner.</li>
          <li>Creating swirling whirlpools or chaotic particle streams.</li>
          <li>Adding depth and complexity to dynamic environments.</li>
          <li>Visualizing vortex-like phenomena in animations.</li>
        </ul>

        <h4>Live Examples:</h4>
        <ul>
          <li>
            <a href="/?effect=fireWithTurbulence" target="_blank">
              Fire with Turbulence
            </a>
          </li>
          <li>
            <a href="/?effect=smokeWhirl" target="_blank">
              Smoke Whirlpool
            </a>
          </li>
          <li>
            <a href="/?effect=dynamicVortex" target="_blank">
              Dynamic Vortex Simulation
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default TurbulenceDescription;

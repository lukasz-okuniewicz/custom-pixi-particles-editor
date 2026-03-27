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
          flowing movement patterns using layered simplex noise. It now supports
          vector and curl modes, fractal octaves, domain warping, and damping
          controls for more art-directable motion.
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
            <b>Mode</b>: <b>Vector</b> creates drifting motion; <b>Curl</b>
            creates incompressible swirling flow.
          </li>
          <li>
            <b>Octaves / Lacunarity / Gain</b>: fBm controls for layered detail,
            frequency growth, and per-layer contribution.
          </li>
          <li>
            <b>Warp Strength / Warp Scale / Warp Speed</b>: Domain warping for
            fluid, non-linear trajectories.
          </li>
          <li>
            <b>Curl Epsilon</b>: Derivative sampling step used in curl mode.
          </li>
          <li>
            <b>Drag / Max Noise Speed</b>: Stability controls for limiting
            runaway velocity when stacked with other behaviours.
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>noiseScale</b> — Base sampling scale for the field.</li>
          <li><b>noiseIntensity</b> — Scale of field force.</li>
          <li><b>noiseSpeed</b> — How quickly particles traverse the field.</li>
          <li><b>noiseDirection</b> — Global axis multiplier (x, y).</li>
          <li><b>mode</b> — <code>vector</code> or <code>curl</code>.</li>
          <li><b>octaves</b> — Number of fBm layers.</li>
          <li><b>lacunarity</b> — Frequency multiplier per octave.</li>
          <li><b>gain</b> — Amplitude multiplier per octave.</li>
          <li><b>warpStrength</b> — Amount of domain distortion.</li>
          <li><b>warpScale</b> — Warp field frequency.</li>
          <li><b>warpSpeed</b> — Warp field phase speed.</li>
          <li><b>curlEpsilon</b> — Finite difference step for curl derivatives.</li>
          <li><b>drag</b> — Per-frame velocity damping.</li>
          <li><b>maxNoiseSpeed</b> — Velocity clamp from this behaviour.</li>
        </ul>
        <h4>Editor Properties:</h4>
        <p>
          The editor exposes all major controls: mode selection, fBm shaping,
          domain warping, curl derivative precision, and damping/velocity caps.
          Start with vector mode + moderate warp, then switch to curl mode for
          fluid eddies.
        </p>
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

import { useRef } from "react";

const PositionDescription = () => {
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
          <b>Position Behaviour</b> controls particle motion over time using
          velocity, acceleration, damping, bounds handling, and optional wave
          oscillation.
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Priority</b>: Execution order when multiple behaviours are
            applied.
          </li>
          <li>
            <b>Velocity & Velocity Variance</b>: Initial linear motion (x, y)
            with optional randomness.
          </li>
          <li>
            <b>Gravity/Acceleration & Gravity Variance</b>: Continuous force
            applied each frame (x, y).
          </li>
          <li>
            <b>Drag & Drag Variance</b>: Damp velocity over time, with optional
            per-particle variation.
          </li>
          <li>
            <b>Max Speed & Max Speed Variance</b>: Clamp velocity magnitude to
            avoid runaway particles.
          </li>
          <li>
            <b>Bounds Mode</b> (<b>None</b>, <b>Wrap</b>, <b>Bounce</b>,{" "}
            <b>Clamp</b>) with bounds min/max and optional bounce damping.
          </li>
        </ul>

        <h4>Sinusoidal Motion:</h4>
        <ul>
          <li>
            <b>Horizontal Oscillation, Vertical Oscillation</b>: Enable wave
            motion along the X axis (left-right) and/or Y axis (up-down).
          </li>
          <li>
            <b>Horizontal/Vertical Oscillation (Amp/Freq)</b>: Controls wave
            shape where x = amplitude and y = frequency.
          </li>
          <li>
            <b>Horizontal/Vertical Oscillation Variance</b>: Adds per-particle
            random variation to amplitude and frequency.
          </li>
        </ul>

        <h4>Available fields in this panel</h4>
        <ul>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>velocity</b>, <b>velocityVariance</b> — Initial velocity (x, y).</li>
          <li><b>acceleration</b>, <b>accelerationVariance</b> — Gravity/acceleration (x, y).</li>
          <li><b>drag</b>, <b>dragVariance</b> — Velocity damping and variation.</li>
          <li><b>maxSpeed</b>, <b>maxSpeedVariance</b> — Velocity cap and variation.</li>
          <li><b>boundsMode</b> — none / wrap / bounce / clamp.</li>
          <li><b>boundsMin</b>, <b>boundsMax</b> — Bounds rectangle corners.</li>
          <li><b>bounceDamping</b> — Velocity retention on bounce.</li>
          <li><b>sinX</b>, <b>sinY</b> — Enable horizontal/vertical oscillation.</li>
          <li><b>sinXVal</b>, <b>sinYVal</b> — Oscillation amplitude and frequency (x, y).</li>
          <li><b>sinXValVariance</b>, <b>sinYValVariance</b> — Variance for oscillation values.</li>
        </ul>
        <h4>How It Works:</h4>
        <p>
          Each frame, velocity is updated by acceleration and drag, then
          position is advanced. Bounds mode is applied afterward, and optional
          horizontal/vertical oscillation is added on top.
        </p>

        <h4>Use Cases:</h4>
        <ul>
          <li>
            Creating natural drifting, falling, or force-driven motion.
          </li>
          <li>Keeping particles inside a region with wrap, bounce, or clamp.</li>
          <li>Adding wave-like movement for fluttering, wobble, or pulse effects.</li>
        </ul>

        <h4>Live Examples:</h4>
        <ul>
          <li>
            <a href="/?effect=sinusoidalMotion" target="_blank">
              Sinusoidal Motion
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PositionDescription;

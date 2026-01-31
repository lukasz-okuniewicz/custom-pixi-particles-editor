import { useRef } from "react";

const RippleDescription = () => {
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
          <b>Ripple Behaviour</b> applies a radial wave from an origin. Particle
          positions are offset based on their distance from the origin and a
          traveling wave phase, creating water-ripple or shockwave-style
          effects.
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behaviour on or off.
          </li>
          <li>
            <b>Priority</b>: Execution order (higher runs first).
          </li>
          <li>
            <b>Origin</b>: (x, y) center of the ripple. Use &quot;Select Position&quot; to set by clicking on the canvas.
          </li>
          <li>
            <b>Wave Speed</b>: How fast the wave travels outward (units per
            second).
          </li>
          <li>
            <b>Wavelength</b>: Distance between wave peaks (in units).
          </li>
          <li>
            <b>Amplitude</b>: Maximum position offset from the wave.
          </li>
          <li>
            <b>Decay With Distance</b>: When on, wave strength fades with
            distance from origin.
          </li>
          <li>
            <b>Decay Factor</b>: How quickly amplitude decays with distance.
          </li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>origin</b> — (x, y) center of the ripple. Use &quot;Select Position&quot; to set on canvas.</li>
          <li><b>waveSpeed</b> — How fast the wave travels outward (units/sec).</li>
          <li><b>wavelength</b> — Distance between wave peaks.</li>
          <li><b>amplitude</b> — Maximum position offset from the wave.</li>
          <li><b>decayWithDistance</b> — When on, wave strength fades with distance.</li>
          <li><b>decayFactor</b> — How quickly amplitude decays with distance.</li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>Water ripples, shockwaves, sonar pings.</li>
          <li>Impact or explosion waves.</li>
        </ul>
      </div>
    </>
  );
};

export default RippleDescription;

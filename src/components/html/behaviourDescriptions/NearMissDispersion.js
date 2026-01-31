import { useRef } from "react";

const NearMissDispersionDescription = () => {
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
          <b>Near-Miss Dispersion Behaviour</b> scatters particles when
          triggered, simulating a near-miss effect. Particles that were
          converging toward a target suddenly disperse in a configurable
          direction—ideal for slot reels, shooting games, or any scenario where
          a near-miss should create a burst of particles.
        </p>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behaviour on or off.
          </li>
          <li>
            <b>Priority</b>: Execution order relative to other behaviours.
          </li>
          <li>
            <b>Triggered</b>: Set to true at runtime to trigger dispersion.
            Particles scatter based on scatter angle and strength.
          </li>
          <li>
            <b>Scatter Angle</b>: Direction of dispersion in radians (e.g. 1.57
            ≈ 90°).
          </li>
          <li>
            <b>Scatter Strength</b>: Base magnitude of the scatter velocity
            (units per second).
          </li>
          <li>
            <b>Scatter Variance</b>: Random variation added to scatter strength
            for natural variation.
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>triggered</b> — Set true at runtime to trigger dispersion.</li>
          <li><b>scatterAngle</b> — Direction of dispersion (radians).</li>
          <li><b>scatterStrength</b> — Base magnitude of scatter velocity.</li>
          <li><b>scatterVariance</b> — Random variation in scatter strength.</li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>Slot reel near-miss effects.</li>
          <li>Shooting games where projectiles narrowly miss.</li>
          <li>Any near-miss or failure state with particle feedback.</li>
        </ul>
      </div>
    </>
  );
};

export default NearMissDispersionDescription;

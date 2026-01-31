import { useRef } from "react";

const MagnetDescription = () => {
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
          <b>Magnet Behaviour</b> pulls particles toward a point when they are
          within a radius. Classic &quot;coin magnet&quot; or pickup collection
          feel in games.
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
            <b>Magnet center</b>: Magnet position (x, y). Use &quot;Select Position&quot; to set by clicking on the canvas; update at runtime for e.g. player position.
          </li>
          <li>
            <b>Radius</b>: Distance within which particles are pulled.
          </li>
          <li>
            <b>Strength</b>: Pull acceleration when at center.
          </li>
          <li>
            <b>Falloff Exponent</b>: 1 = linear, 2 = stronger near center.
          </li>
          <li>
            <b>Max Speed</b>: Cap speed when being pulled (0 = no limit).
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>center</b> — (x, y) magnet position. Use &quot;Select Position&quot; to set on canvas.</li>
          <li><b>radius</b> — Distance within which particles are pulled.</li>
          <li><b>strength</b> — Pull acceleration at center.</li>
          <li><b>falloffExponent</b> — 1 = linear, 2 = stronger near center.</li>
          <li><b>maxSpeed</b> — Cap speed when pulled (0 = no limit).</li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>Coin/collectible magnet in games.</li>
          <li>Pickups flying to the player.</li>
        </ul>
      </div>
    </>
  );
};

export default MagnetDescription;

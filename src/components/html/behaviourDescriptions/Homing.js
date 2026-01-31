import { useRef } from "react";

const HomingDescription = () => {
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
          <b>Homing Behaviour</b> steers particles toward a target point over
          time. Ideal for homing missiles, collectibles flying to the player,
          or guided projectiles.
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
            <b>Target</b>: World position (x, y) to steer toward. Use &quot;Select Position&quot; to set by clicking on the canvas; update at runtime for e.g. player position.
          </li>
          <li>
            <b>Strength</b>: How strongly velocity is steered per second.
          </li>
          <li>
            <b>Max Speed</b>: Optional speed clamp (0 = no limit).
          </li>
          <li>
            <b>Delay</b>: Seconds before homing starts (0 = immediate).
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>target</b> — (x, y) position to steer toward. Use &quot;Select Position&quot; to set on canvas.</li>
          <li><b>strength</b> — How strongly velocity is steered per second.</li>
          <li><b>maxSpeed</b> — Optional speed clamp (0 = no limit).</li>
          <li><b>delay</b> — Seconds before homing starts (0 = immediate).</li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>Homing projectiles, smart missiles.</li>
          <li>Collectibles flying to the player.</li>
        </ul>
      </div>
    </>
  );
};

export default HomingDescription;

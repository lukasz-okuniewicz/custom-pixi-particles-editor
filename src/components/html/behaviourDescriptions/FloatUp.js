import { useRef } from "react";

const FloatUpDescription = () => {
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
          <b>Float Up Behaviour</b> adds a constant drift (e.g. upward) and
          optional fade-out over life. Perfect for damage numbers, floating
          text, rising sparks, or floating collectible hints.
        </p>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behaviour on or off.
          </li>
          <li>
            <b>Priority</b>: Execution order relative to other behaviours (use
            negative value to run after position/velocity updates).
          </li>
          <li>
            <b>Direction</b>: Drift angle in degrees (0 = right, 90 = up).
          </li>
          <li>
            <b>Speed</b>: Drift speed in units per second.
          </li>
          <li>
            <b>Fade Out</b>: Alpha fades to 0 over particle life.
          </li>
          <li>
            <b>Shrink Over Life</b>: Size interpolates toward end size.
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>direction</b> — Drift angle in degrees (0 = right, 90 = up).</li>
          <li><b>speed</b> — Drift speed (units per second).</li>
          <li><b>fadeOut</b> — Alpha fades to 0 over particle life.</li>
          <li><b>shrinkOverLife</b> — Size interpolates toward end size.</li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>Damage numbers, floating text.</li>
          <li>Rising sparks, embers, bubbles.</li>
        </ul>
      </div>
    </>
  );
};

export default FloatUpDescription;

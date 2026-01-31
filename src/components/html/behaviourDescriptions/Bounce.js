import { useRef } from "react";

const BounceDescription = () => {
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
          <b>Bounce Behaviour</b> makes particles bounce off rectangular or
          circular bounds. Use for breakout-style games, pinball, ball physics,
          or contained particle effects.
        </p>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behaviour on or off.
          </li>
          <li>
            <b>Priority</b>: Determines the execution order relative to other
            behaviours (higher runs first).
          </li>
          <li>
            <b>Mode</b>: <code>rectangle</code> = box bounds (min/max X/Y),{" "}
            <code>circle</code> = circular boundary.
          </li>
          <li>
            <b>Rectangle Mode</b>: <code>minX</code>, <code>maxX</code>,{" "}
            <code>minY</code>, <code>maxY</code> define the bounding box edges.
          </li>
          <li>
            <b>Circle Mode</b>: <code>Circle center</code> (x, y) and <code>radius</code>{" "}
            define the circular boundary. Use &quot;Select Position&quot; to set center by clicking on the canvas.
          </li>
          <li>
            <b>Bounciness</b>: 0-1 (1 = full bounce, 0 = stick).
          </li>
          <li>
            <b>Max Bounces</b>: Kill particle after N bounces (-1 = infinite).
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>mode</b> — &quot;rectangle&quot; (box) or &quot;circle&quot;.</li>
          <li><b>minX</b>, <b>maxX</b>, <b>minY</b>, <b>maxY</b> — Bounding box (rectangle mode).</li>
          <li><b>center</b> (x, y), <b>radius</b> — Circle boundary (circle mode). Use &quot;Select Position&quot; to set center on canvas.</li>
          <li><b>bounciness</b> — 0-1 (1 = full bounce, 0 = stick).</li>
          <li><b>maxBounces</b> — Kill after N bounces (-1 = infinite).</li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>Breakout, pinball, ball games.</li>
          <li>Confined sparks, dust, or debris.</li>
        </ul>
      </div>
    </>
  );
};

export default BounceDescription;

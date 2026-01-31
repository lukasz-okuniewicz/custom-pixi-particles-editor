import { useRef } from "react";

const ConstrainToShapeDescription = () => {
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
          <b>Constrain To Shape Behaviour</b> keeps particle positions inside a
          circle or rectangle. You can use soft blending at the boundary and
          optional bounce so particles don&apos;t leave the area.
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
            <b>Shape Type</b>: <code>circle</code> or <code>rectangle</code>.
          </li>
          <li>
            <b>Shape center</b>: (x, y) center of the shape. Use &quot;Select Position&quot; to set by clicking on the canvas.
          </li>
          <li>
            <b>Radius</b>: (Circle) radius of the circle.
          </li>
          <li>
            <b>Half Width / Half Height</b>: (Rectangle) half-extents from
            center.
          </li>
          <li>
            <b>Softness</b>: 0 = hard clamp at boundary, 1 = full soft blend
            (weaker pull).
          </li>
          <li>
            <b>Bounce</b>: When on, velocity is reflected at the boundary for a
            bounce effect.
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>shapeType</b> — &quot;circle&quot; or &quot;rectangle&quot;.</li>
          <li><b>center</b> — (x, y) center of the shape. Use &quot;Select Position&quot; to set by clicking on the canvas.</li>
          <li><b>radius</b> — (Circle) radius.</li>
          <li><b>halfWidth</b>, <b>halfHeight</b> — (Rectangle) half-extents.</li>
          <li><b>softness</b> — 0 = hard clamp, 1 = soft blend.</li>
          <li><b>bounce</b> — When on, velocity reflected at boundary.</li>
        </ul>

        <h4>Use Cases:</h4>
        <ul>
          <li>Particles confined to a logo, cursor, or UI region.</li>
          <li>Contained explosions or bursts.</li>
        </ul>
      </div>
    </>
  );
};

export default ConstrainToShapeDescription;

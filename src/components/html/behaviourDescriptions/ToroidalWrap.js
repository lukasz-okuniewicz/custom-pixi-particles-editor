import { useRef } from "react";

const ToroidalWrapDescription = () => {
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
          <b>Toroidal Wrap Behaviour</b> moves particles that leave a rectangle so
          they re-enter on the opposite side (screen wrapping / endless torus).
          Ideal for starfields, ambient loops, and effects that should never hit
          a hard edge.
        </p>
        <h4>Execution order</h4>
        <p>
          Runs <b>after</b> <code>PositionBehaviour</code> (default priority 45 vs
          100). It updates both <code>x</code>/<code>y</code> and{" "}
          <code>movement</code> so motion stays consistent.
        </p>
        <h4>Conflicts</h4>
        <p>
          Do not combine with <b>Bounce Behaviour</b> on the same axis — bounce
          clamps to edges while wrap teleports across them.
        </p>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behaviour on or off.
          </li>
          <li>
            <b>Priority</b>: Execution order relative to other behaviours (higher
            runs first).
          </li>
          <li>
            <b>Wrap X / Wrap Y</b>: Enable wrapping on each axis (e.g. vertical-only
            drift with wrap Y only).
          </li>
          <li>
            <b>Use canvas size (auto bounds)</b>: Uses the current render buffer
            size (centered: ±half width / ±half height in particle space). In this
            editor the preview passes size automatically; in your game, pass{" "}
            <code>canvasSizeProvider</code> when creating the renderer if you use
            this option.
          </li>
          <li>
            <b>Min X / Max X / Min Y / Max Y</b>: Manual axis-aligned bounds when
            canvas size is off (same coordinate space as particle positions).
          </li>
          <li>
            <b>Inset</b>: Shrinks the effective rectangle inward on all sides —
            useful so large sprites fully leave the view before reappearing.
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li>
            <b>enabled</b> — Turn the behaviour on or off.
          </li>
          <li>
            <b>priority</b> — Execution order (higher runs first).
          </li>
          <li>
            <b>wrapX</b>, <b>wrapY</b> — Per-axis wrap toggles.
          </li>
          <li>
            <b>useCanvasBounds</b> — Use automatic canvas-sized bounds.
          </li>
          <li>
            <b>minX</b>, <b>maxX</b>, <b>minY</b>, <b>maxY</b> — Manual bounds (when
            not using canvas size).
          </li>
          <li>
            <b>inset</b> — Inward margin from those bounds.
          </li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>Starfields, dust, and “infinite space” ambient particles.</li>
          <li>Effects that should stay on-screen count without spawning new particles.</li>
        </ul>
      </div>
    </>
  );
};

export default ToroidalWrapDescription;

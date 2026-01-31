import { useRef } from "react";

const WobbleDescription = () => {
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
          <b>Wobble Behaviour</b> adds a per-particle sine-wave offset to
          position (and optionally rotation), giving a jelly-like or bouncy
          motion. Each particle gets a random phase so they don&apos;t move in
          sync.
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
            <b>Frequency</b>: Cycles per second of the wobble.
          </li>
          <li>
            <b>Amplitude X / Amplitude Y</b>: Maximum position offset in x and
            y.
          </li>
          <li>
            <b>Wobble Rotation</b>: When on, adds a sine-wave rotation offset.
          </li>
          <li>
            <b>Rotation Amplitude</b>: Strength of the rotation wobble
            (radians).
          </li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>frequency</b> — Wobble cycles per second.</li>
          <li><b>amplitudeX</b>, <b>amplitudeY</b> — Max position offset in x and y.</li>
          <li><b>wobbleRotation</b> — When on, add sine-wave rotation offset.</li>
          <li><b>rotationAmplitude</b> — Strength of rotation wobble (radians).</li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>Jelly, bubbles, bouncy UI elements.</li>
          <li>Organic, non-rigid motion.</li>
        </ul>
      </div>
    </>
  );
};

export default WobbleDescription;

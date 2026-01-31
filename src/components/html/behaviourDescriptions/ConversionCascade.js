import { useRef } from "react";

const ConversionCascadeDescription = () => {
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
          <b>Conversion Cascade Behaviour</b> moves particles from a source
          point to a target point when conversion is active. Ideal for
          chip-to-credit effects, multiplier application, or any visual flow
          representing value transfer.
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
            <b>Active</b>: When true, particles flow from source to target. Set
            at runtime to trigger the cascade.
          </li>
          <li>
            <b>Source</b>: (x, y) starting position for particle flow. Use &quot;Select Position&quot; to set by clicking on the canvas.
          </li>
          <li>
            <b>Target</b>: (x, y) destination position for particle flow. Use &quot;Select Position&quot; to set by clicking on the canvas.
          </li>
          <li>
            <b>Speed</b>: Rate at which particles travel from source to target
            (units per second).
          </li>
          <li>
            <b>Kill On Arrival</b>: When true, particles are removed once they
            reach the target.
          </li>
          <li>
            <b>Arrival Threshold</b>: Distance from target within which a
            particle is considered to have arrived.
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>active</b> — When true, particles flow from source to target (set at runtime).</li>
          <li><b>source</b> — (x, y) starting position. Use &quot;Select Position&quot; to set on canvas.</li>
          <li><b>target</b> — (x, y) destination. Use &quot;Select Position&quot; to set on canvas.</li>
          <li><b>speed</b> — Units per second from source to target.</li>
          <li><b>killOnArrival</b> — When true, remove particles on arrival.</li>
          <li><b>arrivalThreshold</b> — Distance from target to count as arrived.</li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>Chip-to-credit, multiplier, or jackpot animations.</li>
          <li>Value transfer or conversion visual feedback.</li>
        </ul>
      </div>
    </>
  );
};

export default ConversionCascadeDescription;

import { useRef } from "react";

const TrailDescription = () => {
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
          <b>Trail Behaviour</b> modulates particle alpha (and optionally scale)
          based on recent speed: faster particles stay brighter/larger, slower
          ones dimmer/smaller. This gives a comet-tail or motion-blur feel
          without extra draw calls.
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behaviour on or off.
          </li>
          <li>
            <b>Priority</b>: Runs after color/size (negative value) so it
            modulates the final result.
          </li>
          <li>
            <b>Min Alpha / Max Alpha</b>: Alpha multiplier at zero speed (tail)
            and at max speed (head). e.g. 0.2 and 1.
          </li>
          <li>
            <b>Speed For Max Alpha</b>: Speed (units per second) above which
            Max Alpha is used.
          </li>
          <li>
            <b>Scale By Speed</b>: When on, scale is also modulated by speed.
          </li>
          <li>
            <b>Min Scale / Max Scale</b>: Scale multiplier at zero vs max
            speed when Scale By Speed is on.
          </li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>minAlpha</b>, <b>maxAlpha</b> — Alpha multiplier at zero vs max speed.</li>
          <li><b>speedForMaxAlpha</b> — Speed above which maxAlpha is used.</li>
          <li><b>scaleBySpeed</b> — When on, scale modulated by speed.</li>
          <li><b>minScale</b>, <b>maxScale</b> — Scale multiplier at zero vs max speed.</li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>Comet tails, motion blur, speed-based fade.</li>
          <li>Emphasizing fast-moving particles.</li>
        </ul>
      </div>
    </>
  );
};

export default TrailDescription;

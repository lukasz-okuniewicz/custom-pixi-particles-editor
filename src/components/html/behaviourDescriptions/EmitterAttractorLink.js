import { useRef } from "react";

const EmitterAttractorLinkDescription = () => {
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
          <b>Emitter Attractor Link</b> pulls particles toward a target point in
          world space with spring-like steering—useful when particles should
          follow another entity (another emitter transform, a character, a
          cursor). Drive <b>targetX</b> and <b>targetY</b> from gameplay each
          frame; use <b>Active</b> to enable or disable the pull without removing
          the behaviour.
        </p>
        <h4>Key properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Whether this behaviour runs at all.
          </li>
          <li>
            <b>Active</b>: When off, the attractor does not apply forces (handy
            for toggling follow without losing settings).
          </li>
          <li>
            <b>Priority</b>: Order relative to other behaviours.
          </li>
          <li>
            <b>Target</b>: Attraction point (X, Y) in world space.
          </li>
          <li>
            <b>Strength</b>: How strongly particles are pulled toward the target.
          </li>
          <li>
            <b>Falloff</b>: Distance-dependent damping (higher values soften the
            pull farther from the target, depending on implementation).
          </li>
          <li>
            <b>Axis mask</b>: Bit mask restricting which axes receive force:{" "}
            <code>1</code> = X only, <code>2</code> = Y only, <code>3</code> =
            both.
          </li>
        </ul>
      </div>
    </>
  );
};

export default EmitterAttractorLinkDescription;

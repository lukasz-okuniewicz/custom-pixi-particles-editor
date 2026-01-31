import { useRef } from "react";

const TimelineDescription = () => {
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
          <b>Timeline Behaviour</b> provides advanced control over the evolution
          of particles&apos; properties throughout their lifecycle. By defining
          a series of keyframes, users can orchestrate complex animations and
          transitions for properties like size, color, and rotation.
        </p>

        <h4>Key Features:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggles the behavior on or off.
          </li>
          <li>
            <b>Priority</b>: Determines the order in which this behavior is
            executed relative to others.
          </li>
          <li>
            <b>Timeline</b>: Define keyframes that specify particle properties
            at different points in their lifecycle (time range: 0-1).
          </li>
          <li>
            <b>Size Evolution</b>: Adjust particle size dynamically across
            keyframes for gradual growth or shrinkage.
          </li>
          <li>
            <b>Color Animation</b>: Modify particle color (including alpha
            transparency) over time to create fading or blending effects.
          </li>
          <li>
            <b>Rotation Control</b>: Apply rotational changes in degrees for
            spinning or directional effects.
          </li>
          <li>
            <b>Smooth Transitions</b>: Ensures seamless animations using linear
            interpolation between keyframes.
          </li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>timeline</b> — Array of keyframes. Each keyframe: time (0-1), and optionally size (x, y), color (r, g, b, alpha), rotation (degrees). Properties are interpolated between keyframes.</li>
        </ul>
        <h4>How It Works:</h4>
        <p>
          The behavior calculates a particle&apos;s current lifecycle progress
          and applies the properties defined in the closest surrounding
          keyframes. If the particle&apos;s lifecycle falls between two
          keyframes, the properties are interpolated to create a smooth
          transition.
        </p>

        <h4>Use Cases:</h4>
        <ul>
          <li>Create gradual size and color changes for particles.</li>
          <li>Design spinning particles with precise rotational controls.</li>
          <li>Orchestrate complex animations for lifelike visual effects.</li>
        </ul>

        <h4>Live Examples:</h4>
        <span>
          <a href="/?effect=timeline" target="_blank">
            Timeline Animation
          </a>
        </span>
      </div>
    </>
  );
};

export default TimelineDescription;

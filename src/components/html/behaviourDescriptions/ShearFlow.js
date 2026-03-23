import { useRef } from "react";

const ShearFlowDescription = () => {
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
          <b>Shear Flow</b> applies a linear shear transform to particle
          velocity around a pivot, producing streaky, fluid-like motion (one axis
          drags another). Optional radius limits the effect to a local region;
          oscillation modulates the shear over time. <b>Blend with velocity</b>{" "}
          mixes this with existing motion instead of replacing it outright.
          Higher-priority behaviours run before position integration—set
          priority to interact correctly with Position and other forces.
        </p>
        <h4>Key properties:</h4>
        <ul>
          <li>
            <b>Enabled / Priority</b>: Toggle and ordering relative to other
            behaviours.
          </li>
          <li>
            <b>Pivot</b>: Origin point for the shear in world space.
          </li>
          <li>
            <b>Shear Y→X (shearYX)</b>: How much vertical offset affects
            horizontal velocity (and vice versa per axis convention in the
            engine).
          </li>
          <li>
            <b>Shear X→Y (shearXY)</b>: Coupling in the complementary direction.
          </li>
          <li>
            <b>Radius (0 = global)</b>: If greater than zero, shear may fall
            off with distance from the pivot; zero applies everywhere.
          </li>
          <li>
            <b>Oscillation Hz</b>: When non-zero, oscillates the shear for
            pulsing or wavy flow.
          </li>
          <li>
            <b>Blend with velocity</b>: 0–1 mix between the shear result and the
            incoming velocity.
          </li>
        </ul>
      </div>
    </>
  );
};

export default ShearFlowDescription;

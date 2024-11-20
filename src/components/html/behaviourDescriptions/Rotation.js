import { useRef } from "react";

const RotationDescription = () => {
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
      <span className="explanation" ref={contentRef}>
        <span>
          <b>Rotation Behaviour</b> in a particle system define how particles
          change their angle over time:
        </span>
        Key Properties:
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behavior on or off.
          </li>
          <li>
            <b>Priority</b>: Set execution order if multiple behaviors are
            applied.
          </li>
          <li>
            <b>Rotation</b>: The speed at which a particle&apos;s angle changes,
            measured in degrees or radians per second.
          </li>
          <li>
            <b>Rotation Variance</b>: Adds randomness to the rotation speed,
            creating variations in how particles spin.
          </li>
        </ul>
        <span>
          These settings add dynamic motion and visual complexity, simulating
          effects like spinning sparks, rotating debris, or swirling leaves.
        </span>
      </span>
    </>
  );
};

export default RotationDescription;

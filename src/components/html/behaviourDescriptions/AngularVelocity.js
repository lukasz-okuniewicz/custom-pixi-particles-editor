import { useRef } from "react";

const AngularVelocityDescription = () => {
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
          <b>Angular Velocity</b> in a particle system controls the rotation
          speed of particles, measured in degrees or radians per second. It
          determines how quickly particles spin around their center, adding
          dynamic effects like swirling, tumbling, or rotational motion to
          enhance visual complexity and realism.
        </span>
        <ul>
          <li>
            <b>Degrees</b>: Specifies the speed of rotation in degrees per
            second.
          </li>
          <li>
            <b>Degrees Variance</b>: Adds randomness to the rotation speed,
            creating variation in how particles spin.
          </li>
          <li>
            <b>Max/Min Radius</b>: Sets the initial and final distance of the
            particle from the center.
          </li>
          <li>
            <b>Radius Variance</b>: Introduces randomness to the starting and
            ending radii.
          </li>
        </ul>
        <span>
          This behavior determines how particles orbit a central point, with
          their radius and speed changing over their lifetime. It creates
          effects like spirals, circular motions, or orbiting particles.
        </span>
        <span>
          <a href="https://okuniewicz.eu/?effect=twist" target="_blank">
            Example
          </a>
        </span>
      </span>
    </>
  );
};

export default AngularVelocityDescription;

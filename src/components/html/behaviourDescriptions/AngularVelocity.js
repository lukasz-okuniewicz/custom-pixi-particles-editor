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
          <b>Angular Velocity Behaviour</b> provides advanced rotational control
          for particles, allowing them to orbit dynamically while adjusting
          their radius and angular velocity. It introduces enhanced features
          such as oscillation, dynamic radius changes, and linear or exponential
          radius reduction, making it ideal for complex and dynamic particle
          effects.
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
            <b>Degrees</b>: Define the rotation speed in degrees per second.
          </li>
          <li>
            <b>Degrees Variance</b>: Add randomness to the rotation speed.
          </li>
          <li>
            <b>Max Radius</b>: Set the starting radius of the orbit.
          </li>
          <li>
            <b>Max Radius Variance</b>: Introduce variation in the initial
            radius.
          </li>
          <li>
            <b>Min Radius</b>: Define the radius at the end of the particle’s
            lifecycle.
          </li>
          <li>
            <b>Min Radius Variance</b>: Add randomness to the final radius.
          </li>
          <li>
            <b>Oscillation</b>:
            <ul>
              <li>
                <b>Enabled</b>: Toggle oscillation of angular velocity.
              </li>
              <li>
                <b>Speed</b>: Define how fast the oscillation occurs.
              </li>
              <li>
                <b>Amplitude</b>: Control the intensity of oscillation in
                degrees.
              </li>
            </ul>
          </li>
          <li>
            <b>Radius Reduction</b>:
            <ul>
              <li>
                <b>Linear</b>: Reduce radius smoothly over the particle’s
                lifecycle.
              </li>
              <li>
                <b>Exponential</b>: Create a sharper radius reduction with a
                non-linear approach.
              </li>
            </ul>
          </li>
          <li>
            <b>Dynamic Radius</b>: Enable real-time changes to the radius for
            complex effects.
          </li>
        </ul>
        <span>
          The Angular Velocity Behaviour is a versatile tool for designing
          particles with rotational dynamics, offering rich customization to
          suit a variety of creative and interactive applications.
        </span>
        <span>
          <a href="/?effect=twist" target="_blank">
            Example
          </a>
          <br />
          <a href="/?effect=angularVelocity" target="_blank">
            Angular Velocity
          </a>
        </span>
      </span>
    </>
  );
};

export default AngularVelocityDescription;

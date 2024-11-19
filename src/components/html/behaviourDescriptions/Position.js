import { useRef } from "react";

const PositionDescription = () => {
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
          <b>Position properties</b> in a particle system control how particles
          move and interact in space:
        </span>
        <ul>
          <li>
            <b>Position, Velocity, and Gravity (with Variances)</b>: Define the
            starting position, speed, and acceleration due to gravity for
            particles, with variances adding randomness to create dynamic
            motion.
          </li>
          <li>
            <b>Sin/Cos/Tan Motion</b>: Enable sinusoidal movement along the X or
            Y axis for wave-like trajectories.
          </li>
          <li>
            <b>Point A to Point B Movement</b>: Allows particles to travel
            between two points with adjustable easing functions (sin, cos, tan
            for X/Y), duration, and amplitude. You can also enable a return to
            Point A for oscillating effects. This requires coordinating particle
            lifetimes with movement durations.
          </li>
          <li>
            <b>Warp Effect</b>: Overrides all other position settings to
            simulate fast, perspective-based motion. Adjustable parameters
            include:
            <ul>
              <li>
                <b>Speed/Base Speed</b>: Controls motion intensity.
              </li>
              <li>
                <b>Camera Z Converter and FOV</b>: Adjust perspective and depth.
              </li>
              <li>
                <b>Stretch</b>: Elongates particles along their movement path.
              </li>
              <li>
                <b>Distance Scale Converter</b>: Modifies scaling based on
                distance.
              </li>
            </ul>
          </li>
        </ul>
        <span>
          These properties provide diverse control for creating complex and
          visually appealing particle behaviors.
        </span>
      </span>
    </>
  );
};

export default PositionDescription;

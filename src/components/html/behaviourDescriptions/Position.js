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
          <b>Position Behaviour</b> provides a powerful framework for
          controlling particle movement through velocity, acceleration,
          sinusoidal motion, and advanced warp effects. It allows particles to
          traverse between points, follow sinusoidal paths, or simulate
          depth-based warp effects for dynamic and visually rich animations.
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
            <b>Warp Settings</b>: Control warp speed, FOV, stretch, and distance
            scaling.
          </li>
          <li>
            <b>Motion Settings</b>: Configure velocity, acceleration, and their
            variances.
          </li>
          <li>
            <b>Sinusoidal Motion</b>: Enable and configure sinusoidal movement
            along the X and/or Y axes.
          </li>
          <li>
            <b>Point-to-Point Motion:</b>:
            <ul>
              <li>
                <b>Point A & B</b>: Define the start and end points.
              </li>
              <li>
                <b>Durations & Amplitudes</b>: Set durations and amplitudes for
                the &quot;there&quot; and &quot;back&quot; motions.
              </li>
              <li>
                <b>Easing Curves</b>: Choose custom easing functions for smooth
                transitions.
              </li>
            </ul>
          </li>
        </ul>
        <span>
          The Position Behaviour is ideal for users seeking comprehensive
          control over particle motion, offering versatile features to create
          intricate and dynamic animations with ease.
        </span>
      </span>
    </>
  );
};

export default PositionDescription;

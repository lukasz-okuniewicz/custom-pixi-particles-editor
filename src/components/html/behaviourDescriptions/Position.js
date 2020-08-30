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
      <div className="explanation" ref={contentRef}>
        <p>
          <b>Position Behaviour</b> enables precise control over particle
          movement, offering a wide range of motion patterns such as velocity
          and acceleration-based movement, sinusoidal motion, and point-to-point
          traversal. It also supports advanced effects like depth-based warp for
          realistic animations.
        </p>

        <h4>Key Features:</h4>
        <ul>
          <li>
            <b>Priority:</b> Define the execution order when multiple behaviors
            are applied.
          </li>
          <li>
            <b>Warp Motion:</b>
            <ul>
              <li>
                Configure warp effects with speed, field of view (FOV), and
                stretch.
              </li>
              <li>
                Simulate depth with distance scaling and center-based warps.
              </li>
            </ul>
          </li>
          <li>
            <b>Velocity and Acceleration:</b>
            <ul>
              <li>Set linear motion parameters with adjustable variances.</li>
              <li>Add dynamic motion effects through acceleration settings.</li>
            </ul>
          </li>
          <li>
            <b>Sinusoidal Motion:</b>
            <ul>
              <li>Enable oscillation along X and/or Y axes.</li>
              <li>Customize oscillation amplitude and frequency.</li>
            </ul>
          </li>
          <li>
            <b>Point-to-Point Motion:</b>
            <ul>
              <li>Define start and end points (A to B).</li>
              <li>
                Support bidirectional traversal with configurable durations and
                amplitudes.
              </li>
              <li>
                Apply custom easing curves (e.g., bounce, elastic) for smooth
                transitions.
              </li>
            </ul>
          </li>
        </ul>

        <h4>How It Works:</h4>
        <p>
          Particles are initialized with position, velocity, and optional warp
          or sinusoidal settings. During each frame, the position is updated
          based on velocity, acceleration, and any applied effects. For
          point-to-point motion, particles interpolate between defined points
          using easing curves, enabling smooth and natural transitions.
        </p>

        <h4>Use Cases:</h4>
        <ul>
          <li>Simulating warp effects in space or depth-based animations.</li>
          <li>
            Creating oscillating motion for particles like waves or fluttering
            objects.
          </li>
          <li>Defining trajectories for particles in structured systems.</li>
          <li>Animating particles traveling back and forth between points.</li>
        </ul>

        <h4>Live Examples:</h4>
        <ul>
          <li>
            <a href="/?effect=warpTrail" target="_blank">
              Warp Trail Effect
            </a>
          </li>
          <li>
            <a href="/?effect=sinusoidalMotion" target="_blank">
              Sinusoidal Motion
            </a>
          </li>
          <li>
            <a href="/?effect=pointToPoint" target="_blank">
              Point-to-Point Animation
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PositionDescription;

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

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Priority</b>: Define the execution order when multiple behaviours
            are applied.
          </li>
          <li>
            <b>Velocity & Velocity Variance</b>: Initial linear motion (x, y)
            with optional randomness.
          </li>
          <li>
            <b>Acceleration & Acceleration Variance</b>: Change in velocity over
            time for dynamic motion.
          </li>
          <li>
            <b>Position & Position Variance</b>: Spawn position offset (used with
            warp mode).
          </li>
        </ul>

        <h4>Warp Motion:</h4>
        <ul>
          <li>
            <b>Warp</b>: Enable depth-based warp effect (e.g. starfield).
          </li>
          <li>
            <b>Warp Speed, Warp Base Speed</b>: Speed of warp animation.
          </li>
          <li>
            <b>Warp FOV, Warp Stretch</b>: Field of view and stretch for depth
            effect.
          </li>
          <li>
            <b>Warp Distance Scale Converter, Warp Distance To Center</b>: Depth
            scaling and center-based warp options.
          </li>
          <li>
            <b>Camera Z Converter</b>: Converts z-depth for perspective.
          </li>
        </ul>

        <h4>Sinusoidal Motion:</h4>
        <ul>
          <li>
            <b>Sin X, Sin Y</b>: Enable oscillation along X and/or Y axes.
          </li>
          <li>
            <b>Sin X Value, Sin Y Value</b>: Amplitude (x = amplitude, y =
            frequency).
          </li>
          <li>
            <b>Sin X Variance, Sin Y Variance</b>: Random variation for amplitude
            and frequency.
          </li>
        </ul>

        <h4>Point-to-Point Motion (From A to B):</h4>
        <ul>
          <li>
            <b>From A To B</b>: Enable point-to-point traversal.
          </li>
          <li>
            <b>Point A, Point B</b>: Start and end coordinates.
          </li>
          <li>
            <b>From A To B Two Ways</b>: Bidirectional (A→B→A); off = one-way.
          </li>
          <li>
            <b>There Duration, There Amplitude</b>: Time and amplitude for A→B
            leg (min/max for variance).
          </li>
          <li>
            <b>Back Duration, Back Amplitude</b>: Time and amplitude for B→A leg.
          </li>
          <li>
            <b>There, Back</b>: Per-axis function (Sin, Cos, Tan) and easing
            (power1, bounce, elastic, etc.).
          </li>
          <li>
            <b>From A To B One Way</b>: One-way only (no return).
          </li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>spawnType</b> — Spawn shape (Rectangle, Frame, Ring, etc.).</li>
          <li><b>radius</b> — Radius for spawn (e.g. Ring).</li>
          <li><b>warp</b> — Enable depth-based warp (e.g. starfield).</li>
          <li><b>warpSpeed</b>, <b>warpBaseSpeed</b> — Warp animation speed.</li>
          <li><b>sinX</b>, <b>sinY</b> — Enable sinusoidal motion on X/Y.</li>
          <li><b>sinXVal</b>, <b>sinYVal</b> — Amplitude and frequency (x, y).</li>
          <li><b>sinXValVariance</b>, <b>sinYValVariance</b> — Variance for sin values.</li>
          <li><b>position</b>, <b>positionVariance</b> — Spawn position offset (x, y).</li>
          <li><b>velocity</b>, <b>velocityVariance</b> — Initial velocity (x, y).</li>
          <li><b>acceleration</b>, <b>accelerationVariance</b> — Acceleration (x, y).</li>
          <li><b>cameraZConverter</b>, <b>warpFov</b>, <b>warpStretch</b>, <b>warpDistanceScaleConverter</b>, <b>warpDistanceToCenter</b> — Warp/depth options.</li>
          <li><b>fromAtoB</b>, <b>fromAtoBTwoWays</b>, <b>fromAtoBOneWay</b> — Point-to-point mode.</li>
          <li><b>pointA</b>, <b>pointB</b> — Start and end points (x, y).</li>
          <li><b>thereDuration</b>, <b>backDuration</b> — Duration for A→B and B→A (min/max).</li>
          <li><b>thereAmplitude</b>, <b>backAmplitude</b> — Amplitude for each leg (min/max).</li>
          <li><b>there</b>, <b>back</b> — Per-axis function (Sin, Cos, Tan) and easing.</li>
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

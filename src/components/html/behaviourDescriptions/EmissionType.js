import { useRef } from "react";

const EmissionTypeDescription = () => {
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
        <span>
          <b>Emission type properties</b> in a particle system control how
          particles are emitted over time. Available emitter modes:
        </span>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Uniform Emission</b>: Particles are emitted at a consistent rate.
            <ul>
              <li>
                <b>Emit/Sec</b>: Number of particles emitted per second.
              </li>
              <li>
                <b>Duration</b>: How long the emission lasts.
              </li>
            </ul>
          </li>
          <li>
            <b>Standard Emission</b>: Particles are emitted at a defined rate,
            up to a maximum count.
            <ul>
              <li>
                <b>Max Particles</b>: Total number of particles that can exist
                simultaneously.
              </li>
              <li>
                <b>Emission Rate</b>: Speed of particle generation.
              </li>
              <li>
                <b>Duration</b>: How long the emission lasts.
              </li>
            </ul>
          </li>
          <li>
            <b>Random Emission</b>: Particles are emitted with a randomized
            pattern.
            <ul>
              <li>
                <b>Max Particles</b>: Maximum number of particles at any time.
              </li>
              <li>
                <b>Emission Rate</b>: Rate of particle generation with
                randomness.
              </li>
              <li>
                <b>Duration</b>: Length of the emission period.
              </li>
              <li>
                <b>Seed (optional)</b>: Makes randomness deterministic and
                repeatable.
              </li>
            </ul>
          </li>
          <li>
            <b>Persistent Fill Emission</b>: Fills up to max particle capacity
            and then idles.
            <ul>
              <li>
                <b>Max Particles</b>: Target number of live particles to fill.
              </li>
              <li>
                <b>Burst Per Frame</b>: How quickly the pool is filled each
                frame.
              </li>
              <li>
                <b>Duration</b>: Usually set to -1 for persistent pools.
              </li>
            </ul>
          </li>
          <li>
            <b>Burst Schedule Emission</b>: Emits bursts at intervals.
            <ul>
              <li>
                <b>Max Particles</b>: Capacity limit while bursting.
              </li>
              <li>
                <b>Burst Count</b>: Particles emitted per burst.
              </li>
              <li>
                <b>Cooldown</b>: Delay between bursts (seconds).
              </li>
              <li>
                <b>Jitter</b>: Randomizes cooldown timing (0 to 1).
              </li>
              <li>
                <b>Duration</b>: Total active emission time.
              </li>
            </ul>
          </li>
          <li>
            <b>Curve Emission</b>: Samples emission rate from a timeline curve.
            <ul>
              <li>
                <b>Max Particles</b>: Capacity limit.
              </li>
              <li>
                <b>Curve Duration</b>: Time used to traverse the curve.
              </li>
              <li>
                <b>Loop</b>: Repeats curve timeline when enabled.
              </li>
              <li>
                <b>Curve Points (JSON)</b>: Pairs of
                <code> [time0to1, emitPerSecond] </code>.
              </li>
              <li>
                <b>Duration</b>: Total active emission time.
              </li>
            </ul>
          </li>
        </ul>
        <span>
          If Duration = -1, the emission continues indefinitely. These options
          allow for precise control of particle flow, from steady streams to
          bursts and randomized patterns.
        </span>
      </div>
    </>
  );
};

export default EmissionTypeDescription;

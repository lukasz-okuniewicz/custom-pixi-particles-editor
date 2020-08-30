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
      <span className="explanation" ref={contentRef}>
        <span>
          <b>Emission type properties</b> in a particle system control how
          particles are emitted over time. There are three types:
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
            </ul>
          </li>
        </ul>
        <span>
          If Duration = -1, the emission continues indefinitely. These options
          allow for precise control of particle flow, from steady streams to
          bursts and randomized patterns.
        </span>
      </span>
    </>
  );
};

export default EmissionTypeDescription;

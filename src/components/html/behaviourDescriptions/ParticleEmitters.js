import { useRef } from "react";

const ParticleEmittersDescription = () => {
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
          <b>Particle Emitters</b> lets you manage multiple emitter instances on
          the canvas. You can duplicate the current emitter and adjust each
          instance&apos;s position and angle to create effects that go beyond a
          single emitter configuration.
        </p>
        <h4>Key Actions:</h4>
        <ul>
          <li>
            <b>Duplicate Main Emitter</b>: Creates a new emitter on the canvas
            with the same configuration as the current one. Use this to place
            several identical or similar particle sources.
          </li>
          <li>
            <b>Emitter list</b>: For each emitter (Emitter 1, Emitter 2, …)
            you can change:
            <ul>
              <li>
                <b>Angle</b>: Rotation of the emitter in degrees, affecting
                emission direction.
              </li>
              <li>
                <b>Position</b>: X and Y coordinates of the emitter on the
                canvas.
              </li>
            </ul>
          </li>
        </ul>
        <p>
          Changes here apply to the live emitter instances; the underlying
          configuration (behaviours, emission, etc.) is shared and edited in
          the other property sections.
        </p>
      </div>
    </>
  );
};

export default ParticleEmittersDescription;

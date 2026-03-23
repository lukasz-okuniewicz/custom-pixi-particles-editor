import { useRef } from "react";

const KelvinWakeDescription = () => {
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
          <b>Kelvin Wake</b> approximates the classic V-shaped wake behind a
          moving object on a water surface. A “source” moves with a velocity; the
          behaviour applies forces in a cone behind it, with falloff along rays
          and optional lateral jitter. Update <b>source position</b> and{" "}
          <b>source velocity</b> from your game logic each frame for ships,
          boats, or stylized trails.
        </p>
        <h4>Key properties:</h4>
        <ul>
          <li>
            <b>Enabled / Priority</b>: Toggle and execution order.
          </li>
          <li>
            <b>Source</b>: Current world position of the wake origin (X, Y).
          </li>
          <li>
            <b>Source velocity</b>: Motion vector of the source; defines the
            forward direction of the wake.
          </li>
          <li>
            <b>Wake half-angle (rad)</b>: Half-angle of the V opening behind the
            source (wider angles cover more lateral area).
          </li>
          <li>
            <b>Strength</b>: Overall intensity of the steering forces inside the
            wake.
          </li>
          <li>
            <b>Decay along ray</b>: How quickly influence drops as distance
            increases along a ray from the source.
          </li>
          <li>
            <b>Lateral jitter</b>: Random spread perpendicular to the centerline
            for a less uniform look.
          </li>
          <li>
            <b>Max wake distance</b>: Clamps how far behind the source the
            effect is computed.
          </li>
        </ul>
      </div>
    </>
  );
};

export default KelvinWakeDescription;

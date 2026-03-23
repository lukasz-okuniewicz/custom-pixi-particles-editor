import { useRef } from "react";

const DamageFlashRippleDescription = () => {
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
          <b>Damage / Flash Ripple</b> fires a short-lived radial impulse from a
          point—like a shock ring on hit or an AoE marker. It pushes particles
          outward in an expanding band and can expose a radial phase for
          colouring or masking.
        </p>
        <h4>Key properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Master switch for the behaviour.
          </li>
          <li>
            <b>Trigger ripple</b>: Set true (or use the checkbox) to start a new
            wave from the current center; useful when driven from gameplay
            events.
          </li>
          <li>
            <b>Priority</b>: Execution order relative to other behaviours.
          </li>
          <li>
            <b>Center</b>: World-space origin of the ring (X, Y).
          </li>
          <li>
            <b>Wave speed</b>: How fast the ring expands outward.
          </li>
          <li>
            <b>Wave thickness</b>: Width of the active band that applies force;
            controls how “fat” the ring feels.
          </li>
          <li>
            <b>Strength</b>: How hard particles are pushed within the band.
          </li>
          <li>
            <b>Duration</b>: How long the ripple influence lasts before it
            dissipates.
          </li>
          <li>
            <b>Write radial phase</b>: When enabled, writes a radial phase value
            for effects that need distance-from-center (e.g. colour flash along
            the wave).
          </li>
        </ul>
      </div>
    </>
  );
};

export default DamageFlashRippleDescription;

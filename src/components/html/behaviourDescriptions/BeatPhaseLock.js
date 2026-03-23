import { useRef } from "react";

const BeatPhaseLockDescription = () => {
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
          <b>Beat Phase Lock</b> ties particle state to musical tempo. It
          advances a normalized beat phase (0–1) from BPM, optionally with
          harmonic multiples, jitter, and smoothing. Use it to drive color
          cycles, flashes, or other visuals that should stay in sync with the
          beat.
        </p>
        <h4>Key properties:</h4>
        <ul>
          <li>
            <b>Enabled / Priority</b>: Toggle the behaviour and control its
            order relative to others.
          </li>
          <li>
            <b>BPM</b>: Beats per minute; the master clock for phase advance.
          </li>
          <li>
            <b>Phase offset</b>: Shifts where the beat falls on the timeline
            (useful to align with a DAW or track).
          </li>
          <li>
            <b>Lock strength</b>: How tightly particles follow the ideal phase
            versus drifting (0 = loose, 1 = tight).
          </li>
          <li>
            <b>Jitter</b>: Random variation in phase so the motion does not look
            perfectly mechanical.
          </li>
          <li>
            <b>Harmonic</b>: Integer multiple of the base beat (e.g. 2 for
            half-note subdivisions).
          </li>
          <li>
            <b>Write phase for visual</b>: When on, writes a per-particle phase
            value (e.g. <code>beatPhase01</code>) for shaders or colour
            behaviours downstream.
          </li>
          <li>
            <b>Apply scale pulse / Scale pulse amount</b>: Optionally modulates
            particle scale on the beat for a subtle “punch” effect.
          </li>
        </ul>
      </div>
    </>
  );
};

export default BeatPhaseLockDescription;

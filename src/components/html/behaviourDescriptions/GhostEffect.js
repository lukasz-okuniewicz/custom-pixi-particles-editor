import { useRef } from "react";

const GhostEffectDescription = () => {
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
          <b>Ghost Effect</b> creates a trail effect by continuously spawning
          semi-transparent copies (ghosts) of a sprite that fade over time. This
          creates a motion blur or afterimage effect that follows the sprite&apos;s
          movement.
        </p>

        <h4>Key Features:</h4>
        <ul>
          <li>
            <b>Continuous Tracking:</b> Automatically tracks sprite movement and
            spawns ghost copies at regular intervals.
          </li>
          <li>
            <b>Fade Over Time:</b> Ghosts gradually fade from start alpha to end
            alpha, creating smooth trail effects.
          </li>
          <li>
            <b>Color Tinting:</b> Ghosts can change color from start tint to end
            tint during their lifetime.
          </li>
          <li>
            <b>Blend Mode Control:</b> Various blend modes (NORMAL, ADD,
            MULTIPLY, etc.) for different visual styles.
          </li>
          <li>
            <b>Maximum Ghost Limit:</b> Controls the maximum number of ghosts
            visible at once for performance.
          </li>
        </ul>

        <h4>Adjustable Parameters:</h4>
        <ul>
          <li>
            <b>Spawn Interval:</b> Time between spawning new ghost copies.
          </li>
          <li>
            <b>Ghost Lifetime:</b> How long each ghost remains visible before
            fading completely.
          </li>
          <li>
            <b>Start/End Alpha:</b> Transparency values at spawn and fade-out
            (0-1 range).
          </li>
          <li>
            <b>Start/End Tint:</b> Color values at spawn and fade-out for color
            transitions.
          </li>
          <li>
            <b>Blend Mode:</b> Rendering blend mode for ghost effects (NORMAL,
            ADD, MULTIPLY, etc.).
          </li>
          <li>
            <b>Max Ghosts:</b> Maximum number of ghosts visible simultaneously.
          </li>
        </ul>

        <h4>Applications:</h4>
        <ul>
          <li>Motion blur and trail effects.</li>
          <li>Speed lines and afterimage effects.</li>
          <li>Magical or ethereal trail animations.</li>
          <li>Visual feedback for fast-moving objects.</li>
        </ul>
      </div>
    </>
  );
};

export default GhostEffectDescription;

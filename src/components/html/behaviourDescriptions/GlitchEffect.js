import { useRef } from "react";

const GlitchEffectDescription = () => {
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
          <b>Glitch Effect</b> creates a digital glitch effect by slicing the
          sprite into horizontal strips and applying random offsets, flickering,
          and RGB color separation. This effect is perfect for digital corruption,
          error states, or cyberpunk aesthetics.
        </p>

        <h4>Key Features:</h4>
        <ul>
          <li>
            <b>Custom Sprite</b>: Use a custom sprite/image for the glitch
            effect (upload or select a different texture).
          </li>
          <li>
            <b>Horizontal Slicing</b>: Divides the sprite into horizontal slices
            that can be offset independently.
          </li>
          <li>
            <b>RGB Split:</b> Optional RGB color channel separation for classic
            glitch aesthetics.
          </li>
          <li>
            <b>Flicker Effect:</b> Random flickering intensity for more chaotic
            glitch behavior.
          </li>
          <li>
            <b>Dynamic Refresh:</b> Continuously updates the glitch pattern at
            specified intervals.
          </li>
          <li>
            <b>Offset Range:</b> Controls how far slices can be displaced from
            their original position.
          </li>
        </ul>

        <h4>Adjustable Parameters:</h4>
        <ul>
          <li>
            <b>Slices:</b> Number of horizontal slices the sprite is divided
            into.
          </li>
          <li>
            <b>Offset Range:</b> Maximum distance slices can be offset
            horizontally.
          </li>
          <li>
            <b>Flicker Intensity:</b> Strength of the flickering effect (0-1
            range).
          </li>
          <li>
            <b>RGB Split:</b> Enable/disable RGB color channel separation.
          </li>
          <li>
            <b>RGB Offset:</b> Distance between RGB channels when RGB split is
            enabled.
          </li>
          <li>
            <b>Duration:</b> Total time the glitch effect plays.
          </li>
          <li>
            <b>Refresh Rate:</b> How often the glitch pattern updates (lower
            values = more frequent updates).
          </li>
        </ul>

        <h4>Applications:</h4>
        <ul>
          <li>Digital corruption and error effects.</li>
          <li>Cyberpunk and sci-fi visual styles.</li>
          <li>Transition effects with digital aesthetics.</li>
          <li>Error state visualizations.</li>
        </ul>
      </div>
    </>
  );
};

export default GlitchEffectDescription;

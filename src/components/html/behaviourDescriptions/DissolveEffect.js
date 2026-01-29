import { useRef } from "react";

const DissolveEffectDescription = () => {
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
          <b>Dissolve Effect</b> creates a pixelated disintegration effect
          where a sprite gradually breaks apart into particles that drift away.
          This effect is ideal for magical disappearances, transitions, or
          destruction sequences.
        </p>

        <h4>Key Features:</h4>
        <ul>
          <li>
            <b>Custom Sprite</b>: Use a custom sprite/image for the dissolve
            effect (upload or select a different texture).
          </li>
          <li>
            <b>Pixel-Based Dissolution</b>: Breaks the sprite into individual
            pixels or pixel groups that dissolve independently.
          </li>
          <li>
            <b>Directional Control:</b> Choose from multiple dissolve directions
            including left-to-right, right-to-left, top-to-bottom,
            bottom-to-top, or center-out patterns.
          </li>
          <li>
            <b>Edge Softness:</b> Controls how smoothly pixels fade at the
            edges of the dissolve effect.
          </li>
          <li>
            <b>Drift and Noise:</b> Adds natural movement and randomness to
            particles as they dissolve.
          </li>
          <li>
            <b>Wind Effect:</b> Optional wind angle parameter to simulate
            directional forces affecting particle movement.
          </li>
        </ul>

        <h4>Adjustable Parameters:</h4>
        <ul>
          <li>
            <b>Pixel Size:</b> Determines the size of individual particles
            (larger values create chunkier effects).
          </li>
          <li>
            <b>Edge Softness:</b> Controls the smoothness of the dissolve edge
            (0-1 range).
          </li>
          <li>
            <b>Drift Strength:</b> Sets how far particles drift away from their
            original position.
          </li>
          <li>
            <b>Noise Intensity:</b> Adds randomness to particle movement for
            more organic effects.
          </li>
          <li>
            <b>Lifetime:</b> Duration of the dissolve effect.
          </li>
          <li>
            <b>Fade Out Duration:</b> Time taken for particles to completely
            fade away.
          </li>
          <li>
            <b>Direction:</b> Selects the pattern of dissolution (left-to-right,
            center-out, etc.).
          </li>
          <li>
            <b>Wind Angle:</b> Sets the direction of wind force affecting
            particles (in radians).
          </li>
        </ul>

        <h4>Applications:</h4>
        <ul>
          <li>Magical disappearance effects.</li>
          <li>Transition animations between scenes.</li>
          <li>Destruction and disintegration sequences.</li>
          <li>Particle-based fade effects.</li>
        </ul>
      </div>
    </>
  );
};

export default DissolveEffectDescription;

import { useRef } from "react";

const ColorDescription = () => {
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
          <b>Color Behaviour</b> feature provides an advanced framework for
          dynamically controlling particle colors throughout their lifecycle. It
          supports smooth transitions, multi-gradient effects, noise-based
          variations, and advanced visual enhancements such as pulsing,
          flickering, and fading.
        </span>
        Key Properties:
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behavior on or off.
          </li>
          <li>
            <b>Priority</b>: Set execution order if multiple behaviors are
            applied.
          </li>
          <li>
            <b>Start & End Colors</b>: Define the start and end colors for
            transitions.
          </li>
          <li>
            <b>Color Stops</b>: Add multiple gradient stops for complex
            transitions.
          </li>
          <li>
            <b>Fade in and out</b>: Enable sinusoidal modulation for alpha
            transparency.
          </li>
          <li>
            <b>Use Perlin Noise</b>: Apply Perlin noise for dynamic color
            changes.
          </li>
          <li>
            <b>Pulse Speed & Intensity</b>: Configure the speed and strength of
            the pulse effect.
          </li>
          <li>
            <b>Mirror Transition</b>: Enable mirrored color transitions for
            symmetrical effects.
          </li>
          <li>
            <b>Fade to Gray</b>: Gradually desaturate colors over time.
          </li>
          <li>
            <b>Fade to Transparent</b>: Gradually reduce alpha over time.
          </li>
          <li>
            <b>Flicker Intensity</b>: Control the strength of random flickering
            effects.
          </li>
        </ul>
        <span>
          The Color Behaviour is an essential tool for creating dynamic and
          immersive particle systems, offering precise control over color
          transitions and unique customization options for vivid visual effects.
        </span>
        <span>
          <a href="/?effect=background" target="_blank">
            Example
          </a>
        </span>
      </span>
    </>
  );
};

export default ColorDescription;

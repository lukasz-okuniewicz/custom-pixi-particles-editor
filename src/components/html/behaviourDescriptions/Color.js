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
          <b>Color Behaviour</b> feature enables dynamic color transitions for
          particles throughout their lifecycle. It allows particles to gradually
          change from a defined start color to an end color, with optional
          variance and sinusoidal alpha modulation for added effects.
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
            <b>Start Color</b>: Define the initial color for particles.
          </li>
          <li>
            <b>End Color</b>: Specify the final color for particles.
          </li>
          <li>
            <b>Start Variance</b>: Introduce randomness to the start color.
          </li>
          <li>
            <b>End Variance</b>: Add randomness to the end color.
          </li>
          <li>
            <b>Fade in and out</b>: Enable sinusoidal modulation for alpha
            transparency.
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

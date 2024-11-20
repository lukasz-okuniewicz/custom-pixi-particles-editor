import { useRef } from "react";

const SpawnDescription = () => {
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
          <b>Spawn Behaviour</b> feature provides advanced particle spawning
          capabilities, enabling users to create particles in various predefined
          shapes, patterns, and text-based arrangements. It allows for precise
          customization of particle positioning, density, and perspective,
          making it ideal for dynamic and visually compelling effects. effects.
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
            <b>Spawn Type</b>: Defines the particle spawning pattern (e.g.,
            Rectangle, Ring, Word).
          </li>
          <li>
            <b>Position & Variance</b>: Set initial position and apply random
            variance to particle positions.
          </li>
          <li>
            <b>Shape Parameters</b>: Control properties like radius, star
            points, rows/columns, and cone angles.
          </li>
          <li>
            <b>Text Parameters</b>: Customize word text, font size, alignment,
            spacing, and density.
          </li>
          <li>
            <b>Perspective</b>: Enable perspective scaling with maximum
            z-distance for depth effects.
          </li>
        </ul>
        <span>
          <a href="/?effect=animatedHelloWord" target="_blank">
            Animated: Hello How Are You?
          </a>
          <br />
          <a href="/?effect=helloWord" target="_blank">
            Static: Hello Word
          </a>
          <br />
          <a href="/?effect=star" target="_blank">
            Star
          </a>
          <br />
          <a href="/?effect=starAnimations" target="_blank">
            Example
          </a>
        </span>
        <span></span>
      </span>
    </>
  );
};

export default SpawnDescription;

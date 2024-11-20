import { useRef } from "react";

const ForceFieldsDescription = () => {
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
          <b>Force Fields Behaviour</b>: feature allows particles to interact
          with region-based forces such as wind, gravity, and turbulence. This
          behavior provides highly customizable and dynamic movement patterns by
          simulating environmental effects, enabling users to create immersive
          and realistic particle systems.
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
            <b>Fields</b>: Define an array of force fields with the following
            properties:
            <ul>
              <li>
                <b>Position</b>: The center of the force field.
              </li>
              <li>
                <b>Radius</b>: The area of influence for the field.
              </li>
              <li>
                <b>Strength</b>: The intensity of the force applied.
              </li>
              <li>
                <b>Type</b>: The type of force (wind, gravity, turbulence).
              </li>
              <li>
                <b>Direction</b>: Specify the direction for wind forces.
              </li>
            </ul>
          </li>
        </ul>
        <span>
          The Force Fields Behaviour is ideal for users who want to add
          environmental interactions to their particle systems, creating
          lifelike and immersive animations with minimal effort.
        </span>
        <span>
          <a href="/?effect=forceFields" target="_blank">
            Example
          </a>
        </span>
      </span>
    </>
  );
};

export default ForceFieldsDescription;

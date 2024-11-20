import { useRef } from "react";

const AttractionRepulsionDescription = () => {
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
          <b>Attraction/Repulsion Behaviour</b> introduces forces that attract
          or repel particles based on their proximity to specified influence
          points. This behavior provides dynamic motion and interaction without
          overriding other position-related behaviors, making it ideal for
          creating complex and interactive particle systems.
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
            <b>Influence Points</b>: Define an array of points with:
            <ul>
              <li>
                <b>Position</b>: The coordinates of the influence point.
              </li>
              <li>
                <b>Strength</b>: Positive values for attraction, negative for
                repulsion.
              </li>
              <li>
                <b>Range</b>: The radius within which particles are affected.
              </li>
            </ul>
          </li>
        </ul>
        <span>
          The Attraction & Repulsion Behaviour is perfect for users seeking to
          create highly interactive and dynamic particle systems, offering
          precise control over particle interactions with customizable points of
          influence.
        </span>
        <span>
          <a href="/?effect=attractionRepulsion" target="_blank">
            Example
          </a>
        </span>
      </span>
    </>
  );
};

export default AttractionRepulsionDescription;

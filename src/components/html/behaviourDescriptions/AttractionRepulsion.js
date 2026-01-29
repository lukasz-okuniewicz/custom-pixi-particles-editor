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
      <div className="explanation" ref={contentRef}>
        <span>
          <b>Attraction/Repulsion Behaviour</b> enables dynamic forces that
          attract or repel particles based on their proximity to defined
          influence points. This behavior enhances interaction and motion
          without interfering with other position-related behaviors, allowing
          for the creation of highly complex and interactive particle systems.
        </span>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behavior on or off, allowing for flexible
            activation in specific scenarios.
          </li>
          <li>
            <b>Priority</b>: Determines the execution order relative to other
            behaviors.
          </li>
          <li>
            <b>Influence Points</b>: A customizable array of points that define
            attraction or repulsion forces. Each point includes:
            <ul>
              <li>
                <b>Position</b>: The x and y coordinates of the influence point.
              </li>
              <li>
                <b>Strength</b>: The magnitude of the force, with positive
                values for attraction and negative values for repulsion.
              </li>
              <li>
                <b>Range</b>: The effective radius within which particles are
                influenced.
              </li>
            </ul>
          </li>
        </ul>
        <h4>Advanced Features:</h4>
        <ul>
          <li>
            <b>Additive Forces</b>: Allows forces from multiple influence points
            to combine, creating complex motion dynamics.
          </li>
          <li>
            <b>Non-Overriding Behavior</b>: Integrates seamlessly with other
            behaviors without overriding their effects, ensuring natural
            interactions.
          </li>
        </ul>
        <h4>Practical Applications:</h4>
        <ul>
          <li>
            <b>Simulating Gravity Wells</b>: Use attraction points to simulate
            particles gravitating toward celestial objects.
          </li>
          <li>
            <b>Repelling Obstacles</b>: Define repulsion points to create zones
            where particles are pushed away, simulating avoidance.
          </li>
          <li>
            <b>Interactive Effects</b>: Add user-controlled attraction points to
            dynamically influence particles, such as following a cursor.
          </li>
        </ul>
        <h4>Live Examples:</h4>
        <span>
          <a href="/?effect=attractionRepulsion" target="_blank">
            Attraction and Repulsion Example
          </a>
        </span>
      </div>
    </>
  );
};

export default AttractionRepulsionDescription;

import { useRef } from "react";

const CollisionDescription = () => {
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
          <b>Collision Behaviour</b> is designed to handle particle interactions
          with defined line segments in the environment. It detects collisions
          and adjusts particle properties, such as velocity, based on collision
          reflections, offering a realistic and customizable approach to
          particle movement in constrained spaces.
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
            <b>Collision Threshold</b>: Set the distance at which a particle is
            considered to have collided with a line.
          </li>
          <li>
            <b>Velocity Reflection</b>: Adjusts particle velocity to simulate
            bouncing effects.
          </li>
          <li>
            <b>Behavior Skipping</b>: Disable specific behaviors post-collision
            for tailored particle reactions.
          </li>
          <li>
            <b>Custom Lines</b>: Define multiple line segments for particles to
            interact with.
          </li>
        </ul>
        <span>
          The Collision Behaviour is ideal for users seeking to integrate
          realistic and customizable collision handling into their particle
          systems, enabling flexible and engaging interactive effects.
        </span>
        <span>
          <a href="/?effect=snowWithCollision" target="_blank">
            Snow With Collision
          </a>
          <br />
          <a href="/?effect=coinShowerWithCollision" target="_blank">
            Coin Shower With Collision
          </a>
        </span>
      </span>
    </>
  );
};

export default CollisionDescription;

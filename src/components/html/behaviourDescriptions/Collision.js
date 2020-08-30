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
          <b>Collision Behaviour</b> is designed to manage particle interactions
          with defined line segments, enabling realistic and customizable
          collision handling in particle systems. By simulating physical
          interactions like bouncing, stopping, or altering behavior
          post-collision, it enhances the realism of constrained particle
          movements.
        </span>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behavior on or off, allowing flexibility
            in enabling collision for specific scenarios.
          </li>
          <li>
            <b>Priority</b>: Determines the execution order if multiple
            behaviors are applied simultaneously.
          </li>
          <li>
            <b>Collision Threshold (Distance)</b>: Sets the proximity at which a
            particle is considered to collide with a line segment.
          </li>
          <li>
            <b>Velocity Reflection</b>: Simulates bouncing by reversing the
            velocity vector relative to the line&apos;s normal.
          </li>
          <li>
            <b>Behavior Skipping</b>: Optionally disable specific behaviors
            post-collision for tailored particle interactions, such as stopping
            rotation or changing direction.
          </li>
          <li>
            <b>Custom Lines</b>: Define multiple line segments in the
            environment that particles will interact with.
          </li>
          <li>
            <b>Dynamic Lines</b>: Supports updating or animating the line
            positions to create dynamic environments.
          </li>
        </ul>
        <h4>Practical Applications:</h4>
        <ul>
          <li>
            <b>Snowfall</b>: Use collision lines to simulate snowflakes landing
            on surfaces like rooftops or trees.
          </li>
          <li>
            <b>Coin Drop Effects</b>: Add collisions to simulate coins bouncing
            off a container&apos;s walls or other objects.
          </li>
          <li>
            <b>Interactive Games</b>: Simulate particle interactions with
            obstacles or walls for puzzle or arcade-style games.
          </li>
          <li>
            <b>Fluid Dynamics</b>: Combine with other behaviors to create
            boundary-constrained fluid particle simulations.
          </li>
        </ul>
        <h4>Live Examples:</h4>
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

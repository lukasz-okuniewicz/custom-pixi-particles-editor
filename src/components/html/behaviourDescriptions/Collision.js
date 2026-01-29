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
      <div className="explanation" ref={contentRef}>
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
            <b>Show Line</b>: Toggle visibility of collision line segments in
            the canvas for easier editing and debugging.
          </li>
          <li>
            <b>Distance</b>: Sets the proximity (collision threshold) at which
            a particle is considered to collide with a line segment.
          </li>
          <li>
            <b>Lines</b>: Define multiple line segments (Point 1, Point 2 per
            line). Use &quot;Select Point&quot; to set a line endpoint by
            clicking on the canvas, &quot;Add New Line&quot; to add a segment,
            and &quot;Remove Line&quot; to delete one.
          </li>
          <li>
            <b>Behavior skipping (post-collision)</b>: Optionally disable
            specific behaviours after a particle collides:
            <ul>
              <li>
                <b>Skip Position On Collision</b>: Stops position updates after
                collision.
              </li>
              <li>
                <b>Skip Angular Velocity On Collision</b>: Stops angular
                velocity behaviour.
              </li>
              <li>
                <b>Skip Color On Collision</b>: Stops color behaviour.
              </li>
              <li>
                <b>Skip Emit Direction On Collision</b>: Stops emit direction
                behaviour.
              </li>
              <li>
                <b>Skip Rotation On Collision</b>: Stops rotation behaviour.
              </li>
              <li>
                <b>Skip Size On Collision</b>: Stops size behaviour.
              </li>
            </ul>
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
      </div>
    </>
  );
};

export default CollisionDescription;

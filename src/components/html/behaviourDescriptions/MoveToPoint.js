import { useRef } from "react";

const MoveToPointDescription = () => {
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
          <b>Move To Point Behaviour</b> directs particles in a system towards a
          specified (x, y) coordinate. When activated, this behavior can
          override other positional behaviors, causing all affected particles to
          converge at or move towards the defined target.
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behavior on or off. If disabled, it won't
            affect particles even if active.
          </li>
          <li>
            <b>Active</b>: A boolean flag that, when true, activates the
            movement towards the target point. When false, particles resume
            their normal behavior.
          </li>
          <li>
            <b>Target Point</b>: An object with <code>x</code> and
            <code>y</code> properties defining the destination coordinates for
            the particles.
          </li>
          <li>
            <b>Speed</b>: The rate (in units per second) at which particles
            travel towards the <code>targetPoint</code>.
          </li>
          <li>
            <b>Priority</b>: Determines the execution order relative to other
            behaviors. A lower value typically means it runs later, allowing it
            to override earlier positional changes. (e.g., -10 to run after
            standard position and emit direction behaviors).
          </li>
        </ul>

        <h4>How It Works:</h4>
        <p>
          When the <b>Move To Point Behaviour</b> is <code>enabled</code> and
          <code>active</code>, it calculates the vector from each particle's
          current position to the <code>targetPoint</code>. It then moves the
          particle along this vector at the specified
          <code>speed</code>, adjusting for the <code>deltaTime</code> (time
          since the last frame). This behavior can effectively take control of a
          particle's position, potentially nullifying the effects of other
          behaviors like <code>PositionBehaviour</code> or
          <code>EmitDirectionBehaviour</code> for that frame, depending on its
          priority.
        </p>

        <h4>Use Cases:</h4>
        <ul>
          <li>
            Creating effects where particles gather at a specific location, like
            a "black hole" or an attraction point.
          </li>
          <li>
            Guiding particles along a path by dynamically updating the
            <code>targetPoint</code>.
          </li>
          <li>
            Temporarily overriding particle movement for special events or
            interactions.
          </li>
          <li>
            Forming shapes or patterns by directing particles to multiple
            strategic points (potentially using multiple emitters or by updating
            the target).
          </li>
        </ul>
      </div>
    </>
  );
};

export default MoveToPointDescription;

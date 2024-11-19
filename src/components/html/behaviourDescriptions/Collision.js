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
          <b>Collision</b> in a particle system allows particles to interact
          with defined lines by detecting when a particle gets close to the line
          and altering its direction accordingly.
        </span>
        <ul>
          <li>
            <b>Distance</b>: Specifies how close a particle must be to detect a
            collision. A distance of 0 means particles pass over the line, while
            a small distance results in some particles colliding and others
            bypassing the line.
          </li>
          <li>
            <b>Collision Effects</b>: You can choose which particle properties
            are affected upon collision, such as position, color, rotation, or
            size, or opt to ignore certain effects for more customized behavior.
          </li>
        </ul>
        <span>
          This feature is useful for creating realistic interactions, such as
          particles bouncing off surfaces or being deflected by barriers.
        </span>
        <span>
          <a href="/?effect=coinShowerWithCollision" target="_blank">
            Example
          </a>
        </span>
      </span>
    </>
  );
};

export default CollisionDescription;

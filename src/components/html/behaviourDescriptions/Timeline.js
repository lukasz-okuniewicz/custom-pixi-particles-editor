import { useRef } from "react";

const TimelineDescription = () => {
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
          <b>Timeline Behaviour</b> feature enables precise control over the
          evolution of particles&apos; properties throughout their lifecycle. By
          defining a timeline of keyframes, users can create smooth transitions
          and animations for particle attributes such as size, color, and
          rotation.
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
            <b>Time control</b>: Time from range 0-1.
          </li>
          <li>
            <b>Size Evolution</b>: Gradually increase or decrease particle size
            across keyframes.
          </li>
          <li>
            <b>Color Animation</b>: Change particles’ color, including
            transparency (alpha), over time.
          </li>
          <li>
            <b>Rotation Control</b>: Apply rotation changes in degrees for
            spinning or orientation effects.
          </li>
          <li>
            <b>Smooth Interpolation</b>: Ensures all transitions are fluid using
            linear interpolation.
          </li>
        </ul>
        <span>
          The Timeline Behaviour is ideal for users who need precise control
          over particle animations and lifecycle events, offering a flexible and
          intuitive way to create complex visual effects.
        </span>
        <span>
          <a href="/?effect=timeline" target="_blank">
            Example
          </a>
        </span>
      </span>
    </>
  );
};

export default TimelineDescription;

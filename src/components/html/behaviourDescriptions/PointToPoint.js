import { useRef } from "react";

const PointToPointDescription = () => {
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
          <b>Point To Point Behaviour</b> moves particles between two points
          (<code>A</code> and <code>B</code>) using curve functions and easing.
          You can run it one-way (A to B) or in two-way mode (A to B and back).
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Turns this behaviour on or off.
          </li>
          <li>
            <b>Priority</b>: Execution order relative to other behaviours.
          </li>
          <li>
            <b>Two Ways</b>: Enables return motion from B back to A.
          </li>
          <li>
            <b>There X / There Y / There Ease</b>: Curve and easing used for
            the A to B phase.
          </li>
          <li>
            <b>There Duration / There Amplitude</b>: Random range controls for
            forward motion timing and shape.
          </li>
          <li>
            <b>Back X / Back Y / Back Ease</b>: Curve and easing used for the
            B to A phase (only when Two Ways is enabled).
          </li>
          <li>
            <b>Back Duration / Back Amplitude</b>: Random range controls for
            return motion timing and shape.
          </li>
          <li>
            <b>Point A / Point B</b>: Start and end coordinates.
          </li>
        </ul>

        <h4>Available fields in this panel</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order.</li>
          <li><b>fromAtoBTwoWays</b> — Enable forward + return motion.</li>
          <li><b>there.x</b>, <b>there.y</b>, <b>there.ease</b> — Forward phase curve/ease.</li>
          <li><b>thereDuration</b>, <b>thereAmplitude</b> — Forward phase ranges.</li>
          <li><b>back.x</b>, <b>back.y</b>, <b>back.ease</b> — Return phase curve/ease.</li>
          <li><b>backDuration</b>, <b>backAmplitude</b> — Return phase ranges.</li>
          <li><b>pointA</b>, <b>pointB</b> — Motion endpoints (x, y).</li>
        </ul>

        <h4>How It Works:</h4>
        <p>
          The behaviour evaluates the selected function types (e.g. Sin/Cos/Tan)
          for X and Y over time, then applies easing and amplitude ranges to
          generate motion between the two points. In two-way mode, the same
          process runs for the return phase with its own back settings.
        </p>
      </div>
    </>
  );
};

export default PointToPointDescription;

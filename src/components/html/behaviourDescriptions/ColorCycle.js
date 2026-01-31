import { useRef } from "react";

const ColorCycleDescription = () => {
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
          <b>Color Cycle Behaviour</b> cycles particle color through a gradient
          defined by color stops. The cycle can be driven by particle life
          progress or by global time (e.g. rainbow or heat-style effects).
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behaviour on or off.
          </li>
          <li>
            <b>Priority</b>: Execution order (higher runs first).
          </li>
          <li>
            <b>Color Stops</b>: Array of <code>{`{ t, r, g, b }`}</code>.{" "}
            <code>t</code> is 0-1 (position in gradient); r, g, b are 0-255. Add
            or remove stops and set their position (t) and color.
          </li>
          <li>
            <b>Mode</b>: <code>life</code> = gradient over particle life,{" "}
            <code>time</code> = gradient over global time (looping).
          </li>
          <li>
            <b>Cycle Speed</b>: When mode is <code>time</code>, how fast the
            gradient cycles (e.g. 1 = one full cycle per second).
          </li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>colorStops</b> — Array of t (0-1), r, g, b; gradient positions and colors.</li>
          <li><b>mode</b> — &quot;life&quot; (gradient over particle life) or &quot;time&quot; (global time, looping).</li>
          <li><b>cycleSpeed</b> — When mode is time, cycles per second.</li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>Rainbow trails, heat maps, mood-style color shifts.</li>
          <li>Time-based or life-based color animation.</li>
        </ul>
      </div>
    </>
  );
};

export default ColorCycleDescription;

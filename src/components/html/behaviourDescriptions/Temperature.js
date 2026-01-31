import { useRef } from "react";

const TemperatureDescription = () => {
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
          <b>Temperature Behaviour</b> dynamically adjusts particle properties
          such as velocity and color based on their position relative to defined
          &quot;hot&quot; or &quot;cold&quot; zones. This behavior is ideal for
          simulating temperature effects or environmental interactions within a
          particle system.
        </p>

        <h4>Key Features:</h4>
        <ul>
          <li>
            <b>Zone-Based Adjustments:</b> Particles entering a zone will have
            their velocity and color modified based on zone-specific settings.
          </li>
          <li>
            <b>Customizable Zones:</b> Define multiple zones with attributes
            such as:
            <ul>
              <li>
                <b>Center Position:</b> The coordinates of the zone&apos;s
                center.
              </li>
              <li>
                <b>Radius:</b> The size of the zone affecting how far its
                influence extends.
              </li>
              <li>
                <b>Velocity Modifiers:</b> Scaling factors that adjust particle
                speed in the x and y directions.
              </li>
              <li>
                <b>Target Color:</b> The color particles adopt when inside the
                zone.
              </li>
            </ul>
          </li>
          <li>
            <b>Real-Time Interactions:</b> Continuously checks particle
            positions to apply relevant zone effects, ensuring particles
            dynamically respond to their environment.
          </li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>zones</b> — Array of zone objects. Each zone: <b>center</b> (x, y), <b>radius</b>, <b>velocity</b> (x, y scaling), <b>color</b> (r, g, b, alpha). Use &quot;Select Position&quot; to set zone center on canvas; add/remove zones as needed.</li>
        </ul>

        <h4>Applications:</h4>
        <ul>
          <li>
            Simulate environmental effects like hot zones that accelerate
            particles and turn them red, or cold zones that slow particles and
            turn them blue.
          </li>
          <li>Enhance particle animations with temperature-based dynamics.</li>
          <li>
            Create interactive visual effects where particles respond to defined
            areas.
          </li>
        </ul>

        <h4>Examples:</h4>
        <span>
          <a href="/?effect=temperature" target="_blank">
            Hot and Cold Zone Interaction
          </a>
        </span>
      </div>
    </>
  );
};

export default TemperatureDescription;

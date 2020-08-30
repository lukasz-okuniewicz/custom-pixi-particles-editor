import { useRef } from "react";

const TurbulenceDescription = () => {
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
          <b>Turbulence Behaviour</b> adds dynamic, swirling motion to particles
          by simulating interactions with vortex-like fields. This behavior
          enables complex motion patterns, making it ideal for effects like
          whirlpools, flames, smoke, and other chaotic systems.
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled:</b> Toggle the behavior on or off.
          </li>
          <li>
            <b>Priority:</b> Determine the order in which this behavior is
            applied relative to others.
          </li>
          <li>
            <b>Effect:</b> Define the type of turbulence effect, such as:
            <ul>
              <li>
                <b>Swirling:</b> Circular motion around vortices.
              </li>
              <li>
                <b>Pulling:</b> Particles are drawn toward vortex centers.
              </li>
              <li>
                <b>Repelling:</b> Particles are pushed away from vortex centers.
              </li>
            </ul>
          </li>
          <li>
            <b>Position & Variance:</b> Specify vortex positions and add
            randomness for natural and diverse effects.
          </li>
          <li>
            <b>Velocity & Acceleration:</b> Configure movement and acceleration
            for vortices, creating dynamic turbulence.
          </li>
          <li>
            <b>Size Start & End:</b> Define vortex size changes over time,
            allowing turbulence patterns to evolve.
          </li>
          <li>
            <b>Turbulence Pool:</b> Manage a collection of vortices that
            particles interact with during their lifetime.
          </li>
        </ul>

        <h4>How It Works:</h4>
        <p>
          The behavior applies vortex effects to particles based on their
          proximity to defined vortices. Particles are influenced by the type of
          effect (e.g., swirling, pulling, or repelling) and the calculated
          strength of the vortex field, which diminishes with distance. This
          interaction creates dynamic, visually engaging motion patterns.
        </p>

        <h4>Use Cases:</h4>
        <ul>
          <li>Simulating smoke or flame turbulence in a realistic manner.</li>
          <li>Creating swirling whirlpools or chaotic particle streams.</li>
          <li>Adding depth and complexity to dynamic environments.</li>
          <li>Visualizing vortex-like phenomena in animations.</li>
        </ul>

        <h4>Live Examples:</h4>
        <ul>
          <li>
            <a href="/?effect=fireWithTurbulence" target="_blank">
              Fire with Turbulence
            </a>
          </li>
          <li>
            <a href="/?effect=smokeWhirl" target="_blank">
              Smoke Whirlpool
            </a>
          </li>
          <li>
            <a href="/?effect=dynamicVortex" target="_blank">
              Dynamic Vortex Simulation
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default TurbulenceDescription;

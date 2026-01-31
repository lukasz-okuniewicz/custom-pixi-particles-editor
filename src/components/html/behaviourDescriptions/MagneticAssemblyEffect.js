import { useRef } from "react";

const MagneticAssemblyEffectDescription = () => {
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
          <b>Magnetic Assembly Effect</b> creates a reverse shatter effect where
          particles are scattered and then magnetically pulled together to form
          the original sprite. This effect is perfect for creation, summoning, or
          materialization animations.
        </p>

        <h4>Key Features:</h4>
        <ul>
          <li>
            <b>Custom Sprite</b>: Use a custom sprite/image for the assembly
            effect (upload or select a different texture).
          </li>
          <li>
            <b>Reverse Animation</b>: Particles start scattered and assemble
            into the final sprite shape.
          </li>
          <li>
            <b>Multiple Assembly Modes:</b> Choose from random scatter,
            from-center, off-screen, or vortex assembly patterns.
          </li>
          <li>
            <b>Easing Functions:</b> Various easing options (back.out,
            power1.inOut, bounce.out, linear) for different animation styles.
          </li>
          <li>
            <b>Staggered Timing:</b> Particles can assemble with a delay
            between each for cascading effects.
          </li>
          <li>
            <b>Scatter Range:</b> Controls how far particles start from the
            final position.
          </li>
        </ul>

        <h4>Adjustable Parameters:</h4>
        <ul>
          <li>
            <b>Grid Columns/Rows:</b> Determines the number of particles used
            in the assembly.
          </li>
          <li>
            <b>Duration:</b> Total time for the assembly animation.
          </li>
          <li>
            <b>Easing:</b> Animation curve style (back.out, power1.inOut,
            bounce.out, linear).
          </li>
          <li>
            <b>Scatter Range:</b> Maximum distance particles start from their
            final position.
          </li>
          <li>
            <b>Stagger:</b> Delay between particle movements (0-1 range).
          </li>
          <li>
            <b>Mode:</b> Selects the assembly pattern (random-scatter,
            from-center, off-screen, vortex).
          </li>
          <li>
            <b>Start Alpha:</b> Initial transparency of particles before
            assembly.
          </li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>gridCols</b>, <b>gridRows</b> — Number of particles in the grid.</li>
          <li><b>duration</b> — Total assembly animation time.</li>
          <li><b>easing</b> — Curve (linear, back.out, power1.inOut, bounce.out).</li>
          <li><b>scatterRange</b> — Max distance particles start from final position.</li>
          <li><b>stagger</b> — Delay between particle movements (0-1).</li>
          <li><b>mode</b> — Pattern: random-scatter, from-center, off-screen, vortex.</li>
          <li><b>startAlpha</b> — Initial particle transparency.</li>
          <li><b>customSprite</b> — Optional custom texture.</li>
        </ul>

        <h4>Applications:</h4>
        <ul>
          <li>Creation and summoning animations.</li>
          <li>Materialization effects.</li>
          <li>Reverse destruction sequences.</li>
          <li>Particle assembly transitions.</li>
        </ul>
      </div>
    </>
  );
};

export default MagneticAssemblyEffectDescription;

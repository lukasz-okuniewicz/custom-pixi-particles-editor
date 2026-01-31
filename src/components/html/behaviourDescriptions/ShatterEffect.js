import { useRef } from "react";

const ShatterEffectDescription = () => {
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
          <b>Shatter Effect</b> creates a dramatic explosion effect by breaking
          a sprite into multiple fragments that scatter in various directions.
          This effect is perfect for creating destruction, impact, or transition
          animations.
        </p>

        <h4>Key Features:</h4>
        <ul>
          <li>
            <b>Custom Sprite</b>: Use a custom sprite/image for the shatter
            effect (upload or select a different texture).
          </li>
          <li>
            <b>Grid-Based Fragmentation</b>: Divides the sprite into a grid of
            fragments (columns and rows) that can be customized for different
            levels of detail.
          </li>
          <li>
            <b>Multiple Explosion Modes:</b> Choose from radial (outward from
            center), directional (specific angle), or swirl (rotating) explosion
            patterns.
          </li>
          <li>
            <b>Physics Simulation:</b> Includes realistic physics with gravity,
            friction, and turbulence for natural-looking particle movement.
          </li>
          <li>
            <b>Rotation Control:</b> Optional rotation effects can be enabled to
            add spinning motion to fragments.
          </li>
          <li>
            <b>Customizable Appearance:</b> Control fragment colors, scale
            randomization, and fade-out duration.
          </li>
        </ul>

        <h4>Adjustable Parameters:</h4>
        <ul>
          <li>
            <b>Grid Columns/Rows:</b> Determines the number of fragments the
            sprite is divided into.
          </li>
          <li>
            <b>Explosion Power:</b> Controls the initial force applied to
            fragments.
          </li>
          <li>
            <b>Gravity:</b> Sets the downward pull affecting fragment movement.
          </li>
          <li>
            <b>Friction:</b> Controls how quickly fragments slow down (0-1
            range).
          </li>
          <li>
            <b>Turbulence:</b> Adds random motion for more chaotic effects.
          </li>
          <li>
            <b>Lifetime:</b> How long fragments remain visible before fading.
          </li>
          <li>
            <b>Mode:</b> Selects the explosion pattern (radial, directional, or
            swirl).
          </li>
          <li>
            <b>Explosion Origin:</b> Sets the starting point of the explosion
            (0-1 coordinates).
          </li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>gridCols</b>, <b>gridRows</b> — Number of fragments.</li>
          <li><b>explosionPower</b> — Initial force on fragments.</li>
          <li><b>friction</b> — Slowdown (0-1).</li>
          <li><b>gravity</b> — Downward pull.</li>
          <li><b>turbulence</b> — Random motion strength.</li>
          <li><b>lifetime</b> — How long fragments stay visible.</li>
          <li><b>fadeOutDuration</b> — Fade-out time.</li>
          <li><b>mode</b> — Pattern: radial, directional, swirl.</li>
          <li><b>explosionOrigin</b> — (x, y) 0-1 start point.</li>
          <li><b>blastDirection</b> — Direction angle (when mode is directional).</li>
          <li><b>swirlStrength</b> — Swirl amount (when mode is swirl).</li>
          <li><b>randomizeScale</b> — Randomize fragment scale.</li>
          <li><b>endTint</b> — Fragment end color (hex).</li>
          <li><b>enableRotation</b> — Add spin to fragments.</li>
          <li><b>rotationStrength</b> — Rotation intensity.</li>
          <li><b>customSprite</b> — Optional custom texture.</li>
        </ul>

        <h4>Applications:</h4>
        <ul>
          <li>Destruction and impact effects in games.</li>
          <li>Transition animations between scenes.</li>
          <li>Dramatic reveal effects.</li>
          <li>Particle-based visual effects.</li>
        </ul>
      </div>
    </>
  );
};

export default ShatterEffectDescription;

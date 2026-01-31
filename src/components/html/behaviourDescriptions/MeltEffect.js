import { useRef } from "react";

const MeltEffectDescription = () => {
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
          <b>Melt Effect</b> creates a realistic melting animation where a sprite
          appears to melt downward like wax or liquid. The effect uses physics
          simulation to create natural-looking deformation and dripping behavior.
        </p>

        <h4>Key Features:</h4>
        <ul>
          <li>
            <b>Custom Sprite</b>: Use a custom sprite/image for the melt effect
            (upload or select a different texture).
          </li>
          <li>
            <b>Grid-Based Deformation</b>: Divides the sprite into a grid that
            deforms to simulate melting.
          </li>
          <li>
            <b>Gravity Simulation:</b> Realistic downward pull that affects the
            melting speed and direction.
          </li>
          <li>
            <b>Viscosity Control:</b> Adjusts how quickly the material flows
            (higher values = slower, more viscous).
          </li>
          <li>
            <b>Horizontal Spread:</b> Controls how much the melted material spreads
            horizontally as it falls.
          </li>
          <li>
            <b>Blur Effect:</b> Optional blur to create a more liquid, flowing
            appearance.
          </li>
          <li>
            <b>Threshold Control:</b> Determines when pixels start to melt based
            on their position.
          </li>
        </ul>

        <h4>Adjustable Parameters:</h4>
        <ul>
          <li>
            <b>Grid Columns/Rows:</b> Number of grid cells for deformation
            (affects detail level).
          </li>
          <li>
            <b>Gravity:</b> Downward force affecting the melt speed.
          </li>
          <li>
            <b>Viscosity:</b> Flow resistance (0-1 range, higher = slower flow).
          </li>
          <li>
            <b>Horizontal Spread:</b> How much the material spreads sideways as
            it melts.
          </li>
          <li>
            <b>Duration:</b> Total time for the melting animation.
          </li>
          <li>
            <b>Blur Amount:</b> Strength of the blur effect for liquid appearance.
          </li>
          <li>
            <b>Threshold:</b> Position threshold determining when melting begins
            (0-1 range).
          </li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>gridCols</b>, <b>gridRows</b> — Grid cells for deformation.</li>
          <li><b>gravity</b> — Downward force affecting melt speed.</li>
          <li><b>viscosity</b> — Flow resistance (0-1, higher = slower).</li>
          <li><b>horizontalSpread</b> — Sideways spread as material melts.</li>
          <li><b>duration</b> — Total melt animation time.</li>
          <li><b>blurAmount</b> — Blur strength for liquid look.</li>
          <li><b>threshold</b> — Position (0-1) when melting begins.</li>
          <li><b>customSprite</b> — Optional custom texture.</li>
        </ul>

        <h4>Applications:</h4>
        <ul>
          <li>Melting and liquid effects.</li>
          <li>Wax or candle animations.</li>
          <li>Destruction effects with deformation.</li>
          <li>Transition animations with organic movement.</li>
        </ul>
      </div>
    </>
  );
};

export default MeltEffectDescription;

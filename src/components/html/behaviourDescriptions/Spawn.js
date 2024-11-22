import { useRef } from "react";

const SpawnDescription = () => {
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
          <b>Spawn Behaviour</b> provides a powerful and flexible framework for
          creating and initializing particles in diverse patterns and shapes. It
          supports dynamic configurations, allowing developers to craft visually
          stunning particle systems for interactive and immersive experiences.
        </p>

        <h4>Key Features:</h4>
        <ul>
          <li>
            <b>Customizable Spawn Types:</b> Choose from multiple predefined
            spawning patterns, including:
            <ul>
              <li>
                <b>Rectangle:</b> Uniform distribution within a rectangle.
              </li>
              <li>
                <b>Ring:</b> Circular arrangement of particles.
              </li>
              <li>
                <b>Star:</b> Particles arranged in a star pattern.
              </li>
              <li>
                <b>Grid:</b> Organized particle grids.
              </li>
              <li>
                <b>Word:</b> Align particles to form text-based patterns.
              </li>
              <li>
                <b>Spherical:</b> 3D sphere-shaped spawning.
              </li>
              <li>
                <b>Cone:</b> Conical particle distribution.
              </li>
              <li>
                <b>Frame:</b> Particles along the edges of a shape.
              </li>
            </ul>
          </li>
          <li>
            <b>Dynamic Positioning:</b> Customize initial positions and apply
            variances for natural randomness in effects.
          </li>
          <li>
            <b>Perspective Scaling:</b> Simulate 3D effects by scaling particle
            size and opacity based on depth (z-coordinate).
          </li>
          <li>
            <b>Shape Parameters:</b> Fine-tune geometric attributes, such as:
            <ul>
              <li>
                <b>Radius:</b> Size of circular patterns.
              </li>
              <li>
                <b>Star Points:</b> Define the number of points in a star.
              </li>
              <li>
                <b>Rows & Columns:</b> Dimensions for grid-based layouts.
              </li>
              <li>
                <b>Cone Angle:</b> Spread angle for cone distributions.
              </li>
            </ul>
          </li>
          <li>
            <b>Text Configurations:</b> Tailor text-based particle patterns
            with:
            <ul>
              <li>
                <b>Word:</b> Specify the text to render.
              </li>
              <li>
                <b>Font Size:</b> Adjust text size for particles.
              </li>
              <li>
                <b>Font Spacing:</b> Define spacing between particles in text.
              </li>
              <li>
                <b>Text Alignment:</b> Control alignment (e.g., left, center,
                right).
              </li>
            </ul>
          </li>
        </ul>

        <h4>Practical Applications:</h4>
        <ul>
          <li>Craft dynamic text-based animations using particles.</li>
          <li>Generate stunning visual effects like stars, rings, or grids.</li>
          <li>Simulate 3D visuals with depth and perspective scaling.</li>
          <li>
            Create interactive animations with precise control over positioning
            and density.
          </li>
        </ul>

        <h4>Examples:</h4>
        <span>
          <a href="/?effect=allSpawnsInOneEmitter" target="_blank">
            All Spawn Types in One Emitter
          </a>
          <br />
          <a href="/?effect=animatedHelloWord" target="_blank">
            Animated: Hello How Are You?
          </a>
          <br />
          <a href="/?effect=helloWord" target="_blank">
            Static: Hello Word
          </a>
          <br />
          <a href="/?effect=star" target="_blank">
            Star Pattern
          </a>
          <br />
          <a href="/?effect=starAnimations" target="_blank">
            Star Animation
          </a>
        </span>
      </div>
    </>
  );
};

export default SpawnDescription;

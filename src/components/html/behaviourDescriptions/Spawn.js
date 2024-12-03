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
          <b>Spawn Behaviour</b> is a flexible and feature-rich framework for
          creating dynamic particle systems. It supports a wide variety of spawn
          types and patterns with advanced customization options to bring
          animations to life.
        </p>

        <h4>Key Features:</h4>
        <ul>
          <li>
            <b>Versatile Spawn Types:</b> Includes multiple predefined spawning
            methods:
            <ul>
              <li>
                <b>Rectangle:</b> Uniform particle distribution in a rectangular
                area.
              </li>
              <li>
                <b>Ring:</b> Particles arranged in circular patterns.
              </li>
              <li>
                <b>Star:</b> Configurable star-shaped distributions.
              </li>
              <li>
                <b>Grid:</b> Particles organized in a grid with rows and
                columns.
              </li>
              <li>
                <b>Word:</b> Particles form text or word-based shapes.
              </li>
              <li>
                <b>Spherical:</b> 3D sphere-shaped spawning.
              </li>
              <li>
                <b>Cone:</b> Conical particle distributions with customizable
                angles.
              </li>
              <li>
                <b>Frame:</b> Particles along the edges of a frame.
              </li>
              <li>
                <b>Bezier:</b> Particles follow Bezier curve paths.
              </li>
              <li>
                <b>Helix:</b> Spiral helix distributions with adjustable pitch
                and turns.
              </li>
              <li>
                <b>Heart:</b> Heart-shaped particle formations.
              </li>
              <li>
                <b>Lissajous:</b> Complex, figure-eight-like paths.
              </li>
              <li>
                <b>Spring:</b> Spring-like patterns with coiled loops and depth
                effects.
              </li>
              <li>
                <b>Path:</b> Particles distributed along a custom path defined
                by points.
              </li>
              <li>
                <b>Oval:</b> Elliptical particle distributions.
              </li>
            </ul>
          </li>
          <li>
            <b>Trail Effects:</b> Create animations where particles follow a
            trail with adjustable speed, looping, and spawning along the entire
            trail or at specific positions.
          </li>
          <li>
            <b>Perspective Scaling:</b> Adds depth realism by scaling particles
            and adjusting opacity based on their z-coordinate.
          </li>
          <li>
            <b>Advanced Shape Parameters:</b> Customize various shape
            attributes:
            <ul>
              <li>
                <b>Radius:</b> Defines size for circular shapes.
              </li>
              <li>
                <b>Star Points:</b> Number of points in star-shaped patterns.
              </li>
              <li>
                <b>Cone Angle:</b> Adjust spread for conical patterns.
              </li>
              <li>
                <b>Grid Dimensions:</b> Rows and columns for grid layouts.
              </li>
            </ul>
          </li>
          <li>
            <b>Text-Based Patterns:</b> Generate particle-based text animations:
            <ul>
              <li>
                <b>Word:</b> Specify text to render as particle shapes.
              </li>
              <li>
                <b>Font Size:</b> Control text size for better visibility.
              </li>
              <li>
                <b>Font Spacing:</b> Adjust spacing between particles in text.
              </li>
              <li>
                <b>Alignment:</b> Manage horizontal and vertical text alignment.
              </li>
            </ul>
          </li>
          <li>
            <b>Custom Paths:</b> Supports advanced motion paths, including
            Bezier curves and user-defined point sequences for complex
            animations.
          </li>
        </ul>

        <h4>Applications:</h4>
        <ul>
          <li>Create engaging text animations with particles.</li>
          <li>
            Design 3D-like effects with perspective scaling and depth realism.
          </li>
          <li>
            Simulate dynamic motion paths for particles in games or UI effects.
          </li>
          <li>
            Produce stunning animations with trails and interactive patterns.
          </li>
        </ul>

        <h4>Live Examples:</h4>
        <span>
          <a href="/?effect=allSpawnsInOneEmitter" target="_blank">
            All Spawn Types in One Emitter
          </a>
          <br />
          <a href="/?effect=animatedHelloWord" target="_blank">
            Animated: Hello How Are You?
          </a>
          <br />
          <a href="/?effect=house" target="_blank">
            Animated: House
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
          <br />
          <a href="/?effect=path" target="_blank">
            Path
          </a>
          <br />
          <a href="/?effect=trailing" target="_blank">
            Trail Animation
          </a>
        </span>
      </div>
    </>
  );
};

export default SpawnDescription;

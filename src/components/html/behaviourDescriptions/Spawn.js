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
          <b>Spawn Behaviour</b> is a comprehensive framework for creating
          dynamic and interactive particle systems. It allows developers to
          generate particles in diverse patterns with fine-tuned control over
          position, density, movement, and visual effects.
        </p>

        <h4>Key Features:</h4>
        <ul>
          <li>
            <b>Versatile Spawn Types:</b> Supports various spawning methods,
            including:
            <ul>
              <li>
                <b>Rectangle:</b> Particles distributed uniformly in a
                rectangular area.
              </li>
              <li>
                <b>Ring:</b> Circular patterns with adjustable radii.
              </li>
              <li>
                <b>Star:</b> Configurable star-shaped distributions.
              </li>
              <li>
                <b>Grid:</b> Organized grids of particles with adjustable rows
                and columns.
              </li>
              <li>
                <b>Word:</b> Particles aligned to form text shapes.
              </li>
              <li>
                <b>Spherical:</b> 3D sphere-shaped spawning with depth control.
              </li>
              <li>
                <b>Cone:</b> Conical particle distributions with customizable
                angles.
              </li>
              <li>
                <b>Frame:</b> Particles along the edges of rectangular or
                circular frames.
              </li>
              <li>
                <b>Bezier:</b> Particles moving along Bezier curves.
              </li>
              <li>
                <b>Helix:</b> Spiral helix particle patterns.
              </li>
              <li>
                <b>Heart:</b> Particles forming a heart-shaped curve.
              </li>
              <li>
                <b>Lissajous:</b> Mathematical figure-eight-like paths.
              </li>
              <li>
                <b>Spring:</b> Particles distributed along a 3D spring-like
                spiral with adjustable radius, pitch, and number of turns,
                creating a dynamic, coiled effect.
              </li>
              <li>
                <b>Path:</b> Particles are distributed along a user-defined
                series of connected points. The path can consist of
                straight-line segments, with optional 3D depth variations.
              </li>
            </ul>
          </li>
          <li>
            <b>Perspective Effects:</b> Simulates 3D visuals by scaling
            particles based on depth, adding realism with opacity and size
            adjustments.
          </li>
          <li>
            <b>Shape Parameters:</b> Configure shapes with options such as:
            <ul>
              <li>
                <b>Radius:</b> Define circle and sphere sizes.
              </li>
              <li>
                <b>Star Points:</b> Customize the number of points in a star.
              </li>
              <li>
                <b>Cone Angle:</b> Adjust spread for conical patterns.
              </li>
              <li>
                <b>Grid Rows/Columns:</b> Set grid dimensions for organized
                layouts.
              </li>
            </ul>
          </li>
          <li>
            <b>Text-Based Spawning:</b> Generate particles aligned with text:
            <ul>
              <li>
                <b>Word:</b> Specify the text to render as particle shapes.
              </li>
              <li>
                <b>Font Size:</b> Adjust text size for clarity.
              </li>
              <li>
                <b>Font Spacing:</b> Control spacing between particles in text.
              </li>
              <li>
                <b>Text Alignment:</b> Manage horizontal and vertical alignment.
              </li>
            </ul>
          </li>
          <li>
            <b>Advanced Movement Patterns:</b> Includes support for paths like
            Bezier curves, figure-eight motions, and spiral helixes.
          </li>
        </ul>

        <h4>Applications:</h4>
        <ul>
          <li>Craft visually engaging animations for text or shapes.</li>
          <li>Create 3D-like particle systems with realistic depth effects.</li>
          <li>Generate interactive particle effects for UI or games.</li>
          <li>Simulate complex motion paths with ease.</li>
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
        </span>
      </div>
    </>
  );
};

export default SpawnDescription;

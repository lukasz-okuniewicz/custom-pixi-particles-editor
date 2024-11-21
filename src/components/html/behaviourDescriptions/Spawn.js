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
          <b>Spawn Behaviour</b> offers a powerful and flexible system for
          initializing particles in various shapes, patterns, and arrangements.
          It supports advanced configurations for dynamic effects, making it
          ideal for creating visually compelling particle systems.
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behavior on or off.
          </li>
          <li>
            <b>Priority</b>: Determines the execution order relative to other
            behaviors.
          </li>
          <li>
            <b>Spawn Type</b>: Choose from predefined spawning patterns,
            including:
            <ul>
              <li>
                <b>Rectangle</b>: Uniform distribution within a rectangular
                area.
              </li>
              <li>
                <b>Ring</b>: Particles spawn in a circular pattern.
              </li>
              <li>
                <b>Star</b>: Creates a star-shaped particle distribution.
              </li>
              <li>
                <b>Grid</b>: Organizes particles in a grid layout.
              </li>
              <li>
                <b>Word</b>: Particles form text or word-based patterns.
              </li>
              <li>
                <b>Spherical</b>: 3D sphere-based spawning.
              </li>
              <li>
                <b>Cone</b>: Generates particles within a conical shape.
              </li>
              <li>
                <b>Frame</b>: Particles spawn along the borders of a frame.
              </li>
            </ul>
          </li>
          <li>
            <b>Position & Variance</b>: Define the starting position and apply
            randomness for natural-looking effects.
          </li>
          <li>
            <b>Perspective</b>: Enables depth-based scaling for 3D-like effects,
            with customizable maximum z-distance.
          </li>
          <li>
            <b>Shape Parameters</b>: Customize properties like:
            <ul>
              <li>
                <b>Radius</b>: Defines the size of circular shapes.
              </li>
              <li>
                <b>Star Points</b>: Number of points in star-shaped patterns.
              </li>
              <li>
                <b>Rows & Columns</b>: Control grid layout dimensions.
              </li>
              <li>
                <b>Cone Angle</b>: Adjust the spread of conical spawning.
              </li>
            </ul>
          </li>
          <li>
            <b>Text Parameters</b>: Fine-tune text-based patterns with:
            <ul>
              <li>
                <b>Word</b>: Specify the text to render.
              </li>
              <li>
                <b>Font Size</b>: Set the size of the text.
              </li>
              <li>
                <b>Font Spacing</b>: Adjust spacing between particles forming
                the text.
              </li>
              <li>
                <b>Text Alignment</b>: Control alignment (e.g., left, center).
              </li>
            </ul>
          </li>
        </ul>

        <h4>Use Cases:</h4>
        <ul>
          <li>Create dynamic text-based particle animations.</li>
          <li>Generate visually rich patterns like stars, rings, or grids.</li>
          <li>Simulate 3D effects with perspective scaling.</li>
          <li>
            Develop interactive effects with precise positioning and density.
          </li>
        </ul>

        <h4>Live Examples:</h4>
        <span>
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

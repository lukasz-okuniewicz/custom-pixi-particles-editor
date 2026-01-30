import { useRef } from "react";

const Wireframe3DDescription = () => {
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
          <b>Wireframe 3D Behaviour</b> draws 3D wireframe shapes projected to
          2D using PixiJS Graphics. Supports multiple shapes, depth styling,
          motion, dashed lines, color cycling, noise wobble, and optional
          particle attraction.
        </p>

        <h4>Shapes</h4>
        <ul>
          <li>Cube, Sphere, Pyramid, Tetrahedron, Octahedron</li>
          <li>Torus, Cylinder, Grid (plane), Lattice (3D grid)</li>
          <li>Custom (vertices + edges in config)</li>
        </ul>

        <h4>Depth &amp; visibility</h4>
        <ul>
          <li>
            <b>Depth style</b>: Fade or thickness by depth (far = dimmer/thinner).
          </li>
          <li>
            <b>Sort by depth</b>: Draw back edges first for correct overlap.
          </li>
        </ul>

        <h4>Motion</h4>
        <ul>
          <li>
            <b>Orbit</b>: Wireframe orbits around center (radius, speed).
          </li>
          <li>
            <b>Pulsate size</b>: Size oscillates between min and max.
          </li>
          <li>
            <b>Path</b>: Center follows Circle, Lissajous, or Figure-8.
          </li>
        </ul>

        <h4>Line style</h4>
        <ul>
          <li>
            <b>Dashed lines</b>: Dash length and gap length.
          </li>
          <li>
            <b>Color over time</b>: Hue cycles for neon/data-viz look.
          </li>
          <li>
            <b>Per-vertex color</b>: Lines dim by depth.
          </li>
        </ul>

        <h4>Procedural &amp; interaction</h4>
        <ul>
          <li>
            <b>Noise wobble</b>: Vertices perturbed by 3D noise for organic motion.
          </li>
          <li>
            <b>Attract particles</b>: Pulls particles toward wireframe center.
          </li>
        </ul>

        <p>
          Use <b>wireframes</b> in config for multiple shapes (array of shape
          configs). Use <b>customVertices</b> and <b>customEdges</b> for custom
          meshes.
        </p>
      </div>
    </>
  );
};

export default Wireframe3DDescription;

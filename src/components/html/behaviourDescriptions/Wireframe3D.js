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

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behaviour on or off.
          </li>
          <li>
            <b>Priority</b>: Execution order relative to other behaviours.
          </li>
          <li>
            <b>Shape Type</b>: Cube, Sphere, Pyramid, Tetrahedron, Octahedron,
            Torus, Cylinder, Grid, Lattice, or Custom.
          </li>
          <li>
            <b>Size</b>: Scale of the wireframe shape.
          </li>
          <li>
            <b>Rotation Speed X/Y/Z</b>: Rotation speed per axis (radians per
            second).
          </li>
          <li>
            <b>Line Color, Line Width</b>: Stroke color (hex) and width.
          </li>
          <li>
            <b>Perspective, Camera Z</b>: 3D projection parameters for depth.
          </li>
        </ul>

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

        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>shapeType</b> — cube, sphere, pyramid, tetrahedron, octahedron, torus, cylinder, grid, lattice, or custom.</li>
          <li><b>size</b> — Scale of the wireframe.</li>
          <li><b>rotationSpeedX/Y/Z</b> — Rotation per axis (rad/s).</li>
          <li><b>lineColor</b> — Stroke color (hex).</li>
          <li><b>lineWidth</b> — Stroke width.</li>
          <li><b>perspective</b>, <b>cameraZ</b> — 3D projection.</li>
          <li><b>depthStyle</b> — none, fade, thickness, or both.</li>
          <li><b>sortByDepth</b> — Draw back edges first.</li>
          <li><b>orbitEnabled</b>, <b>orbitRadius</b>, <b>orbitSpeed</b> — Orbit motion.</li>
          <li><b>pulsateEnabled</b>, <b>pulsateMin</b>, <b>pulsateMax</b>, <b>pulsateSpeed</b> — Size pulsation.</li>
          <li><b>pathType</b> — none, circle, lissajous, or figure8.</li>
          <li><b>pathSpeed</b>, <b>pathScale</b> — Path motion (when pathType ≠ none).</li>
          <li><b>dashedEnabled</b>, <b>dashLength</b>, <b>gapLength</b> — Dashed lines.</li>
          <li><b>colorOverTimeEnabled</b>, <b>colorOverTimeSpeed</b> — Hue cycle over time.</li>
          <li><b>perVertexColor</b> — Color/dim by depth.</li>
          <li><b>noiseWobbleEnabled</b>, <b>noiseWobbleAmount</b>, <b>noiseWobbleSpeed</b> — Vertex noise.</li>
          <li><b>attractParticlesEnabled</b>, <b>attractStrength</b> — Pull particles to center.</li>
          <li><b>latticeSegmentsX/Y/Z</b> — Lattice divisions (shape lattice).</li>
          <li><b>gridSegments</b> — Grid divisions (shape grid).</li>
          <li><b>torusInnerRadius</b> — Torus hole ratio 0-1 (shape torus).</li>
          <li><b>cylinderHeight</b> — Cylinder height multiplier (shape cylinder).</li>
          <li><b>customVertices</b>, <b>customEdges</b> — Custom mesh (shape custom).</li>
          <li><b>wireframes</b> — Array of shape configs for multiple wireframes.</li>
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

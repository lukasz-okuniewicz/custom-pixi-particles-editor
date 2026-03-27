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
          <b>Spawn Behaviour</b> defines where particles appear at birth. It
          supports shape-based emitters, trail emitters, deterministic seeded
          randomness, and multi-point composition so you can build both stable
          presets and expressive procedural looks.
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behaviour on or off.
          </li>
          <li>
            <b>Priority</b>: Execution order relative to other behaviours.
          </li>
          <li><b>Random Seed</b>: Reproducible spawn randomness for export/preset parity.</li>
          <li><b>Composition Mode</b>: Pick custom points by random, weighted, sequence, or burstCycle.</li>
          <li><b>Max Spawn Calc ms</b>: Soft budget for expensive spawn math with a safe fallback.</li>
          <li><b>Custom Points</b>: Per-point shape, position, distribution, emission area, and shape-specific params.</li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>trailingEnabled</b>, <b>spawnAlongTrail</b>, <b>trailSpeed</b>, <b>trailRepeat</b>, <b>trailStart</b>, <b>trailRangeSegments</b>, <b>trailRangeWeightFactor</b>, <b>trailRangeLength</b> — Trail spawning options.</li>
          <li><b>randomSeed</b> — Optional deterministic RNG seed.</li>
          <li><b>compositionMode</b> — How custom points are selected: random, weighted, sequence, burstCycle.</li>
          <li><b>maxSpawnCalcMs</b> — Soft cost guard for heavy spawn computations.</li>
          <li><b>customPoints</b> — Each point includes <b>spawnType</b>, <b>weight</b>, <b>distribution</b>, <b>emissionArea</b>, and shape-specific fields.</li>
        </ul>
        <h4>Spawn Types (per Custom Point):</h4>
        <ul>
          <li>
            <b>Rectangle:</b> Uniform particle distribution in a rectangular
            area.
          </li>
          <li>
            <b>Frame:</b> Particles along the edges of a frame.
          </li>
          <li>
            <b>Frame Rectangle:</b> Frame with rectangular inner bounds.
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
          <li>
            <b>Polygon:</b> N-gon emission with configurable side count.
          </li>
          <li>
            <b>Arc:</b> Partial-circle perimeter emission between start/end angles.
          </li>
          <li>
            <b>Sector:</b> Wedge emission with inner/outer radius and angle range.
          </li>
          <li>
            <b>Distribution / Emission Area:</b> Choose uniform or weighted profiles, and edge-only vs fill sampling on supported shapes.
          </li>
          <li>
            <b>Trail Effects:</b> Animate a moving “head” along the spawn path
            (e.g. Frame, Ring, Bezier) so particles appear along the trail.
            <ul>
              <li>
                <b>Trailing Enabled:</b> Turns on trail mode (path types only;
                not available for Rectangle, Word, Grid, etc.).
              </li>
              <li>
                <b>Spawn Along Trail:</b> When <b>on</b>, particles are spread
                evenly along the trail. When <b>off</b>, more particles spawn
                near the leading edge (controlled by Trail Range Weight Factor).
              </li>
              <li>
                <b>Trail Speed / Repeat / Start:</b> Speed along the path,
                whether to loop, and where on the path (0-1) the trail begins.
              </li>
              <li>
                <b>Trail Range Segments:</b> Number of sample points along the
                trail; higher values give a smoother distribution.
              </li>
              <li>
                <b>Trail Range Weight Factor:</b> When Spawn Along Trail is off,
                how strongly particles are biased toward the leading edge
                (higher = more at the front).
              </li>
              <li>
                <b>Trail Range Length (0-1):</b> Length of the trail segment
                that gets particles. <b>1</b> = from path start to head;
                <b>0.2</b> = only the last 20%, so the path start (e.g. top-left
                of a Frame) stays clear. When the loop restarts, the tail at the
                end of the path stays visible until the head moves on.
              </li>
            </ul>
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
            Bezier curves and user-defined point sequences with <b>Path Interpolation</b> (linear/catmullRom), <b>Path Sampling</b> (bySegment/byDistance), and optional <b>Closed Path</b>.
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

import { useRef } from "react";

const FormPatternDescription = () => {
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
          <b>Form Pattern Behaviour</b> assigns each particle its own target on
          a pattern (preset shape, text, SVG path or raw SVG markup, image data
          URL, baked points, named presets, multi-frame baked animation, or point
          weights). When <b>Active</b> is on,
          particles ease from their
          current positions into that layout. When <b>Active</b> is off, motion
          is re-seeded from <b>PositionBehaviour</b> so particles drift again.
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Master toggle. When off, the behaviour does nothing.
          </li>
          <li>
            <b>Active</b>: When true, particles move toward their pattern
            targets. When false, they return to normal physics-driven motion.
          </li>
          <li>
            <b>Pattern mode</b>:
            <ul>
              <li>
                <code>presetShape</code> — Built-in outline: circle, rectangle,
                or star (parameters below).
              </li>
              <li>
                <code>runtimeText</code> — Renders the string with the chosen
                font in a canvas and samples opaque pixels. Requires a browser
                (DOM/canvas).
              </li>
              <li>
                <code>bakedPoints</code> — Uses an array of <code>{`{x,y}`}</code>{" "}
                saved in config (e.g. after <b>Bake text to points</b> for
                headless/export use). Use <b>cloud</b> vs <b>polyline</b> to
                choose point-cloud matching vs arc-length resampling along the
                path.
              </li>
              <li>
                <code>svgPath</code> — Flatten SVG <code>d</code> (M L H V C Q Z)
                to points, then resample like presets.
              </li>
              <li>
                <code>bakedFrames</code> — Array of point clouds (one per frame);
                drive <b>Frame index</b> for sprite-sheet–style formations.
              </li>
              <li>
                <code>imageBitmap</code> — Sample opaque pixels from a data URL
                (async decode; falls back to a circle until loaded). Optional{" "}
                <b>Match particle colors to image</b> sets each particle&apos;s
                RGB from its assigned sample (works with all assignment modes).{" "}
                <b>Image fit mode</b> controls how source pixels are normalized
                before sampling (<code>none</code>, <code>contain</code>,{" "}
                <code>cover</code>, <code>stretch</code>). <b>Image sampling</b>{" "}
                supports <code>fill</code>, <code>edges</code>, and{" "}
                <code>hybrid</code> extraction for silhouette-heavy looks.{" "}
                <b>Image frames JSON</b> and frame playback controls let you
                animate image formations over time.{" "}
                <b>Restore original colors when form pattern ends</b> keeps a
                snapshot of color/colorStart/colorEnd before tinting and reapplies
                it when <b>Active</b> is turned off or the behaviour is disabled.{" "}
                <b>Image color blend (ms)</b> linearly interpolates from the
                particle&apos;s current RGB to the image sample over that duration
                (0 = apply image color immediately). <b>Image color mode</b>{" "}
                supports raw, channel quantization, palette mapping, and luma-only
                stylization.{" "}
                <b>Sample by alpha weight</b> biases density toward more opaque
                pixels. Extra controls include sampling density/min spacing,
                edge thickness + detector, luma/hue masking, temporal coherence,
                frame blending, progressive refine, and image debug overlays.
              </li>
            </ul>
          </li>
          <li>
            <b>Point budget</b>: Upper bound for how many samples are taken when
            building the pattern (shape complexity / text density).
          </li>
          <li>
            <b>Center</b>, <b>Scale</b>, <b>Rotation (deg)</b>: Transform the
            pattern in emitter space after it is built.{" "}
            <b>Live formation transform</b> reapplies transform every frame from
            stored local targets (animate the formation without rebuilding
            assignment).
          </li>
          <li>
            <b>Morph blend</b> (preset shape): Interpolate between the primary
            preset and a second preset. <b>Morph timeline</b> can drive blend
            over time from keyframe JSON. <b>Assignment optimal</b> uses
            Hungarian up to <b>Optimal max particles</b>, then greedy.{" "}
            <code>pathOrder</code> sorts by nearest target index for wipe-style
            motion. <b>Stagger order</b> (random / index / angle) controls wave
            timing. <b>Path variety</b> and <b>Path variety seed</b> control arc,
            spiral, sine, and noise variation. <b>Visual modulation</b> applies a
            separate ease to alpha/scale along the chord. <b>Arrival overshoot</b>{" "}
            adds a settle pulse. <b>Follow emitter world position</b> adds{" "}
            <code>Emitter.worldPosition</code> to offsets. <b>Audio react</b>{" "}
            scales speed or morph when you set <code>audioLevelGetter</code> at
            runtime. <b>Debug log assignment</b> prints assignment timing to the
            console.
          </li>
          <li>
            <b>Speed</b>, <b>Path Type</b> (linear, sinusoidal, noise, arc,
            spiral, cubic, springSeek), <b>Ease</b>, path params,{" "}
            <b>Physics blend</b> (mix with velocity drift),{" "}
            <b>External offset</b>, <b>Lifetime progress offset</b>,{" "}
            <b>Arrival Threshold</b>, <b>Kill On Arrival</b>, <b>Linger</b>,{" "}
            <b>Progress mode</b>, <b>Stagger</b>, <b>Assignment</b>,{" "}
            <b>Target jitter</b>, <b>Show target / path preview</b>.
          </li>
          <li>
            <b>Priority</b>: Usually negative (e.g. <code>-10</code>) so this
            runs after core position integration and can override position for
            that frame.
          </li>
        </ul>

        <h4>All properties (config)</h4>
        <ul>
          <li>
            <b>enabled</b>, <b>active</b>, <b>priority</b>
          </li>
          <li>
            <b>patternMode</b> — <code>bakedPoints</code> |{" "}
            <code>presetShape</code> | <code>runtimeText</code> |{" "}
            <code>svgPath</code> | <code>imageBitmap</code>
          </li>
          <li>
            <b>points</b> — Array of <code>{`{x,y}`}</code> for baked mode
          </li>
          <li>
            <b>presetShape</b>, <b>presetParams</b> — Shape name and numeric
            options (radius, rect half sizes, star spikes, etc.)
          </li>
          <li>
            <b>runtimeText</b>, <b>fontFamily</b>, <b>fontSize</b>,{" "}
            <b>fontWeight</b>
          </li>
          <li>
            <b>pointBudget</b>, <b>center</b>, <b>scale</b>, <b>rotation</b>
          </li>
          <li>
            <b>speed</b>, <b>pathType</b>, <b>pathEasing</b>,{" "}
            <b>sinusoidalAmplitude</b>, <b>sinusoidalFrequency</b>,{" "}
            <b>arrivalThreshold</b>, <b>killOnArrival</b>,{" "}
            <b>resetMaxLifeTime</b>
          </li>
        </ul>

        <h4>Notes:</h4>
        <ul>
          <li>
            For predictable results, avoid enabling <b>Move To Point</b> at the
            same time — both fight over particle positions.
          </li>
          <li>
            <b>Bake text to points</b> rasterizes the current runtime text into{" "}
            <code>points</code> and switches mode to <code>bakedPoints</code>{" "}
            so the same silhouette can load without canvas text.
          </li>
        </ul>
      </div>
    </>
  );
};

export default FormPatternDescription;

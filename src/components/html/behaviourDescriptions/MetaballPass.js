import { useRef } from "react";

const MetaballPassDescription = () => {
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
          <b>Metaball Pass</b> is a <b>rendering post-step</b>, not a particle
          behaviour. Your emitter still runs as usual; each frame the particle
          layer is drawn into an offscreen buffer, then <b>blurred</b> and{" "}
          <b>thresholded</b> so soft, overlapping particles merge into a single
          blob-like silhouette—similar to classic &quot;metaball&quot; or
          goo effects (e.g. Particle Love–style looks).
        </p>

        <h4>Why use it?</h4>
        <ul>
          <li>
            <b>Organic blobs</b>: Screen blend + many small sprites become one
            smooth mass after blur + alpha cutoff.
          </li>
          <li>
            <b>Separates motion from look</b>: behaviours control movement;
            Metaball Pass only changes how the frame looks.
          </li>
        </ul>

        <h4>Pipeline (simplified)</h4>
        <ol>
          <li>Render particles into a lower-resolution render texture (optional).</li>
          <li>Apply Gaussian blur (merges nearby brightness).</li>
          <li>
            Apply an alpha threshold (hard) or smooth band (soft edges) to get a
            clean silhouette.
          </li>
          <li>Draw the result centered on the stage (same logical size as the buffer).</li>
        </ol>

        <h4>Enable</h4>
        <p>
          Use <b>Enable</b> to turn the post-pass on or off. Numeric fields stay
          visible either way; when the pass is off they show the default
          template values, and changing a value while off applies the full
          <code>metaballPass</code> object and turns the pass on (with a
          refresh). You do not need a preset entry in{" "}
          <code>particlesDefaultConfig</code> unless you want defaults baked into a
          named effect.
        </p>

        <h4>Key properties</h4>
        <ul>
          <li>
            <b>Buffer width / height</b>: Logical size of the offscreen draw (often
            matches your game viewport, e.g. 1334×750). Particles should be laid out
            in this coordinate space.
          </li>
          <li>
            <b>Resolution scale</b>: Renders the buffer at a fraction of width/height
            (e.g. 0.5) for speed; the result is scaled back up. Lower = faster,
            chunkier blobs.
          </li>
          <li>
            <b>Blur strength</b>: How much neighbouring pixels mix—higher merges
            particles more aggressively.
          </li>
          <li>
            <b>Alpha threshold</b>: After blur, alpha below this value is pushed to
            transparent; above stays visible. Tune for thicker or thinner goo.
          </li>
          <li>
            <b>Edge softness</b>: Width of a smoothstep band around the threshold
            (0 = hard edge). Reduces aliased or flickery boundaries.
          </li>
        </ul>

        <h4>All properties (JSON)</h4>
        <ul>
          <li>
            <code>width</code>, <code>height</code> — Offscreen buffer size in
            pixels.
          </li>
          <li>
            <code>resolutionScale</code> — 0.1–1, multiplier for internal RT size.
          </li>
          <li>
            <code>blurStrength</code> — Blur filter strength.
          </li>
          <li>
            <code>threshold</code> — Alpha cutoff after blur (0–1).
          </li>
          <li>
            <code>edgeSoftness</code> — Smooth band half-width around threshold.
          </li>
          <li>
            <code>clearColor</code> — Optional clear before drawing (advanced).
          </li>
        </ul>

        <h4>Export &amp; presets</h4>
        <p>
          Save a full project JSON that includes a top-level{" "}
          <code>metaballPass</code> object next to <code>emitterConfig</code> if
          you want to share settings. The editor strips <code>metaballPass</code>
          when talking to the core particle library so only the GPU pass uses it.
        </p>

        <h4>Example preset</h4>
        <span>
          <a href="/?effect=particleLoveMetaball" target="_blank">
            Particle Love Metaball
          </a>{" "}
          — flow + flocking tuned for this pass.
        </span>
      </div>
    </>
  );
};

export default MetaballPassDescription;

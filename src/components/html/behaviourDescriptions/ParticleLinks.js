import { useRef } from "react";

const ParticleLinksDescription = () => {
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
          <b>Particle links (mesh)</b> draws line segments between nearby
          particles (Particle Love–style proximity mesh). The link layer sits
          below particle sprites. Settings live under top-level{" "}
          <code>particleLinks</code> in exported JSON and can be updated at
          runtime without rebuilding the emitter.
        </p>

        <h4>Enable</h4>
        <p>
          Use <b>Enable</b> to turn the mesh on or off. All numeric and blend
          fields stay visible when off so you can tune values before toggling
          the effect on.
        </p>

        <h4>Key properties</h4>
        <ul>
          <li>
            <b>Max distance</b>: Maximum pixel distance between two particles
            for a link to be considered.
          </li>
          <li>
            <b>Max links per particle</b>: Caps how many outgoing links each
            particle can form (neighbors are chosen within range).
          </li>
          <li>
            <b>Line width / alpha / color</b>: Stroke appearance. Color uses
            decimal RGB hex when not tinting from particles.
          </li>
          <li>
            <b>Tint lines from particle colors</b>: When on, line color blends
            with particle tints at both ends; when off, uses{" "}
            <b>Line color</b> as the base stroke.
          </li>
          <li>
            <b>Fade lines by distance</b>: Weakens alpha as the link approaches
            max distance.
          </li>
          <li>
            <b>Update every N frames</b>: 1 = rebuild every frame; higher values
            reduce CPU cost for dense systems.
          </li>
          <li>
            <b>Link blend mode</b>: Pixi blend mode for the link{" "}
            <code>Graphics</code> (e.g. screen, add). Empty = no override.
          </li>
        </ul>

        <h4>All properties (JSON)</h4>
        <ul>
          <li>
            <code>enabled</code> — Draw the proximity mesh.
          </li>
          <li>
            <code>maxDistance</code> — Link range in pixels.
          </li>
          <li>
            <code>maxLinksPerParticle</code> — Max links per particle.
          </li>
          <li>
            <code>lineWidth</code>, <code>lineAlpha</code>,{" "}
            <code>lineColor</code> — Stroke width, alpha, and color (decimal
            hex).
          </li>
          <li>
            <code>useParticleTint</code> — Mix stroke with particle colors.
          </li>
          <li>
            <code>fadeByDistance</code> — Distance-based alpha falloff.
          </li>
          <li>
            <code>updateEveryNFrames</code> — Refresh rate for the link graph.
          </li>
          <li>
            <code>blendMode</code> — Optional Pixi blend mode string.
          </li>
        </ul>
      </div>
    </>
  );
};

export default ParticleLinksDescription;

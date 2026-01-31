import { useRef } from "react";

const LissajousHarmonicLatticeDescription = () => {
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
          <b>Lissajous Harmonic Lattice (Cymatic Patterns)</b> — Instead of
          free-roaming, each particle is anchored to a point in a 3D grid and
          follows a complex harmonic oscillation. When thousands move together,
          they create &quot;Cymatic&quot; interference patterns, like vibrating
          sand on a metal plate.
        </p>
        <p>
          <b>Unique logic</b>: Each axis (x, y, z) oscillates at a different
          frequency ratio (a:b:c). By shifting the phase (δ) based on the
          particle&apos;s anchor position (or index), the swarm forms shifting
          geometric knots.
        </p>
        <h4>Visual outputs</h4>
        <ul>
          <li>
            <b>Alpha from restoration force</b>: <code>particle.lissajousRestoration</code> [0-1] —
            distance from anchor (how far the particle is from rest). When the
            particle is at the furthest point of its swing, it glows brightest.
          </li>
          <li>
            <b>Scale from local density</b>: <code>particle.lissajousDensity</code> [0-1] —
            when particles cluster at the nodes of the vibration (anchor
            points), they shrink to look like sharp, high-frequency points.
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>freqX, freqY, freqZ</b> — Frequency ratios for each axis (e.g. 1:2:3).</li>
          <li><b>amplitude</b> — Oscillation amplitude in world units.</li>
          <li><b>speed</b> — Global time scale for the oscillation.</li>
          <li><b>phaseScale</b> — Phase shift from anchor position (spatial phase).</li>
          <li><b>scaleXY</b> — Scale 3D position to 2D display.</li>
          <li><b>writeRestorationForAlpha</b> — Write <code>particle.lissajousRestoration</code> and drive alpha.</li>
          <li><b>writeDensityForScale</b> — Write <code>particle.lissajousDensity</code> and drive scale.</li>
          <li><b>restorationNormalize</b> — Normalize restoration to [0-1].</li>
          <li><b>alphaScale</b>, <b>scaleFromDensity</b> — Direct alpha/scale multipliers when writing.</li>
        </ul>
      </div>
    </>
  );
};

export default LissajousHarmonicLatticeDescription;

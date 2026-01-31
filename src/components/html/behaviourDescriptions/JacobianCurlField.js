import { useRef } from "react";

const JacobianCurlFieldDescription = () => {
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
          <b>Jacobian Curl-Field (Incompressible Flow)</b> — Standard noise
          makes particles clump together. Curl Noise uses the mathematical
          &quot;Curl&quot; of a vector field (cross product of the gradient) so
          the flow is divergence-free. Particles flow around obstacles and each
          other like water, never bunching into ugly dots.
        </p>
        <p>
          <b>Unique logic</b>: We sample a 3D potential field (Simplex noise) and
          take finite-difference gradients, then form velocity = (∂N/∂y,
          −∂N/∂x, …). This forces particles to move along the contours of the
          noise.
        </p>
        <h4>Visual outputs</h4>
        <ul>
          <li>
            <b>Curl magnitude → Hue</b>: <code>particle.curlMagnitude</code> [0-1] —
            how sharp the turn is. Straight-moving particles are cool (blue);
            particles in a tight eddy or whirlpool turn hot (orange/red).
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>noiseScale</b> — Scale of the 3D potential (Simplex) sampling.</li>
          <li><b>speed</b> — Flow speed multiplier.</li>
          <li><b>scaleXY</b> — Scale 3D position to 2D display.</li>
          <li><b>curlMagnitudeNormalize</b> — Normalize curl magnitude to [0-1] for hue.</li>
          <li><b>writeCurlMagnitudeForHue</b> — Write <code>particle.curlMagnitude</code> [0-1].</li>
          <li><b>applyHueToColor</b> — Drive particle color from curl (blue = straight, red = eddy).</li>
          <li><b>hueStraight</b>, <b>hueEddy</b> — Hue in degrees for straight (e.g. 240 = blue) and eddy (e.g. 0 = red).</li>
        </ul>
      </div>
    </>
  );
};

export default JacobianCurlFieldDescription;

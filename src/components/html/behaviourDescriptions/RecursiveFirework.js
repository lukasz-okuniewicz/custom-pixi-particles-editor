import { useRef } from "react";

const RecursiveFireworkDescription = () => {
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
          <b>Recursive Firework</b> simulates a shell firework: a rising comet
          phase, then a burst of sparks that can spawn child comets or sparks
          again up to a recursion depth. It combines burst shapes, palettes,
          depth-based tuning, optional wind, LOD, and chain-reaction modes.
          Each section heading below has its own <b>Show help</b> toggle with
          context for those controls. Every field also shows a{" "}
          <b>tooltip hint</b> next to the control (same style as other
          behaviour panels) describing that property.
        </p>

        <h4>Core flow</h4>
        <ul>
          <li>
            <b>Trigger</b>: When the comet explodes depends on{" "}
            <b>triggerMode</b> (life progress, velocity apex, or distance from
            launch origin).
          </li>
          <li>
            <b>Burst</b>: <b>burstShape</b>, spread, stagger, and per-depth
            tables control how many particles spawn and in which directions.
          </li>
          <li>
            <b>Recursion</b>: <b>childCometProbability</b> and energy rules
            decide whether a child becomes another comet or a spark; depth
            tables and branching modes refine the tree.
          </li>
        </ul>

        <h4>Key property groups</h4>
        <ul>
          <li>
            <b>General</b>: enabled, priority, presets (adjust linked Position /
            Life / Size behaviours).
          </li>
          <li>
            <b>Comet</b>: curve / noise forces, fade in/out, trail style, comet
            tail sub-emission.
          </li>
          <li>
            <b>Explosion</b>: particle count, speed, lifetime, size, alpha,
            spread, direction modes, burst stagger.
          </li>
          <li>
            <b>Colors</b>: explosionColors, palette strategy, palette animation,
            color program, depth color palette mode, depth program presets.
          </li>
          <li>
            <b>Recursion &amp; children</b>: depth, child multipliers, spawn
            budgets, depth-indexed arrays (counts, speeds, delays, energy),
            branching mode, recursion mode (standard / branching comets / chain
            reaction).
          </li>
          <li>
            <b>Randomness</b>: seed, per-shot offset, seed sequence mode (fixed
            cycle, ping-pong, random walk).
          </li>
          <li>
            <b>Environment</b>: wind (constant or noise), depth fog, LOD
            thresholds, adaptive throttle.
          </li>
          <li>
            <b>Polish</b>: two-stage carriers, shockwave, glow, layered
            explosions, secondary sparkle/crackle, debug overlays.
          </li>
          <li>
            <b>2.5D</b>: Z velocity, perspective, z-index, z-scale vs depth.
          </li>
        </ul>

        <h4>Optional config groups (JSON in file)</h4>
        <p>
          The behaviour can also read nested objects <b>recursion</b>,{" "}
          <b>explosion</b>, <b>trail</b>, <b>depth</b>, and{" "}
          <b>performance</b> that map onto the same flat fields at runtime. The
          editor prefers editing those flat properties directly.
        </p>

        <h4>Tips</h4>
        <ul>
          <li>
            Enable <b>Advanced</b> to access trigger modes, burst shapes,
            depth tables, and full tuning.
          </li>
          <li>
            Watch <b>spawn limits</b> and <b>max total children per shot</b> to
            avoid GPU overload; use LOD and adaptive throttle on dense scenes.
          </li>
        </ul>
      </div>
    </>
  );
};

export default RecursiveFireworkDescription;

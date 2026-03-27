import { useRef } from "react";

const LifeDescription = () => {
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
          <b>Life Behaviour</b> controls the lifespan of particles in a system,
          defining how long they remain active before disappearing. This
          behavior helps create natural, dynamic effects by managing the
          lifecycle of particles.
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behavior on or off.
          </li>
          <li>
            <b>Priority</b>: Determines when this behavior is executed relative
            to other behaviors.
          </li>
          <li>
            <b>Max Lifetime</b>: Maximum duration (seconds). Use{" "}
            <b>-1</b> for infinite life (persistent pools / wrap effects).
          </li>
          <li>
            <b>Time Variance</b>: Adds randomness to the lifetime, allowing for
            variation between particles and enhancing realism.
          </li>
          <li>
            <b>Progress Mode</b>: Controls normalized progress mapping
            (linear/loop/ping-pong).
          </li>
          <li>
            <b>Start Delay</b> + <b>Start Delay Variance</b>: Delay life start
            per particle.
          </li>
          <li>
            <b>Time Scale</b> + <b>Time Scale Variance</b>: Speed up or slow
            down life progression per particle.
          </li>
          <li>
            <b>Infinite life phase offset</b>: Desynchronizes infinite-life
            cycling.
          </li>
          <li>
            <b>Kill At Progress</b>: Optional early death at a progress
            threshold.
          </li>
          <li>
            <b>Timeline uses life progress for infinite life</b>: Opt-in
            compatibility mode for TimelineBehaviour.
          </li>
        </ul>

        <h4>How It Works:</h4>
        <p>
          The behavior initializes each particle with a <b>maximum lifetime</b>
          based on the specified value and an optional variance. As the system
          updates, it tracks the particle&apos;s <b>lifetime</b> and calculates
          its
          <b>life progress</b> (a normalized value between 0 and 1). This
          progress can be used by other behaviors to create dynamic effects,
          such as fading particles as they approach the end of their lifespan.
        </p>

        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>maxLifeTime</b> — Maximum particle lifetime (seconds).</li>
          <li><b>timeVariance</b> — Random variation added to lifetime.</li>
          <li><b>progressMode</b> — linear / loop / pingPong.</li>
          <li><b>startDelay</b> — Delay before life starts.</li>
          <li><b>startDelayVariance</b> — Random delay spread.</li>
          <li><b>timeScale</b> — Life progression multiplier.</li>
          <li><b>timeScaleVariance</b> — Random time-scale spread.</li>
          <li><b>infiniteLifeVisualPeriod</b> — Infinite-life progress cycle period.</li>
          <li><b>infiniteLifePhaseOffset</b> — Infinite-life phase offset base.</li>
          <li><b>killAtProgress</b> — Optional early-death threshold.</li>
          <li><b>useLifeProgressForInfiniteTimeline</b> — Timeline infinite fallback toggle.</li>
        </ul>
        <h4>Use Cases:</h4>
        <ul>
          <li>
            Controlling the duration of particles in effects like smoke, fire,
            or explosions.
          </li>
          <li>
            Synchronizing other behaviors (e.g., size, color, or velocity) with
            a particle&apos;s life progress for gradual transitions.
          </li>
          <li>
            Adding variation to particle lifetimes for a more organic and
            natural appearance.
          </li>
        </ul>

        <h4>Live Examples:</h4>
        <span>
          <a href="/?effect=fadingParticles" target="_blank">
            Fading Particles
          </a>
          <br />
          <a href="/?effect=smoke" target="_blank">
            Smoke Effect
          </a>
        </span>
      </div>
    </>
  );
};

export default LifeDescription;

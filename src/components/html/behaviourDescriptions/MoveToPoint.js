import { useRef } from "react";

const MoveToPointDescription = () => {
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
          <b>Move To Point Behaviour</b> directs particles in a system towards a
          specified (x, y) coordinate along a defined path, potentially with
          custom easing. When activated, this behavior can override other
          positional behaviors, causing all affected particles to converge at or
          move towards the defined target.
        </p>

        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behavior on or off. If disabled, it
            won&apos;t affect particles even if active.
          </li>
          <li>
            <b>Active</b>: A boolean flag that, when true, activates the
            movement towards the target point. When false, particles resume
            their normal behavior.
          </li>
          <li>
            <b>Target Point</b>: An object with <code>x</code> and
            <code>y</code> properties defining the destination coordinates for
            the particles.
          </li>
          <li>
            <b>Speed</b>: The rate (in units per second) at which particles
            travel towards the <code>targetPoint</code>.
          </li>
          <li>
            <b>Priority</b>: Determines the execution order relative to other
            behaviors. A lower value typically means it runs later, allowing it
            to override earlier positional changes (e.g., -10 to run after
            standard position and emit direction behaviors).
          </li>
          <li>
            <b>Path Type</b>: Defines the trajectory particles follow:
            <ul>
              <li>
                <code>linear</code>: Particles move in a straight line to the
                target.
              </li>
              <li>
                <code>sinusoidal</code>: Particles move towards the target with
                a wave-like motion perpendicular to the direct path. The wave
                amplitude diminishes as the particle approaches the target.
              </li>
            </ul>
          </li>
          <li>
            <b>Path Easing</b>: (Used when <code>Path Type</code> is
            <code>linear</code> or <code>sinusoidal</code>) Specifies an easing
            function for the particle&apos;s progress along the main path to the
            target. Options include: <code>linear</code>,<code>back.in</code>,
            <code>back.out</code>, <code>back.inOut</code>,{" "}
            <code>power1.in</code>,<code>power1.out</code>,{" "}
            <code>power1.inOut</code>,<code>bounce.in</code>,{" "}
            <code>bounce.out</code>,<code>bounce.inOut</code>,{" "}
            <code>elastic.in</code>,<code>elastic.out</code>,{" "}
            <code>elastic.inOut</code>, and
            <code>steps</code>.
          </li>
          <li>
            <b>Sinusoidal Amplitude</b>: (Used when <code>Path Type</code> is
            <code>sinusoidal</code>) Controls the initial maximum displacement
            of the sine wave from the direct path to the target. A larger value
            creates wider waves.
          </li>
          <li>
            <b>Sinusoidal Frequency</b>: (Used when <code>Path Type</code> is
            <code>sinusoidal</code>) Determines how many cycles the sine wave
            completes over its pathTime. A higher value results in more, tighter
            waves.
          </li>
          <li>
            <b>Kill On Arrival</b>: If true, particles are marked as
            &apos;dead&apos; (their lifetime effectively ends) once they reach
            the target point while this behavior is active.
          </li>
          <li>
            <b>Reset Max Lifetime</b>: (Used with <code>Kill On Arrival</code>)
            If true, the particle&apos;s <code>maxLifeTime</code> is set to 0
            upon arrival, ensuring it&apos;s immediately considered dead by the
            emitter.
          </li>
          <li>
            <b>Arrival Threshold</b>: The distance (in units) from the target
            point within which a particle is considered to have
            &apos;arrived&apos;.
          </li>
        </ul>

        <h4>How It Works:</h4>
        <p>
          When the <b>Move To Point Behaviour</b> is <code>enabled</code> and
          <code>active</code>, it first determines the particle&apos;s initial
          position and the total distance to the <code>targetPoint</code>. Each
          frame, it calculates the particle&apos;s linear progress towards the
          target based on <code>speed</code> and <code>deltaTime</code>. This
          linear progress is then modified by the selected
          <code>Path Easing</code> function.
        </p>
        <p>
          If <code>Path Type</code> is <code>linear</code>, the particle is
          positioned directly along the eased path. If <code>Path Type</code> is
          <code>sinusoidal</code>, a perpendicular wave-like offset is added.
          This offset&apos;s amplitude is based on
          <code>Sinusoidal Amplitude</code> and <code>Frequency</code>, and the
          amplitude of this wave diminishes as the particle gets closer to the
          target, ensuring it arrives precisely at the
          <code>targetPoint</code>.
        </p>
        <p>
          This behavior can effectively take control of a particle&apos;s
          position, potentially nullifying the effects of other behaviors like
          <code>PositionBehaviour</code> or <code>EmitDirectionBehaviour</code>
          for that frame, depending on its priority. Upon reaching the
          <code>Arrival Threshold</code> or completing its eased journey, the
          <code>Kill On Arrival</code> logic may be triggered.
        </p>

        <h4>Use Cases:</h4>
        <ul>
          <li>
            Creating effects where particles gather at a specific location, like
            a &apos;black hole&apos; or an attraction point, with various
            approach styles (e.g., easing in, bouncing, or wavy).
          </li>
          <li>
            Guiding particles along a defined trajectory (straight or wavy with
            easing) by dynamically updating the <code>targetPoint</code>.
          </li>
          <li>
            Simulating entities moving with a slight wobble or serpentine motion
            towards a goal, with controlled acceleration/deceleration.
          </li>
          <li>
            Temporarily overriding particle movement for special events or
            interactions with non-linear motion.
          </li>
          <li>
            Forming shapes or patterns by directing particles to multiple
            strategic points with sophisticated movement.
          </li>
        </ul>

        <h4>Live Examples:</h4>
        <span>
          <a href="/?effect=moveToPoint" target="_blank">
            Move To Point Examples
          </a>
        </span>
      </div>
    </>
  );
};

export default MoveToPointDescription;

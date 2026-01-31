import { useRef } from "react";

const SoundReactiveDescription = () => {
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
        <span>
          <b>Sound Reactive Behaviour</b> synchronizes particle animations with
          audio input, creating dynamic and interactive visual effects based on
          sound amplitude, frequency, and beats.
        </span>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behavior on or off.
          </li>
          <li>
            <b>Priority</b>: Determines the execution order when multiple
            behaviors are applied.
          </li>
          <li>
            <b>Sample</b>: Select or configure the audio input/sample used for
            reactivity (e.g. microphone or audio stream).
          </li>
          <li>
            <b>Frequency Factor</b>: Controls how dominant sound frequencies
            affect particle velocity.
          </li>
          <li>
            <b>Beat Sensitivity</b>: Fine-tunes the sensitivity of beat
            detection for precise synchronization with music.
          </li>
          <li>
            <b>Amplitude Factor</b>: (When Use Size is on) Adjusts the influence
            of sound amplitude on particle size.
          </li>
          <li>
            <b>Use Color</b>: Enables particles to change color in response to
            beats.
          </li>
          <li>
            <b>Beat Color</b>: (When Use Color is on) Color applied to
            particles on detected beats.
          </li>
          <li>
            <b>Use Random Color</b>: (When Use Color is on) Use random colors
            instead of a fixed beat color.
          </li>
          <li>
            <b>Use Size</b>: Dynamically scale particle size based on sound
            amplitude; <b>Amplitude Factor</b> controls the strength.
          </li>
          <li>
            <b>Use Velocity</b>: Modifies particle velocity from dominant
            frequencies; <b>Velocity Factor</b> (X/Y) controls the strength.
          </li>
          <li>
            <b>Use Rotation</b>: Adds rotation from dominant frequencies;
            <b>Rotation Factor</b> controls the strength.
          </li>
        </ul>
        <h4>All properties</h4>
        <ul>
          <li><b>enabled</b> — Turn the behaviour on or off.</li>
          <li><b>priority</b> — Execution order (higher runs first).</li>
          <li><b>isPlaying</b> — Runtime: whether audio is playing.</li>
          <li><b>useColor</b> — Change particle color on beats.</li>
          <li><b>useSize</b> — Scale particle size by sound amplitude.</li>
          <li><b>useVelocity</b> — Modulate velocity from dominant frequencies.</li>
          <li><b>useRotation</b> — Add rotation from dominant frequencies.</li>
          <li><b>useRandomColor</b> — Use random beat color when useColor is on.</li>
          <li><b>beatColor</b> — (_r, _g, _b, _alpha) color on beats (when not useRandomColor).</li>
          <li><b>amplitudeFactor</b> — Influence of amplitude on size (when useSize).</li>
          <li><b>frequencyFactor</b> — Influence of frequencies on velocity.</li>
          <li><b>beatSensitivity</b> — Beat detection sensitivity.</li>
          <li><b>rotationFactor</b> — Strength of frequency-based rotation.</li>
          <li><b>velocityFactor</b> — (x, y) scale for frequency-based velocity.</li>
          <li><b>audioContext</b>, <b>analyser</b>, <b>frequencyData</b> — Set at runtime for audio input.</li>
        </ul>
        <h4>Usage Tips:</h4>
        <p>
          Combine these features to create stunning, real-time audio-reactive
          effects, such as:
        </p>
        <ul>
          <li>Particles that pulse with the beat.</li>
          <li>
            Rotating and moving particles responding to sound frequencies.
          </li>
          <li>Colorful and dynamic visualizations synchronized with music.</li>
        </ul>
        <h4>Quick Example:</h4>
        <code>
          behaviour.audioContext = audioContext;
          <br />
          behaviour.analyser = analyser;
          <br />
          behaviour.frequencyData = frequencyData;
          <br />
          behaviour.isPlaying = true;
          <br />
          behaviour.velocityFactor = new Point(1.5, 2); // Custom velocity
          factor
        </code>
        <br />
        <h4>Live Examples:</h4>
        <a href="/?effect=reactiveSound" target="_blank">
          Reactive Sound
        </a>
      </div>
    </>
  );
};

export default SoundReactiveDescription;

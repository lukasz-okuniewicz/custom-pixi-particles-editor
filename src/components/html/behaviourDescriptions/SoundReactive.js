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
      <span className="explanation" ref={contentRef}>
        <span>
          <b>Sound Reactive Behaviour</b> synchronizes particle animations with
          audio input, creating dynamic and interactive visual effects based on
          sound amplitude, frequency, and beats.
        </span>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled:</b> Toggle the behavior on or off.
          </li>
          <li>
            <b>Priority:</b> Determines the execution order when multiple
            behaviors are applied.
          </li>
          <li>
            <b>Amplitude Factor:</b> Adjusts the influence of sound amplitude on
            particle size.
          </li>
          <li>
            <b>Frequency Factor:</b> Controls how dominant sound frequencies
            affect particle velocity.
          </li>
          <li>
            <b>Rotation Factor:</b> Links dominant frequencies to particle
            rotation speed.
          </li>
          <li>
            <b>Beat Sensitivity:</b> Fine-tunes the sensitivity of beat
            detection for precise synchronization with music.
          </li>
          <li>
            <b>Use Color:</b> Enables particles to change color in response to
            beats.
          </li>
          <li>
            <b>Beat Color:</b> Specifies the default color applied to particles
            on detected beats.
          </li>
          <li>
            <b>Use Random Color:</b> Allows particles to adopt random colors
            instead of a fixed beat color.
          </li>
          <li>
            <b>Velocity Factor:</b> Adjusts how much sound frequencies influence
            particle movement in the X and Y directions.
          </li>
        </ul>
        <h4>Advanced Features:</h4>
        <ul>
          <li>
            <b>Use Size:</b> Dynamically scales particle size based on sound
            amplitude.
          </li>
          <li>
            <b>Use Velocity:</b> Modifies particle velocity based on dominant
            sound frequencies for dynamic motion effects.
          </li>
          <li>
            <b>Use Rotation:</b> Adds rotational effects to particles, scaling
            with dominant frequencies.
          </li>
          <li>
            <b>Beat Sensitivity:</b> Adjusts how easily beats are detected in
            the audio input.
          </li>
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
      </span>
    </>
  );
};

export default SoundReactiveDescription;

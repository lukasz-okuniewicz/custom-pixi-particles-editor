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
          <b>Sound Reactive Behaviour</b> is designed to create dynamic and
          interactive visual effects by synchronizing particle animations with
          audio input. This feature utilizes an audio file to analyze sound
          frequencies and amplitude, allowing particles to react to the beat and
          sound patterns in real-time.
        </span>
        Key Properties:
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behavior on or off.
          </li>
          <li>
            <b>Priority</b>: Set execution order if multiple behaviors are
            applied.
          </li>
          <li>
            <b>Amplitude Factor</b>: Control the influence of amplitude on
            particle size.
          </li>
          <li>
            <b>Frequency Factor</b>: Adjust how dominant frequencies impact
            particle velocity.
          </li>
          <li>
            <b>Beat Sensitivity</b>: Fine-tune beat detection responsiveness.
          </li>
        </ul>
        <span>
          This feature is especially powerful for users seeking to integrate
          captivating, real-time audio-driven effects into their projects
          effortlessly.
        </span>
        <span>
          <a href="/?effect=reactiveSound" target="_blank">
            Reactive Sound
          </a>
        </span>
      </span>
    </>
  );
};

export default SoundReactiveDescription;

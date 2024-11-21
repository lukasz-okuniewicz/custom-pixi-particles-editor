import { useRef } from "react";

const GeneralDescription = () => {
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
          <b>General Properties</b> provide a centralized interface for managing
          particle system configurations. This section enables users to
          customize and visualize various properties of particles, such as
          predefined effects, images, animated sprites, and background settings.
        </span>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Follow Mouse Interaction</b>: Enables particles to follow mouse
            movements, adding interactivity to the particle effects.
          </li>
          <li>
            <b>Particle Effects</b>:
            <ul>
              <li>
                <b>Predefined Effects</b>: Allows users to select from a
                dropdown of predefined particle behaviors for quick
                configuration.
              </li>
              <li>
                <b>Predefined Images</b>: Lists available particle images with
                options to upload custom images via file input.
              </li>
            </ul>
          </li>
          <li>
            <b>Animated Sprites</b>: Configures animation settings, including:
            <ul>
              <li>
                <b>Sprite Name</b>: Specifies the name of the animated sprite.
              </li>
              <li>
                <b>Frame Rate</b>: Sets the speed of animation playback.
              </li>
              <li>
                <b>Loop and Random Start</b>: Enables looping and random frame
                initialization for dynamic visuals.
              </li>
            </ul>
          </li>
          <li>
            <b>Background Settings</b>:
            <ul>
              <li>
                <b>Background Image</b>: Upload a custom background image for
                the particle system.
              </li>
              <li>
                <b>Background Color</b>: Select and customize background colors,
                including transparency adjustments.
              </li>
            </ul>
          </li>
          <li>
            <b>Advanced Settings</b>:
            <ul>
              <li>
                <b>Alpha and Anchor</b>: Adjust particle transparency and
                alignment.
              </li>
              <li>
                <b>Blend Modes</b>: Select blending modes for creative particle
                compositions (e.g., NORMAL, ADD, MULTIPLY).
              </li>
            </ul>
          </li>
        </ul>
        <span>
          This section is a robust tool for configuring particles dynamically,
          allowing users to experiment with settings to create visually
          compelling effects.
        </span>
      </span>
    </>
  );
};

export default GeneralDescription;

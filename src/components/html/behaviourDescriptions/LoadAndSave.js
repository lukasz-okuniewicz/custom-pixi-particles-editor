import { useRef } from "react";

const LoadAndSaveDescription = () => {
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
          <b>Load and Save</b> provides tools to persist and restore your
          particle system configuration. Use these controls to backup your work,
          share configurations, or quickly reset the canvas.
        </p>
        <h4>Key Actions:</h4>
        <ul>
          <li>
            <b>Load</b>: Import a previously saved configuration from a JSON
            file. Replaces the current particle system settings.
          </li>
          <li>
            <b>Download</b>: Export the current configuration as a JSON file to
            your device for backup or sharing.
          </li>
          <li>
            <b>Refresh</b>: Reload the particle system with the current
            configuration, useful after external changes or to reset the
            visualization.
          </li>
        </ul>
      </div>
    </>
  );
};

export default LoadAndSaveDescription;

import { useRef } from "react";

const CustomBehavioursDescription = () => {
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
          <b>Custom behaviours</b> lists particle behaviours that appear in your
          config but are not part of the editor&apos;s built-in panels. They are
          usually classes you register at runtime (e.g. via{" "}
          <code>BehaviourRegistry</code>) so the simulation can instantiate and
          run them when the effect loads.
        </p>
        <h4>Editing:</h4>
        <ul>
          <li>
            Expand a behaviour by its name to edit <b>Enabled</b>,{" "}
            <b>Priority</b>, and the full <b>Raw JSON</b> object.
          </li>
          <li>
            The JSON must parse as an object and include a non-empty{" "}
            <b>name</b> property matching your registered behaviour type.
          </li>
          <li>
            Invalid JSON shows an error until you fix and blur the field; valid
            updates replace the entire behaviour entry in the config.
          </li>
        </ul>
        <p>
          For behaviour-specific docs, refer to your own implementation or
          shared project documentation—this panel is a generic editor only.
        </p>
      </div>
    </>
  );
};

export default CustomBehavioursDescription;

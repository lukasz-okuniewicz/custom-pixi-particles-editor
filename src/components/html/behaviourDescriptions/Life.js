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
      <span className="explanation" ref={contentRef}>
        <span>
          <b>Life Behaviour</b> in a particle system define how long particles
          exist before disappearing:
        </span>
        Key Properties:
        <ul>
          <li>
            <b>Max Lifetime</b>: Specifies the maximum duration a particle stays
            active.
          </li>
          <li>
            <b>Variance</b>: Adds randomness to the lifetime, making particles
            expire at slightly different times.
          </li>
        </ul>
        <span>
          These settings create natural, dynamic effects by ensuring particles
          don’t all behave identically, enhancing the overall realism of the
          system.
        </span>
      </span>
    </>
  );
};

export default LifeDescription;

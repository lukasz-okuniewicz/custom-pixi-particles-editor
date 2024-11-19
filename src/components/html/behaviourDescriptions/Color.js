import { useRef } from "react";

const ColorDescription = () => {
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
          <b>Color properties</b> in a particle system define how a
          particle&apos;s color changes over its lifetime.
        </span>
        <ul>
          <li>
            <b>Starting Color</b>: The initial color of the particle.
          </li>
          <li>
            <b>Ending Color</b>: The color at the end of the particle&apos;s
            life.
          </li>
          <li>
            <b>Starting Color Variance</b>: Adds randomness to the initial
            color, creating variation among particles.
          </li>
          <li>
            <b>Ending Color Variance</b>: Introduces randomness to the final
            color, enhancing visual diversity.
          </li>
          <li>
            <b>Fade In/Out</b>: Gradually adjusts the particle&apos;s opacity at
            the start and end of its life, creating smooth transitions and more
            natural effects.
          </li>
        </ul>
        <span>
          These settings enhance the visual appeal and realism of particle
          animations.
        </span>
      </span>
    </>
  );
};

export default ColorDescription;

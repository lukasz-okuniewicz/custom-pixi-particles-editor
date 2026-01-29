import { useRef } from "react";

const LightEffectDescription = () => {
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
          <b>Light Effect Behaviour</b> introduces dynamic lighting effects for
          particles, including distance-based illumination, directional light,
          and volumetric glow. This behaviour allows you to create realistic
          lighting simulations and artistic visual effects.
        </p>

        <h4>Key Features:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behavior on or off.
          </li>
          <li>
            <b>Priority</b>: Determines the execution order relative to other
            behaviors.
          </li>
          <li>
            <b>Light Position</b>: Configurable position of the light source
            to influence particle illumination.
          </li>
          <li>
            <b>Distance-Based Intensity:</b> Implements the inverse square law
            for realistic light falloff, modifiable using the attenuation
            factor.
          </li>
          <li>
            <b>Ambient Light:</b> Defines a base light level to ensure particles
            are always visible.
          </li>
          <li>
            <b>Directional Light:</b> Adds directional illumination with
            adjustable spread angle and light direction for focused lighting
            effects.
          </li>
          <li>
            <b>Volumetric Light:</b> Enables soft glow effects and fog-like
            scattering, adjustable using volumetric intensity and fog density.
          </li>
          <li>
            <b>Customizable Light Color:</b> Allows blending of the light&apos;s
            RGB color with the particles for artistic or thematic effects.
          </li>
        </ul>

        <h4>Adjustable Parameters:</h4>
        <ul>
          <li>
            <b>Light Intensity:</b> Controls the brightness of the light source.
          </li>
          <li>
            <b>Attenuation Factor:</b> Adjusts the rate at which light
            diminishes over distance.
          </li>
          <li>
            <b>Spread Angle:</b> For directional light, sets the angle of the
            light cone.
          </li>
          <li>
            <b>Volumetric Intensity:</b> Determines the strength of the glow
            effect.
          </li>
          <li>
            <b>Fog Density:</b> Controls the density of the fog for scattering
            effects.
          </li>
        </ul>

        <h4>Applications:</h4>
        <ul>
          <li>Simulate realistic lighting in particle effects.</li>
          <li>Create immersive scenes with ambient and directional light.</li>
          <li>Add volumetric glow for artistic or dramatic effects.</li>
          <li>Implement fog or scattering for depth perception.</li>
        </ul>

        <h4>Examples:</h4>
        <span>
          <a href="/?effect=directionalLight" target="_blank">
            Directional Light Demo
          </a>
          <br />
          <a href="/?effect=light" target="_blank">
            Foggy Scene Example
          </a>
        </span>
      </div>
    </>
  );
};

export default LightEffectDescription;

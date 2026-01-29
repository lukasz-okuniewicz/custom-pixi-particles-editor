"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import pixiRefs from "@pixi/pixiRefs";
import { createAndAddParticles } from "@pixi/particles";
import InputNumber from "@components/html/InputNumber";
import ParticleEmittersDescription from "@components/html/behaviourDescriptions/ParticleEmitters";

export default function ParticlesList({ defaultConfig }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [particlesConfig, setParticlesConfig] = useState(() =>
    pixiRefs.particlesArr.map((emitter) => ({
      position: { x: emitter.position.x, y: emitter.position.y },
      angle: emitter.angle,
      emitter,
    })),
  );

  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const duplicate = () => {
    createAndAddParticles(defaultConfig, pixiRefs.particlesContainer);
    setParticlesConfig(
      pixiRefs.particlesArr.map((emitter) => ({
        position: { x: emitter.position.x, y: emitter.position.y },
        angle: emitter.angle,
        emitter,
      })),
    );
  };

  const handleRadiusChange = (index, value) => {
    setParticlesConfig((prevConfig) => {
      const updatedConfig = [...prevConfig];
      updatedConfig[index].angle = value;
      updatedConfig[index].emitter.angle = value;
      return updatedConfig;
    });
  };

  const handlePositionChange = (index, value, id) => {
    setParticlesConfig((prevConfig) => {
      const updatedConfig = [...prevConfig];
      updatedConfig[index].position[id] = value;
      updatedConfig[index].emitter.position[id] = value;
      return updatedConfig;
    });
  };

  useEffect(() => {
    setParticlesConfig(
      pixiRefs.particlesArr.map((emitter) => ({
        position: { x: emitter.position.x, y: emitter.position.y },
        angle: emitter.angle,
        emitter,
      })),
    );
  }, [defaultConfig]);

  useEffect(() => {
    setParticlesConfig(
      pixiRefs.particlesArr.map((emitter) => ({
        position: { x: emitter.position.x, y: emitter.position.y },
        angle: emitter.angle,
        emitter,
      })),
    );
  }, [pixiRefs.particlesArr]);

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Particle Emitters</legend>
      <div className={`${isSubmenuVisible}`}>
        <ParticleEmittersDescription />
        {particlesConfig.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && (
              <>
                <hr />
                <br />
              </>
            )}
            <h1>Emitter {index + 1}</h1>
            <InputNumber
              label="Angle"
              id="angle"
              value={item.angle}
              step="1"
              onChange={(value) => handleRadiusChange(index, value)}
            />
            <InputNumber
              label="Position"
              id="position"
              params={["x", "y"]}
              value={[item.position.x, item.position.y]}
              step="1"
              onChange={(value, id) => handlePositionChange(index, value, id)}
            />
          </Fragment>
        ))}
        <button className="btn btn-default btn-block" onClick={duplicate}>
          Duplicate Main Emitter
        </button>
      </div>
    </>
  );
}

"use client";

import LoadAndSaveProperties from "@components/properties/LoadAndSaveProperties";
import GeneralProperties from "@components/properties/GeneralProperties";
import EmissionTypeProperties from "@components/properties/EmissionTypeProperties";
import LifeProperties from "@components/properties/behaviours/LifeProperties";
import SizeProperties from "@components/properties/behaviours/SizeProperties";
import RotationProperties from "@components/properties/behaviours/RotationProperties";
import PositionProperties from "@components/properties/behaviours/PositionProperties";
import CollisionProperties from "@components/properties/behaviours/CollisionProperties";
import ColorProperties from "@components/properties/behaviours/ColorProperties";
import AngularVelocityProperties from "@components/properties/behaviours/AngularVelocityProperties";
import EmitDirectionProperties from "@components/properties/behaviours/EmitDirectionProperties";
import TurbulenceProperties from "@components/properties/behaviours/TurbulenceProperties";
import { getConfigIndexByName } from "@utils";
import React from "react";
import ParticlesList from "@components/particlesList";
import AttractionRepulsionProperties from "@components/properties/behaviours/AttractionRepulsionProperties";
import NoiseBasedMotionProperties from "@components/properties/behaviours/NoiseBasedMotionBehaviour";

const Menu = ({ defaultConfig, fullConfig, handlePredefinedEffectChange }) => {
  return (
    <div
      className="w-[400px] fixed right-0 top-0 bottom-0 overflow-y-scroll overflow-x-hidden block p-5 z-20 bg-[#181a1b] border-l border-l-[rgba(140,130,115,0.5)]"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <LoadAndSaveProperties defaultConfig={defaultConfig} />
      <GeneralProperties
        defaultConfig={defaultConfig}
        fullConfig={fullConfig}
        handlePredefinedEffectChange={handlePredefinedEffectChange}
      />
      <EmissionTypeProperties defaultConfig={defaultConfig} />
      <LifeProperties
        defaultConfig={defaultConfig}
        index={getConfigIndexByName("LifeBehaviour", defaultConfig)}
      />
      <SizeProperties
        defaultConfig={defaultConfig}
        index={getConfigIndexByName("SizeBehaviour", defaultConfig)}
      />
      <RotationProperties
        defaultConfig={defaultConfig}
        index={getConfigIndexByName("RotationBehaviour", defaultConfig)}
      />
      <PositionProperties
        defaultConfig={defaultConfig}
        index={getConfigIndexByName("PositionBehaviour", defaultConfig)}
      />
      <AttractionRepulsionProperties
        defaultConfig={defaultConfig}
        index={getConfigIndexByName(
          "AttractionRepulsionBehaviour",
          defaultConfig,
        )}
      />
      <NoiseBasedMotionProperties
        defaultConfig={defaultConfig}
        index={getConfigIndexByName("NoiseBasedMotionBehaviour", defaultConfig)}
      />
      <CollisionProperties
        defaultConfig={defaultConfig}
        index={getConfigIndexByName("CollisionBehaviour", defaultConfig)}
      />
      <ColorProperties
        defaultConfig={defaultConfig}
        index={getConfigIndexByName("ColorBehaviour", defaultConfig)}
      />
      <AngularVelocityProperties
        defaultConfig={defaultConfig}
        index={getConfigIndexByName("AngularVelocityBehaviour", defaultConfig)}
      />
      <EmitDirectionProperties
        defaultConfig={defaultConfig}
        index={getConfigIndexByName("EmitDirectionBehaviour", defaultConfig)}
      />
      <TurbulenceProperties
        defaultConfig={defaultConfig}
        index={getConfigIndexByName("TurbulenceBehaviour", defaultConfig)}
      />
      <ParticlesList defaultConfig={defaultConfig} />
    </div>
  );
};

export default Menu;

"use client";

import { useCallback, useState } from "react";
import { initializeProperty, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import ColorPicker from "@components/html/ColorPicker";

export default function ColorProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: false,
    priority: 0,
    start: { _r: 255, _g: 255, _b: 0, _alpha: 1 },
    end: { _r: 255, _g: 255, _b: 255, _alpha: 1 },
    startVariance: { _r: 0, _g: 0, _b: 0, _alpha: 0 },
    endVariance: { _r: 0, _g: 0, _b: 0, _alpha: 0 },
    sinus: false,
    name: "ColorBehaviour",
  };
  Object.keys(keysToInitialize).forEach((key) => {
    initializeProperty(behaviour, key, keysToInitialize[key]);
  });

  // Toggle submenu visibility
  const toggleSubmenuVisibility = useCallback(() => {
    setIsSubmenuVisible((prev) => (prev === "collapse" ? "" : "collapse"));
  }, []);

  const updateBehaviours = () => {
    defaultConfig.emitterConfig.behaviours[index] = behaviour;
    updateProps(
      "emitterConfig.behaviours",
      defaultConfig.emitterConfig.behaviours,
    );
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Color Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <Checkbox
          label="Enabled"
          id="color-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <Checkbox
          label="Fade In and Out"
          id="fade-in-out"
          onChange={(value) => {
            behaviour.sinus = value;
            updateBehaviours();
          }}
          checked={behaviour.sinus ?? keysToInitialize.sinus}
        />
        <ColorPicker
          label="Starting Color"
          color={{
            r: behaviour.start._r ?? keysToInitialize.start._r,
            g: behaviour.start._g ?? keysToInitialize.start._g,
            b: behaviour.start._b ?? keysToInitialize.start._b,
            a: behaviour.start._alpha ?? keysToInitialize.start._alpha,
          }}
          colorChanged={(color) => {
            behaviour.start._r = color.rgb.r;
            behaviour.start._g = color.rgb.g;
            behaviour.start._b = color.rgb.b;
            behaviour.start._alpha = color.rgb.a;
            updateBehaviours();
          }}
        />
        <ColorPicker
          label="Starting Color Variance"
          color={{
            r: behaviour.startVariance._r ?? keysToInitialize.startVariance._r,
            g: behaviour.startVariance._g ?? keysToInitialize.startVariance._g,
            b: behaviour.startVariance._b ?? keysToInitialize.startVariance._b,
            a:
              behaviour.startVariance._alpha ??
              keysToInitialize.startVariance._alpha,
          }}
          colorChanged={(color) => {
            behaviour.startVariance._r = color.rgb.r;
            behaviour.startVariance._g = color.rgb.g;
            behaviour.startVariance._b = color.rgb.b;
            behaviour.startVariance._alpha = color.rgb.a;
            updateBehaviours();
          }}
        />
        <ColorPicker
          label="Ending Color"
          color={{
            r: behaviour.end._r ?? keysToInitialize.end._r,
            g: behaviour.end._g ?? keysToInitialize.end._g,
            b: behaviour.end._b ?? keysToInitialize.end._b,
            a: behaviour.end._alpha ?? keysToInitialize.end._alpha,
          }}
          colorChanged={(color) => {
            behaviour.end._r = color.rgb.r;
            behaviour.end._g = color.rgb.g;
            behaviour.end._b = color.rgb.b;
            behaviour.end._alpha = color.rgb.a;
            updateBehaviours();
          }}
        />
        <ColorPicker
          label="Ending Color Variance"
          color={{
            r: behaviour.endVariance._r ?? keysToInitialize.endVariance._r,
            g: behaviour.endVariance._g ?? keysToInitialize.endVariance._g,
            b: behaviour.endVariance._b ?? keysToInitialize.endVariance._b,
            a:
              behaviour.endVariance._alpha ??
              keysToInitialize.endVariance._alpha,
          }}
          colorChanged={(color) => {
            behaviour.endVariance._r = color.rgb.r;
            behaviour.endVariance._g = color.rgb.g;
            behaviour.endVariance._b = color.rgb.b;
            behaviour.endVariance._alpha = color.rgb.a;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}

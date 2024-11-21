import { useCallback, useEffect, useState } from "react";
import { getConfigByName, initializeProperty, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import SoundReactiveDescription from "@components/html/behaviourDescriptions/SoundReactive";
import { Loader as PixiLoader } from "pixi.js-legacy";
import { playMusic } from "@utils/audio";

export default function SoundReactiveProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [isPlaying, setIsPlaying] = useState(false);

  const audioSources = [PixiLoader.shared.resources.music_base13.data];

  const saveLastPlayedIndex = (index) => {
    localStorage.setItem("lastPlayedAudioIndex", index);
  };

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: false,
    priority: 0,
    audioContext: null,
    analyser: null,
    frequencyData: null,
    amplitudeFactor: 1,
    frequencyFactor: 1,
    beatSensitivity: 1,
    name: "SoundReactiveBehaviour",
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

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    if (isPlaying) {
      if (defaultConfig.particlePredefinedEffect === "reactiveSound") {
        const spawnBehaviour = getConfigByName("SpawnBehaviour", defaultConfig);
        spawnBehaviour.word = "SOUND!";
      }
    }

    const handleWindowClick = debounce(() => {
      if (!isPlaying && !behaviour.audioContext) {
        setIsPlaying(true);
        const nextIndex = playMusic({
          audioSources,
          behaviour,
          defaultConfig,
          index,
        });
        saveLastPlayedIndex(nextIndex); // Save the index
      }
    }, 100);

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [defaultConfig]);

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>
        Sound Reactive Properties
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <SoundReactiveDescription />

        <Checkbox
          label="Enabled"
          id="angular-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="color-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <hr />
        <InputNumber
          label="Amplitude Factor"
          id="amplitudeFactor"
          value={behaviour.amplitudeFactor ?? keysToInitialize.amplitudeFactor}
          step="0.1"
          onChange={(value) => {
            behaviour.amplitudeFactor = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Frequency Factor"
          id="frequencyFactor"
          value={behaviour.frequencyFactor ?? keysToInitialize.frequencyFactor}
          step="0.1"
          onChange={(value) => {
            behaviour.frequencyFactor = value;
            updateBehaviours();
          }}
        />
        <InputNumber
          label="Beat Sensitivity"
          id="beatSensitivity"
          value={behaviour.beatSensitivity ?? keysToInitialize.beatSensitivity}
          step="0.1"
          onChange={(value) => {
            behaviour.beatSensitivity = value;
            updateBehaviours();
          }}
        />
      </div>
    </>
  );
}

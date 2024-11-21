"use client";

import { useCallback, useEffect, useState } from "react";
import { getConfigByName, initializeProperty, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import SoundReactiveDescription from "@components/html/behaviourDescriptions/SoundReactive";
import { Loader as PixiLoader } from "pixi.js-legacy";

let audioContext = null;
let analyser = null;
let frequencyData = null;

export default function SoundReactiveProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [isPlaying, setIsPlaying] = useState(false);

  const audioSources = [
    PixiLoader.shared.resources.music_base.data,
    PixiLoader.shared.resources.music_base2.data,
    PixiLoader.shared.resources.music_base3.data,
    PixiLoader.shared.resources.music_base4.data,
    PixiLoader.shared.resources.music_base5.data,
    PixiLoader.shared.resources.music_base6.data,
  ];

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    enabled: false,
    priority: 0,
    audioContext: audioContext ?? null,
    analyser: analyser ?? null,
    frequencyData: frequencyData ?? null,
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

  useEffect(() => {
    if (isPlaying) {
      if (defaultConfig.particlePredefinedEffect === "reactiveSound") {
        const spawnBehaviour = getConfigByName("SpawnBehaviour", defaultConfig);
        spawnBehaviour.word = "SOUND!";
      }
    } else {
      const handleWindowClick = () => {
        if (
          !isPlaying &&
          !behaviour.audioContext &&
          audioSources.length &&
          defaultConfig.particlePredefinedEffect === "reactiveSound"
        ) {
          setIsPlaying(true);

          const randomIndex = Math.floor(Math.random() * audioSources.length);
          const randomAudioRef = audioSources[randomIndex];

          if (randomAudioRef) {
            randomAudioRef.play();
          }

          audioContext = new AudioContext();
          const source = audioContext.createMediaElementSource(randomAudioRef);
          analyser = audioContext.createAnalyser();
          source.connect(analyser);
          analyser.connect(audioContext.destination);

          analyser.fftSize = 256; // Size of the Fast Fourier Transform
          frequencyData = new Uint8Array(analyser.frequencyBinCount);

          behaviour.audioContext = audioContext;
          behaviour.analyser = analyser;
          behaviour.frequencyData = frequencyData;
          defaultConfig.emitterConfig.behaviours[index] = behaviour;

          const spawnBehaviour = getConfigByName(
            "SpawnBehaviour",
            defaultConfig,
          );
          spawnBehaviour.word = "SOUND!";

          updateProps(
            "emitterConfig.behaviours",
            defaultConfig.emitterConfig.behaviours,
          );
        }
      };

      window.addEventListener("click", handleWindowClick);

      return () => {
        window.removeEventListener("click", handleWindowClick);
      };
    }
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

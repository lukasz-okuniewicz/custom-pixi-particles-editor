import { useCallback, useEffect, useMemo, useState } from "react";
import { getConfigByName, mergeObjectsWithDefaults, updateProps } from "@utils";
import Checkbox from "@components/html/Checkbox";
import InputNumber from "@components/html/InputNumber";
import SoundReactiveDescription from "@components/html/behaviourDescriptions/SoundReactive";
import { Loader as PixiLoader } from "pixi.js-legacy";
import { playMusic, updateContext } from "@utils/audio";
import ColorPicker from "@components/html/ColorPicker";
import Select from "@components/html/Select";

let lastParticlePredefinedEffect = null;

export default function SoundReactiveProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [predefinedMusic, setPredefinedMusic] = useState("mainTheme");
  const [isPlaying, setIsPlaying] = useState(false);

  const audioSources = [PixiLoader.shared.resources.mainTheme.data];

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
    isPlaying: false,
    useColor: true,
    useSize: true,
    useVelocity: true,
    useRotation: true,
    useRandomColor: true,
    beatColor: { _r: 255, _g: 0, _b: 0, _alpha: 1 },
    audioContext: null,
    analyser: null,
    frequencyData: null,
    amplitudeFactor: 1,
    frequencyFactor: 1,
    beatSensitivity: 1,
    rotationFactor: 0.05,
    name: "SoundReactiveBehaviour",
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);

  const predefinedType = useMemo(() => {
    const names = {
      mainTheme: "Main Theme",
      instrumentalPiano: "Instrumental Piano",
      elDestino: "El Destino",
      honorAndSwords: "Honor And Swords",
      jingleBells: "Jingle Bells",
      relaxingInstrumental: "Relaxing Instrumental",
      relaxingMusic: "Relaxing Music",
      instrumentalMusic: "Instrumental Music",
    };
    return Object.keys(names)
      .sort()
      .map((key) => ({
        key: key,
        displayName: names[key],
      }));
  }, []);

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
    if (isPlaying && !behaviour.audioContext) {
      playMusic({
        audioSources,
        behaviour,
        defaultConfig,
        index,
      });
    }

    if (
      lastParticlePredefinedEffect &&
      defaultConfig.particlePredefinedEffect !== lastParticlePredefinedEffect
    ) {
      updateContext({ defaultConfig, behaviour, index });
    }
    lastParticlePredefinedEffect = defaultConfig.particlePredefinedEffect;

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
          id="enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <InputNumber
          label="Priority"
          id="priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="0"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <Select
          label="Sample"
          defaultValue={predefinedMusic}
          onChange={(value) => {
            setIsPlaying(true);
            playMusic({
              audioSources: [],
              behaviour,
              defaultConfig,
              index,
              mainSource: PixiLoader.shared.resources[value].data,
            });
            setPredefinedMusic(value);
          }}
          elements={predefinedType}
        />
        <hr />
        <Checkbox
          label="Use Color"
          id="useColor"
          onChange={(value) => {
            behaviour.useColor = value;
            updateBehaviours();
          }}
          checked={behaviour.useColor ?? keysToInitialize.useColor}
        />
        <Checkbox
          label="Use Size"
          id="useSize"
          onChange={(value) => {
            behaviour.useSize = value;
            updateBehaviours();
          }}
          checked={behaviour.useSize ?? keysToInitialize.useSize}
        />
        <Checkbox
          label="Use Velocity"
          id="useVelocity"
          onChange={(value) => {
            behaviour.useVelocity = value;
            updateBehaviours();
          }}
          checked={behaviour.useVelocity ?? keysToInitialize.useVelocity}
        />
        <Checkbox
          label="Use Rotation"
          id="useRotation"
          onChange={(value) => {
            behaviour.useRotation = value;
            updateBehaviours();
          }}
          checked={behaviour.useRotation ?? keysToInitialize.useRotation}
        />
        <Checkbox
          label="Use Random Color"
          id="useRandomColor"
          onChange={(value) => {
            behaviour.useRandomColor = value;
            updateBehaviours();
          }}
          checked={behaviour.useRandomColor ?? keysToInitialize.useRandomColor}
        />
        {behaviour.useSize && (
          <>
            <InputNumber
              label="Amplitude Factor"
              id="amplitudeFactor"
              value={
                behaviour.amplitudeFactor ?? keysToInitialize.amplitudeFactor
              }
              step="0.1"
              onChange={(value) => {
                behaviour.amplitudeFactor = value;
                updateBehaviours();
              }}
            />
          </>
        )}

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
        {behaviour.useRotation && (
          <>
            <InputNumber
              label="Rotation Factor"
              id="rotationFactor"
              value={
                behaviour.rotationFactor ?? keysToInitialize.rotationFactor
              }
              step="0.01"
              onChange={(value) => {
                behaviour.rotationFactor = value;
                updateBehaviours();
              }}
            />
          </>
        )}

        {!behaviour.useRandomColor && (
          <>
            <ColorPicker
              label="Beat Color"
              color={{
                r: behaviour.beatColor._r ?? keysToInitialize.beatColor._r,
                g: behaviour.beatColor._g ?? keysToInitialize.beatColor._g,
                b: behaviour.beatColor._b ?? keysToInitialize.beatColor._b,
                a:
                  behaviour.beatColor._alpha ??
                  keysToInitialize.beatColor.alpha,
              }}
              colorChanged={(color) => {
                behaviour.beatColor._r = color.rgb.r;
                behaviour.beatColor._g = color.rgb.g;
                behaviour.beatColor._b = color.rgb.b;
                behaviour.beatColor._alpha = color.rgb.a;
                updateBehaviours();
              }}
            />
          </>
        )}
      </div>
    </>
  );
}

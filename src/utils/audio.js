import { getConfigByName, updateProps } from "@utils/index";

let audioContext = null;
let analyser = null;
let frequencyData = null;
let currentPlayingAudio = null;
/** @type {AudioNode | null} MediaElementAudioSourceNode or AudioBufferSourceNode */
let source = null;

// Get the last played index from localStorage or default to -1
const getLastPlayedIndex = () => {
  const savedIndex = localStorage.getItem("lastPlayedAudioIndex");
  return savedIndex ? parseInt(savedIndex, 10) : -1;
};

function stopPlaybackNodes() {
  if (source) {
    if (source instanceof AudioBufferSourceNode) {
      try {
        source.stop(0);
      } catch {
        /* already stopped */
      }
    }
    try {
      source.disconnect();
    } catch {
      /* */
    }
    source = null;
  }
  if (analyser) {
    try {
      analyser.disconnect();
    } catch {
      /* */
    }
    analyser = null;
  }
}

/**
 * @param {HTMLAudioElement | AudioBuffer} raw
 * @returns {HTMLAudioElement | AudioBuffer}
 */
function resolveAudioPayload(raw) {
  if (!raw) return raw;
  if (raw instanceof AudioBuffer) return raw;
  if (typeof raw.cloneNode === "function") return raw;
  return raw;
}

export const playMusic = ({
  audioSources,
  behaviour,
  defaultConfig,
  index,
  mainSource,
}) => {
  const lastPlayedIndex = getLastPlayedIndex();
  const len = Array.isArray(audioSources) ? audioSources.length : 0;
  const nextIndex =
    len > 0 ? (lastPlayedIndex + 1) % len : 0;

  // Stop and reset the currently playing audio
  if (currentPlayingAudio) {
    currentPlayingAudio.pause();
    currentPlayingAudio.currentTime = 0;

    if (currentPlayingAudio.parentNode) {
      currentPlayingAudio.parentNode.removeChild(currentPlayingAudio);
    }
    currentPlayingAudio = null;
  }

  stopPlaybackNodes();

  let currentAudio;
  if (mainSource) {
    currentAudio = resolveAudioPayload(mainSource);
  } else {
    currentAudio = resolveAudioPayload(audioSources[nextIndex]);
  }

  if (!currentAudio) {
    return nextIndex;
  }

  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }

  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  frequencyData = new Uint8Array(analyser.frequencyBinCount);

  if (currentAudio instanceof AudioBuffer) {
    const bufSrc = audioContext.createBufferSource();
    bufSrc.buffer = currentAudio;
    bufSrc.loop = true;
    bufSrc.connect(analyser);
    analyser.connect(audioContext.destination);
    bufSrc.start(0);
    source = bufSrc;
    currentPlayingAudio = null;
  } else if (typeof currentAudio.cloneNode === "function") {
    currentAudio = currentAudio.cloneNode(true);
    document.body.appendChild(currentAudio);
    currentAudio.loop = true;
    currentAudio.play();
    currentPlayingAudio = currentAudio;

    source = audioContext.createMediaElementSource(currentAudio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    currentAudio.addEventListener("ended", () => {
      if (currentAudio.parentNode) {
        currentAudio.parentNode.removeChild(currentAudio);
      }
    });
  } else {
    return nextIndex;
  }

  behaviour.audioContext = audioContext;
  behaviour.analyser = analyser;
  behaviour.frequencyData = frequencyData;
  behaviour.isPlaying = true;
  defaultConfig.emitterConfig.behaviours[index] = behaviour;

  if (defaultConfig.particlePredefinedEffect === "reactiveSound") {
    const spawnBehaviour = getConfigByName("SpawnBehaviour", defaultConfig);
    spawnBehaviour.word = "SOUND!";
  }

  updateProps(
    "emitterConfig.behaviours",
    defaultConfig.emitterConfig.behaviours,
  );

  return nextIndex;
};

export const stopMusic = ({ behaviour, defaultConfig, index }) => {
  if (currentPlayingAudio) {
    currentPlayingAudio.pause();
    currentPlayingAudio.currentTime = 0;
    if (currentPlayingAudio.parentNode) {
      currentPlayingAudio.parentNode.removeChild(currentPlayingAudio);
    }
    currentPlayingAudio = null;
  }

  stopPlaybackNodes();

  behaviour.audioContext = null;
  behaviour.analyser = null;
  behaviour.frequencyData = null;
  behaviour.isPlaying = false;
  defaultConfig.emitterConfig.behaviours[index] = behaviour;

  updateProps(
    "emitterConfig.behaviours",
    defaultConfig.emitterConfig.behaviours,
  );
};

export const updateContext = ({ behaviour, defaultConfig, index }) => {
  behaviour.audioContext = audioContext;
  behaviour.analyser = analyser;
  behaviour.frequencyData = frequencyData;
  behaviour.isPlaying = true;
  // defaultConfig.emitterConfig.behaviours[index] = behaviour;

  updateProps(
    "emitterConfig.behaviours",
    defaultConfig.emitterConfig.behaviours,
  );
};

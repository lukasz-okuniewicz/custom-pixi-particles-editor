import { getConfigByName, updateProps } from "@utils/index";

let audioContext = null;
let analyser = null;
let frequencyData = null;
let currentPlayingAudio = null;
let source = null;

// Get the last played index from localStorage or default to -1
const getLastPlayedIndex = () => {
  const savedIndex = localStorage.getItem("lastPlayedAudioIndex");
  return savedIndex ? parseInt(savedIndex, 10) : -1;
};

export const playMusic = ({
  audioSources,
  behaviour,
  defaultConfig,
  index,
  mainSource,
}) => {
  const lastPlayedIndex = getLastPlayedIndex();
  const nextIndex = (lastPlayedIndex + 1) % audioSources.length;

  // Stop and reset the currently playing audio
  if (currentPlayingAudio) {
    currentPlayingAudio.pause();
    currentPlayingAudio.currentTime = 0;

    if (source) {
      source.disconnect();
      source = null;
    }
    if (analyser) {
      analyser.disconnect();
      analyser = null;
    }
  }

  let currentAudio;
  if (mainSource) {
    currentAudio = mainSource;
  } else {
    currentAudio = audioSources[nextIndex];
  }

  // Clone the audio element to reset its connection state
  currentAudio = currentAudio.cloneNode(true);
  document.body.appendChild(currentAudio); // Add the cloned audio to DOM if needed
  currentAudio.loop = true;
  currentAudio.play();
  currentPlayingAudio = currentAudio;

  // Reuse or create AudioContext
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  // Create a new MediaElementSourceNode
  source = audioContext.createMediaElementSource(currentAudio);
  analyser = audioContext.createAnalyser();
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  analyser.fftSize = 256; // Size of the Fast Fourier Transform
  frequencyData = new Uint8Array(analyser.frequencyBinCount);

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

  // Clean up the cloned audio element when no longer needed
  currentAudio.addEventListener("ended", () => {
    document.body.removeChild(currentAudio);
  });

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

  if (source) {
    source.disconnect();
    source = null;
  }
  if (analyser) {
    analyser.disconnect();
    analyser = null;
  }

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

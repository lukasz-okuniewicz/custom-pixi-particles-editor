"use client";

import {
  BfSelect,
  BfInputNumber,
  BfCheckbox,
  BfInputString,
  BfFieldHint,
} from "@components/properties/BehaviourFieldWrappers";
import { useCallback, useMemo, useState } from "react";
import { mergeObjectsWithDefaults, updateProps } from "@utils";
import FormPatternDescription from "@components/html/behaviourDescriptions/FormPattern";
import { rasterizeTextToPoints } from "custom-pixi-particles";

export default function FormPatternProperties({ defaultConfig, index }) {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState("collapse");
  const [bakedJsonError, setBakedJsonError] = useState("");
  const [bakeMessage, setBakeMessage] = useState("");

  if (index === -1) {
    const x = JSON.parse(JSON.stringify(defaultConfig));
    index = x.emitterConfig.behaviours.push({}) - 1;
  }

  let behaviour = defaultConfig.emitterConfig.behaviours[index] || {};
  const keysToInitialize = {
    name: "FormPatternBehaviour",
    // false when behaviour is not in preset; presets with this behaviour set enabled explicitly (see ToroidalWrapProperties).
    enabled: false,
    active: false,
    priority: -10,
    patternMode: "presetShape",
    points: [],
    presetShape: "circle",
    presetParams: {
      radius: 100,
      halfWidth: 120,
      halfHeight: 80,
      innerRatio: 0.45,
      starPoints: 5,
      polygonSides: 6,
      lissajousA: 3,
      lissajousB: 2,
      lissajousDelta: 0,
    },
    runtimeText: "Hi",
    fontFamily: "sans-serif",
    fontSize: 64,
    fontWeight: "400",
    pointBudget: 512,
    svgPath: "M0,-80 L80,80 L-80,80 Z",
    svgPathSegmentsPerCurve: 14,
    textRasterMode: "fill",
    textStrokeWidth: 2,
    bakedPolylineMode: "cloud",
    center: { x: 0, y: 0 },
    scale: 1,
    rotation: 0,
    speed: 200,
    speedVariance: 0,
    speedScaleByDistance: false,
    progressMode: "distance",
    staggerMin: 0,
    staggerMax: 0,
    killOnArrival: false,
    resetMaxLifeTime: false,
    lingerMs: 0,
    arrivalThreshold: 1,
    targetJitter: 0,
    assignmentMode: "stable",
    assignmentSeed: 0,
    shuffleOnEachActivate: false,
    pathType: "linear",
    sinusoidalAmplitude: 60,
    sinusoidalFrequency: 5,
    sinusoidalPhaseMode: "shared",
    noiseAmplitude: 20,
    noiseFrequency: 4,
    arcBulge: 0,
    spiralTurns: 0,
    pathEasing: "linear",
    showTargetsPreview: false,
    showPathPreview: false,
    liveFormationTransform: false,
    morphBlend: 0,
    morphPresetShape: "circle",
    morphPresetParams: {
      radius: 100,
      halfWidth: 120,
      halfHeight: 80,
      innerRatio: 0.45,
      starPoints: 5,
      polygonSides: 6,
      lissajousA: 3,
      lissajousB: 2,
      lissajousDelta: 0,
    },
    imageDataUrl: "",
    imageDataUrls: [],
    imageFrameRate: 12,
    imageFrameLoop: true,
    imageFramePingPong: false,
    imageAlphaThreshold: 128,
    imageFitMode: "contain",
    imageSamplingMode: "fill",
    imageMatchParticleColors: false,
    imageRestoreOriginalColorOnDeactivate: false,
    imageColorBlendDurationMs: 0,
    imageColorMode: "raw",
    imageColorSpace: "rgb",
    imageColorQuantizeLevels: 8,
    imageColorJitter: 0,
    imageColorPalette: "",
    imageSamplingDensity: 1,
    imageMinPointSpacingPx: 0,
    imageEdgeThickness: 1,
    imageEdgeDetector: "alphaContour",
    imageMaskMode: "alpha",
    imageInvertMask: false,
    imageMaskLumaThreshold: 0,
    imageMaskHueMin: 0,
    imageMaskHueMax: 360,
    imageTemporalCoherence: true,
    imageFrameBlend: 0,
    imageProgressiveRefine: true,
    imageAutoDownscaleMax: 1024,
    imageDebugOverlayMode: "off",
    textAlign: "center",
    textLineHeight: 0,
    staggerOrder: "random",
    pathVariety: 0,
    cubicPerpBulge: 0.25,
    cubicAsymmetry: 1,
    springStiffness: 180,
    springDamping: 24,
    physicsBlend: 0,
    externalOffsetX: 0,
    externalOffsetY: 0,
    followEmitterWorldPosition: false,
    lifetimeProgressOffset: 0,
    svgSourceMarkup: "",
    svgPathElementId: "",
    svgFitNormalize: false,
    bakedPresets: {},
    bakedPresetName: "",
    bakedFrames: [],
    bakedFrameIndex: 0,
    pointWeights: [],
    optimalMaxParticles: 256,
    morphKeyframes: [],
    morphTimelinePlay: false,
    morphTimelineDurationMs: 5000,
    morphTimelineLoop: true,
    morphTimelineSpeed: 1,
    pathVarietySeedMode: "particleUid",
    visualModulation: "none",
    visualProgressEasing: "linear",
    visualAlphaFrom: 0,
    visualAlphaTo: 1,
    visualScaleFromMul: 0.5,
    visualScaleToMul: 1.5,
    arrivalOvershootPx: 0,
    arrivalOvershootSettleMs: 200,
    imageSampleByAlphaWeight: false,
    audioReactSpeed: 0,
    audioReactMorph: 0,
    debugLogAssignmentMs: false,
  };
  behaviour = mergeObjectsWithDefaults(keysToInitialize, behaviour);
  if (!behaviour.presetParams || typeof behaviour.presetParams !== "object") {
    behaviour.presetParams = { ...keysToInitialize.presetParams };
  } else {
    behaviour.presetParams = mergeObjectsWithDefaults(
      keysToInitialize.presetParams,
      behaviour.presetParams,
    );
  }
  if (!behaviour.morphPresetParams || typeof behaviour.morphPresetParams !== "object") {
    behaviour.morphPresetParams = { ...keysToInitialize.morphPresetParams };
  } else {
    behaviour.morphPresetParams = mergeObjectsWithDefaults(
      keysToInitialize.morphPresetParams,
      behaviour.morphPresetParams,
    );
  }
  if (!Array.isArray(behaviour.points)) {
    behaviour.points = [];
  }
  if (!behaviour.bakedPresets || typeof behaviour.bakedPresets !== "object") {
    behaviour.bakedPresets = {};
  }
  if (!Array.isArray(behaviour.bakedFrames)) {
    behaviour.bakedFrames = [];
  }
  if (!Array.isArray(behaviour.morphKeyframes)) {
    behaviour.morphKeyframes = [];
  }
  if (!Array.isArray(behaviour.pointWeights)) {
    behaviour.pointWeights = [];
  }

  const predefinedEase = useMemo(() => {
    const names = {
      None: true,
      "back.in": true,
      "back.out": true,
      "back.inOut": true,
      "power1.in": true,
      "power1.out": true,
      "power1.inOut": true,
      "bounce.in": true,
      "bounce.out": true,
      "bounce.inOut": true,
      "elastic.in": true,
      "elastic.out": true,
      "elastic.inOut": true,
      steps: true,
    };
    return Object.keys(names)
      .sort()
      .map((key) => ({
        key,
        displayName: key,
      }));
  }, []);

  const predefinedPathType = useMemo(() => {
    const names = {
      linear: true,
      sinusoidal: true,
      noise: true,
      arc: true,
      spiral: true,
      cubic: true,
      springSeek: true,
    };
    return Object.keys(names)
      .sort()
      .map((key) => ({
        key,
        displayName: key,
      }));
  }, []);

  const patternModes = useMemo(
    () =>
      [
        "bakedPoints",
        "bakedFrames",
        "presetShape",
        "runtimeText",
        "svgPath",
        "imageBitmap",
      ].map((key) => ({
        key,
        displayName: key,
      })),
    [],
  );

  const presetShapes = useMemo(
    () =>
      ["circle", "rectOutline", "star", "heart", "polygon", "lissajous"].map(
        (key) => ({
          key,
          displayName: key,
        }),
      ),
    [],
  );

  const progressModes = useMemo(
    () =>
      ["distance", "lifetime"].map((key) => ({
        key,
        displayName: key,
      })),
    [],
  );

  const assignmentModes = useMemo(
    () =>
      ["stable", "random", "angle", "greedy", "optimal", "pathOrder"].map(
        (key) => ({
          key,
          displayName: key,
        }),
      ),
    [],
  );

  const staggerOrders = useMemo(
    () =>
      ["random", "index", "angle"].map((key) => ({
        key,
        displayName: key,
      })),
    [],
  );

  const bakedPolylineModes = useMemo(
    () =>
      ["cloud", "polyline"].map((key) => ({
        key,
        displayName: key,
      })),
    [],
  );

  const sinePhaseModes = useMemo(
    () =>
      ["shared", "perParticle"].map((key) => ({
        key,
        displayName: key,
      })),
    [],
  );

  const visualModulations = useMemo(
    () =>
      ["none", "alpha", "scale", "both"].map((key) => ({
        key,
        displayName: key,
      })),
    [],
  );

  const pathVarietySeedModes = useMemo(
    () =>
      ["particleUid", "deterministic"].map((key) => ({
        key,
        displayName: key,
      })),
    [],
  );

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

  const bakedPointsString = JSON.stringify(behaviour.points || [], null, 0);

  const applyBakedJson = (jsonStr) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!Array.isArray(parsed)) {
        setBakedJsonError("JSON must be an array of {x,y}");
        return;
      }
      behaviour.points = parsed.map((p) => ({
        x: Number(p.x) || 0,
        y: Number(p.y) || 0,
      }));
      setBakedJsonError("");
      updateBehaviours();
    } catch (e) {
      setBakedJsonError(e.message || "Invalid JSON");
    }
  };

  const handleBakeTextToPoints = () => {
    setBakeMessage("");
    try {
      const pts = rasterizeTextToPoints({
        text: behaviour.runtimeText || "",
        fontFamily: behaviour.fontFamily,
        fontSize: behaviour.fontSize,
        fontWeight: String(behaviour.fontWeight || "400"),
        maxSamplePixels: 12000,
        rasterMode: behaviour.textRasterMode || "fill",
        strokeWidth: behaviour.textStrokeWidth ?? 2,
      });
      behaviour.points = pts.map((p) => ({ x: p.x, y: p.y }));
      behaviour.patternMode = "bakedPoints";
      setBakeMessage(`Baked ${behaviour.points.length} points (switched to bakedPoints).`);
      updateBehaviours();
    } catch (e) {
      setBakeMessage(e.message || "Bake failed");
    }
  };

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

  const handleSingleImageFile = async (file) => {
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      behaviour.imageDataUrl = dataUrl;
      // Single-image upload should immediately drive imageBitmap source.
      behaviour.imageDataUrls = [];
      updateBehaviours();
    } catch (e) {
      setBakeMessage(e.message || "Image import failed");
    }
  };

  const handleImageFramesFiles = async (files) => {
    if (!files?.length) return;
    try {
      const urls = await Promise.all(Array.from(files).map(readFileAsDataUrl));
      behaviour.imageDataUrls = urls.filter(Boolean);
      if (behaviour.imageDataUrls.length > 0 && !behaviour.imageDataUrl) {
        behaviour.imageDataUrl = behaviour.imageDataUrls[0];
      }
      updateBehaviours();
    } catch (e) {
      setBakeMessage(e.message || "Image sequence import failed");
    }
  };

  const applyImagePreset = (preset) => {
    const presets = {
      logoCrisp: {
        imageSamplingMode: "edges",
        imageFitMode: "contain",
        imageAlphaThreshold: 100,
        imageSamplingDensity: 1.4,
        imageMinPointSpacingPx: 1,
        imageEdgeThickness: 1,
        imageColorMode: "raw",
        imageColorJitter: 0,
      },
      photoDithered: {
        imageSamplingMode: "fill",
        imageFitMode: "cover",
        imageAlphaThreshold: 16,
        imageSamplingDensity: 1.8,
        imageMinPointSpacingPx: 0,
        imageColorMode: "quantized",
        imageColorQuantizeLevels: 6,
        imageColorJitter: 0.15,
      },
      outlineNeon: {
        imageSamplingMode: "edges",
        imageFitMode: "contain",
        imageAlphaThreshold: 96,
        imageSamplingDensity: 2,
        imageEdgeThickness: 2,
        imageColorMode: "paletteMapped",
        imageColorPalette: "#00f5ff,#ff2bd6,#a6ff00,#ffffff",
        imageColorJitter: 0.05,
      },
      denseFill: {
        imageSamplingMode: "hybrid",
        imageFitMode: "contain",
        imageAlphaThreshold: 12,
        imageSamplingDensity: 2.5,
        imageMinPointSpacingPx: 0,
        imageColorMode: "raw",
      },
    };
    const cfg = presets[preset];
    if (!cfg) return;
    Object.assign(behaviour, cfg);
    updateBehaviours();
  };

  if (defaultConfig.particlePredefinedEffect === "coffeeShop") return <></>;

  const hasImageSequence = (behaviour.imageDataUrls?.length || 0) > 1;
  const usesImageEdges =
    behaviour.imageSamplingMode === "edges" ||
    behaviour.imageSamplingMode === "hybrid";
  const usesLumaMask = behaviour.imageMaskMode === "luma";
  const usesHueMask = behaviour.imageMaskMode === "hueRange";
  const usesImageColorMapping = behaviour.imageColorMode !== "raw";
  const usesQuantizedColor = behaviour.imageColorMode === "quantized";
  const usesPaletteColor = behaviour.imageColorMode === "paletteMapped";
  const usesVisualAlpha =
    behaviour.visualModulation === "alpha" || behaviour.visualModulation === "both";
  const usesVisualScale =
    behaviour.visualModulation === "scale" || behaviour.visualModulation === "both";

  const SectionLabel = ({ children }) => (
    <div className="col-xs-12" style={{ margin: "2px 0 10px" }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: 0.75,
        }}
      >
        {children}
      </div>
    </div>
  );

  return (
    <>
      <legend onClick={toggleSubmenuVisibility}>Form Pattern Properties</legend>
      <div className={`${isSubmenuVisible}`}>
        <FormPatternDescription />
        <BfCheckbox
          label="Enabled"
          id="form-pattern-enabled"
          onChange={(value) => {
            behaviour.enabled = value;
            updateBehaviours();
          }}
          checked={behaviour.enabled ?? keysToInitialize.enabled}
        />
        <BfInputNumber
          label="Priority"
          id="form-pattern-priority"
          value={behaviour.priority ?? keysToInitialize.priority}
          step="10"
          min="-100"
          onChange={(value) => {
            behaviour.priority = value;
            updateBehaviours();
          }}
        />
        <hr />
        <SectionLabel>Pattern source</SectionLabel>
        <BfCheckbox
          label="Active"
          id="form-pattern-active"
          onChange={(value) => {
            behaviour.active = value;
            updateBehaviours();
          }}
          checked={behaviour.active ?? keysToInitialize.active}
        />
        <BfSelect
          label="Pattern mode"
          defaultValue={behaviour.patternMode || keysToInitialize.patternMode}
          onChange={(value) => {
            behaviour.patternMode = value;
            updateBehaviours();
          }}
          elements={patternModes}
        />

        {behaviour.patternMode === "presetShape" && (
          <>
            <BfSelect
              label="Preset shape"
              defaultValue={
                behaviour.presetShape || keysToInitialize.presetShape
              }
              onChange={(value) => {
                behaviour.presetShape = value;
                updateBehaviours();
              }}
              elements={presetShapes}
            />
            <BfInputNumber
              label="Preset radius / star outer"
              id="form-preset-radius"
              value={behaviour.presetParams.radius ?? 100}
              step="1"
              onChange={(value) => {
                behaviour.presetParams.radius = value;
                updateBehaviours();
              }}
            />
            <BfInputNumber
              label="Rect half width"
              id="form-preset-hw"
              value={behaviour.presetParams.halfWidth ?? 120}
              step="1"
              onChange={(value) => {
                behaviour.presetParams.halfWidth = value;
                updateBehaviours();
              }}
            />
            <BfInputNumber
              label="Rect half height"
              id="form-preset-hh"
              value={behaviour.presetParams.halfHeight ?? 80}
              step="1"
              onChange={(value) => {
                behaviour.presetParams.halfHeight = value;
                updateBehaviours();
              }}
            />
            <BfInputNumber
              label="Star inner ratio"
              id="form-preset-inner"
              value={behaviour.presetParams.innerRatio ?? 0.45}
              step="0.05"
              min="0.05"
              max="1"
              onChange={(value) => {
                behaviour.presetParams.innerRatio = value;
                updateBehaviours();
              }}
            />
            <BfInputNumber
              label="Star points"
              id="form-preset-spikes"
              value={behaviour.presetParams.starPoints ?? 5}
              step="1"
              min="2"
              onChange={(value) => {
                behaviour.presetParams.starPoints = value;
                updateBehaviours();
              }}
            />
            {behaviour.presetShape === "polygon" && (
              <BfInputNumber
                label="Polygon sides"
                id="form-preset-poly-sides"
                value={behaviour.presetParams.polygonSides ?? 6}
                step="1"
                min="3"
                onChange={(value) => {
                  behaviour.presetParams.polygonSides = value;
                  updateBehaviours();
                }}
              />
            )}
            {behaviour.presetShape === "lissajous" && (
              <>
                <BfInputNumber
                  label="Lissajous A"
                  id="form-liss-a"
                  value={behaviour.presetParams.lissajousA ?? 3}
                  step="0.1"
                  onChange={(value) => {
                    behaviour.presetParams.lissajousA = value;
                    updateBehaviours();
                  }}
                />
                <BfInputNumber
                  label="Lissajous B"
                  id="form-liss-b"
                  value={behaviour.presetParams.lissajousB ?? 2}
                  step="0.1"
                  onChange={(value) => {
                    behaviour.presetParams.lissajousB = value;
                    updateBehaviours();
                  }}
                />
                <BfInputNumber
                  label="Lissajous delta (rad)"
                  id="form-liss-d"
                  value={behaviour.presetParams.lissajousDelta ?? 0}
                  step="0.1"
                  onChange={(value) => {
                    behaviour.presetParams.lissajousDelta = value;
                    updateBehaviours();
                  }}
                />
              </>
            )}
            <hr className="col-xs-12" />
            <SectionLabel>Morph (preset shape only)</SectionLabel>
            <BfInputNumber
              label="Morph blend"
              id="form-morph-blend"
              value={behaviour.morphBlend ?? 0}
              step="0.05"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.morphBlend = value;
                updateBehaviours();
              }}
            />
            <BfSelect
              label="Morph preset shape"
              defaultValue={
                behaviour.morphPresetShape || keysToInitialize.morphPresetShape
              }
              onChange={(value) => {
                behaviour.morphPresetShape = value;
                updateBehaviours();
              }}
              elements={presetShapes}
            />
            <BfInputNumber
              label="Morph radius / star outer"
              id="form-morph-radius"
              value={behaviour.morphPresetParams.radius ?? 100}
              step="1"
              onChange={(value) => {
                behaviour.morphPresetParams.radius = value;
                updateBehaviours();
              }}
            />
            <SectionLabel>
              Morph timeline (keyframes drive morph blend over time)
            </SectionLabel>
            <BfCheckbox
              label="Morph timeline play"
              id="form-morph-tl-play"
              onChange={(value) => {
                behaviour.morphTimelinePlay = value;
                updateBehaviours();
              }}
              checked={behaviour.morphTimelinePlay ?? false}
            />
            <BfInputNumber
              label="Morph timeline duration (ms)"
              id="form-morph-tl-dur"
              value={behaviour.morphTimelineDurationMs ?? 5000}
              step="100"
              min="100"
              onChange={(value) => {
                behaviour.morphTimelineDurationMs = value;
                updateBehaviours();
              }}
            />
            <BfCheckbox
              label="Morph timeline loop"
              id="form-morph-tl-loop"
              onChange={(value) => {
                behaviour.morphTimelineLoop = value;
                updateBehaviours();
              }}
              checked={behaviour.morphTimelineLoop ?? true}
            />
            <BfInputNumber
              label="Morph timeline speed"
              id="form-morph-tl-speed"
              value={behaviour.morphTimelineSpeed ?? 1}
              step="0.1"
              min="0"
              onChange={(value) => {
                behaviour.morphTimelineSpeed = value;
                updateBehaviours();
              }}
            />
            <div className="form-group col-xs-12">
              <label className="col-xs-4 form-label" htmlFor="form-morph-kf">
                Morph keyframes JSON
              </label>
              <div className="col-xs-8">
                <textarea
                  id="form-morph-kf"
                  className="form-control font-mono text-xs"
                  rows={3}
                  placeholder='[{"t":0,"morphBlend":0},{"t":1,"morphBlend":1}]'
                  defaultValue={JSON.stringify(
                    behaviour.morphKeyframes || [],
                  )}
                  onBlur={(e) => {
                    try {
                      const p = JSON.parse(e.target.value || "[]");
                      if (!Array.isArray(p)) throw new Error("array");
                      behaviour.morphKeyframes = p;
                      updateBehaviours();
                    } catch (err) {
                      /* keep */
                    }
                  }}
                />
                <BfFieldHint id="form-morph-kf" />
              </div>
            </div>
          </>
        )}

        {behaviour.patternMode === "runtimeText" && (
          <>
            <BfInputString
              label="Text"
              id="form-runtime-text"
              value={behaviour.runtimeText ?? ""}
              onChange={(value) => {
                behaviour.runtimeText = value;
                updateBehaviours();
              }}
            />
            <BfInputString
              label="Font family"
              id="form-font-family"
              value={behaviour.fontFamily ?? "sans-serif"}
              onChange={(value) => {
                behaviour.fontFamily = value;
                updateBehaviours();
              }}
            />
            <BfInputNumber
              label="Font size"
              id="form-font-size"
              value={behaviour.fontSize ?? 64}
              step="1"
              min="8"
              onChange={(value) => {
                behaviour.fontSize = value;
                updateBehaviours();
              }}
            />
            <BfInputString
              label="Font weight"
              id="form-font-weight"
              value={String(behaviour.fontWeight ?? "400")}
              onChange={(value) => {
                behaviour.fontWeight = value;
                updateBehaviours();
              }}
            />
            <BfSelect
              label="Text raster"
              defaultValue={
                behaviour.textRasterMode || keysToInitialize.textRasterMode
              }
              onChange={(value) => {
                behaviour.textRasterMode = value;
                updateBehaviours();
              }}
              elements={[
                { key: "fill", displayName: "fill" },
                { key: "stroke", displayName: "stroke" },
              ]}
            />
            <BfInputNumber
              label="Text stroke width"
              id="form-text-stroke-w"
              value={behaviour.textStrokeWidth ?? 2}
              step="0.5"
              min="0.5"
              onChange={(value) => {
                behaviour.textStrokeWidth = value;
                updateBehaviours();
              }}
            />
            <BfSelect
              label="Text align"
              defaultValue={
                behaviour.textAlign || keysToInitialize.textAlign
              }
              onChange={(value) => {
                behaviour.textAlign = value;
                updateBehaviours();
              }}
              elements={["left", "center", "right"].map((key) => ({
                key,
                displayName: key,
              }))}
            />
            <BfInputNumber
              label="Line height (0 = auto)"
              id="form-text-line-height"
              value={behaviour.textLineHeight ?? 0}
              step="1"
              min="0"
              onChange={(value) => {
                behaviour.textLineHeight = value;
                updateBehaviours();
              }}
            />
          </>
        )}

        {behaviour.patternMode === "bakedPoints" && (
          <div className="form-group col-xs-12">
            <label className="col-xs-4 form-label" htmlFor="form-baked-json">
              Points JSON
            </label>
            <div className="col-xs-8">
              <textarea
                id="form-baked-json"
                className="form-control font-mono text-xs"
                rows={6}
                defaultValue={bakedPointsString}
                key={bakedPointsString.slice(0, 40)}
                onBlur={(e) => applyBakedJson(e.target.value)}
              />
              <BfFieldHint id="form-baked-json" />
              {bakedJsonError && (
                <span className="text-red-500 text-xs">{bakedJsonError}</span>
              )}
            </div>
          </div>
        )}

        {behaviour.patternMode === "bakedPoints" && (
          <BfSelect
            label="Baked points mode"
            defaultValue={
              behaviour.bakedPolylineMode || keysToInitialize.bakedPolylineMode
            }
            onChange={(value) => {
              behaviour.bakedPolylineMode = value;
              updateBehaviours();
            }}
            elements={bakedPolylineModes}
          />
        )}

        {behaviour.patternMode === "bakedPoints" && (
          <>
            <BfInputString
              label="Named preset key"
              id="form-baked-preset-name"
              value={behaviour.bakedPresetName ?? ""}
              onChange={(value) => {
                behaviour.bakedPresetName = value;
                updateBehaviours();
              }}
            />
            <div className="form-group col-xs-12">
              <label className="col-xs-4 form-label" htmlFor="form-baked-presets">
                Named presets JSON
              </label>
              <div className="col-xs-8">
                <textarea
                  id="form-baked-presets"
                  className="form-control font-mono text-xs"
                  rows={4}
                  placeholder='{"logo":{"points":[{"x":0,"y":0}]}}'
                  defaultValue={JSON.stringify(behaviour.bakedPresets || {})}
                  onBlur={(e) => {
                    try {
                      const p = JSON.parse(e.target.value || "{}");
                      behaviour.bakedPresets =
                        typeof p === "object" && p !== null ? p : {};
                      updateBehaviours();
                    } catch (err) {
                      /* keep */
                    }
                  }}
                />
                <BfFieldHint id="form-baked-presets" />
              </div>
            </div>
            <div className="form-group col-xs-12">
              <label className="col-xs-4 form-label" htmlFor="form-point-weights">
                Point weights JSON (same length as points)
              </label>
              <div className="col-xs-8">
                <textarea
                  id="form-point-weights"
                  className="form-control font-mono text-xs"
                  rows={2}
                  placeholder="[1,2,1,0.5]"
                  defaultValue={JSON.stringify(behaviour.pointWeights || [])}
                  onBlur={(e) => {
                    try {
                      const p = JSON.parse(e.target.value || "[]");
                      behaviour.pointWeights = Array.isArray(p) ? p : [];
                      updateBehaviours();
                    } catch (err) {
                      /* keep */
                    }
                  }}
                />
                <BfFieldHint id="form-point-weights" />
              </div>
            </div>
          </>
        )}

        {behaviour.patternMode === "bakedFrames" && (
          <>
            <BfInputNumber
              label="Frame index"
              id="form-baked-frame-idx"
              value={behaviour.bakedFrameIndex ?? 0}
              step="1"
              min="0"
              onChange={(value) => {
                behaviour.bakedFrameIndex = value;
                updateBehaviours();
              }}
            />
            <BfSelect
              label="Baked frames mode"
              defaultValue={
                behaviour.bakedPolylineMode || keysToInitialize.bakedPolylineMode
              }
              onChange={(value) => {
                behaviour.bakedPolylineMode = value;
                updateBehaviours();
              }}
              elements={bakedPolylineModes}
            />
            <div className="form-group col-xs-12">
              <label className="col-xs-4 form-label" htmlFor="form-baked-frames">
                Frames JSON (array of point arrays)
              </label>
              <div className="col-xs-8">
                <textarea
                  id="form-baked-frames"
                  className="form-control font-mono text-xs"
                  rows={6}
                  placeholder='[[{"x":0,"y":0}],[{"x":1,"y":1}]]'
                  defaultValue={JSON.stringify(behaviour.bakedFrames || [])}
                  onBlur={(e) => {
                    try {
                      const p = JSON.parse(e.target.value || "[]");
                      behaviour.bakedFrames = Array.isArray(p) ? p : [];
                      updateBehaviours();
                    } catch (err) {
                      /* keep */
                    }
                  }}
                />
                <BfFieldHint id="form-baked-frames" />
              </div>
            </div>
          </>
        )}

        {behaviour.patternMode === "svgPath" && (
          <div className="form-group col-xs-12">
            <label className="col-xs-4 form-label" htmlFor="form-svg-path">
              SVG path (d)
            </label>
            <div className="col-xs-8">
              <textarea
                id="form-svg-path"
                className="form-control font-mono text-xs"
                rows={4}
                defaultValue={behaviour.svgPath ?? keysToInitialize.svgPath}
                key={(behaviour.svgPath || "").slice(0, 24)}
                onBlur={(e) => {
                  behaviour.svgPath = e.target.value;
                  updateBehaviours();
                }}
              />
              <BfFieldHint id="form-svg-path" />
            </div>
          </div>
        )}

        {behaviour.patternMode === "svgPath" && (
          <BfInputNumber
            label="SVG curve segments"
            id="form-svg-segs"
            value={behaviour.svgPathSegmentsPerCurve ?? 14}
            step="1"
            min="4"
            max="48"
            onChange={(value) => {
              behaviour.svgPathSegmentsPerCurve = value;
              updateBehaviours();
            }}
          />
        )}

        {behaviour.patternMode === "svgPath" && (
          <>
            <div className="form-group col-xs-12">
              <label className="col-xs-4 form-label" htmlFor="form-svg-raw">
                Raw SVG markup (optional)
              </label>
              <div className="col-xs-8">
                <textarea
                  id="form-svg-raw"
                  className="form-control font-mono text-xs"
                  rows={4}
                  placeholder="<svg>...</svg>"
                  defaultValue={behaviour.svgSourceMarkup ?? ""}
                  onBlur={(e) => {
                    behaviour.svgSourceMarkup = e.target.value;
                    updateBehaviours();
                  }}
                />
                <BfFieldHint id="form-svg-raw" />
              </div>
            </div>
            <BfInputString
              label="Path element id"
              id="form-svg-path-id"
              value={behaviour.svgPathElementId ?? ""}
              onChange={(value) => {
                behaviour.svgPathElementId = value;
                updateBehaviours();
              }}
            />
            <BfCheckbox
              label="Normalize path bbox to ~100px radius"
              id="form-svg-fit"
              onChange={(value) => {
                behaviour.svgFitNormalize = value;
                updateBehaviours();
              }}
              checked={behaviour.svgFitNormalize ?? false}
            />
          </>
        )}

        {behaviour.patternMode === "imageBitmap" && (
          <>
            <SectionLabel>Image source</SectionLabel>
            <div className="form-group col-xs-12">
              <label className="col-xs-4 form-label" htmlFor="form-image-upload">
                Upload image
              </label>
              <div className="col-xs-8">
                <input
                  id="form-image-upload"
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => handleSingleImageFile(e.target.files?.[0])}
                />
              </div>
            </div>
            <div className="form-group col-xs-12">
              <label className="col-xs-4 form-label" htmlFor="form-image-data-url">
                Image data URL
              </label>
              <div className="col-xs-8">
                <textarea
                  id="form-image-data-url"
                  className="form-control font-mono text-xs"
                  rows={3}
                  placeholder="data:image/png;base64,..."
                  defaultValue={behaviour.imageDataUrl ?? ""}
                  key={(behaviour.imageDataUrl || "").slice(0, 32)}
                  onBlur={(e) => {
                    behaviour.imageDataUrl = e.target.value;
                    updateBehaviours();
                  }}
                />
                <BfFieldHint id="form-image-data-url" />
              </div>
            </div>
            {behaviour.imageDataUrl && (
              <div className="form-group col-xs-12">
                <label className="col-xs-4 form-label">Preview</label>
                <div className="col-xs-8">
                  <img
                    src={behaviour.imageDataUrl}
                    alt="image bitmap preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: 120,
                      border: "1px solid #333",
                      borderRadius: 6,
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            )}
            <div className="form-group col-xs-12">
              <label className="col-xs-4 form-label" htmlFor="form-image-frames-upload">
                Upload image sequence
              </label>
              <div className="col-xs-8">
                <input
                  id="form-image-frames-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="form-control"
                  onChange={(e) => handleImageFramesFiles(e.target.files)}
                />
              </div>
            </div>
            <div className="form-group col-xs-12">
              <label className="col-xs-4 form-label" htmlFor="form-image-frames-data-url">
                Image frames JSON
              </label>
              <div className="col-xs-8">
                <textarea
                  id="form-image-frames-data-url"
                  className="form-control font-mono text-xs"
                  rows={3}
                  placeholder='["data:image/png;base64,..."]'
                  defaultValue={JSON.stringify(behaviour.imageDataUrls ?? [])}
                  onBlur={(e) => {
                    try {
                      const p = JSON.parse(e.target.value || "[]");
                      behaviour.imageDataUrls = Array.isArray(p)
                        ? p.map((x) => String(x || "")).filter(Boolean)
                        : [];
                      updateBehaviours();
                    } catch (err) {
                      /* keep */
                    }
                  }}
                />
                <BfFieldHint id="form-image-frames-data-url" />
              </div>
            </div>
            {hasImageSequence && (
              <>
                <hr className="col-xs-12" />
                <SectionLabel>Sequence playback</SectionLabel>
                <BfInputNumber
                  label="Image frame rate (fps)"
                  id="form-image-frame-rate"
                  value={behaviour.imageFrameRate ?? 12}
                  step="1"
                  min="1"
                  onChange={(value) => {
                    behaviour.imageFrameRate = value;
                    updateBehaviours();
                  }}
                />
                <BfCheckbox
                  label="Image frame loop"
                  id="form-image-frame-loop"
                  onChange={(value) => {
                    behaviour.imageFrameLoop = value;
                    updateBehaviours();
                  }}
                  checked={behaviour.imageFrameLoop ?? true}
                />
                <BfCheckbox
                  label="Image frame ping-pong"
                  id="form-image-frame-pingpong"
                  onChange={(value) => {
                    behaviour.imageFramePingPong = value;
                    updateBehaviours();
                  }}
                  checked={behaviour.imageFramePingPong ?? false}
                />
              </>
            )}
            <hr className="col-xs-12" />
            <SectionLabel>Sampling & fit</SectionLabel>
            <BfInputNumber
              label="Image alpha threshold"
              id="form-image-alpha"
              value={behaviour.imageAlphaThreshold ?? 128}
              step="1"
              min="1"
              max="255"
              onChange={(value) => {
                behaviour.imageAlphaThreshold = value;
                updateBehaviours();
              }}
            />
            <BfSelect
              label="Image fit mode"
              defaultValue={behaviour.imageFitMode || "contain"}
              onChange={(value) => {
                behaviour.imageFitMode = value;
                updateBehaviours();
              }}
              elements={["none", "contain", "cover", "stretch"].map((key) => ({
                key,
                displayName: key,
              }))}
            />
            <BfSelect
              label="Image sampling mode"
              defaultValue={behaviour.imageSamplingMode || "fill"}
              onChange={(value) => {
                behaviour.imageSamplingMode = value;
                updateBehaviours();
              }}
              elements={["fill", "edges", "hybrid"].map((key) => ({
                key,
                displayName: key,
              }))}
            />
            <BfCheckbox
              label="Match particle colors to image"
              id="form-image-match-colors"
              onChange={(value) => {
                behaviour.imageMatchParticleColors = value;
                updateBehaviours();
              }}
              checked={behaviour.imageMatchParticleColors ?? false}
            />
            <BfCheckbox
              label="Restore original colors when form pattern ends"
              id="form-image-restore-colors"
              onChange={(value) => {
                behaviour.imageRestoreOriginalColorOnDeactivate = value;
                updateBehaviours();
              }}
              checked={
                behaviour.imageRestoreOriginalColorOnDeactivate ?? false
              }
            />
            <BfInputNumber
              label="Image color blend (ms, 0 = instant)"
              id="form-image-color-blend-ms"
              value={behaviour.imageColorBlendDurationMs ?? 0}
              step="50"
              min="0"
              onChange={(value) => {
                behaviour.imageColorBlendDurationMs = value;
                updateBehaviours();
              }}
            />
            <BfSelect
              label="Image color mode"
              defaultValue={behaviour.imageColorMode || "raw"}
              onChange={(value) => {
                behaviour.imageColorMode = value;
                updateBehaviours();
              }}
              elements={[
                "raw",
                "quantized",
                "paletteMapped",
                "lumaOnly",
              ].map((key) => ({
                key,
                displayName: key,
              }))}
            />
            <BfSelect
              label="Image presets"
              defaultValue="custom"
              onChange={(value) => {
                if (value !== "custom") applyImagePreset(value);
              }}
              elements={[
                { key: "custom", displayName: "custom" },
                { key: "logoCrisp", displayName: "Logo Crisp" },
                { key: "photoDithered", displayName: "Photo Dithered" },
                { key: "outlineNeon", displayName: "Outline Neon" },
                { key: "denseFill", displayName: "Dense Fill" },
              ]}
            />
            <hr className="col-xs-12" />
            <SectionLabel>Color mapping</SectionLabel>
            {usesImageColorMapping && (
              <BfSelect
                label="Image color space (palette match)"
                defaultValue={behaviour.imageColorSpace || "rgb"}
                onChange={(value) => {
                  behaviour.imageColorSpace = value;
                  updateBehaviours();
                }}
                elements={["rgb", "hsv"].map((key) => ({
                  key,
                  displayName: key,
                }))}
              />
            )}
            {usesQuantizedColor && (
              <BfInputNumber
                label="Color quantize levels"
                id="form-image-color-levels"
                value={behaviour.imageColorQuantizeLevels ?? 8}
                step="1"
                min="2"
                max="32"
                onChange={(value) => {
                  behaviour.imageColorQuantizeLevels = value;
                  updateBehaviours();
                }}
              />
            )}
            {usesPaletteColor && (
              <BfInputString
                label="Palette (hex, comma-separated)"
                id="form-image-palette"
                value={behaviour.imageColorPalette ?? ""}
                onChange={(value) => {
                  behaviour.imageColorPalette = value;
                  updateBehaviours();
                }}
              />
            )}
            {usesImageColorMapping && (
              <BfInputNumber
                label="Color jitter (0..1)"
                id="form-image-color-jitter"
                value={behaviour.imageColorJitter ?? 0}
                step="0.01"
                min="0"
                max="1"
                onChange={(value) => {
                  behaviour.imageColorJitter = value;
                  updateBehaviours();
                }}
              />
            )}
            <BfInputNumber
              label="Sampling density (0.1..4)"
              id="form-image-sampling-density"
              value={behaviour.imageSamplingDensity ?? 1}
              step="0.1"
              min="0.1"
              max="4"
              onChange={(value) => {
                behaviour.imageSamplingDensity = value;
                updateBehaviours();
              }}
            />
            <BfInputNumber
              label="Min sample spacing px"
              id="form-image-min-spacing"
              value={behaviour.imageMinPointSpacingPx ?? 0}
              step="0.5"
              min="0"
              onChange={(value) => {
                behaviour.imageMinPointSpacingPx = value;
                updateBehaviours();
              }}
            />
            {usesImageEdges && (
              <>
                <BfInputNumber
                  label="Edge thickness"
                  id="form-image-edge-thickness"
                  value={behaviour.imageEdgeThickness ?? 1}
                  step="1"
                  min="1"
                  max="8"
                  onChange={(value) => {
                    behaviour.imageEdgeThickness = value;
                    updateBehaviours();
                  }}
                />
                <BfSelect
                  label="Edge detector"
                  defaultValue={behaviour.imageEdgeDetector || "alphaContour"}
                  onChange={(value) => {
                    behaviour.imageEdgeDetector = value;
                    updateBehaviours();
                  }}
                  elements={["alphaContour", "lumaSobel"].map((key) => ({
                    key,
                    displayName: key,
                  }))}
                />
              </>
            )}
            <hr className="col-xs-12" />
            <SectionLabel>Masking</SectionLabel>
            <BfSelect
              label="Mask mode"
              defaultValue={behaviour.imageMaskMode || "alpha"}
              onChange={(value) => {
                behaviour.imageMaskMode = value;
                updateBehaviours();
              }}
              elements={["alpha", "luma", "hueRange"].map((key) => ({
                key,
                displayName: key,
              }))}
            />
            <BfCheckbox
              label="Invert mask"
              id="form-image-mask-invert"
              onChange={(value) => {
                behaviour.imageInvertMask = value;
                updateBehaviours();
              }}
              checked={behaviour.imageInvertMask ?? false}
            />
            {usesLumaMask && (
              <BfInputNumber
                label="Mask luma threshold (0..1)"
                id="form-image-mask-luma-thr"
                value={behaviour.imageMaskLumaThreshold ?? 0}
                step="0.01"
                min="0"
                max="1"
                onChange={(value) => {
                  behaviour.imageMaskLumaThreshold = value;
                  updateBehaviours();
                }}
              />
            )}
            {usesHueMask && (
              <>
                <BfInputNumber
                  label="Mask hue min"
                  id="form-image-mask-hue-min"
                  value={behaviour.imageMaskHueMin ?? 0}
                  step="1"
                  min="0"
                  max="360"
                  onChange={(value) => {
                    behaviour.imageMaskHueMin = value;
                    updateBehaviours();
                  }}
                />
                <BfInputNumber
                  label="Mask hue max"
                  id="form-image-mask-hue-max"
                  value={behaviour.imageMaskHueMax ?? 360}
                  step="1"
                  min="0"
                  max="360"
                  onChange={(value) => {
                    behaviour.imageMaskHueMax = value;
                    updateBehaviours();
                  }}
                />
              </>
            )}
            {hasImageSequence && (
              <>
                <BfCheckbox
                  label="Temporal coherence (image sequences)"
                  id="form-image-temporal-coherence"
                  onChange={(value) => {
                    behaviour.imageTemporalCoherence = value;
                    updateBehaviours();
                  }}
                  checked={behaviour.imageTemporalCoherence ?? true}
                />
                <BfInputNumber
                  label="Frame blend (0..1)"
                  id="form-image-frame-blend"
                  value={behaviour.imageFrameBlend ?? 0}
                  step="0.05"
                  min="0"
                  max="1"
                  onChange={(value) => {
                    behaviour.imageFrameBlend = value;
                    updateBehaviours();
                  }}
                />
              </>
            )}
            <hr className="col-xs-12" />
            <SectionLabel>Performance & debug</SectionLabel>
            <BfCheckbox
              label="Progressive refine sampling"
              id="form-image-progressive-refine"
              onChange={(value) => {
                behaviour.imageProgressiveRefine = value;
                updateBehaviours();
              }}
              checked={behaviour.imageProgressiveRefine ?? true}
            />
            <BfInputNumber
              label="Auto downscale max dimension"
              id="form-image-auto-downscale"
              value={behaviour.imageAutoDownscaleMax ?? 1024}
              step="64"
              min="128"
              max="4096"
              onChange={(value) => {
                behaviour.imageAutoDownscaleMax = value;
                updateBehaviours();
              }}
            />
            <BfSelect
              label="Image debug overlay"
              defaultValue={behaviour.imageDebugOverlayMode || "off"}
              onChange={(value) => {
                behaviour.imageDebugOverlayMode = value;
                updateBehaviours();
              }}
              elements={["off", "samples", "edges", "alphaMask"].map((key) => ({
                key,
                displayName: key,
              }))}
            />
            <p className="col-xs-12 text-xs text-muted mb-1">
              Decoder status: {behaviour.imageDecodeStatus || "idle"}
            </p>
            <BfCheckbox
              label="Sample by alpha weight (denser opaque regions)"
              id="form-image-alpha-weight"
              onChange={(value) => {
                behaviour.imageSampleByAlphaWeight = value;
                updateBehaviours();
              }}
              checked={behaviour.imageSampleByAlphaWeight ?? false}
            />
          </>
        )}

        <BfInputNumber
          label="Point budget"
          id="form-point-budget"
          value={behaviour.pointBudget ?? keysToInitialize.pointBudget}
          step="32"
          min="8"
          onChange={(value) => {
            behaviour.pointBudget = value;
            updateBehaviours();
          }}
        />
        <hr />
        <SectionLabel>Formation transform</SectionLabel>
        <BfInputNumber
          label="Center"
          id="form-center"
          params={["x", "y"]}
          value={[
            behaviour.center?.x ?? 0,
            behaviour.center?.y ?? 0,
          ]}
          step="1"
          onChange={(value, id) => {
            if (!behaviour.center) behaviour.center = { x: 0, y: 0 };
            behaviour.center[id] = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Scale"
          id="form-scale"
          value={behaviour.scale ?? 1}
          step="0.1"
          min="0.01"
          onChange={(value) => {
            behaviour.scale = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Rotation (deg)"
          id="form-rotation"
          value={behaviour.rotation ?? 0}
          step="1"
          onChange={(value) => {
            behaviour.rotation = value;
            updateBehaviours();
          }}
        />
        <BfCheckbox
          label="Live formation transform"
          id="form-live-transform"
          onChange={(value) => {
            behaviour.liveFormationTransform = value;
            updateBehaviours();
          }}
          checked={behaviour.liveFormationTransform ?? false}
        />

        <hr />
        <SectionLabel>Assignment & timing</SectionLabel>
        <BfSelect
          label="Assignment"
          defaultValue={
            behaviour.assignmentMode || keysToInitialize.assignmentMode
          }
          onChange={(value) => {
            behaviour.assignmentMode = value;
            updateBehaviours();
          }}
          elements={assignmentModes}
        />
        <BfInputNumber
          label="Assignment seed"
          id="form-assign-seed"
          value={behaviour.assignmentSeed ?? 0}
          step="1"
          onChange={(value) => {
            behaviour.assignmentSeed = value;
            updateBehaviours();
          }}
        />
        {behaviour.assignmentMode === "optimal" && (
          <BfInputNumber
            label="Optimal max particles (Hungarian above -> greedy)"
            id="form-optimal-max"
            value={behaviour.optimalMaxParticles ?? 256}
            step="32"
            min="8"
            onChange={(value) => {
              behaviour.optimalMaxParticles = value;
              updateBehaviours();
            }}
          />
        )}
        <BfCheckbox
          label="Shuffle on each activate"
          id="form-shuffle-activate"
          onChange={(value) => {
            behaviour.shuffleOnEachActivate = value;
            updateBehaviours();
          }}
          checked={behaviour.shuffleOnEachActivate ?? false}
        />
        <BfInputNumber
          label="Target jitter"
          id="form-target-jitter"
          value={behaviour.targetJitter ?? 0}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.targetJitter = value;
            updateBehaviours();
          }}
        />
        <BfSelect
          label="Progress mode"
          defaultValue={behaviour.progressMode || keysToInitialize.progressMode}
          onChange={(value) => {
            behaviour.progressMode = value;
            updateBehaviours();
          }}
          elements={progressModes}
        />
        {behaviour.progressMode === "lifetime" && (
          <BfInputNumber
            label="Lifetime progress offset"
            id="form-life-progress-off"
            value={behaviour.lifetimeProgressOffset ?? 0}
            step="0.05"
            min="-1"
            max="1"
            onChange={(value) => {
              behaviour.lifetimeProgressOffset = value;
              updateBehaviours();
            }}
          />
        )}
        <BfInputNumber
          label="Stagger min (sec)"
          id="form-stagger-min"
          value={behaviour.staggerMin ?? 0}
          step="0.05"
          min="0"
          onChange={(value) => {
            behaviour.staggerMin = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Stagger max (sec)"
          id="form-stagger-max"
          value={behaviour.staggerMax ?? 0}
          step="0.05"
          min="0"
          onChange={(value) => {
            behaviour.staggerMax = value;
            updateBehaviours();
          }}
        />
        <BfSelect
          label="Stagger order"
          defaultValue={
            behaviour.staggerOrder || keysToInitialize.staggerOrder
          }
          onChange={(value) => {
            behaviour.staggerOrder = value;
            updateBehaviours();
          }}
          elements={staggerOrders}
        />
        <BfInputNumber
          label="Speed variance"
          id="form-speed-var"
          value={behaviour.speedVariance ?? 0}
          step="0.05"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.speedVariance = value;
            updateBehaviours();
          }}
        />
        <BfCheckbox
          label="Speed scale by distance"
          id="form-speed-scale-dist"
          onChange={(value) => {
            behaviour.speedScaleByDistance = value;
            updateBehaviours();
          }}
          checked={behaviour.speedScaleByDistance ?? false}
        />
        <BfInputNumber
          label="Linger (ms)"
          id="form-linger-ms"
          value={behaviour.lingerMs ?? 0}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.lingerMs = value;
            updateBehaviours();
          }}
        />
        <BfCheckbox
          label="Show target preview"
          id="form-show-preview"
          onChange={(value) => {
            behaviour.showTargetsPreview = value;
            updateBehaviours();
          }}
          checked={behaviour.showTargetsPreview ?? false}
        />
        <BfCheckbox
          label="Show path preview (chords)"
          id="form-show-path-preview"
          onChange={(value) => {
            behaviour.showPathPreview = value;
            updateBehaviours();
          }}
          checked={behaviour.showPathPreview ?? false}
        />

        <hr />
        <SectionLabel>Tools</SectionLabel>
        <button
          type="button"
          className="btn btn-default btn-sm mb-2"
          onClick={handleBakeTextToPoints}
        >
          Bake text to points
        </button>
        {bakeMessage && (
          <p className="text-xs col-xs-12 mb-2">{bakeMessage}</p>
        )}

        <hr />
        <SectionLabel>Motion & pathing</SectionLabel>
        <BfCheckbox
          label="Kill On Arrival"
          id="form-pattern-kill"
          onChange={(value) => {
            behaviour.killOnArrival = value;
            updateBehaviours();
          }}
          checked={behaviour.killOnArrival ?? keysToInitialize.killOnArrival}
        />
        <BfSelect
          label="Path Type"
          defaultValue={behaviour.pathType || keysToInitialize.pathType}
          onChange={(value) => {
            behaviour.pathType = value;
            updateBehaviours();
          }}
          elements={predefinedPathType}
        />
        <BfSelect
          label="Ease"
          defaultValue={behaviour.pathEasing || keysToInitialize.pathEasing}
          onChange={(value) => {
            behaviour.pathEasing = value;
            updateBehaviours();
          }}
          elements={predefinedEase}
        />
        <BfSelect
          label="Visual modulation"
          defaultValue={
            behaviour.visualModulation || keysToInitialize.visualModulation
          }
          onChange={(value) => {
            behaviour.visualModulation = value;
            updateBehaviours();
          }}
          elements={visualModulations}
        />
        <BfSelect
          label="Visual ease"
          defaultValue={
            behaviour.visualProgressEasing || keysToInitialize.visualProgressEasing
          }
          onChange={(value) => {
            behaviour.visualProgressEasing = value;
            updateBehaviours();
          }}
          elements={predefinedEase}
        />
        {usesVisualAlpha && (
          <>
            <BfInputNumber
              label="Visual alpha from"
              id="form-vis-a0"
              value={behaviour.visualAlphaFrom ?? 0}
              step="0.05"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.visualAlphaFrom = value;
                updateBehaviours();
              }}
            />
            <BfInputNumber
              label="Visual alpha to"
              id="form-vis-a1"
              value={behaviour.visualAlphaTo ?? 1}
              step="0.05"
              min="0"
              max="1"
              onChange={(value) => {
                behaviour.visualAlphaTo = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        {usesVisualScale && (
          <>
            <BfInputNumber
              label="Visual scale from mul"
              id="form-vis-s0"
              value={behaviour.visualScaleFromMul ?? 0.5}
              step="0.05"
              min="0"
              onChange={(value) => {
                behaviour.visualScaleFromMul = value;
                updateBehaviours();
              }}
            />
            <BfInputNumber
              label="Visual scale to mul"
              id="form-vis-s1"
              value={behaviour.visualScaleToMul ?? 1.5}
              step="0.05"
              min="0"
              onChange={(value) => {
                behaviour.visualScaleToMul = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        <BfInputNumber
          label="Arrival overshoot px"
          id="form-overshoot-px"
          value={behaviour.arrivalOvershootPx ?? 0}
          step="1"
          min="0"
          onChange={(value) => {
            behaviour.arrivalOvershootPx = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Overshoot settle (ms)"
          id="form-overshoot-ms"
          value={behaviour.arrivalOvershootSettleMs ?? 200}
          step="10"
          min="1"
          onChange={(value) => {
            behaviour.arrivalOvershootSettleMs = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Speed"
          id="form-pattern-speed"
          value={behaviour.speed ?? keysToInitialize.speed}
          step="1"
          onChange={(value) => {
            behaviour.speed = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Arrival Threshold"
          id="form-pattern-arrival"
          value={
            behaviour.arrivalThreshold ?? keysToInitialize.arrivalThreshold
          }
          step="1"
          onChange={(value) => {
            behaviour.arrivalThreshold = value;
            updateBehaviours();
          }}
        />
        {behaviour.pathType === "sinusoidal" && (
          <>
            <BfInputNumber
              label="Sinusoidal Amplitude"
              id="form-sin-amp"
              value={
                behaviour.sinusoidalAmplitude ??
                keysToInitialize.sinusoidalAmplitude
              }
              step="10"
              min="0"
              onChange={(value) => {
                behaviour.sinusoidalAmplitude = value;
                updateBehaviours();
              }}
            />
            <BfInputNumber
              label="Sinusoidal Frequency"
              id="form-sin-freq"
              value={
                behaviour.sinusoidalFrequency ??
                keysToInitialize.sinusoidalFrequency
              }
              step="1"
              min="0"
              onChange={(value) => {
                behaviour.sinusoidalFrequency = value;
                updateBehaviours();
              }}
            />
            <BfSelect
              label="Sine phase"
              defaultValue={
                behaviour.sinusoidalPhaseMode || keysToInitialize.sinusoidalPhaseMode
              }
              onChange={(value) => {
                behaviour.sinusoidalPhaseMode = value;
                updateBehaviours();
              }}
              elements={sinePhaseModes}
            />
          </>
        )}
        {behaviour.pathType === "noise" && (
          <>
            <BfInputNumber
              label="Noise amplitude"
              id="form-noise-amp"
              value={behaviour.noiseAmplitude ?? 20}
              step="1"
              min="0"
              onChange={(value) => {
                behaviour.noiseAmplitude = value;
                updateBehaviours();
              }}
            />
            <BfInputNumber
              label="Noise frequency"
              id="form-noise-freq"
              value={behaviour.noiseFrequency ?? 4}
              step="0.1"
              min="0"
              onChange={(value) => {
                behaviour.noiseFrequency = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        {behaviour.pathType === "arc" && (
          <BfInputNumber
            label="Arc bulge"
            id="form-arc-bulge"
            value={behaviour.arcBulge ?? 0}
            step="0.05"
            onChange={(value) => {
              behaviour.arcBulge = value;
              updateBehaviours();
            }}
          />
        )}
        {behaviour.pathType === "spiral" && (
          <BfInputNumber
            label="Spiral turns"
            id="form-spiral-turns"
            value={behaviour.spiralTurns ?? 0}
            step="0.05"
            onChange={(value) => {
              behaviour.spiralTurns = value;
              updateBehaviours();
            }}
          />
        )}
        {behaviour.pathType === "cubic" && (
          <>
            <BfInputNumber
              label="Cubic perp bulge"
              id="form-cubic-bulge"
              value={behaviour.cubicPerpBulge ?? 0.25}
              step="0.05"
              onChange={(value) => {
                behaviour.cubicPerpBulge = value;
                updateBehaviours();
              }}
            />
            <BfInputNumber
              label="Cubic asymmetry"
              id="form-cubic-asym"
              value={behaviour.cubicAsymmetry ?? 1}
              step="0.1"
              onChange={(value) => {
                behaviour.cubicAsymmetry = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        {behaviour.pathType === "springSeek" && (
          <>
            <BfInputNumber
              label="Spring stiffness"
              id="form-spring-k"
              value={behaviour.springStiffness ?? 180}
              step="5"
              min="1"
              onChange={(value) => {
                behaviour.springStiffness = value;
                updateBehaviours();
              }}
            />
            <BfInputNumber
              label="Spring damping"
              id="form-spring-d"
              value={behaviour.springDamping ?? 24}
              step="1"
              min="0"
              onChange={(value) => {
                behaviour.springDamping = value;
                updateBehaviours();
              }}
            />
          </>
        )}
        <BfInputNumber
          label="Path variety"
          id="form-path-variety"
          value={behaviour.pathVariety ?? 0}
          step="0.05"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.pathVariety = value;
            updateBehaviours();
          }}
        />
        <BfSelect
          label="Path variety seed"
          defaultValue={
            behaviour.pathVarietySeedMode || keysToInitialize.pathVarietySeedMode
          }
          onChange={(value) => {
            behaviour.pathVarietySeedMode = value;
            updateBehaviours();
          }}
          elements={pathVarietySeedModes}
        />
        <BfInputNumber
          label="Physics blend"
          id="form-physics-blend"
          value={behaviour.physicsBlend ?? 0}
          step="0.05"
          min="0"
          max="1"
          onChange={(value) => {
            behaviour.physicsBlend = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="External offset X"
          id="form-ext-off-x"
          value={behaviour.externalOffsetX ?? 0}
          step="1"
          onChange={(value) => {
            behaviour.externalOffsetX = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="External offset Y"
          id="form-ext-off-y"
          value={behaviour.externalOffsetY ?? 0}
          step="1"
          onChange={(value) => {
            behaviour.externalOffsetY = value;
            updateBehaviours();
          }}
        />
        <BfCheckbox
          label="Follow emitter world position (Emitter.worldPosition)"
          id="form-follow-emitter"
          onChange={(value) => {
            behaviour.followEmitterWorldPosition = value;
            updateBehaviours();
          }}
          checked={behaviour.followEmitterWorldPosition ?? false}
        />
        <hr />
        <SectionLabel>Reactive & debugging</SectionLabel>
        <BfInputNumber
          label="Audio react speed (0 = off)"
          id="form-audio-speed"
          value={behaviour.audioReactSpeed ?? 0}
          step="0.05"
          onChange={(value) => {
            behaviour.audioReactSpeed = value;
            updateBehaviours();
          }}
        />
        <BfInputNumber
          label="Audio react morph add"
          id="form-audio-morph"
          value={behaviour.audioReactMorph ?? 0}
          step="0.05"
          onChange={(value) => {
            behaviour.audioReactMorph = value;
            updateBehaviours();
          }}
        />
        <BfCheckbox
          label="Debug log assignment time (console)"
          id="form-fp-debug"
          onChange={(value) => {
            behaviour.debugLogAssignmentMs = value;
            updateBehaviours();
          }}
          checked={behaviour.debugLogAssignmentMs ?? false}
        />
      </div>
    </>
  );
}

"use client";

import {
  BfInputNumber as RfInputNumber,
  BfCheckbox as RfCheckbox,
  BfInputString as RfInputString,
  BfFieldHint as RfSelectHint,
} from "@components/properties/BehaviourFieldWrappers";

/**
 * Extended “ideation” controls for RecursiveFireworkBehaviour.
 * Rendered inside Advanced; SubLabel/help come from the parent panel.
 */
export default function RecursiveFireworkIdeationControls({
  behaviour,
  keysToInitialize,
  updateBehaviours,
  getListInputValue,
  editListInput,
  commitListInput,
  SectionLabel,
  SubsectionLabel,
  help,
}) {
  return (
    <>
      <hr />
      <details open style={{ marginBottom: 12 }}>
        <summary style={{ cursor: "pointer", fontWeight: 600, marginBottom: 8 }}>
          Ideation / extended modes
        </summary>
        <div>
          {SectionLabel ? (
            <SectionLabel help={help.ideationModes}>Overview</SectionLabel>
          ) : null}
          <SubsectionLabel help={help.ideationEcho}>Echo bloom</SubsectionLabel>
          <RfInputNumber
            label="Echo count"
            id="recursive-firework-ideation-echo-count"
            value={behaviour.echoCount ?? keysToInitialize.echoCount}
            step="1"
            min="0"
            max="24"
            onChange={(value) => {
              behaviour.echoCount = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Echo spacing (ms)"
            id="recursive-firework-ideation-echo-spacing-ms"
            value={behaviour.echoSpacingMs ?? keysToInitialize.echoSpacingMs}
            step="1"
            min="0"
            onChange={(value) => {
              behaviour.echoSpacingMs = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Echo scale falloff"
            id="recursive-firework-ideation-echo-scale-falloff"
            value={behaviour.echoScaleFalloff ?? keysToInitialize.echoScaleFalloff}
            step="0.01"
            min="0.05"
            max="1"
            onChange={(value) => {
              behaviour.echoScaleFalloff = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Echo child comet chance mult"
            id="recursive-firework-ideation-echo-child-comet-chance"
            value={behaviour.echoChildCometChance ?? keysToInitialize.echoChildCometChance}
            step="0.01"
            min="0"
            max="2"
            onChange={(value) => {
              behaviour.echoChildCometChance = value;
              updateBehaviours();
            }}
          />
          <RfCheckbox
            label="Child comets from final echo layer only"
            id="recursive-firework-ideation-echo-final-layer-only"
            checked={behaviour.echoChildCometsFinalLayerOnly ?? keysToInitialize.echoChildCometsFinalLayerOnly}
            onChange={(value) => {
              behaviour.echoChildCometsFinalLayerOnly = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Echo trail sample cap"
            id="recursive-firework-ideation-echo-trail-cap"
            value={behaviour.echoTrailSampleCap ?? keysToInitialize.echoTrailSampleCap}
            step="1"
            min="4"
            max="64"
            onChange={(value) => {
              behaviour.echoTrailSampleCap = value;
              updateBehaviours();
            }}
          />

          <SubsectionLabel help={help.ideationShear}>Velocity shear & aim blend</SubsectionLabel>
          <RfInputNumber
            label="Shear asymmetry"
            id="recursive-firework-ideation-shear-asymmetry"
            value={behaviour.shearAsymmetry ?? keysToInitialize.shearAsymmetry}
            step="0.01"
            min="0"
            max="2"
            onChange={(value) => {
              behaviour.shearAsymmetry = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Cone bias (deg)"
            id="recursive-firework-ideation-cone-bias-deg"
            value={behaviour.coneBiasDegrees ?? keysToInitialize.coneBiasDegrees}
            step="1"
            min="-180"
            max="180"
            onChange={(value) => {
              behaviour.coneBiasDegrees = value;
              updateBehaviours();
            }}
          />
          <RfInputString
            label="Velocity blend by depth (0–1, comma)"
            id="recursive-firework-ideation-velocity-blend-curve"
            value={getListInputValue("velocityBlendDepthCurve")}
            onChange={(value) => editListInput("velocityBlendDepthCurve", value)}
            onBlur={() => commitListInput("velocityBlendDepthCurve")}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitListInput("velocityBlendDepthCurve");
            }}
          />

          <SubsectionLabel help={help.ideationMinefield}>Proximity minefield</SubsectionLabel>
          <RfInputNumber
            label="Minefield cell size (px, 0 = off)"
            id="recursive-firework-ideation-mine-cell"
            value={behaviour.minefieldCellSize ?? keysToInitialize.minefieldCellSize}
            step="1"
            min="0"
            max="400"
            onChange={(value) => {
              behaviour.minefieldCellSize = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Mine arm life progress"
            id="recursive-firework-ideation-mine-arm"
            value={behaviour.mineArmProgress ?? keysToInitialize.mineArmProgress}
            step="0.01"
            min="0"
            max="1"
            onChange={(value) => {
              behaviour.mineArmProgress = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Max mines per root shot"
            id="recursive-firework-ideation-max-mines"
            value={behaviour.maxMinesPerShot ?? keysToInitialize.maxMinesPerShot}
            step="1"
            min="0"
            max="64"
            onChange={(value) => {
              behaviour.maxMinesPerShot = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Mine stagger (ms)"
            id="recursive-firework-ideation-mine-stagger"
            value={behaviour.mineStaggerMs ?? keysToInitialize.mineStaggerMs}
            step="1"
            min="0"
            onChange={(value) => {
              behaviour.mineStaggerMs = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Mine burst spread (deg)"
            id="recursive-firework-ideation-mine-spread"
            value={behaviour.mineSpreadDegrees ?? keysToInitialize.mineSpreadDegrees}
            step="1"
            min="1"
            max="360"
            onChange={(value) => {
              behaviour.mineSpreadDegrees = value;
              updateBehaviours();
            }}
          />

          <SubsectionLabel help={help.ideationSpiral}>Spiral burst tuning</SubsectionLabel>
          <RfInputNumber
            label="Spiral turns"
            id="recursive-firework-ideation-spiral-turns"
            value={behaviour.spiralTurns ?? keysToInitialize.spiralTurns}
            step="0.1"
            min="0.1"
            max="20"
            onChange={(value) => {
              behaviour.spiralTurns = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Spiral tightness"
            id="recursive-firework-ideation-spiral-tightness"
            value={behaviour.spiralTightness ?? keysToInitialize.spiralTightness}
            step="0.05"
            min="0.1"
            max="4"
            onChange={(value) => {
              behaviour.spiralTightness = value;
              updateBehaviours();
            }}
          />
          <RfCheckbox
            label="Arm role alternate (odd indices)"
            id="recursive-firework-ideation-arm-alternate"
            checked={behaviour.armRoleAlternate ?? keysToInitialize.armRoleAlternate}
            onChange={(value) => {
              behaviour.armRoleAlternate = value;
              updateBehaviours();
            }}
          />

          <SubsectionLabel help={help.ideationWave}>Wavefront interference</SubsectionLabel>
          <RfInputNumber
            label="Wave K1"
            id="recursive-firework-ideation-wave-k1"
            value={behaviour.waveK1 ?? keysToInitialize.waveK1}
            step="0.001"
            onChange={(value) => {
              behaviour.waveK1 = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Wave K2"
            id="recursive-firework-ideation-wave-k2"
            value={behaviour.waveK2 ?? keysToInitialize.waveK2}
            step="0.001"
            onChange={(value) => {
              behaviour.waveK2 = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Interference threshold (−9 = off)"
            id="recursive-firework-ideation-interference-threshold"
            value={behaviour.interferenceThreshold ?? keysToInitialize.interferenceThreshold}
            step="0.05"
            min="-9"
            max="1"
            onChange={(value) => {
              behaviour.interferenceThreshold = value;
              updateBehaviours();
            }}
          />
          <div className="form-group">
            <label className="col-xs-4 form-label" htmlFor="recursive-firework-ideation-wave-anchor">
              Wave anchor mode
            </label>
            <div className="col-xs-8">
              <select
                id="recursive-firework-ideation-wave-anchor"
                className="form-control"
                value={behaviour.waveAnchorMode ?? keysToInitialize.waveAnchorMode}
                onChange={(e) => {
                  behaviour.waveAnchorMode = e.target.value;
                  updateBehaviours();
                }}
              >
                <option value="originOnly">originOnly</option>
                <option value="originAndPointer">originAndPointer</option>
                <option value="mirroredDepth">mirroredDepth</option>
              </select>
              <RfSelectHint id="recursive-firework-ideation-wave-anchor" />
            </div>
          </div>

          <SubsectionLabel help={help.ideationOrbit}>Orbital hatchery (with Two Stage)</SubsectionLabel>
          <RfInputNumber
            label="Orbit radius"
            id="recursive-firework-ideation-orbit-radius"
            value={behaviour.orbitRadius ?? keysToInitialize.orbitRadius}
            step="1"
            min="0"
            max="800"
            onChange={(value) => {
              behaviour.orbitRadius = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Orbit speed"
            id="recursive-firework-ideation-orbit-speed"
            value={behaviour.orbitSpeed ?? keysToInitialize.orbitSpeed}
            step="0.01"
            min="0"
            max="2"
            onChange={(value) => {
              behaviour.orbitSpeed = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Hatch delay (ms)"
            id="recursive-firework-ideation-hatch-delay"
            value={behaviour.hatchDelayMs ?? keysToInitialize.hatchDelayMs}
            step="1"
            min="0"
            onChange={(value) => {
              behaviour.hatchDelayMs = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Hatch comet chance"
            id="recursive-firework-ideation-hatch-comet-chance"
            value={behaviour.hatchCometChance ?? keysToInitialize.hatchCometChance}
            step="0.01"
            min="0"
            max="1"
            onChange={(value) => {
              behaviour.hatchCometChance = value;
              updateBehaviours();
            }}
          />

          <SubsectionLabel help={help.ideationCurvature}>Curvature detonator</SubsectionLabel>
          <RfInputNumber
            label="Curvature threshold (rad, 0 = off)"
            id="recursive-firework-ideation-curvature-threshold"
            value={behaviour.curvatureThresholdRad ?? keysToInitialize.curvatureThresholdRad}
            step="0.05"
            min="0"
            max="6.28"
            onChange={(value) => {
              behaviour.curvatureThresholdRad = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Corner burst scale"
            id="recursive-firework-ideation-corner-burst-scale"
            value={behaviour.cornerBurstScale ?? keysToInitialize.cornerBurstScale}
            step="0.01"
            min="0.1"
            max="1.5"
            onChange={(value) => {
              behaviour.cornerBurstScale = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Corner cooldown (ms)"
            id="recursive-firework-ideation-corner-cooldown"
            value={behaviour.cornerCooldownMs ?? keysToInitialize.cornerCooldownMs}
            step="1"
            min="0"
            max="2000"
            onChange={(value) => {
              behaviour.cornerCooldownMs = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Corner micro burst count"
            id="recursive-firework-ideation-corner-micro-count"
            value={behaviour.cornerMicroBurstCount ?? keysToInitialize.cornerMicroBurstCount}
            step="1"
            min="0"
            max="32"
            onChange={(value) => {
              behaviour.cornerMicroBurstCount = value;
              updateBehaviours();
            }}
          />

          <SubsectionLabel help={help.ideationZLayer}>Z-layer piercer</SubsectionLabel>
          <RfInputNumber
            label="Z sheet separation"
            id="recursive-firework-ideation-z-sheet-sep"
            value={behaviour.zSheetSeparation ?? keysToInitialize.zSheetSeparation}
            step="1"
            onChange={(value) => {
              behaviour.zSheetSeparation = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Near sheet comet bias"
            id="recursive-firework-ideation-near-comet-bias"
            value={behaviour.nearSheetCometBias ?? keysToInitialize.nearSheetCometBias}
            step="0.05"
            min="0"
            max="3"
            onChange={(value) => {
              behaviour.nearSheetCometBias = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Far sheet comet bias"
            id="recursive-firework-ideation-far-comet-bias"
            value={behaviour.farSheetCometBias ?? keysToInitialize.farSheetCometBias}
            step="0.05"
            min="0"
            max="3"
            onChange={(value) => {
              behaviour.farSheetCometBias = value;
              updateBehaviours();
            }}
          />

          <SubsectionLabel help={help.ideationPedigree}>Color pedigree</SubsectionLabel>
          <RfInputNumber
            label="Pedigree saturation floor"
            id="recursive-firework-ideation-pedigree-sat-floor"
            value={behaviour.pedigreeSaturationFloor ?? keysToInitialize.pedigreeSaturationFloor}
            step="0.01"
            min="0"
            max="1"
            onChange={(value) => {
              behaviour.pedigreeSaturationFloor = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Sport probability"
            id="recursive-firework-ideation-sport-prob"
            value={behaviour.sportProbability ?? keysToInitialize.sportProbability}
            step="0.01"
            min="0"
            max="1"
            onChange={(value) => {
              behaviour.sportProbability = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Sport hue delta (deg)"
            id="recursive-firework-ideation-sport-hue"
            value={behaviour.sportHueDelta ?? keysToInitialize.sportHueDelta}
            step="1"
            min="0"
            max="180"
            onChange={(value) => {
              behaviour.sportHueDelta = value;
              updateBehaviours();
            }}
          />

          <SubsectionLabel help={help.ideationFork}>Lightning fork (crossette)</SubsectionLabel>
          <RfInputNumber
            label="Fork arity cap (0 = use crossette only)"
            id="recursive-firework-ideation-fork-arity"
            value={behaviour.forkArity ?? keysToInitialize.forkArity}
            step="1"
            min="0"
            max="16"
            onChange={(value) => {
              behaviour.forkArity = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Fork angle jitter (deg)"
            id="recursive-firework-ideation-fork-jitter"
            value={behaviour.forkAngleJitter ?? keysToInitialize.forkAngleJitter}
            step="1"
            min="0"
            max="90"
            onChange={(value) => {
              behaviour.forkAngleJitter = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Leaf comet chance mult"
            id="recursive-firework-ideation-leaf-comet"
            value={behaviour.leafCometChance ?? keysToInitialize.leafCometChance}
            step="0.01"
            min="0"
            max="2"
            onChange={(value) => {
              behaviour.leafCometChance = value;
              updateBehaviours();
            }}
          />

          <SubsectionLabel help={help.ideationCrystallize}>Grid crystallization</SubsectionLabel>
          <RfInputNumber
            label="Grid cell (px, 0 = off)"
            id="recursive-firework-ideation-grid-cell"
            value={behaviour.gridCellPx ?? keysToInitialize.gridCellPx}
            step="1"
            min="0"
            max="200"
            onChange={(value) => {
              behaviour.gridCellPx = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Max crystallize nuclei"
            id="recursive-firework-ideation-max-nuclei"
            value={behaviour.maxCrystallizeNuclei ?? keysToInitialize.maxCrystallizeNuclei}
            step="1"
            min="1"
            max="32"
            onChange={(value) => {
              behaviour.maxCrystallizeNuclei = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Crystallize delay (ms)"
            id="recursive-firework-ideation-crystal-delay"
            value={behaviour.crystallizeDelayMs ?? keysToInitialize.crystallizeDelayMs}
            step="1"
            min="0"
            onChange={(value) => {
              behaviour.crystallizeDelayMs = value;
              updateBehaviours();
            }}
          />

          <SubsectionLabel help={help.ideationMagnetic}>Magnetic mouse bloom</SubsectionLabel>
          <RfCheckbox
            label="Magnetic pull enabled"
            id="recursive-firework-ideation-magnetic-enabled"
            checked={behaviour.magneticMousePullEnabled ?? keysToInitialize.magneticMousePullEnabled}
            onChange={(value) => {
              behaviour.magneticMousePullEnabled = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Mouse pull start life progress"
            id="recursive-firework-ideation-mouse-pull-start"
            value={behaviour.mousePullStartProgress ?? keysToInitialize.mousePullStartProgress}
            step="0.01"
            min="0"
            max="1"
            onChange={(value) => {
              behaviour.mousePullStartProgress = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Mouse pull strength"
            id="recursive-firework-ideation-mouse-pull-strength"
            value={behaviour.mousePullStrength ?? keysToInitialize.mousePullStrength}
            step="0.5"
            min="0"
            max="80"
            onChange={(value) => {
              behaviour.mousePullStrength = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Outward bias from cursor (deg)"
            id="recursive-firework-ideation-outward-bias"
            value={behaviour.outwardBiasDegrees ?? keysToInitialize.outwardBiasDegrees}
            step="1"
            min="-120"
            max="120"
            onChange={(value) => {
              behaviour.outwardBiasDegrees = value;
              updateBehaviours();
            }}
          />

          <SubsectionLabel help={help.ideationMerge}>Collision spark swap</SubsectionLabel>
          <RfInputNumber
            label="Merge radius"
            id="recursive-firework-ideation-merge-radius"
            value={behaviour.mergeRadius ?? keysToInitialize.mergeRadius}
            step="1"
            min="0"
            max="200"
            onChange={(value) => {
              behaviour.mergeRadius = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Merge probability"
            id="recursive-firework-ideation-merge-prob"
            value={behaviour.mergeProbability ?? keysToInitialize.mergeProbability}
            step="0.01"
            min="0"
            max="1"
            onChange={(value) => {
              behaviour.mergeProbability = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Max merges per frame"
            id="recursive-firework-ideation-merge-max"
            value={behaviour.maxMergesPerFrame ?? keysToInitialize.maxMergesPerFrame}
            step="1"
            min="0"
            max="64"
            onChange={(value) => {
              behaviour.maxMergesPerFrame = value;
              updateBehaviours();
            }}
          />

          <SubsectionLabel help={help.ideationLegendary}>Legendary sigil</SubsectionLabel>
          <RfInputNumber
            label="Legendary chance"
            id="recursive-firework-ideation-legendary-chance"
            value={behaviour.legendaryChance ?? keysToInitialize.legendaryChance}
            step="0.005"
            min="0"
            max="1"
            onChange={(value) => {
              behaviour.legendaryChance = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Sigil sides (star points)"
            id="recursive-firework-ideation-sigil-sides"
            value={behaviour.sigilSides ?? keysToInitialize.sigilSides}
            step="1"
            min="3"
            max="16"
            onChange={(value) => {
              behaviour.sigilSides = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Legendary budget cap"
            id="recursive-firework-ideation-legendary-budget"
            value={behaviour.legendaryBudgetCap ?? keysToInitialize.legendaryBudgetCap}
            step="10"
            min="40"
            max="5000"
            onChange={(value) => {
              behaviour.legendaryBudgetCap = value;
              updateBehaviours();
            }}
          />
          <RfInputNumber
            label="Legendary recursion cap"
            id="recursive-firework-ideation-legendary-recursion-cap"
            value={behaviour.legendaryRecursionCap ?? keysToInitialize.legendaryRecursionCap}
            step="1"
            min="1"
            max="8"
            onChange={(value) => {
              behaviour.legendaryRecursionCap = value;
              updateBehaviours();
            }}
          />
        </div>
      </details>
    </>
  );
}

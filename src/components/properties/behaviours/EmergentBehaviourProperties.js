"use client";

import { useBehaviourSectionCollapse } from "@context/SidebarBehaviourAccordionContext";

import {
  BfCheckbox,
  BfInputNumber,
} from "@components/properties/BehaviourFieldWrappers";
import { useState } from "react";
import { updateProps } from "@utils";

export default function EmergentBehaviourProperties({
  defaultConfig,
  index,
  title = "Emergent Behaviour",
  accordionPanelId,
}) {
  const { isSubmenuVisible, toggleSubmenuVisibility } = useBehaviourSectionCollapse(accordionPanelId);
    if (defaultConfig.particlePredefinedEffect === "coffeeShop") return null;
  const behaviour = defaultConfig?.emitterConfig?.behaviours?.[index];
  if (!behaviour) return null;

  const numericKeys = Object.keys(behaviour)
    .filter((key) => !["name", "enabled", "priority"].includes(key))
    .filter((key) => typeof behaviour[key] === "number");

  return (
    <>
      <legend
        onClick={toggleSubmenuVisibility}
      >
        {title}
      </legend>
      <div className={`${isSubmenuVisible}`}>
        <BfCheckbox
          label="Enabled"
          id={`${behaviour.name}-enabled`}
          checked={behaviour.enabled !== false}
          onChange={(value) =>
            updateProps(`emitterConfig.behaviours.${index}.enabled`, value)
          }
        />
        <BfInputNumber
          label="Priority"
          id={`${behaviour.name}-priority`}
          value={behaviour.priority ?? 0}
          step="1"
          onChange={(value) =>
            updateProps(`emitterConfig.behaviours.${index}.priority`, value)
          }
        />
        {numericKeys.map((key) => (
          <BfInputNumber
            key={`${behaviour.name}-${key}`}
            label={key}
            id={`${behaviour.name}-${key}`}
            value={behaviour[key] ?? 0}
            step="0.01"
            onChange={(value) =>
              updateProps(`emitterConfig.behaviours.${index}.${key}`, value)
            }
          />
        ))}
      </div>
    </>
  );
}

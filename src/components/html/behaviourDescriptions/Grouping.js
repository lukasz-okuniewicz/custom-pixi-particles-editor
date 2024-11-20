import { useRef } from "react";

const GroupingDescription = () => {
  const contentRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleContent = () => {
    const isShowing = contentRef.current.classList.toggle("show");
    buttonRef.current.innerText = isShowing
      ? "Hide Description"
      : "Show Description";
  };

  return (
    <>
      <div className="showContent" onClick={toggleContent} ref={buttonRef}>
        Show Description
      </div>
      <span className="explanation" ref={contentRef}>
        <span>
          <b>Grouping Behaviour</b> is designed to manage and organize particles
          within a defined area, allowing them to interact dynamically through
          attraction, repulsion, and orbital movement. This behavior provides a
          cohesive and visually appealing particle group effect, with
          customizable parameters for creative flexibility.
        </span>
        Key Properties:
        <ul>
          <li>
            <b>Enabled</b>: Toggle the behavior on or off.
          </li>
          <li>
            <b>Priority</b>: Set execution order if multiple behaviors are
            applied.
          </li>
          <li>
            <b>Group Center</b>: Defines the central point of attraction for
            particles.
          </li>
          <li>
            <b>Group Radius</b>: Sets the interaction boundary for the group.
          </li>
          <li>
            <b>Attraction Strength</b>: Controls how strongly particles are
            pulled toward the center or cluster points.
          </li>
          <li>
            <b>Repulsion Strength</b>: Adjusts the force that keeps particles
            spaced apart.
          </li>
          <li>
            <b>Orbit Speed</b>: Adds rotational movement to particles within the
            group.
          </li>
          <li>
            <b>Randomness</b>: Introduces variations in particle paths for
            organic movement.
          </li>
          <li>
            <b>Boundary Enforcement</b>: Restricts particles from moving outside
            the group radius.
          </li>
          <li>
            <b>Dynamic Radius Speed</b>: Controls the speed of radius changes
            for expanding or contracting effects.
          </li>
          <li>
            <b>Cluster Points</b>: Allows additional attraction points for
            complex group dynamics.
          </li>
        </ul>
        <span>
          This feature is ideal for users who want to create organized yet
          dynamic particle groups, with rich customization options for a wide
          range of applications.
        </span>
        <span>
          <a href="/?effect=dynamicOrbitWithRepulsion" target="_blank">
            Dynamic Orbit With Repulsion
          </a>
          <br />
          <a href="/?effect=expandingAndCollapsingSwarm" target="_blank">
            Expanding And Collapsing Swarm
          </a>
          <br />
          <a href="/?effect=orbitingCluster" target="_blank">
            Orbiting Cluster
          </a>
          <br />
          <a href="/?effect=multiClusterSwarm" target="_blank">
            Multi Cluster Swarm
          </a>
        </span>
      </span>
    </>
  );
};

export default GroupingDescription;

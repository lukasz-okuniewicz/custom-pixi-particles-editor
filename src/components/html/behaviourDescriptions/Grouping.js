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
      <div className="explanation" ref={contentRef}>
        <span>
          <b>Grouping Behaviour</b> organizes particles into dynamic groups that
          interact with each other and external forces. This behaviour enables
          creating cohesive particle formations with customizable attraction,
          repulsion, and orbital dynamics.
        </span>
        <h4>Key Properties:</h4>
        <ul>
          <li>
            <b>Enabled</b>: Turns the grouping behaviour on or off.
          </li>
          <li>
            <b>Priority</b>: Defines the order in which the behaviour is applied
            relative to others.
          </li>
          <li>
            <b>Group Center</b>: The central point where particles are attracted
            or interact around.
          </li>
          <li>
            <b>Group Radius</b>: Specifies the maximum interaction boundary for
            the particle group.
          </li>
          <li>
            <b>Attraction Strength</b>: Determines the force pulling particles
            toward the group center or additional cluster points.
          </li>
          <li>
            <b>Repulsion Strength</b>: Adds a repelling force to keep particles
            spaced apart, avoiding overcrowding.
          </li>
          <li>
            <b>Orbit Speed</b>: Adds rotational movement to particles within the
            group for orbiting effects.
          </li>
          <li>
            <b>Randomness</b>: Introduces random variations in particle motion
            for more organic, natural movement.
          </li>
          <li>
            <b>Boundary Enforcement</b>: Restricts particles to stay within the
            defined group radius.
          </li>
          <li>
            <b>Dynamic Radius Speed</b>: Enables radius expansion or contraction
            over time, creating breathing or pulsating effects.
          </li>
          <li>
            <b>Max Radius</b>: Upper limit for the group radius when using
            dynamic radius (breathing effect).
          </li>
          <li>
            <b>Min Radius</b>: Lower limit for the group radius when using
            dynamic radius (breathing effect).
          </li>
          <li>
            <b>Cluster Points</b>: Additional attraction points (Point x/y per
            cluster). Use &quot;Select Position&quot; to set the group center
            by clicking on the canvas; add or remove cluster points for complex
            formations.
          </li>
        </ul>
        <h4>Advanced Features:</h4>
        <ul>
          <li>
            <b>Dynamic Radius Adjustment</b>: The group radius can expand and
            contract smoothly, adding a pulsating group effect.
          </li>
          <li>
            <b>Multiple Cluster Points</b>: Particles can be attracted to
            several points simultaneously, enabling intricate motion dynamics.
          </li>
          <li>
            <b>Orbiting Particles</b>: Particles can rotate around the group
            center or cluster points at customizable speeds.
          </li>
        </ul>
        <br />
        <p>
          With these settings, you can create particle systems ranging from
          stable clusters to dynamic, expanding, and collapsing swarms.
        </p>
        <h4>Live Examples:</h4>
        <p>Explore these examples to see the behaviour in action:</p>
        <ul>
          <li>
            <a href="/?effect=dynamicOrbitWithRepulsion" target="_blank">
              Dynamic Orbit With Repulsion
            </a>
          </li>
          <li>
            <a href="/?effect=expandingAndCollapsingSwarm" target="_blank">
              Expanding And Collapsing Swarm
            </a>
          </li>
          <li>
            <a href="/?effect=orbitingCluster" target="_blank">
              Orbiting Cluster
            </a>
          </li>
          <li>
            <a href="/?effect=multiClusterSwarm" target="_blank">
              Multi Cluster Swarm
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default GroupingDescription;

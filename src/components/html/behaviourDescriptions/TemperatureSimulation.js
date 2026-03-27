import { useRef } from "react";

const TemperatureSimulationDescription = () => {
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const toggleContent = () => {
    const isShowing = contentRef.current.classList.toggle("show");
    buttonRef.current.innerText = isShowing ? "Hide Description" : "Show Description";
  };

  return (
    <>
      <div className="showContent" onClick={toggleContent} ref={buttonRef}>
        Show Description
      </div>
      <div className="explanation" ref={contentRef}>
        <p>
          <b>Temperature Simulation</b> models buoyancy and cooling, so hotter
          particles rise and gradually lose lift.
        </p>
        <ul>
          <li><b>Base Temperature</b> sets initial heat.</li>
          <li><b>Cooling Rate</b> controls heat decay over life.</li>
          <li><b>Buoyancy Strength</b> controls upward force from heat.</li>
        </ul>
      </div>
    </>
  );
};

export default TemperatureSimulationDescription;

import { useRef } from "react";

const SlitScanEffectDescription = () => {
  const contentRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleContent = () => {
    const isShowing = contentRef.current.classList.toggle("show");
    buttonRef.current.innerText = isShowing ? "Hide Description" : "Show Description";
  };

  return (
    <>
      <div className="showContent" onClick={toggleContent} ref={buttonRef}>Show Description</div>
      <div className="explanation" ref={contentRef}>
        <p><b>Slit-Scan Effect</b> gives a temporal distortion: each row (or column) is offset by a phase that depends on position and time. <b>Wave</b> mode uses a sine-wave displacement; <b>slit-scan</b> mode makes each line sample a different “moment” for a smear/stretch look.</p>
        <h4>Parameters:</h4>
        <ul>
          <li><b>mode</b> — wave | slit-scan.</li>
          <li><b>speed</b> — Phase / row-offset speed.</li>
          <li><b>amplitude</b> — Wave displacement (pixels).</li>
          <li><b>frequency</b> — Rows per wave cycle.</li>
          <li><b>direction</b> — horizontal | vertical.</li>
          <li><b>duration</b> — Effect length (seconds).</li>
        </ul>
      </div>
    </>
  );
};

export default SlitScanEffectDescription;

import { useRef } from "react";

const PixelSortEffectDescription = () => {
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
        <p>
          <b>Pixel Sort Effect</b> creates a glitch-art style distortion by
          sorting pixels within each row (or column) by luminance, hue, or
          channel value. Only pixels in a configurable brightness range are
          sorted, producing stretchy bands of highlights or shadows. The effect
          animates from original to fully sorted over a set duration.
        </p>

        <h4>Key Features:</h4>
        <ul>
          <li>
            <b>Custom Sprite</b>: Use a custom sprite/image (upload or select a
            texture).
          </li>
          <li>
            <b>Sort Key</b>: Sort by luminance, hue, saturation, or single
            channel (R/G/B) for different looks.
          </li>
          <li>
            <b>Threshold Gating</b>: Only pixels whose key is between
            threshold low and high are sorted; others stay fixed.
          </li>
          <li>
            <b>Direction</b>: Horizontal (rows) or vertical (columns).
          </li>
          <li>
            <b>Animated Blend</b>: Smooth transition from original to sorted
            image over the duration.
          </li>
          <li>
            <b>Performance</b>: Optional row/column step to process every Nth
            line for heavier textures.
          </li>
        </ul>

        <h4>Adjustable Parameters:</h4>
        <ul>
          <li><b>Direction</b>: Horizontal or vertical.</li>
          <li><b>Sort Mode</b>: Luminance, hue, saturation, red, green, blue.</li>
          <li><b>Sort Order</b>: Ascending or descending.</li>
          <li><b>Threshold Low/High</b>: 0–1; only pixels in this range are sorted.</li>
          <li><b>Duration</b>: Time for the blend animation.</li>
          <li><b>Row Step</b>: Process every Nth row/column (1 = all).</li>
        </ul>

        <h4>All properties</h4>
        <ul>
          <li><b>direction</b> — horizontal | vertical.</li>
          <li><b>sortMode</b> — luminance | hue | saturation | red | green | blue.</li>
          <li><b>sortOrder</b> — ascending | descending.</li>
          <li><b>thresholdLow</b>, <b>thresholdHigh</b> — 0–1.</li>
          <li><b>duration</b> — blend duration in seconds.</li>
          <li><b>refreshRate</b> — unused (reserved).</li>
          <li><b>rowStep</b> — process every Nth line.</li>
          <li><b>customSprite</b> — optional custom texture.</li>
        </ul>

        <h4>Applications:</h4>
        <ul>
          <li>Glitch art and digital distortion.</li>
          <li>Transition or reveal effects.</li>
          <li>Cyberpunk / data-mosh aesthetics.</li>
        </ul>
      </div>
    </>
  );
};

export default PixelSortEffectDescription;

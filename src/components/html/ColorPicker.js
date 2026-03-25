import { SketchPicker } from "react-color";

const ColorPicker = ({ color, colorChanged, label, id, tooltipText }) => {
  return (
    <div className="form-group">
      <label className="col-xs-4 form-label" htmlFor={id}>
        {label}
      </label>
      <div className="col-xs-8">
        {tooltipText ? (
          <p id={id ? `${id}-hint` : undefined} className="editor-field-hint">
            {tooltipText}
          </p>
        ) : null}
        <SketchPicker color={color} onChangeComplete={colorChanged} />
      </div>
    </div>
  );
};

export default ColorPicker;

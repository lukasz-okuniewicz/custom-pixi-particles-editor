import { SketchPicker } from "react-color";

const ColorPicker = ({ color, colorChanged, label }) => {
  return (
    <div className="form-group">
      <label className="col-xs-4 form-label">{label}</label>
      <div className="col-xs-8">
        <SketchPicker color={color} onChangeComplete={colorChanged} />
      </div>
    </div>
  );
};

export default ColorPicker;

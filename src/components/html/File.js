"use client";

import PropTypes from "prop-types";
import { propertyHint } from "@components/properties/behaviourPropertyHints";

const File = ({ label, buttonText, onChange, onClick, id, ref }) => {
  const tooltipText = propertyHint(id);
  return (
    <div className={`form-group`}>
      <label className="col-xs-4 form-label" htmlFor={id}>
        {label}
      </label>
      <div className="col-xs-8">
        <button
          type="button"
          className={`btn btn-default btn-block`}
          onClick={onClick}
          aria-controls={id}
        >
          {buttonText}
        </button>

        <input
          type="file"
          id={id}
          className={`hidden`}
          onChange={onChange}
          multiple
          ref={ref}
        />
        {tooltipText ? <span className="tooltiptext">{tooltipText}</span> : null}
      </div>
    </div>
  );
};

File.propTypes = {
  label: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  inputClassName: PropTypes.string,
};

File.defaultProps = {
  buttonText: "Upload",
  className: "",
  buttonClassName: "",
  inputClassName: "",
};

export default File;

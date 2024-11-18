"use client";

import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const InputString = forwardRef(
  ({ label, onChange, value, id, inputHidden, tooltipText }, ref) => {
    return (
      <div className="form-group">
        <label className="col-xs-4 form-label" htmlFor={id}>
          {label}
        </label>
        <div className="col-xs-8">
          <input
            ref={ref}
            id={id}
            className={`form-control ${inputHidden ? "hidden" : ""}`}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-labelledby={id}
          />
          {tooltipText && <span className="tooltiptext">{tooltipText}</span>}
        </div>
      </div>
    );
  },
);

InputString.displayName = "InputString";

InputString.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

InputString.defaultProps = {
  tooltipText: "",
};

export default InputString;

import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const InputNumber = forwardRef(
  ({ label, onChange, value, id, step, tooltipText, params }, ref) => {
    const handleInputChange = (value, newValue) => {
      if (typeof onChange === "function") {
        onChange(newValue, value);
      }
    };

    const renderInput = (inputValue, index, value) => (
      <div className="col-xs-4" key={index}>
        <input
          className="form-control"
          type="number"
          id={`${id}-${index}`}
          step={step}
          value={inputValue}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!Number.isNaN(val)) {
              handleInputChange(value, val);
            } else {
              handleInputChange(value, e.target.value);
            }
          }}
          aria-label={params ? value : label}
        />
        {params && (
          <span className="tooltiptext" id={`${id}-tooltip-${index}`}>
            {value}
          </span>
        )}
      </div>
    );

    return (
      <div className="form-group">
        <label htmlFor={id} className="col-xs-4 form-label">
          {label}
        </label>
        {Array.isArray(params) && params.length > 0 ? (
          params.map((v, index) => renderInput(value[index], index, v))
        ) : (
          <div className="col-xs-8">
            <input
              ref={ref}
              id={id}
              className="form-control"
              type="number"
              step={step}
              value={value || 0}
              onChange={(e) =>
                handleInputChange(null, parseFloat(e.target.value) || 0)
              }
              aria-describedby={tooltipText ? `${id}-tooltip` : undefined}
            />
            {tooltipText && (
              <span className="tooltiptext" id={`${id}-tooltip`}>
                {tooltipText}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

InputNumber.displayName = "InputNumber";

InputNumber.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
  id: PropTypes.string.isRequired,
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tooltipText: PropTypes.string,
  params: PropTypes.arrayOf(PropTypes.string),
};

InputNumber.defaultProps = {
  step: "0.1",
  tooltipText: "",
  params: null,
};

export default InputNumber;

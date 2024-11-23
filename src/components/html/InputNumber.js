import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const InputNumber = forwardRef(
  (
    {
      label,
      onChange,
      value,
      id,
      step,
      tooltipText,
      params,
      max,
      min,
      className,
    },
    ref,
  ) => {
    const handleInputChange = (value, newValue) => {
      if (typeof onChange === "function") {
        onChange(newValue, value);
      }
    };

    const renderInput = (inputValue, index, value) => (
      <div className="col-xs-4" key={index}>
        <input
          className={"form-control " + (inputValue !== 0 ? className : "")}
          type="number"
          id={`${id}-${index}`}
          step={step}
          min={min}
          max={max}
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
              className={
                "form-control " + (parseFloat(value) !== 0 ? className : "")
              }
              type="number"
              step={step}
              min={min}
              max={max}
              value={value}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (!Number.isNaN(val)) {
                  handleInputChange(null, val);
                } else {
                  handleInputChange(null, e.target.value);
                }
              }}
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
  max: PropTypes.number,
  min: PropTypes.number,
};

InputNumber.defaultProps = {
  step: "0.1",
  tooltipText: "",
  params: null,
  max: undefined,
  min: undefined,
};

export default InputNumber;

import React, { forwardRef } from "react";
import PropTypes from "prop-types";

function getNumericIssue(rawValue, min, max) {
  if (rawValue === "" || rawValue === null || rawValue === undefined) {
    return "Value is required.";
  }
  const n = Number(rawValue);
  if (Number.isNaN(n)) return "Enter a valid number.";
  if (typeof min === "number" && n < min) return `Must be at least ${min}.`;
  if (typeof max === "number" && n > max) return `Must be at most ${max}.`;
  return "";
}

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
    const baseFieldClassName = className ? `form-control ${className}` : "form-control";
    const handleInputChange = (value, newValue) => {
      if (typeof onChange === "function") {
        onChange(newValue, value);
      }
    };

    const renderInput = (inputValue, index, paramKey) => (
      <div className="editor-input-number-param" key={index}>
        <span className="editor-input-number-param-key">{paramKey}</span>
        {(() => {
          const issue = getNumericIssue(inputValue, min, max);
          const invalid = Boolean(issue);
          const inputId = `${id}-${index}`;
          const issueId = `${inputId}-issue`;
          return (
        <input
          className={`${baseFieldClassName}${invalid ? " editor-input-invalid" : ""}`}
          type="number"
          id={inputId}
          step={step}
          min={min}
          max={max}
          value={inputValue}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!Number.isNaN(val)) {
              handleInputChange(paramKey, val);
            } else {
              handleInputChange(paramKey, e.target.value);
            }
          }}
          aria-label={params ? `${label} (${paramKey})` : label}
          aria-invalid={invalid}
          aria-describedby={
            [tooltipText && params ? `${id}-tooltip` : null, invalid ? issueId : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
        />
          );
        })()}
      </div>
    );

    return (
      <div className="form-group">
        <label htmlFor={id} className="col-xs-4 form-label">
          {label}
        </label>
        {Array.isArray(params) && params.length > 0 ? (
          <div className="col-xs-8" style={{ position: "relative" }}>
            <div className="editor-input-number-params">
              {params.map((v, index) => renderInput(value[index], index, v))}
            </div>
            {tooltipText ? (
              <span className="tooltiptext" id={`${id}-tooltip`}>
                {tooltipText}
              </span>
            ) : null}
          </div>
        ) : (
          <div className="col-xs-8">
            {(() => {
              const issue = getNumericIssue(value, min, max);
              const invalid = Boolean(issue);
              const issueId = `${id}-issue`;
              return (
                <>
            <input
              ref={ref}
              id={id}
              className={`${baseFieldClassName}${invalid ? " editor-input-invalid" : ""}`}
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
              aria-invalid={invalid}
              aria-describedby={
                [tooltipText ? `${id}-tooltip` : null, invalid ? issueId : null]
                  .filter(Boolean)
                  .join(" ") || undefined
              }
              inputMode="decimal"
            />
            {invalid ? (
              <span className="editor-input-issue" id={issueId} role="alert">
                {issue}
              </span>
            ) : null}
            {tooltipText && (
              <span className="tooltiptext" id={`${id}-tooltip`}>
                {tooltipText}
              </span>
            )}
                </>
              );
            })()}
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

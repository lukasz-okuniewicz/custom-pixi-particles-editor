"use client";

import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const InputString = forwardRef(
  (
    {
      label,
      onChange,
      value,
      id,
      inputHidden,
      tooltipText,
      onBlur,
      onKeyDown,
      required,
      minLength,
    },
    ref,
  ) => {
    const isEmpty = String(value ?? "").trim().length === 0;
    const tooShort =
      typeof minLength === "number" && String(value ?? "").length < minLength;
    const issue = required && isEmpty
      ? "Value is required."
      : tooShort
        ? `Use at least ${minLength} characters.`
        : "";
    const invalid = Boolean(issue);
    const issueId = `${id}-issue`;
    return (
      <div className="form-group">
        <label className="col-xs-4 form-label" htmlFor={id}>
          {label}
        </label>
        <div className="col-xs-8">
          <input
            ref={ref}
            id={id}
            className={`form-control ${inputHidden ? "hidden" : ""}${invalid ? " editor-input-invalid" : ""}`}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            aria-label={label}
            aria-invalid={invalid}
            aria-describedby={
              [tooltipText ? `${id}-tooltip` : null, invalid ? issueId : null]
                .filter(Boolean)
                .join(" ") || undefined
            }
          />
          {invalid ? (
            <span className="editor-input-issue" id={issueId} role="alert">
              {issue}
            </span>
          ) : null}
          {tooltipText && <span className="tooltiptext" id={`${id}-tooltip`}>{tooltipText}</span>}
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
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  required: PropTypes.bool,
  minLength: PropTypes.number,
};

InputString.defaultProps = {
  tooltipText: "",
  required: false,
  minLength: undefined,
};

export default InputString;

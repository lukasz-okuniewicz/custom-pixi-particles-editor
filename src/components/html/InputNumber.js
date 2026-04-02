import React, {
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";

/** Display string for a prop that may be number or string from config. */
function formatPropToDisplayString(v) {
  if (v === null || v === undefined) return "";
  if (typeof v === "number") {
    if (Number.isNaN(v)) return "";
    return String(v);
  }
  return String(v);
}

/**
 * True while the user is still typing a valid prefix (e.g. "-", ".", "5.") that must not be
 * coerced to a number yet. `type="number"` drops these as invalid; we use text + draft state instead.
 */
function isIncompleteNumericString(s) {
  const t = String(s).trim();
  if (t === "") return false;
  if (/^[+-]?(\.)?$/.test(t)) return true;
  if (/^[+-]?\d+\.$/.test(t)) return true;
  return false;
}

function getNumericIssue(rawValue, min, max) {
  if (isIncompleteNumericString(rawValue)) return "";
  const s = rawValue === null || rawValue === undefined ? "" : String(rawValue).trim();
  if (s === "") {
    return "Value is required.";
  }
  const n = Number(s);
  if (Number.isNaN(n)) return "Enter a valid number.";
  if (typeof min === "number" && n < min) return `Must be at least ${min}.`;
  if (typeof max === "number" && n > max) return `Must be at most ${max}.`;
  return "";
}

const NumericField = forwardRef(function NumericField(
  {
    id,
    className,
    inputValue,
    paramKey,
    onCommit,
    min,
    max,
    ariaLabel,
    tooltipId,
    issueId,
  },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState(() => formatPropToDisplayString(inputValue));

  useEffect(() => {
    if (!focused) {
      setDraft(formatPropToDisplayString(inputValue));
    }
  }, [inputValue, focused]);

  const display = focused ? draft : formatPropToDisplayString(inputValue);
  const issue = getNumericIssue(display, min, max);
  const invalid = Boolean(issue);

  const tryEmitNumber = useCallback(
    (raw) => {
      if (raw === "" || isIncompleteNumericString(raw)) return;
      const n = parseFloat(raw);
      if (!Number.isNaN(n)) {
        onCommit(paramKey, n);
      }
    },
    [onCommit, paramKey],
  );

  const describedBy = [tooltipId, invalid ? issueId : null].filter(Boolean).join(" ") || undefined;

  return (
    <>
      <input
        ref={ref}
        className={`${className}${invalid ? " editor-input-invalid" : ""}`}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        id={id}
        value={display}
        onFocus={() => setFocused(true)}
        onChange={(e) => {
          const raw = e.target.value;
          setDraft(raw);
          tryEmitNumber(raw);
        }}
        onBlur={(e) => {
          setFocused(false);
          const raw = e.target.value;
          if (raw === "" || isIncompleteNumericString(raw)) {
            setDraft(formatPropToDisplayString(inputValue));
            return;
          }
          const n = parseFloat(raw);
          if (!Number.isNaN(n)) {
            onCommit(paramKey, n);
            setDraft(formatPropToDisplayString(n));
          } else {
            setDraft(formatPropToDisplayString(inputValue));
          }
        }}
        aria-label={ariaLabel}
        aria-invalid={invalid}
        aria-describedby={describedBy}
      />
      {invalid ? (
        <span className="editor-input-issue" id={issueId} role="alert">
          {issue}
        </span>
      ) : null}
    </>
  );
});

NumericField.displayName = "NumericField";

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
    const handleCommit = useCallback(
      (paramKey, newValue) => {
        if (typeof onChange === "function") {
          onChange(newValue, paramKey);
        }
      },
      [onChange],
    );

    const renderInput = (inputValue, index, paramKey) => {
      const inputId = `${id}-${index}`;
      const issueId = `${inputId}-issue`;
      return (
        <div className="editor-input-number-param" key={index}>
          <span className="editor-input-number-param-key">{paramKey}</span>
          <NumericField
            id={inputId}
            className={baseFieldClassName}
            inputValue={inputValue}
            paramKey={paramKey}
            onCommit={handleCommit}
            min={min}
            max={max}
            ariaLabel={params ? `${label} (${paramKey})` : label}
            tooltipId={tooltipText && params ? `${id}-tooltip` : undefined}
            issueId={issueId}
          />
        </div>
      );
    };

    return (
      <div className="form-group">
        <label htmlFor={id} className="col-xs-4 form-label">
          {label}
        </label>
        {Array.isArray(params) && params.length > 0 ? (
          <div className="col-xs-8" style={{ position: "relative" }}>
            <div className="editor-input-number-params">
              {params.map((v, index) => renderInput(value?.[index], index, v))}
            </div>
            {tooltipText ? (
              <span className="tooltiptext" id={`${id}-tooltip`}>
                {tooltipText}
              </span>
            ) : null}
          </div>
        ) : (
          <div className="col-xs-8">
            <NumericField
              ref={ref}
              id={id}
              className={baseFieldClassName}
              inputValue={value}
              paramKey={null}
              onCommit={handleCommit}
              min={min}
              max={max}
              ariaLabel={label}
              tooltipId={tooltipText ? `${id}-tooltip` : undefined}
              issueId={`${id}-issue`}
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

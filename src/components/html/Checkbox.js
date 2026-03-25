"use client";

import PropTypes from "prop-types";

const Checkbox = ({ label, onChange, checked, id, tooltipText }) => {
  return (
    <div className={`form-group`}>
      <label className="col-xs-4 form-label" htmlFor={id}>
        {label}
      </label>
      <div className="col-xs-8">
        <div className="editor-checkbox-row">
          <input
            type="checkbox"
            id={id}
            className="editor-checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            aria-checked={checked}
            aria-describedby={tooltipText ? `${id}-tooltip` : undefined}
          />
          <span className="editor-checkbox-state">{checked ? "On" : "Off"}</span>
        </div>
        {tooltipText && (
          <span className="tooltiptext" id={`${id}-tooltip`}>
            {tooltipText}
          </span>
        )}
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  id: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
};

Checkbox.defaultProps = {
  onChange: () => {},
  checked: false,
  tooltipText: "",
};

export default Checkbox;

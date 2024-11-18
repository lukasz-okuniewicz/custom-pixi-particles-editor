"use client";

import PropTypes from "prop-types";

const Select = ({ label, onChange, defaultValue, elements, tooltipText }) => {
  return (
    <div className="form-group">
      <label className="col-xs-4 form-label" htmlFor={label}>
        {label}
      </label>
      <div className="col-xs-8">
        <select
          id={label}
          className="form-control"
          value={defaultValue}
          onChange={(e) => onChange(e.target.value)}
          disabled={!elements || elements.length === 0} // Disable if no elements
        >
          {elements && elements.length > 0 ? (
            elements.map(({ key, displayName, value }) => (
              <option
                key={key}
                value={typeof value === "undefined" ? key : value}
              >
                {displayName}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No options available
            </option>
          )}
        </select>
        {tooltipText && <span className="tooltiptext">{tooltipText}</span>}
      </div>
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      displayName: PropTypes.string.isRequired,
    }),
  ),
};

Select.defaultProps = {
  defaultValue: "",
  tooltipText: "",
  elements: [],
};

export default Select;

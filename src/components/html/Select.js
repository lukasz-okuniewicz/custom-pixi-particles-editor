"use client";

import PropTypes from "prop-types";

const optionShape = PropTypes.shape({
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  displayName: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

const Select = ({
  label,
  onChange,
  defaultValue,
  elements,
  groups,
  tooltipText,
  id,
}) => {
  const selectId = id || `select-${String(label).replace(/\s+/g, "-").toLowerCase()}`;
  const hasGroups = groups && groups.length > 0;
  const hasElements = elements && elements.length > 0;
  const totalOptions = hasGroups
    ? groups.reduce((sum, g) => sum + (g.options?.length || 0), 0)
    : (hasElements ? elements.length : 0);
  const disabled = totalOptions === 0;

  const renderOptions = () => {
    if (hasGroups) {
      return groups.map((group, groupIndex) => (
        <optgroup key={groupIndex} label={group.label}>
          {(group.options || []).map(({ key, displayName, value }) => (
            <option
              key={key}
              value={typeof value === "undefined" ? key : value}
            >
              {displayName}
            </option>
          ))}
        </optgroup>
      ));
    }
    if (hasElements) {
      return elements.map(({ key, displayName, value }) => (
        <option
          key={key}
          value={typeof value === "undefined" ? key : value}
        >
          {displayName}
        </option>
      ));
    }
    return (
      <option value="" disabled>
        No options available
      </option>
    );
  };

  return (
    <div className="form-group">
      <label className="col-xs-4 form-label" htmlFor={selectId}>
        {label}
      </label>
      <div className="col-xs-8">
        <select
          id={selectId}
          className="form-control"
          value={defaultValue}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-label={label}
          aria-describedby={tooltipText ? `${selectId}-tooltip` : undefined}
        >
          {renderOptions()}
        </select>
        {tooltipText && <span className="tooltiptext" id={`${selectId}-tooltip`}>{tooltipText}</span>}
      </div>
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  elements: PropTypes.arrayOf(optionShape),
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(optionShape),
    }),
  ),
  id: PropTypes.string,
};

Select.defaultProps = {
  defaultValue: "",
  tooltipText: "",
  elements: [],
  groups: [],
};

export default Select;

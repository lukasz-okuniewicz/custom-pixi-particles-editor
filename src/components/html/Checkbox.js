"use client";

import PropTypes from "prop-types";

const Checkbox = ({ label, onChange, checked, id }) => {
  return (
    <div className={`form-group`}>
      <label className="col-xs-4 form-label" htmlFor={id}>
        {label}
      </label>
      <div className="col-xs-8">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-checked={checked}
        />
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

Checkbox.defaultProps = {
  onChange: () => {},
  checked: false,
};

export default Checkbox;

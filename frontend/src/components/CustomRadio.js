import React from "react";

const CustomRadio = ({ label, value, checked, onChange }) => {
  return (
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="answer"
        value={value}
        checked={checked}
        onChange={onChange}
        required
        id={label}
      />
      <label class="form-check-label" for={label}>
        {label}
      </label>
    </div>
  );
};

export default CustomRadio;

import React from "react";

const CustomInput = ({ type = "text", name, placeholder, value, onChange }) => {
  return (
    <div className="col-12 col-md-6 mb-3">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="form-control"
      />
    </div>
  );
};

export default CustomInput;

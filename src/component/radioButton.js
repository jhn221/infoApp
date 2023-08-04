import React from 'react';

const RadioButton = ({ label, checked, onChange }) => {
  return (
    <label>
      <input type="radio" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};

export default RadioButton;

import React, { useState, useEffect } from "react";
import Select from "react-select";

const Controls = ({ onSortChange }) => {
  const fieldOptions = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company.name" },
    { label: "Email", value: "email" },
  ];
  const directionOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  const [selectedField, setSelectedField] = useState(fieldOptions[0]);
  const [selectedDirection, setSelectedDirection] = useState(directionOptions[0]);
  
    // Handle sorting when the field or direction changes
  const handleSortChange = () => {
    onSortChange(selectedField.value, selectedDirection.value);
  };

  // Automatically trigger sorting when the field changes
  const handleFieldChange = (selectedOption) => {
    setSelectedField(selectedOption);
    onSortChange(selectedOption.value, selectedDirection.value);
  };

 // Automatically trigger sorting when the direction changes
 const handleDirectionChange = (selectedOption) => {
  setSelectedDirection(selectedOption);
  onSortChange(selectedField.value, selectedOption.value);
};
  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select
          options={fieldOptions}
          inputId="sort-field"
          className="input"
          value={selectedField}
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          options={directionOptions}
          inputId="sort-direction"
          className="input"
          value={selectedDirection}
          onChange={handleDirectionChange}
        />
      </div>
    </div>
  );
};

export default Controls;

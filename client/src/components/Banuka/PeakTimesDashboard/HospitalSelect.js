import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const HospitalSelect = ({ hospitals, onHospitalChange }) => {
  const [selectedHospital, setSelectedHospital] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedHospital(selectedOption);
    onHospitalChange(selectedOption.value);
  };

  return (
    <Select
      options={hospitals}
      onChange={handleChange}
      placeholder="Select Hospital"
    />
  );
};

export default HospitalSelect;

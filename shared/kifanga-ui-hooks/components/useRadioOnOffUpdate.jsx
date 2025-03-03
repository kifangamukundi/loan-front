// Investigate the error caused when we use the useRadioUpdate
// Was kind of fixed with change on handlechange but don't know why that works
import { useState, useEffect } from 'react';
import { DashboardRadioGroup } from 'kifanga-ui-nav';

const useRadioOnOffUpdate = (label, name, options, preSelectedId, setFormData) => {
  const [selectedId, setSelectedId] = useState(preSelectedId);

  useEffect(() => {
    setSelectedId(preSelectedId);
  }, [preSelectedId]);


  const handleChange = (value) => {
  
    setSelectedId(value);
  
    if (setFormData) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const radios = (
    <DashboardRadioGroup
      label={label}
      name={name}
      options={options.map((option) => ({
        value: option.id,
        label: option.title,
      }))}
      value={selectedId}
      onChange={handleChange}
    />
  );

  return [radios, selectedId];
};

export default useRadioOnOffUpdate;
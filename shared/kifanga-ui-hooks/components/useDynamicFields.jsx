import { useState } from 'react';

function useDynamicFields(initialFields = [], fieldNames = [], initialFieldStructure = {}) {
  const [fields, setFields] = useState(initialFields);

  const handleChange = (index, fieldKey, value) => {
    const updatedFields = [...fields];
    updatedFields[index][fieldKey] = value;
    setFields(updatedFields);
  };

  const addField = (maxFields) => {
    if (fields.length < maxFields) {
      const newField = { ...initialFieldStructure };
      setFields([...fields, newField]);
    }
  };
  

  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const clearAllFields = () => {
    setFields([]);
  };

  return { fields, handleChange, addField, removeField, clearAllFields };
}

export default useDynamicFields;
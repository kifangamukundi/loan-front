import { useEffect, useState } from 'react';
import { DashboardCheckboxGroupExtended } from 'kifanga-ui-nav';

const useCheckboxExtendedUpdate = (options, perRow, label, name, handleDelete, handleEdit, handleAdd, preSelectedIds = []) => {
  const [checkedItems, setCheckedItems] = useState(preSelectedIds);

  useEffect(() => {
    setCheckedItems(preSelectedIds);
  }, [preSelectedIds]);

  const checkboxes = (
    <DashboardCheckboxGroupExtended
      label={label}
      name={name}
      options={options.map(option => ({
        value: option.id,
        label: option.title,
      }))}
      selectedValues={checkedItems}
      onChange={(newValues) => setCheckedItems(newValues)} 
      checkboxesPerLine={perRow}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handleAdd={handleAdd}
    />
  );

  const selectedIds = checkedItems;

  return [selectedIds, checkboxes];
};

export default useCheckboxExtendedUpdate;
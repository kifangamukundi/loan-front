import { useState } from 'react';
import { DashboardCheckboxGroup } from 'kifanga-ui-nav';

const useCheckbox = (options, perRow, label, name, preSelectedIds = []) => {
  const [checkedItems, setCheckedItems] = useState(preSelectedIds);

  const checkboxes = (
    <DashboardCheckboxGroup
      label={label}
      name={name}
      options={options.map(option => ({
        value: option.id,
        label: option.title,
      }))}
      selectedValues={checkedItems}
      onChange={(newValues) => setCheckedItems(newValues)} 
      checkboxesPerLine={perRow}
    />
  );

  const selectedIds = checkedItems;

  return [selectedIds, checkboxes];
};

export default useCheckbox;
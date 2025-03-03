import { useState, useEffect } from 'react';
import { DashboardRadioGroup } from 'kifanga-ui-nav';

const useRadioUpdate = (options, perRow, label, name, preSelectedId) => {
  const [selectedId, setSelectedId] = useState(preSelectedId);

  useEffect(() => {
    setSelectedId(preSelectedId);
  }, [preSelectedId]);

  const radios = (
    <DashboardRadioGroup
      label={label}
      name={name}
      options={options.map((option) => ({
        value: option.id,
        label: option.title,
      }))}
      value={selectedId}
      onChange={(newValues) => setSelectedId(newValues)}
      radiosPerLine={perRow}
    />
  );

  return [radios, selectedId];
};

export default useRadioUpdate;
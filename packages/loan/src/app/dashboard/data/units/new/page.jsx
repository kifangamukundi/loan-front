'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCreateResource, useFetchResource, useRadio } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewUnit() {
  const [formData, setFormData] = useState({
    unitName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [plots, setPlots] = useState([]);
  const { data: dataFetchedPlots } = useFetchResource(BASE_URL, 'plots/all');

  useEffect(() => {
    if (dataFetchedPlots.success) {
      setPlots(dataFetchedPlots.data.item);
    }
  }, [dataFetchedPlots]);

  const [radios, selectedId] = useRadio(plots, 3, 'Plot', 'plot');

  const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'units/create');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResource = {
      UnitName: formData.unitName,
      PlotID: selectedId,
    };
    await createResource(newResource, '/dashboard/data/units');
  };

  const router = useRouter();
  
  const handleGoBack = () => {
    router.back();
  };

  return (
    <DashboardContainerWrapper>
      <DashboardHeading title="New Unit" />
      <DashboardFormWrapper>
        <DashboardInputWrapper>
          <DashboardInput
            label="Unit Name"
            name="unitName"
            value={formData.unitName}
            onChange={handleChange}
            placeholder="Nairobi Unit"
            width="md:w-1/2"
            error={dataCreated.error?.UnitName}
          />
        </DashboardInputWrapper>
        {!dataFetchedPlots.loading && !dataFetchedPlots.error && (
          <div className="grid gap-4">
            {radios}
          </div>
        )}
        <DashboardButtonGroup 
          onSubmit={handleSubmit} 
          onGoBack={handleGoBack} 
          loading={dataCreated.loading}
        />
      </DashboardFormWrapper>
    </DashboardContainerWrapper>
  );
}
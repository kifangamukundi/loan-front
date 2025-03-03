'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCreateResource, useFetchResource, useRadio } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewPlot() {
  const [formData, setFormData] = useState({
    plotName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [roads, setRoads] = useState([]);
  const { data: dataFetchedRoads } = useFetchResource(BASE_URL, 'roads/all');

  useEffect(() => {
    if (dataFetchedRoads.success) {
      setRoads(dataFetchedRoads.data.item);
    }
  }, [dataFetchedRoads]);

  const [radios, selectedId] = useRadio(roads, 3, 'Road', 'road');

  const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'plots/create');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResource = {
      PlotName: formData.plotName,
      RoadID: selectedId,
    };
    await createResource(newResource, '/dashboard/data/plots');
  };

  const router = useRouter();
  
  const handleGoBack = () => {
    router.back();
  };

  return (
    <DashboardContainerWrapper>
      <DashboardHeading title="New Plot" />
      <DashboardFormWrapper>
        <DashboardInputWrapper>
          <DashboardInput
            label="Plot Name"
            name="plotName"
            value={formData.plotName}
            onChange={handleChange}
            placeholder="Nairobi Plot"
            width="md:w-1/2"
            error={dataCreated.error?.PlotName}
          />
        </DashboardInputWrapper>
        {!dataFetchedRoads.loading && !dataFetchedRoads.error && (
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
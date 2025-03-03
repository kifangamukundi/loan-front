'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCreateResource, useFetchResource, useRadio } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewRoad() {
  const [formData, setFormData] = useState({
    roadName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [villages, setVillages] = useState([]);
  const { data: dataFetchedVillages } = useFetchResource(BASE_URL, 'villages/all');

  useEffect(() => {
    if (dataFetchedVillages.success) {
      setVillages(dataFetchedVillages.data.item);
    }
  }, [dataFetchedVillages]);

  const [radios, selectedId] = useRadio(villages, 3, 'Village', 'village');

  const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'roads/create');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResource = {
      RoadName: formData.roadName,
      VillageID: selectedId,
    };
    await createResource(newResource, '/dashboard/data/roads');
  };

  const router = useRouter();
  
  const handleGoBack = () => {
    router.back();
  };

  return (
    <DashboardContainerWrapper>
      <DashboardHeading title="New Road" />
      <DashboardFormWrapper>
        <DashboardInputWrapper>
          <DashboardInput
            label="Road Name"
            name="roadName"
            value={formData.roadName}
            onChange={handleChange}
            placeholder="Nairobi Road"
            width="md:w-1/2"
            error={dataCreated.error?.RoadName}
          />
        </DashboardInputWrapper>
        {!dataFetchedVillages.loading && !dataFetchedVillages.error && (
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
'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCreateResource, useFetchResource, useRadio } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewVillage() {
  const [formData, setFormData] = useState({
    villageName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [sublocations, setSubLocations] = useState([]);
  const { data: dataFetchedSubLocations } = useFetchResource(BASE_URL, 'sublocations/all');

  useEffect(() => {
    if (dataFetchedSubLocations.success) {
      setSubLocations(dataFetchedSubLocations.data.item);
    }
  }, [dataFetchedSubLocations]);

  const [radios, selectedId] = useRadio(sublocations, 3, 'SubLocation', 'sublocation');

  const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'villages/create');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResource = {
      VillageName: formData.villageName,
      SubLocationID: selectedId,
    };
    await createResource(newResource, '/dashboard/data/villages');
  };

  const router = useRouter();
  
  const handleGoBack = () => {
    router.back();
  };

  return (
    <DashboardContainerWrapper>
      <DashboardHeading title="New Village" />
      <DashboardFormWrapper>
        <DashboardInputWrapper>
          <DashboardInput
            label="Village Name"
            name="villageName"
            value={formData.villageName}
            onChange={handleChange}
            placeholder="Nairobi Village"
            width="md:w-1/2"
            error={dataCreated.error?.VillageName}
          />
        </DashboardInputWrapper>
        {!dataFetchedSubLocations.loading && !dataFetchedSubLocations.error && (
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
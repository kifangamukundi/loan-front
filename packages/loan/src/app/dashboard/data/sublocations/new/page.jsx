'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCreateResource, useFetchResource, useRadio } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewSubLocation() {
  const [formData, setFormData] = useState({
    subLocationName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [locations, setLocations] = useState([]);
  const { data: dataFetchedLocations } = useFetchResource(BASE_URL, 'locations/all');

  useEffect(() => {
    if (dataFetchedLocations.success) {
      setLocations(dataFetchedLocations.data.item);
    }
  }, [dataFetchedLocations]);

  const [radios, selectedId] = useRadio(locations, 3, 'Location', 'location');

  const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'sublocations/create');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResource = {
      SubLocationName: formData.subLocationName,
      LocationID: selectedId,
    };
    await createResource(newResource, '/dashboard/data/sublocations');
  };

  const router = useRouter();
  
  const handleGoBack = () => {
    router.back();
  };

  return (
    <DashboardContainerWrapper>
      <DashboardHeading title="New SubLocation" />
      <DashboardFormWrapper>
        <DashboardInputWrapper>
          <DashboardInput
            label="SubLocation Name"
            name="subLocationName"
            value={formData.subLocationName}
            onChange={handleChange}
            placeholder="Nairobi SubLocation"
            width="md:w-1/2"
            error={dataCreated.error?.SubLocationName}
          />
        </DashboardInputWrapper>
        {!dataFetchedLocations.loading && !dataFetchedLocations.error && (
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
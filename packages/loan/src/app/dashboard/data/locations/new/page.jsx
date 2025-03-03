'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCreateResource, useFetchResource, useRadio } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewLocation() {
  const [formData, setFormData] = useState({
    locationName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [wards, setWards] = useState([]);
  const { data: dataFetchedWards } = useFetchResource(BASE_URL, 'wards/all');

  useEffect(() => {
    if (dataFetchedWards.success) {
      setWards(dataFetchedWards.data.item);
    }
  }, [dataFetchedWards]);

  const [radios, selectedId] = useRadio(wards, 3, 'Ward', 'ward');

  const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'locations/create');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResource = {
      LocationName: formData.locationName,
      WardID: selectedId,
    };
    await createResource(newResource, '/dashboard/data/locations');
  };

  const router = useRouter();
  
  const handleGoBack = () => {
    router.back();
  };

  return (
    <DashboardContainerWrapper>
      <DashboardHeading title="New Location" />
      <DashboardFormWrapper>
        <DashboardInputWrapper>
          <DashboardInput
            label="Location Name"
            name="locationName"
            value={formData.locationName}
            onChange={handleChange}
            placeholder="Nairobi Location"
            width="md:w-1/2"
            error={dataCreated.error?.LocationName}
          />
        </DashboardInputWrapper>
        {!dataFetchedWards.loading && !dataFetchedWards.error && (
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
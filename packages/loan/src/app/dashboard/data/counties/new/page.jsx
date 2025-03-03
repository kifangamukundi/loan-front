'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCreateResource, useFetchResource, useRadio } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewCounty() {
  const [formData, setFormData] = useState({
    countyName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [regions, setRegions] = useState([]);
  const { data: dataFetchedRegions } = useFetchResource(BASE_URL, 'regions/all');

  useEffect(() => {
    if (dataFetchedRegions.success) {
      setRegions(dataFetchedRegions.data.item);
    }
  }, [dataFetchedRegions]);

  const [radios, selectedId] = useRadio(regions, 3, 'Region', 'region');

  const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'counties/create');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResource = {
      CountyName: formData.countyName,
      RegionID: selectedId,
    };
    await createResource(newResource, '/dashboard/data/counties');
  };

  const router = useRouter();
  
  const handleGoBack = () => {
    router.back();
  };

  return (
    <DashboardContainerWrapper>
      <DashboardHeading title="New County" />
      <DashboardFormWrapper>
        <DashboardInputWrapper>
          <DashboardInput
            label="County Name"
            name="countyName"
            value={formData.countyName}
            onChange={handleChange}
            placeholder="Nairobi County"
            width="md:w-1/2"
            error={dataCreated.error?.CountyName}
          />
        </DashboardInputWrapper>
        {!dataFetchedRegions.loading && !dataFetchedRegions.error && (
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
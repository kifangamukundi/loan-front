'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCreateResource, useFetchResource, useRadio } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewRegion() {
  const [formData, setFormData] = useState({
    regionName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [countries, setCountries] = useState([]);
  const { data: dataFetchedCountries } = useFetchResource(BASE_URL, 'countries/all');

  useEffect(() => {
    if (dataFetchedCountries.success) {
      setCountries(dataFetchedCountries.data.item);
    }
  }, [dataFetchedCountries]);

  const [radios, selectedId] = useRadio(countries, 3, 'Country', 'country');

  const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'regions/create');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResource = {
      RegionName: formData.regionName,
      CountryID: selectedId,
    };
    await createResource(newResource, '/dashboard/data/regions');
  };

  const router = useRouter();
  
  const handleGoBack = () => {
    router.back();
  };

  return (
    <DashboardContainerWrapper>
      <DashboardHeading title="New Region" />
      <DashboardFormWrapper>
        <DashboardInputWrapper>
          <DashboardInput
            label="Region Name"
            name="regionName"
            value={formData.regionName}
            onChange={handleChange}
            placeholder="Nairobi Region"
            width="md:w-1/2"
            error={dataCreated.error?.RegionName}
          />
        </DashboardInputWrapper>
        {!dataFetchedCountries.loading && !dataFetchedCountries.error && (
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
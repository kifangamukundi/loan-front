'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCreateResource, useFetchResource, useRadio } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewSubCounty() {
  const [formData, setFormData] = useState({
    subCountyName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [counties, setCounties] = useState([]);
  const { data: dataFetchedCounties } = useFetchResource(BASE_URL, 'counties/all');

  useEffect(() => {
    if (dataFetchedCounties.success) {
      setCounties(dataFetchedCounties.data.item);
    }
  }, [dataFetchedCounties]);

  const [radios, selectedId] = useRadio(counties, 3, 'County', 'county');

  const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'subcounties/create');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResource = {
      SubCountyName: formData.subCountyName,
      CountyID: selectedId,
    };
    await createResource(newResource, '/dashboard/data/subcounties');
  };

  const router = useRouter();
  
  const handleGoBack = () => {
    router.back();
  };

  return (
    <DashboardContainerWrapper>
      <DashboardHeading title="New SubCounty" />
      <DashboardFormWrapper>
        <DashboardInputWrapper>
          <DashboardInput
            label="SubCounty Name"
            name="subCountyName"
            value={formData.subCountyName}
            onChange={handleChange}
            placeholder="Nairobi SubCounty"
            width="md:w-1/2"
            error={dataCreated.error?.SubCountyName}
          />
        </DashboardInputWrapper>
        {!dataFetchedCounties.loading && !dataFetchedCounties.error && (
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
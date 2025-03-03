'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCreateResource, useFetchResource, useRadio } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewWard() {
  const [formData, setFormData] = useState({
    wardName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [subcounties, setSubCounties] = useState([]);
  const { data: dataFetchedSubCounties } = useFetchResource(BASE_URL, 'subcounties/all');

  useEffect(() => {
    if (dataFetchedSubCounties.success) {
      setSubCounties(dataFetchedSubCounties.data.item);
    }
  }, [dataFetchedSubCounties]);

  const [radios, selectedId] = useRadio(subcounties, 3, 'SubCounty', 'subcounty');

  const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'wards/create');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResource = {
      WardName: formData.wardName,
      SubCountyID: selectedId,
    };
    await createResource(newResource, '/dashboard/data/wards');
  };

  const router = useRouter();
  
  const handleGoBack = () => {
    router.back();
  };

  return (
    <DashboardContainerWrapper>
      <DashboardHeading title="New Ward" />
      <DashboardFormWrapper>
        <DashboardInputWrapper>
          <DashboardInput
            label="Ward Name"
            name="wardName"
            value={formData.wardName}
            onChange={handleChange}
            placeholder="Nairobi Ward"
            width="md:w-1/2"
            error={dataCreated.error?.WardName}
          />
        </DashboardInputWrapper>
        {!dataFetchedSubCounties.loading && !dataFetchedSubCounties.error && (
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
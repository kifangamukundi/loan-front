'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import {
  useRadioOnOffUpdate,
  useResourceSingle,
  useResourceUpdate
} from 'kifanga-ui-hooks';
import {
  DashboardButtonGroup,
  DashboardContainerWrapper,
  DashboardFormWrapper,
  DashboardHeading,
  DashboardInput,
  DashboardInputWrapper
} from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function EditAgent() {
  const { id } = useParams();
  const { data } = useResourceSingle(BASE_URL, 'agents/by', id);

  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    MobileNumber: '',
    IsActive: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (data?.data) {
      const { item } = data.data
      setFormData((prev) => ({
        ...prev,
        FirstName: item?.FirstName || '',
        LastName: item?.LastName || '',
        Email: item?.Email || '',
        MobileNumber: item?.MobileNumber || '',
        IsActive: item?.IsActive || false,
      }));
    }
  }, [data]);

  const optionsIsActive = [
    { id: true, title: 'Active' },
    { id: false, title: 'Inactive' }
  ];

  const [isActiveRadio, selectedIsActive] = useRadioOnOffUpdate(
    'Is Active',
    'IsActive',
    optionsIsActive,
    formData.IsActive,
    setFormData
  );
  
  const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `agents/by`, id, formData, setFormData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateItem = {
      IsActive: selectedIsActive,
    };
    await updateResource(updateItem, '/dashboard/security/agents');
  };

  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <DashboardContainerWrapper>
      <DashboardHeading title="Edit Agent" />
      <DashboardFormWrapper>
        <DashboardInputWrapper>
          <DashboardInput
            label="First Name"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            placeholder="John"
            width="md:w-1/2"
            disabled={true}
          />
          <DashboardInput
            label="Last Name"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            placeholder="Doe"
            width="md:w-1/2"
            disabled={true}
          />
        </DashboardInputWrapper>

        <DashboardInputWrapper>
          <DashboardInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="johndoe@gmail.com"
            width="md:w-1/2"
            disabled={true}
          />
          <DashboardInput
            label="Mobile Number"
            name="MobileNumber"
            value={formData.MobileNumber}
            onChange={handleChange}
            placeholder="0712345678"
            width="md:w-1/2"
            disabled={true}
          />
        </DashboardInputWrapper>

        <div className="mt-4">
          <div className="mt-2 space-y-2">{isActiveRadio}</div>
        </div>

        <DashboardButtonGroup onSubmit={handleSubmit} onGoBack={handleGoBack} loading={dataUpdated.loading} />
      </DashboardFormWrapper>
    </DashboardContainerWrapper>
  );
}
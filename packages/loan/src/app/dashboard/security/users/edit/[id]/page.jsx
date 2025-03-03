'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import {
  useCheckboxUpdate,
  useRadioOnOffUpdate,
  useFetchResource,
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

export default function EditUser() {
  const { id } = useParams();
  const { data } = useResourceSingle(BASE_URL, 'users/by', id);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobilenumber: '',
    isactive: false,
    islocked: false,
    preselectedroles: [],
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
      const existingRoles = item?.Roles?.map((role) => role.ID) || [];
      setFormData((prev) => ({
        ...prev,
        firstname: item?.FirstName || '',
        lastname: item?.LastName || '',
        email: item?.Email || '',
        mobilenumber: item?.MobileNumber || '',
        isactive: item?.IsActive || false,
        islocked: item?.IsLocked || false,
        preselectedroles: existingRoles,
      }));
    }
  }, [data]);

  const [roles, setRoles] = useState([]);
  const { data: dataFetchedRoles } = useFetchResource(BASE_URL, 'roles/all');

  useEffect(() => {
    if (dataFetchedRoles?.success) {
      setRoles(dataFetchedRoles?.data?.item || []);
    }
  }, [dataFetchedRoles]);

  const [selectedIds, checkboxes] = useCheckboxUpdate(roles, 3, 'Roles', 'roles', formData.preselectedroles);

  const optionsIsActive = [
    { id: true, title: 'Active' },
    { id: false, title: 'Inactive' }
  ];
  
  const optionsIsLocked = [
    { id: true, title: 'Locked' },
    { id: false, title: 'Unlocked' }
  ];
  

  const [isActiveRadio, selectedIsActive] = useRadioOnOffUpdate(
    'Is Active',
    'isactive',
    optionsIsActive,
    formData.isactive,
    setFormData
  );

  const [isLockedRadio, selectedIsLocked] = useRadioOnOffUpdate(
    'Is Locked',
    'islocked',
    optionsIsLocked,
    formData.islocked,
    setFormData
  );
  
  const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `users/by`, id, formData, setFormData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateItem = {
      IsActive: selectedIsActive,
      IsLocked: selectedIsLocked,
      Roles: selectedIds,
    };
    await updateResource(updateItem, '/dashboard/security/users');
  };

  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <DashboardContainerWrapper>
      <DashboardHeading title="Edit User" />
      <DashboardFormWrapper>
        <DashboardInputWrapper>
          <DashboardInput
            label="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="John"
            width="md:w-1/2"
            disabled={true}
          />
          <DashboardInput
            label="Last Name"
            name="lastname"
            value={formData.lastname}
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
            name="mobilenumber"
            value={formData.mobilenumber}
            onChange={handleChange}
            placeholder="0712345678"
            width="md:w-1/2"
            disabled={true}
          />
        </DashboardInputWrapper>

        <div className="mt-4">
          <div className="mt-2 space-y-2">{isActiveRadio}</div>
        </div>
        <div className="mt-4">
          <div className="mt-2 space-y-2">{isLockedRadio}</div>
        </div>
        
        {!dataFetchedRoles.loading && !dataFetchedRoles.error && (
          <div className="grid gap-4">{checkboxes}</div>
        )}

        <DashboardButtonGroup onSubmit={handleSubmit} onGoBack={handleGoBack} loading={dataUpdated.loading} />
      </DashboardFormWrapper>
    </DashboardContainerWrapper>
  );
}
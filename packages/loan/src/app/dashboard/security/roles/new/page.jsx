'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCheckbox, useCreateResource, useFetchResource } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewRole() {
    const [formData, setFormData] = useState({
        rolename: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const [permissions, setPermissions] = useState([]);
    const { data: dataFetchedPermissions } = useFetchResource(BASE_URL, 'permissions/all');
    
    useEffect(() => {
        if (dataFetchedPermissions.success) {
          setPermissions(dataFetchedPermissions.data.item);
        }
    }, [dataFetchedPermissions]);
    
    const [selectedIds, checkboxes] = useCheckbox(permissions, 3, 'Permissions', 'permissions');
    
    const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'roles/create');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            RoleName: formData.rolename,
            Permissions: selectedIds,
        };
        await createResource(newResource, '/dashboard/security/roles');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

  return (
    <DashboardContainerWrapper>
      <DashboardHeading title="New Role" />
      <DashboardFormWrapper>
        <DashboardInputWrapper>
            <DashboardInput
                label="Role Name"
                name="rolename"
                value={formData.rolename}
                onChange={handleChange}
                placeholder="Editor"
                width="md:w-1/2"
                error={dataCreated.error?.RoleName}
            />
        </DashboardInputWrapper>
        {!dataFetchedPermissions.loading && !dataFetchedPermissions.error && (
            <div className="grid gap-4">
            {checkboxes}
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
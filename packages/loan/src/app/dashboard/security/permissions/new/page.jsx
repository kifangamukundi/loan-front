'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCheckbox, useCreateResource, useFetchResource } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewPermission() {
    const [formData, setFormData] = useState({
        permissionName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const [roles, setRoles] = useState([]);
    const { data: dataFetchedRoles } = useFetchResource(BASE_URL, 'roles/all');

    useEffect(() => {
        if (dataFetchedRoles.success) {
          setRoles(dataFetchedRoles.data.item);
        }
    }, [dataFetchedRoles]);

    const [selectedIds, checkboxes] = useCheckbox(roles, 3, 'Roles', 'roles');

    const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'permissions/create');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            PermissionName: formData.permissionName,
            Roles: selectedIds,
        };
        await createResource(newResource, '/dashboard/security/permissions');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="New Permission" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Permission Name"
                        name="permissionName"
                        value={formData.permissionName}
                        onChange={handleChange}
                        placeholder="manage_users"
                        width="md:w-1/2"
                        error={dataCreated.error?.PermissionName}
                    />
                </DashboardInputWrapper>
                {!dataFetchedRoles.loading && !dataFetchedRoles.error && (
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
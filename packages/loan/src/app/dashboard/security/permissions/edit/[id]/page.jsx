'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCheckboxUpdate, useFetchResource, useResourceSingle, useResourceUpdate } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function EditPermission() {
    const { id } = useParams();
    const { data } = useResourceSingle(BASE_URL, 'permissions/by', id);

    const [formData, setFormData] = useState({
        permissionName: '',
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
            const existingRoles = item?.Roles?.map(role => role.ID) || [];
            setFormData(prev => ({
                ...prev,
                permissionName: item?.PermissionName || '',
                preselectedroles: existingRoles,
            }));
        }
    }, [data]);
    

    const [roles, setRoles] = useState([]);
    const { data: dataFetchedRoles } = useFetchResource(BASE_URL, 'roles/all');
    
    useEffect(() => {
        if (dataFetchedRoles.success) {
            setRoles(dataFetchedRoles.data.item);
        }
    }, [dataFetchedRoles]);
    
    const [selectedIds, checkboxes] = useCheckboxUpdate(roles, 3, 'Roles', 'roles', formData.preselectedroles);
    
    const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `permissions/by`, id, formData, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateItem = {
            PermissionName: formData.permissionName,
            Roles: selectedIds,
        };
        await updateResource(updateItem, '/dashboard/security/permissions');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="Edit Permission" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Permission Name"
                        name="permissionName"
                        value={formData.permissionName}
                        onChange={handleChange}
                        placeholder="Editor"
                        width="md:w-1/2"
                        error={dataUpdated.error?.PermissionName}
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
                    loading={dataUpdated.loading}
                />
            </DashboardFormWrapper>
        </DashboardContainerWrapper>
    );
}
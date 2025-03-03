'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCheckboxUpdate, useFetchResource, useResourceSingle, useResourceUpdate } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function EditRole() {
    const { id } = useParams();
    const { data } = useResourceSingle(BASE_URL, 'roles/by', id);

    const [formData, setFormData] = useState({
        roleName: '',
        preselectedpermissions: [],
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
            const existingPermissions = item?.Permissions?.map(permission => permission.ID) || [];
            setFormData(prev => ({
                ...prev,
                roleName: item?.RoleName || '',
                preselectedpermissions: existingPermissions,
            }));
        }
    }, [data]);
    

    const [permissions, setPermissions] = useState([]);
    const { data: dataFetchedPermissions } = useFetchResource(BASE_URL, 'permissions/all');
    
    useEffect(() => {
        if (dataFetchedPermissions.success) {
            setPermissions(dataFetchedPermissions.data.item);
        }
    }, [dataFetchedPermissions]);
    
    const [selectedIds, checkboxes] = useCheckboxUpdate(permissions, 3, 'Permissions', 'permissions', formData.preselectedpermissions);
    
    const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `roles/by`, id, formData, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateItem = {
            RoleName: formData.roleName,
            Permissions: selectedIds,
        };
        await updateResource(updateItem, '/dashboard/security/roles');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="Edit Role" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Role Name"
                        name="roleName"
                        value={formData.roleName}
                        onChange={handleChange}
                        placeholder="Editor"
                        width="md:w-1/2"
                        error={dataUpdated.error?.RoleName}
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
                    loading={dataUpdated.loading}
                />
            </DashboardFormWrapper>
        </DashboardContainerWrapper>
    );
}
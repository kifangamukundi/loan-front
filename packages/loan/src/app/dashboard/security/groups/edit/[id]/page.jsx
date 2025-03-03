'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useFetchResource, useRadioOnOffUpdate, useRadioUpdate, useResourceSingle, useResourceUpdate } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function EditGroup() {
    const { id } = useParams();
    const { data } = useResourceSingle(BASE_URL, 'groups/by', id);

    const [formData, setFormData] = useState({
        GroupName: '',
        IsActive: false,
        preselectedagent: '',
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
                GroupName: item?.GroupName || '',
                IsActive: item?.IsActive || false,
                preselectedagent: item ? item?.AgentID : '',
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

    const [agents, setAgents] = useState([]);
    const { data: dataFetchedAgents } = useFetchResource(BASE_URL, 'agents/all');

    useEffect(() => {
        if (dataFetchedAgents.success) {
            setAgents(dataFetchedAgents.data.item);
        }
    }, [dataFetchedAgents]);

    const [radios, selectedId] = useRadioUpdate(agents, 3, 'Agent', 'agent', formData.preselectedagent);
    
    const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `groups/by`, id, formData, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateItem = {
            AgentID: selectedId,
            IsActive: selectedIsActive,
        };
        await updateResource(updateItem, '/dashboard/security/groups');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="Edit Group" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Group Name"
                        name="GroupName"
                        value={formData.GroupName}
                        onChange={handleChange}
                        placeholder="test me"
                        width="md:w-1/2"
                        error={dataUpdated.error?.GroupName}
                        disabled={true}
                    />
                </DashboardInputWrapper>
                {!dataFetchedAgents.loading && !dataFetchedAgents.error && (
                    <div className="grid gap-4">
                        {radios}
                    </div>
                )}
                <div className="mt-4">
                    <div className="mt-2 space-y-2">{isActiveRadio}</div>
                </div>
                <DashboardButtonGroup 
                    onSubmit={handleSubmit} 
                    onGoBack={handleGoBack} 
                    loading={dataUpdated.loading}
                />
            </DashboardFormWrapper>
        </DashboardContainerWrapper>
    );
}
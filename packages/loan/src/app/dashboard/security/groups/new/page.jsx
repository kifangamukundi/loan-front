'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCreateResource, useDependencyDropdown, useFetchResource, useRadio } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper, DashboardSelectInput } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewGroup() {
    const [formData, setFormData] = useState({
        GroupName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const {
        countries,
        regions,
        cities,
        selectedCountry,
        selectedRegion,
        selectedCity,
        setSelectedCountry,
        setSelectedRegion,
        setSelectedCity,
        handleCountryChange,
        handleRegionChange,
      } = useDependencyDropdown(BASE_URL);

    const [agents, setAgents] = useState([]);
    const { data: dataFetchedAgents } = useFetchResource(BASE_URL, 'agents/all');
    
    useEffect(() => {
        if (dataFetchedAgents.success) {
            setAgents(dataFetchedAgents.data.item);
        }
    }, [dataFetchedAgents]);
    
    const [radios, selectedId] = useRadio(agents, 3, 'Agent', 'agent');

    const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'groups/create');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            GroupName: formData.GroupName,
            AgentID: selectedId,
            CountryID: selectedCountry ? parseInt(selectedCountry, 10) : null,
            RegionID: selectedRegion ? parseInt(selectedRegion, 10) : null,
            CityID: selectedCity ? parseInt(selectedCity, 10) : null,
        };
        await createResource(newResource, '/dashboard/security/groups');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="New Group" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Group Name"
                        name="GroupName"
                        value={formData.GroupName}
                        onChange={handleChange}
                        placeholder="Bodaboda Sacco"
                        width="md:w-1/2"
                        error={dataCreated.error?.GroupName}
                    />
                </DashboardInputWrapper>
                <DashboardInputWrapper>
                    <DashboardSelectInput 
                        label="County"
                        item={selectedCountry} 
                        change={(e) => handleCountryChange(e.target.value)}
                        options={countries}
                        placeholder="Select County"
                    />
                    <DashboardSelectInput 
                        label="Region"
                        item={selectedRegion} 
                        change={(e) => handleRegionChange(e.target.value)}
                        options={regions}
                        placeholder="Select Region"
                        disabled={!selectedCountry}
                    />
                    <DashboardSelectInput 
                        label="Ward"
                        item={selectedCity} 
                        change={(e) => setSelectedCity(e.target.value)}
                        options={cities}
                        placeholder="Select Ward"
                        disabled={!selectedRegion}
                    />
                </DashboardInputWrapper>
                {!dataFetchedAgents.loading && !dataFetchedAgents.error && (
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
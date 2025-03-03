'use client';

import { useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCreateResource, useDependencyDropdown } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper, DashboardSelectInput } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewAgent() {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        MobileNumber: '',
        Email: '',
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

    const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'agents/create');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            FirstName: formData.FirstName,
            LastName: formData.LastName,
            MobileNumber: formData.MobileNumber,
            Email: formData.Email,
            CountryID: selectedCountry ? parseInt(selectedCountry, 10) : null,
            RegionID: selectedRegion ? parseInt(selectedRegion, 10) : null,
            CityID: selectedCity ? parseInt(selectedCity, 10) : null,
        };
        await createResource(newResource, '/dashboard/security/agents');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="New Agent" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="First Name"
                        name="FirstName"
                        value={formData.FirstName}
                        onChange={handleChange}
                        placeholder="John"
                        width="md:w-1/2"
                        error={dataCreated.error?.FirstName}
                    />
                    <DashboardInput
                        label="Last Name"
                        name="LastName"
                        value={formData.LastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        width="md:w-1/2"
                        error={dataCreated.error?.LastName}
                    />
                </DashboardInputWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Mobile Number"
                        name="MobileNumber"
                        value={formData.MobileNumber}
                        onChange={handleChange}
                        placeholder="0702817040"
                        width="md:w-1/2"
                        error={dataCreated.error?.MobileNumber}
                    />
                    <DashboardInput
                        label="Email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        placeholder="johndoe@gmail.com"
                        width="md:w-1/2"
                        error={dataCreated.error?.Email}
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
                <DashboardButtonGroup 
                    onSubmit={handleSubmit} 
                    onGoBack={handleGoBack}
                    loading={dataCreated.loading} 
                />
            </DashboardFormWrapper>
        </DashboardContainerWrapper>
    );
}
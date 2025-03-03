'use client';

import { useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCreateResource } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewCountry() {
    const [formData, setFormData] = useState({
        countryName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'countries/create');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            CountryName: formData.countryName,
        };
        await createResource(newResource, '/dashboard/data/countries');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="New Country" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Country Name"
                        name="countryName"
                        value={formData.countryName}
                        onChange={handleChange}
                        placeholder="Kenya"
                        width="md:w-1/2"
                        error={dataCreated.error?.CountryName}
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
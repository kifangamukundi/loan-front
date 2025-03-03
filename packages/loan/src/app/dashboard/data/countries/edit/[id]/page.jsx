'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useResourceSingle, useResourceUpdate } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function EditCountry() {
    const { id } = useParams();
    const { data } = useResourceSingle(BASE_URL, 'countries/by', id);

    const [formData, setFormData] = useState({
        countryName: '',
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
            setFormData(prev => ({
                ...prev,
                countryName: item?.CountryName || '',
            }));
        }
    }, [data]);
    
    const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `countries/by`, id, formData, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateItem = {
            CountryName: formData.countryName,
        };
        await updateResource(updateItem, '/dashboard/data/countries');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="Edit Country" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Country Name"
                        name="countryName"
                        value={formData.countryName}
                        onChange={handleChange}
                        placeholder="Kenya"
                        width="md:w-1/2"
                        error={dataUpdated.error?.CountryName}
                    />
                </DashboardInputWrapper>
                <DashboardButtonGroup 
                    onSubmit={handleSubmit} 
                    onGoBack={handleGoBack} 
                    loading={dataUpdated.loading}
                />
            </DashboardFormWrapper>
        </DashboardContainerWrapper>
    );
}
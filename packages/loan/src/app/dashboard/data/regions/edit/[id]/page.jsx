'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useFetchResource, useRadioUpdate, useResourceSingle, useResourceUpdate } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function EditRegion() {
    const { id } = useParams();
    const { data } = useResourceSingle(BASE_URL, 'regions/by', id);

    const [formData, setFormData] = useState({
        regionName: '',
        preselectedcountry: '',
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
                regionName: item?.RegionName || '',
                preselectedcountry: item ? item?.CountryID : '',
            }));
        }
    }, [data]);

    const [countries, setCountries] = useState([]);
    const { data: dataFetchedCountries } = useFetchResource(BASE_URL, 'countries/all');

    useEffect(() => {
        if (dataFetchedCountries.success) {
            setCountries(dataFetchedCountries.data.item);
        }
    }, [dataFetchedCountries]);

    const [radios, selectedId] = useRadioUpdate(countries, 3, 'Country', 'country', formData.preselectedcountry);
    
    const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `regions/by`, id, formData, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateItem = {
            RegionName: formData.regionName,
            CountryID: selectedId,
        };
        await updateResource(updateItem, '/dashboard/data/regions');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="Edit Region" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Region Name"
                        name="regionName"
                        value={formData.regionName}
                        onChange={handleChange}
                        placeholder="Langata"
                        width="md:w-1/2"
                        error={dataUpdated.error?.RegionName}
                    />
                </DashboardInputWrapper>
                {!dataFetchedCountries.loading && !dataFetchedCountries.error && (
                    <div className="grid gap-4">
                        {radios}
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
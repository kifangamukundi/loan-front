'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useFetchResource, useRadioUpdate, useResourceSingle, useResourceUpdate } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function EditCounty() {
    const { id } = useParams();
    const { data } = useResourceSingle(BASE_URL, 'counties/by', id);

    const [formData, setFormData] = useState({
        countyName: '',
        selectedRegion: '',
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
                countyName: item?.CountyName || '',
                selectedRegion: item ? item?.RegionID : '',
            }));
        }
    }, [data]);

    const [regions, setRegions] = useState([]);
    const { data: dataFetchedRegions } = useFetchResource(BASE_URL, 'regions/all');

    useEffect(() => {
        if (dataFetchedRegions.success) {
            setRegions(dataFetchedRegions.data.item);
        }
    }, [dataFetchedRegions]);

    const [radios, selectedId] = useRadioUpdate(regions, 3, 'Region', 'region', formData.selectedRegion);
    
    const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `counties/by`, id, formData, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateItem = {
            CountyName: formData.countyName,
            RegionID: selectedId,
        };
        await updateResource(updateItem, '/dashboard/data/counties');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="Edit County" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="County Name"
                        name="countyName"
                        value={formData.countyName}
                        onChange={handleChange}
                        placeholder="Langata"
                        width="md:w-1/2"
                        error={dataUpdated.error?.CountyName}
                    />
                </DashboardInputWrapper>
                {!dataFetchedRegions.loading && !dataFetchedRegions.error && (
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
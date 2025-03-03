'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useFetchResource, useRadioUpdate, useResourceSingle, useResourceUpdate } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function EditLocation() {
    const { id } = useParams();
    const { data } = useResourceSingle(BASE_URL, 'locations/by', id);

    const [formData, setFormData] = useState({
        locationName: '',
        selectedWard: '',
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
                locationName: item?.LocationName || '',
                selectedWard: item ? item?.WardID : '',
            }));
        }
    }, [data]);

    const [wards, setWards] = useState([]);
    const { data: dataFetchedWards } = useFetchResource(BASE_URL, 'wards/all');

    useEffect(() => {
        if (dataFetchedWards.success) {
            setWards(dataFetchedWards.data.item);
        }
    }, [dataFetchedWards]);

    const [radios, selectedId] = useRadioUpdate(wards, 3, 'Ward', 'ward', formData.selectedWard);
    
    const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `locations/by`, id, formData, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateItem = {
            LocationName: formData.locationName,
            WardID: selectedId,
        };
        await updateResource(updateItem, '/dashboard/data/locations');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="Edit Location" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Location Name"
                        name="locationName"
                        value={formData.locationName}
                        onChange={handleChange}
                        placeholder="Langata"
                        width="md:w-1/2"
                        error={dataUpdated.error?.LocationName}
                    />
                </DashboardInputWrapper>
                {!dataFetchedWards.loading && !dataFetchedWards.error && (
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
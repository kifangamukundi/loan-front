'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useFetchResource, useRadioUpdate, useResourceSingle, useResourceUpdate } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function EditSubLocation() {
    const { id } = useParams();
    const { data } = useResourceSingle(BASE_URL, 'sublocations/by', id);

    const [formData, setFormData] = useState({
        subLocationName: '',
        selectedLocation: '',
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
                subLocationName: item?.SubLocationName || '',
                selectedLocation: item ? item?.LocationID : '',
            }));
        }
    }, [data]);

    const [locations, setLocations] = useState([]);
    const { data: dataFetchedLocations } = useFetchResource(BASE_URL, 'locations/all');

    useEffect(() => {
        if (dataFetchedLocations.success) {
            setLocations(dataFetchedLocations.data.item);
        }
    }, [dataFetchedLocations]);

    const [radios, selectedId] = useRadioUpdate(locations, 3, 'Location', 'location', formData.selectedLocation);
    
    const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `sublocations/by`, id, formData, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateItem = {
            SubLocationName: formData.subLocationName,
            LocationID: selectedId,
        };
        await updateResource(updateItem, '/dashboard/data/sublocations');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="Edit SubLocation" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="SubLocation Name"
                        name="subLocationName"
                        value={formData.subLocationName}
                        onChange={handleChange}
                        placeholder="Langata"
                        width="md:w-1/2"
                        error={dataUpdated.error?.SubLocationName}
                    />
                </DashboardInputWrapper>
                {!dataFetchedLocations.loading && !dataFetchedLocations.error && (
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
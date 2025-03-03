'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useFetchResource, useRadioUpdate, useResourceSingle, useResourceUpdate } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function EditVillage() {
    const { id } = useParams();
    const { data } = useResourceSingle(BASE_URL, 'villages/by', id);

    const [formData, setFormData] = useState({
        villageName: '',
        selectedSubLocation: '',
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
                villageName: item?.VillageName || '',
                selectedSubLocation: item ? item?.SubLocationID : '',
            }));
        }
    }, [data]);

    const [sublocations, setSubLocations] = useState([]);
    const { data: dataFetchedSubLocations } = useFetchResource(BASE_URL, 'sublocations/all');

    useEffect(() => {
        if (dataFetchedSubLocations.success) {
            setSubLocations(dataFetchedSubLocations.data.item);
        }
    }, [dataFetchedSubLocations]);

    const [radios, selectedId] = useRadioUpdate(sublocations, 3, 'SubLocation', 'sublocation', formData.selectedSubLocation);
    
    const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `villages/by`, id, formData, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateItem = {
            VillageName: formData.villageName,
            SubLocationID: selectedId,
        };
        await updateResource(updateItem, '/dashboard/data/villages');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="Edit Village" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Village Name"
                        name="villageName"
                        value={formData.villageName}
                        onChange={handleChange}
                        placeholder="Langata"
                        width="md:w-1/2"
                        error={dataUpdated.error?.VillageName}
                    />
                </DashboardInputWrapper>
                {!dataFetchedSubLocations.loading && !dataFetchedSubLocations.error && (
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
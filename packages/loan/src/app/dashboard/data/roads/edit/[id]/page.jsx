'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useFetchResource, useRadioUpdate, useResourceSingle, useResourceUpdate } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function EditRoad() {
    const { id } = useParams();
    const { data } = useResourceSingle(BASE_URL, 'roads/by', id);

    const [formData, setFormData] = useState({
        roadName: '',
        selectedVillage: '',
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
                roadName: item?.RoadName || '',
                selectedVillage: item ? item?.VillageID : '',
            }));
        }
    }, [data]);

    const [villages, setVillages] = useState([]);
    const { data: dataFetchedVillages } = useFetchResource(BASE_URL, 'villages/all');

    useEffect(() => {
        if (dataFetchedVillages.success) {
            setVillages(dataFetchedVillages.data.item);
        }
    }, [dataFetchedVillages]);

    const [radios, selectedId] = useRadioUpdate(villages, 3, 'Village', 'village', formData.selectedVillage);
    
    const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `roads/by`, id, formData, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateItem = {
            RoadName: formData.roadName,
            VillageID: selectedId,
        };
        await updateResource(updateItem, '/dashboard/data/roads');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="Edit Road" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Road Name"
                        name="roadName"
                        value={formData.roadName}
                        onChange={handleChange}
                        placeholder="Langata"
                        width="md:w-1/2"
                        error={dataUpdated.error?.RoadName}
                    />
                </DashboardInputWrapper>
                {!dataFetchedVillages.loading && !dataFetchedVillages.error && (
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
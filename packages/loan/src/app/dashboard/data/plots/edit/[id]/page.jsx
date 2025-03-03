'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useFetchResource, useRadioUpdate, useResourceSingle, useResourceUpdate } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function EditPlot() {
    const { id } = useParams();
    const { data } = useResourceSingle(BASE_URL, 'plots/by', id);

    const [formData, setFormData] = useState({
        plotName: '',
        selectedRoad: '',
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
                plotName: item?.PlotName || '',
                selectedRoad: item ? item?.RoadID : '',
            }));
        }
    }, [data]);

    const [roads, setRoads] = useState([]);
    const { data: dataFetchedRoads } = useFetchResource(BASE_URL, 'roads/all');

    useEffect(() => {
        if (dataFetchedRoads.success) {
            setRoads(dataFetchedRoads.data.item);
        }
    }, [dataFetchedRoads]);

    const [radios, selectedId] = useRadioUpdate(roads, 3, 'Road', 'road', formData.selectedRoad);
    
    const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `plots/by`, id, formData, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateItem = {
            PlotName: formData.plotName,
            RoadID: selectedId,
        };
        await updateResource(updateItem, '/dashboard/data/plots');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="Edit Plot" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Plot Name"
                        name="plotName"
                        value={formData.plotName}
                        onChange={handleChange}
                        placeholder="Langata"
                        width="md:w-1/2"
                        error={dataUpdated.error?.PlotName}
                    />
                </DashboardInputWrapper>
                {!dataFetchedRoads.loading && !dataFetchedRoads.error && (
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
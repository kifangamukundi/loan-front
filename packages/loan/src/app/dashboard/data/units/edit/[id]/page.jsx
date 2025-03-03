'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useFetchResource, useRadioUpdate, useResourceSingle, useResourceUpdate } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function EditUnit() {
    const { id } = useParams();
    const { data } = useResourceSingle(BASE_URL, 'units/by', id);

    const [formData, setFormData] = useState({
        unitName: '',
        selectedPlot: '',
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
                unitName: item?.UnitName || '',
                selectedPlot: item ? item?.PlotID : '',
            }));
        }
    }, [data]);

    const [plots, setPlots] = useState([]);
    const { data: dataFetchedPlots } = useFetchResource(BASE_URL, 'plots/all');

    useEffect(() => {
        if (dataFetchedPlots.success) {
            setPlots(dataFetchedPlots.data.item);
        }
    }, [dataFetchedPlots]);

    const [radios, selectedId] = useRadioUpdate(plots, 3, 'Plot', 'plot', formData.selectedPlot);
    
    const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `units/by`, id, formData, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateItem = {
            UnitName: formData.unitName,
            PlotID: selectedId,
        };
        await updateResource(updateItem, '/dashboard/data/units');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="Edit Unit" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Unit Name"
                        name="unitName"
                        value={formData.unitName}
                        onChange={handleChange}
                        placeholder="Langata"
                        width="md:w-1/2"
                        error={dataUpdated.error?.UnitName}
                    />
                </DashboardInputWrapper>
                {!dataFetchedPlots.loading && !dataFetchedPlots.error && (
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
'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useFetchResource, useRadioUpdate, useResourceSingle, useResourceUpdate } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function EditWard() {
    const { id } = useParams();
    const { data } = useResourceSingle(BASE_URL, 'wards/by', id);

    const [formData, setFormData] = useState({
        wardName: '',
        selectedSubCounty: '',
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
                wardName: item?.WardName || '',
                selectedSubCounty: item ? item?.SubCountyID : '',
            }));
        }
    }, [data]);

    const [subcounties, setSubCounties] = useState([]);
    const { data: dataFetchedSubCounties } = useFetchResource(BASE_URL, 'subcounties/all');

    useEffect(() => {
        if (dataFetchedSubCounties.success) {
            setSubCounties(dataFetchedSubCounties.data.item);
        }
    }, [dataFetchedSubCounties]);

    const [radios, selectedId] = useRadioUpdate(subcounties, 3, 'SubCounty', 'subcounty', formData.selectedSubCounty);
    
    const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `wards/by`, id, formData, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateItem = {
            WardName: formData.wardName,
            SubCountyID: selectedId,
        };
        await updateResource(updateItem, '/dashboard/data/wards');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="Edit Ward" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Ward Name"
                        name="wardName"
                        value={formData.wardName}
                        onChange={handleChange}
                        placeholder="Langata"
                        width="md:w-1/2"
                        error={dataUpdated.error?.WardName}
                    />
                </DashboardInputWrapper>
                {!dataFetchedSubCounties.loading && !dataFetchedSubCounties.error && (
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
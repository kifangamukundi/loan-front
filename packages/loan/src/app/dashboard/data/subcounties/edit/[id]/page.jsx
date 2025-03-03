'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useFetchResource, useRadioUpdate, useResourceSingle, useResourceUpdate } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function EditSubCounty() {
    const { id } = useParams();
    const { data } = useResourceSingle(BASE_URL, 'subcounties/by', id);

    const [formData, setFormData] = useState({
        subCountyName: '',
        selectedCounty: '',
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
                subCountyName: item?.SubCountyName || '',
                selectedCounty: item ? item?.CountyID : '',
            }));
        }
    }, [data]);

    const [counties, setCounties] = useState([]);
    const { data: dataFetchedCounties } = useFetchResource(BASE_URL, 'counties/all');

    useEffect(() => {
        if (dataFetchedCounties.success) {
            setCounties(dataFetchedCounties.data.item);
        }
    }, [dataFetchedCounties]);

    const [radios, selectedId] = useRadioUpdate(counties, 3, 'County', 'county', formData.selectedCounty);
    
    const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `subcounties/by`, id, formData, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateItem = {
            SubCountyName: formData.subCountyName,
            CountyID: selectedId,
        };
        await updateResource(updateItem, '/dashboard/data/subcounties');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="Edit SubCounty" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="SubCounty Name"
                        name="subCountyName"
                        value={formData.subCountyName}
                        onChange={handleChange}
                        placeholder="Langata"
                        width="md:w-1/2"
                        error={dataUpdated.error?.SubCountyName}
                    />
                </DashboardInputWrapper>
                {!dataFetchedCounties.loading && !dataFetchedCounties.error && (
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
'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCheckbox, useCreateResource, useFetchResource } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper, DashboardTextArea } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewCategory() {
    const [formData, setFormData] = useState({
        categoryname: '',
        snippet: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const [posts, setPosts] = useState([]);
    const { data: dataFetchedPosts } = useFetchResource(BASE_URL, 'posts/all');
    
    useEffect(() => {
        if (dataFetchedPosts.success) {
            setPosts(dataFetchedPosts.data.item);
        }
    }, [dataFetchedPosts]);
    
    const [selectedIds, checkboxes] = useCheckbox(posts, 3, 'Posts', 'posts');

    const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'categories/create');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            CategoryName: formData.categoryname,
            Snippet: formData.snippet,
            Posts: selectedIds
        };
        await createResource(newResource, '/dashboard/blog/categories');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="New Category" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Category Name"
                        name="categoryname"
                        value={formData.categoryname}
                        onChange={handleChange}
                        placeholder="Finance"
                        width="md:w-1/2"
                        error={dataCreated.error?.CategoryName}
                    />
                </DashboardInputWrapper>
                <DashboardInputWrapper>
                    <DashboardTextArea
                        label="Category Snippet"
                        name="snippet"
                        value={formData.snippet}
                        onChange={handleChange}
                        placeholder="A short snippet description of the category"
                        width="md:w-2/3"
                        error={dataCreated.error?.Snippet}
                    />
                </DashboardInputWrapper>
                {!dataFetchedPosts.loading && !dataFetchedPosts.error && (
                    <div className="grid gap-4">
                        {checkboxes}
                    </div>
                )}
                <DashboardButtonGroup 
                    onSubmit={handleSubmit} 
                    onGoBack={handleGoBack} 
                    loading={dataCreated.loading}
                />
            </DashboardFormWrapper>
        </DashboardContainerWrapper>
    );
}
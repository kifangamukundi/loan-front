'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCheckboxUpdate, useFetchResource, useResourceSingle, useResourceUpdate } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper, DashboardTextArea } from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function EditCategory() {
    const { id } = useParams();
    const { data } = useResourceSingle(BASE_URL, 'categories/by', id);

    const [formData, setFormData] = useState({
        categoryname: '',
        snippet: '',
        preselectedposts: [],
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
            const { item } = data.data;
            const existingPosts = item?.Posts?.map(post => post.ID) || [];
            setFormData(prev => ({
                ...prev,
                categoryname: item?.CategoryName || '',
                snippet: item?.Snippet || '',
                preselectedposts: existingPosts,
            }));
        }
    }, [data]);

    const [posts, setPosts] = useState([]);
    const { data: dataFetchedPosts } = useFetchResource(BASE_URL, 'posts/all');
    
    useEffect(() => {
        if (dataFetchedPosts.success) {
            setPosts(dataFetchedPosts.data.item);
        }
    }, [dataFetchedPosts]);
    
    const [selectedIds, checkboxes] = useCheckboxUpdate(posts, 3, 'Posts', 'posts', formData.preselectedposts);
    
    const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `categories/by`, id, formData, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateItem = {
            CategoryName: formData.categoryname,
            Snippet: formData.snippet,
            Posts: selectedIds
        };
        await updateResource(updateItem, '/dashboard/blog/categories');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="Edit Category" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Category Name"
                        name="categoryname"
                        value={formData.categoryname}
                        onChange={handleChange}
                        placeholder="Finance"
                        width="md:w-1/2"
                        error={dataUpdated.error?.CategoryName}
                    />
                </DashboardInputWrapper>
                <DashboardInputWrapper>
                    <DashboardTextArea
                        label="Category Snippet"
                        name="snippet"
                        value={formData.snippet}
                        onChange={handleChange}
                        placeholder="A short snippet description of the post"
                        width="md:w-2/3"
                        error={dataUpdated.error?.Snippet}
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
                    loading={dataUpdated.loading}
                />
            </DashboardFormWrapper>
        </DashboardContainerWrapper>
    );
}
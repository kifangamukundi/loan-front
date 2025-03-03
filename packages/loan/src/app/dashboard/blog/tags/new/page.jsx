'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCheckbox, useCreateResource, useFetchResource } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper, DashboardTextArea } from 'kifanga-ui-nav';
import { useRouter } from 'next/navigation';

export default function NewTag() {
    const [formData, setFormData] = useState({
        tagname: '',
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

    const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'tags/create');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            TagName: formData.tagname,
            Snippet: formData.snippet,
            Posts: selectedIds
        };
        createResource(newResource, '/dashboard/blog/tags');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="New Tag" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Tag Name"
                        name="tagname"
                        value={formData.tagname}
                        onChange={handleChange}
                        placeholder="#tips"
                        width="md:w-1/2"
                        error={dataCreated.error?.TagName}
                    />
                </DashboardInputWrapper>
                <DashboardInputWrapper>
                    <DashboardTextArea
                        label="Tag Snippet"
                        name="snippet"
                        value={formData.snippet}
                        onChange={handleChange}
                        placeholder="A short snippet description of the tag"
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
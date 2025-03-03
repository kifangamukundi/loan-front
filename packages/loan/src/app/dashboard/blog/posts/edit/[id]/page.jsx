'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCheckboxExtendedUpdate, useResourceSingle, useResourceUpdate, useUploadMedia } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper, DashboardMediaDelete, DashboardMediaGroup, DashboardMediaModal, DashboardTextArea } from 'kifanga-ui-nav';

import { usePostCreate } from '@/hooks';
import { BASE_URL, PrimaryEditor } from '@/helpers';
import { AddCategoryModal, AddTagModal, EditCategoryModal, EditTagModal } from '@/modals';

export default function EditPost() {
    const { id } = useParams();
    const [showRemoveCategoryModal, setShowRemoveCategoryModal] = useState(false);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showRemoveTagModal, setShowRemoveTagModal] = useState(false);
    const [showAddTagModal, setShowAddTagModal] = useState(false);
    const [showEditTagModal, setShowEditTagModal] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);

    const { data: dataFetchedPost } = useResourceSingle(BASE_URL, 'posts/by', id);

    const [formData, setFormData] = useState({
        postname: '',
        snippet: '',
        postlink: '',
        defaultimage: '',
        images: '',
        preSelectedCategories: '',
        preSelectedTags: '',
        initialContent: '',
    });

    const [postDescription, setPostDescription] = useState('');

    const editorInstanceHandler = useCallback((content, editor) => {
        setPostDescription(content);
    }, []);

    useEffect(() => {
      if (dataFetchedPost?.data) {
        const { item } = dataFetchedPost.data;
        const categoryIds = item?.Categories?.map(category => category.ID);
        const tagIds = item?.Tags?.map(tag => tag.ID);
    
        setFormData(prevFormData => ({
          ...prevFormData,
          postname: item?.PostName || '',
          snippet: item?.Snippet || '',
          postlink: item?.PostLink || '',
          defaultimage: item?.DefaultImage || {},
          images: item?.Images || [],
          preSelectedCategories: categoryIds || [],
          preSelectedTags: tagIds || [],
          initialContent: item?.PostContent || '',
        }));
    
        editorInstanceHandler();
        // editorInstanceHandler(dataFetchedPost.data.postcontent, null);
      }
    }, [dataFetchedPost, editorInstanceHandler]);
    

    const [createCategoryFormData, setCreateCategoryFormData] = useState({
        categoryname: '',
    });
    const [createTagFormData, setCreateTagFormData] = useState({
        tagname: '',
    });

    const [updateCategoryFormData, setUpdateCategoryFormData] = useState({
      categoryname: '',
    });
    const [updateTagFormData, setUpdateTagFormData] = useState({
      tagname: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddCategoryChange = (e) => {
      const { name, value } = e.target;
      setCreateCategoryFormData({
        ...createCategoryFormData,
        [name]: value,
      });
    };
    const handleAddTagChange = (e) => {
      const { name, value } = e.target;
      setCreateTagFormData({
        ...createTagFormData,
        [name]: value,
      });
    };

    const handleEditCategoryChange = (e) => {
      const { name, value } = e.target;
      setUpdateCategoryFormData({
        ...updateCategoryFormData,
        [name]: value,
      });
    };
    const handleEditTagChange = (e) => {
      const { name, value } = e.target;
      setUpdateTagFormData({
        ...updateTagFormData,
        [name]: value,
      });
    };

    const {
        categoryData,
        deleteCategoryData,
        createCategoryData,
        updateCategoryData,
        handleCategoryDeletion,
        handleCreateCategory,
        handleCategoryUpdate,
        tagData,
        deleteTagData,
        createTagData,
        updateTagData,
        handleTagDeletion,
        handleCreateTag,
        handleTagUpdate,
    } = usePostCreate(setShowRemoveCategoryModal, setShowAddCategoryModal, setShowEditCategoryModal, setSelectedCategory, setShowRemoveTagModal, setShowAddTagModal, setShowEditTagModal, setSelectedTag);

    const [limit, setLimit] = useState(5);
    const {
        fileInputRef,
        data: dataUploaded,
        defaultImage,
        images,
        setDefaultImage,
        setImages,
        handleFileInputChange,
        handleIconClick,
        isUploadDisabled,
    } = useUploadMedia(BASE_URL, limit, 'blog');

    useEffect(() => {
        setDefaultImage(formData.defaultimage[0] || {});
        setImages(formData.images || []);
    }, [formData.defaultimage, formData.images, setDefaultImage, setImages]);

    const [showModal, setShowModal] = useState(false);

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleCategoryCancel = () => {
        deleteCategoryData.error = "";
        setSelectedCategory(null);
        setShowRemoveCategoryModal(false);
    };

    const handleTagCancel = () => {
        deleteTagData.error = "";
        setSelectedTag(null);
        setShowRemoveTagModal(false);
    };
    
    const handleDeleteCategoryConfirmation = (item) => {
      setSelectedCategory(item);
      setShowRemoveCategoryModal(true);
    };

    const handleDeleteTagConfirmation = (item) => {
      setSelectedTag(item);
      setShowRemoveTagModal(true);
    };

    const handleAddCategoryCancel = () => {
        createCategoryData.error = "";
        setCreateCategoryFormData({
            categoryname: '',
        });
        setShowAddCategoryModal(false);
    };

    const handleAddTagCancel = () => {
        createTagData.error = "";
        setCreateTagFormData({
            tagname: '',
        });
        setShowAddTagModal(false);
    };
  
    const handleAddCategoryConfirmation = () => {
      setCreateCategoryFormData({
        categoryname: '',
      });
      setShowAddCategoryModal(true);
    };

    const handleAddTagConfirmation = () => {
      setCreateTagFormData({
        tagname: '',
      });
      setShowAddTagModal(true);
    };

    const handleEditCategoryCancel = () => {
      updateCategoryData.error = "";
      setSelectedCategory(null);
      setUpdateCategoryFormData({
        categoryname: '',
      });
      setShowEditCategoryModal(false);
    };

    const handleEditTagCancel = () => {
      updateTagData.error = "";
      setSelectedTag(null);
      setUpdateTagFormData({
        tagname: '',
      });
      setShowEditTagModal(false);
    };

    const handleEditCategoryConfirmation = (item) => {
      setSelectedCategory(item);
      setUpdateCategoryFormData({
        categoryname: item.label,
      });
      setShowEditCategoryModal(true);
    };

    const handleEditTagConfirmation = (item) => {
      setSelectedTag(item);
      setUpdateTagFormData({
        tagname: item.label,
      });
      setShowEditTagModal(true);
    };

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        if (categoryData.success) {
          setCategories(categoryData.data.item);
        }
    }, [categoryData]);
    const [selectedCategories, categoryboxes] = useCheckboxExtendedUpdate(categories, 4, 'Categories', 'categories', handleDeleteCategoryConfirmation, handleEditCategoryConfirmation, handleAddCategoryConfirmation, formData.preSelectedCategories);

    const [tags, setTags] = useState([]);
    useEffect(() => {
        if (tagData.success) {
          setTags(tagData.data.item);
        }
    }, [tagData]);
    const [selectedTags, tagboxes] = useCheckboxExtendedUpdate(tags, 4, 'Tags', 'tags', handleDeleteTagConfirmation, handleEditTagConfirmation, handleAddTagConfirmation, formData.preSelectedTags);
    
    const { data: dataUpdated, updateResource } = useResourceUpdate(BASE_URL, `posts/by`, id, formData, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateItem = {
            PostName: formData.postname,
            Snippet: formData.snippet,
            PostContent: postDescription,
            PostLink: formData.postlink,
            DefaultImage: [defaultImage],
            Images: images,
            Categories: selectedCategories,
            Tags: selectedTags,
        };
        await updateResource(updateItem, '/dashboard/blog/posts');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="Edit Post" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Post Name"
                        name="postname"
                        value={formData.postname}
                        onChange={handleChange}
                        placeholder="A blog post title"
                        width="md:w-2/3"
                        error={dataUpdated.error?.PostName}
                    />
                    <DashboardInput
                        label="Post Slug"
                        name="postlink"
                        value={formData.postlink}
                        onChange={handleChange}
                        placeholder="A short url for the post"
                        width="md:w-1/3"
                        error={dataUpdated.error?.PostLink}
                    />
                </DashboardInputWrapper>
                <DashboardInputWrapper>
                    <DashboardTextArea
                        label="Post Snippet"
                        name="snippet"
                        value={formData.snippet}
                        onChange={handleChange}
                        placeholder="A short snippet description of the post"
                        width="md:w-2/3"
                        error={dataUpdated.error?.Snippet}
                    />
                </DashboardInputWrapper>
                <PrimaryEditor 
                    editorInstanceHandler={editorInstanceHandler}
                    editorConfig={{
                        menubar: false,
                        selector: "postdescription",
                        height: 500,
                    }}
                    initialValue={formData.initialContent}
                    error={dataUpdated.error?.PostContent}
                />
                {!categoryData.loading && !categoryData.error && (
                    <div className="grid gap-4">
                        {categoryboxes}
                    </div>
                )}
                {!tagData.loading && !tagData.error && (
                    <div className="grid gap-4">
                        {tagboxes}
                    </div>
                )}
                <DashboardMediaGroup
                    handleFileInputChange={handleFileInputChange}
                    isUploadDisabled={isUploadDisabled}
                    dataUploaded={dataUploaded}
                    handleIconClick={handleIconClick}
                    handleModalOpen={handleModalOpen}
                    fileInputRef={fileInputRef}
                    defaultImage={defaultImage}
                    iconText={`Max Images (${limit})`}
                />
                <DashboardMediaModal url ={BASE_URL} id="media" setDefaultImage={setDefaultImage} setImages={setImages} showModal={showModal} setShowModal={setShowModal} images={images} defaultImage={defaultImage} />
                <DashboardButtonGroup 
                    onSubmit={handleSubmit} 
                    onGoBack={handleGoBack} 
                    loading={dataUpdated.loading}
                />
            </DashboardFormWrapper>
            <DashboardMediaDelete
                itemName={selectedCategory?.label}
                item={selectedCategory}
                deleteData={deleteCategoryData}
                handleDeletion={handleCategoryDeletion}
                handleCancel={handleCategoryCancel}
                showModal={showRemoveCategoryModal}
            />
            <DashboardMediaDelete
                itemName={selectedTag?.label}
                item={selectedTag}
                deleteData={deleteTagData}
                handleDeletion={handleTagDeletion}
                handleCancel={handleTagCancel}
                showModal={showRemoveTagModal}
            />
            <AddCategoryModal
                createData={createCategoryData}
                handleChange={handleAddCategoryChange}
                handleCreate={handleCreateCategory}
                handleAddCancel={handleAddCategoryCancel}
                showAddModal={showAddCategoryModal}
                createFormData={createCategoryFormData}
            />
            <AddTagModal
                createData={createTagData}
                handleChange={handleAddTagChange}
                handleCreate={handleCreateTag}
                handleAddCancel={handleAddTagCancel}
                showAddModal={showAddTagModal}
                createFormData={createTagFormData}
            />
            <EditCategoryModal
                item={selectedCategory}
                updateData={updateCategoryData}
                handleChange={handleEditCategoryChange}
                handleUpdate={handleCategoryUpdate}
                handleEditCancel={handleEditCategoryCancel}
                showEditModal={showEditCategoryModal}
                updateFormData={updateCategoryFormData}
            />
            <EditTagModal
                item={selectedTag}
                updateData={updateTagData}
                handleChange={handleEditTagChange}
                handleUpdate={handleTagUpdate}
                handleEditCancel={handleEditTagCancel}
                showEditModal={showEditTagModal}
                updateFormData={updateTagFormData}
            />
        </DashboardContainerWrapper>
    );
}
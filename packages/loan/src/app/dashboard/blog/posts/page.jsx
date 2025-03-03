'use client';

import { useState } from 'react';
import { DashboardAddNewItem, DashboardAdvancedCard, DashboardAdvancedCardSkeleton, DashboardLimit, DashboardMediaDelete, DashboardOrder, DashboardPagination, DashbordSearchbar } from 'kifanga-ui-nav';

import { usePostList } from '@/hooks';
import { limits, orders } from '@/data/filter';

export default function Posts() {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const {
        data,
        deleteData,
        filters,
        sortOrder,
        page,
        limit,
        search,
        totalPages,
        handleFilterChange,
        handleSortOrderChange,
        handleDeletion,
        handleSearchChange,
        handleLimitChange,
        handlePageChange,
        goToFirstPage,
        goToPreviousPage,
        goToNextPage,
        goToLastPage,
      } = usePostList(setShowModal, setSelectedItem);

    const handleCancel = () => {
        deleteData.error = "";
        setSelectedItem(null);
        setShowModal(false);
    };
    
    const handleDeleteConfirmation = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

  return (
    <div className="px-4">
        <DashboardAddNewItem title='Add New Post' link='/dashboard/blog/posts/new' loading={data.loading} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <DashbordSearchbar placeholder='Search for Posts' search={search} change={handleSearchChange} />
            <DashboardLimit limit={limit} change={handleLimitChange} options={limits} loading={data.loading} />
            <DashboardOrder order={sortOrder} change={handleSortOrderChange} options={orders} loading={data.loading} />
        </div>
        {data.loading && <DashboardAdvancedCardSkeleton limit={limit}/>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data?.items?.map(item => (
                <DashboardAdvancedCard 
                    key={item.id} 
                    item={item}
                    onDelete={handleDeleteConfirmation}
                    editLink={`/dashboard/blog/posts/edit/${item.id}`}
                    viewLink={`/blog/${item.slug}`}
                />
            ))}
        </div>

        <DashboardPagination
            data={data}
            goToFirstPage={goToFirstPage}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
            goToLastPage={goToLastPage}
            page={page}
            totalPages={totalPages}
        />
        <DashboardMediaDelete
            itemName={selectedItem?.title}
            item={selectedItem}
            deleteData={deleteData}
            handleDeletion={handleDeletion}
            handleCancel={handleCancel}
            showModal={showModal}
        />
    </div>
  );
}
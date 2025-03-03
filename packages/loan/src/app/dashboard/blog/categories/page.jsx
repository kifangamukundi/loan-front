'use client';

import { useState } from 'react';
import { DashboardAddNewItem, DashboardGenericCard, DashboardGenericCardSkeleton, DashboardLimit, DashboardMediaDelete, DashboardOrder, DashboardPagination, DashbordSearchbar } from 'kifanga-ui-nav';

import { useCategoryList } from '@/hooks';
import { limits, orders } from '@/data/filter';

export default function Categories() {
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
      } = useCategoryList(setShowModal, setSelectedItem);

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
        <DashboardAddNewItem title='Add New Category' link='/dashboard/blog/categories/new' loading={data.loading} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <DashbordSearchbar placeholder='Search for Categories' search={search} change={handleSearchChange} />
            <DashboardLimit limit={limit} change={handleLimitChange} options={limits} loading={data.loading} />
            <DashboardOrder order={sortOrder} change={handleSortOrderChange} options={orders} loading={data.loading} />
        </div>
        {data.loading && <DashboardGenericCardSkeleton limit={limit} view={false} />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data?.items?.map(item => (
                <DashboardGenericCard 
                    key={item.id} 
                    item={item}
                    onDelete={handleDeleteConfirmation}
                    editLink={`/dashboard/blog/categories/edit/${item.id}`}
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
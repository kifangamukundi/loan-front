'use client';

import { useState } from 'react';
import { DashboardAddNewItem, DashboardGenericCard, DashboardGenericCardSkeleton, DashboardLimit, DashboardMediaDelete, DashboardOrder, DashboardPagination, DashboardSwitch, DashboardTable, DashbordSearchbar } from 'kifanga-ui-nav';

import { useWardList } from '@/hooks';
import { limits, orders } from '@/data/filter';

export default function Wards() {
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
      } = useWardList(setShowModal, setSelectedItem);

    const handleCancel = () => {
        deleteData.error = "";
        setSelectedItem(null);
        setShowModal(false);
    };
    
    const handleDeleteConfirmation = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const [isTableView, setIsTableView] = useState(true);

    const columns = [
        {
            header: 'Ward',
            accessor: 'title',
        },
    ];

  return (
    <div className="px-4">
        <DashboardAddNewItem title='Add New Ward' link='/dashboard/data/wards/new' loading={data.loading} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <DashbordSearchbar placeholder='Search for Wards' search={search} change={handleSearchChange} />
            <DashboardLimit limit={limit} change={handleLimitChange} options={limits} loading={data.loading} />
            <DashboardOrder order={sortOrder} change={handleSortOrderChange} options={orders} loading={data.loading} />
            <DashboardSwitch isTableView={isTableView} change={setIsTableView} loading={data.loading} />
        </div>
        {data.loading && <DashboardGenericCardSkeleton limit={limit} view={false} />}

        {isTableView ? (
            <DashboardTable
                data={data?.data?.items || []}
                columns={columns}
                onDelete={handleDeleteConfirmation}
                editLink={`/dashboard/data/wards/edit`}
            />
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.data?.items?.map((item) => (
                    <DashboardGenericCard 
                        key={item.id} 
                        item={item}
                        onDelete={handleDeleteConfirmation}
                        editLink={`/dashboard/data/wards/edit/${item.id}`}
                    />
                ))}
            </div>
        )}

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
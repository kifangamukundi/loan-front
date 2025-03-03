'use client';

import { useState } from 'react';
import { DashboardAddNewItem, DashboardGenericCard, DashboardGenericCardSkeleton, DashboardLimit, DashboardMediaDelete, DashboardOrder, DashboardPagination, DashbordSearchbar } from 'kifanga-ui-nav';
import { useParams } from 'next/navigation';
import { useLoanList } from '@/hooks';
import { limits, orders } from '@/data/filter';

export default function MemberLoans() {
    const { groupId, memberId } = useParams();
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
      } = useLoanList(setShowModal, setSelectedItem, groupId, memberId);

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
            <DashboardAddNewItem title='Add New Loan' link={`/dashboard/field-work/groups/group/members/${groupId}/${memberId}/new`} loading={data.loading} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <DashbordSearchbar placeholder='Search for Members' search={search} change={handleSearchChange} />
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
                        editLink={`/dashboard/field-work/groups/group/members/${groupId}/edit/${item.id}`}
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
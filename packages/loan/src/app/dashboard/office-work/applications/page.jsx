'use client';

import { useState } from 'react';
import { DashboardGenericCard, DashboardGenericCardSkeleton, DashboardLimit, DashboardMediaDelete, DashboardOrder, DashboardPagination, DashbordSearchbar } from 'kifanga-ui-nav';

import { useApplicationList } from '@/hooks';
import { limits, orders } from '@/data/filter';
import Link from 'next/link';

export default function LoanApplications() {
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
      } = useApplicationList(setShowModal, setSelectedItem);

    const handleCancel = () => {
        deleteData.error = "";
        setSelectedItem(null);
        setShowModal(false);
    };

  return (
    <div className="px-4">

        <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 mb-4 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between">
            <div>
            <h1 className="text-2xl md:text-3xl font-bold uppercase">
                Loan Applications
            </h1>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <DashbordSearchbar placeholder='Search for loans' search={search} change={handleSearchChange} />
            <DashboardLimit limit={limit} change={handleLimitChange} options={limits} loading={data.loading} />
            <DashboardOrder order={sortOrder} change={handleSortOrderChange} options={orders} loading={data.loading} />
        </div>
        {data.loading && <DashboardGenericCardSkeleton limit={limit} view={false} />}
        
        <div className="space-y-2">
            {data?.data?.items?.map((item) => (
                <div
                key={item.id}
                className="bg-white p-2 rounded-lg border border-b border-gray-200 shadow-sm transition-shadow duration-300"
                >
                <div className="grid md:grid-cols-4 gap-6">
    
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-gray-500 text-sm font-medium">Loan ID</p>
                            <p className="text-lg font-semibold text-gray-800 mt-1">#{item.id}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-gray-500 text-sm font-medium">Loan Amount</p>
                            <p className="text-lg font-semibold text-gray-800 mt-1">Kes {item.amount}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-gray-500 text-sm font-medium">Agent</p>
                            <p className="text-lg font-semibold text-gray-800 mt-1">
                            {item.agentF} {item.agentL}
                            </p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-gray-500 text-sm font-medium">Member</p>
                            <p className="text-lg font-semibold text-gray-800 mt-1">
                            {item.memberF} {item.memberL}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-gray-500 text-sm font-medium">Term</p>
                            <p className="text-lg font-semibold text-gray-800 mt-1">
                                {item.term} days
                            </p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-gray-500 text-sm font-medium">Created</p>
                            <p className="text-lg font-semibold text-gray-800 mt-1">
                                {new Date(item.created).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-end justify-end">
                        <Link href={`/dashboard/office-work/applications/view/${item.id}`}>
                            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105">
                            View Details
                            </button>
                        </Link>
                    </div>
                </div>
                </div>
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
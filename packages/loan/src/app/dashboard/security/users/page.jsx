'use client';

import { DashboardAddNewItem, DashboardGenericCard, DashboardGenericCardSkeleton, DashboardLimit, DashboardOrder, DashboardPagination, DashboardSwitch, DashboardTable, DashbordSearchbar } from 'kifanga-ui-nav';

import { useUserList } from '@/hooks';
import { limits, orders } from '@/data/filter';
import { useState } from 'react';

export default function Users() {

    const {
        data,
        filters,
        sortOrder,
        page,
        limit,
        search,
        totalPages,
        handleFilterChange,
        handleSortOrderChange,
        handleSearchChange,
        handleLimitChange,
        goToFirstPage,
        goToPreviousPage,
        goToNextPage,
        goToLastPage,
      } = useUserList();
      
        const [isTableView, setIsTableView] = useState(true);

        const columns = [
                {
                    header: 'User',
                    accessor: 'title',
                },
        ];

  return (
    <div className="px-4">
        <DashboardAddNewItem />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <DashbordSearchbar placeholder='Search for Users' search={search} change={handleSearchChange} />
            <DashboardLimit limit={limit} change={handleLimitChange} options={limits} loading={data.loading} />
            <DashboardOrder order={sortOrder} change={handleSortOrderChange} options={orders} loading={data.loading} />
            <DashboardSwitch isTableView={isTableView} change={setIsTableView} loading={data.loading} />
        </div>
        {data.loading && <DashboardGenericCardSkeleton limit={limit} view={false} del={false} />}
      
        {isTableView ? (
            <DashboardTable
                data={data?.data?.items || []}
                columns={columns}
                editLink={`/dashboard/security/users/edit`}
            />
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.data?.items?.map((item) => (
                    <DashboardGenericCard 
                        key={item.id} 
                        item={item}
                        editLink={`/dashboard/security/users/edit/${item.id}`}
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
    </div>
  );
}
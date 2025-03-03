'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { DashboardCircleSpinner, DashboardButtonGroup, DashboardContainerWrapper, DashboardHeading } from 'kifanga-ui-nav';

export default function UnAuthorizedAccess() {
    const router = useRouter();
    
    const handleGoHome = () => {
        router.push('/');
    };
  return (
    <div className="max-w-md mx-auto my-auto">
        <DashboardContainerWrapper>
            <DashboardHeading title="Access Denied" />
            <DashboardCircleSpinner />
            <DashboardButtonGroup onSubmit={handleGoHome} type='button' submitLabel='Back to the homepage' width='w-full' />
        </DashboardContainerWrapper>
    </div>
  )
}
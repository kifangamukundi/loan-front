'use client';

import { useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { useActivate } from 'kifanga-ui-hooks';
import { DashboardCircleSpinner, DashboardAroundSpinner, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInputWrapper } from 'kifanga-ui-nav';
import { BASE_URL } from '@/helpers';

export default function Activate() {
    const router = useRouter();
    const { token, id } = useParams();
    const { data: userActivated, activateUser } = useActivate(BASE_URL, 'users/activate-account');

    const handleActivation = useCallback(async () => {
        try {
            await activateUser(token, id);
            router.replace('/login');
        } catch (error) {
            console.error("Activation error:", error);
        }
    }, [token, id, activateUser, router]);

    useEffect(() => {
        handleActivation();
    }, [handleActivation]);

    return (
        <div className="max-w-md mx-auto my-auto">
          <DashboardContainerWrapper>
            <DashboardHeading title="Account Activation" />
            {/* {userActivated.error && !userActivated.loading && <Messages>{userActivated.error}</Messages>} */}
            <DashboardFormWrapper>
              <DashboardAroundSpinner loading={userActivated.loading}>
                <DashboardCircleSpinner color='green' />
              </DashboardAroundSpinner>
            </DashboardFormWrapper>
          </DashboardContainerWrapper>
        </div>
    );
}
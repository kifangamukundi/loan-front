'use client'

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { useReset } from 'kifanga-ui-hooks';
import { DashboardAroundSpinner, DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { BASE_URL } from '@/helpers';

export default function Reset() {
    const router = useRouter();
    const { token, id } = useParams();

    const [formData, setFormData] = useState({
        password: '',
        confirmpassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const { data: userReseted, resetUser } = useReset(BASE_URL, 'users/reset-password');

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmpassword) {
            alert("Passwords do not match!");
            setFormData({ password: '', confirmpassword: '' });
            return;
        }        
        const backUser = {
            Password: formData.password,
        };
        await resetUser(backUser, token, id, '/login');
    }, [formData, token, id, resetUser, router]);

    useEffect(() => {
        if (userReseted.success) {
            router.replace('/login');
        }
    }, [userReseted.success, router]);

  return (
    <div className="max-w-md mx-auto my-auto">
      <DashboardContainerWrapper>
        <DashboardHeading title="Change Password" />
        {/* {userReseted.error && !userReseted.loading && <Messages>{userReseted.error}</Messages>} */}
        <DashboardFormWrapper>
          <DashboardAroundSpinner loading={userReseted.loading}>
            <DashboardInputWrapper>
              <DashboardInput
                label="Password"
                type='password'
                name="password"
                value={formData.password}
                onChange={handleChange}
                width="md:w-1/1"
                error={userReseted.error?.Password}
              />
            </DashboardInputWrapper>
            <DashboardInputWrapper>
              <DashboardInput
                label="Confirm Password"
                type='password'
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
                width="md:w-1/1"
                error={userReseted.error?.Password}
              />
            </DashboardInputWrapper>
          </DashboardAroundSpinner>
          <DashboardButtonGroup onSubmit={handleSubmit} type='button' submitLabel='Change password' width='w-full' loading={userReseted.loading} />
        </DashboardFormWrapper>
      </DashboardContainerWrapper>
    </div>
  )
}
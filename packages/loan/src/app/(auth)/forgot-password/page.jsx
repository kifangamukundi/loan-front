'use client'

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useForgotPassword } from 'kifanga-ui-hooks';
import { DashboardAroundSpinner, DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { BASE_URL } from '@/helpers';

export default function ForgotPassword() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const { data: userReseted, resetUser } = useForgotPassword(BASE_URL, 'users/forgot-password');

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const backUser = {
            Email: formData.email,
        };
        await resetUser(backUser, '/login');
    }, [formData, userReseted]);

    useEffect(() => {
        if (userReseted.success) {
            router.replace('/login');
        }
    }, [userReseted.success, router]);

  return (
    <div className="max-w-md mx-auto my-auto">
      <DashboardContainerWrapper>
        <DashboardHeading title="Forgot Password" />
        {/* {userReseted.error && !userReseted.loading && <Messages>{userReseted.error}</Messages>} */}
        <DashboardFormWrapper>
          <DashboardAroundSpinner loading={userReseted.loading}>
            <DashboardInputWrapper>
              <DashboardInput
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@gmail"
                width="md:w-1/1"
                error={userReseted.error?.Email}
              />
            </DashboardInputWrapper>
          </DashboardAroundSpinner>
          <DashboardButtonGroup onSubmit={handleSubmit} type='button' submitLabel='Reset Password' width='w-full' loading={userReseted.loading} />
          <div className="mt-4 flex justify-between">
            <Link href="/login">
              <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-100 transition duration-200">
                Sign In to Your Account
              </button>
            </Link>
            <Link href="/register">
              <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-100 transition duration-200">
                Create an account
              </button>
            </Link>
          </div>
        </DashboardFormWrapper>
      </DashboardContainerWrapper>
    </div>
  )
}
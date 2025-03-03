'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

import { useLogin } from 'kifanga-ui-hooks';
import { DashboardAroundSpinner, DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { BASE_URL } from '@/helpers';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { data: userCreated, createUser } = useLogin(BASE_URL, 'users/login');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const backUser = {
      Email: formData.email,
      Password: formData.password,
    };
    const intendedDestination = localStorage.getItem('intendedDestination');
    await createUser(backUser, intendedDestination);
  }, [formData, createUser]);

  // This fixed the menus not showing after login; investigate later why that is the case
  useEffect(() => {
    if (userCreated.success) {
      const intendedDestination = localStorage.getItem('intendedDestination');
      if (intendedDestination) {
        localStorage.removeItem('intendedDestination');
        window.location.href = intendedDestination;
      } else {
        window.location.href = '/';
      }
    }
  }, [userCreated.success]);
  

  return (
    <div className="max-w-md mx-auto my-auto">
      <DashboardContainerWrapper>
        <DashboardHeading title="Login" />
        {/* {userCreated.error && !userCreated.loading && <Messages>{userCreated.error}</Messages>} */}
        <DashboardFormWrapper>
          <DashboardAroundSpinner loading={userCreated.loading}>
            <DashboardInputWrapper>
              <DashboardInput
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@gmail"
                width="md:w-1/1"
                error={userCreated.error?.Email}
              />
            </DashboardInputWrapper>
            <DashboardInputWrapper>
              <DashboardInput
                label="Password"
                type='password'
                name="password"
                value={formData.password}
                onChange={handleChange}
                width="md:w-1/1"
                error={userCreated.error?.Password}
              />
            </DashboardInputWrapper>
          </DashboardAroundSpinner>
          <DashboardButtonGroup onSubmit={handleSubmit} type='button' submitLabel='Login' width='w-full' loading={userCreated.loading} />
          <div className="mt-4 flex justify-between">
            <Link href="/register">
              <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-100 transition duration-200">
                Create an account
              </button>
            </Link>
            <Link href="/forgot-password">
              <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-100 transition duration-200">
                Forgot Password?
              </button>
            </Link>
          </div>
        </DashboardFormWrapper>
      </DashboardContainerWrapper>
    </div>
  );
}
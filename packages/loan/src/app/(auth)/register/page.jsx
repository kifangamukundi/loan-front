'use client'

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useRegister } from 'kifanga-ui-hooks';
import { DashboardAroundSpinner, DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper } from 'kifanga-ui-nav';
import { BASE_URL } from '@/helpers';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        mobilenumber: '',
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
    
    const { data: userRegistered, registerUser } = useRegister(BASE_URL, 'users/register');

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const newUser = {
            FirstName: formData.firstname,
            LastName: formData.lastname,
            MobileNumber: formData.mobilenumber,
            Email: formData.email,
            Password: formData.password,
        };
        const intendedDestination = localStorage.getItem('intendedDestination');
        await registerUser(newUser, intendedDestination);
    }, [formData, registerUser]);

    useEffect(() => {
        if (userRegistered.success) {
        const intendedDestination = localStorage.getItem('intendedDestination');
        if (intendedDestination) {
            localStorage.removeItem('intendedDestination');
            router.replace(intendedDestination);
        } else {
            router.replace('/login');
        }
        }
    }, [userRegistered.success, router]);

  return (
    <div className="max-w-md mx-auto my-auto">
      <DashboardContainerWrapper>
        <DashboardHeading title="Register" />
        {/* {userRegistered.error && !userRegistered.loading && <Messages>{userRegistered.error}</Messages>} */}
        <DashboardFormWrapper>
          <DashboardAroundSpinner loading={userRegistered.loading}>
            <DashboardInputWrapper>
              <DashboardInput
                label="First Name"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="John"
                width="md:w-1/1"
                error={userRegistered.error?.FirstName}
              />
            </DashboardInputWrapper>
            <DashboardInputWrapper>
              <DashboardInput
                label="Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Doe"
                width="md:w-1/1"
                error={userRegistered.error?.LastName}
              />
            </DashboardInputWrapper>
            <DashboardInputWrapper>
              <DashboardInput
                label="Email"
                type='email'
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@gmail.com"
                width="md:w-1/1"
                error={userRegistered.error?.Email}
              />
            </DashboardInputWrapper>
            <DashboardInputWrapper>
              <DashboardInput
                label="Mobile Number"
                name="mobilenumber"
                value={formData.mobilenumber}
                onChange={handleChange}
                placeholder="+2547123456789"
                width="md:w-1/1"
                error={userRegistered.error?.MobileNumber}
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
                error={userRegistered.error?.Password}
              />
            </DashboardInputWrapper>
          </DashboardAroundSpinner>
          <DashboardButtonGroup onSubmit={handleSubmit} type='button' submitLabel='Register' width='w-full' loading={userRegistered.loading} />
          <div className="mt-4 flex justify-between">
            <Link href="/login">
              <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-100 transition duration-200">
                Sign In to Your Account
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
  )
}
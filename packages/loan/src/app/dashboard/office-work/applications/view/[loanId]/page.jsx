'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useResourceSingle, useResourceUpdateLoan } from 'kifanga-ui-hooks';
import { DashboardCircleSpinner, DashboardContainerWrapper } from 'kifanga-ui-nav';
import { useRouter, useParams } from 'next/navigation';

export default function ViewLoan() {
    const { loanId } = useParams();
    const { data } = useResourceSingle(BASE_URL, 'loans/by', loanId);

    const [formData, setFormData] = useState({
        ID: '',
        Amount: '',
        Interest: '',
        Term: '',
        DefaultImage: '',
        Images: '',
        LoanPurpose: '',
        Status: '',
        DueDate: '',
        LastPaymentDate: '',
        RemainingBalance: '',
        AgentFirstName: '',
        AgentLastName: '',
        GroupName: '',
        MemberFirstName: '',
        MemberLastName: '',
        CreatedAt: '',
        UpdatedAt: '',
    });    
      
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (data?.data) {
            const { item } = data.data;
            setFormData(prev => ({
                ...prev,
                ID: item?.ID || '',
                Amount: item?.Amount || '',
                Interest: item?.Interest || '',
                Term: item?.Term || '',
                DefaultImage: item?.DefaultImage || {},
                Images: item?.Images || [],
                LoanPurpose: item?.LoanPurpose || '',
                Status: item?.Status || '',
                DueDate: item?.DueDate || 'N/A',
                LastPaymentDate: item?.LastPaymentDate || 'N/A',
                RemainingBalance: item?.RemainingBalance || 0,
                AgentFirstName: item?.AgentFirstName || '',
                AgentLastName: item?.AgentLastName || '',
                GroupName: item?.GroupName || '',
                MemberFirstName: item?.MemberFirstName || '',
                MemberLastName: item?.MemberLastName || '',
                CreatedAt: item?.CreatedAt || '',
                UpdatedAt: item?.UpdatedAt || '',
            }));
        }
    }, [data]);
    
    const { approveData, approveLoan, rejectData, rejectLoan } = useResourceUpdateLoan(BASE_URL, `loans/by`, loanId);

    const handleApprove = async (e) => {
        e.preventDefault();
        await approveLoan('/dashboard/office-work/applications');
    };

    const handleReject = async (e) => {
        e.preventDefault();
        await rejectLoan('/dashboard/office-work/applications');
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 mb-4 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between">
                <div>
                <h1 className="text-2xl md:text-3xl font-bold uppercase">
                    Loan Details #{formData.ID}
                </h1>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <p className="text-gray-500 text-sm">Loan Amount</p>
                    <p className="text-xl font-bold text-gray-800">Kes {formData.Amount}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <p className="text-gray-500 text-sm">Interest Rate</p>
                    <p className="text-xl font-bold text-gray-800">{formData.Interest}%</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <p className="text-gray-500 text-sm">Term Length</p>
                    <p className="text-xl font-bold text-gray-800">{formData.Term} days</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <p className="text-gray-500 text-sm">Remaining Balance</p>
                    <p className="text-xl font-bold text-gray-800">
                    Kes {formData.RemainingBalance}
                    </p>
                </div>
                </div>
                <div className="space-y-4">
                <div
                    className={`p-4 rounded-lg shadow ${
                    formData.Status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : formData.Status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                >
                    <p className="text-sm">Loan Status</p>
                    <p className="text-xl font-bold">{formData.Status.toUpperCase()}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <p className="text-gray-500 text-sm">Due Date</p>
                    <p className="text-xl font-bold text-gray-800">{formData.DueDate}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <p className="text-gray-500 text-sm">Last Payment</p>
                    <p className="text-xl font-bold text-gray-800">
                    {formData.LastPaymentDate}
                    </p>
                </div>
                </div>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-gray-500 text-sm">Member</p>
                <p className="text-lg font-bold text-gray-800">{formData.MemberFirstName} {formData.MemberLastName}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-gray-500 text-sm">Group</p>
                <p className="text-lg font-bold text-gray-800">{formData.GroupName}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-gray-500 text-sm">Agent</p>
                <p className="text-lg font-bold text-gray-800">{formData.AgentFirstName} {formData.AgentLastName}</p>
                </div>
            </div>

            <div className="mt-6 bg-blue-100 p-4 rounded-lg shadow">
                <p className="text-gray-500 text-sm">Loan Purpose</p>
                <p className="text-lg font-bold text-gray-800">{formData.LoanPurpose}</p>
            </div>

            {formData.Status === "pending" ? (
                <div className="mt-6 flex gap-4">
                    <button
                        onClick={handleApprove}
                        className={`bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition ${
                            approveData.loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                        }`}
                        disabled={approveData.loading}
                    >
                        {approveData.loading ? (
                            <DashboardCircleSpinner color='white' />
                        ) : (
                            '✅ Approve Loan'
                        )}
                    </button>
                    <button
                        onClick={handleReject}
                        className={`bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-md transition ${
                            rejectData.loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                        }`}
                        disabled={rejectData.loading}
                    >
                        {rejectData.loading ? (
                            <DashboardCircleSpinner color='white' />
                        ) : (
                            '❌ Reject Loan'
                        )}
                    </button>
                </div>
            ) : (
                <div className="mt-6 p-4 rounded-lg shadow bg-gray-50 text-gray-700">
                    <p className="text-lg font-bold">Loan is {formData.Status.toUpperCase()}</p>
                </div>
            )}

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-500 text-sm items-center">
                <p className="text-center sm:text-left">
                    Created: {new Date(formData.CreatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
                <p className="text-center sm:text-left">
                    Updated: {new Date(formData.UpdatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
                <div className="flex justify-center sm:justify-end">
                    <button
                        onClick={handleGoBack}
                        className={`bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg shadow-md transition ${
                            approveData.loading || rejectData.loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
                        }`}
                        disabled={approveData.loading || rejectData.loading}
                    >
                        {rejectData.loading || approveData.loading ? (
                            <DashboardCircleSpinner color='white' />
                        ) : (
                            '< Back'
                        )}
                    </button>
                </div>
            </div>

        </DashboardContainerWrapper>
    );
}
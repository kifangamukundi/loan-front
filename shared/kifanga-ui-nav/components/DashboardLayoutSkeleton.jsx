'use client';

import { IconClose } from "kifanga-ui-icons";
import React, { useState } from "react";

const DashboardLayoutSkeleton = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen relative bg-white overflow-hidden">
        <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-64 bg-white text-gray-600 flex flex-col z-40 lg:relative lg:translate-x-0 lg:z-auto`}>
            <div className="flex items-center justify-between h-16 px-4 animate-pulse">
                <div className="h-8 w-32 bg-gray-200 rounded"></div>
                    <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                        <IconClose className="h-6 w-6 text-gray-600 animate-pulse" />
                    </button>
                </div>
                <nav className="flex-1 px-4 py-6">
                    {[...Array(5)].map((_, index) => (
                        <div
                        key={index}
                        className="flex items-center mb-4 p-2 rounded bg-gray-200 animate-pulse"
                        >
                        <div className="h-6 w-6 bg-gray-300 rounded mr-3"></div>
                        <div className="h-4 w-32 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </nav>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="bg-white h-16 flex items-end justify-end px-6 animate-pulse">
                    <div className="flex items-center">
                        <div className="h-6 w-32 bg-gray-300 rounded"></div>
                    </div>
                </div>
                <main className="flex-1 p-6">
                    <div className="px-4 h-full bg-gray-200 rounded-lg animate-pulse"></div>
                </main>
            </div>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-200 bg-opacity-50 z-30 animate-pulse"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
    </div>
  );
};

export default DashboardLayoutSkeleton;
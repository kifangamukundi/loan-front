'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function LimitSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialLimit = parseInt(searchParams.get('limit')) || 10;

  const [limit, setLimit] = useState(initialLimit);

  const handleLimitChange = (value) => {
    setLimit(value);
    updateURL(value);
  };

  const updateURL = (value) => {
    const sp = new URLSearchParams(searchParams.toString());
    
    // Update or set the limit
    if (value) {
      sp.set('limit', value.toString());
    } else {
      sp.delete('limit');
    }
    
    // Reset the page to 1 when limit changes
    sp.set('page', '1'); 
    
    router.push(`${pathname}?${sp.toString()}`);
  };

  // Sync local state with URL on mount
  useEffect(() => {
    setLimit(initialLimit);
  }, [initialLimit]);

  return (
    <select
      className="block w-full rounded-lg border border-gray-200 bg-white text-gray-900 px-4 py-2 leading-6 outline-none transition duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      value={limit} 
      onChange={(e) => handleLimitChange(e.target.value)} 
    >
      <option value={5}>5</option>
      <option value={8}>8</option>
      <option value={11}>11</option>
      <option value={14}>14</option>
      <option value={17}>17</option>
      <option value={20}>20</option>
    </select>
  );
}

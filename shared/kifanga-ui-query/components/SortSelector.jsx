'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SortSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialSortOrder = searchParams.get('sortOrder') || '';

  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const handleSortChange = (value) => {
    setSortOrder(value);
    updateURL(value);
  };

  const updateURL = (value) => {
    const sp = new URLSearchParams(searchParams.toString());
    
    // Update or set the sort order
    if (value) {
      sp.set('sortOrder', value);
    } else {
      sp.delete('sortOrder');
    }
    
    // Reset the page to 1 when sort order changes
    sp.set('page', '1'); 

    router.push(`${pathname}?${sp.toString()}`);
  };

  useEffect(() => {
    setSortOrder(initialSortOrder); // Sync state with URL on mount
  }, [initialSortOrder]);

  return (
    <select
      className="block w-full rounded-lg border border-gray-200 bg-white text-gray-900 px-4 py-2 leading-6 outline-none transition duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      value={sortOrder} 
      onChange={(e) => handleSortChange(e.target.value)}
    >
      <option value="asc">Asc</option>
      <option value="desc">Dsc</option>
    </select>
  );
}
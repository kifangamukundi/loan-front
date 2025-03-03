'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'kifanga-ui-hooks';
import { useEffect, useState } from 'react';

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);

  const debounceSearch = useDebounce((value) => {
    handleSearch(value);
  }, 10);

  function handleSearch(value) {
    const sp = new URLSearchParams(searchParams.toString());
    
    // Update search parameter
    if (value.trim() === '') {
      sp.delete('search');
    } else {
      sp.set('search', value);
    }

    // Reset the page to 1 when search input changes
    sp.set('page', '1'); 

    router.push(`${pathname}?${sp.toString()}`);
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
    debounceSearch(e.target.value);
  };

  useEffect(() => {
    setSearch(initialSearch); // Sync state with URL on mount
  }, [initialSearch]);

  return (
    <input
      type="search"
      className="block w-full rounded-lg border border-gray-200 bg-white text-gray-900 px-4 py-2 leading-6 outline-none transition duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      placeholder="Search for posts...."
      value={search}
      onChange={handleChange}
    />
  );
}

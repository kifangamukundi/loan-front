'use client';

import React, { useEffect } from 'react';
import { useSpotify, useSpotifyShowList } from '@/hooks';
import Link from 'next/link';
import { DashboardAdvancedCardSkeleton, DashboardPodcastCard } from 'kifanga-ui-nav';

export default function SpotifyShows() {
  const {
    spotifyInfo,
    SPOTIFY_AUTH_URL,
  } = useSpotify();

  // Use useSpotifyShowList hook
  const { data } = useSpotifyShowList({
    isLoggedIn: spotifyInfo?.isLoggedIn,
    accessToken: spotifyInfo?.accessToken,
  });

  useEffect(() => {
    if (spotifyInfo?.isLoggedIn && data.success) {
      // Additional logic if needed
    }
  }, [spotifyInfo?.isLoggedIn, data.success]);

  return (
    <div className="px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {!spotifyInfo?.isLoggedIn && (
          <div>
            <h2 className="text-xl font-bold mb-4">Log in with Spotify to continue</h2>
            <Link href={SPOTIFY_AUTH_URL}>
              <button className="bg-green-500 text-white py-2 px-4 rounded">
                Login With Spotify
              </button>
            </Link>
          </div>
        )}
      </div>
      {data.error && <p className="text-red-500">Error: {data.error.message}</p>}
      {data.loading && <DashboardAdvancedCardSkeleton limit={6} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data?.shows?.map(item => (
          <DashboardPodcastCard
            key={item.id}
            item={item}
            viewLink={`/dashboard/podcast/spotify/episodes/${item.id}`}
          />
        ))}
      </div>
    </div>
  );
}

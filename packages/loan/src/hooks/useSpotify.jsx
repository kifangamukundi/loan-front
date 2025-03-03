'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const BACKEND_URL = 'http://localhost:8080/api/spotify';

function useSpotify() {
  const [spotifyInfo, setSpotifyInfo] = useState(() => {
    // Initialize with localStorage data if available
    const savedInfo = localStorage.getItem('spotifyInfo');
    return savedInfo ? JSON.parse(savedInfo) : null;
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  // Refresh the access token via the backend
  const refreshAccessToken = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/refresh`, { method: 'POST' });
      if (!response.ok) throw new Error('Failed to refresh token');

      const data = await response.json();
      const updatedInfo = {
        ...spotifyInfo,
        accessToken: data.accessToken,
        expiresIn: data.expiresIn,
      };
      setSpotifyInfo(updatedInfo);
      localStorage.setItem('spotifyInfo', JSON.stringify(updatedInfo));

      return true;
    } catch (error) {
      console.error('Failed to refresh access token:', error.message);
      handleLogout();
      return false;
    }
  };

  // Logout user and clear localStorage
  const handleLogout = () => {
    setSpotifyInfo(null);
    localStorage.removeItem('spotifyInfo');
    router.push('/dashboard/podcast/spotify'); // Redirect to login page
  };

  // Handle Spotify callback and store tokens
  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    const expiresIn = searchParams.get('expires_in');

    if (accessToken && refreshToken && expiresIn) {
      const spotifyData = {
        accessToken,
        refreshToken,
        expiresIn: Number(expiresIn),
        timestamp: Date.now(), // Track token retrieval time
        isLoggedIn: true,
      };

      setSpotifyInfo(spotifyData);
      localStorage.setItem('spotifyInfo', JSON.stringify(spotifyData));

      // Remove query params from URL
      router.replace('/dashboard/podcast/spotify');
    }
  }, [searchParams]);

  // Automatically refresh token if expired
  useEffect(() => {
    if (spotifyInfo) {
      const { accessToken, expiresIn, timestamp } = spotifyInfo;
      const isExpired = Date.now() - timestamp > expiresIn * 1000;

      if (isExpired) {
        refreshAccessToken();
      }
    }
  }, [spotifyInfo]);

  return {
    spotifyInfo,
    SPOTIFY_AUTH_URL: `${BACKEND_URL}/create`,
    handleLogout,
    refreshAccessToken,
  };
}

export default useSpotify;
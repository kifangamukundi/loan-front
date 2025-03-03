'use client';

import { useParams } from "next/navigation";
import { BASE_URL } from "@/helpers";
import { useResourceSinglePost } from "kifanga-ui-hooks";

import { DashboardEpisodeCard, DashboardAdvancedCardSkeleton } from 'kifanga-ui-nav';
import { useRef, useState } from "react";
import { useSpotify } from "@/hooks";

export default function SpotifyShow() {
  const { id } = useParams();
  const { spotifyInfo } = useSpotify();

  const { data: dataFetchedEpisodes, loading } = useResourceSinglePost(BASE_URL, "spotify/episodes", id, spotifyInfo?.accessToken);

  const showDetails = dataFetchedEpisodes?.data;

  // State to manage which episode is currently playing and its progress
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  // Handle play/pause
  const handlePlayPause = (episodeId, audioUrl) => {
    if (audioRef.current && currentPlayingId === episodeId) {
      audioRef.current.pause();
      audioRef.current = null;
      setCurrentPlayingId(null);
      setProgress(0);
    } else {
      if (audioRef.current) audioRef.current.pause(); // Pause currently playing audio
      const newAudio = new Audio(audioUrl);
      newAudio.play();
      newAudio.onended = () => {
        setCurrentPlayingId(null);
        audioRef.current = null;
        setProgress(0);
      };
      newAudio.ontimeupdate = () => {
        const currentProgress = (newAudio.currentTime / newAudio.duration) * 100;
        setProgress(currentProgress);
      };
      audioRef.current = newAudio;
      setCurrentPlayingId(episodeId);
    }
  };

  return (
    <div className="px-4">
      {/* Show Details */}
      {showDetails && (
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="border rounded shadow p-4">
            <img
              src={showDetails.image}
              alt={showDetails.title}
              className="w-full h-48 object-cover rounded-t mb-4"
            />
            <h1 className="text-gray-800 text-xl font-bold">{showDetails.title}</h1>
            <p className="text-gray-600 mt-2">{showDetails.description}</p>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && <DashboardAdvancedCardSkeleton limit={6} />}

      {/* Episode List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {showDetails?.episodes?.map((episode) => (
          <DashboardEpisodeCard
            key={episode.id}
            episode={episode}
            isPlaying={currentPlayingId === episode.id}
            onPlayPause={handlePlayPause}
            progress={currentPlayingId === episode.id ? progress : 0}
          />
        ))}
      </div>
    </div>
  );
}
'use client';

import { useEffect, useRef } from "react";
import { IconPlay, IconPause } from "kifanga-ui-icons";

const DashboardEpisodeCard = ({ episode, isPlaying, onPlayPause, progress }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handlePlayPause = (id, url) => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current = new Audio(url);
      audioRef.current.play();
    }
    onPlayPause(id, url);
  };

  return (
    <div className="border rounded shadow mb-4 flex flex-col h-full">
      {/* Use the first image in the `images` array as the episode cover */}
      <img
        src={episode.images?.[0]?.url || "default-placeholder.jpg"}
        alt={episode.name}
        className="w-full h-48 object-cover rounded-t"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-gray-700 text-lg font-semibold">{episode.name}</h2>
        <p className="text-gray-500 text-sm mt-2">{episode.release_date}</p>
        <p className="text-gray-500 text-sm mt-1">
          {Math.floor(episode.duration_ms / 60000)} min
        </p>
      </div>
      <div className="mt-4 flex justify-center p-4 border-t">
        {episode.audio_preview_url ? (
          <button
            onClick={() => handlePlayPause(episode.id, episode.audio_preview_url)}
            className="text-gray-600 hover:underline hover:text-green-600 flex items-center"
          >
            {isPlaying ? (
              <>
                <IconPause className="h-5 w-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <IconPlay className="h-5 w-5 mr-2" />
                Play Preview
              </>
            )}
          </button>
        ) : (
          <p className="text-gray-500 text-sm">Preview not available</p>
        )}
      </div>
      <div
        className="h-1 bg-green-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default DashboardEpisodeCard;
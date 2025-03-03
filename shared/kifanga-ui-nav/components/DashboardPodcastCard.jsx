'use client';

import Link from "next/link";
import { IconView } from "kifanga-ui-icons";

const DashboardPodcastCard = ({ item, viewLink }) => {
  return (
    <div className="border rounded shadow mb-4 flex flex-col h-full">
      <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-t" />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-gray-700 text-lg font-semibold">{item.title}</h2>
        <p className="text-gray-500 text-sm mt-2">
          {item.episodes} {item.episodes === 1 ? 'episode' : 'episodes'}
        </p>
      </div>
      <div className="mt-4 flex justify-between p-4 border-t">
        {viewLink && (
          <Link href={viewLink}>
            <button className="text-gray-600 hover:underline hover:text-green-600">
              <IconView className="h-5 w-5" />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DashboardPodcastCard;

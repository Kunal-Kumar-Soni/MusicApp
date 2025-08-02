import PlaylistSongsCard from "./PlaylistSongsCard";
import usePlaylist from "../../hooks/usePlaylist";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Music } from "lucide-react";

function PlaylistSongs() {
  const { playlistsName } = usePlaylist();
  const { name } = useParams();
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  const selectedData = playlistsName.find((curData) => curData.name === name);

  return (
    <div className="space-y-4 px-4 pt-20 lg:pl-65 min-h-[60vh]">
      {/* Heading */}
      <div className="mt-6 mb-10 text-center">
        <h1 className="block bg-clip-text bg-gradient-to-r from-indigo-500 dark:from-indigo-400 to-purple-500 dark:to-purple-400 font-bold text-transparent text-3xl sm:text-4xl capitalize leading-tight tracking-tight">
          {name}
        </h1>
        <div className="bg-gray-300 dark:bg-zinc-600 mx-auto mt-3 mb-4 rounded-full w-20 h-[2px]" />
      </div>

      {selectedData?.songs?.length === 0 ? (
        <div className="flex flex-col justify-center items-center px-6 py-12 rounded-xl text-center transition-all">
          <div className="bg-pink-100 dark:bg-pink-900 shadow-sm mb-5 p-4 rounded-full animate-pulse">
            <Music size={30} className="text-pink-500 dark:text-pink-400" />
          </div>
          <p className="font-semibold text-gray-700 dark:text-gray-200 text-xl">
            No songs in "{name}" playlist yet
          </p>
          <p className="mt-2 max-w-xs text-gray-500 dark:text-gray-400 text-sm">
            Add songs in this playlist
          </p>
        </div>
      ) : (
        selectedData?.songs?.map((song, index) => {
          return (
            <PlaylistSongsCard
              key={index}
              song={song}
              index={index}
              isOpen={index === menuOpenIndex}
              setMenuOpenIndex={setMenuOpenIndex}
              playlist={selectedData}
            />
          );
        })
      )}
    </div>
  );
}

export default PlaylistSongs;

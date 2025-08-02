import { useState } from "react";
import useFavoriteSongs from "../../hooks/useFavoriteSongs";
import FavoriteSongsCard from "./FavoriteSongsCard";
import { FaHeart } from "react-icons/fa";

function Favorite() {
  const { favoriteSongs } = useFavoriteSongs();
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  return (
    <div className="space-y-4 px-4 pt-20 lg:pl-65 min-h-[60vh]">
      {/* Heading */}
      <div className="mt-6 mb-10 text-center">
        <h1 className="block bg-clip-text bg-gradient-to-r from-indigo-500 dark:from-indigo-400 to-purple-500 dark:to-purple-400 font-bold text-transparent text-3xl sm:text-4xl capitalize leading-tight tracking-tight">
          Favorites
        </h1>
        <div className="bg-gray-300 dark:bg-zinc-600 mx-auto mt-3 mb-4 rounded-full w-20 h-[2px]" />
      </div>

      {favoriteSongs.length === 0 ? (
        <div className="flex flex-col justify-center items-center px-6 py-12 rounded-xl text-center transition-all">
          <div className="bg-pink-100 dark:bg-pink-900 shadow-sm mb-5 p-4 rounded-full animate-pulse">
            <FaHeart size={30} className="text-pink-500 dark:text-pink-400" />
          </div>
          <p className="font-semibold text-gray-700 dark:text-gray-200 text-xl">
            No favorite songs yet
          </p>
          <p className="mt-2 max-w-xs text-gray-500 dark:text-gray-400 text-sm">
            Tap the heart icon on any song to add it to your favorites.
          </p>
        </div>
      ) : (
        favoriteSongs.map((song, index) => {
          return (
            <FavoriteSongsCard
              key={index}
              song={song}
              index={index}
              isOpen={index === menuOpenIndex}
              setMenuOpenIndex={setMenuOpenIndex}
            />
          );
        })
      )}
    </div>
  );
}

export default Favorite;

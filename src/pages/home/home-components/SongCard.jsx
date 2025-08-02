import { EllipsisVertical, Play } from "lucide-react";
import decodeHtmlEntities from "../../../utils/decodeHtmlEntities";
import useFavoriteSongs from "../../../hooks/useFavoriteSongs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddToPlaylistDropdown from "../../../components/AddToPlaylistDropdown";
import usePlayMusic from "../../../hooks/usePlayMusic";

function SongCard({ song, index, isOpen, setMenuOpenIndex, onPlay }) {
  const { addToFavorite } = useFavoriteSongs();
  const navigation = useNavigate();
  const [showPlayListDropdown, setShowPlayListDropdown] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleFavorite = (song) => {
    addToFavorite(song);
    setMenuOpenIndex(null);
    navigation("/favorite");
  };

  const handleSongDetails = (songId) => {
    navigation(`/song/details/${songId}`);
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg rounded-md overflow-visible transition-transform duration-300 cursor-pointer">
      {/* Image Section */}
      <div
        onClick={() => onPlay(song)}
        className="group relative rounded-t-md w-full h-[180px] overflow-hidden"
      >
        <img
          src={song.image[2].url}
          alt={song.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Play Icon */}
        <div className="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 group-active:opacity-100 group-hover:opacity-100 transition">
          <Play size={40} className="text-white" />
        </div>
      </div>

      {/* Bottom Section with Song Name and Menu */}
      <div className="group relative flex gap-4 p-3">
        <h3
          onClick={() => handleSongDetails(song.id)}
          className="pr-8 font-semibold text-[15px] text-gray-900 hover:text-blue-600 active:text-blue-600 dark:hover:text-blue-400 dark:text-white hover:underline active:underline line-clamp-1 leading-snug transition-all duration-200 cursor-pointer"
        >
          {decodeHtmlEntities(song.name)}
        </h3>

        {/* Menu Button */}
        <div className="top-3 right-3 absolute">
          <button
            onClick={toggleMenu}
            className="flex items-center text-gray-600 hover:text-gray-900 dark:hover:text-gray-300 dark:text-gray-100 active:scale-95 cursor-pointer"
          >
            <EllipsisVertical size={20} />
          </button>
        </div>

        {/* Main Dropdown Menu */}
        {isOpen && (
          <div className="top-10 right-0 z-50 absolute bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-md sm:w-35 smallest:w-28 lg:w-40">
            {/* Add to Playlist Button */}
            <button
              onClick={() => setShowPlayListDropdown((prev) => !prev)}
              className="block hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 w-full text-gray-700 sm:text-[15px] smallest:text-[12px] dark:text-gray-200 lg:text-sm text-center cursor-pointer"
            >
              Add to Playlist
            </button>

            {/* Playlist Sub-Dropdown */}
            {showPlayListDropdown && (
              <div className="top-full left-0 z-50 absolute">
                <AddToPlaylistDropdown
                  song={song}
                  onClose={() => {
                    setMenuOpenIndex(null);
                    setShowPlayListDropdown(false);
                  }}
                />
              </div>
            )}

            {/* Divider Line */}
            <div className="border-gray-200 dark:border-gray-600 border-t"></div>

            {/* Add to Favorite Button */}
            <button
              onClick={() => handleFavorite(song)}
              className="block hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 w-full text-gray-700 sm:text-[15px] smallest:text-[12px] dark:text-gray-200 text-sm text-center cursor-pointer"
            >
              Add to Favorite
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SongCard;

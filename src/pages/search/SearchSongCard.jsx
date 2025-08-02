import { EllipsisVertical, Play } from "lucide-react";
import formatDuration from "../../utils/formatDuration";
import decodeHtmlEntities from "../../utils/decodeHtmlEntities";
import useFavoriteSongs from "../../hooks/useFavoriteSongs";
import { useNavigate } from "react-router-dom";
import AddToPlaylistDropdown from "../../components/AddToPlaylistDropdown";
import { useState } from "react";
import usePlayMusic from "../../hooks/usePlayMusic";

function SearchSongCard({ song, index, isOpen, setMenuOpenIndex, songs }) {
  const { addToFavorite } = useFavoriteSongs();
  const navigation = useNavigate();
  const [showPlayListDropdown, setShowPlayListDropdown] = useState(false);
  const { setPlayMusicSong, setPlayMusicSongLists } = usePlayMusic();

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
    <div
      onClick={() => handleSongDetails(song.id)}
      className="relative flex justify-between items-center gap-6 bg-light hover:bg-gray-200 dark:hover:bg-gray-600 dark:bg-dark p-4 border border-gray-300 dark:border-zinc-800 rounded-lg w-full overflow-visible text-gray-900 dark:text-gray-100 transition-all duration-200 cursor-pointer"
    >
      {/* Left: Image + Title & Artist */}
      <div className="flex items-center gap-4">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setPlayMusicSong(song);
            setPlayMusicSongLists(songs);
          }}
          className="relative w-14 h-14 overflow-hidden shrink-0"
        >
          <img
            src={song.image[2].url}
            alt={song.name}
            className="rounded w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 hover:opacity-100 active:opacity-100 transition">
            <Play size={30} className="text-white" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-sm sm:text-base line-clamp-2">
            {decodeHtmlEntities(song.name)}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            {song.primaryArtists}
          </p>
        </div>
      </div>

      {/* Right: Duration + Menu */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
          {formatDuration(song.duration)}
        </p>

        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex items-center text-gray-600 hover:text-black dark:hover:text-white dark:text-gray-300 transition cursor-pointer"
          >
            <EllipsisVertical size={25} />
          </button>

          {/* Main Dropdown Menu */}
          {isOpen && (
            <div className="top-10 right-0 z-50 absolute bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-md sm:w-35 smallest:w-28 lg:w-40">
              {/* Add to Playlist Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPlayListDropdown((prev) => !prev);
                }}
                className="block hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 w-full text-gray-700 sm:text-[15px] smallest:text-[12px] dark:text-gray-200 lg:text-sm text-center"
              >
                Add to Playlist
              </button>

              {/* Playlist Sub-Dropdown */}
              {showPlayListDropdown && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="top-full left-0 z-50 absolute"
                >
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(song);
                }}
                className="block hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 w-full text-gray-700 sm:text-[15px] smallest:text-[12px] dark:text-gray-200 text-sm text-center"
              >
                Add to Favorite
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchSongCard;

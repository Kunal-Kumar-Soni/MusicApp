import formatDuration from "../../utils/formatDuration";
import decodeHtmlEntities from "../../utils/decodeHtmlEntities";
import { EllipsisVertical, Play } from "lucide-react";
import useFavoriteSongs from "../../hooks/useFavoriteSongs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import usePlayMusic from "../../hooks/usePlayMusic";

function FavoriteSongsCard({ song, index, isOpen, setMenuOpenIndex }) {
  const { removeFromFavorite } = useFavoriteSongs();
  const navigation = useNavigate();
  const { favoriteSongs } = useFavoriteSongs();
  const { setPlayMusicSong, setPlayMusicSongLists } = usePlayMusic();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleRemove = (id) => {
    removeFromFavorite(id);
    setMenuOpenIndex(null);
    toast.error(`Removed "${decodeHtmlEntities(song.name)}" from favorites`);
  };

  const handleSongDetails = (songId) => {
    navigation(`/song/details/${songId}`);
  };

  return (
    <div
      onClick={() => handleSongDetails(song.id)}
      className="flex justify-between items-center gap-6 bg-light hover:bg-gray-200 dark:hover:bg-gray-600 dark:bg-dark p-4 border border-gray-300 dark:border-zinc-800 rounded-lg w-full text-gray-900 dark:text-gray-100 transition-all duration-200 cursor-pointer"
    >
      {/* Left: Image + Title & Artist */}
      <div className="flex items-center gap-4">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setPlayMusicSong(song);
            setPlayMusicSongLists(favoriteSongs);
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
            <EllipsisVertical size={27} />
          </button>

          {isOpen && (
            <div className="top-full right-0 z-30 absolute bg-white dark:bg-gray-800 shadow-lg mt-2 border border-gray-200 dark:border-zinc-700 rounded-md w-26 overflow-hidden">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(song.id);
                }}
                className="hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 w-full text-sm text-center transition cursor-pointer"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoriteSongsCard;

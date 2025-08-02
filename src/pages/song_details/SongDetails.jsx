import { Play, EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSongById } from "../../api/api";
import formatDuration from "../../utils/formatDuration";
import { GoHeart, GoHeartFill } from "react-icons/go";
import SongDetailsSkeleton from "../../ui/SongDetailsSkeleton";
import decodeHtmlEntities from "../../utils/decodeHtmlEntities";
import AddToPlaylistDropdown from "../../components/AddToPlaylistDropdown";
import useFavoriteSongs from "../../hooks/useFavoriteSongs";
import { toast } from "react-toastify";
import usePlayMusic from "../../hooks/usePlayMusic";

function SongDetails() {
  const { id } = useParams();
  const [songDetails, setSongDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [openMenuDropdown, setOpenMenuDropdown] = useState(false);
  const [openPlaylistsDropdown, setOpenPlaylistsDropdown] = useState(false);
  const { alreadyAdded, addToFavorite, removeFromFavorite } =
    useFavoriteSongs();
  const { setPlayMusicSong } = usePlayMusic();

  const fetchSongDetails = async () => {
    try {
      setIsLoading(true);
      const res = await getSongById(id);
      setSongDetails(res.data[0]);
    } catch (error) {
      console.log(error);
      setSongDetails(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSongDetails();
  }, [id]);

  const isFavorite = alreadyAdded(songDetails.id);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFromFavorite(songDetails.id);
      toast.error(
        `Removed "${decodeHtmlEntities(songDetails.name)}" from favorites`,
        { toastId: "remove-fav" } // prevent repeat
      );
    } else {
      addToFavorite(songDetails);
    }
  };

  if (isLoading)
    return (
      <div className="px-4 pt-24 lg:pl-64">
        <SongDetailsSkeleton />
      </div>
    );

  return (
    <div className="flex justify-center items-start px-4 pt-24 lg:pl-64 min-h-[60vh] text-gray-900 dark:text-white">
      <div className="bg-light dark:bg-dark shadow-xl p-6 md:p-10 rounded-3xl w-full max-w-5xl transition-all duration-300">
        <div className="flex md:flex-row flex-col items-center md:items-start gap-10">
          {/* Thumbnail */}
          <div className="relative shrink-0">
            <img
              src={songDetails.image?.[2]?.url}
              alt={songDetails.name}
              className="shadow-md border-2 border-white dark:border-gray-700 rounded-2xl w-48 sm:w-56 h-48 sm:h-56 object-cover"
            />
            <span className="right-2 -bottom-2 absolute bg-black/70 shadow-md backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">
              {songDetails.language?.toUpperCase()}
            </span>
          </div>

          {/* Song Details */}
          <div className="flex-1 space-y-4 md:text-left text-center">
            <h2 className="font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl tracking-tight">
              {decodeHtmlEntities(songDetails?.name)}
            </h2>

            <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              <p>
                <span className="font-semibold">Album:</span>{" "}
                {decodeHtmlEntities(songDetails.album?.name)}
              </p>
              <p>
                <span className="font-semibold">Year:</span> {songDetails.year}
              </p>
              <p>
                <span className="font-semibold">Artists:</span>{" "}
                {songDetails?.artists?.primary[0]?.name || "No data"}
              </p>
              <p>
                <span className="font-semibold">Duration:</span>{" "}
                {formatDuration(songDetails.duration)} min
              </p>
              <p>
                <span className="font-semibold">Label:</span>{" "}
                {songDetails.label}
              </p>
              {songDetails.releaseDate && (
                <p>
                  <span className="font-semibold">Release Date:</span>{" "}
                  {songDetails.releaseDate}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <button
                onClick={() => setPlayMusicSong(songDetails)}
                title="Play"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-full font-medium text-white transition cursor-pointer"
              >
                <Play size={18} />
                Play
              </button>

              {/* ❤️ Heart Button */}
              <button
                onClick={handleFavorite}
                title="Favorite"
                className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full w-10 h-10 text-gray-700 dark:text-gray-300 transition cursor-pointer"
              >
                {isFavorite ? (
                  <GoHeartFill className="text-red-500" size={22} />
                ) : (
                  <GoHeart size={22} />
                )}
              </button>

              <div className="relative">
                {/* ⋮ Menu Button */}
                <button
                  title="Menu"
                  onClick={() => setOpenMenuDropdown(!openMenuDropdown)}
                  className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full w-10 h-10 text-gray-700 dark:text-gray-300 transition cursor-pointer"
                >
                  <EllipsisVertical size={18} />
                </button>

                {/* Dropdown Menu - same as SongCard style */}
                {openMenuDropdown && (
                  <div className="top-12 right-0 z-30 absolute bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-md sm:w-35 smallest:w-28 lg:w-40">
                    {/* Add to Playlist Button */}
                    <button
                      onClick={() =>
                        setOpenPlaylistsDropdown(!openPlaylistsDropdown)
                      }
                      className="block hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 w-full text-gray-700 sm:text-[15px] smallest:text-[12px] dark:text-gray-200 lg:text-sm text-center cursor-pointer"
                    >
                      Add to Playlist
                    </button>

                    {/* Playlist Sub-Dropdown */}
                    {openPlaylistsDropdown && (
                      <div className="top-full left-0 z-50 absolute">
                        <AddToPlaylistDropdown
                          song={songDetails}
                          onClose={() => {
                            setOpenPlaylistsDropdown(false);
                            setOpenMenuDropdown(false);
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {songDetails.description && (
          <div className="mt-10 text-gray-800 dark:text-gray-300 text-sm leading-relaxed">
            <h3 className="mb-2 font-semibold text-lg">About this Song</h3>
            <p className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
              {songDetails.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SongDetails;

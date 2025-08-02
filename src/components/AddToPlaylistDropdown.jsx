import usePlaylist from "../hooks/usePlaylist";

function AddToPlaylistDropdown({ song, onClose }) {
  const { playlistsName, addSongToPlaylist } = usePlaylist();

  return (
    <div className="z-50 bg-gray-100 dark:bg-gray-700 shadow-md mt-1 border border-gray-300 dark:border-gray-600 rounded-md w-32 sm:w-35 smallest:w-27 lg:w-40 max-h-23 overflow-y-auto animate-fadeIn custom-scrollbar">
      {playlistsName.length === 0 ? (
        <div className="space-y-2 px-3 py-3 text-gray-500 dark:text-gray-300 text-sm text-left">
          <h1 className="font-semibold text-[13px] text-gray-700 dark:text-gray-100 sm:text-sm text-center">
            No Playlists
          </h1>
        </div>
      ) : (
        playlistsName.map((playlist) => (
          <button
            key={playlist.id}
            onClick={() => {
              addSongToPlaylist(playlist, song);
              onClose();
            }}
            className="block hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 border-b border-b-gray-400 last:border-b-0 w-full text-gray-800 sm:text-[15px] smallest:text-[12px] dark:text-gray-200 text-sm text-center transition-colors cursor-pointer"
          >
            {playlist.name}
          </button>
        ))
      )}
    </div>
  );
}

export default AddToPlaylistDropdown;

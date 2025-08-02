import { Ellipsis, EllipsisVertical, ListMusic, Plus } from "lucide-react";
import usePlaylist from "../../hooks/usePlaylist";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import RemovePlaylistModal from "./RemovePlaylistModal";

function Playlist({ setIsOpenPlaylistModal }) {
  const { playlistsName, setPlaylistsName } = usePlaylist();
  const navigation = useNavigate();
  const [isOpenRemovePlaylistModal, setIsOpenRemovePlaylistModal] =
    useState(false);
  const [curModalId, setCurModalId] = useState(null);
  const [curPlaylistName, setCurPlaylistName] = useState("");
  const [dropdownId, setDropdownId] = useState(null);

  const handlePlaylist = (playlistName) => {
    navigation(`/playlist/${playlistName}`);
  };

  const handleToggleMenu = (e, playlistId) => {
    e.stopPropagation();
    setDropdownId((prev) => (prev === playlistId ? null : playlistId));
  };

  const handleClose = (e, id, name) => {
    e.stopPropagation();
    setCurModalId(id);
    setCurPlaylistName(name);
    setIsOpenRemovePlaylistModal(true);
  };

  return (
    <div className="px-4 pt-20 lg:pl-65 min-h-[60vh]">
      {/* Heading */}
      <div className="mt-6 mb-10 text-center">
        <h1 className="block bg-clip-text bg-gradient-to-r from-indigo-500 dark:from-indigo-400 to-purple-500 dark:to-purple-400 font-bold text-transparent text-3xl sm:text-4xl capitalize leading-tight tracking-tight">
          Playlists
        </h1>
        <div className="bg-gray-300 dark:bg-dark mx-auto mt-3 mb-4 rounded-full w-20 h-[2px]" />
      </div>

      {playlistsName?.length === 0 ? (
        <div className="flex flex-col justify-center items-center px-6 py-12 rounded-xl text-center transition-all">
          <div className="bg-pink-100 dark:bg-pink-900 shadow-sm mb-5 p-4 rounded-full animate-pulse">
            <ListMusic size={30} className="text-pink-500 dark:text-pink-400" />
          </div>
          <p className="font-semibold text-gray-700 dark:text-gray-200 text-xl">
            No playlist yet
          </p>
          <p className="mt-2 max-w-xs text-gray-500 dark:text-gray-400 text-sm">
            Add songs in this playlist
          </p>
        </div>
      ) : (
        <div className="gap-4 grid md:grid-cols-2">
          {playlistsName?.map((playlistName) => (
            <div
              key={playlistName.id}
              onClick={() => handlePlaylist(playlistName.name)}
              className="relative flex items-center gap-4 bg-white dark:bg-dark hover:shadow-md p-4 border border-gray-200 dark:border-zinc-700 rounded-xl transition-all cursor-pointer"
            >
              {/* Remove Button (top-right corner) */}
              <button
                onClick={(e) => handleToggleMenu(e, playlistName.id)}
                title="Remove playlist"
                className="top-3 right-2 absolute text-gray-600 hover:text-black dark:hover:text-white dark:text-gray-300 text-xl transition cursor-pointer"
              >
                <EllipsisVertical />
              </button>

              {/* dropdown menu */}
              {playlistName.id === dropdownId && (
                <div className="top-10 right-3 z-30 absolute bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-zinc-700 rounded-lg w-26">
                  <button
                    onClick={(e) =>
                      handleClose(e, playlistName.id, playlistName.name)
                    }
                    className="block hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded w-full text-gray-700 dark:text-gray-100 text-sm text-left transition cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Playlist Icon */}
              <div className="flex justify-center items-center bg-gray-200 dark:bg-zinc-800 rounded-full w-16 h-16 font-bold text-gray-700 dark:text-white text-xl uppercase">
                {playlistName.name[0]}
              </div>

              {/* Playlist Info */}
              <div className="flex flex-col overflow-hidden">
                <h2 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg truncate uppercase">
                  {playlistName.name}
                </h2>
                <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">
                  {playlistName?.songs?.length} songs
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Divider */}
      <hr className="my-8 border-gray-300 dark:border-zinc-700" />

      {/* Create Playlist UI */}
      <div className="p-4">
        <button
          onClick={() => setIsOpenPlaylistModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-md mx-auto px-5 py-2.5 rounded-full font-medium text-white transition-all duration-200 cursor-pointer"
        >
          <Plus size={18} />
          Create Playlist
        </button>
      </div>

      {/* removePlaylistModal */}
      <RemovePlaylistModal
        isOpenRemovePlaylistModal={isOpenRemovePlaylistModal}
        setIsOpenRemovePlaylistModal={setIsOpenRemovePlaylistModal}
        curPlaylistName={curPlaylistName}
        curModalId={curModalId}
      />
    </div>
  );
}

export default Playlist;

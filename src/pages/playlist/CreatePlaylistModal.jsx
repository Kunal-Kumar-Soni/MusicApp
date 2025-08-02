import { AnimatePresence, motion } from "framer-motion";
import { X, Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import usePlaylist from "../../hooks/usePlaylist";
import { useNavigate } from "react-router-dom";

function CreatePlaylistModal({ isOpenPlaylistModal, setIsOpenPlaylistModal }) {
  const { playlistText, setPlaylistText, addPlayList } = usePlaylist();
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleCreatePlaylist = (e) => {
    e.preventDefault();

    addPlayList(playlistText);
    setPlaylistText("");
    setIsOpenPlaylistModal(false);
    navigate("/playlist");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpenPlaylistModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenPlaylistModal]);

  useEffect(() => {
    if (isOpenPlaylistModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpenPlaylistModal]);

  useEffect(() => {
    if (isOpenPlaylistModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpenPlaylistModal]);

  return (
    <AnimatePresence>
      {isOpenPlaylistModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4"
          style={{ pointerEvents: "auto" }}
        >
          <motion.form
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300 }}
            onSubmit={handleCreatePlaylist}
            ref={modalRef}
            className="relative bg-white dark:bg-dark shadow-xl p-6 border border-gray-200 dark:border-zinc-700 rounded-2xl w-full max-w-md"
            style={{ pointerEvents: "auto" }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenPlaylistModal(false);
              }}
              className="top-4 right-4 absolute text-gray-500 hover:text-red-500 transition cursor-pointer"
            >
              <X size={22} />
            </button>

            {/* Modal Content */}
            <h2 className="mb-4 font-semibold text-gray-800 dark:text-white text-xl">
              Create New Playlist
            </h2>

            <input
              type="text"
              ref={inputRef}
              value={playlistText}
              onChange={(e) => setPlaylistText(e.target.value)}
              placeholder="Enter playlist name"
              className="dark:bg-slate-800 p-3 border border-gray-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-900 dark:text-white"
            />

            <button
              onTouchStart={() => console.log("Touched ✅")}
              type="submit"
              className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow mt-5 px-4 py-2.5 rounded-xl w-full font-medium text-white transition"
            >
              <Plus size={18} />
              Create Playlist
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CreatePlaylistModal;

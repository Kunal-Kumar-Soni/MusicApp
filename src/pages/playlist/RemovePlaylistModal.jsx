import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePlaylist from "../../hooks/usePlaylist";
import { toast } from "react-toastify";

function RemovePlaylistModal({
  isOpenRemovePlaylistModal,
  setIsOpenRemovePlaylistModal,
  curPlaylistName,
  curModalId,
}) {
  const modalRef = useRef(null);
  const { removeFromPlaylist } = usePlaylist();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpenRemovePlaylistModal(false);
      }
    }
    if (isOpenRemovePlaylistModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpenRemovePlaylistModal]);

  //handle delete
  const handleDelete = () => {
    removeFromPlaylist(curModalId);
    setIsOpenRemovePlaylistModal(false);
    toast.error(`Playlist "${curPlaylistName}" removed!`);
  };

  return (
    <AnimatePresence>
      {isOpenRemovePlaylistModal && (
        <motion.div
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className="bg-light dark:bg-dark shadow-lg p-6 rounded-xl w-[90%] max-w-sm text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="mb-2 font-semibold text-gray-800 dark:text-white text-xl">
              Delete Playlist?
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-medium text-red-500 uppercase">
                {curPlaylistName}
              </span>{" "}
              playlist?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setIsOpenRemovePlaylistModal(false)}
                className="hover:bg-gray-100 dark:hover:bg-zinc-700 px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg text-gray-800 dark:text-gray-200 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RemovePlaylistModal;

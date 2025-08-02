import { X, Home, Search, Heart, ListMusic, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

function RightSidebar({
  isOpenRightSideBar,
  setIsOpenRightSideBar,
  setIsOpenPlaylistModal,
}) {
  const library = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Browse", icon: Search, path: "/search" },
    { name: "Favorites", icon: Heart, path: "/favorite" },
    { name: "Playlists", icon: ListMusic, path: "/playlist" },
  ];

  const topSongs = ["Top Hindi", "Top Punjabi", "Top Romantic Hits"];

  return (
    <AnimatePresence>
      {isOpenRightSideBar && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden top-0 right-0 z-50 fixed bg-light dark:bg-[#0f172a] shadow-lg px-6 py-8 w-full h-full text-gray-900 dark:text-white transition-colors duration-300"
        >
          {/* Close Icon */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsOpenRightSideBar(false)}
              className="hover:opacity-80 text-gray-900 dark:text-white cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          {/* Menu Items */}
          <nav>
            <h1 className="mb-5 px-3 font-mono font-medium text-gray-700 dark:text-gray-400 text-lg uppercase">
              Library
            </h1>
            <div className="flex flex-col gap-1 font-medium text-gray-700 text-md dark:text-gray-300">
              {library.map((curLibrary, index) => {
                const Icon = curLibrary.icon;
                return (
                  <NavLink
                    onClick={() => setIsOpenRightSideBar(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-800 px-3 py-2 rounded-md transition ${
                        isActive
                          ? "text-indigo-500 font-semibold"
                          : "text-gray-700 dark:text-gray-300"
                      }`
                    }
                    to={curLibrary.path}
                    key={index}
                  >
                    <Icon size={18} /> {curLibrary.name}
                  </NavLink>
                );
              })}
              <button
                onClick={() => {
                  setIsOpenPlaylistModal(true);
                  setIsOpenRightSideBar(false);
                }}
                className="flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-800 px-3 py-2 rounded-md transition"
              >
                <Plus size={18} /> Create Playlist
              </button>
            </div>
          </nav>
          <div className="bg-slate-300 dark:bg-slate-600 my-6 w-full h-[1px]"></div>
          <nav className="">
            <h1 className="mb-5 px-3 font-mono font-medium text-gray-700 dark:text-gray-400 text-lg uppercase">
              Browse
            </h1>
            <div className="flex flex-col gap-1 font-medium text-gray-700 text-md dark:text-gray-300">
              {topSongs.map((curSong, index) => (
                <NavLink
                  onClick={() => setIsOpenRightSideBar(false)}
                  to={`/search/${curSong}`}
                  key={index}
                  className={({ isActive }) =>
                    `items-center hover:bg-gray-200 dark:hover:bg-gray-800 px-3 py-2 rounded-md transition ${
                      isActive
                        ? "text-indigo-500 font-semibold"
                        : "text-gray-600 dark:text-gray-300 "
                    }`
                  }
                >
                  {curSong}
                </NavLink>
              ))}
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RightSidebar;

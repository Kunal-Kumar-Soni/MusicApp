import { Home, Search, Heart, ListMusic, Plus, Compass } from "lucide-react";
import { NavLink } from "react-router-dom";

function LeftSidebar({ setIsOpenPlaylistModal }) {
  const library = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Browse", icon: Search, path: "/search" },
    { name: "Favorites", icon: Heart, path: "/favorite" },
    { name: "Playlists", icon: ListMusic, path: "/playlist" },
  ];

  const topSongs = ["Top Hindi", "Top Punjabi", "Top Romantic Hits"];

  return (
    <aside className="hidden top-16 left-0 z-40 fixed lg:flex flex-col gap-6 bg-light dark:bg-dark shadow-md dark:shadow-gray-800 p-4 w-60 h-screen">
      {/* Navigation Links */}
      <nav>
        <h1 className="mb-5 px-3 font-mono font-medium text-gray-700 dark:text-gray-400 text-lg uppercase">
          Library
        </h1>
        <div className="flex flex-col gap-1 font-medium text-gray-700 text-md dark:text-gray-300">
          {library.map((curLibrary, index) => {
            const Icon = curLibrary.icon;
            return (
              <NavLink
                key={index}
                to={curLibrary.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    isActive
                      ? "text-indigo-500 font-semibold"
                      : "text-gray-700 dark:text-gray-300"
                  }`
                }
              >
                <Icon size={18} />
                {curLibrary.name}
              </NavLink>
            );
          })}

          <button
            onClick={() => setIsOpenPlaylistModal(true)}
            className="flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-800 px-4 py-2 rounded-md transition"
          >
            <Plus size={18} /> Create Playlist
          </button>
        </div>
      </nav>
      <div className="bg-slate-300 dark:bg-slate-600 w-full h-[1px]"></div>
      <nav>
        <h1 className="mb-5 px-3 font-mono font-medium text-gray-700 dark:text-gray-400 text-lg uppercase">
          Browse
        </h1>
        <div className="flex flex-col gap-1 font-medium text-gray-700 text-md dark:text-gray-300">
          {topSongs.map((curSong, index) => (
            <NavLink
              to={`/search/${curSong}`}
              key={index}
              className={({ isActive }) =>
                `items-center hover:bg-gray-200 dark:hover:bg-gray-800 px-4 py-2 rounded-md transition ${
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
    </aside>
  );
}

export default LeftSidebar;

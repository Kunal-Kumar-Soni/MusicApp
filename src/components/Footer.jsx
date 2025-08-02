import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Footer() {
  const topArtists = [
    "Neha Kakkar",
    "Arijit Singh",
    "Badshah",
    "Lata Mangeshkar",
    "Darshan Raval",
  ];

  const topActors = [
    "Salman Khan",
    "Shahrukh Khan",
    "Hrithik Roshan",
    "Amitabh Bachchan",
    "Varun Dhawan",
  ];

  const devotional = [
    "Krishna Bhajan",
    "Hanuman Chalisa",
    "Durga Chalisa",
    "Gayatri Mantra",
    "Bhakti Geet",
  ];

  const topSongs = ["Top Hindi", "Top Punjabi", "Top Romantic Hits"];

  return (
    <footer className="bg-light dark:bg-dark mt-10 lg:ml-60 px-4 sm:px-8 pt-10 pb-70 lg:pb-50 text-gray-800 dark:text-gray-300 text-sm">
      <div className="mx-auto max-w-7xl">
        {/* Top Grid */}
        <div className="gap-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 pb-8 border-gray-300 dark:border-gray-700 border-b">
          <div>
            <h3 className="mb-5 pb-2 border-gray-300 dark:border-gray-700 border-b font-mono font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl uppercase">
              Top Artists
            </h3>

            <ul className="flex flex-col space-y-1">
              {topArtists.map((curArtist, index) => (
                <NavLink
                  to={`/search/${curArtist}`}
                  key={index}
                  className={({ isActive }) =>
                    `hover:underline ${
                      isActive
                        ? "text-indigo-500"
                        : "text-gray-600 dark:text-gray-300 hover:text-indigo-500"
                    }`
                  }
                >
                  {curArtist}
                </NavLink>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 pb-2 border-gray-300 dark:border-gray-700 border-b font-mono font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl uppercase">
              Top Actors
            </h3>
            <ul className="flex flex-col space-y-1">
              {topActors.map((curActor, index) => (
                <NavLink
                  to={`/search/${curActor}`}
                  key={index}
                  className={({ isActive }) =>
                    `hover:underline ${
                      isActive
                        ? "text-indigo-500"
                        : "text-gray-600 dark:text-gray-300 hover:text-indigo-500"
                    }`
                  }
                >
                  {curActor}
                </NavLink>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 pb-2 border-gray-300 dark:border-gray-700 border-b font-mono font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl uppercase">
              Devotional
            </h3>
            <ul className="flex flex-col space-y-1">
              {devotional.map((curDevotional, index) => (
                <NavLink
                  to={`/search/${curDevotional}`}
                  key={index}
                  className={({ isActive }) =>
                    `hover:underline ${
                      isActive
                        ? "text-indigo-500"
                        : "text-gray-600 dark:text-gray-300 hover:text-indigo-500"
                    }`
                  }
                >
                  {curDevotional}
                </NavLink>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 pb-2 border-gray-300 dark:border-gray-700 border-b font-mono font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl uppercase">
              Browse
            </h3>
            <ul className="flex flex-col space-y-1">
              {topSongs.map((curTopSongs, index) => (
                <NavLink
                  to={`/search/${curTopSongs}`}
                  key={index}
                  className={({ isActive }) =>
                    `hover:underline ${
                      isActive
                        ? "text-indigo-500"
                        : "text-gray-600 dark:text-gray-300 hover:text-indigo-500"
                    }`
                  }
                >
                  {curTopSongs}
                </NavLink>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex sm:flex-row flex-col justify-between items-center gap-4 sm:gap-0 mt-6 text-gray-600 dark:text-gray-400">
          <div className="text-sm sm:text-left text-center">
            © {new Date().getFullYear()} echoPlay Media Limited. All rights
            reserved.
          </div>
          <div className="flex items-center space-x-4 text-gray-700 dark:text-white">
            <span className="text-sm">Follow Us</span>
            <a
              href="http://www.linkedin.com/in/kunal-kumar-soni"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-5 h-5 hover:text-blue-800 cursor-pointer" />
            </a>
            <a
              href="https://x.com/KunalKumar_Soni"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-5 h-5 hover:text-sky-500 cursor-pointer" />
            </a>
            <a
              href="https://github.com/Kunal-Kumar-Soni"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-5 h-5 hover:text-gray-500 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

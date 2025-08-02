import { User, Moon, Search, Sun, Menu, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useSearchText from "../hooks/useSearchText";
import useVoiceRecognition from "../hooks/useVoiceRecognition";
import { toast } from "react-toastify";
import usePlayMusic from "../hooks/usePlayMusic";

function Navbar({ modes, setModes, setIsOpenRightSideBar }) {
  const navigation = useNavigate();
  const { searchText, setSearchText } = useSearchText();
  const { pauseMusic } = usePlayMusic();

  const handleDarkMode = () => {
    setModes((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogo = () => {
    navigation("/");
  };

  const handleSearchFn = (e) => {
    e.preventDefault();

    if (searchText.trim() === "") return;

    navigation(`/search/${searchText}`);
    setSearchText("");
  };

  const handleVoiceSearch = (transcript) => {
    if (transcript.trim() === "") return;
    setSearchText(transcript);
    navigation(`/search/${transcript}`);
  };

  const { listening, startListening } = useVoiceRecognition(
    handleVoiceSearch,
    pauseMusic
  );

  const handleLogin = () => {
    toast.info("This feature is not available yet", {
      toastId: "login-feature-disabled",
    });
  };

  return (
    <header className="top-0 left-0 z-50 fixed bg-light dark:bg-dark shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.05)] w-full">
      <div className="flex justify-between items-center mx-auto px-2 lg:px-6 h-16">
        {/* Logo */}
        <motion.div
          onClick={handleLogo}
          initial={{ opacity: 0, rotate: -15 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-1 lg:px-0 cursor-pointer"
        >
          <div className="rounded-full w-10 h-10">
            <img
              src="/images/music-icon.png"
              alt="echoPlay Logo"
              className="rounded-full w-full h-full object-contain"
            />
          </div>
          <h1 className="font-bold text-gray-800 dark:text-white text-xl tracking-wide">
            echo<span className="text-indigo-500">Play</span>
          </h1>
        </motion.div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center gap-2 mx-8 w-[70%]">
          {/* Input + Search Button (combined) */}
          <form onSubmit={handleSearchFn} className="relative flex flex-1">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search for songs, artists..."
              className="bg-white dark:bg-gray-800 shadow-sm px-5 py-2.5 rounded-l-full outline-none focus:ring-1 focus:ring-indigo-500 w-full text-gray-800 dark:text-white transition duration-200 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button className="bg-indigo-600 hover:bg-indigo-800 shadow-md px-5 rounded-r-full text-white transition duration-200 cursor-pointer">
              <Search size={18} />
            </button>
          </form>

          {/* Voice Button (Separate round icon) */}
          <button
            onClick={startListening}
            type="button"
            className={`relative ml-1 p-3 rounded-full text-white transition duration-200 cursor-pointer shadow-md
    ${
      listening
        ? "bg-red-600 animate-pulse"
        : "bg-indigo-600 hover:bg-indigo-800"
    }
  `}
            title="Voice Search"
          >
            {listening ? (
              <>
                <span className="top-0 right-0 absolute bg-red-400 rounded-full w-2 h-2 animate-ping"></span>
                <Mic size={18} className="animate-pulse" />
              </>
            ) : (
              <Mic size={18} />
            )}
          </button>
        </div>

        {/* Login and Dark Mode */}
        <div className="flex items-center divide-x divide-slate-300 dark:divide-slate-600">
          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="hidden lg:flex items-center gap-1 hover:bg-gray-200 dark:hover:bg-slate-800 px-3 py-2 text-gray-700 dark:text-white transition cursor-pointer"
          >
            <User size={22} />
            <span>Login</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={handleDarkMode}
            className="flex items-center gap-1 hover:bg-gray-200 dark:hover:bg-slate-800 px-3 py-2 lg:border-none text-gray-700 dark:text-white transition cursor-pointer"
          >
            {modes === "dark" ? <Sun size={22} /> : <Moon size={22} />}
            <span className="hidden lg:block">
              {modes === "dark" ? "Light" : "Dark"}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpenRightSideBar(true)}
            className="lg:hidden hover:bg-gray-200 dark:hover:bg-slate-800 px-3 py-2 text-gray-700 dark:text-white transition cursor-pointer"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

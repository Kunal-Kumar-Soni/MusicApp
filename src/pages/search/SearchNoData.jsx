import { Mic, Search } from "lucide-react";
import useSearchText from "../../hooks/useSearchText";
import { useNavigate } from "react-router-dom";
import useVoiceRecognition from "../../hooks/useVoiceRecognition";
import usePlayMusic from "../../hooks/usePlayMusic";

function SearchNoData() {
  const { searchText, setSearchText } = useSearchText();
  const navigation = useNavigate();
  const { pauseMusic } = usePlayMusic();

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

  return (
    <div className="px-4 pt-20 lg:pl-65 min-h-[60vh]">
      {/* Mobile Search Bar */}
      <div className="lg:hidden flex gap-2 mx-auto w-full md:w-[80%]">
        <form onSubmit={handleSearchFn} className="relative flex flex-1">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for songs, artists..."
            className="bg-light dark:bg-dark shadow-sm px-5 py-2.5 rounded-l-full outline-none focus:ring-1 focus:ring-indigo-500 w-full text-gray-800 dark:text-white transition placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button className="bg-indigo-600 hover:bg-indigo-800 shadow-md px-4 rounded-r-full text-white transition">
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

      {/* no data text */}
      <div className="flex flex-col justify-center items-center mt-20 px-4 text-gray-600 dark:text-gray-300 text-center">
        <div className="bg-light dark:bg-dark shadow-md mb-4 p-6 rounded-full">
          <Search
            size={32}
            className="text-blue-500 dark:text-blue-400 animate-pulse"
          />
        </div>

        <h2 className="font-bold text-gray-800 dark:text-gray-100 text-3xl">
          Start Searching
        </h2>

        <p className="mt-3 max-w-md text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Click the search icon above and type your favorite artist or song to
          get started.
        </p>
      </div>
    </div>
  );
}

export default SearchNoData;

import { Search, Mic, Music } from "lucide-react";
import { useEffect, useState } from "react";
import { getSongsByArtist } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import SearchSongCardSkeletonList from "../../ui/SearchSongCardSkeletonList";
import useSearchText from "../../hooks/useSearchText";
import useVoiceRecognition from "../../hooks/useVoiceRecognition";
import SearchSongCard from "./SearchSongCard";
import usePlayMusic from "../../hooks/usePlayMusic";

const LIMIT = 10;

function SongsBySearch() {
  const { query } = useParams();
  const [songs, setSongs] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const navigation = useNavigate();
  const { searchText, setSearchText } = useSearchText();
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const { pauseMusic } = usePlayMusic();

  useEffect(() => {
    setSongs([]);
    setCurPage(1);
    setHasMore(true);
    setInitialLoading(true);
  }, [query]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await getSongsByArtist(query, curPage);
        const newResults = res?.data?.results || [];

        setSongs((prev) =>
          curPage === 1 ? newResults : [...prev, ...newResults]
        );

        if (newResults.length < LIMIT) setHasMore(false);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setIsLoading(false);
        setInitialLoading(false);
      }
    };

    fetchSongs();
  }, [curPage, query]);

  const handleLoadMore = () => {
    if (hasMore) {
      setIsLoading(true);
      setCurPage((prev) => prev + 1);
    }
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

      {/* Heading */}
      <div className="mt-6 mb-10 text-center">
        <h1 className="block bg-clip-text bg-gradient-to-r from-indigo-500 dark:from-indigo-400 to-purple-500 dark:to-purple-400 font-bold text-transparent text-3xl sm:text-4xl capitalize leading-tight tracking-tight">
          {query}
        </h1>
        <div className="bg-gray-300 dark:bg-zinc-600 mx-auto mt-3 mb-4 rounded-full w-20 h-[2px]" />
      </div>

      {/* Skeleton Loader */}
      {initialLoading && <SearchSongCardSkeletonList />}

      {!initialLoading && songs.length === 0 ? (
        <div className="flex flex-col justify-center items-center mt-20 text-gray-600 dark:text-gray-300 text-center">
          <div className="bg-light dark:bg-dark shadow-inner mb-4 p-4 rounded-full">
            <Music size={48} className="text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="font-semibold text-gray-700 dark:text-gray-100 text-2xl">
            No songs found
          </h2>
          <p className="mt-2 max-w-xs text-gray-500 dark:text-gray-400 text-sm">
            Try searching with a different artist or keyword.
          </p>
        </div>
      ) : (
        <>
          {/* Songs List */}
          <div className="gap-4 grid grid-cols-1 mt-4">
            {songs.map((song, index) => (
              <SearchSongCard
                key={index}
                song={song}
                index={index}
                isOpen={menuOpenIndex === index}
                setMenuOpenIndex={setMenuOpenIndex}
                songs={songs}
              />
            ))}
          </div>

          {/* Spinner */}
          {isLoading && (
            <div role="status" className="my-4">
              <svg
                className="mx-auto w-10 lg:w-12 h-10 lg:h-12 text-blue-600 dark:text-blue-400 animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="10"
                  opacity="0.2"
                />
                <path
                  d="M93 50a43 43 0 10-18.5 35"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}

          {/* Load More */}
          {hasMore && !isLoading && (
            <div className="flex justify-center mt-5">
              <button
                onClick={handleLoadMore}
                className="text-slate-700 hover:text-slate-950 dark:hover:text-white dark:text-slate-300 transition cursor-pointer"
              >
                See More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SongsBySearch;

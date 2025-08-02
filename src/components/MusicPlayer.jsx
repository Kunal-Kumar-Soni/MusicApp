import {
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import usePlayMusic from "../hooks/usePlayMusic";
import decodeHtmlEntities from "../utils/decodeHtmlEntities";
import { useEffect, useState } from "react";

function MusicPlayer() {
  const {
    playMusicSong,
    pauseMusic,
    playMusic,
    audioRef,
    playPreviousSong,
    playNextSong,
    playMode,
    togglePlayMode,
  } = usePlayMusic();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioUrl = playMusicSong?.downloadUrl?.[4]?.url;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioRef]);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div className="right-0 bottom-14 lg:bottom-0 left-0 z-40 fixed bg-light dark:bg-dark shadow-[0_-2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_-2px_8px_rgba(255,255,255,0.05)] px-4 lg:px-8 py-2 sm:py-3 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Main Player Content */}
      <div className="flex justify-between items-center h-12 xs:h-14 sm:h-16 md:h-20">
        {/* Song Info - Responsive width */}
        <div className="flex items-center gap-2 xs:gap-3 w-[35%] xs:w-[38%] sm:w-[40%] min-w-[120px] xs:min-w-[140px] sm:min-w-[200px]">
          <div className="w-8 xs:w-10 sm:w-12 h-8 xs:h-10 sm:h-12 shrink-0">
            <img
              src={playMusicSong?.image?.[2]?.url || "/images/fallback.png"}
              alt="Song"
              className="rounded w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 overflow-hidden">
            <p className="overflow-hidden font-medium xs:font-semibold text-xs xs:text-sm md:text-base lg:text-lg text-ellipsis line-clamp-1 whitespace-nowrap">
              {decodeHtmlEntities(playMusicSong?.name || "No song")}
            </p>
            <p className="overflow-hidden text-[10.5px] text-gray-500 dark:text-gray-400 xs:text-xs md:text-sm lg:text-base text-ellipsis line-clamp-1 whitespace-nowrap">
              {playMusicSong?.artists?.primary?.[0]?.name || "Unknown Artist"}
            </p>
          </div>
        </div>

        {/* Controls - Adaptive for all screens */}
        <div className="flex flex-1 justify-center items-center gap-3 xs:gap-4 sm:gap-6 max-w-[140px] xs:max-w-[160px] sm:max-w-[200px]">
          <SkipBack
            onClick={playPreviousSong}
            className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer shrink-0"
          />
          {audioUrl ? (
            isPlaying ? (
              <Pause
                onClick={handleTogglePlay}
                className="w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer shrink-0"
              />
            ) : (
              <Play
                onClick={handleTogglePlay}
                className="w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer shrink-0"
              />
            )
          ) : (
            <Play className="w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 text-gray-400 dark:text-gray-600 cursor-pointer shrink-0" />
          )}
          <SkipForward
            onClick={playNextSong}
            className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer shrink-0"
          />
        </div>

        {/* Play Mode - Hidden on very small screens, compact on medium */}
        <div
          onClick={togglePlayMode}
          className="hidden lg:flex flex-col justify-center items-center w-[25%] xs:w-[22%] sm:w-[20%] max-w-[60px] xs:max-w-[70px] sm:max-w-[80px] hover:text-indigo-500 dark:hover:text-indigo-400 text-center cursor-pointer"
        >
          {playMode === "Repeat" && (
            <Repeat className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6" />
          )}
          {playMode === "Repeat1" && (
            <Repeat1 className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6" />
          )}
          {playMode === "Shuffle" && (
            <Shuffle className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6" />
          )}
          <span className="mt-0.5 xs:mt-1 text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs leading-tight">
            {playMode}
          </span>
        </div>

        <div
          onClick={togglePlayMode}
          className="lg:hidden flex flex-col justify-center items-center px-2 py-1.5 rounded-lg min-w-[50px] hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer"
        >
          {playMode === "Repeat" && <Repeat className="w-4 h-4" />}
          {playMode === "Repeat1" && <Repeat1 className="w-4 h-4" />}
          {playMode === "Shuffle" && <Shuffle className="w-4 h-4" />}
          <span className="opacity-90 mt-1 font-medium text-[9px] leading-none">
            {playMode}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      {audioUrl && (
        <div className="flex items-center gap-3 mt-3 px-1 w-full">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={currentTime}
            onChange={(e) => {
              const seekTime = Number(e.target.value);
              audioRef.current.currentTime = seekTime;
              setCurrentTime(seekTime);
            }}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      )}
    </div>
  );
}

export default MusicPlayer;

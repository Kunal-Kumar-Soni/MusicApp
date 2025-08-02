import { createContext, useEffect, useRef, useState } from "react";

export const PlayMusicContext = createContext();

function PlayMusicContextProvider({ children }) {
  const [playMusicSong, setPlayMusicSong] = useState(
    JSON.parse(localStorage.getItem("playSong")) || {}
  );
  const [playMusicSongLists, setPlayMusicSongLists] = useState(
    JSON.parse(localStorage.getItem("playSongLists")) || []
  );
  const [playMode, setPlayMode] = useState(
    localStorage.getItem("playMode") || "Repeat"
  );

  const audioRef = useRef(null);
  const prevSongIdRef = useRef(null);

  const setPlaySong = (song) => {
    if (song) setPlayMusicSong(song);
  };

  const pauseMusic = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  };

  const playMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play();
    }
  };

  const playNextSong = () => {
    const currentIndex = playMusicSongLists.findIndex(
      (song) => song.id === playMusicSong.id
    );

    if (playMode === "Repeat1") {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
      return;
    }

    if (playMode === "Shuffle") {
      let randomIndex = currentIndex;
      while (randomIndex === currentIndex && playMusicSongLists.length > 1) {
        randomIndex = Math.floor(Math.random() * playMusicSongLists.length);
      }
      setPlaySong(playMusicSongLists[randomIndex]);
      return;
    }

    if (currentIndex !== -1 && currentIndex < playMusicSongLists.length - 1) {
      setPlaySong(playMusicSongLists[currentIndex + 1]);
    } else if (playMode === "Repeat") {
      setPlaySong(playMusicSongLists[0]);
    }
  };

  const playPreviousSong = () => {
    const currentIndex = playMusicSongLists.findIndex(
      (song) => song.id === playMusicSong.id
    );
    if (currentIndex > 0) {
      setPlaySong(playMusicSongLists[currentIndex - 1]);
    }
  };

  const togglePlayMode = () => {
    setPlayMode((prev) =>
      prev === "Repeat" ? "Repeat1" : prev === "Repeat1" ? "Shuffle" : "Repeat"
    );
  };

  useEffect(() => {
    localStorage.setItem("playSong", JSON.stringify(playMusicSong));

    const audio = audioRef.current;
    const currentId = playMusicSong?.id;
    const audioUrl = playMusicSong?.downloadUrl?.[4]?.url;

    if (audio && audioUrl && currentId !== prevSongIdRef.current) {
      audio.src = audioUrl;
      audio.play().catch((err) => console.log("Autoplay error:", err.message));
      prevSongIdRef.current = currentId;
    }
  }, [playMusicSong]);

  useEffect(() => {
    localStorage.setItem("playSongLists", JSON.stringify(playMusicSongLists));
  }, [playMusicSongLists]);

  useEffect(() => {
    localStorage.setItem("playMode", playMode);
  }, [playMode]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.onended = () => {
        playNextSong();
      };
    }
  }, [playMode, playMusicSong]);

  return (
    <PlayMusicContext.Provider
      value={{
        playMusicSong,
        setPlayMusicSong: setPlaySong,
        pauseMusic,
        playMusic,
        audioRef,
        playMusicSongLists,
        setPlayMusicSongLists,
        playNextSong,
        playPreviousSong,
        playMode,
        togglePlayMode,
      }}
    >
      {children}
      <audio ref={audioRef} preload="auto" />
    </PlayMusicContext.Provider>
  );
}

export default PlayMusicContextProvider;

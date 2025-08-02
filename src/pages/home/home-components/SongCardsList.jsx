import songTypes from "../../../data//songTypes.json";

import { useEffect, useState } from "react";
import { getData } from "../../../api/api";
import SongCardSkeleton from "../../../ui/SongCardSkeleton";
import SongCard from "./SongCard";
import usePlayMusic from "../../../hooks/usePlayMusic";

//For multiple card
function SongCardsList() {
  //Shuffle Array
  const shuffleSongTypesFn = () => {
    for (let i = songTypes.length - 1; i >= 0; i--) {
      let tempIndex = Math.floor(Math.random() * (i + 1));
      [songTypes[tempIndex], songTypes[i]] = [
        songTypes[i],
        songTypes[tempIndex],
      ];
    }
    return songTypes;
  };
  const shuffleSongTypes = shuffleSongTypesFn([...songTypes]).slice(0, 3);

  return (
    <div>
      {shuffleSongTypes.map((curSongType, index) => {
        return <SongCards key={index} curSongType={curSongType} />;
      })}
    </div>
  );
}

function SongCards({ curSongType }) {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const { setPlayMusicSongLists, setPlayMusicSong } = usePlayMusic();

  const fetchSongs = async () => {
    setIsLoading(true);
    const res = await getData(curSongType);
    const songsData = res.data?.results?.slice(0, 10) || [];
    setSongs(songsData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleSongsLoaded = (song) => {
    setPlayMusicSong(song);
    setPlayMusicSongLists(songs);
  };

  return (
    <>
      {isLoading ? (
        <SongCardSkeleton />
      ) : (
        <div className="bg-white dark:bg-slate-800 px-5 lg:pl-70 transition-colors duration-300">
          <h2 className="pt-10 pb-2 font-mono font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl uppercase">
            {curSongType}
          </h2>

          <div className="gap-6 lg:gap-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-5">
            {songs.map((song, index) => (
              <SongCard
                key={index}
                song={song}
                index={index}
                isOpen={menuOpenIndex === index}
                setMenuOpenIndex={setMenuOpenIndex}
                onPlay={handleSongsLoaded}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SongCardsList;

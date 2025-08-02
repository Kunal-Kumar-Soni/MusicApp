import { createContext, useState } from "react";
import { toast } from "react-toastify";
import decodeHtmlEntities from "../utils/decodeHtmlEntities";

export const FavoriteContext = createContext();

function FavoriteContextProvider({ children }) {
  const [favoriteSongs, setFavoriteSongs] = useState(
    JSON.parse(localStorage.getItem("favoriteSongs")) || []
  );

  const addToFavorite = (song) => {
    const alreadyExists = favoriteSongs.some(
      (curFavSong) => curFavSong.id === song.id
    );

    if (!alreadyExists) {
      const updated = [...favoriteSongs, song];
      setFavoriteSongs(updated);
      localStorage.setItem("favoriteSongs", JSON.stringify(updated));
      toast.success(`Added "${decodeHtmlEntities(song.name)}" to favorites`, {
        toastId: `fav-${song.id}`,
      });
    } else {
      toast.info(`"${decodeHtmlEntities(song.name)}" is already in favorites`, {
        toastId: `info-${song.id}`,
      });
    }
  };

  const removeFromFavorite = (id) => {
    const filteredSongs = favoriteSongs.filter(
      (curFavSong) => curFavSong.id !== id
    );
    setFavoriteSongs(filteredSongs);
    localStorage.setItem("favoriteSongs", JSON.stringify(filteredSongs));
  };

  const alreadyAdded = (id) => {
    const value = favoriteSongs.some((curSong) => curSong.id === id);
    return value;
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoriteSongs,
        setFavoriteSongs,
        addToFavorite,
        removeFromFavorite,
        alreadyAdded,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteContextProvider;

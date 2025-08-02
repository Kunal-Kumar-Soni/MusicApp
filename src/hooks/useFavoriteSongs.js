import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";

function useFavoriteSongs() {
  return useContext(FavoriteContext);
}

export default useFavoriteSongs;

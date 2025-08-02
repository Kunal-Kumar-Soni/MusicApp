import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";

function usePlaylist() {
  return useContext(PlaylistContext);
}

export default usePlaylist;

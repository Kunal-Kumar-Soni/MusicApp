import { useContext } from "react";
import { PlayMusicContext } from "../context/PlayMusicContext";

function usePlayMusic() {
  return useContext(PlayMusicContext);
}

export default usePlayMusic;

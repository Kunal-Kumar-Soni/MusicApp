import { createContext, useState } from "react";
import { toast } from "react-toastify";
import decodeHtmlEntities from "../utils/decodeHtmlEntities";

export const PlaylistContext = createContext();

function PlaylistContextProvider({ children }) {
  const [playlistText, setPlaylistText] = useState("");
  const [playlistsName, setPlaylistsName] = useState(
    JSON.parse(localStorage.getItem("playlistsName")) || []
  );

  //Playlists functions
  const addPlayList = (name) => {
    if (name.trim() === "") {
      return toast.error("Playlist name cannot be empty");
    }

    if (
      playlistsName.some(
        (curPlaylist) => curPlaylist.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return toast.info(`Playlist "${name}" already exists`);
    }

    const newPlayList = {
      id: crypto.randomUUID(),
      name,
      songs: [],
      createdAt: new Date().toISOString(),
    };
    setPlaylistsName((prev) => {
      const updatedList = [...prev, newPlayList];
      localStorage.setItem("playlistsName", JSON.stringify(updatedList));
      return updatedList;
    });
    toast.success(`Playlist "${name}" created!`);
  };

  const removeFromPlaylist = (id) => {
    const updatedList = playlistsName.filter(
      (curPlaylist) => curPlaylist.id !== id
    );
    setPlaylistsName(updatedList);
    localStorage.setItem("playlistsName", JSON.stringify(updatedList));
  };

  //Playlist song functions
  const addSongToPlaylist = (playlist, song) => {
    let isAlreadyPresent = false;

    const updatedList = playlistsName.map((curPlaylist) => {
      if (curPlaylist.id === playlist.id) {
        const isAlreadyAdded = curPlaylist.songs.some(
          (curSong) => curSong.id === song.id
        );

        if (isAlreadyAdded) {
          isAlreadyPresent = true;
          return curPlaylist;
        }

        return { ...curPlaylist, songs: [...curPlaylist.songs, song] };
      }
      return curPlaylist;
    });

    if (isAlreadyPresent) {
      toast.info(
        `Song "${decodeHtmlEntities(song.name)}" already in "${
          playlist.name
        }" playlist`
      );
      return;
    }

    setPlaylistsName(updatedList);
    localStorage.setItem("playlistsName", JSON.stringify(updatedList));
    toast.success(
      `Added "${decodeHtmlEntities(song.name)}" to  "${playlist.name}" playlist`
    );
  };

  const removeSongFromPlaylist = (playlist, song) => {
    const updatedList = playlistsName.map((curPlaylist) => {
      if (curPlaylist.id === playlist.id) {
        const filteredSongs = curPlaylist.songs.filter(
          (curSong) => curSong.id !== song.id
        );
        return { ...curPlaylist, songs: filteredSongs };
      }
      return curPlaylist;
    });
    setPlaylistsName(updatedList);
    localStorage.setItem("playlistsName", JSON.stringify(updatedList));
    toast.error(
      `Removed "${decodeHtmlEntities(song.name)}" from "${
        playlist.name
      }" playlist`
    );
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlistText,
        setPlaylistText,
        playlistsName,
        setPlaylistsName,
        addPlayList,
        removeFromPlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export default PlaylistContextProvider;

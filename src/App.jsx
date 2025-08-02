import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import BottomNav from "./components/BottomNav";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSideBar";
import Footer from "./components/Footer";
import SongsBySearch from "./pages/search/SongsBySearch";
import SearchNoData from "./pages/search/SearchNoData";
import Favorite from "./pages/favorite/Favorite";
import Playlist from "./pages/playlist/Playlist";
import CreatePlaylistModal from "./pages/playlist/CreatePlaylistModal";
import ScrollToTop from "./components/ScrollToTop";
import PlaylistSongs from "./pages/playlist/PlaylistSongs";
import SongDetails from "./pages/song_details/SongDetails";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const [modes, setModes] = useState(localStorage.getItem("modes") || "dark");
  const [isOpenRightSideBar, setIsOpenRightSideBar] = useState(false);
  const [isOpenPlaylistModal, setIsOpenPlaylistModal] = useState(false);

  useEffect(() => {
    if (modes === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("modes", modes);
  }, [modes]);

  return (
    <div className="dark:bg-slate-800">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar
          modes={modes}
          setModes={setModes}
          setIsOpenRightSideBar={setIsOpenRightSideBar}
        />
        <LeftSidebar setIsOpenPlaylistModal={setIsOpenPlaylistModal} />
        <RightSidebar
          isOpenRightSideBar={isOpenRightSideBar}
          setIsOpenRightSideBar={setIsOpenRightSideBar}
          setIsOpenPlaylistModal={setIsOpenPlaylistModal}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchNoData />} />
          <Route path="/search/:query" element={<SongsBySearch />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route
            path="/playlist"
            element={
              <Playlist setIsOpenPlaylistModal={setIsOpenPlaylistModal} />
            }
          />
          <Route path="/playlist/:name" element={<PlaylistSongs />} />
          <Route path="/song/details/:id" element={<SongDetails />} />
        </Routes>
        <CreatePlaylistModal
          isOpenPlaylistModal={isOpenPlaylistModal}
          setIsOpenPlaylistModal={setIsOpenPlaylistModal}
        />
        <MusicPlayer />
        <BottomNav />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SearchContextProvider from "./context/SearchContext.jsx";
import FavoriteContextProvider from "./context/FavoriteContext.jsx";
import { ToastContainer } from "react-toastify";
import PlaylistContextProvider from "./context/PlaylistContext.jsx";
import PlayMusicContextProvider from "./context/PlayMusicContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlayMusicContextProvider>
      <PlaylistContextProvider>
        <FavoriteContextProvider>
          <SearchContextProvider>
            <App />

            {/* Toast notifications */}
            <ToastContainer
              position="top-center"
              autoClose={2500}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              draggable
              pauseOnFocusLoss
              closeButton={false}
              toastClassName={() =>
                "relative min-h-[38px] mx-4 sm:mx-auto  h-auto mb-4 mt-3 px-3 py-3 flex items-center rounded-md text-sm font-medium shadow-lg bg-white text-black border border-slate-200 dark:bg-[#1e293b] dark:text-sky-100 dark:border-slate-700 overflow-hidden"
              }
              progressClassName="bg-sky-500 dark:bg-sky-400 h-1 rounded-full absolute bottom-0 left-2 right-2"
            />
          </SearchContextProvider>
        </FavoriteContextProvider>
      </PlaylistContextProvider>
    </PlayMusicContextProvider>
  </StrictMode>
);

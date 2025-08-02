import { useNavigate } from "react-router-dom";
import artistsData from "../../../data/artistsData.json";

function Artists() {
  const navigation = useNavigate();

  const handleArtistFn = (artistName) => {
    navigation(`/search/${artistName}`);
  };

  return (
    <section className="px-5 md:py-10 lg:pl-60">
      <h2 className="pt-20 md:pt-10 pb-2 lg:pl-10 font-mono font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl uppercase">
        Top Artists
      </h2>
      <div className="scrollbar-hidden-always flex justify-between gap-10 sm:gap-8 md:gap-10 lg:px-10 py-5 overflow-x-auto font-medium text-sm whitespace-nowrap">
        {artistsData.map((artist, index) => (
          <div
            onClick={() => handleArtistFn(artist.name)}
            key={index}
            className="group flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="w-28 sm:w-32 md:w-36 h-28 sm:h-32 md:h-36">
              <img
                src={artist.image}
                alt={artist.name}
                className="shadow-md border-2 border-gray-300 dark:border-gray-600 rounded-full object-cover"
              />
            </div>

            <p className="mt-3 font-medium text-gray-800 dark:text-white text-sm sm:text-base">
              {artist.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Artists;

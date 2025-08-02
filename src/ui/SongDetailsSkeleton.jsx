function SongDetailsSkeleton() {
  return (
    <div className="flex justify-center items-start min-h-[50vh] text-gray-900 dark:text-white animate-pulse">
      <div className="bg-light dark:bg-dark shadow-xl p-6 md:p-10 rounded-3xl w-full max-w-5xl transition-all duration-300">
        <div className="flex md:flex-row flex-col items-center md:items-start gap-10">
          {/* Thumbnail Skeleton */}
          <div className="relative shrink-0">
            <div className="bg-gray-300 dark:bg-gray-700 rounded-2xl w-48 sm:w-56 h-48 sm:h-56" />
          </div>

          {/* Song Details Skeleton */}
          <div className="flex-1 space-y-4 mt-2 w-full md:text-left text-center">
            {/* Song Title */}
            <div className="bg-gray-300 dark:bg-gray-700 mx-auto md:mx-0 mb-6 rounded-md w-[60%] h-8" />

            {/* Info lines */}
            <div className="space-y-4 text-sm sm:text-base">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-300 dark:bg-gray-700 mx-auto md:mx-0 rounded-md w-[40%] h-4"
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <div className="bg-gray-300 dark:bg-gray-700 rounded-full w-24 h-10" />
              <div className="bg-gray-300 dark:bg-gray-700 rounded-full w-10 h-10" />
              <div className="bg-gray-300 dark:bg-gray-700 rounded-full w-10 h-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongDetailsSkeleton;

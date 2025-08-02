function SongCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 px-5 lg:pl-70 transition-colors duration-300">
      {/* Heading Skeleton */}
      <div className="pt-10">
        <div className="bg-gray-200 dark:bg-gray-700 rounded w-48 sm:w-64 h-6 sm:h-8 animate-pulse" />
      </div>

      {/* 5 Song Card Skeletons */}
      <div className="gap-6 lg:gap-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 py-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="group relative bg-white dark:bg-gray-900 shadow-sm rounded-md overflow-hidden animate-pulse"
          >
            {/* Image area with shimmer */}
            <div className="relative bg-gray-200 dark:bg-gray-700 w-full h-[180px]">
              <div className="absolute inset-0 bg-black/20 dark:bg-white/10" />
            </div>

            {/* Song title placeholder */}
            <div className="p-3">
              <div className="bg-gray-200 dark:bg-gray-700 rounded w-3/4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongCardSkeleton;

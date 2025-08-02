export function SearchSongCardSkeleton() {
  return (
    <div className="flex justify-between items-center gap-6 bg-light dark:bg-dark p-4 border border-gray-300 dark:border-zinc-800 rounded-lg w-full animate-pulse">
      {/* Left Side Skeleton */}
      <div className="flex items-center gap-4">
        <div className="bg-gray-300 dark:bg-gray-700 rounded w-14 h-14" />
        <div className="space-y-2">
          <div className="bg-gray-300 dark:bg-gray-700 rounded w-20 sm:w-25 lg:w-35 h-4" />
        </div>
      </div>

      {/* Right Side Skeleton */}
      <div className="flex items-center gap-4.5">
        <div className="bg-gray-300 dark:bg-gray-700 rounded w-8 sm:w-10 h-3" />
        <div className="bg-gray-300 dark:bg-gray-700 rounded w-3 h-6" />
      </div>
    </div>
  );
}

function SearchSongCardSkeletonList() {
  return (
    <div className="gap-4 grid grid-cols-1 mt-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <SearchSongCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default SearchSongCardSkeletonList;

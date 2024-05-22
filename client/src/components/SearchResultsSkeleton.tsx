import { Skeleton } from "./ui/skeleton";

const SearchResultsSkeleton = () => {
  return (
    <div className="flex flex-col pb-5 md:pb-6">
      <div className="flex items-center gap-3">
        <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
        <Skeleton className="w-32 h-3 sm:w-44 sm:h-4" />
      </div>
      <div className="mt-4">
        <Skeleton className="w-1/2 h-3 sm:w-1/2 sm:h-5" />
        <Skeleton className="mt-2 h-3 w-full sm:h-4" />
      </div>
      <div className="mb-2 mt-8 sm:mb-4 flex justify-between items-center">
        <Skeleton className="w-20 h-3 sm:w-24 sm:h-4" />
      </div>
    </div>
  );
};

export default SearchResultsSkeleton;

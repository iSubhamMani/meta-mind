import { Skeleton } from "./ui/skeleton";

const PostDetailsSkeleton = () => {
  return (
    <div className="mt-8 w-[90%] max-w-[500px] md:w-[65%] md:max-w-[840px] mx-auto">
      <Skeleton className="w-3/4 h-8 sm:h-10" />
      <div className="mt-6 sm:mt-8 flex items-start gap-3">
        <Skeleton className="w-6 h-6 sm:w-10 sm:h-10 rounded-full" />
        <div>
          <Skeleton className="w-36 h-3 sm:w-48 sm:h-4" />
          <Skeleton className="mt-4 w-28 h-3 sm:w-40 sm:h-4" />
        </div>
      </div>
      <div className="mt-6 mb-8">
        <Skeleton className="w-full h-16 sm:h-20" />
      </div>
      <div>
        <Skeleton className="w-full h-60 sm:h-80" />
      </div>
    </div>
  );
};

export default PostDetailsSkeleton;

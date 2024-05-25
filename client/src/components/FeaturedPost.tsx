import { Avatar, AvatarImage } from "./ui/avatar";
import { DEFAULT_PROFILE_PHOTO } from "@/utils/constants";
import { Bookmark } from "lucide-react";
import { Separator } from "./ui/separator";
import Post from "@/interfaces/Post";
import { Link } from "react-router-dom";
import convertToReadableDate from "@/utils/convertDate";

const FeaturedPost = ({ post }: { post: Post }) => {
  return (
    <div className="pb-5 md:pb-6">
      <div className="flex items-center gap-3">
        <Avatar className="w-6 h-6 sm:w-8 sm:h-8 dark:border-2 border-gray-300">
          <AvatarImage
            src={post?.author.photoURL || DEFAULT_PROFILE_PHOTO}
            alt="photo"
          />
        </Avatar>
        <span className="text-black dark:text-white text-sm font-medium line-clamp-1">
          {post?.author.displayName}
        </span>
      </div>
      <Link to={`/post/${post?._id}`}>
        <div className="mt-4">
          <h3 className="text-black dark:text-white line-clamp-2 scroll-m-20 text-lg sm:text-xl md:text-2xl font-bold tracking-tight">
            {post?.title}
          </h3>
          <p className="font-normal text-gray-800 dark:text-gray-400 text-sm md:text-base mt-2 line-clamp-2">
            {post?.description}
          </p>
        </div>
      </Link>
      <div className="mb-2 mt-8 sm:mb-4 flex justify-between items-center">
        <p className="font-normal text-sm text-[#4d5358] dark:text-[#e1e1e1] line-clamp-1">
          {convertToReadableDate(post?.createdAt)}
        </p>
        <Bookmark className="cursor-pointer w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white" />
      </div>
      <Separator className="mt-4 sm:mt-8" />
    </div>
  );
};

export default FeaturedPost;

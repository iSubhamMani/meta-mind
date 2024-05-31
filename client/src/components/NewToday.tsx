import { MoveRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import Post from "@/interfaces/Post";
import { DEFAULT_PROFILE_PHOTO } from "@/utils/constants";
import convertToReadableDate from "@/utils/convertDate";
import { Link } from "react-router-dom";

const NewToday = ({ post }: { post: Post }) => {
  return (
    <Link to={`/post/${post?._id}`}>
      <div>
        <Card className="py-1 md:py-4">
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar className="w-5 h-5 sm:w-7 sm:h-7 border-2 dark:border-gray-300 border-gray-700">
                <AvatarImage
                  src={post?.author.photoURL || DEFAULT_PROFILE_PHOTO}
                  alt="photo"
                />
              </Avatar>
              <span className="text-black dark:text-white text-xs sm:text-sm font-medium line-clamp-1">
                {post?.author.displayName}
              </span>
            </div>
            <p className="font-bold font-raleway mt-4 line-clamp-2 md:line-clamp-3 text-black dark:text-white">
              {post?.title}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <p className="font-normal text-xs sm:text-sm text-[#4d5358] dark:text-[#e1e1e1] line-clamp-1">
                {convertToReadableDate(post?.createdAt)}
              </p>
              <MoveRight />
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
};

export default NewToday;

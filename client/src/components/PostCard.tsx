import convertToReadableDate from "@/utils/convertDate";
import { Bookmark } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { DEFAULT_PROFILE_PHOTO, SERVER_URL } from "@/utils/constants";
import Post from "@/interfaces/Post";
import axios from "axios";
import User from "@/interfaces/User";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeBookMarkedPost,
  setBookMarkedHasMore,
  setBookMarkedPage,
  setBookmarkRefetch,
} from "@/redux/profileSlice";

const PostCard = ({ post, user }: { post: Post; user: User }) => {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const dispatcher = useDispatch();

  useEffect(() => {
    checkBookMarkStatus();
  }, []);

  const checkBookMarkStatus = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/v1/bookmarks/get-bookmark-status`,
        {
          postId: post?._id,
          userId: user?.uid,
        }
      );

      if (response.data?.success) {
        setBookmarked(response.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleBookmark = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/v1/bookmarks/toggle-bookmark`,
        {
          postId: post?._id,
          userId: user?.uid,
        }
      );

      if (response.data?.success) {
        setBookmarked(!bookmarked);
        dispatcher(setBookmarkRefetch(true));
        dispatcher(setBookMarkedHasMore(true));
        dispatcher(setBookMarkedPage(1));
        dispatcher(
          removeBookMarkedPost({
            post: post,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pb-5 md:pb-6">
      <div className="flex items-center gap-3">
        <Avatar className="w-6 h-6 sm:w-8 sm:h-8 border-2 dark:border-gray-300 border-gray-700">
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
        {user.uid !== post.author._id && (
          <Bookmark
            onClick={toggleBookmark}
            className={`cursor-pointer w-4 h-4 sm:w-5 sm:h-5 ${
              bookmarked ? "text-red-500" : "text-black dark:text-white"
            }`}
          />
        )}
      </div>
      <Separator className="mt-4 sm:mt-8" />
    </div>
  );
};

export default PostCard;

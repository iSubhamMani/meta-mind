import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Post from "@/interfaces/Post";
import { DEFAULT_PROFILE_PHOTO, SERVER_URL } from "@/utils/constants";
import axios from "axios";
import { Separator } from "./ui/separator";
import { ArrowLeft, Bookmark, ThumbsUp } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import RawHtmlComponent from "@/utils/RawHTML";
import { useDispatch, useSelector } from "react-redux";
import RootState from "@/interfaces/RootState";
import PostDetailsSkeleton from "./PostDetailsSkeleton";
import convertToReadableDate from "@/utils/convertDate";
import {
  removeBookMarkedPost,
  setBookMarkedHasMore,
  setBookMarkedPage,
  setBookmarkRefetch,
} from "@/redux/profileSlice";

const PostDetails = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatcher = useDispatch();
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchPostDetails();
  }, []);

  useEffect(() => {
    if (!post) return;
    checkBookMarkStatus();
  }, [post]);

  const fetchPostDetails = async () => {
    try {
      // Fetch post details
      setLoading(true);
      const response = await axios.get(
        `${SERVER_URL}/api/v1/posts/get-post/${id}`
      );
      if (response.data?.success) {
        setPost(response.data?.data);
        setLikesCount(response.data?.data?.likesCount);

        // Check if user has liked the post
        const likeResponse = await axios.post(
          `${SERVER_URL}/api/v1/likes/like-status`,
          {
            postId: id,
            user: user?.uid,
          }
        );

        if (likeResponse.data?.success) {
          setLoading(false);
          setLiked(likeResponse.data?.data);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const toggleLike = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/v1/likes/toggle-like`,
        {
          postId: id,
          user: user?.uid,
        }
      );

      if (response.data?.success) {
        setLiked(!liked);
        if (liked) setLikesCount(likesCount - 1);
        else setLikesCount(likesCount + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-bl from-[#d0daf5] to-[#fff] dark:bg-gradient-to-bl dark:from-[#111524] dark:to-[#000000]">
      <Navbar />
      {user && (
        <div className="max-w-[80rem] mx-auto  px-6">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="h-6 w-6 cursor-pointer text-black dark:text-white"
          />
          {loading ? (
            <PostDetailsSkeleton />
          ) : (
            <div className="mt-8 w-[90%] max-w-[500px] md:w-[65%] md:max-w-[840px] mx-auto">
              <h1 className="text-black dark:text-white text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {post?.title}
              </h1>
              <div className="mt-6 sm:mt-8 flex items-start gap-4">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 dark:border-gray-300 border-gray-700">
                  <AvatarImage
                    src={post?.author.photoURL ?? DEFAULT_PROFILE_PHOTO}
                    alt="photo"
                  />
                </Avatar>
                <div className="flex flex-col gap-1">
                  <span
                    className=" text-black dark:text-white text-sm sm:text-base font-semibold
                 line-clamp-1"
                  >
                    {post?.author.displayName}
                  </span>
                  <span className="text-sm text-gray-800 dark:text-gray-400 line-clamp-1">
                    {convertToReadableDate(post?.createdAt ?? "")}
                  </span>
                </div>
              </div>
              <div className="mt-6 mb-8">
                <Separator />
                <div className="py-3 px-4 flex gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <ThumbsUp
                      onClick={toggleLike}
                      className={`cursor-pointer w-5 h-5 sm:w-6 sm:h-6 ${
                        liked ? "text-primary" : "text-black dark:text-white"
                      }`}
                    />
                    <p className="text-lg text-black dark:text-white">
                      {likesCount}
                    </p>
                  </div>
                  <Bookmark
                    onClick={toggleBookmark}
                    className={`cursor-pointer w-5 h-5 sm:w-6 sm:h-6 ${
                      bookmarked ? "text-red-500" : "text-black dark:text-white"
                    }`}
                  />
                </div>
                <Separator />
              </div>
              <div>
                <p className="text-lg text-black dark:text-gray-300">
                  {post?.description}
                </p>
              </div>
              <div className="py-8 md:py-12 leading-7 text-lg sm:text-xl dark:text-white">
                <RawHtmlComponent htmlContent={post?.body ?? ""} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetails;

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
import { useSelector } from "react-redux";
import RootState from "@/interfaces/RootState";
import PostDetailsSkeleton from "./PostDetailsSkeleton";
import convertToReadableDate from "@/utils/convertDate";

const PostDetails = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchPostDetails();
  }, []);

  const fetchPostDetails = async () => {
    try {
      // Fetch post details
      setLoading(true);
      const response = await axios.get(
        `${SERVER_URL}/api/v1/posts/get-post/${id}`
      );
      if (response.data?.success) {
        setPost(response.data?.data);

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-white/95 dark:bg-[#0e0e0e] px-6">
      <div className="max-w-[80rem] mx-auto">
        <Navbar />
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
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                <AvatarImage
                  src={post?.author.photoURL || DEFAULT_PROFILE_PHOTO}
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
                <ThumbsUp
                  onClick={toggleLike}
                  className={`cursor-pointer w-5 h-5 sm:w-6 sm:h-6 ${
                    liked ? "text-primary" : "text-black dark:text-white"
                  }`}
                />
                <Bookmark className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white" />
              </div>
              <Separator />
            </div>
            <div>
              <p className="text-lg text-black dark:text-gray-400">
                {post?.description}
              </p>
            </div>
            <div className="py-8 md:py-12 leading-7 text-lg sm:text-xl dark:text-secondary">
              <RawHtmlComponent htmlContent={post?.body ?? ""} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;

import { DEFAULT_PROFILE_PHOTO, SERVER_URL } from "@/utils/constants";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import convertToReadableDate from "@/utils/convertDate";
import { Separator } from "./ui/separator";
import Post from "@/interfaces/Post";
import User from "@/interfaces/User";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { removeUserPost } from "@/redux/profileSlice";

const UserPostCard = ({ post, user }: { post: Post; user: User }) => {
  const dispatcher = useDispatch();

  const deleteUserPost = async () => {
    try {
      const loadToast = toast.loading("Removing post...");
      const response = await axios.post(
        `${SERVER_URL}/api/v1/posts/delete-post`,
        {
          postId: post?._id,
          userId: user?.uid,
        }
      );

      if (response.data?.success) {
        toast.dismiss(loadToast);
        toast.success("Post removed", {
          style: {
            fontWeight: "bolder",
            color: "#fff",
            backgroundColor: "#007E50",
          },
        });

        dispatcher(removeUserPost({ post }));
      }
    } catch (error) {
      toast.error(
        "Something went wrong! Please check your internet connection",
        {
          style: {
            fontWeight: "bolder",
            color: "#fff",
            backgroundColor: "#FF0000",
          },
        }
      );
      console.log(error);
    }
  };

  return (
    <>
      {user && (
        <div className="pb-5 md:pb-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <Avatar className="w-6 h-6 sm:w-8 sm:h-8 border-2 dark:border-gray-300 border-gray-700">
                <AvatarImage
                  src={post?.author.photoURL ?? DEFAULT_PROFILE_PHOTO}
                  alt="photo"
                />
              </Avatar>
              <span className="text-black dark:text-white text-sm font-medium line-clamp-1">
                {post?.author.displayName}
              </span>
            </div>
            <AlertDialog>
              <AlertDialogTrigger>
                <Trash className="cursor-pointer w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-black dark:text-white ">
                    Are you sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="dark:text-[#e1e1e1]">
                    Your post will be removed permanently
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="dark:bg-[#5a5a5a] dark:border-[#2a2a2a] dark:text-white dark:hover:bg-[#555555]">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="text-white"
                    onClick={deleteUserPost}
                  >
                    Yes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
          </div>
          <Separator className="mt-4 sm:mt-8" />
        </div>
      )}
    </>
  );
};

export default UserPostCard;

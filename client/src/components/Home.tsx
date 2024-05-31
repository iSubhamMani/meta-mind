import { PencilLine, Rss, TrendingUp } from "lucide-react";
import Navbar from "./Navbar";
import PostCard from "./PostCard";
import { Separator } from "./ui/separator";
import NewToday from "./NewToday";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import RootState from "@/interfaces/RootState";
import { useEffect, useState } from "react";
import { SERVER_URL } from "@/utils/constants";
import Post from "@/interfaces/Post";
import {
  addFeaturedPosts,
  addWhatsNewPosts,
  setRefetch,
} from "@/redux/postSlice";
import FeaturedPostSkeleton from "./FeaturedPostSkeleton";
import WhatsNewPostSkeleton from "./WhatsNewPostSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { setHasMore, updatePage } from "@/redux/featuredSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  const refetch = useSelector((state: RootState) => state.post.refetch);
  const { hasMore, page } = useSelector((state: RootState) => state.featured);

  const [whatsNewLoading, setWhatsNewLoading] = useState(false);

  const { featuredPosts, whatsNewPosts } = useSelector(
    (state: RootState) => state.post
  );
  const dispatcher = useDispatch();

  useEffect(() => {
    if (featuredPosts.length > 0 || whatsNewPosts.length > 0) return;
    getFeaturedPosts();
    getWhatsNewPosts();
  }, []);

  useEffect(() => {
    if (!refetch) return;

    getWhatsNewPosts();
    dispatcher(setRefetch(false));
  }, [whatsNewPosts]);

  const getFeaturedPosts = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/v1/posts/featured?page=${page}`,
        {
          user: user?.user,
        }
      );

      if (response.data?.success) {
        dispatcher(updatePage());
        dispatcher(setHasMore(response.data?.data?.hasNextPage));
        dispatcher(addFeaturedPosts(response.data?.data?.docs));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWhatsNewPosts = async () => {
    try {
      setWhatsNewLoading(true);
      const response = await axios.post(
        `${SERVER_URL}/api/v1/posts/whats-new`,
        {
          user: user?.user,
        }
      );

      if (response.data?.success) setWhatsNewLoading(false);
      dispatcher(addWhatsNewPosts(response.data?.data));
    } catch (error) {
      setWhatsNewLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#d0daf5] to-[#fff] dark:bg-gradient-to-bl dark:from-[#111524] dark:to-[#000000]">
      <Navbar />
      <Link to="/new-post">
        <button className="shadow-md bg-primary rounded-full p-2 fixed bottom-6 right-6 z-50 sm:hidden">
          <PencilLine className="text-white cursor-pointer h-6 w-6" />
        </button>
      </Link>
      <div className="max-w-[80rem] mx-auto px-6">
        <div className="py-2 md:py-6 flex flex-col-reverse sm:flex-row gap-6">
          <div className="w-full sm:w-2/3 ">
            <div className="flex items-center mb-6 md:mb-10 gap-2 z-50 bg-transparent">
              <h3 className="border-l-4 pl-4 border-l-green-600 dark:border-b-green-400 text-green-600 dark:text-green-400 text-xl sm:text-2xl font-bold tracking-tight">
                Featured
              </h3>
              <TrendingUp className="text-green-600 dark:text-green-400" />
            </div>
            <InfiniteScroll
              scrollThreshold={0.9}
              dataLength={featuredPosts.length}
              next={getFeaturedPosts}
              hasMore={hasMore}
              loader={
                <div>
                  <FeaturedPostSkeleton />
                  <FeaturedPostSkeleton />
                  <FeaturedPostSkeleton />
                </div>
              }
              endMessage={
                <p className="text-center text-sm text-black dark:text-white">
                  Looks like you have reached the end
                </p>
              }
            >
              {featuredPosts.map((post: Post) => {
                return (
                  <PostCard user={user?.user} post={post} key={post?._id} />
                );
              })}
            </InfiniteScroll>
          </div>
          <Separator className="sm:hidden" />
          <div className="w-full sm:w-1/3 flex gap-6">
            <Separator className="hidden sm:inline" orientation="vertical" />
            <div className="w-full h-max sticky top-6">
              <div className="flex gap-2 items-center mb-6 md:mb-10 ">
                <h3 className="border-l-4 pl-4 border-l-purple-600 dark:border-b-purple-400 scroll-m-20 text-purple-600 dark:text-purple-400 text-xl sm:text-2xl font-bold tracking-tight">
                  What's new?
                </h3>
                <Rss className="text-purple-600 dark:text-purple-400" />
              </div>
              {whatsNewLoading ? (
                <div className="flex flex-col gap-3">
                  <WhatsNewPostSkeleton />
                  <WhatsNewPostSkeleton />
                  <WhatsNewPostSkeleton />
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {whatsNewPosts.map((post: Post) => {
                    return <NewToday post={post} key={post?._id} />;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

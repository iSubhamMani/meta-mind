import { Rss, TrendingUp } from "lucide-react";
import Navbar from "./Navbar";
import FeaturedPost from "./FeaturedPost";
import { Separator } from "./ui/separator";
import NewToday from "./NewToday";
import axios from "axios";
import { useSelector } from "react-redux";
import RootState from "@/interfaces/RootState";
import { useEffect, useState } from "react";
import { SERVER_URL } from "@/utils/constants";
import Post from "@/interfaces/Post";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    getFeaturedPosts();
  }, []);

  const getFeaturedPosts = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/v1/posts/featured`, {
        user: user?.user,
      });

      if (response.data?.success) {
        setFeaturedPosts(response.data?.data?.docs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-white/95 dark:bg-[#0e0e0e] px-6">
      <div className="max-w-[80rem] mx-auto">
        <Navbar />
        <div className="py-2 md:py-6 flex flex-col-reverse sm:flex-row gap-6">
          <div className="w-full sm:w-2/3 ">
            <div className="flex items-center mb-6 md:mb-10 gap-2">
              <h3 className="border-l-4 pl-4 border-l-green-600 dark:border-b-green-400 scroll-m-20 text-green-600 dark:text-green-400 text-xl sm:text-2xl font-bold tracking-tight">
                Featured
              </h3>
              <TrendingUp className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              {/* Contains post */}

              {featuredPosts.map((post: Post) => (
                <FeaturedPost post={post} key={post._id} />
              ))}
            </div>
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
              <div className="flex flex-col gap-3">
                <NewToday />
                <NewToday />
                <NewToday />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

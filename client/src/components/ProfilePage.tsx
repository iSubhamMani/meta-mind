import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import RootState from "@/interfaces/RootState";
import { DEFAULT_PROFILE_PHOTO, SERVER_URL } from "@/utils/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "@/interfaces/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchResultsSkeleton from "./SearchResultsSkeleton";
import {
  addBookMarkedPost,
  addUserPosts,
  setBookMarkedHasMore,
  setBookmarkRefetch,
  setUserPostsHasMore,
  setUserPostsRefetch,
  updateBookMarkedPage,
  updateUserPostsPage,
} from "@/redux/profileSlice";
import BookMarkedPostCard from "./BookMarkedPostCard";
import UserPostCard from "./UserPostCard";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);
  const [tabIndex, setTabIndex] = useState(0);

  // states
  const {
    hasMoreUserPosts,
    userPosts,
    userPostsPage,
    bookMarkedPosts,
    bookmarkedPostsPage,
    hasMoreBookMarkedPosts,
    bookmarkRefetch,
    userPostsRefetch,
  } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (Object.keys(userPosts).length > 0 && tabIndex === 0) return;
    if (tabIndex === 0 && !userPostsRefetch) getUserPosts();
  }, []);

  useEffect(() => {
    if (Object.keys(bookMarkedPosts).length > 0 && tabIndex === 1) return;
    if (tabIndex === 1) getBookMarkedPosts();
  }, [tabIndex]);

  useEffect(() => {
    if (!userPostsRefetch) return;
    getUserPosts();
    dispatcher(setUserPostsRefetch(false));
  }, [userPosts]);

  useEffect(() => {
    if (!bookmarkRefetch) return;
    getBookMarkedPosts();
    dispatcher(setBookmarkRefetch(false));
  }, [bookMarkedPosts]);

  const getUserPosts = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/v1/users/user-posts?page=${userPostsPage}`,
        {
          userId: user?.uid,
        }
      );

      if (response.data?.success) {
        dispatcher(setUserPostsHasMore(response.data?.data?.hasNextPage));
        dispatcher(updateUserPostsPage());

        response.data?.data?.docs.map((post: Post) => {
          dispatcher(addUserPosts({ post }));
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBookMarkedPosts = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/v1/users/bookmarked-posts?page=${bookmarkedPostsPage}`,
        {
          userId: user?.uid,
        }
      );

      if (response.data?.success) {
        dispatcher(setBookMarkedHasMore(response.data?.data?.hasNextPage));
        dispatcher(updateBookMarkedPage());

        response.data?.data?.docs.map((post: Post) => {
          dispatcher(addBookMarkedPost({ post }));
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (value: string) => {
    if (value === "your-posts") {
      setTabIndex(0);
    } else {
      setTabIndex(1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#d0daf5] to-[#fff] dark:bg-gradient-to-bl dark:from-[#111524] dark:to-[#000000]">
      <Navbar />
      {user && (
        <div className="max-w-[80rem] mx-auto px-6">
          <div className="pt-2 pb-4 sm:pt-4 sm:pb-6">
            <ArrowLeft
              onClick={() => navigate(-1)}
              className="h-6 w-6 cursor-pointer text-black dark:text-white"
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border-2 dark:border-gray-300 border-gray-700">
              <AvatarImage
                src={user?.photoURL ?? DEFAULT_PROFILE_PHOTO}
                alt="photo"
              />
            </Avatar>
            <h1 className="text-black text-base sm:text-xl dark:text-white font-bold ">
              {user?.displayName}
            </h1>
          </div>
          <div className="flex flex-col gap-3 mt-8 sm:mt-12">
            <Tabs
              defaultValue="your-posts"
              onValueChange={(value) => {
                handleTabChange(value);
              }}
            >
              <div className="flex justify-center">
                <TabsList className="">
                  <TabsTrigger value="your-posts">Your posts</TabsTrigger>
                  <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="your-posts">
                {Object.keys(userPosts).length > 0 ? (
                  <div className="my-8 sm:my-12 w-full sm:w-[85%]">
                    {
                      <InfiniteScroll
                        dataLength={Object.keys(userPosts).length}
                        next={getUserPosts}
                        hasMore={hasMoreUserPosts}
                        loader={
                          <div>
                            <SearchResultsSkeleton />
                            <SearchResultsSkeleton />
                            <SearchResultsSkeleton />
                          </div>
                        }
                        endMessage={
                          <p className="text-center text-sm text-black dark:text-white">
                            Looks like you have reached the end
                          </p>
                        }
                      >
                        {Object.entries(userPosts).map(([, post]) => {
                          return (
                            <UserPostCard
                              post={post}
                              user={user}
                              key={post?._id}
                            />
                          );
                        })}
                      </InfiniteScroll>
                    }
                  </div>
                ) : (
                  <div className="mt-8 sm:mt-12">
                    <p className="text-sm sm:text-base text-center text-black dark:text-white">
                      You haven't posted anything yet
                    </p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="bookmarked">
                {Object.keys(bookMarkedPosts).length > 0 ? (
                  <div className="my-8 sm:my-12 w-full sm:w-[85%]">
                    {
                      <InfiniteScroll
                        dataLength={Object.keys(bookMarkedPosts).length}
                        next={getBookMarkedPosts}
                        hasMore={hasMoreBookMarkedPosts}
                        loader={
                          <div>
                            <SearchResultsSkeleton />
                            <SearchResultsSkeleton />
                            <SearchResultsSkeleton />
                          </div>
                        }
                        endMessage={
                          <p className="text-center text-sm text-black dark:text-white">
                            Looks like you have reached the end
                          </p>
                        }
                      >
                        {Object.entries(bookMarkedPosts).map(([, post]) => {
                          return (
                            <BookMarkedPostCard post={post} key={post?._id} />
                          );
                        })}
                      </InfiniteScroll>
                    }
                  </div>
                ) : (
                  <div className="mt-8 sm:mt-12">
                    <p className="text-sm sm:text-base text-center text-black dark:text-white">
                      No bookmarked posts
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

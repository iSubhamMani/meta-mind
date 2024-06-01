import { ArrowLeft, Frown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@/utils/constants";
import Post from "@/interfaces/Post";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import RootState from "@/interfaces/RootState";
import {
  addSearchResults,
  cacheResults,
  clearSearchResults,
  setHasMore,
  setPage,
  setSearchQuery,
  setSearchResults,
  updatePage,
} from "@/redux/searchSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchResultsSkeleton from "./SearchResultsSkeleton";
import Navbar from "./Navbar";

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  const prevSearchQuery = useRef<string | null>(null);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const { searchQuery, hasMore, page, searchResults, cachedResults } =
    useSelector((state: RootState) => state.search);

  const { user } = useSelector((state: RootState) => state.user);

  const handleSearch = async (isInitialSearch: boolean) => {
    setInitialLoad(isInitialSearch);

    // check cache
    if (isInitialSearch && searchQuery.trim().toLowerCase() in cachedResults) {
      setInitialLoad(false);
      const { data, hasMore, page } = (
        cachedResults as Record<
          string,
          { data: Post[]; page: number; hasMore: boolean }
        >
      )[searchQuery.trim().toLowerCase()];

      dispatcher(setHasMore(hasMore));
      dispatcher(setPage(page));
      dispatcher(setSearchResults(data));
      return;
    }

    if (searchQuery.trim().toLowerCase())
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/v1/posts/search?q=${searchQuery}&page=${page}`
        );

        if (response.data?.success) {
          if (response.data?.data?.docs.length > 0) {
            setNoResults(false);
            setInitialLoad(false);
            dispatcher(updatePage());
            dispatcher(addSearchResults(response.data?.data?.docs));
            dispatcher(
              cacheResults({
                posts: response.data?.data?.docs,
                hasMore: response.data?.data?.hasNextPage,
                page: page + 1,
              })
            );
            dispatcher(setHasMore(response.data?.data?.hasNextPage));
          } else {
            setInitialLoad(false);
            setNoResults(true);
          }
        }
      } catch (error) {
        setInitialLoad(false);
        console.log(error);
      }
  };

  useEffect(() => {
    if (
      prevSearchQuery.current !== null &&
      prevSearchQuery.current !== searchQuery
    ) {
      dispatcher(setPage(1));
      dispatcher(setHasMore(false));
      dispatcher(clearSearchResults());
    }

    prevSearchQuery.current = searchQuery;
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim().length === 0) return;
    setNoResults(false);

    const timer = setTimeout(() => {
      handleSearch(true);
    }, 700);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#d0daf5] to-[#fff] dark:bg-gradient-to-bl dark:from-[#111524] dark:to-[#000000] ">
      <Navbar />
      <div className="max-w-[80rem] mx-auto px-6">
        <div className="pt-2 pb-4 sm:pt-4 sm:pb-6">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="h-6 w-6 cursor-pointer text-black dark:text-white"
          />
        </div>
        <div className="w-full border border-[#b1c9ed] dark:border-[#282828] shadow-sm max-w-[35rem] flex justify-center items-center bg-[#f5f9ff] dark:bg-[#27272c] rounded-full px-4 py-3">
          <input
            onChange={(e) => dispatcher(setSearchQuery(e.target.value))}
            type="text"
            value={searchQuery}
            placeholder="Type something to search..."
            autoComplete="off"
            className="font-source w-full text-base md:text-lg placeholder:text-gray-500 dark:placeholder:text-gray-400 text-black dark:text-white bg-transparent focus-within:outline-none px-4"
          />
        </div>

        <div className="mt-10 sm:mt-12 pb-6">
          <div className="w-full">
            {searchQuery.trim().length > 0 &&
              searchResults.length === 0 &&
              noResults && (
                <div className="flex flex-col items-center gap-4">
                  <Frown className="h-8 w-8 sm:h-12 sm:w-12 dark:text-gray-700 text-gray-400" />
                  <h1 className="text-lg sm:text-2xl dark:text-white text-black text-center">
                    No results found
                  </h1>
                </div>
              )}
          </div>
          <div className="w-full sm:w-[85%]">
            {initialLoad && (
              <div>
                <SearchResultsSkeleton />
                <SearchResultsSkeleton />
                <SearchResultsSkeleton />
              </div>
            )}
            {searchQuery.trim().length > 0 && searchResults.length > 0 && (
              <InfiniteScroll
                dataLength={searchResults.length}
                next={() => handleSearch(false)}
                hasMore={hasMore}
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
                {searchResults.map((post: Post) => {
                  return <PostCard user={user} key={post._id} post={post} />;
                })}
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

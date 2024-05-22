import { ArrowLeft, Frown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";
import "../styles/animate-text-2.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@/utils/constants";
import Post from "@/interfaces/Post";
import SearchResultPost from "./SearchResultPost";
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

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  const prevSearchQuery = useRef<string | null>(null);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const { searchQuery, hasMore, page, searchResults, cachedResults } =
    useSelector((state: RootState) => state.search);

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
    <div className="min-h-screen bg-white/95 dark:bg-[#0e0e0e] px-6">
      <div className="max-w-[80rem] mx-auto">
        <div className="py-6 sm:pb-10">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="h-6 w-6 cursor-pointer text-black dark:text-white"
          />
          <Separator className="my-4" />
        </div>
        <div className="w-full max-w-[35rem] flex justify-center items-center bg-gray-200 dark:bg-[#1e1e1e] rounded-full px-4 py-3">
          <input
            onChange={(e) => dispatcher(setSearchQuery(e.target.value))}
            type="text"
            value={searchQuery}
            placeholder="Type something to search..."
            autoComplete="off"
            className="font-source w-full text-base md:text-lg text-black dark:text-white bg-transparent focus-within:outline-none px-4"
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
                  return <SearchResultPost key={post._id} post={post} />;
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

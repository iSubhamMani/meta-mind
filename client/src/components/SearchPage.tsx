import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";
import "../styles/animate-text-2.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@/utils/constants";
import Post from "@/interfaces/Post";
import SearchResultPost from "./SearchResultPost";
import { useDispatch, useSelector } from "react-redux";
import RootState from "@/interfaces/RootState";
import { cacheResults, setSearchQuery } from "@/redux/searchSlice";

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  const { searchQuery, cachedResults } = useSelector(
    (state: RootState) => state.search
  );
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  const handleSearch = async () => {
    // check if query exists in cache

    if (searchQuery.toLowerCase() in cachedResults) {
      setSearchResults(
        cachedResults[searchQuery.toLowerCase() as keyof typeof cachedResults]
      );
      return;
    }

    try {
      const response = await axios.get(
        `${SERVER_URL}/api/v1/posts/search?q=${searchQuery}`
      );

      if (response.data?.success) {
        if (response.data?.data?.docs.length > 0) {
          setSearchResults(response.data?.data?.docs);
          dispatcher(cacheResults(response.data?.data?.docs));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchQuery.length === 0) return;

    const timer = setTimeout(() => {
      handleSearch();
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

        <div className="mt-10 sm:mt-12 pb-6 w-full sm:w-[85%]">
          {searchResults.map((post: Post) => {
            return <SearchResultPost post={post} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
